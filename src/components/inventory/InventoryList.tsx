
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockMaterials, mockInventory } from "@/utils/mockData";
import {
  Filter,
  Plus,
  Search,
  ArrowUpDown,
  LogIn,
  LogOut,
} from "lucide-react";
import { Material, MaterialType, UserRole } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const InventoryList = () => {
  const { checkPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredType, setFilteredType] = useState<MaterialType | "all">("all");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "details">("add");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const canAddMaterial = checkPermission([UserRole.MANAGER, UserRole.ADMIN]);

  // Filtrar materiais baseado na busca e tipo
  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(search.toLowerCase()) ||
      material.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      material.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = filteredType === "all" || material.type === filteredType;
    
    return matchesSearch && matchesType;
  });

  // Obter movimentações de inventário para um material
  const getMaterialInventory = (materialId: string) => {
    return mockInventory.filter(item => item.materialId === materialId);
  };

  const handleShowDetails = (material: Material) => {
    setSelectedMaterial(material);
    setDialogType("details");
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setDialogType("add");
    setShowDialog(true);
  };

  // Traduzir o tipo de material
  const translateMaterialType = (type: MaterialType) => {
    return type === MaterialType.MARBLE ? "Mármore" : "Granito";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar materiais..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            <select 
              className="bg-transparent outline-none"
              value={filteredType}
              onChange={(e) => setFilteredType(e.target.value as MaterialType | "all")}
            >
              <option value="all">Todos os Tipos</option>
              <option value={MaterialType.MARBLE}>Mármore</option>
              <option value={MaterialType.GRANITE}>Granito</option>
            </select>
          </Button>
          {canAddMaterial && (
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Material
            </Button>
          )}
        </div>
      </div>

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
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">{material.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        material.type === MaterialType.MARBLE
                          ? "border-blue-500 text-blue-500"
                          : "border-industrial-700 text-industrial-700"
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
                      onClick={() => handleShowDetails(material)}
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

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "add" ? "Adicionar Novo Material" : "Detalhes do Material"}
            </DialogTitle>
          </DialogHeader>

          {dialogType === "add" ? (
            <div className="grid gap-4 py-4">
              <p className="text-muted-foreground text-sm italic">
                Este recurso está em desenvolvimento. A criação de materiais será implementada em breve.
              </p>
              {/* Campos do formulário seriam adicionados aqui em uma implementação real */}
            </div>
          ) : (
            selectedMaterial && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Detalhes</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Tipo:</span>
                        <span className="col-span-2">{translateMaterialType(selectedMaterial.type)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Nome:</span>
                        <span className="col-span-2">{selectedMaterial.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Serial:</span>
                        <span className="col-span-2">{selectedMaterial.serialNumber}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Localização:</span>
                        <span className="col-span-2">{selectedMaterial.location}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Dimensões:</span>
                        <span className="col-span-2">
                          {selectedMaterial.dimensions.width}cm x {selectedMaterial.dimensions.height}cm x {selectedMaterial.dimensions.thickness}cm
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Quantidade:</span>
                        <span className="col-span-2">{selectedMaterial.quantity}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Data de Compra:</span>
                        <span className="col-span-2">
                          {format(selectedMaterial.purchaseDate, "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Preço de Compra:</span>
                        <span className="col-span-2">
                          R$ {selectedMaterial.purchasePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Fornecedor:</span>
                        <span className="col-span-2">{selectedMaterial.supplier}</span>
                      </div>
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
                          {getMaterialInventory(selectedMaterial.id).map((movement) => (
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
                          {getMaterialInventory(selectedMaterial.id).length === 0 && (
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
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
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
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryList;
