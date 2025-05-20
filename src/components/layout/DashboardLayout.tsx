
import React from "react";
import MainLayout from "./MainLayout";
import { Card } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardContent = ({ children }: DashboardLayoutProps) => {
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" || isMobile;
  
  return (
    <div 
      className={cn(
        "w-full animate-fade-in transition-all duration-300",
        isCollapsed 
          ? "p-2 sm:p-2 md:p-4 max-w-full" 
          : "p-3 md:p-6 lg:p-8 max-w-7xl mx-auto"
      )}
    >
      <Card 
        className={cn(
          "shadow-card border border-slate-700 bg-card backdrop-blur-sm",
          isCollapsed 
            ? "rounded-none sm:rounded-md md:rounded-xl p-2 sm:p-4 md:p-6" 
            : "rounded-xl p-4 sm:p-6"
        )}
      >
        {children}
      </Card>
    </div>
  );
};

// The main DashboardLayout component now separates the layout rendering
// from the sidebar hook usage to ensure proper context access
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <MainLayout>
      <DashboardContent>{children}</DashboardContent>
    </MainLayout>
  );
};

export default DashboardLayout;
