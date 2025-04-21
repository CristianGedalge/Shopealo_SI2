import React, { useState } from "react";

export const EditarUsuarioDialog = ({ usuario, onClose, onSave }) => {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [email, setEmail] = useState(usuario.email);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [rol, setRol] = useState(usuario.rol);

  const handleSubmit = () => {
    onSave({ ...usuario, nombre, email, telefono, rol });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Editar Usuario</h3>

        <div className="space-y-3 mb-6">
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="EMPLEADO">Empleado</option>
            <option value="CLIENTE">Cliente</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded dark:bg-gray-600">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
