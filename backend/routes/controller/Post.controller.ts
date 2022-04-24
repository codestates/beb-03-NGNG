import { Request, Response } from 'express';
import {
    createPost,
    getPostFromUuid,
    getPostsSortByTime,
    getLikeItPost,
    getCategoryPostsSortByTime,
    getPostsPagenationSortByTime,
    likeItPost,
    getPostsWithoutNoticeBoardByTime,
    deletePost_service,
    updatePost_service,
} from '../../service/post.service';

const sendPost = async (req: any, res: Response) => {
    const { id, ipAddress } = req.user;
    console.log("ipAddress : ", id, ipAddress);
    const { content, category } = req.body;
    const result = await createPost({
        content, ipAddress, id, category
    });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getPost = async (req: Request, res: Response) => {
    const postUuid = req.query.postUuid as string;
    const result = await getPostFromUuid({
        postUuid
    });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getPosts = async (req: Request, res: Response) => {
    const limit = req.query.limit as string;
    const result = await getPostsSortByTime({ limit });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getCategoryPosts = async (req: Request, res: Response) => {
    const category = req.query.category as string;
    const limit = req.query.limit as string;
    console.log(category, limit)
    const result = await getCategoryPostsSortByTime({ category, limit });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getPostsWithoutNoticeBoard = async (req: Request, res: Response) => {
    const limit = req.query.limit as string;
    const result = await getPostsWithoutNoticeBoardByTime({ limit });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getCategoryPostsPagenation = async (req: Request, res: Response) => {
    const category = req.query.category as string;
    const result = await getPostsPagenationSortByTime({ category });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const likeIt = async (req: Request, res: Response) => {
    const { postUuid, userUuid, likeIt } = req.body;
    const result = await likeItPost({
        postUuid,
        userUuid,
        likeIt,
    });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const getLikeIt = async (req: Request, res: Response) => {
    const postUuid = req.query.postUuid as string;
    const result = await getLikeItPost({
        postUuid
    });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}


const deletePost = async (req: Request, res: Response) => {
    const postUuid = req.body.postUuid as string;
    // const result = await deletePost_service({
    //     postUuid
    // });
    const result = { success: true };
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

const updatePost = async (req: Request, res: Response) => {
    // const postUuid = req.query.postUuid as string;
    // const result = await updatePost_service({
    //     postUuid
    // });
    const result = { success: true };
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

export {
    sendPost,
    getPost,
    getPosts,
    likeIt,
    getLikeIt,
    getCategoryPosts,
    getPostsWithoutNoticeBoard,
    deletePost,
    updatePost
}
