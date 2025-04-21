// Ventana de confirmación para eliminar
import 'package:flutter/material.dart';

class ConfirmarEliminacionDialog extends StatelessWidget {
  final VoidCallback onConfirmar;

  const ConfirmarEliminacionDialog({required this.onConfirmar});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text('Confirmar eliminación'),
      content: Text('¿Estás seguro de eliminar este producto?'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancelar')),
        ElevatedButton(onPressed: onConfirmar, child: Text('Eliminar')),
      ],
    );
  }
}
