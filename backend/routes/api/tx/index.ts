import express, { Router } from 'express';
import { getTransactions_controller } from '../../controller/Transaction.controller';
import { loginRequired } from '../../middleware';
const router = Router()

router.get('/getTransactions', loginRequired, getTransactions_controller);

export default router