import type { DeveloperStats, Badge, MonthlyActivity } from "./types";
import { BADGE_DEFINITIONS } from "@/lib/constants";

interface BadgeContext {
  totalPRs: number;
  publicRepoCount: number;
  monthlyActivity: MonthlyActivity[];
}

export function computeBadges(
  stats: DeveloperStats,
  context: BadgeContext
): Badge[] {
  const checks: Record<string, boolean> = {
    // Night Owl and Early Bird require commit time data from REST API
    // We approximate with weekend/weekday patterns for now
    "night-owl": false,
    "early-bird": false,
    polyglot: stats.languages.filter((l) => l.name !== "Other").length >= 5,
    "streak-master": stats.longestStreak >= 30,
    centurion: context.monthlyActivity.some((m) => m.contributions >= 100),
    "weekend-warrior": stats.weekendPercentage >= 25,
    "pr-machine": context.totalPRs >= 50,
    "open-sourcerer": context.publicRepoCount >= 10,
    "the-consistent": stats.weeklyActiveCount >= 48,
    "1k-club": stats.totalContributions >= 1000,
  };

  return BADGE_DEFINITIONS.map((def) => ({
    id: def.id,
    name: def.name,
    description: def.description,
    icon: def.icon,
    color: def.color,
    earned: checks[def.id] ?? false,
  }));
}
