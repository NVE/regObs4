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
    <div class="grid-image">
      <img [src]="src()" (load)="setAspectRatioClass($event)" />

      @if (attachment().RegistrationName) {
        <div class="grid-image__text">{{ attachment().RegistrationName }}</div>
      }
      @if (attachment().Comment) {
        <div class="grid-image__text">
          <i>{{ attachment().Comment }}</i>
        </div>
      }
    </div>
  `,
  styles: `
    .grid-image {
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    .grid-image__text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 100%;
    }
    img {
      flex: 1;
      object-fit: cover;
      object-position: right center;
      margin-bottom: 7px;
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
