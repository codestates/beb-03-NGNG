import { Comment } from './../typeorm/entity/Comment';
import { User } from '../typeorm/entity/User';
import { Post } from '../typeorm/entity/Post';
import { validate } from 'class-validator';
import { IMemberComment, INonMemberComment, returnHashTag } from '../types/service/InterfaceComment';
import { getRepository } from 'typeorm';
import { HashTag } from '../typeorm/entity/HashTag';

const getTopHashTag_service = async ({ limit = 10 }: { limit: number }): Promise<returnHashTag> => {
    try {
        const hashTag = await getRepository(HashTag)
            .createQueryBuilder('hashTag')
            .select('hashTag.tag AS tag')
            .addSelect('COUNT(*) AS tagCount')
            .groupBy('hashTag.tag')
            .limit(limit)
            .getRawMany();

        return {
            success: true,
            data: {
                hashTag
            },
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
    getTopHashTag_service
}