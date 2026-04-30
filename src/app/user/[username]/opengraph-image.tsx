import { ImageResponse } from "@vercel/og";
import { fetchPublicUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { StatsCardOG } from "@/components/cards/stats-card-og";

export const runtime = "edge";
export const alt = "GitHub Wrapped Stats";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: { username: string };
}) {
  let stats;
  try {
    const profile = await fetchPublicUserProfile(params.username);
    stats = computeStats(profile);
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
            fontSize: "48px",
            fontWeight: 700,
          }}
        >
          GitHub Wrapped
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(<StatsCardOG stats={stats} />, {
    ...size,
  });
}
