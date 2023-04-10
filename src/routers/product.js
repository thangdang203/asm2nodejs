import express from 'express';
import { create, get, getAll, remove, update } from '../controllers/category';
import { checkPermission } from '../middlewares/checkPermission';

const router = express.Router();

router.post("/products", checkPermission, create);
router.delete("/products/:id", checkPermission, remove)
router.put("/products/:id", checkPermission, update)
router.get("/products/:id", get)
router.get("/products", getAll)

export default router;