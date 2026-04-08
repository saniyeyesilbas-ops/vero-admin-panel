"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { mockExpenses, mockExpenseDocuments, expenseGroups } from "@/mock/mockData";
import { Wallet, Plus, FileText, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function CostsPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<"VA" | "FY" | null>(null);
  const [activeTab, setActiveTab] = useState<"expenses" | "documents" | "invoices">("expenses");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as "VA" | "FY" | null;
    if (!role) {
      router.push("/");
    } else {
      setUserRole(role);
    }
  }, [router]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ONAYLANDI":
        return (
          <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Onaylandı
          </span>
        );
      case "BEKLIYOR":
        return (
          <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Bekliyor
          </span>
        );
      case "REDDEDILDI":
        return (
          <span className="text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Reddedildi
          </span>
        );
      default:
        return null;
    }
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
              <Wallet className="w-7 h-7 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Maliyetler</h1>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              <Plus className="w-5 h-5" />
              Yeni Masraf
            </button>
          </div>

          {/* Sekmeler */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("expenses")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "expenses"
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Masraflar
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === "documents"
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-4 h-4" />
              Belgeler
              <span className="bg-primary-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {mockExpenseDocuments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "invoices"
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              Faturalar
            </button>
          </div>

          {/* İçerik */}
          {activeTab === "expenses" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <span className="text-sm text-gray-500">{mockExpenses.length} masraf kaydı</span>
              </div>
              <div className="divide-y divide-gray-200">
                {mockExpenses.map((expense) => (
                  <div key={expense.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{expense.vehiclePlate}</span>
                          <span className="text-sm text-gray-600">{expense.type}</span>
                          {getStatusBadge(expense.status)}
                        </div>
                        <p className="text-sm text-gray-500">{expense.date}</p>
                      </div>
                      <span className="font-bold text-gray-900">
                        {expense.totalAmount.toLocaleString("tr-TR")} TL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-primary-600" />
                  <h2 className="font-semibold text-gray-900">Belge Yükle (FAZ-2 OCR)</h2>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <p className="text-gray-500">PDF, JPG, PNG dosyalarını sürükleyin veya seçin</p>
                  <p className="text-xs text-gray-400 mt-2">FAZ-1: Manuel belge yükleme | FAZ-2: OCR ile otomatik okuma</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-4 border-b border-gray-200">
                  <span className="text-sm text-gray-500">{mockExpenseDocuments.length} belge</span>
                </div>
                <div className="divide-y divide-gray-200">
                  {mockExpenseDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{doc.fileName}</span>
                            {getStatusBadge(doc.status)}
                          </div>
                          <p className="text-xs text-gray-500">
                            {doc.lines.length} satır • {doc.uploadDate}
                          </p>
                        </div>
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          Detay
                        </button>
                      </div>

                      {/* Satır Detayları */}
                      <div className="mt-3 pl-6 space-y-2">
                        {doc.lines.map((line) => (
                          <div key={line.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{line.itemName}</span>
                              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                                {expenseGroups.find((g) => g.value === line.group)?.label}
                              </span>
                            </div>
                            <span className="font-medium">{line.grandTotal.toLocaleString("tr-TR")} TL</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <p className="text-gray-500">Fatura yönetimi FAZ-1'de sadece temel görünürlük sağlar.</p>
              <p className="text-sm text-gray-400 mt-2">Detaylı fatura yönetimi FAZ-2'de aktif olacak.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
