import 'package:flutter/material.dart';

class BitacoraScreen extends StatelessWidget {
  final List<Map<String, dynamic>> registros = [
    {
      'usuario': 'admin@correo.com',
      'accion': 'Inició sesión',
      'fecha': '2025-04-17 10:00',
      'icono': Icons.login,
      'color': Colors.green
    },
    {
      'usuario': 'jorge@correo.com',
      'accion': 'Eliminó un producto',
      'fecha': '2025-04-17 11:23',
      'icono': Icons.delete,
      'color': Colors.red
    },
    {
      'usuario': 'lucia@correo.com',
      'accion': 'Registró un nuevo cliente',
      'fecha': '2025-04-17 14:55',
      'icono': Icons.person_add,
      'color': Colors.blue
    },
    {
      'usuario': 'admin@correo.com',
      'accion': 'Cerró sesión',
      'fecha': '2025-04-17 15:10',
      'icono': Icons.logout,
      'color': Colors.orange
    },
  ];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: registros.length,
      itemBuilder: (_, index) {
        final r = registros[index];
        return Card(
          margin: const EdgeInsets.symmetric(vertical: 8),
          child: ListTile(
            leading: CircleAvatar(
              backgroundColor: r['color'],
              child: Icon(r['icono'], color: Colors.white),
            ),
            title: Text(r['accion'], style: TextStyle(fontWeight: FontWeight.bold)),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Usuario: ${r['usuario']}'),
                Text('Fecha: ${r['fecha']}'),
              ],
            ),
          ),
        );
      },
    );
  }
}
