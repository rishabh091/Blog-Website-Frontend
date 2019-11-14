import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email;
  password;
  passwordType = "password";

  //variable used for showing alert
  validateUser = true;

  constructor(private service: AppService, private router: Router,private authService: AuthenticationService,private httpClient: HttpClient) {}

  ngOnInit() {
    if(this.service.checkLogin()){
      this.router.navigate(['home']);
    }
  }

  login(){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)){
      this.validateUser=true;
    }
    if(this.validateUser){
      sessionStorage.setItem("email",this.email);

      this.authService.authenticate(this.email,this.password).subscribe(
        data=>{
          this.service.isLoggedIn(true);
          this.router.navigate(['home']);
        },error=>{
          this.validateUser=false;
        });
    }
    else{
      this.validateUser=false;
    }
  }

  showHidePassword() {
    //function responsible for show password functionality
    if (this.passwordType == "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }

  forgetPassword(){
    let url="http://localhost:8080/login/forgetPassword";

    let email={
      "email": this.email
    }
    this.httpClient.post(url,email).subscribe((res:any)=>{
      if(res){
        alert("Mail has been sent to given email");
      }
      else{
        alert("Mail Id not found");
      }
    });
  }
}
