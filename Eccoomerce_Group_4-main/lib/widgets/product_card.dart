import 'package:flutter/material.dart';
import '../views/customer/product_detail_screen.dart';

class ProductCard extends StatelessWidget {
  final String name;
  final int price;
  final int stars;
  final String imagePath;

  const ProductCard({
    required this.name,
    required this.price,
    required this.stars,
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => ProductDetailScreen(
              name: name,
              price: price,
              stars: stars,
              imagePath: imagePath,
            ),
          ),
        );
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.95),
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 6,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Imagen
            ClipRRect(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
              child: Image.asset(
                imagePath,
                fit: BoxFit.cover,
                height: 120,
                width: double.infinity,
              ),
            ),

            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  // Nombre
                  Text(
                    name,
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 4),

                  // Estrellas
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(5, (index) {
                      return Icon(
                        Icons.star,
                        size: 16,
                        color: index < stars ? Colors.amber : Colors.grey[300],
                      );
                    }),
                  ),
                  const SizedBox(height: 6),

                  // Precio
                  Text(
                    '\$ $price',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.teal.shade700,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
