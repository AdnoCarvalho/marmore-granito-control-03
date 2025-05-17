
import React from "react";
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
import { SaleOrigin } from "@/types";
import { Control } from "react-hook-form";
import { SalesFormValues } from "./salesFormTypes";

// Mock data (would come from API/database in a real app)
const mockSellers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Oliveira" },
  { id: "3", name: "Carlos Santos" },
];

interface SellerOriginFieldsProps {
  control: Control<SalesFormValues>;
}

const SellerOriginFields: React.FC<SellerOriginFieldsProps> = ({ control }) => {
  return (
    <>
      {/* Vendedor */}
      <FormField
        control={control}
        name="sellerId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vendedor</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {mockSellers.map((seller) => (
                  <SelectItem key={seller.id} value={seller.id}>
                    {seller.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Origem do cliente */}
      <FormField
        control={control}
        name="origin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Origem do cliente</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Como conheceu a empresa" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={SaleOrigin.DIRECT}>Venda Direta</SelectItem>
                <SelectItem value={SaleOrigin.REFERENCE}>Referência</SelectItem>
                <SelectItem value={SaleOrigin.SOCIAL_MEDIA}>Redes Sociais</SelectItem>
                <SelectItem value={SaleOrigin.WEBSITE}>Website</SelectItem>
                <SelectItem value={SaleOrigin.OTHER}>Outra</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default SellerOriginFields;
