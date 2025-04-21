import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';

class RegisterScreen extends StatefulWidget {
  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nombreController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _telefonoController = TextEditingController();
  final _direccionController = TextEditingController();

  void _registrar() {
    if (_formKey.currentState!.validate()) {
      Provider.of<AuthProvider>(context, listen: false).registrarCliente(
        context: context,
        nombre: _nombreController.text.trim(),
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
        telefono: _telefonoController.text.trim(),
        direccion: _direccionController.text.trim(),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          Image.asset('assets/Eco.jpg', fit: BoxFit.cover, width: double.infinity, height: double.infinity),
          Container(color: Colors.black.withOpacity(0.6)),

          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.93),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      const Text('Crear cuenta', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 16),

                      TextFormField(
                        controller: _nombreController,
                        decoration: const InputDecoration(labelText: 'Nombre'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      TextFormField(
                        controller: _emailController,
                        decoration: const InputDecoration(labelText: 'Correo electrónico'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      TextFormField(
                        controller: _telefonoController,
                        decoration: const InputDecoration(labelText: 'Teléfono'),
                      ),
                      TextFormField(
                        controller: _direccionController,
                        decoration: const InputDecoration(labelText: 'Dirección'),
                      ),
                      TextFormField(
                        controller: _passwordController,
                        obscureText: true,
                        decoration: const InputDecoration(labelText: 'Contraseña'),
                        validator: (value) => value!.length < 4 ? 'Mínimo 4 caracteres' : null,
                      ),

                      const SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _registrar,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.teal[700],
                          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        child: const Text('Registrarse'),
                      ),
                      TextButton(
                        onPressed: () => Navigator.pushReplacementNamed(context, '/login'),
                        child: const Text('¿Ya tienes cuenta? Inicia sesión'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
