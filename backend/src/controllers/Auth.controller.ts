import {Request, Response} from 'express'
import Logger from '../utils/Logger'
import User from '../models/User.model';
import { checkPassword, hashPassword } from '../utils/auth/bcrypt';
import AuthToken from '../models/AuthToken';
import { FRONTEND_URL } from '../constants';
import { generateToken } from '../utils/auth/generateCode';
import { sendEmail } from '../lib/mail/nodemailer';
import { generateJWT } from '../utils/auth/jwt';
import { sendError, sendSuccess } from '../helpers/response.helper';

export default class AuthController {
    static async createAccount(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body;

            const userExists = await User.findOne({where: {email}});
            if (userExists) {
                return sendError(res, 409, 'La cuenta ya existe');
            }

            const hashedPassword = await hashPassword(password);
            const user = await User.create({name, email, password: hashedPassword});
            const randomToken = generateToken();
            const token = await AuthToken.create({id_user: user.id_user, token: randomToken});

            // envio de confirmacion de cuenta
            await sendEmail(
                user.email,
                'Confirmación de creación de cuenta',
                'Confirmación de creación de cuenta',
                `<h1>Has creado tu cuenta correctamente</h1>
                    <p>Es necesario confirmar tu cuenta mediante tu token en el siguiente enlace: </p>
                    <a href="${FRONTEND_URL}/auth/confirmar-cuenta/${user.uuid_user}" target="_blank">Confirmalo aqui</a>
                    <h2><strong>Token: ${token.token}</strong></h2>
                `,
            );

            return sendSuccess(res, 201, {}, 'Cuenta creada exitosamente, revisa tu email para confirmarla');
        } catch (err) {
            Logger.error(`Ocurrio un error al crear la cuenta ${err.message}`);
            return sendError(res, 500, 'Ocurrio un error al crear la cuenta');
        }
    }

    static async confirmAccount(req: Request, res: Response) {
        try {
            const { uuid_user, token } = req.body;
            const user = await User.findOne({
                where: {uuid_user},
                attributes: ['id_user', 'confirmed']
            });

            if (!user) {
                return sendError(res, 404, 'Cuenta no encontrada');
            }

            if (user.confirmed) {
                return sendError(res, 400, 'La cuenta ya esta confirmada, inicia sesion');
            }

            const authToken = await AuthToken.findOne({ where: { id_user: user.id_user, token } });
            if (!authToken) {
                return sendError(res, 400, 'Token no valido o incorrecto');
            }

            user.confirmed = true;
            await Promise.all([user.save(), authToken.destroy()]);

            return sendSuccess(res, 200, {}, 'Cuenta confirmada exitosamente, ahora puedes iniciar sesion')
        } catch (err) {
            Logger.error(`Ocurrio un error al confirmar la cuenta ${err.message}`);
            return sendError(res, 500, 'Ocurrio un error al confirmar la cuenta');
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {email},
                attributes: ['id_user', 'uuid_user', 'email', 'confirmed', 'password']
            });

            if (!user) {
                return sendError(res, 404, 'Cuenta no encontrada');
            }

            const isValidPassword = await checkPassword(password, user.password);
            if (!isValidPassword) {
                return sendError(res, 401, 'Correo o contraseña invalidos');
            }

            if (!user.confirmed) {
                await AuthToken.destroy({where: {id_user: user.id_user}});
                const token = await generateToken();
                const authToken = await AuthToken.create({id_user: user.id_user, token});

                // envio de confirmacion de cuenta
                await sendEmail(
                    user.email,
                    'Confirmación de cuenta',
                    'Confirmación de cuenta',
                    `<h1>Confirma tu cuenta</h1>
                        <p>Es necesario confirmar tu cuenta mediante tu token en el siguiente enlace: </p>
                        <a href="${FRONTEND_URL}/auth/confirmar-cuenta/${user.uuid_user}" target="_blank">Confirmalo aqui</a>
                        <h2><strong>Token: ${authToken.token}</strong></h2>
                    `,
                );
                return sendError(res, 403, 'La cuenta no ha sido confirmada, se ha enviado un email para hacerlo');
            }

            const jwt = await generateJWT(user.uuid_user);

            return sendSuccess(res, 200, {token: jwt}, 'Cuenta iniciada correctamente');
        } catch (err) {
            Logger.error(`Ocurrio un error al ingresar la cuenta ${err.message}`);
            return sendError(res, 500, 'Ocurrio un error al ingresar a la cuneta');
        }
    }
}
