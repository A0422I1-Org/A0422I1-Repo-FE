import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticalMovieTypeComponent } from './admin-statistical-movie-type.component';

describe('AdminStatisticalMovieTypeComponent', () => {
  let component: AdminStatisticalMovieTypeComponent;
  let fixture: ComponentFixture<AdminStatisticalMovieTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticalMovieTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticalMovieTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
