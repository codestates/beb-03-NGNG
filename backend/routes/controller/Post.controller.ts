import { Request, Response } from 'express';
import fs from 'fs';
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

// const router = express.Router();
const imageFunction = () => {
    try {
        fs.accessSync('uploads');
    } catch (error) {
        console.log('uploads 폴더 생성');
        fs.mkdirSync('uploads');
    }
}


const sendPost = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { content, tags: tagsString } = req.body;

    imageFunction()
    // @ts-ignore
    const client = create("https://ipfs.infura.io:5001/api/v0");
    // @ts-ignore
    const cid = await client.add(req.file);
    const postUri = `https://ipfs.infura.io/ipfs/${cid.path}`;

    const tags = tagsString.split(/(#[^#\s]+)/g).filter((v: string) => {
        return v.match(/(#[^#\s]+)/g)
    }).map((tag: string) => tag.slice(1));
    console.log(tags)
    const result = await createPost({
        content, id, tags, postUri
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

const getHashTagPosts = async (req: Request, res: Response) => {
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

// const getCategoryPostsPagenation = async (req: Request, res: Response) => {
//     const category = req.query.category as string;
//     const result = await getPostsPagenationSortByTime({ category });
//     if (result.success) {
//         return res.status(201).json(result);
//     }
//     else {
//         return res.status(500).json(result)
//     }
// }

const likeIt = async (req: Request, res: Response) => {
    const { postUuid } = req.body;
    const id = req?.user?.id as string;
    const result = await likeItPost({
        postUuid,
        id,
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

const updatePost = async (req: Request, res: Response) => {
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
