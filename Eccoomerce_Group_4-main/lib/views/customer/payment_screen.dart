// payment_screen.dart
// Aquí usaremos `flutter_stripe` con setup desde Stripe dashboard
import 'package:flutter/material.dart';

class PaymentScreen extends StatelessWidget {
  final double totalAmount = 1020.0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Payment')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Total to pay: \$${totalAmount.toStringAsFixed(2)}', style: TextStyle(fontSize: 22)),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Acá va la lógica con Stripe
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text("Payment completed (simulado)")),
                );
              },
              child: Text('Pay Now'),
            ),
          ],
        ),
      ),
    );
  }
}
