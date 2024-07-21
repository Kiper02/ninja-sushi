import ProductService from "../services/ProductService.js";

class ProductController {
    async create(req, res, next) {
        try {
            const product = await ProductService.create(req.body);
            return res.json(product);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const products = await ProductService.getAll();
            return res.json(products);
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await ProductService.getOne(req.body.id);
            return res.json(product)
        } catch (error) {
            next(error)
        }
    }
}


export default new ProductController();