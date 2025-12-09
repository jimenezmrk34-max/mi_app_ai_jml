import React, { useState } from 'react';
import { Product } from '../types';
import { getDaysUntilExpiry } from '../services/storageService';
import { Search, AlertCircle, Archive, Store } from 'lucide-react';

interface InventoryListProps {
  products: Product[];
}

export const InventoryList: React.FC<InventoryListProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'EXPIRED' | 'LOW'>('ALL');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filter === 'EXPIRED') {
      return getDaysUntilExpiry(p.expiryDate) <= p.alertDaysBeforeExpiry;
    }
    if (filter === 'LOW') {
      return (p.quantityStore + p.quantityWarehouse) < 10;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-stone-200">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 text-stone-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o categoría..." 
            className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-stone-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'ALL' ? 'bg-emerald-900 text-amber-400 shadow' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('EXPIRED')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'EXPIRED' ? 'bg-red-700 text-white shadow' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
          >
            En Riesgo
          </button>
          <button 
            onClick={() => setFilter('LOW')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === 'LOW' ? 'bg-amber-600 text-white shadow' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}
          >
            Stock Bajo
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-100 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider text-center">En Tienda</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider text-center">En Bodega</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider text-center">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider">Vencimiento</th>
                <th className="px-6 py-4 text-xs font-bold text-emerald-800 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                const daysLeft = getDaysUntilExpiry(product.expiryDate);
                const totalQty = product.quantityStore + product.quantityWarehouse;
                let statusColor = "bg-emerald-50 text-emerald-700 border border-emerald-200";
                let statusText = "OK";

                if (daysLeft < 0) {
                  statusColor = "bg-stone-800 text-white border border-stone-900";
                  statusText = "VENCIDO";
                } else if (daysLeft <= product.alertDaysBeforeExpiry) {
                  statusColor = "bg-red-50 text-red-700 border border-red-200";
                  statusText = `Vence ${daysLeft}d`;
                } else if (totalQty < 10) {
                  statusColor = "bg-amber-50 text-amber-700 border border-amber-200";
                  statusText = "Stock Bajo";
                }

                return (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-emerald-950">{product.name}</div>
                      <div className="text-xs text-stone-500">{product.supplier}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{product.category}</td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex items-center justify-center space-x-2 text-stone-600">
                         <Store size={16} className="text-amber-600" />
                         <span>{product.quantityStore}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex items-center justify-center space-x-2 text-stone-600">
                         <Archive size={16} className="text-emerald-600" />
                         <span>{product.quantityWarehouse}</span>
                       </div>
                    </td>
                     <td className="px-6 py-4 text-center font-bold text-emerald-900 bg-stone-50/50">
                       {totalQty}
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">
                      {new Date(product.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${statusColor}`}>
                        {statusText}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-400">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={48} className="mb-2 opacity-50 text-stone-300" />
                      <p>No se encontraron productos con el filtro actual.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};