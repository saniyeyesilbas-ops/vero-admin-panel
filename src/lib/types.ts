export type UserRole = "VA" | "FY";

export type ExpenseGroup = 
  | "MOTOR_YAGI"
  | "YEDEK_PARCA"
  | "ISCIK"
  | "LASTIK"
  | "SARF_MALZEMESI"
  | "DIGER";

export type ExpenseStatus = "BEKLIYOR" | "ONAYLANDI" | "REDDEDILDI";

export type AlertType = 
  | "BAKIM_GECMIS"
  | "SIGORTA_YAKLASIYOR"
  | "SIGORTA_GECMIS"
  | "MUAYENE_YAKLASIYOR"
  | "MUAYENE_GECMIS"
  | "KM_GUNCELLEME"
  | "TALEP_BEKLIYOR"
  | "SERVIS_UZUN_SURE";

export type AlertStatus = "ACIK" | "ELE_ALINDI" | "MASKELE";

export interface SystemAlert {
  id: string;
  type: AlertType;
  vehiclePlate: string;
  vehicleId: string;
  message: string;
  createdAt: string;
  status: AlertStatus;
  severity: "DUSUK" | "ORTA" | "YUKSEK" | "ACIL";
  relatedRequestId?: string;
}

export interface ExpenseLine {
  id: string;
  itemName: string;
  group: ExpenseGroup;
  quantity: number;
  unitPrice: number;
  total: number;
  vatRate: number;
  vatAmount: number;
  grandTotal: number;
}

export interface ExpenseDocument {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  uploadedBy: string;
  lines: ExpenseLine[];
  status: ExpenseStatus;
  supplierId?: string;
  vehicleId?: string;
  notes?: string;
}

export interface Expense {
  id: string;
  type: "BAKIM" | "ARIZA" | "HASAR" | "LASTIK" | "IKAME" | "VALE" | "MUAYENE" | "MTV" | "DIGER";
  vehiclePlate: string;
  date: string;
  totalAmount: number;
  documentId?: string;
  lines?: ExpenseLine[];
  status: ExpenseStatus;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface Customer {
  id: string;
  type: "KURUMSAL" | "BIREYSEL";
  name: string;
  address: string;
  phone: string;
  email?: string;
  taxOffice?: string;
  taxNumber?: string;
  tckn?: string;
  fyName?: string;
  fyEmail?: string;
  fyPhone?: string;
  serviceFeePercent: number;
  paymentTerm: string;
  otherTerms?: string;
}

export interface Supplier {
  id: string;
  name: string;
  address: string;
  phone: string;
  taxOffice: string;
  taxNumber: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  discountRate: number;
  paymentTerm: string;
  iban: string;
  otherTerms?: string;
  tags: SupplierTag[];
}

export type SupplierTag = 
  | "YETKILI_SATICI"
  | "YETKILI_SERVIS"
  | "OZEL_SERVIS"
  | "HASAR_SERVISI"
  | "MINI_ONARIM"
  | "LASTIK"
  | "CEKICI"
  | "GUNLUK_KIRALAMA"
  | "VALE"
  | "OTO_YIKAMA"
  | "EL_ARAC_TICARETI"
  | "TRAFIK_MUSAVIRI"
  | "IHALE_PLATFORMU";

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email?: string;
  customerId: string;
  customerName: string;
}

export interface Vehicle {
  id: string;
  chassisNo: string;
  plate: string;
  modelYear: number;
  brand: string;
  model: string;
  transmission: "OTOMATIK" | "MANUEL";
  fuel: "BENZIN" | "DIZEL" | "BEV" | "PHEV" | "HEV";
  engineNo: string;
  registrationNo: string;
  registrationDate: string;
  status: "AKTIF" | "PASIF" | "SATILDI" | "IADE";
  acquisitionType: "KIRALIK" | "OZMAL";
  serviceType: "YETKILI" | "OZEL" | "KARMA";
  inspectionDate?: string;
  insuranceEndDate?: string;
  customerId?: string;
  customerName?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverEmail?: string;
  color?: string;
  bodyType?: string;
  doorCount?: number;
  seatCount?: number;
  weight?: number;
  volume?: number;
  summerTireBrand?: string;
  summerTireSize?: string;
  summerTireDot?: string;
  winterTireBrand?: string;
  winterTireSize?: string;
  winterTireDot?: string;
  winterTireStatus?: "ARACTA" | "DEPODA" | "YOK";
  hasGps: boolean;
  hasVale: boolean;
  spareKey: boolean;
  insuranceValue?: number;
  insuranceCompany?: string;
  rentalStart?: string;
  rentalEnd?: string;
  rentalAmount?: number;
  rentalCurrency?: string;
  description?: string;
  notes?: string;
}

export interface OpenRequest {
  id: string;
  type: string;
  plate: string;
  driverName: string;
  driverPhone: string;
  date: string;
  status: "ACIL" | "NORMAL";
  description: string;
}

export interface ServiceVehicle {
  id: string;
  plate: string;
  processType: string;
  serviceName: string;
  entryDate: string;
}

export interface PendingExpense {
  id: string;
  description: string;
  amount: number;
  vehiclePlate: string;
  date: string;
}

export interface Invoice {
  id: string;
  expenseAmount: number;
  reflectionAmount: number;
  customerId: string;
  customerName: string;
  serviceFeePercent: number;
  createdAt: string;
  status: "BEKLIYOR" | "FATURALANDI";
}
