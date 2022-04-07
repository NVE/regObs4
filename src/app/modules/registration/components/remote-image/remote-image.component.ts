import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RemoteOrLocalAttachmentEditModel } from 'src/app/core/services/draft/draft-model';

@Component({
  selector: 'app-remote-image',
  templateUrl: './remote-image.component.html',
  styleUrls: ['./remote-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteImageComponent implements OnInit {
  @Input() attachment: RemoteOrLocalAttachmentEditModel;
  @Input() preferSize: keyof RemoteOrLocalAttachmentEditModel['UrlFormats'] = 'Thumbnail';

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
