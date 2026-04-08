"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"VA" | "FY">("VA");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - gerçek uygulamada API çağrısı yapılacak
    if (email && password) {
      // Local storage'a rol bilgisini kaydet
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } else {
      setError("E-posta ve şifre gereklidir");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">VERO Admin</h1>
          <p className="text-primary-100 mt-1">Filo Yönetim Sistemi</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {/* Rol Seçimi */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("VA")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors border-2 ${
                role === "VA"
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Vero Admin (VA)
            </button>
            <button
              type="button"
              onClick={() => setRole("FY")}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors border-2 ${
                role === "FY"
                  ? "border-primary-600 bg-primary-50 text-primary-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Filo Yöneticisi (FY)
            </button>
          </div>

          {/* E-posta */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">E-posta</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@vero.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Şifre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Hata Mesajı */}
          {error && (
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Giriş Butonu */}
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            Giriş Yap
          </button>

          {/* Demo Bilgisi */}
          <p className="text-center text-xs text-gray-400">
            Demo: herhangi bir e-posta ve şifre ile giriş yapabilirsiniz
          </p>
        </form>
      </div>
    </div>
  );
}
