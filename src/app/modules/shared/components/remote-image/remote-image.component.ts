import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';

/**
 * Component for showing online images.
 *
 * If the image cannot be fetched, a fallback image is displayed. The behaviour of
 * this fallback is governed by the inputs "largeFallback" and "withFallbackText".
 * 
 * Image resolution can be set by the "preferSize" input.
 */
@Component({
  selector: 'app-remote-image',
  templateUrl: './remote-image.component.html',
  styleUrls: ['./remote-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteImageComponent implements OnInit {
  @Input() attachment: RemoteOrLocalAttachmentEditModel;
  @Input() preferSize: keyof RemoteOrLocalAttachmentEditModel['UrlFormats'] = 'Thumbnail';
  @Input() largeFallback: boolean = false;
  @Input() withFallbackText: boolean = false;

  imgSrc: SafeUrl;
  showImage = true;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    let imageUrl: string;
    if (this.attachment.UrlFormats?.[this.preferSize]) {
      imageUrl = this.attachment.UrlFormats[this.preferSize];
    } else {
      imageUrl = this.attachment.Url;
    }
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onError() {
    if (this.imgSrc !== this.attachment.Url) {
      this.imgSrc = this.attachment.Url;
    } else {
      this.showImage = false;
    }
  }
}
