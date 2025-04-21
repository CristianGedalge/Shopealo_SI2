import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegistrarEmpleado = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { registerEmpleado } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerEmpleado(data);
      toast.success("Empleado registrado correctamente");
      reset();
      setTimeout(() => navigate("/admin/usuarios"), 1000);
    } catch (error) {
      toast.error("Error al registrar empleado");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Empleado</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("nombre", { required: true })}
            placeholder="Nombre"
            className="w-full p-2 border"
          />
          {errors.nombre && <p className="text-red-500 text-sm">Nombre requerido</p>}
        </div>

        <div>
          <input
            {...register("email", { required: true })}
            placeholder="Correo"
            type="email"
            className="w-full p-2 border"
          />
          {errors.email && <p className="text-red-500 text-sm">Correo requerido</p>}
        </div>

        <div>
          <input
            {...register("password", { required: true })}
            placeholder="Contraseña"
            type="password"
            className="w-full p-2 border"
          />
          {errors.password && <p className="text-red-500 text-sm">Contraseña requerida</p>}
        </div>

        <div>
          <input
            {...register("telefono", { required: true })}
            placeholder="Teléfono"
            className="w-full p-2 border"
          />
          {errors.telefono && <p className="text-red-500 text-sm">Teléfono requerido</p>}
        </div>

        <div>
          <input
            {...register("direccion", { required: true })}
            placeholder="Dirección"
            className="w-full p-2 border"
          />
          {errors.direccion && <p className="text-red-500 text-sm">Dirección requerida</p>}
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Registrar
        </button>
      </form>

      {/* ✅ Contenedor para que funcione toast */}
      <ToastContainer />
    </div>
  );
};
