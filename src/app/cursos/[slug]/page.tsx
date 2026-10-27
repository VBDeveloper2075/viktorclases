import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { courseInquiryMessage } from "@/lib/whatsapp";
import Link from "next/link";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  return { title: course?.title ?? "Curso" };
}

export default async function CursoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      teacher: { include: { user: true } },
      materials: { where: { published: true }, orderBy: { topic: "asc" } },
      schedules: { orderBy: { date: "asc" }, take: 8 },
    },
  });

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <Link href="/cursos" className="text-sm text-[#1a3568] hover:underline">
        ← Volver a cursos
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-[#1a3568]">{course.title}</h1>
          <p className="mt-2 text-lg text-slate-600">{course.subtitle}</p>
          <p className="mt-4 text-slate-700">{course.description}</p>
          <p className="mt-2 text-sm font-medium text-slate-600">
            Modalidad: {course.modality}
            {course.priceLabel ? ` · ${course.priceLabel}` : ""}
          </p>
          <div className="mt-6">
            <WhatsAppButton message={courseInquiryMessage(course.title)} />
          </div>

          <h2 className="mt-10 text-xl font-bold text-[#1a3568]">Materiales publicados</h2>
          {course.materials.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">Próximamente apuntes y videos.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {course.materials.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm"
                >
                  <span>
                    <span className="font-medium">{m.title}</span>
                    <span className="text-slate-500"> · {m.topic}</span>
                  </span>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs uppercase">
                    {m.type === "VIDEO" ? "Video" : "Apunte"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="rounded-2xl bg-[#eef1f6] p-6">
          {course.teacher && (
            <>
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-white">
                <Image
                  src={course.teacher.photoUrl ?? "/teachers/default.svg"}
                  alt={course.teacher.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-center text-xl font-bold text-[#1a3568]">
                {course.teacher.user.name}
              </h3>
              <p className="mt-2 text-center text-sm text-slate-600">
                {course.teacher.bio}
              </p>
            </>
          )}
          <h4 className="mt-8 font-semibold text-[#1a3568]">Próximas clases</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {course.schedules.map((s) => (
              <li key={s.id} className="rounded-lg bg-white px-3 py-2">
                {s.isHoliday ? (
                  <span className="font-medium text-slate-500">{s.topic}</span>
                ) : (
                  <>
                    <span className="font-medium">
                      {s.date.toLocaleDateString("es-AR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-slate-600"> · {s.topic}</span>
                    <span className="block text-xs text-slate-500">{s.timeSlot}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/horarios"
            className="mt-4 block text-center text-sm font-semibold text-[#1a3568] hover:underline"
          >
            Grilla completa
          </Link>
        </aside>
      </div>
    </div>
  );
}
