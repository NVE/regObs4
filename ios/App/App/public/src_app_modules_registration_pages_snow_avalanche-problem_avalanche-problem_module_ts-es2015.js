"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_avalanche-problem_avalanche-problem_module_ts"],{

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

/***/ 79017:
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-problem/avalanche-problem-modal/avalanche-problem-modal.module.ts ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheProblemModalPageModule": function() { return /* binding */ AvalancheProblemModalPageModule; }
/* harmony export */ });
/* harmony import */ var _avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avalanche-problem-modal.page */ 95218);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class AvalancheProblemModalPageModule {
}
AvalancheProblemModalPageModule.ɵfac = function AvalancheProblemModalPageModule_Factory(t) { return new (t || AvalancheProblemModalPageModule)(); };
AvalancheProblemModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AvalancheProblemModalPageModule });
AvalancheProblemModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AvalancheProblemModalPageModule, { declarations: [_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 95218:
/*!***************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-problem/avalanche-problem-modal/avalanche-problem-modal.page.ts ***!
  \***************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheProblemModalPage": function() { return /* binding */ AvalancheProblemModalPage; }
/* harmony export */ });
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../components/snow/exposed-height/exposed-height.component */ 55935);
/* harmony import */ var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../components/snow/valid-exposition/valid-exposition.component */ 70133);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */ 14984);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















function AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-checkbox", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template_ion_checkbox_ngModelChange_3_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const avalancheCauseAttribute_r3 = restoredCtx.$implicit; return avalancheCauseAttribute_r3.selected = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const avalancheCauseAttribute_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", avalancheCauseAttribute_r3.kdvElement.Name, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", avalancheCauseAttribute_r3.selected);
} }
function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template_app_kdv_select_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r6.avalancheEvalProblemCopy.AvalCauseTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template_app_kdv_select_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r8.avalancheEvalProblemCopy.AvalCauseDepthTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template, 4, 2, "ion-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r1.avalancheEvalProblemCopy.AvalCauseTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r1.avalancheEvalProblemCopy.AvalCauseDepthTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.avalancheCauseAttributes);
} }
function AvalancheProblemModalPage_ion_content_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-checkbox", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheProblemModalPage_ion_content_9_Template_ion_checkbox_ngModelChange_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r9.noWeakLayers = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, AvalancheProblemModalPage_ion_content_9_ng_container_11_Template, 4, 3, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "app-kdv-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r11.avalancheEvalProblemCopy.AvalancheExtTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "app-kdv-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_17_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r12.avalancheEvalProblemCopy.AvalTriggerSimpleTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "app-kdv-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r13.avalancheEvalProblemCopy.DestructiveSizeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "app-kdv-select", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_23_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r14.avalancheEvalProblemCopy.AvalPropagationTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-exposed-height", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("exposedHeightComboTIDChange", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHeightComboTIDChange_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r15.avalancheEvalProblemCopy.ExposedHeightComboTID = $event; })("exposedHight1Change", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHight1Change_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r16.avalancheEvalProblemCopy.ExposedHeight1 = $event; })("exposedHight2Change", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHight2Change_24_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r17.avalancheEvalProblemCopy.ExposedHeight2 = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "app-valid-exposition", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("validExpositionChange", function AvalancheProblemModalPage_ion_content_9_Template_app_valid_exposition_validExpositionChange_25_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r18.avalancheEvalProblemCopy.ValidExposition = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "app-text-comment", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_text_comment_valueChange_26_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r19.avalancheEvalProblemCopy.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "app-modal-save-or-delete-buttons", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("saveClicked", function AvalancheProblemModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_27_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r20.ok(); })("deleteClicked", function AvalancheProblemModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_27_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r21.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 17, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](9, 19, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.NO_WEAK_LAYERS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.noWeakLayers);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.noWeakLayers);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 21, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_PROBABILITY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalancheExtTID)("filter", ctx_r0.avalancheExtKdvFilter);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalTriggerSimpleTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.DestructiveSizeTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 23, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalPropagationTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("exposedHeightComboTID", ctx_r0.avalancheEvalProblemCopy.ExposedHeightComboTID)("exposedHight1", ctx_r0.avalancheEvalProblemCopy.ExposedHeight1)("exposedHight2", ctx_r0.avalancheEvalProblemCopy.ExposedHeight2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("validExposition", ctx_r0.avalancheEvalProblemCopy.ValidExposition);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showDelete", !ctx_r0.isNew);
} }
const NO_WEAK_LAYER_KDV_VALUE = 24;
class AvalancheProblemModalPage {
    constructor(modalController, kdvService) {
        this.modalController = modalController;
        this.kdvService = kdvService;
        this.isNew = false;
    }
    get noWeakLayers() {
        return (this.avalancheEvalProblemCopy.AvalCauseTID === NO_WEAK_LAYER_KDV_VALUE);
    }
    set noWeakLayers(val) {
        this.avalancheEvalProblemCopy.AvalCauseTID = val
            ? NO_WEAK_LAYER_KDV_VALUE
            : undefined;
    }
    ngOnInit() {
        this.avalancheExtKdvFilter = this.internalAvalancheExtKdvFilter.bind(this);
        if (this.avalancheEvalProblem) {
            this.avalancheEvalProblemCopy = Object.assign({}, this.avalancheEvalProblem);
        }
        else {
            this.avalancheEvalProblemCopy = {};
            this.isNew = true;
        }
        this.viewSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)(this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseAttributeFlags'), this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V')).subscribe(([snowCauseAttributesKdvElements, avalancheProblemView]) => {
            this.avalancheProblemView = avalancheProblemView;
            this.avalancheCauseAttributes = this.getAvalancheCauseAttributes(snowCauseAttributesKdvElements);
        });
    }
    ngOnDestroy() {
        if (this.viewSubscription) {
            this.viewSubscription.unsubscribe();
        }
    }
    internalAvalancheExtKdvFilter(id) {
        const avalCauseTid = this.avalancheEvalProblemCopy.AvalCauseTID || 0;
        const views = this.avalancheProblemView
            .filter((v) => v.AvalCauseTID === avalCauseTid)
            .map((v) => v.AvalancheExtTID);
        return views.indexOf(id) >= 0;
    }
    getAvalancheCauseAttributes(kdvElements) {
        return kdvElements.map((val) => ({
            kdvElement: val,
            selected: this.isAvalancheCauseSelected(val)
        }));
    }
    isAvalancheCauseSelected(kdvElement) {
        switch (kdvElement.Id) {
            case 1:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID === kdvElement.Id;
            case 2:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID === kdvElement.Id;
            case 4:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID === kdvElement.Id;
            case 8:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID === kdvElement.Id;
        }
        return false;
    }
    cancel() {
        this.modalController.dismiss();
    }
    // getAvalacheCauseAttributeValue(
    //   avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[]
    // ) {
    //   return avalancheCauseAttributes.reduce(function (prevVal, curVal) {
    //     return prevVal + (curVal.selected ? curVal.kdvElement.Id : 0);
    //   }, 0);
    // }
    resetAvalancheCauseFields() {
        this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = undefined;
        this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = undefined;
        this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = undefined;
        this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = undefined;
        this.avalancheEvalProblemCopy.AvalCauseDepthTID = undefined;
    }
    ok() {
        if (this.noWeakLayers) {
            this.resetAvalancheCauseFields();
        }
        else {
            // const causeAttribute = this.getAvalacheCauseAttributeValue(
            //   this.avalancheCauseAttributes
            // );
            // this.avalancheEvalProblemCopy.AvalCauseAttributes =
            //   causeAttribute > 0 ? causeAttribute : undefined;
            for (const val of this.avalancheCauseAttributes) {
                switch (val.kdvElement.Id) {
                    case 1:
                        this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = val.selected
                            ? val.kdvElement.Id
                            : undefined;
                        break;
                    case 2:
                        this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = val.selected
                            ? val.kdvElement.Id
                            : undefined;
                        break;
                    case 4:
                        this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = val.selected
                            ? val.kdvElement.Id
                            : undefined;
                        break;
                    case 8:
                        this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = val.selected
                            ? val.kdvElement.Id
                            : undefined;
                        break;
                }
            }
        }
        if (_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.avalancheEvalProblemCopy)) {
            this.modalController.dismiss({ delete: true });
        }
        else {
            this.modalController.dismiss(this.avalancheEvalProblemCopy);
        }
    }
    delete() {
        this.modalController.dismiss({ delete: true });
    }
}
AvalancheProblemModalPage.ɵfac = function AvalancheProblemModalPage_Factory(t) { return new (t || AvalancheProblemModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_1__.KdvService)); };
AvalancheProblemModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: AvalancheProblemModalPage, selectors: [["app-avalanche-problem-modal"]], inputs: { avalancheEvalProblem: "avalancheEvalProblem" }, decls: 10, vars: 7, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], ["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TYPE", "kdvKey", "Snow_AvalancheExtKDV", 3, "value", "filter", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TRIGGER_PROBABILITY", "kdvKey", "Snow_AvalTriggerSimpleKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_DESTRUCTIVE_SIZE", "kdvKey", "Snow_DestructiveSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION", "kdvKey", "Snow_AvalPropagationKDV", 3, "value", "valueChange"], [3, "exposedHeightComboTID", "exposedHight1", "exposedHight2", "exposedHeightComboTIDChange", "exposedHight1Change", "exposedHight2Change"], [3, "validExposition", "validExpositionChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER", "kdvKey", "Snow_AvalCauseKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER_DEPTH", "kdvKey", "Snow_AvalCauseDepthKDV", 3, "value", "valueChange"], [4, "ngFor", "ngForOf"], [1, "ion-text-wrap"]], template: function AvalancheProblemModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheProblemModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AvalancheProblemModalPage_ion_content_9_Template, 28, 25, "ion-content", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.avalancheEvalProblemCopy);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_3__.KdvSelectComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_4__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_5__.ValidExpositionComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_7__.ModalSaveOrDeleteButtonsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLnNjc3MifQ== */"] });


/***/ }),

/***/ 99968:
/*!***********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-problem/avalanche-problem.module.ts ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheProblemPageModule": function() { return /* binding */ AvalancheProblemPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avalanche-problem.page */ 76185);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avalanche-problem-modal/avalanche-problem-modal.module */ 79017);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemPage
    }
];
class AvalancheProblemPageModule {
}
AvalancheProblemPageModule.ɵfac = function AvalancheProblemPageModule_Factory(t) { return new (t || AvalancheProblemPageModule)(); };
AvalancheProblemPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AvalancheProblemPageModule });
AvalancheProblemPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheProblemModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AvalancheProblemPageModule, { declarations: [_avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheProblemModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 76185:
/*!*********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/avalanche-problem/avalanche-problem.page.ts ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvalancheProblemPage": function() { return /* binding */ AvalancheProblemPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _avalanche_problem_modal_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avalanche-problem-modal/avalanche-problem-modal.page */ 95218);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var src_app_core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/helpers/array-helper */ 99020);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);




















function AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const i_r3 = restoredCtx.index; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r4.addOrEditAvalancheProblem(i_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "ion-reorder", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const avalancheEvalProblem_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, ctx_r1.getDescription(avalancheEvalProblem_r2)));
} }
function AvalancheProblemPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-reorder-group", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionItemReorder", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_ion_reorder_group_ionItemReorder_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r8.onProblemReorder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template, 5, 3, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_ion_item_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r9.addOrEditAvalancheProblem(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "ion-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](17, "app-add-picture-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.AvalancheEvalProblem2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 12, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.ADD_NEW"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 14, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
class AvalancheProblemPage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute, modalController, ngZone, kdvService) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.AvalancheEvalProblem2, basePageService, activatedRoute);
        this.modalController = modalController;
        this.ngZone = ngZone;
        this.kdvService = kdvService;
        this.avalancheCause = [];
    }
    onInit() {
        this.kdvSubscription = this.kdvService
            .getKdvRepositoryByKeyObservable('Snow_AvalCauseKDV')
            .subscribe((val) => {
            this.avalancheCause = val;
        });
    }
    onBeforeLeave() {
        if (this.kdvSubscription) {
            this.kdvSubscription.unsubscribe();
        }
    }
    addOrEditAvalancheProblem(index) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            if (this.registration &&
                this.registration.request &&
                this.registration.request.AvalancheEvalProblem2) {
                const modal = yield this.modalController.create({
                    component: _avalanche_problem_modal_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_3__.AvalancheProblemModalPage,
                    componentProps: {
                        avalancheEvalProblem: this.registration.request.AvalancheEvalProblem2[index]
                    }
                });
                modal.present();
                const result = yield modal.onDidDismiss();
                this.ngZone.run(() => {
                    if (this.registration &&
                        this.registration.request &&
                        this.registration.request.AvalancheEvalProblem2) {
                        if (result.data) {
                            if (result.data.delete) {
                                this.registration.request.AvalancheEvalProblem2.splice(index, 1);
                            }
                            else {
                                const avalancheEvalProblem = result.data;
                                if (index !== undefined) {
                                    this.registration.request.AvalancheEvalProblem2[index] = avalancheEvalProblem;
                                }
                                else {
                                    this.registration.request.AvalancheEvalProblem2.push(avalancheEvalProblem);
                                }
                            }
                        }
                    }
                });
            }
        });
    }
    getDescription(avalancheEvalProblem) {
        const cause = this.avalancheCause.find((c) => c.Id === avalancheEvalProblem.AvalCauseTID);
        if (cause) {
            return cause.Name;
        }
        else {
            return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
        }
    }
    onProblemReorder(event) {
        this.registration.request.AvalancheEvalProblem2 = src_app_core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_5__.ArrayHelper.reorderList(this.registration.request.AvalancheEvalProblem2, event.detail.from, event.detail.to);
        event.detail.complete();
    }
}
AvalancheProblemPage.ɵfac = function AvalancheProblemPage_Factory(t) { return new (t || AvalancheProblemPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__.KdvService)); };
AvalancheProblemPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: AvalancheProblemPage, selectors: [["app-avalanche-problem"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["disabled", "false", 3, "ionItemReorder"], ["detail", "true", 3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["detail", "true", 3, "click"], ["slot", "end"]], template: function AvalancheProblemPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, AvalancheProblemPage_app_registration_content_wrapper_8_Template, 18, 16, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.AvalancheEvalProblem2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonReorder], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtcHJvYmxlbS5wYWdlLnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zbm93X2F2YWxhbmNoZS1wcm9ibGVtX2F2YWxhbmNoZS1wcm9ibGVtX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBRXFEO0FBQzJDO0FBQzVFO0FBQ3RCO0FBQ007QUFDWjtBQUNYO0FBQytDOzs7Ozs7O0FBRS9FLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBSTdCLE1BQU0sZUFBZTtJQXFCMUIsWUFDVSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLHlCQUFvRCxFQUNwRCxNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBTjlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDckMsQ0FBQztJQTVCSixJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSx5QkFBeUI7UUFDM0IsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUM7SUFDeEMsQ0FBQztJQVlLLFlBQVksQ0FBQyxZQUEyQixFQUFFLGVBQWdD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QyxJQUFJLEVBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNoQixDQUFDO1FBQ0YsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDOzt3RkEvRlUsb0JBQW9CO2tIQUFwQixvQkFBb0I7UUNyQmpDLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFDYiw4RUFBYTtRQUNYLDRLQTJCbUM7UUFDckMsNERBQWM7O1FBakNSLDBEQUNGO1FBREUsd0xBQ0Y7UUFJaUMsMERBQWdFO1FBQWhFLG9JQUFnRSIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UtcGFnZS1zZXJ2aWNlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1wcm9ibGVtL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1wcm9ibGVtL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLXByb2JsZW0vYXZhbGFuY2hlLXByb2JsZW0ucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0UHJvcGVydHlOYW1lLCBpc0FycmF5VHlwZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5oZWxwZXJzJztcclxuaW1wb3J0IHsgTmV3QXR0YWNobWVudFNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdCYXNlUGFnZVNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZVNlcnZpY2Uge1xyXG4gIGdldCBab25lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmdab25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IEFsZXJ0Q29udHJvbGxlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFsZXJ0Q29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBUcmFuc2xhdGVTZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBjb25maXJtTGVhdmUocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5SRVFVSVJFRF9GSUVMRFNfTUlTU0lORycpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtUmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5DT05GSVJNX1JFU0VUJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUmVzZXREaWFsb2cobWVzc2FnZTogc3RyaW5nLCByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuWUVTJ10pLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ZRVMnXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICAgIGNvbnN0IHJlc2V0OiBib29sZWFuID0gcmVzdWx0LnJvbGUgIT09ICdjYW5jZWwnO1xyXG4gICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc2V0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCldID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICB0aGlzLnJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9uUmVzZXQpIHtcclxuICAgICAgICBvblJlc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhyZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGVmYXVsdFByb3BzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGNvbnN0IHByb3BOYW1lID0gZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICBpZiAoIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSkge1xyXG4gICAgICAvLyBJbml0IHRvIG5ldyBvYmplY3QgaWYgbnVsbFxyXG4gICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBpZiAoaXNBcnJheVR5cGUocmVnaXN0cmF0aW9uVGlkKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEltYWdlcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2VcclxuICAgICAgLmdldEF0dGFjaG1lbnRzKHJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgLnBpcGUoc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT4gZm9ya0pvaW4oYXR0YWNobWVudHMubWFwKChhKSA9PiB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQocmVnaXN0cmF0aW9uLmlkLCBhLmlkKSkpKSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdSZXNldCBpbWFnZXMgY29tcGxldGUnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKGVycm9yLCBERUJVR19UQUcsICdDb3VsZCBub3QgcmVzZXQgaW1hZ2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2U7XHJcbiAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlID0gYmFzZVBhZ2VTZXJ2aWNlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25UaWQgPSByZWdpc3RyYXRpb25UaWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIG1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5jcmVhdGVEZWZhdWx0UHJvcHMocmVnLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcmVhdGVJbml0T2JzZXJ2YWJsZSgpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdD8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25CZWZvcmVMZWF2ZT8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25SZXNldD8oKTogdm9pZDtcclxuXHJcbiAgaXNWYWxpZD8oKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8vIE5PVEU6IFJlbWVtYmVyIHRvIGFkZCBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdIGluIHBhZ2UgbW9kdWxlXHJcbiAgYXN5bmMgY2FuTGVhdmUoKSB7XHJcbiAgICAvLyBDaGVjayBpZiBpbXBsZW1lbnRhdGlvbiBwYWdlIGhhcyBpbXBsZW1lbnRlZCBjdXN0b20gaXNWYWxpZCBsb2dpY1xyXG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc1ZhbGlkID8gdGhpcy5pc1ZhbGlkKCkgOiB0cnVlKTtcclxuICAgIC8vIE9ubHkgcmV0dXJuIGFsZXJ0IGlmIHBhZ2UgaXMgbm90IGVtcHR5IGFuZCBpbnZhbGlkXHJcbiAgICBjb25zdCBpc0VtcHR5ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNFbXB0eSgpKTtcclxuICAgIGlmICghaXNFbXB0eSAmJiAhdmFsaWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1MZWF2ZSh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbml0T2JzZXJ2YWJsZSgpIHtcclxuICAgIGlmICh0aGlzLm9uSW5pdCkge1xyXG4gICAgICByZXR1cm4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5vbkluaXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHt9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkJlZm9yZUxlYXZlKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLm9uQmVmb3JlTGVhdmUoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGNsZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLlJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uLCBjbGVhbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gIShhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25UaWRcclxuICAgIClcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1SZXNldCh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldFJlc29sdmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnLycgK1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gICAgICAgIC5tYXAoKHYpID0+IHYudXJsLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC50b1N0cmluZygpKS5qb2luKCcvJykpXHJcbiAgICAgICAgLmZpbHRlcigocGF0aCkgPT4gISFwYXRoKVxyXG4gICAgICAgIC5qb2luKCcvJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRDb25maWd1cmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgLy8gICAgIHJldHVybiAnLycgKyB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gIC8vICAgICAgICAgLmZpbHRlcih2ID0+IHYucm91dGVDb25maWcpXHJcbiAgLy8gICAgICAgICAubWFwKHYgPT4gdi5yb3V0ZUNvbmZpZy5wYXRoKVxyXG4gIC8vICAgICAgICAgLmpvaW4oJy8nKTtcclxuICAvLyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZSB9IGZyb20gJy4vYXZhbGFuY2hlLXByb2JsZW0tbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBBdmFsYW5jaGVFdmFsUHJvYmxlbTJFZGl0TW9kZWwsXHJcbiAgS2R2RWxlbWVudFxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IEtkdlNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2tkdi9rZHYuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgY29tYmluZUxhdGVzdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuY29uc3QgTk9fV0VBS19MQVlFUl9LRFZfVkFMVUUgPSAyNDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWF2YWxhbmNoZS1wcm9ibGVtLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXZhbGFuY2hlLXByb2JsZW0tbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBhdmFsYW5jaGVFdmFsUHJvYmxlbTogQXZhbGFuY2hlRXZhbFByb2JsZW0yRWRpdE1vZGVsO1xyXG4gIGF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weTogQXZhbGFuY2hlRXZhbFByb2JsZW0yRWRpdE1vZGVsO1xyXG4gIGlzTmV3ID0gZmFsc2U7XHJcbiAgYXZhbGFuY2hlRXh0S2R2RmlsdGVyOiBGdW5jdGlvbjtcclxuXHJcbiAgZ2V0IG5vV2Vha0xheWVycygpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZVRJRCA9PT0gTk9fV0VBS19MQVlFUl9LRFZfVkFMVUVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXQgbm9XZWFrTGF5ZXJzKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlVElEID0gdmFsXHJcbiAgICAgID8gTk9fV0VBS19MQVlFUl9LRFZfVkFMVUVcclxuICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBhdmFsYW5jaGVQcm9ibGVtVmlldzogeyBBdmFsYW5jaGVFeHRUSUQ6IG51bWJlcjsgQXZhbENhdXNlVElEOiBudW1iZXIgfVtdO1xyXG4gIGF2YWxhbmNoZUNhdXNlQXR0cmlidXRlczogeyBrZHZFbGVtZW50OiBLZHZFbGVtZW50OyBzZWxlY3RlZDogYm9vbGVhbiB9W107XHJcbiAgZXhwb3NpdGlvbjogbnVtYmVyW107XHJcblxyXG4gIHByaXZhdGUgdmlld1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hdmFsYW5jaGVFeHRLZHZGaWx0ZXIgPSB0aGlzLmludGVybmFsQXZhbGFuY2hlRXh0S2R2RmlsdGVyLmJpbmQodGhpcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW0pIHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkgPSB7IC4uLnRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW0gfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5ID0ge307XHJcbiAgICAgIHRoaXMuaXNOZXcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlld1N1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoXHJcbiAgICAgIHRoaXMua2R2U2VydmljZS5nZXRLZHZSZXBvc2l0b3J5QnlLZXlPYnNlcnZhYmxlKFxyXG4gICAgICAgICdTbm93X0F2YWxDYXVzZUF0dHJpYnV0ZUZsYWdzJ1xyXG4gICAgICApLFxyXG4gICAgICB0aGlzLmtkdlNlcnZpY2UuZ2V0Vmlld1JlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoJ0F2YWxhbmNoZVByb2JsZW1NZW51M1YnKVxyXG4gICAgKS5zdWJzY3JpYmUoKFtzbm93Q2F1c2VBdHRyaWJ1dGVzS2R2RWxlbWVudHMsIGF2YWxhbmNoZVByb2JsZW1WaWV3XSkgPT4ge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZVByb2JsZW1WaWV3ID0gYXZhbGFuY2hlUHJvYmxlbVZpZXc7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzID0gdGhpcy5nZXRBdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMoXHJcbiAgICAgICAgc25vd0NhdXNlQXR0cmlidXRlc0tkdkVsZW1lbnRzXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudmlld1N1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnZpZXdTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGludGVybmFsQXZhbGFuY2hlRXh0S2R2RmlsdGVyKGlkOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGF2YWxDYXVzZVRpZCA9IHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZVRJRCB8fCAwO1xyXG4gICAgY29uc3Qgdmlld3MgPSB0aGlzLmF2YWxhbmNoZVByb2JsZW1WaWV3XHJcbiAgICAgIC5maWx0ZXIoKHYpID0+IHYuQXZhbENhdXNlVElEID09PSBhdmFsQ2F1c2VUaWQpXHJcbiAgICAgIC5tYXAoKHYpID0+IHYuQXZhbGFuY2hlRXh0VElEKTtcclxuICAgIHJldHVybiB2aWV3cy5pbmRleE9mKGlkKSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzKFxyXG4gICAga2R2RWxlbWVudHM6IEtkdkVsZW1lbnRbXVxyXG4gICk6IHtcclxuICAgICAga2R2RWxlbWVudDogS2R2RWxlbWVudDtcclxuICAgICAgc2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICB9W10ge1xyXG4gICAgcmV0dXJuIGtkdkVsZW1lbnRzLm1hcCgodmFsKSA9PiAoe1xyXG4gICAgICAgICAga2R2RWxlbWVudDogdmFsLFxyXG4gICAgICAgICAgc2VsZWN0ZWQ6IHRoaXMuaXNBdmFsYW5jaGVDYXVzZVNlbGVjdGVkKHZhbClcclxuICAgICAgICB9KSk7XHJcbiAgfVxyXG5cclxuICBpc0F2YWxhbmNoZUNhdXNlU2VsZWN0ZWQoa2R2RWxlbWVudDogS2R2RWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoIChrZHZFbGVtZW50LklkKSB7XHJcbiAgICAgIGNhc2UgMTpcclxuICAgICAgICByZXR1cm4gdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlTGlnaHRUSUQgPT09IGtkdkVsZW1lbnQuSWQ7XHJcbiAgICAgIGNhc2UgMjpcclxuICAgICAgICByZXR1cm4gdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlVGhpblRJRCA9PT0ga2R2RWxlbWVudC5JZDtcclxuICAgICAgY2FzZSA0OlxyXG4gICAgICAgIHJldHVybiB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVTb2Z0VElEID09PSBrZHZFbGVtZW50LklkO1xyXG4gICAgICBjYXNlIDg6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZUNyeXN0YWxUSUQgPT09IGtkdkVsZW1lbnQuSWQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRBdmFsYWNoZUNhdXNlQXR0cmlidXRlVmFsdWUoXHJcbiAgLy8gICBhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXM6IHsga2R2RWxlbWVudDogS2R2RWxlbWVudDsgc2VsZWN0ZWQ6IGJvb2xlYW4gfVtdXHJcbiAgLy8gKSB7XHJcbiAgLy8gICByZXR1cm4gYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzLnJlZHVjZShmdW5jdGlvbiAocHJldlZhbCwgY3VyVmFsKSB7XHJcbiAgLy8gICAgIHJldHVybiBwcmV2VmFsICsgKGN1clZhbC5zZWxlY3RlZCA/IGN1clZhbC5rZHZFbGVtZW50LklkIDogMCk7XHJcbiAgLy8gICB9LCAwKTtcclxuICAvLyB9XHJcblxyXG4gIHJlc2V0QXZhbGFuY2hlQ2F1c2VGaWVsZHMoKSB7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVMaWdodFRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZVRoaW5USUQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVTb2Z0VElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlQ3J5c3RhbFRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZURlcHRoVElEID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgb2soKSB7XHJcbiAgICBpZiAodGhpcy5ub1dlYWtMYXllcnMpIHtcclxuICAgICAgdGhpcy5yZXNldEF2YWxhbmNoZUNhdXNlRmllbGRzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBjb25zdCBjYXVzZUF0dHJpYnV0ZSA9IHRoaXMuZ2V0QXZhbGFjaGVDYXVzZUF0dHJpYnV0ZVZhbHVlKFxyXG4gICAgICAvLyAgIHRoaXMuYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzXHJcbiAgICAgIC8vICk7XHJcbiAgICAgIC8vIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZXMgPVxyXG4gICAgICAvLyAgIGNhdXNlQXR0cmlidXRlID4gMCA/IGNhdXNlQXR0cmlidXRlIDogdW5kZWZpbmVkO1xyXG4gICAgICBmb3IgKGNvbnN0IHZhbCBvZiB0aGlzLmF2YWxhbmNoZUNhdXNlQXR0cmlidXRlcykge1xyXG4gICAgICAgIHN3aXRjaCAodmFsLmtkdkVsZW1lbnQuSWQpIHtcclxuICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlTGlnaHRUSUQgPSB2YWwuc2VsZWN0ZWRcclxuICAgICAgICAgICAgICA/IHZhbC5rZHZFbGVtZW50LklkXHJcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVUaGluVElEID0gdmFsLnNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgPyB2YWwua2R2RWxlbWVudC5JZFxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlU29mdFRJRCA9IHZhbC5zZWxlY3RlZFxyXG4gICAgICAgICAgICAgID8gdmFsLmtkdkVsZW1lbnQuSWRcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZUNyeXN0YWxUSUQgPSB2YWwuc2VsZWN0ZWRcclxuICAgICAgICAgICAgICA/IHZhbC5rZHZFbGVtZW50LklkXHJcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKElzRW1wdHlIZWxwZXIuaXNFbXB0eSh0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weSkpIHtcclxuICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlRJVExFJyB8IHRyYW5zbGF0ZX19PC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50ICpuZ0lmPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5XCI+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5XRUFLX0xBWUVSJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uTk9fV0VBS19MQVlFUlMnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1jaGVja2JveCBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbKG5nTW9kZWwpXT1cIm5vV2Vha0xheWVyc1wiPjwvaW9uLWNoZWNrYm94PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbm9XZWFrTGF5ZXJzXCI+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLldFQUtfTEFZRVJcIiBrZHZLZXk9XCJTbm93X0F2YWxDYXVzZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLldFQUtfTEFZRVJfREVQVEhcIiBrZHZLZXk9XCJTbm93X0F2YWxDYXVzZURlcHRoS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlRGVwdGhUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8aW9uLWl0ZW0gKm5nRm9yPVwibGV0IGF2YWxhbmNoZUNhdXNlQXR0cmlidXRlIG9mIGF2YWxhbmNoZUNhdXNlQXR0cmlidXRlc1wiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+IHt7IGF2YWxhbmNoZUNhdXNlQXR0cmlidXRlLmtkdkVsZW1lbnQuTmFtZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgWyhuZ01vZGVsKV09XCJhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZS5zZWxlY3RlZFwiPjwvaW9uLWNoZWNrYm94PlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkFWQUxBTkNIRV9QUk9CQUJJTElUWScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQVZBTEFOQ0hFX1RZUEVcIiBrZHZLZXk9XCJTbm93X0F2YWxhbmNoZUV4dEtEVlwiXHJcbiAgICAgIFsodmFsdWUpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsYW5jaGVFeHRUSURcIiBbZmlsdGVyXT1cImF2YWxhbmNoZUV4dEtkdkZpbHRlclwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5BVkFMQU5DSEVfVFJJR0dFUl9QUk9CQUJJTElUWVwiXHJcbiAgICAgIGtkdktleT1cIlNub3dfQXZhbFRyaWdnZXJTaW1wbGVLRFZcIiBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbFRyaWdnZXJTaW1wbGVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQVZBTEFOQ0hFX0RFU1RSVUNUSVZFX1NJWkVcIlxyXG4gICAgICBrZHZLZXk9XCJTbm93X0Rlc3RydWN0aXZlU2l6ZUtEVlwiIFsodmFsdWUpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5EZXN0cnVjdGl2ZVNpemVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5QUk9QQUdBVElPTicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uUFJPUEFHQVRJT05cIiBrZHZLZXk9XCJTbm93X0F2YWxQcm9wYWdhdGlvbktEVlwiXHJcbiAgICAgIFsodmFsdWUpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsUHJvcGFnYXRpb25USURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGFwcC1leHBvc2VkLWhlaWdodCBbKGV4cG9zZWRIZWlnaHRDb21ib1RJRCldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkV4cG9zZWRIZWlnaHRDb21ib1RJRFwiXHJcbiAgICAgIFsoZXhwb3NlZEhpZ2h0MSldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkV4cG9zZWRIZWlnaHQxXCJcclxuICAgICAgWyhleHBvc2VkSGlnaHQyKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuRXhwb3NlZEhlaWdodDJcIj48L2FwcC1leHBvc2VkLWhlaWdodD5cclxuICAgIDxhcHAtdmFsaWQtZXhwb3NpdGlvbiBbKHZhbGlkRXhwb3NpdGlvbildPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LlZhbGlkRXhwb3NpdGlvblwiPjwvYXBwLXZhbGlkLWV4cG9zaXRpb24+XHJcbiAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIiBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQ29tbWVudFwiPlxyXG4gICAgPC9hcHAtdGV4dC1jb21tZW50PlxyXG4gIDwvaW9uLWxpc3Q+XHJcbiAgPGFwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zIChzYXZlQ2xpY2tlZCk9XCJvaygpXCIgKGRlbGV0ZUNsaWNrZWQpPVwiZGVsZXRlKClcIiBbc2hvd0RlbGV0ZV09XCIhaXNOZXdcIj5cclxuICA8L2FwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlUHJvYmxlbVBhZ2UgfSBmcm9tICcuL2F2YWxhbmNoZS1wcm9ibGVtLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vYXZhbGFuY2hlLXByb2JsZW0tbW9kYWwvYXZhbGFuY2hlLXByb2JsZW0tbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBBdmFsYW5jaGVQcm9ibGVtUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQXZhbGFuY2hlUHJvYmxlbVBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVQcm9ibGVtUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBJdGVtUmVvcmRlckV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEF2YWxhbmNoZUV2YWxQcm9ibGVtMkVkaXRNb2RlbCxcclxuICBLZHZFbGVtZW50XHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVQcm9ibGVtTW9kYWxQYWdlIH0gZnJvbSAnLi9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSAnc3JjL2FwcC9jb3JlL2hlbHBlcnMvYXJyYXktaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWF2YWxhbmNoZS1wcm9ibGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXZhbGFuY2hlLXByb2JsZW0ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdmFsYW5jaGUtcHJvYmxlbS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXZhbGFuY2hlUHJvYmxlbVBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgcHJpdmF0ZSBhdmFsYW5jaGVDYXVzZTogS2R2RWxlbWVudFtdO1xyXG4gIHByaXZhdGUga2R2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoXHJcbiAgICAgIFJlZ2lzdHJhdGlvblRpZC5BdmFsYW5jaGVFdmFsUHJvYmxlbTIsXHJcbiAgICAgIGJhc2VQYWdlU2VydmljZSxcclxuICAgICAgYWN0aXZhdGVkUm91dGVcclxuICAgICk7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUNhdXNlID0gW107XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbiA9IHRoaXMua2R2U2VydmljZVxyXG4gICAgICAuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSgnU25vd19BdmFsQ2F1c2VLRFYnKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLmF2YWxhbmNoZUNhdXNlID0gdmFsO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uQmVmb3JlTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5rZHZTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5rZHZTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdEF2YWxhbmNoZVByb2JsZW0oaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24gJiZcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMlxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIGF2YWxhbmNoZUV2YWxQcm9ibGVtOiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMltcclxuICAgICAgICAgICAgaW5kZXhcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1vZGFsLm9uRGlkRGlzbWlzcygpO1xyXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uICYmXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0ICYmXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMlxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5kZWxldGUpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMi5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGF2YWxhbmNoZUV2YWxQcm9ibGVtOiBBdmFsYW5jaGVFdmFsUHJvYmxlbTJFZGl0TW9kZWwgPVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yW1xyXG4gICAgICAgICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgICAgICAgXSA9IGF2YWxhbmNoZUV2YWxQcm9ibGVtO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMi5wdXNoKFxyXG4gICAgICAgICAgICAgICAgICBhdmFsYW5jaGVFdmFsUHJvYmxlbVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVzY3JpcHRpb24oYXZhbGFuY2hlRXZhbFByb2JsZW06IEF2YWxhbmNoZUV2YWxQcm9ibGVtMkVkaXRNb2RlbCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjYXVzZSA9IHRoaXMuYXZhbGFuY2hlQ2F1c2UuZmluZChcclxuICAgICAgKGMpID0+IGMuSWQgPT09IGF2YWxhbmNoZUV2YWxQcm9ibGVtLkF2YWxDYXVzZVRJRFxyXG4gICAgKTtcclxuICAgIGlmIChjYXVzZSkge1xyXG4gICAgICByZXR1cm4gY2F1c2UuTmFtZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVU5LTk9XTl9UWVBFJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUHJvYmxlbVJlb3JkZXIoZXZlbnQ6IEN1c3RvbUV2ZW50PEl0ZW1SZW9yZGVyRXZlbnREZXRhaWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMiA9IEFycmF5SGVscGVyLnJlb3JkZXJMaXN0KFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMixcclxuICAgICAgZXZlbnQuZGV0YWlsLmZyb20sXHJcbiAgICAgIGV2ZW50LmRldGFpbC50b1xyXG4gICAgKTtcclxuICAgIGV2ZW50LmRldGFpbC5jb21wbGV0ZSgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMlwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24tcmVvcmRlci1ncm91cCBkaXNhYmxlZD1cImZhbHNlXCIgKGlvbkl0ZW1SZW9yZGVyKT1cIm9uUHJvYmxlbVJlb3JkZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxpb24taXRlbSBkZXRhaWw9XCJ0cnVlXCIgKGNsaWNrKT1cImFkZE9yRWRpdEF2YWxhbmNoZVByb2JsZW0oaSlcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGF2YWxhbmNoZUV2YWxQcm9ibGVtIG9mIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZUV2YWxQcm9ibGVtMjsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgICA8aW9uLWxhYmVsPnt7IGdldERlc2NyaXB0aW9uKGF2YWxhbmNoZUV2YWxQcm9ibGVtKSB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICA8aW9uLXJlb3JkZXIgc2xvdD1cImVuZFwiPjwvaW9uLXJlb3JkZXI+XHJcbiAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPC9pb24tcmVvcmRlci1ncm91cD5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXRBdmFsYW5jaGVQcm9ibGVtKClcIj5cclxuICAgICAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5BRERfTkVXJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPjwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=