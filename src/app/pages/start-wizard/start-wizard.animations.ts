import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

export const scaleUpCubicBezier = 'cubic-bezier(0.64, 0.1, 0.57, 1.53)';
export const defaultDuration = '700ms';
export const scaleUpHeaderFrom = 'scale3d(0.9, 0.9, 1)';

export const keyFramesScaleUp = keyframes([
    style({ transform: 'scale3d(0, 0, 1)', offset: 0 }),
    style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
]);

export const keyFramesPulse = keyframes([
    style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
    style({ transform: 'scale3d(1.2, 1.2, 1.2)', offset: 0.5 }),
    style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 })
]);

export const keyFramesScaleUpHeader = keyframes([
    style({ transform: scaleUpHeaderFrom, offset: 0 }),
    style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
]);

export function getScaleUpAnimation(delay: number){
    return [
        state('*', style({
            transform: 'scale3d(0, 0, 1)'
        })),
        // http://cubic-bezier.com/#.64,.1,.57,1.53
        transition('* => page_1', animate(`${defaultDuration} ${delay}ms ${scaleUpCubicBezier}`, keyFramesScaleUp)),
        state('page_1', style({
            transform: 'scale3d(1, 1, 1)'
        })),
    ];
};

export function getHeaderAnimation(page: number){
    return [
        state('*', style({
            transform: scaleUpHeaderFrom
        })),
        transition(`* => page_${page}`, animate(`500ms 200ms ${scaleUpCubicBezier}`, keyFramesScaleUpHeader)),
        state(`page_${page}`, style({
            transform: 'scale3d(1, 1, 1)'
        })),
    ];
};

export const animations = [

    // Generic animations
    trigger('pulse', [
        state('*', style({
            transform: 'scale3d(1, 1, 1)'
        })),
        transition('* => *', animate(`${defaultDuration} 500ms ease-out`, keyFramesPulse)),
    ]),

    // Page 0 animations
    trigger('headerAnimation', getHeaderAnimation(0)),

    // Page 1 animations
    trigger('headerAnimation1', getHeaderAnimation(1)),
    trigger('scaleUpIce', getScaleUpAnimation(500)),
    trigger('scaleUpWater', getScaleUpAnimation(700)),
    trigger('scaleUpWarning', getScaleUpAnimation(820)),
    trigger('scaleUpSnow', getScaleUpAnimation(1000)),
    trigger('scaleUpDirt', getScaleUpAnimation(650)),
    trigger('bouncePath', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition('page_0 => page_1', animate('700ms ease-out', keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(65px)', offset: 0.5 }),
            style({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
        transition('page_2 => page_1', animate('700ms ease-out', keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-65px)', offset: 0.5 }),
            style({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
    ]),

    // Page 2 animations
    trigger('headerAnimation2', getHeaderAnimation(2)),
    trigger('slideInFromRight', [
        state('*', style({
            transform: 'translateX(200px)'
        })),
        transition('* => page_2', animate(`1200ms ease-out`, keyframes([
            style({ transform: 'translateX(200px)', offset: 0 }),
            style({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
        state('page_2', style({
            transform: 'translateX(0)'
        })),
    ]),
    trigger('nudgeExclamation', [
        transition('* => page_2', animate(`500ms 700ms ease-out`, keyFramesPulse)),
    ]),

    // Page 3 animations
    trigger('headerAnimation3', getHeaderAnimation(3)),
    trigger('moveDownRight', [
        transition('* => page_3', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(-30px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveDownRightLess', [
        transition('* => page_3', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(-10px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveDownLeft', [
        transition('* => page_3', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(10px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveLeftAndABitDown', [
        transition('* => page_3', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(20px, -10px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveUpAndABitLeft', [
        transition('* => page_3', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(6px, 25px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveUp', [
        state('*', style({
            transform: 'translateY(20px)'
        })),
        transition('* => page_3', animate(`700ms ${scaleUpCubicBezier}`, keyframes([
            style({ transform: 'translateY(20px)', offset: 0 }),
            style({ transform: 'translateY(0px)', offset: 1 }),
        ]))),
        transition('page_3 => *', animate(`700ms ${scaleUpCubicBezier}`, keyframes([
            style({ transform: 'translateY(0px)', offset: 0 }),
            style({ transform: 'translateY(20px)', offset: 1 }),
        ]))),
        state('page_3', style({
            transform: 'translateY(0px)'
        })),
    ]),

    // Page 4 animations
    trigger('headerAnimation4', getHeaderAnimation(4)),
];
