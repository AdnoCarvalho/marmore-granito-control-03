
export enum UserRole {
  OPERATOR = "operator",
  MANAGER = "manager",
  ADMIN = "admin"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum MaterialType {
  MARBLE = "marble",
  GRANITE = "granite"
}

export interface Material {
  id: string;
  type: MaterialType;
  name: string;
  serialNumber: string;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  location: string;
  quantity: number;
  purchaseDate: Date;
  purchasePrice: number;
  supplier: string;
}

export interface Client {
  id: string;
  companyName: string;
  cnpj: string;
  contactName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense"
}

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
  status: "pending" | "completed";
  category: string;
  clientId?: string;
  materialId?: string;
}

export interface Inventory {
  id: string;
  materialId: string;
  type: "entry" | "exit";
  quantity: number;
  date: Date;
  responsibleUser: string;
  clientId?: string;
  notes?: string;
}

export interface StockSummary {
  materialType: MaterialType;
  totalQuantity: number;
  averageCost: number;
}

export interface SalesSummary {
  materialType: MaterialType;
  totalSales: number;
  percentageOfTotal: number;
}
