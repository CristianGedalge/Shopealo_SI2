import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'providers/auth_provider.dart';

import 'core/routes.dart'; // Este es el archivo donde definiste appRoutes

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ProductoProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Shoppit App',
      theme: ThemeData(primarySwatch: Colors.teal),
      initialRoute: authProvider.isAuthenticated ? _getRouteByRole(authProvider.rol) : '/login',
      routes: appRoutes,
    );
  }

  String _getRouteByRole(String? rol) {
    switch (rol?.toUpperCase()) {
      case 'ADMINISTRADOR':
        return '/admin';
      case 'EMPLEADO':
        return '/payment';
      case 'CLIENTE':
      default:
        return '/home';
    }
  }
}
