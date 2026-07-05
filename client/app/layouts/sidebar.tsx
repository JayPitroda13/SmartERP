"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Company", path: "/company" },
  { name: "Customer", path: "/customer" },
  { name: "Inventory", path: "/inventory" },
  { name: "Sales", path: "/sales" },
  { name: "Purchase", path: "/purchase" },
  { name: "Reports", path: "/reports" },
  { name: "Activity", path: "/activity" },
  { name: "Settings", path: "/settings" },
];

  return (
    <aside className="w-64 h-screen bg-slate-950 text-white p-5">
      <h1 className="text-3xl font-bold mb-8">
        SmartERP
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            href={menu.path}
            className={`block px-4 py-2 rounded-lg transition-all ${
              pathname === menu.path
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}