import { Animation } from '@ionic/core';
import { transition, style, animate } from '@angular/animations';

export const DEFAULT_DURATION = 200;
export const EASING_IN_OUT_BACK = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)';

export class CustomAnimation {

    static createScaleInInitialStyle(delay: number = 0, duration: number = DEFAULT_DURATION, easing = 'ease-in-out') {
        return style({ transform: 'scale(0)', opacity: 0 });  // initial
    }

    static createScaleInAnimation(delay: number = 0, duration: number = DEFAULT_DURATION, easing = 'ease-in-out') {
        return animate(`${duration}ms ${delay}ms ${easing}`, style({ transform: 'scale(1)', opacity: 1 }));
    }

    static createScaleInTransition(delay: number = 0, duration: number = DEFAULT_DURATION, easing = 'ease-in-out') {
        return [
            CustomAnimation.createScaleInInitialStyle(),  // initial
            CustomAnimation.createScaleInAnimation(delay, duration, easing),
        ];
    }

    static createEnterAnimation(delay: number = 0, duration: number = DEFAULT_DURATION, easing = 'ease-in-out') {
        return [
            transition(':enter', CustomAnimation.createScaleInTransition(delay, duration, easing))
        ];
    }

    static scaleUpEnter(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
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
            .easing(EASING_IN_OUT_BACK)
            .duration(DEFAULT_DURATION)
            .beforeAddClass('show-modal')
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }


    static scaleUpEnterV2(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
        const baseAnimation = new AnimationC();

        const backdropAnimation = new AnimationC();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        backdropAnimation.fromTo('opacity', 0, 0.4);

        const wrapperAnimation = new AnimationC();
        wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

        wrapperAnimation
            .beforeStyles({ 'transform': 'scale3d(0.7,1,0.7)', 'opacity': 0 })
            .fromTo('transform', 'scale3d(0.7,1,0.7)', 'scale3d(1,1,1)')
            .fromTo('opacity', 0, 1);

        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .duration(DEFAULT_DURATION)
            .beforeAddClass('show-modal')
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }

    static scaleUpLeave(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
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
            .duration(DEFAULT_DURATION)
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }

    static scaleUpLeaveV2(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
        const baseAnimation = new AnimationC();

        const backdropAnimation = new AnimationC();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        backdropAnimation.fromTo('opacity', 0.4, 0.0);

        const wrapperAnimation = new AnimationC();
        wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

        wrapperAnimation
            .addElement(baseEl.querySelector('.modal-wrapper'))
            .beforeStyles({ 'transform': 'scale3d(1,1,1)', 'opacity': 1 })
            .fromTo('transform', 'scale3d(1,1,1)', 'scale3d(0.6,1,0.6)')
            .fromTo('opacity', 1, 0);

        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .duration(DEFAULT_DURATION)
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }

    static slideInFromRight(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
        const baseAnimation = new AnimationC();

        const backdropAnimation = new AnimationC();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        backdropAnimation.fromTo('opacity', 0.01, 0.4);

        const wrapperAnimation = new AnimationC();
        wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

        wrapperAnimation
            .beforeStyles({ 'transform': 'translateX(100%)', 'opacity': 0.01 })
            .fromTo('transform', 'translateX(100%)', 'translateX(0)')
            .fromTo('opacity', 0.01, 1);

        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('ease-in')
            .duration(DEFAULT_DURATION)
            .beforeAddClass('show-modal')
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }

    static slideOutToRight(AnimationC: Animation, baseEl: HTMLElement, opts?: any) {
        const baseAnimation = new AnimationC();

        const backdropAnimation = new AnimationC();
        backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

        backdropAnimation.fromTo('opacity', 0.4, 0.0);
        const modalWrapperElement = baseEl.querySelector('.modal-wrapper');

        const wrapperAnimation = new AnimationC();
        wrapperAnimation.addElement(modalWrapperElement);
        const currentTranslateX = modalWrapperElement.getAttribute('data-offset-x');
        const currentOpacity = modalWrapperElement.getAttribute('data-opacity');

        wrapperAnimation
            .fromTo('transform', `translateX(${currentTranslateX ?
                parseInt(currentTranslateX, 10) : 0})`, 'translateX(100%)')
            .fromTo('opacity', currentOpacity ? parseInt(currentOpacity, 10) : 0, 0);

        return Promise.resolve(baseAnimation
            .addElement(baseEl)
            .easing('ease-out')
            .duration(DEFAULT_DURATION)
            .beforeAddClass('show-modal')
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }
}
