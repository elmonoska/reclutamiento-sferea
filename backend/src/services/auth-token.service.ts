import AuthToken from "../models/auth-token.model"
import User from "../models/user.model"
import { generateToken } from "../utils/auth/generateCode.utils";
import EmailService from "./email.service";

export default class AuthTokenService {
    static async generateAndSendToken(user: User, type: 'confirmation' | 'reset') {
        // limpia los tokens anteriores
        await AuthToken.destroy({where: {id_user: user.id_user}});

        // crea un nuevo token
        const token = generateToken();
        const authToken = await AuthToken.create({id_user: user.id_user, token});

        // envio del nuevo token por email
        if (type === 'confirmation') {
            await EmailService.sendAccountConfirmation(user.email, user.uuid_user, authToken.token);
        } else {
            await EmailService.sendPasswordReset(user.email, user.uuid_user, authToken.token);
        }
    }
}