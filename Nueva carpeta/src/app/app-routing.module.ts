import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from './pelis/main/main.component';
import { DetalleComponent } from './pelis/detalle/detalle.component';
import { ErrorComponent } from './pelis/resultados/404.component';
import { LoginComponent } from './pelis/sesion/login.component';
import { SiginComponent } from './pelis/sesion/sigin.component';
import { ProfileComponent } from './pelis/sesion/profile.component';

const routes: Routes = [

    {
        path: "",
        component: MainComponent,
        pathMatch: "full"
    },

    {
        path: "detalle/:id",
        component: DetalleComponent,
    },

    {
        path: "login",
        component: LoginComponent,
    },

    {
        path: "sigin",
        component: SiginComponent,
    },
    {
        path: "profile",
        component: ProfileComponent,
    },
    {
        path: "**",
        component: ErrorComponent,
        
    }

]

@NgModule({
    imports: [
        RouterModule.forRoot( routes )

    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}