// Tarjeta visual de un producto, con botones de editar y eliminar
import 'package:flutter/material.dart';

class ProductoItemCard extends StatelessWidget {
  final Map producto;
  final VoidCallback onEditar;
  final VoidCallback onEliminar;

  const ProductoItemCard({
    required this.producto,
    required this.onEditar,
    required this.onEliminar,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: ListTile(
        contentPadding: EdgeInsets.all(12),
        leading: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.network(
            producto['dir_img'] ?? '',
            width: 60,
            height: 60,
            fit: BoxFit.cover,
            errorBuilder: (context, error, stackTrace) =>
                Icon(Icons.image_not_supported),
          ),
        ),
        title: Text(producto['nombre'], style: TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text('${producto['descripcion']}\nBs ${producto['precio']}'),
        isThreeLine: true,
        trailing: Wrap(
          spacing: 8,
          children: [
            IconButton(onPressed: onEditar, icon: Icon(Icons.edit, color: Colors.teal)),
            IconButton(onPressed: onEliminar, icon: Icon(Icons.delete, color: Colors.red)),
          ],
        ),
      ),
    );
  }
}
