
import React, { useEffect, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaterialType, MaterialSubtype } from "@/types";
import { Control } from "react-hook-form";
import { SalesFormValues } from "./salesFormTypes";

// Mock data (would come from API/database in a real app)
const mockMaterials = [
  { id: "1", name: "Mármore Branco Carrara", type: MaterialType.MARBLE, pricePerSquareMeter: 450 },
  { id: "2", name: "Granito Preto São Gabriel", type: MaterialType.GRANITE, pricePerSquareMeter: 380 },
  { id: "3", name: "Quartzito Taj Mahal", type: MaterialType.QUARTZITE, pricePerSquareMeter: 720 },
];

interface MaterialSelectionFieldsProps {
  control: Control<SalesFormValues>;
  onMaterialChange: (materialId: string) => void;
  watchMaterialType: MaterialType;
}

const MaterialSelectionFields: React.FC<MaterialSelectionFieldsProps> = ({ 
  control, 
  onMaterialChange,
  watchMaterialType 
}) => {
  const [filteredMaterials, setFilteredMaterials] = useState(mockMaterials);
  
  // Filter materials based on selected type
  useEffect(() => {
    if (watchMaterialType) {
      const filtered = mockMaterials.filter(
        (material) => material.type === watchMaterialType
      );
      setFilteredMaterials(filtered);
    }
  }, [watchMaterialType]);

  return (
    <>
      {/* Tipo de material */}
      <FormField
        control={control}
        name="materialType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria do Material</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={MaterialType.MARBLE}>Mármore</SelectItem>
                <SelectItem value={MaterialType.GRANITE}>Granito</SelectItem>
                <SelectItem value={MaterialType.QUARTZITE}>Quartzito</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Material específico */}
      <FormField
        control={control}
        name="materialId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material Específico</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onMaterialChange(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o material" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {filteredMaterials.map((material) => (
                  <SelectItem key={material.id} value={material.id}>
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Subtipo */}
      <FormField
        control={control}
        name="subtype"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtipo</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o subtipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={MaterialSubtype.SLAB}>Chapa</SelectItem>
                <SelectItem value={MaterialSubtype.BLOCK}>Bloco</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default MaterialSelectionFields;
