import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Club } from './club';
import { FormsModule } from '@angular/forms';

interface NewClub {
  clubName: string;
  clubLeague: string;
  clubCountry: string;
}

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent {
  public clubs: Club[] = [];
  public showForm: boolean = false;
  public showIncompleteFieldsError: boolean = false;
  public newClub: NewClub = {
    clubName: '',
    clubLeague: '',
    clubCountry: '',
  }

  constructor(private http: HttpClient){}

      ngOnInit(){
        this.getClubs();
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
      
        this.http.post(environment.baseUrl + 'api/Clubs', formData).subscribe({
          next: () => {
            this.getClubs();
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

      getClubs() {
        this.http.get<Club[]>(environment.baseUrl + 'api/Clubs').subscribe(
          {
            next: result => this.clubs = result,
            error: error => console.log(error)
          }
        );
      }
}
