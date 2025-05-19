
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
        <div>Client not found</div>
      </DashboardLayout>
    );
  }

  // Mock sales data for the client
  const mockClientSales: Sale[] = [
    {
      id: "1",
      clientId: clientId as string,
      date: new Date("2023-06-15"),
      materialId: "1",
      quantity: 3,
      sellerId: "1",
      origin: SaleOrigin.DIRECT,
      totalValue: 4500,
      status: "paid",
      ncmCode: NCMCode.MARBLE_PROCESSED
    },
    {
      id: "2",
      clientId: clientId as string,
      date: new Date("2023-07-20"),
      materialId: "2",
      quantity: 2,
      sellerId: "2",
      origin: SaleOrigin.REFERENCE,
      totalValue: 3200,
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
      totalValue: 1800,
      status: "paid",
      ncmCode: NCMCode.MARBLE_RAW
    },
    {
      id: "4",
      clientId: clientId as string,
      date: new Date("2023-09-05"),
      materialId: "4",
      quantity: 4,
      sellerId: "3",
      origin: SaleOrigin.SOCIAL_MEDIA,
      totalValue: 6200,
      status: "cancelled",
      ncmCode: NCMCode.GRANITE_PROCESSED
    },
    {
      id: "5",
      clientId: clientId as string,
      date: new Date("2023-10-18"),
      materialId: "1",
      quantity: 2,
      sellerId: "2",
      origin: SaleOrigin.DIRECT,
      totalValue: 3000,
      status: "paid",
      ncmCode: NCMCode.MARBLE_PROCESSED
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Client Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{client.companyName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{client.companyName}</h2>
                <p className="text-sm text-muted-foreground">Contact: {client.contactName}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-muted-foreground">{client.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-muted-foreground">{client.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-muted-foreground">
                  {client.address.street}, {client.address.number}, {client.address.city}, {client.address.state} {client.address.zipCode}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">CNPJ</p>
                <p className="text-muted-foreground">{client.cnpj}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of recent sales made to this client.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClientSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id}</TableCell>
                    <TableCell>{sale.date.toLocaleDateString()}</TableCell>
                    <TableCell>
                      {sale.status === "paid" ? (
                        <Badge variant="outline">Paid</Badge>
                      ) : sale.status === "pending" ? (
                        <Badge>Pending</Badge>
                      ) : (
                        <Badge variant="destructive">Cancelled</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{sale.totalValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$21,700.00</TableCell>
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
