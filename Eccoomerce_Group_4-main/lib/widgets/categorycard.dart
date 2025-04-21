import 'package:flutter/material.dart';

class CategoryCard extends StatelessWidget {
  final String name;
  final IconData icon;
  final Color color;

  const CategoryCard({required this.name, required this.icon, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      margin: EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: Colors.white, size: 32),
          SizedBox(height: 8),
          Text(name, style: TextStyle(color: Colors.white)),
        ],
      ),
    );
  }
}
