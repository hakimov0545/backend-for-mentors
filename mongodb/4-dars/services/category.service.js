import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

class CategoryService {
	async create(data) {
		const category = new Category(data);
		return category.save();
	}

	async getAll(populateProducts = false) {
		let query = Category.find();
		if (populateProducts) {
			query = query.populate("products");
		}
		return query;
	}

	async getById(id, populateProducts = false) {
		let query = Category.findById(id);
		if (populateProducts) {
			query = query.populate("products");
		}
		return query;
	}

	async getProductsByCategory(categoryId) {
		return Product.find({ category: categoryId }).populate(
			"category",
		);
	}
}

export default new CategoryService();
