from django.urls import path, include
from .views import probar_stripe_key,crear_pago

urlpatterns = [
    path('stripe/', probar_stripe_key),
    path('stripe/crear/', crear_pago,),
    # path('producto/',listar_productos),
    # path('producto/eliminar/',eliminar_producto),
    # path('producto/crear/'),
    # path('getBitacora/',get_bitacora),
    # path('rol/',get_rol),
    # path('<int:rol_id>/rolP/',get_permisos_por_rol),
    # path('actP/',actualizar_estado_permiso)



]