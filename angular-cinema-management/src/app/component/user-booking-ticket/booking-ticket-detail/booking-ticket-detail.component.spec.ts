import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTicketDetailComponent } from './booking-ticket-detail.component';

describe('BookingTicketDetailComponent', () => {
  let component: BookingTicketDetailComponent;
  let fixture: ComponentFixture<BookingTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
