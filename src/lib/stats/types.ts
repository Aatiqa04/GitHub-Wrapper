export interface LanguageStat {
  name: string;
  color: string;
  bytes: number;
  percentage: number;
}

export interface MonthlyActivity {
  month: string;
  contributions: number;
}

export interface DayOfWeekActivity {
  day: string;
  contributions: number;
}

export interface TopRepo {
  name: string;
  nameWithOwner: string;
  url: string;
  commits: number;
  stars: number;
  language: string | null;
  languageColor: string | null;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: number;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  color: string;
}

export interface DeveloperArchetype {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface DeveloperStats {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalStars: number;
  totalRepos: number;
  followers: number;
  following: number;
  longestStreak: number;
  currentStreak: number;
  languages: LanguageStat[];
  monthlyActivity: MonthlyActivity[];
  dayOfWeekActivity: DayOfWeekActivity[];
  topRepos: TopRepo[];
  heatmapData: HeatmapDay[][];
  totalContributions: number;
  badges: Badge[];
  weeklyActiveCount: number;
  weekendPercentage: number;
  joinDate: string;
  archetype: DeveloperArchetype;
}
