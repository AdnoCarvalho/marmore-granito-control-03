
import DashboardLayout from '@/components/layout/DashboardLayout';
import InventoryList from '@/components/inventory/InventoryList';

const Inventory = () => {
  return (
    <DashboardLayout>
      <h1 className="page-title">Inventory Management</h1>
      <InventoryList />
    </DashboardLayout>
  );
};

export default Inventory;
