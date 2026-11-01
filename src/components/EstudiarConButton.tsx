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
      className={`btn-brand w-full px-5 py-3 text-sm shadow-sm ${className}`}
    >
      Estudiar con {teacherName}
    </Link>
  );
}
