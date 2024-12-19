import { IonButton } from '@ionic/angular/standalone';
import { Component, inject } from '@angular/core';
import { ExternalLinkService } from '../../../core/services/external-link/external-link.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-abonner-banner',
  templateUrl: './abonner-banner.component.html',
  styleUrls: ['./abonner-banner.component.scss'],
  imports: [IonButton, TranslatePipe],
})
export class AbonnerBannerComponent {
  private externalLinkService = inject(ExternalLinkService);


  buttonClicked(): void {
    this.externalLinkService.openExternalLink('https://abonner.varsom.no');
  }
}
