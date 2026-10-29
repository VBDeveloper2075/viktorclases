import {
  getCoursesWithTeachers,
  getMaterials,
  getScheduleEntries,
  getTeacherBySlug,
} from "@/lib/data/repository";
import Image from "next/image";

export const metadata = { title: "Panel docente" };

export default async function ProfePage() {
  const teacherSlug = "viktor";
  const teacher = await getTeacherBySlug(teacherSlug);
  const [courses, materials, schedules] = await Promise.all([
    getCoursesWithTeachers(),
    getMaterials({ teacherSlug }),
    getScheduleEntries(),
  ]);

  const mySchedules = schedules
    .filter((s) => s.teacherSlug === teacherSlug)
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-2xl font-bold text-[#1a3568]">Panel docente</h1>
      <p className="mt-1 text-slate-600">Vista demo (datos estáticos)</p>

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
            <p className="font-semibold text-[#1a3568]">{teacher.name}</p>
            <p className="text-sm text-slate-600">{teacher.bio}</p>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-500">
          Publicación de materiales desactivada hasta reconectar la base de datos.
        </div>

        <div>
          <h3 className="font-semibold text-[#1a3568]">Materiales (demo)</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {materials.map((m, i) => (
              <li key={`${m.title}-${i}`} className="rounded-lg border border-slate-200 px-3 py-2">
                {m.title} · {m.kind}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-semibold text-[#1a3568]">Próximas clases</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {mySchedules.map((s, i) => (
              <li key={`${s.date.toISOString()}-${i}`}>
                {s.date.toLocaleDateString("es-AR")} — {s.topic}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            {courses.length} cursos en catálogo demo.
          </p>
        </div>
      </div>
    </div>
  );
}
