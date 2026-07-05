"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CommandPalette() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const filteredMenus = menus.filter(
    (menu) =>
      menu.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center pt-32 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden">
        <input
          autoFocus
          placeholder="Search modules..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-4 border-b outline-none"
        />

        <div className="max-h-80 overflow-y-auto">
          {filteredMenus.map((menu) => (
            <button
              key={menu.path}
              onClick={() => {
                router.push(menu.path);
                setOpen(false);
                setSearch("");
              }}
              className="w-full text-left px-4 py-3 hover:bg-slate-100"
            >
              {menu.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}