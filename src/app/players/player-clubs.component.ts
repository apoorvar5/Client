import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { PlayerClubs } from './player-clubs';

@Component({
  selector: 'app-player-clubs',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './player-clubs.component.html',
  styleUrl: './player-clubs.component.scss'
})
export class PlayerClubsComponent {
  public playerClubs: PlayerClubs[] = [];
  public displayedColumns : string[] = ['clubId','clubName','clubLeague','clubCountry'];
  id: number;
  constructor(private http: HttpClient, private activedRoute : ActivatedRoute){
    this.id = -1;
  }

      ngOnInit(){
        this.getPlayerClubs();
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
