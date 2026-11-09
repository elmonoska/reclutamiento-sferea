import nodemailer from "nodemailer";
import { NODEMAILER_HOST, NODEMAILER_PASS, NODEMAILER_PORT, NODEMAILER_SENDER, NODEMAILER_USER } from "../../constants";
import { normalizeError } from "../../helpers/response.helper";

const transport = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS
  }
});

export async function sendEmail(to: string, subject: string, text?: string, html?: string) {
  try {
    const mailInfo = await transport.sendMail({
      from: NODEMAILER_SENDER,
      to,
      subject,
      text,
      html
    });

    return mailInfo;
  } catch (err) {
    throw new Error(normalizeError(err));
  }
}
