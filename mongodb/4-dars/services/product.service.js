import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

class ProductService {
	async create(data) {
		const product = new Product(data);
        let saved = await product.save();

        // push product id into category.products array for reverse lookup
        await Category.findByIdAndUpdate(saved.category, {
            $addToSet: { products: saved._id },
        });

        // return populated category for convenience
        saved = await Product.findById(saved._id).populate("category");

	async getAll(populateCategory = false) {
		let query = Product.find();
		if (populateCategory) {
			query = query.populate("category");
		}
		return query;
	}

	async getByCategory(categoryId, populateCategory = false) {
		let query = Product.find({ category: categoryId });
		if (populateCategory) {
			query = query.populate("category");
		}
		return query;
	}
}

export default new ProductService();
