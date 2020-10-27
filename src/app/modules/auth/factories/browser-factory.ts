import { Platform } from '@ionic/angular';
import { DefaultBrowser } from 'ionic-appauth';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CordovaBrowser } from '../cordova-browser';

export const browserFactory = (platform: Platform, safariViewController: SafariViewController, inAppBrowser: InAppBrowser) => {
  return platform.is('cordova') ? new CordovaBrowser(platform, safariViewController, inAppBrowser) : new DefaultBrowser();
};