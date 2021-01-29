import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import {
  InAppBrowser,
  InAppBrowserObject
} from '@ionic-native/in-app-browser/ngx';
import { Browser } from 'ionic-appauth';
import { Platform } from '@ionic/angular';
import {
  SAFARI_TINT_COLOR,
  SAFARI_BAR_COLOR,
  SAFARI_TOOLBAR_COLOR,
  SAFARI_CONTROL_TINT_COLOR
} from '../../core/services/external-link/external-link.service';

// REQUIRES CORDOVA PLUGINS
// cordova-plugin-safariviewcontroller
// cordova-plugin-customurlscheme
// cordova-plugin-inappbrowser FROM https://github.com/Onegini/cordova-plugin-inappbrowser.git
export class CordovaBrowser extends Browser {
  constructor(
    private platform: Platform,
    private safariViewController: SafariViewController,
    private inAppBrowser: InAppBrowser
  ) {
    super();
  }

  private inAppBrowserRef: InAppBrowserObject | undefined;

  private async useSafariViewController(): Promise<boolean> {
    const isSafariViewControllerAvailable = await this.safariViewController.isAvailable(); // Also returns true for Android chrome custom tabs
    return this.platform.is('ios') && isSafariViewControllerAvailable;
  }

  public async closeWindow(): Promise<void> {
    if (await this.useSafariViewController()) {
      this.safariViewController.hide();
    } else {
      if (this.inAppBrowserRef != undefined) {
        this.inAppBrowserRef.close();
      }
    }
  }

  public async showWindow(url: string): Promise<string | undefined> {
    if (this.useSafariViewController()) {
      const optionSafari: any = {
        url: url,
        showDefaultShareMenuItem: false,
        tintColor: SAFARI_TINT_COLOR,
        barColor: SAFARI_BAR_COLOR,
        toolbarColor: SAFARI_TOOLBAR_COLOR,
        controlTintColor: SAFARI_CONTROL_TINT_COLOR
      };
      this.safariViewController.show(optionSafari).subscribe((result: any) => {
        if (result.event === 'closed') {
          this.onCloseFunction();
        }
      });
    } else {
      const options: any = {
        location: 'no',
        zoom: 'no',
        clearcache: 'yes',
        clearsessioncache: 'yes'
      };

      this.inAppBrowserRef = this.inAppBrowser.create(url, '_self', options);

      if (this.inAppBrowserRef != undefined) {
        this.inAppBrowserRef.on('exit').subscribe(() => this.onCloseFunction());
      }
    }
    return;
  }
}
