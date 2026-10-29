"use server";

import { redirect } from "next/navigation";

/** Auth deshabilitado temporalmente: solo redirecciones para probar el front en Vercel. */

export async function loginAction(formData: FormData) {
  const callbackUrl = String(formData.get("callbackUrl") ?? "/alumno");
  redirect(callbackUrl.startsWith("/profe") ? "/profe" : callbackUrl);
}

export async function registerAction() {
  redirect("/login?registered=1");
}

export async function signOutAction() {
  redirect("/");
}
