import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { crearProducto } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const RegistrarProducto = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [imagenPreview, setImagenPreview] = useState(null);

  const subirImagenACloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "reactproyecto");

    const res = await fetch("https://api.cloudinary.com/v1_1/dyqbimuzw/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Error al subir imagen");

    const data = await res.json();
    return data.secure_url; // URL pública
  };

  const onSubmit = async (data) => {
    try {
      let urlImg = "";
      if (data.imagen[0]) {
        urlImg = await subirImagenACloudinary(data.imagen[0]);
      }

      const productoData = {
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: parseFloat(data.precio),
        categoria: parseInt(data.categoria),
        estado: 1,
        dir_img: urlImg,
      };

      await crearProducto(productoData);
      toast.success("Producto registrado correctamente");
      reset();
      setImagenPreview(null);
      setTimeout(() => navigate("/admin/registrar-producto"), 1500);
    } catch (error) {
      toast.error("Error al registrar producto");
      console.error(error);
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrar Producto</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("nombre", { required: true })} placeholder="Nombre del producto" className="w-full p-2 border" />
        {errors.nombre && <p className="text-red-500 text-sm">Nombre requerido</p>}

        <textarea {...register("descripcion", { required: true })} placeholder="Descripción" className="w-full p-2 border" />
        {errors.descripcion && <p className="text-red-500 text-sm">Descripción requerida</p>}

        <input {...register("precio", { required: true })} type="number" step="0.01" placeholder="Precio" className="w-full p-2 border" />
        {errors.precio && <p className="text-red-500 text-sm">Precio requerido</p>}

        <input type="file" accept="image/*" {...register("imagen", { required: true })} onChange={handlePreview} className="w-full p-2 border" />
        {errors.imagen && <p className="text-red-500 text-sm">Imagen requerida</p>}
        {imagenPreview && <img src={imagenPreview} alt="Vista previa" className="w-32 mt-2 rounded" />}

        <input {...register("categoria", { required: true })} type="number" placeholder="ID categoría" className="w-full p-2 border" />
        {errors.categoria && <p className="text-red-500 text-sm">Categoría requerida</p>}

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Registrar</button>
      </form>
      <ToastContainer />
    </div>
  );
};
