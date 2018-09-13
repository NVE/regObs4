import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTilesMenuComponent } from './support-tiles-menu.component';

describe('SupportTilesMenuComponent', () => {
  let component: SupportTilesMenuComponent;
  let fixture: ComponentFixture<SupportTilesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTilesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTilesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
