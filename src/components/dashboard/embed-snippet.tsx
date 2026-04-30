"use client";

import { useState } from "react";

type Format = "markdown" | "html";
type Theme = "dark" | "light";

export function EmbedSnippet({ username }: { username: string }) {
  const [format, setFormat] = useState<Format>("markdown");
  const [theme, setTheme] = useState<Theme>("dark");
  const [copied, setCopied] = useState(false);

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://github-wrapped.vercel.app";

  const embedUrl = `${origin}/api/embed/${username}?theme=${theme}`;
  const profileUrl = `${origin}/user/${username}`;

  const snippet =
    format === "markdown"
      ? `[![GitHub Wrapped](${embedUrl})](${profileUrl})`
      : `<a href="${profileUrl}"><img src="${embedUrl}" alt="GitHub Wrapped" /></a>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">Embed in README</h3>
      <p className="text-xs text-gh-muted leading-relaxed">
        Add your GitHub Wrapped stats badge to your profile README.
        Copy the snippet below, paste it into your{" "}
        <span className="text-gh-text font-medium">github.com/{username}/{username}/README.md</span>
        , and commit.
      </p>

      {/* Live preview */}
      <div className="rounded-lg border border-gh-border bg-gh-bg p-3 flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={embedUrl}
          alt="Embed preview"
          className="max-w-full"
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-2">
        <div className="flex rounded-md border border-gh-border overflow-hidden text-xs">
          <button
            onClick={() => setFormat("markdown")}
            className={`px-3 py-1.5 ${format === "markdown" ? "bg-gh-border text-white" : "bg-gh-card text-gh-muted"}`}
          >
            Markdown
          </button>
          <button
            onClick={() => setFormat("html")}
            className={`px-3 py-1.5 ${format === "html" ? "bg-gh-border text-white" : "bg-gh-card text-gh-muted"}`}
          >
            HTML
          </button>
        </div>
        <div className="flex rounded-md border border-gh-border overflow-hidden text-xs">
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1.5 ${theme === "dark" ? "bg-gh-border text-white" : "bg-gh-card text-gh-muted"}`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1.5 ${theme === "light" ? "bg-gh-border text-white" : "bg-gh-card text-gh-muted"}`}
          >
            Light
          </button>
        </div>
      </div>

      {/* Snippet */}
      <div className="relative">
        <pre className="rounded-lg border border-gh-border bg-gh-bg p-3 text-xs text-gh-text overflow-x-auto whitespace-pre-wrap break-all">
          {snippet}
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 rounded-md border border-gh-border bg-gh-card px-2 py-1 text-xs text-gh-muted hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
