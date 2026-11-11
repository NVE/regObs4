import { Component, inject, input, ChangeDetectionStrategy, computed } from '@angular/core';
import { ExternalLinkService } from '../../../../core/services/external-link/external-link.service';

@Component({
  selector: 'app-external-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss'],
})
export class ExternalLinkComponent {
  private externalLinkService = inject(ExternalLinkService);

  readonly src = input.required<string>();

  /**
   * EnsureCorrectUrl legger til http om det ikke er med fra før av
   */
  readonly httpSrc = computed(() => this.externalLinkService.ensureCorrectUrl(this.src()));

  openLink(event: Event) {
    event.preventDefault();
    this.externalLinkService.openExternalLink(this.src());
  }
}
