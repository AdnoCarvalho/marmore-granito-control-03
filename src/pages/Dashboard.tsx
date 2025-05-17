
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="page-title">Dashboard</h1>
      <DashboardOverview />
    </DashboardLayout>
  );
};

export default Dashboard;
