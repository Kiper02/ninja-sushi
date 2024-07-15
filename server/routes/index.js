import { Router } from "express";

const router = Router()


router.use('/user');
router.use('/order');
router.use('/product');
router.use('/type');


export default router;