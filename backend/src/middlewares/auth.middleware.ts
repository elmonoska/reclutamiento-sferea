import {Request, Response, NextFunction} from 'express';
import Logger from '../utils/logger.utils';
import { normalizeError, sendError } from '../helpers/response.helper';
import User from '../models/user.model';
import { TRequestWithUser, TRequestWithUserAndToken } from '../types/auth';
import AuthToken from '../models/auth-token.model';

export async function preventDuplicateEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await User.scope('basic').findOne({where: {email: req.body.email}});
        if (user) {
            return sendError(res, 409, 'La cuenta ya existe');
        }
        next();
    } catch (err) {
        Logger.error(`Ocurrio un error al verificar el correo: ${normalizeError(err)}`);
        return sendError(res, 500, 'Ocurrio un error al verificar el correo');
    }
}


export async function getUserByUuid(req: TRequestWithUser, res: Response, next: NextFunction) {
    try {
        const { uuid_user } = req.body;
        const user = await User.scope('basic').findOne({where: {uuid_user}});
        if (!user) {
            return sendError(res, 404, 'La cuenta no existe');
        }
        req.user = user;
        next();
    } catch (err) {
        Logger.error(`Ocurrio un error al verificar la cuenta: ${normalizeError(err)}`);
        return sendError(res, 500, 'Ocurrio un error al verificar la cuenta');
    }
}

export function getUserByEmail(withPassword: boolean = false) {
    return async (req: TRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            const user = withPassword
                ? await User.scope('withPassword').findOne({where: {email}})
                : await User.scope('basic').findOne({where: {email}});
            if (!user) {
                return sendError(res, 404, 'La cuenta no existe');
            }
            req.user = user;
            next();
        } catch (err) {
            Logger.error(`Ocurrio un error al verificar la cuenta: ${normalizeError(err)}`);
            return sendError(res, 500, 'Ocurrio un error al verificar la cuenta');
        }
    }
}

export async function requireUnconfirmedAccount(req: TRequestWithUser, res: Response, next: NextFunction) {
    try {
        if (req.user!.confirmed) {
            return sendError(res, 400, 'La cuenta ya esta confirmada');
        }
        next();
    } catch (err) {
        Logger.error(`Ocurrio un error al verificar la confirmacion de la cuenta: ${normalizeError(err)}`);
        return sendError(res, 500, 'Ocurrio un error al verificar la confirmacion de la cuenta');
    }
}

export async function validateAuthTokenById(req: TRequestWithUserAndToken, res: Response, next: NextFunction) {
    try {
        const authToken = await AuthToken.findOne({where: {id_user: req.user!.id_user, token: req.body.token}});
        if (!authToken) {
            return sendError(res, 400, 'Token no valido o incorrecto');
        }
        req.authToken = authToken;
        next();
    } catch (err) {
        Logger.error(`Ocurrio un error al validar el token: ${normalizeError(err)}`);
        return sendError(res, 500, 'Ocurrio un error al validar el token');
    }
}