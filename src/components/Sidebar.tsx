"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Truck,
  Users,
  Car,
  ClipboardList,
  Wallet,
  Database,
  Settings,
  LogOut,
  Shield,
  User,
} from "lucide-react";

interface SidebarProps {
  userRole: "VA" | "FY";
}

const menuItems = [
  { href: "/dashboard", label: "Panel", icon: LayoutDashboard, roles: ["VA", "FY"] },
  { href: "/customers", label: "Müşteriler", icon: Building2, roles: ["VA", "FY"] },
  { href: "/suppliers", label: "Tedarikçiler", icon: Truck, roles: ["VA", "FY"] },
  { href: "/drivers", label: "Sürücüler", icon: Users, roles: ["VA", "FY"] },
  { href: "/vehicles", label: "Araçlar", icon: Car, roles: ["VA", "FY"] },
  { href: "/requests", label: "Talepler", icon: ClipboardList, roles: ["VA", "FY"] },
  { href: "/costs", label: "Maliyetler", icon: Wallet, roles: ["VA", "FY"] },
  { href: "/data-import", label: "Veriler", icon: Database, roles: ["VA"] },
  { href: "/system", label: "Sistem", icon: Settings, roles: ["VA"] },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">VERO</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userRole === "VA" ? "Vero Admin" : "Filo Yöneticisi"}
            </p>
            <p className="text-xs text-gray-500">{userRole}</p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-danger-600 hover:bg-danger-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </Link>
      </div>
    </aside>
  );
}
