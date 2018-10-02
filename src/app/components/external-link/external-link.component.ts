import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss']
})
export class ExternalLinkComponent implements OnInit {

  @Input() src: string;

  constructor(private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
  }

  openLink(event: Event) {
    event.preventDefault();
    const iap = this.inAppBrowser.create(this.src, '_system');
    iap.show();
  }

}
