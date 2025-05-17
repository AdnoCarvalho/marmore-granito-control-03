
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  Wallet, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Bell, 
  ChevronDown,
  ShoppingCart,
  Package
} from "lucide-react";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  to: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive, onClick }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all ${
      isActive 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-slate-600 hover:bg-slate-100"
    }`}
    onClick={onClick}
  >
    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-slate-500"}`} />
    <span>{label}</span>
  </Link>
);

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const { user, logout, checkPermission } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar();

  // Itens de navegação com controle de permissão
  const navItems = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/inventory",
      icon: Layers,
      label: "Estoque",
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/clients",
      icon: Users,
      label: "Clientes",
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/sales",
      icon: ShoppingCart,
      label: "Vendas",
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/purchases",
      icon: Package,
      label: "Compras",
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/financial",
      icon: Wallet,
      label: "Financeiro",
      roles: [UserRole.ADMIN],
    },
  ];

  // Filtra itens de navegação baseado na função do usuário
  const filteredNavItems = navItems.filter(item => 
    checkPermission(item.roles)
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobile(false);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
        <div className="h-16 flex items-center border-b px-6">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
              PS
            </div>
            <span className="font-semibold text-lg text-slate-800">PoligiSystem</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-6 px-3">
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
        </div>
        
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">
                {user?.role === UserRole.ADMIN 
                  ? "Administrador" 
                  : user?.role === UserRole.MANAGER 
                  ? "Gerente" 
                  : "Operador"}
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="h-16 flex items-center border-b px-6">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2"
              onClick={closeMobileMenu}
            >
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                PS
              </div>
              <span className="font-semibold text-lg text-slate-800">PoligiSystem</span>
            </Link>
          </div>
          
          <div className="p-6">
            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                  onClick={closeMobileMenu}
                />
              ))}
            </nav>
          </div>
          
          <div className="border-t p-4 mt-auto">
            <div className="flex items-center gap-3 px-2 py-1.5">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.role === UserRole.ADMIN 
                    ? "Administrador" 
                    : user?.role === UserRole.MANAGER 
                    ? "Gerente" 
                    : "Operador"}
                </p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full mt-4 justify-start text-red-500" 
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        <header className="h-16 flex items-center border-b border-slate-200 bg-white shadow-sm px-6 gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-800 md:block hidden">
              PoligiSystem
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 md:hidden">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

const MainLayout = ({ children }: MainLayoutProps) => {
  // The key change is here - we need to wrap the children with SidebarProvider
  // before passing them to MainLayoutContent
  return (
    <SidebarProvider defaultOpen={false}>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
};

export default MainLayout;
