"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HEATMAP_COLORS, MONTHS, DAYS_OF_WEEK } from "@/lib/constants";
import type { HeatmapDay } from "@/lib/stats/types";
import { parseISO } from "date-fns";

interface Props {
  data: HeatmapDay[][];
  totalContributions: number;
}

export function ContributionHeatmap({ data, totalContributions }: Props) {
  const [visibleCols, setVisibleCols] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCols((prev) => {
        if (prev >= data.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 3;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [data.length]);

  // Compute month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  data.forEach((week, weekIdx) => {
    if (week.length > 0) {
      const month = parseISO(week[0].date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: weekIdx });
        lastMonth = month;
      }
    }
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contribution Heatmap</CardTitle>
          <span className="text-sm text-gh-muted">
            {totalContributions.toLocaleString()} contributions in the last year
          </span>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex ml-8 mb-1">
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="text-xs text-gh-muted"
                style={{
                  position: "relative",
                  left: `${col * 15}px`,
                  marginRight: "-10px",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-1">
              {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => (
                <span
                  key={dayIdx}
                  className="h-[13px] text-xs text-gh-muted leading-[13px]"
                >
                  {dayIdx % 2 === 1 ? DAYS_OF_WEEK[dayIdx] : ""}
                </span>
              ))}
            </div>

            {/* Heatmap grid */}
            {data.map((week, weekIdx) => (
              <div
                key={weekIdx}
                className="flex flex-col gap-0.5"
                style={{
                  opacity: weekIdx < visibleCols ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {week.map((day) => (
                  <div
                    key={day.date}
                    className="h-[13px] w-[13px] rounded-sm transition-colors"
                    style={{ backgroundColor: HEATMAP_COLORS[day.level] }}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-2">
            <span className="text-xs text-gh-muted mr-1">Less</span>
            {HEATMAP_COLORS.map((color, i) => (
              <div
                key={i}
                className="h-[13px] w-[13px] rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-xs text-gh-muted ml-1">More</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
