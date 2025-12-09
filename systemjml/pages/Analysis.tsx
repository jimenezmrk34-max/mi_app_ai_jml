import React, { useState } from 'react';
import { Product } from '../types';
import { analyzeInventoryTrends } from '../services/geminiService';
import { Sparkles, BrainCircuit } from 'lucide-react';

interface AnalysisProps {
  products: Product[];
}

export const Analysis: React.FC<AnalysisProps> = ({ products }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeInventoryTrends(products);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-xl p-8 text-white shadow-lg border-b-4 border-amber-500">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-amber-50">Análisis Inteligente JML</h2>
            <p className="text-emerald-100 max-w-xl">
              Utiliza inteligencia artificial para analizar tus patrones de consumo, detectar riesgos de caducidad ocultos y optimizar tus compras.
            </p>
          </div>
          <BrainCircuit size={64} className="text-amber-400/30" />
        </div>
        
        <button 
          onClick={handleAnalyze} 
          disabled={loading}
          className="mt-6 bg-white text-emerald-900 hover:bg-stone-100 font-bold py-3 px-6 rounded-lg shadow-md transition-all flex items-center disabled:opacity-50 border border-emerald-100"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analizando Datos...
            </span>
          ) : (
            <>
              <Sparkles className="mr-2 text-amber-600" size={20} />
              Generar Reporte IA
            </>
          )}
        </button>
      </div>

      {analysis && (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 animate-fade-in">
           <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
             <Sparkles className="text-amber-500 mr-2" size={24} />
             Resultados del Análisis
           </h3>
           <div className="prose prose-stone max-w-none text-stone-700">
             <div dangerouslySetInnerHTML={{ __html: analysis }} />
           </div>
           <div className="mt-6 pt-6 border-t border-stone-100 text-xs text-stone-400">
             * Este análisis es generado por IA basado en los datos actuales de su inventario. Verifique físicamente antes de tomar decisiones de compra críticas.
           </div>
        </div>
      )}
      
      {!analysis && !loading && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-300">
          <p className="text-stone-500">Presiona el botón para generar insights sobre tu inventario.</p>
        </div>
      )}
    </div>
  );
};