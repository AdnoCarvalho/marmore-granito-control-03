import React, { useState, useEffect } from "react";
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
  Package,
  Calendar
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
    className={`flex items-center gap-2 sm:gap-3 rounded-md px-2.5 sm:px-3 py-2 sm:py-2.5 text-sm transition-all break-words ${
      isActive 
        ? "bg-primary/20 text-primary font-medium" 
        : "text-slate-300 hover:bg-slate-700"
    }`}
    onClick={onClick}
  >
    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${isActive ? "text-primary" : "text-slate-400"}`} />
    <span className="truncate">{label}</span>
  </Link>
);

const MainLayoutContent = ({ children }: MainLayoutProps) => {
  const { user, logout, checkPermission } = useAuth();
  const location = useLocation();
  const { toggleSidebar, openMobile, setOpenMobile } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll position for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    {
      to: "/appointments",
      icon: Calendar,
      label: "Agenda",
      roles: [UserRole.MANAGER, UserRole.ADMIN],
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
    <div className="flex flex-col min-h-screen bg-background max-w-full overflow-hidden">
      {/* Header - fixed for better mobile experience */}
      <header 
        className={`sticky top-0 z-30 h-14 sm:h-16 flex items-center border-b border-slate-700 bg-slate-900 px-3 sm:px-6 transition-shadow duration-200 ${
          isScrolled ? 'shadow-md shadow-black/20' : 'shadow-sm shadow-black/10'
        }`}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-slate-300 hover:text-slate-100 hover:bg-slate-800" 
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-base sm:text-lg font-semibold text-slate-100 md:block hidden truncate">
            PoligiSystem
          </h1>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-100 hover:bg-slate-800">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-100 hover:bg-slate-800">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:hidden">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs">
              {user?.name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden max-w-full">
        {/* Sidebar Desktop */}
        <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-700 shadow-md shadow-black/20">
          <div className="h-16 flex items-center border-b border-slate-700 px-4 sm:px-6">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                PS
              </div>
              <span className="font-semibold text-base sm:text-lg text-slate-100 truncate">PoligiSystem</span>
            </Link>
          </div>
          
          <div className="flex-1 overflow-auto py-4 sm:py-6 px-2 sm:px-3">
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
          
          <div className="border-t border-slate-700 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3 px-2 py-1.5">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">
                  {user?.role === UserRole.ADMIN 
                    ? "Administrador" 
                    : user?.role === UserRole.MANAGER 
                    ? "Gerente" 
                    : "Operador"}
                </p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700 text-slate-100">
                  <DropdownMenuLabel className="text-slate-300">Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={logout} className="text-red-400 cursor-pointer hover:text-red-300 focus:text-red-300 hover:bg-slate-700 focus:bg-slate-700">
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
          <SheetContent side="left" className="w-[85%] max-w-72 p-0 bg-slate-900 border-r border-slate-700">
            <div className="h-14 sm:h-16 flex items-center border-b border-slate-700 px-4 sm:px-6">
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2"
                onClick={closeMobileMenu}
              >
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                  PS
                </div>
                <span className="font-semibold text-base sm:text-lg text-slate-100 truncate">PoligiSystem</span>
              </Link>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto">
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
            
            <div className="border-t border-slate-700 p-3 sm:p-4 mt-auto">
              <div className="flex items-center gap-2 sm:gap-3 px-2 py-1.5">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {user?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-400 truncate">
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
                className="w-full mt-3 sm:mt-4 justify-start text-red-400 hover:text-red-300 hover:bg-slate-800" 
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-auto w-full">
          <main className="flex-1 overflow-auto w-full">
            {children}
          </main>
        </div>
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
