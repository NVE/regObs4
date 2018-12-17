import { Animation } from '@ionic/core';

export class CustomAnimation {

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
            .easing('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
            .duration(200)
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
            .duration(200)
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
            .duration(200)
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
            .duration(200)
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
            .duration(200)
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
            .duration(200)
            .beforeAddClass('show-modal')
            .add(backdropAnimation)
            .add(wrapperAnimation)
        );
    }
}
