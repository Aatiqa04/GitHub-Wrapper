# GitHub Wrapped — Dev Stats Dashboard

A "Spotify Wrapped for GitHub" — sign in with GitHub OAuth and get a beautiful, shareable dashboard of your coding activity including commits, languages, streaks, badges, and more.

## Features

- **Contribution Heatmap** — GitHub's iconic green grid visualizing your daily activity
- **Language Breakdown** — Donut chart showing your most-used programming languages
- **Commit Activity** — Monthly contribution trends as an area chart
- **Streak Tracking** — Longest and current contribution streak calculations
- **Top Repositories** — All your repos ranked by commit count with language and star info
- **Achievement Badges** — 10 earnable badges (Polyglot, Streak Master, 1K Club, etc.)
- **Shareable Stats Card** — Download your stats as a PNG image or share via Web Share API
- **Public Profiles** — View any GitHub user's stats at `/user/<username>` without signing in
- **OG Image Generation** — Auto-generated social preview images for every profile
- **Dark Theme** — GitHub-inspired dark UI with green accent colors

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js v5 (GitHub OAuth)
- **Data**: GitHub GraphQL API
- **Charts**: Recharts
- **OG Images**: @vercel/og (Satori)
- **Image Export**: html2canvas

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub OAuth App ([create one here](https://github.com/settings/developers))

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Random secret for NextAuth (`npx auth secret` to generate) |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |
| `GITHUB_APP_TOKEN` | Optional — GitHub PAT for unauthenticated public profile fetching |
| `NEXT_PUBLIC_APP_URL` | Your app URL (default: `http://localhost:3000`) |

**GitHub OAuth App settings:**
- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/auth.ts                              # NextAuth config
/middleware.ts                        # Route protection for /dashboard
/src
  /app
    page.tsx                          # Landing page
    layout.tsx                        # Root layout (dark mode, fonts, providers)
    (auth)/login/page.tsx             # Login page
    (dashboard)/layout.tsx            # Dashboard layout (navbar, auth guard)
    (dashboard)/dashboard/page.tsx    # Main dashboard (server component)
    user/[username]/page.tsx          # Public profile
    user/[username]/opengraph-image.tsx  # OG image generation
    api/auth/[...nextauth]/route.ts   # NextAuth route handler
    api/og/route.tsx                  # General OG image endpoint
  /components
    ui/                               # Primitives (button, card, badge, skeleton, avatar)
    charts/                           # Language pie, commit activity, contribution heatmap
    dashboard/                        # Stats overview, top repos, badge showcase
    cards/                            # Shareable stats card, OG stats card
    shared/                           # Navbar, footer, providers
  /lib
    github/                           # GraphQL client, queries, fetcher
    stats/                            # Stats computation, badge logic, types
    utils.ts                          # cn() helper, formatNumber
    constants.ts                      # Colors, badge definitions, language colors
  /types
    github.ts                         # GitHub API response types
    next-auth.d.ts                    # NextAuth type augmentation
```

## Badge System

| Badge | Condition |
|-------|-----------|
| Night Owl | 30%+ commits between 10PM-4AM |
| Early Bird | 30%+ commits between 5AM-9AM |
| Polyglot | 5+ programming languages |
| Streak Master | 30+ day contribution streak |
| Centurion | 100+ commits in a single month |
| Weekend Warrior | 25%+ contributions on weekends |
| PR Machine | 50+ pull requests opened |
| Open Sourcerer | 10+ public repos contributed to |
| The Consistent | 48+ out of 52 weeks active |
| 1K Club | 1000+ total contributions |

## Deployment

### Vercel (Recommended)

1. Push your repo to GitHub
2. Import the project on [Vercel](https://vercel.com/new)
3. Add all environment variables in the Vercel dashboard
4. Update your GitHub OAuth App callback URL to `https://your-domain.vercel.app/api/auth/callback/github`

### Other platforms

```bash
npm run build
npm start
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

MIT
