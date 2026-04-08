"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!userRole) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <DashboardContent userRole={userRole} />
      </main>
    </div>
  );
}
