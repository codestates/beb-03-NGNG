import express, { Router } from 'express';
import { reportPost_controller } from '../../controller/Report.controller';
import { loginRequired } from '../../middleware';
const router = Router()


// 카테고리 추가해야함

router.get('/reportPost', reportPost_controller);



export default router