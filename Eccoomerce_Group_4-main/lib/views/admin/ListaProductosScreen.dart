// Muestra la lista general con botón de eliminar y actualizar
import 'package:flutter/material.dart';
import 'producto_item_card.dart';
import 'editar_producto_dialog.dart';
import 'confirmar_eliminacion_dialog.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../../utils/api_server.dart';

class ListaProductosScreen extends StatefulWidget {
  @override
  _ListaProductosScreenState createState() => _ListaProductosScreenState();
}

class _ListaProductosScreenState extends State<ListaProductosScreen> {
  List productos = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchProductos();
  }

  // Carga productos desde tu API
  Future<void> fetchProductos() async {
    final url = Uri.parse('${ApiServer.baseUrl}/producto/');
    final res = await http.get(url);

    if (res.statusCode == 200) {
      setState(() {
        productos = jsonDecode(res.body);
        isLoading = false;
      });
    } else {
      setState(() => isLoading = false);
      print('Error al cargar productos: ${res.body}');
    }
  }

  void eliminarProducto(int id) async {
    final url = Uri.parse('${ApiServer.baseUrl}/producto/eliminar/');
    final res = await http.put(url, body: jsonEncode({'producto_id': id}), headers: {'Content-Type': 'application/json'});

    if (res.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Producto eliminado')));
      fetchProductos();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error al eliminar')));
    }
  }

  void mostrarDialogoEliminar(int id) {
    showDialog(
      context: context,
      builder: (_) => ConfirmarEliminacionDialog(
        onConfirmar: () {
          eliminarProducto(id);
          Navigator.pop(context);
        },
      ),
    );
  }

  void mostrarDialogoEditar(Map producto) async {
    showDialog(
      context: context,
      builder: (_) => EditarProductoDialog(
        producto: producto,
        onProductoActualizado: fetchProductos,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              padding: EdgeInsets.all(12),
              itemCount: productos.length,
              itemBuilder: (context, index) {
                final producto = productos[index];
                return ProductoItemCard(
                  producto: producto,
                  onEditar: () => mostrarDialogoEditar(producto),
                  onEliminar: () => mostrarDialogoEliminar(producto['id']),
                );
              },
            ),
    );
  }
}
