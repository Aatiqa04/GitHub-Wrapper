"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { DeveloperStats } from "@/lib/stats/types";

export function StatsCard({ stats }: { stats: DeveloperStats }) {
  const earnedBadges = stats.badges.filter((b) => b.earned);
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0d1117",
        scale: 2,
        useCORS: true,
      });
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
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#0d1117",
        scale: 2,
        useCORS: true,
      });
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
          // Fallback: download the image
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

  return (
    <div className="space-y-3">
      {/* Capturable card area */}
      <div ref={cardRef}>
        <Card className="max-w-md mx-auto overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <Avatar src={stats.avatarUrl} alt={stats.username} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-white">
                {stats.name || stats.username}
              </h2>
              <p className="text-sm text-gh-muted">@{stats.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-white">
                {stats.totalContributions.toLocaleString()}
              </p>
              <p className="text-xs text-gh-muted">Contributions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {stats.longestStreak}
              </p>
              <p className="text-xs text-gh-muted">Day Streak</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalPRs}</p>
              <p className="text-xs text-gh-muted">Pull Requests</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {stats.totalStars}
              </p>
              <p className="text-xs text-gh-muted">Stars Earned</p>
            </div>
          </div>

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
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
              {stats.languages.slice(0, 4).map((lang) => (
                <span key={lang.name} className="flex items-center gap-1 text-xs text-gh-muted">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.name}
                </span>
              ))}
            </div>
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {earnedBadges.slice(0, 6).map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
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
          )}

          <div className="mt-4 pt-4 border-t border-gh-border text-center">
            {/* Action buttons — outside the captured area */}
            <div className="flex gap-2 max-w-md mx-auto">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gh-border bg-gh-card hover:bg-gh-border px-3 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {downloading ? "Saving..." : "Download "}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gh-border bg-gh-card hover:bg-gh-border px-3 py-2.5 text-sm font-medium text-gh-text transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </Card>
      </div>

      
    </div>
  );
}
