import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'ro-blob-image',
  templateUrl: './blob-image.component.html',
  styleUrls: ['./blob-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlobImageComponent implements OnInit, OnDestroy {
  @Input() imgBlob: Blob;

  imgSrc: SafeUrl;
  private blobUrl: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.blobUrl = URL.createObjectURL(this.imgBlob);
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
  }

  ngOnDestroy(): void {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }
  }
}
