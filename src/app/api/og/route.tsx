import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { fetchPublicUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { StatsCardOG } from "@/components/cards/stats-card-og";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1200px",
            height: "630px",
            backgroundColor: "#0d1117",
            color: "#c9d1d9",
            fontSize: "48px",
            fontWeight: 700,
          }}
        >
          GitHub Wrapped
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  try {
    const profile = await fetchPublicUserProfile(username);
    const stats = computeStats(profile);

    return new ImageResponse(<StatsCardOG stats={stats} />, {
      width: 1200,
      height: 630,
    });
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1200px",
            height: "630px",
            backgroundColor: "#0d1117",
            color: "#c9d1d9",
            fontSize: "36px",
          }}
        >
          User not found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
