from .views import login,registrar, get_usuario_info,hacer_algo,get_usuarios,eliminar_usuario,get_bitacora,get_rol,get_permisos_por_rol,actualizar_estado_permiso
from django.urls import path, include

urlpatterns = [
    path('registro/', registrar, name='registro_usuario'),
    path('login/', login, name='login'),
    path('user/info/',get_usuario_info),
    path('algo/',hacer_algo),
    path('getUser/',get_usuarios),
    path('<int:id>/elimUser/',eliminar_usuario),
    path('getBitacora/',get_bitacora),
    path('rol/',get_rol),
    path('<int:rol_id>/rolP/',get_permisos_por_rol),
    path('actP/',actualizar_estado_permiso)



]