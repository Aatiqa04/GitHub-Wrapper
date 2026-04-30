"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gh-bg text-center px-4">
      <h1 className="text-4xl font-bold text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gh-muted mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 rounded-lg bg-gh-green px-6 py-3 font-medium text-white hover:bg-gh-green-dark transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
