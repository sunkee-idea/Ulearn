import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexPageComponent} from "./index-page/index-page.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  {path:'account/signup',component:RegisterComponent},
  {path:'account/signin',component:LoginComponent},
  {path: 'index', component: IndexPageComponent},
  {path: '',component:IndexPageComponent},
  {path: '**',redirectTo:'index',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
