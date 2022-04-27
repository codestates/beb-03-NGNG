import { Request, Response } from 'express';
import { mintNFT } from '../../utilities/ether';

const mintNFT_controller = async (req: Request, res: Response) => {
    const privateKey = req?.user?.privateKey as string;
    const result = await mintNFT(privateKey);
    if (result) {
        return res.status(201).json(result);
    }
    else {
        return res.status(400).json(result)
    }
}


export {
    mintNFT_controller,
}
