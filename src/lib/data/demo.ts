import type {
  Course,
  Material,
  ScheduleEntryView,
  Teacher,
  Testimonial,
} from "./types";

export const demoTeachers: Teacher[] = [
  { slug: "viktor", name: "Viktor", color: "#7b2cbf", photoUrl: "/teachers/viktor.svg", bio: "Docente de matemática — ingreso universitario." },
  { slug: "pablo", name: "Pablo", color: "#2563eb", photoUrl: "/teachers/pablo.svg", bio: "Geometría y funciones." },
  { slug: "fabrizio", name: "Fabrizio", color: "#dc2626", photoUrl: "/teachers/fabrizio.svg", bio: "Trigonometría y estática." },
  { slug: "sylvina", name: "Sylvina", color: "#22d3ee", photoUrl: "/teachers/sylvina.svg", bio: "Álgebra y SEL." },
  { slug: "sergio", name: "Sergio", color: "#f59e0b", photoUrl: "/teachers/sergio.svg", bio: "Polinomios y repaso." },
];

export const demoCourses: Course[] = [
  { slug: "analisis-1", title: "Análisis Matemático 1", subtitle: "Parciales y finales", description: "Curso integral UTN, CBC y UBA XXI.", modality: "Virtual y presencial", priceLabel: null, icon: "calculator", teacherSlug: "viktor", featured: true },
  { slug: "algebra", title: "Álgebra", subtitle: "Parciales e ingreso", description: "Matrices y sistemas lineales.", modality: "Virtual", priceLabel: null, icon: "shapes", teacherSlug: "pablo", featured: true },
  { slug: "clases-grabadas", title: "Clases grabadas", subtitle: "Estudiá a tu ritmo", description: "Biblioteca por tema.", modality: "On demand", priceLabel: null, icon: "play", teacherSlug: "sergio", featured: true },
  { slug: "particulares", title: "Clases particulares", subtitle: "Consultá disponibilidad", description: "Clases 1 a 1.", modality: "Virtual / presencial", priceLabel: null, icon: "chat", teacherSlug: "viktor", featured: true },
];

export const demoMaterials: Material[] = [
  { courseSlug: "analisis-1", teacherSlug: "viktor", topic: "Conjuntos", title: "Apunte — Conjuntos", kind: "apunte", url: "/materiales/apunte-conjuntos.pdf", published: true },
  { courseSlug: "analisis-1", teacherSlug: "viktor", topic: "Límites", title: "Video — Introducción", kind: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
  { courseSlug: "analisis-1", teacherSlug: "viktor", topic: "Límites", title: "Guía de ejercicios", kind: "ejercitacion", url: "https://example.com/ejercicios.pdf", published: true },
  { courseSlug: "analisis-1", teacherSlug: "sergio", topic: "Polinomios", title: "Ejercitación — Factorización", kind: "ejercitacion", url: "https://example.com/polinomios.pdf", published: true },
  { courseSlug: "algebra", teacherSlug: "pablo", topic: "Matrices", title: "Apunte — Matrices", kind: "apunte", url: "https://example.com/matrices.pdf", published: true },
  { courseSlug: "algebra", teacherSlug: "pablo", topic: "SEL", title: "Video — Sistemas lineales", kind: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
  { courseSlug: "clases-grabadas", teacherSlug: "sergio", topic: "Repaso", title: "Video — Repaso integral", kind: "video", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", published: true },
];

export const demoSchedule: Omit<ScheduleEntryView, "teacher" | "courseTitle">[] = [
  { courseSlug: "analisis-1", date: new Date("2025-10-02T12:00:00"), topic: "Conjuntos Numéricos", timeSlot: "19:30 a 21:00", teacherSlug: "viktor", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-03T12:00:00"), topic: "Geometría SIN Trig.", timeSlot: "19:30 a 21:00", teacherSlug: "pablo", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-06T12:00:00"), topic: "Geometría 3D", timeSlot: "19:30 a 21:00", teacherSlug: "fabrizio", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-07T12:00:00"), topic: "Función Lineal + Cuadrática", timeSlot: "21:10 a 22:40", teacherSlug: "sylvina", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-08T12:00:00"), topic: "Polinomios", timeSlot: "19:30 a 21:00", teacherSlug: "sergio", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-12T12:00:00"), topic: "FERIADO", timeSlot: "—", teacherSlug: "", isHoliday: true },
  { courseSlug: "analisis-1", date: new Date("2025-10-13T12:00:00"), topic: "Trigonometría", timeSlot: "19:30 a 21:00", teacherSlug: "fabrizio", isHoliday: false },
  { courseSlug: "analisis-1", date: new Date("2025-10-14T12:00:00"), topic: "Vectores", timeSlot: "21:10 a 22:40", teacherSlug: "sylvina", isHoliday: false },
];

export const demoTestimonials: Testimonial[] = [
  { name: "Lucía M.", course: "Análisis 1 — UTN", text: "Aprobé el parcial gracias a las clases de Viktor.", rating: 5 },
  { name: "Tomás R.", course: "Álgebra — CBC", text: "La grilla me organizó la semana.", rating: 5 },
];
