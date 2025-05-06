// En separat komponent på bilde for bedre kontroll over feil melding og styling av feilete bilder.

import { Component, EventEmitter, inject, input, linkedSignal, Output, signal } from '@angular/core';
import { IonChip, IonIcon } from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { PlotService } from 'src/app/core/services/plot.service';
import { AttachmentViewModel } from 'src/app/modules/common-regobs-api';
import { warningOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  template: `
    @if (isError()) {
      <div class="img-error__container">
        <img src="assets/images/broken-image-w-bg.svg" />
        <ion-chip color="danger">
          <ion-icon name="warning-outline"></ion-icon>
          {{ 'REGISTRATION.COULD_NOT_DOWNLOAD_IMAGE' | translate }}
        </ion-chip>
      </div>
    } @else {
      @if (attachment()?.Href) {
        <img
          [class]="{ 'img-error': isError() }"
          [alt]="attachment()?.Comment || ''"
          [src]="snowProfileUrl()"
          loading="lazy"
          class="snow-profile"
        />
      } @else {
        <img
          [class]="{ 'img-error': isError() }"
          [alt]="attachment()?.Comment"
          loading="lazy"
          [src]="attachment()?.Url"
          (error)="onError()"
        />
      }
    }
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .img-error__container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background: #fff;
      max-width: 50vw;
      width: 100%;
      height: 100%;
      justify-content: center;
    }
    ion-chip {
      width: fit-content;
      font-size: 1rem;
      align-self: center;
      margin: 0;
      ion-icon {
        margin: 0;
        margin-right: 4px;
      }
    }
    .snow-profile {
      width: 100%;
      height: 100%;
      background-color: white;
    }
  `,
  selector: 'app-observation-image',
  imports: [TranslatePipe, IonIcon, IonChip],
})
export class ObservationImageComponent {
  attachment = input<AttachmentViewModel & { Href?: string }>();
  isError = signal(false);
  regId = input<number>();
  changeTime = input<string | undefined>();
  plotService = inject(PlotService);
  @Output() imageError = new EventEmitter<void>();

  constructor() {
    addIcons({ warningOutline });
  }

  onError() {
    this.isError.set(true);
    this.imageError.emit();
  }

  snowProfileUrl = linkedSignal(() => {
    return this.plotService.getSnowProfileSvgUrl(this.regId(), this.changeTime());
  });
}
