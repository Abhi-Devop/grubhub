export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-2xl space-y-6">
        <p className="text-[#d4af37] font-sans font-bold uppercase tracking-[0.2em] text-sm">
          GrubHub Reserve
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#0f291e]">
          Reservations
        </h1>
        <div className="w-24 h-1 bg-[#d4af37] mx-auto opacity-50"></div>
        <p className="text-xl text-stone-600 font-serif italic max-w-lg mx-auto">
          "The table is being set. An exclusive dining experience is coming soon."
        </p>
        <div className="pt-8">
           <button 
             className="bg-[#0f291e] text-white px-8 py-3 rounded-full font-sans font-semibold text-sm hover:bg-[#1a4231] transition-colors shadow-lg cursor-not-allowed opacity-80"
             disabled
           >
             Bookings Opening Soon
           </button>
        </div>
      </div>
    </div>
  );
}
