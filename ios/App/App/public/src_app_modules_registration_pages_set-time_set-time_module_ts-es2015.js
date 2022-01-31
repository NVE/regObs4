"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_set-time_set-time_module_ts"],{

/***/ 35140:
/*!*****************************************************************!*\
  !*** ./src/app/modules/registration/pages/base-page-service.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasePageService": function() { return /* binding */ BasePageService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.helpers */ 6174);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/registration.service */ 33181);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 32185);
/* harmony import */ var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/logging/logging.service */ 93042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















const DEBUG_TAG = 'BasePageService';
class BasePageService {
    constructor(registrationService, newAttachmentService, commonRegistrationService, ngZone, alertController, translateService, loggingService) {
        this.registrationService = registrationService;
        this.newAttachmentService = newAttachmentService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngZone = ngZone;
        this.alertController = alertController;
        this.translateService = translateService;
        this.loggingService = loggingService;
    }
    get Zone() {
        return this.ngZone;
    }
    get RegistrationService() {
        return this.registrationService;
    }
    get AlertController() {
        return this.alertController;
    }
    get TranslateService() {
        return this.translateService;
    }
    get CommonRegistrationService() {
        return this.commonRegistrationService;
    }
    confirmLeave(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const leaveText = yield this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();
            return this.createResetDialog(leaveText, registration, registrationTid, onReset);
        });
    }
    confirmReset(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const leaveText = yield this.translateService.get('REGISTRATION.CONFIRM_RESET').toPromise();
            return this.createResetDialog(leaveText, registration, registrationTid, onReset);
        });
    }
    createResetDialog(message, registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();
            const alert = yield this.alertController.create({
                message,
                buttons: [
                    {
                        text: translations['DIALOGS.CANCEL'],
                        role: 'cancel'
                    },
                    {
                        text: translations['DIALOGS.YES']
                    }
                ]
            });
            yield alert.present();
            const result = yield alert.onDidDismiss();
            const reset = result.role !== 'cancel';
            if (reset) {
                yield this.reset(registration, registrationTid, onReset);
            }
            return reset;
        });
    }
    reset(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            this.Zone.run(() => {
                if (registrationTid) {
                    registration.request[(0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid)] = this.getDefaultValue(registrationTid);
                    this.resetImages(registration);
                }
                if (onReset) {
                    onReset();
                }
            });
            yield this.registrationService.saveRegistrationAsync(registration);
        });
    }
    createDefaultProps(registration, registrationTid) {
        const propName = (0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid);
        if (!registration.request[propName]) {
            // Init to new object if null
            registration.request[propName] = this.getDefaultValue(registrationTid);
        }
    }
    getDefaultValue(registrationTid) {
        if ((0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.isArrayType)(registrationTid)) {
            return [];
        }
        else {
            return {};
        }
    }
    resetImages(registration) {
        this.newAttachmentService
            .getAttachments(registration.id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)((attachments) => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)(attachments.map((a) => this.newAttachmentService.removeAttachment(registration.id, a.id)))))
            .subscribe(() => {
            this.loggingService.debug('Reset images complete', DEBUG_TAG);
        }, (error) => {
            this.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
        });
    }
}
BasePageService.ɵfac = function BasePageService_Factory(t) { return new (t || BasePageService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService)); };
BasePageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: BasePageService, factory: BasePageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 81877:
/*!*********************************************************!*\
  !*** ./src/app/modules/registration/pages/base.page.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasePage": function() { return /* binding */ BasePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 71258);











class BasePage extends _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.NgDestoryBase {
    constructor(registrationTid, basePageService, activatedRoute) {
        super();
        this.basePageService = basePageService;
        this.activatedRoute = activatedRoute;
        this.registrationTid = registrationTid;
    }
    ngOnInit() { }
    ionViewDidEnter() {
        const id = this.activatedRoute.snapshot.params['id'];
        this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((reg) => {
            this.basePageService.createDefaultProps(reg, this.registrationTid);
            return reg;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)((reg) => {
            this.registration = reg;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => this.createInitObservable()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$))
            .subscribe();
    }
    // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module
    canLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            // Check if implementation page has implemented custom isValid logic
            const valid = yield Promise.resolve(this.isValid ? this.isValid() : true);
            // Only return alert if page is not empty and invalid
            const isEmpty = yield Promise.resolve(this.isEmpty());
            if (!isEmpty && !valid) {
                return this.basePageService.confirmLeave(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
            }
            return true;
        });
    }
    createInitObservable() {
        if (this.onInit) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.from)(Promise.resolve(this.onInit()));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)({});
    }
    ionViewWillLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            if (this.onBeforeLeave) {
                yield Promise.resolve(this.onBeforeLeave());
            }
            yield this.save(true);
        });
    }
    save(clean = false) {
        this.registration.syncStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.SyncStatus.Draft;
        return this.basePageService.RegistrationService.saveRegistrationAsync(this.registration, clean);
    }
    getSaveFunc() {
        return () => this.save();
    }
    isEmpty() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            return !(yield this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1))
                .toPromise());
        });
    }
    reset() {
        return this.basePageService.confirmReset(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
    }
    getResolvedUrl() {
        return ('/' +
            this.activatedRoute.snapshot.pathFromRoot
                .map((v) => v.url.map((segment) => segment.toString()).join('/'))
                .filter((path) => !!path)
                .join('/'));
    }
}
BasePage.ɵfac = function BasePage_Factory(t) { return new (t || BasePage)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute)); };
BasePage.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineDirective"]({ type: BasePage, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]] });


/***/ }),

/***/ 18209:
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-time/can-deactivate-to-obs-location.guard.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanDeactivateToObsLocationRouteGuard": function() { return /* binding */ CanDeactivateToObsLocationRouteGuard; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 7602);





class CanDeactivateToObsLocationRouteGuard {
    constructor(navController) {
        this.navController = navController;
    }
    canDeactivate(component, _, __, nextState) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
            if (nextState &&
                nextState.url.indexOf('registration/new') >= 0 &&
                component.registration) {
                this.navController.navigateBack(`registration/obs-location/${component.registration.id}`);
            }
            return true;
        });
    }
}
CanDeactivateToObsLocationRouteGuard.ɵfac = function CanDeactivateToObsLocationRouteGuard_Factory(t) { return new (t || CanDeactivateToObsLocationRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.NavController)); };
CanDeactivateToObsLocationRouteGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CanDeactivateToObsLocationRouteGuard, factory: CanDeactivateToObsLocationRouteGuard.ɵfac });


/***/ }),

/***/ 10064:
/*!************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-time/set-time.module.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetTimePageModule": function() { return /* binding */ SetTimePageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _set_time_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-time.page */ 78912);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/shared.module */ 72271);
/* harmony import */ var _can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./can-deactivate-to-obs-location.guard */ 18209);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _set_time_page__WEBPACK_IMPORTED_MODULE_0__.SetTimePage,
        canDeactivate: [_can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateToObsLocationRouteGuard]
    }
];
class SetTimePageModule {
}
SetTimePageModule.ɵfac = function SetTimePageModule_Factory(t) { return new (t || SetTimePageModule)(); };
SetTimePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SetTimePageModule });
SetTimePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [_can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateToObsLocationRouteGuard], imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SetTimePageModule, { declarations: [_set_time_page__WEBPACK_IMPORTED_MODULE_0__.SetTimePage], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 78912:
/*!**********************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-time/set-time.page.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetTimePage": function() { return /* binding */ SetTimePage; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-page-service */ 35140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 70325);












class SetTimePage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute, navController) {
        super(null, basePageService, activatedRoute);
        this.navController = navController;
        this.setToNow();
    }
    onInit() {
        if (this.registration && this.registration.request.DtObsTime) {
            this.localDate = this.registration.request.DtObsTime;
        }
    }
    setToNow() {
        const now = moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
        this.maxDate = this.getMaxDateForNow();
        this.localDate = now;
    }
    getMaxDateForNow() {
        // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
        // Workaround is to set minutes to 59.
        return moment__WEBPACK_IMPORTED_MODULE_0___default()().minutes(59).toISOString(true);
    }
    confirm() {
        if (this.registration) {
            this.registration.request.DtObsTime =
                this.localDate || moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
            this.navController.navigateRoot('registration/edit/' + this.registration.id);
        }
    }
}
SetTimePage.ɵfac = function SetTimePage_Factory(t) { return new (t || SetTimePage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController)); };
SetTimePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SetTimePage, selectors: [["app-set-time"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]], decls: 26, vars: 24, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], ["lines", "none"], [1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "monthShortNames", "doneText", "cancelText", "ngModel", "max", "ngModelChange"], ["slot", "end", "fill", "outline", "color", "medium", 3, "click"], ["slot", "start", "name", "time"], ["lines", "none", 1, "ion-padding"], ["expand", "block", "color", "varsom-orange", 1, "confirm-time", "ion-no-margin", 3, "disabled", "click"]], template: function SetTimePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-list-header", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "ion-datetime", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function SetTimePage_Template_ion_datetime_ngModelChange_14_listener($event) { return ctx.localDate = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SetTimePage_Template_ion_button_click_18_listener() { return ctx.setToNow(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "ion-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](21, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-list", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "ion-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SetTimePage_Template_ion_button_click_23_listener() { return ctx.confirm(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](25, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 10, "REGISTRATION.SET_TIME.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 12, "REGISTRATION.SET_TIME.HEADER"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](15, 14, "MONTHS.SHORT_LIST"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 16, "DIALOGS.OK"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 18, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.localDate)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](21, 20, "REGISTRATION.SET_TIME.NOW"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.registration);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](25, 22, "REGISTRATION.SET_TIME.CONFIRM"));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe], styles: ["ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 20px;\n  padding-top: 30px;\n  padding-bottom: 30px;\n  padding-right: 0px;\n  padding-left: 40px;\n  width: 100%;\n  text-align: center;\n}\nion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n.confirm-time[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldC10aW1lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBRE47QUFJSTtFQUNFLFlBQUE7QUFGTjtBQU1BO0VBQ0UsZ0NBQUE7QUFIRiIsImZpbGUiOiJzZXQtdGltZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tbGlzdCB7XHJcbiAgaW9uLWl0ZW0ge1xyXG4gICAgaW9uLWRhdGV0aW1lIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICAgICAgcGFkZGluZy1yaWdodDogMHB4O1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgIHotaW5kZXg6IDIwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmNvbmZpcm0tdGltZSB7XHJcbiAgaGVpZ2h0OiB2YXIoLS1pb24tYnV0dG9uLWhlaWdodCk7XHJcbn1cclxuIl19 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zZXQtdGltZV9zZXQtdGltZV9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUVxRDtBQUMyQztBQUM1RTtBQUN0QjtBQUNNO0FBQ1o7QUFDWDtBQUMrQzs7Ozs7OztBQUUvRSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUk3QixNQUFNLGVBQWU7SUFxQjFCLFlBQ1UsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyx5QkFBb0QsRUFDcEQsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUNsQyxjQUE4QjtRQU45Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUE1QkosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hDLENBQUM7SUFZSyxZQUFZLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNwRyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQUE7SUFFSyxZQUFZLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNwRyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1RixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRixDQUFDO0tBQUE7SUFFYSxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNsSSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BHLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBQzlDLE9BQU87Z0JBQ1AsT0FBTyxFQUFFO29CQUNQO3dCQUNFLElBQUksRUFBRSxZQUFZLENBQUMsZ0JBQWdCLENBQUM7d0JBQ3BDLElBQUksRUFBRSxRQUFRO3FCQUNmO29CQUNEO3dCQUNFLElBQUksRUFBRSxZQUFZLENBQUMsYUFBYSxDQUFDO3FCQUNsQztpQkFDRjthQUNGLENBQUMsQ0FBQztZQUNILE1BQU0sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFDLE1BQU0sS0FBSyxHQUFZLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDO1lBQ2hELElBQUksS0FBSyxFQUFFO2dCQUNULE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUM3RixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pCLElBQUksZUFBZSxFQUFFO29CQUNuQixZQUFZLENBQUMsT0FBTyxDQUFDLHlHQUFlLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMvRixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLE9BQU8sRUFBRTtvQkFDWCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckUsQ0FBQztLQUFBO0lBRUQsa0JBQWtCLENBQUMsWUFBMkIsRUFBRSxlQUFnQztRQUM5RSxNQUFNLFFBQVEsR0FBRyx5R0FBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLDZCQUE2QjtZQUM3QixZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLGVBQWdDO1FBQzlDLElBQUkscUdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNoQyxPQUFPLEVBQUUsQ0FBQztTQUNYO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxZQUEyQjtRQUNyQyxJQUFJLENBQUMsb0JBQW9CO2FBQ3RCLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO2FBQy9CLElBQUksQ0FBQyx5REFBUyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyw4Q0FBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNySSxTQUFTLENBQ1IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxFQUNELENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDUixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDeEUsQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDOzs4RUF6R1UsZUFBZTtnSEFBZixlQUFlLFdBQWYsZUFBZSxtQkFGZCxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pZO0FBQ3NCO0FBQytEO0FBQ3BFO0FBQ3FCO0FBQ0U7Ozs7O0FBR2pFLE1BQWUsUUFBUyxTQUFRLDBFQUFhO0lBTWxELFlBQVksZUFBZ0MsRUFBRSxlQUFnQyxFQUFFLGNBQThCO1FBQzVHLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUVELFFBQVEsS0FBSSxDQUFDO0lBRWIsZUFBZTtRQUNiLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLDBCQUEwQixDQUFDLEVBQUUsQ0FBQzthQUMxRSxJQUFJLENBQ0gsb0RBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxtREFBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDbkUsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLENBQUMsRUFDRixtREFBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDVixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUMxQixDQUFDLENBQUMsRUFDRix5REFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLEVBQzVDLHlEQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUMzQjthQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFVRCxnRkFBZ0Y7SUFDMUUsUUFBUTs7WUFDWixvRUFBb0U7WUFDcEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUUscURBQXFEO1lBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN0QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNqSTtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sMENBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLHlDQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVLLGdCQUFnQjs7WUFDcEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN0QixNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDN0M7WUFDRCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztLQUFBO0lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLHFHQUFnQixDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVLLE9BQU87O1lBQ1gsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLG1DQUFtQyxDQUMvRixJQUFJLENBQUMsWUFBWSxFQUNqQixJQUFJLENBQUMsZUFBZSxDQUNyQjtpQkFDRSxJQUFJLENBQUMsb0RBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVELEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sQ0FDTCxHQUFHO1lBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWTtpQkFDdEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDYixDQUFDO0lBQ0osQ0FBQzs7Z0VBakdtQixRQUFRO3VHQUFSLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKTDtBQUVzQjs7O0FBR3hDLE1BQU0sb0NBQW9DO0lBRS9DLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQztJQUU5QyxhQUFhLENBQ2pCLFNBQXNCLEVBQ3RCLENBQXlCLEVBQ3pCLEVBQXVCLEVBQ3ZCLFNBQStCOztZQUUvQixJQUNFLFNBQVM7Z0JBQ1QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUM5QyxTQUFTLENBQUMsWUFBWSxFQUN0QjtnQkFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FDN0IsNkJBQTZCLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQ3pELENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBOzt3SEFwQlUsb0NBQW9DO3FJQUFwQyxvQ0FBb0MsV0FBcEMsb0NBQW9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RNO0FBQ1Q7QUFDZTtBQUNpQzs7O0FBRTlGLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsdURBQVc7UUFDdEIsYUFBYSxFQUFFLENBQUMsdUdBQW9DLENBQUM7S0FDdEQ7Q0FDRixDQUFDO0FBT0ssTUFBTSxpQkFBaUI7O2tGQUFqQixpQkFBaUI7OEdBQWpCLGlCQUFpQjttSEFGakIsQ0FBQyx1R0FBb0MsQ0FBQyxZQUZ4QyxDQUFDLCtEQUFZLEVBQUUsa0VBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7bUlBSTNDLGlCQUFpQixtQkFIYix1REFBVyxhQURoQiwrREFBWSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEU7QUFDbUI7QUFDUDtBQUNlO0FBQ0M7Ozs7Ozs7O0FBUWpELE1BQU0sV0FBWSxTQUFRLGdEQUFRO0lBS3ZDLFlBQ0UsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDdEIsYUFBNEI7UUFFcEMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFGckMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFHcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUN0RDtJQUNILENBQUM7SUFDRCxRQUFRO1FBQ04sTUFBTSxHQUFHLEdBQUcsNkNBQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxxR0FBcUc7UUFDckcsc0NBQXNDO1FBQ3RDLE9BQU8sNkNBQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUztnQkFDakMsSUFBSSxDQUFDLFNBQVMsSUFBSSw2Q0FBTSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUM3QixvQkFBb0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FDNUMsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7c0VBdkNVLFdBQVc7eUdBQVgsV0FBVztRQ2J4Qiw2RUFBWTtRQUNWLGlGQUF1QztRQUNyQyxpRkFBMEI7UUFDeEIsZ0ZBQTJEO1FBQzdELDREQUFjO1FBQ2QsNEVBQVc7UUFDVCx1REFDRjs7UUFBQSw0REFBWTtRQUNkLDREQUFjO1FBQ2hCLDREQUFhO1FBQ2IsOEVBQWE7UUFDWCw4RUFBdUI7UUFDckIscUZBQTRDO1FBQzFDLDZFQUFXO1FBQ1Qsd0RBQ0Y7O1FBQUEsNERBQVk7UUFDZCw0REFBa0I7UUFDbEIsNEVBQVU7UUFDUixtRkFFOEU7UUFBeEMsMExBQXVCOzs7O1FBQzdELDREQUFlO1FBQ2YsaUZBQTBFO1FBQXJCLHdJQUFTLGNBQVUsSUFBQztRQUN2RSwwRUFBOEM7UUFBQyx3REFFakQ7O1FBQUEsNERBQWE7UUFDZiw0REFBVztRQUNiLDREQUFXO1FBQ1gsK0VBQTJDO1FBQ3pDLGlGQUNzQjtRQUFwQix3SUFBUyxhQUFTLElBQUM7UUFBQyx3REFDVDs7UUFBQSw0REFBYTtRQUM1Qiw0REFBVztRQUNiLDREQUFjOztRQTNCUiwwREFDRjtRQURFLDJLQUNGO1FBT0ksMERBQ0Y7UUFERSw2S0FDRjtRQUc2QiwwREFBdUQ7UUFBdkQsOEtBQXVEO1FBQ2xGLGdLQUF1QztRQUFDLHNLQUE2QztRQUNqRCxrRkFBdUI7UUFHWiwwREFFakQ7UUFGaUQsMEtBRWpEO1FBSVUsMERBQStCO1FBQS9CLHVGQUErQjtRQUNyQiwwREFDVDtRQURTLG1LQUNUIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC10aW1lL2Nhbi1kZWFjdGl2YXRlLXRvLW9icy1sb2NhdGlvbi5ndWFyZC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtdGltZS9zZXQtdGltZS5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc2V0LXRpbWUvc2V0LXRpbWUucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtdGltZS9zZXQtdGltZS5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eU5hbWUsIGlzQXJyYXlUeXBlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmhlbHBlcnMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0Jhc2VQYWdlU2VydmljZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlU2VydmljZSB7XHJcbiAgZ2V0IFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmU7XHJcbiAgfVxyXG5cclxuICBnZXQgUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQWxlcnRDb250cm9sbGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxlcnRDb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFRyYW5zbGF0ZVNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1MZWF2ZShyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLlJFUVVJUkVEX0ZJRUxEU19NSVNTSU5HJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLkNPTkZJUk1fUkVTRVQnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVSZXNldERpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFsnRElBTE9HUy5DQU5DRUwnLCAnRElBTE9HUy5ZRVMnXSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLllFUyddXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gICAgY29uc3QgcmVzZXQ6IGJvb2xlYW4gPSByZXN1bHQucm9sZSAhPT0gJ2NhbmNlbCc7XHJcbiAgICBpZiAocmVzZXQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZXNldChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzZXQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5ab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZWdpc3RyYXRpb25UaWQpIHtcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob25SZXNldCkge1xyXG4gICAgICAgIG9uUmVzZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEZWZhdWx0UHJvcHMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdKSB7XHJcbiAgICAgIC8vIEluaXQgdG8gbmV3IG9iamVjdCBpZiBudWxsXHJcbiAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGlmIChpc0FycmF5VHlwZShyZWdpc3RyYXRpb25UaWQpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHMocmVnaXN0cmF0aW9uLmlkKVxyXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PiBmb3JrSm9pbihhdHRhY2htZW50cy5tYXAoKGEpID0+IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UucmVtb3ZlQXR0YWNobWVudChyZWdpc3RyYXRpb24uaWQsIGEuaWQpKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ1Jlc2V0IGltYWdlcyBjb21wbGV0ZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoZXJyb3IsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCByZXNldCBpbWFnZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZTtcclxuICByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UgPSBiYXNlUGFnZVNlcnZpY2U7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCA9IHJlZ2lzdHJhdGlvblRpZDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQoaWQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgbWFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNyZWF0ZURlZmF1bHRQcm9wcyhyZWcsIHRoaXMucmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICAgIHJldHVybiByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNyZWF0ZUluaXRPYnNlcnZhYmxlKCkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0PygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvbkJlZm9yZUxlYXZlPygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvblJlc2V0PygpOiB2b2lkO1xyXG5cclxuICBpc1ZhbGlkPygpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgLy8gTk9URTogUmVtZW1iZXIgdG8gYWRkIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF0gaW4gcGFnZSBtb2R1bGVcclxuICBhc3luYyBjYW5MZWF2ZSgpIHtcclxuICAgIC8vIENoZWNrIGlmIGltcGxlbWVudGF0aW9uIHBhZ2UgaGFzIGltcGxlbWVudGVkIGN1c3RvbSBpc1ZhbGlkIGxvZ2ljXHJcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLmlzVmFsaWQoKSA6IHRydWUpO1xyXG4gICAgLy8gT25seSByZXR1cm4gYWxlcnQgaWYgcGFnZSBpcyBub3QgZW1wdHkgYW5kIGludmFsaWRcclxuICAgIGNvbnN0IGlzRW1wdHkgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc0VtcHR5KCkpO1xyXG4gICAgaWYgKCFpc0VtcHR5ICYmICF2YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybUxlYXZlKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUluaXRPYnNlcnZhYmxlKCkge1xyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7XHJcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh0aGlzLm9uSW5pdCgpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlTGVhdmUpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVMZWF2ZSgpKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2F2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoY2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuUmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24sIGNsZWFuKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVGdW5jKCkge1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiAhKGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKVxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybVJlc2V0KHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb2x2ZWRVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICcvJyArXHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgICAgICAgLm1hcCgodikgPT4gdi51cmwubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKSlcclxuICAgICAgICAuZmlsdGVyKChwYXRoKSA9PiAhIXBhdGgpXHJcbiAgICAgICAgLmpvaW4oJy8nKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGdldENvbmZpZ3VyZWRVcmwoKTogc3RyaW5nIHtcclxuICAvLyAgICAgcmV0dXJuICcvJyArIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgLy8gICAgICAgICAuZmlsdGVyKHYgPT4gdi5yb3V0ZUNvbmZpZylcclxuICAvLyAgICAgICAgIC5tYXAodiA9PiB2LnJvdXRlQ29uZmlnLnBhdGgpXHJcbiAgLy8gICAgICAgICAuam9pbignLycpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ2FuRGVhY3RpdmF0ZSxcclxuICBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxyXG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3RcclxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTZXRUaW1lUGFnZSB9IGZyb20gJy4vc2V0LXRpbWUucGFnZSc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYW5EZWFjdGl2YXRlVG9PYnNMb2NhdGlvblJvdXRlR3VhcmRcclxuICBpbXBsZW1lbnRzIENhbkRlYWN0aXZhdGU8U2V0VGltZVBhZ2U+IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXIpIHt9XHJcblxyXG4gIGFzeW5jIGNhbkRlYWN0aXZhdGUoXHJcbiAgICBjb21wb25lbnQ6IFNldFRpbWVQYWdlLFxyXG4gICAgXzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcclxuICAgIF9fOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LFxyXG4gICAgbmV4dFN0YXRlPzogUm91dGVyU3RhdGVTbmFwc2hvdFxyXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBuZXh0U3RhdGUgJiZcclxuICAgICAgbmV4dFN0YXRlLnVybC5pbmRleE9mKCdyZWdpc3RyYXRpb24vbmV3JykgPj0gMCAmJlxyXG4gICAgICBjb21wb25lbnQucmVnaXN0cmF0aW9uXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlQmFjayhcclxuICAgICAgICBgcmVnaXN0cmF0aW9uL29icy1sb2NhdGlvbi8ke2NvbXBvbmVudC5yZWdpc3RyYXRpb24uaWR9YFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU2V0VGltZVBhZ2UgfSBmcm9tICcuL3NldC10aW1lLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbkRlYWN0aXZhdGVUb09ic0xvY2F0aW9uUm91dGVHdWFyZCB9IGZyb20gJy4vY2FuLWRlYWN0aXZhdGUtdG8tb2JzLWxvY2F0aW9uLmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBTZXRUaW1lUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlVG9PYnNMb2NhdGlvblJvdXRlR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU2V0VGltZVBhZ2VdLFxyXG4gIHByb3ZpZGVyczogW0NhbkRlYWN0aXZhdGVUb09ic0xvY2F0aW9uUm91dGVHdWFyZF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldFRpbWVQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zZXQtdGltZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldC10aW1lLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2V0LXRpbWUucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldFRpbWVQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIG1heERhdGU6IHN0cmluZztcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgbG9jYWxEYXRlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXJcclxuICApIHtcclxuICAgIHN1cGVyKG51bGwsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gICAgdGhpcy5zZXRUb05vdygpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uICYmIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lKSB7XHJcbiAgICAgIHRoaXMubG9jYWxEYXRlID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFRvTm93KCkge1xyXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICAgIHRoaXMubG9jYWxEYXRlID0gbm93O1xyXG4gIH1cclxuXHJcbiAgZ2V0TWF4RGF0ZUZvck5vdygpIHtcclxuICAgIC8vIFRoZXJlIGlzIGFuIGlzc3VlIHdoZW4gc2V0dGluZyBtYXggZGF0ZSB0aGF0IHdoZW4gY2hhbmdpbmcgaG91ciwgdGhlIG1pbnV0ZXMgaXMgc3RpbGwgbWF4IG1pbnV0ZXMuXHJcbiAgICAvLyBXb3JrYXJvdW5kIGlzIHRvIHNldCBtaW51dGVzIHRvIDU5LlxyXG4gICAgcmV0dXJuIG1vbWVudCgpLm1pbnV0ZXMoNTkpLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlybSgpIHtcclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbikge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZSA9XHJcbiAgICAgICAgdGhpcy5sb2NhbERhdGUgfHwgbW9tZW50KCkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZVJvb3QoXHJcbiAgICAgICAgJ3JlZ2lzdHJhdGlvbi9lZGl0LycgKyB0aGlzLnJlZ2lzdHJhdGlvbi5pZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7e1wiUkVHSVNUUkFUSU9OLlNFVF9USU1FLlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwibm9uZVwiPlxyXG4gICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuSEVBREVSXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWRhdGV0aW1lIGNvbG9yPVwibWVkaXVtXCIgbW9udGhTaG9ydE5hbWVzPVwie3sgJ01PTlRIUy5TSE9SVF9MSVNUJyB8IHRyYW5zbGF0ZSB9fVwiXHJcbiAgICAgICAgZG9uZVRleHQ9XCJ7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XCIgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCJcclxuICAgICAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWSBISDptbVwiIFsobmdNb2RlbCldPVwibG9jYWxEYXRlXCIgW21heF09XCJtYXhEYXRlXCI+XHJcbiAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBzbG90PVwiZW5kXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cIm1lZGl1bVwiIChjbGljayk9XCJzZXRUb05vdygpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0aW1lXCI+PC9pb24taWNvbj4ge3tcIlJFR0lTVFJBVElPTi5TRVRfVElNRS5OT1dcIiB8XHJcbiAgICAgICAgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24taXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cIm5vbmVcIiBjbGFzcz1cImlvbi1wYWRkaW5nXCI+XHJcbiAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiIXRoaXMucmVnaXN0cmF0aW9uXCIgY2xhc3M9XCJjb25maXJtLXRpbWUgaW9uLW5vLW1hcmdpblwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCJcclxuICAgICAgKGNsaWNrKT1cImNvbmZpcm0oKVwiPnt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuQ09ORklSTVwiIHxcclxuICAgICAgdHJhbnNsYXRlfX08L2lvbi1idXR0b24+XHJcbiAgPC9pb24tbGlzdD5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==