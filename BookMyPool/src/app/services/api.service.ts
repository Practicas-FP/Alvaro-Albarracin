import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookData } from '../models/book';
import { DevicesData } from '../models/device';
import { UserData } from '../models/user';
import { BrandData } from '../models/brand';
import * as CryptoJS from 'crypto-js';
import { EmployeeData } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'https://book-my-pool.herokuapp.com/bookmypool';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<DevicesData[]> {
    return this.http.get<DevicesData[]>(`${this.baseUrl}/device`);
  }

  getBooks(): Observable<BookData[]> {
    return this.http.get<BookData[]>(`${this.baseUrl}/lend`);
  }

  getBrands(): Observable<BrandData[]> {
    return this.http.get<BrandData[]>(`${this.baseUrl}/brand`);
  }

  getEmployee(): Observable<EmployeeData[]> {
    return this.http.get<EmployeeData[]>(`${this.baseUrl}/employee`);
  }

  getBrand(): Observable<BrandData[]> {
    return this.http.get<BrandData[]>(`${this.baseUrl}/brand`);
  }

  getDevice(id: Number): Observable<DevicesData> {
    return this.http.get<DevicesData>(`${this.baseUrl}/device/${id}`);
  }

  getHistoryDevice(id: Number): Observable<BookData[]> {
    return this.http.get<BookData[]>(`${this.baseUrl}/lend/record/bydevice/${id}`);
  }

  getEmployeeById(id: Number): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`${this.baseUrl}/employee/${id}`);
  }

  putDevice(device: DevicesData) {
    const body = JSON.stringify(device);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.put<DevicesData>(`${this.baseUrl}/device/${device.id}`, body, httpOptions)
      .subscribe(res => console.log(`Device put: ${res}`));
  }

  postDevice(device: DevicesData) {
    const body = JSON.stringify(device);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<DevicesData>(`${this.baseUrl}/device`, body, httpOptions)
      .subscribe(res => console.log(`Device post: ${res}`));
  }

  deleteDevice(id: Number) {
    this.http.delete(`${this.baseUrl}/device/${id}`)
      .subscribe(res => console.log(`Device delete: ${res}`));
  }

  bookDevice(book: BookData) {
    const body = JSON.stringify(book);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<BookData>(`${this.baseUrl}/lend/lenddevice`, body, httpOptions)
      .subscribe(res => console.log(`Book post: ${res}`));
  }

  returnDevice(id: Number) {
    this.http.post<DevicesData>(`${this.baseUrl}/lend/returndevice/${id}`, { })
      .subscribe(res => {console.log(`Device returned: ${res}`)});
  }

  logIn(email: String, password: String): Observable<UserData> {
    const body = {
      'email': email,
      'password': CryptoJS.SHA256(password.trim().toString()).toString()
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<UserData>(`${this.baseUrl}/login`, body, httpOptions);
  }
}
