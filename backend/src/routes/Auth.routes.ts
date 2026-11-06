import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import { handleInputErrors } from "../middlewares";
import { body } from "express-validator";

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
    AuthController.createAccount
);

authRouter.post(
    '/confirm-account',
    body('uuid_user').notEmpty().withMessage('El uuid es requerido').isUUID().withMessage('Uuid no valido'),
    body('token').notEmpty().withMessage('El token es requerido').matches(/^\d{6}$/).withMessage('Token no valido'),
    handleInputErrors,
    AuthController.confirmAccount
);

authRouter.post(
    '/login',
    body('email').notEmpty().withMessage('El email es requerido').isEmail().withMessage('Email no valido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    handleInputErrors,
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
    AuthController.resetPassword
);

export default authRouter;
