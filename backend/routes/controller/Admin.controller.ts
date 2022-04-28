import { Request, Response } from 'express';

import { addReward_service, pay_service } from '../../service/reward.service';

const pay = async (req: Request, res: Response) => {
    const { role } = req?.user;
    const result = await pay_service({ role });
    if (result.success) {
        return res.status(201).json(result);
    }
    else {
        return res.status(500).json(result)
    }
}

export {
    pay
}
