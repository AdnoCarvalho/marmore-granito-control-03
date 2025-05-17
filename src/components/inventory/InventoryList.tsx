import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { mockMaterials } from "@/utils/mockData";
import { Material } from "@/types";
import MaterialFilterBar from "./MaterialFilterBar";
import MaterialTable from "./MaterialTable";
import MaterialDetails from "./MaterialDetails";
import AddMaterialDialog from "./AddMaterialDialog";
import { useInventoryFilters } from "./useInventoryFilters";

const InventoryList = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "details">("add");
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  // Use our custom hook for filtering
  const {
    search,
    setSearch,
    filteredType,
    setFilteredType,
    filteredMaterials
  } = useInventoryFilters(mockMaterials);

  const handleShowDetails = (material: Material) => {
    setSelectedMaterial(material);
    setDialogType("details");
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setDialogType("add");
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="space-y-4">
      {/* Filter and Search Bar */}
      <MaterialFilterBar
        search={search}
        setSearch={setSearch}
        filteredType={filteredType}
        setFilteredType={setFilteredType}
        onAddNew={handleAddNew}
      />

      {/* Materials Table */}
      <MaterialTable
        materials={filteredMaterials}
        onShowDetails={handleShowDetails}
      />

      {/* Dialog for Adding/Viewing Material Details */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {dialogType === "add" ? (
          <AddMaterialDialog onClose={handleCloseDialog} />
        ) : (
          selectedMaterial && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detalhes do Material</DialogTitle>
              </DialogHeader>
              <MaterialDetails 
                material={selectedMaterial} 
                onClose={handleCloseDialog} 
              />
            </DialogContent>
          )
        )}
      </Dialog>
    </div>
  );
};

export default InventoryList;
