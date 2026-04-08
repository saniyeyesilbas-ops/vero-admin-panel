"use client";

import { useState, useMemo } from "react";
import {
  mockOpenRequests,
  mockServiceVehicles,
  mockPendingExpenses,
  mockCustomers,
} from "@/mock/mockData";
import {
  AlertCircle,
  Wrench,
  DollarSign,
  Car,
  Filter,
  Calendar,
  Search,
} from "lucide-react";

interface DashboardContentProps {
  userRole: "VA" | "FY";
}

export default function DashboardContent({ userRole }: DashboardContentProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [searchPlate, setSearchPlate] = useState("");

  // Filtrelenmiş veriler
  const filteredRequests = useMemo(() => {
    return mockOpenRequests.filter((req) => {
      if (searchPlate && !req.plate.toLowerCase().includes(searchPlate.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [searchPlate]);

  const filteredServiceVehicles = useMemo(() => {
    return mockServiceVehicles.filter((v) => {
      if (searchPlate && !v.plate.toLowerCase().includes(searchPlate.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [searchPlate]);

  const filteredExpenses = useMemo(() => {
    return mockPendingExpenses.filter((e) => {
      if (searchPlate && !e.vehiclePlate.toLowerCase().includes(searchPlate.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [searchPlate]);

  // Özet değerler
  const totalPendingExpense = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalInvoiced = 15000; // Mock
  const openRequestCount = filteredRequests.length;
  const serviceVehicleCount = filteredServiceVehicles.length;

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Panel</h1>
        <span className="text-sm text-gray-500">
          {userRole === "VA" ? "Vero Admin" : "Filo Yöneticisi"} Görünümü
        </span>
      </div>

      {/* Filtreler */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filtreler</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Tüm Müşteriler</option>
            {mockCustomers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              placeholder="Plaka ara..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Özet Kutuları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Yansıtılmayı Bekleyen</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalPendingExpense.toLocaleString("tr-TR")} TL
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faturalanan (Bu Ay)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {totalInvoiced.toLocaleString("tr-TR")} TL
              </p>
            </div>
            <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Açık Talepler</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{openRequestCount}</p>
            </div>
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Servisteki Araçlar</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{serviceVehicleCount}</p>
            </div>
            <div className="w-12 h-12 bg-danger-50 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-danger-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Liste Alanları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Açık Talepler */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary-600" />
              <h2 className="font-semibold text-gray-900">Açık Talepler</h2>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {filteredRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Açık talep yok.</p>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className={`p-3 rounded-lg border ${
                    req.status === "ACIL"
                      ? "bg-danger-50 border-danger-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{req.plate}</span>
                        {req.status === "ACIL" && (
                          <span className="text-xs bg-danger-500 text-white px-2 py-0.5 rounded-full">
                            ACİL
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{req.type} - {req.driverName}</p>
                      <p className="text-xs text-gray-400">{req.date}</p>
                    </div>
                    <Wrench className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Servisteki Araçlar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-danger-600" />
              <h2 className="font-semibold text-gray-900">Servisteki Araçlar</h2>
            </div>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {filteredServiceVehicles.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Serviste araç yok.</p>
            ) : (
              filteredServiceVehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{v.plate}</span>
                      <p className="text-sm text-gray-600">{v.processType}</p>
                      <p className="text-xs text-gray-400">{v.serviceName}</p>
                    </div>
                    <span className="text-xs text-gray-500">{v.entryDate}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Yansıtma Bekleyen Masraflar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-warning-600" />
              <h2 className="font-semibold text-gray-900">Yansıtma Bekleyen Masraflar</h2>
            </div>
            <span className="text-lg font-bold text-warning-600">
              {totalPendingExpense.toLocaleString("tr-TR")} TL
            </span>
          </div>
        </div>
        <div className="p-4">
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Bekleyen masraf yok.</p>
          ) : (
            <div className="space-y-2">
              {filteredExpenses.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-900">{e.vehiclePlate}</span>
                    <span className="text-sm text-gray-600">{e.description}</span>
                    <span className="text-xs text-gray-400">{e.date}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {e.amount.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
