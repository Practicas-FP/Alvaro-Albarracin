import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetallePage } from './detalle/detalle.page';
import { LoginPage } from './sesion/login.page';
import { SiginPage } from './sesion/sigin.page';
import { LogoutPage } from './sesion/logout.page';
import { ProfilePage } from './sesion/profile.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: "detalle/:id",
    component: DetallePage,
},
  {
    path: 'login',
    component: LoginPage,
  },
  { 
    path: 'sigin',
    component: SiginPage,
},
  { 
    path: 'logout',
    component: LogoutPage,
  },
  { 
    path: 'profile',
    component: ProfilePage,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
