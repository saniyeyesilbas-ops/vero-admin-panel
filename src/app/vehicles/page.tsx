"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockVehicles, vehicleStatuses, fuelTypes, transmissionTypes, serviceTypes, acquisitionTypes } from "@/mock/mockData";
import { Car, Plus, Search, ChevronDown, ChevronUp } from "lucide-react";

export default function VehiclesPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const filteredVehicles = mockVehicles.filter((v) =>
    v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.chassisNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!userRole) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Araçlar</h1>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <Plus className="w-5 h-5" />
              Yeni Araç
            </button>
          </div>

          {/* Arama */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Plaka, şasi no, marka veya model ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Liste Başlığı */}
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 grid grid-cols-12 gap-2">
            <div className="col-span-2">Plaka</div>
            <div className="col-span-2">Marka/Model</div>
            <div className="col-span-1">Yıl</div>
            <div className="col-span-1">Yakıt</div>
            <div className="col-span-1">Vites</div>
            <div className="col-span-2">Durum</div>
            <div className="col-span-2">Kullanıcı</div>
            <div className="col-span-1 text-right">Detay</div>
          </div>

          {/* Liste */}
          <div className="space-y-2">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                {/* Özet Satır */}
                <div
                  className="px-4 py-3 grid grid-cols-12 gap-2 items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedVehicle(expandedVehicle === vehicle.id ? null : vehicle.id)}
                >
                  <div className="col-span-2 font-bold text-gray-900">{vehicle.plate}</div>
                  <div className="col-span-2 text-sm text-gray-700">{vehicle.brand} {vehicle.model}</div>
                  <div className="col-span-1 text-sm text-gray-600">{vehicle.modelYear}</div>
                  <div className="col-span-1 text-sm text-gray-600">{fuelTypes.find((f) => f.value === vehicle.fuel)?.label}</div>
                  <div className="col-span-1 text-sm text-gray-600">{transmissionTypes.find((t) => t.value === vehicle.transmission)?.label}</div>
                  <div className="col-span-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      vehicle.status === "AKTIF"
                        ? "bg-success-100 text-success-700"
                        : vehicle.status === "PASIF"
                        ? "bg-gray-100 text-gray-700"
                        : vehicle.status === "SATILDI"
                        ? "bg-warning-100 text-warning-700"
                        : "bg-danger-100 text-danger-700"
                    }`}>
                      {vehicleStatuses.find((s) => s.value === vehicle.status)?.label}
                    </span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 truncate">{vehicle.driverName || "-"}</div>
                  <div className="col-span-1 text-right">
                    {expandedVehicle === vehicle.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 inline" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 inline" />
                    )}
                  </div>
                </div>

                {/* Detay Paneli */}
                {expandedVehicle === vehicle.id && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <VehicleDetailTabs vehicle={vehicle} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// Detay Sekmeleri Bileşeni
function VehicleDetailTabs({ vehicle }: { vehicle: any }) {
  const [activeTab, setActiveTab] = useState<"kimlik" | "sahiplik" | "operasyonel" | "teknik">("kimlik");

  const tabs = [
    { id: "kimlik", label: "Kimlik" },
    { id: "sahiplik", label: "Sahiplik" },
    { id: "operasyonel", label: "Operasyonel" },
    { id: "teknik", label: "Teknik" },
  ];

  return (
    <div className="space-y-4">
      {/* Sekmeler */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sekme İçeriği */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {activeTab === "kimlik" && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs">Plaka *</p><p className="font-medium">{vehicle.plate}</p></div>
            <div><p className="text-gray-400 text-xs">Marka *</p><p className="font-medium">{vehicle.brand}</p></div>
            <div><p className="text-gray-400 text-xs">Model *</p><p className="font-medium">{vehicle.model}</p></div>
            <div><p className="text-gray-400 text-xs">Model Yılı *</p><p className="font-medium">{vehicle.modelYear}</p></div>
            <div><p className="text-gray-400 text-xs">Şasi No *</p><p className="font-medium font-mono text-xs">{vehicle.chassisNo}</p></div>
            <div><p className="text-gray-400 text-xs">Vites *</p><p className="font-medium">{vehicle.transmission}</p></div>
            <div><p className="text-gray-400 text-xs">Yakıt *</p><p className="font-medium">{vehicle.fuel}</p></div>
            <div><p className="text-gray-400 text-xs">Motor No *</p><p className="font-medium font-mono text-xs">{vehicle.engineNo}</p></div>
            <div><p className="text-gray-400 text-xs">Ruhsat No *</p><p className="font-medium">{vehicle.registrationNo}</p></div>
            <div><p className="text-gray-400 text-xs">Tescil Tarihi *</p><p className="font-medium">{vehicle.registrationDate}</p></div>
            <div><p className="text-gray-400 text-xs">Araç Durumu *</p><p className="font-medium">{vehicle.status}</p></div>
            <div><p className="text-gray-400 text-xs">Renk</p><p className="font-medium">{vehicle.color || "-"}</p></div>
          </div>
        )}

        {activeTab === "sahiplik" && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs">Edinim Şekli *</p><p className="font-medium">{vehicle.acquisitionType}</p></div>
            <div><p className="text-gray-400 text-xs">Fatura Tarihi</p><p className="font-medium">{vehicle.rentalStart || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Aylık Kira</p><p className="font-medium">{vehicle.rentalAmount || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Kira Başlangıç</p><p className="font-medium">{vehicle.rentalStart || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Planlanan İade</p><p className="font-medium">{vehicle.rentalEnd || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Kiralama Firması</p><p className="font-medium">-</p></div>
          </div>
        )}

        {activeTab === "operasyonel" && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs">Son KM</p><p className="font-medium">45.230</p></div>
            <div><p className="text-gray-400 text-xs">Son KM Tarihi</p><p className="font-medium">15.03.2026</p></div>
            <div><p className="text-gray-400 text-xs">Vale</p><p className="font-medium">{vehicle.hasVale ? "Var" : "Yok"}</p></div>
            <div><p className="text-gray-400 text-xs">Şehir</p><p className="font-medium">İstanbul</p></div>
            <div className="col-span-2"><p className="text-gray-400 text-xs">Kullanıcı</p><p className="font-medium">{vehicle.driverName || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Telefon</p><p className="font-medium">{vehicle.driverPhone || "-"}</p></div>
          </div>
        )}

        {activeTab === "teknik" && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs">Servis Tipi *</p><p className="font-medium">{vehicle.serviceType}</p></div>
            <div><p className="text-gray-400 text-xs">Muayene *</p><p className="font-medium">{vehicle.inspectionDate || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Sigorta Bitiş *</p><p className="font-medium">{vehicle.insuranceEndDate || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">GPS/CANBUS</p><p className="font-medium">{vehicle.hasGps ? "Var" : "Yok"}</p></div>
            <div><p className="text-gray-400 text-xs">Lastik Ebat</p><p className="font-medium">{vehicle.summerTireSize || "-"}</p></div>
            <div><p className="text-gray-400 text-xs">Kış Lastiği</p><p className="font-medium">{vehicle.winterTireStatus}</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
