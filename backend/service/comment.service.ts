import { Comment } from './../typeorm/entity/Comment';
import { User } from '../typeorm/entity/User';
import { Post } from '../typeorm/entity/Post';
import { validate } from 'class-validator';
import { IMemberComment, INonMemberComment, returnComment } from '../types/service/InterfaceComment';
import { getRepository } from 'typeorm';


const createMemberComment = async (commentData: IMemberComment): Promise<returnComment> => {
    const {
        content,
        ipAddress,
        postUuid,
        id,
        parentUuid,
    } = commentData;
    try {
        const postFromUuid = await Post.findOneOrFail({ uuid: postUuid })
        const userFromUuid = await User.findOneOrFail({ id })
        let comment;
        if (parentUuid !== undefined) {
            const commentFromUuid = await Comment.findOneOrFail({ uuid: parentUuid })
            comment = Comment.create({
                content,
                ipAddress,
                post: postFromUuid,
                user: userFromUuid,
                user_id: userFromUuid,
                isMember: true,
                parentComment: commentFromUuid
            });
        }
        else {
            comment = Comment.create({
                content,
                ipAddress,
                isMember: true,
                post: postFromUuid,
                user: userFromUuid,
                user_id: userFromUuid,
            });
        }

        // 추가해야 검사해줌
        const errors = await validate(comment)
        console.log(errors)
        if (errors.length > 0) throw errors
        await comment.save()
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "send comment error"
        }
    }
}

const createNonMemberComment = async (commentData: INonMemberComment): Promise<returnComment> => {
    const {
        content,
        ipAddress,
        postUuid,
        anonymouseId,
        password,
        parentUuid,
    } = commentData;
    try {
        const postFromUuid = await Post.findOneOrFail({ uuid: postUuid })
        let comment: any;
        if (parentUuid !== undefined) {
            const commentFromUuid = await Comment.findOneOrFail({ uuid: parentUuid })
            comment = Comment.create({
                content,
                ipAddress,
                post: postFromUuid,
                anonymouseId,
                password,
                parentComment: commentFromUuid
            });
        }
        else {
            comment = Comment.create({
                content,
                ipAddress,
                post: postFromUuid,
                anonymouseId,
                password,
            });
        }
        // 추가해야 검사해줌
        const errors = await validate(comment)
        if (errors.length > 0) throw errors
        await comment.save();
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "createNonMemberComment error"
        }
    }
}

const deleteMemberCommentFromUuid = async (data: any) => {
    const {
        id,
        commentUuid,
    } = data;
    try {
        const UpdateResult = await getRepository(Comment)
            .createQueryBuilder("comment")
            .update(Comment)
            .set({
                deleted: true,
            })
            .where("user_id = :id AND uuid = :commentUuid", { id, commentUuid })
            .execute();

        // UpdateResult ex)
        // UpdateResult { generatedMaps: [], raw: [], affected: 1 }
        if (UpdateResult.affected) {
            return {
                success: true,
                data: null,
                error: null,
            }
        }
        else {
            return {
                success: false,
                data: null,
                error: "업데이트 실패"
            }
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "createNonMemberComment server error"
        }
    }
}

const deleteNonMemberCommentFromUuid = async (data: any) => {
    const {
        commentPassword,
        commentUuid,
    } = data;
    try {
        const commentFromUuid = await Comment.findOneOrFail({
            uuid: commentUuid,
            password: commentPassword
        })
        commentFromUuid.deleted = true
        Comment.save(commentFromUuid);
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "createNonMemberComment error"
        }
    }

}


const getCommentsFromPostUuid = async ({ postUuid }: any): Promise<returnComment> => {
    try {
        const comment = await getRepository(Comment)
            .createQueryBuilder("comment")
            .where('comment.parentComment IS NULL')
            .andWhere("post.uuid = :uuid", { uuid: postUuid })
            .leftJoin('comment.post', 'post')
            .leftJoinAndSelect('comment.childComments', ' parentComment')
            .orderBy("comment.createdAt", "ASC")
            .getRawMany();

        const temp: any = {}
        comment.map((o) => {
            // deleted가 1이라면 content 삭제
            if (o.comment_deleted) {
                o.comment_content = "삭제된 글 입니다."
            }

            if (o.parentComment_deleted) {
                o.parentComment_content = "삭제된 글 입니다."
            }

            o.parentComment_ipAddress = o.parentComment_ipAddress &&
                "X.X." + o.parentComment_ipAddress.split('.').slice(2, 4).join('.')

            o.comment_ipAddress = o.comment_ipAddress &&
                "X.X." + o.comment_ipAddress.split('.').slice(2, 4).join('.')

            // temp에 index가 있다면
            if (temp.hasOwnProperty(o.comment_index)) {
                if (o.parentComment_index) {
                    temp[o.comment_index]["childComments"].push({
                        uuid: o.parentComment_uuid,
                        updatedAt: o.parentComment_updatedAt,
                        content: o.parentComment_content,
                        ipAddress: o.parentComment_ipAddress,
                        annonymouseId: o.parentComment_anonymouseId,
                        isMember: o.parentComment_isMember,
                        id: o.parentComment_user_id,

                    })
                }
            }
            // temp에 index가 없다면
            else {
                const childComments = []
                if (o.parentComment_index) {
                    childComments.push({
                        uuid: o.parentComment_uuid,
                        updatedAt: o.parentComment_updatedAt,
                        content: o.parentComment_content,
                        ipAddress: o.parentComment_ipAddress,
                        annonymouseId: o.parentComment_anonymouseId,
                        isMember: o.parentComment_isMember,
                        id: o.parentComment_user_id,
                    })
                }
                temp[o.comment_index] = {
                    uuid: o.comment_uuid,
                    updatedAt: o.comment_updatedAt,
                    content: o.comment_content,
                    ipAddress: o.comment_ipAddress,
                    annonymouseId: o.comment_anonymouseId,
                    isMember: o.comment_isMember,
                    id: o.comment_user_id,
                    childComments
                }

            }
        })

        return {
            success: true,
            data: {
                comments: Object.values(temp)
            },
            error: null,
        }
    } catch (err) {
        return {
            success: false,
            data: null,
            error: "get Comments error"
        }
    }
}

export { createMemberComment, createNonMemberComment, deleteMemberCommentFromUuid, deleteNonMemberCommentFromUuid, getCommentsFromPostUuid }