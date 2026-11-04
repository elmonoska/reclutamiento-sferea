import {Request, Response} from 'express'
import Logger from '../utils/Logger'
import User from '../models/User.model';
import { generateToken, hashPassword } from '../utils/auth';
import Token from '../models/Token.model';
import { sendEmail } from '../utils/mail/nodemailer';

export default class AuthController {
    static async createAccount(req: Request, res: Response) {
        try {
            const {name, email, password} = req.body;
            const hashedPassword = await hashPassword(password);
            const user = await User.create({name, email, password: hashedPassword});
            const token = generateToken();
            await Token.create({id_user: user.id_user, token})
            sendEmail('juan@coreo.com', 'correo de prueba', 'hola esto es un correo de pprueba')
            return res.status(201).json({message: 'Usuario creado con exito'});
        } catch (err) {
            Logger.error(`Ocurrio un error al crear la cuenta ${err.message}`);
            return res.status(500).json({error: `Ocurrio un error al crear la cuenta ${err.message}`});
        }
    }
}
