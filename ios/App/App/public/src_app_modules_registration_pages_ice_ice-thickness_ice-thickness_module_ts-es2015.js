"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_ice_ice-thickness_ice-thickness_module_ts"],{

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

/***/ 57748:
/*!********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-thickness/ice-layer/ice-layer.module.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceLayerPageModule": function() { return /* binding */ IceLayerPageModule; }
/* harmony export */ });
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared-components.module */ 22623);
/* harmony import */ var _ice_layer_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ice-layer.page */ 75913);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class IceLayerPageModule {
}
IceLayerPageModule.ɵfac = function IceLayerPageModule_Factory(t) { return new (t || IceLayerPageModule)(); };
IceLayerPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: IceLayerPageModule });
IceLayerPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](IceLayerPageModule, { declarations: [_ice_layer_page__WEBPACK_IMPORTED_MODULE_1__.IceLayerPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule] }); })();


/***/ }),

/***/ 75913:
/*!******************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-thickness/ice-layer/ice-layer.page.ts ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceLayerPage": function() { return /* binding */ IceLayerPage; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);









class IceLayerPage {
    constructor(modalController, ngZone) {
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.isNew = false;
    }
    get isValid() {
        return this.layerCopy.IceLayerThickness !== undefined;
    }
    ngOnInit() {
        if (!this.iceThicknessLayer) {
            this.layerCopy = {};
            this.isNew = true;
        }
        else {
            this.layerCopy = Object.assign({}, this.iceThicknessLayer);
        }
    }
    cancel() {
        this.modalController.dismiss();
    }
    ok() {
        this.modalController.dismiss(this.layerCopy);
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
}
IceLayerPage.ɵfac = function IceLayerPage_Factory(t) { return new (t || IceLayerPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone)); };
IceLayerPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: IceLayerPage, selectors: [["app-ice-layer"]], inputs: { iceThicknessLayer: "iceThicknessLayer" }, decls: 19, vars: 20, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], ["kdvKey", "Ice_IceLayerKDV", 3, "title", "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_LAYER_THICKNESS", "suffix", "cm", "placeholder", "REGISTRATION.SNOW.WEATHER.AIR_TEMPERATURE_PLACEHOLDER", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"]], template: function IceLayerPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function IceLayerPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-list-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "app-kdv-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueChange", function IceLayerPage_Template_app_kdv_select_valueChange_15_listener($event) { return ctx.layerCopy.IceLayerTID = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "app-numeric-input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueChange", function IceLayerPage_Template_app_numeric_input_valueChange_17_listener($event) { return ctx.layerCopy.IceLayerThickness = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "app-modal-save-or-delete-buttons", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("saveClicked", function IceLayerPage_Template_app_modal_save_or_delete_buttons_saveClicked_18_listener() { return ctx.ok(); })("deleteClicked", function IceLayerPage_Template_app_modal_save_or_delete_buttons_deleteClicked_18_listener() { return ctx.delete(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 12, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 14, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 16, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER_TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 18, "REGISTRATION.ICE.ICE_THICKNESS.ICE_TYPE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.layerCopy.IceLayerTID);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.layerCopy.IceLayerThickness)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("saveDisabled", !ctx.isValid)("showDelete", !ctx.isNew);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_1__.KdvSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_2__.NumericInputComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__.ModalSaveOrDeleteButtonsComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY2UtbGF5ZXIucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 43747:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-thickness/ice-thickness.module.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceThicknessPageModule": function() { return /* binding */ IceThicknessPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ice-thickness.page */ 28680);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ice-layer/ice-layer.module */ 57748);
/* harmony import */ var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../can-deactivate-route.guard */ 7990);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);







const routes = [
    {
        path: '',
        component: _ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__.IceThicknessPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__.CanDeactivateRouteGuard]
    }
];
class IceThicknessPageModule {
}
IceThicknessPageModule.ɵfac = function IceThicknessPageModule_Factory(t) { return new (t || IceThicknessPageModule)(); };
IceThicknessPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: IceThicknessPageModule });
IceThicknessPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__.IceLayerPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](IceThicknessPageModule, { declarations: [_ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__.IceThicknessPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__.IceLayerPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 28680:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/ice/ice-thickness/ice-thickness.page.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IceThicknessPage": function() { return /* binding */ IceThicknessPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _ice_layer_ice_layer_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ice-layer/ice-layer.page */ 75913);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/helpers/number-helper */ 27714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/yes-no-select/yes-no-select.component */ 99736);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../pipes/kdv-description.pipe */ 46862);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../pipes/meters-to-cm.pipe */ 50795);























function IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7); const i_r5 = restoredCtx.index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2); return ctx_r6.addOrEditThicknessLayer(i_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "kdvDescription");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "ion-reorder", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 2, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](4, 4, layer_r4.IceLayerTID, "Ice_IceLayerKDV")), " - ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 7, layer_r4.IceLayerThickness), " cm");
} }
function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-numeric-input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template_app_numeric_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2); return ctx_r8.registration.request.IceThickness.IceHeightBefore = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r2.registration.request.IceThickness.IceHeightBefore)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
} }
function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-numeric-input", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template_app_numeric_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2); return ctx_r10.registration.request.IceThickness.IceHeightAfter = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r3.registration.request.IceThickness.IceHeightAfter)("title", ctx_r3.iceHeightAfter === true ? "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT" : "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_AFTER_NO")("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
} }
function IceThicknessPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("reset", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r12.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "app-numeric-input", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r14.registration.request.IceThickness.SnowDepth = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "app-numeric-input", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r15.registration.request.IceThickness.SlushSnow = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-list-header", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "ion-reorder-group", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ionItemReorder", function IceThicknessPage_app_registration_content_wrapper_8_Template_ion_reorder_group_ionItemReorder_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r16.onIceThicknessReorder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template, 7, 9, "ion-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "ion-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IceThicknessPage_app_registration_content_wrapper_8_Template_ion_item_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r17.addOrEditThicknessLayer(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "ion-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "app-numeric-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r18.registration.request.IceThickness.IceThicknessSum = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "app-yes-no-select", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r19.iceHeightBefore = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template, 1, 5, "app-numeric-input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "app-yes-no-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r20.iceHeightAfter = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](19, IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template, 1, 6, "app-numeric-input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "ion-list-header", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "app-text-comment", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r21.registration.request.IceThickness.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](26, "ion-list-header", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](27, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](30, "app-add-picture-item", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.SnowDepth)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.SlushSnow)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 33, "REGISTRATION.ICE.ICE_THICKNESS.ICE_LAYER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.IceThickness.IceThicknessLayers);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](14, 35, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("readonly", true)("value", ctx_r0.registration.request.IceThickness.IceThicknessSum)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.iceHeightBefore);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.iceHeightBefore);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.iceHeightAfter);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.iceHeightAfter !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](23, 37, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](25, 39, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](29, 41, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class IceThicknessPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute, modalController, ngZone) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.IceThickness, basePageService, activatedRoute);
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.iceHeightBefore = undefined;
        this.iceHeightAfter = undefined;
    }
    onInit() {
        if (!this.registration.request.IceThickness.IceThicknessLayers) {
            this.registration.request.IceThickness.IceThicknessLayers = [];
        }
        if (this.registration.request.IceThickness.IceHeightBefore < 0) {
            this.registration.request.IceThickness.IceHeightBefore =
                this.registration.request.IceThickness.IceHeightBefore * -1;
            this.iceHeightBefore = true;
        }
        else if (this.registration.request.IceThickness.IceHeightBefore === 0) {
            this.iceHeightBefore = false;
        }
        if (this.registration.request.IceThickness.IceHeightAfter > 0) {
            this.iceHeightAfter = false;
        }
        else if (this.registration.request.IceThickness.IceHeightAfter < 0) {
            this.registration.request.IceThickness.IceHeightAfter =
                this.registration.request.IceThickness.IceHeightAfter * -1;
            this.iceHeightAfter = true;
        }
    }
    onBeforeLeave() {
        if (this.registration) {
            if (this.iceHeightBefore !== true) {
                this.registration.request.IceThickness.IceHeightBefore = undefined;
            }
            else if (this.registration.request.IceThickness.IceHeightBefore > 0) {
                this.registration.request.IceThickness.IceHeightBefore =
                    this.registration.request.IceThickness.IceHeightBefore * -1;
            }
            else {
                this.registration.request.IceThickness.IceHeightBefore = 0;
            }
            if (this.iceHeightAfter === undefined) {
                this.registration.request.IceThickness.IceHeightAfter = undefined;
            }
            else if (this.iceHeightAfter === true &&
                _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_4__.NumberHelper.isNumeric(this.registration.request.IceThickness.IceHeightAfter)) {
                this.registration.request.IceThickness.IceHeightAfter =
                    this.registration.request.IceThickness.IceHeightAfter * -1;
            }
        }
    }
    isEmpty() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            const isEmptyResult = (!(yield this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid))) &&
                this.iceHeightAfter === undefined &&
                this.iceHeightBefore === undefined;
            return isEmptyResult;
        });
    }
    onReset() {
        this.iceHeightAfter = undefined;
        this.iceHeightBefore = undefined;
        this.registration.request.IceThickness.IceThicknessLayers = [];
    }
    addOrEditThicknessLayer(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _ice_layer_ice_layer_page__WEBPACK_IMPORTED_MODULE_2__.IceLayerPage,
                componentProps: {
                    iceThicknessLayer: this.registration.request.IceThickness
                        .IceThicknessLayers[index]
                }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            if (result.data) {
                if (result.data.delete) {
                    this.removeLayerAtIndex(index);
                }
                else {
                    const iceThicknessLayerCopy = result.data;
                    if (index !== undefined) {
                        this.setIceThicknessLayer(index, iceThicknessLayerCopy);
                    }
                    else {
                        this.addIceThicknessLayer(iceThicknessLayerCopy);
                    }
                }
            }
        });
    }
    onIceThicknessReorder(event) {
        this.ngZone.run(() => {
            this.reorderList(this.registration.request.IceThickness.IceThicknessLayers, event.detail.from, event.detail.to);
        });
        event.detail.complete();
    }
    reorderList(array, fromIndex, toIndex) {
        array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    }
    setIceThicknessLayer(index, iceThicknessLayer) {
        this.ngZone.run(() => {
            this.registration.request.IceThickness.IceThicknessLayers[index] = iceThicknessLayer;
        });
        this.calculateIceThicknessSum();
    }
    addIceThicknessLayer(iceThicknessLayer) {
        this.ngZone.run(() => {
            this.registration.request.IceThickness.IceThicknessLayers.push(iceThicknessLayer);
        });
        this.calculateIceThicknessSum();
    }
    calculateIceThicknessSum() {
        const newSum = (this.registration.request.IceThickness.IceThicknessLayers || []).reduce((p, c) => p + (c.IceLayerThickness || 0), 0);
        this.ngZone.run(() => {
            this.registration.request.IceThickness.IceThicknessSum = newSum;
        });
    }
    removeLayerAtIndex(index) {
        this.ngZone.run(() => {
            this.registration.request.IceThickness.IceThicknessLayers.splice(index, 1);
        });
        this.calculateIceThicknessSum();
    }
}
IceThicknessPage.ɵfac = function IceThicknessPage_Factory(t) { return new (t || IceThicknessPage)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgZone)); };
IceThicknessPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: IceThicknessPage, selectors: [["app-ice-thickness"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full", "reorder", "true"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.DRY_SNOW_BEFORE_DRILL", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.SLUSH_SNOW_BEFORE_DRILL", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], [1, "ion-text-uppercase"], ["disabled", "false", 3, "ionItemReorder"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_THICKNESS_SUM", "suffix", "cm", 3, "readonly", "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_TOGGLE", 3, "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_AFTER_TOGGLE", 3, "value", "valueChange"], ["suffix", "cm", "placeholder", "REGISTRATION.IN_CM", 3, "value", "title", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], [3, "value", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["slot", "end"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["suffix", "cm", "placeholder", "REGISTRATION.IN_CM", 3, "value", "title", "min", "max", "decimalPlaces", "convertRatio", "valueChange"]], template: function IceThicknessPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, IceThicknessPage_app_registration_content_wrapper_8_Template, 31, 43, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](6, 2, "REGISTRATION.ICE.ICE_THICKNESS.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.IceThickness);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonList, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonIcon, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_8__.YesNoSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonReorder], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_11__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_12__.MetersToCmPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY2UtdGhpY2tuZXNzLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19pY2VfaWNlLXRoaWNrbmVzc19pY2UtdGhpY2tuZXNzX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBRXFEO0FBQzJDO0FBQzVFO0FBQ3RCO0FBQ007QUFDWjtBQUNYO0FBQytDOzs7Ozs7O0FBRS9FLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBSTdCLE1BQU0sZUFBZTtJQXFCMUIsWUFDVSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLHlCQUFvRCxFQUNwRCxNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBTjlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDckMsQ0FBQztJQTVCSixJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSx5QkFBeUI7UUFDM0IsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUM7SUFDeEMsQ0FBQztJQVlLLFlBQVksQ0FBQyxZQUEyQixFQUFFLGVBQWdDLEVBQUUsT0FB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QUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O2dGQWpKVSxnQkFBZ0I7K0dBQWhCLGdCQUFnQjtRQ2Y3Qiw4RUFBWTtRQUNWLGtGQUF1QztRQUNyQyxrRkFBMEI7UUFDeEIsaUZBQTJEO1FBQzdELDZEQUFjO1FBQ2QsNkVBQVc7UUFDVCx3REFDRjs7UUFBQSw2REFBWTtRQUNkLDZEQUFjO1FBQ2hCLDZEQUFhO1FBQ2IsK0VBQWE7UUFDWCx5S0F5RG1DO1FBQ3JDLDZEQUFjOztRQS9EUiwyREFDRjtRQURFLHFMQUNGO1FBSWlDLDJEQUF1RDtRQUF2RCw0SEFBdUQiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvaWNlL2ljZS10aGlja25lc3MvaWNlLWxheWVyL2ljZS1sYXllci5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvaWNlL2ljZS10aGlja25lc3MvaWNlLWxheWVyL2ljZS1sYXllci5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS1sYXllci9pY2UtbGF5ZXIucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS10aGlja25lc3MubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS10aGlja25lc3MucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9pY2UvaWNlLXRoaWNrbmVzcy9pY2UtdGhpY2tuZXNzLnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJY2VMYXllclBhZ2UgfSBmcm9tICcuL2ljZS1sYXllci5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ljZUxheWVyUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbSWNlTGF5ZXJQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWNlTGF5ZXJQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSWNlVGhpY2tuZXNzTGF5ZXJFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1pY2UtbGF5ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtbGF5ZXIucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pY2UtbGF5ZXIucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEljZUxheWVyUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsO1xyXG5cclxuICBpc05ldyA9IGZhbHNlO1xyXG4gIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDb3B5LkljZUxheWVyVGhpY2tuZXNzICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBsYXllckNvcHk6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsOyAvLyBVc2luZyBvYmplY3QgY29weSBzbyBjYW5jZWwgZG9lcyBub3QgY2hhbmdlIGlucHV0IG9iamVjdFxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5pY2VUaGlja25lc3NMYXllcikge1xyXG4gICAgICB0aGlzLmxheWVyQ29weSA9IHt9O1xyXG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJDb3B5ID0geyAuLi50aGlzLmljZVRoaWNrbmVzc0xheWVyIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy5sYXllckNvcHkpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5BRERfSUNFX0xBWUVSJyB8IHRyYW5zbGF0ZX19PC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAge3snUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLkFERF9JQ0VfTEFZRVJfVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cInt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfVFlQRScgfCB0cmFuc2xhdGV9fVwiIGtkdktleT1cIkljZV9JY2VMYXllcktEVlwiXHJcbiAgICAgIFsodmFsdWUpXT1cImxheWVyQ29weS5JY2VMYXllclRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXJDb3B5LkljZUxheWVyVGhpY2tuZXNzXCJcclxuICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0xBWUVSX1RISUNLTkVTU1wiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiXHJcbiAgICAgIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgc3VmZml4PVwiY21cIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuQUlSX1RFTVBFUkFUVVJFX1BMQUNFSE9MREVSXCI+XHJcbiAgICA8L2FwcC1udW1lcmljLWlucHV0PlxyXG4gIDwvaW9uLWxpc3Q+XHJcbiAgPGFwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zIFtzYXZlRGlzYWJsZWRdPVwiIWlzVmFsaWRcIiAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCJcclxuICAgIFtzaG93RGVsZXRlXT1cIiFpc05ld1wiPlxyXG4gIDwvYXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnM+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBJY2VUaGlja25lc3NQYWdlIH0gZnJvbSAnLi9pY2UtdGhpY2tuZXNzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgSWNlTGF5ZXJQYWdlTW9kdWxlIH0gZnJvbSAnLi9pY2UtbGF5ZXIvaWNlLWxheWVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkIH0gZnJvbSAnLi4vLi4vY2FuLWRlYWN0aXZhdGUtcm91dGUuZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEljZVRoaWNrbmVzc1BhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgSWNlTGF5ZXJQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ljZVRoaWNrbmVzc1BhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJY2VUaGlja25lc3NQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSWNlTGF5ZXJQYWdlIH0gZnJvbSAnLi9pY2UtbGF5ZXIvaWNlLWxheWVyLnBhZ2UnO1xyXG5pbXBvcnQgeyBJY2VUaGlja25lc3NMYXllckVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE51bWJlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9udW1iZXItaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWljZS10aGlja25lc3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtdGhpY2tuZXNzLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWNlLXRoaWNrbmVzcy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWNlVGhpY2tuZXNzUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBpY2VIZWlnaHRCZWZvcmU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgaWNlSGVpZ2h0QWZ0ZXI6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkljZVRoaWNrbmVzcywgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZVRoaWNrbmVzc0xheWVycykge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRCZWZvcmUgPCAwKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEJlZm9yZSA9XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlICogLTE7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QWZ0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPCAwKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEFmdGVyID1cclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRBZnRlciAqIC0xO1xyXG4gICAgICB0aGlzLmljZUhlaWdodEFmdGVyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmVmb3JlTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24pIHtcclxuICAgICAgaWYgKHRoaXMuaWNlSGVpZ2h0QmVmb3JlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEJlZm9yZSA+IDApIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRCZWZvcmUgPVxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlICogLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5pY2VIZWlnaHRBZnRlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgdGhpcy5pY2VIZWlnaHRBZnRlciA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgIE51bWJlckhlbHBlci5pc051bWVyaWMoXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRBZnRlclxyXG4gICAgICAgIClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPVxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgKiAtMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpIHtcclxuICAgIGNvbnN0IGlzRW1wdHlSZXN1bHQgPSBcclxuICAgICAgKCFhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICAgICkpICYmXHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QWZ0ZXIgPT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0aGlzLmljZUhlaWdodEJlZm9yZSA9PT0gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGlzRW1wdHlSZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBvblJlc2V0KCkge1xyXG4gICAgdGhpcy5pY2VIZWlnaHRBZnRlciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzID0gW107XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRUaGlja25lc3NMYXllcihpbmRleD86IG51bWJlcikge1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEljZUxheWVyUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBpY2VUaGlja25lc3NMYXllcjogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3NcclxuICAgICAgICAgIC5JY2VUaGlja25lc3NMYXllcnNbaW5kZXhdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJBdEluZGV4KGluZGV4KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBpY2VUaGlja25lc3NMYXllckNvcHk6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0SWNlVGhpY2tuZXNzTGF5ZXIoaW5kZXgsIGljZVRoaWNrbmVzc0xheWVyQ29weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkSWNlVGhpY2tuZXNzTGF5ZXIoaWNlVGhpY2tuZXNzTGF5ZXJDb3B5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSWNlVGhpY2tuZXNzUmVvcmRlcihldmVudDogQ3VzdG9tRXZlbnQpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVvcmRlckxpc3QoXHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzLFxyXG4gICAgICAgIGV2ZW50LmRldGFpbC5mcm9tLFxyXG4gICAgICAgIGV2ZW50LmRldGFpbC50b1xyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBldmVudC5kZXRhaWwuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHJlb3JkZXJMaXN0KGFycmF5OiBBcnJheTxhbnk+LCBmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyKSB7XHJcbiAgICBhcnJheS5zcGxpY2UodG9JbmRleCwgMCwgYXJyYXkuc3BsaWNlKGZyb21JbmRleCwgMSlbMF0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SWNlVGhpY2tuZXNzTGF5ZXIoaW5kZXg6IG51bWJlciwgaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnNbXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgXSA9IGljZVRoaWNrbmVzc0xheWVyO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUljZVRoaWNrbmVzc1N1bSgpO1xyXG4gIH1cclxuXHJcbiAgYWRkSWNlVGhpY2tuZXNzTGF5ZXIoaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMucHVzaChcclxuICAgICAgICBpY2VUaGlja25lc3NMYXllclxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUljZVRoaWNrbmVzc1N1bSgpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlSWNlVGhpY2tuZXNzU3VtKCkge1xyXG4gICAgY29uc3QgbmV3U3VtID0gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMgfHwgW11cclxuICAgICkucmVkdWNlKChwLCBjKSA9PiBwICsgKGMuSWNlTGF5ZXJUaGlja25lc3MgfHwgMCksIDApO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzU3VtID0gbmV3U3VtO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVMYXllckF0SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2FsY3VsYXRlSWNlVGhpY2tuZXNzU3VtKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzc1wiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIiByZW9yZGVyPVwidHJ1ZVwiPlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLlNub3dEZXB0aFwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuRFJZX1NOT1dfQkVGT1JFX0RSSUxMXCIgW21pbl09XCIwXCIgW21heF09XCI5OTlcIiBbZGVjaW1hbFBsYWNlc109XCIyXCJcclxuICAgICAgICBbY29udmVydFJhdGlvXT1cIjEwMFwiIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLklOX0NNXCIgc3VmZml4PVwiY21cIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLlNsdXNoU25vd1wiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuU0xVU0hfU05PV19CRUZPUkVfRFJJTExcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjk5OVwiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIlxyXG4gICAgICAgIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgcGxhY2Vob2xkZXI9XCJSRUdJU1RSQVRJT04uSU5fQ01cIiBzdWZmaXg9XCJjbVwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfTEFZRVInIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLXJlb3JkZXItZ3JvdXAgZGlzYWJsZWQ9XCJmYWxzZVwiIChpb25JdGVtUmVvcmRlcik9XCJvbkljZVRoaWNrbmVzc1Jlb3JkZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0VGhpY2tuZXNzTGF5ZXIoaSlcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGxheWVyIG9mIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+IHt7IGxheWVyLkljZUxheWVyVElEIHwga2R2RGVzY3JpcHRpb246J0ljZV9JY2VMYXllcktEVicgfCBhc3luYyB9fSAtXHJcbiAgICAgICAgICAgIHt7IGxheWVyLkljZUxheWVyVGhpY2tuZXNzIHwgbWV0ZXJzVG9DbSB9fSBjbTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1yZW9yZGVyIHNsb3Q9XCJlbmRcIj48L2lvbi1yZW9yZGVyPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvaW9uLXJlb3JkZXItZ3JvdXA+XHJcbiAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0VGhpY2tuZXNzTGF5ZXIoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5BRERfSUNFX0xBWUVSJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbcmVhZG9ubHldPVwidHJ1ZVwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NTdW1cIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9USElDS05FU1NfU1VNXCIgW21pbl09XCIwXCIgW21heF09XCI5OTlcIiBbZGVjaW1hbFBsYWNlc109XCIyXCJcclxuICAgICAgICBbY29udmVydFJhdGlvXT1cIjEwMFwiIHN1ZmZpeD1cImNtXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC15ZXMtbm8tc2VsZWN0IFsodmFsdWUpXT1cImljZUhlaWdodEJlZm9yZVwiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9IRUlHSFRfQkVGT1JFX1RPR0dMRVwiPlxyXG4gICAgICA8L2FwcC15ZXMtbm8tc2VsZWN0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgKm5nSWY9XCJpY2VIZWlnaHRCZWZvcmVcIiBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfSEVJR0hUX0JFRk9SRV9JTlBVVFwiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiXHJcbiAgICAgICAgW2NvbnZlcnRSYXRpb109XCIxMDBcIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5JTl9DTVwiIHN1ZmZpeD1cImNtXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC15ZXMtbm8tc2VsZWN0IFsodmFsdWUpXT1cImljZUhlaWdodEFmdGVyXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0hFSUdIVF9BRlRFUl9UT0dHTEVcIj5cclxuICAgICAgPC9hcHAteWVzLW5vLXNlbGVjdD5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0ICpuZ0lmPVwiaWNlSGVpZ2h0QWZ0ZXIgIT09IHVuZGVmaW5lZFwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEFmdGVyXCJcclxuICAgICAgICBbdGl0bGVdPVwiaWNlSGVpZ2h0QWZ0ZXIgPT09IHRydWUgPyAnUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9IRUlHSFRfQkVGT1JFX0lOUFVUJyA6ICdSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0hFSUdIVF9BRlRFUl9OTydcIlxyXG4gICAgICAgIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgc3VmZml4PVwiY21cIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5JTl9DTVwiPlxyXG4gICAgICA8L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5Db21tZW50XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cInt7J1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQ09NTUVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9