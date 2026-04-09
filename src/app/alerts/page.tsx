"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockAlerts } from "@/mock/mockData";
import { AlertTriangle, CheckCircle, Eye, Plus, Filter } from "lucide-react";
import { SystemAlert, AlertStatus } from "@/lib/types";

export default function AlertsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockAlerts);
  const [filter, setFilter] = useState<"all" | "ACIL" | "YUKSEK" | "ORTA" | "DUSUK">("all");
  const [statusFilter, setStatusFilter] = useState<AlertStatus | "all">("all");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const filteredAlerts = alerts.filter((alert) => {
    if (filter !== "all" && alert.severity !== filter) return false;
    if (statusFilter !== "all" && alert.status !== statusFilter) return false;
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "ACIL":
        return <span className="text-xs bg-danger-500 text-white px-2 py-1 rounded-full font-medium">ACİL</span>;
      case "YUKSEK":
        return <span className="text-xs bg-warning-500 text-white px-2 py-1 rounded-full font-medium">YÜKSEK</span>;
      case "ORTA":
        return <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full font-medium">ORTA</span>;
      case "DUSUK":
        return <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full font-medium">DÜŞÜK</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case "ACIK":
        return <span className="text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded-full">Açık</span>;
      case "ELE_ALINDI":
        return <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">Ele Alındı</span>;
      case "MASKELE":
        return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Maskele</span>;
      default:
        return null;
    }
  };

  const getAlertTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      BAKIM_GECMIS: "Bakım Zamanı Geçmiş",
      SIGORTA_YAKLASIYOR: "Sigorta Yaklaşıyor",
      SIGORTA_GECMIS: "Sigorta Geçmiş",
      MUAYENE_YAKLASIYOR: "Muayene Yaklaşıyor",
      MUAYENE_GECMIS: "Muayene Geçmiş",
      KM_GUNCELLEME: "KM Güncelleme",
      TALEP_BEKLIYOR: "Talep Bekliyor",
      SERVIS_UZUN_SURE: "Serviste Uzun Süre",
    };
    return labels[type] || type;
  };

  const handleStatusChange = (alertId: string, newStatus: AlertStatus) => {
    setAlerts(alerts.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
  };

  if (!userRole) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-warning-600" />
              <h1 className="text-2xl font-bold text-gray-900">Sistem Uyarıları</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{filteredAlerts.length} uyarı</span>
            </div>
          </div>

          {/* Bilgi Kutusu */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
            <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Sistem Uyarıları Nedir?</p>
              <p className="text-sm text-blue-600 mt-1">
                Bu uyarılar sistem tarafından otomatik oluşturulur. Talep değildir, 
                sadece görünürlük sağlar. İsterseniz bir uyarıdan manuel talep oluşturabilirsiniz.
              </p>
            </div>
          </div>

          {/* Filtreler */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Önem:</span>
            </div>
            {["all", "ACIL", "YUKSEK", "ORTA", "DUSUK"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f === "all" ? "Tümü" : f === "ACIL" ? "Acil" : f === "YUKSEK" ? "Yüksek" : f === "ORTA" ? "Orta" : "Düşük"}
              </button>
            ))}
          </div>

          {/* Liste */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="divide-y divide-gray-200">
              {filteredAlerts.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-3" />
                  <p className="text-gray-500">Tüm uyarılar çözüldü!</p>
                </div>
              ) : (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      alert.severity === "ACIL" ? "bg-danger-50/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                            {alert.vehiclePlate}
                          </span>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">{getAlertTypeLabel(alert.type)}</span>
                          <span className="text-xs text-gray-400">• {alert.createdAt}</span>
                        </div>

                        <p className="text-gray-600">{alert.message}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={alert.status}
                          onChange={(e) => handleStatusChange(alert.id, e.target.value as AlertStatus)}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="ACIK">Açık</option>
                          <option value="ELE_ALINDI">Ele Alındı</option>
                          <option value="MASKELE">Maskele</option>
                        </select>

                        <button className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
                          <Plus className="w-4 h-4" />
                          Talep Oluştur
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
