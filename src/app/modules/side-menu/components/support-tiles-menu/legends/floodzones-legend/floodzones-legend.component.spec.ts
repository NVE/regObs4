import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FloodzonesLegendComponent } from './floodzones-legend.component';
import { TestModule } from '../../../../../test/test.module';

describe('FloodzonesLegendComponent', () => {
  let component: FloodzonesLegendComponent;
  let fixture: ComponentFixture<FloodzonesLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [FloodzonesLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloodzonesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
