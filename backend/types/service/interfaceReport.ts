import { interfaceCommentModel } from "./Model/interfaceCommentModel";
import { returnApi } from "./Model/InterfaceReturnApiModel";

interface IReturnReport extends returnApi {
    id?: string
}

export type {
    IReturnReport,
}