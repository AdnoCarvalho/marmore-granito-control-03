
import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { mockSuppliers } from "@/utils/mockPurchases";
import { MaterialType, MaterialSubtype } from "@/types";
import { PurchaseFormValues } from "@/types/purchase";

interface PurchaseFormProps {
  onSubmit: (data: PurchaseFormValues) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  supplierId: z.string({ required_error: "Selecione o fornecedor" }),
  materialType: z.nativeEnum(MaterialType, {
    required_error: "Selecione o tipo de material"
  }),
  materialName: z.string().min(3, "Nome do material deve ter pelo menos 3 caracteres"),
  subtype: z.nativeEnum(MaterialSubtype, {
    required_error: "Selecione o subtipo"
  }),
  serialNumber: z.string().optional(),
  quantity: z.number().min(1, "Quantidade deve ser maior que zero"),
  width: z.number().min(0.1, "Largura deve ser maior que zero"),
  height: z.number().min(0.1, "Altura deve ser maior que zero"),
  thickness: z.number().min(0.01, "Espessura deve ser maior que zero"),
  pricePerSquareMeter: z.number().min(0.01, "Preço por m² deve ser maior que zero"),
  purchaseDate: z.date({ required_error: "Selecione a data da compra" }),
  notes: z.string().optional()
});

const PurchaseForm = ({ onSubmit, onCancel }: PurchaseFormProps) => {
  const { toast } = useToast();
  const [totalValue, setTotalValue] = useState<number>(0);

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
      width: 0,
      height: 0,
      thickness: 0.02,
      pricePerSquareMeter: 0,
      purchaseDate: new Date(),
    },
  });

  // Calculate total value when relevant fields change
  const calculateTotal = () => {
    const { width, height, quantity, pricePerSquareMeter } = form.getValues();
    
    if (width && height && quantity && pricePerSquareMeter) {
      const areaSqM = width * height;
      const total = areaSqM * quantity * pricePerSquareMeter;
      setTotalValue(total);
    }
  };

  // Subscribe to form field changes
  form.watch(() => calculateTotal());

  const handleSubmit = (data: PurchaseFormValues) => {
    toast({
      title: "Compra registrada com sucesso",
      description: "A compra foi adicionada e o estoque atualizado."
    });
    
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fornecedor */}
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o fornecedor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockSuppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Data da compra */}
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data da Compra</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full pl-3 text-left font-normal"
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
                      disabled={(date) => date > new Date()}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de Material */}
          <FormField
            control={form.control}
            name="materialType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Material</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de material" />
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

          {/* Nome específico do material */}
          <FormField
            control={form.control}
            name="materialName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Material</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Branco Paraná, Verde Ubatuba" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subtipo (Chapa ou Bloco) */}
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

          {/* Número de série */}
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Série (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: MCR-12345" {...field} />
                </FormControl>
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
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))} 
                    min={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensões: Largura */}
          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Largura (m)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    min={0.1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensões: Altura */}
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comprimento/Altura (m)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    min={0.1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dimensões: Espessura */}
          <FormField
            control={form.control}
            name="thickness"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Espessura (m)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.001"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    min={0.01}
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
                <FormLabel>Preço por m²</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01"
                    {...field} 
                    onChange={e => field.onChange(Number(e.target.value))} 
                    min={0.01}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Observações */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações (opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Adicione comentários ou observações sobre esta compra"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Valor Total */}
        <div className="bg-muted p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">Valor Total da Compra:</span>
            <span className="text-xl font-bold">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#F9802D] hover:bg-[#E57220]">
            Registrar Compra
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PurchaseForm;
