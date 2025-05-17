
import DashboardLayout from '@/components/layout/DashboardLayout';
import InventoryList from '@/components/inventory/InventoryList';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Inventory = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Gerenciamento de Estoque</h1>
          <p className="text-slate-500">
            Cadastre, visualize e gerencie todos os materiais disponíveis em seu estoque.
          </p>
        </div>
        
        <InventoryDashboard />
        
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle>Materiais em Estoque</CardTitle>
            <CardDescription>
              Lista completa de todas as chapas e blocos disponíveis no depósito.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
