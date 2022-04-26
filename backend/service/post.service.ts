import { HashTag } from './../typeorm/entity/HashTag';
import { getRepository, getConnection, EntityManager } from 'typeorm';
import { Thumb } from '../typeorm/entity/Thumb';
import { User } from '../typeorm/entity/User';
import { validate } from 'class-validator';

import { IPost, ILikeIt, returnPostLikeIt, returnGetPostLikeIt, returnPost, returnPosts } from '../types/service/InterfacePost';
import { Post } from '../typeorm/entity/Post';
import { v4 as uuid } from 'uuid';



const likeItPost = async (likeItData: ILikeIt): Promise<returnPostLikeIt> => {
    try {
        const { postUuid, id } = likeItData
        const post = await Post.findOneOrFail({ uuid: postUuid })
        const user = await User.findOneOrFail({ id })
        const thumbFindOne = await Thumb.findOne({ post, user })
        console.log(thumbFindOne)
        if (thumbFindOne) {
            // thumbFindOne.remove()
            return {
                success: false,
                data: null,
                error: "이미 좋아요를 눌렀습니다.",
            }
        }
        else {
            const thumb = Thumb.create({
                post,
                user,
                likeIt: true
            })
            const errors = await validate(thumb)
            if (errors.length > 0) throw errors
            await thumb.save()
        }
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "좋아요 실패"
        }
    }
}

const getLikeItPost = async (likeItData: { postUuid: string }): Promise<returnGetPostLikeIt> => {
    try {
        const { postUuid } = likeItData
        const post = await Post.findOneOrFail({ uuid: postUuid })
        const thumb = await getRepository(Thumb)
            .createQueryBuilder("thumb")
            .select("SUM(thumb.likeIt)", "likeItCount")
            .where("thumb.postIndex = :postIndex", { postIndex: post.index })
            .getRawOne();
        console.log(thumb)
        let likeItCount = 0
        if (thumb.sum !== null) {
            likeItCount = parseInt(thumb.likeItCount)
        }
        return {
            success: true,
            data: {
                likeItCount,
            },
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "좋아요 가져오기 실패"
        }
    }
}




const createPost = async (postData: IPost): Promise<returnPost> => {
    const {
        content,
        id,
        tags,
    } = postData;
    console.log(postData)
    try {
        const user = await User.findOneOrFail({ id })
        const post = Post.create({ content, user });
        const errors = await validate(post);
        if (errors.length > 0) throw errors
        await post.save();
        console.log(post)
        const tagArray = tags.map(tag => {
            return { post, tag, uuid: uuid() }
        });
        console.log(tagArray)
        const hashTag = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(HashTag)
            .values(tagArray)
            .execute();
        const errors2 = await validate(hashTag);
        if (errors2.length > 0) throw errors2
        return {
            success: true,
            data: {
                postUuid: post.uuid
            },
            error: null,
        }
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }
        return {
            success: false,
            data: null,
            error: "포스트 생성 실패"
        }
    }
}

const deletePost_service = async ({ postUuid, id }: { postUuid: string, id: string }) => {
    try {
        const result = await getConnection().transaction(async manager => {
            const result = await manager.query(`
                DELETE a FROM post as a LEFT JOIN user as b 
                ON a.userIndex = b.index  
                WHERE a.uuid = '${postUuid}' AND b.id = '${id}'`
            );
            return result;
        });
        return {
            success: true,
            data: { result },
            error: null,
        }
    }
    catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }
        return {
            success: false,
            data: null,
            error: "post 삭제 실패",
        }
    }
}

const updatePost_service = async ({ postUuid, id, content }: { postUuid: string, id: string, content: string }) => {
    try {
        const result = await getConnection().transaction(async manager => {
            const result = await manager.query(`
                UPDATE post LEFT JOIN user
                ON post.userIndex = user.index  
                SET post.content = '${content}'
                WHERE post.uuid = '${postUuid}' AND user.id = '${id}'
                `
            );
            return result;
        });
        return {
            success: true,
            data: { result },
            error: "post 수정 성공",
        }
    }
    catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }
        return {
            success: false,
            data: null,
            error: "post 수정 실패",
        }
    }
}


const getPostFromUuid = async ({ postUuid }: { postUuid: string }): Promise<returnPost> => {
    try {
        const post = await getRepository(Post)
            .createQueryBuilder("post")
            .leftJoin('post.user', 'user')
            .addSelect(['user.id'])
            .where("post.uuid = :uuid", { uuid: postUuid })
            .getOne();
        if (!post) throw "post를 찾을 수 없음";
        const tags = await getRepository(HashTag)
            .createQueryBuilder('HashTag')
            .select()
            .where("hashTag.postIndex = :postIdx", { postIdx: post['index'] })
            .getMany()
        console.log(post)
        if (process.env.NODE_ENV !== "production") {
            console.log(post);
        }

        return {
            success: true,
            data: {
                post: { ...post, tag:tags.map(({ tag }) => tag) }
            },
            error: null,
        }
    } catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }
        return {
            success: false,
            data: null,
            error: "포스트 가져오기 실패"
        }
    }
}


const getPostsSortByTime = async ({ limit = "150" }: { limit: string }): Promise<returnPosts> => {
    try {
        const intLimit = parseInt(limit);
        const posts = await getRepository(Post)
            .createQueryBuilder("post")
            .select(["post.uuid", "post.updatedAt", "post.createdAt", "post.content"])
            .leftJoin('post.user', 'user')
            .addSelect('user.id' as "id")
            .orderBy("post.createdAt", "DESC")
            .limit(intLimit)
            .getRawMany();
        console.log(posts)
        return {
            success: true,
            data: {
                posts,
            },
            error: null,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            data: null,
            error: "포스트 여러개 가져오기 실패"
        }
    }
}

const getHashTagPosts_service = async ({ tag }: { tag: string }): Promise<returnPosts> => {
    try {
        console.log(tag)
        const hashTag = await getRepository(HashTag)
            .createQueryBuilder("hashTag")
            .leftJoin('hashTag.post', 'post')
            .where("hashTag.tag = :tag", { tag })
            .leftJoin('post.user', 'user')
            .select(["post.uuid", "post.updatedAt", "post.content", "id"])
            .getRawMany();
        console.log(hashTag);
        return {
            success: true,
            data: {
                hashTag,
            },
            error: null,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            data: null,
            error: "포스트 여러개 가져오기 실패"
        }
    }
}

// const getPostsPagenationSortByTime = async ({ category, page = 0, pageSize = 15 }: { category: string, page?: number, pageSize?: number }): Promise<returnPosts> => {
//     try {
//         let posts: Array<object> = []
//         if (category) {
//             await getRepository(Post)
//                 .createQueryBuilder("post")
//                 .select(["post.uuid", "post.updatedAt", "post.category"])
//                 .where("post.category = :category", { category })
//                 .leftJoin('post.user', 'user')
//                 .addSelect('user.id' as "id")
//                 .skip((page - 1) * pageSize)
//                 .take(pageSize)
//                 .getRawMany();
//             console.log(posts)
//         }
//         else {
//             await getRepository(Post)
//                 .createQueryBuilder("post")
//                 .select(["post.uuid", "post.updatedAt", "post.category"])
//                 .leftJoin('post.user', 'user')
//                 .addSelect('user.id' as "id")
//                 .skip((page - 1) * pageSize)
//                 .take(pageSize)
//                 .getRawMany();
//             console.log(posts)
//         }
//         return {
//             success: true,
//             data: {
//                 posts
//             },
//             error: null,
//         }
//     } catch (err) {
//         console.error(err)
//         return {
//             success: false,
//             data: null,
//             error: "포스트 여러개 페이지네이션 형식으로 가져오기 실패"
//         }
//     }
// }


// const getCategoryPostsSortByTime = async ({ category, limit = "1500" }: { category: string, limit: string }): Promise<returnPosts> => {
//     try {
//         const intLimit = parseInt(limit);
//         const posts = await getRepository(Post)
//             .createQueryBuilder("post")
//             .where("post.category = :category", { category })
//             .leftJoin('post.user', 'user')
//             .addSelect(['user.id'])
//             .orderBy("post.createdAt", "DESC")
//             .limit(intLimit)
//             .getRawMany();
//         return {
//             success: true,
//             data: {
//                 posts
//             },
//             error: null,
//         }
//     } catch (err) {
//         console.error(err)
//         return {
//             success: false,
//             data: null,
//             error: "카테고리 별로 포스트들 가져오기 실패"
//         }
//     }
// }


export {
    createPost,
    deletePost_service,
    updatePost_service,
    getPostFromUuid,
    getPostsSortByTime,
    // getPostsPagenationSortByTime,
    likeItPost,
    getLikeItPost,
    getHashTagPosts_service,
}