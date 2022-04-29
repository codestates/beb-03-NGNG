import { Request, Response } from 'express';

import { addReward_service, pay_service } from '../../service/reward.service';

const pay = async (req: Request, res: Response) => {
    try {
        const { role } = req?.user;
        const result = await pay_service({ role });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json({
                success: false,
                data: null,
                error: "지불 실패",
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err
        })

    }
}

export {
    pay
}
