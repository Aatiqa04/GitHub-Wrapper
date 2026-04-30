import { createGitHubClient } from "./client";
import { USER_PROFILE_QUERY, PUBLIC_USER_PROFILE_QUERY } from "./queries";
import type { UserProfileResponse, PublicUserProfileResponse } from "@/types/github";

export async function fetchUserProfile(token: string): Promise<UserProfileResponse["viewer"]> {
  const client = createGitHubClient(token);
  const data = await client.request<UserProfileResponse>(USER_PROFILE_QUERY);
  return data.viewer;
}

export async function fetchPublicUserProfile(
  login: string,
  token?: string
): Promise<PublicUserProfileResponse["user"]> {
  const accessToken = token || process.env.GITHUB_APP_TOKEN;
  if (!accessToken) {
    throw new Error("No token available for public profile fetching");
  }
  const client = createGitHubClient(accessToken);
  const data = await client.request<PublicUserProfileResponse>(
    PUBLIC_USER_PROFILE_QUERY,
    { login }
  );
  return data.user;
}
