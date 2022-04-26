import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { IReturnReport } from '../types/service/interfaceReport';


const reportPost_service = async ({ postUuid, content }: { postUuid: string, content: string }): Promise<IReturnReport> => {
    try {
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

export {
    reportPost_service
}