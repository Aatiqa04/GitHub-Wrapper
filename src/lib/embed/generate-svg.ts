import type { DeveloperStats } from "@/lib/stats/types";
import { EMBED_THEMES, type EmbedTheme } from "./themes";

interface EmbedOptions {
  theme?: string;
  show?: string[];
  hideTitle?: boolean;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateEmbedSvg(
  stats: DeveloperStats,
  options: EmbedOptions = {}
): string {
  const t: EmbedTheme = EMBED_THEMES[options.theme || "dark"] || EMBED_THEMES.dark;
  const show = options.show || ["commits", "streak", "prs", "stars", "repos", "lang"];
  const hideTitle = options.hideTitle || false;

  const name = escapeXml(stats.name || stats.username);
  const username = escapeXml(stats.username);
  const archetype = stats.archetype;

  const statItems: { label: string; value: string; key: string }[] = [
    { label: "Contributions", value: stats.totalContributions.toLocaleString(), key: "commits" },
    { label: "Streak", value: `${stats.longestStreak} days`, key: "streak" },
    { label: "Pull Requests", value: stats.totalPRs.toLocaleString(), key: "prs" },
    { label: "Stars", value: stats.totalStars.toLocaleString(), key: "stars" },
    { label: "Repositories", value: stats.totalRepos.toLocaleString(), key: "repos" },
    { label: "Top Lang", value: stats.languages[0]?.name || "N/A", key: "lang" },
  ];

  const visible = statItems.filter((s) => show.includes(s.key));
  const rows: { label: string; value: string }[][] = [];
  for (let i = 0; i < visible.length; i += 2) {
    rows.push(visible.slice(i, i + 2));
  }

  const titleHeight = hideTitle ? 0 : 58;
  const statsHeight = rows.length * 28 + 12;
  const langBarHeight = 30;
  const totalHeight = 20 + titleHeight + statsHeight + langBarHeight + 20;
  const width = 495;

  // Language bar segments
  const langs = stats.languages.slice(0, 6);
  let langBarSvg = "";
  let xOffset = 20;
  const barWidth = width - 40;
  for (const lang of langs) {
    const w = (lang.percentage / 100) * barWidth;
    langBarSvg += `<rect x="${xOffset}" y="${20 + titleHeight + statsHeight}" width="${w}" height="8" fill="${lang.color}" rx="0"/>`;
    xOffset += w;
  }

  // Title section
  const titleSvg = hideTitle
    ? ""
    : `
    <text x="20" y="32" fill="${t.text}" font-size="16" font-weight="700" font-family="Inter,system-ui,sans-serif">
      ${escapeXml(name)}&apos;s GitHub Wrapped
    </text>
    <text x="20" y="50" fill="${t.textMuted}" font-size="12" font-family="Inter,system-ui,sans-serif">
      @${username}  ·  ${escapeXml(archetype.title)} ${archetype.icon}
    </text>
    <line x1="20" y1="${titleHeight}" x2="${width - 20}" y2="${titleHeight}" stroke="${t.border}" stroke-width="1"/>
  `;

  // Stats rows
  let statsSvg = "";
  rows.forEach((row, ri) => {
    const y = titleHeight + 24 + ri * 28;
    row.forEach((item, ci) => {
      const x = ci === 0 ? 20 : width / 2 + 10;
      statsSvg += `
        <text x="${x}" y="${y}" fill="${t.textMuted}" font-size="12" font-family="Inter,system-ui,sans-serif">
          ${escapeXml(item.label)}:
          <tspan fill="${t.text}" font-weight="600"> ${escapeXml(item.value)}</tspan>
        </text>
      `;
    });
  });

  // Language bar divider
  const langDividerY = 20 + titleHeight + statsHeight - 8;
  const langBarY = 20 + titleHeight + statsHeight;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${totalHeight}" viewBox="0 0 ${width} ${totalHeight}" fill="none">
  <rect width="${width}" height="${totalHeight}" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  ${titleSvg}
  ${statsSvg}
  <line x1="20" y1="${langDividerY}" x2="${width - 20}" y2="${langDividerY}" stroke="${t.border}" stroke-width="1"/>
  <clipPath id="langClip">
    <rect x="20" y="${langBarY}" width="${barWidth}" height="8" rx="4"/>
  </clipPath>
  <g clip-path="url(#langClip)">
    ${langBarSvg}
  </g>
</svg>`;
}

export function generateErrorSvg(message: string, theme = "dark"): string {
  const t = EMBED_THEMES[theme] || EMBED_THEMES.dark;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="60" viewBox="0 0 495 60" fill="none">
  <rect width="495" height="60" rx="8" fill="${t.bg}" stroke="${t.border}" stroke-width="1"/>
  <text x="247.5" y="35" fill="${t.textMuted}" font-size="14" text-anchor="middle" font-family="Inter,system-ui,sans-serif">
    ${escapeXml(message)}
  </text>
</svg>`;
}
