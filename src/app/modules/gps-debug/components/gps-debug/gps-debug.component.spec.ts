import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GpsDebugComponent } from './gps-debug.component';
import { TestModule } from '../../../test/test.module';

xdescribe('GpsDebugComponent', () => {
  let component: GpsDebugComponent;
  let fixture: ComponentFixture<GpsDebugComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GpsDebugComponent],
        imports: [TestModule]
      }).compileComponents();

      fixture = TestBed.createComponent(GpsDebugComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
