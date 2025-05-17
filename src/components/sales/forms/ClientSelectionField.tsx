
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { SalesFormValues } from "./salesFormTypes";

// Mock data (would come from API/database in a real app)
const mockClients = [
  { id: "1", name: "Marmoraria Silva" },
  { id: "2", name: "Construtora Horizonte" },
  { id: "3", name: "Depósito Mármores & Cia" },
];

interface ClientSelectionFieldProps {
  control: Control<SalesFormValues>;
}

const ClientSelectionField: React.FC<ClientSelectionFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="clientId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cliente</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {mockClients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ClientSelectionField;
