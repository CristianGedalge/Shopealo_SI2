// src/components/admin/ListaProductos.jsx
import { useEffect, useState } from "react";
import { getProductos } from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(null);

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (error) {
      toast.error("Error al cargar productos");
      console.log(error)
    }
  };

  /* const handleEliminar = async (id) => {
    try {
      await eliminarProducto(id);
      toast.success("Producto eliminado correctamente");
      cargarProductos();
      setConfirmarEliminacion(null);
    } catch (error) {
      toast.error("Error al eliminar producto");
      console.log(error)
    }
  }; */

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Imagen</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productos.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{prod.id}</td>
                <td className="px-4 py-2">{prod.nombre}</td>
                <td className="px-4 py-2">{prod.precio} Bs</td>
                <td className="px-4 py-2">
                  <img src={prod.dir_img} alt="producto" className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => alert("Aún no implementado")}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={() => setConfirmarEliminacion(prod.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Confirmación */}
        {confirmarEliminacion && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p className="mb-4 text-lg font-semibold">¿Estás seguro que deseas eliminar este producto?</p>
              <div className="flex justify-center gap-4">
                <button
                  /* onClick={() => handleEliminar(confirmarEliminacion)} */
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setConfirmarEliminacion(null)}
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
