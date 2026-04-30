export const HEATMAP_COLORS = [
  "#161b22", // level 0 - no contributions
  "#0e4429", // level 1
  "#006d32", // level 2
  "#26a641", // level 3
  "#39d353", // level 4
];

export const CONTRIBUTION_LEVELS: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const BADGE_DEFINITIONS = [
  {
    id: "night-owl",
    name: "Night Owl",
    description: "30%+ commits between 10PM-4AM",
    icon: "🦉",
    color: "#6e40c9",
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "30%+ commits between 5AM-9AM",
    icon: "🐦",
    color: "#f0883e",
  },
  {
    id: "polyglot",
    name: "Polyglot",
    description: "5+ programming languages",
    icon: "🌍",
    color: "#58a6ff",
  },
  {
    id: "streak-master",
    name: "Streak Master",
    description: "30+ day contribution streak",
    icon: "🔥",
    color: "#f85149",
  },
  {
    id: "centurion",
    name: "Centurion",
    description: "100+ commits in a single month",
    icon: "💯",
    color: "#39d353",
  },
  {
    id: "weekend-warrior",
    name: "Weekend Warrior",
    description: "25%+ contributions on weekends",
    icon: "⚔️",
    color: "#bc8cff",
  },
  {
    id: "pr-machine",
    name: "PR Machine",
    description: "50+ pull requests opened",
    icon: "🤖",
    color: "#3fb950",
  },
  {
    id: "open-sourcerer",
    name: "Open Sourcerer",
    description: "10+ public repos contributed to",
    icon: "🧙",
    color: "#a371f7",
  },
  {
    id: "the-consistent",
    name: "The Consistent",
    description: "48+ out of 52 weeks active",
    icon: "📅",
    color: "#d29922",
  },
  {
    id: "1k-club",
    name: "1K Club",
    description: "1000+ total contributions",
    icon: "🏆",
    color: "#e3b341",
  },
] as const;

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Scala: "#c22d40",
  Lua: "#000080",
  R: "#198CE7",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};
