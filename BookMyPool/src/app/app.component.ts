import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserData } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookMyPool';
  public user: UserData;
  public uid: string = "guess";
  public profession: string = 'Not registered';
  public userName: any;
  public userName3: any[] | any;
  public userName2: any;
  public userPhoto: any;
  public loginPageCheck: boolean = true;
  public hidden = false;
  public appointmentsTotal: number = 0;


  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private route: Router, public userService: UserService) {
    this.user = userService.getUser();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  logOut() {
    this.userService.clearUser();
    location.reload();
  }
}
