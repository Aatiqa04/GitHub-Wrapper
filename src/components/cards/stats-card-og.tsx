import type { DeveloperStats } from "@/lib/stats/types";

// OG Image card — uses ONLY inline styles (Satori/vercel-og requirement: flexbox only, no Tailwind)
export function StatsCardOG({ stats }: { stats: DeveloperStats }) {
  const earnedBadges = stats.badges.filter((b) => b.earned);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: "#0d1117",
        padding: "48px",
        fontFamily: "Inter, sans-serif",
        color: "#c9d1d9",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <img
          src={stats.avatarUrl}
          alt=""
          width={96}
          height={96}
          style={{ borderRadius: "50%", border: "3px solid #30363d" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {stats.name || stats.username}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px", color: "#8b949e" }}>
              @{stats.username}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                backgroundColor: `${stats.archetype.color}20`,
                borderRadius: "16px",
                padding: "4px 12px",
                fontSize: "16px",
                color: stats.archetype.color,
                border: `1px solid ${stats.archetype.color}40`,
              }}
            >
              {stats.archetype.icon} {stats.archetype.title}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            viewBox="0 0 16 16"
            width="32"
            height="32"
            fill="#ffffff"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            GitHub Wrapped
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "40px",
        }}
      >
        {[
          { label: "Contributions", value: stats.totalContributions.toLocaleString() },
          { label: "Day Streak", value: stats.longestStreak.toString() },
          { label: "Pull Requests", value: stats.totalPRs.toString() },
          { label: "Stars", value: stats.totalStars.toString() },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              backgroundColor: "#161b22",
              borderRadius: "12px",
              padding: "20px 24px",
              border: "1px solid #30363d",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: "14px", color: "#8b949e" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Language bar */}
      <div
        style={{
          display: "flex",
          height: "8px",
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "32px",
        }}
      >
        {stats.languages.slice(0, 6).map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
          />
        ))}
      </div>

      {/* Language labels + badges */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          {stats.languages.slice(0, 5).map((lang) => (
            <div
              key={lang.name}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: lang.color,
                }}
              />
              <span style={{ fontSize: "14px", color: "#8b949e" }}>
                {lang.name} {lang.percentage.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>

        {earnedBadges.length > 0 && (
          <div style={{ display: "flex", gap: "8px" }}>
            {earnedBadges.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  backgroundColor: `${badge.color}20`,
                  borderRadius: "16px",
                  padding: "4px 12px",
                  fontSize: "13px",
                  color: badge.color,
                  border: `1px solid ${badge.color}40`,
                }}
              >
                {badge.icon} {badge.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
