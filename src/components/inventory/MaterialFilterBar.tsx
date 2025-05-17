
import { useState } from "react";
import { Filter, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MaterialType, UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface MaterialFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filteredType: MaterialType | "all";
  setFilteredType: (value: MaterialType | "all") => void;
  onAddNew: () => void;
}

const MaterialFilterBar = ({
  search,
  setSearch,
  filteredType,
  setFilteredType,
  onAddNew
}: MaterialFilterBarProps) => {
  const { checkPermission } = useAuth();
  const canAddMaterial = checkPermission([UserRole.MANAGER, UserRole.ADMIN]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar materiais..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-2 h-4 w-4" />
          <select 
            className="bg-transparent outline-none"
            value={filteredType}
            onChange={(e) => setFilteredType(e.target.value as MaterialType | "all")}
          >
            <option value="all">Todos os Tipos</option>
            <option value={MaterialType.MARBLE}>Mármore</option>
            <option value={MaterialType.GRANITE}>Granito</option>
            <option value={MaterialType.QUARTZITE}>Quartzito</option>
          </select>
        </Button>
        {canAddMaterial && (
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Material
          </Button>
        )}
      </div>
    </div>
  );
};

export default MaterialFilterBar;
