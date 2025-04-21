import 'package:flutter/material.dart';

class CartScreen extends StatelessWidget {
  final List<Map<String, dynamic>> cartItems = [
    {'name': 'Laptop', 'price': 1000.0},
    {'name': 'Book', 'price': 20.0},
  ];

  double get total => cartItems.fold(0, (sum, item) => sum + item['price']);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My Cart')),
      body: Column(
        children: [
          Expanded(
            child: ListView(
              children: cartItems.map((item) {
                return ListTile(
                  title: Text(item['name']),
                  trailing: Text('\$${item['price'].toStringAsFixed(2)}'),
                );
              }).toList(),
            ),
          ),
          Divider(),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Total: \$${total.toStringAsFixed(2)}', style: TextStyle(fontSize: 18)),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/payment');
                  },
                  child: Text('Checkout'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
