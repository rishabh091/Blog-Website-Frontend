import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AppService, private router: Router) { }

  ngOnInit() {
    if(!this.service.checkLogin()){
      this.router.navigate(["/starter-page"]);
    }
  }

}
