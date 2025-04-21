from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .models import Usuario, Permiso,Bitacora,Rol,RolPermiso
from .serializers import UsuarioSerializer,BitacoraSerializer,RolSerializer
from datetime import datetime, timedelta,timezone
import jwt 
from .utils import get_client_ip
from django.conf import settings


@api_view(['POST'])
def registrar(request):
    serializer = UsuarioSerializer(data=request.data)
    
    if serializer.is_valid():
        usuario = serializer.save()
        res=UsuarioSerializer(usuario)
        registrar_bitacora(request,f'registro {usuario.rol.nombre}',usuario)
        return Response({
            'mensaje': 'Usuario registrado correctamente',
            'usuario': res.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    print(request.data)
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Faltan campos obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        usuario = Usuario.objects.get(email=email, estado=1)
    except Usuario.DoesNotExist:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    if not check_password(password, usuario.password):
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    # Generar token JWT
    payload = {
        'user_id': usuario.id,
        'exp': datetime.now(timezone.utc) + timedelta(hours=1),   # Token válido por 1 hora
        'iat': datetime.now(timezone.utc)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    # Obtener permisos del rol
    permisos = Permiso.objects.filter(
        rolpermiso__rol=usuario.rol,
        rolpermiso__estado=1
    ).values_list('nombre', flat=True)
    registrar_bitacora(request,'inicio de sesion',usuario)
    return Response({
        'token': token,
        'usuario': {
            'id': usuario.id,
            'nombre': usuario.nombre,
            'email': usuario.email,
            'rol': usuario.rol.nombre if usuario.rol else None,
            'rol_id': usuario.rol.id if usuario.rol else None,
            'permisos': list(permisos)
        }
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_usuario_info(request):
    usuario = get_usuario_desde_token_manual(request)

    if not usuario:
        return Response({'error': 'Token inválido o usuario no encontrado'}, status=401)

    return Response({
        'id': usuario.id,
        'nombre': usuario.nombre,
        'email': usuario.email,
        'telefono': usuario.telefono,
        'direccion': usuario.direccion,
        'rol': usuario.rol.nombre if usuario.rol else None
    })


@api_view(['GET'])
def get_usuarios(request):
    usuarios = Usuario.objects.filter(estado=True).order_by('id')
    serializer = UsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)




@api_view(['DELETE'])
def eliminar_usuario(request, id):
    try:
        usuario = Usuario.objects.get(id=id, estado=True)  # Solo usuarios activos
        usuario.estado = False  # Delete lógico
        usuario.save()
        info = get_usuario_desde_token_manual(request)
        registrar_bitacora(request,'elimino usuario',info)
        return Response({'mensaje': 'Usuario eliminado correctamente'}, status=status.HTTP_200_OK)
    except Usuario.DoesNotExist:
        return Response({'error': 'Usuario no encontrado o ya eliminado'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['GET'])
def get_rol(request):
    roles = Rol.objects.all()
    serializer = RolSerializer(roles, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def get_permisos_por_rol(request, rol_id):
#     try:
#         rol = Rol.objects.get(id=rol_id)
#     except Rol.DoesNotExist:
#         return Response({'error': 'Rol no encontrado'}, status=status.HTTP_404_NOT_FOUND)

#     permisos = Permiso.objects.filter(
#         rolpermiso__rol=rol,
#     )

#     serializer = RolPermisoSerializer(permisos, many=True,context={'rol': rol})
#     return Response({
#         'rol': rol.nombre,
#         'permisos': serializer.data
#     })
@api_view(['GET'])
def get_permisos_por_rol(request, rol_id):
    # Verificamos si el rol existe
    try:
        rol = Rol.objects.get(id=rol_id)
    except Rol.DoesNotExist:
        return Response({'error': 'Rol no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    # Traemos los permisos asociados (si tiene)
    rol_permisos = RolPermiso.objects.filter(rol_id=rol_id).values(
        'permiso__id', 'permiso__nombre', 'estado'
    )

    data = [
        {
            'permiso_id': rp['permiso__id'],
            'permiso_nombre': rp['permiso__nombre'],
            'estado': rp['estado']
        }
        for rp in rol_permisos
    ]

    return Response(data)



# @api_view(['PUT'])
# def actualizar_estado_permiso(request):
#     rol_id = request.data.get('rol_id')
#     permiso_id = request.data.get('permiso_id')
#     nuevo_estado = request.data.get('estado')

#     if rol_id is None or permiso_id is None or nuevo_estado is None:
#         return Response({'error': 'rol_id, permiso_id y estado son obligatorios'}, status=400)

#     # ✅ Usamos update directamente para evitar que Django busque `.id`
#     updated = RolPermiso.objects.filter(rol_id=rol_id, permiso_id=permiso_id).update(estado=nuevo_estado)

#     if updated == 0:
#         return Response({'error': 'La relación rol-permiso no existe'}, status=404)

#     return Response({
#         'mensaje': 'Estado del permiso actualizado correctamente',
#         'rol_id': rol_id,
#         'permiso_id': permiso_id,
#         'estado': nuevo_estado
#     })

@api_view(['PUT'])
def actualizar_estado_permiso(request):
    rol_id = request.data.get('rol_id')
    permisos = request.data.get('permisos')

    if rol_id is None or not isinstance(permisos, list):
        return Response({'error': 'Se requiere rol_id y una lista de permisos'}, status=400)

    errores = []
    actualizados = 0

    for p in permisos:
        permiso_id = p.get('permiso_id')
        estado = p.get('estado')

        if permiso_id is None or estado is None:
            errores.append(f"Faltan datos en permiso {p}")
            continue

        updated = RolPermiso.objects.filter(rol_id=rol_id, permiso_id=permiso_id).update(estado=estado)
        if updated == 0:
            errores.append(f"No existe relación con permiso_id {permiso_id}")
        else:
            actualizados += 1

    return Response({
        'mensaje': f'{actualizados} permisos actualizados',
        'errores': errores
    })





















def registrar_bitacora(request, accion, usuario):
    ip = get_client_ip(request)
    ahora = datetime.now()
    Bitacora.objects.create(
        dir_ip=ip,
        fecha=ahora.date(),
        hora=ahora.time().replace(microsecond=0),
        accion=accion,
        usuario=usuario
    )

@api_view(['GET'])
def get_bitacora(request):
    bitacoras = Bitacora.objects.select_related('usuario').all()
    serializer = BitacoraSerializer(bitacoras, many=True)
    return Response(serializer.data)











 # prueba para ver los token si se registran o no :v

@api_view(['POST'])
def hacer_algo(request):
    print('pooli')
    print(request)
    usuario = get_usuario_desde_token_manual(request)

    if not usuario:
        return Response({'error': 'Token inválido o usuario no encontrado'}, status=401)

    print(usuario.id)
    print(usuario.email)
    print(usuario.rol.nombre)

    return Response({'mensaje': f'Hola {usuario.nombre}'})



def get_usuario_desde_token_manual(request):
    auth_header = request.headers.get('Authorization')
    print(auth_header)

    if not auth_header or not auth_header.startswith('Bearer '):
        return None

    token = auth_header.split(' ')[1]

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user_id = payload.get('user_id')
        return Usuario.objects.get(id=user_id)
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Usuario.DoesNotExist):
        return None