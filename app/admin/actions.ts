"use server";

import { redirect } from "next/navigation";
import {
  endSession,
  isPasswordValid,
  LOGIN_PATH,
  startSession,
} from "@/lib/cms/auth";

export type LoginState = { error?: string };

export async function login(
  _previous: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!isPasswordValid(password)) {
    // A short pause makes guessing passwords slower without affecting real users.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password is not correct." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect(LOGIN_PATH);
}
