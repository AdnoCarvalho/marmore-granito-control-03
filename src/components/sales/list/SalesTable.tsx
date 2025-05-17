
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sale, SaleOrigin, MaterialType, MaterialSubtype } from "@/types";

interface SalesTableProps {
  sales: Sale[];
  getClientName: (clientId: string) => string;
  getMaterialName: (materialId: string) => string;
  getMaterialType: (materialId: string) => string;
  getMaterialSubtype: (materialId: string) => string;
  getSellerName: (sellerId: string) => string;
  getOriginLabel: (origin: SaleOrigin) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const SalesTable: React.FC<SalesTableProps> = ({
  sales,
  getClientName,
  getMaterialName,
  getMaterialType,
  getMaterialSubtype,
  getSellerName,
  getOriginLabel,
  getStatusBadge,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Subtipo</TableHead>
            <TableHead>Qtd</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Vendedor</TableHead>
            <TableHead>Origem</TableHead>
            <TableHead className="text-right">Valor (R$)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-medium">{getClientName(sale.clientId)}</TableCell>
                <TableCell>{getMaterialName(sale.materialId)}</TableCell>
                <TableCell>{getMaterialType(sale.materialId)}</TableCell>
                <TableCell>{getMaterialSubtype(sale.materialId)}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>{format(sale.date, "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                <TableCell>{getSellerName(sale.sellerId)}</TableCell>
                <TableCell>{getOriginLabel(sale.origin)}</TableCell>
                <TableCell className="text-right">{sale.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</TableCell>
                <TableCell>{getStatusBadge(sale.status)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                Nenhuma venda encontrada com os filtros aplicados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SalesTable;
