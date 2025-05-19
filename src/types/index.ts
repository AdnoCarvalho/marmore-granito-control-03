
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

// Enums para códigos NCM comuns do setor de rochas
export enum NCMCode {
  MARBLE_RAW = "2515.11.00",      // Mármore bruto, desbastado ou serrado
  GRANITE_RAW = "2516.11.00",     // Granito bruto, desbastado ou serrado
  MARBLE_PROCESSED = "6802.91.00", // Mármore beneficiado (polido, cortado)
  GRANITE_PROCESSED = "6802.93.10", // Granito beneficiado para construção
  GRANITE_MOSAIC = "6802.99.10",   // Mosaicos e peças de granito
  QUARTZITE_PROCESSED = "6802.29.00", // Quartzito beneficiado
  OTHER = "9999.99.99"            // Outros (temporário até classificação correta)
}

// Enums para nível de processamento/beneficiamento
export enum ProcessingLevel {
  RAW = "raw",           // Bruto
  CUT = "cut",           // Cortado
  POLISHED = "polished", // Polido
  FINISHED = "finished"  // Acabado/Finalizado
}

// Interface para informações tributárias associadas a um NCM
export interface NCMTaxInfo {
  ncmCode: string;
  description: string;
  icms: number;
  ipi: number;
  pis: number;
  cofins: number;
}

export enum MaterialType {
  MARBLE = "marble",
  GRANITE = "granite",
  QUARTZITE = "quartzite"
}

export enum MaterialSubtype {
  SLAB = "slab", // Chapa
  BLOCK = "block" // Bloco
}

export interface Material {
  id: string;
  type: MaterialType;
  subtype?: MaterialSubtype; // Subtipo: Chapa ou Bloco
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
  pricePerSquareMeter?: number; // Preço por m²
  notes?: string; // Observações
  // Novos campos para classificação fiscal
  ncmCode: string;
  processingLevel: ProcessingLevel;
  taxInfo?: NCMTaxInfo;
}

export interface Client {
  id: string;
  companyName: string;
  cnpj: string;
  contactName: string;
  phone: string;
  email: string;
  businessType?: string; // Tipo de empresa (marmoraria, depósito, etc)
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
  reason?: string; // Motivo da movimentação
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

// Interface para vendas
export enum SaleOrigin {
  DIRECT = "direct", // Venda direta
  REFERENCE = "reference", // Referência
  SOCIAL_MEDIA = "social_media", // Redes sociais
  WEBSITE = "website", // Website
  OTHER = "other" // Outros
}

export interface Sale {
  id: string;
  clientId: string;
  date: Date;
  materialId: string;
  quantity: number;
  sellerId: string;
  origin: SaleOrigin;
  totalValue: number;
  status: "paid" | "pending" | "cancelled";
  // Novos campos para classificação fiscal
  ncmCode: string;
  taxes?: {
    icms: number;
    ipi: number;
    pis: number;
    cofins: number;
  };
}
