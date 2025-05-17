
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Bypass login e redireciona diretamente para o dashboard
  return <Navigate to="/dashboard" replace />;
};

export default Index;
