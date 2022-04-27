import { Router } from 'express';
import { loginRequired, emailVerified } from '../../middleware';
import { mintNFT_controller } from './../../controller/Contract.controller';

const router = Router()

router.post('/mintNFT',
    loginRequired, mintNFT_controller
);
export default router