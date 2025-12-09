export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  supplier: string;
  purchaseDate: string; // ISO Date string
  expiryDate: string; // ISO Date string
  quantityStore: number;
  quantityWarehouse: number;
  priceCost: number;
  priceSale: number;
  alertDaysBeforeExpiry: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  expiringSoon: number;
  lowStock: number;
}

export type ViewState = 'DASHBOARD' | 'INVENTORY' | 'PURCHASES' | 'ANALYSIS' | 'CONTACT';