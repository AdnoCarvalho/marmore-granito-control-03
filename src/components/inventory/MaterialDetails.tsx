
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockInventory } from "@/utils/mockData";
import { Material, UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface MaterialDetailsProps {
  material: Material;
  onClose: () => void;
}

export const translateMaterialType = (type: string) => {
  switch (type) {
    case "marble":
      return "Mármore";
    case "granite":
      return "Granito";
    case "quartzite":
      return "Quartzito";
    default:
      return type;
  }
};

const MaterialDetails = ({ material, onClose }: MaterialDetailsProps) => {
  const { checkPermission } = useAuth();
  const canAddMaterial = checkPermission([UserRole.MANAGER, UserRole.ADMIN]);
  
  // Obter movimentações de inventário para um material
  const getMaterialInventory = (materialId: string) => {
    return mockInventory.filter(item => item.materialId === materialId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Detalhes</h3>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Tipo:</span>
              <span className="col-span-2">{translateMaterialType(material.type)}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Nome:</span>
              <span className="col-span-2">{material.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Serial:</span>
              <span className="col-span-2">{material.serialNumber}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Localização:</span>
              <span className="col-span-2">{material.location}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Dimensões:</span>
              <span className="col-span-2">
                {material.dimensions.width}cm x {material.dimensions.height}cm x {material.dimensions.thickness}cm
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Quantidade:</span>
              <span className="col-span-2">{material.quantity}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Data de Compra:</span>
              <span className="col-span-2">
                {format(material.purchaseDate, "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Preço de Compra:</span>
              <span className="col-span-2">
                R$ {material.purchasePrice.toLocaleString()}
              </span>
            </div>
            {material.pricePerSquareMeter && (
              <div className="grid grid-cols-3 gap-1">
                <span className="font-medium">Preço por m²:</span>
                <span className="col-span-2">
                  R$ {material.pricePerSquareMeter.toLocaleString()}
                </span>
              </div>
            )}
            <div className="grid grid-cols-3 gap-1">
              <span className="font-medium">Fornecedor:</span>
              <span className="col-span-2">{material.supplier}</span>
            </div>
            {material.notes && (
              <div className="grid grid-cols-3 gap-1">
                <span className="font-medium">Observações:</span>
                <span className="col-span-2">{material.notes}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Movimentações de Estoque</h3>
          <div className="max-h-64 overflow-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Qtd</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getMaterialInventory(material.id).map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      {movement.type === "entry" ? (
                        <div className="flex items-center text-green-600">
                          <LogIn className="mr-1 h-4 w-4" />
                          Entrada
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <LogOut className="mr-1 h-4 w-4" />
                          Saída
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{movement.quantity}</TableCell>
                    <TableCell>
                      {format(movement.date, "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                  </TableRow>
                ))}
                {getMaterialInventory(material.id).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-2">
                      Nenhuma movimentação registrada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
        {canAddMaterial && (
          <>
            <Button variant="outline">
              <LogIn className="mr-2 h-4 w-4" />
              Registrar Entrada
            </Button>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Registrar Saída
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MaterialDetails;
