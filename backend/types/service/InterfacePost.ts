import { role } from '../enum/index'
import { returnApi } from './Model/InterfaceReturnApiModel'
interface IPost {
    content: string,
    id: string,
    category: string,
    permision?: role,
    useComment?: boolean,
    delete?: boolean,
    tags: Array<string>,
    postUri: string,
}


interface ILikeIt {
    postUuid: string,
    userUuid: string,
    likeIt: boolean
}

interface returnPost extends returnApi {
    post?: any
}
interface returnPosts extends returnApi {
    posts?: Array<Object>
}
interface returnPostLikeIt extends returnPost {
}

interface returnGetPostLikeIt extends returnPost {
    likeItCount?: number
    countAll?: number
}


export type { IPost, ILikeIt, returnPost, returnPosts, returnPostLikeIt, returnGetPostLikeIt }