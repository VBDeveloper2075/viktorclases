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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="h-1 bg-brand-gradient-x" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <Logo size="md" />
        <nav className="hidden items-center gap-7 text-sm font-semibold text-brand-dark md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-brand-green"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/alumno"
            className="hidden rounded-full px-3 py-1.5 text-sm font-semibold text-brand-dark hover:bg-brand-surface sm:inline-block"
          >
            Mi panel
          </Link>
          <Link href="/login" className="btn-brand px-4 py-2 text-sm">
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  );
}
