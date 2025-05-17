
import React from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import custom form components
import ClientSelectionField from "./forms/ClientSelectionField";
import DateSelectionField from "./forms/DateSelectionField";
import MaterialSelectionFields from "./forms/MaterialSelectionFields";
import QuantityPriceFields from "./forms/QuantityPriceFields";
import SellerOriginFields from "./forms/SellerOriginFields";
import TotalValueDisplay from "./forms/TotalValueDisplay";
import { useSalesForm } from "./forms/useSalesForm";

const SalesForm = () => {
  const {
    form,
    totalValue,
    watchMaterialType,
    handleMaterialChange,
    onSubmit
  } = useSalesForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Registrar Nova Venda
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo para registrar uma nova venda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <ClientSelectionField control={form.control} />

              {/* Data da venda */}
              <DateSelectionField control={form.control} />

              {/* Material fields */}
              <MaterialSelectionFields 
                control={form.control} 
                onMaterialChange={handleMaterialChange}
                watchMaterialType={watchMaterialType}
              />

              {/* Quantity and price fields */}
              <QuantityPriceFields control={form.control} />

              {/* Seller and origin fields */}
              <SellerOriginFields control={form.control} />

              {/* Total Value Display */}
              <TotalValueDisplay totalValue={totalValue} />
            </div>

            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Registrar Venda
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SalesForm;
