import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SteepnessCommonLegendComponent } from './steepness-common-legend.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

describe('SteepnessCommonLegendComponent', () => {
  let component: SteepnessCommonLegendComponent;
  let fixture: ComponentFixture<SteepnessCommonLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideIonicAngular()],
      imports: [SteepnessCommonLegendComponent, TranslateModule.forRoot()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteepnessCommonLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
