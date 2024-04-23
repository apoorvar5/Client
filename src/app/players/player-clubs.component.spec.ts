import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerClubsComponent } from './player-clubs.component';

describe('PlayerClubsComponent', () => {
  let component: PlayerClubsComponent;
  let fixture: ComponentFixture<PlayerClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerClubsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
