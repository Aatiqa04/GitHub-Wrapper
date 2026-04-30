"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopRepo } from "@/lib/stats/types";

export function TopReposList({ repos }: { repos: TopRepo[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? repos : repos.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Repositories</CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {visible.map((repo, index) => (
          <a
            key={repo.nameWithOwner}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gh-bg group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gh-bg text-sm font-bold text-gh-muted border border-gh-border group-hover:border-gh-green/50 group-hover:text-gh-green transition-colors">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-gh-green transition-colors">
                {repo.name}
              </p>
              <div className="flex items-center gap-3 mt-1">
                {repo.language && (
                  <span className="flex items-center gap-1 text-xs text-gh-muted">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor || "#8b949e" }}
                    />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs text-gh-muted">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {repo.stars}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                {repo.commits.toLocaleString()}
              </p>
              <p className="text-xs text-gh-muted">commits</p>
            </div>
          </a>
        ))}
      </div>
      {repos.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 w-full rounded-lg border border-gh-border py-2 text-sm text-gh-muted hover:text-white hover:bg-gh-bg transition-colors"
        >
          {expanded ? "Show less" : `Show all ${repos.length} repos`}
        </button>
      )}
    </Card>
  );
}
