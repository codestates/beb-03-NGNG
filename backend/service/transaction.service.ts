import { ethers } from 'ethers';
import { validate } from 'class-validator';
import { getConnection, getRepository, SimpleConsoleLogger } from 'typeorm';
import { Reward } from '../typeorm/entity/Reward';
import { Transactions } from '../typeorm/entity/demon/Transactions';
import { connections } from '../typeorm/connection';

const getTransactions_service = async (): Promise<any> => {
    try {
        const result = await getConnection('dev')
            .getRepository(Transactions)
            .createQueryBuilder("transactions")
            .getRawMany();
        return {
            success: true,
            data: {
                result: result.map(({
                    transactions_id,
                    transactions_to,
                    transactions_from,
                    transactions_hash,
                }) => {
                    return {
                        transactions_id,
                        transactions_to,
                        transactions_from,
                        transactions_hash,
                    }
                })
            },
            error: "",
        }
    } catch (err) {
        console.log(err)
        return {
            success: false,
            data: null,
            error: "트랜젝션 오류"
        }
    }
}

export {
    getTransactions_service,
}