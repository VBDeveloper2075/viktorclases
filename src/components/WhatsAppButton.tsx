import { whatsappUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  className?: string;
};

export function WhatsAppButton({
  message,
  label = "Consultar por WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5d] ${className}`}
    >
      <span aria-hidden>💬</span>
      {label}
    </a>
  );
}
