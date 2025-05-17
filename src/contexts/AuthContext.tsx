
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "../types";
import { mockUsers } from "../utils/mockData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkPermission: (allowedRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    // In a real application, this would be an API call
    // For this demo, we'll just check against mock data
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching email
      const foundUser = mockUsers.find(user => user.email === email);
      
      // For demo purposes, any password works
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast({
          title: "Login successful!",
          description: `Welcome back, ${foundUser.name}!`,
        });
        navigate("/dashboard");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const checkPermission = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
