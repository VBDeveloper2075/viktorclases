import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL ?? "#";

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <Logo variant="dark" />
          <p className="mt-3 text-sm text-slate-600">
            Clases de apoyo para ingreso y materias de primer año. UTN · CBC · UBA
            XXI.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#1a3568]">Enlaces</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/cursos" className="hover:text-[#1a3568]">
                Cursos y precios
              </Link>
            </li>
            <li>
              <Link href="/horarios" className="hover:text-[#1a3568]">
                Grilla de horarios
              </Link>
            </li>
            <li>
              <a href={youtube} target="_blank" rel="noreferrer" className="hover:text-[#1a3568]">
                Canal de YouTube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[#1a3568]">Contacto</h3>
          <p className="mt-3 text-sm text-slate-600">
            Consultas e inscripciones por WhatsApp desde cada curso.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © 2026 viktorclases
      </div>
    </footer>
  );
}
