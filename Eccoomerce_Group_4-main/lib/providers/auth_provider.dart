import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../utils/api_server.dart';

import 'dart:io';
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';





/* PROVIDER PARA REGISTRAR Y INICIAR Y CERRAR SECCION  */

class AuthProvider with ChangeNotifier {
  String? _token;
  String? _rol;
  String? _nombre;
  /* ricien añadi  */
  String? _email;
  String? _telefono;
  String? _direccion;

  String? get email => _email;
  String? get telefono => _telefono;
  String? get direccion => _direccion;


  /* antigui */
  String? get token => _token;
  String? get rol => _rol;
  String? get nombre => _nombre;
  bool get isAuthenticated => _token != null;

  AuthProvider() {
    _loadFromPrefs();
    
  }

  Future<void> _loadFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('token');
    _rol = prefs.getString('rol');
    _nombre = prefs.getString('nombre');


    _email = prefs.getString('email');
_telefono = prefs.getString('telefono');
_direccion = prefs.getString('direccion');
    notifyListeners();
  }

  // 🔐 LOGIN
  Future<void> login(
    String email,
    String password,
    BuildContext context,
  ) async {
    final url = Uri.parse('${ApiServer.baseUrl}/login/');

    try {
      final res = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({"email": email, "password": password}),
      );

      if (res.statusCode == 200) {
        final data = jsonDecode(res.body);

        _token = data['token'];
        _rol = data['usuario']['rol'];
        _nombre = data['usuario']['nombre'];

        /* añadi ricien  */
        _email = data['usuario']['email'];
_telefono = data['usuario']['telefono'];
_direccion = data['usuario']['direccion'];





        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', _token!);
        await prefs.setString('rol', _rol!);
        await prefs.setString('nombre', _nombre!);
        /* ricien añadiiiii */
        await prefs.setString('email', _email!);
await prefs.setString('telefono', _telefono ?? '');
await prefs.setString('direccion', _direccion ?? '');


        notifyListeners();
        _redirectUserByRole(context);
      } else {
        final body = jsonDecode(res.body);
        throw Exception(body['error'] ?? 'Credenciales incorrectas');
      }
    } catch (e) {
      throw Exception('Error de login: ${e.toString()}');
    }
  }

  // 📝 REGISTRO DE CLIENTE
  Future<void> registrarCliente({
    required BuildContext context,
    required String nombre,
    required String email,
    required String password,
    required String telefono,
    required String direccion,
  }) async {
    final url = Uri.parse('${ApiServer.baseUrl}/registro/');

    try {
      final res = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          "nombre": nombre,
          "email": email,
          "password": password,
          "telefono": telefono,
          "direccion": direccion,
          "rol": 2, // 👈 Rol CLIENTE por defecto
        }),
      );

      if (res.statusCode == 200 || res.statusCode == 201) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("✅ Registro exitoso. Inicia sesión.")),
        );
        Navigator.pushReplacementNamed(context, '/login');
      } else {
        final error = jsonDecode(res.body);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("❌ Error al registrar: ${error.toString()}")),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("❌ Error inesperado: ${e.toString()}")),
      );
    }
  }

  void _redirectUserByRole(BuildContext context) {
    switch (_rol?.toUpperCase()) {
      case 'ADMINISTRADOR':
        Navigator.pushReplacementNamed(context, '/admin');
        break;
      case 'EMPLEADO':
        Navigator.pushReplacementNamed(context, '/payment');
        break;
      case 'CLIENTE':
      default:
        Navigator.pushReplacementNamed(context, '/home');
        break;
    }
  }

  Future<void> logout(BuildContext context) async {
    _token = null;
    _rol = null;
    _nombre = null;

    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();

    notifyListeners();
    Navigator.pushReplacementNamed(context, '/login');
  }
}


/* PROVIDER PARA CREAR UN NUEVO PRODUCTO  */
class ProductoProvider with ChangeNotifier {
Future<void> crearProducto({
  required String nombre,
  required String descripcion,
  required String precio,
  required String categoriaId,
  required BuildContext context,
  File? imagen,
}) async {
  String? urlImagen = '';

  if (imagen != null) {
    urlImagen = await subirImagenAImgur(imagen);
    if (urlImagen == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('❌ Error al subir imagen')),
      );
      return;
    }
  }

  final url = Uri.parse('${ApiServer.baseUrl}/producto/crear/');
  final res = await http.post(
    url,
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({
      "nombre": nombre,
      "descripcion": descripcion,
      "precio": precio,
      "estado": 1,
      "categoria": int.parse(categoriaId),
      "dir_img": urlImagen, // 🔥 se envía la URL de Imgur
    }),
  );

  if (res.statusCode == 200 || res.statusCode == 201) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('✅ Producto creado exitosamente')),
    );
    notifyListeners();
  } else {
    print('Error del servidor: ${res.body}');
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('❌ Error al crear producto')),
    );
  }
}

Future<String?> subirImagenAImgur(File imagen) async {
  final bytes = await imagen.readAsBytes();
  final base64Image = base64Encode(bytes);

  const clientId = '4a3b1edaccd5a70'; // 👈 poné el Client-ID de tu app de Imgur

  final response = await http.post(
    Uri.parse('https://api.imgur.com/3/image'),
    headers: {
      'Authorization': 'Client-ID $clientId',
    },
    body: {
      'image': base64Image,
      'type': 'base64',
    },
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return data['data']['link'];
  } else {
    print('Error al subir imagen a Imgur: ${response.body}');
    return null;
  }
}

}