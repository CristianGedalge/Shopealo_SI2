import 'package:flutter/material.dart';

class ProductosScreen extends StatefulWidget {
  @override
  State<ProductosScreen> createState() => _ProductosScreenState();
}

class _ProductosScreenState extends State<ProductosScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nombreCtrl = TextEditingController();
  final _precioCtrl = TextEditingController();
  final _stockCtrl = TextEditingController();

  List<Map<String, dynamic>> productos = [
    {'nombre': 'Laptop Lenovo', 'precio': 4500, 'stock': 10},
    {'nombre': 'Smartwatch', 'precio': 500, 'stock': 25},
  ];

  void agregarProducto() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        productos.add({
          'nombre': _nombreCtrl.text,
          'precio': double.parse(_precioCtrl.text),
          'stock': int.parse(_stockCtrl.text),
        });
        _nombreCtrl.clear();
        _precioCtrl.clear();
        _stockCtrl.clear();
      });
    }
  }

  void mostrarFormularioEditar(Map<String, dynamic> producto, int index) {
    final nombreCtrl = TextEditingController(text: producto['nombre']);
    final precioCtrl = TextEditingController(text: producto['precio'].toString());
    final stockCtrl = TextEditingController(text: producto['stock'].toString());

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Editar Producto'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nombreCtrl, decoration: InputDecoration(labelText: 'Nombre')),
            TextField(controller: precioCtrl, decoration: InputDecoration(labelText: 'Precio')),
            TextField(controller: stockCtrl, decoration: InputDecoration(labelText: 'Stock')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: Text('Cancelar')),
          ElevatedButton(
            onPressed: () {
              setState(() {
                productos[index] = {
                  'nombre': nombreCtrl.text,
                  'precio': double.tryParse(precioCtrl.text) ?? 0,
                  'stock': int.tryParse(stockCtrl.text) ?? 0,
                };
              });
              Navigator.pop(context);
            },
            child: Text('Guardar'),
          )
        ],
      ),
    );
  }

  void eliminarProducto(int index) {
    setState(() => productos.removeAt(index));
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: ListView(
        children: [
          Text('Añadir Producto',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.teal[700])),
          Form(
            key: _formKey,
            child: Column(
              children: [
                TextFormField(controller: _nombreCtrl, decoration: InputDecoration(labelText: 'Nombre')),
                TextFormField(controller: _precioCtrl, decoration: InputDecoration(labelText: 'Precio')),
                TextFormField(controller: _stockCtrl, decoration: InputDecoration(labelText: 'Stock')),
                const SizedBox(height: 10),
                ElevatedButton(onPressed: agregarProducto, child: Text('Guardar')),
              ],
            ),
          ),
          const SizedBox(height: 30),
          Text('Lista de Productos',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.teal[700])),
          const SizedBox(height: 10),
          DataTable(
            columnSpacing: 20,
            columns: const [
              DataColumn(label: Text('Nombre')),
              DataColumn(label: Text('Precio')),
              DataColumn(label: Text('Stock')),
              DataColumn(label: Text('Acciones')),
            ],
            rows: productos.asMap().entries.map((entry) {
              int index = entry.key;
              var p = entry.value;
              return DataRow(cells: [
                DataCell(Text(p['nombre'])),
                DataCell(Text('\$${p['precio']}')),
                DataCell(Text('${p['stock']}')),
                DataCell(Row(
                  children: [
                    IconButton(
                      icon: Icon(Icons.edit, color: Colors.blue),
                      onPressed: () => mostrarFormularioEditar(p, index),
                    ),
                    IconButton(
                      icon: Icon(Icons.delete, color: Colors.red),
                      onPressed: () => eliminarProducto(index),
                    ),
                  ],
                )),
              ]);
            }).toList(),
          )
        ],
      ),
    );
  }
}
