"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-5xl font-bold text-slate-900">
        SmartERP
      </h1>

      <p className="mt-4 text-lg text-slate-600">
        Cloud-Based ERP Management System
      </p>

      <div className="mt-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}