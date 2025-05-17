
import DashboardLayout from '@/components/layout/DashboardLayout';
import InventoryList from '@/components/inventory/InventoryList';

const Inventory = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Estoque</h1>
      <InventoryList />
    </DashboardLayout>
  );
};

export default Inventory;
