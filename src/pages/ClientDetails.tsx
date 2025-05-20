
import React from "react";
import { useParams } from 'react-router-dom';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockClients } from "@/utils/mockData";
import { Sale, SaleOrigin, NCMCode } from "@/types";

const ClientDetails = () => {
  const params = useParams();
  const clientId = params.clientId;

  // Find the client based on the clientId from the route
  const client = mockClients.find(c => c.id === clientId);

  if (!client) {
    return (
      <DashboardLayout>
        <div>Cliente não encontrado</div>
      </DashboardLayout>
    );
  }

  // Mock service appointments data for the client
  const mockClientAppointments: Sale[] = [
    {
      id: "1",
      clientId: clientId as string,
      date: new Date("2023-06-15"),
      materialId: "1",
      quantity: 1,
      sellerId: "1",
      origin: SaleOrigin.DIRECT,
      totalValue: 120,
      status: "paid",
      ncmCode: NCMCode.MARBLE_PROCESSED
    },
    {
      id: "2",
      clientId: clientId as string,
      date: new Date("2023-07-20"),
      materialId: "2",
      quantity: 1,
      sellerId: "2",
      origin: SaleOrigin.REFERENCE,
      totalValue: 180,
      status: "pending",
      ncmCode: NCMCode.GRANITE_PROCESSED
    },
    {
      id: "3",
      clientId: clientId as string,
      date: new Date("2023-08-10"),
      materialId: "3",
      quantity: 1,
      sellerId: "1",
      origin: SaleOrigin.WEBSITE,
      totalValue: 150,
      status: "paid",
      ncmCode: NCMCode.MARBLE_RAW
    },
    {
      id: "4",
      clientId: clientId as string,
      date: new Date("2023-09-05"),
      materialId: "4",
      quantity: 1,
      sellerId: "3",
      origin: SaleOrigin.SOCIAL_MEDIA,
      totalValue: 200,
      status: "cancelled",
      ncmCode: NCMCode.GRANITE_PROCESSED
    },
    {
      id: "5",
      clientId: clientId as string,
      date: new Date("2023-10-18"),
      materialId: "1",
      quantity: 1,
      sellerId: "2",
      origin: SaleOrigin.DIRECT,
      totalValue: 120,
      status: "paid",
      ncmCode: NCMCode.MARBLE_PROCESSED
    }
  ];

  // Map material IDs to beauty services
  const serviceNames: Record<string, string> = {
    "1": "Design de Sobrancelhas",
    "2": "Extensão de Cílios",
    "3": "Manicure",
    "4": "Pedicure"
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-slate-200">Detalhes da Cliente</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-pink-900/50 text-pink-200">{client.companyName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-slate-100">{client.companyName}</h2>
                <p className="text-sm text-slate-400">Contato: {client.contactName}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm font-medium text-slate-300">Email</p>
                <p className="text-slate-400">{client.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300">Telefone</p>
                <p className="text-slate-400">{client.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300">Endereço</p>
                <p className="text-slate-400">
                  {client.address.street}, {client.address.number}, {client.address.city}, {client.address.state} {client.address.zipCode}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-300">CPF</p>
                <p className="text-slate-400">{client.cnpj}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Histórico de Atendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption className="text-slate-400">Histórico de serviços realizados para esta cliente.</TableCaption>
              <TableHeader className="border-slate-700">
                <TableRow className="border-slate-700">
                  <TableHead className="w-[100px] text-slate-300">Ref</TableHead>
                  <TableHead className="text-slate-300">Data</TableHead>
                  <TableHead className="text-slate-300">Serviço</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-right text-slate-300">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClientAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="font-medium text-slate-300">{appointment.id}</TableCell>
                    <TableCell className="text-slate-300">{appointment.date.toLocaleDateString()}</TableCell>
                    <TableCell className="text-slate-300">{serviceNames[appointment.materialId] || "Outro Serviço"}</TableCell>
                    <TableCell>
                      {appointment.status === "paid" ? (
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-emerald-100">Pago</Badge>
                      ) : appointment.status === "pending" ? (
                        <Badge className="bg-amber-600 hover:bg-amber-700 text-amber-100">Pendente</Badge>
                      ) : (
                        <Badge className="bg-red-600 hover:bg-red-700 text-red-100">Cancelado</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-slate-300">R$ {appointment.totalValue.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-slate-700 bg-slate-800">
                <TableRow className="border-slate-700">
                  <TableCell colSpan={4} className="text-slate-200">Total</TableCell>
                  <TableCell className="text-right text-slate-200">
                    R$ {mockClientAppointments
                      .filter(appointment => appointment.status !== "cancelled")
                      .reduce((acc, appointment) => acc + appointment.totalValue, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientDetails;
