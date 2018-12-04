import { Component, OnInit, Input, NgZone, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';

@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit, OnChanges {
  @Input() src: string;
  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Output() error: EventEmitter<void> = new EventEmitter();

  url: string | ArrayBuffer;
  loading = true;
  hasError = false;

  constructor(private offlineImageService: OfflineImageService, private ngZone: NgZone) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setUrl();
  }

  imgDidLoad() {
    this.ngZone.run(() => {
      this.loading = false;
      this.loaded.emit();
    });

  }

  imgError() {
    this.ngZone.run(() => {
      this.loading = false;
      this.hasError = true;
      this.error.emit();
    });
  }

  private async setUrl() {
    this.hasError = false;
    this.loading = true;
    const fallbackUrl = await this.offlineImageService.getImageOrFallbackToUrl(this.src);
    this.ngZone.run(() => {
      this.url = fallbackUrl;
    });
  }
}
