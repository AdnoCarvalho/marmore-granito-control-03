
import { useState } from "react";
import { PlusCircle, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import DashboardLayout from '@/components/layout/DashboardLayout';
import FinancialSummary from '@/components/financial/FinancialSummary';
import TransactionForms from '@/components/financial/TransactionForms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import IncomeFormModal from "@/components/financial/IncomeFormModal";
import ExpenseFormModal from "@/components/financial/ExpenseFormModal";

const Financial = () => {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Visão Financeira</h1>
            <p className="text-slate-500">
              Gerenciamento de entradas, saídas e acompanhamento do fluxo de caixa.
            </p>
          </div>
          
          <div className="flex gap-3 mt-2 md:mt-0">
            <Button 
              onClick={() => setIncomeModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white flex-1 md:flex-none"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Receita
            </Button>
            <Button 
              onClick={() => setExpenseModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white flex-1 md:flex-none"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Despesa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-green-500 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ArrowUpCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Receitas</h3>
                  <p className="text-sm text-slate-500">Entradas financeiras</p>
                </div>
              </div>
              <Button 
                onClick={() => setIncomeModalOpen(true)}
                variant="outline" 
                className="w-full border-green-200 text-green-700 hover:bg-green-100"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Receita
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ArrowDownCircle className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Despesas</h3>
                  <p className="text-sm text-slate-500">Saídas financeiras</p>
                </div>
              </div>
              <Button 
                onClick={() => setExpenseModalOpen(true)}
                variant="outline" 
                className="w-full border-red-200 text-red-700 hover:bg-red-100"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Despesa
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="resumo" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="cadastro">Formulários</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resumo" className="space-y-4 animate-fade-in">
            <FinancialSummary />
          </TabsContent>
          
          <TabsContent value="movimentacoes" className="space-y-4 animate-fade-in">
            <FinancialSummary showTransactionsOnly={true} />
          </TabsContent>
          
          <TabsContent value="cadastro" className="space-y-4 animate-fade-in">
            <TransactionForms />
          </TabsContent>
        </Tabs>

        {/* Income Modal */}
        <IncomeFormModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
        
        {/* Expense Modal */}
        <ExpenseFormModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      </div>
    </DashboardLayout>
  );
};

export default Financial;
