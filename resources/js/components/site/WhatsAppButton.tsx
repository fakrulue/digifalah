import { MessageCircle } from "lucide-react";
import { usePage } from "@inertiajs/react";

export function WhatsAppButton() {
  const { props } = usePage();
  const settings = (props as any).settings || {};
  const number = settings.whatsapp_number || "8801700000000"; // Fallback

  const whatsappUrl = `https://wa.me/${number.replace(/\D/g, '')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="absolute -right-1 -top-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]"></span>
      </span>
    </a>
  );
}
