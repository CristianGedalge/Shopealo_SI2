import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isAuthenticated, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Sesión iniciada correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión");
    }
  };

  useEffect(() => {
    if (!isAuthenticated || role === null) return;
    if (role === "ADMINISTRADOR") navigate("/admin");
    else if (role === "CLIENTE") navigate("/profile");
    else if (role === "EMPLEADO") navigate("/empleado");
  }, [isAuthenticated, role]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      <input {...register("email", { required: true })} placeholder="Correo" className="w-full p-2 border mb-2" />
      {errors.email && <span className="text-red-500 text-sm">Correo requerido</span>}
      <input {...register("password", { required: true })} type="password" placeholder="Contraseña" className="w-full p-2 border mb-2" />
      {errors.password && <span className="text-red-500 text-sm">Contraseña requerida</span>}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Ingresar</button>
    </form>
  );
};
