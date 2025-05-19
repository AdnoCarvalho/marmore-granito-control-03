import { User, UserRole, Material, MaterialType, Client, Transaction, TransactionType, Inventory, StockSummary, SalesSummary, ProcessingLevel, NCMCode } from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: UserRole.ADMIN,
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0A2540&color=fff"
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    role: UserRole.MANAGER,
    avatar: "https://ui-avatars.com/api/?name=Manager+User&background=0EA5E9&color=fff"
  },
  {
    id: "3",
    name: "Operator User",
    email: "operator@example.com",
    role: UserRole.OPERATOR,
    avatar: "https://ui-avatars.com/api/?name=Operator+User&background=8A898C&color=fff"
  }
];

// Mock Materials
export const mockMaterials: Material[] = [
  {
    id: "1",
    type: MaterialType.MARBLE,
    name: "Carrara White",
    serialNumber: "MB-CW-001",
    dimensions: {
      width: 280,
      height: 180,
      thickness: 2
    },
    location: "Block A - Row 1",
    quantity: 5,
    purchaseDate: new Date("2023-01-15"),
    purchasePrice: 1200,
    supplier: "Italian Imports Ltd.",
    ncmCode: NCMCode.MARBLE_PROCESSED,
    processingLevel: ProcessingLevel.POLISHED
  },
  {
    id: "2",
    type: MaterialType.GRANITE,
    name: "Black Galaxy",
    serialNumber: "GR-BG-001",
    dimensions: {
      width: 300,
      height: 200,
      thickness: 3
    },
    location: "Block B - Row 2",
    quantity: 3,
    purchaseDate: new Date("2023-02-20"),
    purchasePrice: 1500,
    supplier: "Indian Stone Co.",
    ncmCode: NCMCode.GRANITE_PROCESSED,
    processingLevel: ProcessingLevel.POLISHED
  },
  {
    id: "3",
    type: MaterialType.MARBLE,
    name: "Travertine Beige",
    serialNumber: "MB-TB-001",
    dimensions: {
      width: 250,
      height: 160,
      thickness: 2
    },
    location: "Block A - Row 3",
    quantity: 8,
    purchaseDate: new Date("2023-03-10"),
    purchasePrice: 950,
    supplier: "Turkish Stones Inc.",
    ncmCode: NCMCode.MARBLE_RAW,
    processingLevel: ProcessingLevel.CUT
  },
  {
    id: "4",
    type: MaterialType.GRANITE,
    name: "Absolute Black",
    serialNumber: "GR-AB-001",
    dimensions: {
      width: 320,
      height: 180,
      thickness: 3
    },
    location: "Block B - Row 4",
    quantity: 2,
    purchaseDate: new Date("2023-03-25"),
    purchasePrice: 1800,
    supplier: "African Quarries Ltd.",
    ncmCode: NCMCode.GRANITE_PROCESSED,
    processingLevel: ProcessingLevel.FINISHED
  }
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: "1",
    companyName: "Modern Kitchens LLC",
    cnpj: "12.345.678/0001-90",
    contactName: "John Smith",
    phone: "(11) 98765-4321",
    email: "contact@modernkitchens.com",
    address: {
      street: "Business Avenue",
      number: "1200",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    }
  },
  {
    id: "2",
    companyName: "Luxury Bathrooms SA",
    cnpj: "98.765.432/0001-10",
    contactName: "Maria Silva",
    phone: "(21) 91234-5678",
    email: "sales@luxurybathrooms.com",
    address: {
      street: "Design Street",
      number: "45",
      complement: "Suite 12",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000"
    }
  },
  {
    id: "3",
    companyName: "Stone Masters Ltda",
    cnpj: "45.678.901/0001-23",
    contactName: "Carlos Santos",
    phone: "(31) 93456-7890",
    email: "info@stonemasters.com",
    address: {
      street: "Industrial Road",
      number: "789",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30000-000"
    }
  }
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: TransactionType.INCOME,
    description: "Sale of Carrara White Marble",
    amount: 3500,
    date: new Date("2023-04-05"),
    status: "completed",
    category: "Sales",
    clientId: "1",
    materialId: "1"
  },
  {
    id: "2",
    type: TransactionType.EXPENSE,
    description: "Purchase of Black Galaxy Granite",
    amount: 4500,
    date: new Date("2023-03-28"),
    status: "completed",
    category: "Purchases",
    materialId: "2"
  },
  {
    id: "3",
    type: TransactionType.INCOME,
    description: "Sale of Absolute Black Granite",
    amount: 5200,
    date: new Date("2023-04-12"),
    status: "completed",
    category: "Sales",
    clientId: "2",
    materialId: "4"
  },
  {
    id: "4",
    type: TransactionType.EXPENSE,
    description: "Equipment Maintenance",
    amount: 850,
    date: new Date("2023-04-18"),
    status: "completed",
    category: "Maintenance"
  },
  {
    id: "5",
    type: TransactionType.INCOME,
    description: "Sale of Travertine Beige Marble",
    amount: 2800,
    date: new Date("2023-04-20"),
    status: "pending",
    category: "Sales",
    clientId: "3",
    materialId: "3"
  }
];

// Mock Inventory
export const mockInventory: Inventory[] = [
  {
    id: "1",
    materialId: "1",
    type: "entry",
    quantity: 5,
    date: new Date("2023-01-15"),
    responsibleUser: "2", // Manager
    notes: "Initial purchase from Italian Imports Ltd"
  },
  {
    id: "2",
    materialId: "2",
    type: "entry",
    quantity: 3,
    date: new Date("2023-02-20"),
    responsibleUser: "2", // Manager
    notes: "Purchase from Indian Stone Co"
  },
  {
    id: "3",
    materialId: "1",
    type: "exit",
    quantity: 2,
    date: new Date("2023-04-05"),
    responsibleUser: "3", // Operator
    clientId: "1",
    notes: "Sale to Modern Kitchens LLC"
  },
  {
    id: "4",
    materialId: "4",
    type: "exit",
    quantity: 1,
    date: new Date("2023-04-12"),
    responsibleUser: "3", // Operator
    clientId: "2",
    notes: "Sale to Luxury Bathrooms SA"
  }
];

// Mock Summary Data
export const mockStockSummary: StockSummary[] = [
  {
    materialType: MaterialType.MARBLE,
    totalQuantity: 11,
    averageCost: 1075
  },
  {
    materialType: MaterialType.GRANITE,
    totalQuantity: 4,
    averageCost: 1650
  }
];

export const mockSalesSummary: SalesSummary[] = [
  {
    materialType: MaterialType.MARBLE,
    totalSales: 6300,
    percentageOfTotal: 55
  },
  {
    materialType: MaterialType.GRANITE,
    totalSales: 5200,
    percentageOfTotal: 45
  }
];
