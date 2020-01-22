import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AbonnerBannerComponent } from './abonner-banner.component';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { LoggingService } from '../../../modules/shared/services/logging/logging.service';
import { ConsoleLoggingService } from '../../../modules/shared/services/logging/console-logging.service';

describe('AbonnerBannerComponent', () => {
  let component: AbonnerBannerComponent;
  let fixture: ComponentFixture<AbonnerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnerBannerComponent],
      imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      providers: [
        InAppBrowser,
        SafariViewController,
        { provide: LoggingService, useClass: ConsoleLoggingService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
