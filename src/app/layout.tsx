import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/shared/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Wrapped — Your Year on GitHub",
  description:
    "Your coding year on GitHub, beautifully visualized. See your commits, languages, streaks, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gh-bg text-gh-text antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
