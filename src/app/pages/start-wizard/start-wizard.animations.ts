import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';

export const animations = [
    trigger('bounce', [
        state('*', style({
            transform: 'translateX(0)'
        })),
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-65px)', offset: 0.3 }),
            style({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
    ]),
    trigger('bounceUp', [
        state('*', style({
            transform: 'translateY(0)'
        })),
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translateY(0)', offset: 0 }),
            style({ transform: 'translateY(-20px)', offset: 0.3 }),
            style({ transform: 'translateY(0)', offset: 1.0 })
        ]))),
    ]),
    trigger('pulse', [
        state('*', style({
            transform: 'scale3d(1, 1, 1)'
        })),
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
            style({ transform: 'scale3d(1.2, 1.2, 1.2)', offset: 0.5 }),
            style({ transform: 'scale3d(1, 1, 1)', offset: 1.0 })
        ]))),
    ]),
    trigger('moveDownRight', [
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(-30px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveDownRightLess', [
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(-10px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveDownLeft', [
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(10px, -20px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveLeftAndABitDown', [
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(20px, -10px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ]),
    trigger('moveUpAndABitLeft', [
        transition('* => changePage', animate('700ms ease-out', keyframes([
            style({ transform: 'translate(6px, 25px)', offset: 0 }),
            style({ transform: 'translate(0px, 0px)', offset: 1 }),
        ]))),
    ])
];
