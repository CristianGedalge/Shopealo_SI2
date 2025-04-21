import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const NavBarLink = () => {
  const { isAuthenticated,setIsAuthenticated ,user} = useContext(AuthContext);
function logout(){
  localStorage.removeItem("access")
  setIsAuthenticated(false)

}
  return (
    <div className="w-full md:flex md:items-center md:justify-end">
      <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
        {isAuthenticated ? (
          <>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-800 hover:text-indigo-600 font-semibold transition"
                }
              >
                {`Bienvenido ${user.nombre}`}
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logout}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-800 hover:text-indigo-600 font-semibold transition"
                }
              >
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-800 hover:text-indigo-600 font-semibold transition"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-800 hover:text-indigo-600 font-semibold transition"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
