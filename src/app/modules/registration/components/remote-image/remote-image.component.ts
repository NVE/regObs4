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

  imgSrc: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const imageUrl = this.attachment.UrlFormats?.Thumbnail ? this.attachment.UrlFormats.Thumbnail : this.attachment.Url;
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
