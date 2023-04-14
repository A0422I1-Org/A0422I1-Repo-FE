import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticalMovieComponent } from './admin-statistical-movie.component';

describe('AdminStatisticalMovieComponent', () => {
  let component: AdminStatisticalMovieComponent;
  let fixture: ComponentFixture<AdminStatisticalMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticalMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticalMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
