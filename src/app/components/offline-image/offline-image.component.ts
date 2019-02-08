import { Component, OnInit, Input, NgZone, OnChanges, SimpleChanges, EventEmitter, Output, OnDestroy } from '@angular/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';

@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit, OnChanges, OnDestroy {

  @Input() src: string;
  @Output() loaded: EventEmitter<void> = new EventEmitter();
  @Output() error: EventEmitter<void> = new EventEmitter();

  private _url: string;
  loading = false;
  hasError = false;
  cancelPromise: Promise<any>;
  cancelPromiseResolver: (value?: any) => void;

  get url() {
    if (!this._url && !this.loading) {
      this.setUrl();
    }
    return this._url;
  }

  constructor(private offlineImageService: OfflineImageService, private ngZone: NgZone) {
    this.cancelPromise = new Promise((resolve) => {
      this.cancelPromiseResolver = resolve;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && !changes.src.isFirstChange() && changes.src.currentValue !== changes.src.previousValue) {
      this.refresh();
    }
  }

  ngOnDestroy(): void {
    this.cancelPromiseResolver();
  }

  imgDidLoad() {
    this.ngZone.run(() => {
      this.loading = false;
      this.loaded.emit();
    });
  }

  refresh() {
    this.setUrl();
  }

  private async setUrl() {
    this.hasError = false;
    this.loading = true;
    const offlineUrl = await this.offlineImageService.getOfflineImage(this.src, { cancelPromise: this.cancelPromise });
    this.ngZone.run(() => {
      if (offlineUrl) {
        this._url = offlineUrl;
        if (this._url.startsWith('http')) {
          // Try to download image anyway if image has been updated
          this.offlineImageService.downloadOfflineAsset(this._url)
            .then((result) => {
              if (result) {
                this.ngZone.run(() => {
                  this._url = result.dataUrl;
                });
              }
            });
        }
      } else {
        this.hasError = true;
        this.error.emit();
        this.loading = false;
        this.loaded.emit();
      }
    });
  }
}
