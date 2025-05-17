
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { SalesFormValues } from "./salesFormTypes";

interface QuantityPriceFieldsProps {
  control: Control<SalesFormValues>;
}

const QuantityPriceFields: React.FC<QuantityPriceFieldsProps> = ({ control }) => {
  return (
    <>
      {/* Quantidade */}
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade (m²)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Quantidade em m²"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Preço por m² */}
      <FormField
        control={control}
        name="pricePerSquareMeter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço por m² (R$)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.01"
                placeholder="Preço por m²"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default QuantityPriceFields;
