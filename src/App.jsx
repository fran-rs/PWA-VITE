import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import BuscarOfertas from "./pages/BuscarOfertas";
import CrearOferta from "./pages/CrearOferta";
import Chat from "./pages/Chat";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import { Login } from "./pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRoute from "./components/PrivateRoute";
import { Registro } from "./pages/Registro";
import { HomePage } from "./pages/Home";


export default function App() {
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
        <Route path="/buscar" element={<BuscarOfertas />} />
        <Route path="/crear" element={<CrearOferta />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </MainLayout>
  );
}
