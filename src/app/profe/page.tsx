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
      <h1 className="heading-display text-2xl text-brand-dark">Panel docente</h1>
      <p className="mt-1 text-brand-muted">Vista demo (datos estáticos)</p>

      {teacher && (
        <div className="mt-6 flex items-center gap-4 rounded-2xl bg-brand-surface p-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-lime/50">
            <Image
              src={teacher.photoUrl ?? "/teachers/default.svg"}
              alt={teacher.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-brand-dark">{teacher.name}</p>
            <p className="text-sm text-brand-muted">{teacher.bio}</p>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-brand-muted/40 p-5 text-sm text-brand-muted">
          Publicación de materiales desactivada hasta reconectar la base de datos.
        </div>

        <div>
          <h3 className="font-bold text-brand-dark">Materiales (demo)</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {materials.map((m, i) => (
              <li key={`${m.title}-${i}`} className="rounded-lg border border-black/5 bg-white px-3 py-2">
                {m.title} · {m.kind}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-bold text-brand-dark">Próximas clases</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            {mySchedules.map((s, i) => (
              <li key={`${s.date.toISOString()}-${i}`}>
                {s.date.toLocaleDateString("es-AR")} — {s.topic}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-brand-muted/80">
            {courses.length} cursos en catálogo demo.
          </p>
        </div>
      </div>
    </div>
  );
}
