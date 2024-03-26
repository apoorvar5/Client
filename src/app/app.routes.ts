import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { PlayersComponent } from './players/players.component';
import { ClubsComponent } from '../clubs/clubs.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'},
    {path : 'players', component : PlayersComponent},
    {path : 'clubs', component : ClubsComponent},
];