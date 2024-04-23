import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Player } from './player';
import { environment } from '../../environments/environment.development';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  public players: Player[] = [];

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getCountries();
      }
      
      getCountries() {
        this.http.get<Player[]>(environment.baseUrl + 'api/Players').subscribe(
          {
            next: result => this.players = result,
            error: error => console.log(error)
          }
        );
      }
}
