// src/api/auth.js
import instance from "./axios";
// ---- ----------------------------------------------------PAQUETE USUARIO --------------------
// --- iniciar seccion 
export const loginRequest = (data) =>
    instance.post('login/', data, {
      headers: { "Content-Type": "application/json" },
    });
// ---- registrar cliente 
export const registerClientRequest = (data) =>
  instance.post("registro/", { ...data, rol: 2 } ); // ID de cliente = 2
// -- registrar empelado 
export const registerEmpleadoRequest = (data) =>
  instance.post("registro/", { ...data, rol: 3 });
// --- bitacora 
export const getBitacora = () =>
  instance.get("getBitacora");
// -- listar usuarios 
export const getUsuarios = () =>
  instance.get("getUser/");

//-----------------------------------------------------PAQUETE INVENTARIOO--------------------
// ------- crear categoria 

export const crearCategoria = (data) =>
  instance.post("categoria/crear/", data, {
    headers: { "Content-Type": "application/json" },
  });
// --- crear producto 

export const crearProducto = (data) =>
  instance.post("producto/crear/", data, {
    headers: { "Content-Type": "application/json" },
  });


//------ listar produtos 
export const getProductos = () => instance.get("producto/");
// -----listar categoria 

export const getCategorias = () => instance.get("categoria/");


// --ewliminE CATEGORIA  --- un no 
export const eliminarCategoria = (id) =>
  instance.delete(`categoria/eliminar/${id}/`);