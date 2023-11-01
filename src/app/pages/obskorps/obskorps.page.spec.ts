import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObskorpsPage } from './obskorps.page';

describe('ObskorpsPage', () => {
  let component: ObskorpsPage;
  let fixture: ComponentFixture<ObskorpsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObskorpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
