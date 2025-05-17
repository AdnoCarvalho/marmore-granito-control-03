
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { TransactionType } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const expenseSchema = z.object({
  category: z.string({
    required_error: "Por favor, selecione uma categoria.",
  }),
  amount: z.coerce
    .number({
      required_error: "Por favor, informe um valor.",
      invalid_type_error: "O valor deve ser numérico.",
    })
    .positive("O valor deve ser maior que zero."),
  date: z.date({
    required_error: "Por favor, selecione uma data.",
  }),
  description: z.string().min(3, "A descrição deve ter no mínimo 3 caracteres."),
});

const incomeSchema = z.object({
  source: z.string({
    required_error: "Por favor, selecione a origem.",
  }),
  amount: z.coerce
    .number({
      required_error: "Por favor, informe um valor.",
      invalid_type_error: "O valor deve ser numérico.",
    })
    .positive("O valor deve ser maior que zero."),
  date: z.date({
    required_error: "Por favor, selecione uma data.",
  }),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;
type IncomeFormValues = z.infer<typeof incomeSchema>;

const TransactionForms = () => {
  const { toast } = useToast();

  const expenseForm = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const incomeForm = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmitExpense = (data: ExpenseFormValues) => {
    // Simulação de cadastro de despesa
    console.log("Despesa cadastrada:", data);
    toast({
      title: "Despesa registrada",
      description: `Despesa de R$ ${data.amount.toLocaleString()} cadastrada com sucesso!`,
    });
    expenseForm.reset({
      category: "",
      amount: undefined,
      date: new Date(),
      description: "",
    });
  };

  const onSubmitIncome = (data: IncomeFormValues) => {
    // Simulação de cadastro de receita
    console.log("Receita cadastrada:", data);
    toast({
      title: "Receita registrada",
      description: `Receita de R$ ${data.amount.toLocaleString()} cadastrada com sucesso!`,
    });
    incomeForm.reset({
      source: "",
      amount: undefined,
      date: new Date(),
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="despesa" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="despesa" className="text-red-500">Cadastrar Despesa</TabsTrigger>
          <TabsTrigger value="receita" className="text-green-500">Cadastrar Receita</TabsTrigger>
        </TabsList>
        
        <TabsContent value="despesa" className="space-y-4 animate-fade-in">
          <Card className="hover:shadow-card-hover transition-all duration-200">
            <CardHeader>
              <CardTitle>Nova Despesa</CardTitle>
              <CardDescription>
                Cadastre uma nova despesa no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...expenseForm}>
                <form onSubmit={expenseForm.handleSubmit(onSubmitExpense)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={expenseForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="folha-salarial">Folha Salarial</SelectItem>
                              <SelectItem value="material">Compra de Material</SelectItem>
                              <SelectItem value="energia">Energia</SelectItem>
                              <SelectItem value="agua">Água</SelectItem>
                              <SelectItem value="transporte">Transporte</SelectItem>
                              <SelectItem value="aluguel">Aluguel</SelectItem>
                              <SelectItem value="manutencao">Manutenção</SelectItem>
                              <SelectItem value="impostos">Impostos</SelectItem>
                              <SelectItem value="extra">Extra</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={expenseForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor (R$)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0,00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={expenseForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
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
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              locale={ptBR}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={expenseForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva a despesa..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full hover:shadow-md transition-all"
                  >
                    Cadastrar Despesa
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="receita" className="space-y-4 animate-fade-in">
          <Card className="hover:shadow-card-hover transition-all duration-200">
            <CardHeader>
              <CardTitle>Nova Receita</CardTitle>
              <CardDescription>
                Cadastre uma nova receita no sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...incomeForm}>
                <form onSubmit={incomeForm.handleSubmit(onSubmitIncome)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={incomeForm.control}
                      name="source"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Origem</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma origem" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="venda">Venda</SelectItem>
                              <SelectItem value="recebimento">Recebimento</SelectItem>
                              <SelectItem value="adiantamento">Adiantamento</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={incomeForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor (R$)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0,00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={incomeForm.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ptBR })
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
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              locale={ptBR}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={incomeForm.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Observações sobre a receita..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Opcional</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full hover:shadow-md transition-all"
                  >
                    Cadastrar Receita
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionForms;
