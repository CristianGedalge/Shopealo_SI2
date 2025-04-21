import React, { useState, useContext } from "react"; // 👈 faltaba useContext aquí

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser, FaBox, FaClipboardList, FaCog, FaSignOutAlt,
  FaChevronLeft, FaChevronRight, FaChevronDown, FaSun, FaMoon
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { setIsAuthenticated, setRoleId, setUser } = useContext(AuthContext);

  const toggleDropdown = (section) =>
    setOpenDropdown(openDropdown === section ? null : section);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  // ✅ Función logout
  const logout = () => {
    localStorage.removeItem("access");
    setIsAuthenticated(false);
    setRoleId(null);
    setUser({});
    navigate("/login");
  };

  return (
    <aside className={`h-full bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-md flex flex-col transition-all duration-300 ${isOpen ? "w-72" : "w-20"}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
        <h1 className="font-bold text-indigo-600 dark:text-white">{isOpen ? "Shoppit Admin" : "🛒"}</h1>
        <button onClick={toggleSidebar}>{isOpen ? <FaChevronLeft /> : <FaChevronRight />}</button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin">
        {/* USUARIO */}
        <div>
          <button
            onClick={() => toggleDropdown("usuario")}
            className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <span className="flex gap-2 items-center text-sm"><FaUser /> {isOpen && "Usuario"}</span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "usuario" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/bitacora" className={`${isActive("/admin/bitacora") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Bitácora</Link>
              <Link to="/admin/usuarios" className={`${isActive("/admin/usuarios") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Lista de Usuarios</Link>
              <Link to="/admin/registrar-empleado" className={`${isActive("/admin/registrar-empleado") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Empleado</Link>
            </div>
          )}
        </div>

        {/* INVENTARIO */}
        <div>
          <button onClick={() => toggleDropdown("producto")} className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded dark:bg-gray-700 dark:hover:bg-gray-600">
            <span className="flex gap-2 items-center text-sm"><FaBox /> {isOpen && "Inventario"}</span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "producto" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/registrar-producto" className={`${isActive("/admin/registrar-producto") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Producto</Link>
              <Link to="/admin/registrar-categoria" className={`${isActive("/admin/registrar-categoria") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Categoria</Link>
              <Link to="/admin/listar-productos" className={`${isActive("/admin/registrar-categoria") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Listar Prodcutos</Link>
              <Link to="/admin/listar-categorias" className={`${isActive("/admin/registrar-categoria") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Listar categorias</Link>

            </div>
          )}
        </div>

        {/* VENTAS */}
        <div>
          <button onClick={() => toggleDropdown("ventas")} className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded dark:bg-gray-700 dark:hover:bg-gray-600">
            <span className="flex gap-2 items-center text-sm"><FaClipboardList /> {isOpen && "Ventas"}</span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "ventas" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/ventas-vendidas" className={`${isActive("/admin/ventas-vendidas") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Ventas Vendidas</Link>
            </div>
          )}
        </div>

        {/* CONFIGURACIÓN */}
        <Link to="/admin/configuracion" className="block px-4 py-2 mt-2 hover:text-indigo-600 dark:text-white">
          <FaCog className="inline mr-2" /> {isOpen && "Configuración"}
        </Link>

        {/* ✅ SALIR */}
        <button
          onClick={logout}
          className="block px-4 py-2 w-full text-left hover:text-red-500 dark:text-white"
        >
          <FaSignOutAlt className="inline mr-2" /> {isOpen && "Salir"}
        </button>

        {/* DARK MODE */}
        <div className="mt-6 flex items-center gap-2 px-4">
          {isOpen && <span className="text-sm">Dark mode</span>}
          <button onClick={() => setDarkMode(!darkMode)} className={`ml-auto px-3 py-1 rounded-full ${darkMode ? "bg-yellow-500" : "bg-gray-300"}`}>
            {darkMode ? <FaSun className="text-white" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
