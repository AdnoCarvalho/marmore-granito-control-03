
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Material, MaterialType, MaterialSubtype } from "@/types";

// Schema de validação para o formulário
const materialFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  type: z.nativeEnum(MaterialType, {
    required_error: "Selecione o tipo de material.",
  }),
  subtype: z.nativeEnum(MaterialSubtype, {
    required_error: "Selecione o subtipo de material."
  }),
  serialNumber: z.string().min(1, {
    message: "Número de série é obrigatório.",
  }),
  width: z.coerce.number().positive({
    message: "Largura deve ser um número positivo.",
  }),
  height: z.coerce.number().positive({
    message: "Comprimento deve ser um número positivo.",
  }),
  thickness: z.coerce.number().positive({
    message: "Espessura deve ser um número positivo.",
  }),
  quantity: z.coerce.number().int().positive({
    message: "Quantidade deve ser um número inteiro positivo.",
  }),
  pricePerSquareMeter: z.coerce.number().nonnegative({
    message: "Preço por m² deve ser um número positivo ou zero.",
  }),
  location: z.string().optional(),
  supplier: z.string().optional(),
  purchasePrice: z.coerce.number().nonnegative({
    message: "Preço de compra deve ser um número positivo ou zero.",
  }),
  notes: z.string().optional(),
});

type MaterialFormValues = z.infer<typeof materialFormSchema>;

interface AddMaterialDialogProps {
  onClose: () => void;
}

const AddMaterialDialog = ({ onClose }: AddMaterialDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar formulário com valores padrão
  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: "",
      type: MaterialType.MARBLE,
      subtype: MaterialSubtype.SLAB,
      serialNumber: "",
      width: 0,
      height: 0,
      thickness: 3,
      quantity: 1,
      pricePerSquareMeter: 0,
      location: "",
      supplier: "",
      purchasePrice: 0,
      notes: "",
    },
  });

  const onSubmit = (data: MaterialFormValues) => {
    setIsSubmitting(true);

    // Simulando adição ao banco de dados
    setTimeout(() => {
      // Criar objeto de material com os dados do formulário
      const newMaterial: Partial<Material> = {
        ...data,
        id: `MAT-${Math.floor(Math.random() * 10000)}`,
        purchaseDate: new Date(),
        dimensions: {
          width: data.width,
          height: data.height,
          thickness: data.thickness,
        },
      };

      console.log("Novo material cadastrado:", newMaterial);
      
      // Mostrar mensagem de sucesso
      toast.success("Material cadastrado com sucesso!", {
        description: `${data.name} foi adicionado ao estoque.`
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  // Calcular área e valor total para exibição em tempo real
  const watchWidth = form.watch("width");
  const watchHeight = form.watch("height");
  const watchQuantity = form.watch("quantity");
  const watchPrice = form.watch("pricePerSquareMeter");

  const area = watchWidth * watchHeight;
  const totalValue = area * watchPrice * watchQuantity;

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Adicionar Novo Material</DialogTitle>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome do Material */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Material</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Branco Paraná" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Número de Série */}
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Série</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: BP-2025-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Material */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Material</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
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

            {/* Dimensões - largura */}
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Largura (m)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dimensões - altura */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comprimento (m)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dimensões - espessura */}
            <FormField
              control={form.control}
              name="thickness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Espessura (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
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
                    <Input type="number" {...field} />
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
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Localização */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização no Depósito</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Galpão A, Prateleira 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fornecedor */}
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do fornecedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preço de compra */}
            <FormField
              control={form.control}
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço de Compra</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Informações calculadas */}
          <div className="bg-muted rounded-md p-4 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Área por unidade:</span>
                <p className="font-medium">{area.toFixed(2)} m²</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Valor total estimado:</span>
                <p className="font-medium text-primary">R$ {totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Observações */}
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informações adicionais sobre o material..."
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar Material"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddMaterialDialog;
