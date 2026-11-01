import Link from "next/link";
import { getCoursesWithTeachers } from "@/lib/data/repository";
import { EstudiarConButton } from "@/components/EstudiarConButton";

export const metadata = { title: "Panel alumno" };

export default async function AlumnoPage() {
  const courses = await getCoursesWithTeachers();
  const teachersSeen = new Map<string, { slug: string; name: string }>();

  for (const c of courses) {
    if (c.teacher) {
      teachersSeen.set(c.teacher.slug, { slug: c.teacher.slug, name: c.teacher.name });
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="heading-display text-2xl text-brand-dark">Hola, alumno</h1>
      <p className="mt-1 text-brand-muted">Elegí con quién querés estudiar hoy</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...teachersSeen.values()].map((t) => (
          <div key={t.slug} className="rounded-2xl border border-black/5 bg-brand-surface p-5">
            <EstudiarConButton teacherSlug={t.slug} teacherName={t.name} />
          </div>
        ))}
      </div>

      <Link
        href="/cursos"
        className="mt-8 inline-block text-sm font-semibold text-brand-green hover:underline"
      >
        Ver todos los cursos →
      </Link>
    </div>
  );
}
