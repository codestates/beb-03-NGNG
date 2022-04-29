import { Request, Response } from 'express';
import { getTransactions_service } from '../../service/transaction.service';

const getTransactions_controller = async (req: Request, res: Response) => {
    const result = await getTransactions_service();
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

export {
    getTransactions_controller
}
