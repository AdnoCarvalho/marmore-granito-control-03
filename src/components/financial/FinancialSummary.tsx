
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { mockTransactions } from "@/utils/mockData";
import { Transaction, TransactionType } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Wallet, TrendingUp, TrendingDown, CalendarIcon } from "lucide-react";
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FinancialSummaryProps {
  showTransactionsOnly?: boolean;
}

const FinancialSummary = ({ showTransactionsOnly = false }: FinancialSummaryProps) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // Calcular intervalo de datas para filtrar
  const startDate = startOfMonth(selectedMonth);
  const endDate = endOfMonth(selectedMonth);

  // Filtrar transações do mês selecionado
  const filteredTransactions = mockTransactions.filter((transaction) =>
    isWithinInterval(new Date(transaction.date), {
      start: startDate,
      end: endDate,
    })
  );

  // Calcular resumo para o mês selecionado
  const totalIncome = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.INCOME &&
        transaction.status === "completed"
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type === TransactionType.EXPENSE &&
        transaction.status === "completed"
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalPending = filteredTransactions
    .filter((transaction) => transaction.status === "pending")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Gerar dados do gráfico - últimos 6 meses
  const generateChartData = () => {
    const data = [];
    const currentDate = new Date();

    for (let i = 5; i >= 0; i--) {
      const month = subMonths(currentDate, i);
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const monthlyIncome = mockTransactions
        .filter(
          (transaction) =>
            transaction.type === TransactionType.INCOME &&
            transaction.status === "completed" &&
            isWithinInterval(new Date(transaction.date), {
              start: monthStart,
              end: monthEnd,
            })
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      const monthlyExpense = mockTransactions
        .filter(
          (transaction) =>
            transaction.type === TransactionType.EXPENSE &&
            transaction.status === "completed" &&
            isWithinInterval(new Date(transaction.date), {
              start: monthStart,
              end: monthEnd,
            })
        )
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      data.push({
        name: format(month, "MMM", { locale: ptBR }),
        receitas: monthlyIncome,
        despesas: monthlyExpense,
        saldo: monthlyIncome - monthlyExpense,
      });
    }

    return data;
  };

  const chartData = generateChartData();

  // Determina a cor do badge baseado no tipo de transação
  const getTransactionBadge = (transaction: Transaction) => {
    if (transaction.status === "pending") {
      return (
        <Badge variant="warning">Pendente</Badge>
      );
    }
    
    if (transaction.type === TransactionType.INCOME) {
      return (
        <Badge variant="success">Receita</Badge>
      );
    } else {
      return (
        <Badge variant="danger">Despesa</Badge>
      );
    }
  };

  if (showTransactionsOnly) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Movimentações Financeiras</h2>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
            </Button>
            
            {showCalendar && (
              <div className="absolute right-0 mt-1 bg-card shadow-lg rounded-lg z-10 border">
                <Calendar
                  mode="single"
                  selected={selectedMonth}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedMonth(date);
                      setShowCalendar(false);
                    }
                  }}
                  locale={ptBR}
                  initialFocus
                  className="pointer-events-auto"
                />
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-accent/5 transition-colors">
                      <TableCell>
                        {format(new Date(transaction.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{getTransactionBadge(transaction)}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={`text-right ${
                        transaction.type === TransactionType.INCOME
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        R$ {transaction.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      Nenhuma transação encontrada para este mês.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Pendentes</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.filter(t => t.status === "pending").length > 0 ? (
                  filteredTransactions
                    .filter((t) => t.status === "pending")
                    .map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-accent/5 transition-colors">
                        <TableCell>
                          {format(new Date(transaction.date), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {transaction.type === TransactionType.INCOME
                            ? "Receita"
                            : "Despesa"}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.description}
                        </TableCell>
                        <TableCell className="text-right">
                          R$ {transaction.amount.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      Nenhuma transação pendente para este mês.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resumo Financeiro</h2>
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowCalendar(!showCalendar)}
            className="hover-scale"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
          </Button>
          
          {showCalendar && (
            <div className="absolute right-0 mt-1 bg-card shadow-lg rounded-lg z-10 border">
              <Calendar
                mode="single"
                selected={selectedMonth}
                onSelect={(date) => {
                  if (date) {
                    setSelectedMonth(date);
                    setShowCalendar(false);
                  }
                }}
                locale={ptBR}
                initialFocus
                className="pointer-events-auto"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                Receitas
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                Despesas
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card-hover transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Saldo
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              R$ {balance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Receitas - Despesas
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-card-hover transition-all duration-200">
        <CardHeader>
          <CardTitle>Desempenho Financeiro</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="receitas"
                name="Receitas"
                stroke="#10B981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="despesas"
                name="Despesas"
                stroke="#EF4444"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="saldo"
                name="Saldo"
                stroke="#0EA5E9"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-card-hover transition-all duration-200">
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.slice(0, 5).length > 0 ? (
                filteredTransactions
                  .slice(0, 5)
                  .map((transaction) => (
                    <TableRow key={transaction.id} className="hover:bg-accent/5 transition-colors">
                      <TableCell>
                        {format(new Date(transaction.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{getTransactionBadge(transaction)}</TableCell>
                      <TableCell className="font-medium">
                        {transaction.description}
                      </TableCell>
                      <TableCell className={`text-right ${
                        transaction.type === TransactionType.INCOME
                          ? "text-green-600"
                          : "text-red-600"
                      }`}>
                        R$ {transaction.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nenhuma transação encontrada para este mês.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
