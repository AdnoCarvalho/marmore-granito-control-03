
import DashboardLayout from '@/components/layout/DashboardLayout';
import PurchaseList from '@/components/purchases/PurchaseList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Purchases = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">Compras de Material</h1>
          <p className="text-slate-500">
            Gerencie todas as compras de materiais feitas pela empresa. Registre novas aquisições e acompanhe as entregas.
          </p>
        </div>
        
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
