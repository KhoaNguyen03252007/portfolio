"use server";

import { insertContactMessage } from "@/db";

export async function sendContactMessageAction(prevState: any, formData: FormData) {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim() || undefined;
  const message = (formData.get("message") as string)?.trim();

  if (!name || name.length < 2) {
    return { success: false, error: "Please enter your name." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  if (!message || message.length < 10) {
    return { success: false, error: "Your message must be at least 10 characters long." };
  }

  try {
    const result = await insertContactMessage({
      name,
      email,
      subject,
      message,
    });

    return {
      success: true,
      error: null,
      message: "Your message has been sent successfully! Khoa will get back to you shortly.",
      isLiveDb: result.isLiveDb,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to deliver message." };
  }
}
