"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_avalanche-activity_avalanche-activity_module_ts"],{

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

/***/ 12285:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-activity/avalanche-activity-modal/avalanche-activity-modal.module.ts ***!
  \********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheActivityModalPageModule": function() { return /* binding */ AvalancheActivityModalPageModule; }
/* harmony export */ });
/* harmony import */ var _avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avalanche-activity-modal.page */ 73314);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class AvalancheActivityModalPageModule {
}
AvalancheActivityModalPageModule.ɵfac = function AvalancheActivityModalPageModule_Factory(t) { return new (t || AvalancheActivityModalPageModule)(); };
AvalancheActivityModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AvalancheActivityModalPageModule });
AvalancheActivityModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AvalancheActivityModalPageModule, { declarations: [_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 73314:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-activity/avalanche-activity-modal/avalanche-activity-modal.page.ts ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheActivityModalPage": function() { return /* binding */ AvalancheActivityModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/snow/exposed-height/exposed-height.component */ 55935);
/* harmony import */ var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/snow/valid-exposition/valid-exposition.component */ 70133);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function AvalancheActivityModalPage_ion_content_9_ion_item_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
} }
function AvalancheActivityModalPage_ion_content_9_ion_select_option_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-select-option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const timeFrame_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", timeFrame_r4.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, timeFrame_r4.text), "");
} }
function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r5.avalancheActivityCopy.EstimatedNumTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r7.avalancheActivityCopy.AvalancheExtTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "app-kdv-select", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r8.avalancheActivityCopy.AvalTriggerSimpleTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "app-kdv-select", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r9.avalancheActivityCopy.DestructiveSizeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "app-kdv-select", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r10.avalancheActivityCopy.AvalPropagationTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "app-exposed-height", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("exposedHeightComboTIDChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHeightComboTIDChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r11.avalancheActivityCopy.ExposedHeightComboTID = $event; })("exposedHight1Change", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHight1Change_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r12.avalancheActivityCopy.ExposedHeight1 = $event; })("exposedHight2Change", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHight2Change_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r13.avalancheActivityCopy.ExposedHeight2 = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "app-valid-exposition", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("validExpositionChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_valid_exposition_validExpositionChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r14.avalancheActivityCopy.ValidExposition = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.EstimatedNumTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalancheExtTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalTriggerSimpleTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.DestructiveSizeTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalPropagationTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("exposedHeightComboTID", ctx_r3.avalancheActivityCopy.ExposedHeightComboTID)("exposedHight1", ctx_r3.avalancheActivityCopy.ExposedHeight1)("exposedHight2", ctx_r3.avalancheActivityCopy.ExposedHeight2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("validExposition", ctx_r3.avalancheActivityCopy.ValidExposition);
} }
const _c0 = function (a0) { return { "hasWarning": a0 }; };
function AvalancheActivityModalPage_ion_content_9_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-checkbox", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_checkbox_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r15.noAvalancheActivity = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "ion-label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-datetime", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_datetime_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r17.startDate = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, AvalancheActivityModalPage_ion_content_9_ion_item_15_Template, 5, 6, "ion-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "ion-label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_select_ngModelChange_20_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r18.selectedTimeFrame = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](22, AvalancheActivityModalPage_ion_content_9_ion_select_option_22_Template, 3, 4, "ion-select-option", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](23, AvalancheActivityModalPage_ion_content_9_ng_container_23_Template, 8, 9, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-text-comment", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_Template_app_text_comment_valueChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r19.avalancheActivityCopy.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "app-modal-save-or-delete-buttons", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("saveClicked", function AvalancheActivityModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_25_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r20.ok(); })("deleteClicked", function AvalancheActivityModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_25_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r21.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 17, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.NO_AVALANCHE_ACTIVITY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.noAvalancheActivity);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](31, _c0, ctx_r0.dateIsDifferentThanObsTime));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](10, 19, "DATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 21, "MONTHS.SHORT_LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](13, 23, "DIALOGS.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](14, 25, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("max", ctx_r0.maxDate)("ngModel", ctx_r0.startDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.dateIsDifferentThanObsTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](19, 27, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.ESTIMATED_TIME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](21, 29, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.selectedTimeFrame);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.timeFrames);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.noAvalancheActivity);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheActivityCopy.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showDelete", !ctx_r0.isNew);
} }
class AvalancheActivityModalPage {
    constructor(modalController) {
        this.modalController = modalController;
        this.isNew = false;
        this.timeFrames = [
            {
                id: 1,
                start: { h: 0, m: 0 },
                end: { h: 23, m: 59 },
                text: 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DURING_THE_DAY'
            },
            {
                id: 2,
                start: { h: 0, m: 0 },
                end: { h: 6, m: 0 },
                text: '0-6'
            },
            {
                id: 3,
                start: { h: 6, m: 0 },
                end: { h: 12, m: 0 },
                text: '6-12'
            },
            {
                id: 4,
                start: { h: 12, m: 0 },
                end: { h: 18, m: 0 },
                text: '12-18'
            },
            {
                id: 5,
                start: { h: 18, m: 0 },
                end: { h: 23, m: 59 },
                text: '18-24'
            }
        ];
        this.selectedTimeFrame = 1;
    }
    get noAvalancheActivity() {
        return this.avalancheActivityCopy.EstimatedNumTID === 1;
    }
    set noAvalancheActivity(val) {
        if (val) {
            this.avalancheActivityCopy.EstimatedNumTID = 1;
        }
        else {
            this.avalancheActivityCopy.EstimatedNumTID = undefined;
        }
    }
    get dateIsDifferentThanObsTime() {
        return (this.startDate &&
            !moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate)
                .startOf('day')
                .isSame(moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dtObsTime).startOf('day')));
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.maxDate = this.getMaxDateForNow();
            if (this.avalancheActivity) {
                this.avalancheActivityCopy = Object.assign({}, this.avalancheActivity);
            }
            else {
                this.avalancheActivityCopy = {};
                this.isNew = true;
            }
            if (this.avalancheActivityCopy.DtStart &&
                this.avalancheActivityCopy.DtEnd) {
                const start = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtStart);
                const end = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtEnd);
                this.startDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtStart)
                    .startOf('day')
                    .toISOString(true);
                const timeFrame = this.timeFrames.find((tf) => tf.start.h === start.hours() &&
                    tf.end.h === end.hours() &&
                    tf.start.m === start.minutes() &&
                    tf.end.m === end.minutes());
                if (timeFrame) {
                    this.selectedTimeFrame = timeFrame.id;
                }
            }
            else {
                this.startDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dtObsTime).startOf('day').toISOString(true);
            }
        });
    }
    getMaxDateForNow() {
        // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
        // Workaround is to set minutes to 59.
        return moment__WEBPACK_IMPORTED_MODULE_1___default()().minutes(59).toISOString(true);
    }
    cancel() {
        this.modalController.dismiss();
    }
    resetWhenNoActivityFields() {
        this.avalancheActivityCopy.AvalancheExtTID = undefined;
        this.avalancheActivityCopy.AvalTriggerSimpleTID = undefined;
        this.avalancheActivityCopy.DestructiveSizeTID = undefined;
        this.avalancheActivityCopy.AvalPropagationTID = undefined;
        this.avalancheActivityCopy.ExposedHeightComboTID = undefined;
        this.avalancheActivityCopy.ExposedHeight1 = undefined;
        this.avalancheActivityCopy.ExposedHeight2 = undefined;
        this.avalancheActivityCopy.ValidExposition = undefined;
    }
    ok() {
        if (this.avalancheActivityCopy.EstimatedNumTID === 1) {
            this.resetWhenNoActivityFields();
        }
        const timeFrame = this.timeFrames.find((tf) => tf.id === this.selectedTimeFrame);
        if (this.startDate && timeFrame) {
            this.avalancheActivityCopy.DtStart = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate)
                .hours(timeFrame.start.h)
                .minutes(timeFrame.start.m)
                .toISOString(true);
            this.avalancheActivityCopy.DtEnd = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate)
                .hours(timeFrame.end.h)
                .minutes(timeFrame.end.m)
                .toISOString(true);
        }
        if (this.isNew && _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.avalancheActivityCopy)) {
            this.modalController.dismiss(null);
        }
        else {
            this.modalController.dismiss(this.avalancheActivityCopy);
        }
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
}
AvalancheActivityModalPage.ɵfac = function AvalancheActivityModalPage_Factory(t) { return new (t || AvalancheActivityModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController)); };
AvalancheActivityModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: AvalancheActivityModalPage, selectors: [["app-avalanche-activity-modal"]], inputs: { avalancheActivity: "avalancheActivity", dtObsTime: "dtObsTime" }, decls: 10, vars: 7, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], ["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange"], [3, "ngClass"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY", 3, "monthShortNames", "doneText", "cancelText", "max", "ngModel", "ngModelChange"], ["interface", "action-sheet", 3, "cancelText", "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["color", "danger", 1, "ion-text-wrap"], [3, "value"], ["title", "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.HOW_MANY_AVALANCHES", "kdvKey", "Snow_EstimatedNumKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TYPE", "kdvKey", "Snow_AvalancheExtKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_TRIGGER", "kdvKey", "Snow_AvalTriggerSimpleKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.DESTRUCTIVE_SIZE", "kdvKey", "Snow_DestructiveSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION", "kdvKey", "Snow_AvalPropagationKDV", 3, "value", "valueChange"], [3, "exposedHeightComboTID", "exposedHight1", "exposedHight2", "exposedHeightComboTIDChange", "exposedHight1Change", "exposedHight2Change"], [3, "validExposition", "validExpositionChange"]], template: function AvalancheActivityModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AvalancheActivityModalPage_ion_content_9_Template, 26, 33, "ion-content", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.avalancheActivityCopy);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.SelectValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelect, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__.ModalSaveOrDeleteButtonsComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelectOption, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_6__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_7__.ValidExpositionComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 91560:
/*!*************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-activity/avalanche-activity.module.ts ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheActivityPageModule": function() { return /* binding */ AvalancheActivityPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avalanche-activity.page */ 1767);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avalanche-activity-modal/avalanche-activity-modal.module */ 12285);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityPage
    }
];
class AvalancheActivityPageModule {
}
AvalancheActivityPageModule.ɵfac = function AvalancheActivityPageModule_Factory(t) { return new (t || AvalancheActivityPageModule)(); };
AvalancheActivityPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AvalancheActivityPageModule });
AvalancheActivityPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheActivityModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AvalancheActivityPageModule, { declarations: [_avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheActivityModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 1767:
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-activity/avalanche-activity.page.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheActivityPage": function() { return /* binding */ AvalancheActivityPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var _avalanche_activity_modal_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avalanche-activity-modal/avalanche-activity-modal.page */ 73314);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);




















function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const avalancheActivity_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 3, ctx_r4.getCause(avalancheActivity_r2))), "");
} }
function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const i_r3 = restoredCtx.index; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r6.addOrEditAvalancheActivity(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_span_4_Template, 4, 5, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const avalancheActivity_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, ctx_r1.getEstimatedNumber(avalancheActivity_r2)));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", avalancheActivity_r2.EstimatedNumTID !== 1);
} }
function AvalancheActivityPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function AvalancheActivityPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r8.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template, 5, 4, "ion-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityPage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r10.addOrEditAvalancheActivity(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "ion-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "app-add-picture-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 10, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.AvalancheActivityObs2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](11, 12, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.ADD_NEW"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 14, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class AvalancheActivityPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute, modalController, ngZone, kdvService) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.AvalancheActivityObs2, basePageService, activatedRoute);
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.kdvService = kdvService;
        this.avalancheCause = [];
        this.estimatedNumber = [];
    }
    onInit() {
        this.kdvSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([
            this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheExtKDV'),
            this.kdvService.getKdvRepositoryByKeyObservable('Snow_EstimatedNumKDV')
        ]).subscribe(([causeKdv, estimatedNumberKdv]) => {
            this.avalancheCause = causeKdv;
            this.estimatedNumber = estimatedNumberKdv;
        });
    }
    onBeforeLeave() {
        if (this.kdvSubscription) {
            this.kdvSubscription.unsubscribe();
        }
    }
    addOrEditAvalancheActivity(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _avalanche_activity_modal_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_3__.AvalancheActivityModalPage,
                componentProps: {
                    avalancheActivity: this.registration.request.AvalancheActivityObs2[index],
                    dtObsTime: this.registration.request.DtObsTime
                }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            this.ngZone.run(() => {
                if (result.data) {
                    if (result.data.delete) {
                        this.registration.request.AvalancheActivityObs2.splice(index, 1);
                    }
                    else {
                        const avalancheActivityObs = result.data;
                        if (index !== undefined) {
                            this.registration.request.AvalancheActivityObs2[index] = avalancheActivityObs;
                        }
                        else {
                            this.registration.request.AvalancheActivityObs2.push(avalancheActivityObs);
                        }
                    }
                }
            });
        });
    }
    getCause(avalancheActivityObs) {
        const cause = this.avalancheCause.find((c) => c.Id === avalancheActivityObs.AvalancheExtTID);
        if (cause) {
            return cause.Name;
        }
        else {
            return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
        }
    }
    getEstimatedNumber(avalancheActivityObs) {
        const kdvalue = this.estimatedNumber.find((c) => c.Id === avalancheActivityObs.EstimatedNumTID);
        if (kdvalue) {
            return kdvalue.Name;
        }
        else {
            return 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.UNKNOWN_NUMBER';
        }
    }
}
AvalancheActivityPage.ɵfac = function AvalancheActivityPage_Factory(t) { return new (t || AvalancheActivityPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__.KdvService)); };
AvalancheActivityPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: AvalancheActivityPage, selectors: [["app-avalanche-activity"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["detail", "true", 3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["detail", "true", 3, "click"], [4, "ngIf"]], template: function AvalancheActivityPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, AvalancheActivityPage_app_registration_content_wrapper_8_Template, 17, 16, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.AvalancheActivityObs2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.LowerCasePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtYWN0aXZpdHkucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zbm93X2F2YWxhbmNoZS1hY3Rpdml0eV9hdmFsYW5jaGUtYWN0aXZpdHlfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFcUQ7QUFDMkM7QUFDNUU7QUFDdEI7QUFDTTtBQUNaO0FBQ1g7QUFDK0M7Ozs7Ozs7QUFFL0UsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFJN0IsTUFBTSxlQUFlO0lBcUIxQixZQUNVLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMseUJBQW9ELEVBQ3BELE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsY0FBOEI7UUFOOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBNUJKLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxtQkFBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLHlCQUF5QjtRQUMzQixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDO0lBWUssWUFBWSxDQUFDLFlBQTJCLEVBQUUsZUFB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UUFDVixpRkFBdUM7UUFDckMsaUZBQTBCO1FBQ3hCLGdGQUEyRDtRQUM3RCw0REFBYztRQUNkLDRFQUFXO1FBQ1QsdURBQ0Y7O1FBQUEsNERBQVk7UUFDZCw0REFBYztRQUNoQiw0REFBYTtRQUNiLDhFQUFhO1FBQ1gsNktBNEJtQztRQUNyQyw0REFBYzs7UUFsQ1IsMERBQ0Y7UUFERSx5TEFDRjtRQUlpQywwREFBZ0U7UUFBaEUsb0lBQWdFIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLWFjdGl2aXR5L2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLWFjdGl2aXR5L2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1hY3Rpdml0eS9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwvYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1hY3Rpdml0eS9hdmFsYW5jaGUtYWN0aXZpdHkubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLWFjdGl2aXR5L2F2YWxhbmNoZS1hY3Rpdml0eS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLWFjdGl2aXR5L2F2YWxhbmNoZS1hY3Rpdml0eS5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eU5hbWUsIGlzQXJyYXlUeXBlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmhlbHBlcnMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0Jhc2VQYWdlU2VydmljZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlU2VydmljZSB7XHJcbiAgZ2V0IFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmU7XHJcbiAgfVxyXG5cclxuICBnZXQgUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQWxlcnRDb250cm9sbGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxlcnRDb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFRyYW5zbGF0ZVNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1MZWF2ZShyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLlJFUVVJUkVEX0ZJRUxEU19NSVNTSU5HJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLkNPTkZJUk1fUkVTRVQnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVSZXNldERpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFsnRElBTE9HUy5DQU5DRUwnLCAnRElBTE9HUy5ZRVMnXSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLllFUyddXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gICAgY29uc3QgcmVzZXQ6IGJvb2xlYW4gPSByZXN1bHQucm9sZSAhPT0gJ2NhbmNlbCc7XHJcbiAgICBpZiAocmVzZXQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZXNldChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzZXQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5ab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZWdpc3RyYXRpb25UaWQpIHtcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob25SZXNldCkge1xyXG4gICAgICAgIG9uUmVzZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEZWZhdWx0UHJvcHMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdKSB7XHJcbiAgICAgIC8vIEluaXQgdG8gbmV3IG9iamVjdCBpZiBudWxsXHJcbiAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGlmIChpc0FycmF5VHlwZShyZWdpc3RyYXRpb25UaWQpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHMocmVnaXN0cmF0aW9uLmlkKVxyXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PiBmb3JrSm9pbihhdHRhY2htZW50cy5tYXAoKGEpID0+IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UucmVtb3ZlQXR0YWNobWVudChyZWdpc3RyYXRpb24uaWQsIGEuaWQpKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ1Jlc2V0IGltYWdlcyBjb21wbGV0ZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoZXJyb3IsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCByZXNldCBpbWFnZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZTtcclxuICByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UgPSBiYXNlUGFnZVNlcnZpY2U7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCA9IHJlZ2lzdHJhdGlvblRpZDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQoaWQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgbWFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNyZWF0ZURlZmF1bHRQcm9wcyhyZWcsIHRoaXMucmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICAgIHJldHVybiByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNyZWF0ZUluaXRPYnNlcnZhYmxlKCkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0PygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvbkJlZm9yZUxlYXZlPygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvblJlc2V0PygpOiB2b2lkO1xyXG5cclxuICBpc1ZhbGlkPygpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgLy8gTk9URTogUmVtZW1iZXIgdG8gYWRkIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF0gaW4gcGFnZSBtb2R1bGVcclxuICBhc3luYyBjYW5MZWF2ZSgpIHtcclxuICAgIC8vIENoZWNrIGlmIGltcGxlbWVudGF0aW9uIHBhZ2UgaGFzIGltcGxlbWVudGVkIGN1c3RvbSBpc1ZhbGlkIGxvZ2ljXHJcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLmlzVmFsaWQoKSA6IHRydWUpO1xyXG4gICAgLy8gT25seSByZXR1cm4gYWxlcnQgaWYgcGFnZSBpcyBub3QgZW1wdHkgYW5kIGludmFsaWRcclxuICAgIGNvbnN0IGlzRW1wdHkgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc0VtcHR5KCkpO1xyXG4gICAgaWYgKCFpc0VtcHR5ICYmICF2YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybUxlYXZlKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUluaXRPYnNlcnZhYmxlKCkge1xyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7XHJcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh0aGlzLm9uSW5pdCgpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlTGVhdmUpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVMZWF2ZSgpKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2F2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoY2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuUmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24sIGNsZWFuKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVGdW5jKCkge1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiAhKGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKVxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybVJlc2V0KHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb2x2ZWRVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICcvJyArXHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgICAgICAgLm1hcCgodikgPT4gdi51cmwubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKSlcclxuICAgICAgICAuZmlsdGVyKChwYXRoKSA9PiAhIXBhdGgpXHJcbiAgICAgICAgLmpvaW4oJy8nKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGdldENvbmZpZ3VyZWRVcmwoKTogc3RyaW5nIHtcclxuICAvLyAgICAgcmV0dXJuICcvJyArIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgLy8gICAgICAgICAuZmlsdGVyKHYgPT4gdi5yb3V0ZUNvbmZpZylcclxuICAvLyAgICAgICAgIC5tYXAodiA9PiB2LnJvdXRlQ29uZmlnLnBhdGgpXHJcbiAgLy8gICAgICAgICAuam9pbignLycpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZSB9IGZyb20gJy4vYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVBY3Rpdml0eU9iczJFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhdmFsYW5jaGVBY3Rpdml0eTogQXZhbGFuY2hlQWN0aXZpdHlPYnMyRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIGR0T2JzVGltZTogc3RyaW5nO1xyXG5cclxuICBhdmFsYW5jaGVBY3Rpdml0eUNvcHk6IEF2YWxhbmNoZUFjdGl2aXR5T2JzMkVkaXRNb2RlbDtcclxuICBpc05ldyA9IGZhbHNlO1xyXG4gIG1heERhdGU6IHN0cmluZztcclxuXHJcbiAgZ2V0IG5vQXZhbGFuY2hlQWN0aXZpdHkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXN0aW1hdGVkTnVtVElEID09PSAxO1xyXG4gIH1cclxuXHJcbiAgc2V0IG5vQXZhbGFuY2hlQWN0aXZpdHkodmFsOiBib29sZWFuKSB7XHJcbiAgICBpZiAodmFsKSB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkVzdGltYXRlZE51bVRJRCA9IDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5Fc3RpbWF0ZWROdW1USUQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0ZUlzRGlmZmVyZW50VGhhbk9ic1RpbWUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSAmJlxyXG4gICAgICAhbW9tZW50KHRoaXMuc3RhcnREYXRlKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKVxyXG4gICAgICAgIC5pc1NhbWUobW9tZW50KHRoaXMuZHRPYnNUaW1lKS5zdGFydE9mKCdkYXknKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB0aW1lRnJhbWVzID0gW1xyXG4gICAge1xyXG4gICAgICBpZDogMSxcclxuICAgICAgc3RhcnQ6IHsgaDogMCwgbTogMCB9LFxyXG4gICAgICBlbmQ6IHsgaDogMjMsIG06IDU5IH0sXHJcbiAgICAgIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuRFVSSU5HX1RIRV9EQVknXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogMixcclxuICAgICAgc3RhcnQ6IHsgaDogMCwgbTogMCB9LFxyXG4gICAgICBlbmQ6IHsgaDogNiwgbTogMCB9LFxyXG4gICAgICB0ZXh0OiAnMC02J1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDMsXHJcbiAgICAgIHN0YXJ0OiB7IGg6IDYsIG06IDAgfSxcclxuICAgICAgZW5kOiB7IGg6IDEyLCBtOiAwIH0sXHJcbiAgICAgIHRleHQ6ICc2LTEyJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDQsXHJcbiAgICAgIHN0YXJ0OiB7IGg6IDEyLCBtOiAwIH0sXHJcbiAgICAgIGVuZDogeyBoOiAxOCwgbTogMCB9LFxyXG4gICAgICB0ZXh0OiAnMTItMTgnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogNSxcclxuICAgICAgc3RhcnQ6IHsgaDogMTgsIG06IDAgfSxcclxuICAgICAgZW5kOiB7IGg6IDIzLCBtOiA1OSB9LFxyXG4gICAgICB0ZXh0OiAnMTgtMjQnXHJcbiAgICB9XHJcbiAgXTtcclxuXHJcbiAgc2VsZWN0ZWRUaW1lRnJhbWUgPSAxO1xyXG4gIHN0YXJ0RGF0ZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyKSB7fVxyXG5cclxuICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMubWF4RGF0ZSA9IHRoaXMuZ2V0TWF4RGF0ZUZvck5vdygpO1xyXG4gICAgaWYgKHRoaXMuYXZhbGFuY2hlQWN0aXZpdHkpIHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkgPSB7IC4uLnRoaXMuYXZhbGFuY2hlQWN0aXZpdHkgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5ID0ge307XHJcbiAgICAgIHRoaXMuaXNOZXcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdFN0YXJ0ICYmXHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkR0RW5kXHJcbiAgICApIHtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQodGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRHRTdGFydCk7XHJcbiAgICAgIGNvbnN0IGVuZCA9IG1vbWVudCh0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdEVuZCk7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkR0U3RhcnQpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ2RheScpXHJcbiAgICAgICAgLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgICBjb25zdCB0aW1lRnJhbWUgPSB0aGlzLnRpbWVGcmFtZXMuZmluZChcclxuICAgICAgICAodGYpID0+XHJcbiAgICAgICAgICB0Zi5zdGFydC5oID09PSBzdGFydC5ob3VycygpICYmXHJcbiAgICAgICAgICB0Zi5lbmQuaCA9PT0gZW5kLmhvdXJzKCkgJiZcclxuICAgICAgICAgIHRmLnN0YXJ0Lm0gPT09IHN0YXJ0Lm1pbnV0ZXMoKSAmJlxyXG4gICAgICAgICAgdGYuZW5kLm0gPT09IGVuZC5taW51dGVzKClcclxuICAgICAgKTtcclxuICAgICAgaWYgKHRpbWVGcmFtZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lRnJhbWUgPSB0aW1lRnJhbWUuaWQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc3RhcnREYXRlID0gbW9tZW50KHRoaXMuZHRPYnNUaW1lKS5zdGFydE9mKCdkYXknKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE1heERhdGVGb3JOb3coKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHNldHRpbmcgbWF4IGRhdGUgdGhhdCB3aGVuIGNoYW5naW5nIGhvdXIsIHRoZSBtaW51dGVzIGlzIHN0aWxsIG1heCBtaW51dGVzLlxyXG4gICAgLy8gV29ya2Fyb3VuZCBpcyB0byBzZXQgbWludXRlcyB0byA1OS5cclxuICAgIHJldHVybiBtb21lbnQoKS5taW51dGVzKDU5KS50b0lTT1N0cmluZyh0cnVlKTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRXaGVuTm9BY3Rpdml0eUZpZWxkcygpIHtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkF2YWxhbmNoZUV4dFRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkF2YWxUcmlnZ2VyU2ltcGxlVElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRGVzdHJ1Y3RpdmVTaXplVElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuQXZhbFByb3BhZ2F0aW9uVElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodENvbWJvVElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodDEgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5FeHBvc2VkSGVpZ2h0MiA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LlZhbGlkRXhwb3NpdGlvbiA9IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgaWYgKHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkVzdGltYXRlZE51bVRJRCA9PT0gMSkge1xyXG4gICAgICB0aGlzLnJlc2V0V2hlbk5vQWN0aXZpdHlGaWVsZHMoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRpbWVGcmFtZSA9IHRoaXMudGltZUZyYW1lcy5maW5kKFxyXG4gICAgICAodGYpID0+IHRmLmlkID09PSB0aGlzLnNlbGVjdGVkVGltZUZyYW1lXHJcbiAgICApO1xyXG4gICAgaWYgKHRoaXMuc3RhcnREYXRlICYmIHRpbWVGcmFtZSkge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdFN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnREYXRlKVxyXG4gICAgICAgIC5ob3Vycyh0aW1lRnJhbWUuc3RhcnQuaClcclxuICAgICAgICAubWludXRlcyh0aW1lRnJhbWUuc3RhcnQubSlcclxuICAgICAgICAudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkR0RW5kID0gbW9tZW50KHRoaXMuc3RhcnREYXRlKVxyXG4gICAgICAgIC5ob3Vycyh0aW1lRnJhbWUuZW5kLmgpXHJcbiAgICAgICAgLm1pbnV0ZXModGltZUZyYW1lLmVuZC5tKVxyXG4gICAgICAgIC50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzTmV3ICYmIElzRW1wdHlIZWxwZXIuaXNFbXB0eSh0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weSkpIHtcclxuICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyhudWxsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5USVRMRScgfCB0cmFuc2xhdGV9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudCAqbmdJZj1cImF2YWxhbmNoZUFjdGl2aXR5Q29weVwiPlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuTk9fQVZBTEFOQ0hFX0FDVElWSVRZJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgWyhuZ01vZGVsKV09XCJub0F2YWxhbmNoZUFjdGl2aXR5XCI+PC9pb24tY2hlY2tib3g+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57e1xyXG4gICAgICAgICdEQVRFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWRhdGV0aW1lIGNvbG9yPVwibWVkaXVtXCIgbW9udGhTaG9ydE5hbWVzPVwie3sgJ01PTlRIUy5TSE9SVF9MSVNUJyB8IHRyYW5zbGF0ZSB9fVwiXHJcbiAgICAgICAgZG9uZVRleHQ9XCJ7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XCIgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCJcclxuICAgICAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWVwiIFttYXhdPVwibWF4RGF0ZVwiIFsobmdNb2RlbCldPVwic3RhcnREYXRlXCI+XHJcbiAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbSAqbmdJZj1cImRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lXCI+XHJcbiAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJkYW5nZXJcIiBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICB7eydBTEVSVC5XQVJOSU5HJyB8IHRyYW5zbGF0ZX19ISB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuREFURV9XQVJOSU5HJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkVTVElNQVRFRF9USU1FJ1xyXG4gICAgICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1zZWxlY3QgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRpbWVGcmFtZVwiXHJcbiAgICAgICAgaW50ZXJmYWNlPVwiYWN0aW9uLXNoZWV0XCI+XHJcbiAgICAgICAgPGlvbi1zZWxlY3Qtb3B0aW9uIFt2YWx1ZV09XCJ0aW1lRnJhbWUuaWRcIiAqbmdGb3I9XCJsZXQgdGltZUZyYW1lIG9mIHRpbWVGcmFtZXNcIj5cclxuICAgICAgICAgIHt7IHRpbWVGcmFtZS50ZXh0IHwgdHJhbnNsYXRlIH19PC9pb24tc2VsZWN0LW9wdGlvbj5cclxuICAgICAgPC9pb24tc2VsZWN0PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbm9BdmFsYW5jaGVBY3Rpdml0eVwiPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuSE9XX01BTllfQVZBTEFOQ0hFU1wiIGtkdktleT1cIlNub3dfRXN0aW1hdGVkTnVtS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXN0aW1hdGVkTnVtVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQVZBTEFOQ0hFX1RZUEVcIiBrZHZLZXk9XCJTbm93X0F2YWxhbmNoZUV4dEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkF2YWxhbmNoZUV4dFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuQVZBTEFOQ0hFX1RSSUdHRVJcIiBrZHZLZXk9XCJTbm93X0F2YWxUcmlnZ2VyU2ltcGxlS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuQXZhbFRyaWdnZXJTaW1wbGVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLkRFU1RSVUNUSVZFX1NJWkVcIiBrZHZLZXk9XCJTbm93X0Rlc3RydWN0aXZlU2l6ZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkRlc3RydWN0aXZlU2l6ZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlBST1BBR0FUSU9OXCIga2R2S2V5PVwiU25vd19BdmFsUHJvcGFnYXRpb25LRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImF2YWxhbmNoZUFjdGl2aXR5Q29weS5BdmFsUHJvcGFnYXRpb25USURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWV4cG9zZWQtaGVpZ2h0IFsoZXhwb3NlZEhlaWdodENvbWJvVElEKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodENvbWJvVElEXCJcclxuICAgICAgICBbKGV4cG9zZWRIaWdodDEpXT1cImF2YWxhbmNoZUFjdGl2aXR5Q29weS5FeHBvc2VkSGVpZ2h0MVwiXHJcbiAgICAgICAgWyhleHBvc2VkSGlnaHQyKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodDJcIj48L2FwcC1leHBvc2VkLWhlaWdodD5cclxuICAgICAgPGFwcC12YWxpZC1leHBvc2l0aW9uIFsodmFsaWRFeHBvc2l0aW9uKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuVmFsaWRFeHBvc2l0aW9uXCI+PC9hcHAtdmFsaWQtZXhwb3NpdGlvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5DT01NRU5UXCIgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkNvbW1lbnRcIj5cclxuICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCIgW3Nob3dEZWxldGVdPVwiIWlzTmV3XCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF2YWxhbmNoZUFjdGl2aXR5UGFnZSB9IGZyb20gJy4vYXZhbGFuY2hlLWFjdGl2aXR5LnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBBdmFsYW5jaGVBY3Rpdml0eVBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBdmFsYW5jaGVBY3Rpdml0eVBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVBY3Rpdml0eVBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2UgfSBmcm9tICcuL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7XHJcbiAgQXZhbGFuY2hlQWN0aXZpdHlPYnMyRWRpdE1vZGVsLFxyXG4gIEtkdkVsZW1lbnRcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IEtkdlNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2tkdi9rZHYuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXZhbGFuY2hlLWFjdGl2aXR5JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXZhbGFuY2hlLWFjdGl2aXR5LnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXZhbGFuY2hlLWFjdGl2aXR5LnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVBY3Rpdml0eVBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgcHJpdmF0ZSBhdmFsYW5jaGVDYXVzZTogS2R2RWxlbWVudFtdO1xyXG4gIHByaXZhdGUgZXN0aW1hdGVkTnVtYmVyOiBLZHZFbGVtZW50W107XHJcbiAgcHJpdmF0ZSBrZHZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBrZHZTZXJ2aWNlOiBLZHZTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgUmVnaXN0cmF0aW9uVGlkLkF2YWxhbmNoZUFjdGl2aXR5T2JzMixcclxuICAgICAgYmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgICBhY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKTtcclxuICAgIHRoaXMuYXZhbGFuY2hlQ2F1c2UgPSBbXTtcclxuICAgIHRoaXMuZXN0aW1hdGVkTnVtYmVyID0gW107XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLmtkdlNlcnZpY2UuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSgnU25vd19BdmFsYW5jaGVFeHRLRFYnKSxcclxuICAgICAgdGhpcy5rZHZTZXJ2aWNlLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoJ1Nub3dfRXN0aW1hdGVkTnVtS0RWJylcclxuICAgIF0pLnN1YnNjcmliZSgoW2NhdXNlS2R2LCBlc3RpbWF0ZWROdW1iZXJLZHZdKSA9PiB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQ2F1c2UgPSBjYXVzZUtkdjtcclxuICAgICAgdGhpcy5lc3RpbWF0ZWROdW1iZXIgPSBlc3RpbWF0ZWROdW1iZXJLZHY7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQmVmb3JlTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5rZHZTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5rZHZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdEF2YWxhbmNoZUFjdGl2aXR5KGluZGV4PzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgYXZhbGFuY2hlQWN0aXZpdHk6IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyW1xyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICBdLFxyXG4gICAgICAgIGR0T2JzVGltZTogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuZGF0YSkge1xyXG4gICAgICAgIGlmIChyZXN1bHQuZGF0YS5kZWxldGUpIHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IGF2YWxhbmNoZUFjdGl2aXR5T2JzOiBBdmFsYW5jaGVBY3Rpdml0eU9iczJFZGl0TW9kZWwgPSByZXN1bHQuZGF0YTtcclxuICAgICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyW1xyXG4gICAgICAgICAgICAgIGluZGV4XHJcbiAgICAgICAgICAgIF0gPSBhdmFsYW5jaGVBY3Rpdml0eU9icztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyLnB1c2goXHJcbiAgICAgICAgICAgICAgYXZhbGFuY2hlQWN0aXZpdHlPYnNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2F1c2UoYXZhbGFuY2hlQWN0aXZpdHlPYnM6IEF2YWxhbmNoZUFjdGl2aXR5T2JzMkVkaXRNb2RlbCkge1xyXG4gICAgY29uc3QgY2F1c2UgPSB0aGlzLmF2YWxhbmNoZUNhdXNlLmZpbmQoXHJcbiAgICAgIChjKSA9PiBjLklkID09PSBhdmFsYW5jaGVBY3Rpdml0eU9icy5BdmFsYW5jaGVFeHRUSURcclxuICAgICk7XHJcbiAgICBpZiAoY2F1c2UpIHtcclxuICAgICAgcmV0dXJuIGNhdXNlLk5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlVOS05PV05fVFlQRSc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRFc3RpbWF0ZWROdW1iZXIoYXZhbGFuY2hlQWN0aXZpdHlPYnM6IEF2YWxhbmNoZUFjdGl2aXR5T2JzMkVkaXRNb2RlbCkge1xyXG4gICAgY29uc3Qga2R2YWx1ZSA9IHRoaXMuZXN0aW1hdGVkTnVtYmVyLmZpbmQoXHJcbiAgICAgIChjKSA9PiBjLklkID09PSBhdmFsYW5jaGVBY3Rpdml0eU9icy5Fc3RpbWF0ZWROdW1USURcclxuICAgICk7XHJcbiAgICBpZiAoa2R2YWx1ZSkge1xyXG4gICAgICByZXR1cm4ga2R2YWx1ZS5OYW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuVU5LTk9XTl9OVU1CRVInO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczJcIlxyXG4gICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24taXRlbSBkZXRhaWw9XCJ0cnVlXCIgKGNsaWNrKT1cImFkZE9yRWRpdEF2YWxhbmNoZUFjdGl2aXR5KGkpXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgYXZhbGFuY2hlQWN0aXZpdHkgb2YgcmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eyBnZXRFc3RpbWF0ZWROdW1iZXIoYXZhbGFuY2hlQWN0aXZpdHkpIHxcclxuICAgICAgICAgIHRyYW5zbGF0ZSB9fTxzcGFuICpuZ0lmPVwiYXZhbGFuY2hlQWN0aXZpdHkuRXN0aW1hdGVkTnVtVElEICE9PSAxXCI+IHt7IGdldENhdXNlKGF2YWxhbmNoZUFjdGl2aXR5KSB8IHRyYW5zbGF0ZVxyXG4gICAgICAgICAgICB8XHJcbiAgICAgICAgICAgIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICB9fTwvc3Bhbj48L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXRBdmFsYW5jaGVBY3Rpdml0eSgpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkFERF9ORVcnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+PC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==