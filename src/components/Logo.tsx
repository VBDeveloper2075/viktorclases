import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "light", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#1a3568]";

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5c518] text-xl font-bold text-black shadow-sm">
        Σ
      </span>
      <span className={`text-xl font-semibold tracking-tight lowercase ${textColor}`}>
        viktorclases
      </span>
    </Link>
  );
}
