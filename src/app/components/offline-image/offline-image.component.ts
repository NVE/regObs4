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

  url: string | ArrayBuffer;
  loading = true;
  hasError = false;
  cancelPromise: Promise<any>;
  cancelPromiseResolver: (value?: any) => void;

  constructor(private offlineImageService: OfflineImageService, private ngZone: NgZone) {
    this.cancelPromise = new Promise((resolve) => {
      this.cancelPromiseResolver = resolve;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
      this.setUrl();
    }
  }

  ngOnDestroy(): void {
    console.log('[INFO] OfflineImage ngOnDestroy. Cancel image load.');
    this.cancelPromiseResolver();
  }

  imgDidLoad() {
    this.ngZone.run(() => {
      this.loading = false;
      this.loaded.emit();
    });
  }

  private async setUrl() {
    this.hasError = false;
    this.loading = true;
    const offlineUrl = await this.offlineImageService.getOfflineImage(this.src, { cancelPromise: this.cancelPromise });
    this.ngZone.run(() => {
      if (offlineUrl) {
        this.url = offlineUrl;
      } else {
        this.hasError = true;
        this.error.emit();
        this.loading = false;
        this.loaded.emit();
      }
    });
  }
}
