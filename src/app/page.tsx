import Link from "next/link";
import { getFeaturedCourses, getTestimonials } from "@/lib/data/repository";
import { CourseCard } from "@/components/CourseCard";

export default async function HomePage() {
  const [courses, testimonials] = await Promise.all([
    getFeaturedCourses(),
    getTestimonials(3),
  ]);

  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL ?? "#";

  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark px-4 py-16 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden
          style={{
            background:
              "linear-gradient(135deg, #A2D729 0%, transparent 40%, #2E7D32 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <p className="eyebrow text-brand-lime">Matemática y Física</p>
          <h1 className="heading-display mt-3 max-w-2xl text-4xl text-white md:text-5xl">
            Aprobá con la fuerza de estudiar bien
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Clases grupales y virtuales · UTN · CBC · UBA XXI
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cursos" className="btn-brand px-6 py-3.5 text-sm uppercase tracking-wide">
              Ver cursos disponibles
            </Link>
          </div>
        </div>
      </section>

      <section id="cursos" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="heading-display text-2xl text-brand-dark md:text-3xl">Elegí tu curso</h2>
        <p className="mt-2 max-w-2xl text-brand-muted">
          Entrá a estudiar con el profe de cada materia: videos, apuntes y ejercitación.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <CourseCard
              key={c.slug}
              slug={c.slug}
              title={c.title}
              subtitle={c.subtitle}
              icon={c.icon}
              priceLabel={c.priceLabel}
              teacherSlug={c.teacher?.slug ?? c.teacherSlug}
              teacherName={c.teacher?.name}
              teacherPhoto={c.teacher?.photoUrl}
              teacherColor={c.teacher?.color}
            />
          ))}
        </div>
      </section>

      <section id="metodologia" className="bg-brand-surface px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="heading-display text-2xl text-brand-dark">Cómo enseñamos</h2>
            <ul className="mt-4 space-y-3 text-brand-dark/90">
              <li>✓ Clases en vivo con pizarra y ejercicios tipo parcial</li>
              <li>✓ Apuntes, videos y guías en la plataforma</li>
              <li>✓ Grilla con franjas 19:30–21:00 y 21:10–22:40</li>
            </ul>
            <Link
              href="/horarios"
              className="mt-6 inline-block font-semibold text-brand-green hover:underline"
            >
              Ver grilla de horarios →
            </Link>
          </div>
          <div className="rounded-2xl bg-brand-dark p-6 text-white ring-1 ring-brand-lime/20">
            <h3 className="text-lg font-bold">Canal de YouTube</h3>
            <p className="mt-2 text-sm text-white/75">
              Fragmentos y clases de muestra para generar confianza.
            </p>
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer"
              className="btn-brand mt-4 px-4 py-2 text-sm"
            >
              Ver canal
            </a>
          </div>
        </div>
      </section>

      <section id="testimonios" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="heading-display text-2xl text-brand-dark">Lo que dicen los alumnos</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote
              key={`${t.name}-${i}`}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-brand-muted">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-brand-dark">
                {t.name}
                <span className="block font-normal text-brand-muted">{t.course}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
