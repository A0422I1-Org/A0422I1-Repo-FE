import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairSelectionComponent } from './chair-selection.component';

describe('ChairSelectionComponent', () => {
  let component: ChairSelectionComponent;
  let fixture: ComponentFixture<ChairSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChairSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
