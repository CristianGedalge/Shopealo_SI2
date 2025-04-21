import 'package:flutter/material.dart';
import '../../../widgets/sidebar_admin.dart';
import 'usuarios_screen.dart';
import 'bitacora_screen.dart';
import '../../providers/auth_provider.dart';
import 'package:provider/provider.dart';
import '../admin/ListaProductosScreen.dart';
//import 'package:tu_app/views/admin/lista_productos_screen.dart';
import '../admin/CrearProductoScreen.dart';

class AdminDashboardScreen extends StatefulWidget {
  @override
  _AdminDashboardScreenState createState() => _AdminDashboardScreenState();
}

class _AdminDashboardScreenState extends State<AdminDashboardScreen> {
  String _selectedView = 'dashboard';

  Widget getContent() {
    switch (_selectedView) {
      case 'usuarios':
        return UsuariosScreen();
      case 'bitacora':
        return BitacoraScreen();
      case 'productos':
        return CrearProductoScreen();
      case 'listaproductos':
        return ListaProductosScreen();
      case 'permisos':
        return Center(
          child: Text(
            'Permisos (en construcción)',
            style: TextStyle(fontSize: 20),
          ),
        );
      default:
        final auth = Provider.of<AuthProvider>(context);
        return Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Bienvenido Admin 👑', style: TextStyle(fontSize: 22)),
              SizedBox(height: 20),
              Text('📛 Nombre: ${auth.nombre}', style: TextStyle(fontSize: 18)),
              Text('📧 Correo: ${auth.email}', style: TextStyle(fontSize: 18)),
              /* eso añadi  */
              Text(
                '📱 Teléfono: ${auth.telefono ?? "No definido"}',
                style: TextStyle(fontSize: 18),
              ),
              Text(
                '📍 Dirección: ${auth.direccion ?? "No definida"}',
                style: TextStyle(fontSize: 18),
              ),
            ],
          ),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: SidebarAdmin(
        onNavigate: (view) {
          setState(() {
            _selectedView = view;
          });
          Navigator.pop(context); // cerrar drawer
        },
      ),
      appBar: AppBar(
        title: Text('Panel Administrativo'),
        backgroundColor: Colors.teal[700],
      ),
      body: getContent(),
    );
  }
}
