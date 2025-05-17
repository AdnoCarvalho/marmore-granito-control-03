
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PurchaseDashboard from "@/components/purchases/PurchaseDashboard";
import PurchaseForm from "@/components/purchases/PurchaseForm";
import PurchaseList from "@/components/purchases/PurchaseList";

const PurchaseCreate = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Compras de Material</h1>
          <p className="text-slate-500">
            Gerencie todas as compras de materiais feitas pela empresa. Registre novas aquisições e acompanhe as entregas.
          </p>
        </div>
        
        <PurchaseDashboard />
        
        <Tabs defaultValue="historico" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="nova">Nova Compra</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nova" className="space-y-4 animate-fade-in">
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle>Nova Compra de Material</CardTitle>
                <CardDescription>
                  Registre uma nova compra de material para atualizar o estoque.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PurchaseForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="historico" className="space-y-4 animate-fade-in">
            <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle>Histórico de Compras</CardTitle>
                <CardDescription>
                  Lista completa de todas as aquisições de material feitas pela empresa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PurchaseList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PurchaseCreate;
