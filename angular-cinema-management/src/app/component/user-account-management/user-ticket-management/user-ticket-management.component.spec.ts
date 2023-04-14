import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketManagementComponent } from './user-ticket-management.component';

describe('UserTicketManagementComponent', () => {
  let component: UserTicketManagementComponent;
  let fixture: ComponentFixture<UserTicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTicketManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
