
import React from "react";
import MainLayout from "./MainLayout";
import { Card } from "@/components/ui/card";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <MainLayout>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-fade-in">
        <Card className="shadow-card border rounded-xl p-6 bg-white/80 backdrop-blur-sm">
          {children}
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardLayout;
