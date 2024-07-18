import jwt from 'jsonwebtoken'
import { Token } from '../db/models';

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expirenIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expirenIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({where: user_id});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({user_id, refreshToken});
        return token;
    }
}

export default new TokenService(); 