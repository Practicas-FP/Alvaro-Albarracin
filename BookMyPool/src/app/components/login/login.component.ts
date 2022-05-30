import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public apiService: ApiService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(email: String, password: String) {
    this.apiService.logIn(email, password).subscribe(user => {
      if (user) {
        this.userService.saveUser(user);
        location.reload();
        //this.router.navigate(['devices']);
      }
    });
  }
}
