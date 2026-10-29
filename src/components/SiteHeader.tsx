import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "/cursos", label: "Cursos" },
  { href: "/horarios", label: "Horarios" },
  { href: "/#metodologia", label: "Metodología" },
  { href: "/#testimonios", label: "Opiniones" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a3568]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Logo variant="light" />
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/90 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#f5c518]">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/alumno"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
          >
            Mi panel
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-[#f5c518] px-4 py-2 text-sm font-semibold text-[#1a3568] hover:bg-[#e0b010]"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  );
}
