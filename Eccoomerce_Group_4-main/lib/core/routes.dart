import 'package:flutter/material.dart';
import '../views/auth/login_screen.dart';
import '../views/auth/register_screen.dart';
import '../views/customer/home_screen.dart';
import '../views/customer/cart_screen.dart';
import '../views/customer/payment_screen.dart';
import '../views/admin/dashboard_screen.dart';
import '../views/admin/manage_products_screen.dart';
import '../views/employee/employee_panel_screen.dart';

Map<String, WidgetBuilder> appRoutes = {
  '/login': (_) => LoginScreen(),
  '/register': (_) => RegisterScreen(),
  '/home': (_) => HomeScreen(),
  '/cart': (_) => CartScreen(),
  '/payment': (_) => PaymentScreen(),
  '/admin': (_) => AdminDashboardScreen(),
  '/manage-products': (_) => ManageProductsScreen(),
  '/employee': (_) => EmployeePanelScreen(),
};
