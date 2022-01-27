"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_danger-obs_danger-obs_module_ts"],{

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

/***/ 66348:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/danger-obs/add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.module.ts ***!
  \***************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddOrEditDangerObsModalPageModule": function() { return /* binding */ AddOrEditDangerObsModalPageModule; }
/* harmony export */ });
/* harmony import */ var _add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-or-edit-danger-obs-modal.page */ 46373);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class AddOrEditDangerObsModalPageModule {
}
AddOrEditDangerObsModalPageModule.ɵfac = function AddOrEditDangerObsModalPageModule_Factory(t) { return new (t || AddOrEditDangerObsModalPageModule)(); };
AddOrEditDangerObsModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AddOrEditDangerObsModalPageModule });
AddOrEditDangerObsModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AddOrEditDangerObsModalPageModule, { declarations: [_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_0__.AddOrEditDangerObsModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 46373:
/*!*************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/danger-obs/add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page.ts ***!
  \*************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddOrEditDangerObsModalPage": function() { return /* binding */ AddOrEditDangerObsModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/kdv-select/kdv-select.component */ 22241);















function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-checkbox", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template_ion_checkbox_ionChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r3.checkBoxChanged(); })("ngModelChange", function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template_ion_checkbox_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r5.noDangerObs = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.noDangerObs);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 2, "REGISTRATION.DANGER_OBS.NO_DAMAGE_SIGN"));
} }
function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-kdv-select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template_app_kdv_select_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r6.dropdownChanged($event); })("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template_app_kdv_select_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r8.dangerSignTid = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("kdvKey", "", ctx_r2.GeoHazardName, "_DangerSignKDV");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r2.dangerSignTid);
} }
function AddOrEditDangerObsModalPage_ion_content_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-list", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template, 5, 4, "ion-item", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template, 1, 2, "app-kdv-select", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "app-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectedValueChange", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_select_selectedValueChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.tmpArea = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "app-text-comment", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_text_comment_valueChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r11.comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "app-modal-save-or-delete-buttons", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("saveClicked", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r12.ok(); })("deleteClicked", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r13.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 8, "REGISTRATION.DANGER_OBS.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.showDangerSignCheckbox);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.showDangerSignSelect);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 10, "REGISTRATION.DANGER_OBS.AREA"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("selectedValue", ctx_r0.tmpArea)("options", ctx_r0.areaArr);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("showDelete", ctx_r0.dangerObs);
} }
const COMMENT_SEPARATOR = ': ';
class AddOrEditDangerObsModalPage {
    constructor(modalController, translateService, ngZone) {
        this.modalController = modalController;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.noDangerObs = false;
        this.tmpArea = '';
        this.loaded = false;
        this.showDangerSignSelect = true;
        this.showDangerSignCheckbox = false;
        this.interfaceOptions = {};
    }
    get GeoHazardName() {
        return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard[this.geoHazard];
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.showDangerSignCheckbox = this.geoHazard != _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice;
            const tranlations = yield this.translateService
                .get(this.getAreaArray())
                .toPromise();
            this.commentTranslations = yield this.translateService
                .get([
                'REGISTRATION.DANGER_OBS.AREA',
                'REGISTRATION.DANGER_OBS.DESCRIPTION'
            ])
                .toPromise();
            this.areaArr = this.getAreaArray()
                .map((item) => tranlations[item])
                .map((item) => ({ id: item, text: item }));
            if (this.dangerObs) {
                if (this.dangerObs.Comment) {
                    const option = this.areaArr.find((x) => this.dangerObs.Comment.indexOf(x.id) >= 0);
                    this.tmpArea = option ? option.id : '';
                    if (this.tmpArea) {
                        this.comment = this.dangerObs.Comment.substr(this.dangerObs.Comment.indexOf(this.tmpArea) + this.tmpArea.length);
                        const textToFind = `${this.commentTranslations['REGISTRATION.DANGER_OBS.DESCRIPTION']}` +
                            `${COMMENT_SEPARATOR}`;
                        const additionalCommentIndex = this.dangerObs.Comment.indexOf(textToFind);
                        if (additionalCommentIndex >= 0) {
                            this.comment = this.dangerObs.Comment.substr(additionalCommentIndex + textToFind.length);
                        }
                    }
                    else {
                        this.comment = this.dangerObs.Comment;
                    }
                }
                if (this.dangerObs.DangerSignTID === this.getNoDangerSignTid()) {
                    this.noDangerObs = true;
                }
                this.dangerSignTid = this.dangerObs.DangerSignTID;
                this.updateDangerSignSelectVisibilty();
            }
            this.loaded = true;
        });
    }
    updateDangerSignSelectVisibilty() {
        if (this.geoHazard === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice) {
            this.showDangerSignSelect = true;
        }
        else {
            this.showDangerSignSelect = !this.noDangerObs;
        }
    }
    toggleDangerObs() {
        this.noDangerObs = !this.noDangerObs;
        if (this.noDangerObs) {
            this.dangerSignTid = this.getDangerSignTidOrFallback();
        }
        this.updateDangerSignSelectVisibilty();
    }
    checkBoxChanged() {
        this.updateDangerSignSelectVisibilty();
    }
    dropdownChanged(val) {
        if (val === this.getNoDangerSignTid()) {
            this.noDangerObs = true;
            this.updateDangerSignSelectVisibilty();
        }
        else {
            this.noDangerObs = false;
        }
    }
    cancel() {
        this.modalController.dismiss();
    }
    getNoDangerSignTid() {
        return (this.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow ? this.geoHazard * 10 : 0) + 1;
    }
    getDangerSignTidOrFallback() {
        return this.dangerSignTid !== undefined
            ? this.dangerSignTid
            : this.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow
                ? this.geoHazard * 10
                : 0;
    }
    ok() {
        const dangerObsToSave = {
            GeoHazardTID: this.geoHazard,
            DangerSignTID: this.noDangerObs
                ? this.getNoDangerSignTid()
                : this.getDangerSignTidOrFallback(),
            Comment: this.getComment()
        };
        this.modalController.dismiss(dangerObsToSave);
    }
    getComment() {
        if (this.tmpArea &&
            this.tmpArea.length > 0 &&
            this.comment &&
            this.comment.length > 0) {
            return (`${this.commentTranslations['REGISTRATION.DANGER_OBS.AREA']}` +
                `${COMMENT_SEPARATOR}${this.tmpArea}. ` +
                `${this.commentTranslations['REGISTRATION.DANGER_OBS.DESCRIPTION']}` +
                `${COMMENT_SEPARATOR}${this.comment || ''}`);
        }
        if (this.tmpArea && this.tmpArea.length > 0) {
            return (`${this.commentTranslations['REGISTRATION.DANGER_OBS.AREA']}` +
                `${COMMENT_SEPARATOR}${this.tmpArea}`);
        }
        return this.comment;
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
    getAreaArray() {
        switch (this.geoHazard) {
            case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice: {
                return [
                    'REGISTRATION.DANGER_OBS.RIGHT_HERE',
                    'REGISTRATION.DANGER_OBS.ON_THIS_SIDE_OF_THE_WATER',
                    'REGISTRATION.DANGER_OBS.ON_THIS_WATER',
                    'REGISTRATION.DANGER_OBS.MANY_WATER_NEARBY'
                ];
            }
            default:
                return [
                    'REGISTRATION.DANGER_OBS.ON_THIS_PLACE',
                    'REGISTRATION.DANGER_OBS.ON_THIS_MOUNTAIN_SIDE',
                    'REGISTRATION.DANGER_OBS.GENERAL_ON_MOUNTAIN',
                    'REGISTRATION.DANGER_OBS.IN_THE_VALLEY_OR_FJORD',
                    'REGISTRATION.DANGER_OBS.FOR_MUNICIPAL',
                    'REGISTRATION.DANGER_OBS.FOR_REGION'
                ];
        }
    }
}
AddOrEditDangerObsModalPage.ɵfac = function AddOrEditDangerObsModalPage_Factory(t) { return new (t || AddOrEditDangerObsModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone)); };
AddOrEditDangerObsModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AddOrEditDangerObsModalPage, selectors: [["app-add-or-edit-danger-obs-modal"]], inputs: { dangerObs: "dangerObs", geoHazard: "geoHazard" }, decls: 10, vars: 7, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.DANGER_OBS.TITLE", 3, "kdvKey", "value", "valueChange", 4, "ngIf"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.DANGER_OBS.AREA", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", "rows", "2", "placeholder", "REGISTRATION.DANGER_OBS.COMMENT_PLACEHOLDER", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["color", "varsom-dark-blue", "mode", "md", "slot", "start", 3, "ngModel", "ionChange", "ngModelChange"], ["title", "REGISTRATION.DANGER_OBS.TITLE", 3, "kdvKey", "value", "valueChange"]], template: function AddOrEditDangerObsModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddOrEditDangerObsModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AddOrEditDangerObsModalPage_ion_content_9_Template, 15, 12, "ion-content", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 5, "REGISTRATION.DANGER_OBS.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loaded);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__.ModalSaveOrDeleteButtonsComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_4__.KdvSelectComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 58609:
/*!****************************************************************************!*\
  !*** ./src/app/modules/registration/pages/danger-obs/danger-obs.module.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DangerObsPageModule": function() { return /* binding */ DangerObsPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _danger_obs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./danger-obs.page */ 2723);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.module */ 66348);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _danger_obs_page__WEBPACK_IMPORTED_MODULE_0__.DangerObsPage
    }
];
class DangerObsPageModule {
}
DangerObsPageModule.ɵfac = function DangerObsPageModule_Factory(t) { return new (t || DangerObsPageModule)(); };
DangerObsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: DangerObsPageModule });
DangerObsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](DangerObsPageModule, { declarations: [_danger_obs_page__WEBPACK_IMPORTED_MODULE_0__.DangerObsPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 2723:
/*!**************************************************************************!*\
  !*** ./src/app/modules/registration/pages/danger-obs/danger-obs.page.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DangerObsPage": function() { return /* binding */ DangerObsPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.page */ 81877);
/* harmony import */ var _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page */ 46373);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../base-page-service */ 35140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);




















function DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const i_r3 = restoredCtx.index; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r4.addOrEdit(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const dangerObs_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.getSummaryText(dangerObs_r2));
} }
function DangerObsPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function DangerObsPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r6.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template, 3, 1, "ion-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DangerObsPage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r8.addOrEdit(); });
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
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 9, "REGISTRATION.DANGER_OBS.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.DangerObs);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](11, 11, "REGISTRATION.DANGER_OBS.NEW_DANGER_OBS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 13, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registrationTid", ctx_r0.registrationTid)("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id);
} }
class DangerObsPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute, modalController, zone, kdvService) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.DangerObs, basePageService, activatedRoute);
        this.modalController = modalController;
        this.zone = zone;
        this.kdvService = kdvService;
    }
    onBeforeLeave() {
        if (this.dangerSignKdvSubscription) {
            this.dangerSignKdvSubscription.unsubscribe();
        }
    }
    onInit() {
        const kdvKey = `${_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.GeoHazard[this.registration.geoHazard]}_DangerSignKDV`;
        this.dangerSignKdvSubscription = this.kdvService
            .getKdvRepositoryByKeyObservable(kdvKey)
            .subscribe((val) => {
            this.zone.run(() => {
                this.dangerSignKdv = val;
            });
        });
    }
    addOrEdit(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const dangerObs = index !== undefined
                ? this.registration.request.DangerObs[index]
                : undefined;
            const modal = yield this.modalController.create({
                component: _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPage,
                componentProps: { dangerObs, geoHazard: this.registration.geoHazard }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            if (result.data) {
                if (result.data.delete) {
                    this.removeAtIndex(index);
                }
                else {
                    if (index !== undefined) {
                        this.setDangerObs(index, result.data);
                    }
                    else {
                        this.addDangerObs(result.data);
                    }
                }
            }
        });
    }
    setDangerObs(index, dangerObs) {
        this.zone.run(() => {
            if (!this.registration.request.DangerObs) {
                this.registration.request.DangerObs = [];
            }
            this.registration.request.DangerObs[index] = dangerObs;
        });
    }
    addDangerObs(dangerObs) {
        this.zone.run(() => {
            if (!this.registration.request.DangerObs) {
                this.registration.request.DangerObs = [];
            }
            this.registration.request.DangerObs.push(dangerObs);
        });
    }
    removeAtIndex(index) {
        this.zone.run(() => {
            if (!this.registration.request.DangerObs) {
                this.registration.request.DangerObs = [];
            }
            if (this.registration.request.DangerObs.length > 0) {
                this.registration.request.DangerObs.splice(index, 1);
            }
        });
    }
    getSummaryText(dangerObs) {
        const text = [];
        if (dangerObs.DangerSignTID % 100 !== 0 && this.dangerSignKdv) {
            const kdvElement = this.dangerSignKdv.find((x) => x.Id === dangerObs.DangerSignTID);
            if (kdvElement) {
                text.push(kdvElement.Name.trim());
            }
        }
        if (dangerObs.Comment) {
            text.push(dangerObs.Comment);
        }
        return text.join(', ');
    }
}
DangerObsPage.ɵfac = function DangerObsPage_Factory(t) { return new (t || DangerObsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_4__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_3__.KdvService)); };
DangerObsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: DangerObsPage, selectors: [["app-danger-obs"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["defaultHref", "/", "text", ""], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "dark", "name", "add-circle-outline", "slot", "start"], [3, "registrationTid", "geoHazard", "registrationId"]], template: function DangerObsPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, DangerObsPage_app_registration_content_wrapper_8_Template, 17, 15, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.DANGER_OBS.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkYW5nZXItb2JzLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19kYW5nZXItb2JzX2Rhbmdlci1vYnNfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFFcUQ7QUFDMkM7QUFDNUU7QUFDdEI7QUFDTTtBQUNaO0FBQ1g7QUFDK0M7Ozs7Ozs7QUFFL0UsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFJN0IsTUFBTSxlQUFlO0lBcUIxQixZQUNVLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMseUJBQW9ELEVBQ3BELE1BQWMsRUFDZCxlQUFnQyxFQUNoQyxnQkFBa0MsRUFDbEMsY0FBOEI7UUFOOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUNyQyxDQUFDO0lBNUJKLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSSxtQkFBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQUksZ0JBQWdCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLHlCQUF5QjtRQUMzQixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDO0lBWUssWUFBWSxDQUFDLFlBQTJCLEVBQUUsZUFBZ0MsRUFBRSxPQUFvQjs7WUFDcEcs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LENBQUMsQ0FBQztJQUN6QixDQUFDOzswRUFsR1UsYUFBYTsyR0FBYixhQUFhO1FDakIxQiw2RUFBWTtRQUNWLGlGQUF1QztRQUNyQyxpRkFBMEI7UUFDeEIsZ0ZBQTJEO1FBQzdELDREQUFjO1FBQ2QsNEVBQVc7UUFDVCx1REFDRjs7UUFBQSw0REFBWTtRQUNkLDREQUFjO1FBQ2hCLDREQUFhO1FBQ2IsOEVBQWE7UUFDWCxxS0F1Qm1DO1FBQ3JDLDREQUFjOztRQTdCUiwwREFDRjtRQURFLDRLQUNGO1FBSWlDLDBEQUFrQjtRQUFsQixrRkFBa0IiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Rhbmdlci1vYnMvYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Rhbmdlci1vYnMvZGFuZ2VyLW9icy5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9kYW5nZXItb2JzLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9kYW5nZXItb2JzLnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFkZE9yRWRpdERhbmdlck9ic01vZGFsUGFnZSB9IGZyb20gJy4vYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0FkZE9yRWRpdERhbmdlck9ic01vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZE9yRWRpdERhbmdlck9ic01vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYW5nZXJPYnNFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbmNvbnN0IENPTU1FTlRfU0VQQVJBVE9SID0gJzogJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbmdlck9iczogRGFuZ2VyT2JzRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIG5vRGFuZ2VyT2JzID0gZmFsc2U7XHJcbiAgYXJlYUFycjogU2VsZWN0T3B0aW9uW107XHJcbiAgdG1wQXJlYSA9ICcnO1xyXG4gIGRhbmdlclNpZ25UaWQ6IG51bWJlcjtcclxuICBjb21tZW50OiBzdHJpbmc7XHJcbiAgbG9hZGVkID0gZmFsc2U7XHJcbiAgY29tbWVudFRyYW5zbGF0aW9uczogc3RyaW5nW107XHJcbiAgc2hvd0RhbmdlclNpZ25TZWxlY3QgPSB0cnVlO1xyXG4gIHNob3dEYW5nZXJTaWduQ2hlY2tib3ggPSBmYWxzZTtcclxuXHJcbiAgaW50ZXJmYWNlT3B0aW9ucyA9IHt9O1xyXG5cclxuICBnZXQgR2VvSGF6YXJkTmFtZSgpIHtcclxuICAgIHJldHVybiBHZW9IYXphcmRbdGhpcy5nZW9IYXphcmRdO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNob3dEYW5nZXJTaWduQ2hlY2tib3ggPSB0aGlzLmdlb0hhemFyZCAhPSBHZW9IYXphcmQuSWNlO1xyXG5cclxuICAgIGNvbnN0IHRyYW5sYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQodGhpcy5nZXRBcmVhQXJyYXkoKSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgdGhpcy5jb21tZW50VHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5BUkVBJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuREVTQ1JJUFRJT04nXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMuYXJlYUFyciA9IHRoaXMuZ2V0QXJlYUFycmF5KClcclxuICAgICAgLm1hcCgoaXRlbSkgPT4gdHJhbmxhdGlvbnNbaXRlbV0gYXMgc3RyaW5nKVxyXG4gICAgICAubWFwKChpdGVtKSA9PiAoeyBpZDogaXRlbSwgdGV4dDogaXRlbSB9KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGFuZ2VyT2JzKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhbmdlck9icy5Db21tZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5hcmVhQXJyLmZpbmQoXHJcbiAgICAgICAgICAoeCkgPT4gdGhpcy5kYW5nZXJPYnMuQ29tbWVudC5pbmRleE9mKHguaWQpID49IDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMudG1wQXJlYSA9IG9wdGlvbiA/IG9wdGlvbi5pZCA6ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLnRtcEFyZWEpIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQuc3Vic3RyKFxyXG4gICAgICAgICAgICB0aGlzLmRhbmdlck9icy5Db21tZW50LmluZGV4T2YodGhpcy50bXBBcmVhKSArIHRoaXMudG1wQXJlYS5sZW5ndGhcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0VG9GaW5kID1cclxuICAgICAgICAgICAgYCR7dGhpcy5jb21tZW50VHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5ERVNDUklQVElPTiddfWAgK1xyXG4gICAgICAgICAgICBgJHtDT01NRU5UX1NFUEFSQVRPUn1gO1xyXG4gICAgICAgICAgY29uc3QgYWRkaXRpb25hbENvbW1lbnRJbmRleCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQuaW5kZXhPZihcclxuICAgICAgICAgICAgdGV4dFRvRmluZFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChhZGRpdGlvbmFsQ29tbWVudEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdGhpcy5kYW5nZXJPYnMuQ29tbWVudC5zdWJzdHIoXHJcbiAgICAgICAgICAgICAgYWRkaXRpb25hbENvbW1lbnRJbmRleCArIHRleHRUb0ZpbmQubGVuZ3RoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmRhbmdlck9icy5EYW5nZXJTaWduVElEID09PSB0aGlzLmdldE5vRGFuZ2VyU2lnblRpZCgpKSB7XHJcbiAgICAgICAgdGhpcy5ub0Rhbmdlck9icyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kYW5nZXJTaWduVGlkID0gdGhpcy5kYW5nZXJPYnMuRGFuZ2VyU2lnblRJRDtcclxuICAgICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCkge1xyXG4gICAgaWYgKHRoaXMuZ2VvSGF6YXJkID09PSBHZW9IYXphcmQuSWNlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RhbmdlclNpZ25TZWxlY3QgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RGFuZ2VyU2lnblNlbGVjdCA9ICF0aGlzLm5vRGFuZ2VyT2JzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRGFuZ2VyT2JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ub0Rhbmdlck9icyA9ICF0aGlzLm5vRGFuZ2VyT2JzO1xyXG4gICAgaWYgKHRoaXMubm9EYW5nZXJPYnMpIHtcclxuICAgICAgdGhpcy5kYW5nZXJTaWduVGlkID0gdGhpcy5nZXREYW5nZXJTaWduVGlkT3JGYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0JveENoYW5nZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZURhbmdlclNpZ25TZWxlY3RWaXNpYmlsdHkoKTtcclxuICB9XHJcblxyXG4gIGRyb3Bkb3duQ2hhbmdlZCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA9PT0gdGhpcy5nZXROb0RhbmdlclNpZ25UaWQoKSkge1xyXG4gICAgICB0aGlzLm5vRGFuZ2VyT2JzID0gdHJ1ZTtcclxuICAgICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vRGFuZ2VyT2JzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBnZXROb0RhbmdlclNpZ25UaWQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuU25vdyA/IHRoaXMuZ2VvSGF6YXJkICogMTAgOiAwKSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXREYW5nZXJTaWduVGlkT3JGYWxsYmFjaygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhbmdlclNpZ25UaWQgIT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHRoaXMuZGFuZ2VyU2lnblRpZFxyXG4gICAgICA6IHRoaXMuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuU25vd1xyXG4gICAgICAgID8gdGhpcy5nZW9IYXphcmQgKiAxMFxyXG4gICAgICAgIDogMDtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgY29uc3QgZGFuZ2VyT2JzVG9TYXZlOiBEYW5nZXJPYnNFZGl0TW9kZWwgPSB7XHJcbiAgICAgIEdlb0hhemFyZFRJRDogdGhpcy5nZW9IYXphcmQsXHJcbiAgICAgIERhbmdlclNpZ25USUQ6IHRoaXMubm9EYW5nZXJPYnNcclxuICAgICAgICA/IHRoaXMuZ2V0Tm9EYW5nZXJTaWduVGlkKClcclxuICAgICAgICA6IHRoaXMuZ2V0RGFuZ2VyU2lnblRpZE9yRmFsbGJhY2soKSxcclxuICAgICAgQ29tbWVudDogdGhpcy5nZXRDb21tZW50KClcclxuICAgIH07XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGRhbmdlck9ic1RvU2F2ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENvbW1lbnQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudG1wQXJlYSAmJlxyXG4gICAgICB0aGlzLnRtcEFyZWEubGVuZ3RoID4gMCAmJlxyXG4gICAgICB0aGlzLmNvbW1lbnQgJiZcclxuICAgICAgdGhpcy5jb21tZW50Lmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGAke3RoaXMuY29tbWVudFRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuQVJFQSddfWAgK1xyXG4gICAgICAgIGAke0NPTU1FTlRfU0VQQVJBVE9SfSR7dGhpcy50bXBBcmVhfS4gYCArXHJcbiAgICAgICAgYCR7dGhpcy5jb21tZW50VHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5ERVNDUklQVElPTiddfWAgK1xyXG4gICAgICAgIGAke0NPTU1FTlRfU0VQQVJBVE9SfSR7dGhpcy5jb21tZW50IHx8ICcnfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRtcEFyZWEgJiYgdGhpcy50bXBBcmVhLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBgJHt0aGlzLmNvbW1lbnRUcmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkFSRUEnXX1gICtcclxuICAgICAgICBgJHtDT01NRU5UX1NFUEFSQVRPUn0ke3RoaXMudG1wQXJlYX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29tbWVudDtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoeyBkZWxldGU6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBcmVhQXJyYXkoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZ2VvSGF6YXJkKSB7XHJcbiAgICBjYXNlIEdlb0hhemFyZC5JY2U6IHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuUklHSFRfSEVSRScsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLk9OX1RISVNfU0lERV9PRl9USEVfV0FURVInLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5PTl9USElTX1dBVEVSJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuTUFOWV9XQVRFUl9ORUFSQlknXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5PTl9USElTX1BMQUNFJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuT05fVEhJU19NT1VOVEFJTl9TSURFJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuR0VORVJBTF9PTl9NT1VOVEFJTicsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLklOX1RIRV9WQUxMRVlfT1JfRkpPUkQnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5GT1JfTVVOSUNJUEFMJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuRk9SX1JFR0lPTidcclxuICAgICAgXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQgKm5nSWY9XCJsb2FkZWRcIj5cclxuICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICA8aW9uLWl0ZW0gKm5nSWY9XCJzaG93RGFuZ2VyU2lnbkNoZWNrYm94XCI+XHJcbiAgICAgIDxpb24tY2hlY2tib3ggKGlvbkNoYW5nZSk9XCJjaGVja0JveENoYW5nZWQoKVwiIGNvbG9yPVwidmFyc29tLWRhcmstYmx1ZVwiIG1vZGU9XCJtZFwiIHNsb3Q9XCJzdGFydFwiIFsobmdNb2RlbCldPVwibm9EYW5nZXJPYnNcIj48L2lvbi1jaGVja2JveD5cclxuICAgICAgPGlvbi1sYWJlbD57eyAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuTk9fREFNQUdFX1NJR04nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8YXBwLWtkdi1zZWxlY3QgKHZhbHVlQ2hhbmdlKT1cImRyb3Bkb3duQ2hhbmdlZCgkZXZlbnQpXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRVwiICpuZ0lmPVwic2hvd0RhbmdlclNpZ25TZWxlY3RcIlxyXG4gICAgICBrZHZLZXk9XCJ7eyBHZW9IYXphcmROYW1lIH19X0RhbmdlclNpZ25LRFZcIiBbKHZhbHVlKV09XCJkYW5nZXJTaWduVGlkXCI+XHJcbiAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5BUkVBJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8YXBwLXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkFSRUFcIiBbKHNlbGVjdGVkVmFsdWUpXT1cInRtcEFyZWFcIiBbb3B0aW9uc109XCJhcmVhQXJyXCI+PC9hcHAtc2VsZWN0PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cImNvbW1lbnRcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIiByb3dzPVwiMlwiXHJcbiAgICAgIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuQ09NTUVOVF9QTEFDRUhPTERFUlwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCIgW3Nob3dEZWxldGVdPVwiZGFuZ2VyT2JzXCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERhbmdlck9ic1BhZ2UgfSBmcm9tICcuL2Rhbmdlci1vYnMucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwvYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IERhbmdlck9ic1BhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbRGFuZ2VyT2JzUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhbmdlck9ic1BhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2UgfSBmcm9tICcuL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwvYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgRGFuZ2VyT2JzRWRpdE1vZGVsLCBLZHZFbGVtZW50IH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhbmdlci1vYnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kYW5nZXItb2JzLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGFuZ2VyLW9icy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFuZ2VyT2JzUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBwcml2YXRlIGRhbmdlclNpZ25LZHY6IEtkdkVsZW1lbnRbXTtcclxuICBwcml2YXRlIGRhbmdlclNpZ25LZHZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkRhbmdlck9icywgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkJlZm9yZUxlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMuZGFuZ2VyU2lnbktkdlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmRhbmdlclNpZ25LZHZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIGNvbnN0IGtkdktleSA9IGAke0dlb0hhemFyZFt0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRdfV9EYW5nZXJTaWduS0RWYDtcclxuICAgIHRoaXMuZGFuZ2VyU2lnbktkdlN1YnNjcmlwdGlvbiA9IHRoaXMua2R2U2VydmljZVxyXG4gICAgICAuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZShrZHZLZXkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5kYW5nZXJTaWduS2R2ID0gdmFsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdChpbmRleD86IG51bWJlcikge1xyXG4gICAgY29uc3QgZGFuZ2VyT2JzID1cclxuICAgICAgaW5kZXggIT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnNbaW5kZXhdXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogQWRkT3JFZGl0RGFuZ2VyT2JzTW9kYWxQYWdlLFxyXG4gICAgICBjb21wb25lbnRQcm9wczogeyBkYW5nZXJPYnMsIGdlb0hhemFyZDogdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQXRJbmRleChpbmRleCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGFuZ2VyT2JzKGluZGV4LCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkRGFuZ2VyT2JzKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldERhbmdlck9icyhpbmRleDogbnVtYmVyLCBkYW5nZXJPYnM6IERhbmdlck9ic0VkaXRNb2RlbCkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9icyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzW2luZGV4XSA9IGRhbmdlck9icztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkRGFuZ2VyT2JzKGRhbmdlck9iczogRGFuZ2VyT2JzRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9icykge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMucHVzaChkYW5nZXJPYnMpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVBdEluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3VtbWFyeVRleHQoZGFuZ2VyT2JzOiBEYW5nZXJPYnNFZGl0TW9kZWwpIHtcclxuICAgIGNvbnN0IHRleHQgPSBbXTtcclxuICAgIGlmIChkYW5nZXJPYnMuRGFuZ2VyU2lnblRJRCAlIDEwMCAhPT0gMCAmJiB0aGlzLmRhbmdlclNpZ25LZHYpIHtcclxuICAgICAgY29uc3Qga2R2RWxlbWVudCA9IHRoaXMuZGFuZ2VyU2lnbktkdi5maW5kKFxyXG4gICAgICAgICh4KSA9PiB4LklkID09PSBkYW5nZXJPYnMuRGFuZ2VyU2lnblRJRFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoa2R2RWxlbWVudCkge1xyXG4gICAgICAgIHRleHQucHVzaChrZHZFbGVtZW50Lk5hbWUudHJpbSgpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGRhbmdlck9icy5Db21tZW50KSB7XHJcbiAgICAgIHRleHQucHVzaChkYW5nZXJPYnMuQ29tbWVudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dC5qb2luKCcsICcpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIGRlZmF1bHRIcmVmPVwiL1wiIHRleHQ9XCJcIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIlxyXG4gICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXQoaSlcIiAqbmdGb3I9XCJsZXQgZGFuZ2VyT2JzIG9mIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9iczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3sgZ2V0U3VtbWFyeVRleHQoZGFuZ2VyT2JzKSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cImFkZE9yRWRpdCgpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwiZGFya1wiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3sgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLk5FV19EQU5HRVJfT0JTJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX0lNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCI+PC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==