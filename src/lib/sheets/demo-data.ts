import type {
  SheetCourse,
  SheetEnrollment,
  SheetMaterial,
  SheetScheduleEntry,
  SheetTeacher,
  SheetTestimonial,
  SheetUser,
} from "./types";

export const demoTeachers: SheetTeacher[] = [
  {
    slug: "viktor",
    name: "Viktor",
    color: "#7b2cbf",
    photoUrl: "/teachers/viktor.svg",
    bio: "Docente de matemática — ingreso universitario.",
  },
  {
    slug: "pablo",
    name: "Pablo",
    color: "#2563eb",
    photoUrl: "/teachers/pablo.svg",
    bio: "Geometría y funciones para CBC y UTN.",
  },
  {
    slug: "fabrizio",
    name: "Fabrizio",
    color: "#dc2626",
    photoUrl: "/teachers/fabrizio.svg",
    bio: "Trigonometría y temas de física estática.",
  },
  {
    slug: "sylvina",
    name: "Sylvina",
    color: "#22d3ee",
    photoUrl: "/teachers/sylvina.svg",
    bio: "Álgebra y sistemas lineales.",
  },
  {
    slug: "sergio",
    name: "Sergio",
    color: "#f59e0b",
    photoUrl: "/teachers/sergio.svg",
    bio: "Polinomios y repaso integral.",
  },
];

export const demoCourses: SheetCourse[] = [
  {
    slug: "analisis-1",
    title: "Análisis Matemático 1",
    subtitle: "Parciales y finales",
    description:
      "Curso integral para UTN, CBC y UBA XXI. Clases en vivo, apuntes y simulacros de parcial.",
    modality: "Virtual y presencial",
    priceLabel: "Consultar por WhatsApp",
    icon: "calculator",
    teacherSlug: "viktor",
    featured: true,
  },
  {
    slug: "algebra",
    title: "Álgebra",
    subtitle: "Parciales e ingreso",
    description:
      "Matrices, sistemas lineales y preparación para ingreso.",
    modality: "Virtual",
    priceLabel: "Desde consulta / mes",
    icon: "shapes",
    teacherSlug: "pablo",
    featured: true,
  },
  {
    slug: "clases-grabadas",
    title: "Clases grabadas",
    subtitle: "Estudiá a tu ritmo",
    description: "Biblioteca de clases por tema.",
    modality: "On demand",
    priceLabel: "Packs por materia",
    icon: "play",
    teacherSlug: "sergio",
    featured: true,
  },
  {
    slug: "particulares",
    title: "Clases particulares",
    subtitle: "Consultá disponibilidad",
    description: "Clases 1 a 1 con plan personalizado.",
    modality: "Virtual / presencial",
    priceLabel: "Por hora",
    icon: "chat",
    teacherSlug: "viktor",
    featured: true,
  },
];

export const demoSchedule: SheetScheduleEntry[] = [
  { courseSlug: "analisis-1", date: "2025-10-02", topic: "Conjuntos Numéricos", timeSlot: "19:30 a 21:00", teacherSlug: "viktor", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-03", topic: "Geometría SIN Trig.", timeSlot: "19:30 a 21:00", teacherSlug: "pablo", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-06", topic: "Geometría 3D", timeSlot: "19:30 a 21:00", teacherSlug: "fabrizio", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-07", topic: "Función Lineal + Cuadrática", timeSlot: "21:10 a 22:40", teacherSlug: "sylvina", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-08", topic: "Polinomios", timeSlot: "19:30 a 21:00", teacherSlug: "sergio", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-09", topic: "SEL", timeSlot: "21:10 a 22:40", teacherSlug: "viktor", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-10", topic: "Función Exp / Log", timeSlot: "19:30 a 21:00", teacherSlug: "pablo", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-12", topic: "FERIADO", timeSlot: "—", teacherSlug: "", isHoliday: true },
  { courseSlug: "analisis-1", date: "2025-10-13", topic: "Trigonometría", timeSlot: "19:30 a 21:00", teacherSlug: "fabrizio", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-14", topic: "Vectores", timeSlot: "21:10 a 22:40", teacherSlug: "sylvina", isHoliday: false },
  { courseSlug: "analisis-1", date: "2025-10-15", topic: "Estática", timeSlot: "19:30 a 21:00", teacherSlug: "sergio", isHoliday: false },
];

export const demoMaterials: SheetMaterial[] = [
  {
    courseSlug: "analisis-1",
    topic: "Conjuntos Numéricos",
    title: "Apunte — Conjuntos",
    type: "APUNTE",
    url: "/materiales/apunte-conjuntos.pdf",
    published: true,
    teacherSlug: "viktor",
  },
  {
    courseSlug: "analisis-1",
    topic: "Geometría SIN Trig.",
    title: "Clase grabada — Geometría plana",
    type: "VIDEO",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    published: true,
    teacherSlug: "pablo",
  },
];

export const demoTestimonials: SheetTestimonial[] = [
  {
    name: "Lucía M.",
    course: "Análisis 1 — UTN",
    text: "Aprobé el parcial de límites gracias a las clases de Viktor.",
    rating: 5,
    visible: true,
  },
  {
    name: "Tomás R.",
    course: "Álgebra — CBC",
    text: "La grilla de horarios me organizó la semana.",
    rating: 5,
    visible: true,
  },
  {
    name: "Camila S.",
    course: "Clases grabadas",
    text: "Estudié a mi ritmo antes del final.",
    rating: 5,
    visible: true,
  },
];

export const demoUsers: SheetUser[] = [
  {
    email: "alumno@viktorclases.com",
    password: "viktor123",
    name: "Alumno Demo",
    role: "STUDENT",
    teacherSlug: "",
  },
  {
    email: "viktor@viktorclases.com",
    password: "viktor123",
    name: "Viktor",
    role: "TEACHER",
    teacherSlug: "viktor",
  },
];

export const demoEnrollments: SheetEnrollment[] = [
  { email: "alumno@viktorclases.com", courseSlug: "analisis-1" },
];
