import { auth } from "@/auth";
import {
  getCourseBySlug,
  getEnrollmentsForEmail,
  getMaterials,
  getScheduleEntries,
} from "@/lib/sheets/repository";
import Link from "next/link";

export const metadata = { title: "Panel alumno" };

export default async function AlumnoPage() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const enrollments = await getEnrollmentsForEmail(session.user.email);

  const courses = await Promise.all(
    enrollments.map(async (e) => {
      const course = await getCourseBySlug(e.courseSlug);
      if (!course) return null;
      const [materials, schedules] = await Promise.all([
        getMaterials({ courseSlug: e.courseSlug }),
        getScheduleEntries(e.courseSlug),
      ]);
      return { course, materials, schedules: schedules.slice(0, 5) };
    }),
  );

  const valid = courses.filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-2xl font-bold text-[#1a3568]">
        Hola, {session.user.name}
      </h1>
      <p className="mt-1 text-slate-600">Tus cursos (pestaña Inscripciones en Sheets)</p>

      {valid.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-[#eef1f6] p-8 text-center">
          <p className="text-slate-700">No hay inscripciones para tu email en la planilla.</p>
          <Link
            href="/cursos"
            className="mt-4 inline-block rounded-xl bg-[#1a3568] px-5 py-2 text-sm font-semibold text-white"
          >
            Ver cursos
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {valid.map((item) =>
            item ? (
              <section key={item.course.slug} className="rounded-2xl border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-[#1a3568]">{item.course.title}</h2>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Apuntes y videos
                </h3>
                <ul className="mt-3 space-y-2">
                  {item.materials.map((m, i) => (
                    <li key={`${m.title}-${i}`}>
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm hover:bg-slate-100"
                      >
                        <span>
                          {m.title} <span className="text-slate-500">({m.topic})</span>
                        </span>
                        <span className="text-xs font-medium uppercase text-[#1a3568]">
                          {m.type === "VIDEO" ? "Ver" : "Abrir"}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Próximas clases
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {item.schedules.map((s, i) => (
                    <li key={`${s.date.toISOString()}-${i}`}>
                      {s.date.toLocaleDateString("es-AR")} — {s.topic} ({s.timeSlot})
                    </li>
                  ))}
                </ul>
              </section>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
