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

  get loaded() {
    return !(this.httpLoading && this.offlineLoading);
  }

  constructor(private offlineImageService: OfflineImageService, private ngZone: NgZone, private loggingService: LoggingService) {
  }

  private init() {
    this.hasError = false;
    this.httpLoading = true;
    this.offlineLoading = true;
    this.offlineUrl = undefined;
    this.setOffineUrl();
    this.setHttpImageUrl();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.currentValue !== changes.src.previousValue) {
      this.init();
    }
  }

  ngOnDestroy(): void {
  }

  offlineImageLoaded() {
    this.offlineLoading = false;
  }

  httpImgDidLoad(event: any) {
    // TODO: Fix implementation when issue is fixed: https://github.com/ionic-team/ionic/issues/16947
    if (event.target && event.target.shadowRoot && event.target.shadowRoot.children && event.target.shadowRoot.children.length > 0) {
      const img: HTMLImageElement = event.target.shadowRoot.children[1];
      if (img) {
        img.onerror = () => {
          this.hasError = true;
        };
        img.onload = () => {
          this.httpLoading = false;
          this.hasError = false;
          this.saveImage(img);
        };
      }
    }
  }

  private async saveImage(img: HTMLImageElement) {
    try {
      const format = 'image/jpeg';
      const originalSrc = this.src;
      const result = await DataUrlHelper.getDataUrlFromImageOnLoad(img, format);
      return this.offlineImageService.saveOfflineImageDataUrl(originalSrc, result, format);
    } catch (err) {
      this.loggingService.log(`Could not load image: ${img.src}`, err, LogLevel.Warning, DEBUG_TAG);
    }
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
