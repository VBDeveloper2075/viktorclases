import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  className?: string;
};

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/logo-viktorclases.jpg"
        alt="VIKTORCLASES — Matemática y Física"
        width={compact ? 140 : 200}
        height={compact ? 48 : 68}
        className={`h-auto w-auto ${compact ? "max-h-10" : "max-h-14 md:max-h-16"}`}
        priority
      />
    </Link>
  );
}
