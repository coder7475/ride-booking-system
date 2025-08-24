import AppError from "@/configs/AppError";
import { env } from "@/configs/envConfig";
import { Resend } from "resend";

import { logger } from "./logger";
import { renderTemplate } from "./renderTemplate";
import {
  otpHtmlTemplate,
  resetPasswordHtmlTemplate,
} from "./templates/otp.html";

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
}: SendEmailOptions) => {
  try {
    let htmlContent = "";

    // Only one template for now, but you can add more templates here
    if (templateName === "otp") {
      htmlContent = renderTemplate(otpHtmlTemplate, templateData);
    } else if (templateName === "resetPassword") {
      htmlContent = renderTemplate(resetPasswordHtmlTemplate, templateData);
    } else {
      throw new AppError(400, "Unknown email template");
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const info = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log(info);

    logger.info(`\u2709\uFE0F Email sent to ${to}`);
  } catch (error: any) {
    logger.info("email sending error", error.message);
    console.log(error);
    throw new AppError(401, "Email error");
  }
};
