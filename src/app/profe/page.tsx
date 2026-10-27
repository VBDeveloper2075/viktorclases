import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MaterialUploadForm } from "@/components/MaterialUploadForm";
import Image from "next/image";

export const metadata = { title: "Panel docente" };

export default async function ProfePage() {
  const session = await auth();
  if (!session?.user) return null;

  const teacher = await prisma.teacherProfile.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      materials: { orderBy: { createdAt: "desc" }, take: 10, include: { course: true } },
      schedules: {
        orderBy: { date: "asc" },
        take: 10,
        include: { course: true },
      },
    },
  });

  const courses = await prisma.course.findMany({ orderBy: { title: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-2xl font-bold text-[#1a3568]">Panel docente</h1>
      <p className="mt-1 text-slate-600">{session.user.name}</p>

      {teacher && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#eef1f6] p-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={teacher.photoUrl ?? "/teachers/default.svg"}
              alt={teacher.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-slate-500">Tu perfil en el curso</p>
            <p className="font-semibold text-[#1a3568]">{teacher.bio}</p>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <MaterialUploadForm courses={courses.map((c) => ({ id: c.id, title: c.title }))} />

        <div>
          <h3 className="font-semibold text-[#1a3568]">Tus publicaciones recientes</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {(teacher?.materials ?? []).map((m) => (
              <li key={m.id} className="rounded-lg border border-slate-200 px-3 py-2">
                {m.title} · {m.course.title}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-semibold text-[#1a3568]">Próximas clases asignadas</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {(teacher?.schedules ?? []).map((s) => (
              <li key={s.id}>
                {s.date.toLocaleDateString("es-AR")} — {s.topic} ({s.course.title})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
