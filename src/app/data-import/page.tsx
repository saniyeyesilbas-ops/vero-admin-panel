"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Database, Upload, FileSpreadsheet, Shield, CheckCircle } from "lucide-react";

export default function DataImportPage() {
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

  const importOptions = [
    {
      id: "tsb",
      title: "TSB Kasko Listesi",
      description: "Araç kasko değerlerini yükle",
      icon: FileSpreadsheet,
      format: "Excel (.xlsx)",
    },
    {
      id: "vehicles",
      title: "Araç Listesi",
      description: "Toplu araç ekleme/güncelleme",
      icon: FileSpreadsheet,
      format: "Excel (.xlsx)",
    },
    {
      id: "drivers",
      title: "Sürücü Listesi",
      description: "Toplu sürücü ekleme/güncelleme",
      icon: FileSpreadsheet,
      format: "Excel (.xlsx)",
    },
    {
      id: "expenses",
      title: "Maliyet Verileri",
      description: "Yakıt, HGS, ceza verilerini yükle",
      icon: FileSpreadsheet,
      format: "Excel (.xlsx)",
    },
    {
      id: "canbus",
      title: "CANbus Verileri",
      description: "Araç telematik verilerini yükle",
      icon: Database,
      format: "CSV / JSON",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex items-center gap-3">
            <Database className="w-7 h-7 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Veri Aktarımı</h1>
          </div>

          {/* Uyarı */}
          <div className="bg-warning-50 border border-warning-200 rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-warning-800 font-medium">Sadece Vero Admin (VA) Erişimi</p>
              <p className="text-sm text-warning-600 mt-1">
                Bu sayfadaki işlemler sistem genelini etkiler. Dikkatli kullanın.
              </p>
            </div>
          </div>

          {/* Yükleme Seçenekleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {importOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:border-primary-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      <p className="text-xs text-gray-400 mt-2">Format: {option.format}</p>

                      <div className="mt-4">
                        <label className="flex items-center justify-center w-full h-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                          <input type="file" className="hidden" accept=".xlsx,.csv,.json" />
                          <Upload className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">Dosya Seç</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Son İşlemler */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Son İşlemler</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Araç Listesi Güncellendi</p>
                  <p className="text-xs text-gray-500">24 araç eklendi • 5 araç güncellendi • 05.04.2026 14:30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
