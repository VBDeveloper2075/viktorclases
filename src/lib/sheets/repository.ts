import { appendSheetRow, bool, fetchSheetTab } from "./client";
import {
  demoCourses,
  demoEnrollments,
  demoMaterials,
  demoSchedule,
  demoTeachers,
  demoTestimonials,
  demoUsers,
} from "./demo-data";
import type {
  CourseWithTeacher,
  ScheduleEntryView,
  SheetCourse,
  SheetEnrollment,
  SheetMaterial,
  SheetScheduleEntry,
  SheetTeacher,
  SheetTestimonial,
  SheetUser,
  UserRole,
} from "./types";

const TABS = {
  profes: process.env.SHEET_TAB_PROFES ?? "Profes",
  cursos: process.env.SHEET_TAB_CURSOS ?? "Cursos",
  horarios: process.env.SHEET_TAB_HORARIOS ?? "Horarios",
  materiales: process.env.SHEET_TAB_MATERIALES ?? "Materiales",
  testimonios: process.env.SHEET_TAB_TESTIMONIOS ?? "Testimonios",
  usuarios: process.env.SHEET_TAB_USUARIOS ?? "Usuarios",
  inscripciones: process.env.SHEET_TAB_INSCRIPCIONES ?? "Inscripciones",
} as const;

function teacherFromRow(row: Record<string, string>): SheetTeacher {
  return {
    slug: row.slug,
    name: row.name || row.nombre,
    color: row.color,
    photoUrl: row.photourl || row.foto || "/teachers/default.svg",
    bio: row.bio ?? "",
  };
}

function courseFromRow(row: Record<string, string>): SheetCourse {
  return {
    slug: row.slug,
    title: row.title || row.titulo,
    subtitle: row.subtitle || row.subtitulo,
    description: row.description || row.descripcion,
    modality: row.modality || row.modalidad,
    priceLabel: row.pricelabel || row.precio,
    icon: row.icon || "calculator",
    teacherSlug: row.teacherslug || row.profe,
    featured: bool(row.featured || row.destacado, true),
  };
}

function scheduleFromRow(row: Record<string, string>): SheetScheduleEntry {
  return {
    courseSlug: row.courseslug || row.curso || "analisis-1",
    date: row.date || row.fecha,
    topic: row.topic || row.tema,
    timeSlot: row.timeslot || row.franja || "—",
    teacherSlug: row.teacherslug || row.profe || "",
    isHoliday: bool(row.isholiday || row.feriado),
  };
}

function materialFromRow(row: Record<string, string>): SheetMaterial {
  const typeRaw = (row.type || row.tipo || "APUNTE").toUpperCase();
  return {
    courseSlug: row.courseslug || row.curso,
    topic: row.topic || row.tema,
    title: row.title || row.titulo,
    type: typeRaw === "VIDEO" ? "VIDEO" : "APUNTE",
    url: row.url,
    published: bool(row.published || row.publicado, true),
    teacherSlug: row.teacherslug || row.profe || "",
  };
}

function testimonialFromRow(row: Record<string, string>): SheetTestimonial {
  return {
    name: row.name || row.nombre,
    course: row.course || row.curso,
    text: row.text || row.texto,
    rating: Number(row.rating || row.nota || 5),
    visible: bool(row.visible, true),
  };
}

function userFromRow(row: Record<string, string>): SheetUser {
  const role = (row.role || row.rol || "STUDENT").toUpperCase() as UserRole;
  return {
    email: row.email.toLowerCase(),
    password: row.password || row.contraseña || row.contrasena,
    name: row.name || row.nombre,
    role: role === "TEACHER" || role === "ADMIN" ? role : "STUDENT",
    teacherSlug: row.teacherslug || row.profe || "",
  };
}

function enrollmentFromRow(row: Record<string, string>): SheetEnrollment {
  return {
    email: row.email.toLowerCase(),
    courseSlug: row.courseslug || row.curso,
  };
}

async function loadOrDemo<T>(
  tab: string,
  map: (rows: Record<string, string>[]) => T[],
  demo: T[],
): Promise<T[]> {
  const rows = await fetchSheetTab(tab);
  if (!rows) return demo;
  const parsed = map(rows).filter((item) => {
    const record = item as Record<string, unknown>;
    return Object.values(record).some((v) => v !== "" && v !== undefined);
  });
  return parsed.length ? parsed : demo;
}

export async function getTeachers(): Promise<SheetTeacher[]> {
  return loadOrDemo(TABS.profes, (rows) => rows.map(teacherFromRow), demoTeachers);
}

export async function getCourses(): Promise<SheetCourse[]> {
  return loadOrDemo(TABS.cursos, (rows) => rows.map(courseFromRow), demoCourses);
}

export async function getCoursesWithTeachers(): Promise<CourseWithTeacher[]> {
  const [courses, teachers] = await Promise.all([getCourses(), getTeachers()]);
  const bySlug = new Map(teachers.map((t) => [t.slug, t]));
  return courses.map((c) => ({
    ...c,
    teacher: bySlug.get(c.teacherSlug) ?? null,
  }));
}

export async function getCourseBySlug(slug: string): Promise<CourseWithTeacher | null> {
  const courses = await getCoursesWithTeachers();
  return courses.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedCourses(): Promise<CourseWithTeacher[]> {
  const courses = await getCoursesWithTeachers();
  return courses.filter((c) => c.featured);
}

export async function getScheduleEntries(
  courseSlug?: string,
): Promise<ScheduleEntryView[]> {
  const [rows, teachers, courses] = await Promise.all([
    loadOrDemo(TABS.horarios, (r) => r.map(scheduleFromRow), demoSchedule),
    getTeachers(),
    getCourses(),
  ]);
  const teacherMap = new Map(teachers.map((t) => [t.slug, t]));
  const courseMap = new Map(courses.map((c) => [c.slug, c.title]));

  return rows
    .filter((r) => !courseSlug || r.courseSlug === courseSlug)
    .map((r) => ({
      ...r,
      date: new Date(`${r.date}T12:00:00`),
      teacher: r.teacherSlug ? teacherMap.get(r.teacherSlug) ?? null : null,
      courseTitle: courseMap.get(r.courseSlug) ?? r.courseSlug,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export async function getMaterials(filters?: {
  courseSlug?: string;
  teacherSlug?: string;
  publishedOnly?: boolean;
}): Promise<SheetMaterial[]> {
  let materials = await loadOrDemo(
    TABS.materiales,
    (rows) => rows.map(materialFromRow),
    demoMaterials,
  );
  if (filters?.courseSlug) {
    materials = materials.filter((m) => m.courseSlug === filters.courseSlug);
  }
  if (filters?.teacherSlug) {
    materials = materials.filter((m) => m.teacherSlug === filters.teacherSlug);
  }
  if (filters?.publishedOnly !== false) {
    materials = materials.filter((m) => m.published);
  }
  return materials;
}

export async function getTestimonials(limit?: number): Promise<SheetTestimonial[]> {
  const all = await loadOrDemo(
    TABS.testimonios,
    (rows) => rows.map(testimonialFromRow),
    demoTestimonials,
  );
  const visible = all.filter((t) => t.visible);
  return limit ? visible.slice(0, limit) : visible;
}

export async function getUsers(): Promise<SheetUser[]> {
  return loadOrDemo(TABS.usuarios, (rows) => rows.map(userFromRow), demoUsers);
}

export async function findUserByEmail(email: string): Promise<SheetUser | null> {
  const users = await getUsers();
  return users.find((u) => u.email === email.toLowerCase()) ?? null;
}

export async function getEnrollmentsForEmail(email: string): Promise<SheetEnrollment[]> {
  const all = await loadOrDemo(
    TABS.inscripciones,
    (rows) => rows.map(enrollmentFromRow),
    demoEnrollments,
  );
  return all.filter((e) => e.email === email.toLowerCase());
}

export async function registerUserInSheet(user: SheetUser): Promise<boolean> {
  return appendSheetRow(TABS.usuarios, [
    user.email,
    user.password,
    user.name,
    user.role,
    user.teacherSlug,
  ]);
}

export async function appendMaterialToSheet(material: SheetMaterial): Promise<boolean> {
  return appendSheetRow(TABS.materiales, [
    material.courseSlug,
    material.topic,
    material.title,
    material.type,
    material.url,
    material.published ? "true" : "false",
    material.teacherSlug,
  ]);
}

export function isSheetsConfigured(): boolean {
  return Boolean(process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SHEETS_API_KEY);
}
