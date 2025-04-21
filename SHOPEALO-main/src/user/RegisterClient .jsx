// src/user/RegisterClient.jsx
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const RegisterClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // para limpiar formulario tras envío exitoso
  } = useForm();

  const { registerClient } = useContext(AuthContext); // 👈 desde contexto

  const onSubmit = async (data) => {
    try {
      await registerClient(data); // 👈 usamos la función del contexto
      toast.success("Cliente registrado correctamente");
      reset(); // limpia el formulario
    } catch (error) {
        console.error(error); // ahora sí se usa
        toast.error("Error al registrar cliente");
      }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Cliente</h2>
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

        <button className="w-full bg-indigo-600 text-white py-2 rounded">Registrar</button>
      </form>
    </div>
  );
};
