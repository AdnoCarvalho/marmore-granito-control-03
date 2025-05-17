
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientList from '@/components/clients/ClientList';

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Gerenciamento de Clientes</h1>
          <p className="text-slate-500">
            Visualize, pesquise e gerencie seus clientes
          </p>
        </div>
        <ClientList />
      </div>
    </DashboardLayout>
  );
};

export default Clients;
