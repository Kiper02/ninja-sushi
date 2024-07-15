import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = Router()


router.post('/', OrderController.create);
router.get('/', OrderController.getAll);
router.get('/:id', OrderController.getOne);


export default router;