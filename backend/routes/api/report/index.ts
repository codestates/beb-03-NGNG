import express, { Router } from 'express';
import { reportPost_controller } from '../../controller/Report.controller';
import { loginRequired } from '../../middleware';
const router = Router()


router.post('/reportPost', loginRequired, reportPost_controller);



export default router