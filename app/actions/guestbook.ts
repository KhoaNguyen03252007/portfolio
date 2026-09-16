"use server";

import { revalidatePath } from "next/cache";
import { getGuestbookEntries, insertGuestbookEntry } from "@/db";

export async function addGuestbookAction(prevState: any, formData: FormData) {
  const authorName = (formData.get("authorName") as string)?.trim();
  const role = (formData.get("role") as string)?.trim() || undefined;
  const message = (formData.get("message") as string)?.trim();
  const avatarColor = (formData.get("avatarColor") as string)?.trim() || "#06b6d4";

  if (!authorName || authorName.length < 2) {
    return { success: false, error: "Please enter your name (at least 2 characters)." };
  }

  if (!message || message.length < 5) {
    return { success: false, error: "Please enter a message (at least 5 characters)." };
  }

  try {
    const result = await insertGuestbookEntry({
      authorName,
      role,
      message,
      avatarColor,
    });

    revalidatePath("/");
    return {
      success: true,
      error: null,
      message: "Thank you for signing the guestbook!",
      isLiveDb: result.isLiveDb,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit entry." };
  }
}

export async function fetchGuestbookAction() {
  return await getGuestbookEntries();
}
