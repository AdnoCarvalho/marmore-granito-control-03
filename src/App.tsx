
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Clients from "./pages/Clients";
import ClientDetails from "./pages/ClientDetails";
import Financial from "./pages/Financial";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import PurchaseCreate from "./pages/PurchaseCreate"; 
import Appointments from "./pages/Appointments"; // New import
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/clients/:id" element={<ClientDetails />} />
      <Route path="/financial" element={<Financial />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/purchases" element={<Purchases />} />
      <Route path="/purchases/create" element={<PurchaseCreate />} />
      <Route path="/appointments" element={<Appointments />} /> {/* New route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Wrap components in a proper React component to ensure hooks work correctly
const App = () => {
  return (
    // Note how we changed the nesting order of providers to ensure proper context
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
