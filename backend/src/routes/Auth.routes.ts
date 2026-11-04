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
    body('confirm-password').notEmpty().withMessage('La confirmación de contraseña es requerida').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden')
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createAccount
)

export default authRouter;
