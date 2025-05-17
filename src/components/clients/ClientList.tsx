
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Plus, ExternalLink } from "lucide-react";
import { mockClients } from "@/utils/mockData";
import { Client, UserRole } from "@/types";

const ClientList = () => {
  const { checkPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"add" | "details">("add");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

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
    setDialogType("add");
    setShowDialog(true);
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
            placeholder="Search clients..."
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
          </DialogHeader>

          {dialogType === "add" ? (
            <div className="grid gap-4 py-4">
              <p className="text-muted-foreground text-sm italic">
                This is a demo version. Client creation is not implemented.
              </p>
              {/* Form fields would go here in a real implementation */}
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
