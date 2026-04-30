"use client";

import { useRouter } from "next/navigation";
import { WrappedCard } from "@/components/story/wrapped-card";
import type { DeveloperStats } from "@/lib/stats/types";

export function StoryClient({ stats }: { stats: DeveloperStats }) {
  const router = useRouter();

  return (
    <WrappedCard stats={stats} onClose={() => router.push("/dashboard")} />
  );
}
