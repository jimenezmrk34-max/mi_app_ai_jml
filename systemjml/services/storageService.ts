import { Product } from '../types';

const STORAGE_KEY = 'jml_inventory_data';

const initialData: Product[] = [
  {
    id: '1',
    name: 'Leche Entera 1L',
    sku: 'DAI-001',
    category: 'Lácteos',
    supplier: 'Lácteos del Sur',
    purchaseDate: '2024-05-01',
    expiryDate: new Date(Date.now() + 86400000 * 5).toISOString(), // Expires in 5 days
    quantityStore: 10,
    quantityWarehouse: 40,
    priceCost: 0.80,
    priceSale: 1.20,
    alertDaysBeforeExpiry: 7
  },
  {
    id: '2',
    name: 'Arroz Premium 1kg',
    sku: 'GRN-002',
    category: 'Granos',
    supplier: 'Distribuidora Central',
    purchaseDate: '2024-04-15',
    expiryDate: '2025-04-15',
    quantityStore: 15,
    quantityWarehouse: 100,
    priceCost: 0.90,
    priceSale: 1.50,
    alertDaysBeforeExpiry: 30
  },
  {
    id: '3',
    name: 'Yogurt Fresa',
    sku: 'DAI-003',
    category: 'Lácteos',
    supplier: 'Lácteos del Sur',
    purchaseDate: '2024-05-10',
    expiryDate: new Date(Date.now() + 86400000 * 2).toISOString(), // Expires in 2 days
    quantityStore: 5,
    quantityWarehouse: 0,
    priceCost: 0.50,
    priceSale: 0.90,
    alertDaysBeforeExpiry: 5
  }
];

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const saveProduct = (product: Product): Product[] => {
  const current = getProducts();
  const exists = current.findIndex(p => p.id === product.id);
  let updated = [];
  
  if (exists >= 0) {
    updated = [...current];
    updated[exists] = product;
  } else {
    updated = [...current, product];
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteProduct = (id: string): Product[] => {
  const current = getProducts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Helper to check expiry
export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};