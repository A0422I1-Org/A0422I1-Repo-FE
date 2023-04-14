import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMoiveDetailComponent } from './user-moive-detail.component';

describe('UserMoiveDetailComponent', () => {
  let component: UserMoiveDetailComponent;
  let fixture: ComponentFixture<UserMoiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMoiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMoiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
