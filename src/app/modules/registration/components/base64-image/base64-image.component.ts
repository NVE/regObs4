import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const DATA_URL_TAG = 'data:image/jpeg;base64,';

@Component({
  selector: 'app-base64-image',
  templateUrl: './base64-image.component.html',
  styleUrls: ['./base64-image.component.scss']
})
export class Base64ImageComponent implements OnInit {

  @Input() base64encodedImage: string;
  imgSrc: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(DATA_URL_TAG + this.base64encodedImage);
  }

}
