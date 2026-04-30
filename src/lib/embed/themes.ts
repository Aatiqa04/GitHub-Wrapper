export interface EmbedTheme {
  bg: string;
  border: string;
  text: string;
  textMuted: string;
  accent: string;
  cardBg: string;
}

export const EMBED_THEMES: Record<string, EmbedTheme> = {
  dark: {
    bg: "#0d1117",
    border: "#30363d",
    text: "#c9d1d9",
    textMuted: "#8b949e",
    accent: "#58a6ff",
    cardBg: "#161b22",
  },
  light: {
    bg: "#ffffff",
    border: "#d0d7de",
    text: "#1f2328",
    textMuted: "#656d76",
    accent: "#0969da",
    cardBg: "#f6f8fa",
  },
};
