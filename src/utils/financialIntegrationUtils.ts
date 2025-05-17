
import { Sale } from "@/types";
import { TransactionType } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";

// Interface for the transaction data that will be created from a sale
interface SaleTransactionData {
  type: TransactionType;
  description: string;
  amount: number;
  date: Date;
  status: "pending" | "completed";
  category: string;
  clientId?: string;
  materialId?: string;
}

/**
 * Converts a sale to a financial transaction
 * @param sale The sale to convert
 * @param clientName Optional client name for better description
 * @param materialName Optional material name for better description
 * @returns Transaction data object
 */
export const convertSaleToTransaction = (
  sale: Sale, 
  clientName?: string,
  materialName?: string
): SaleTransactionData => {
  const formattedDate = format(new Date(sale.date), "dd/MM/yyyy");
  const status = sale.status === "paid" ? "completed" : "pending";
  
  // Create a description including available information
  let description = `Venda de material`;
  if (materialName) description = `Venda de ${materialName}`;
  if (clientName) description += ` para ${clientName}`;
  
  return {
    type: TransactionType.INCOME,
    description,
    amount: sale.totalValue,
    date: new Date(sale.date),
    status,
    category: "material-sale", // Using the same category as in our form
    clientId: sale.clientId,
    materialId: sale.materialId
  };
};

/**
 * Processes a new sale and records it as a financial transaction
 * This would typically send data to an API, but for now it just logs and shows a toast
 */
export const processSaleAsTransaction = async (
  sale: Sale,
  clientName?: string,
  materialName?: string
): Promise<boolean> => {
  try {
    const transaction = convertSaleToTransaction(sale, clientName, materialName);
    
    // Here we would normally send this to an API
    console.log("Registering financial transaction from sale:", transaction);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real scenario, you'd check the API response and return accordingly
    toast.success("Venda registrada como receita financeira");
    return true;
  } catch (error) {
    console.error("Error registering financial transaction:", error);
    toast.error("Erro ao registrar venda como receita");
    return false;
  }
};
