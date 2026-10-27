import { PrismaClient, Role, MaterialType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const teachers = [
  { slug: "viktor", name: "Viktor", color: "#7b2cbf", email: "viktor@viktorclases.com" },
  { slug: "pablo", name: "Pablo", color: "#2563eb", email: "pablo@viktorclases.com" },
  { slug: "fabrizio", name: "Fabrizio", color: "#dc2626", email: "fabrizio@viktorclases.com" },
  { slug: "sylvina", name: "Sylvina", color: "#22d3ee", email: "sylvina@viktorclases.com" },
  { slug: "sergio", name: "Sergio", color: "#f59e0b", email: "sergio@viktorclases.com" },
];

const courses = [
  {
    slug: "analisis-1",
    title: "Análisis Matemático 1",
    subtitle: "Parciales y finales",
    description:
      "Curso integral para UTN, CBC y UBA XXI. Clases en vivo, apuntes y simulacros de parcial.",
    modality: "Virtual y presencial",
    priceLabel: "Consultar por WhatsApp",
    icon: "calculator",
  },
  {
    slug: "algebra",
    title: "Álgebra",
    subtitle: "Parciales e ingreso",
    description:
      "Matrices, sistemas lineales y preparación para ingreso. Ideal para complementar Análisis.",
    modality: "Virtual",
    priceLabel: "Desde $XX / mes",
    icon: "shapes",
  },
  {
    slug: "clases-grabadas",
    title: "Clases grabadas",
    subtitle: "Estudiá a tu ritmo",
    description:
      "Acceso a biblioteca de clases por tema. Perfecto para repasar antes del parcial.",
    modality: "On demand",
    priceLabel: "Packs por materia",
    icon: "play",
  },
  {
    slug: "particulares",
    title: "Clases particulares",
    subtitle: "Consultá disponibilidad",
    description:
      "Clases 1 a 1 con el profe que elijas. Plan personalizado según tu carrera.",
    modality: "Virtual / presencial",
    priceLabel: "Por hora",
    icon: "chat",
  },
];

function date(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}

async function main() {
  const passwordHash = await bcrypt.hash("viktor123", 10);

  await prisma.enrollment.deleteMany();
  await prisma.material.deleteMany();
  await prisma.scheduleEntry.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacherProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.testimonial.deleteMany();

  const teacherProfiles: Record<string, string> = {};

  for (const t of teachers) {
    const user = await prisma.user.create({
      data: {
        email: t.email,
        name: t.name,
        passwordHash,
        role: Role.TEACHER,
        teacherProfile: {
          create: {
            slug: t.slug,
            color: t.color,
            bio: `${t.name} es docente de matemática con experiencia en ingreso universitario.`,
            photoUrl: `/teachers/${t.slug}.svg`,
          },
        },
      },
      include: { teacherProfile: true },
    });
    teacherProfiles[t.slug] = user.teacherProfile!.id;
  }

  const student = await prisma.user.create({
    data: {
      email: "alumno@viktorclases.com",
      name: "Alumno Demo",
      passwordHash,
      role: Role.STUDENT,
    },
  });

  const courseRecords: Record<string, string> = {};
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i];
    const teacherSlug = teachers[i % teachers.length].slug;
    const course = await prisma.course.create({
      data: {
        ...c,
        teacherId: teacherProfiles[teacherSlug],
      },
    });
    courseRecords[c.slug] = course.id;
  }

  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: courseRecords["analisis-1"],
    },
  });

  const scheduleRows: {
    day: number;
    topic: string;
    slot: string;
    teacher: string;
    holiday?: boolean;
  }[] = [
    { day: 2, topic: "Conjuntos Numéricos", slot: "19:30 a 21:00", teacher: "viktor" },
    { day: 3, topic: "Geometría SIN Trig.", slot: "19:30 a 21:00", teacher: "pablo" },
    { day: 6, topic: "Geometría 3D", slot: "19:30 a 21:00", teacher: "fabrizio" },
    { day: 7, topic: "Función Lineal + Cuadrática", slot: "21:10 a 22:40", teacher: "sylvina" },
    { day: 8, topic: "Polinomios", slot: "19:30 a 21:00", teacher: "sergio" },
    { day: 9, topic: "SEL", slot: "21:10 a 22:40", teacher: "viktor" },
    { day: 10, topic: "Función Exp / Log", slot: "19:30 a 21:00", teacher: "pablo" },
    { day: 12, topic: "FERIADO", slot: "", teacher: "viktor", holiday: true },
    { day: 13, topic: "Trigonometría", slot: "19:30 a 21:00", teacher: "fabrizio" },
    { day: 14, topic: "Vectores", slot: "21:10 a 22:40", teacher: "sylvina" },
    { day: 15, topic: "Estática", slot: "19:30 a 21:00", teacher: "sergio" },
  ];

  for (const row of scheduleRows) {
    await prisma.scheduleEntry.create({
      data: {
        courseId: courseRecords["analisis-1"],
        teacherId: row.holiday ? null : teacherProfiles[row.teacher],
        date: date(2025, 10, row.day),
        topic: row.topic,
        timeSlot: row.slot || "—",
        isHoliday: row.holiday ?? false,
      },
    });
  }

  await prisma.material.createMany({
    data: [
      {
        courseId: courseRecords["analisis-1"],
        teacherId: teacherProfiles.viktor,
        topic: "Conjuntos Numéricos",
        title: "Apunte — Conjuntos",
        type: MaterialType.APUNTE,
        url: "/materiales/apunte-conjuntos.pdf",
      },
      {
        courseId: courseRecords["analisis-1"],
        teacherId: teacherProfiles.pablo,
        topic: "Geometría SIN Trig.",
        title: "Clase grabada — Geometría plana",
        type: MaterialType.VIDEO,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        courseId: courseRecords["clases-grabadas"],
        teacherId: teacherProfiles.sergio,
        topic: "Polinomios",
        title: "Video — Factorización",
        type: MaterialType.VIDEO,
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Lucía M.",
        course: "Análisis 1 — UTN",
        text: "Aprobé el parcial de límites gracias a las clases de Viktor. Muy claras y con muchos ejercicios.",
        rating: 5,
      },
      {
        name: "Tomás R.",
        course: "Álgebra — CBC",
        text: "La grilla de horarios me organizó la semana. Los apuntes están buenísimos para repasar.",
        rating: 5,
      },
      {
        name: "Camila S.",
        course: "Clases grabadas",
        text: "Pude estudiar a mi ritmo antes del final. Recomiendo el pack de trigonometría.",
        rating: 5,
      },
    ],
  });

  console.log("Seed OK");
  console.log("Profes (pass: viktor123):", teachers.map((t) => t.email).join(", "));
  console.log("Alumno demo: alumno@viktorclases.com / viktor123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
