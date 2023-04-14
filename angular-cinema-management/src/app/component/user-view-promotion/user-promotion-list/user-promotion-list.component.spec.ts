import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPromotionListComponent } from './user-promotion-list.component';

describe('UserPromotionListComponent', () => {
  let component: UserPromotionListComponent;
  let fixture: ComponentFixture<UserPromotionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPromotionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPromotionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
