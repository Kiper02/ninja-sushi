import { Token, User } from "../db/models/index.js";
import ApiError from "../exceptions/ApiError.js";
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt'
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже сущетсвует`);
        }
        const hassPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();
        
        const user = await User.create({email, password: hassPassword, activationLink});
        await MailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        
        const userDto = new UserDto(user); 
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: UserDto};
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if(!user) {
            throw ApiError.badRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.badRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: UserDto};
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})
        if(!user) {
            throw ApiError.badRequest('Неккоректная ссылка активации')
        }

        user.isActivated = true;
        await user.save();
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken({refreshToken});
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id)

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: UserDto};
    }
}


export default new UserService();