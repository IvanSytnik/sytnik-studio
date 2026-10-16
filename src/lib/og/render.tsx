import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

/**
 * Open Graph images (link previews in LinkedIn, Telegram, WhatsApp, Slack).
 * Rendered at build time for every locale, so there is no runtime cost.
 *
 * Inter is bundled locally (Latin + Cyrillic merged into one file per weight,
 * SIL OFL — see src/assets/fonts/OFL.txt) because the
 * default next/og font has no Cyrillic glyphs and build servers shouldn't
 * depend on a font CDN.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "inter-400.woff")),
    readFile(join(fontDir, "inter-600.woff")),
  ]);
  return [
    {
      name: "Inter",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: semibold,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

const C = {
  bg: "#FAFAF7",
  fg: "#0A0A0A",
  muted: "#5C5C58",
  border: "#E7E3DC",
  accent: "#FF5A1F",
};

type OgInput = {
  /** Small label above the title, e.g. "Case study · Live". */
  eyebrow: string;
  title: string;
  description?: string;
  /** Short chips at the bottom, e.g. a project's stack. */
  tags?: readonly string[];
  /** Bottom-left line, e.g. "Graz, Austria". */
  footer: string;
};

export async function renderOgImage({
  eyebrow,
  title,
  description,
  tags,
  footer,
}: OgInput) {
  const fonts = await loadFonts();
  const titleSize = title.length > 60 ? 56 : title.length > 36 ? 66 : 78;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: C.bg,
        color: C.fg,
        fontFamily: "Inter",
        padding: "64px 72px",
        borderTop: `12px solid ${C.accent}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: C.fg,
            color: C.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          {brand.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{brand.name}</div>
          <div style={{ fontSize: 18, color: C.muted, letterSpacing: 3 }}>
            {brand.studio.toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 24, color: C.accent, fontWeight: 600 }}>
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 28,
              color: C.muted,
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `2px solid ${C.border}`,
          paddingTop: 24,
        }}
      >
        <div style={{ fontSize: 22, color: C.muted }}>{footer}</div>
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", gap: 10 }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 20,
                  padding: "6px 14px",
                  border: `2px solid ${C.border}`,
                  borderRadius: 10,
                  color: C.muted,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    { ...OG_SIZE, fonts }
  );
}
