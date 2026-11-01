import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeacherBySlug } from "@/lib/data/repository";
import { MATERIAL_KIND_LABELS } from "@/lib/data/types";

type PageProps = { params: Promise<{ teacherSlug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { teacherSlug } = await params;
  const teacher = await getTeacherBySlug(teacherSlug);
  return { title: teacher ? `Estudiar con ${teacher.name}` : "Estudiar" };
}

export default async function EstudiarHubPage({ params }: PageProps) {
  const { teacherSlug } = await params;
  const teacher = await getTeacherBySlug(teacherSlug);
  if (!teacher) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link href="/cursos" className="text-sm font-medium text-brand-green hover:underline">
        ← Cursos
      </Link>

      <div className="mt-6 flex flex-col items-center text-center">
        <div
          className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-brand-lime/40"
          style={{ boxShadow: `0 0 0 3px ${teacher.color}` }}
        >
          <Image
            src={teacher.photoUrl}
            alt={teacher.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="heading-display mt-4 text-3xl text-brand-dark">
          Estudiar con {teacher.name}
        </h1>
        <p className="mt-2 max-w-md text-brand-muted">{teacher.bio}</p>
      </div>

      <p className="eyebrow mt-10 text-center text-brand-muted">
        Elegí qué querés ver
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {(Object.keys(MATERIAL_KIND_LABELS) as Array<keyof typeof MATERIAL_KIND_LABELS>).map(
          (kind) => {
            const meta = MATERIAL_KIND_LABELS[kind];
            return (
              <Link
                key={kind}
                href={`/estudiar/${teacherSlug}/${meta.path}`}
                className="flex flex-col rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm transition hover:border-brand-lime hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden>
                  {meta.emoji}
                </span>
                <span className="mt-3 text-lg font-bold text-brand-dark">
                  {meta.title}
                </span>
                <span className="mt-2 text-xs text-brand-muted">{meta.description}</span>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}
