import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Purchases } from './pages/Purchases';
import { InventoryList } from './pages/InventoryList';
import { Analysis } from './pages/Analysis';
import { Contact } from './pages/Contact';
import { ViewState, Product } from './types';
import { getProducts } from './services/storageService';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [products, setProducts] = useState<Product[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    const data = getProducts();
    setProducts(data);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard products={products} />;
      case 'PURCHASES':
        return <Purchases onProductAdded={refreshData} />;
      case 'INVENTORY':
        return <InventoryList products={products} />;
      case 'ANALYSIS':
        return <Analysis products={products} />;
      case 'CONTACT':
        return <Contact />;
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar for Desktop */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-emerald-900 text-white z-20 flex justify-between items-center p-4 shadow-md border-b border-amber-600">
        <h1 className="text-xl font-bold text-amber-500">JML Inventory</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-amber-400">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-emerald-900 z-10 pt-20 px-4">
          <div className="flex flex-col space-y-4">
            <button onClick={() => { setCurrentView('DASHBOARD'); setMobileMenuOpen(false); }} className="text-stone-200 hover:text-amber-400 text-lg font-medium p-2 border-b border-emerald-800">Tablero</button>
            <button onClick={() => { setCurrentView('PURCHASES'); setMobileMenuOpen(false); }} className="text-stone-200 hover:text-amber-400 text-lg font-medium p-2 border-b border-emerald-800">Compras</button>
            <button onClick={() => { setCurrentView('INVENTORY'); setMobileMenuOpen(false); }} className="text-stone-200 hover:text-amber-400 text-lg font-medium p-2 border-b border-emerald-800">Inventario</button>
            <button onClick={() => { setCurrentView('ANALYSIS'); setMobileMenuOpen(false); }} className="text-stone-200 hover:text-amber-400 text-lg font-medium p-2 border-b border-emerald-800">Análisis IA</button>
            <button onClick={() => { setCurrentView('CONTACT'); setMobileMenuOpen(false); }} className="text-stone-200 hover:text-amber-400 text-lg font-medium p-2 border-b border-emerald-800">Contacto</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto h-screen">
        <header className="mb-8 hidden md:block border-b border-stone-200 pb-4">
          <h2 className="text-3xl font-bold text-emerald-900">
            {currentView === 'DASHBOARD' && 'Visión General'}
            {currentView === 'PURCHASES' && 'Gestión de Compras'}
            {currentView === 'INVENTORY' && 'Inventario Unificado'}
            {currentView === 'ANALYSIS' && 'Análisis de Consumo'}
            {currentView === 'CONTACT' && 'Soporte y Contacto'}
          </h2>
          <p className="text-stone-500 mt-1">
            {currentView === 'CONTACT' 
              ? 'Estamos aquí para resolver tus dudas y mejorar tu experiencia.' 
              : `Bienvenido al sistema JML. Hoy es ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
          </p>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;