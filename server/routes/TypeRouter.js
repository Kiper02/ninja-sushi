import { Router } from "express";
import TypeController from "../controllers/TypeController";

const router = Router()


router.post('/', TypeController.create);
router.get('/', TypeController.getAll);


export default router;