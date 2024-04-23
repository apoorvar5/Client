import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ClubPlayers } from './club-players';

@Component({
  selector: 'app-club-players',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './club-players.component.html',
  styleUrl: './club-players.component.scss'
})

export class ClubPlayersComponent {
  public clubPlayers: ClubPlayers[] = [];
  public displayedColumns : string[] = ['playerId','playerName','playerPos','playerNationality'];
  id: number;
  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getClubPlayers();
      }
      
      getClubPlayers() {
        let idParam = this.activedRoute.snapshot.paramMap.get("id");
        this.id = idParam ? +idParam : 0;
        this.http.get<ClubPlayers[]>(`${environment.baseUrl}api/Clubs/clubPlayers/${this.id}`).subscribe(
          {
            next: result => this.clubPlayers = result,
            error: error => console.log(error)
          }
        );
      }
}