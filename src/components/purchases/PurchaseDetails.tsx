
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Purchase, PurchaseStatus } from "@/types/purchase";
import { MaterialType } from "@/types";

interface PurchaseDetailsProps {
  purchase: Purchase;
  onClose: () => void;
}

const PurchaseDetails = ({ purchase, onClose }: PurchaseDetailsProps) => {
  const renderStatus = (status: PurchaseStatus) => {
    switch (status) {
      case PurchaseStatus.RECEIVED:
        return <Badge className="bg-green-600">Recebido</Badge>;
      case PurchaseStatus.PENDING:
        return <Badge className="bg-amber-500">Aguardando Entrega</Badge>;
      case PurchaseStatus.CANCELLED:
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return null;
    }
  };

  const getMaterialTypeLabel = (type: MaterialType) => {
    switch (type) {
      case MaterialType.MARBLE:
        return "Mármore";
      case MaterialType.GRANITE:
        return "Granito";
      case MaterialType.QUARTZITE:
        return "Quartzito";
      default:
        return "Desconhecido";
    }
  };

  const dimensions = purchase.dimensions;
  const areaSqM = dimensions.width * dimensions.height;
  const volumeCubic = areaSqM * dimensions.thickness;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Detalhes da Compra</DialogTitle>
        <DialogDescription>
          Informações detalhadas sobre a compra de material.
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{purchase.materialName}</h3>
            <p className="text-muted-foreground">{getMaterialTypeLabel(purchase.materialType)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <div className="mt-1">{renderStatus(purchase.status)}</div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Compra</p>
              <p>{format(new Date(purchase.purchaseDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Fornecedor</p>
            <p>{purchase.supplierName}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Tipo</p>
            <p>{purchase.subtype === "slab" ? "Chapa" : "Bloco"}</p>
          </div>

          {purchase.serialNumber && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número de Série</p>
              <p>{purchase.serialNumber}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quantidade</p>
              <p>{purchase.quantity} unidades</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor por m²</p>
              <p>R$ {purchase.pricePerSquareMeter.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Dimensões</p>
            <p>{dimensions.width.toFixed(2)}m × {dimensions.height.toFixed(2)}m × {dimensions.thickness * 1000}mm</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Área Total</p>
              <p>{(areaSqM * purchase.quantity).toFixed(2)} m²</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Volume Total</p>
              <p>{(volumeCubic * purchase.quantity).toFixed(3)} m³</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
            <p className="text-xl font-bold">R$ {purchase.totalPrice.toLocaleString('pt-BR')}</p>
          </div>

          {purchase.notes && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">Observações</p>
              <p className="text-sm">{purchase.notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-muted rounded-md">
        <h4 className="font-medium">Impactos no Sistema</h4>
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          <div>
            <p className="text-muted-foreground">Estoque</p>
            <p>+ {purchase.quantity} unidades de {purchase.materialName}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Financeiro</p>
            <p>- R$ {purchase.totalPrice.toLocaleString('pt-BR')} (despesa registrada)</p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button onClick={onClose}>Fechar</Button>
      </DialogFooter>
    </>
  );
};

export default PurchaseDetails;
