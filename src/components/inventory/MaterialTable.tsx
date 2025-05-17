
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
    <div className="border rounded-xl overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">ID</TableHead>
            <TableHead>
              <div className="flex items-center">
                Tipo
                <ArrowUpDown className="ml-2 h-4 w-4 transition-transform hover:scale-125" />
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
              <TableRow key={material.id} className="group transition-colors">
                <TableCell className="font-medium">{material.id}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      material.type === "marble"
                        ? "info"
                        : material.type === "granite"
                        ? "secondary"
                        : "success"
                    }
                    className="transition-all duration-300 group-hover:shadow-sm"
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
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
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
