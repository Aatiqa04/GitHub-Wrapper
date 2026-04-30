import { notFound } from "next/navigation";
import { fetchPublicUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { PublicProfileClient } from "./public-profile-client";
import type { Metadata } from "next";

export const revalidate = 3600;

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    title: `${params.username}'s GitHub Wrapped`,
    description: `Check out ${params.username}'s coding stats on GitHub Wrapped`,
    openGraph: {
      title: `${params.username}'s GitHub Wrapped`,
      description: `Check out ${params.username}'s coding stats on GitHub Wrapped`,
      images: [`${appUrl}/user/${params.username}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.username}'s GitHub Wrapped`,
      images: [`${appUrl}/user/${params.username}/opengraph-image`],
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  let stats;
  try {
    const profile = await fetchPublicUserProfile(params.username);
    stats = computeStats(profile);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PublicProfileClient stats={stats} />
      </main>
      <Footer />
    </div>
  );
}
