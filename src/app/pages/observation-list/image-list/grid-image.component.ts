import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';

/**
 * Komponent som viser ett bilde i bildesøk. Bør ikke brukes andre steder enn det.
 * Komponenten legger automatisk på en .landscape eller .portrait-klasse som bildesøket
 * kan bruke til å la bildet strekkes over flere rader / kolonner.
 */
@Component({
  selector: 'app-grid-image',
  imports: [],
  template: `
    <img [src]="src()" (load)="setAspectRatioClass($event)" />
    <div>{{ attachment().RegistrationName }}</div>
    <div>
      <i>{{ attachment().Comment }}</i>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  host: {
    '[class]': 'hostClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridImageComponent {
  readonly attachment = input.required<AttachmentViewModel>();

  hostClass = signal<string>('');
  src = computed(() => this.attachment().UrlFormats?.Large);

  setAspectRatioClass($event: Event) {
    const img = $event.target as HTMLImageElement;
    if (img.naturalWidth > img.naturalHeight) {
      this.hostClass.set('landscape');
    } else {
      this.hostClass.set('portrait');
    }
  }
}
