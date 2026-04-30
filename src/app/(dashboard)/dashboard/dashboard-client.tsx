"use client";

import { StatsOverview } from "@/components/dashboard/stats-overview";
import { ContributionHeatmap } from "@/components/charts/contribution-heatmap";
import { CommitActivityChart } from "@/components/charts/commit-activity-chart";
import { LanguagePieChart } from "@/components/charts/language-pie-chart";
import { TopReposList } from "@/components/dashboard/top-repos-list";
import { BadgeShowcase } from "@/components/dashboard/badge-showcase";
import { StatsCard } from "@/components/cards/stats-card";
import { Avatar } from "@/components/ui/avatar";
import type { DeveloperStats } from "@/lib/stats/types";

export function DashboardClient({ stats }: { stats: DeveloperStats }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="flex items-center gap-4 sm:gap-6 animate-fade-in mb-6 sm:mb-8">
        <Avatar src={stats.avatarUrl} alt={stats.username} size="lg" />
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
            {stats.name || stats.username}&apos;s Wrapped
          </h1>
          <p className="text-sm text-gh-muted">
            @{stats.username} &middot; {stats.totalRepos} repos &middot;{" "}
            {stats.followers} followers
          </p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6 sm:space-y-8">
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

        {/* Stats card — sticky sidebar on xl, inline section on smaller screens */}
        <div className="xl:w-[28rem] xl:shrink-0">
          <div className="xl:sticky xl:top-24">
            <h2 className="text-lg font-semibold text-white mb-4">
              Share Your Stats
            </h2>
            <StatsCard stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
}
