"use client";

import { useState } from "react";
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
  const [status, setStatus] = useState<"idle" | "generating" | "done">("idle");

  const getOgImageUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/user/${username}/opengraph-image`;
  };

  const getProfileUrl = () => {
    return typeof window !== "undefined"
      ? window.location.href
      : `https://github-wrapped.vercel.app/user/${username}`;
  };

  const handleDownloadImage = async () => {
    setStatus("generating");
    try {
      const res = await fetch(getOgImageUrl());
      const blob = await res.blob();
      const link = document.createElement("a");
      link.download = `github-wrapped-${username}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  };

  const handleShareImage = async () => {
    setStatus("generating");
    try {
      const res = await fetch(getOgImageUrl());
      const blob = await res.blob();
      const file = new File([blob], `github-wrapped-${username}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${username}'s GitHub Wrapped`,
          text: `Check out my GitHub Wrapped!`,
          url: getProfileUrl(),
          files: [file],
        });
      } else {
        // Fallback: download image + open tweet with link
        const link = document.createElement("a");
        link.download = file.name;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);

        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out my GitHub Wrapped! ${getProfileUrl()}`
          )}`,
          "_blank"
        );
      }
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={handleDownloadImage}
        disabled={status === "generating"}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        {status === "generating" ? "Generating..." : status === "done" ? "Saved!" : "Download"}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleShareImage}
        disabled={status === "generating"}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </Button>
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
