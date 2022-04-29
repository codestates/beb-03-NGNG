import express, { Router } from 'express';
import { getTransactions_controller } from '../../controller/Transaction.controller';
const router = Router()

router.get('/getTransactions', getTransactions_controller);

export default router