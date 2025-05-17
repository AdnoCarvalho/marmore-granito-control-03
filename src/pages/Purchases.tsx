
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PurchaseDashboard from '@/components/purchases/PurchaseDashboard';
import PurchaseList from '@/components/purchases/PurchaseList';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const Purchases = () => {
  const navigate = useNavigate();

  const handleNewPurchase = () => {
    navigate('/purchases/create');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Compras de Material</h1>
            <p className="text-slate-500">
              Gerencie todas as compras de materiais feitas pela empresa. Registre novas aquisições e acompanhe as entregas.
            </p>
          </div>
          
          <Button 
            onClick={handleNewPurchase}
            className="bg-[#F9802D] hover:bg-[#E57220] text-white w-full md:w-auto"
          >
            <Package className="mr-2 h-4 w-4" />
            Nova Compra
          </Button>
        </div>
        
        <PurchaseDashboard />
        
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle>Histórico de Compras</CardTitle>
            <CardDescription>
              Lista completa de todas as aquisições de material feitas pela empresa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PurchaseList />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Purchases;
