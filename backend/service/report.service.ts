import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Post } from '../typeorm/entity/Post';
import { Report } from '../typeorm/entity/Report';
import { User } from '../typeorm/entity/User';
import { IReturnReport } from '../types/service/interfaceReport';


const reportPost_service = async ({ id, postUuid, content }: { id: string, postUuid: string, content: string }): Promise<IReturnReport> => {
    try {
        const user = await User.findOneOrFail({ id });
        const post = await Post.findOneOrFail({ uuid: postUuid });
        console.log("uu", user);
        console.log("pp", post);
        if (user && post) {
            const report = Report.create({
                reporter: user,
                content,
                post
            });
            const errors = await validate(report)
            console.log("createUser error check : ", errors)
            if (errors.length > 0) throw errors
            await report.save()
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
            error: "send comment error"
        }
    }
}

export {
    reportPost_service
}