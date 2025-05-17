
import { z } from "zod";
import { MaterialType, MaterialSubtype, SaleOrigin } from "@/types";

// Form schema validation
export const salesFormSchema = z.object({
  clientId: z.string({ required_error: "Selecione um cliente" }),
  date: z.date({ required_error: "Selecione a data da venda" }),
  materialType: z.nativeEnum(MaterialType, { required_error: "Selecione o tipo de material" }),
  materialId: z.string({ required_error: "Selecione o material vendido" }),
  subtype: z.nativeEnum(MaterialSubtype, { required_error: "Selecione o subtipo do material" }),
  quantity: z.coerce
    .number()
    .min(0.01, { message: "Quantidade deve ser maior que zero" }),
  pricePerSquareMeter: z.coerce
    .number()
    .min(0.01, { message: "Preço deve ser maior que zero" }),
  sellerId: z.string({ required_error: "Selecione um vendedor" }),
  origin: z.nativeEnum(SaleOrigin, { required_error: "Selecione a origem do cliente" }),
});

export type SalesFormValues = z.infer<typeof salesFormSchema>;

// Mock data for materials
export const mockMaterials = [
  { id: "1", name: "Mármore Branco Carrara", type: MaterialType.MARBLE, pricePerSquareMeter: 450 },
  { id: "2", name: "Granito Preto São Gabriel", type: MaterialType.GRANITE, pricePerSquareMeter: 380 },
  { id: "3", name: "Quartzito Taj Mahal", type: MaterialType.QUARTZITE, pricePerSquareMeter: 720 },
];
