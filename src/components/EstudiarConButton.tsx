import Link from "next/link";

type EstudiarConButtonProps = {
  teacherSlug: string;
  teacherName: string;
  className?: string;
};

export function EstudiarConButton({
  teacherSlug,
  teacherName,
  className = "",
}: EstudiarConButtonProps) {
  return (
    <Link
      href={`/estudiar/${teacherSlug}`}
      className={`inline-flex w-full items-center justify-center rounded-xl bg-[#f5c518] px-5 py-3 text-sm font-bold text-[#1a3568] shadow-sm transition hover:bg-[#e0b010] ${className}`}
    >
      Estudiar con {teacherName}
    </Link>
  );
}
