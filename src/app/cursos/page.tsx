import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";

export const metadata = { title: "Cursos" };

export default async function CursosPage() {
  const courses = await prisma.course.findMany({
    include: { teacher: { include: { user: true } } },
    orderBy: { title: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <h1 className="text-3xl font-bold text-[#1a3568]">Cursos y modalidades</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Precios orientativos y botón de WhatsApp con el curso ya seleccionado para
        reducir consultas repetidas.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            slug={c.slug}
            title={c.title}
            subtitle={c.subtitle}
            icon={c.icon}
            priceLabel={c.priceLabel}
            teacherName={c.teacher?.user.name}
            teacherPhoto={c.teacher?.photoUrl}
            teacherColor={c.teacher?.color}
          />
        ))}
      </div>
    </div>
  );
}
