import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMovieDetailComponent } from './user-movie-detail.component';

describe('UserMoiveDetailComponent', () => {
  let component: UserMovieDetailComponent;
  let fixture: ComponentFixture<UserMovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMovieDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
