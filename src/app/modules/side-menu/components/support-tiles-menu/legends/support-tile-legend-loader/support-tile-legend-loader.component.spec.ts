import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTileLegendLoaderComponent } from './support-tile-legend-loader.component';

describe('SupportTileLegendLoaderComponent', () => {
  let component: SupportTileLegendLoaderComponent;
  let fixture: ComponentFixture<SupportTileLegendLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTileLegendLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTileLegendLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
