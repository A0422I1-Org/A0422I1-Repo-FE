import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReceiveTicketDetailComponent } from './admin-receive-ticket-detail.component';

describe('AdminReceiveTicketDetailComponent', () => {
  let component: AdminReceiveTicketDetailComponent;
  let fixture: ComponentFixture<AdminReceiveTicketDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReceiveTicketDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReceiveTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
