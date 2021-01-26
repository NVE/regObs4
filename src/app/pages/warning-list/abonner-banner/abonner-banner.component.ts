import { Component, OnInit } from '@angular/core';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-abonner-banner',
  templateUrl: './abonner-banner.component.html',
  styleUrls: ['./abonner-banner.component.scss']
})
export class AbonnerBannerComponent implements OnInit {
  constructor(private externalLinkService: ExternalLinkService) {}

  ngOnInit() {}

  buttonClicked() {
    this.externalLinkService.openExternalLink('https://abonner.varsom.no');
  }
}
