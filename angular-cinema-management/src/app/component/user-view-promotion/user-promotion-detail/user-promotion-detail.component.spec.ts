import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromotionDetailComponent } from './user-promotion-detail.component';

describe('UserPromotionDetailComponent', () => {
  let component: UserPromotionDetailComponent;
  let fixture: ComponentFixture<UserPromotionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPromotionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPromotionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
