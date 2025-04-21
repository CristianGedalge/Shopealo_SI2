import 'package:flutter/material.dart';
import '../../../widgets/product_card.dart';

class HomeScreen extends StatelessWidget {
  final List<Map<String, dynamic>> categories = [
    {'name': 'Phones', 'icon': Icons.phone_iphone},
    {'name': 'Laptops', 'icon': Icons.laptop_mac},
    {'name': 'Printers', 'icon': Icons.print},
    {'name': 'Smartwatches', 'icon': Icons.watch},
  ];

  final List<Map<String, dynamic>> products = [
    {'name': 'Sofa', 'price': 5000, 'stars': 4, 'image': 'assets/sofa.jpeg'},
    {'name': 'Table', 'price': 4000, 'stars': 5, 'image': 'assets/table.jpeg'},
    {'name': 'Lamp', 'price': 1000, 'stars': 3, 'image': 'assets/lamp.jpeg'},
    {'name': 'Chair', 'price': 600, 'stars': 4, 'image': 'assets/chair.jpeg'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: const Text('Discover', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          CircleAvatar(
            backgroundColor: Colors.white.withOpacity(0.8),
            child: const Icon(Icons.person, color: Colors.black),
          ),
          const SizedBox(width: 10),
        ],
      ),
      body: Stack(
        children: [
          // Fondo con imagen
          SizedBox.expand(
            child: Image.asset('assets/Eco.jpg', fit: BoxFit.cover),
          ),
          Container(color: Colors.black.withOpacity(0.3)), // oscurece un poco

          // Contenido principal
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: ListView(
                children: [
                  // 🔍 Search bar con micrófono
                  TextField(
                    decoration: InputDecoration(
                      hintText: 'Search products...',
                      prefixIcon: Icon(Icons.search),
                      suffixIcon: Icon(Icons.mic),
                      filled: true,
                      fillColor: Colors.white.withOpacity(0.9),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // 🟢 Banner bienvenida
                  Container(
                    padding: const EdgeInsets.all(20),
                    margin: const EdgeInsets.symmetric(vertical: 10),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.5),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Text(
                      'Bienvenido a nuestra tienda',
                      style: TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                  ),

                  const SizedBox(height: 10),

                  // 🔷 Categorías
                  const Text('Categorías',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 8),
                  SizedBox(
                    height: 100,
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: categories.length,
                      separatorBuilder: (_, __) => const SizedBox(width: 12),
                      itemBuilder: (_, index) {
                        final cat = categories[index];
                        return Container(
                          width: 100,
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.85),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(cat['icon'], size: 32, color: Colors.black),
                              const SizedBox(height: 6),
                              Text(cat['name'], style: TextStyle(color: Colors.black)),
                            ],
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 20),

                  // 🔥 Populares
                  const Text('Más populares',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 8),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: products.length,
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    itemBuilder: (_, index) {
                      final p = products[index];
                      return ProductCard(
                        name: p['name'],
                        price: p['price'],
                        stars: p['stars'],
                        imagePath: p['image'],
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
