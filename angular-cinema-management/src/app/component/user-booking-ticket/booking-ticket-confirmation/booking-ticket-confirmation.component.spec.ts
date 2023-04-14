import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTicketConfirmationComponent } from './booking-ticket-confirmation.component';

describe('BookingTicketConfirmationComponent', () => {
  let component: BookingTicketConfirmationComponent;
  let fixture: ComponentFixture<BookingTicketConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingTicketConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTicketConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
