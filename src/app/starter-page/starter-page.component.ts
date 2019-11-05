import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-page',
  templateUrl: './starter-page.component.html',
  styleUrls: ['./starter-page.component.css']
})
export class StarterPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirection(){
    this.router.navigate(["/signup"]);
  }

}
