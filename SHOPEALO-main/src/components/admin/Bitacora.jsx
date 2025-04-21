import React, { useEffect, useState } from "react";
import { getBitacora } from "../../api/auth";

export const Bitacora = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBitacora();
        setRegistros(res.data);
      } catch (error) {
        console.error("Error al cargar bitácora:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-x-auto">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Registros de acciones en el Sistema
          </h2>
        </div>

        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Correo</th>
              <th className="px-4 py-2 text-left">Dirección IP</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Hora</th>
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {registros.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No se encontraron registros de bitácora.
                </td>
              </tr>
            ) : (
              registros.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.nombre}</td>
                  <td className="px-4 py-2">{item.correo}</td>
                  <td className="px-4 py-2">{item.ip}</td>
                  <td className="px-4 py-2">{item.fecha}</td>
                  <td className="px-4 py-2">{item.hora}</td>
                  <td className="px-4 py-2">{item.accion}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
