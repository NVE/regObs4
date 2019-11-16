import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GpsDebugComponent } from './gps-debug.component';

describe('GpsDebugComponent', () => {
  let component: GpsDebugComponent;
  let fixture: ComponentFixture<GpsDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsDebugComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GpsDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
