import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppService } from '../app.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  firstName;
  lastName;
  userName;
  email;
  mobile;
  password;
  bio;

  constructor(private httpClient: HttpClient, private router: Router,private service: AppService) {}

  ngOnInit() {
    if (this.service.checkLogin()) {
      this.router.navigate(["home"]);
    }
  }

  signIn() {
    if (
      this.firstName != undefined &&
      this.firstName != " " &&
      (this.lastName != undefined && this.lastName != " ") &&
      (this.userName != undefined && this.userName != " ") &&
      (this.email != undefined && this.email != " ") &&
      (this.mobile != undefined && this.mobile != " ") &&
      (this.password != undefined && this.password != " ")
    ) {
      let url = "http://localhost:8080/signup/sendingData";
      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
        email: this.email,
        mobile: this.mobile,
        password: this.password,
        bio: this.bio
      };

      this.httpClient.post(url, user).subscribe((res: any) => {
        if (res) {
          this.router.navigate(["/login"]);
        } else {
          alert("User already exist.");
        }
      });
    } else {
      alert("All fields are neccesary.");
    }
  }

  moveToHome() {
    this.router.navigate(["/home"]);
  }
}
