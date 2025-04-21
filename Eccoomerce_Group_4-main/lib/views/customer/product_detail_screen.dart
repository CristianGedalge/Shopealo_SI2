import 'package:flutter/material.dart';

class ProductDetailScreen extends StatelessWidget {
  final String name;
  final int price;
  final int stars;
  final String imagePath;

  const ProductDetailScreen({
    required this.name,
    required this.price,
    required this.stars,
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 12),
            child: Icon(Icons.shopping_cart, color: Colors.white),
          ),
        ],
      ),
      body: Stack(
        children: [
          // Fondo decorativo
          SizedBox.expand(
            child: Image.asset('assets/Eco.jpg', fit: BoxFit.cover),
          ),
          Container(color: Colors.black.withOpacity(0.6)),

          // Contenido
          SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 80),

                // Imagen producto
                Container(
                  height: 220,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black26,
                        blurRadius: 12,
                        offset: Offset(0, 6),
                      )
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: Image.asset(imagePath, fit: BoxFit.cover),
                  ),
                ),

                const SizedBox(height: 20),

                // Nombre y precio
                Text(
                  name,
                  style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                const SizedBox(height: 6),
                Text(
                  '\$ $price',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: Colors.tealAccent[100],
                  ),
                ),

                const SizedBox(height: 10),

                // Estrellas
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(5, (index) {
                    return Icon(
                      Icons.star,
                      color: index < stars ? Colors.amber : Colors.grey[400],
                      size: 20,
                    );
                  }),
                ),

                const SizedBox(height: 20),

                // Descripción en tarjeta
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.95),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Text(
                    'A product description is the marketing copy that explains what a product is and why it’s worth purchasing. It supplies important info about the features and benefits of the product.',
                    style: TextStyle(color: Colors.black87),
                    textAlign: TextAlign.center,
                  ),
                ),

                const SizedBox(height: 30),

                // Botón
                ElevatedButton(
                  onPressed: () {
                    // lógica para añadir al carrito
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.tealAccent[700],
                    padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  child: const Text('ADD TO CART', style: TextStyle(fontSize: 16, color: Colors.white)),
                ),

                const SizedBox(height: 30),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
