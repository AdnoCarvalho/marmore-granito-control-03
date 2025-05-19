
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, AlertTriangle, Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockMaterials } from "@/utils/mockData";
import { 
  MaterialType, 
  NCMCode, 
  ProcessingLevel, 
  Material 
} from "@/types";
import NCMHelpTooltip from "@/components/fiscal/NCMHelpTooltip";
import { ncmTaxData } from "@/utils/ncmUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell
} from "recharts";

// Adicionando propriedades de NCM aos materiais mockados
const materials = mockMaterials.map(material => ({
  ...material,
  ncmCode: material.type === MaterialType.MARBLE 
    ? NCMCode.MARBLE_PROCESSED
    : NCMCode.GRANITE_PROCESSED,
  processingLevel: ProcessingLevel.POLISHED
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FiscalNCM = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNCM, setSelectedNCM] = useState<string>("");

  // Filtrar materiais com base na pesquisa e NCM selecionado
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.ncmCode.includes(searchQuery);
    
    const matchesNCM = selectedNCM ? material.ncmCode === selectedNCM : true;
    
    return matchesSearch && matchesNCM;
  });

  // Agrupar materiais por código NCM para o relatório
  const materialsByNCM = materials.reduce((acc, material) => {
    if (!acc[material.ncmCode]) {
      acc[material.ncmCode] = {
        ncmCode: material.ncmCode,
        count: 0,
        totalValue: 0,
        description: ncmTaxData[material.ncmCode as NCMCode]?.description || "Desconhecido"
      };
    }
    
    const area = material.dimensions.width * material.dimensions.height;
    const value = material.pricePerSquareMeter 
      ? area * material.pricePerSquareMeter * material.quantity 
      : material.purchasePrice * material.quantity;
    
    acc[material.ncmCode].count += material.quantity;
    acc[material.ncmCode].totalValue += value;
    
    return acc;
  }, {} as Record<string, {ncmCode: string, count: number, totalValue: number, description: string}>);

  // Transformar em array para gráficos
  const ncmChartData = Object.values(materialsByNCM);
  
  // Dados para o gráfico de pizza
  const pieChartData = ncmChartData.map(item => ({
    name: item.description,
    value: item.totalValue
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 mb-2 font-heading">
              Classificação Fiscal (NCM)
            </h1>
            <p className="text-slate-500">
              Gerencie a classificação fiscal dos materiais segundo a NCM (Nomenclatura Comum do Mercosul).
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <NCMHelpTooltip />
            <Button className="bg-green-600 hover:bg-green-700">
              <FileText className="mr-2 h-4 w-4" />
              Exportar Relatório
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="overflow-hidden">
            <div className="h-2 bg-blue-500" />
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produtos Catalogados</p>
                <h3 className="text-2xl font-bold mt-1">
                  {materials.length}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Com classificação NCM
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-2 bg-green-500" />
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Códigos NCM em Uso</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Object.keys(materialsByNCM).length}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Classificações distintas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden md:col-span-2">
            <div className="h-2 bg-orange-500" />
            <CardContent className="p-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">NCM Mais Utilizado</p>
                <h3 className="text-xl font-bold mt-1">
                  {ncmChartData.length > 0 ? ncmChartData.sort((a, b) => b.count - a.count)[0].ncmCode : "N/A"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {ncmChartData.length > 0 ? ncmChartData.sort((a, b) => b.count - a.count)[0].description : ""}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="produtos" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="produtos">Produtos por NCM</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios Fiscais</TabsTrigger>
            <TabsTrigger value="alertas">Alertas e Inconsistências</TabsTrigger>
          </TabsList>
          
          <TabsContent value="produtos" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Produtos Classificados por NCM</CardTitle>
                <CardDescription>
                  Lista completa de materiais com suas respectivas classificações fiscais.
                </CardDescription>
                
                <div className="flex flex-col md:flex-row gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome ou NCM..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    onValueChange={(value) => setSelectedNCM(value)}
                    value={selectedNCM}
                  >
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filtrar por NCM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os NCMs</SelectItem>
                      {Object.values(NCMCode).map((code) => (
                        <SelectItem key={code} value={code}>
                          {code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="border-t">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Material</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Beneficiamento</TableHead>
                        <TableHead>Código NCM</TableHead>
                        <TableHead>Descrição NCM</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMaterials.length > 0 ? (
                        filteredMaterials.map((material) => {
                          const ncmInfo = ncmTaxData[material.ncmCode as NCMCode];
                          const area = material.dimensions.width * material.dimensions.height;
                          const value = material.pricePerSquareMeter 
                            ? area * material.pricePerSquareMeter * material.quantity 
                            : material.purchasePrice * material.quantity;
                          
                          return (
                            <TableRow key={material.id}>
                              <TableCell className="font-medium">{material.name}</TableCell>
                              <TableCell>
                                {material.type === MaterialType.MARBLE 
                                  ? "Mármore" 
                                  : material.type === MaterialType.GRANITE 
                                  ? "Granito" 
                                  : "Quartzito"}
                              </TableCell>
                              <TableCell>
                                {material.processingLevel === ProcessingLevel.RAW 
                                  ? "Bruto" 
                                  : material.processingLevel === ProcessingLevel.CUT 
                                  ? "Cortado" 
                                  : material.processingLevel === ProcessingLevel.POLISHED 
                                  ? "Polido" 
                                  : "Acabado"}
                              </TableCell>
                              <TableCell>{material.ncmCode}</TableCell>
                              <TableCell>{ncmInfo?.description || "Desconhecido"}</TableCell>
                              <TableCell className="text-right">
                                R$ {value.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            Nenhum material encontrado com os filtros aplicados.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relatorios" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Valor Total por NCM</CardTitle>
                  <CardDescription>
                    Distribuição do valor do estoque por código NCM
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="99%" height="100%">
                      <BarChart data={ncmChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ncmCode" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`} 
                          labelFormatter={(label) => `NCM: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="totalValue" fill="#8884d8" name="Valor Total" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por NCM</CardTitle>
                  <CardDescription>
                    Distribuição percentual do valor por classificação fiscal
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="99%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}`}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Resumo Tributário por NCM</CardTitle>
                  <CardDescription>
                    Alíquotas de tributos para cada NCM utilizado no estoque
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border-t">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Código NCM</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead className="text-center">ICMS</TableHead>
                          <TableHead className="text-center">IPI</TableHead>
                          <TableHead className="text-center">PIS</TableHead>
                          <TableHead className="text-center">COFINS</TableHead>
                          <TableHead className="text-right">Valor em Estoque</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ncmChartData.map((item) => {
                          const ncmInfo = ncmTaxData[item.ncmCode as NCMCode];
                          
                          return (
                            <TableRow key={item.ncmCode}>
                              <TableCell className="font-medium">{item.ncmCode}</TableCell>
                              <TableCell>{item.description}</TableCell>
                              <TableCell className="text-center">{ncmInfo?.icms || 0}%</TableCell>
                              <TableCell className="text-center">{ncmInfo?.ipi || 0}%</TableCell>
                              <TableCell className="text-center">{ncmInfo?.pis || 0}%</TableCell>
                              <TableCell className="text-center">{ncmInfo?.cofins || 0}%</TableCell>
                              <TableCell className="text-right">
                                R$ {item.totalValue.toFixed(2)}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alertas" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Inconsistências e Alertas
                </CardTitle>
                <CardDescription>
                  Possíveis inconsistências na classificação fiscal dos produtos
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                  <h3 className="text-sm font-medium text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    Verificações de Classificação
                  </h3>
                  
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Todos os produtos possuem classificação NCM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span>Não foram encontradas inconsistências entre tipo de material e NCM</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mt-0.5">
                        <span className="text-xs">!</span>
                      </div>
                      <span>
                        Verificação de tabela NCM: Última atualização em 15/01/2023. 
                        Recomenda-se verificar se há atualizações na tabela NCM da Receita Federal.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Ações Recomendadas:</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Atualizar Tabela NCM
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <FileText className="mr-2 h-4 w-4" />
                      Verificar Inconsistências
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Política de Atualização NCM</CardTitle>
                <CardDescription>
                  Configure as notificações e política de atualização da tabela NCM
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Última Verificação de Atualização:</h3>
                    <p className="text-sm text-slate-500">15/01/2023 (150 dias atrás)</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Configuração de Alertas:</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Alertar sobre mudanças na tabela NCM</span>
                        <Button variant="ghost" size="sm">Configurar</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Verificação automática mensal</span>
                        <Button variant="ghost" size="sm">Configurar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FiscalNCM;
