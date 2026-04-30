import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { fetchUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { StoryClient } from "./story-client";

export default async function StoryPage() {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/login");
  }

  const profile = await fetchUserProfile(session.accessToken);
  const stats = computeStats(profile);

  return <StoryClient stats={stats} />;
}
