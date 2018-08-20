import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../core/service/validation.service";
import {ServerService} from "../../core/service/server.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupform:FormGroup;
  states:any = [];
  constructor(private apiService:ServerService) {
      this.getCountries();
  }

  ngOnInit() {
    this.validateField();

  }
    getCountries(){
        this.apiService.getCountry().subscribe((res)=>{
            this.states = res;
            console.log(this.states);
        },error=>{
            console.log(error);
        })
    }
  validateField(){
    this.signupform = new FormGroup({
          firstName: new FormControl("", Validators.required),
          lastName: new FormControl("", Validators.required),
          phone: new FormControl("", Validators.required),
          password: new FormControl("", [Validators.required,ValidationService.passwordValidator]),
          email: new FormControl("", [Validators.email,Validators.required]),
        });

  }
}
