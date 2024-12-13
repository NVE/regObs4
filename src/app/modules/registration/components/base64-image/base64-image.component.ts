import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-base64-image',
  templateUrl: './base64-image.component.html',
  styleUrls: ['./base64-image.component.scss'],
})
export class Base64ImageComponent implements OnInit {
  @Input() base64encodedImage: string;
  @Input() dataUrlTag = 'data:image/jpeg;base64,';
  imgSrc: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const applyImageUrlTag = !this.base64encodedImage.startsWith('data:image');
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(
      (applyImageUrlTag ? this.dataUrlTag : '') + this.base64encodedImage
    );
  }
}
