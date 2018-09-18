import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalSearchPage } from '../../../pages/modal-search/modal-search.page';
import { Animation } from '@ionic/core';

export namespace CustomAnimation {
  'use strict';

  export function scaleUpEnter(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.01, 0.4);

    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .beforeStyles({ 'transform': 'scale3d(0.7,0.7,0.7)', 'opacity': 0.01 })
      .fromTo('transform', 'scale3d(0.7,0.7,0.7)', 'scale3d(1,1,1)')
      .fromTo('opacity', 0.01, 1);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .easing('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      .duration(200)
      .beforeAddClass('show-modal')
      .add(backdropAnimation)
      .add(wrapperAnimation)
    );
  }

  export function scaleUpLeave(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
    const baseAnimation = new AnimationC();

    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    const wrapperAnimation = new AnimationC();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .addElement(baseEl.querySelector('.modal-wrapper'))
      .beforeStyles({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 })
      .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(0.6,0.6,0.6)')
      .fromTo('opacity', 1, 0);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .duration(200)
      .add(backdropAnimation)
      .add(wrapperAnimation)
    );
  }
}

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss']
})
export class MapSearchComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSearchPage,
      showBackdrop: true,
      backdropDismiss: true,
      enterAnimation: CustomAnimation.scaleUpEnter,
      leaveAnimation: CustomAnimation.scaleUpLeave
    });
    return await modal.present();
  }

}
