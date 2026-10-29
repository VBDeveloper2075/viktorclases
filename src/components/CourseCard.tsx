import Link from "next/link";
import Image from "next/image";
import { EstudiarConButton } from "./EstudiarConButton";

const icons: Record<string, string> = {
  calculator: "🧮",
  shapes: "📐",
  play: "▶️",
  chat: "💬",
};

type CourseCardProps = {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  priceLabel?: string | null;
  teacherSlug?: string | null;
  teacherName?: string | null;
  teacherPhoto?: string | null;
  teacherColor?: string | null;
};

export function CourseCard({
  slug,
  title,
  subtitle,
  icon,
  priceLabel,
  teacherSlug,
  teacherName,
  teacherPhoto,
  teacherColor,
}: CourseCardProps) {
  return (
    <article className="flex flex-col rounded-2xl bg-[#eef1f6] p-5 shadow-sm ring-1 ring-slate-200/60">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {icons[icon] ?? "📚"}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#1a3568]">{title}</h3>
          <p className="text-sm text-slate-600">{subtitle}</p>
        </div>
      </div>

      {teacherName && (
        <div className="mt-4 flex items-center gap-3">
          <div
            className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white"
            style={{ boxShadow: `0 0 0 2px ${teacherColor ?? "#1a3568"}` }}
          >
            <Image
              src={teacherPhoto ?? "/teachers/default.svg"}
              alt={`Profe ${teacherName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">A cargo</p>
            <p className="font-semibold text-[#1a3568]">{teacherName}</p>
          </div>
        </div>
      )}

      {priceLabel && (
        <p className="mt-3 text-sm font-medium text-slate-700">{priceLabel}</p>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-5">
        <Link
          href={`/cursos/${slug}`}
          className="rounded-xl border border-[#1a3568]/20 bg-white py-2.5 text-center text-sm font-semibold text-[#1a3568] hover:bg-slate-50"
        >
          Ver detalle
        </Link>
        {teacherSlug && teacherName && (
          <EstudiarConButton teacherSlug={teacherSlug} teacherName={teacherName} />
        )}
      </div>
    </article>
  );
}
