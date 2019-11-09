import { Component, OnInit, Input } from '@angular/core';
import { ISummaryItem } from './summary-item.model';
import { NavController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {

  @Input() item: ISummaryItem;
  @Input() readonly = false;

  constructor(
    private navController: NavController, 
    private webView: WebView,
    private domSanitizer: DomSanitizer
    ) { }

  async ngOnInit() {

  }

  isBase64Image(img: string) {
    return img && img.startsWith('data:image');
  }

  convertFileSrc(fileUrl: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(
      this.webView.convertFileSrc(fileUrl));
  }

  navigate(event: CustomEvent) {
    if (!this.readonly) {
      this.navController.navigateForward([this.item.href, this.item.id], {
        queryParams: this.item.queryParams
      });
    }
  }
}
