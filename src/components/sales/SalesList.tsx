
import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Sale, SaleOrigin, MaterialType, MaterialSubtype } from "@/types";

const SalesList = () => {
  // Estados para os filtros
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Mock de dados (em uma aplicação real, viriam do backend)
  const mockSales: Sale[] = [
    {
      id: "1",
      clientId: "1",
      date: new Date("2025-05-10"),
      materialId: "1",
      quantity: 3,
      sellerId: "2",
      origin: SaleOrigin.DIRECT,
      totalValue: 4500,
      status: "paid",
    },
    {
      id: "2",
      clientId: "2",
      date: new Date("2025-05-12"),
      materialId: "2",
      quantity: 2,
      sellerId: "1",
      origin: SaleOrigin.REFERENCE,
      totalValue: 2400,
      status: "pending",
    },
    {
      id: "3",
      clientId: "3",
      date: new Date("2025-05-14"),
      materialId: "3",
      quantity: 1,
      sellerId: "3",
      origin: SaleOrigin.WEBSITE,
      totalValue: 2200,
      status: "paid",
    },
    {
      id: "4",
      clientId: "1",
      date: new Date("2025-05-16"),
      materialId: "2",
      quantity: 5,
      sellerId: "2",
      origin: SaleOrigin.SOCIAL_MEDIA,
      totalValue: 6000,
      status: "cancelled",
    },
  ];

  const mockClients = [
    { id: "1", name: "Marmoraria Silva" },
    { id: "2", name: "Construtora Horizonte" },
    { id: "3", name: "Depósito Mármores & Cia" },
  ];

  const mockMaterials = [
    { 
      id: "1", 
      name: "Mármore Branco Carrara", 
      type: MaterialType.MARBLE,
      subtype: MaterialSubtype.SLAB
    },
    { 
      id: "2", 
      name: "Granito Preto São Gabriel", 
      type: MaterialType.GRANITE,
      subtype: MaterialSubtype.BLOCK 
    },
    { 
      id: "3", 
      name: "Quartzito Taj Mahal", 
      type: MaterialType.QUARTZITE,
      subtype: MaterialSubtype.SLAB 
    },
  ];

  const mockSellers = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Oliveira" },
    { id: "3", name: "Carlos Santos" },
  ];

  // Funções auxiliares
  const getClientName = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    return client ? client.name : "Cliente não encontrado";
  };

  const getMaterial = (materialId: string) => {
    const material = mockMaterials.find(m => m.id === materialId);
    return material || { name: "Material não encontrado", type: MaterialType.MARBLE, subtype: MaterialSubtype.SLAB };
  };

  const getMaterialName = (materialId: string) => {
    return getMaterial(materialId).name;
  };

  const getMaterialType = (materialId: string) => {
    const material = getMaterial(materialId);
    const types = {
      [MaterialType.MARBLE]: "Mármore",
      [MaterialType.GRANITE]: "Granito",
      [MaterialType.QUARTZITE]: "Quartzito"
    };
    return types[material.type] || material.type;
  };

  const getMaterialSubtype = (materialId: string) => {
    const material = getMaterial(materialId);
    const subtypes = {
      [MaterialSubtype.SLAB]: "Chapa",
      [MaterialSubtype.BLOCK]: "Bloco"
    };
    return subtypes[material.subtype || MaterialSubtype.SLAB] || "Não especificado";
  };

  const getSellerName = (sellerId: string) => {
    const seller = mockSellers.find(s => s.id === sellerId);
    return seller ? seller.name : "Vendedor não encontrado";
  };

  const getOriginLabel = (origin: SaleOrigin) => {
    const labels: Record<string, string> = {
      [SaleOrigin.DIRECT]: "Venda Direta",
      [SaleOrigin.REFERENCE]: "Referência",
      [SaleOrigin.SOCIAL_MEDIA]: "Redes Sociais",
      [SaleOrigin.WEBSITE]: "Website",
      [SaleOrigin.OTHER]: "Outra",
    };
    return labels[origin] || origin;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Pago</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pendente</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filtragem das vendas
  const filteredSales = mockSales.filter((sale) => {
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

  // Reset dos filtros
  const resetFilters = () => {
    setClientFilter(null);
    setDateFilter(null);
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente ou material..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filtro por cliente */}
            <Select value={clientFilter || ""} onValueChange={(value) => setClientFilter(value || null)}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <SelectValue placeholder="Filtrar por cliente" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Filtro por data */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? (
                    format(dateFilter, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    "Filtrar por data"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFilter || undefined}
                  onSelect={setDateFilter}
                  initialFocus
                  locale={ptBR}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Subtipo</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Origem</TableHead>
                  <TableHead className="text-right">Valor (R$)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{getClientName(sale.clientId)}</TableCell>
                      <TableCell>{getMaterialName(sale.materialId)}</TableCell>
                      <TableCell>{getMaterialType(sale.materialId)}</TableCell>
                      <TableCell>{getMaterialSubtype(sale.materialId)}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>{format(sale.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                      <TableCell>{getSellerName(sale.sellerId)}</TableCell>
                      <TableCell>{getOriginLabel(sale.origin)}</TableCell>
                      <TableCell className="text-right">{sale.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                      Nenhuma venda encontrada com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesList;
