import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, inject, input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgIf } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'ro-blob-image',
  templateUrl: './blob-image.component.html',
  styleUrls: ['./blob-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SvgIconComponent],
})
export class BlobImageComponent implements OnInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);

  readonly imgBlob = input.required<Blob>();
  readonly isThumbnail = input(false);

  imgSrc?: SafeUrl;
  private blobUrl?: string;

  ngOnInit(): void {
    this.blobUrl = URL.createObjectURL(this.imgBlob());
    this.imgSrc = this.sanitizer.bypassSecurityTrustStyle(`url(${this.blobUrl})`);
  }

  ngOnDestroy(): void {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }
  }
}
