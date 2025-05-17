
import { useState, useMemo } from "react";
import { MaterialType, Material } from "@/types";

export const useInventoryFilters = (materials: Material[]) => {
  const [search, setSearch] = useState("");
  const [filteredType, setFilteredType] = useState<MaterialType | "all">("all");

  // Filtrar materiais baseado na busca e tipo
  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(search.toLowerCase()) ||
        material.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
        material.location.toLowerCase().includes(search.toLowerCase());
      
      const matchesType = filteredType === "all" || material.type === filteredType;
      
      return matchesSearch && matchesType;
    });
  }, [materials, search, filteredType]);

  return {
    search,
    setSearch,
    filteredType,
    setFilteredType,
    filteredMaterials
  };
};
