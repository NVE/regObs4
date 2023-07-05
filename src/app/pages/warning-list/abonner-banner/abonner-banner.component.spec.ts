import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbonnerBannerComponent } from './abonner-banner.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SafariViewController } from '@awesome-cordova-plugins/safari-view-controller/ngx';
import { TestModule } from '../../../modules/test/test.module';

describe('AbonnerBannerComponent', () => {
  let component: AbonnerBannerComponent;
  let fixture: ComponentFixture<AbonnerBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AbonnerBannerComponent],
      imports: [TestModule],
      providers: [InAppBrowser, SafariViewController],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
