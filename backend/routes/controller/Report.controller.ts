import { Request, Response } from 'express';
import {
    reportPost_service,
} from '../../service/report.service';

const reportPost_controller = async (req: Request, res: Response) => {
    try {
        const postUuid = req.body.postUuid as string;
        const content = req.body.content as string;
        const id = req.user.id as string;
        const result = await reportPost_service({ id, postUuid, content });
        if (result.success) {
            return res.status(201).json(result);
        }
        else {
            return res.status(500).json(result)
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            data: null,
            error: err,
        })
    }
}

export {
    reportPost_controller
}
