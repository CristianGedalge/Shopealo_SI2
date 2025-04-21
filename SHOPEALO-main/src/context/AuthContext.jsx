import { createContext, useState, useEffect } from "react";
import { loginRequest, registerClientRequest,registerEmpleadoRequest } from "../api/auth";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);  // 👈 usamos string ("ADMINISTRADOR", etc.)
  const [user, setUser] = useState({});

  const login = async (data) => {
    const res = await loginRequest(data);
    const user = res.data.usuario;

    localStorage.setItem("access", res.data.token);
    localStorage.setItem("usuario", JSON.stringify(user));

    setIsAuthenticated(true);
    setUser(user);
    setRole(user.rol);  // 👈 guardamos el string del rol
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUser({});
    setRole(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    const storedUser = localStorage.getItem("usuario");
    if (token && storedUser) {
      try {
        const userParsed = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(userParsed);
        setRole(userParsed.rol);
      } catch (e) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        registerClient: registerClientRequest,
        registerEmpleado: registerEmpleadoRequest,
        isAuthenticated,
        user,
        role, // 👈 exportamos string del rol
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
