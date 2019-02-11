import { Component, OnInit, Input, NgZone, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';
import * as utils from '@nano-sql/core/lib/utilities';
import { DataUrlHelper } from '../../core/helpers/data-url.helper';
import { LoggingService } from '../../modules/shared/services/logging/logging.service';
import { LogLevel } from '../../modules/shared/services/logging/log-level.model';

const DEBUG_TAG = 'OfflineImageComponent';

@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit, OnChanges, OnDestroy {

  @Input() src: string;

  url: string;
  offlineUrl: string;
  httpLoading = true;
  offlineLoading = true;
  hasError = false;
  private retryCount = 3;
  private interval: NodeJS.Timeout;

  get loaded() {
    return !(this.httpLoading && this.offlineLoading);
  }

  constructor(private offlineImageService: OfflineImageService, private ngZone: NgZone, private loggingService: LoggingService) {
  }

  ngOnInit() {
  }

  checkImageLoaded() {
    if (this.httpLoading && !this.hasError) {
      if (this.retryCount > 0) {
        this.retryCount--;
        this.retryHttpImageLoad();
      } else {
        this.hasError = true;
        clearInterval(this.interval);
      }
    }
  }

  private retryHttpImageLoad() {
    this.ngZone.run(() => {
      this.url = undefined;
    });
    this.setHttpImageUrl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
      this.setUrl();
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  offlineImageLoaded() {
    this.offlineLoading = false;
  }

  async httpImgDidLoad(event: any) {
    const img: HTMLImageElement = event.target.shadowRoot.children[1];
    if (img) {
      try {
        const format = 'image/jpeg';
        const originalSrc = this.src;
        const result = await DataUrlHelper.getDataUrlFromImage(img, format);
        this.ngZone.run(() => {
          this.httpLoading = false;
          this.hasError = false;
        });
        await this.offlineImageService.saveOfflineImageDataUrl(originalSrc, result, format);
      } catch (err) {
        this.loggingService.log(`Could not save image to offline storage`, err, LogLevel.Warning, DEBUG_TAG);
      }
    }
  }

  private setUrl() {
    this.setOffineUrl();
    this.setHttpImageUrl();
    this.interval = setInterval(() => this.checkImageLoaded(), 2000);
  }

  private setHttpImageUrl() {
    const randomGuid = utils.uuid();
    this.ngZone.run(() => {
      this.url = `${this.src}?r=${randomGuid}`;
    });
  }

  async setOffineUrl() {
    const result = await this.offlineImageService.getOfflineImage(this.src);
    this.ngZone.run(() => {
      this.offlineUrl = result;
    });
  }
}
