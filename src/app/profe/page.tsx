import { auth } from "@/auth";
import {
  getCourses,
  getMaterials,
  getScheduleEntries,
  getTeachers,
} from "@/lib/sheets/repository";
import { MaterialUploadForm } from "@/components/MaterialUploadForm";
import Image from "next/image";

export const metadata = { title: "Panel docente" };

export default async function ProfePage() {
  const session = await auth();
  if (!session?.user) return null;

  const teacherSlug = session.user.teacherSlug ?? "";
  const [courses, teachers, materials, schedules] = await Promise.all([
    getCourses(),
    getTeachers(),
    getMaterials({ teacherSlug, publishedOnly: false }),
    getScheduleEntries(),
  ]);

  const teacher = teachers.find((t) => t.slug === teacherSlug);
  const mySchedules = schedules
    .filter((s) => s.teacherSlug === teacherSlug)
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-2xl font-bold text-[#1a3568]">Panel docente</h1>
      <p className="mt-1 text-slate-600">{session.user.name}</p>

      {teacher && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#eef1f6] p-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            <Image
              src={teacher.photoUrl ?? "/teachers/default.svg"}
              alt={teacher.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm text-slate-500">Perfil en la pestaña Profes</p>
            <p className="font-semibold text-[#1a3568]">{teacher.bio}</p>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <MaterialUploadForm
          courses={courses.map((c) => ({ slug: c.slug, title: c.title }))}
          teacherSlug={teacherSlug}
        />

        <div>
          <h3 className="font-semibold text-[#1a3568]">Tus materiales (planilla)</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {materials.slice(0, 10).map((m, i) => (
              <li key={`${m.title}-${i}`} className="rounded-lg border border-slate-200 px-3 py-2">
                {m.title} · {m.courseSlug}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-semibold text-[#1a3568]">Próximas clases</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {mySchedules.map((s, i) => (
              <li key={`${s.date.toISOString()}-${i}`}>
                {s.date.toLocaleDateString("es-AR")} — {s.topic} ({s.courseTitle})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
