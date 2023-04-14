import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPointHistoryComponent } from './user-point-history.component';

describe('UserPointHistoryComponent', () => {
  let component: UserPointHistoryComponent;
  let fixture: ComponentFixture<UserPointHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPointHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPointHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
