// src/components/admin/ListaCategorias.jsx
import { useEffect, useState } from "react";
import { getCategorias } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LsitarCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null);

  const cargarCategorias = async () => {
    try {
      const res = await getCategorias();
      setCategorias(res.data);
    } catch (error) {
        console.log(error)
      toast.error("Error al cargar categorías");
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Lista de Categorías</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{cat.id}</td>
                <td className="px-4 py-2">{cat.nombre}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => alert("Actualizar no implementado")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => setConfirmarEliminar(cat.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal eliminar */}
        {confirmarEliminar && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="mb-4 text-lg font-semibold">¿Eliminar esta categoría?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    toast.warn("Función eliminar aún no implementada");
                    setConfirmarEliminar(null);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setConfirmarEliminar(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
