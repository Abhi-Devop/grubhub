"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-8 text-gray-600">
          We apologize for the inconvenience. The application encountered a critical error.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-orange-600 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
