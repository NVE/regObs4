import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class ExternalLinkService {

  constructor(private inAppBrowser: InAppBrowser) { }

  openExternalLink(url: string) {
    this.inAppBrowser.create(url, '_system', 'location=yes,hardwareback=yes');
  }
}
