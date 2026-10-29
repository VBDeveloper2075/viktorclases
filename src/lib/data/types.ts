export type UserRole = "student" | "teacher" | "admin";

export type MaterialKind = "video" | "apunte" | "ejercitacion";

export type Teacher = {
  id?: string;
  slug: string;
  name: string;
  color: string;
  photoUrl: string;
  bio: string;
};

export type Course = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  modality: string;
  priceLabel: string | null;
  icon: string;
  teacherSlug: string;
  featured: boolean;
};

export type CourseWithTeacher = Course & {
  teacher: Teacher | null;
};

export type Material = {
  id?: string;
  courseSlug: string;
  teacherSlug: string;
  topic: string;
  title: string;
  kind: MaterialKind;
  url: string;
  published: boolean;
};

export type ScheduleEntryView = {
  courseSlug: string;
  courseTitle: string;
  date: Date;
  topic: string;
  timeSlot: string;
  teacherSlug: string;
  isHoliday: boolean;
  teacher: Teacher | null;
};

export type Testimonial = {
  name: string;
  course: string;
  text: string;
  rating: number;
};

export type Profile = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  teacherSlug: string | null;
};

export const MATERIAL_KIND_LABELS: Record<
  MaterialKind,
  { title: string; path: string; description: string; emoji: string }
> = {
  video: {
    title: "Videos",
    path: "videos",
    description: "Clases grabadas y explicaciones en video.",
    emoji: "▶️",
  },
  apunte: {
    title: "Apuntes",
    path: "apuntes",
    description: "Material escrito para repasar antes del parcial.",
    emoji: "📄",
  },
  ejercitacion: {
    title: "Ejercitación",
    path: "ejercitacion",
    description: "Guías y práctica con ejercicios tipo examen.",
    emoji: "✏️",
  },
};
