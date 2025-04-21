from rest_framework import serializers
from src.usuarios.models import Categoria,Producto,Inventario

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class ProductoSerializer(serializers.ModelSerializer):

    stock = serializers.SerializerMethodField()
    class Meta:
        model = Producto
        fields = '__all__'
    
    def get_stock(self, obj):
        inventario = Inventario.objects.filter(producto=obj).first()
        return inventario.cantidad if inventario else 0
    
class ProductoCatalogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'dir_img']
