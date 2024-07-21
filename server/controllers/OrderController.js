import OrderService from "../services/OrderService.js";

class OrderController {
    async create(req, res, next) {
        try {
            const data = await OrderService.create(req.body);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}


export default new OrderController();