import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.page.html',
  styleUrls: ['./fullscreen-image-modal.page.scss'],
})
export class FullscreenImageModalPage implements OnInit {

  @Input() imgSrc: string;
  @Input() header: string;
  @Input() description: string;
  @ViewChild('img') img: ElementRef;
  portrait = false;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  onImageLoaded() {
    this.portrait = this.isPortrait(this.img.nativeElement);
  }

  private isPortrait(img: HTMLImageElement) {
    return (img.naturalHeight || img.height) > (img.naturalWidth || img.width);
  }

}
