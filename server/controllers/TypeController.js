import TypeService from "../services/TypeService.js";

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const type = await TypeService.create(name);
            return res.json(type);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await TypeService.getAll();
            return res.json(types);
        } catch (error) {
            next(error)
        }
    }
}


export default new TypeController();