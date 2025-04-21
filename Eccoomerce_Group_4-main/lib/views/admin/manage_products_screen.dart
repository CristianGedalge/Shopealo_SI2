import 'package:flutter/material.dart';

class ManageProductsScreen extends StatelessWidget {
  final List<Map<String, dynamic>> products = [
    {'name': 'Laptop', 'price': 1000, 'brand': 'Dell'},
    {'name': 'Book', 'price': 25, 'brand': 'Penguin'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Manage Products')),
      body: ListView(
        children: products.map((product) {
          return ListTile(
            title: Text(product['name']),
            subtitle: Text('${product['brand']} - \$${product['price']}'),
            trailing: IconButton(
              icon: Icon(Icons.delete, color: Colors.red),
              onPressed: () {
                // lógica para eliminar producto
              },
            ),
          );
        }).toList(),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // lógica para agregar producto
        },
        child: Icon(Icons.add),
        tooltip: 'Add Product',
      ),
    );
  }
}
