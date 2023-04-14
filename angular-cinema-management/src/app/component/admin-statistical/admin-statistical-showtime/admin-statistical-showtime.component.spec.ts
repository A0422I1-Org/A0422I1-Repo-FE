import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticalShowtimeComponent } from './admin-statistical-showtime.component';

describe('AdminStatisticalShowtimeComponent', () => {
  let component: AdminStatisticalShowtimeComponent;
  let fixture: ComponentFixture<AdminStatisticalShowtimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticalShowtimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticalShowtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
