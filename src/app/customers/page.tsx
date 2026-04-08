"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockCustomers } from "@/mock/mockData";
import { Building2, Plus, Search, Phone, Mail, MapPin } from "lucide-react";

export default function CustomersPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const filteredCustomers = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
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
              <Building2 className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Müşteriler</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Yeni Müşteri
            </button>
          </div>

          {/* Arama */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Müşteri adı veya telefon ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Liste */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <span className="text-sm text-gray-500">
                {filteredCustomers.length} müşteri bulundu
              </span>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{customer.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          customer.type === "KURUMSAL"
                            ? "bg-primary-100 text-primary-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {customer.type === "KURUMSAL" ? "Kurumsal" : "Bireysel"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {customer.phone}
                        </span>
                        {customer.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {customer.email}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        {customer.address}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span>Hizmet Bedeli: %{customer.serviceFeePercent}</span>
                        <span>Ödeme: {customer.paymentTerm}</span>
                      </div>
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
