import React, { useMemo } from 'react';
import { Product } from '../types';
import { getDaysUntilExpiry } from '../services/storageService';
import { MetricCard } from '../components/MetricCard';
import { AlertTriangle, DollarSign, Package, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  products: Product[];
}

export const Dashboard: React.FC<DashboardProps> = ({ products }) => {
  
  const stats = useMemo(() => {
    let totalVal = 0;
    let expiring = 0;
    let lowStock = 0;
    
    products.forEach(p => {
      const totalQty = p.quantityStore + p.quantityWarehouse;
      totalVal += totalQty * p.priceSale;
      
      const daysLeft = getDaysUntilExpiry(p.expiryDate);
      if (daysLeft <= p.alertDaysBeforeExpiry) {
        expiring++;
      }
      
      // Simple low stock logic: less than 10 total units
      if (totalQty < 10) {
        lowStock++;
      }
    });

    return {
      totalProducts: products.length,
      totalValue: totalVal,
      expiringSoon: expiring,
      lowStock
    };
  }, [products]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + (p.quantityStore + p.quantityWarehouse);
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [products]);

  // Palette: Dark Green, Gold, Beige variants
  const COLORS = ['#065f46', '#d97706', '#059669', '#b45309', '#10b981'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Valor Total Inventario" 
          value={`$${stats.totalValue.toFixed(2)}`} 
          icon={<DollarSign size={24} />}
          trend="+2.5% vs mes anterior"
        />
        <MetricCard 
          title="Productos Totales" 
          value={stats.totalProducts} 
          icon={<Package size={24} />}
        />
        <MetricCard 
          title="Por Vencer (Alerta)" 
          value={stats.expiringSoon} 
          icon={<AlertTriangle size={24} className="text-red-600" />}
          colorClass="bg-red-50/50 border-red-100"
          trend="Atención Requerida"
        />
        <MetricCard 
          title="Stock Bajo" 
          value={stats.lowStock} 
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Distribución de Inventario por Categoría</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                <XAxis dataKey="name" stroke="#57534e" />
                <YAxis stroke="#57534e" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#064e3b', color: '#fff', borderRadius: '8px', border: '1px solid #d97706' }}
                  itemStyle={{ color: '#fbbf24' }}
                  cursor={{fill: '#f5f5f4'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Alertas de Caducidad</h3>
          <div className="space-y-4">
            {products
              .filter(p => getDaysUntilExpiry(p.expiryDate) <= p.alertDaysBeforeExpiry)
              .sort((a, b) => getDaysUntilExpiry(a.expiryDate) - getDaysUntilExpiry(b.expiryDate))
              .slice(0, 5)
              .map(p => {
                const days = getDaysUntilExpiry(p.expiryDate);
                const isExpired = days < 0;
                return (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200 hover:border-amber-200 transition-colors">
                    <div>
                      <p className="font-semibold text-emerald-900">{p.name}</p>
                      <p className="text-xs text-stone-500">Vence: {new Date(p.expiryDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs font-bold rounded border ${isExpired ? 'bg-red-600 text-white border-red-700' : 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                        {isExpired ? 'VENCIDO' : `${days} días`}
                      </span>
                    </div>
                  </div>
                );
              })}
            {products.filter(p => getDaysUntilExpiry(p.expiryDate) <= p.alertDaysBeforeExpiry).length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block p-3 rounded-full bg-emerald-50 mb-3">
                  <Package className="text-emerald-300" size={32} />
                </div>
                <p className="text-stone-500 text-sm">Todo en orden. No hay alertas de caducidad pendientes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};