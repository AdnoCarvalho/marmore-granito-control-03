
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientList from '@/components/clients/ClientList';

const Clients = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Clientes</h1>
      <ClientList />
    </DashboardLayout>
  );
};

export default Clients;
