import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { ExternalLinkService } from '../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss']
})
export class ExternalLinkComponent implements OnInit {

  @Input() src: string;

  constructor(private externalLinkService: ExternalLinkService) { }

  ngOnInit() {
  }

  openLink(event: Event) {
    event.preventDefault();
    this.externalLinkService.openExternalLink(this.src);
  }

}
