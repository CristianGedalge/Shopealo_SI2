from django.shortcuts import render

# Create your views here.
from src.usuarios.models import Categoria,Producto,Inventario
from .serializers import CategoriaSerializer,ProductoSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def listar_categorias(request):
    categorias = Categoria.objects.all().order_by('id')
    serializer = CategoriaSerializer(categorias, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def crear_categoria(request):
    serializer = CategoriaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'mensaje': 'Categoría creada correctamente', 'categoria': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def actualizar_categoria(request, id):
    try:
        categoria = Categoria.objects.get(id=id)
    except Categoria.DoesNotExist:
        return Response({'error': 'Categoría no encontrada'}, status=404)

    nuevo_nombre = request.data.get('nombre')
    if not nuevo_nombre:
        return Response({'error': 'El campo nombre es obligatorio'}, status=400)

    categoria.nombre = nuevo_nombre
    categoria.save()

    return Response({
        'mensaje': 'Categoría actualizada correctamente',
        'id': categoria.id,
        'nombre': categoria.nombre
    }, status=200)


@api_view(['GET'])
def listar_productos(request):
    productos = Producto.objects.filter(estado=1).order_by('id')
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def eliminar_producto(request, id):
    try:
        producto = Producto.objects.get(id=id)
        producto.estado = 0
        producto.save()
        return Response({'mensaje': 'Producto eliminado (estado = 0)'})
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)



@api_view(['POST'])
def crear_producto(request):
    serializer = ProductoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'mensaje': 'Producto creado con éxito', 'producto': serializer.data}, status=201)
    return Response(serializer.errors, status=400)



@api_view(['POST'])
def crear_inventario(request):
    producto_id = request.data.get('producto')
    cantidad = request.data.get('cantidad')

    if not producto_id or not cantidad:
        return Response({'error': 'Los campos producto y cantidad son obligatorios'}, status=400)

    try:
        producto = Producto.objects.get(id=producto_id)
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)

    # Verificamos si ya hay inventario para ese producto
    inventario_existente = Inventario.objects.filter(producto=producto).first()
    if inventario_existente:
        return Response({'error': 'Ya existe inventario para este producto'}, status=400)

    inventario = Inventario.objects.create(
        producto=producto,
        cantidad=cantidad
    )

    return Response({
        'mensaje': 'Inventario creado exitosamente',
        'inventario': {
            'id': inventario.id,
            'producto': inventario.producto.nombre,
            'cantidad': inventario.cantidad
        }
    }, status=201)



@api_view(['GET'])
def listar_catalogo(request):
    productos = Producto.objects.filter(estado=1).order_by('id')
    data = [
        {
            'id': p.id,
            'nombre': p.nombre,
            'precio': p.precio,
            'dir_img': p.dir_img,
        } for p in productos
    ]
    return Response(data)

@api_view(['GET'])
def detalle_producto(request, id):
    try:
        producto = Producto.objects.get(id=id)
        inventario = Inventario.objects.filter(producto=producto).first()
        return Response({
            'nombre': producto.nombre,
            'descripcion': producto.descripcion,
            'precio': producto.precio,
            'dir_img': producto.dir_img,
            'stock': inventario.cantidad if inventario else 0
        })
    except Producto.DoesNotExist:
        return Response({'error': 'Producto no encontrado'}, status=404)
