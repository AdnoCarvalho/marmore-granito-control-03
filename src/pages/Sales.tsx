
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesForm from "@/components/sales/SalesForm";
import SalesList from "@/components/sales/SalesList";
import SalesChart from "@/components/sales/SalesChart";

const Sales = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Vendas</h1>
          <p className="text-slate-500">
            Gestão de vendas, histórico e análise de desempenho.
          </p>
        </div>

        <Tabs defaultValue="nova" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="nova">Nova Venda</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="analise">Análise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nova" className="space-y-4 animate-fade-in">
            <SalesForm />
          </TabsContent>
          
          <TabsContent value="historico" className="space-y-4 animate-fade-in">
            <SalesList />
          </TabsContent>
          
          <TabsContent value="analise" className="space-y-4 animate-fade-in">
            <SalesChart />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Sales;
