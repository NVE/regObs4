import { Component } from '@angular/core';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-abonner-banner',
  templateUrl: './abonner-banner.component.html',
  styleUrls: ['./abonner-banner.component.scss']
})
export class AbonnerBannerComponent {
  constructor(private externalLinkService: ExternalLinkService) {}

  buttonClicked(): void {
    this.externalLinkService.openExternalLink('https://abonner.varsom.no');
  }
}
