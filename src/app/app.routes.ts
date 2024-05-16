import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { PlayersComponent } from './players/players.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubPlayersComponent } from './clubs/club-players.component';
import { PlayerClubsComponent } from './players/player-clubs.component';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {path : '', component : HelloComponent, pathMatch : 'full'},
    {path : 'callback', component : CallbackComponent},
    {path : 'players', component : PlayersComponent},
    {path : 'clubs', component : ClubsComponent},
    {path: 'clubplayers/:id', component : ClubPlayersComponent},
    {path: 'playerclubs/:id', component: PlayerClubsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path : 'chat', component : ChatComponent},
];