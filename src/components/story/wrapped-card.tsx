"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HEATMAP_COLORS } from "@/lib/constants";
import type { DeveloperStats, HeatmapDay } from "@/lib/stats/types";

interface WrappedCardProps {
  stats: DeveloperStats;
  onClose: () => void;
}

interface StatTile {
  icon: string;
  label: string;
  value: string;
  color: string;
}

// Level-0 override so empty cells show as a visible grid against the dark container
const MINI_HEATMAP_COLORS = ["#1b2130", ...HEATMAP_COLORS.slice(1)];

function MiniHeatmap({ data }: { data: HeatmapDay[][] }) {
  return (
    <div className="flex gap-[1.5px] w-full justify-center">
      {data.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[1.5px]">
          {week.map((day) => (
            <div
              key={day.date}
              className="w-[5px] h-[5px] rounded-[1px]"
              style={{ backgroundColor: MINI_HEATMAP_COLORS[day.level] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function getMostActiveMonth(stats: DeveloperStats): string {
  if (stats.monthlyActivity.length === 0) return "N/A";
  const best = stats.monthlyActivity.reduce((a, b) =>
    b.contributions > a.contributions ? b : a
  );
  return best.month.split(" ")[0];
}

function getMostActiveDay(stats: DeveloperStats): string {
  if (stats.dayOfWeekActivity.length === 0) return "N/A";
  const best = stats.dayOfWeekActivity.reduce((a, b) =>
    b.contributions > a.contributions ? b : a
  );
  return best.day;
}

const TILE_COLORS: [string, string][] = [
  // [text color, bg color]
  ["#58a6ff", "#58a6ff15"],
  ["#d29922", "#d2992215"],
  ["#f778ba", "#f778ba15"],
  ["#f85149", "#f8514915"],
  ["#bc8cff", "#bc8cff15"],
  ["#d29922", "#d2992215"],
  ["#bc8cff", "#bc8cff15"],
  ["#39d353", "#39d35315"],
];

export function WrappedCard({ stats, onClose }: WrappedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const tiles: StatTile[] = [
    {
      icon: stats.archetype.icon,
      label: "Developer Archetype",
      value: stats.archetype.title.replace("The ", ""),
      color: stats.archetype.color,
    },
    {
      icon: "⚡",
      label: "Longest Streak",
      value: `${stats.longestStreak} days`,
      color: "#d29922",
    },
    {
      icon: "🏆",
      label: "Total Commits",
      value: stats.totalCommits.toLocaleString(),
      color: "#f778ba",
    },
    {
      icon: "📅",
      label: "Most Active Month",
      value: getMostActiveMonth(stats),
      color: "#f85149",
    },
    {
      icon: "📊",
      label: "Most Active Day",
      value: getMostActiveDay(stats),
      color: "#bc8cff",
    },
    {
      icon: "⭐",
      label: "Stars Earned",
      value: stats.totalStars.toLocaleString(),
      color: "#d29922",
    },
    {
      icon: "💻",
      label: "Top Language",
      value: stats.languages[0]?.name || "N/A",
      color: stats.languages[0]?.color || "#bc8cff",
    },
    {
      icon: "🚀",
      label: "Power Level",
      value:
        stats.totalContributions >= 2000
          ? "Sage Mode"
          : stats.totalContributions >= 1000
            ? "Elite Class"
            : stats.totalContributions >= 500
              ? "Rising Star"
              : "Starter",
      color: "#39d353",
    },
  ];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Clone into an offscreen container so html2canvas captures the full card
      // without viewport/overflow clipping from the modal
      const original = cardRef.current;
      const clone = original.cloneNode(true) as HTMLElement;
      clone.style.width = `${original.offsetWidth}px`;

      const wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position:absolute;top:0;left:-9999px;overflow:visible;";
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Wait a frame for layout
      await new Promise((r) => requestAnimationFrame(r));

      const canvas = await html2canvas(clone, {
        backgroundColor: "#0c1017",
        scale: 2,
        useCORS: true,
        height: clone.scrollHeight,
        windowHeight: clone.scrollHeight + 100,
      });

      document.body.removeChild(wrapper);

      const link = document.createElement("a");
      link.download = `github-wrapped-${stats.username}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/user/${stats.username}`;
    if (navigator.share) {
      await navigator.share({
        title: `${stats.username}'s GitHub Wrapped`,
        text: "Check out my GitHub Wrapped!",
        url: profileUrl,
      });
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Check out my GitHub Wrapped! ${profileUrl}`
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[400px] my-auto animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 rounded-full bg-gh-border p-1.5 text-white hover:bg-gh-muted/50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Capturable card */}
        <div
          ref={cardRef}
          className="rounded-2xl"
          style={{ backgroundColor: "#0c1017", border: "1px solid #1e2a3a" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 pt-4 pb-3">
            <img
              src={stats.avatarUrl}
              alt={stats.username}
              className="w-10 h-10 rounded-full border-2 border-gh-border"
            />
            <div>
              <p className="text-sm font-bold text-white leading-tight">
                @{stats.username}
              </p>
              <p className="text-xs font-semibold text-gh-green leading-tight">
                {new Date().getFullYear()} Year in Code
              </p>
            </div>
          </div>

          {/* Mini Heatmap — dark bg so level-0 cells (#1b2130) show as visible grid */}
          <div
            className="mx-3 rounded-lg p-3"
            style={{ backgroundColor: "#0f1319", border: "1px solid #1a2332" }}
          >
            <MiniHeatmap data={stats.heatmapData} />
            <p className="text-[10px] text-gh-muted mt-1.5">
              {stats.totalContributions.toLocaleString()} contributions in the last year
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 px-3 pt-3 pb-5">
            {tiles.map((tile, i) => (
              <div
                key={tile.label}
                className="rounded-lg px-3 py-3"
                style={{
                  backgroundColor: TILE_COLORS[i]?.[1] ?? "#ffffff10",
                  borderLeft: `3px solid ${tile.color}`,
                }}
              >
                <p className="text-[10px] text-gh-muted leading-normal">
                  {tile.icon} {tile.label}
                </p>
                <p
                  className="text-[15px] font-bold leading-normal mt-0.5 whitespace-nowrap overflow-visible"
                  style={{ color: tile.color }}
                >
                  {tile.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-gh-border bg-gh-card hover:bg-gh-border px-3 py-2.5 text-xs font-medium text-white transition-colors disabled:opacity-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {downloading ? "Saving..." : "Download"}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gh-green hover:bg-gh-green-dark px-3 py-2.5 text-xs font-semibold text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
