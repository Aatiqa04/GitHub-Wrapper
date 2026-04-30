"use client";

import { StatsOverview } from "@/components/dashboard/stats-overview";
import { ContributionHeatmap } from "@/components/charts/contribution-heatmap";
import { CommitActivityChart } from "@/components/charts/commit-activity-chart";
import { LanguagePieChart } from "@/components/charts/language-pie-chart";
import { TopReposList } from "@/components/dashboard/top-repos-list";
import { BadgeShowcase } from "@/components/dashboard/badge-showcase";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { DeveloperStats } from "@/lib/stats/types";

function ShareButtons({ username }: { username: string }) {
  const url = typeof window !== "undefined"
    ? window.location.href
    : `https://github-wrapped.vercel.app/user/${username}`;

  const text = `Check out my GitHub Wrapped! ${url}`;

  return (
    <div className="flex gap-3">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(url);
        }}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy Link
      </Button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="secondary" size="sm">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Tweet
        </Button>
      </a>
    </div>
  );
}

export function PublicProfileClient({ stats }: { stats: DeveloperStats }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-6">
          <Avatar src={stats.avatarUrl} alt={stats.username} size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {stats.name || stats.username}&apos;s Wrapped
            </h1>
            <p className="text-gh-muted">
              @{stats.username} &middot; {stats.totalRepos} repos &middot;{" "}
              {stats.followers} followers
            </p>
          </div>
        </div>
        <ShareButtons username={stats.username} />
      </div>

      <StatsOverview stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CommitActivityChart data={stats.monthlyActivity} />
        <LanguagePieChart languages={stats.languages} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopReposList repos={stats.topRepos} />
        <BadgeShowcase badges={stats.badges} />
      </div>

      <ContributionHeatmap
        data={stats.heatmapData}
        totalContributions={stats.totalContributions}
      />
    </div>
  );
}
