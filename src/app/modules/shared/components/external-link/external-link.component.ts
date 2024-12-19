import { Component, Input, inject } from '@angular/core';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss'],
})
export class ExternalLinkComponent {
  private externalLinkService = inject(ExternalLinkService);

  @Input() src: string;

  openLink(event: Event) {
    event.preventDefault();
    this.externalLinkService.openExternalLink(this.src);
  }
}
