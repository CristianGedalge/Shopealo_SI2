// ✅ src/components/admin/RegistrarCategoria.jsx
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { crearCategoria } from "../../api/auth"; // o "../../api/categoria"

export const RegistarCategoria = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await crearCategoria(data);
      toast.success("Categoría registrada correctamente");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar categoría");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Categoría</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("nombre", { required: true })}
            placeholder="Nombre de la categoría"
            className="w-full p-2 border"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm">El nombre es requerido</p>
          )}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
          Registrar
        </button>
      </form>

      {/* ✅ Toast container para mostrar notificaciones */}
      <ToastContainer />
    </div>
  );
};
