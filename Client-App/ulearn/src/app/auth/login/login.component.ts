import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ITokenparams, IUserLogin} from "../../core/models/IUser";
import {ValidationService} from "../../core/service/validation.service";
import { Router } from "@angular/router";
import { SystemConstant as constants } from "../../shared/constant";
import {DataKeeperService} from "../../core/service/data-keeper.service";
import {AuthService} from "../../core/service/guard/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinform: FormGroup;
  showIcon: boolean;
  loginModel: IUserLogin;
  token: ITokenparams;
  isloggingin: boolean = false;
  notificationType: string;
  notificationMsg: string;
  constructor(private authService:AuthService,private datakeeper:DataKeeperService,private router:Router) { }

  ngOnInit() {
    this.validateFields();
  }

  validateFields() {
    this.signinform = new FormGroup({
      password: new FormControl("", [Validators.required, ValidationService.passwordValidator]),
      email: new FormControl("", Validators.email),
    });
  }

  signinHandle() {
    this.isloggingin = true;
    this.loginModel = this.signinform.value;
    this.authService.authenticate(this.loginModel.email, this.loginModel.password)
        .subscribe((token: ITokenparams) => {
      this.datakeeper.keepData("token", token.AccessToken);
      this.datakeeper.keepData("role", token.Role);
      this.datakeeper.keepData("key", token.Key);
      this.isloggingin = false;
      if (token.Role === constants.LEVEL_ACCESS.u) {
        this.router.navigate(["/applicant/home"]);
      } else if (token.Role === constants.LEVEL_ACCESS.a) {
        alert("it is admin");
        this.router.navigate(["/admin"]);
      } else {
        this.router.navigate(["/login"]);
      }
    }, error => {
      this.notificationType = "error";
      this.notificationMsg = error.error;
      this.isloggingin = false;
    });
  }

}
