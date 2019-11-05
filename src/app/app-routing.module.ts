import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StarterPageComponent } from './starter-page/starter-page.component';


const routes: Routes = [{path: "login", component: LoginComponent},
{path: "signup", component: SignupComponent},
{path: "home", component: HomeComponent},
{path: "home/user-details", component: UserDetailsComponent},
{path: "starter-page", component: StarterPageComponent},
{path: '', redirectTo: "/home", pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
