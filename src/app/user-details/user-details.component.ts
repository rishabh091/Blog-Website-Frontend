import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  firstName;
  lastName;
  userName;
  email;
  mobile;
  password;
  bio;

  constructor(private httpClient: HttpClient,private service: AppService,private router: Router) { }

  ngOnInit() {
    if(!this.service.checkLogin()){
      this.router.navigate(["/starter-page"]);
    }
    this.getUserInfo();
  }

  getUserInfo(){
    console.log("getting user info..");
    let url="http://localhost:8080/login/getProfile";
    this.httpClient.get(url).subscribe((res:any)=>{
      this.firstName=res.firstName;
      this.lastName=res.lastName;
      this.userName=res.userName;
      this.email=res.email;
      this.mobile=res.mobile;
      this.password=res.password;
      this.bio=res.bio;
    });
  }

}
