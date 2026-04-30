import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { fetchUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/login");
  }

  const profile = await fetchUserProfile(session.accessToken);
  const stats = computeStats(profile);

  return <DashboardClient stats={stats} />;
}
