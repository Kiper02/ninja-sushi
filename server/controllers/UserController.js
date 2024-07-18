import UserService from "../services/UserService";

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxeAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async activate(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            next(error)
        }
    }
}


export default new UserController();