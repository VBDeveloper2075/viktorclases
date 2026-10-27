"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/alumno");

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  const redirectTo =
    user?.role === Role.TEACHER || user?.role === Role.ADMIN
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

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) redirect("/registro?error=exists");

  const role = roleRaw === "TEACHER" ? Role.TEACHER : Role.STUDENT;
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
      ...(role === Role.TEACHER
        ? {
            teacherProfile: {
              create: {
                slug: email.split("@")[0].replace(/[^a-z0-9]/gi, "-").toLowerCase(),
                color: "#2563eb",
                bio: "Docente de viktorclases",
                photoUrl: "/teachers/default.svg",
              },
            },
          }
        : {}),
    },
  });

  redirect("/login?registered=1");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
