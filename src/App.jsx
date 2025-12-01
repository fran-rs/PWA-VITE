import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import BuscarOfertas from "./pages/BuscarOfertas";
import CrearOferta from "./pages/CrearOferta";
import Chat from "./pages/Chat";
import Perfil from "./pages/Perfil";
import { Login } from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import { Registro } from "./pages/Registro";
import { HomePage } from "./pages/Home";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/buscar"
          element={
            <PrivateRoute>
              <BuscarOfertas />
            </PrivateRoute>
          }
        />

        <Route
          path="/crear"
          element={
            <PrivateRoute>
              <CrearOferta />
            </PrivateRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        {/* Si está logueado → redirigir al home */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/registro"
          element={user ? <Navigate to="/" replace /> : <Registro />}
        />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
}
