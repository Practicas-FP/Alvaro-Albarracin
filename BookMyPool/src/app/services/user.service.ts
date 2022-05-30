import { Injectable } from '@angular/core';
import { UserData } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUser(user: UserData) {
    localStorage.setItem('logged', '1');
    localStorage.setItem('id', user.id.toString());
    localStorage.setItem('firstName', user.firstName.toString());
    localStorage.setItem('lastName', user.lastName.toString());
    localStorage.setItem('email', user.email.toString());
  }

  getUser(): UserData {
    return {
      id: Number(localStorage.getItem('id')!),
      email: localStorage.getItem('email')!,
      firstName: localStorage.getItem('firstName')!,
      lastName: localStorage.getItem('lastName')!,
      password: ''
    };
  }

  getLogged(): boolean {
    return localStorage.getItem('logged') ? true : false;
  }

  clearUser() {
    localStorage.clear();
  }
}
