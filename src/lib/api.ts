const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

// Mock auth token - gerçek uygulamada localStorage'dan alınacak
function getAuthToken(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || "";
  }
  return "";
}

// Mock user email - gerçek uygulamada token'dan çözülecek
function getUserEmail(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userEmail") || "";
  }
  return "";
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const email = getUserEmail();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(email && { "Authorization": `Bearer ${email}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API hatası");
  }

  return response.json();
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    fetchAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  
  start2FA: (email: string) =>
    fetchAPI("/api/auth/start", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  
  verify2FA: (email: string, code: string) =>
    fetchAPI("/api/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    }),
};

// Core API
export const coreAPI = {
  getVehicles: (customerId?: string) =>
    fetchAPI(`/api/core/vehicles${customerId ? `?customerId=${customerId}` : ""}`),
  
  createVehicle: (data: any, customerId?: string) =>
    fetchAPI("/api/core/vehicles", {
      method: "POST",
      body: JSON.stringify({ ...data, customerId }),
    }),
  
  getAlerts: (customerId?: string) =>
    fetchAPI(`/api/core/alerts${customerId ? `?customerId=${customerId}` : ""}`),
};

// Import API
export const importAPI = {
  uploadTSB: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetchAPI("/api/import/tsb", {
      method: "POST",
      body: formData,
    });
  },
  
  uploadVehicles: (file: File, customerId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (customerId) formData.append("customerId", customerId);
    return fetchAPI("/api/import/vehicles", {
      method: "POST",
      body: formData,
    });
  },
  
  uploadFuel: (file: File, customerId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (customerId) formData.append("customerId", customerId);
    return fetchAPI("/api/import/fuel", {
      method: "POST",
      body: formData,
    });
  },
  
  uploadHGS: (file: File, customerId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (customerId) formData.append("customerId", customerId);
    return fetchAPI("/api/import/hgs", {
      method: "POST",
      body: formData,
    });
  },
  
  uploadTPC: (file: File, customerId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (customerId) formData.append("customerId", customerId);
    return fetchAPI("/api/import/tpc", {
      method: "POST",
      body: formData,
    });
  },
};
