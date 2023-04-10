import express from 'express';
import { create, get, getAll, remove, update } from '../controllers/category';

const router = express.Router();

router.post("/categories", checkPermission, create);
router.delete("/categories/:id", checkPermission, remove)
router.put("/categories/:id", checkPermission, update)
router.get("/categories/:id", get)
router.get("/categories", getAll)

export default router;