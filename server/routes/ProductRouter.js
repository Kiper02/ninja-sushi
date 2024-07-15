import { Router } from "express";
import ProcuctController from "../controllers/ProcuctController.js";

const router = Router()


router.post('/', ProcuctController.create);
router.get('/', ProcuctController.getAll);
router.get('/:id', ProcuctController.getOne);


export default router;