import Link from "next/link";
import { notFound } from "next/navigation";
import { getMaterials, getTeacherBySlug } from "@/lib/data/repository";
import { MATERIAL_KIND_LABELS, type MaterialKind } from "@/lib/data/types";

type PageProps = {
  params: Promise<{ teacherSlug: string; section: string }>;
};

const sectionToKind: Record<string, MaterialKind> = {
  videos: "video",
  apuntes: "apunte",
  ejercitacion: "ejercitacion",
};

export async function generateMetadata({ params }: PageProps) {
  const { teacherSlug, section } = await params;
  const teacher = await getTeacherBySlug(teacherSlug);
  const kind = sectionToKind[section];
  const label = kind ? MATERIAL_KIND_LABELS[kind].title : "Material";
  return { title: teacher ? `${label} — ${teacher.name}` : label };
}

export default async function EstudiarSectionPage({ params }: PageProps) {
  const { teacherSlug, section } = await params;
  const kind = sectionToKind[section];
  if (!kind) notFound();

  const teacher = await getTeacherBySlug(teacherSlug);
  if (!teacher) notFound();

  const materials = await getMaterials({ teacherSlug, kind });
  const meta = MATERIAL_KIND_LABELS[kind];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link
        href={`/estudiar/${teacherSlug}`}
        className="text-sm text-[#1a3568] hover:underline"
      >
        ← Estudiar con {teacher.name}
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-[#1a3568]">
        {meta.title} · {teacher.name}
      </h1>
      <p className="mt-1 text-slate-600">{meta.description}</p>

      {materials.length === 0 ? (
        <p className="mt-10 rounded-xl bg-[#eef1f6] p-6 text-center text-slate-600">
          Todavía no hay {meta.title.toLowerCase()} publicados para este profe.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {materials.map((m, i) => (
            <li key={m.id ?? `${m.title}-${i}`}>
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:border-[#1a3568]/30"
              >
                <span className="font-semibold text-[#1a3568]">{m.title}</span>
                {m.topic && (
                  <span className="mt-1 block text-sm text-slate-500">{m.topic}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
