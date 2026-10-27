export function whatsappUrl(message: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ??
    process.env.WHATSAPP_NUMBER ??
    "5491112345678";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function courseInquiryMessage(courseTitle: string): string {
  return `Hola ViktorClases 👋 Quiero info sobre el curso "${courseTitle}". ¿Horarios y modalidad disponibles?`;
}
