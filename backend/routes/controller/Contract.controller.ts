import { Request, Response } from 'express';
import { mintNFT } from '../../utilities/ether';

const mintNFT_controller = async (req: Request, res: Response) => {
    try {
        const privateKey = req?.user?.privateKey as string;
        const result = await mintNFT(privateKey);
        if (result) {
            return res.status(201).json({
                success: true,
                data: {
                    result
                },
                error: null,
            });
        }
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            data: null,
            error: err,
        })
    }
}


export {
    mintNFT_controller,
}
