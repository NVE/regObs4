"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_weather_weather_module_ts"],{

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

/***/ 39578:
/*!***************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/weather/weather.module.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WeatherPageModule": function() { return /* binding */ WeatherPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _weather_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather.page */ 97240);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../can-deactivate-route.guard */ 7990);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _weather_page__WEBPACK_IMPORTED_MODULE_0__.WeatherPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateRouteGuard]
    }
];
class WeatherPageModule {
}
WeatherPageModule.ɵfac = function WeatherPageModule_Factory(t) { return new (t || WeatherPageModule)(); };
WeatherPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: WeatherPageModule });
WeatherPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](WeatherPageModule, { declarations: [_weather_page__WEBPACK_IMPORTED_MODULE_0__.WeatherPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 97240:
/*!*************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/weather/weather.page.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WeatherPage": function() { return /* binding */ WeatherPage; }
/* harmony export */ });
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);

















function WeatherPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("reset", function WeatherPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "app-kdv-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r3.registration.request.WeatherObservation.PrecipitationTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "app-numeric-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r4.registration.request.WeatherObservation.AirTemperature = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "app-numeric-input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r5.registration.request.WeatherObservation.WindSpeed = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "app-numeric-input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r6.registration.request.WeatherObservation.CloudCover = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "app-select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("selectedValueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_select_selectedValueChange_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r7.registration.request.WeatherObservation.WindDirection = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "app-text-comment", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("valueChange", function WeatherPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_19_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r8.registration.request.WeatherObservation.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "ion-label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](28, "app-add-picture-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 27, "REGISTRATION.SNOW.WEATHER.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r0.registration.request.WeatherObservation.PrecipitationTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r0.registration.request.WeatherObservation.AirTemperature)("min", -150)("max", 60)("decimalPlaces", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r0.registration.request.WeatherObservation.WindSpeed)("min", 0)("max", 50)("decimalPlaces", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r0.registration.request.WeatherObservation.CloudCover)("min", 0)("max", 100)("decimalPlaces", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](13, 29, "REGISTRATION.SNOW.WEATHER.WIND_DIRECTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("selectedValue", ctx_r0.registration.request.WeatherObservation.WindDirection)("options", ctx_r0.windDirectionOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](18, 31, "REGISTRATION.SNOW.WEATHER.COMMENT_HEADER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx_r0.registration.request.WeatherObservation.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](23, 33, "REGISTRATION.SNOW.WEATHER.COMMENT_PLACEHOLDER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](27, 35, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class WeatherPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.WeatherObservation, basePageService, activatedRoute);
        this.windDirectionOptions = [
            { id: 0, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH' },
            { id: 45, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_EAST' },
            { id: 90, text: 'REGISTRATION.SNOW.WEATHER.FROM_EAST' },
            { id: 135, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_EAST' },
            { id: 180, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH' },
            { id: 225, text: 'REGISTRATION.SNOW.WEATHER.FROM_SOUTH_WEST' },
            { id: 270, text: 'REGISTRATION.SNOW.WEATHER.FROM_WEST' },
            { id: 315, text: 'REGISTRATION.SNOW.WEATHER.FROM_NORTH_WEST' }
        ];
    }
}
WeatherPage.ɵfac = function WeatherPage_Factory(t) { return new (t || WeatherPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute)); };
WeatherPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: WeatherPage, selectors: [["app-weather"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.WEATHER.PRECIPITATION", "kdvKey", "Snow_PrecipitationKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.WEATHER.AIR_TEMPERATURE", "suffix", "\u00B0C", "placeholder", "REGISTRATION.SNOW.WEATHER.AIR_TEMPERATURE_PLACEHOLDER", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["title", "REGISTRATION.SNOW.WEATHER.WIND_SPEED", "suffix", "m/s", "placeholder", "REGISTRATION.SNOW.WEATHER.AIR_TEMPERATURE_PLACEHOLDER", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["title", "REGISTRATION.SNOW.WEATHER.CLOUD_COVER", "suffix", "%", "placeholder", "REGISTRATION.SNOW.WEATHER.ONLY_FULL_PERCENTAGE", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.WEATHER.WIND_DIRECTION", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [1, "ion-text-wrap"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]], template: function WeatherPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, WeatherPage_app_registration_content_wrapper_8_Template, 29, 37, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.WEATHER.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.WeatherObservation);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_7__.SelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItemDivider, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_9__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3ZWF0aGVyLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zbm93X3dlYXRoZXJfd2VhdGhlcl9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUVxRDtBQUMyQztBQUM1RTtBQUN0QjtBQUNNO0FBQ1o7QUFDWDtBQUMrQzs7Ozs7OztBQUUvRSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUk3QixNQUFNLGVBQWU7SUFxQjFCLFlBQ1UsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyx5QkFBb0QsRUFDcEQsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUNsQyxjQUE4QjtRQU45Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUE1QkosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hDLENBQUM7SUFZSyxZQUFZLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNwRyxN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cHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvd2VhdGhlci93ZWF0aGVyLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L3dlYXRoZXIvd2VhdGhlci5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvd2VhdGhlci93ZWF0aGVyLnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgV2VhdGhlclBhZ2UgfSBmcm9tICcuL3dlYXRoZXIucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYW5EZWFjdGl2YXRlUm91dGVHdWFyZCB9IGZyb20gJy4uLy4uL2Nhbi1kZWFjdGl2YXRlLXJvdXRlLmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBXZWF0aGVyUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbV2VhdGhlclBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXZWF0aGVyUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdlYXRoZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi93ZWF0aGVyLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2VhdGhlci5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgV2VhdGhlclBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgd2luZERpcmVjdGlvbk9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgeyBpZDogMCwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuRlJPTV9OT1JUSCcgfSxcclxuICAgIHsgaWQ6IDQ1LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5GUk9NX05PUlRIX0VBU1QnIH0sXHJcbiAgICB7IGlkOiA5MCwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuRlJPTV9FQVNUJyB9LFxyXG4gICAgeyBpZDogMTM1LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5GUk9NX1NPVVRIX0VBU1QnIH0sXHJcbiAgICB7IGlkOiAxODAsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5XRUFUSEVSLkZST01fU09VVEgnIH0sXHJcbiAgICB7IGlkOiAyMjUsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5XRUFUSEVSLkZST01fU09VVEhfV0VTVCcgfSxcclxuICAgIHsgaWQ6IDI3MCwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuRlJPTV9XRVNUJyB9LFxyXG4gICAgeyBpZDogMzE1LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5GUk9NX05PUlRIX1dFU1QnIH1cclxuICBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihSZWdpc3RyYXRpb25UaWQuV2VhdGhlck9ic2VydmF0aW9uLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldlYXRoZXJPYnNlcnZhdGlvblwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5QUkVDSVBJVEFUSU9OXCIga2R2S2V5PVwiU25vd19QcmVjaXBpdGF0aW9uS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XZWF0aGVyT2JzZXJ2YXRpb24uUHJlY2lwaXRhdGlvblRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XZWF0aGVyT2JzZXJ2YXRpb24uQWlyVGVtcGVyYXR1cmVcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5BSVJfVEVNUEVSQVRVUkVcIiBbbWluXT1cIi0xNTBcIiBbbWF4XT1cIjYwXCIgc3VmZml4PVwiwrBDXCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuQUlSX1RFTVBFUkFUVVJFX1BMQUNFSE9MREVSXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XZWF0aGVyT2JzZXJ2YXRpb24uV2luZFNwZWVkXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuV0lORF9TUEVFRFwiIFttaW5dPVwiMFwiIFttYXhdPVwiNTBcIiBzdWZmaXg9XCJtL3NcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5BSVJfVEVNUEVSQVRVUkVfUExBQ0VIT0xERVJcIiBbZGVjaW1hbFBsYWNlc109XCIyXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldlYXRoZXJPYnNlcnZhdGlvbi5DbG91ZENvdmVyXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuQ0xPVURfQ09WRVJcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjEwMFwiIHN1ZmZpeD1cIiVcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5PTkxZX0ZVTExfUEVSQ0VOVEFHRVwiIFtkZWNpbWFsUGxhY2VzXT1cIjBcIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8aW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ1JFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuV0lORF9ESVJFQ1RJT04nXHJcbiAgICAgICAgICB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPGFwcC1zZWxlY3QgWyhzZWxlY3RlZFZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XZWF0aGVyT2JzZXJ2YXRpb24uV2luZERpcmVjdGlvblwiXHJcbiAgICAgICAgICBbb3B0aW9uc109XCJ3aW5kRGlyZWN0aW9uT3B0aW9uc1wiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5XSU5EX0RJUkVDVElPTlwiPjwvYXBwLXNlbGVjdD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuV0VBVEhFUi5DT01NRU5UX0hFQURFUicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5DT01NRU5UXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XZWF0aGVyT2JzZXJ2YXRpb24uQ29tbWVudFwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5XRUFUSEVSLkNPTU1FTlRfUExBQ0VIT0xERVInIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+XHJcbiAgICAgIDwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=