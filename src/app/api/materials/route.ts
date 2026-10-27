import { auth } from "@/auth";
import { appendMaterialToSheet } from "@/lib/sheets/repository";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  courseSlug: z.string(),
  topic: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["APUNTE", "VIDEO"]),
  url: z.string().min(1),
  teacherSlug: z.string().optional(),
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

  const ok = await appendMaterialToSheet({
    ...parsed.data,
    published: true,
    teacherSlug: parsed.data.teacherSlug ?? session.user.teacherSlug ?? "",
  });

  if (!ok) {
    return NextResponse.json(
      {
        error:
          "No se pudo escribir en Sheets. Configurá la cuenta de servicio o cargá el material en la planilla.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
