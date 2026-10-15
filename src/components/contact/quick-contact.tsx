import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Props = {
  /**
   * "pill": icon + label; "icon": round icon-only;
   * "responsive": icon-only on phones, icon + label from sm up
   */
  variant?: "pill" | "icon" | "responsive";
  className?: string;
};

const channels = [
  {
    key: "telegram",
    label: "Telegram",
    url: brand.contact.telegram.url,
    Icon: FaTelegramPlane,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    url: brand.contact.whatsapp.url,
    Icon: FaWhatsapp,
  },
] as const;

/** One-tap links to Telegram and WhatsApp chats. Server Component. */
export function QuickContact({ variant = "pill", className }: Props) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {channels.map(({ key, label, url, Icon }) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={variant === "pill" ? undefined : label}
            className={cn(
              "inline-flex items-center justify-center gap-2 border border-border bg-background text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              variant === "icon" && "h-11 w-11 rounded-full",
              variant === "pill" && "h-10 rounded-full px-4",
              variant === "responsive" &&
                "h-10 w-10 rounded-full sm:w-auto sm:px-4"
            )}
          >
            <Icon aria-hidden className="h-4 w-4" />
            {variant === "pill" && label}
            {variant === "responsive" && (
              <span aria-hidden className="hidden sm:inline">
                {label}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
