import { interfaceCommentModel } from "./Model/interfaceCommentModel";
import { returnApi } from "./Model/InterfaceReturnApiModel";

interface IMemberComment extends interfaceCommentModel {
    id?: string
}

interface INonMemberComment extends interfaceCommentModel {
    anonymouseId: string,
    password: string
}


interface returnComment extends returnApi {
    comment?: any,
}
interface returnHashTag extends returnApi {
    hashTag?: any,
}

export type {
    IMemberComment,
    INonMemberComment,
    returnComment,
    returnHashTag
}