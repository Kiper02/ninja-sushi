import { Type } from "../db/models/index.js";
import ApiError from "../exceptions/ApiError.js";

class TypeService {
    async create(name) {
        const isType = await Type.findOne({where: {name}})
        if(isType) {
            throw ApiError.badRequest('Такой тип уже существует')
        }
        const type = await Type.create({name});
        return type;
    }

    async getAll() {
        const types = await Type.findAll();
        return types;
    }
}


export default new TypeService();