import nodemailer from "nodemailer";
import { NODEMAILER_PASS, NODEMAILER_USER } from "../../constants";

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS
  }
});

export async function sendEmail(to: string, subject: string, text?: string, html?: string) {
  try {
    await transport.sendMail({
      from: "TestElMonoSka <elmonoska@correo.com>",
      to,
      subject,
      text,
      html
    }, (error, info) => {
      if (error) {
        throw new Error(error)
      }
    });    
  } catch (err) {
    throw new Error(err.message);
  }
}
