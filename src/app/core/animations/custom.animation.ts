import { createAnimation } from '@ionic/core';
import { transition, style, animate } from '@angular/animations';

export const DEFAULT_DURATION = 200;
export const EASE_IN_OUT_BACK = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';
export const EASE_IN_OUT = 'ease-in-out';

export class CustomAnimation {

  static createScaleInInitialStyle(fromScale = 0, fromOpacity = 0) {
    return style({ transform: `scale3d(${fromScale},${fromScale},1)`, opacity: fromOpacity });  // initial
  }

  static createScaleInAnimation(delay = 0, duration: number = DEFAULT_DURATION, easing = EASE_IN_OUT) {
    return animate(`${duration}ms ${delay}ms ${easing}`, style({ transform: 'scale3d(1,1,1)', opacity: 1 }));
  }

  static createScaleInTransition(
    delay = 0,
    duration: number = DEFAULT_DURATION,
    easing = EASE_IN_OUT,
    fromScale = 0,
    fromOpacity = 0,
  ) {
    return [
      CustomAnimation.createScaleInInitialStyle(fromScale, fromOpacity),  // initial
      CustomAnimation.createScaleInAnimation(delay, duration, easing),
    ];
  }

  static createEnterScaleInAnimation(
    delay = 0,
    duration: number = DEFAULT_DURATION,
    easing = EASE_IN_OUT,
    fromScale = 0,
    fromOpacity = 0,
  ) {
    return [
      transition(':enter', CustomAnimation.createScaleInTransition(delay, duration, easing, fromScale, fromOpacity))
    ];
  }

  static scaleUpEnter(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.01, 0.4);

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .beforeStyles({ 'transform': 'scale3d(0.7,0.7,0.7)', 'opacity': 0.01 })
      .fromTo('transform', 'scale3d(0.7,0.7,0.7)', 'scale3d(1,1,1)')
      .fromTo('opacity', 0.01, 1);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .easing(EASE_IN_OUT_BACK)
      .duration(DEFAULT_DURATION)
      .beforeAddClass('show-modal')
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
    );
  }

  static scaleUpEnterV2(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0, 0.4);

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .beforeStyles({ 'transform': 'scale3d(0.7,1,0.7)', 'opacity': 0 })
      .fromTo('transform', 'scale3d(0.7,1,0.7)', 'scale3d(1,1,1)')
      .fromTo('opacity', 0, 1);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .duration(DEFAULT_DURATION)
      .beforeAddClass('show-modal')
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
    );
  }

  static scaleUpLeave(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .addElement(baseEl.querySelector('.modal-wrapper'))
      .beforeStyles({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 })
      .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(0.6,0.6,0.6)')
      .fromTo('opacity', 1, 0);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .duration(DEFAULT_DURATION)
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
    );
  }

  static scaleUpLeaveV2(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .addElement(baseEl.querySelector('.modal-wrapper'))
      .beforeStyles({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 })
      .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(0.6,1,0.6)')
      .fromTo('opacity', 1, 0);

    return Promise.resolve(baseAnimation
      .addElement(baseEl)
      .duration(DEFAULT_DURATION)
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
    );
  }

  static slideInFromRight(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.01, 0.4);

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
      .beforeStyles({ 'transform': 'translateX(100%)', 'opacity': 0.01 })
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .fromTo('opacity', 0.01, 1);

    return baseAnimation
      .addElement(baseEl)
      .easing('ease-in')
      .duration(DEFAULT_DURATION)
      .beforeAddClass('show-modal')
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation)
    ;
  }

  static slideOutToRight(baseEl: HTMLElement, opts?: any) {
    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    backdropAnimation.fromTo('opacity', 0.4, 0.0);
    const modalWrapperElement = baseEl.querySelector('.modal-wrapper');

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(modalWrapperElement);
    const currentTranslateX = baseEl.getAttribute('data-offset-x');
    const currentOpacity = baseEl.getAttribute('data-opacity');

    wrapperAnimation
      .fromTo('transform', `translateX(${currentTranslateX ?
        parseInt(currentTranslateX, 10) : 0}%)`, 'translateX(100%)')
      .fromTo('opacity', currentOpacity ? parseInt(currentOpacity, 10) : 0, 0);

    return baseAnimation
      .addElement(baseEl)
      .easing('ease-out')
      .duration(DEFAULT_DURATION)
      .beforeAddClass('show-modal')
      .addAnimation(backdropAnimation)
      .addAnimation(wrapperAnimation);
  }
}
