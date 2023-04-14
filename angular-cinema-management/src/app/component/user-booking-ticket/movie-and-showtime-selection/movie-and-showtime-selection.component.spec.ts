import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAndShowtimeSelectionComponent } from './movie-and-showtime-selection.component';

describe('MovieAndShowtimeSelectionComponent', () => {
  let component: MovieAndShowtimeSelectionComponent;
  let fixture: ComponentFixture<MovieAndShowtimeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAndShowtimeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAndShowtimeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
