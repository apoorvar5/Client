import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Club } from './club';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent {
  public clubs: Club[] = [];

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getCountries();
      }
      
      getCountries() {
        this.http.get<Club[]>(environment.baseUrl + 'api/Clubs').subscribe(
          {
            next: result => this.clubs = result,
            error: error => console.log(error)
          }
        );
      }
}
