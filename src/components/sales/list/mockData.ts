import { Sale, SaleOrigin, MaterialType, MaterialSubtype, NCMCode } from "@/types";

// Mock data for sales, clients, materials, and sellers
export const mockSales: Sale[] = [
  {
    id: "1",
    clientId: "1",
    date: new Date("2025-05-10"),
    materialId: "1",
    quantity: 3,
    sellerId: "2",
    origin: SaleOrigin.DIRECT,
    totalValue: 4500,
    status: "paid",
    ncmCode: NCMCode.MARBLE_PROCESSED,
  },
  {
    id: "2",
    clientId: "2",
    date: new Date("2025-05-12"),
    materialId: "2",
    quantity: 2,
    sellerId: "1",
    origin: SaleOrigin.REFERENCE,
    totalValue: 2400,
    status: "pending",
    ncmCode: NCMCode.GRANITE_PROCESSED,
  },
  {
    id: "3",
    clientId: "3",
    date: new Date("2025-05-14"),
    materialId: "3",
    quantity: 1,
    sellerId: "3",
    origin: SaleOrigin.WEBSITE,
    totalValue: 2200,
    status: "paid",
    ncmCode: NCMCode.QUARTZITE_PROCESSED,
  },
  {
    id: "4",
    clientId: "1",
    date: new Date("2025-05-16"),
    materialId: "2",
    quantity: 5,
    sellerId: "2",
    origin: SaleOrigin.SOCIAL_MEDIA,
    totalValue: 6000,
    status: "cancelled",
    ncmCode: NCMCode.GRANITE_PROCESSED,
  },
];

export const mockClients = [
  { id: "1", name: "Marmoraria Silva" },
  { id: "2", name: "Construtora Horizonte" },
  { id: "3", name: "Depósito Mármores & Cia" },
];

export const mockMaterials = [
  { 
    id: "1", 
    name: "Mármore Branco Carrara", 
    type: MaterialType.MARBLE,
    subtype: MaterialSubtype.SLAB
  },
  { 
    id: "2", 
    name: "Granito Preto São Gabriel", 
    type: MaterialType.GRANITE,
    subtype: MaterialSubtype.BLOCK 
  },
  { 
    id: "3", 
    name: "Quartzito Taj Mahal", 
    type: MaterialType.QUARTZITE,
    subtype: MaterialSubtype.SLAB 
  },
];

export const mockSellers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Oliveira" },
  { id: "3", name: "Carlos Santos" },
];
