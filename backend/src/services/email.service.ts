import { FRONTEND_URL } from "../constants";
import { sendEmail } from "../lib/mail/nodemailer";

export default class EmailService {
    static async sendAccountConfirmation(email: string, uuid: string, token: number) {
        const URL = `${FRONTEND_URL}/auth/confirmar-cuenta/${uuid}`;
        const template = `
            <h1>Confirma tu cuenta</h1>
             <p>Es necesario confirmar tu cuenta con tu token en el siguiente enlace:</p>
             <a href="${URL}" target="_blank">Confirmalo aqui</a>
             <h2>Token: <strong>${token}</strong></h2>
        `;
        await sendEmail(
            email,
            'Confirmacion de cuenta',
            undefined,
            template
        );
    }

    static async sendPasswordReset(email: string, uuid: string, token: number) {
        const URL = `${FRONTEND_URL}/auth/restablecer-contrasena/${uuid}`;
        const template = `
            <h1>Confirma tu restablecimiento de contraseña</h1>
            <p>Es necesario confirmar el restablecimiento con tu token en el siguiente enlace:</p>
            <a href="${URL}" target="_blank">Confirmalo aqui</a>
            <h2>Token: <strong>${token}</strong></h2>
        `;
        await sendEmail(
            email,
            'Confirmacion de restablecimiento de contraseña',
            undefined,
            template
        );
    }
}