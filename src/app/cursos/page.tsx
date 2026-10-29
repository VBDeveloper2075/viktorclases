import { getCoursesWithTeachers } from "@/lib/data/repository";
import { CourseCard } from "@/components/CourseCard";

export const metadata = { title: "Cursos" };

export default async function CursosPage() {
  const courses = await getCoursesWithTeachers();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-[#1a3568]">Cursos y modalidades</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Catálogo con datos de demostración. Estudiá con cada profe desde el botón amarillo.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {courses.map((c) => (
          <CourseCard
            key={c.slug}
            slug={c.slug}
            title={c.title}
            subtitle={c.subtitle}
            icon={c.icon}
            priceLabel={c.priceLabel}
            teacherSlug={c.teacher?.slug ?? c.teacherSlug}
            teacherName={c.teacher?.name}
            teacherPhoto={c.teacher?.photoUrl}
            teacherColor={c.teacher?.color}
          />
        ))}
      </div>
    </div>
  );
}
