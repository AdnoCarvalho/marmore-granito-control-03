
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

const InventoryList = () => {
  const { checkPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [filteredType, setFilteredType] = useState<MaterialType | "all">("all");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "details">("add");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const canAddMaterial = checkPermission([UserRole.MANAGER, UserRole.ADMIN]);

  // Filter materials based on search and type
  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(search.toLowerCase()) ||
      material.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      material.location.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = filteredType === "all" || material.type === filteredType;
    
    return matchesSearch && matchesType;
  });

  // Get inventory movements for a material
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
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
              <option value="all">All Types</option>
              <option value={MaterialType.MARBLE}>Marble</option>
              <option value={MaterialType.GRANITE}>Granite</option>
            </select>
          </Button>
          {canAddMaterial && (
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Material
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
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
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
                      {material.type === MaterialType.MARBLE ? "Marble" : "Granite"}
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
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No materials found. Try adjusting your filters.
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
              {dialogType === "add" ? "Add New Material" : "Material Details"}
            </DialogTitle>
          </DialogHeader>

          {dialogType === "add" ? (
            <div className="grid gap-4 py-4">
              <p className="text-muted-foreground text-sm italic">
                This is a demo version. Material creation is not implemented.
              </p>
              {/* Form fields would go here in a real implementation */}
            </div>
          ) : (
            selectedMaterial && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Type:</span>
                        <span className="col-span-2">{selectedMaterial.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Name:</span>
                        <span className="col-span-2">{selectedMaterial.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Serial:</span>
                        <span className="col-span-2">{selectedMaterial.serialNumber}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Location:</span>
                        <span className="col-span-2">{selectedMaterial.location}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Dimensions:</span>
                        <span className="col-span-2">
                          {selectedMaterial.dimensions.width}cm x {selectedMaterial.dimensions.height}cm x {selectedMaterial.dimensions.thickness}cm
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Quantity:</span>
                        <span className="col-span-2">{selectedMaterial.quantity}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Purchase Date:</span>
                        <span className="col-span-2">
                          {format(selectedMaterial.purchaseDate, "dd/MM/yyyy")}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Purchase Price:</span>
                        <span className="col-span-2">
                          R$ {selectedMaterial.purchasePrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Supplier:</span>
                        <span className="col-span-2">{selectedMaterial.supplier}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Inventory Movements</h3>
                    <div className="max-h-64 overflow-auto border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getMaterialInventory(selectedMaterial.id).map((movement) => (
                            <TableRow key={movement.id}>
                              <TableCell>
                                {movement.type === "entry" ? (
                                  <div className="flex items-center text-green-600">
                                    <LogIn className="mr-1 h-4 w-4" />
                                    Entry
                                  </div>
                                ) : (
                                  <div className="flex items-center text-red-600">
                                    <LogOut className="mr-1 h-4 w-4" />
                                    Exit
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>{movement.quantity}</TableCell>
                              <TableCell>
                                {format(movement.date, "dd/MM/yyyy")}
                              </TableCell>
                            </TableRow>
                          ))}
                          {getMaterialInventory(selectedMaterial.id).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center py-2">
                                No movements recorded
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
                    Close
                  </Button>
                  {canAddMaterial && (
                    <>
                      <Button variant="outline">
                        <LogIn className="mr-2 h-4 w-4" />
                        Register Entry
                      </Button>
                      <Button variant="outline">
                        <LogOut className="mr-2 h-4 w-4" />
                        Register Exit
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
