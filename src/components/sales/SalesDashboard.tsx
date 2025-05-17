
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UsersRound, TrendingUp, UserRound, Package } from "lucide-react";
import { mockSales, mockClients } from "./list/mockData";

const SalesDashboard = () => {
  // Calculate sales metrics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const salesThisMonth = mockSales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
  });

  // Calculate total sales for current month
  const totalSalesAmount = salesThisMonth.reduce((sum, sale) => sum + sale.totalValue, 0);
  
  // Calculate total quantity sold
  const totalQuantitySold = salesThisMonth.reduce((sum, sale) => sum + sale.quantity, 0);
  
  // Get the latest customer
  const lastSale = [...mockSales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const lastClientId = lastSale?.clientId || "";
  const lastClient = mockClients.find(client => client.id === lastClientId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Sales Amount */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-green-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Vendido no Mês</p>
            <h3 className="text-2xl font-bold mt-1">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSalesAmount)}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total Quantity Sold */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-blue-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Peças Vendidas no Mês</p>
            <h3 className="text-2xl font-bold mt-1">{totalQuantitySold}</h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Last Customer */}
      <Card className="overflow-hidden md:col-span-2">
        <div className="h-2 bg-purple-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Último Cliente Atendido</p>
            <h3 className="text-xl font-bold mt-1 truncate">
              {lastClient ? lastClient.companyName : "Nenhum cliente registrado"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {lastSale ? new Intl.DateTimeFormat('pt-BR').format(new Date(lastSale.date)) : ""}
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <UsersRound className="h-6 w-6 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
