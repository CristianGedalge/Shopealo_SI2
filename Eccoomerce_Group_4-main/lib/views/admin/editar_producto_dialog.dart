// Formulario flotante para editar un producto (sin lógica de backend activa por ahora)
import 'package:flutter/material.dart';

class EditarProductoDialog extends StatefulWidget {
  final Map producto;
  final VoidCallback onProductoActualizado;

  const EditarProductoDialog({
    required this.producto,
    required this.onProductoActualizado,
  });

  @override
  State<EditarProductoDialog> createState() => _EditarProductoDialogState();
}

class _EditarProductoDialogState extends State<EditarProductoDialog> {
  late TextEditingController _nombre;
  late TextEditingController _descripcion;
  late TextEditingController _precio;

  @override
  void initState() {
    super.initState();
    _nombre = TextEditingController(text: widget.producto['nombre']);
    _descripcion = TextEditingController(text: widget.producto['descripcion']);
    _precio = TextEditingController(text: widget.producto['precio'].toString());
  }

  Future<void> actualizarProducto() async {
    // ⚠️ En esta versión, no enviamos nada al backend
    // Solo mostramos el resultado simulado en consola
    print('Simulando actualización...');
    print('Nombre: ${_nombre.text}');
    print('Descripción: ${_descripcion.text}');
    print('Precio: ${_precio.text}');
    
    // Simulamos que se actualizó
    Navigator.pop(context);
    widget.onProductoActualizado();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Editar Producto'),
      content: SingleChildScrollView(
        child: Column(
          children: [
            TextField(controller: _nombre, decoration: InputDecoration(labelText: 'Nombre')),
            TextField(controller: _descripcion, decoration: InputDecoration(labelText: 'Descripción')),
            TextField(controller: _precio, decoration: InputDecoration(labelText: 'Precio')),
          ],
        ),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancelar')),
        ElevatedButton(onPressed: actualizarProducto, child: Text('Guardar')),
      ],
    );
  }
}
