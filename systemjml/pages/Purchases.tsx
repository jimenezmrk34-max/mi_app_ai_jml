import React, { useState } from 'react';
import { Product } from '../types';
import { saveProduct } from '../services/storageService';
import { Save, RefreshCw } from 'lucide-react';

interface PurchasesProps {
  onProductAdded: () => void;
}

export const Purchases: React.FC<PurchasesProps> = ({ onProductAdded }) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'General',
    supplier: '',
    purchaseDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    quantityStore: 0,
    quantityWarehouse: 0,
    priceCost: 0,
    priceSale: 0,
    alertDaysBeforeExpiry: 30
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('quantity') || name.includes('alert') ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expiryDate) {
      setNotification('Por favor completa los campos obligatorios.');
      return;
    }

    const newProduct: Product = {
      ...formData as Product,
      id: crypto.randomUUID(),
      // Ensure dates are full ISO strings
      purchaseDate: new Date(formData.purchaseDate!).toISOString(),
      expiryDate: new Date(formData.expiryDate!).toISOString(),
    };

    saveProduct(newProduct);
    onProductAdded();
    
    setNotification('Producto registrado exitosamente.');
    
    // Reset form
    setFormData({
      name: '',
      sku: '',
      category: 'General',
      supplier: '',
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      quantityStore: 0,
      quantityWarehouse: 0,
      priceCost: 0,
      priceSale: 0,
      alertDaysBeforeExpiry: 30
    });

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
        <div className="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
          <div>
             <h2 className="text-2xl font-bold text-emerald-900">Registro de Compra e Ingreso</h2>
             <p className="text-stone-500">Ingrese los datos del nuevo producto adquirido al proveedor.</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-full text-emerald-700">
            <RefreshCw size={24} />
          </div>
        </div>

        {notification && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${notification.includes('exitosamente') ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {notification}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center">
                Información del Producto
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Nombre Producto *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" placeholder="Ej: Leche Entera" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">SKU / Código</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ej: 12345678" />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="General">General</option>
                  <option value="Lácteos">Lácteos</option>
                  <option value="Granos">Granos</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Limpieza">Limpieza</option>
                  <option value="Carnes">Carnes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Proveedor</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Distribuidora S.A." />
              </div>
            </div>

            {/* Inventory & Control */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-600 uppercase tracking-wider flex items-center">
                Control e Inventario
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Fecha Compra</label>
                  <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Fecha Caducidad *</label>
                  <input required type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Días Alerta Antes de Vencimiento
                  <span className="ml-2 text-xs text-stone-400 font-normal">(Configuración de Alerta)</span>
                </label>
                <input type="number" min="1" name="alertDaysBeforeExpiry" value={formData.alertDaysBeforeExpiry} onChange={handleChange} className="w-full p-2.5 border border-amber-300 bg-amber-50 rounded-lg focus:ring-2 focus:ring-amber-500 text-amber-900" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Cantidad Tienda</label>
                  <input type="number" min="0" name="quantityStore" value={formData.quantityStore} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Cantidad Bodega</label>
                  <input type="number" min="0" name="quantityWarehouse" value={formData.quantityWarehouse} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>

               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Costo Unitario ($)</label>
                  <input type="number" step="0.01" min="0" name="priceCost" value={formData.priceCost} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Precio Venta ($)</label>
                  <input type="number" step="0.01" min="0" name="priceSale" value={formData.priceSale} onChange={handleChange} className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex justify-end">
            <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white font-medium py-3 px-8 rounded-lg flex items-center shadow-lg hover:shadow-xl transition-all border border-emerald-900">
              <Save className="mr-2 text-amber-400" size={20} />
              Registrar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};