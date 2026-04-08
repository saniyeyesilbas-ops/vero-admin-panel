"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockVehicles, vehicleStatuses, fuelTypes, transmissionTypes, serviceTypes, acquisitionTypes } from "@/mock/mockData";
import { Car, Plus, Search, User, Building2, Settings, Fuel, Calendar } from "lucide-react";

export default function VehiclesPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("zorunlu");

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

  const tabs = [
    { id: "zorunlu", label: "Zorunlu Bilgiler" },
    { id: "musteri", label: "Müşteri/Sürücü" },
    { id: "fiziksel", label: "Fiziksel Özellikler" },
    { id: "lastik", label: "Lastik" },
    { id: "teknik", label: "Teknik Özellikler" },
    { id: "finansal", label: "Finansal" },
  ];

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

          {/* Sekmeler */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? "bg-primary-600 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Liste */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <span className="text-sm text-gray-500">
                {filteredVehicles.length} araç bulundu
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      {/* Plaka ve Temel Bilgiler */}
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900 bg-primary-50 px-3 py-1 rounded-lg">
                          {vehicle.plate}
                        </span>
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
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {acquisitionTypes.find((a) => a.value === vehicle.acquisitionType)?.label}
                        </span>
                      </div>

                      {/* Seçili Sekmeye Göre İçerik */}
                      {selectedTab === "zorunlu" && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400 text-xs">Marka/Model</p>
                            <p className="font-medium">{vehicle.brand} {vehicle.model}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Model Yılı</p>
                            <p className="font-medium">{vehicle.modelYear}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Yakıt</p>
                            <p className="font-medium">{fuelTypes.find((f) => f.value === vehicle.fuel)?.label}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Vites</p>
                            <p className="font-medium">{transmissionTypes.find((t) => t.value === vehicle.transmission)?.label}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Servis Tipi</p>
                            <p className="font-medium">{serviceTypes.find((s) => s.value === vehicle.serviceType)?.label}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Muayene</p>
                            <p className="font-medium">{vehicle.inspectionDate}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-400 text-xs">Şasi No</p>
                            <p className="font-medium font-mono">{vehicle.chassisNo}</p>
                          </div>
                        </div>
                      )}

                      {selectedTab === "musteri" && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Building2 className="w-3 h-3" />
                              Müşteri
                            </div>
                            <p className="font-medium">{vehicle.customerName || "-"}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <User className="w-3 h-3" />
                              Sürücü
                            </div>
                            <p className="font-medium">{vehicle.driverName || "-"}</p>
                          </div>
                          {vehicle.driverPhone && (
                            <div>
                              <p className="text-gray-400 text-xs">Sürücü Telefon</p>
                              <p className="font-medium">{vehicle.driverPhone}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {selectedTab === "fiziksel" && (
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400 text-xs">Renk</p>
                            <p className="font-medium">{vehicle.color || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Kasa Tipi</p>
                            <p className="font-medium">{vehicle.bodyType || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Kapı Sayısı</p>
                            <p className="font-medium">{vehicle.doorCount || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Koltuk Sayısı</p>
                            <p className="font-medium">{vehicle.seatCount || "-"}</p>
                          </div>
                        </div>
                      )}

                      {selectedTab === "lastik" && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="font-medium text-gray-700">Yaz Lastiği</p>
                            <p className="text-gray-400 text-xs">Marka: {vehicle.summerTireBrand || "-"}</p>
                            <p className="text-gray-400 text-xs">Ebat: {vehicle.summerTireSize || "-"}</p>
                            <p className="text-gray-400 text-xs">DOT: {vehicle.summerTireDot || "-"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-700">Kış Lastiği</p>
                            <p className="text-gray-400 text-xs">Marka: {vehicle.winterTireBrand || "-"}</p>
                            <p className="text-gray-400 text-xs">Ebat: {vehicle.winterTireSize || "-"}</p>
                            <p className="text-gray-400 text-xs">Durum: {vehicle.winterTireStatus || "-"}</p>
                          </div>
                        </div>
                      )}

                      {selectedTab === "teknik" && (
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Settings className="w-3 h-3" />
                              GPS/CAN
                            </div>
                            <p className="font-medium">{vehicle.hasGps ? "Var" : "Yok"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Vale</p>
                            <p className="font-medium">{vehicle.hasVale ? "Var" : "Yok"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Yedek Anahtar</p>
                            <p className="font-medium">{vehicle.spareKey ? "Var" : "Yok"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Kasko Değeri</p>
                            <p className="font-medium">{vehicle.insuranceValue ? `${vehicle.insuranceValue.toLocaleString("tr-TR")} TL` : "-"}</p>
                          </div>
                        </div>
                      )}

                      {selectedTab === "finansal" && (
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                              <Calendar className="w-3 h-3" />
                              Kira Başlangıç
                            </div>
                            <p className="font-medium">{vehicle.rentalStart || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Kira Bitiş</p>
                            <p className="font-medium">{vehicle.rentalEnd || "-"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Kira Tutarı</p>
                            <p className="font-medium">{vehicle.rentalAmount ? `${vehicle.rentalAmount.toLocaleString("tr-TR")} ${vehicle.rentalCurrency}` : "-"}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
