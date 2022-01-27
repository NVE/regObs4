"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_snow-surface_snow-surface_module_ts"],{

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

/***/ 16971:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/snow-surface/snow-surface.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowSurfacePageModule": function() { return /* binding */ SnowSurfacePageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _snow_surface_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-surface.page */ 84538);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../can-deactivate-route.guard */ 7990);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _snow_surface_page__WEBPACK_IMPORTED_MODULE_0__.SnowSurfacePage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateRouteGuard]
    }
];
class SnowSurfacePageModule {
}
SnowSurfacePageModule.ɵfac = function SnowSurfacePageModule_Factory(t) { return new (t || SnowSurfacePageModule)(); };
SnowSurfacePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SnowSurfacePageModule });
SnowSurfacePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SnowSurfacePageModule, { declarations: [_snow_surface_page__WEBPACK_IMPORTED_MODULE_0__.SnowSurfacePage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 84538:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/snow-surface/snow-surface.page.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowSurfacePage": function() { return /* binding */ SnowSurfacePage; }
/* harmony export */ });
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















function SnowSurfacePage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "app-kdv-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r3.registration.request.SnowSurfaceObservation.SnowDriftTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "app-kdv-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r4.registration.request.SnowSurfaceObservation.SnowSurfaceTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "app-kdv-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r5.registration.request.SnowSurfaceObservation.SurfaceWaterContentTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "app-numeric-input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.registration.request.SnowSurfaceObservation.NewSnowDepth24 = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "app-numeric-input", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r7.registration.request.SnowSurfaceObservation.NewSnowLine = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "app-numeric-input", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r8.registration.request.SnowSurfaceObservation.SnowDepth = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "app-numeric-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r9.registration.request.SnowSurfaceObservation.SnowLine = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "app-numeric-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r10.registration.request.SnowSurfaceObservation.HeightLimitLayeredSnow = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "app-text-comment", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowSurfacePage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_21_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r11.registration.request.SnowSurfaceObservation.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "ion-label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](26, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](30, "app-add-picture-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 39, "REGISTRATION.SNOW.SNOW_SURFACE.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.SnowDriftTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.SnowSurfaceTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.SurfaceWaterContentTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.NewSnowDepth24)("min", 0)("max", 999)("decimalPlaces", 0)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("suffix", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](11, 41, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.NewSnowLine)("min", 0)("max", 8848)("decimalPlaces", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.SnowDepth)("min", 0)("max", 9999)("decimalPlaces", 0)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("suffix", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](14, 43, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.SnowLine)("min", 0)("max", 8848)("decimalPlaces", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate"]("suffix", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 45, "MAP_CENTER_INFO.ABOVE_SEA_LEVEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.HeightLimitLayeredSnow)("min", 0)("max", 8848)("decimalPlaces", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](20, 47, "REGISTRATION.SNOW.SNOW_SURFACE.COMMENT_HEADER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowSurfaceObservation.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](25, 49, "REGISTRATION.SNOW.SNOW_SURFACE.COMMENT_PLACEHOLDER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](29, 51, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class SnowSurfacePage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.SnowSurfaceObservation, basePageService, activatedRoute);
    }
}
SnowSurfacePage.ɵfac = function SnowSurfacePage_Factory(t) { return new (t || SnowSurfacePage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute)); };
SnowSurfacePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: SnowSurfacePage, selectors: [["app-snow-surface"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.SNOW_DRIFT", "kdvKey", "Snow_SnowDriftKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.SNOW_SURFACE", "kdvKey", "Snow_SnowSurfaceKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.SURFACE_WATER_CONTENT_REG", "kdvKey", "Snow_SurfaceWaterContentKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.NEW_SNOW_DEPTH", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.NEW_SNOW_LINE", 3, "value", "min", "max", "decimalPlaces", "suffix", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.SNOW_DEPTH", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.SNOW_LINE", 3, "value", "min", "max", "decimalPlaces", "suffix", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_SURFACE.HEIGHT_LIMIT_LAYERED_SNOW", "placeholder", "REGISTRATION.SNOW.SNOW_SURFACE.HIGHT_LIMIT_LAYERED_SNOW_PLACEHOLDER", 3, "value", "min", "max", "decimalPlaces", "suffix", "valueChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [1, "ion-text-wrap"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]], template: function SnowSurfacePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, SnowSurfacePage_app_registration_content_wrapper_8_Template, 31, 53, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.SNOW_SURFACE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.SnowSurfaceObservation);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_6__.NumericInputComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonItemDivider, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXN1cmZhY2UucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zbm93X3Nub3ctc3VyZmFjZV9zbm93LXN1cmZhY2VfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFcUQ7QUFDMkM7QUFDNUU7QUFDdEI7QUFDTTtBQUNaO0FBQ1g7QUFDK0M7Ozs7Ozs7QUFFL0UsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFJN0IsTUFBTSxlQUFlO0lBcUIxQixZQUNVLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMseUJBQW9ELEVBQ3BELE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsY0FBOEI7UUFOOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBNUJKLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxtQkFBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLHlCQUF5QjtRQUMzQixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDO0lBWUssWUFBWSxDQUFDLFlBQTJCLEVBQUUsZUFBZ0MsRUFBRSxPQUFv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QTREO0lBRjNDLGlJQUFtRTtJQUduRSwwREFBaUU7SUFBakUsK0hBQWlFO0lBS2xGLDBEQUE0RDtJQUE1RCxtTEFBNEQ7SUFGM0MsOEhBQWdFO0lBS2pGLDBEQUE0RDtJQUE1RCxtTEFBNEQ7SUFGM0MsNElBQThFO0lBTzdGLDBEQUNGO0lBREUsOExBQ0Y7SUFHQSwwREFBK0Q7SUFBL0QsNkhBQStEO0lBRzdELDBEQUNGO0lBREUsbU1BQ0Y7SUFJRSwwREFDRjtJQURFLHdLQUNGO0lBRW9CLDBEQUFvQztJQUFwQyxvR0FBb0M7O0FEbER6RCxNQUFNLGVBQWdCLFNBQVEsZ0RBQVE7SUFDM0MsWUFDRSxlQUFnQyxFQUNoQyxjQUE4QjtRQUU5QixLQUFLLENBQ0gsMkhBQXNDLEVBQ3RDLGVBQWUsRUFDZixjQUFjLENBQ2YsQ0FBQztJQUNKLENBQUM7OzhFQVZVLGVBQWU7NkdBQWYsZUFBZTtRQ1g1Qiw2RUFBWTtRQUNWLGlGQUF1QztRQUNyQyxpRkFBMEI7UUFDeEIsZ0ZBQTJEO1FBQzdELDREQUFjO1FBQ2QsNEVBQVc7UUFDVCx1REFDRjs7UUFBQSw0REFBWTtRQUNkLDREQUFjO1FBQ2hCLDREQUFhO1FBRWIsOEVBQWE7UUFDWCx1S0FxRG1DO1FBQ3JDLDREQUFjOztRQTVEUiwwREFDRjtRQURFLG1MQUNGO1FBS2lDLDBEQUFpRTtRQUFqRSxxSUFBaUUiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9zbm93LXN1cmZhY2Uvc25vdy1zdXJmYWNlLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L3Nub3ctc3VyZmFjZS9zbm93LXN1cmZhY2UucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L3Nub3ctc3VyZmFjZS9zbm93LXN1cmZhY2UucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0UHJvcGVydHlOYW1lLCBpc0FycmF5VHlwZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5oZWxwZXJzJztcclxuaW1wb3J0IHsgTmV3QXR0YWNobWVudFNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdCYXNlUGFnZVNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZVNlcnZpY2Uge1xyXG4gIGdldCBab25lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmdab25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IEFsZXJ0Q29udHJvbGxlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFsZXJ0Q29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBUcmFuc2xhdGVTZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBjb25maXJtTGVhdmUocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5SRVFVSVJFRF9GSUVMRFNfTUlTU0lORycpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtUmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5DT05GSVJNX1JFU0VUJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUmVzZXREaWFsb2cobWVzc2FnZTogc3RyaW5nLCByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuWUVTJ10pLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ZRVMnXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICAgIGNvbnN0IHJlc2V0OiBib29sZWFuID0gcmVzdWx0LnJvbGUgIT09ICdjYW5jZWwnO1xyXG4gICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc2V0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCldID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICB0aGlzLnJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9uUmVzZXQpIHtcclxuICAgICAgICBvblJlc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhyZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGVmYXVsdFByb3BzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGNvbnN0IHByb3BOYW1lID0gZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICBpZiAoIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSkge1xyXG4gICAgICAvLyBJbml0IHRvIG5ldyBvYmplY3QgaWYgbnVsbFxyXG4gICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBpZiAoaXNBcnJheVR5cGUocmVnaXN0cmF0aW9uVGlkKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEltYWdlcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2VcclxuICAgICAgLmdldEF0dGFjaG1lbnRzKHJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgLnBpcGUoc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT4gZm9ya0pvaW4oYXR0YWNobWVudHMubWFwKChhKSA9PiB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQocmVnaXN0cmF0aW9uLmlkLCBhLmlkKSkpKSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdSZXNldCBpbWFnZXMgY29tcGxldGUnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKGVycm9yLCBERUJVR19UQUcsICdDb3VsZCBub3QgcmVzZXQgaW1hZ2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2U7XHJcbiAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlID0gYmFzZVBhZ2VTZXJ2aWNlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25UaWQgPSByZWdpc3RyYXRpb25UaWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIG1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5jcmVhdGVEZWZhdWx0UHJvcHMocmVnLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcmVhdGVJbml0T2JzZXJ2YWJsZSgpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdD8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25CZWZvcmVMZWF2ZT8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25SZXNldD8oKTogdm9pZDtcclxuXHJcbiAgaXNWYWxpZD8oKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8vIE5PVEU6IFJlbWVtYmVyIHRvIGFkZCBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdIGluIHBhZ2UgbW9kdWxlXHJcbiAgYXN5bmMgY2FuTGVhdmUoKSB7XHJcbiAgICAvLyBDaGVjayBpZiBpbXBsZW1lbnRhdGlvbiBwYWdlIGhhcyBpbXBsZW1lbnRlZCBjdXN0b20gaXNWYWxpZCBsb2dpY1xyXG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc1ZhbGlkID8gdGhpcy5pc1ZhbGlkKCkgOiB0cnVlKTtcclxuICAgIC8vIE9ubHkgcmV0dXJuIGFsZXJ0IGlmIHBhZ2UgaXMgbm90IGVtcHR5IGFuZCBpbnZhbGlkXHJcbiAgICBjb25zdCBpc0VtcHR5ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNFbXB0eSgpKTtcclxuICAgIGlmICghaXNFbXB0eSAmJiAhdmFsaWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1MZWF2ZSh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbml0T2JzZXJ2YWJsZSgpIHtcclxuICAgIGlmICh0aGlzLm9uSW5pdCkge1xyXG4gICAgICByZXR1cm4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5vbkluaXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHt9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkJlZm9yZUxlYXZlKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLm9uQmVmb3JlTGVhdmUoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGNsZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLlJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uLCBjbGVhbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gIShhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25UaWRcclxuICAgIClcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1SZXNldCh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldFJlc29sdmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnLycgK1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gICAgICAgIC5tYXAoKHYpID0+IHYudXJsLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC50b1N0cmluZygpKS5qb2luKCcvJykpXHJcbiAgICAgICAgLmZpbHRlcigocGF0aCkgPT4gISFwYXRoKVxyXG4gICAgICAgIC5qb2luKCcvJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRDb25maWd1cmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgLy8gICAgIHJldHVybiAnLycgKyB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gIC8vICAgICAgICAgLmZpbHRlcih2ID0+IHYucm91dGVDb25maWcpXHJcbiAgLy8gICAgICAgICAubWFwKHYgPT4gdi5yb3V0ZUNvbmZpZy5wYXRoKVxyXG4gIC8vICAgICAgICAgLmpvaW4oJy8nKTtcclxuICAvLyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTbm93U3VyZmFjZVBhZ2UgfSBmcm9tICcuL3Nub3ctc3VyZmFjZS5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkIH0gZnJvbSAnLi4vLi4vY2FuLWRlYWN0aXZhdGUtcm91dGUuZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IFNub3dTdXJmYWNlUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU25vd1N1cmZhY2VQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1N1cmZhY2VQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNub3ctc3VyZmFjZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Nub3ctc3VyZmFjZS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctc3VyZmFjZS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1N1cmZhY2VQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBSZWdpc3RyYXRpb25UaWQuU25vd1N1cmZhY2VPYnNlcnZhdGlvbixcclxuICAgICAgYmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgICBhY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19TVVJGQUNFLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dTdXJmYWNlT2JzZXJ2YXRpb25cIlxyXG4gICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19TVVJGQUNFLlNOT1dfRFJJRlRcIiBrZHZLZXk9XCJTbm93X1Nub3dEcmlmdEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1N1cmZhY2VPYnNlcnZhdGlvbi5Tbm93RHJpZnRUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1NVUkZBQ0UuU05PV19TVVJGQUNFXCIga2R2S2V5PVwiU25vd19Tbm93U3VyZmFjZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1N1cmZhY2VPYnNlcnZhdGlvbi5Tbm93U3VyZmFjZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5TVVJGQUNFX1dBVEVSX0NPTlRFTlRfUkVHXCJcclxuICAgICAgICBrZHZLZXk9XCJTbm93X1N1cmZhY2VXYXRlckNvbnRlbnRLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dTdXJmYWNlT2JzZXJ2YXRpb24uU3VyZmFjZVdhdGVyQ29udGVudFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93U3VyZmFjZU9ic2VydmF0aW9uLk5ld1Nub3dEZXB0aDI0XCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5ORVdfU05PV19ERVBUSFwiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMFwiXHJcbiAgICAgICAgW2NvbnZlcnRSYXRpb109XCIxMDBcIiBzdWZmaXg9XCJjbVwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93U3VyZmFjZU9ic2VydmF0aW9uLk5ld1Nub3dMaW5lXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5ORVdfU05PV19MSU5FXCIgW21pbl09XCIwXCIgW21heF09XCI4ODQ4XCIgW2RlY2ltYWxQbGFjZXNdPVwiMFwiXHJcbiAgICAgICAgc3VmZml4PVwie3sgJ01BUF9DRU5URVJfSU5GTy5BQk9WRV9TRUFfTEVWRUwnIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dTdXJmYWNlT2JzZXJ2YXRpb24uU25vd0RlcHRoXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5TTk9XX0RFUFRIXCIgW21pbl09XCIwXCIgW21heF09XCI5OTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMFwiXHJcbiAgICAgICAgW2NvbnZlcnRSYXRpb109XCIxMDBcIiBzdWZmaXg9XCJjbVwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93U3VyZmFjZU9ic2VydmF0aW9uLlNub3dMaW5lXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5TTk9XX0xJTkVcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjg4NDhcIiBbZGVjaW1hbFBsYWNlc109XCIwXCJcclxuICAgICAgICBzdWZmaXg9XCJ7eyAnTUFQX0NFTlRFUl9JTkZPLkFCT1ZFX1NFQV9MRVZFTCcgfCB0cmFuc2xhdGUgfX1cIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1N1cmZhY2VPYnNlcnZhdGlvbi5IZWlnaHRMaW1pdExheWVyZWRTbm93XCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5IRUlHSFRfTElNSVRfTEFZRVJFRF9TTk9XXCIgW21pbl09XCIwXCIgW21heF09XCI4ODQ4XCIgW2RlY2ltYWxQbGFjZXNdPVwiMFwiXHJcbiAgICAgICAgc3VmZml4PVwie3sgJ01BUF9DRU5URVJfSU5GTy5BQk9WRV9TRUFfTEVWRUwnIHwgdHJhbnNsYXRlIH19XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfU1VSRkFDRS5ISUdIVF9MSU1JVF9MQVlFUkVEX1NOT1dfUExBQ0VIT0xERVJcIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19TVVJGQUNFLkNPTU1FTlRfSEVBREVSJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dTdXJmYWNlT2JzZXJ2YXRpb24uQ29tbWVudFwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1NVUkZBQ0UuQ09NTUVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX0lNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIlxyXG4gICAgICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW29uQmVmb3JlQWRkXT1cImdldFNhdmVGdW5jKClcIj5cclxuICAgICAgPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==