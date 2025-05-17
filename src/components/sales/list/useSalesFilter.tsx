
import { useState, useMemo } from "react";
import { Sale } from "@/types";

interface UseSalesFilterProps {
  sales: Sale[];
  getClientName: (clientId: string) => string;
  getMaterialName: (materialId: string) => string;
}

export const useSalesFilter = ({ sales, getClientName, getMaterialName }: UseSalesFilterProps) => {
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtragem das vendas
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      // Filtro por cliente
      if (clientFilter && sale.clientId !== clientFilter) {
        return false;
      }
      
      // Filtro por data
      if (dateFilter && 
          (sale.date.getDate() !== dateFilter.getDate() || 
           sale.date.getMonth() !== dateFilter.getMonth() ||
           sale.date.getFullYear() !== dateFilter.getFullYear())) {
        return false;
      }
      
      // Filtro por termo de busca
      if (searchTerm) {
        const clientName = getClientName(sale.clientId).toLowerCase();
        const materialName = getMaterialName(sale.materialId).toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        if (!clientName.includes(searchLower) && !materialName.includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
  }, [sales, clientFilter, dateFilter, searchTerm, getClientName, getMaterialName]);

  // Reset dos filtros
  const resetFilters = () => {
    setClientFilter(null);
    setDateFilter(null);
    setSearchTerm("");
  };

  return {
    filteredSales,
    clientFilter,
    setClientFilter,
    dateFilter,
    setDateFilter,
    searchTerm,
    setSearchTerm,
    resetFilters
  };
};
