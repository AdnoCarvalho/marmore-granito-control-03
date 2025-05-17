
import { MaterialType, MaterialSubtype } from "@/types";

export interface MaterialInfo {
  name: string;
  type: MaterialType;
  subtype: MaterialSubtype;
}

export const getMaterial = (
  materialId: string,
  materials: { id: string; name: string; type: MaterialType; subtype?: MaterialSubtype }[]
): MaterialInfo => {
  const material = materials.find(m => m.id === materialId);
  return material || { 
    name: "Material não encontrado", 
    type: MaterialType.MARBLE, 
    subtype: MaterialSubtype.SLAB 
  };
};

export const getMaterialName = (
  materialId: string,
  materials: { id: string; name: string; type: MaterialType; subtype?: MaterialSubtype }[]
): string => {
  return getMaterial(materialId, materials).name;
};

export const getMaterialType = (
  materialId: string,
  materials: { id: string; name: string; type: MaterialType; subtype?: MaterialSubtype }[]
): string => {
  const material = getMaterial(materialId, materials);
  const types = {
    [MaterialType.MARBLE]: "Mármore",
    [MaterialType.GRANITE]: "Granito",
    [MaterialType.QUARTZITE]: "Quartzito"
  };
  return types[material.type] || material.type;
};

export const getMaterialSubtype = (
  materialId: string,
  materials: { id: string; name: string; type: MaterialType; subtype?: MaterialSubtype }[]
): string => {
  const material = getMaterial(materialId, materials);
  const subtypes = {
    [MaterialSubtype.SLAB]: "Chapa",
    [MaterialSubtype.BLOCK]: "Bloco"
  };
  return subtypes[material.subtype || MaterialSubtype.SLAB] || "Não especificado";
};
