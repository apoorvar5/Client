import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { PlayersComponent } from './players/players.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubPlayersComponent } from './clubs/club-players.component';
import { PlayerClubsComponent } from './players/player-clubs.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'},
    {path : 'players', component : PlayersComponent},
    {path : 'clubs', component : ClubsComponent},
    {path: 'clubplayers/:id', component : ClubPlayersComponent},
    {path: 'playerclubs/:id', component: PlayerClubsComponent},
    {path: 'login', component: LoginComponent},
];