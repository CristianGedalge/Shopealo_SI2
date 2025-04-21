import 'package:flutter/material.dart';

class SidebarEmpleado extends StatelessWidget {
  final Function(String) onNavigate;

  const SidebarEmpleado({required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Stack(
        children: [
          SizedBox.expand(
            child: Image.asset('assets/Eco.jpg', fit: BoxFit.cover),
          ),
          Container(color: Colors.black.withOpacity(0.5)),
          ListView(
            children: [
              const DrawerHeader(
                child: Text(
                  'EMPLEADO MENU',
                  style: TextStyle(color: Colors.white, fontSize: 22),
                ),
              ),
              ListTile(
                leading: Icon(Icons.inventory, color: Colors.white),
                title: Text('Productos', style: TextStyle(color: Colors.white)),
                onTap: () => onNavigate('productos'),
              ),
              ListTile(
                leading: Icon(Icons.logout, color: Colors.white),
                title: Text('Cerrar sesión', style: TextStyle(color: Colors.white)),
                onTap: () => Navigator.pushReplacementNamed(context, '/login'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
