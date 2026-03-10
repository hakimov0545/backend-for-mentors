import express from "express";
import CategoryController from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", CategoryController.create.bind(CategoryController));
router.get("/", CategoryController.getAll.bind(CategoryController));
router.get(
	"/:id/products",
	CategoryController.getProducts.bind(CategoryController),
);

export default router;
