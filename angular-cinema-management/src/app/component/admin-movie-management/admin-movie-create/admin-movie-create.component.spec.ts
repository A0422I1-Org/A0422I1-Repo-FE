import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieCreateComponent } from './admin-movie-create.component';

describe('AdminMovieCreateComponent', () => {
  let component: AdminMovieCreateComponent;
  let fixture: ComponentFixture<AdminMovieCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMovieCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMovieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
