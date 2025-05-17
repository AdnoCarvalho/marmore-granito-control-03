
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Calendar, DollarSign, Truck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Purchase, PurchaseStatus } from "@/types/purchase";
import { MaterialType } from '@/types';
import { mockPurchases } from '@/utils/mockPurchases';

// Helper function to get the current month's purchases
const getCurrentMonthPurchases = (purchases: Purchase[]) => {
  const now = new Date();
  return purchases.filter(purchase => {
    const purchaseDate = new Date(purchase.purchaseDate);
    return (
      purchaseDate.getMonth() === now.getMonth() &&
      purchaseDate.getFullYear() === now.getFullYear()
    );
  });
};

const PurchaseDashboard = () => {
  const [purchases] = useState<Purchase[]>(mockPurchases);
  const [currentMonthPurchases, setCurrentMonthPurchases] = useState<Purchase[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [lastSupplier, setLastSupplier] = useState("");
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const monthPurchases = getCurrentMonthPurchases(purchases);
    setCurrentMonthPurchases(monthPurchases);
    
    // Calculate total spent
    const spent = monthPurchases.reduce((total, purchase) => total + purchase.totalPrice, 0);
    setTotalSpent(spent);
    
    // Calculate total quantity
    const quantity = monthPurchases.reduce((total, purchase) => total + purchase.quantity, 0);
    setTotalQuantity(quantity);
    
    // Get last supplier
    if (purchases.length > 0) {
      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      setLastSupplier(latestPurchase.supplierName);
    }
    
    // Prepare chart data
    const purchasesByType: Record<string, { type: string, value: number, count: number }> = {};
    
    monthPurchases.forEach(purchase => {
      const materialType = purchase.materialType;
      const typeLabel = materialType === MaterialType.MARBLE 
        ? "Mármore" 
        : materialType === MaterialType.GRANITE 
          ? "Granito" 
          : "Quartzito";
      
      if (!purchasesByType[materialType]) {
        purchasesByType[materialType] = { type: typeLabel, value: 0, count: 0 };
      }
      
      purchasesByType[materialType].value += purchase.totalPrice;
      purchasesByType[materialType].count += purchase.quantity;
    });
    
    setChartData(Object.values(purchasesByType));
  }, [purchases]);

  const chartColors = ["#9b87f5", "#F9802D", "#4ade80"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Card 1 - Total Spent */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-slate-500" />
            <span>Total em Compras</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">
              R$ {totalSpent.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2 - Total Quantity */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-slate-500" />
            <span>Qtd. Materiais</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">
              {totalQuantity} {totalQuantity === 1 ? 'unidade' : 'unidades'}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), "MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 3 - Last Supplier */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-slate-500" />
            <span>Último Fornecedor</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-lg font-medium line-clamp-1">{lastSupplier || "Sem registros"}</p>
            <p className="text-sm text-muted-foreground">
              {purchases.length > 0
                ? format(new Date(purchases[0].purchaseDate), "dd 'de' MMMM", { locale: ptBR })
                : "Sem data"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 4 - Chart */}
      <Card className="shadow-sm md:col-span-1">
        <CardHeader className="pb-2">
          <CardDescription className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Compras por Tipo</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[100px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" width={80} />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Sem dados para exibir</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseDashboard;
