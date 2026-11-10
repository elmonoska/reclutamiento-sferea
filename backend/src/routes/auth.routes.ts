import { Router } from "express";
import { handleInputErrors } from "../middlewares/index.middleware";
import { body } from "express-validator";
import { getUserByEmail, getUserByUuid, preventDuplicateEmail, requireUnconfirmedAccount, validateAuthTokenById } from "../middlewares/auth.middleware";
import AuthController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post(
    '/create-account',
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('confirm_password').notEmpty().withMessage('La confirmación de contraseña es requerida').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden')
        }
        return true;
    }),
    handleInputErrors,
    preventDuplicateEmail,
    AuthController.createAccount
);

authRouter.post(
    '/confirm-account',
    body('uuid_user').notEmpty().withMessage('El uuid es requerido').isUUID().withMessage('Uuid no valido'),
    body('token').notEmpty().withMessage('El token es requerido').matches(/^\d{6}$/).withMessage('Token no valido'),
    handleInputErrors,
    getUserByUuid,
    requireUnconfirmedAccount,
    validateAuthTokenById,
    AuthController.confirmAccount
);

authRouter.post(
    '/login',
    body('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    handleInputErrors,
    getUserByEmail(true),
    AuthController.login
);

authRouter.post(
    '/forgot-password',
    body('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('Email no valido'),
    handleInputErrors,
    AuthController.forgotPassword
);

authRouter.post(
    '/reset-password',
    body('uuid_user').notEmpty().withMessage('El uuid es requerido').isUUID().withMessage('Uuid no valido'),
    body('token').notEmpty().withMessage('El token es requerido').matches(/^\d{6}$/).withMessage('Token no valido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    body('confirm_password').notEmpty().withMessage('La confirmación de contraseña es requerida').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden')
        }
        return true;
    }),
    handleInputErrors,
    getUserByUuid,
    validateAuthTokenById,
    AuthController.resetPassword
);

export default authRouter;
