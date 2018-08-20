import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServerService} from "./core/service/server.service";
import {AuthService} from "./core/service/guard/auth.service";
import {AuthInterceptor} from "./core/interceptors/AuthInterceptor";
import {HTTP_INTERCEPTORS,HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./core/service/guard/auth-gaurd.service";
import {DataKeeperService} from "./core/service/data-keeper.service";
import {RoleGuardService} from "./core/service/guard/role-gaurd.service";
import {ErrorHandler} from "./core/common/ErrorHandler";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    AppRoutingModule

  ],
  providers: [
      ServerService,
      AuthService,
      AuthGuardService,
      DataKeeperService,
      RoleGuardService,
    { provide: ErrorHandler, useClass: ErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
