import { Product } from "../db/models/index.js";
import ApiError from "../exceptions/ApiError.js";

class ProductService {
    async create(data) {
        const product = await Product.create({
            name: data.name,
            price: data.price,
            weight: data.weight,
            description: data.description,
            img: data.img,
            type_id: data.type_id
        })

        return product;
    }

    async getAll() {
        const products = await Product.findAll();
        return products;
    }

    async getOne(id) {
        const product = await Product.findOne({where: {id}});
        if(!product) {
            throw ApiError.badRequest('Нет такого продукта');
        }

        return product;
    }
}


export default new ProductService();