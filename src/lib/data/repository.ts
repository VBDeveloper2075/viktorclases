import {
  demoCourses,
  demoMaterials,
  demoSchedule,
  demoTeachers,
  demoTestimonials,
} from "./demo";
import type {
  CourseWithTeacher,
  Material,
  MaterialKind,
  ScheduleEntryView,
  Teacher,
  Testimonial,
} from "./types";

/** Capa de datos estática para deploy en Vercel (sin DB ni Sheets). */

function withTeachers(): CourseWithTeacher[] {
  const bySlug = new Map(demoTeachers.map((t) => [t.slug, t]));
  return demoCourses.map((c) => ({
    ...c,
    teacher: bySlug.get(c.teacherSlug) ?? null,
  }));
}

export async function getTeachers(): Promise<Teacher[]> {
  return demoTeachers;
}

export async function getTeacherBySlug(slug: string): Promise<Teacher | null> {
  return demoTeachers.find((t) => t.slug === slug) ?? null;
}

export async function getCoursesWithTeachers(): Promise<CourseWithTeacher[]> {
  return withTeachers();
}

export async function getFeaturedCourses(): Promise<CourseWithTeacher[]> {
  return withTeachers().filter((c) => c.featured);
}

export async function getCourseBySlug(slug: string): Promise<CourseWithTeacher | null> {
  return withTeachers().find((c) => c.slug === slug) ?? null;
}

export async function getScheduleEntries(
  courseSlug = "analisis-1",
): Promise<ScheduleEntryView[]> {
  const teacherMap = new Map(demoTeachers.map((t) => [t.slug, t]));
  const courseMap = new Map(demoCourses.map((c) => [c.slug, c.title]));

  return demoSchedule
    .filter((s) => s.courseSlug === courseSlug)
    .map((s) => ({
      ...s,
      courseTitle: courseMap.get(s.courseSlug) ?? s.courseSlug,
      teacher: s.teacherSlug ? teacherMap.get(s.teacherSlug) ?? null : null,
    }));
}

export async function getMaterials(filters?: {
  teacherSlug?: string;
  courseSlug?: string;
  kind?: MaterialKind;
  publishedOnly?: boolean;
}): Promise<Material[]> {
  return demoMaterials.filter((m) => {
    if (filters?.teacherSlug && m.teacherSlug !== filters.teacherSlug) return false;
    if (filters?.courseSlug && m.courseSlug !== filters.courseSlug) return false;
    if (filters?.kind && m.kind !== filters.kind) return false;
    if (filters?.publishedOnly === false) return true;
    return m.published;
  });
}

export async function getTestimonials(limit = 3): Promise<Testimonial[]> {
  return demoTestimonials.slice(0, limit);
}

export async function insertMaterial(): Promise<boolean> {
  return false;
}
