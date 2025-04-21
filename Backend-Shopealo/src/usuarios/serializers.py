from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario, Administrador, Cliente, Empleado, Rol,Bitacora,Permiso,RolPermiso

class UsuarioSerializer(serializers.ModelSerializer):
    rol=serializers.PrimaryKeyRelatedField(queryset=Rol.objects.all())
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'password', 'telefono', 'direccion', 'rol']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_rol(self, obj):
        return obj.rol.nombre if obj.rol else None
    
    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise serializers.ValidationError("El email ya está registrado.")
        return value

    def create(self, validated_data):
        usuario = Usuario.objects.create(
            nombre=validated_data['nombre'],
            email=validated_data['email'],  # ⚠️ Asegurate de usar 'email' si tu campo se llama así
            telefono=validated_data.get('telefono'),
            direccion=validated_data.get('direccion'),
            rol=validated_data.get('rol'),
            password=make_password(validated_data['password'])
        )

        rol_id = validated_data['rol'].id  # Suponiendo que `rol` es una instancia
        if rol_id == 1:  # ADMINISTRADOR
            Administrador.objects.create(administrador=usuario)
        elif rol_id == 2:  # CLIENTE
            Cliente.objects.create(cliente=usuario)
        elif rol_id == 3:  # EMPLEADO
            Empleado.objects.create(empleado=usuario)
        return usuario



class BitacoraSerializer(serializers.ModelSerializer):
    usuario_id = serializers.IntegerField(source='usuario.id')
    nombre = serializers.CharField(source='usuario.nombre')
    correo = serializers.EmailField(source='usuario.email')
    ip = serializers.IPAddressField(source='dir_ip')
    hora = serializers.SerializerMethodField()

    class Meta:
        model = Bitacora
        fields = ['id', 'ip', 'fecha', 'hora', 'accion', 'usuario_id', 'nombre', 'correo']

    def get_hora(self, obj):
        return obj.hora.strftime("%H:%M:%S")


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre']




# class RolPermisoSerializer(serializers.Serializer):
#     permiso_id = serializers.IntegerField()
#     permiso_nombre = serializers.CharField()
#     estado = serializers.IntegerField()