
import DashboardLayout from '@/components/layout/DashboardLayout';
import FinancialSummary from '@/components/financial/FinancialSummary';

const Financial = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold tracking-tight">Visão Financeira</h1>
      <FinancialSummary />
    </DashboardLayout>
  );
};

export default Financial;
