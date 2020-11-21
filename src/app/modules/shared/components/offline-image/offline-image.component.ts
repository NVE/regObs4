import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit {

  @Input() src: string;

  loaded = false;
  hasError = false;
  _srcInternal: string;
  private hasTriedFallback = false;

  ngOnInit(): void {
    this._srcInternal = this.src;
  }

  onLoaded(): void {
    this.loaded = true;
  }

  onError(): void {
    if (this.hasTriedFallback) {
      this.loaded = true;
      this.hasError = true;
    } else {
      this.tryFallbackImage();
    }
  }

  private tryFallbackImage() {
    if (this.src && this.src.indexOf('regobs.no/Attachment') > 0) {
      this._srcInternal = this.src.replace(/large/g, 'raw').replace(/medium/g, 'raw');
    } else {
      this.loaded = true;
      this.hasError = true;
    }
    this.hasTriedFallback = true;
  }
}
