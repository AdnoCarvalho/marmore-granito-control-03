
import { useState } from "react";
import { Link } from "react-router-dom";
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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus, ExternalLink } from "lucide-react";
import { mockClients } from "@/utils/mockData";
import { Client, UserRole } from "@/types";
import { toast } from "sonner";

const ClientList = () => {
  const { checkPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "details">("add");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newClientForm, setNewClientForm] = useState({
    companyName: "",
    cnpj: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const canAddClient = checkPermission([UserRole.ADMIN]);

  // Filter clients based on search
  const filteredClients = mockClients.filter(
    (client) =>
      client.companyName.toLowerCase().includes(search.toLowerCase()) ||
      client.cnpj.toLowerCase().includes(search.toLowerCase()) ||
      client.contactName.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleShowDetails = (client: Client) => {
    setSelectedClient(client);
    setDialogType("details");
    setShowDialog(true);
  };

  const handleAddNew = () => {
    setNewClientForm({
      companyName: "",
      cnpj: "",
      contactName: "",
      email: "",
      phone: "",
    });
    setDialogType("add");
    setShowDialog(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClient = () => {
    // In a real app this would be an API call
    // Here we're just showing a toast confirmation
    toast("Cliente adicionado", {
      description: `${newClientForm.companyName} foi adicionado com sucesso.`
    });
    setShowDialog(false);
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj; // Already formatted in mock data
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {canAddClient && (
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.companyName}</TableCell>
                  <TableCell>{formatCNPJ(client.cnpj)}</TableCell>
                  <TableCell>{client.contactName}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShowDetails(client)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link to={`/clients/${client.id}`}>
                          <ExternalLink className="mr-1 h-4 w-4" /> Ver Perfil
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No clients found. Try adjusting your search.
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
              {dialogType === "add" ? "Add New Client" : "Client Details"}
            </DialogTitle>
            {dialogType === "add" && (
              <DialogDescription>
                Preencha os dados para adicionar um novo cliente ao sistema.
              </DialogDescription>
            )}
          </DialogHeader>

          {dialogType === "add" ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">Nome da Empresa</label>
                  <Input 
                    id="companyName"
                    name="companyName"
                    value={newClientForm.companyName}
                    onChange={handleFormChange}
                    placeholder="Nome da Empresa" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cnpj" className="text-sm font-medium">CNPJ</label>
                  <Input 
                    id="cnpj"
                    name="cnpj"
                    value={newClientForm.cnpj}
                    onChange={handleFormChange}
                    placeholder="00.000.000/0000-00" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactName" className="text-sm font-medium">Nome do Contato</label>
                  <Input 
                    id="contactName"
                    name="contactName"
                    value={newClientForm.contactName}
                    onChange={handleFormChange}
                    placeholder="Nome completo" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={newClientForm.email}
                    onChange={handleFormChange}
                    placeholder="email@empresa.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={newClientForm.phone}
                    onChange={handleFormChange}
                    placeholder="(00) 00000-0000" 
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowDialog(false)}>Cancelar</Button>
                <Button onClick={handleAddClient}>Adicionar Cliente</Button>
              </DialogFooter>
            </div>
          ) : (
            selectedClient && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Company Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Company:</span>
                        <span className="col-span-2">{selectedClient.companyName}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">CNPJ:</span>
                        <span className="col-span-2">{selectedClient.cnpj}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Contact Name:</span>
                        <span className="col-span-2">{selectedClient.contactName}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Email:</span>
                        <span className="col-span-2">{selectedClient.email}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Phone:</span>
                        <span className="col-span-2">{selectedClient.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Street:</span>
                        <span className="col-span-2">{selectedClient.address.street}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Number:</span>
                        <span className="col-span-2">{selectedClient.address.number}</span>
                      </div>
                      {selectedClient.address.complement && (
                        <div className="grid grid-cols-3 gap-1">
                          <span className="font-medium">Complement:</span>
                          <span className="col-span-2">{selectedClient.address.complement}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">City:</span>
                        <span className="col-span-2">{selectedClient.address.city}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">State:</span>
                        <span className="col-span-2">{selectedClient.address.state}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Zip Code:</span>
                        <span className="col-span-2">{selectedClient.address.zipCode}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    asChild 
                    className="flex items-center"
                  >
                    <Link to={`/clients/${selectedClient.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" /> Ver Perfil Completo
                    </Link>
                  </Button>
                  
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientList;
