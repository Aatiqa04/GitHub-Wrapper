"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as BadgeUI } from "@/components/ui/badge";
import type { Badge } from "@/lib/stats/types";

export function BadgeShowcase({ badges }: { badges: Badge[] }) {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Badges</CardTitle>
          <span className="text-sm text-gh-muted">
            {earned.length}/{badges.length} earned
          </span>
        </div>
      </CardHeader>
      <div className="flex flex-wrap gap-2">
        {earned.map((badge, i) => (
          <BadgeUI
            key={badge.id}
            variant="earned"
            className="animate-slide-up"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: "backwards",
              borderColor: `${badge.color}40`,
              backgroundColor: `${badge.color}15`,
              color: badge.color,
            }}
            title={badge.description}
          >
            <span>{badge.icon}</span>
            {badge.name}
          </BadgeUI>
        ))}
        {locked.map((badge) => (
          <BadgeUI
            key={badge.id}
            variant="locked"
            title={badge.description}
          >
            <span className="grayscale">{badge.icon}</span>
            {badge.name}
          </BadgeUI>
        ))}
      </div>
    </Card>
  );
}
