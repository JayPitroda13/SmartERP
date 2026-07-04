"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../layouts/sidebar";
import Header from "../layouts/header";
import CommandPalette from "../components/CommandPalette";

export default function ERPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (!event.ctrlKey) return;

      switch (event.key.toLowerCase()) {
        case "d":
          event.preventDefault();
          router.push("/dashboard");
          break;

        case "o":
          event.preventDefault();
          router.push("/company");
          break;

        case "c":
          event.preventDefault();
          router.push("/customer");
          break;

        case "i":
          event.preventDefault();
          router.push("/inventory");
          break;

        case "s":
          event.preventDefault();
          router.push("/sales");
          break;

        case "p":
          event.preventDefault();
          router.push("/purchase");
          break;

        case "r":
          event.preventDefault();
          router.push("/reports");
          break;

        case "t":
          event.preventDefault();
          router.push("/settings");
          break;

        default:
          break;
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
  }, [router]);

  return (
    <div className="flex">
      <CommandPalette />

      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}