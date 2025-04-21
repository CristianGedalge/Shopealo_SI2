// src/user/UserInfo.jsx
import React from "react";
import user from "../assets/user.png";

export const UserInfo = ({ userinfo }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Imagen y perfil */}
      <div className="w-full md:w-1/3 text-center">
        <img
          src={user}
          alt="User Profile"
          className="w-32 h-32 mx-auto rounded-full mb-4"
        />
        <h4 className="text-lg font-semibold">
          {userinfo?.nombre || "Cargando..."}
        </h4>

        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Edit Profile
        </button>
      </div>

      {/* Detalles de cuenta */}
      <div className="w-full md:w-2/3">
        <div className="bg-white shadow rounded-lg">
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-t-lg">
            <h5 className="text-lg font-semibold">Account Overview</h5>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Nombre :</strong> {userinfo.nombre}
                </p>
                <p>
                  <strong>Correo Electronico:</strong> {userinfo.email}
                </p>
                <p>
                  <strong> Telefono :</strong> {userinfo.telefono || "No definido"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Dirección:</strong> {userinfo.direccion || "No definida"}
                </p>
                <p>
                  <strong>Rol:</strong> {userinfo.rol}
                </p>
                <p>
                  <strong>Miembro desde:</strong> {userinfo.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
