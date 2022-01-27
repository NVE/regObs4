"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_ice_ice-cover_ice-cover_module_ts"],{

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

/***/ 56914:
/*!******************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-cover/ice-cover.module.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceCoverPageModule": function() { return /* binding */ IceCoverPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ice_cover_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ice-cover.page */ 43149);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: '',
        component: _ice_cover_page__WEBPACK_IMPORTED_MODULE_0__.IceCoverPage
    }
];
class IceCoverPageModule {
}
IceCoverPageModule.ɵfac = function IceCoverPageModule_Factory(t) { return new (t || IceCoverPageModule)(); };
IceCoverPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: IceCoverPageModule });
IceCoverPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](IceCoverPageModule, { declarations: [_ice_cover_page__WEBPACK_IMPORTED_MODULE_0__.IceCoverPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 43149:
/*!****************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-cover/ice-cover.page.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceCoverPage": function() { return /* binding */ IceCoverPage; }
/* harmony export */ });
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function IceCoverPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function IceCoverPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function IceCoverPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.registration.request.IceCoverObs.IceCoverTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "app-kdv-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function IceCoverPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r4.registration.request.IceCoverObs.IceCoverBeforeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "app-kdv-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function IceCoverPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r5.registration.request.IceCoverObs.IceCapacityTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "app-kdv-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function IceCoverPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r6.registration.request.IceCoverObs.IceSkateabilityTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-list-header", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "app-text-comment", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function IceCoverPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r7.registration.request.IceCoverObs.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "app-add-picture-item", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.IceCoverObs.IceCoverTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.IceCoverObs.IceCoverBeforeTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.IceCoverObs.IceCapacityTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.IceCoverObs.IceSkateabilityTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](9, 14, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](11, 16, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.IceCoverObs.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 18, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class IceCoverPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.IceCoverObs, basePageService, activatedRoute);
    }
}
IceCoverPage.ɵfac = function IceCoverPage_Factory(t) { return new (t || IceCoverPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute)); };
IceCoverPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: IceCoverPage, selectors: [["app-ice-cover"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], ["title", "REGISTRATION.ICE.ICE_COVER.ICE_COVER", "kdvKey", "Ice_IceCoverKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_COVER.ICE_COVER_BEFORE", "kdvKey", "Ice_IceCoverBeforeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_COVER.ICE_CAPACITY", "kdvKey", "Ice_IceCapacityKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_COVER.ICE_SKATEABILITY", "kdvKey", "Ice_IceSkateabilityKDV", 3, "value", "valueChange"], [1, "ion-text-uppercase"], [3, "value", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]], template: function IceCoverPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, IceCoverPage_app_registration_content_wrapper_8_Template, 17, 20, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.ICE.ICE_COVER.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.IceCoverObs);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY2UtY292ZXIucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19pY2VfaWNlLWNvdmVyX2ljZS1jb3Zlcl9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUVxRDtBQUMyQztBQUM1RTtBQUN0QjtBQUNNO0FBQ1o7QUFDWDtBQUMrQzs7Ozs7OztBQUUvRSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUk3QixNQUFNLGVBQWU7SUFxQjFCLFlBQ1UsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyx5QkFBb0QsRUFDcEQsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUNsQyxjQUE4QjtRQU45Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUE1QkosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hDLENBQUM7SUFZSyxZQUFZLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNw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YTtRQUNiLDhFQUFhO1FBQ1gsb0tBMkJtQztRQUNyQyw0REFBYzs7UUFqQ1IsMERBQ0Y7UUFERSwrS0FDRjtRQUlpQywwREFBc0Q7UUFBdEQsMEhBQXNEIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtY292ZXIvaWNlLWNvdmVyLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9pY2UvaWNlLWNvdmVyL2ljZS1jb3Zlci5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtY292ZXIvaWNlLWNvdmVyLnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSWNlQ292ZXJQYWdlIH0gZnJvbSAnLi9pY2UtY292ZXIucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEljZUNvdmVyUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtJY2VDb3ZlclBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJY2VDb3ZlclBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtaWNlLWNvdmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaWNlLWNvdmVyLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWNlLWNvdmVyLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJY2VDb3ZlclBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkljZUNvdmVyT2JzLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLklDRS5JQ0VfQ09WRVIuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9ic1wiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfQ09WRVIuSUNFX0NPVkVSXCIga2R2S2V5PVwiSWNlX0ljZUNvdmVyS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9icy5JY2VDb3ZlclRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JQ0UuSUNFX0NPVkVSLklDRV9DT1ZFUl9CRUZPUkVcIiBrZHZLZXk9XCJJY2VfSWNlQ292ZXJCZWZvcmVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZUNvdmVyT2JzLkljZUNvdmVyQmVmb3JlVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfQ09WRVIuSUNFX0NBUEFDSVRZXCIga2R2S2V5PVwiSWNlX0ljZUNhcGFjaXR5S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9icy5JY2VDYXBhY2l0eVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JQ0UuSUNFX0NPVkVSLklDRV9TS0FURUFCSUxJVFlcIiBrZHZLZXk9XCJJY2VfSWNlU2thdGVhYmlsaXR5S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VDb3Zlck9icy5JY2VTa2F0ZWFiaWxpdHlUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZUNvdmVyT2JzLkNvbW1lbnRcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwie3snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DT01NRU5UX1BMQUNFSE9MREVSJyB8IHRyYW5zbGF0ZSB9fVwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCIgXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9