import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Page not found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        The page you represent trying to reach doesn't exist or has been moved. 
        Maybe try searching for something delicious?
      </p>
      <Link 
        href="/" 
        className="mt-8 flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
      >
        <Home size={20} />
        Go Home
      </Link>
    </div>
  );
}
