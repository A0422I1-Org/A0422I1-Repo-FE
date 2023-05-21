import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountInformationComponent } from './user-account-information.component';

describe('UserAccountInformationComponent', () => {
  let component: UserAccountInformationComponent;
  let fixture: ComponentFixture<UserAccountInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountInformationComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
