from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from src.usuarios.models import Usuario,Cliente,DetalleVenta,NotaVenta,Factura,Producto,Inventario
from src.usuarios.views import get_usuario_desde_token_manual
# Create your views here.
import os
import stripe

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@api_view(['GET'])
def probar_stripe_key(request):
    print(stripe.api_key)
    #print("Clave de Stripe:", os.getenv("STRIPE_SECRET_KEY"))
    return Response({"sii":"sfiif"})

#### stripe :V

@api_view(['POST'])
def crear_pago(request):
    try:
        monto = request.data.get('monto') #el monto debe ser en centavos 5000ctv==50$
        if not monto:
            return Response({'error': 'El monto es requerido'}, status=400)

        intent = stripe.PaymentIntent.create(
            amount=int(monto),
            currency='usd',  # O la moneda que uses
            payment_method_types=['card']
        )

        return Response({
            'client_secret': intent.client_secret
        })

    except Exception as e:
        return Response({'error': str(e)}, status=500)
    


@api_view(['POST'])
def registrar_venta(request):
    try:
        # Obtener usuario desde token manual
        usuario = get_usuario_desde_token_manual(request)

        data = request.data
        productos = data.get('productos', [])
        total = data.get('total')

        cliente = Cliente.objects.get(cliente=usuario)

        # Crear nota de venta
        nota = NotaVenta.objects.create(
            total=total,
            cliente=cliente,
            estado=1
        )

        # Crear detalle por producto
        for item in productos:
            producto = Producto.objects.get(id=item['producto_id'])
            cantidad = int(item['cantidad'])
            precio_unitario = producto.precio
            precio_total = cantidad * precio_unitario

            # Crear detalle venta
            DetalleVenta.objects.create(
                nota_venta=nota,
                producto=producto,
                cant=cantidad,
                precio_unitario=precio_unitario,
                precio_total=precio_total
            )

            # Actualizar inventario
            inventario = Inventario.objects.get(producto=producto)
            inventario.cantidad -= cantidad
            inventario.save()

        return Response({'mensaje': 'Venta registrada con éxito'}, status=201)

    except Cliente.DoesNotExist:
        return Response({'error': 'Cliente no encontrado'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)