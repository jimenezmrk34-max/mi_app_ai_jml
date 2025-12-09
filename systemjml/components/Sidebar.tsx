import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, MessageSquare } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  
  const navItems = [
    { id: 'DASHBOARD', label: 'Tablero Principal', icon: LayoutDashboard },
    { id: 'PURCHASES', label: 'Gestión de Compras', icon: ShoppingCart },
    { id: 'INVENTORY', label: 'Inventario Unificado', icon: Package },
    { id: 'ANALYSIS', label: 'Análisis IA', icon: BarChart3 },
    { id: 'CONTACT', label: 'Soporte y Contacto', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-emerald-900 text-stone-100 min-h-screen flex flex-col fixed left-0 top-0 z-10 hidden md:flex shadow-xl">
      <div className="p-6 border-b border-emerald-800">
        <h1 className="text-2xl font-bold tracking-tight text-amber-500">JML<span className="text-white">System</span></h1>
        <p className="text-xs text-emerald-300 mt-1">Enterprise Resource Planning</p>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive 
                  ? 'bg-emerald-800 text-amber-400 shadow-md border-r-4 border-amber-500' 
                  : 'text-stone-300 hover:bg-emerald-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-amber-400' : 'text-stone-400'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-emerald-800">
        <button className="flex items-center space-x-3 text-emerald-300 hover:text-white transition-colors px-4 py-2">
          <Settings size={20} />
          <span>Configuración</span>
        </button>
      </div>
    </aside>
  );
};