
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;
