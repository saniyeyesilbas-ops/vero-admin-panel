"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockOpenRequests } from "@/mock/mockData";
import { ClipboardList, AlertCircle, CheckCircle, Clock, User, Car } from "lucide-react";

export default function RequestsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [filter, setFilter] = useState<"all" | "acil" | "normal">("all");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const filteredRequests = mockOpenRequests.filter((req) => {
    if (filter === "acil") return req.status === "ACIL";
    if (filter === "normal") return req.status === "NORMAL";
    return true;
  });

  if (!userRole) return null;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-8">
        <div className="space-y-6">
          {/* Başlık */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Talepler</h1>
            </div>
          </div>

          {/* Filtreler */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter("acil")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === "acil"
                  ? "bg-danger-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <AlertCircle className="w-4 h-4" />
              Acil
            </button>
            <button
              onClick={() => setFilter("normal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === "normal"
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Clock className="w-4 h-4" />
              Normal
            </button>
          </div>

          {/* Liste */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <span className="text-sm text-gray-500">
                {filteredRequests.length} talep bulundu
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className={`p-4 ${
                    request.status === "ACIL" ? "bg-danger-50" : "hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                          {request.plate}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          request.status === "ACIL"
                            ? "bg-danger-500 text-white"
                            : "bg-primary-100 text-primary-700"
                        }`}>
                          {request.status === "ACIL" ? "ACİL" : "NORMAL"}
                        </span>
                        <span className="text-sm text-gray-600">{request.type}</span>
                      </div>

                      <p className="text-gray-700">{request.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {request.driverName} ({request.driverPhone})
                        </span>
                        <span className="flex items-center gap-1">
                          <Car className="w-4 h-4" />
                          {request.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
                        İşle
                      </button>
                      <button className="px-3 py-1.5 bg-success-600 text-white text-sm rounded-lg hover:bg-success-700 transition-colors">
                        Kapat
                      </button>
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
