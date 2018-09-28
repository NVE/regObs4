import { Component, OnInit, Input } from '@angular/core';
import { OfflineImageService } from '../../core/services/offline-image/offline-image.service';

@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit {

  @Input() src: string;

  url: string | ArrayBuffer;

  constructor(private offlineImageService: OfflineImageService) { }

  async ngOnInit() {
    this.url = await this.offlineImageService.getImageOrFallbackToUrl(this.src);
  }
}
