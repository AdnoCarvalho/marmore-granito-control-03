
import DashboardLayout from '@/components/layout/DashboardLayout';
import InventoryList from '@/components/inventory/InventoryList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Inventory = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2">Gerenciamento de Estoque</h1>
          <p className="text-slate-500">
            Cadastre, visualize e gerencie todos os materiais disponíveis em seu estoque.
          </p>
        </div>
        
        <Card className="shadow-card">
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
