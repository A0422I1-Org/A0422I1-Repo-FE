import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceiveTicketConfirmationComponent } from './admin-receive-ticket-confirmation.component';

describe('AdminReceiveTicketConfirmationComponent', () => {
  let component: AdminReceiveTicketConfirmationComponent;
  let fixture: ComponentFixture<AdminReceiveTicketConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReceiveTicketConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReceiveTicketConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
