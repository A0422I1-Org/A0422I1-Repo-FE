import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeEditComponent } from './admin-employee-edit.component';

describe('AdminEmployeeEditComponent', () => {
  let component: AdminEmployeeEditComponent;
  let fixture: ComponentFixture<AdminEmployeeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
