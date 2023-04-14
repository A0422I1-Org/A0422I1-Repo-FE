import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMoiveListComponent } from './user-moive-list.component';

describe('UserMoiveListComponent', () => {
  let component: UserMoiveListComponent;
  let fixture: ComponentFixture<UserMoiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMoiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMoiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
