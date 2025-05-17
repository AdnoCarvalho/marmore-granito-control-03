
import DashboardLayout from '@/components/layout/DashboardLayout';
import FinancialSummary from '@/components/financial/FinancialSummary';
import TransactionForms from '@/components/financial/TransactionForms';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Financial = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Visão Financeira</h1>
          <p className="text-slate-500">
            Gerenciamento de entradas, saídas e acompanhamento do fluxo de caixa.
          </p>
        </div>

        <Tabs defaultValue="resumo" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="cadastro">Novo Lançamento</TabsTrigger>
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
      </div>
    </DashboardLayout>
  );
};

export default Financial;
