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
      <h1 className="text-2xl font-bold text-[#1a3568]">Hola, alumno</h1>
      <p className="mt-1 text-slate-600">Elegí con quién querés estudiar hoy</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...teachersSeen.values()].map((t) => (
          <div key={t.slug} className="rounded-2xl border border-slate-200 bg-[#eef1f6] p-5">
            <EstudiarConButton teacherSlug={t.slug} teacherName={t.name} />
          </div>
        ))}
      </div>

      <Link
        href="/cursos"
        className="mt-8 inline-block text-sm font-semibold text-[#1a3568] hover:underline"
      >
        Ver todos los cursos →
      </Link>
    </div>
  );
}
