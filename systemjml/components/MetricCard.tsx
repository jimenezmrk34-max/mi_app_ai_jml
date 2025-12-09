import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  colorClass?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, trend, colorClass = "bg-white" }) => {
  return (
    <div className={`${colorClass} p-6 rounded-xl shadow-sm border border-stone-200 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-emerald-600/80 mb-1 uppercase tracking-wide">{title}</p>
          <h3 className="text-2xl font-bold text-emerald-950">{value}</h3>
        </div>
        <div className="p-3 bg-stone-100 rounded-lg text-amber-600 shadow-inner">
          {icon}
        </div>
      </div>
      {trend && (
        <p className="text-xs mt-3 text-stone-500 font-medium">
          {trend}
        </p>
      )}
    </div>
  );
};