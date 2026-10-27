import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MaterialType } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  courseId: z.string(),
  topic: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["APUNTE", "VIDEO"]),
  url: z.string().url().or(z.string().startsWith("/")),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const teacher = await prisma.teacherProfile.findFirst({
    where: { userId: session.user.id },
  });

  const material = await prisma.material.create({
    data: {
      ...parsed.data,
      type: parsed.data.type as MaterialType,
      teacherId: teacher?.id,
    },
  });

  return NextResponse.json(material);
}
