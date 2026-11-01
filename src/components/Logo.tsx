import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Proporción real del logo: 1892 x 678
const heights = {
  sm: "h-12",
  md: "h-14 md:h-[4.5rem]",
  lg: "h-32 sm:h-40 md:h-52",
} as const;

export function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="VIKTORCLASES — Matemática y Física"
      className={`inline-flex shrink-0 ${className}`}
    >
      <Image
        src="/logo-viktorclases.png"
        alt="VIKTORCLASES — Matemática y Física"
        width={1892}
        height={678}
        priority
        sizes="(min-width: 768px) 480px, 240px"
        className={`w-auto ${heights[size]}`}
      />
    </Link>
  );
}
