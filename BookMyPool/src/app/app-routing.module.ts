import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './components/devices/devices.component';
import { HistoryDeviceComponent } from './components/history-device/history-device.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './interceptors/auth.guard';
import { NoAuthGuard } from './interceptors/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/devices', pathMatch: 'full'},
  { path: 'devices', component: DevicesComponent, canActivate: [AuthGuard] },
  { path: 'history-device/:id', component: HistoryDeviceComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
