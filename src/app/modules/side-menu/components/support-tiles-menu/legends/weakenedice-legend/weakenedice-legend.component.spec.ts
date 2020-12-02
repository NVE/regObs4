import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WeakenediceLegendComponent } from './weakenedice-legend.component';
import { TestModule } from '../../../../../test/test.module';

describe('WeakenediceLegendComponent', () => {
  let component: WeakenediceLegendComponent;
  let fixture: ComponentFixture<WeakenediceLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [WeakenediceLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeakenediceLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
