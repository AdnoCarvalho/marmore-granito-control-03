
import { Purchase, PurchaseStatus } from "@/types/purchase";
import { MaterialType, MaterialSubtype } from "@/types";

export const mockSuppliers = [
  { id: "sup-001", name: "Mármores Brasil LTDA", cnpj: "12.345.678/0001-99" },
  { id: "sup-002", name: "Granitos Export S.A.", cnpj: "23.456.789/0001-88" },
  { id: "sup-003", name: "Rochas Ornamentais Vitória", cnpj: "34.567.890/0001-77" },
  { id: "sup-004", name: "Mineradora São Paulo", cnpj: "45.678.901/0001-66" },
];

export const mockPurchases: Purchase[] = [
  {
    id: "pur-001",
    supplierId: "sup-001",
    supplierName: "Mármores Brasil LTDA",
    materialType: MaterialType.MARBLE,
    materialName: "Mármore Carrara",
    subtype: MaterialSubtype.SLAB,
    serialNumber: "MCR-12345",
    quantity: 10,
    dimensions: {
      width: 2.8,
      height: 1.6,
      thickness: 0.02
    },
    pricePerSquareMeter: 350,
    totalPrice: 15680,
    purchaseDate: new Date("2024-05-10"),
    status: PurchaseStatus.RECEIVED,
    notes: "Excelente qualidade, com poucas veias."
  },
  {
    id: "pur-002",
    supplierId: "sup-002",
    supplierName: "Granitos Export S.A.",
    materialType: MaterialType.GRANITE,
    materialName: "Granito Verde Ubatuba",
    subtype: MaterialSubtype.SLAB,
    serialNumber: "GVU-54321",
    quantity: 8,
    dimensions: {
      width: 3.0,
      height: 1.7,
      thickness: 0.03
    },
    pricePerSquareMeter: 280,
    totalPrice: 11424,
    purchaseDate: new Date("2024-05-12"),
    status: PurchaseStatus.RECEIVED,
    notes: "Tonalidade mais escura que o habitual."
  },
  {
    id: "pur-003",
    supplierId: "sup-003",
    supplierName: "Rochas Ornamentais Vitória",
    materialType: MaterialType.QUARTZITE,
    materialName: "Quartzito Taj Mahal",
    subtype: MaterialSubtype.SLAB,
    serialNumber: "QTM-98765",
    quantity: 5,
    dimensions: {
      width: 2.6,
      height: 1.5,
      thickness: 0.03
    },
    pricePerSquareMeter: 500,
    totalPrice: 9750,
    purchaseDate: new Date("2024-05-14"),
    status: PurchaseStatus.PENDING,
    notes: "Solicitar certificado de origem."
  },
  {
    id: "pur-004",
    supplierId: "sup-001",
    supplierName: "Mármores Brasil LTDA",
    materialType: MaterialType.MARBLE,
    materialName: "Mármore Nero Marquina",
    subtype: MaterialSubtype.SLAB,
    serialNumber: "MNM-54321",
    quantity: 3,
    dimensions: {
      width: 3.2,
      height: 1.8,
      thickness: 0.02
    },
    pricePerSquareMeter: 420,
    totalPrice: 7257.6,
    purchaseDate: new Date("2024-05-16"),
    status: PurchaseStatus.PENDING,
    notes: "Material importado, prever atraso na entrega."
  },
  {
    id: "pur-005",
    supplierId: "sup-004",
    supplierName: "Mineradora São Paulo",
    materialType: MaterialType.GRANITE,
    materialName: "Granito Branco Siena",
    subtype: MaterialSubtype.BLOCK,
    serialNumber: "GBS-78945",
    quantity: 1,
    dimensions: {
      width: 2.5,
      height: 2.0,
      thickness: 1.5
    },
    pricePerSquareMeter: 1500,
    totalPrice: 11250,
    purchaseDate: new Date("2024-05-05"),
    status: PurchaseStatus.RECEIVED,
    notes: "Bloco para serrar em chapas. Qualidade premium."
  }
];
