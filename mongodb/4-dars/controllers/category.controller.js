import CategoryService from "../services/category.service.js";

class CategoryController {
	async create(req, res) {
		try {
			const { name } = req.body;
			const category = await CategoryService.create({ name });
			res.status(201).json(category);
		} catch (error) {
			console.error(error);
			if (error.code === 11000) {
				return res
					.status(400)
					.json({ message: "Category already exists" });
			}
			res.status(500).json({ message: "Server error" });
		}
	}

	async getAll(req, res) {
		try {
			// always include products via populate
			const categories = await CategoryService.getAll(true);
			res.json(categories);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}

	async getProducts(req, res) {
		const { id } = req.params;
		try {
			const products =
				await CategoryService.getProductsByCategory(id);
			res.json(products);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
}

export default new CategoryController();
