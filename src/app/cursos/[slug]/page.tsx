import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getCourseBySlug,
  getMaterials,
  getScheduleEntries,
} from "@/lib/data/repository";
import { EstudiarConButton } from "@/components/EstudiarConButton";
import Link from "next/link";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return { title: course?.title ?? "Curso" };
}

export default async function CursoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const teacherSlug = course.teacher?.slug ?? course.teacherSlug;
  const teacherName = course.teacher?.name;

  const [materials, schedules] = await Promise.all([
    getMaterials({ courseSlug: slug }),
    getScheduleEntries(slug),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Link href="/cursos" className="text-sm font-medium text-brand-green hover:underline">
        ← Volver a cursos
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="heading-display text-3xl text-brand-dark">{course.title}</h1>
          <p className="mt-2 text-lg text-brand-muted">{course.subtitle}</p>
          <p className="mt-4 text-brand-dark/90">{course.description}</p>
          <p className="mt-2 text-sm font-medium text-brand-muted">
            Modalidad: {course.modality}
            {course.priceLabel ? ` · ${course.priceLabel}` : ""}
          </p>
          {teacherSlug && teacherName && (
            <div className="mt-6 max-w-sm">
              <EstudiarConButton teacherSlug={teacherSlug} teacherName={teacherName} />
            </div>
          )}

          <h2 className="mt-10 text-xl font-bold text-brand-dark">Contenido del curso</h2>
          {materials.length === 0 ? (
            <p className="mt-2 text-sm text-brand-muted">Próximamente más materiales.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {materials.map((m, i) => (
                <li
                  key={m.id ?? `${m.title}-${i}`}
                  className="flex items-center justify-between rounded-lg border border-black/5 bg-brand-surface px-4 py-3 text-sm"
                >
                  <span>
                    <span className="font-medium text-brand-dark">{m.title}</span>
                    <span className="text-brand-muted"> · {m.topic}</span>
                  </span>
                  <span className="rounded bg-brand-lime/30 px-2 py-0.5 text-xs font-semibold uppercase text-brand-green">
                    {m.kind}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="rounded-2xl bg-brand-surface p-6 ring-1 ring-black/5">
          {course.teacher && (
            <>
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-white">
                <Image
                  src={course.teacher.photoUrl ?? "/teachers/default.svg"}
                  alt={course.teacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-center text-xl font-bold text-brand-dark">
                {course.teacher.name}
              </h3>
              <p className="mt-2 text-center text-sm text-brand-muted">
                {course.teacher.bio}
              </p>
              <div className="mt-4">
                <EstudiarConButton
                  teacherSlug={course.teacher.slug}
                  teacherName={course.teacher.name}
                />
              </div>
            </>
          )}
          <h4 className="mt-8 font-semibold text-brand-dark">Próximas clases</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {schedules.slice(0, 8).map((s, i) => (
              <li key={`${s.date.toISOString()}-${i}`} className="rounded-lg bg-white px-3 py-2">
                {s.isHoliday ? (
                  <span className="font-medium text-brand-muted">{s.topic}</span>
                ) : (
                  <>
                    <span className="font-medium text-brand-dark">
                      {s.date.toLocaleDateString("es-AR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-brand-muted"> · {s.topic}</span>
                    <span className="block text-xs text-brand-muted">{s.timeSlot}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
