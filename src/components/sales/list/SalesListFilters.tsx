
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface SalesListFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  clientFilter: string | null;
  setClientFilter: (value: string | null) => void;
  dateFilter: Date | null;
  setDateFilter: (value: Date | null) => void;
  resetFilters: () => void;
  clients: { id: string; name: string }[];
}

const SalesListFilters: React.FC<SalesListFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  clientFilter,
  setClientFilter,
  dateFilter,
  setDateFilter,
  resetFilters,
  clients,
}) => {
  return (
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
              {clients.map((client) => (
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
  );
};

export default SalesListFilters;
