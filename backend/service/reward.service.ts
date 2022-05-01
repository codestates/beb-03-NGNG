import { ethers } from 'ethers';
import { validate } from 'class-validator';
import { getRepository, SimpleConsoleLogger } from 'typeorm';
import { Post } from '../typeorm/entity/Post';
import { Report } from '../typeorm/entity/Report';
import { Reward } from '../typeorm/entity/Reward';
import { User } from '../typeorm/entity/User';
import { findNFT, mintToken } from '../utilities/ether';

const addReward_service = async ({ type, id, }: { id: string, type: string }): Promise<any> => {
    try {
        const user = await User.findOneOrFail({ id });
        const reward = Reward.create({ user, type });
        const errors = await validate(reward);
        if (errors.length > 0) throw errors;
        await reward.save();
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        console.log("createUser error check : ", err);
        return {
            success: false,
            data: null,
            error: "send comment error"
        }
    }
}


// privateKey user

const addLikeItReward_service = async ({ postUuid }: { postUuid: string }): Promise<any> => {
    const type = 'likeIt';
    try {
        // const post = await Post.findOneOrFail({ uuid: postUuid });
        const post = await getRepository(Post)
            .createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .where("post.uuid = :postUuid", { postUuid })
            .getOne();
        if (process.env.NODE_ENV !== "production") console.log(post);
        const reward = Reward.create({ user: post?.user, type });
        const errors = await validate(reward)
        if (errors.length > 0) throw errors;
        await reward.save();
        return {
            success: true,
            data: null,
            error: null,
        }
    } catch (err) {
        console.log("addLikeItReward_service error check : ", err);
        return {
            success: false,
            data: null,
            error: "send comment error"
        }
    }
}

const pay_service = async ({ role }) => {
    try {
        if (role === "user") throw "권한이 없습니다.";
        const rewards = await getRepository(Reward)
            .createQueryBuilder("reward")
            .leftJoinAndSelect('reward.user', 'user')
            .getRawMany();

        await getRepository(Reward)
            .createQueryBuilder()
            .delete()
            .execute();
        if (process.env.NODE_ENV !== "production") console.log(rewards);
        // async 때문에 한개 씩 민팅 해서 오래걸림
        // *id 별로 amount 값 모아서 한번에 민팅하기*
        for (const reward of rewards) {
            const type = reward["reward_type"] as string;
            const privateKey = reward['user_privateKey'] as string;
            let amount = 0;
            if (type === 'post') {
                amount = 10;
            } else if (type === 'comment') {
                amount = 5;
            } else if (type === 'like') {
                amount = 1;
            }
            const result = await findNFT({ privateKey });
            if (process.env.NODE_ENV !== "production") console.log('nft balance', result);
            const NftBalance = +ethers.utils.formatEther(result);

            await mintToken(privateKey, (amount * (NftBalance + 1)).toString());
        }
        return {
            success: true,
            data: {
                rewards: rewards.map(({ reward_type, user_id }) => {
                    return { reward_type, user_id }
                })
            },
            error: null,
        }
    }
    catch (err) {
        console.log("pay_service error : ", err);
        return {
            success: false,
            data: null,
            error: err,
        }
    }
}

export {
    addReward_service,
    addLikeItReward_service,
    pay_service,
}