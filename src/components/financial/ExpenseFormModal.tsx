
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Define expense categories
const EXPENSE_CATEGORIES = [
  { id: "payroll", label: "Folha de Pagamento" },
  { id: "materials", label: "Compra de Material" },
  { id: "rent", label: "Aluguel" },
  { id: "transport", label: "Transporte" },
  { id: "maintenance", label: "Manutenção" },
  { id: "utilities", label: "Serviços Públicos" },
  { id: "extra", label: "Extra" },
];

// Form schema
const expenseFormSchema = z.object({
  category: z.string({ required_error: "Selecione uma categoria" }),
  amount: z.coerce
    .number({ required_error: "Valor é obrigatório" })
    .positive("Valor deve ser positivo"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  description: z.string()
    .min(3, "Descrição deve ter pelo menos 3 caracteres")
    .max(200, "Descrição muito longa"),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

interface ExpenseFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpenseFormModal = ({ open, onOpenChange }: ExpenseFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      category: "",
      amount: undefined,
      date: new Date(),
      description: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ExpenseFormValues) => {
    setIsSubmitting(true);
    try {
      // Normally would send this to an API
      console.log("Submitting expense:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast.success("Despesa registrada com sucesso!");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao registrar despesa");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 text-center sm:text-left">
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2 text-red-700 justify-center sm:justify-start">
            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 rotate-45 text-red-600" />
            Nova Despesa
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Expense Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full max-h-[40vh] overflow-y-auto" position="popper">
                      {EXPENSE_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Valor (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm sm:text-base">Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
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
                        locale={ptBR}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalhes sobre esta despesa..."
                      className="w-full resize-y min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-2 sm:pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto order-1 sm:order-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Despesa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseFormModal;
