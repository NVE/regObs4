import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnerBannerComponent } from './abonner-banner.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { TestModule } from '../../../modules/test/test.module';

describe('AbonnerBannerComponent', () => {
  let component: AbonnerBannerComponent;
  let fixture: ComponentFixture<AbonnerBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnerBannerComponent],
      imports: [TestModule],
      providers: [
        InAppBrowser,
        SafariViewController
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
