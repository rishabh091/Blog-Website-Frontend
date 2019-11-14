import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  blogs = [];
  searchResults = [];
  likedBlogs = [];
  friendBlog = [];

  disliked = "https://image.flaticon.com/icons/svg/149/149217.svg";
  liked = "https://image.flaticon.com/icons/svg/148/148836.svg";
  searchElement = false;
  selectCategory = false;

  category = [];

  recentBlog;

  constructor(
    private service: AppService,
    private router: Router,
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (!this.service.checkLogin()) {
      this.router.navigate(["/starter-page"]);
    }
    this.getBlogs();
    this.getCategory();
    this.getFriendBlog();
  }

  getCategory() {
    let url = "http://localhost:8080/blog/getCategory";
    let headers = this.authService.addHeader();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.category = res;
    });
  }

  getFriendBlog() {
    let url = "http://localhost:8080/blog/getBlogFromFollowing";
    let headers = this.authService.addHeader();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.friendBlog = res;
      console.log("Friends Blog : " + this.friendBlog);
    });
  }

  getBlogs() {
    let url = "http://localhost:8080/blog/recent";
    let headers = this.authService.addHeader();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.blogs = res;

      console.log(this.category);
      this.getLikedBlogs();
    });
  }

  getSearchData($event) {
    this.blogs = $event;
    this.searchElement = true;
  }

  setLikesAndDislikes() {
    for (let i = 0; i < this.likedBlogs.length; i++) {
      if (this.likedBlogs[i].blog.blogId != null) {
        var element=document.getElementById(this.likedBlogs[i].blog.blogId);
          if(element != null){
            element.setAttribute("src", this.liked);
          }
      }
    }
  }

  getLikedBlogs() {
    let url = "http://localhost:8080/blog/getLikedBlogs";
    let headers = this.authService.addHeader();
    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      this.likedBlogs = res;
      console.log(this.likedBlogs);
      this.setLikesAndDislikes();
      console.log(res);
    });
  }

  likeBlog(id) {
    var element = document.getElementById(id);

    let url = "http://localhost:8080/blog/like/" + id;
    let headers = this.authService.addHeader();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      console.log(res);

      if (res) {
        element.setAttribute("src", this.liked);
      } else {
        element.setAttribute("src", this.disliked);
      }
      this.getBlogs();
    });
  }

  remove(id) {
    document.getElementById(id).style.display = "none";
  }

  searchByCategory(i) {
    let url = "http://localhost:8080/blog/search/" + i;
    let headers = this.authService.addHeader();

    this.httpClient.get(url, { headers }).subscribe((res: any) => {
      console.log(res);
      this.blogs = res;
      this.selectCategory = true;
    });
  }
}
