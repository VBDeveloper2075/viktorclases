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
    <article className="flex flex-col rounded-2xl bg-brand-surface p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden>
          {icons[icon] ?? "📚"}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
          <p className="text-sm text-brand-muted">{subtitle}</p>
        </div>
      </div>

      {teacherName && (
        <div className="mt-4 flex items-center gap-3">
          <div
            className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-white"
            style={{ boxShadow: `0 0 0 2px ${teacherColor ?? "#1A1A1B"}` }}
          >
            <Image
              src={teacherPhoto ?? "/teachers/default.svg"}
              alt={`Profe ${teacherName}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-[10px] text-brand-muted">A cargo</p>
            <p className="font-semibold text-brand-dark">{teacherName}</p>
          </div>
        </div>
      )}

      {priceLabel && (
        <p className="mt-3 text-sm font-medium text-brand-dark/80">{priceLabel}</p>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-5">
        <Link
          href={`/cursos/${slug}`}
          className="btn-brand-outline w-full py-2.5 text-center text-sm"
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
