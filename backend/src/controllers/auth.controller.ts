import {Request, Response} from 'express'
import Logger from '../utils/logger.utils'
import { normalizeError, sendError, sendSuccess } from '../helpers/response.helper';
import { TRequestWithUser, TRequestWithUserAndToken } from '../types/auth';
import AuthService from '../services/auth.service';

export default class AuthController {
    static async createAccount(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            await AuthService.createUser(name, email, password);

            return sendSuccess(res, 201, 'Cuenta creada exitosamente, revisa tu email para confirmarla');
        } catch (err) {
            Logger.error(`Ocurrio un error al crear la cuenta: ${normalizeError(err)}`);
            return sendError(res, 500, 'Ocurrio un error al crear la cuenta');
        }
    }

    static async confirmAccount(req: TRequestWithUserAndToken, res: Response) {
        try {
            req.user!.confirmed = true;
            await Promise.all([req.user!.save(), req.authToken!.destroy()]);

            return sendSuccess(res, 200, 'Cuenta confirmada exitosamente, puedes iniciar sesion');
        } catch (err) {
            Logger.error(`Ocurrio un error al confirmar la cuenta: ${normalizeError(err)}`);
            return sendError(res, 500, 'Ocurrio un error al confirmar la cuenta');
        }
    }

    static async login(req: TRequestWithUser, res: Response) {
        try {
            const { password } = req.body;
            const jwt = await AuthService.authenticate(password, req.user!);

            return sendSuccess(res, 200, 'Inicio de sesion exitoso', {token: jwt});
        } catch (err) {
            Logger.error(`Ocurrio un error al ingresar a la cuenta: ${normalizeError(err)}`);
            if (err instanceof Error) {
                if (err.message === 'UNCONFIRMED_ACCOUNT') {
                    return sendError(res, 403, 'La cuenta no ha sido confirmada, se ha enviado un email para hacerlo');
                }
                if (err.message === 'INVALID_CREDENTIALS') {
                    return sendError(res, 401, 'Correo o contraseña invalidos');
                }
            }
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const message = 'Si el correo esta registrado, recibiras un correo con las instrucciones para restablecer tu contraseña';
            await AuthService.requestPasswordReset(email);

            return sendSuccess(res, 200, message);
        } catch (err) {
            Logger.error(`Ocurrio un error solicitar el restablecimiento de contraseña: ${normalizeError(err)}`);
            return sendError(res, 500, 'Ocurrio un error solicitar el restablecimiento de contraseña');
        }
    }

    static async resetPassword(req: TRequestWithUserAndToken, res: Response) {
        try {
            const { password } = req.body;
            await AuthService.resetUserPassword(password, req.user!, req.authToken!);

            return sendSuccess(res, 200, 'Contraseña cambiada exitosamente')
        } catch (err) {
            Logger.error(`Ocurrio un error al restablecer la contraseña: ${normalizeError(err)}`);
            return sendError(res, 500, 'Ocurrio un error al restablecer la contraseña');
        }
    }
}
