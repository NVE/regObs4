import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-offline-image',
  templateUrl: './offline-image.component.html',
  styleUrls: ['./offline-image.component.scss']
})
export class OfflineImageComponent implements OnInit, OnDestroy {

  @Input() src: string;

  loaded = false;
  hasError = false;

  constructor() {
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  onLoaded(event: any) {
    this.loaded = true;
  }

  onError() {
    this.loaded = true;
    this.hasError = true;
  }
}
