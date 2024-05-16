import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ClubPlayers } from './club-players';
import { FormsModule } from '@angular/forms';

interface NewPlayer {
  playerName: string;
  playerPos: string;
  playerNationality: string;
}

@Component({
  selector: 'app-club-players',
  standalone: true,
  imports: [MatTableModule, FormsModule],
  templateUrl: './club-players.component.html',
  styleUrl: './club-players.component.scss'
})

export class ClubPlayersComponent {
  public clubPlayers: ClubPlayers[] = [];
  public displayedColumns : string[] = ['playerId','playerName','playerPos','playerNationality'];
  id: number;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newPlayer: NewPlayer = {
    playerName: '',
    playerPos: '',
    playerNationality: '',
  }

  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getClubPlayers();
      }
      
      displayAddPlayerForm(): void {
        this.showForm = true;
      }

      addNewPlayer(): void {
        if (!this.newPlayer.playerName || !this.newPlayer.playerPos || !this.newPlayer.playerNationality) {
          this.showIncompleteFieldsError = true;
          return;
        }
        const formData = new FormData();
        formData.append('playerName', this.newPlayer.playerName);
        formData.append('playerPos', this.newPlayer.playerPos);
        formData.append('playerNationality', this.newPlayer.playerNationality);
      
        this.http.post(environment.baseUrl + 'api/Clubs'+ this.id +'/AddPlayer', formData).subscribe({
          next: () => {
            this.getClubPlayers();
            this.showForm = false;
            this.newPlayer = {
              playerName: '',
              playerPos: '',
              playerNationality: '',
            };
          },
          error: (error) => console.error(error),
        });
      }
    
      cancelForm(){
        this.showForm = false;
        this.newPlayer = {
          playerName: '',
          playerPos: '',
          playerNationality: '',
        };
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