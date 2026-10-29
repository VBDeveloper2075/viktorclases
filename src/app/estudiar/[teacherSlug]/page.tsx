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
      <Link href="/cursos" className="text-sm text-[#1a3568] hover:underline">
        ← Cursos
      </Link>

      <div className="mt-6 flex flex-col items-center text-center">
        <div
          className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white"
          style={{ boxShadow: `0 0 0 3px ${teacher.color}` }}
        >
          <Image
            src={teacher.photoUrl}
            alt={teacher.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-[#1a3568]">
          Estudiar con {teacher.name}
        </h1>
        <p className="mt-2 max-w-md text-slate-600">{teacher.bio}</p>
      </div>

      <p className="mt-10 text-center text-sm font-medium uppercase tracking-wide text-slate-500">
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
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-[#f5c518] hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden>
                  {meta.emoji}
                </span>
                <span className="mt-3 text-lg font-bold text-[#1a3568]">
                  {meta.title}
                </span>
                <span className="mt-2 text-xs text-slate-600">{meta.description}</span>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}
