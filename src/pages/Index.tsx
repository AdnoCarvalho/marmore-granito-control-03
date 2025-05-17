
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Bypass login and redirect directly to dashboard
  return <Navigate to="/dashboard" replace />;
};

export default Index;
