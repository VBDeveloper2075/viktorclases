import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL ?? "#";

  return (
    <footer className="mt-auto border-t border-brand-surface bg-brand-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <Logo size="md" />
          <p className="mt-4 text-sm text-brand-muted">
            Clases de apoyo para ingreso. UTN · CBC · UBA XXI.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-brand-dark">Enlaces</h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li>
              <Link href="/cursos" className="hover:text-brand-green">
                Cursos
              </Link>
            </li>
            <li>
              <Link href="/horarios" className="hover:text-brand-green">
                Horarios
              </Link>
            </li>
            <li>
              <a href={youtube} target="_blank" rel="noreferrer" className="hover:text-brand-green">
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-brand-dark">Plataforma</h3>
          <p className="mt-3 text-sm text-brand-muted">
            VIKTORCLASES en Vercel.
          </p>
        </div>
      </div>
      <div className="border-t border-black/5 py-4 text-center text-xs text-brand-muted">
        © 2026 VIKTORCLASES
      </div>
    </footer>
  );
}
