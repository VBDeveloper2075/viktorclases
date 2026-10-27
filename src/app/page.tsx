import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CourseCard } from "@/components/CourseCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function HomePage() {
  const [courses, testimonials] = await Promise.all([
    prisma.course.findMany({
      where: { featured: true },
      include: { teacher: { include: { user: true } } },
      orderBy: { title: "asc" },
    }),
    prisma.testimonial.findMany({ where: { visible: true }, take: 3 }),
  ]);

  const youtube = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL ?? "#";

  return (
    <>
      <section className="bg-[#1a3568] px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#f5c518]">
            Ingreso universitario
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Aprobá matemática con confianza
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Clases grupales y virtuales · UTN · CBC · UBA XXI
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cursos"
              className="rounded-xl bg-[#f5c518] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#1a3568] hover:bg-[#e0b010]"
            >
              Ver cursos disponibles
            </Link>
            <WhatsAppButton
              message="Hola ViktorClases, quiero info sobre los cursos disponibles."
              label="Escribinos por WhatsApp"
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      <section id="cursos" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="text-2xl font-bold text-[#1a3568]">Elegí tu curso</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Toda la oferta en un solo lugar: horarios, temas, apuntes y contacto
          directo con el profe.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              slug={c.slug}
              title={c.title}
              subtitle={c.subtitle}
              icon={c.icon}
              priceLabel={c.priceLabel}
              teacherName={c.teacher?.user.name}
              teacherPhoto={c.teacher?.photoUrl}
              teacherColor={c.teacher?.color}
            />
          ))}
        </div>
      </section>

      <section id="metodologia" className="bg-slate-50 px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a3568]">
              Cómo enseñamos
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>✓ Clases en vivo con pizarra y muchos ejercicios tipo parcial</li>
              <li>✓ Apuntes y videos organizados por tema</li>
              <li>✓ Grilla clara con franjas 19:30–21:00 y 21:10–22:40</li>
              <li>✓ Seguimiento por WhatsApp según el curso que elijas</li>
            </ul>
            <Link
              href="/horarios"
              className="mt-6 inline-block font-semibold text-[#1a3568] underline-offset-4 hover:underline"
            >
              Ver grilla de octubre →
            </Link>
          </div>
          <div className="rounded-2xl bg-[#1a3568] p-6 text-white">
            <h3 className="text-lg font-semibold">Canal de YouTube</h3>
            <p className="mt-2 text-sm text-white/80">
              Mostrá tu estilo de clase antes de inscribirte. Fragmentos y
              clases de muestra para generar confianza.
            </p>
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-xl bg-[#f5c518] px-4 py-2 text-sm font-bold text-[#1a3568]"
            >
              Ver canal
            </a>
            <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-black/30">
              <iframe
                title="ViktorClases YouTube"
                className="h-full w-full"
                src="https://www.youtube.com/embed/videoseries?list=UUplaceholder"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="text-2xl font-bold text-[#1a3568]">Lo que dicen los alumnos</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-700">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-[#1a3568]">
                {t.name}
                <span className="block font-normal text-slate-500">{t.course}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#eef1f6] px-4 py-12">
        <div className="mx-auto max-w-6xl text-center md:px-6">
          <h2 className="text-xl font-bold text-[#1a3568]">
            Próximo paso: clases grabadas y materiales premium
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">
            La plataforma está preparada para sumar venta de packs on-demand y
            descargables sin depender solo de WhatsApp.
          </p>
          <Link
            href="/registro"
            className="mt-6 inline-block rounded-xl bg-[#1a3568] px-6 py-3 text-sm font-semibold text-white"
          >
            Crear cuenta de alumno
          </Link>
        </div>
      </section>
    </>
  );
}
