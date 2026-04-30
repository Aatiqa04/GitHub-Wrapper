"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { format, parseISO } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { DeveloperStats } from "@/lib/stats/types";

export function StatsCard({ stats }: { stats: DeveloperStats }) {
  const earnedBadges = stats.badges.filter((b) => b.earned);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const captureCard = async () => {
    if (!cardRef.current) return null;
    const original = cardRef.current;
    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.width = `${original.offsetWidth}px`;
    const wrapper = document.createElement("div");
    wrapper.style.cssText =
      "position:absolute;top:0;left:-9999px;overflow:visible;";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    await new Promise((r) => requestAnimationFrame(r));
    const canvas = await html2canvas(clone, {
      backgroundColor: "#0d1117",
      scale: 2,
      useCORS: true,
    });
    document.body.removeChild(wrapper);
    return canvas;
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await captureCard();
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `github-wrapped-${stats.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await captureCard();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `github-wrapped-${stats.username}.png`, {
          type: "image/png",
        });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${stats.username}'s GitHub Wrapped`,
            files: [file],
          });
        } else {
          const link = document.createElement("a");
          link.download = file.name;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }, "image/png");
    } catch {
      // User cancelled share dialog
    }
  };

  const joinDate = (() => {
    try {
      return format(parseISO(stats.joinDate), "MMM yyyy");
    } catch {
      return null;
    }
  })();

  return (
    <div className="space-y-3 w-full">
      {/* Capturable card area */}
      <div ref={cardRef}>
        <Card className="w-full">
          {/* Header — avatar, name, bio */}
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <Avatar src={stats.avatarUrl} alt={stats.username} size="lg" />
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {stats.name || stats.username}
              </h2>
              <p className="text-xs sm:text-sm text-gh-muted">@{stats.username}</p>
              <p className="text-xs mt-0.5" style={{ color: stats.archetype.color }}>
                {stats.archetype.icon} {stats.archetype.title}
              </p>
            </div>
          </div>

          {/* Bio */}
          {stats.bio && (
            <p className="text-xs text-gh-muted mb-4">{stats.bio}</p>
          )}

          {/* Stats grid — 2 cols on small, 3 cols on wider */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">
                {stats.totalContributions.toLocaleString()}
              </p>
              <p className="text-[10px] text-gh-muted">Contributions</p>
            </div>
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">
                {stats.longestStreak}
              </p>
              <p className="text-[10px] text-gh-muted">Longest Streak</p>
            </div>
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">
                {stats.currentStreak}
              </p>
              <p className="text-[10px] text-gh-muted">Current Streak</p>
            </div>
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">{stats.totalPRs}</p>
              <p className="text-[10px] text-gh-muted">Pull Requests</p>
            </div>
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">{stats.totalStars}</p>
              <p className="text-[10px] text-gh-muted">Stars Earned</p>
            </div>
            <div className="rounded-lg bg-gh-bg p-2 sm:p-2.5 text-center">
              <p className="text-base sm:text-lg font-bold text-white">{stats.totalRepos}</p>
              <p className="text-[10px] text-gh-muted">Repositories</p>
            </div>
          </div>

          {/* Top 3 repos */}
          {stats.topRepos.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gh-muted mb-2">Top Repositories</p>
              <div className="space-y-1.5">
                {stats.topRepos.slice(0, 3).map((repo, i) => (
                  <div
                    key={repo.nameWithOwner}
                    className="flex items-center gap-2 rounded-md bg-gh-bg px-2 sm:px-2.5 py-2"
                  >
                    <span className="text-xs font-bold text-gh-muted w-4 shrink-0">{i + 1}</span>
                    <span className="text-xs text-white flex-1 min-w-0 whitespace-nowrap overflow-visible">{repo.name}</span>
                    {repo.language && (
                      <span className="hidden sm:flex items-center gap-1 text-[10px] text-gh-muted shrink-0">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: repo.languageColor || "#8b949e" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="text-[10px] text-gh-muted shrink-0">{repo.commits.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Language bar */}
          <div className="mb-4">
            <div className="flex h-2 rounded-full overflow-hidden">
              {stats.languages.slice(0, 6).map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 mt-2">
              {stats.languages.slice(0, 5).map((lang) => (
                <span key={lang.name} className="flex items-center gap-1 text-[10px] sm:text-xs text-gh-muted">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.name} {lang.percentage.toFixed(0)}%
                </span>
              ))}
            </div>
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-medium text-gh-muted mb-2">
                Badges ({earnedBadges.length}/{stats.badges.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {earnedBadges.map((badge) => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] sm:text-xs"
                    style={{
                      backgroundColor: `${badge.color}15`,
                      color: badge.color,
                      border: `1px solid ${badge.color}40`,
                    }}
                  >
                    {badge.icon} {badge.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer — join date + URL */}
          <div className="pt-3 border-t border-gh-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            {joinDate && (
              <p className="text-[10px] text-gh-muted">
                On GitHub since {joinDate}
              </p>
            )}
            <p className="text-[10px] text-gh-muted">
              github-wrapped.vercel.app/user/{stats.username}
            </p>
          </div>
        </Card>
      </div>

      {/* Action buttons — outside captured area */}
      <div className="flex gap-2 w-full">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gh-border bg-gh-card hover:bg-gh-border px-3 py-2.5 text-xs sm:text-sm font-medium text-white transition-colors disabled:opacity-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {downloading ? "Saving..." : "Download"}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gh-border bg-gh-card hover:bg-gh-border px-3 py-2.5 text-xs sm:text-sm font-medium text-gh-text transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}
