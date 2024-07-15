import { Router } from "express";
import OrderRouter from './OrderRouter.js'
import ProductRouter from './OrderRouter.js'
import TypeRouter from './OrderRouter.js'
import UserRouter from './OrderRouter.js'

const router = Router()


router.use('/user', UserRouter);
router.use('/order', OrderRouter);
router.use('/product',ProductRouter);
router.use('/type', TypeRouter);


export default router;