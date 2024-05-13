import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloComponent } from "./hello/hello.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      HelloComponent, 
      NavBarComponent, 
    ],
})
export class AppComponent implements OnInit{
  constructor(private authService : AuthService){

  }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      }
      else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    });
  }

  logout() : void{
    
  }
  title = 'WeatherClient'; 
}