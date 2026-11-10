import AuthToken from "../models/auth-token.model";
import User from "../models/user.model";
import { checkPassword, hashPassword } from "../utils/auth/bcrypt.utils";
import { generateJWT } from "../utils/auth/jwt.utils";
import AuthTokenService from "./auth-token.service";

export default class AuthService {
    static async createUser(name: User['name'], email: User['email'], password: User['password']) {
        const hashedPassword = await hashPassword(password);
        const user = await User.create({name, email, password: hashedPassword});
        await AuthTokenService.generateAndSendToken(user, 'confirmation');
        return user;
    }

    static async authenticate(password: User['password'], user: User) {
        if (!user.confirmed) {
            await AuthTokenService.generateAndSendToken(user, 'confirmation');
            throw new Error('UNCONFIRMED_ACCOUNT');
        }

        const isValidPassword = await checkPassword(password, user.password);
        if (!isValidPassword) {
            throw new Error('INVALID_CREDENTIALS');
        }

        return await generateJWT(user.uuid_user);
    }

    static async requestPasswordReset(email: User['email']) {
        const message = 'Si el correo esta registrado, recibiras un correo con las instrucciones para restablecer tu contraseña';
        const user = await User.findOne({where: {email}});

        if (!user) return;

        if (!user.confirmed) {
            // envio de email de confirmacion de cuenta
            await AuthTokenService.generateAndSendToken(user, 'confirmation');
        } else {
            // envio de email de restablecimiento de contraseña
            await AuthTokenService.generateAndSendToken(user, 'reset');
        }
    }

    static async resetUserPassword(password: User['password'], user: User, authToken: AuthToken) {
        await authToken.destroy();
        user.password = await hashPassword(password);
        await user.save();
    }
}
