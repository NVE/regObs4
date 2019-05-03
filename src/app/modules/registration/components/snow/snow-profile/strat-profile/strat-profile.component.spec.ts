import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StratProfileComponent } from './strat-profile.component';

describe('StratProfileComponent', () => {
  let component: StratProfileComponent;
  let fixture: ComponentFixture<StratProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StratProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StratProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
