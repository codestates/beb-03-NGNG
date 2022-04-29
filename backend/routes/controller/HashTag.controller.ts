import { Request, Response } from 'express';
import {
    getTopHashTag_service,
} from '../../service/hashtag.service';

const getTopHashTag = async (req: Request, res: Response) => {
    try {
        const result = await getTopHashTag_service({ limit: 10 });
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
    getTopHashTag
}
