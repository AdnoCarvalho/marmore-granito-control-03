
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { MaterialType } from "@/types";
import { ChartContainer } from "@/components/ui/chart";

const SalesChart = () => {
  // Dados de vendas mensais aprimorados
  const monthlySalesData = [
    { month: "Jan", marble: 4500, granite: 3800, quartzite: 2200, total: 10500 },
    { month: "Fev", marble: 5200, granite: 4100, quartzite: 2600, total: 11900 },
    { month: "Mar", marble: 4800, granite: 4500, quartzite: 3100, total: 12400 },
    { month: "Abr", marble: 5800, granite: 5200, quartzite: 3500, total: 14500 },
    { month: "Mai", marble: 6200, granite: 4800, quartzite: 3800, total: 14800 },
    { month: "Jun", marble: 5900, granite: 5100, quartzite: 4000, total: 15000 },
  ];

  // Dados de vendas por material
  const materialSalesData = [
    {
      name: "Mármore",
      value: 26500,
      percentage: 41.2,
      color: "#9b87f5",
    },
    {
      name: "Granito",
      value: 22400,
      percentage: 34.8,
      color: "#F97316",
    },
    {
      name: "Quartzito",
      value: 15200,
      percentage: 24.0,
      color: "#4ade80",
    },
  ];

  // Dados de tendência de vendas diárias (último mês)
  const dailySalesData = [
    { day: "01", value: 1200 },
    { day: "05", value: 2100 },
    { day: "10", value: 1800 },
    { day: "15", value: 2400 },
    { day: "20", value: 2000 },
    { day: "25", value: 2800 },
    { day: "30", value: 2600 },
  ];

  // Configuração das cores para o gráfico
  const materialColors = {
    marble: "#9b87f5",    // Roxo
    granite: "#F97316",   // Laranja
    quartzite: "#4ade80", // Verde
  };

  // Configuração para o ChartContainer
  const chartConfig = {
    marble: { label: "Mármore", color: materialColors.marble },
    granite: { label: "Granito", color: materialColors.granite },
    quartzite: { label: "Quartzito", color: materialColors.quartzite },
  };

  // Cores para o gráfico de pizza
  const COLORS = [materialColors.marble, materialColors.granite, materialColors.quartzite];

  // Formatador de valores monetários
  const formatCurrency = (value) => `R$ ${value.toLocaleString('pt-BR')}`;

  // Fallback para quando não há dados
  const noDataFallback = (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Não há dados de vendas disponíveis para exibir</p>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Gráfico principal - Vendas Mensais */}
      <Card className="overflow-hidden">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Vendas por Tipo de Material (Mensal)</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-6 pt-0">
          <div className="h-64 sm:h-80">
            {monthlySalesData.length > 0 ? (
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={monthlySalesData}
                  margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280' }}
                    tickFormatter={value => `R$ ${value/1000}k`}
                    width={60}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `R$ ${value.toLocaleString('pt-BR')}`, 
                      name === 'marble' ? 'Mármore' : 
                      name === 'granite' ? 'Granito' : 'Quartzito'
                    ]}
                    labelFormatter={label => `Mês: ${label}`}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend 
                    formatter={(value) => (
                      value === 'marble' ? 'Mármore' : 
                      value === 'granite' ? 'Granito' : 'Quartzito'
                    )}
                    wrapperStyle={{ paddingTop: 10 }}
                  />
                  <Bar 
                    dataKey="marble" 
                    stackId="a" 
                    fill={materialColors.marble}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="granite" 
                    stackId="a" 
                    fill={materialColors.granite}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="quartzite" 
                    stackId="a" 
                    fill={materialColors.quartzite}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : noDataFallback}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos secundários */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Gráfico de pizza - Distribuição de vendas por material */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Distribuição de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0">
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="99%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    data={materialSalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={65}
                    innerRadius={window.innerWidth < 768 ? 10 : 0}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => (window.innerWidth < 640 ? 
                      `${(percent * 100).toFixed(0)}%` : 
                      `${name}: ${(percent * 100).toFixed(0)}%`)}
                  >
                    {materialSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de área - Tendência diária */}
        <Card className="overflow-hidden">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg">Tendência de Vendas Diárias</CardTitle>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0">
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="99%" height="100%">
                <AreaChart
                  data={dailySalesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280' }}
                    tickFormatter={value => `R$ ${value/1000}k`}
                    width={60}
                  />
                  <Tooltip 
                    formatter={value => formatCurrency(value)}
                    labelFormatter={label => `Dia ${label}`}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={materialColors.marble} 
                    fill={materialColors.marble} 
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de resumo por tipo de material */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {materialSalesData.map((material) => (
          <Card key={material.name} className="overflow-hidden">
            <div className="h-2" style={{ backgroundColor: material.color }} />
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-muted-foreground overflow-hidden text-ellipsis">{material.name}</span>
                  <span className="text-xs sm:text-sm font-medium">{material.percentage}% do total</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {formatCurrency(material.value)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;
