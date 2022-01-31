"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_group_group_module_ts"],{

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

/***/ 66283:
/*!******************************************************************!*\
  !*** ./src/app/modules/registration/pages/group/group.module.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupPageModule": function() { return /* binding */ GroupPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _group_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group.page */ 34832);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: '',
        component: _group_page__WEBPACK_IMPORTED_MODULE_0__.GroupPage
    }
];
class GroupPageModule {
}
GroupPageModule.ɵfac = function GroupPageModule_Factory(t) { return new (t || GroupPageModule)(); };
GroupPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: GroupPageModule });
GroupPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](GroupPageModule, { declarations: [_group_page__WEBPACK_IMPORTED_MODULE_0__.GroupPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 34832:
/*!****************************************************************!*\
  !*** ./src/app/modules/registration/pages/group/group.page.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupPage": function() { return /* binding */ GroupPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/user-group/user-group.service */ 3942);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-page-service */ 35140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_ion_item_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-radio", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const group_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", group_r4.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r4.Name);
} }
function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-radio-group", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template_ion_radio_group_ngModelChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r5.registration.request.ObserverGroupID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_ion_item_1_Template, 4, 2, "ion-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.registration.request.ObserverGroupID);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.groups);
} }
function GroupPage_app_registration_content_wrapper_8_ion_item_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-checkbox", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupPage_app_registration_content_wrapper_8_ion_item_7_Template_ion_checkbox_ionChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r7.checkedChanged($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r2.isSelected);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r2.firstGroup.Name);
} }
function GroupPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("reset", function GroupPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template, 2, 2, "ion-radio-group", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, GroupPage_app_registration_content_wrapper_8_ion_item_7_Template, 4, 2, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isEmpty", ctx_r0.isEmpty())("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 6, "REGISTRATION.GROUP.SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.groups.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.groups.length === 1);
} }
class GroupPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute, userGroupService, ngZone) {
        super(null, basePageService, activatedRoute);
        this.userGroupService = userGroupService;
        this.ngZone = ngZone;
        this.groups = [];
    }
    get firstGroup() {
        return this.groups[0];
    }
    get isSelected() {
        return (this.groups.length > 0 &&
            this.groups[0].Id === this.registration.request.ObserverGroupID);
    }
    onInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const groups = yield this.userGroupService.getUserGroups();
            this.ngZone.run(() => {
                this.groups = groups;
            });
        });
    }
    onReset() {
        this.ngZone.run(() => {
            this.registration.request.ObserverGroupID = undefined;
        });
    }
    checkedChanged(event) {
        const checkBox = event.target;
        if (checkBox.checked) {
            this.registration.request.ObserverGroupID = this.firstGroup.Id;
        }
        else {
            this.registration.request.ObserverGroupID = undefined;
        }
    }
    isEmpty() {
        return Promise.resolve(this.registration &&
            (this.registration.request.ObserverGroupID === undefined ||
                this.registration.request.ObserverGroupID === null));
    }
}
GroupPage.ɵfac = function GroupPage_Factory(t) { return new (t || GroupPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_0__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone)); };
GroupPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: GroupPage, selectors: [["app-group"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "isEmpty", "registration", "registrationTid", "reset", 4, "ngIf"], [3, "isEmpty", "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], [3, "ngModel", "ngModelChange"], [4, "ngFor", "ngForOf"], ["mode", "md", "slot", "start", 3, "value"], ["mode", "md", "slot", "start", 3, "checked", "ionChange"]], template: function GroupPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, GroupPage_app_registration_content_wrapper_8_Template, 8, 8, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 2, "REGISTRATION.GROUP.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.RadioValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJncm91cC5wYWdlLnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19ncm91cF9ncm91cF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFtRDtBQUVxRDtBQUMyQztBQUM1RTtBQUN0QjtBQUNNO0FBQ1o7QUFDWDtBQUMrQzs7Ozs7OztBQUUvRSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUk3QixNQUFNLGVBQWU7SUFxQjFCLFlBQ1UsbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyx5QkFBb0QsRUFDcEQsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLGdCQUFrQyxFQUNsQyxjQUE4QjtRQU45Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEyQjtRQUNwRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUE1QkosSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUkseUJBQXlCO1FBQzNCLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDO0lBQ3hDLENBQUM7SUFZSyxZQUFZLENBQUMsWUFBMkIsRUFBRSxlQUFnQyxFQUFFLE9BQW9COztZQUNwRyxNQUFNLFNBQVMs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WUFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEtBQUssSUFBSSxDQUFDLENBQ3RELENBQUM7SUFDSixDQUFDOztrRUFuRFUsU0FBUzt1R0FBVCxTQUFTO1FDYnRCLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFFYiw4RUFBYTtRQUNYLCtKQW1CbUM7UUFDckMsNERBQWM7O1FBMUJSLDBEQUNGO1FBREUsdUtBQ0Y7UUFLdUQsMERBQWtCO1FBQWxCLGtGQUFrQiIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UtcGFnZS1zZXJ2aWNlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9ncm91cC9ncm91cC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZ3JvdXAvZ3JvdXAucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9ncm91cC9ncm91cC5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eU5hbWUsIGlzQXJyYXlUeXBlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmhlbHBlcnMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0Jhc2VQYWdlU2VydmljZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlU2VydmljZSB7XHJcbiAgZ2V0IFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmU7XHJcbiAgfVxyXG5cclxuICBnZXQgUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQWxlcnRDb250cm9sbGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxlcnRDb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFRyYW5zbGF0ZVNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1MZWF2ZShyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLlJFUVVJUkVEX0ZJRUxEU19NSVNTSU5HJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLkNPTkZJUk1fUkVTRVQnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVSZXNldERpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFsnRElBTE9HUy5DQU5DRUwnLCAnRElBTE9HUy5ZRVMnXSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLllFUyddXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gICAgY29uc3QgcmVzZXQ6IGJvb2xlYW4gPSByZXN1bHQucm9sZSAhPT0gJ2NhbmNlbCc7XHJcbiAgICBpZiAocmVzZXQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZXNldChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzZXQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5ab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZWdpc3RyYXRpb25UaWQpIHtcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob25SZXNldCkge1xyXG4gICAgICAgIG9uUmVzZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEZWZhdWx0UHJvcHMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdKSB7XHJcbiAgICAgIC8vIEluaXQgdG8gbmV3IG9iamVjdCBpZiBudWxsXHJcbiAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGlmIChpc0FycmF5VHlwZShyZWdpc3RyYXRpb25UaWQpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHMocmVnaXN0cmF0aW9uLmlkKVxyXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PiBmb3JrSm9pbihhdHRhY2htZW50cy5tYXAoKGEpID0+IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UucmVtb3ZlQXR0YWNobWVudChyZWdpc3RyYXRpb24uaWQsIGEuaWQpKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ1Jlc2V0IGltYWdlcyBjb21wbGV0ZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoZXJyb3IsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCByZXNldCBpbWFnZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZTtcclxuICByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UgPSBiYXNlUGFnZVNlcnZpY2U7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCA9IHJlZ2lzdHJhdGlvblRpZDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQoaWQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgbWFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNyZWF0ZURlZmF1bHRQcm9wcyhyZWcsIHRoaXMucmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICAgIHJldHVybiByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNyZWF0ZUluaXRPYnNlcnZhYmxlKCkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0PygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvbkJlZm9yZUxlYXZlPygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvblJlc2V0PygpOiB2b2lkO1xyXG5cclxuICBpc1ZhbGlkPygpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgLy8gTk9URTogUmVtZW1iZXIgdG8gYWRkIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF0gaW4gcGFnZSBtb2R1bGVcclxuICBhc3luYyBjYW5MZWF2ZSgpIHtcclxuICAgIC8vIENoZWNrIGlmIGltcGxlbWVudGF0aW9uIHBhZ2UgaGFzIGltcGxlbWVudGVkIGN1c3RvbSBpc1ZhbGlkIGxvZ2ljXHJcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLmlzVmFsaWQoKSA6IHRydWUpO1xyXG4gICAgLy8gT25seSByZXR1cm4gYWxlcnQgaWYgcGFnZSBpcyBub3QgZW1wdHkgYW5kIGludmFsaWRcclxuICAgIGNvbnN0IGlzRW1wdHkgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc0VtcHR5KCkpO1xyXG4gICAgaWYgKCFpc0VtcHR5ICYmICF2YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybUxlYXZlKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUluaXRPYnNlcnZhYmxlKCkge1xyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7XHJcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh0aGlzLm9uSW5pdCgpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlTGVhdmUpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVMZWF2ZSgpKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2F2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoY2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuUmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24sIGNsZWFuKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVGdW5jKCkge1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiAhKGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKVxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybVJlc2V0KHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb2x2ZWRVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICcvJyArXHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgICAgICAgLm1hcCgodikgPT4gdi51cmwubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKSlcclxuICAgICAgICAuZmlsdGVyKChwYXRoKSA9PiAhIXBhdGgpXHJcbiAgICAgICAgLmpvaW4oJy8nKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGdldENvbmZpZ3VyZWRVcmwoKTogc3RyaW5nIHtcclxuICAvLyAgICAgcmV0dXJuICcvJyArIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgLy8gICAgICAgICAuZmlsdGVyKHYgPT4gdi5yb3V0ZUNvbmZpZylcclxuICAvLyAgICAgICAgIC5tYXAodiA9PiB2LnJvdXRlQ29uZmlnLnBhdGgpXHJcbiAgLy8gICAgICAgICAuam9pbignLycpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEdyb3VwUGFnZSB9IGZyb20gJy4vZ3JvdXAucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEdyb3VwUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtHcm91cFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHcm91cFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZlckdyb3VwRHRvIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBJb25DaGVja2JveCB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWdyb3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JvdXAucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9ncm91cC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JvdXBQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIGdyb3VwczogT2JzZXJ2ZXJHcm91cER0b1tdID0gW107XHJcblxyXG4gIGdldCBmaXJzdEdyb3VwKCk6IE9ic2VydmVyR3JvdXBEdG8ge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBzWzBdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmdyb3Vwcy5sZW5ndGggPiAwICYmXHJcbiAgICAgIHRoaXMuZ3JvdXBzWzBdLklkID09PSB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHVzZXJHcm91cFNlcnZpY2U6IFVzZXJHcm91cFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7XHJcbiAgICBzdXBlcihudWxsLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uSW5pdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGdyb3VwcyA9IGF3YWl0IHRoaXMudXNlckdyb3VwU2VydmljZS5nZXRVc2VyR3JvdXBzKCk7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmdyb3VwcyA9IGdyb3VwcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25SZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEID0gdW5kZWZpbmVkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjaGVja2VkQ2hhbmdlZChldmVudDogQ3VzdG9tRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNoZWNrQm94ID0gKDxhbnk+ZXZlbnQudGFyZ2V0KSBhcyBJb25DaGVja2JveDtcclxuICAgIGlmIChjaGVja0JveC5jaGVja2VkKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEID0gdGhpcy5maXJzdEdyb3VwLklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNlcnZlckdyb3VwSUQgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24gJiZcclxuICAgICAgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRCA9PT0gbnVsbClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5HUk9VUC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciBbaXNFbXB0eV09XCJpc0VtcHR5KClcIiAqbmdJZj1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCJcclxuICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLkdST1VQLlNVQlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1yYWRpby1ncm91cCAqbmdJZj1cImdyb3Vwcy5sZW5ndGggPiAxXCIgWyhuZ01vZGVsKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNlcnZlckdyb3VwSURcIj5cclxuICAgICAgICA8aW9uLWl0ZW0gKm5nRm9yPVwibGV0IGdyb3VwIG9mIGdyb3Vwc1wiPlxyXG4gICAgICAgICAgPGlvbi1yYWRpbyBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbdmFsdWVdPVwiZ3JvdXAuSWRcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3tncm91cC5OYW1lfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L2lvbi1yYWRpby1ncm91cD5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwiZ3JvdXBzLmxlbmd0aCA9PT0gMVwiPlxyXG4gICAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChpb25DaGFuZ2UpPVwiY2hlY2tlZENoYW5nZWQoJGV2ZW50KVwiPjwvaW9uLWNoZWNrYm94PlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3tmaXJzdEdyb3VwLk5hbWV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9