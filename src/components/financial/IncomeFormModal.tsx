
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon, DollarSign } from "lucide-react";
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

// Define income sources
const INCOME_SOURCES = [
  { id: "material-sale", label: "Venda de Material" },
  { id: "service", label: "Prestação de Serviço" },
  { id: "investment", label: "Investimento" },
  { id: "other", label: "Outro" },
];

// Form schema
const incomeFormSchema = z.object({
  source: z.string({ required_error: "Selecione a origem da receita" }),
  amount: z.coerce
    .number({ required_error: "Valor é obrigatório" })
    .positive("Valor deve ser positivo"),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  notes: z.string().optional(),
});

type IncomeFormValues = z.infer<typeof incomeFormSchema>;

interface IncomeFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IncomeFormModal = ({ open, onOpenChange }: IncomeFormModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      source: "",
      amount: undefined,
      date: new Date(),
      notes: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: IncomeFormValues) => {
    setIsSubmitting(true);
    try {
      // Normally would send this to an API
      console.log("Submitting income:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast.success("Receita registrada com sucesso!");
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao registrar receita");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[calc(100%-2rem)] mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2 text-center sm:text-left border-b pb-4">
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2 text-[#28a745] justify-center sm:justify-start">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[#28a745]" />
            Nova Receita
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 py-2 sm:py-4">
            {/* Source of income */}
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-slate-700">Origem da Receita</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-lg border-slate-300 focus:ring-[#28a745] focus:border-[#28a745]">
                        <SelectValue placeholder="Selecione a origem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full rounded-lg max-h-[40vh] overflow-y-auto" position="popper">
                      {INCOME_SOURCES.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.label}
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
                  <FormLabel className="text-sm sm:text-base text-slate-700">Valor (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full rounded-lg border-slate-300 focus:ring-[#28a745] focus:border-[#28a745]"
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
                  <FormLabel className="text-sm sm:text-base text-slate-700">Data</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="w-full pl-3 text-left font-normal rounded-lg border-slate-300 focus:ring-[#28a745] focus:border-[#28a745]"
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
                    <PopoverContent className="w-auto p-0 rounded-lg max-h-[40vh] overflow-y-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                        initialFocus
                        className="rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base text-slate-700">Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalhes adicionais sobre esta receita..."
                      className="w-full rounded-lg border-slate-300 focus:ring-[#28a745] focus:border-[#28a745] resize-y min-h-[80px]"
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
                className="w-full sm:w-auto order-2 sm:order-1 rounded-lg border-slate-300"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#28a745] hover:bg-[#218838] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto order-1 sm:order-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrar Receita"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IncomeFormModal;
