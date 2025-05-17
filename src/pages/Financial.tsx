
import DashboardLayout from '@/components/layout/DashboardLayout';
import FinancialSummary from '@/components/financial/FinancialSummary';

const Financial = () => {
  return (
    <DashboardLayout>
      <h1 className="page-title">Financial Overview</h1>
      <FinancialSummary />
    </DashboardLayout>
  );
};

export default Financial;
