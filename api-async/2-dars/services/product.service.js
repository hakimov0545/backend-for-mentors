import products from "../data/products.js";

class ProductService {
  static getAll(query) {
    let result = products;
    const { minPrice, maxPrice, name, q } = query;

    if (minPrice) result = result.filter((p) => p.price >= +minPrice);
    if (maxPrice) result = result.filter((p) => p.price <= +maxPrice);

    if (name) {
      result = result.filter(
        (p) => p.name.toLowerCase() === name.toLowerCase(),
      );
    }

    if (q) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()),
      );
    }

    return result;
  }

  static getById(id) {
    return products.find((p) => p.id === +id);
  }

  static create(body) {
    const { name, price, category, inStock } = body;

    if (!name || price == null) {
      throw { status: 400, message: "Invalid body" };
    }

    const newProduct = {
      id: products.at(-1).id + 1,
      name,
      price,
      category,
      inStock: Boolean(inStock),
    };

    products.push(newProduct);
    return newProduct;
  }

  static update(id, body) {
    const product = products.find((p) => p.id === +id);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }

    Object.assign(product, body);
    return product;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id === +id);
    if (index === -1) {
      throw { status: 404, message: "Product not found" };
    }

    products.splice(index, 1);
  }
}

export default ProductService;
