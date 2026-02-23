"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Users, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: UtensilsCrossed, label: "Menu Items", href: "/admin/menu" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Users, label: "Customers", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className="w-64 bg-brand-black text-white h-screen fixed left-0 top-0 flex flex-col z-50">
      <div className="h-20 flex items-center px-8 border-b border-gray-800">
        <span className="text-2xl font-black text-brand-orange tracking-tighter">GRUB</span>
        <span className="text-2xl font-thin text-white">ADMIN</span>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-brand-orange text-white font-bold shadow-lg shadow-brand-orange/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => {
              logout();
              window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
