import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';

class CrearProductoScreen extends StatefulWidget {
  @override
  State<CrearProductoScreen> createState() => _CrearProductoScreenState();
}

class _CrearProductoScreenState extends State<CrearProductoScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nombreController = TextEditingController();
  final _descripcionController = TextEditingController();
  final _precioController = TextEditingController();
  final _categoriaIdController = TextEditingController();

  File? _imagen;
  final ImagePicker _picker = ImagePicker();

  Future<void> _seleccionarImagen(bool desdeCamara) async {
    final XFile? picked = await _picker.pickImage(
      source: desdeCamara ? ImageSource.camera : ImageSource.gallery,
      imageQuality: 85,
    );
    if (picked != null) {
      setState(() => _imagen = File(picked.path));
    }
  }

  Future<void> _crearProducto() async {
    if (!_formKey.currentState!.validate()) return;

    final productoProvider = Provider.of<ProductoProvider>(context, listen: false);

    await productoProvider.crearProducto(
      nombre: _nombreController.text,
      descripcion: _descripcionController.text,
      precio: _precioController.text,
      categoriaId: _categoriaIdController.text,
      context: context,
      imagen: _imagen,
    );

    _formKey.currentState!.reset();
    setState(() => _imagen = null);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                  color: Colors.white.withOpacity(0.95),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      Text('Crear Producto', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),

                      TextFormField(
                        controller: _nombreController,
                        decoration: InputDecoration(labelText: 'Nombre'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      TextFormField(
                        controller: _descripcionController,
                        decoration: InputDecoration(labelText: 'Descripción'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      TextFormField(
                        controller: _precioController,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(labelText: 'Precio'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      TextFormField(
                        controller: _categoriaIdController,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(labelText: 'ID de Categoría'),
                        validator: (value) => value!.isEmpty ? 'Campo requerido' : null,
                      ),

                      SizedBox(height: 12),
                      _imagen != null
                          ? Image.file(_imagen!, height: 150)
                          : Text('No se seleccionó imagen'),

                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          IconButton(
                            icon: Icon(Icons.camera_alt),
                            onPressed: () => _seleccionarImagen(true),
                          ),
                          IconButton(
                            icon: Icon(Icons.photo_library),
                            onPressed: () => _seleccionarImagen(false),
                          ),
                        ],
                      ),

                      SizedBox(height: 20),
                      ElevatedButton(
                        onPressed: _crearProducto,
                        child: Text('Crear Producto'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.teal[700],
                          padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        ),
                      )
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
