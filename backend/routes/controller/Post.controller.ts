import { Request, Response } from 'express';
import {
    createPost,
    getPostFromUuid,
    getPostsSortByTime,
    getLikeItPost,
    // getCategoryPostsSortByTime,
    // getPostsPagenationSortByTime,
    likeItPost,
    // getPostsWithoutNoticeBoardByTime,
    deletePost_service,
    updatePost_service,
    getHashTagPosts_service,
} from '../../service/post.service';
import { create } from 'ipfs-http-client';
import { addLikeItReward_service, addReward_service } from '../../service/reward.service';

const sendPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.user;
        const { content, tags: tagsString } = req.body;
        console.log("bffff", "asdafdsfasd")
        const buffer = req?.file?.buffer as Object;
        console.log("bffff", buffer)
        // @ts-ignore
        const client = create("https://ipfs.infura.io:5001/api/v0");
        // @ts-ignore
        let imageUri = undefined;
        if (buffer) {
            const cid = await client.add(buffer);
            imageUri = `https://ipfs.io/ipfs/${cid.path}`;
        }
        const tags = tagsString.split(/(#[^#\s]+)/g).filter((v: string) => {
            return v.match(/(#[^#\s]+)/g)
        }).map((tag: string) => tag.slice(1));
        console.log(tags)
        const result = await createPost({
            content, id, tags, imageUri
        });
        if (result.success) {
            addReward_service({ type: "post", id });
            return res.status(201).json(result);
        }
        else {
            return res.status(400).json(result)
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const getPost = async (req: Request, res: Response) => {
    try {
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
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const getPosts = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit as string;
        const result = await getPostsSortByTime({ limit });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const getHashTagPosts = async (req: Request, res: Response) => {
    try {
        const tag = req.query.tag as string;
        console.log(tag)
        const result = await getHashTagPosts_service({ tag });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const likeIt = async (req: Request, res: Response) => {
    try {
        const { postUuid } = req.body;
        const id = req?.user?.id as string;
        const result = await likeItPost({
            postUuid,
            id,
        });
        if (result.success) {
            addLikeItReward_service({ postUuid });
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const getLikeIt = async (req: Request, res: Response) => {
    try {
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
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}


const deletePost = async (req: Request, res: Response) => {
    try {
        const postUuid = req.query.postUuid as string;
        const id = req.user.id as string;
        const result = await deletePost_service({
            id,
            postUuid
        });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const postUuid = req.body.postUuid as string;
        const content = req.body.content as string;
        const id = req.user.id as string;
        const result = await updatePost_service({
            id,
            postUuid,
            content,
        });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

export {
    sendPost,
    getPost,
    getPosts,
    likeIt,
    getLikeIt,
    deletePost,
    updatePost,
    getHashTagPosts
}
