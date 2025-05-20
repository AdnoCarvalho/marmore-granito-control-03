
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UsersRound, TrendingUp, UserRound, Scissors, Eye, Snail } from "lucide-react";
import { mockSales, mockClients } from "./list/mockData";

const SalesDashboard = () => {
  // Calculate appointments metrics
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const appointmentsThisMonth = mockSales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
  });

  // Calculate total revenue for current month
  const totalRevenue = appointmentsThisMonth.reduce((sum, appointment) => sum + appointment.totalValue, 0);
  
  // Calculate total services provided
  const totalServicesProvided = appointmentsThisMonth.reduce((sum, appointment) => sum + appointment.quantity, 0);
  
  // Get the latest customer
  const lastAppointment = [...mockSales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const lastClientId = lastAppointment?.clientId || "";
  const lastClient = mockClients.find(client => client.id === lastClientId);

  // Map service types to counts
  const serviceTypes = appointmentsThisMonth.reduce((acc, appointment) => {
    const serviceType = appointment.materialId;
    acc[serviceType] = (acc[serviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get the most popular service
  let mostPopularServiceId = "";
  let maxCount = 0;
  
  Object.entries(serviceTypes).forEach(([serviceId, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostPopularServiceId = serviceId;
    }
  });

  // Map service IDs to beauty services
  const serviceNames: Record<string, string> = {
    "1": "Design de Sobrancelhas",
    "2": "Extensão de Cílios",
    "3": "Manicure",
    "4": "Pedicure"
  };

  const mostPopularService = serviceNames[mostPopularServiceId] || "Serviço não especificado";

  // Matching service icon
  const getServiceIcon = (serviceId: string) => {
    switch (serviceId) {
      case "1": return <Eye className="h-6 w-6 text-purple-500" />;
      case "2": return <Eye className="h-6 w-6 text-blue-500" />;
      case "3": return <Snail className="h-6 w-6 text-emerald-500" />; // Changed from Nail to Snail
      case "4": return <Snail className="h-6 w-6 text-emerald-500" />; // Changed from Nail to Snail
      default: return <Scissors className="h-6 w-6 text-emerald-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Revenue */}
      <Card className="overflow-hidden bg-slate-800 border-slate-700">
        <div className="h-2 bg-primary" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Faturamento do Mês</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-100">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue)}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Total Services Provided */}
      <Card className="overflow-hidden bg-slate-800 border-slate-700">
        <div className="h-2 bg-blue-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Atendimentos no Mês</p>
            <h3 className="text-2xl font-bold mt-1 text-slate-100">{totalServicesProvided}</h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Scissors className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Most Popular Service */}
      <Card className="overflow-hidden bg-slate-800 border-slate-700">
        <div className="h-2 bg-emerald-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Serviço Mais Popular</p>
            <h3 className="text-xl font-bold mt-1 text-slate-100 truncate">{mostPopularService}</h3>
            <p className="text-sm text-slate-400 mt-1">{maxCount} atendimentos</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            {getServiceIcon(mostPopularServiceId)}
          </div>
        </CardContent>
      </Card>

      {/* Last Customer */}
      <Card className="overflow-hidden bg-slate-800 border-slate-700">
        <div className="h-2 bg-purple-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Última Cliente</p>
            <h3 className="text-xl font-bold mt-1 truncate text-slate-100">
              {lastClient ? lastClient.name : "Nenhuma cliente registrada"}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {lastAppointment ? new Intl.DateTimeFormat('pt-BR').format(new Date(lastAppointment.date)) : ""}
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <UsersRound className="h-6 w-6 text-purple-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesDashboard;
