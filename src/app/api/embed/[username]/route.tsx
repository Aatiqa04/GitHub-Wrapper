import { NextRequest, NextResponse } from "next/server";
import { fetchPublicUserProfile } from "@/lib/github/fetcher";
import { computeStats } from "@/lib/stats/compute";
import { generateEmbedSvg, generateErrorSvg } from "@/lib/embed/generate-svg";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const { searchParams } = request.nextUrl;
  const theme = searchParams.get("theme") || "dark";
  const show = searchParams.get("show")?.split(",") || undefined;
  const hideTitle = searchParams.get("hide_title") === "true";

  try {
    const profile = await fetchPublicUserProfile(params.username);
    const stats = computeStats(profile);
    const svg = generateEmbedSvg(stats, { theme, show, hideTitle });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    const svg = generateErrorSvg(`User "${params.username}" not found`, theme);
    return new NextResponse(svg, {
      status: 404,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=300",
      },
    });
  }
}
