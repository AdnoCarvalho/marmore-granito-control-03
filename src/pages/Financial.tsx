
import { useState } from "react";
import { PlusCircle, ArrowUpCircle, ArrowDownCircle, Calendar, DollarSign } from "lucide-react";
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
          
          <div className="flex flex-col sm:flex-row gap-3 mt-2 md:mt-0 w-full sm:w-auto">
            <Button 
              onClick={() => setIncomeModalOpen(true)}
              className="bg-[#28a745] hover:bg-[#218838] text-white flex-1 sm:flex-none py-6 sm:py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Nova Receita
            </Button>
            <Button 
              onClick={() => setExpenseModalOpen(true)}
              className="bg-[#dc3545] hover:bg-[#c82333] text-white flex-1 sm:flex-none py-6 sm:py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]"
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Nova Despesa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-[#28a745] bg-green-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ArrowUpCircle className="h-8 w-8 text-[#28a745] mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 font-heading">Receitas</h3>
                  <p className="text-sm text-slate-500">Entradas financeiras</p>
                </div>
              </div>
              <Button 
                onClick={() => setIncomeModalOpen(true)}
                variant="outline" 
                className="w-full border-green-200 text-[#28a745] hover:bg-green-100 rounded-lg py-5 sm:py-2 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Receita
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-[#dc3545] bg-red-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <ArrowDownCircle className="h-8 w-8 text-[#dc3545] mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 font-heading">Despesas</h3>
                  <p className="text-sm text-slate-500">Saídas financeiras</p>
                </div>
              </div>
              <Button 
                onClick={() => setExpenseModalOpen(true)}
                variant="outline" 
                className="w-full border-red-200 text-[#dc3545] hover:bg-red-100 rounded-lg py-5 sm:py-2 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Despesa
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-lg shadow-md">
          <CardContent className="p-0">
            <Tabs defaultValue="resumo" className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex rounded-lg">
                  <TabsTrigger value="resumo" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white">Resumo</TabsTrigger>
                  <TabsTrigger value="movimentacoes" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white">Movimentações</TabsTrigger>
                  <TabsTrigger value="cadastro" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white">Formulários</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="resumo" className="space-y-4 animate-fade-in p-4">
                <FinancialSummary />
              </TabsContent>
              
              <TabsContent value="movimentacoes" className="space-y-4 animate-fade-in p-4">
                <FinancialSummary showTransactionsOnly={true} />
              </TabsContent>
              
              <TabsContent value="cadastro" className="space-y-4 animate-fade-in p-4">
                <TransactionForms />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Income Modal */}
        <IncomeFormModal open={incomeModalOpen} onOpenChange={setIncomeModalOpen} />
        
        {/* Expense Modal */}
        <ExpenseFormModal open={expenseModalOpen} onOpenChange={setExpenseModalOpen} />
      </div>
    </DashboardLayout>
  );
};

export default Financial;
