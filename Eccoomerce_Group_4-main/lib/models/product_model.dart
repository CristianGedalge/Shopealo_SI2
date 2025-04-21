class ProductModel {
  final String id;
  final String name;
  final double price;
  final String brand;
  final String category;

  ProductModel({required this.id, required this.name, required this.price, required this.brand, required this.category});

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'],
      name: json['name'],
      price: double.parse(json['price'].toString()),
      brand: json['brand'],
      category: json['category'],
    );
  }
}
