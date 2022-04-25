import express, { Router } from 'express';
import {  getTopHashTag} from '../../controller/HashTag.controller';
import { loginRequired } from '../../middleware';
const router = Router()


// 카테고리 추가해야함

router.get('/topHashtag',  getTopHashTag);



export default router