import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gh-bg text-center px-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-lg text-gh-muted mb-8">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-gh-green px-6 py-3 font-medium text-white hover:bg-gh-green-dark transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
