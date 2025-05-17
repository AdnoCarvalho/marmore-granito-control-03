
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalesListFilters from "./list/SalesListFilters";
import SalesTable from "./list/SalesTable";
import { useSalesFilter } from "./list/useSalesFilter";
import { getStatusBadge, getOriginLabel } from "./list/statusUtils";
import { getMaterialName, getMaterialType, getMaterialSubtype } from "./list/materialUtils";
import { mockSales, mockClients, mockMaterials, mockSellers } from "./list/mockData";

const SalesList = () => {
  // Funções auxiliares
  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? client.name : "Cliente não encontrado";
  };

  const getSellerName = (sellerId: string) => {
    const seller = mockSellers.find(s => s.id === sellerId);
    return seller ? seller.name : "Vendedor não encontrado";
  };

  // Use o hook personalizado para gerenciar os filtros
  const { 
    filteredSales,
    clientFilter,
    setClientFilter,
    dateFilter,
    setDateFilter,
    searchTerm,
    setSearchTerm,
    resetFilters
  } = useSalesFilter({
    sales: mockSales,
    getClientName,
    getMaterialName: (materialId) => getMaterialName(materialId, mockMaterials),
  });

  return (
    <div className="space-y-6">
      <SalesListFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        clientFilter={clientFilter}
        setClientFilter={setClientFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        resetFilters={resetFilters}
        clients={mockClients}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesTable
            sales={filteredSales}
            getClientName={getClientName}
            getMaterialName={(materialId) => getMaterialName(materialId, mockMaterials)}
            getMaterialType={(materialId) => getMaterialType(materialId, mockMaterials)}
            getMaterialSubtype={(materialId) => getMaterialSubtype(materialId, mockMaterials)}
            getSellerName={getSellerName}
            getOriginLabel={getOriginLabel}
            getStatusBadge={getStatusBadge}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesList;
