import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", ProductController.create.bind(ProductController));
router.get("/", ProductController.getAll.bind(ProductController));
router.get(
	"/category/:id",
	ProductController.getByCategory.bind(ProductController),
);

export default router;
