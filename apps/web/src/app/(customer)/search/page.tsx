import { db } from "@/lib/db";
import SearchClient from "./SearchClient";
import Navbar from "@/components/Navbar";

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || "";

  // Fetch results from DB
  const products = await db.product.findMany({
    where: {
        OR: [
            { name: { contains: query } }, 
            { description: { contains: query } },
            { category: { name: { contains: query } } }
        ]
    },
    include: {
        category: true,
        storeProducts: {
            take: 1
        }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <SearchClient initialProducts={products} initialQuery={query} />
    </div>
  );
}
