import { User } from "../db/models/index.js";
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
        await MailService.sendActivationMail(email, activationLink);
        
        const userDto = new UserDto(user); 
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: UserDto};
    }

    async login() {
        
    }

    async logout() {
        
    }

    async activate() {
        
    }

    async refresh() {
        
    }
}


export default new UserService();