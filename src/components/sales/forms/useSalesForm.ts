
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { MaterialType, MaterialSubtype, SaleOrigin } from "@/types";
import { salesFormSchema, SalesFormValues } from "./salesFormTypes";
import { mockMaterials } from "./salesFormTypes";

export const useSalesForm = () => {
  const { toast } = useToast();
  const [totalValue, setTotalValue] = useState(0);

  const form = useForm<SalesFormValues>({
    resolver: zodResolver(salesFormSchema),
    defaultValues: {
      clientId: "",
      date: new Date(),
      materialType: MaterialType.MARBLE,
      materialId: "",
      subtype: MaterialSubtype.SLAB,
      quantity: 1,
      pricePerSquareMeter: 0,
      sellerId: "",
      origin: SaleOrigin.DIRECT,
    },
  });

  const watchQuantity = form.watch("quantity");
  const watchPrice = form.watch("pricePerSquareMeter");
  const watchMaterialType = form.watch("materialType");

  // Calculate total value when quantity or price changes
  useEffect(() => {
    const calculatedTotal = watchQuantity * watchPrice;
    setTotalValue(calculatedTotal || 0);
  }, [watchQuantity, watchPrice]);

  // Set price when material changes
  const handleMaterialChange = (materialId: string) => {
    const selectedMaterial = mockMaterials.find(
      (material) => material.id === materialId
    );
    if (selectedMaterial) {
      form.setValue("pricePerSquareMeter", selectedMaterial.pricePerSquareMeter);
    }
  };

  // Form submission handler
  const onSubmit = (data: SalesFormValues) => {
    // In a real app, this would send data to an API
    const saleData = {
      ...data,
      totalValue: totalValue,
    };

    console.log("Nova venda:", saleData);

    // Create financial record
    const financialRecord = {
      type: "income",
      description: `Venda de ${mockMaterials.find(m => m.id === data.materialId)?.name}`,
      amount: totalValue,
      date: data.date,
      status: "pending",
      category: "Venda de Material",
      clientId: data.clientId
    };

    console.log("Registro financeiro criado:", financialRecord);

    // Success message
    toast({
      title: "Venda registrada com sucesso!",
      description: `Total: R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    });

    // Reset form
    form.reset({
      clientId: "",
      date: new Date(),
      materialType: MaterialType.MARBLE,
      materialId: "",
      subtype: MaterialSubtype.SLAB,
      quantity: 1,
      pricePerSquareMeter: 0,
      sellerId: "",
      origin: SaleOrigin.DIRECT,
    });
  };

  return {
    form,
    totalValue,
    watchMaterialType,
    handleMaterialChange,
    onSubmit
  };
};
