"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Something went wrong!</h2>
      <p className="mb-6 text-gray-500 max-w-md">
        We couldn't load this section of the application. Please try refreshing the page.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-black"
      >
        Try again
      </button>
    </div>
  );
}
