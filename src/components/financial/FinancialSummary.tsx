
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
import { Wallet, TrendingUp, TrendingDown, Calendar as CalendarIcon } from "lucide-react";
import { format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";

const FinancialSummary = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  // Calculate date range for filtering
  const startDate = startOfMonth(selectedMonth);
  const endDate = endOfMonth(selectedMonth);

  // Filter transactions for the selected month
  const filteredTransactions = mockTransactions.filter((transaction) =>
    isWithinInterval(new Date(transaction.date), {
      start: startDate,
      end: endDate,
    })
  );

  // Calculate summary for the selected month
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

  // Generate chart data - last 6 months
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
        name: format(month, "MMM"),
        income: monthlyIncome,
        expense: monthlyExpense,
        balance: monthlyIncome - monthlyExpense,
      });
    }

    return data;
  };

  const chartData = generateChartData();

  // Function to determine the badge color based on transaction type
  const getTransactionBadge = (transaction: Transaction) => {
    if (transaction.status === "pending") {
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          Pending
        </Badge>
      );
    }
    
    if (transaction.type === TransactionType.INCOME) {
      return (
        <Badge variant="outline" className="border-green-500 text-green-500">
          Income
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">
          Expense
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Financial Summary</h2>
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedMonth, "MMMM yyyy")}
          </Button>
          
          {showCalendar && (
            <div className="absolute right-0 mt-1 bg-card shadow-lg rounded-lg z-10 border">
              <Calendar
                mode="month"
                selected={selectedMonth}
                onSelect={(date) => {
                  if (date) {
                    setSelectedMonth(date);
                    setShowCalendar(false);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
                Income
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              For {format(selectedMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                Expenses
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              For {format(selectedMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Balance
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>
              R$ {balance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Income - Expenses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filteredTransactions.filter(t => t.status === "pending").length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
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
                    dataKey="income"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
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
                        No transactions found for this month.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.filter(t => t.status === "pending").length > 0 ? (
                    filteredTransactions
                      .filter((t) => t.status === "pending")
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {format(new Date(transaction.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell>
                            {transaction.type === TransactionType.INCOME
                              ? "Income"
                              : "Expense"}
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
                        No pending transactions for this month.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialSummary;
