import React from "react";

export const ConfirmarEliminacionDialog = ({ usuario, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-sm w-full">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">¿Estás seguro?</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          ¿Deseas eliminar al usuario <strong>{usuario.nombre}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
