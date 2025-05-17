
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  Wallet, 
  LogOut, 
  User, 
  ChevronDown, 
  Menu, 
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent",
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
    )}
    onClick={onClick}
  >
    {icon}
    {label}
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout, checkPermission } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with permission control
  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/inventory",
      icon: <Layers className="h-5 w-5" />,
      label: "Inventory",
      roles: [UserRole.OPERATOR, UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/clients",
      icon: <Users className="h-5 w-5" />,
      label: "Clients",
      roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    {
      to: "/financial",
      icon: <Wallet className="h-5 w-5" />,
      label: "Financial",
      roles: [UserRole.ADMIN],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    checkPermission(item.roles)
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-4">
          <Link to="/dashboard" className="flex items-center font-semibold text-lg">
            <div className="mr-2 h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white">
              M&G
            </div>
            <span>Marble & Granite</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4 px-2">
          <div className="space-y-1">
            {filteredNavItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </div>
        </nav>
        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <div className="flex items-center flex-1">
                  <div className="relative mr-2 h-8 w-8 rounded-full bg-muted">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium leading-none">{user?.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                  </div>
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Link 
              to="/dashboard" 
              className="flex items-center font-semibold text-lg"
              onClick={closeMobileMenu}
            >
              <div className="mr-2 h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white">
                M&G
              </div>
              <span>Marble & Granite</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4 px-2">
            <div className="space-y-1">
              {filteredNavItems.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.to}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </nav>
          <Separator />
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start px-2" onClick={logout}>
              <LogOut className="mr-2 h-5 w-5" />
              Log out
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center border-b px-6">
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="relative h-8 w-8 rounded-full bg-muted">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="rounded-full"
                        />
                      ) : (
                        <User className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
