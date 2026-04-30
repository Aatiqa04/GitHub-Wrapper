import { format, parseISO, differenceInDays } from "date-fns";
import type { UserProfileResponse } from "@/types/github";
import type {
  DeveloperStats,
  LanguageStat,
  MonthlyActivity,
  DayOfWeekActivity,
  TopRepo,
  HeatmapDay,
} from "./types";
import { computeBadges } from "./badges";
import { CONTRIBUTION_LEVELS, DAYS_OF_WEEK } from "@/lib/constants";

export function computeStats(
  profile: UserProfileResponse["viewer"]
): DeveloperStats {
  const { contributionsCollection, repositories } = profile;
  const calendar = contributionsCollection.contributionCalendar;

  const languages = computeLanguages(repositories.nodes);
  const monthlyActivity = computeMonthlyActivity(calendar.weeks);
  const dayOfWeekActivity = computeDayOfWeekActivity(calendar.weeks);
  const topRepos = computeTopRepos(repositories.nodes);
  const heatmapData = computeHeatmap(calendar.weeks);
  const { longestStreak, currentStreak } = computeStreaks(calendar.weeks);
  const totalStars = profile.allReposForStars.nodes.reduce(
    (sum, r) => sum + r.stargazerCount,
    0
  );
  const weeklyActiveCount = computeWeeklyActiveCount(calendar.weeks);
  const weekendPercentage = computeWeekendPercentage(calendar.weeks);
  const publicRepoCount = repositories.nodes.filter(
    (r) => !r.isPrivate && !r.isFork
  ).length;

  const stats: DeveloperStats = {
    username: profile.login,
    name: profile.name,
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    totalCommits: contributionsCollection.totalCommitContributions,
    totalPRs: contributionsCollection.totalPullRequestContributions,
    totalIssues: contributionsCollection.totalIssueContributions,
    totalStars,
    totalRepos: repositories.totalCount,
    followers: profile.followers.totalCount,
    following: profile.following.totalCount,
    longestStreak,
    currentStreak,
    languages,
    monthlyActivity,
    dayOfWeekActivity,
    topRepos,
    heatmapData,
    totalContributions: calendar.totalContributions,
    badges: [],
    weeklyActiveCount,
    weekendPercentage,
    joinDate: profile.createdAt,
  };

  stats.badges = computeBadges(stats, {
    totalPRs: profile.pullRequests.totalCount,
    publicRepoCount,
    monthlyActivity,
  });

  return stats;
}

function computeLanguages(
  repos: UserProfileResponse["viewer"]["repositories"]["nodes"]
): LanguageStat[] {
  const langMap = new Map<string, { bytes: number; color: string }>();

  for (const repo of repos) {
    if (repo.isFork) continue;
    for (const edge of repo.languages.edges) {
      const existing = langMap.get(edge.node.name);
      if (existing) {
        existing.bytes += edge.size;
      } else {
        langMap.set(edge.node.name, {
          bytes: edge.size,
          color: edge.node.color || "#8b949e",
        });
      }
    }
  }

  const sorted = Array.from(langMap.entries())
    .map(([name, { bytes, color }]) => ({ name, bytes, color, percentage: 0 }))
    .sort((a, b) => b.bytes - a.bytes);

  const totalBytes = sorted.reduce((s, l) => s + l.bytes, 0);

  if (sorted.length <= 8) {
    return sorted.map((l) => ({
      ...l,
      percentage: totalBytes > 0 ? (l.bytes / totalBytes) * 100 : 0,
    }));
  }

  const top8 = sorted.slice(0, 8).map((l) => ({
    ...l,
    percentage: totalBytes > 0 ? (l.bytes / totalBytes) * 100 : 0,
  }));

  const otherBytes = sorted.slice(8).reduce((s, l) => s + l.bytes, 0);
  top8.push({
    name: "Other",
    color: "#8b949e",
    bytes: otherBytes,
    percentage: totalBytes > 0 ? (otherBytes / totalBytes) * 100 : 0,
  });

  return top8;
}

function computeMonthlyActivity(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): MonthlyActivity[] {
  const monthMap = new Map<string, number>();

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const monthKey = format(parseISO(day.date), "MMM yyyy");
      monthMap.set(
        monthKey,
        (monthMap.get(monthKey) || 0) + day.contributionCount
      );
    }
  }

  return Array.from(monthMap.entries()).map(([month, contributions]) => ({
    month,
    contributions,
  }));
}

function computeDayOfWeekActivity(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): DayOfWeekActivity[] {
  const dayTotals = new Array(7).fill(0);

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      const dayIndex = parseISO(day.date).getDay();
      dayTotals[dayIndex] += day.contributionCount;
    }
  }

  return dayTotals.map((contributions, i) => ({
    day: DAYS_OF_WEEK[i],
    contributions,
  }));
}

function computeTopRepos(
  repos: UserProfileResponse["viewer"]["repositories"]["nodes"]
): TopRepo[] {
  return repos
    .filter((r) => r.defaultBranchRef?.target?.history?.totalCount)
    .map((r) => ({
      name: r.name,
      nameWithOwner: r.nameWithOwner,
      url: r.url,
      commits: r.defaultBranchRef!.target.history.totalCount,
      stars: r.stargazerCount,
      language: r.primaryLanguage?.name || null,
      languageColor: r.primaryLanguage?.color || null,
    }))
    .sort((a, b) => b.commits - a.commits);
}

function computeHeatmap(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): HeatmapDay[][] {
  return weeks.map((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: CONTRIBUTION_LEVELS[day.contributionLevel] ?? 0,
      color: day.color,
    }))
  );
}

function computeStreaks(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): { longestStreak: number; currentStreak: number } {
  const allDays = weeks.flatMap((w) => w.contributionDays);

  let longestStreak = 0;
  let currentStreak = 0;
  let streak = 0;

  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      longestStreak = Math.max(longestStreak, streak);
    } else {
      streak = 0;
    }
  }

  // Current streak: walk backwards from the end
  currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    // Skip today if no contributions yet (it's still in progress)
    if (i === allDays.length - 1 && allDays[i].contributionCount === 0) {
      const yesterday = allDays[i - 1];
      if (yesterday && differenceInDays(parseISO(allDays[i].date), parseISO(yesterday.date)) === 1) {
        continue;
      }
    }
    if (allDays[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { longestStreak, currentStreak };
}

function computeWeeklyActiveCount(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): number {
  return weeks.filter((week) =>
    week.contributionDays.some((day) => day.contributionCount > 0)
  ).length;
}

function computeWeekendPercentage(
  weeks: UserProfileResponse["viewer"]["contributionsCollection"]["contributionCalendar"]["weeks"]
): number {
  let total = 0;
  let weekend = 0;

  for (const week of weeks) {
    for (const day of week.contributionDays) {
      total += day.contributionCount;
      const dayOfWeek = parseISO(day.date).getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekend += day.contributionCount;
      }
    }
  }

  return total > 0 ? (weekend / total) * 100 : 0;
}
