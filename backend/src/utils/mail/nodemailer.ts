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

export function sendEmail(to: string, subject: string, text: string) {
    transport.sendMail({
      from: "TestElMonoSka <elmonoska@correo.com>",
      to,
      subject,
      text
    }, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });
}
