
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Clients from "./pages/Clients";
import Financial from "./pages/Financial";
import NotFound from "./pages/NotFound";
import { UserRole } from "./types";

const queryClient = new QueryClient();

// Protected route component
interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, checkPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !checkPermission(allowedRoles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{element}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={<Dashboard />}
            allowedRoles={[UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN]}
          />
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute
            element={<Inventory />}
            allowedRoles={[UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN]}
          />
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute
            element={<Clients />}
            allowedRoles={[UserRole.MANAGER, UserRole.ADMIN]}
          />
        }
      />
      <Route
        path="/financial"
        element={
          <ProtectedRoute
            element={<Financial />}
            allowedRoles={[UserRole.ADMIN]}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
