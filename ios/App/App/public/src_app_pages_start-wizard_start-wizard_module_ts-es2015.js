"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_start-wizard_start-wizard_module_ts"],{

/***/ 2762:
/*!***************************************************************!*\
  !*** ./src/app/pages/start-wizard/start-wizard.animations.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "scaleUpCubicBezier": function() { return /* binding */ scaleUpCubicBezier; },
/* harmony export */   "defaultDuration": function() { return /* binding */ defaultDuration; },
/* harmony export */   "scaleUpHeaderFrom": function() { return /* binding */ scaleUpHeaderFrom; },
/* harmony export */   "keyFramesScaleUp": function() { return /* binding */ keyFramesScaleUp; },
/* harmony export */   "keyFramesPulse": function() { return /* binding */ keyFramesPulse; },
/* harmony export */   "keyFramesScaleUpHeader": function() { return /* binding */ keyFramesScaleUpHeader; },
/* harmony export */   "getScaleUpAnimation": function() { return /* binding */ getScaleUpAnimation; },
/* harmony export */   "getFadeInAnimation": function() { return /* binding */ getFadeInAnimation; },
/* harmony export */   "getHeaderAnimation": function() { return /* binding */ getHeaderAnimation; },
/* harmony export */   "animations": function() { return /* binding */ animations; }
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/animations */ 97175);

const scaleUpCubicBezier = 'cubic-bezier(0.64, 0.1, 0.57, 1.53)';
const defaultDuration = '700ms';
const scaleUpHeaderFrom = 'scale3d(0.9, 0.9, 1)';
const keyFramesScaleUp = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(0, 0, 1)', offset: 0 }),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(1, 1, 1)', offset: 1 })
]);
const keyFramesPulse = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(1.2, 1.2, 1.2)', offset: 0.5 }),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(1, 1, 1)', offset: 1.0 })
]);
const keyFramesScaleUpHeader = (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: scaleUpHeaderFrom, offset: 0 }),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'scale3d(1, 1, 1)', offset: 1 })
]);
function getScaleUpAnimation(delay) {
    return [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'scale3d(0, 0, 1)'
        })),
        // http://cubic-bezier.com/#.64,.1,.57,1.53
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_1', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${defaultDuration} ${delay}ms ${scaleUpCubicBezier}`, keyFramesScaleUp)),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_1', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'scale3d(1, 1, 1)'
        }))
    ];
}
function getFadeInAnimation(page, delay) {
    return [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            opacity: 0
        })),
        // http://cubic-bezier.com/#.64,.1,.57,1.53
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(`* => page_${page}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`500ms ${delay}ms ease-out`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ opacity: 0, offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ opacity: 1, offset: 1 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(`page_${page} => *`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ opacity: 1, offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ opacity: 0, offset: 1 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)(`page_${page}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            opacity: 1
        }))
    ];
}
function getHeaderAnimation(page) {
    return [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: scaleUpHeaderFrom
        })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)(`* => page_${page}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`500ms 200ms ${scaleUpCubicBezier}`, keyFramesScaleUpHeader)),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)(`page_${page}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'scale3d(1, 1, 1)'
        }))
    ];
}
const animations = [
    // Generic animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('pulse', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'scale3d(1, 1, 1)'
        })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => *', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`${defaultDuration} 500ms ease-out`, keyFramesPulse))
    ]),
    // Page 0 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation', getHeaderAnimation(0)),
    // Page 1 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation1', getHeaderAnimation(1)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpIce', getScaleUpAnimation(500)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpWater', getScaleUpAnimation(700)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpWarning', getScaleUpAnimation(820)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpSnow', getScaleUpAnimation(1000)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpDirt', getScaleUpAnimation(650)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('bouncePath', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'translateX(0)'
        })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_0 => page_1', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(0)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(65px)', offset: 0.5 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_2 => page_1', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(0)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(-65px)', offset: 0.5 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(0)', offset: 1.0 })
        ])))
    ]),
    // Page 2 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation2', getHeaderAnimation(2)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('slideInFromRight', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'translateX(200px)'
        })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_2', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('1200ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(200px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateX(0)', offset: 1.0 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_2', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'translateX(0)'
        }))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('nudgeExclamation', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_2', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms 700ms ease-out', keyFramesPulse))
    ]),
    // Page 3 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation3', getHeaderAnimation(3)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownRight', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(-30px, -20px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(0px, 0px)', offset: 1 })
        ])))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownRightLess', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(-10px, -20px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(0px, 0px)', offset: 1 })
        ])))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownLeft', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(10px, -20px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(0px, 0px)', offset: 1 })
        ])))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveLeftAndABitDown', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(20px, -10px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(0px, 0px)', offset: 1 })
        ])))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveUpAndABitLeft', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(6px, 25px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translate(0px, 0px)', offset: 1 })
        ])))
    ]),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveUp', [
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'translateY(20px)'
        })),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`700ms ${scaleUpCubicBezier}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateY(20px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateY(0px)', offset: 1 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_3 => *', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)(`700ms ${scaleUpCubicBezier}`, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateY(0px)', offset: 0 }),
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({ transform: 'translateY(20px)', offset: 1 })
        ]))),
        (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_3', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
            transform: 'translateY(0px)'
        }))
    ]),
    // Page 4 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation4', getHeaderAnimation(4)),
    // Page 5 animations
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation5', getHeaderAnimation(5)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText1', getFadeInAnimation(5, 1000)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText2', getFadeInAnimation(5, 2000)),
    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText3', getFadeInAnimation(5, 3000))
];


/***/ }),

/***/ 11624:
/*!***********************************************************!*\
  !*** ./src/app/pages/start-wizard/start-wizard.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartWizardPageModule": function() { return /* binding */ StartWizardPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _start_wizard_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./start-wizard.page */ 35930);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: '',
        component: _start_wizard_page__WEBPACK_IMPORTED_MODULE_0__.StartWizardPage
    }
];
class StartWizardPageModule {
}
StartWizardPageModule.ɵfac = function StartWizardPageModule_Factory(t) { return new (t || StartWizardPageModule)(); };
StartWizardPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: StartWizardPageModule });
StartWizardPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](StartWizardPageModule, { declarations: [_start_wizard_page__WEBPACK_IMPORTED_MODULE_0__.StartWizardPage], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule] }); })();


/***/ }),

/***/ 35930:
/*!*********************************************************!*\
  !*** ./src/app/pages/start-wizard/start-wizard.page.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StartWizardPage": function() { return /* binding */ StartWizardPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _start_wizard_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./start-wizard.animations */ 2762);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 24390);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 48657);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 26548);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../settings */ 30015);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function StartWizardPage_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " / Language");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function StartWizardPage_span_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " / Choose language");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function StartWizardPage_ion_select_option_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-select-option", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lang_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", lang_r3.langKey);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", lang_r3.name, " ");
} }
const _c0 = function () { return { autoplay: false }; };
const _c1 = function (a0) { return { "dark": a0 }; };
const _c2 = function (a0) { return { "hide": a0 }; };
class StartWizardPage {
    constructor(userSettingService, navController) {
        this.userSettingService = userSettingService;
        this.navController = navController;
        this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.GeoHazard;
        this.LangKey = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.LangKey;
        this.reachedEnd = false;
        this.showLegalIcon = false;
        this.visibleStarNumber = -1;
        this.supportedLanguages = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.language.supportedLanguages.map((lang) => (Object.assign(Object.assign({}, lang), { langKey: _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.LangKey[lang.lang] })));
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        this.activeIndex = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        this.isIncreasing = true;
    }
    ionViewWillEnter() {
        this.state = 'x';
        this.userSettingService.userSetting$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe((us) => {
            this.language = us.language;
            this.initStarIndexCounter();
            this.setPageIndex(0);
        });
    }
    ngOnInit() { }
    saveLanguage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const userSettings = yield this.userSettingService.userSetting$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1))
                .toPromise();
            this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, userSettings), { language: this.language }));
        });
    }
    setPageIndex(index) {
        setTimeout(() => {
            this.resetVisibleStars();
            this.state = `page_${index}`;
            this.activeIndex.next(index);
        }, 0);
    }
    resetVisibleStars() {
        this.visibleStarNumber = -1;
        this.isIncreasing = true;
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    slideNext() {
        (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.timer)(700)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.ngDestroy$))
            .subscribe(() => {
            if (this.slides) {
                this.slides.slideNext();
            }
        });
    }
    start() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (this.reachedEnd) {
                const userSettings = yield this.userSettingService.userSetting$
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1))
                    .toPromise();
                this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, userSettings), { completedStartWizard: true }));
                this.navController.navigateRoot('/');
            }
            else {
                this.slides.slideTo(5, 200);
            }
        });
    }
    ionSlideTransitionStart() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const index = yield this.slides.getActiveIndex();
            this.setPageIndex(index);
        });
    }
    ionSlideReachEnd() {
        this.reachedEnd = true;
        setTimeout(() => {
            this.showLegalIcon = true;
            // Crazy ios bug to get animation on spinner.. :o
        }, 0);
    }
    ionSlidePrevStart() {
        this.reachedEnd = false;
    }
    initStarIndexCounter() {
        this.activeIndex
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)((index) => (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.interval)(700).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.skipWhile)(() => index !== 4))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.ngDestroy$))
            .subscribe(() => {
            if (this.isIncreasing && this.visibleStarNumber >= 6) {
                // Count to 6 to add an extra pause on the end
                this.isIncreasing = false;
            }
            if (!this.isIncreasing && this.visibleStarNumber < 0) {
                // Count to -1 to add an extra pause on the start
                this.isIncreasing = true;
            }
            if (this.isIncreasing) {
                this.visibleStarNumber++;
            }
            else {
                this.visibleStarNumber--;
            }
        });
    }
}
StartWizardPage.ɵfac = function StartWizardPage_Factory(t) { return new (t || StartWizardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.NavController)); };
StartWizardPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: StartWizardPage, selectors: [["app-start-wizard"]], viewQuery: function StartWizardPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlides, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.slides = _t.first);
    } }, decls: 141, vars: 96, consts: [["pager", "true", 1, "onboarding", 3, "options", "ionSlideReachEnd", "ionSlidePrevStart", "ionSlideTransitionStart"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-align-self-center"], [1, "animated-element-wrapper"], ["src", "/assets/images/onboarding/eclipse.svg", 1, "animated-element", "eclipse"], ["src", "/assets/images/onboarding/bubble.svg", 1, "animated-element", "bubble"], [4, "ngIf"], [1, "language-list"], [1, "ion-no-padding"], ["position", "stacked", "color", "medium"], ["interface", "action-sheet", 3, "cancelText", "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["src", "/assets/images/onboarding/line.svg", 1, "animated-element", "line"], ["src", "/assets/images/onboarding/warning.svg", 1, "animated-element", "warning"], ["src", "/assets/icon/map/pin-ice.svg", 1, "animated-element", "pin-ice"], ["src", "/assets/icon/map/pin-dirt.svg", 1, "animated-element", "pin-dirt"], ["src", "/assets/icon/map/pin-snow.svg", 1, "animated-element", "pin-snow"], ["src", "/assets/icon/map/pin-water.svg", 1, "animated-element", "pin-water"], [1, "ion-text-wrap"], ["src", "/assets/images/onboarding/steepness-background.svg", 1, "animated-element", "steepness-background"], ["src", "/assets/images/onboarding/danger-map.svg", 1, "animated-element", "danger-map"], ["src", "/assets/images/onboarding/user-location.svg", 1, "animated-element", "user-location"], ["src", "/assets/images/onboarding/exclamation-mark.svg", 1, "animated-element", "exclamation-mark"], ["src", "/assets/images/onboarding/add-observation.svg", 1, "animated-element", "add-observation"], ["src", "/assets/images/onboarding/photos.svg", 1, "animated-element", "photos"], ["src", "/assets/images/onboarding/pin.svg", 1, "animated-element", "pin"], ["src", "/assets/images/onboarding/ruler.svg", 1, "animated-element", "ruler"], ["src", "/assets/images/onboarding/document.svg", 1, "animated-element", "document"], ["src", "/assets/images/onboarding/path.svg", 1, "animated-element", "path"], ["src", "/assets/images/onboarding/eye.svg", 1, "animated-element", "eye"], ["name", "star", 1, "animated-element", "star", "star1", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star2", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star3", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star4", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star5", 3, "ngClass"], ["src", "/assets/images/onboarding/competence-finger.svg", 1, "animated-element", "competence-finger", "float"], [1, "full-grid", "legal-grid"], [1, "legal-info-row"], [1, "ion-padding", "ion-align-self-bottom"], [1, "legal-icon", 3, "ngClass"], [1, "legal-text-row"], ["align-self-top", ""], [1, "ion-no-padding", "ion-text-wrap"], ["color", "varsom-blue"], ["expand", "full", "fill", "clear", 1, "ion-no-margin", "ion-no-padding", 3, "click"], [3, "value"]], template: function StartWizardPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-slides", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionSlideReachEnd", function StartWizardPage_Template_ion_slides_ionSlideReachEnd_1_listener() { return ctx.ionSlideReachEnd(); })("ionSlidePrevStart", function StartWizardPage_Template_ion_slides_ionSlidePrevStart_1_listener() { return ctx.ionSlidePrevStart(); })("ionSlideTransitionStart", function StartWizardPage_Template_ion_slides_ionSlideTransitionStart_1_listener() { return ctx.ionSlideTransitionStart(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "svg-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "svg-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, StartWizardPage_span_15_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "ion-list", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-item", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, StartWizardPage_span_21_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function StartWizardPage_Template_ion_select_ngModelChange_22_listener($event) { return ctx.language = $event; })("ngModelChange", function StartWizardPage_Template_ion_select_ngModelChange_22_listener() { return ctx.saveLanguage(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](23, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, StartWizardPage_ion_select_option_24_Template, 2, 2, "ion-select-option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "svg-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "svg-icon", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "svg-icon", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "svg-icon", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "svg-icon", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](40, "svg-icon", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](45, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "h3", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](48, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](54, "svg-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](56, "svg-icon", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](58, "svg-icon", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](60, "svg-icon", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](65, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "h3", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](68, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](74, "svg-icon", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](76, "svg-icon", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](78, "svg-icon", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](80, "svg-icon", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](82, "svg-icon", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](84, "svg-icon", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](86, "svg-icon", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](88, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](90);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](91, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "h3", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](94, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](100, "ion-icon", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](101, "ion-icon", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](102, "ion-icon", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](103, "ion-icon", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](104, "ion-icon", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](105, "svg-icon", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "ion-row", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "ion-col", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](110, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "h3", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](113, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "ion-slide");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "ion-grid", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "ion-row", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](117, "ion-col", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, "\u00A7 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "ion-row", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "ion-col", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](123);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](124, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "h3", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "ul");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](128);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](129, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](131);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](132, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](135, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "ion-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](137, "ion-toolbar", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "ion-button", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StartWizardPage_Template_ion_button_click_138_listener() { return ctx.start(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](140, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](83, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@pulse", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](14, 51, "SETTINGS.LANGUAGE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.language !== ctx.LangKey.en);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](20, 53, "START_WIZARD.CHOOSE_LANGUAGE.HEADER"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.language !== ctx.LangKey.en);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](23, 55, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.language);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.supportedLanguages);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpWarning", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpIce", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpDirt", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpSnow", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpWater", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation1", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](45, 57, "START_WIZARD.PAGE_1.HEADER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](48, 59, "START_WIZARD.PAGE_1.LINE_1"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@slideInFromRight", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@nudgeExclamation", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation2", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](65, 61, "START_WIZARD.PAGE_2.HEADER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](68, 63, "START_WIZARD.PAGE_2.LINE_1"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@pulse", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRight", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRightLess", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRight", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownLeft", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownLeft", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveLeftAndABitDown", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation3", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](91, 65, "START_WIZARD.PAGE_3.HEADER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](94, 67, "START_WIZARD.PAGE_3.LINE_1"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](84, _c1, ctx.visibleStarNumber >= 1));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](86, _c1, ctx.visibleStarNumber >= 2));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](88, _c1, ctx.visibleStarNumber >= 3));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](90, _c1, ctx.visibleStarNumber >= 4));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](92, _c1, ctx.visibleStarNumber >= 5));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation4", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](110, 69, "START_WIZARD.COMPETENCE_PAGE.HEADER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](113, 71, "START_WIZARD.COMPETENCE_PAGE.LINE_1"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](94, _c2, !ctx.showLegalIcon));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation5", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](124, 73, "LEGAL_TERMS.HEADER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText1", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](129, 75, "LEGAL_TERMS.LINE_1"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText2", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](132, 77, "LEGAL_TERMS.LINE_2"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText3", ctx.state);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](135, 79, "LEGAL_TERMS.LINE_3"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](140, 81, ctx.reachedEnd ? "START_WIZARD.I_UNDERSTAND" : "START_WIZARD.SKIP_START"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlides, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlide, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_14__.SvgIconComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSelectOption], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe], styles: ["ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  color: #fff;\n  text-transform: none;\n  text-transform: initial;\n  height: 56px;\n}\n\nion-list[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.language-list[_ngcontent-%COMP%] {\n  max-width: 250px;\n}\n\n.language-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --inner-padding-end: 0px;\n}\n\n@-webkit-keyframes usermarker-pulsate {\n  from {\n    width: 40px;\n    height: 40px;\n    opacity: 0.5;\n  }\n  to {\n    width: 80px;\n    height: 80px;\n    transform: translate3d(-19px, -19px, 0px);\n    opacity: 0;\n  }\n}\n\n@keyframes usermarker-pulsate {\n  from {\n    width: 40px;\n    height: 40px;\n    opacity: 0.5;\n  }\n  to {\n    width: 80px;\n    height: 80px;\n    transform: translate3d(-19px, -19px, 0px);\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n\n@-webkit-keyframes float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n@keyframes float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n.float[_ngcontent-%COMP%] {\n  -webkit-animation: float 2s ease-in-out infinite;\n          animation: float 2s ease-in-out infinite;\n}\n\nion-content[_ngcontent-%COMP%] {\n  --ion-background-color: #fff;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .full-grid[_ngcontent-%COMP%] {\n  padding-left: 6vw;\n  padding-right: 6vw;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-grid[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-bottom: 12vh;\n  height: auto;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-info-row[_ngcontent-%COMP%] {\n  height: 20vh;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  text-align: left;\n  padding-bottom: 5px;\n  font-size: 4vw;\n}\n\n@media screen and (min-width: 768px) {\n  ion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0px;\n  font-size: 24px;\n  font-weight: bold;\n  --ion-text-color-heading: var(--ion-text-color-heading-white-pages);\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .dark-color[_ngcontent-%COMP%] {\n  color: var(--ion-text-color);\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  --inner-border-width: 0 0 0 0;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  border-radius: 50%;\n  color: #fff;\n  background-color: var(--ion-color-varsom-blue-tint);\n  width: 70px;\n  height: 70px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon.hide[_ngcontent-%COMP%] {\n  display: none;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon[_ngcontent-%COMP%]:before {\n  content: \"\";\n  width: 120px;\n  height: 120px;\n  background-image: url(\"/assets/images/onboarding/legal-spinner.png\");\n  -webkit-animation: rotate 3s linear infinite;\n          animation: rotate 3s linear infinite;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  opacity: 0.5;\n  display: block;\n  position: absolute;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  top: 50%;\n  left: 50%;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.eclipse[_ngcontent-%COMP%] {\n  left: -41px;\n  top: -85px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.bubble[_ngcontent-%COMP%] {\n  left: -100px;\n  top: 30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.line[_ngcontent-%COMP%] {\n  left: -182px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.warning[_ngcontent-%COMP%] {\n  left: 50px;\n  top: 40px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-ice[_ngcontent-%COMP%] {\n  top: 111px;\n  left: -26px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-dirt[_ngcontent-%COMP%] {\n  top: -80px;\n  left: 84px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-snow[_ngcontent-%COMP%] {\n  top: -58px;\n  left: -44px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-water[_ngcontent-%COMP%] {\n  left: -133px;\n  top: 26px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.steepness-background[_ngcontent-%COMP%] {\n  top: -190px;\n  left: -188px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.danger-map[_ngcontent-%COMP%] {\n  left: -190px;\n  top: -136px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.user-location[_ngcontent-%COMP%] {\n  left: 42px;\n  top: 81px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.user-location[_ngcontent-%COMP%]:before {\n  content: \"\";\n  display: block;\n  -webkit-animation: usermarker-pulsate 1.5s ease-in-out infinite;\n          animation: usermarker-pulsate 1.5s ease-in-out infinite;\n  border: 5px solid #6996a3;\n  background-color: #fff;\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n  position: absolute;\n  z-index: -1;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.exclamation-mark[_ngcontent-%COMP%] {\n  left: -72px;\n  top: -34px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.add-observation[_ngcontent-%COMP%] {\n  left: -37px;\n  top: 50px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.competence-finger[_ngcontent-%COMP%] {\n  left: -49px;\n  top: 2px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  top: -97px;\n  color: var(--ion-color-varsom-blue-light-3);\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star.dark[_ngcontent-%COMP%] {\n  color: var(--ion-color-varsom-blue-light-1);\n  transition: color 200ms ease-in;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star1[_ngcontent-%COMP%] {\n  left: -115px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star2[_ngcontent-%COMP%] {\n  left: -65px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star2.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-2;\n          animation-name: activate-star-2;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star3[_ngcontent-%COMP%] {\n  left: -15px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star3.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-3;\n          animation-name: activate-star-3;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star4[_ngcontent-%COMP%] {\n  left: 35px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star4.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-4;\n          animation-name: activate-star-4;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star5[_ngcontent-%COMP%] {\n  left: 85px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star5.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-5;\n          animation-name: activate-star-5;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.photos[_ngcontent-%COMP%] {\n  left: -131px;\n  top: 38px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin[_ngcontent-%COMP%] {\n  left: -68px;\n  top: -38px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.ruler[_ngcontent-%COMP%] {\n  left: -119px;\n  top: -72px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.document[_ngcontent-%COMP%] {\n  left: 9px;\n  top: -30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.path[_ngcontent-%COMP%] {\n  left: 63px;\n  top: -97px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.eye[_ngcontent-%COMP%] {\n  left: 49px;\n  top: 34px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.text[_ngcontent-%COMP%] {\n  left: -78px;\n  top: 207px;\n  color: var(--ion-color-varsom-orange);\n  font-size: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LXdpemFyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSx1QkFBQTtFQUNBLFlBQUE7QUFETjs7QUFNQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUhGOztBQU1BO0VBQ0UsZ0JBQUE7QUFIRjs7QUFJRTtFQUNFLHdCQUFBO0FBRko7O0FBTUE7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQUhGO0VBS0E7SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLHlDQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7O0FBUkE7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQUhGO0VBS0E7SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLHlDQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7O0FBTUE7RUFDRTtJQUNFLHVCQUFBO0VBSkY7RUFNQTtJQUNFLDBCQUFBO0VBSkY7QUFDRjs7QUFGQTtFQUNFO0lBQ0UsdUJBQUE7RUFKRjtFQU1BO0lBQ0UsMEJBQUE7RUFKRjtBQUNGOztBQU9BO0VBQ0U7SUFDRSwwQkFBQTtFQUxGO0VBT0E7SUFDRSw0QkFBQTtFQUxGO0VBT0E7SUFDRSwwQkFBQTtFQUxGO0FBQ0Y7O0FBSkE7RUFDRTtJQUNFLDBCQUFBO0VBTEY7RUFPQTtJQUNFLDRCQUFBO0VBTEY7RUFPQTtJQUNFLDBCQUFBO0VBTEY7QUFDRjs7QUFRQTtFQUNFLGdEQUFBO1VBQUEsd0NBQUE7QUFORjs7QUFTQTtFQUNFLDRCQUFBO0FBTkY7O0FBUUU7RUFDRSxZQUFBO0FBTko7O0FBUUk7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBTk47O0FBU0k7RUFDRSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQVBOOztBQVVJO0VBQ0UsWUFBQTtBQVJOOztBQVlNO0VBQ0Usa0JBQUE7QUFWUjs7QUFXUTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxj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ZmlsZSI6InN0YXJ0LXdpemFyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tZm9vdGVyIHtcclxuICBpb24tdG9vbGJhciB7XHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBpbml0aWFsO1xyXG4gICAgICBoZWlnaHQ6IDU2cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgbWFyZ2luLXRvcDogMTZweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5sYW5ndWFnZS1saXN0IHtcclxuICBtYXgtd2lkdGg6IDI1MHB4O1xyXG4gIGlvbi1pdGVtIHtcclxuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdXNlcm1hcmtlci1wdWxzYXRlIHtcclxuICBmcm9tIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB3aWR0aDogODBweDtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTE5cHgsIC0xOXB4LCAwcHgpO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcm90YXRlIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgZmxvYXQge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICB9XHJcbn1cclxuXHJcbi5mbG9hdCB7XHJcbiAgYW5pbWF0aW9uOiBmbG9hdCAycyBlYXNlLWluLW91dCBpbmZpbml0ZTtcclxufVxyXG5cclxuaW9uLWNvbnRlbnQge1xyXG4gIC0taW9uLWJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcblxyXG4gIGlvbi1zbGlkZXMge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIC5mdWxsLWdyaWQge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDZ2dztcclxuICAgICAgcGFkZGluZy1yaWdodDogNnZ3O1xyXG4gICAgfVxyXG5cclxuICAgIC5sZWdhbC1ncmlkIHtcclxuICAgICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgICAgcGFkZGluZy1ib3R0b206IDEydmg7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgIH1cclxuXHJcbiAgICAubGVnYWwtaW5mby1yb3cge1xyXG4gICAgICBoZWlnaHQ6IDIwdmg7XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2FsLXRleHQtcm93IHtcclxuICAgICAgdWwge1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMThweDtcclxuICAgICAgICBsaSB7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogNHZ3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgbGkge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLXNsaWRlIHtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuXHJcbiAgICBoMiB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nLXdoaXRlLXBhZ2VzKTtcclxuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tO1xyXG4gICAgfVxyXG5cclxuICAgIGgzIHtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XHJcbiAgICB9XHJcblxyXG4gICAgLmRhcmstY29sb3Ige1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1jYXJkIHtcclxuICAgICAgLS1pbm5lci1ib3JkZXItd2lkdGg6IDAgMCAwIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2FsLWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS10aW50KTtcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgIGhlaWdodDogNzBweDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG5cclxuICAgICAgJi5oaWRlIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgY29udGVudDogXCJcIjtcclxuICAgICAgICB3aWR0aDogMTIwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2xlZ2FsLXNwaW5uZXIucG5nXCIpO1xyXG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDNzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICB0b3A6IDUwJTtcclxuICAgICAgbGVmdDogNTAlO1xyXG5cclxuICAgICAgLmFuaW1hdGVkLWVsZW1lbnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHJcbiAgICAgICAgJi5lY2xpcHNlIHtcclxuICAgICAgICAgIGxlZnQ6IC00MXB4O1xyXG4gICAgICAgICAgdG9wOiAtODVweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJi5idWJibGUge1xyXG4gICAgICAgICAgbGVmdDogLTEwMHB4O1xyXG4gICAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5saW5lIHtcclxuICAgICAgICAgIGxlZnQ6IC0xODJweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYud2FybmluZyB7XHJcbiAgICAgICAgICBsZWZ0OiA1MHB4O1xyXG4gICAgICAgICAgdG9wOiA0MHB4O1xyXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waW4taWNlIHtcclxuICAgICAgICAgIHRvcDogMTExcHg7XHJcbiAgICAgICAgICBsZWZ0OiAtMjZweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYucGluLWRpcnQge1xyXG4gICAgICAgICAgdG9wOiAtODBweDtcclxuICAgICAgICAgIGxlZnQ6IDg0cHg7XHJcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnBpbi1zbm93IHtcclxuICAgICAgICAgIHRvcDogLTU4cHg7XHJcbiAgICAgICAgICBsZWZ0OiAtNDRweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYucGluLXdhdGVyIHtcclxuICAgICAgICAgIGxlZnQ6IC0xMzNweDtcclxuICAgICAgICAgIHRvcDogMjZweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuc3RlZXBuZXNzLWJhY2tncm91bmQge1xyXG4gICAgICAgICAgdG9wOiAtMTkwcHg7XHJcbiAgICAgICAgICBsZWZ0OiAtMTg4cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmRhbmdlci1tYXAge1xyXG4gICAgICAgICAgbGVmdDogLTE5MHB4O1xyXG4gICAgICAgICAgdG9wOiAtMTM2cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnVzZXItbG9jYXRpb24ge1xyXG4gICAgICAgICAgbGVmdDogNDJweDtcclxuICAgICAgICAgIHRvcDogODFweDtcclxuXHJcbiAgICAgICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBhbmltYXRpb246IHVzZXJtYXJrZXItcHVsc2F0ZSAxLjVzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xyXG4gICAgICAgICAgICBib3JkZXI6IDVweCBzb2xpZCAjNjk5NmEzO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgei1pbmRleDogLTE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmV4Y2xhbWF0aW9uLW1hcmsge1xyXG4gICAgICAgICAgbGVmdDogLTcycHg7XHJcbiAgICAgICAgICB0b3A6IC0zNHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5hZGQtb2JzZXJ2YXRpb24ge1xyXG4gICAgICAgICAgbGVmdDogLTM3cHg7XHJcbiAgICAgICAgICB0b3A6IDUwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmNvbXBldGVuY2UtZmluZ2VyIHtcclxuICAgICAgICAgIGxlZnQ6IC00OXB4O1xyXG4gICAgICAgICAgdG9wOiAycHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIge1xyXG4gICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICB0b3A6IC05N3B4O1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1saWdodC0zKTtcclxuXHJcbiAgICAgICAgICAmLmRhcmsge1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1ibHVlLWxpZ2h0LTEpO1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAyMDBtcyBlYXNlLWluO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5zdGFyMSB7XHJcbiAgICAgICAgICBsZWZ0OiAtMTE1cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIyIHtcclxuICAgICAgICAgIGxlZnQ6IC02NXB4O1xyXG4gICAgICAgICAgJi5hbmltYXRlZCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBhY3RpdmF0ZS1zdGFyLTI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIzIHtcclxuICAgICAgICAgIGxlZnQ6IC0xNXB4O1xyXG4gICAgICAgICAgJi5hbmltYXRlZCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBhY3RpdmF0ZS1zdGFyLTM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXI0IHtcclxuICAgICAgICAgIGxlZnQ6IDM1cHg7XHJcbiAgICAgICAgICAmLmFuaW1hdGVkIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGFjdGl2YXRlLXN0YXItNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuc3RhcjUge1xyXG4gICAgICAgICAgbGVmdDogODVweDtcclxuICAgICAgICAgICYuYW5pbWF0ZWQge1xyXG4gICAgICAgICAgICBhbmltYXRpb24tbmFtZTogYWN0aXZhdGUtc3Rhci01O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waG90b3Mge1xyXG4gICAgICAgICAgbGVmdDogLTEzMXB4O1xyXG4gICAgICAgICAgdG9wOiAzOHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waW4ge1xyXG4gICAgICAgICAgbGVmdDogLTY4cHg7XHJcbiAgICAgICAgICB0b3A6IC0zOHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5ydWxlciB7XHJcbiAgICAgICAgICBsZWZ0OiAtMTE5cHg7XHJcbiAgICAgICAgICB0b3A6IC03MnB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5kb2N1bWVudCB7XHJcbiAgICAgICAgICBsZWZ0OiA5cHg7XHJcbiAgICAgICAgICB0b3A6IC0zMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5wYXRoIHtcclxuICAgICAgICAgIGxlZnQ6IDYzcHg7XHJcbiAgICAgICAgICB0b3A6IC05N3B4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5leWUge1xyXG4gICAgICAgICAgbGVmdDogNDlweDtcclxuICAgICAgICAgIHRvcDogMzRweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYudGV4dCB7XHJcbiAgICAgICAgICBsZWZ0OiAtNzhweDtcclxuICAgICAgICAgIHRvcDogMjA3cHg7XHJcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UpO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"], data: { animation: _start_wizard_animations__WEBPACK_IMPORTED_MODULE_1__.animations } });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc19zdGFydC13aXphcmRfc3RhcnQtd2l6YXJkX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPNkI7QUFFdEIsTUFBTSxrQkFBa0IsR0FBRyxxQ0FBcUMsQ0FBQztBQUNqRSxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUM7QUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxzQkFBc0IsQ0FBQztBQUVqRCxNQUFNLGdCQUFnQixHQUFHLDhEQUFTLENBQUM7SUFDeEMsMERBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbkQsMERBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBRUksTUFBTSxjQUFjLEdBQUcsOERBQVMsQ0FBQztJQUN0QywwREFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNuRCwwREFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMzRCwwREFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUN0RCxDQUFDLENBQUM7QUFFSSxNQUFNLHNCQUFzQixHQUFHLDhEQUFTLENBQUM7SUFDOUMsMERBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEQsMERBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBRUksU0FBUyxtQkFBbUIsQ0FBQyxLQUFhO0lBQy9DLE9BQU87UUFDTCwwREFB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S0FBNEM7UUFFNUMsMERBQTRDO1FBQTVDLHVLQUE0QztRQVNwRywwREFBMkI7UUFBM0Isd0ZBQTJCO1FBQUMsMERBQW1EO1FBQW5ELDBLQUFtRDtRQUVqRiwwREFDRjtRQURFLHFMQUNGO1FBU3dCLDBEQUFxQztRQUFyQywrSkFBcUM7UUFNekQsMERBQTJCO1FBQTNCLHdGQUEyQjtRQUFDLDBEQUFvQztRQUFwQyx5SkFBb0M7UUFHNUQsMERBQXFCO1FBQXJCLGtGQUFxQjtRQUFDLDBEQUFvQztRQUFwQyx5SkFBb0M7UUFDMUQsMERBQXFCO1FBQXJCLGtGQUFxQjtRQUFDLDBEQUFvQztRQUFwQyx5SkFBb0M7UUFDMUQsMERBQXFCO1FBQXJCLGtGQUFxQjtRQUFDLDBEQUFvQztRQUFwQyx5SkFBb0M7UUFZeEUsMERBR0Y7UUFIRSx3TkFHRjttNnpCRDdNVSxnRUFBVSIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL3BhZ2VzL3N0YXJ0LXdpemFyZC9zdGFydC13aXphcmQuYW5pbWF0aW9ucy50cyIsIi4vc3JjL2FwcC9wYWdlcy9zdGFydC13aXphcmQvc3RhcnQtd2l6YXJkLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy9zdGFydC13aXphcmQvc3RhcnQtd2l6YXJkLnBhZ2UudHMiLCIuL3NyYy9hcHAvcGFnZXMvc3RhcnQtd2l6YXJkL3N0YXJ0LXdpemFyZC5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICB0cmlnZ2VyLFxyXG4gIHN0YXRlLFxyXG4gIHRyYW5zaXRpb24sXHJcbiAgc3R5bGUsXHJcbiAgYW5pbWF0ZSxcclxuICBrZXlmcmFtZXNcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBzY2FsZVVwQ3ViaWNCZXppZXIgPSAnY3ViaWMtYmV6aWVyKDAuNjQsIDAuMSwgMC41NywgMS41MyknO1xyXG5leHBvcnQgY29uc3QgZGVmYXVsdER1cmF0aW9uID0gJzcwMG1zJztcclxuZXhwb3J0IGNvbnN0IHNjYWxlVXBIZWFkZXJGcm9tID0gJ3NjYWxlM2QoMC45LCAwLjksIDEpJztcclxuXHJcbmV4cG9ydCBjb25zdCBrZXlGcmFtZXNTY2FsZVVwID0ga2V5ZnJhbWVzKFtcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMCwgMCwgMSknLCBvZmZzZXQ6IDAgfSksXHJcbiAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZTNkKDEsIDEsIDEpJywgb2Zmc2V0OiAxIH0pXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtleUZyYW1lc1B1bHNlID0ga2V5ZnJhbWVzKFtcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknLCBvZmZzZXQ6IDAgfSksXHJcbiAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZTNkKDEuMiwgMS4yLCAxLjIpJywgb2Zmc2V0OiAwLjUgfSksXHJcbiAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZTNkKDEsIDEsIDEpJywgb2Zmc2V0OiAxLjAgfSlcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga2V5RnJhbWVzU2NhbGVVcEhlYWRlciA9IGtleWZyYW1lcyhbXHJcbiAgc3R5bGUoeyB0cmFuc2Zvcm06IHNjYWxlVXBIZWFkZXJGcm9tLCBvZmZzZXQ6IDAgfSksXHJcbiAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZTNkKDEsIDEsIDEpJywgb2Zmc2V0OiAxIH0pXHJcbl0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlVXBBbmltYXRpb24oZGVsYXk6IG51bWJlcikge1xyXG4gIHJldHVybiBbXHJcbiAgICBzdGF0ZShcclxuICAgICAgJyonLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUzZCgwLCAwLCAxKSdcclxuICAgICAgfSlcclxuICAgICksXHJcbiAgICAvLyBodHRwOi8vY3ViaWMtYmV6aWVyLmNvbS8jLjY0LC4xLC41NywxLjUzXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiBwYWdlXzEnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgIGAke2RlZmF1bHREdXJhdGlvbn0gJHtkZWxheX1tcyAke3NjYWxlVXBDdWJpY0Jlemllcn1gLFxyXG4gICAgICAgIGtleUZyYW1lc1NjYWxlVXBcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHN0YXRlKFxyXG4gICAgICAncGFnZV8xJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZhZGVJbkFuaW1hdGlvbihwYWdlOiBudW1iZXIsIGRlbGF5OiBudW1iZXIpIHtcclxuICByZXR1cm4gW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSlcclxuICAgICksXHJcbiAgICAvLyBodHRwOi8vY3ViaWMtYmV6aWVyLmNvbS8jLjY0LC4xLC41NywxLjUzXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICBgKiA9PiBwYWdlXyR7cGFnZX1gLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgIGA1MDBtcyAke2RlbGF5fW1zIGVhc2Utb3V0YCxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEsIG9mZnNldDogMSB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgICksXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICBgcGFnZV8ke3BhZ2V9ID0+ICpgLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc1MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApLFxyXG4gICAgc3RhdGUoXHJcbiAgICAgIGBwYWdlXyR7cGFnZX1gLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkZXJBbmltYXRpb24ocGFnZTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnKicsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlVXBIZWFkZXJGcm9tXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgYCogPT4gcGFnZV8ke3BhZ2V9YCxcclxuICAgICAgYW5pbWF0ZShgNTAwbXMgMjAwbXMgJHtzY2FsZVVwQ3ViaWNCZXppZXJ9YCwga2V5RnJhbWVzU2NhbGVVcEhlYWRlcilcclxuICAgICksXHJcbiAgICBzdGF0ZShcclxuICAgICAgYHBhZ2VfJHtwYWdlfWAsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZTNkKDEsIDEsIDEpJ1xyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIF07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhbmltYXRpb25zID0gW1xyXG4gIC8vIEdlbmVyaWMgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ3B1bHNlJywgW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gKicsXHJcbiAgICAgIGFuaW1hdGUoYCR7ZGVmYXVsdER1cmF0aW9ufSA1MDBtcyBlYXNlLW91dGAsIGtleUZyYW1lc1B1bHNlKVxyXG4gICAgKVxyXG4gIF0pLFxyXG5cclxuICAvLyBQYWdlIDAgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ2hlYWRlckFuaW1hdGlvbicsIGdldEhlYWRlckFuaW1hdGlvbigwKSksXHJcblxyXG4gIC8vIFBhZ2UgMSBhbmltYXRpb25zXHJcbiAgdHJpZ2dlcignaGVhZGVyQW5pbWF0aW9uMScsIGdldEhlYWRlckFuaW1hdGlvbigxKSksXHJcbiAgdHJpZ2dlcignc2NhbGVVcEljZScsIGdldFNjYWxlVXBBbmltYXRpb24oNTAwKSksXHJcbiAgdHJpZ2dlcignc2NhbGVVcFdhdGVyJywgZ2V0U2NhbGVVcEFuaW1hdGlvbig3MDApKSxcclxuICB0cmlnZ2VyKCdzY2FsZVVwV2FybmluZycsIGdldFNjYWxlVXBBbmltYXRpb24oODIwKSksXHJcbiAgdHJpZ2dlcignc2NhbGVVcFNub3cnLCBnZXRTY2FsZVVwQW5pbWF0aW9uKDEwMDApKSxcclxuICB0cmlnZ2VyKCdzY2FsZVVwRGlydCcsIGdldFNjYWxlVXBBbmltYXRpb24oNjUwKSksXHJcbiAgdHJpZ2dlcignYm91bmNlUGF0aCcsIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnKicsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICdwYWdlXzAgPT4gcGFnZV8xJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnNzAwbXMgZWFzZS1vdXQnLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoNjVweCknLCBvZmZzZXQ6IDAuNSB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9mZnNldDogMS4wIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICdwYWdlXzIgPT4gcGFnZV8xJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnNzAwbXMgZWFzZS1vdXQnLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTY1cHgpJywgb2Zmc2V0OiAwLjUgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBvZmZzZXQ6IDEuMCB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgIClcclxuICBdKSxcclxuXHJcbiAgLy8gUGFnZSAyIGFuaW1hdGlvbnNcclxuICB0cmlnZ2VyKCdoZWFkZXJBbmltYXRpb24yJywgZ2V0SGVhZGVyQW5pbWF0aW9uKDIpKSxcclxuICB0cmlnZ2VyKCdzbGlkZUluRnJvbVJpZ2h0JywgW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMjAwcHgpJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMicsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzEyMDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgyMDBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLCBvZmZzZXQ6IDEuMCB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgICksXHJcbiAgICBzdGF0ZShcclxuICAgICAgJ3BhZ2VfMicsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIF0pLFxyXG4gIHRyaWdnZXIoJ251ZGdlRXhjbGFtYXRpb24nLCBbXHJcbiAgICB0cmFuc2l0aW9uKCcqID0+IHBhZ2VfMicsIGFuaW1hdGUoJzUwMG1zIDcwMG1zIGVhc2Utb3V0Jywga2V5RnJhbWVzUHVsc2UpKVxyXG4gIF0pLFxyXG5cclxuICAvLyBQYWdlIDMgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ2hlYWRlckFuaW1hdGlvbjMnLCBnZXRIZWFkZXJBbmltYXRpb24oMykpLFxyXG4gIHRyaWdnZXIoJ21vdmVEb3duUmlnaHQnLCBbXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiBwYWdlXzMnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC0zMHB4LCAtMjBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbW92ZURvd25SaWdodExlc3MnLCBbXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiBwYWdlXzMnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC0xMHB4LCAtMjBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbW92ZURvd25MZWZ0JywgW1xyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gcGFnZV8zJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnNzAwbXMgZWFzZS1vdXQnLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgxMHB4LCAtMjBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbW92ZUxlZnRBbmRBQml0RG93bicsIFtcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMycsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzcwMG1zIGVhc2Utb3V0JyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMjBweCwgLTEwcHgpJywgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMHB4LCAwcHgpJywgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIF0pLFxyXG4gIHRyaWdnZXIoJ21vdmVVcEFuZEFCaXRMZWZ0JywgW1xyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gcGFnZV8zJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnNzAwbXMgZWFzZS1vdXQnLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSg2cHgsIDI1cHgpJywgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMHB4LCAwcHgpJywgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIF0pLFxyXG4gIHRyaWdnZXIoJ21vdmVVcCcsIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnKicsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDIwcHgpJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMycsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgYDcwMG1zICR7c2NhbGVVcEN1YmljQmV6aWVyfWAsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgyMHB4KScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwcHgpJywgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICdwYWdlXzMgPT4gKicsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgYDcwMG1zICR7c2NhbGVVcEN1YmljQmV6aWVyfWAsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwcHgpJywgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDIwcHgpJywgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHN0YXRlKFxyXG4gICAgICAncGFnZV8zJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMHB4KSdcclxuICAgICAgfSlcclxuICAgIClcclxuICBdKSxcclxuXHJcbiAgLy8gUGFnZSA0IGFuaW1hdGlvbnNcclxuICB0cmlnZ2VyKCdoZWFkZXJBbmltYXRpb240JywgZ2V0SGVhZGVyQW5pbWF0aW9uKDQpKSxcclxuXHJcbiAgLy8gUGFnZSA1IGFuaW1hdGlvbnNcclxuICB0cmlnZ2VyKCdoZWFkZXJBbmltYXRpb241JywgZ2V0SGVhZGVyQW5pbWF0aW9uKDUpKSxcclxuICB0cmlnZ2VyKCdsZWdhbFRleHQxJywgZ2V0RmFkZUluQW5pbWF0aW9uKDUsIDEwMDApKSxcclxuICB0cmlnZ2VyKCdsZWdhbFRleHQyJywgZ2V0RmFkZUluQW5pbWF0aW9uKDUsIDIwMDApKSxcclxuICB0cmlnZ2VyKCdsZWdhbFRleHQzJywgZ2V0RmFkZUluQW5pbWF0aW9uKDUsIDMwMDApKVxyXG5dO1xyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN0YXJ0V2l6YXJkUGFnZSB9IGZyb20gJy4vc3RhcnQtd2l6YXJkLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBTdGFydFdpemFyZFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKSwgU2hhcmVkTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTdGFydFdpemFyZFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGFydFdpemFyZFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW9uU2xpZGVzLCBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBMYW5nS2V5LCBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IGFuaW1hdGlvbnMgfSBmcm9tICcuL3N0YXJ0LXdpemFyZC5hbmltYXRpb25zJztcclxuaW1wb3J0IHsgU3ViamVjdCwgdGltZXIsIGludGVydmFsIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCwgc2tpcFdoaWxlLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3RhcnQtd2l6YXJkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3RhcnQtd2l6YXJkLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3RhcnQtd2l6YXJkLnBhZ2Uuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnNcclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YXJ0V2l6YXJkUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBAVmlld0NoaWxkKElvblNsaWRlcykgc2xpZGVzOiBJb25TbGlkZXM7XHJcbiAgR2VvSGF6YXJkID0gR2VvSGF6YXJkO1xyXG4gIExhbmdLZXkgPSBMYW5nS2V5O1xyXG4gIHN0YXRlOiBzdHJpbmc7XHJcbiAgcmVhY2hlZEVuZCA9IGZhbHNlO1xyXG4gIHNob3dMZWdhbEljb24gPSBmYWxzZTtcclxuICB2aXNpYmxlU3Rhck51bWJlciA9IC0xO1xyXG4gIGxhbmd1YWdlOiBMYW5nS2V5O1xyXG4gIHN1cHBvcnRlZExhbmd1YWdlczoge1xyXG4gICAgbGFuZzogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgbGFuZ0tleTogTGFuZ0tleTtcclxuICB9W10gPSBzZXR0aW5ncy5sYW5ndWFnZS5zdXBwb3J0ZWRMYW5ndWFnZXMubWFwKChsYW5nKSA9PiAoe1xyXG4gICAgLi4ubGFuZyxcclxuICAgIGxhbmdLZXk6IExhbmdLZXlbbGFuZy5sYW5nXVxyXG4gIH0pKTtcclxuXHJcbiAgcHJpdmF0ZSBuZ0Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIGFjdGl2ZUluZGV4ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xyXG4gIHByaXZhdGUgaXNJbmNyZWFzaW5nID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyXHJcbiAgKSB7fVxyXG5cclxuICBpb25WaWV3V2lsbEVudGVyKCkge1xyXG4gICAgdGhpcy5zdGF0ZSA9ICd4JztcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgodXMpID0+IHtcclxuICAgICAgdGhpcy5sYW5ndWFnZSA9IHVzLmxhbmd1YWdlO1xyXG4gICAgICB0aGlzLmluaXRTdGFySW5kZXhDb3VudGVyKCk7XHJcbiAgICAgIHRoaXMuc2V0UGFnZUluZGV4KDApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGFzeW5jIHNhdmVMYW5ndWFnZSgpIHtcclxuICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5zYXZlVXNlclNldHRpbmdzKHtcclxuICAgICAgLi4udXNlclNldHRpbmdzLFxyXG4gICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFBhZ2VJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5yZXNldFZpc2libGVTdGFycygpO1xyXG4gICAgICB0aGlzLnN0YXRlID0gYHBhZ2VfJHtpbmRleH1gO1xyXG4gICAgICB0aGlzLmFjdGl2ZUluZGV4Lm5leHQoaW5kZXgpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0VmlzaWJsZVN0YXJzKCkge1xyXG4gICAgdGhpcy52aXNpYmxlU3Rhck51bWJlciA9IC0xO1xyXG4gICAgdGhpcy5pc0luY3JlYXNpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBzbGlkZU5leHQoKSB7XHJcbiAgICB0aW1lcig3MDApXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5zbGlkZXMpIHtcclxuICAgICAgICAgIHRoaXMuc2xpZGVzLnNsaWRlTmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydCgpIHtcclxuICAgIGlmICh0aGlzLnJlYWNoZWRFbmQpIHtcclxuICAgICAgY29uc3QgdXNlclNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnNhdmVVc2VyU2V0dGluZ3Moe1xyXG4gICAgICAgIC4uLnVzZXJTZXR0aW5ncyxcclxuICAgICAgICBjb21wbGV0ZWRTdGFydFdpemFyZDogdHJ1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlUm9vdCgnLycpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zbGlkZXMuc2xpZGVUbyg1LCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uU2xpZGVUcmFuc2l0aW9uU3RhcnQoKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IGF3YWl0IHRoaXMuc2xpZGVzLmdldEFjdGl2ZUluZGV4KCk7XHJcbiAgICB0aGlzLnNldFBhZ2VJbmRleChpbmRleCk7XHJcbiAgfVxyXG5cclxuICBpb25TbGlkZVJlYWNoRW5kKCkge1xyXG4gICAgdGhpcy5yZWFjaGVkRW5kID0gdHJ1ZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dMZWdhbEljb24gPSB0cnVlO1xyXG4gICAgICAvLyBDcmF6eSBpb3MgYnVnIHRvIGdldCBhbmltYXRpb24gb24gc3Bpbm5lci4uIDpvXHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIGlvblNsaWRlUHJldlN0YXJ0KCkge1xyXG4gICAgdGhpcy5yZWFjaGVkRW5kID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRTdGFySW5kZXhDb3VudGVyKCkge1xyXG4gICAgdGhpcy5hY3RpdmVJbmRleFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBzd2l0Y2hNYXAoKGluZGV4KSA9PiBpbnRlcnZhbCg3MDApLnBpcGUoc2tpcFdoaWxlKCgpID0+IGluZGV4ICE9PSA0KSkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbmNyZWFzaW5nICYmIHRoaXMudmlzaWJsZVN0YXJOdW1iZXIgPj0gNikge1xyXG4gICAgICAgICAgLy8gQ291bnQgdG8gNiB0byBhZGQgYW4gZXh0cmEgcGF1c2Ugb24gdGhlIGVuZFxyXG4gICAgICAgICAgdGhpcy5pc0luY3JlYXNpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5jcmVhc2luZyAmJiB0aGlzLnZpc2libGVTdGFyTnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgLy8gQ291bnQgdG8gLTEgdG8gYWRkIGFuIGV4dHJhIHBhdXNlIG9uIHRoZSBzdGFydFxyXG4gICAgICAgICAgdGhpcy5pc0luY3JlYXNpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0luY3JlYXNpbmcpIHtcclxuICAgICAgICAgIHRoaXMudmlzaWJsZVN0YXJOdW1iZXIrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52aXNpYmxlU3Rhck51bWJlci0tO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tY29udGVudD5cclxuICA8aW9uLXNsaWRlcyBjbGFzcz1cIm9uYm9hcmRpbmdcIiBbb3B0aW9uc109XCJ7YXV0b3BsYXk6ZmFsc2V9XCIgcGFnZXI9XCJ0cnVlXCJcclxuICAgIChpb25TbGlkZVJlYWNoRW5kKT1cImlvblNsaWRlUmVhY2hFbmQoKVwiIChpb25TbGlkZVByZXZTdGFydCk9XCJpb25TbGlkZVByZXZTdGFydCgpXCJcclxuICAgIChpb25TbGlkZVRyYW5zaXRpb25TdGFydCk9XCJpb25TbGlkZVRyYW5zaXRpb25TdGFydCgpXCI+XHJcbiAgICA8aW9uLXNsaWRlPlxyXG4gICAgICA8aW9uLWdyaWQgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGVjbGlwc2VcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2VjbGlwc2Uuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGJ1YmJsZVwiIFtAcHVsc2VdPVwic3RhdGVcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2J1YmJsZS5zdmdcIj5cclxuICAgICAgICAgICAgICA8L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8aDIgW0BoZWFkZXJBbmltYXRpb25dPVwic3RhdGVcIj57eyBcIlNFVFRJTkdTLkxBTkdVQUdFXCIgfCB0cmFuc2xhdGUgfX08c3BhbiAqbmdJZj1cImxhbmd1YWdlICE9PSBMYW5nS2V5LmVuXCI+IC9cclxuICAgICAgICAgICAgICAgIExhbmd1YWdlPC9zcGFuPjwvaDI+XHJcbiAgICAgICAgICAgIDxpb24tbGlzdCBjbGFzcz1cImxhbmd1YWdlLWxpc3RcIj5cclxuICAgICAgICAgICAgICA8aW9uLWl0ZW0gY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICAgICAgICAgICAgICB7eydTVEFSVF9XSVpBUkQuQ0hPT1NFX0xBTkdVQUdFLkhFQURFUid8IHRyYW5zbGF0ZX19PHNwYW4gKm5nSWY9XCJsYW5ndWFnZSAhPT0gTGFuZ0tleS5lblwiPiAvIENob29zZVxyXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW9uLXNlbGVjdCBjYW5jZWxUZXh0PVwie3snRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlfX1cIiBbKG5nTW9kZWwpXT1cImxhbmd1YWdlXCJcclxuICAgICAgICAgICAgICAgICAgaW50ZXJmYWNlPVwiYWN0aW9uLXNoZWV0XCIgKG5nTW9kZWxDaGFuZ2UpPVwic2F2ZUxhbmd1YWdlKClcIj5cclxuICAgICAgICAgICAgICAgICAgPGlvbi1zZWxlY3Qtb3B0aW9uIFt2YWx1ZV09XCJsYW5nLmxhbmdLZXlcIiAqbmdGb3I9XCJsZXQgbGFuZyBvZiBzdXBwb3J0ZWRMYW5ndWFnZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYW5nLm5hbWUgfX1cclxuICAgICAgICAgICAgICAgICAgPC9pb24tc2VsZWN0LW9wdGlvbj5cclxuICAgICAgICAgICAgICAgIDwvaW9uLXNlbGVjdD5cclxuICAgICAgICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgICAgICA8L2lvbi1saXN0PlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPC9pb24tZ3JpZD5cclxuICAgIDwvaW9uLXNsaWRlPlxyXG4gICAgPGlvbi1zbGlkZT5cclxuICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBsaW5lXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9saW5lLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCB3YXJuaW5nXCIgW0BzY2FsZVVwV2FybmluZ109XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL3dhcm5pbmcuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBpbi1pY2VcIiBbQHNjYWxlVXBJY2VdPVwic3RhdGVcIiBzcmM9XCIvYXNzZXRzL2ljb24vbWFwL3Bpbi1pY2Uuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBpbi1kaXJ0XCIgW0BzY2FsZVVwRGlydF09XCJzdGF0ZVwiIHNyYz1cIi9hc3NldHMvaWNvbi9tYXAvcGluLWRpcnQuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBpbi1zbm93XCIgW0BzY2FsZVVwU25vd109XCJzdGF0ZVwiIHNyYz1cIi9hc3NldHMvaWNvbi9tYXAvcGluLXNub3cuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBpbi13YXRlclwiIFtAc2NhbGVVcFdhdGVyXT1cInN0YXRlXCIgc3JjPVwiL2Fzc2V0cy9pY29uL21hcC9waW4td2F0ZXIuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGgyIFtAaGVhZGVyQW5pbWF0aW9uMV09XCJzdGF0ZVwiPnt7J1NUQVJUX1dJWkFSRC5QQUdFXzEuSEVBREVSJ3x0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgICB7eydTVEFSVF9XSVpBUkQuUEFHRV8xLkxJTkVfMSd8dHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1zbGlkZT5cclxuICAgIDxpb24tc2xpZGU+XHJcbiAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImZ1bGwtZ3JpZFwiPlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgc3RlZXBuZXNzLWJhY2tncm91bmRcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9zdGVlcG5lc3MtYmFja2dyb3VuZC5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgZGFuZ2VyLW1hcFwiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvZGFuZ2VyLW1hcC5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgdXNlci1sb2NhdGlvblwiIFtAc2xpZGVJbkZyb21SaWdodF09XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL3VzZXItbG9jYXRpb24uc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGV4Y2xhbWF0aW9uLW1hcmtcIiBbQG51ZGdlRXhjbGFtYXRpb25dPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9leGNsYW1hdGlvbi1tYXJrLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBbQGhlYWRlckFuaW1hdGlvbjJdPVwic3RhdGVcIj57eydTVEFSVF9XSVpBUkQuUEFHRV8yLkhFQURFUid8dHJhbnNsYXRlfX08L2gyPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3snU1RBUlRfV0laQVJELlBBR0VfMi5MSU5FXzEnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8L2lvbi1ncmlkPlxyXG4gICAgPC9pb24tc2xpZGU+XHJcbiAgICA8aW9uLXNsaWRlPlxyXG4gICAgICA8aW9uLWdyaWQgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGFkZC1vYnNlcnZhdGlvblwiIFtAcHVsc2VdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9hZGQtb2JzZXJ2YXRpb24uc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBob3Rvc1wiIFtAbW92ZURvd25SaWdodF09XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL3Bob3Rvcy5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgcGluXCIgW0Btb3ZlRG93blJpZ2h0TGVzc109XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL3Bpbi5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgcnVsZXJcIiBbQG1vdmVEb3duUmlnaHRdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9ydWxlci5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgZG9jdW1lbnRcIiBbQG1vdmVEb3duTGVmdF09XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2RvY3VtZW50LnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwYXRoXCIgW0Btb3ZlRG93bkxlZnRdPVwic3RhdGVcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL3BhdGguc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGV5ZVwiIFtAbW92ZUxlZnRBbmRBQml0RG93bl09XCJzdGF0ZVwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2V5ZS5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCB0ZXh0XCIgW0Btb3ZlVXBdPVwic3RhdGVcIj57eydTVEFSVF9XSVpBUkQuUEFHRV8zLkJVVFRPTl9URVhUJyB8IHRyYW5zbGF0ZX19PC9oMz5cclxuICAgICAgICAgICAgPC9kaXY+IC0tPlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBbQGhlYWRlckFuaW1hdGlvbjNdPVwic3RhdGVcIj57eydTVEFSVF9XSVpBUkQuUEFHRV8zLkhFQURFUid8dHJhbnNsYXRlfX08L2gyPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3snU1RBUlRfV0laQVJELlBBR0VfMy5MSU5FXzEnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8L2lvbi1ncmlkPlxyXG4gICAgPC9pb24tc2xpZGU+XHJcbiAgICA8aW9uLXNsaWRlPlxyXG4gICAgICA8aW9uLWdyaWQgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0YXIgc3RhcjFcIiBuYW1lPVwic3RhclwiIFtuZ0NsYXNzXT1cInsnZGFyayc6IHZpc2libGVTdGFyTnVtYmVyID49IDF9XCI+XHJcbiAgICAgICAgICAgICAgPC9pb24taWNvbj5cclxuICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0YXIgc3RhcjJcIiBuYW1lPVwic3RhclwiIFtuZ0NsYXNzXT1cInsnZGFyayc6IHZpc2libGVTdGFyTnVtYmVyID49IDJ9XCI+XHJcbiAgICAgICAgICAgICAgPC9pb24taWNvbj5cclxuICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0YXIgc3RhcjNcIiBuYW1lPVwic3RhclwiIFtuZ0NsYXNzXT1cInsnZGFyayc6IHZpc2libGVTdGFyTnVtYmVyID49IDN9XCI+XHJcbiAgICAgICAgICAgICAgPC9pb24taWNvbj5cclxuICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0YXIgc3RhcjRcIiBuYW1lPVwic3RhclwiIFtuZ0NsYXNzXT1cInsnZGFyayc6IHZpc2libGVTdGFyTnVtYmVyID49IDR9XCI+XHJcbiAgICAgICAgICAgICAgPC9pb24taWNvbj5cclxuICAgICAgICAgICAgICA8aW9uLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0YXIgc3RhcjVcIiBuYW1lPVwic3RhclwiIFtuZ0NsYXNzXT1cInsnZGFyayc6IHZpc2libGVTdGFyTnVtYmVyID49IDV9XCI+XHJcbiAgICAgICAgICAgICAgPC9pb24taWNvbj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGNvbXBldGVuY2UtZmluZ2VyIGZsb2F0XCJcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvY29tcGV0ZW5jZS1maW5nZXIuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGgyIFtAaGVhZGVyQW5pbWF0aW9uNF09XCJzdGF0ZVwiPnt7J1NUQVJUX1dJWkFSRC5DT01QRVRFTkNFX1BBR0UuSEVBREVSJ3x0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgICB7eydTVEFSVF9XSVpBUkQuQ09NUEVURU5DRV9QQUdFLkxJTkVfMSd8dHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1zbGlkZT5cclxuICAgIDxpb24tc2xpZGU+XHJcbiAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImZ1bGwtZ3JpZCBsZWdhbC1ncmlkXCI+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJsZWdhbC1pbmZvLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tcGFkZGluZyBpb24tYWxpZ24tc2VsZi1ib3R0b21cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2FsLWljb25cIiBbbmdDbGFzc109XCJ7J2hpZGUnOiAhc2hvd0xlZ2FsSWNvbiB9XCI+JnNlY3Q7XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImxlZ2FsLXRleHQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBhbGlnbi1zZWxmLXRvcD5cclxuICAgICAgICAgICAgPGgyIFtAaGVhZGVyQW5pbWF0aW9uNV09XCJzdGF0ZVwiPnt7J0xFR0FMX1RFUk1TLkhFQURFUicgfCB0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cImlvbi1uby1wYWRkaW5nIGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGkgW0BsZWdhbFRleHQxXT1cInN0YXRlXCI+e3snTEVHQUxfVEVSTVMuTElORV8xJyB8IHRyYW5zbGF0ZX19PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBbQGxlZ2FsVGV4dDJdPVwic3RhdGVcIj57eydMRUdBTF9URVJNUy5MSU5FXzInIHwgdHJhbnNsYXRlfX08L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIFtAbGVnYWxUZXh0M109XCJzdGF0ZVwiPnt7J0xFR0FMX1RFUk1TLkxJTkVfMycgfCB0cmFuc2xhdGV9fTwvbGk+XHJcbiAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1zbGlkZT5cclxuICA8L2lvbi1zbGlkZXM+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxpb24tZm9vdGVyPlxyXG4gIDxpb24tdG9vbGJhciBjb2xvcj1cInZhcnNvbS1ibHVlXCI+XHJcbiAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cImlvbi1uby1tYXJnaW4gaW9uLW5vLXBhZGRpbmdcIiBleHBhbmQ9XCJmdWxsXCIgKGNsaWNrKT1cInN0YXJ0KClcIiBmaWxsPVwiY2xlYXJcIj5cclxuICAgICAge3sgKHJlYWNoZWRFbmQgP1xyXG4gICAgICAgICAgICAnU1RBUlRfV0laQVJELklfVU5ERVJTVEFORCcgOlxyXG4gICAgICAgICAgICAnU1RBUlRfV0laQVJELlNLSVBfU1RBUlQnKSB8dHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWJ1dHRvbj5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1mb290ZXI+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=