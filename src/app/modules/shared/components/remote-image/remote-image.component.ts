import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  inject,
  input,
  computed,
  linkedSignal,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';
import { SvgIconComponent } from 'angular-svg-icon';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for showing online images.
 *
 * If the image cannot be fetched, a fallback image is displayed. The behaviour of
 * this fallback is governed by the inputs "largeFallback" and "withFallbackText".
 * Image resolution can be set by the "preferSize" input.
 */
@Component({
  selector: 'app-remote-image',
  templateUrl: './remote-image.component.html',
  styleUrls: ['./remote-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgIconComponent, TranslatePipe],
})
export class RemoteImageComponent {
  private sanitizer = inject(DomSanitizer);

  readonly attachment = input.required<RemoteOrLocalAttachmentEditModel>();
  readonly preferSize = input<keyof NonNullable<RemoteOrLocalAttachmentEditModel['UrlFormats']>>('Thumbnail');
  readonly largeFallback = input(false);
  readonly withFallbackText = input(false);
  readonly isThumbnail = input(false);

  private readonly imgUrl = linkedSignal(() => {
    let imageUrl: string;
    const attachment = this.attachment();
    const preferSize = this.preferSize();
    if (attachment.UrlFormats?.[preferSize]) {
      imageUrl = attachment.UrlFormats[preferSize];
    } else if (attachment.Url) {
      imageUrl = attachment.Url;
    } else {
      throw new Error('Could not find url to use');
    }
    return imageUrl;
  });

  imgUrlSafe = computed<SafeUrl>(() => this.sanitizer.bypassSecurityTrustUrl(this.imgUrl()));

  showImage = signal(true);

  @HostBinding('style.pointer-events')
  pointerEvents = 'auto';

  onError() {
    const attachment = this.attachment();
    if (attachment.Url && this.imgUrl() !== attachment.Url) {
      this.imgUrl.set(attachment.Url);
    } else {
      this.showImage.set(false);
      this.pointerEvents = 'none';
    }
  }
}
