import 'package:flutter/material.dart';

class UsuariosScreen extends StatefulWidget {
  @override
  _UsuariosScreenState createState() => _UsuariosScreenState();
}

class _UsuariosScreenState extends State<UsuariosScreen> {
  // Datos estáticos de ejemplo
  List<Map<String, dynamic>> usuarios = [
    {
      'nombre': 'Jorge Choque',
      'correo': 'jorge@correo.com',
      'telefono': '78912345',
      'rol': 'ADMIN',
    },
    {
      'nombre': 'Carlos Méndez',
      'correo': 'carlos@correo.com',
      'telefono': '71234567',
      'rol': 'EMPLEADO',
    },
    {
      'nombre': 'Lucía Suárez',
      'correo': 'lucia@correo.com',
      'telefono': '76543210',
      'rol': 'CLIENTE',
    },
  ];

  void mostrarFormularioEditar(Map<String, dynamic> usuario, int index) {
    final nombreCtrl = TextEditingController(text: usuario['nombre']);
    final correoCtrl = TextEditingController(text: usuario['correo']);
    final telCtrl = TextEditingController(text: usuario['telefono']);
    final rolCtrl = TextEditingController(text: usuario['rol']);

    showDialog(
      context: context,
      builder: (_) {
        return AlertDialog(
          title: Text('Editar Usuario'),
          content: SingleChildScrollView(
            child: Column(
              children: [
                TextField(controller: nombreCtrl, decoration: InputDecoration(labelText: 'Nombre')),
                TextField(controller: correoCtrl, decoration: InputDecoration(labelText: 'Correo')),
                TextField(controller: telCtrl, decoration: InputDecoration(labelText: 'Teléfono')),
                TextField(controller: rolCtrl, decoration: InputDecoration(labelText: 'Rol')),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  usuarios[index] = {
                    'nombre': nombreCtrl.text,
                    'correo': correoCtrl.text,
                    'telefono': telCtrl.text,
                    'rol': rolCtrl.text,
                  };
                });
                Navigator.pop(context);
              },
              child: Text('Guardar'),
            ),
          ],
        );
      },
    );
  }

  void eliminarUsuario(int index) {
    setState(() {
      usuarios.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Lista de Usuarios',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.teal[800])),
          SizedBox(height: 20),
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                columnSpacing: 20,
                columns: const [
                  DataColumn(label: Text('Nombre')),
                  DataColumn(label: Text('Correo')),
                  DataColumn(label: Text('Teléfono')),
                  DataColumn(label: Text('Rol')),
                  DataColumn(label: Text('Acciones')),
                ],
                rows: usuarios.asMap().entries.map((entry) {
                  int index = entry.key;
                  Map<String, dynamic> usuario = entry.value;
                  return DataRow(cells: [
                    DataCell(Text(usuario['nombre'])),
                    DataCell(Text(usuario['correo'])),
                    DataCell(Text(usuario['telefono'])),
                    DataCell(Text(usuario['rol'])),
                    DataCell(Row(
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit, color: Colors.blue),
                          onPressed: () => mostrarFormularioEditar(usuario, index),
                        ),
                        IconButton(
                          icon: Icon(Icons.delete, color: Colors.red),
                          onPressed: () => eliminarUsuario(index),
                        ),
                      ],
                    )),
                  ]);
                }).toList(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
