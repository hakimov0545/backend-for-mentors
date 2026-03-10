import ProductService from "../services/product.service.js";

class ProductController {
	async create(req, res) {
		try {
			const { title, price, category } = req.body;
			const product = await ProductService.create({
				title,
				price,
				category,
			});
			res.status(201).json(product);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}

	async getAll(req, res) {
		try {
			const products = await ProductService.getAll(true);
			res.json(products);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}

	async getByCategory(req, res) {
		const { id } = req.params;
		try {
			const products = await ProductService.getByCategory(
				id,
				true,
			);
			res.json(products);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Server error" });
		}
	}
}

export default new ProductController();
