import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Player } from './player';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface NewPlayer {
  playerName: string;
  playerPos: string;
  playerNationality: string;
}

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent {
  public players: Player[] = [];
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newPlayer: NewPlayer = {
    playerName: '',
    playerPos: '',
    playerNationality: '',
  }

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getPlayers();
      }
      
      displayAddPlayerForm(): void {
        this.showForm = true;
        this.showIncompleteFieldsError = false;
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
      
        this.http.post(environment.baseUrl + 'api/Players', formData).subscribe({
          next: () => {
            this.getPlayers();
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

      getPlayers() {
        this.http.get<Player[]>(environment.baseUrl + 'api/Players').subscribe(
          {
            next: result => this.players = result,
            error: error => console.log(error)
          }
        );
      }
}
