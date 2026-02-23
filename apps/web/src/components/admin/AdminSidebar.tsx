"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Users, UtensilsCrossed, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Stores', href: '/admin/stores', icon: UtensilsCrossed }, // Maybe distinguish icon
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center text-xl">
           🍔
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">GrubHub <span className="text-brand-orange text-xs uppercase bg-orange-50 px-1 py-0.5 rounded ml-1">Admin</span></span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${isActive ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
              `}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
         <button 
           onClick={() => {
               logout();
               window.location.href = "/login";
           }}
           className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
         >
            <LogOut size={18} />
            Sign Out
         </button>
      </div>
    </div>
  );
}
