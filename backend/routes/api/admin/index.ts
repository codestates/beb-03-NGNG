import { Router } from 'express';
import { loginRequired, emailVerified } from '../../middleware';
import {
    pay
} from '../../controller/Admin.controller';
const router = Router()

router.get('/pay', loginRequired, pay);
export default router