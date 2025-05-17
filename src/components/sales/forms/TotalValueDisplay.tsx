
import React from "react";

interface TotalValueDisplayProps {
  totalValue: number;
}

const TotalValueDisplay: React.FC<TotalValueDisplayProps> = ({ totalValue }) => {
  return (
    <div className="md:col-span-2 p-4 border rounded-md bg-slate-50">
      <div className="flex justify-between items-center">
        <span className="font-medium text-slate-700">Valor Total da Venda:</span>
        <span className="text-xl font-bold text-slate-900">
          R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export default TotalValueDisplay;
