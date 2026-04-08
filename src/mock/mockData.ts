import {
  Customer,
  Supplier,
  Driver,
  Vehicle,
  OpenRequest,
  ServiceVehicle,
  PendingExpense,
  Expense,
  Invoice,
  ExpenseDocument,
} from "@/lib/types";

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    type: "KURUMSAL",
    name: "ABC Lojistik A.Ş.",
    address: "Atatürk Mah. Cumhuriyet Cad. No:123 İstanbul",
    phone: "0212 123 45 67",
    email: "info@abclojistik.com",
    taxOffice: "Beylikdüzü",
    taxNumber: "1234567890",
    fyName: "Ahmet Yılmaz",
    fyEmail: "ahmet@abclojistik.com",
    fyPhone: "0532 123 45 67",
    serviceFeePercent: 5,
    paymentTerm: "30 gün",
    otherTerms: "Yıllık indirim %10",
  },
  {
    id: "c2",
    type: "BIREYSEL",
    name: "Mehmet Kaya",
    address: "Kadıköy, İstanbul",
    phone: "0533 987 65 43",
    tckn: "12345678901",
    serviceFeePercent: 0,
    paymentTerm: "Peşin",
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: "s1",
    name: "Otorapor A.Ş.",
    address: "Sanayi Mah. Teknopark Blok A No:5 İstanbul",
    phone: "0216 555 66 77",
    taxOffice: "Pendik",
    taxNumber: "9876543210",
    contactName: "Ali Demir",
    contactEmail: "ali@otorapor.com",
    contactPhone: "0532 555 66 77",
    discountRate: 10,
    paymentTerm: "15 gün",
    iban: "TR00 1234 5678 9012 3456 7890 01",
    tags: ["YETKILI_SERVIS", "HASAR_SERVISI"],
  },
  {
    id: "s2",
    name: "Lastikçi Mehmet",
    address: "Oto Sanayi Sitesi No:45 Ankara",
    phone: "0312 444 55 66",
    taxOffice: "Yenimahalle",
    taxNumber: "1122334455",
    contactName: "Mehmet Yılmaz",
    contactEmail: "mehmet@lastikci.com",
    contactPhone: "0533 444 55 66",
    discountRate: 5,
    paymentTerm: "Peşin",
    iban: "TR00 9876 5432 1098 7654 3210 99",
    tags: ["LASTIK", "MINI_ONARIM"],
  },
];

export const mockDrivers: Driver[] = [
  {
    id: "d1",
    name: "Ali Veli",
    phone: "0555 111 22 33",
    email: "ali.veli@email.com",
    customerId: "c1",
    customerName: "ABC Lojistik A.Ş.",
  },
  {
    id: "d2",
    name: "Ayşe Yılmaz",
    phone: "0555 222 33 44",
    customerId: "c2",
    customerName: "Mehmet Kaya",
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    chassisNo: "WVWZZZ1KZBW123456",
    plate: "34 ABC 123",
    modelYear: 2022,
    brand: "VOLKSWAGEN",
    model: "PASSAT 1.5 TSI",
    transmission: "OTOMATIK",
    fuel: "BENZIN",
    engineNo: "ABC123456",
    registrationNo: "123456789",
    registrationDate: "2022-03-15",
    status: "AKTIF",
    acquisitionType: "KIRALIK",
    serviceType: "YETKILI",
    inspectionDate: "2026-03-15",
    insuranceEndDate: "2026-03-15",
    customerId: "c1",
    customerName: "ABC Lojistik A.Ş.",
    driverId: "d1",
    driverName: "Ali Veli",
    driverPhone: "0555 111 22 33",
    color: "BEYAZ",
    hasGps: true,
    hasVale: false,
    spareKey: true,
  },
  {
    id: "v2",
    chassisNo: "WDD2050121A123456",
    plate: "06 DEF 456",
    modelYear: 2023,
    brand: "MERCEDES",
    model: "C200",
    transmission: "OTOMATIK",
    fuel: "DIZEL",
    engineNo: "DEF789012",
    registrationNo: "987654321",
    registrationDate: "2023-01-10",
    status: "AKTIF",
    acquisitionType: "OZMAL",
    serviceType: "OZEL",
    inspectionDate: "2026-01-10",
    insuranceEndDate: "2026-01-10",
    customerId: "c2",
    customerName: "Mehmet Kaya",
    driverId: "d2",
    driverName: "Ayşe Yılmaz",
    driverPhone: "0555 222 33 44",
    color: "SIYAH",
    hasGps: true,
    hasVale: true,
    spareKey: true,
  },
];

export const mockOpenRequests: OpenRequest[] = [
  {
    id: "r1",
    type: "BAKIM",
    plate: "34 ABC 123",
    driverName: "Ali Veli",
    driverPhone: "0555 111 22 33",
    date: "2026-04-08",
    status: "ACIL",
    description: "Periyodik bakım süresi geçti",
  },
  {
    id: "r2",
    type: "LASTIK",
    plate: "06 DEF 456",
    driverName: "Ayşe Yılmaz",
    driverPhone: "0555 222 33 44",
    date: "2026-04-05",
    status: "NORMAL",
    description: "Kış lastiği değişimi",
  },
];

export const mockServiceVehicles: ServiceVehicle[] = [
  {
    id: "sv1",
    plate: "34 ABC 123",
    processType: "BAKIM",
    serviceName: "Otorapor A.Ş.",
    entryDate: "2026-04-06",
  },
];

export const mockPendingExpenses: PendingExpense[] = [
  {
    id: "pe1",
    description: "20.000 km bakımı - Otorapor",
    amount: 2500,
    vehiclePlate: "34 ABC 123",
    date: "2026-04-06",
  },
  {
    id: "pe2",
    description: "Yakıt alımı - Shell",
    amount: 850,
    vehiclePlate: "06 DEF 456",
    date: "2026-04-05",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "e1",
    type: "BAKIM",
    vehiclePlate: "34 ABC 123",
    date: "2026-03-10",
    totalAmount: 2500,
    status: "ONAYLANDI",
    createdAt: "2026-03-10",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "i1",
    expenseAmount: 2500,
    reflectionAmount: 2625,
    customerId: "c1",
    customerName: "ABC Lojistik A.Ş.",
    serviceFeePercent: 5,
    createdAt: "2026-03-15",
    status: "FATURALANDI",
  },
];

export const mockExpenseDocuments: ExpenseDocument[] = [
  {
    id: "ed1",
    fileName: "fatura_12345.pdf",
    fileUrl: "/uploads/fatura_12345.pdf",
    uploadDate: "2026-04-06",
    uploadedBy: "VA001",
    lines: [
      {
        id: "el1",
        itemName: "Motor Yağı 5W-30",
        group: "MOTOR_YAGI",
        quantity: 5,
        unitPrice: 150,
        total: 750,
        vatRate: 20,
        vatAmount: 150,
        grandTotal: 900,
      },
      {
        id: "el2",
        itemName: "Filtre Seti",
        group: "YEDEK_PARCA",
        quantity: 1,
        unitPrice: 400,
        total: 400,
        vatRate: 20,
        vatAmount: 80,
        grandTotal: 480,
      },
    ],
    status: "BEKLIYOR",
    supplierId: "s1",
    vehicleId: "v1",
  },
];

export const expenseGroups = [
  { value: "MOTOR_YAGI", label: "Motor Yağı" },
  { value: "YEDEK_PARCA", label: "Yedek Parça" },
  { value: "ISCIK", label: "İşçilik" },
  { value: "LASTIK", label: "Lastik" },
  { value: "SARF_MALZEMESI", label: "Sarf Malzemesi" },
  { value: "DIGER", label: "Diğer" },
];

export const supplierTags = [
  { value: "YETKILI_SATICI", label: "Yetkili Satıcı" },
  { value: "YETKILI_SERVIS", label: "Yetkili Servis" },
  { value: "OZEL_SERVIS", label: "Özel Servis" },
  { value: "HASAR_SERVISI", label: "Hasar Servisi" },
  { value: "MINI_ONARIM", label: "Mini Onarım" },
  { value: "LASTIK", label: "Lastik" },
  { value: "CEKICI", label: "Çekici / Yol Yardım" },
  { value: "GUNLUK_KIRALAMA", label: "Günlük Kiralama" },
  { value: "VALE", label: "Vale Hizmeti" },
  { value: "OTO_YIKAMA", label: "Oto Yıkama / Kuaför" },
  { value: "EL_ARAC_TICARETI", label: "El Araç Ticareti" },
  { value: "TRAFIK_MUSAVIRI", label: "Trafik Müşaviri" },
  { value: "IHALE_PLATFORMU", label: "İhale Platformu" },
];

export const vehicleStatuses = [
  { value: "AKTIF", label: "Aktif" },
  { value: "PASIF", label: "Pasif" },
  { value: "SATILDI", label: "Satıldı" },
  { value: "IADE", label: "İade" },
];

export const fuelTypes = [
  { value: "BENZIN", label: "Benzin" },
  { value: "DIZEL", label: "Dizel" },
  { value: "BEV", label: "BEV (Elektrik)" },
  { value: "PHEV", label: "PHEV (Plug-in Hibrit)" },
  { value: "HEV", label: "HEV (Hibrit)" },
];

export const transmissionTypes = [
  { value: "OTOMATIK", label: "Otomatik" },
  { value: "MANUEL", label: "Manuel" },
];

export const serviceTypes = [
  { value: "YETKILI", label: "Yetkili" },
  { value: "OZEL", label: "Özel" },
  { value: "KARMA", label: "Karma" },
];

export const acquisitionTypes = [
  { value: "KIRALIK", label: "Kiralık" },
  { value: "OZMAL", label: "Özmal" },
];

export const winterTireStatuses = [
  { value: "ARACTA", label: "Araçta" },
  { value: "DEPODA", label: "Depoda" },
  { value: "YOK", label: "Yok" },
];
