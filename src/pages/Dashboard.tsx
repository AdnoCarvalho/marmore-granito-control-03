
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Painel de Controle</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao painel de controle do PoligiSystem. Confira os principais indicadores da sua empresa.
          </p>
        </div>
        <DashboardOverview />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
