class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req;
            
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
}


export default new TypeController();