# Tienda Ecommerce

**Proyecto académico - Primer Parcial de la materia Sistema de Información II**  
**Ingeniera:** Angélica  
**Desarrollador Frontend:** Jorge Choque Calle  
**Desarrollador Backend:** Cristian Gedalge  

---

## Descripción

Este proyecto consiste en una aplicación móvil de e-commerce desarrollada como parte del **primer parcial** de la materia **Sistema de Información II**. La app permite visualizar productos, agregarlos al carrito y realizar una simulación de compra.

---

## Tecnologías Utilizadas

- **Frontend:** Flutter (Dart)
- **Backend (APIs REST):** Python con Django & Django REST Framework
- **Base de Datos:** PostgreSQL (gestionada desde el backend)

---

## Enlace para Descargar el APK

📦 **[Descargar APK de Tienda Ecommerce](.........)**  
> *(Reemplaza este enlace con el real cuando esté disponible en Google Drive o cualquier otro servicio de almacenamiento)*

---

## Recursos Útiles para Empezar

- [Lab: Escribe tu primera app Flutter](https://docs.flutter.dev/get-started/codelab)
- [Cookbook: Ejemplos útiles en Flutter](https://docs.flutter.dev/cookbook)
- [Documentación oficial de Flutter](https://docs.flutter.dev/)

---

## Estructura General
lib/
├── main.dart
├── core/
│   ├── constants/            # Constantes globales como colores, urls, strings
│   ├── theme.dart            # Tema de la app
│   └── routes.dart           # Rutas y navegación
├── models/
│   ├── product_model.dart
│   ├── user_model.dart
│   └── order_model.dart      # (futuro)
├── services/
│   ├── api/                  # Servicios HTTP
│   │   ├── auth_service.dart
│   │   ├── product_service.dart
│   │   └── stripe_service.dart
│   └── local/                # Servicios locales (por ejemplo JWT, token storage)
│       └── storage_service.dart
├── providers/                # Providers para Auth, Carrito, Productos, etc.
│   ├── auth_provider.dart
│   ├── cart_provider.dart
│   └── product_provider.dart
├── views/                    # Pantallas agrupadas por módulo
│   ├── auth/
│   │   ├── login_screen.dart
│   │   ├── register_screen.dart
│   │   └── widgets/          # Componentes visuales de login/register
│   ├── customer/
│   │   ├── home_screen.dart
│   │   ├── cart_screen.dart
│   │   ├── payment_screen.dart
│   │   └── widgets/
│   ├── employee/
│   │   ├── employee_panel_screen.dart
│   │   └── widgets/
│   ├── admin/
│   │   ├── dashboard_screen.dart
│   │   ├── manage_products_screen.dart
│   │   └── widgets/
│   └── shared/               # Pantallas compartidas (perfil, loader, not found...)
│       ├── profile_screen.dart
│       └── splash_screen.dart
├── widgets/                  # Widgets globales y reutilizables
│   ├── custom_button.dart
│   ├── product_card.dart
│   ├── category_card.dart
│   └── sidebar.dart
