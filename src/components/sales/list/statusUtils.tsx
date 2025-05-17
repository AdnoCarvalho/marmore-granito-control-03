
import React from "react";
import { Badge } from "@/components/ui/badge";
import { SaleOrigin } from "@/types";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Pago</Badge>;
    case "pending":
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Pendente</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelado</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const getOriginLabel = (origin: SaleOrigin) => {
  const labels: Record<string, string> = {
    [SaleOrigin.DIRECT]: "Venda Direta",
    [SaleOrigin.REFERENCE]: "Referência",
    [SaleOrigin.SOCIAL_MEDIA]: "Redes Sociais",
    [SaleOrigin.WEBSITE]: "Website",
    [SaleOrigin.OTHER]: "Outra",
  };
  return labels[origin] || origin;
};
