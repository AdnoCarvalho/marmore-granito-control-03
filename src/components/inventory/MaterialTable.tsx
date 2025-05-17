
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Material } from "@/types";
import { translateMaterialType } from "./MaterialDetails";

interface MaterialTableProps {
  materials: Material[];
  onShowDetails: (material: Material) => void;
}

const MaterialTable = ({ materials, onShowDetails }: MaterialTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>
              <div className="flex items-center">
                Tipo
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Número Serial</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {materials.length > 0 ? (
            materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">{material.id}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      material.type === "marble"
                        ? "border-blue-500 text-blue-500"
                        : material.type === "granite"
                        ? "border-industrial-700 text-industrial-700"
                        : "border-violet-500 text-violet-500"
                    }
                  >
                    {translateMaterialType(material.type)}
                  </Badge>
                </TableCell>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.serialNumber}</TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>{material.location}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShowDetails(material)}
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                Nenhum material encontrado. Tente ajustar os filtros.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaterialTable;
