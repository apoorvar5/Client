import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { PlayerClubs } from './player-clubs';
import { FormsModule } from '@angular/forms';

interface NewClub {
  clubName: string;
  clubLeague: string;
  clubCountry: string;
}

@Component({
  selector: 'app-player-clubs',
  standalone: true,
  imports: [MatTableModule, FormsModule],
  templateUrl: './player-clubs.component.html',
  styleUrl: './player-clubs.component.scss'
})
export class PlayerClubsComponent {
  public playerClubs: PlayerClubs[] = [];
  public displayedColumns : string[] = ['clubId','clubName','clubLeague','clubCountry'];
  id: number;
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newClub: NewClub = {
    clubName: '',
    clubLeague: '',
    clubCountry: '',
  }

  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getPlayerClubs();
      }

      displayAddClubForm(): void {
        this.showForm = true;
      }

      addNewClub(): void {
        if (!this.newClub.clubName || !this.newClub.clubLeague || !this.newClub.clubCountry) {
          this.showIncompleteFieldsError = true;
          return;
        }
        const formData = new FormData();
        formData.append('clubName', this.newClub.clubName);
        formData.append('clubLeague', this.newClub.clubLeague);
        formData.append('clubCountry', this.newClub.clubCountry);
      
        this.http.post(environment.baseUrl + 'api/Players/'+this.id+'/AddClub', formData).subscribe({
          next: () => {
            this.getPlayerClubs();
            this.showForm = false;
            this.newClub = {
              clubName: '',
              clubLeague: '',
              clubCountry: '',
            };
          },
          error: (error) => console.error(error),
        });
      }
    
      cancelForm(){
        this.showForm = false;
        this.newClub = {
          clubName: '',
          clubLeague: '',
          clubCountry: '',
        };
      }

      
      getPlayerClubs() {
        let idParam = this.activedRoute.snapshot.paramMap.get("id");
        this.id = idParam ? +idParam : 0;
        this.http.get<PlayerClubs[]>(`${environment.baseUrl}api/Players/PlayerClubs/${this.id}`).subscribe(
          {
            next: result => this.playerClubs = result,
            error: error => console.log(error)
          }
        );
      }
}
