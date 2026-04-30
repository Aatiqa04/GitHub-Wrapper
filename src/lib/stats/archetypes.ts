import type { DeveloperStats, DeveloperArchetype } from "./types";

interface ArchetypeDefinition extends DeveloperArchetype {
  score: (stats: DeveloperStats, ctx: ArchetypeContext) => number;
}

interface ArchetypeContext {
  publicRepoCount: number;
  accountAgeDays: number;
}

const ARCHETYPE_DEFINITIONS: ArchetypeDefinition[] = [
  {
    id: "the-architect",
    title: "The Architect",
    description: "Building complex systems across many languages and repositories",
    icon: "🏗️",
    color: "#58a6ff",
    score: (stats) => {
      const repoScore = Math.min(stats.totalRepos / 30, 1);
      const langCount = stats.languages.filter((l) => l.name !== "Other").length;
      const langScore = Math.min(langCount / 6, 1);
      return (repoScore + langScore) / 2;
    },
  },
  {
    id: "the-grinder",
    title: "The Grinder",
    description: "Relentless commits and impressive contribution streaks",
    icon: "⚡",
    color: "#d29922",
    score: (stats) => {
      const commitScore = Math.min(stats.totalCommits / 1500, 1);
      const streakScore = Math.min(stats.longestStreak / 30, 1);
      return (commitScore + streakScore) / 2;
    },
  },
  {
    id: "the-collaborator",
    title: "The Collaborator",
    description: "A team player who thrives on pull requests and issue discussions",
    icon: "🤝",
    color: "#bc8cff",
    score: (stats) => {
      const prScore = Math.min(stats.totalPRs / 100, 1);
      const issueScore = Math.min(stats.totalIssues / 50, 1);
      return (prScore + issueScore) / 2;
    },
  },
  {
    id: "the-explorer",
    title: "The Explorer",
    description: "Always experimenting with new languages and technologies",
    icon: "🧭",
    color: "#39d353",
    score: (stats) => {
      const langCount = stats.languages.filter((l) => l.name !== "Other").length;
      const diversityScore = Math.min(langCount / 7, 1);
      const topLangPct = stats.languages[0]?.percentage ?? 100;
      const spreadScore = Math.min((100 - topLangPct) / 60, 1);
      return (diversityScore + spreadScore) / 2;
    },
  },
  {
    id: "the-night-owl",
    title: "The Night Owl",
    description: "Most active on weekends — coding never stops",
    icon: "🦉",
    color: "#8b5cf6",
    score: (stats) => {
      return Math.min(stats.weekendPercentage / 40, 1);
    },
  },
  {
    id: "the-specialist",
    title: "The Specialist",
    description: "Deep expertise in one or two core technologies",
    icon: "🎯",
    color: "#f85149",
    score: (stats) => {
      const topLangPct = stats.languages[0]?.percentage ?? 0;
      const top2Pct =
        topLangPct + (stats.languages[1]?.percentage ?? 0);
      const focusScore = Math.min(top2Pct / 90, 1);
      const commitScore = Math.min(stats.totalCommits / 500, 1);
      return (focusScore * 0.7 + commitScore * 0.3);
    },
  },
  {
    id: "the-open-source-hero",
    title: "The Open Source Hero",
    description: "Champion of public repositories with community recognition",
    icon: "🌟",
    color: "#f778ba",
    score: (stats, ctx) => {
      const publicScore = Math.min(ctx.publicRepoCount / 20, 1);
      const starScore = Math.min(stats.totalStars / 50, 1);
      return (publicScore + starScore) / 2;
    },
  },
  {
    id: "the-rising-star",
    title: "The Rising Star",
    description: "New to GitHub but already making a big impact",
    icon: "🚀",
    color: "#39d353",
    score: (stats, ctx) => {
      const newAccountScore = ctx.accountAgeDays < 365 * 2 ? 1 : ctx.accountAgeDays < 365 * 4 ? 0.5 : 0;
      const activityScore = Math.min(stats.totalContributions / 500, 1);
      return (newAccountScore + activityScore) / 2;
    },
  },
];

export function computeArchetype(
  stats: DeveloperStats,
  context: ArchetypeContext
): DeveloperArchetype {
  let best: ArchetypeDefinition = ARCHETYPE_DEFINITIONS[0];
  let bestScore = -1;

  for (const def of ARCHETYPE_DEFINITIONS) {
    const s = def.score(stats, context);
    if (s > bestScore) {
      bestScore = s;
      best = def;
    }
  }

  return {
    id: best.id,
    title: best.title,
    description: best.description,
    icon: best.icon,
    color: best.color,
  };
}
