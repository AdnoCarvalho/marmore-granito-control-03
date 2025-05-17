
import { MaterialType, MaterialSubtype } from ".";

export interface Purchase {
  id: string;
  supplierId: string;
  supplierName: string;
  materialType: MaterialType;
  materialName: string;
  subtype: MaterialSubtype;
  serialNumber?: string;
  quantity: number;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  pricePerSquareMeter: number;
  totalPrice: number;
  purchaseDate: Date;
  status: PurchaseStatus;
  notes?: string;
}

export enum PurchaseStatus {
  RECEIVED = "received",
  PENDING = "pending",
  CANCELLED = "cancelled"
}

export interface PurchaseFormValues {
  supplierId: string;
  materialType: MaterialType;
  materialName: string;
  subtype: MaterialSubtype;
  serialNumber?: string;
  quantity: number;
  width: number;
  height: number;
  thickness: number;
  pricePerSquareMeter: number;
  purchaseDate: Date;
  notes?: string;
}

// New interface for the purchase stats dashboard
export interface PurchaseStats {
  totalSpent: number;
  totalQuantity: number;
  lastSupplier: {
    name: string;
    date: Date;
  };
  purchasesByType: {
    type: string;
    value: number;
    count: number;
  }[];
}
