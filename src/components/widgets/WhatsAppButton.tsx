import { SocialIcon } from "@/components/ui/SocialIcon";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export interface WhatsAppButtonProps {
  number: string;
  message?: string;
  /** Visible on hover/focus and used as the accessible name. */
  label?: string;
  position?: "left" | "right";
  className?: string;
}

/** Floating "chat on WhatsApp" button. Pure CSS, so it costs no client JavaScript. */
export function WhatsAppButton({
  number,
  message,
  label = "Chat on WhatsApp",
  position = "right",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppUrl(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fab-enter group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center gap-0 rounded-full bg-[#25d366] px-4 text-[#0b2e17] shadow-lg shadow-black/20 transition-[gap,padding] duration-300 hover:gap-2 hover:pr-5 focus-visible:gap-2 focus-visible:pr-5",
        position === "right" ? "right-5" : "left-5",
        className,
      )}
    >
      <SocialIcon platform="whatsapp" className="size-6" strokeWidth={2} />
      <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-[max-width] duration-300 group-hover:max-w-48 group-focus-visible:max-w-48">
        {label}
      </span>
    </a>
  );
}
