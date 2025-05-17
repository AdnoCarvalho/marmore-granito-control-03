
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
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import { 
  mockMaterials, 
  mockTransactions, 
  mockClients, 
  mockStockSummary,
  mockSalesSummary
} from "@/utils/mockData";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TransactionType, MaterialType } from "@/types";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Package, ShoppingCart, Calendar, Box, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardOverview = () => {
  // Calculate summary data
  const totalClients = mockClients.length;
  
  const totalStockMaterials = mockMaterials.reduce(
    (acc, material) => acc + material.quantity,
    0
  );
  
  // Valor total em estoque
  const totalStockValue = mockMaterials.reduce(
    (acc, material) => {
      // Calculando área em m² (largura x altura) e multiplicando pelo preço por m² e quantidade
      const areaSqM = material.dimensions.width * material.dimensions.height;
      const materialValue = (material.pricePerSquareMeter || material.purchasePrice) * areaSqM * material.quantity;
      return acc + materialValue;
    },
    0
  );

  // Quantidade de chapas e blocos
  const totalSlabs = mockMaterials.filter(m => m.subtype === 'slab').reduce((acc, m) => acc + m.quantity, 0);
  const totalBlocks = mockMaterials.filter(m => m.subtype === 'block').reduce((acc, m) => acc + m.quantity, 0);
  
  // Materiais com maior giro (simulado - normalmente viria de dados reais de vendas)
  const topSellingMaterials = [...mockMaterials]
    .sort((a, b) => (b.pricePerSquareMeter || 0) - (a.pricePerSquareMeter || 0))
    .slice(0, 3);
  
  const totalIncome = mockTransactions
    .filter(transaction => transaction.type === TransactionType.INCOME && transaction.status === "completed")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const totalExpenses = mockTransactions
    .filter(transaction => transaction.type === TransactionType.EXPENSE && transaction.status === "completed")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  // Última movimentação financeira
  const lastTransaction = [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Total de compras no mês
  const currentMonthPurchases = mockTransactions
    .filter(t => 
      t.type === TransactionType.EXPENSE && 
      t.category === "Compra de Material" &&
      new Date(t.date).getMonth() === new Date().getMonth() &&
      new Date(t.date).getFullYear() === new Date().getFullYear()
    )
    .reduce((acc, t) => acc + t.amount, 0);

  // Última compra
  const lastPurchase = [...mockTransactions]
    .filter(t => t.type === TransactionType.EXPENSE && t.category === "Compra de Material")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Total de vendas no mês
  const currentMonthSales = mockTransactions
    .filter(t => 
      t.type === TransactionType.INCOME && 
      t.category === "Venda de Material" &&
      new Date(t.date).getMonth() === new Date().getMonth() &&
      new Date(t.date).getFullYear() === new Date().getFullYear()
    )
    .reduce((acc, t) => acc + t.amount, 0);

  // Última venda
  const lastSale = [...mockTransactions]
    .filter(t => t.type === TransactionType.INCOME && t.category === "Venda de Material")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  // Data for Charts
  const stockData = [
    {
      name: "Mármore",
      quantity: mockStockSummary.find(summary => summary.materialType === MaterialType.MARBLE)?.totalQuantity || 0,
      value: "marble"
    },
    {
      name: "Granito",
      quantity: mockStockSummary.find(summary => summary.materialType === MaterialType.GRANITE)?.totalQuantity || 0,
      value: "granite"
    },
    {
      name: "Quartzito",
      quantity: mockStockSummary.find(summary => summary.materialType === MaterialType.QUARTZITE)?.totalQuantity || 0,
      value: "quartzite"
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
    {
      name: "Quartzito",
      value: mockSalesSummary.find(summary => summary.materialType === MaterialType.QUARTZITE)?.totalSales || 0,
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

  // Daily sales data
  const dailySalesData = [
    { name: "01", value: 540 },
    { name: "05", value: 1290 },
    { name: "10", value: 860 },
    { name: "15", value: 1470 },
    { name: "20", value: 1030 },
    { name: "25", value: 1920 },
    { name: "30", value: 1400 },
  ];

  const COLORS = ["#0EA5E9", "#403E43", "#F97316"];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Indicadores Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Total</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStockMaterials} unidades</div>
            <p className="text-xs text-muted-foreground">
              {totalSlabs} chapas | {totalBlocks} blocos
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
            <Box className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalStockValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Baseado no preço/m²</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">De vendas concluídas</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              R$ {profit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Receitas - Despesas</p>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Indicadores Secundários */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Indicador de Vendas */}
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {currentMonthSales.toLocaleString()}</div>
            {lastSale && (
              <p className="text-xs text-muted-foreground">
                Última: {formatDistanceToNow(new Date(lastSale.date), { locale: ptBR, addSuffix: true })}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Indicador de Compras */}
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compras do Mês</CardTitle>
            <Truck className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">R$ {currentMonthPurchases.toLocaleString()}</div>
            {lastPurchase && (
              <p className="text-xs text-muted-foreground">
                Última: {formatDistanceToNow(new Date(lastPurchase.date), { locale: ptBR, addSuffix: true })}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Despesas do Mês */}
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total despesas</p>
          </CardContent>
        </Card>

        {/* Total de Clientes */}
        <Card className="hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Clientes corporativos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
        </TabsList>

        {/* Tab: Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Gráfico de Receita Mensal */}
            <Card className="col-span-2">
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
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Última Movimentação */}
            <Card>
              <CardHeader>
                <CardTitle>Última Movimentação</CardTitle>
              </CardHeader>
              <CardContent>
                {lastTransaction ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={lastTransaction.type === TransactionType.INCOME ? "success" : "destructive"}>
                        {lastTransaction.type === TransactionType.INCOME ? "Receita" : "Despesa"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(lastTransaction.date), { locale: ptBR, addSuffix: true })}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{lastTransaction.description}</h3>
                      <p className={`text-xl font-bold ${lastTransaction.type === TransactionType.INCOME ? "text-green-600" : "text-red-600"}`}>
                        R$ {lastTransaction.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Categoria: {lastTransaction.category}</p>
                      <p>Status: {lastTransaction.status === "completed" ? "Concluído" : "Pendente"}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">Nenhuma movimentação recente.</p>
                )}
              </CardContent>
            </Card>

            {/* Materiais com Maior Giro */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Materiais com Maior Giro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {topSellingMaterials.map((material, index) => (
                    <div key={material.id} className="flex items-center space-x-4 border rounded-md p-4 hover:shadow-md transition-all duration-200">
                      <div className={`w-2 h-10 rounded-full ${
                        index === 0 ? "bg-[#FFD700]" : 
                        index === 1 ? "bg-[#C0C0C0]" : 
                        "bg-[#CD7F32]"
                      }`} />
                      <div>
                        <h3 className="font-medium">{material.name}</h3>
                        <p className="text-sm text-muted-foreground">{material.type}</p>
                        <p className="text-sm">
                          <span className="font-bold">
                            R$ {(material.pricePerSquareMeter || 0).toLocaleString()}/m²
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Financeiro */}
        <TabsContent value="financeiro" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receitas vs Despesas</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
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
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Receitas" stroke="#10B981" strokeWidth={2} />
                    <Line type="monotone" dataKey="value" name="Despesas" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receitas</CardTitle>
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

        {/* Tab: Estoque */}
        <TabsContent value="estoque" className="space-y-4">
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
                  <Tooltip formatter={(value) => `${value} unidades`} />
                  <Bar dataKey="quantity" fill="#0EA5E9">
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Vendas */}
        <TabsContent value="vendas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vendas por Tipo de Material</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
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
            
            <Card>
              <CardHeader>
                <CardTitle>Vendas Diárias</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailySalesData}
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
                    <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardOverview;
