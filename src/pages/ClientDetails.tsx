
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Client, Sale } from "@/types";
import { mockClients } from "@/utils/mockData";

// Import mockSales from SalesList.tsx or create a shared mock data file
const mockSales: Sale[] = [
  {
    id: "1",
    clientId: "1",
    date: new Date("2025-05-10"),
    materialId: "1",
    quantity: 3,
    sellerId: "2",
    origin: "direct" as any,
    totalValue: 4500,
    status: "paid",
  },
  {
    id: "2",
    clientId: "2",
    date: new Date("2025-05-12"),
    materialId: "2",
    quantity: 2,
    sellerId: "1",
    origin: "reference" as any,
    totalValue: 2400,
    status: "pending",
  },
  {
    id: "3",
    clientId: "3",
    date: new Date("2025-05-14"),
    materialId: "3",
    quantity: 1,
    sellerId: "3",
    origin: "website" as any,
    totalValue: 2200,
    status: "paid",
  },
  {
    id: "4",
    clientId: "1",
    date: new Date("2025-05-16"),
    materialId: "2",
    quantity: 5,
    sellerId: "2",
    origin: "social_media" as any,
    totalValue: 6000,
    status: "cancelled",
  },
  {
    id: "5",
    clientId: "1",
    date: new Date("2025-05-20"),
    materialId: "3",
    quantity: 2,
    sellerId: "1",
    origin: "direct" as any,
    totalValue: 4400,
    status: "paid",
  },
];

const mockMaterials = [
  { id: "1", name: "Mármore Branco Carrara" },
  { id: "2", name: "Granito Preto São Gabriel" },
  { id: "3", name: "Quartzito Taj Mahal" },
];

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [clientSales, setClientSales] = useState<Sale[]>([]);
  const [totalPurchased, setTotalPurchased] = useState(0);

  useEffect(() => {
    // Encontrar o cliente pelo ID
    const foundClient = mockClients.find((c) => c.id === id);
    if (foundClient) {
      setClient(foundClient);
    }

    // Filtrar compras do cliente pelo ID
    const sales = mockSales.filter((sale) => sale.clientId === id);
    setClientSales(sales);

    // Calcular total comprado
    const total = sales.reduce((acc, sale) => acc + sale.totalValue, 0);
    setTotalPurchased(total);
  }, [id]);

  const getMaterialName = (materialId: string) => {
    const material = mockMaterials.find((m) => m.id === materialId);
    return material ? material.name : "Material não encontrado";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="outline" className="bg-status-paid/10 text-status-paid border-status-paid/20">Pago</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending/20">Pendente</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!client) {
    return (
      <DashboardLayout>
        <div>Cliente não encontrado</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">
            Detalhes do Cliente
          </h1>
          <p className="text-slate-500">
            Informações detalhadas e histórico de compras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-xl">Informações do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Empresa</p>
                <p className="font-medium">{client.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CNPJ</p>
                <p className="font-medium">{client.cnpj}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contato</p>
                <p className="font-medium">{client.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{client.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{client.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Endereço</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rua</p>
                  <p className="font-medium">{client.address.street}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Número</p>
                  <p className="font-medium">{client.address.number}</p>
                </div>
                {client.address.complement && (
                  <div>
                    <p className="text-sm text-muted-foreground">Complemento</p>
                    <p className="font-medium">{client.address.complement}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <p className="font-medium">{client.address.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <p className="font-medium">{client.address.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CEP</p>
                  <p className="font-medium">{client.address.zipCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="historico" className="space-y-4">
          <TabsList>
            <TabsTrigger value="historico">Histórico de Compras</TabsTrigger>
            <TabsTrigger value="resumo">Resumo Financeiro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Histórico de Compras</CardTitle>
              </CardHeader>
              <CardContent>
                {clientSales.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Material</TableHead>
                          <TableHead>Quantidade</TableHead>
                          <TableHead>Valor (R$)</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientSales.map((sale) => (
                          <TableRow key={sale.id} className="hover:bg-muted/50 transition-colors">
                            <TableCell>{format(sale.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                            <TableCell>{getMaterialName(sale.materialId)}</TableCell>
                            <TableCell>{sale.quantity}</TableCell>
                            <TableCell>{sale.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                            <TableCell>{getStatusBadge(sale.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-center py-6 text-muted-foreground">
                    Este cliente ainda não realizou compras.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resumo">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="text-lg font-medium text-muted-foreground">Total Comprado</h3>
                          <p className="text-3xl font-bold mt-2">
                            {totalPurchased.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="text-lg font-medium text-muted-foreground">Total de Compras</h3>
                          <p className="text-3xl font-bold mt-2">{clientSales.length}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-4">Status das Compras</h3>
                      <div className="space-y-2">
                        {['paid', 'pending', 'cancelled'].map((status) => {
                          const count = clientSales.filter(sale => sale.status === status).length;
                          const total = clientSales.filter(sale => sale.status === status)
                            .reduce((acc, sale) => acc + sale.totalValue, 0);
                          
                          if (count === 0) return null;
                          
                          return (
                            <div key={status} className="flex justify-between items-center">
                              <div className="flex items-center">
                                {getStatusBadge(status)}
                                <span className="ml-2">{count} {count === 1 ? 'compra' : 'compras'}</span>
                              </div>
                              <span className="font-medium">
                                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetails;
