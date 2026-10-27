export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export type SheetTeacher = {
  slug: string;
  name: string;
  color: string;
  photoUrl: string;
  bio: string;
};

export type SheetCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  modality: string;
  priceLabel: string;
  icon: string;
  teacherSlug: string;
  featured: boolean;
};

export type SheetScheduleEntry = {
  courseSlug: string;
  date: string;
  topic: string;
  timeSlot: string;
  teacherSlug: string;
  isHoliday: boolean;
};

export type SheetMaterial = {
  courseSlug: string;
  topic: string;
  title: string;
  type: "APUNTE" | "VIDEO";
  url: string;
  published: boolean;
  teacherSlug: string;
};

export type SheetTestimonial = {
  name: string;
  course: string;
  text: string;
  rating: number;
  visible: boolean;
};

export type SheetUser = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  teacherSlug: string;
};

export type SheetEnrollment = {
  email: string;
  courseSlug: string;
};

export type CourseWithTeacher = SheetCourse & {
  teacher: SheetTeacher | null;
};

export type ScheduleEntryView = Omit<SheetScheduleEntry, "date"> & {
  date: Date;
  teacher: SheetTeacher | null;
  courseTitle: string;
};
