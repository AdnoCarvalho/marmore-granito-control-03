
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Box, TrendingUp, Package, BarChart3 } from "lucide-react";
import { mockMaterials } from "@/utils/mockData";
import { MaterialType, MaterialSubtype } from "@/types";

const InventoryDashboard = () => {
  // Calculate total inventory value
  const totalInventoryValue = mockMaterials.reduce((sum, material) => {
    const area = material.dimensions.width * material.dimensions.height;
    const value = material.pricePerSquareMeter ? 
      area * material.pricePerSquareMeter * material.quantity : 
      material.purchasePrice * material.quantity;
    return sum + value;
  }, 0);
  
  // Count total slabs and blocks
  const slabCount = mockMaterials.filter(m => m.subtype === MaterialSubtype.SLAB).reduce((sum, m) => sum + m.quantity, 0);
  const blockCount = mockMaterials.filter(m => m.subtype === MaterialSubtype.BLOCK).reduce((sum, m) => sum + m.quantity, 0);
  
  // Calculate most popular materials (simplified version - would come from inventory movements in a real app)
  const materialsByType = mockMaterials.reduce((acc, material) => {
    if (!acc[material.type]) {
      acc[material.type] = { count: 0, value: 0 };
    }
    acc[material.type].count += material.quantity;
    
    const area = material.dimensions.width * material.dimensions.height;
    const value = material.pricePerSquareMeter ? 
      area * material.pricePerSquareMeter * material.quantity : 
      material.purchasePrice * material.quantity;
    
    acc[material.type].value += value;
    return acc;
  }, {} as Record<string, { count: number, value: number }>);
  
  // Convert to array and sort by count
  const sortedMaterialTypes = Object.entries(materialsByType)
    .map(([type, data]) => ({ 
      type, 
      count: data.count,
      value: data.value,
      label: type === MaterialType.MARBLE ? 'Mármore' : 
             type === MaterialType.GRANITE ? 'Granito' : 
             type === MaterialType.QUARTZITE ? 'Quartzito' : type
    }))
    .sort((a, b) => b.count - a.count);
  
  // Get top material
  const topMaterial = sortedMaterialTypes[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Inventory Value */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-blue-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Valor Total do Estoque</p>
            <h3 className="text-2xl font-bold mt-1">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInventoryValue)}
            </h3>
          </div>
          <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      {/* Total Items Count */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-green-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Quantidade em Estoque</p>
            <h3 className="text-2xl font-bold mt-1">{slabCount + blockCount} Itens</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {slabCount} chapas, {blockCount} blocos
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
            <Package className="h-6 w-6 text-green-500" />
          </div>
        </CardContent>
      </Card>

      {/* Top Material */}
      <Card className="overflow-hidden md:col-span-2">
        <div className="h-2 bg-orange-500" />
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Material mais Estocado</p>
            <h3 className="text-xl font-bold mt-1">
              {topMaterial ? topMaterial.label : "Nenhum material em estoque"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {topMaterial ? `${topMaterial.count} unidades em estoque` : ""}
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <Box className="h-6 w-6 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryDashboard;
