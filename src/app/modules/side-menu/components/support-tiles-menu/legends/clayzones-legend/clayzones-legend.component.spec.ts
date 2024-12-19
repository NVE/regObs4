import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClayzonesLegendComponent } from './clayzones-legend.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ClayzonesLegendComponent', () => {
  let component: ClayzonesLegendComponent;
  let fixture: ComponentFixture<ClayzonesLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClayzonesLegendComponent, TranslateModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClayzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
