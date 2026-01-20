import ProductService from "../services/product.service.js";

class ProductController {
  static list(req, res, next) {
    try {
      const page = +(req.query.page || 1);
      const limit = Math.min(+(req.query.limit || 10), 50);
      const start = (page - 1) * limit;

      const result = ProductService.getAll(req.query);

      res.status(200).json({
        total: result.length,
        page,
        limit,
        data: result.slice(start, start + limit),
      });
    } catch (error) {
      next(error);
    }
  }

  static get(req, res, next) {
    try {
      const product = ProductService.getById(req.params.id);
      if (!product) {
        throw { status: 404, message: "Product not found" };
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static create(req, res, next) {
    try {
      const newProduct = ProductService.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static update(req, res, next) {
    try {
      const product = ProductService.update(req.params.id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static delete(req, res, next) {
    try {
      ProductService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
