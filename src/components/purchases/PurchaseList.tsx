
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText } from "lucide-react";

import PurchaseForm from "./PurchaseForm";
import PurchaseDetails from "./PurchaseDetails";
import { Purchase, PurchaseStatus, PurchaseFormValues } from "@/types/purchase";
import { mockPurchases, mockSuppliers } from "@/utils/mockPurchases";
import { MaterialType } from "@/types";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState<Purchase[]>(mockPurchases);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"new" | "details">("new");
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    search: "",
    materialType: "all",
    dateRange: "all",
    supplier: "all"
  });

  // Handler for creating a new purchase
  const handleNewPurchase = () => {
    setDialogMode("new");
    setShowDialog(true);
  };

  // Handler for viewing purchase details
  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setDialogMode("details");
    setShowDialog(true);
  };

  // Handler for form submission
  const handleSubmitPurchase = (data: PurchaseFormValues) => {
    // In a real app, this would be an API call
    const newPurchase: Purchase = {
      id: `pur-${Date.now()}`,
      supplierId: data.supplierId,
      supplierName: mockSuppliers.find(s => s.id === data.supplierId)?.name || "",
      materialType: data.materialType,
      materialName: data.materialName,
      subtype: data.subtype,
      serialNumber: data.serialNumber,
      quantity: data.quantity,
      dimensions: {
        width: data.width,
        height: data.height,
        thickness: data.thickness
      },
      pricePerSquareMeter: data.pricePerSquareMeter,
      totalPrice: data.width * data.height * data.quantity * data.pricePerSquareMeter,
      purchaseDate: data.purchaseDate,
      status: PurchaseStatus.PENDING,
      notes: data.notes
    };

    setPurchases([newPurchase, ...purchases]);
    setShowDialog(false);
  };

  // Filter purchases based on set filters
  const filteredPurchases = purchases.filter(purchase => {
    // Text search
    const searchMatch = 
      purchase.materialName.toLowerCase().includes(filters.search.toLowerCase()) ||
      purchase.supplierName.toLowerCase().includes(filters.search.toLowerCase()) ||
      (purchase.serialNumber?.toLowerCase().includes(filters.search.toLowerCase()) || false);
    
    // Material type filter
    const typeMatch = 
      filters.materialType === "all" || 
      purchase.materialType === filters.materialType;
    
    // Date range filter
    let dateMatch = true;
    const now = new Date();
    const purchaseDate = new Date(purchase.purchaseDate);
    
    if (filters.dateRange === "month") {
      dateMatch = 
        purchaseDate.getMonth() === now.getMonth() && 
        purchaseDate.getFullYear() === now.getFullYear();
    } else if (filters.dateRange === "quarter") {
      const purchaseQuarter = Math.floor(purchaseDate.getMonth() / 3);
      const currentQuarter = Math.floor(now.getMonth() / 3);
      dateMatch = 
        purchaseQuarter === currentQuarter && 
        purchaseDate.getFullYear() === now.getFullYear();
    } else if (filters.dateRange === "year") {
      dateMatch = purchaseDate.getFullYear() === now.getFullYear();
    }

    // Supplier filter
    const supplierMatch = 
      filters.supplier === "all" || 
      purchase.supplierId === filters.supplier;
    
    return searchMatch && typeMatch && dateMatch && supplierMatch;
  });

  const renderStatus = (status: PurchaseStatus) => {
    switch (status) {
      case PurchaseStatus.RECEIVED:
        return <Badge className="bg-green-600">Recebido</Badge>;
      case PurchaseStatus.PENDING:
        return <Badge className="bg-amber-500">Aguardando</Badge>;
      case PurchaseStatus.CANCELLED:
        return <Badge className="bg-red-500">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Controls and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <Input 
            placeholder="Buscar por material, fornecedor ou número de série" 
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 min-w-[300px]">
          <Select 
            value={filters.materialType} 
            onValueChange={(value) => setFilters({...filters, materialType: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de Material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value={MaterialType.MARBLE}>Mármore</SelectItem>
              <SelectItem value={MaterialType.GRANITE}>Granito</SelectItem>
              <SelectItem value={MaterialType.QUARTZITE}>Quartzito</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.dateRange} 
            onValueChange={(value) => setFilters({...filters, dateRange: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Períodos</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.supplier} 
            onValueChange={(value) => setFilters({...filters, supplier: value})}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Fornecedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Fornecedores</SelectItem>
              {mockSuppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button
          onClick={handleNewPurchase}
          className="bg-[#F9802D] hover:bg-[#E57220] text-white ml-auto"
        >
          + Nova Compra
        </Button>
      </div>

      {/* Purchase Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Subtipo</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell>{format(new Date(purchase.purchaseDate), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                  <TableCell>{purchase.supplierName}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{purchase.materialName}</span>
                      <span className="block text-xs text-muted-foreground">
                        {purchase.materialType === MaterialType.MARBLE 
                          ? "Mármore" 
                          : purchase.materialType === MaterialType.GRANITE 
                            ? "Granito" 
                            : "Quartzito"
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {purchase.subtype === "slab" ? "Chapa" : "Bloco"}
                  </TableCell>
                  <TableCell className="text-right">{purchase.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {purchase.totalPrice.toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    {renderStatus(purchase.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(purchase)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-10 w-10 mb-2 opacity-20" />
                    <h3 className="font-medium text-lg">Nenhuma compra encontrada</h3>
                    <p>Tente ajustar seus filtros ou cadastre uma nova compra.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for new purchase or details */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl">
          {dialogMode === "new" ? (
            <>
              <DialogHeader>
                <DialogTitle>Nova Compra</DialogTitle>
                <DialogDescription>
                  Registre uma nova compra de material para o estoque.
                </DialogDescription>
              </DialogHeader>
              <PurchaseForm 
                onSubmit={handleSubmitPurchase} 
                onCancel={() => setShowDialog(false)} 
              />
            </>
          ) : (
            selectedPurchase && <PurchaseDetails purchase={selectedPurchase} onClose={() => setShowDialog(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseList;
