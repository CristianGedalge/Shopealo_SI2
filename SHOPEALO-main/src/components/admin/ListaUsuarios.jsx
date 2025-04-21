import React, { useEffect, useState } from "react";
import { getUsuarios } from "../../api/auth";
import { ConfirmarEliminacionDialog } from "./ConfirmarEliminacionDialog";
import { EditarUsuarioDialog } from "./EditarUsuarioDialog";

export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [rolFiltro, setRolFiltro] = useState("TODOS");
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await getUsuarios();
    setUsuarios(res.data);
  };

  const usuariosFiltrados = usuarios.filter(
    (u) => rolFiltro === "TODOS" || u.rol === rolFiltro
  );

  return (
    <div className="w-full h-full px-4 py-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">👥 Lista de Usuarios</h2>

        {/* FILTRO */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 dark:text-gray-300 mr-2">Filtrar por rol:</label>
          <select
            className="border px-2 py-1 rounded"
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
          >
            <option value="TODOS">Todos</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="EMPLEADO">Empleado</option>
            <option value="CLIENTE">Cliente</option>
          </select>
        </div>

        <div className="overflow-x-auto max-h-[75vh]">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-indigo-600 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Correo</th>
                <th className="px-4 py-3 font-semibold">Teléfono</th>
                <th className="px-4 py-3 font-semibold">Rol</th>
                <th className="px-4 py-3 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
              {usuariosFiltrados.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{user.nombre}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.telefono}</td>
                  <td className="px-4 py-2">{user.rol}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => setUsuarioAEditar(user)}
                      className="px-2 py-1 bg-yellow-400 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setUsuarioAEliminar(user)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALES */}
      {usuarioAEliminar && (
        <ConfirmarEliminacionDialog
          usuario={usuarioAEliminar}
          onClose={() => setUsuarioAEliminar(null)}
          onConfirm={() => {
            // Aquí debes llamar al backend para eliminarlo
            setUsuarios(usuarios.filter((u) => u.id !== usuarioAEliminar.id));
            setUsuarioAEliminar(null);
          }}
        />
      )}

      {usuarioAEditar && (
        <EditarUsuarioDialog
          usuario={usuarioAEditar}
          onClose={() => setUsuarioAEditar(null)}
          onSave={(nuevoUsuario) => {
            const nuevosUsuarios = usuarios.map((u) =>
              u.id === nuevoUsuario.id ? nuevoUsuario : u
            );
            setUsuarios(nuevosUsuarios);
            setUsuarioAEditar(null);
          }}
        />
      )}
    </div>
  );
};