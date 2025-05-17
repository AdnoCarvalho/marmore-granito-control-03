import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Users, PackageCheck, User, MapPin, Banknote } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SaleOrigin } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  clientId: z.string({ required_error: "Selecione um cliente" }),
  date: z.date({ required_error: "Selecione uma data" }),
  materialId: z.string({ required_error: "Selecione um material" }),
  quantity: z.number().positive({ message: "Deve ser maior que zero" }),
  sellerId: z.string({ required_error: "Selecione um vendedor" }),
  origin: z.nativeEnum(SaleOrigin, { 
    required_error: "Selecione uma origem" 
  }),
  totalValue: z.number().positive({ message: "Deve ser maior que zero" }),
});

type FormData = z.infer<typeof formSchema>;

const SalesForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      totalValue: 0,
      date: new Date(),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
    
    // Simulando envio para API
    try {
      // Lógica para salvar a venda na API iria aqui
      
      // Notifica sucesso com toast
      toast({
        title: "Venda registrada com sucesso!",
        description: `Cliente: ${data.clientId}, Valor: R$ ${data.totalValue.toFixed(2)}`,
      });
      
      // Reset do formulário
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao registrar venda",
        description: "Ocorreu um problema ao salvar os dados.",
        variant: "destructive",
      });
    }
  };

  // Mock de dados (em uma aplicação real, viriam do backend)
  const mockClients = [
    { id: "1", name: "Marmoraria Silva" },
    { id: "2", name: "Construtora Horizonte" },
    { id: "3", name: "Depósito Mármores & Cia" },
  ];

  const mockMaterials = [
    { id: "1", name: "Mármore Branco Carrara" },
    { id: "2", name: "Granito Preto São Gabriel" },
    { id: "3", name: "Quartzito Taj Mahal" },
  ];

  const mockSellers = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Maria Oliveira" },
    { id: "3", name: "Carlos Santos" },
  ];

  // Cálculo do valor total (em um caso real, poderia vir de uma API)
  const calculateTotal = (materialId: string, quantity: number) => {
    // Valor fictício por unidade (em um caso real, viria de uma consulta)
    const unitPrices: Record<string, number> = {
      "1": 1500,
      "2": 1200,
      "3": 2200,
    };
    
    const unitPrice = unitPrices[materialId] || 0;
    return unitPrice * quantity;
  };

  // Atualiza valor total quando material ou quantidade são alterados
  React.useEffect(() => {
    const materialId = form.watch("materialId");
    const quantity = form.watch("quantity");
    
    if (materialId && quantity) {
      const total = calculateTotal(materialId, quantity);
      form.setValue("totalValue", total);
    }
  }, [form.watch("materialId"), form.watch("quantity")]);

  return (
    <Card>
      <CardContent className="pt-6">
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
                        <SelectTrigger className="w-full">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <SelectValue placeholder="Selecione um cliente" />
                          </div>
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

              {/* Data */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da Venda</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal justify-start"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Material */}
              <FormField
                control={form.control}
                name="materialId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <PackageCheck className="h-4 w-4" />
                            <SelectValue placeholder="Selecione um material" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockMaterials.map((material) => (
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

              {/* Quantidade */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Quantidade em chapas/unidades
                    </FormDescription>
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
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <SelectValue placeholder="Selecione um vendedor" />
                          </div>
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

              {/* Origem */}
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origem do Cliente</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <SelectValue placeholder="Selecione a origem" />
                          </div>
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

              {/* Valor Total */}
              <FormField
                control={form.control}
                name="totalValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Banknote className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-9" 
                          type="number" 
                          step="0.01" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          value={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Registrar Venda
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SalesForm;
