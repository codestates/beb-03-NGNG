import { HashTag } from './../typeorm/entity/HashTag';
import { getRepository, getConnection } from 'typeorm';
import { Thumb } from '../typeorm/entity/Thumb';
import { User } from '../typeorm/entity/User';
import { validate } from 'class-validator';

import { IPost, ILikeIt, returnPostLikeIt, returnGetPostLikeIt, returnPost, returnPosts } from '../types/service/InterfacePost';
import { Post } from '../typeorm/entity/Post';
import { v4 as uuid } from 'uuid';



const likeItPost = async (likeItData: ILikeIt): Promise<returnPostLikeIt> => {
    try {
        const { postUuid, userUuid, likeIt } = likeItData
        const post = await Post.findOneOrFail({ uuid: postUuid })
        const user = await User.findOneOrFail({ uuid: userUuid })
        const thumbFindOne = await Thumb.findOne({ post, user })
        if (thumbFindOne) {
            thumbFindOne.remove()
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
            .addSelect("count(*)", "countAll")
            .where("thumb.postIndex = :postIndex", { postIndex: post.index })
            .getRawOne();
        console.log(thumb)
        let likeItCount = 0
        let countAll = 0
        if (thumb.sum !== null) {
            likeItCount = parseInt(thumb.likeItCount)
            countAll = parseInt(thumb.countAll)
        }
        return {
            success: true,
            data: {
                likeItCount,
                countAll
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
        category,
        tags,
    } = postData;
    console.log(postData)
    try {
        const user = await User.findOneOrFail({ id })
        const post = Post.create({ content, user, category });
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
        // const result = await getRepository(Post)
        //     .createQueryBuilder("post")
        //     .leftJoin('post.user', 'user')
        //     .where("user.id = :id", { id })
        //     .addSelect((subQuery: any) => {
        //         return subQuery
        //             .delete()
        //             .from(Post)
        //             .where("post.uuid = :postUuid", { postUuid })
        //             .execute();
        //     })
        //     .getOne();

        const result = await getRepository(Post)
            .createQueryBuilder("post")
            .delete()
            .from(Post)
            .where("post.uuid = :postUuid", { postUuid })
            .execute();
        return {
            success: true,
            data: result,
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

const updatePost_service = async () => {
    try {

    }
    catch (err) {
        if (process.env.NODE_ENV !== "production") {
            console.error(err)
        }
    }
}


const getPostFromUuid = async ({ postUuid }: { postUuid: string }): Promise<returnPost> => {
    try {
        console.log(postUuid)
        const post = await getRepository(Post)
            .createQueryBuilder("post")
            .leftJoin('post.user', 'user')
            .addSelect(['user.id'])
            .where("post.uuid = :uuid", { uuid: postUuid })
            .getOne();
        if (process.env.NODE_ENV !== "production") {
            console.log(post);
        }

        const postUpdate = await getRepository(Post)
            .createQueryBuilder("post")
            .update(Post)
            .set({ views: () => "views + 1" })
            .where("uuid = :uuid", { uuid: postUuid })
            .execute();
        if (process.env.NODE_ENV !== "production") {
            console.log(postUpdate);
        }

        return {
            success: true,
            data: {
                post
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


const getPostsWithoutNoticeBoardByTime = async ({ limit = "150" }: { limit: string }): Promise<returnPosts> => {
    try {
        const intLimit = parseInt(limit);
        console.log(limit, intLimit)
        const category = "noticeBoard";
        const posts = await getRepository(Post)
            .createQueryBuilder("post")
            .where("post.category != :category", { category })
            .select(["post.uuid", "post.updatedAt", "post.category"])
            .leftJoin('post.user', 'user')
            .addSelect('user.id' as "id")
            .orderBy("post.createdAt", "DESC")
            .limit(intLimit)
            .getRawMany();
        console.log(posts)
        return {
            success: true,
            data: {
                posts
            },
            error: null,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            data: null,
            error: "getPostsWithoutNoticeBoardByTime db error"
        }
    }
}

const getPostsSortByTime = async ({ limit = "150" }: { limit: string }): Promise<returnPosts> => {
    try {
        const intLimit = parseInt(limit);
        const posts = await getRepository(Post)
            .createQueryBuilder("post")
            .select(["post.uuid", "post.updatedAt", "post.category"])
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

const getPostsPagenationSortByTime = async ({ category, page = 0, pageSize = 15 }: { category: string, page?: number, pageSize?: number }): Promise<returnPosts> => {
    try {
        let posts: Array<object> = []
        if (category) {
            await getRepository(Post)
                .createQueryBuilder("post")
                .select(["post.uuid", "post.updatedAt", "post.category"])
                .where("post.category = :category", { category })
                .leftJoin('post.user', 'user')
                .addSelect('user.id' as "id")
                .skip((page - 1) * pageSize)
                .take(pageSize)
                .getRawMany();
            console.log(posts)
        }
        else {
            await getRepository(Post)
                .createQueryBuilder("post")
                .select(["post.uuid", "post.updatedAt", "post.category"])
                .leftJoin('post.user', 'user')
                .addSelect('user.id' as "id")
                .skip((page - 1) * pageSize)
                .take(pageSize)
                .getRawMany();
            console.log(posts)
        }
        return {
            success: true,
            data: {
                posts
            },
            error: null,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            data: null,
            error: "포스트 여러개 페이지네이션 형식으로 가져오기 실패"
        }
    }
}


const getCategoryPostsSortByTime = async ({ category, limit = "1500" }: { category: string, limit: string }): Promise<returnPosts> => {
    try {
        const intLimit = parseInt(limit);
        const posts = await getRepository(Post)
            .createQueryBuilder("post")
            .where("post.category = :category", { category })
            .leftJoin('post.user', 'user')
            .addSelect(['user.id'])
            .orderBy("post.createdAt", "DESC")
            .limit(intLimit)
            .getRawMany();
        return {
            success: true,
            data: {
                posts
            },
            error: null,
        }
    } catch (err) {
        console.error(err)
        return {
            success: false,
            data: null,
            error: "카테고리 별로 포스트들 가져오기 실패"
        }
    }
}


export {
    createPost,
    deletePost_service,
    updatePost_service,
    getPostFromUuid,
    getPostsSortByTime,
    getCategoryPostsSortByTime,
    getPostsPagenationSortByTime,
    getPostsWithoutNoticeBoardByTime,
    likeItPost,
    getLikeItPost,
    getHashTagPosts_service,
}