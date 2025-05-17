
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md px-4 md:px-0">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl font-bold mb-2">
              M&G
            </div>
          </div>
          <h1 className="text-2xl font-bold">Marble & Granite</h1>
          <p className="text-muted-foreground">Warehouse Management System</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
