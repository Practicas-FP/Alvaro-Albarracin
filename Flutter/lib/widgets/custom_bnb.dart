import 'package:flutter/material.dart';

class BottomNavBar extends StatefulWidget {
  @override
  Custom_BNB createState() => Custom_BNB();
}

class Custom_BNB extends State<BottomNavBar> {
  int _page = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
        currentIndex: 0,
        selectedItemColor: Colors.white,
        backgroundColor: Color.fromARGB(255, 188, 0, 0),
        unselectedItemColor: Color.fromARGB(255, 255, 174, 174),
        onTap: (index) {
          setState(() {
            _page = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Cuenta"),
        ]);
  }
}
