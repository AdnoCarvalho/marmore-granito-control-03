
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  mockMaterials, 
  mockTransactions, 
  mockClients, 
  mockStockSummary,
  mockSalesSummary
} from "@/utils/mockData";
import { TransactionType, MaterialType } from "@/types";

const DashboardOverview = () => {
  // Calculate summary data
  const totalClients = mockClients.length;
  
  const totalStockMaterials = mockMaterials.reduce(
    (acc, material) => acc + material.quantity,
    0
  );
  
  const totalIncome = mockTransactions
    .filter(transaction => transaction.type === TransactionType.INCOME && transaction.status === "completed")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(transaction => transaction.type === TransactionType.EXPENSE && transaction.status === "completed")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  // Data for Charts
  const stockData = [
    {
      name: "Mármore",
      quantity: mockStockSummary.find(summary => summary.materialType === MaterialType.MARBLE)?.totalQuantity || 0,
    },
    {
      name: "Granito",
      quantity: mockStockSummary.find(summary => summary.materialType === MaterialType.GRANITE)?.totalQuantity || 0,
    },
  ];

  const salesData = [
    {
      name: "Mármore",
      value: mockSalesSummary.find(summary => summary.materialType === MaterialType.MARBLE)?.totalSales || 0,
    },
    {
      name: "Granito",
      value: mockSalesSummary.find(summary => summary.materialType === MaterialType.GRANITE)?.totalSales || 0,
    },
  ];

  // Monthly income data - mock data for visualization
  const monthlyData = [
    { name: "Jan", value: 1200 },
    { name: "Fev", value: 1900 },
    { name: "Mar", value: 3000 },
    { name: "Abr", value: 5200 },
    { name: "Mai", value: 3100 },
    { name: "Jun", value: 2800 },
  ];

  const COLORS = ["#0EA5E9", "#403E43"];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStockMaterials} unidades</div>
            <p className="text-xs text-muted-foreground">
              Total de peças em mármore e granito
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Clientes corporativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">De vendas concluídas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {profit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Receitas - Despesas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="stock">Estoque</TabsTrigger>
          <TabsTrigger value="sales">Vendas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Distribuição de Vendas</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="stock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nível de Estoque Atual</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stockData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#403E43" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Tipo de Material</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: R$ ${value.toLocaleString()}`}
                  >
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
