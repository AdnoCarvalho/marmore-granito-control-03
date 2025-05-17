
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientList from '@/components/clients/ClientList';

const Clients = () => {
  return (
    <DashboardLayout>
      <h1 className="page-title">Client Management</h1>
      <ClientList />
    </DashboardLayout>
  );
};

export default Clients;
