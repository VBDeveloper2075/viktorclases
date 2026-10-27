"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import {
  findUserByEmail,
  registerUserInSheet,
} from "@/lib/sheets/repository";
import type { UserRole } from "@/lib/sheets/types";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/alumno");

  const user = await findUserByEmail(email.toLowerCase());
  const redirectTo =
    user?.role === "TEACHER" || user?.role === "ADMIN"
      ? callbackUrl.startsWith("/profe")
        ? callbackUrl
        : "/profe"
      : callbackUrl;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/login?error=credentials&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }
    throw error;
  }
}

export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const roleRaw = String(formData.get("role") ?? "STUDENT");

  if (!name || !email || password.length < 6) {
    redirect("/registro?error=invalid");
  }

  const exists = await findUserByEmail(email);
  if (exists) redirect("/registro?error=exists");

  const role: UserRole = roleRaw === "TEACHER" ? "TEACHER" : "STUDENT";
  const teacherSlug =
    role === "TEACHER"
      ? email.split("@")[0].replace(/[^a-z0-9]/gi, "-").toLowerCase()
      : "";

  const ok = await registerUserInSheet({
    email,
    password,
    name,
    role,
    teacherSlug,
  });

  if (!ok) redirect("/registro?error=sheet");

  redirect("/login?registered=1");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
