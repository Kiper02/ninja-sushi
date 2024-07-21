import { Order } from "../db/models/index.js";
import ApiError from "../exceptions/ApiError.js";

class OrderService {
    async create(data) {
        if(data.isDilivery) {
            if(!data.address && !data.hous && !data.leave_under_the_door) {
                throw ApiError.badRequest('Поля adress, hous и leave_under_the_door обязательны для заполнения при доставке')
            }

            const order = await Order.create({
                isDilivery: data.isDilivery,
                address: data.address,
                hous: data.hous,
                entrance: data.entrance,
                floor: data.floor,
                leave_under_the_door: data.leave_under_the_door,
            
            })
        }
        const order = await Order.create({})
    }

    async getAll() {

    }

    async getOne() {

    }
}


export default new OrderService();