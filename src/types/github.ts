export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface LanguageEdge {
  size: number;
  node: {
    name: string;
    color: string | null;
  };
}

export interface Repository {
  name: string;
  nameWithOwner: string;
  url: string;
  stargazerCount: number;
  isPrivate: boolean;
  isFork: boolean;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages: {
    edges: LanguageEdge[];
  };
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
}

export interface UserProfileResponse {
  viewer: {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    createdAt: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    allReposForStars: {
      nodes: { stargazerCount: number }[];
    };
    repositories: {
      totalCount: number;
      nodes: Repository[];
    };
    pullRequests: { totalCount: number };
    contributionsCollection: {
      contributionCalendar: ContributionCalendar;
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalIssueContributions: number;
      totalRepositoryContributions: number;
      restrictedContributionsCount: number;
    };
    starredRepositories: { totalCount: number };
  };
}

export interface PublicUserProfileResponse {
  user: UserProfileResponse["viewer"];
}
