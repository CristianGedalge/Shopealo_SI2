from .views import listar_categorias,crear_categoria,listar_productos,actualizar_categoria, eliminar_producto,crear_producto,crear_inventario,listar_catalogo,detalle_producto
from django.urls import path, include

urlpatterns = [
    path('categoria/', listar_categorias, name='listar_categorias'),
    path('categoria/crear/', crear_categoria, name='crear_categoria'),
    path('categoria/<int:id>/actu/',actualizar_categoria),
    path('producto/',listar_productos),
    path('producto/<int:id>/eliminar/',eliminar_producto),
    path('producto/crear/',crear_producto),
    path('inventario/crear/', crear_inventario),
    path('catalogo/',listar_catalogo), # catalogo global  no por categoria
    path('producto/<int:id>/detalle/',detalle_producto),
    # path('<int:rol_id>/rolP/',get_permisos_por_rol),
    # path('actP/',actualizar_estado_permiso)



]