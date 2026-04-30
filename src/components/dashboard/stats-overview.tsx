"use client";

import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "./animated-counter";
import type { DeveloperStats } from "@/lib/stats/types";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  suffix?: string;
  delay?: number;
}

function StatCard({ label, value, icon, suffix }: StatCardProps) {
  return (
    <Card className="group hover:scale-[1.02] hover:border-gh-green/30 hover:shadow-lg hover:shadow-gh-green/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gh-muted">{label}</p>
          <p className="mt-2 text-3xl font-bold text-white">
            <AnimatedCounter value={value} />
            {suffix && (
              <span className="ml-1 text-lg text-gh-muted">{suffix}</span>
            )}
          </p>
        </div>
        <div className="rounded-lg bg-gh-bg p-2.5 text-gh-green group-hover:text-gh-green group-hover:bg-gh-green/10 transition-colors">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function StatsOverview({ stats }: { stats: DeveloperStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Contributions"
        value={stats.totalContributions}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
      <StatCard
        label="Longest Streak"
        value={stats.longestStreak}
        suffix="days"
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
        }
      />
      <StatCard
        label="Pull Requests"
        value={stats.totalPRs}
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        }
      />
      <StatCard
        label="Total Stars"
        value={stats.totalStars}
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        }
      />
    </div>
  );
}
