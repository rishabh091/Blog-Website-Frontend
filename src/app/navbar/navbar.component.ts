import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //checks whether its homepage or not
  @Input() homepageActive;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private service: AppService,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    let logoutUrl="http://localhost:8080/login/logout";

    if (this.service.checkLogin()) {
      this.authService.logoutService();

      this.httpClient.get(logoutUrl).subscribe(res => {
        console.log(JSON.stringify(res));
      });

      location.reload();
      this.router.navigate(["/starterPage"]);
    }
    else{
      console.log("Login first");
    }
  }

  checkLogin() {
    return this.service.checkLogin();
  }

}
