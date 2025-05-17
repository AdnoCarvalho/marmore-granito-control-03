
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Plus, ShoppingCart } from "lucide-react";
import { MaterialType, MaterialSubtype, SaleOrigin } from "@/types";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock data (would come from API/database in a real app)
const mockClients = [
  { id: "1", name: "Marmoraria Silva" },
  { id: "2", name: "Construtora Horizonte" },
  { id: "3", name: "Depósito Mármores & Cia" },
];

const mockMaterials = [
  { id: "1", name: "Mármore Branco Carrara", type: MaterialType.MARBLE, pricePerSquareMeter: 450 },
  { id: "2", name: "Granito Preto São Gabriel", type: MaterialType.GRANITE, pricePerSquareMeter: 380 },
  { id: "3", name: "Quartzito Taj Mahal", type: MaterialType.QUARTZITE, pricePerSquareMeter: 720 },
];

const mockSellers = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Oliveira" },
  { id: "3", name: "Carlos Santos" },
];

// Form schema validation
const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

const SalesForm = () => {
  const { toast } = useToast();
  const [totalValue, setTotalValue] = useState(0);
  const [filteredMaterials, setFilteredMaterials] = useState(mockMaterials);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  // Filter materials based on selected type
  useEffect(() => {
    if (watchMaterialType) {
      const filtered = mockMaterials.filter(
        (material) => material.type === watchMaterialType
      );
      setFilteredMaterials(filtered);
      form.setValue("materialId", "");
    }
  }, [watchMaterialType, form]);

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

  const onSubmit = (data: FormValues) => {
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
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockClients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data da venda */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da venda</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tipo de material */}
              <FormField
                control={form.control}
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
                control={form.control}
                name="materialId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Específico</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleMaterialChange(value);
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
                control={form.control}
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

              {/* Quantidade */}
              <FormField
                control={form.control}
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
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preço por m² */}
              <FormField
                control={form.control}
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
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vendedor */}
              <FormField
                control={form.control}
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
                control={form.control}
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

              {/* Total Value Display (Read-only) */}
              <div className="md:col-span-2 p-4 border rounded-md bg-slate-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Valor Total da Venda:</span>
                  <span className="text-xl font-bold text-slate-900">
                    R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
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
