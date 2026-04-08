"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Settings, Shield, Users, UserCheck, Lock } from "lucide-react";

export default function SystemPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  if (!userRole) return null;

  // Sadece VA görebilir
  if (userRole !== "VA") {
    return (
      <div className="flex min-h-screen">
        <Sidebar userRole={userRole} />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-700">Erişim Reddedildi</h1>
            <p className="text-gray-500 mt-2">Bu sayfaya sadece Vero Admin erişebilir.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex items-center gap-3">
            <Settings className="w-7 h-7 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Sistem</h1>
          </div>

          {/* Yetki Yönetimi */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">Yetki Yönetimi</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Vero Admin (VA)</p>
                    <p className="text-sm text-gray-500">Tam erişim • Tüm müşteriler • Tüm fonksiyonlar</p>
                  </div>
                </div>
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">Aktif</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Filo Yöneticisi (FY)</p>
                    <p className="text-sm text-gray-500">Sınırlı erişim • Kendi müşterileri • Veri girişi</p>
                  </div>
                </div>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">Aktif</span>
              </div>
            </div>
          </div>

          {/* Kullanıcılar */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                <h2 className="font-semibold text-gray-900">Kullanıcılar</h2>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Kullanıcı yönetimi FAZ-2'de aktif olacak.</p>
            </div>
          </div>

          {/* Sistem Bilgileri */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Sistem Bilgileri</h2>
            </div>
            <div className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Versiyon</span>
                <span className="font-medium">FAZ-1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Son Güncelleme</span>
                <span className="font-medium">06.04.2026</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
