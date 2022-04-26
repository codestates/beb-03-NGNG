import { User } from '../typeorm/entity/User';

// 글로벌 선언
declare global {
    namespace Express {
        interface Request {
            user: {
                id?: string;
            },
            post: {
                postUri: Array<string>
            },
            profile: {
                imageUri: string,
            },
            file: {
                buffer: string,
            }
        }
    }
}