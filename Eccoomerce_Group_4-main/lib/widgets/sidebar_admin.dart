import 'package:flutter/material.dart';

class SidebarAdmin extends StatelessWidget {
  final Function(String) onNavigate;

  const SidebarAdmin({required this.onNavigate});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Stack(
        children: [
          // Imagen de fondo
          SizedBox.expand(
            child: Image.asset('assets/Eco.jpg', fit: BoxFit.cover),
          ),
          Container(color: Colors.black.withOpacity(0.5)),

          // Menú
          ListView(
            padding: const EdgeInsets.symmetric(vertical: 20),
            children: [
              const DrawerHeader(
                child: Text(
                  'ADMIN MENU',
                  style: TextStyle(color: Colors.white, fontSize: 22),
                ),
              ),
              ListTile(
                leading: Icon(Icons.dashboard, color: Colors.white),
                title: Text('Dashboard', style: TextStyle(color: Colors.white)),
                onTap: () => onNavigate('dashboard'),
              ),
              ExpansionTile(
                leading: Icon(Icons.person, color: Colors.white),
                title: Text('Usuario', style: TextStyle(color: Colors.white)),
                iconColor: Colors.white,
                collapsedIconColor: Colors.white,
                children: [
                  ListTile(
                    leading: Icon(Icons.list, color: Colors.white),
                    title: Text(
                      'Lista de usuarios',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () => onNavigate('usuarios'),
                  ),
                  ListTile(
                    leading: Icon(Icons.book, color: Colors.white),
                    title: Text(
                      'Bitácora',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () => onNavigate('bitacora'),
                  ),
                  ListTile(
                    leading: Icon(Icons.lock, color: Colors.white),
                    title: Text(
                      'Permisos',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () => onNavigate('permisos'),
                  ),

                  ListTile(
                    leading: Icon(Icons.shopping_cart, color: Colors.white),
                    title: Text(
                      'Productos',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () => onNavigate('productos'),
                  ),
                  ListTile(
                    leading: Icon(Icons.shopping_cart, color: Colors.white),
                    title: Text(
                      'Lista de Productos',
                      style: TextStyle(color: Colors.white),
                    ),
                    onTap: () => onNavigate('listaproductos'),
                  ),
                ],
              ),

              ListTile(
                leading: Icon(Icons.logout, color: Colors.white),
                title: Text(
                  'Cerrar sesión',
                  style: TextStyle(color: Colors.white),
                ),
                onTap: () {
                  Navigator.pushReplacementNamed(context, '/login');
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
