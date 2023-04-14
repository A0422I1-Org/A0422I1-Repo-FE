import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatisticalCustomerComponent } from './admin-statistical-customer.component';

describe('AdminStatisticalCustomerComponent', () => {
  let component: AdminStatisticalCustomerComponent;
  let fixture: ComponentFixture<AdminStatisticalCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatisticalCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatisticalCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
