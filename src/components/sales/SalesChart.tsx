
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegendContent,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { MaterialType } from "@/types";

const SalesChart = () => {
  // Mock de dados (em uma aplicação real, viriam do backend)
  const monthlySalesData = [
    { month: "Jan", marble: 4500, granite: 3800, quartzite: 2200, total: 10500 },
    { month: "Fev", marble: 5200, granite: 4100, quartzite: 2600, total: 11900 },
    { month: "Mar", marble: 4800, granite: 4500, quartzite: 3100, total: 12400 },
    { month: "Abr", marble: 5800, granite: 5200, quartzite: 3500, total: 14500 },
    { month: "Mai", marble: 6200, granite: 4800, quartzite: 3800, total: 14800 },
  ];

  const materialSalesData = [
    {
      name: "Mármore",
      value: 26500,
      percentage: 41.2,
      color: "#6366f1",
    },
    {
      name: "Granito",
      value: 22400,
      percentage: 34.8,
      color: "#f97316",
    },
    {
      name: "Quartzito",
      value: 15200,
      percentage: 24.0,
      color: "#10b981",
    },
  ];

  // Configuração das cores para o gráfico
  const materialColors = {
    marble: "#6366f1",  // Indigo
    granite: "#f97316", // Orange
    quartzite: "#10b981", // Emerald
  };

  // Configuração para o ChartContainer
  const chartConfig = {
    marble: { label: "Mármore", color: materialColors.marble },
    granite: { label: "Granito", color: materialColors.granite },
    quartzite: { label: "Quartzito", color: materialColors.quartzite },
  };

  // Fallback para quando não há dados
  const noDataFallback = (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground">Não há dados de vendas disponíveis para exibir</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Gráfico principal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Vendas por Tipo de Material (Mensal)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {monthlySalesData.length > 0 ? (
              <ChartContainer config={chartConfig}>
                <BarChart
                  data={monthlySalesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    verticalAlign="top"
                  />
                  <Bar
                    dataKey="marble"
                    name="Mármore"
                    stackId="a"
                    fill={materialColors.marble}
                  />
                  <Bar
                    dataKey="granite"
                    name="Granito"
                    stackId="a"
                    fill={materialColors.granite}
                  />
                  <Bar
                    dataKey="quartzite"
                    name="Quartzito"
                    stackId="a"
                    fill={materialColors.quartzite}
                  />
                </BarChart>
              </ChartContainer>
            ) : noDataFallback}
          </div>
        </CardContent>
      </Card>

      {/* Cards de resumo por tipo de material */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {materialSalesData.map((material) => (
          <Card key={material.name} className="overflow-hidden">
            <div className="h-2" style={{ backgroundColor: material.color }} />
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{material.name}</span>
                  <span className="text-sm font-medium">{material.percentage}% do total</span>
                </div>
                <div className="text-2xl font-bold">
                  R$ {material.value.toLocaleString('pt-BR')}
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
