import 'package:flutter/material.dart';
import '../../../widgets/sidebar_empleado.dart';
import 'productos_screen.dart';

class EmployeePanelScreen extends StatefulWidget {
  @override
  State<EmployeePanelScreen> createState() => _EmployeePanelScreenState();
}

class _EmployeePanelScreenState extends State<EmployeePanelScreen> {
  String vista = 'productos';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: SidebarEmpleado(
        onNavigate: (v) {
          setState(() => vista = v);
          Navigator.pop(context);
        },
      ),
      appBar: AppBar(
        title: Text('Panel del Empleado'),
        backgroundColor: Colors.teal[700],
      ),
      body: vista == 'productos'
          ? ProductosScreen()
          : Center(child: Text('Bienvenido 👷‍♂️')),
    );
  }
}
