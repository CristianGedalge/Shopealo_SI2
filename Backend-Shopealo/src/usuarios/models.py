from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser

class Permiso(models.Model):
    nombre = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'permiso'

class Rol(models.Model):
    nombre = models.CharField(max_length=100)
    permisos = models.ManyToManyField(Permiso, through='RolPermiso')

    class Meta:
        managed = False
        db_table = 'rol'

class RolPermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)
    estado = models.SmallIntegerField(default=1)

    class Meta:
        managed = False
        db_table = 'rol_permiso'
        unique_together = ('rol', 'permiso')


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)
    url_img = models.TextField(blank=True, null=True)
    estado = models.SmallIntegerField(default=1)
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'usuario'

class Bitacora(models.Model):
    dir_ip = models.CharField(max_length=50)
    fecha = models.DateField()
    hora = models.TimeField()
    accion = models.TextField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'bitacora'

class Empleado(models.Model):
    empleado = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    class Meta:
        managed = False
        db_table = 'empleado'

class Administrador(models.Model):
    administrador = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    class Meta:
        managed = False
        db_table = 'administrador'

class Cliente(models.Model):
    cliente = models.OneToOneField(Usuario, on_delete=models.CASCADE, primary_key=True)

    class Meta:
        managed = False
        db_table = 'cliente'

class Factura(models.Model):
    nro_aut = models.CharField(max_length=50)
    fecha = models.DateField()
    nit_ci_cli = models.CharField(max_length=50)
    monto = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'factura'

class NotaVenta(models.Model):
    total = models.DecimalField(max_digits=10, decimal_places=2)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    factura = models.ForeignKey(Factura, on_delete=models.SET_NULL, null=True)
    estado = models.SmallIntegerField(default=1)

    class Meta:
        managed = False
        db_table = 'nota_venta'

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        managed = False
        db_table = 'categoria'

class Marca(models.Model):
    marca = models.CharField(max_length=100)

    def __str__(self):
        return self.marca

    class Meta:
        managed = False
        db_table = 'marca'

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    dir_img = models.TextField(blank=True, null=True)
    estado = models.SmallIntegerField(default=1)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)
    #marca = models.ForeignKey(Marca, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.nombre

    class Meta:
        managed = False
        db_table = 'producto'

class Resena(models.Model):
    comentario = models.TextField()
    calificacion = models.IntegerField()
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha = models.DateField()

    def clean(self):
        from django.core.exceptions import ValidationError
        if not (1 <= self.calificacion <= 5):
            raise ValidationError("La calificación debe estar entre 1 y 5")

    class Meta:
        managed = False
        db_table = 'resena'

class Descuento(models.Model):
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'descuento'

class DetalleVenta(models.Model):
    cant = models.IntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    nota_venta = models.ForeignKey(NotaVenta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detalle_venta'
        unique_together = ('nota_venta', 'producto')

class Inventario(models.Model):
    cantidad = models.IntegerField()
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'inventario'

class Proveedor(models.Model):
    ubicacion = models.CharField(max_length=100)
    correo = models.CharField(max_length=100)
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    estado = models.SmallIntegerField(default=1)

    class Meta:
        managed = False
        db_table = 'proveedor'

class NotadeCompra(models.Model):
    fecha = models.DateField()
    costo_total = models.DecimalField(max_digits=10, decimal_places=2)
    admin = models.ForeignKey(Administrador, on_delete=models.SET_NULL, null=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True)

    class Meta:
        managed = False
        db_table = 'notadecompra'

class DetalleCompra(models.Model):
    cantidad = models.IntegerField()
    costo_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    costo_total = models.DecimalField(max_digits=10, decimal_places=2)
    nota_compra = models.ForeignKey(NotadeCompra, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'detalle_compra'
        unique_together = ('nota_compra', 'producto')

