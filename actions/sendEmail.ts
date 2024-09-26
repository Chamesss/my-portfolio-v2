"use server";

import { getErrorMessage } from "@/helpers/get-error-message";
import { validateString } from "@/helpers/validate-string";
import { Resend } from "resend";
import ContactFromEmail from "@/email/contact-form-email";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  if (!validateString(senderEmail, 500)) {
    return {
      error: "Invalid sender email",
    };
  }
  if (!validateString(message, 5000)) {
    return {
      error: "Invalid sender email",
    };
  }

  let data;

  try {
    data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "chamsedin.azouz@gmail.com",
      subject: "Message from your portfolio site",
      reply_to: senderEmail as string,
      react: React.createElement(ContactFromEmail, {
        message: message as string,
        senderEmail: senderEmail as string,
      }),
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  return { data };
};
