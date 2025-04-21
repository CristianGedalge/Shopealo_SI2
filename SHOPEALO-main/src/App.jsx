import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import AuthProvider from "./context/AuthContext";
import { ProtectdRoute } from "./components/ui/ProtectdRoute";

// Layouts
import { MainLayout } from "./layout/MainLayout";
import { AdminLayout } from "./layout/AdminLayout";

// Pages públicas
import { HomePage } from "./components/home/HomePage";
import { ProductPage } from "./components/product/productPage";
import { CartPage } from "./components/cart/CartPage";
import { LoginPage } from "./user/LoginPage";
import { RegisterClient } from "./user/RegisterClient ";
import { NotFoundPage } from "./components/ui/NotFoundPage";

// Protegidas
import { CheckoutPage } from "./components/checkout/CheckoutPage";
import { UserProfile } from "./user/UserProfile";

// Admin
import { Bitacora } from "./components/admin/Bitacora";
import { ListaUsuarios } from "./components/admin/ListaUsuarios";
import { RegistrarEmpleado } from "./components/admin/RegistrarEmpleado";
import { RegistrarProducto } from "./components/inventario/RegistrarProducto";
import { VentasVendidas } from "./components/admin/VentasVendidas";

// API
import api from "./api/axios";
import { RegistarCategoria } from "./components/inventario/RegistrarCategoria";
import { ListaProductos } from "./components/inventario/LsitarProductos";
import { LsitarCategoria } from "./components/inventario/LsitarCategoria";

function App() {
  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code");

  useEffect(() => {
    if (cart_code) {
      api
        .get(`get_cart_stat?cart_code=${cart_code}`)
        .then((res) => setNumberCartItems(res.data.num_of_items))
        .catch((err) => console.log(err.message));
    }
  }, [cart_code]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ADMIN PROTEGIDO */}
          <Route
            path="/admin"
            element={
              <ProtectdRoute role="ADMINISTRADOR">
                <AdminLayout />
              </ProtectdRoute>
            }
          >
            <Route index element={<h1 className="text-2xl">Bienvenido Administrador</h1>} />
            <Route path="bitacora" element={<Bitacora />} />
            <Route path="usuarios" element={<ListaUsuarios />} />
            <Route path="registrar-empleado" element={<RegistrarEmpleado />} />
            <Route path="registrar-producto" element={<RegistrarProducto />} />
            <Route path="registrar-categoria" element={<RegistarCategoria />} />
            <Route path="ventas-vendidas" element={<VentasVendidas />} />
            <Route path="listar-productos" element={<ListaProductos />} />
            <Route path="listar-categorias" element={<LsitarCategoria />} />
          </Route>

          {/* RUTAS PÚBLICAS Y CLIENTE */}
          <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
            <Route index element={<HomePage />} />
            <Route path="products/:slug" element={<ProductPage setNumberCartItems={setNumberCartItems} />} />
            <Route path="cart" element={<CartPage setNumberCartItems={setNumberCartItems} />} />
            <Route path="checkout" element={
              <ProtectdRoute role="CLIENTE">
                <CheckoutPage />
              </ProtectdRoute>
            } />
            <Route path="profile" element={
              <ProtectdRoute role="CLIENTE">
                <UserProfile />
              </ProtectdRoute>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterClient />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
