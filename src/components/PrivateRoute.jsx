import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mientras Firebase revisa la sesión
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no hay user → login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay user → render normal
  return children;
};

export default PrivateRoute;
