import { IonGrid, IonRow, IonCol, IonLabel } from '@ionic/angular/standalone';
import {
  Component,
  inject,
  input,
  signal,
  computed,
  output,
  linkedSignal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MapItem } from '../../core/models/map-item.model';
import { Router } from '@angular/router';
import { StarRatingHelper } from '../competence/star-helper';
import { NgClass } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { CompetenceComponent } from '../competence/competence.component';
import { TranslatePipe } from '@ngx-translate/core';
import { FormatDatePipe } from '../../modules/shared/pipes/format-date/format-date.pipe';

@Component({
  selector: 'app-map-item-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-item-bar.component.html',
  styleUrls: ['./map-item-bar.component.scss'],
  imports: [
    CompetenceComponent,
    FormatDatePipe,
    IonCol,
    IonGrid,
    IonLabel,
    IonRow,
    NgClass,
    SvgIconComponent,
    TranslatePipe,
  ],
})
/**
 * Show key info from selected registration on top of the map.
 * To show this, klick on a registrations icon in the map.
 * Also include an image slider if registration contain images.
 */
export class MapItemBarComponent {
  cardClicked = output();
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  registration = input<MapItem | null>();

  additionaAttachmentCount = computed(() => {
    const attachmentCount = this.registration()?.AttachmentsCount;
    if (!attachmentCount) {
      return 0;
    }
    return attachmentCount > 1 ? attachmentCount - 1 : 0;
  });
  masl?: number;
  showAdditionalAttachmentCount = signal(true);
  title = computed(() => this.registration()?.FormNames?.join(', ') || '');
  starCount = computed(() => StarRatingHelper.getStarRating(this.registration()?.CompetenceLevelTID));
  firstAttachmentUrl = linkedSignal(() => this.sanitize(this.registration()?.FirstAttachmentUrl));

  handleMissingImage() {
    this.firstAttachmentUrl.set(this.sanitize('./assets/images/broken-image-w-bg.svg'));
    this.showAdditionalAttachmentCount.set(false);
  }

  private sanitize(url: string | undefined): SafeUrl | undefined {
    if (!url) return;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  navigateToItem() {
    const targetUrl = `view-observation/${this.registration()?.RegId}`;
    this.router.navigateByUrl(targetUrl).then((navigationSuccess) => {
      if (navigationSuccess) {
        this.cardClicked.emit();
      }
    });
  }
}
