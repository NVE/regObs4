"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_overview_overview_module_ts"],{

/***/ 91068:
/*!******************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/failed-registration/failed-registration.component.ts ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FailedRegistrationComponent": function() { return /* binding */ FailedRegistrationComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/registration.service */ 33181);
/* harmony import */ var _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/email-composer/ngx */ 36543);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../settings */ 30015);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 54364);













function FailedRegistrationComponent_ion_label_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.FAILED.SUBTITLE"), " ");
} }
function FailedRegistrationComponent_ion_label_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 2, "REGISTRATION.FAILED.PROBLEM"), ": ", ctx_r1.registration.syncError, " ");
} }
function FailedRegistrationComponent_ion_label_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 3, "REGISTRATION.FAILED.PROBLEM"), ". ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 5, "REGISTRATION.FAILED.LOGGED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 7, "REGISTRATION.FAILED.PROBLEM_HELP_TEXT"), " ");
} }
function FailedRegistrationComponent_ion_item_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 2, "REGISTRATION.FAILED.REFERENCE"), " ID: ", ctx_r3.registration.id, " ");
} }
const stringify = __webpack_require__(/*! json-stringify-safe */ 73050);
class FailedRegistrationComponent {
    constructor(registrationService, emailComposer, translateService, ngZone) {
        this.registrationService = registrationService;
        this.emailComposer = emailComposer;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.registrationChange = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    }
    ngOnInit() { }
    openForEdit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.registration.syncStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;
            yield this.registrationService.saveRegistrationAsync(this.registration);
            this.ngZone.run(() => {
                this.registrationChange.emit(this.registration);
            });
        });
    }
    sendEmail() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService
                .get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY'])
                .toPromise();
            // const pictures = this.registrationService
            //   .getAllPictures(this.registration.request)
            //   .filter(
            //     (p) => p.PictureImageBase64 && !p.PictureImageBase64.startsWith('data')
            //   )
            //   .map((p) => p.PictureImageBase64);
            const base64string = btoa(stringify(this.registration));
            const attachments = ['base64:registration.json//' + base64string];
            // const attachments = ['base64:registration.json//' + base64string].concat(
            //   pictures
            // );
            const email = {
                to: _settings__WEBPACK_IMPORTED_MODULE_3__.settings.errorEmailAddress,
                attachments,
                subject: translations['REGISTRATION.EMAIL.SUBJECT'],
                body: translations['REGISTRATION.EMAIL.BODY'],
                isHtml: true
            };
            this.emailComposer.open(email);
        });
    }
}
FailedRegistrationComponent.ɵfac = function FailedRegistrationComponent_Factory(t) { return new (t || FailedRegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__.EmailComposer), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone)); };
FailedRegistrationComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: FailedRegistrationComponent, selectors: [["app-failed-registration"]], inputs: { registration: "registration" }, outputs: { registrationChange: "registrationChange" }, decls: 20, vars: 13, consts: [["lines", "full"], [1, "ion-text-uppercase"], ["class", "ion-text-wrap", 4, "ngIf"], [4, "ngIf"], [3, "click"], ["slot", "start", "name", "mail"], [1, "ion-text-wrap"], ["slot", "start", "name", "create"]], template: function FailedRegistrationComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-list", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-list-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, FailedRegistrationComponent_ion_label_6_Template, 3, 3, "ion-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, FailedRegistrationComponent_ion_label_7_Template, 3, 4, "ion-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, FailedRegistrationComponent_ion_label_8_Template, 6, 9, "ion-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, FailedRegistrationComponent_ion_item_9_Template, 4, 4, "ion-item", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FailedRegistrationComponent_Template_ion_item_click_10_listener() { return ctx.sendEmail(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "ion-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FailedRegistrationComponent_Template_ion_item_click_15_listener() { return ctx.openForEdit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "ion-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "ion-label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 7, "REGISTRATION.FAILED.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode === 400);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode > 400);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode >= 400);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 9, "REGISTRATION.FAILED.SEND_EMAIL"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](19, 11, "REGISTRATION.FAILED.EDIT_OBSERVATION"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmYWlsZWQtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 58182:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/registration/components/send-button/send-button.component.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SendButtonComponent": function() { return /* binding */ SendButtonComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/registration.service */ 33181);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../auth/services/regobs-auth.service */ 18955);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! angular-svg-icon */ 70459);



















function SendButtonComponent_ion_footer_0_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.RESEND"));
} }
function SendButtonComponent_ion_footer_0_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SEND"));
} }
function SendButtonComponent_ion_footer_0_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-footer");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-grid", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-col", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SendButtonComponent_ion_footer_0_Template_ion_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.send(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "ion-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SendButtonComponent_ion_footer_0_span_7_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, SendButtonComponent_ion_footer_0_span_8_Template, 3, 3, "span", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-row", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-col", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SendButtonComponent_ion_footer_0_Template_ion_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r5.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "svg-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r0.isDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.registration.syncError);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.registration.syncError);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 4, "REGISTRATION.DELETE"), " ");
} }
class SendButtonComponent {
    constructor(registrationService, alertController, userSettingService, translateService, navController, regobsAuthService, commonRegistrationService, cdr, ngZone) {
        this.registrationService = registrationService;
        this.alertController = alertController;
        this.userSettingService = userSettingService;
        this.translateService = translateService;
        this.navController = navController;
        this.regobsAuthService = regobsAuthService;
        this.commonRegistrationService = commonRegistrationService;
        this.cdr = cdr;
        this.ngZone = ngZone;
        this.isSending = false;
        this.isLoggingIn = false;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
    }
    get isDisabled() {
        // TODO: Hvorfor disabled hvis man holder på å logge inn?
        return this.isEmpty || this.isSending || this.isLoggingIn;
    }
    ngOnInit() {
        this.isSending = false;
        this.isLoggingIn = false;
        this.regobsAuthService.isLoggingIn$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this.ngDestroy$))
            .subscribe((val) => {
            this.ngZone.run(() => {
                this.isLoggingIn = val;
                this.cdr.detectChanges();
            });
        });
    }
    ngOnChanges(changes) {
        var _a;
        if ((_a = changes.registration) === null || _a === void 0 ? void 0 : _a.currentValue) {
            this.commonRegistrationService.isEmpty(changes.registration.currentValue).then((empty) => {
                this.isEmpty = empty;
                this.cdr.detectChanges();
            });
        }
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    send() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.isSending) {
                this.isSending = true;
                this.cdr.detectChanges();
                try {
                    const userSettings = yield this.userSettingService.userSetting$
                        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
                        .toPromise();
                    yield this.registrationService.sendRegistration(userSettings.appMode, this.registration);
                }
                finally {
                    this.isSending = false;
                    this.cdr.detectChanges();
                }
            }
        });
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService
                .get([
                'REGISTRATION.DELETE',
                'REGISTRATION.DELETE_CONFIRM',
                'ALERT.OK',
                'ALERT.CANCEL'
            ])
                .toPromise();
            const alert = yield this.alertController.create({
                header: translations['REGISTRATION.DELETE'],
                message: translations['REGISTRATION.DELETE_CONFIRM'],
                buttons: [
                    {
                        text: translations['ALERT.CANCEL'],
                        role: 'cancel',
                        cssClass: 'secondary'
                    },
                    {
                        text: translations['ALERT.OK'],
                        handler: () => {
                            this.commonRegistrationService.deleteRegistrationFromOfflineStorage(this.registration.id).subscribe(() => {
                                this.navController.navigateRoot('');
                            });
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
}
SendButtonComponent.ɵfac = function SendButtonComponent_Factory(t) { return new (t || SendButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_2__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone)); };
SendButtonComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SendButtonComponent, selectors: [["app-send-button"]], inputs: { registration: "registration" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "ion-no-padding"], ["size", "12", 1, "send-button-col"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"], ["slot", "start", "name", "send"], [1, "delete-button-col", "ion-no-padding", "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 3, "click"], ["slot", "start", "src", "/assets/icon/delete.svg"]], template: function SendButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SendButtonComponent_ion_footer_0_Template, 15, 6, "ion-footer", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, angular_svg_icon__WEBPACK_IMPORTED_MODULE_12__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe], styles: ["ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background: #fff;\n}\nion-footer[_ngcontent-%COMP%]   .send-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  margin-right: 6px;\n  height: var(--ion-button-height);\n}\nion-footer[_ngcontent-%COMP%]   .delete-button-col[_ngcontent-%COMP%] {\n  --ion-button-font-size: 11px;\n}\nion-footer[_ngcontent-%COMP%]   .delete-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbmQtYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksa0JBQUE7QUFBUjtBQUlRO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0FBRlo7QUFNSTtFQUNJLDRCQUFBO0FBSlI7QUFPWTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtBQUxoQiIsImZpbGUiOiJzZW5kLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1mb290ZXIge1xyXG4gICAgaW9uLXRvb2xiYXIge1xyXG4gICAgICAgIC0tYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIH1cclxuXHJcbiAgICAuc2VuZC1idXR0b24tY29sIHtcclxuICAgICAgICBpb24tYnV0dG9uIHtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDZweDtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZGVsZXRlLWJ1dHRvbi1jb2wge1xyXG4gICAgICAgIC0taW9uLWJ1dHRvbi1mb250LXNpemU6IDExcHg7XHJcblxyXG4gICAgICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgICAgICBzdmctaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDZweDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"], changeDetection: 0 });


/***/ }),

/***/ 70023:
/*!****************************************************************************************!*\
  !*** ./src/app/modules/registration/components/summary-item/summary-item.component.ts ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SummaryItemComponent": function() { return /* binding */ SummaryItemComponent; }
/* harmony export */ });
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 49005);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 98578);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 32185);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 35116);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 34864);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 44094);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/services/logging/logging.service */ 93042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../blob-image/blob-image.component */ 44037);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);













function SummaryItemComponent_ion_item_0_p_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, ctx_r1.item.subTitle), " ");
} }
function SummaryItemComponent_ion_item_0_p_6_ro_blob_image_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ro-blob-image", 8);
} if (rf & 2) {
    const attachment_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("imgBlob", attachment_r5.blob);
} }
function SummaryItemComponent_ion_item_0_p_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, SummaryItemComponent_ion_item_0_p_6_ro_blob_image_1_Template, 1, 1, "ro-blob-image", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.attachments);
} }
function SummaryItemComponent_ion_item_0_ion_icon_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 9);
} }
function SummaryItemComponent_ion_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-item", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SummaryItemComponent_ion_item_0_Template_ion_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r6.navigate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-label", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, SummaryItemComponent_ion_item_0_p_5_Template, 3, 3, "p", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, SummaryItemComponent_ion_item_0_p_6_Template, 2, 1, "p", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SummaryItemComponent_ion_item_0_ion_icon_7_Template, 1, 0, "ion-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("detail", !ctx_r0.readonly);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 5, ctx_r0.item.title));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.item.subTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.attachments);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.item.hasData && !ctx_r0.readonly);
} }
const DEBUG_TAG = 'SummaryItemComponent';
class SummaryItemComponent extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.NgDestoryBase {
    constructor(navController, newAttachmentService, cdr, logger) {
        super();
        this.navController = navController;
        this.newAttachmentService = newAttachmentService;
        this.cdr = cdr;
        this.logger = logger;
        this.readonly = false;
    }
    ngOnChanges() {
        var _a;
        if (((_a = this.item) === null || _a === void 0 ? void 0 : _a.attachments) != null) {
            (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(this.item.attachments)
                .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)((attachments) => attachments.filter((a) => a.type === 'new').map((a) => a.attachment)), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)((attachments) => attachments.length === 0
                ? (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([])
                : (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.forkJoin)([
                    ...attachments.map((a) => this.newAttachmentService.getBlob(this.item.id, a.id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)((blob) => (Object.assign(Object.assign({}, a), { blob }))), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)((err) => {
                        this.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');
                        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(Object.assign(Object.assign({}, a), { blob: undefined }));
                    })))
                ])), (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this.ngDestroy$))
                .subscribe((result) => {
                this.attachments = result;
                this.cdr.detectChanges();
            });
        }
    }
    navigate() {
        if (!this.readonly) {
            this.navController.navigateForward([this.item.href, this.item.id], {
                queryParams: this.item.queryParams
            });
        }
    }
}
SummaryItemComponent.ɵfac = function SummaryItemComponent_Factory(t) { return new (t || SummaryItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_2__.LoggingService)); };
SummaryItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: SummaryItemComponent, selectors: [["app-summary-item"]], inputs: { item: "item", readonly: "readonly" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]], decls: 1, vars: 1, consts: [["class", "summary-item", 3, "detail", "click", 4, "ngIf"], [1, "summary-item", 3, "detail", "click"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf"], ["class", "images", 4, "ngIf"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], [1, "images"], [3, "imgBlob", 4, "ngFor", "ngForOf"], [3, "imgBlob"], ["slot", "end", "color", "success", "name", "checkmark-circle"]], template: function SummaryItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SummaryItemComponent_ion_item_0_Template, 8, 7, "ion-item", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !(ctx.readonly && !ctx.item.hasData));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_3__.BlobImageComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["ro-blob-image[_ngcontent-%COMP%], img[_ngcontent-%COMP%] {\n  max-width: 100px;\n  max-height: 100px;\n  padding-right: 5px;\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1bW1hcnktaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FBQUoiLCJmaWxlIjoic3VtbWFyeS1pdGVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnJvLWJsb2ItaW1hZ2UsIGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn0iXX0= */"], changeDetection: 0 });


/***/ }),

/***/ 86166:
/*!************************************************************************!*\
  !*** ./src/app/modules/registration/pages/overview/overview.module.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewPageModule": function() { return /* binding */ OverviewPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _overview_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./overview.page */ 38101);
/* harmony import */ var _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/send-button/send-button.component */ 58182);
/* harmony import */ var _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/summary-item/summary-item.component */ 70023);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/failed-registration/failed-registration.component */ 91068);
/* harmony import */ var _save_as_draft_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../save-as-draft.guard */ 52622);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);









const routes = [
    {
        path: '',
        component: _overview_page__WEBPACK_IMPORTED_MODULE_0__.OverviewPage,
        canDeactivate: [_save_as_draft_guard__WEBPACK_IMPORTED_MODULE_5__.SaveAsDraftRouteGuard]
    }
];
class OverviewPageModule {
}
OverviewPageModule.ɵfac = function OverviewPageModule_Factory(t) { return new (t || OverviewPageModule)(); };
OverviewPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: OverviewPageModule });
OverviewPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_3__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](OverviewPageModule, { declarations: [_overview_page__WEBPACK_IMPORTED_MODULE_0__.OverviewPage,
        _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_1__.SendButtonComponent,
        _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_2__.SummaryItemComponent,
        _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_4__.FailedRegistrationComponent], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_3__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule] }); })();


/***/ }),

/***/ 38101:
/*!**********************************************************************!*\
  !*** ./src/app/modules/registration/pages/overview/overview.page.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverviewPage": function() { return /* binding */ OverviewPage; }
/* harmony export */ });
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/user-group/user-group.service */ 3942);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _services_summary_item_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/summary-item.service */ 13741);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 52249);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fast-deep-equal */ 90223);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/send-button/send-button.component */ 58182);
/* harmony import */ var _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/failed-registration/failed-registration.component */ 91068);
/* harmony import */ var _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/summary-item/summary-item.component */ 70023);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ngx-translate/core */ 70325);























function OverviewPage_ng_container_7_app_failed_registration_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-failed-registration", 8);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("registration", ctx_r1.registration);
} }
function OverviewPage_ng_container_7_app_summary_item_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-summary-item", 9);
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("readonly", ctx_r2.registration.syncStatus === ctx_r2.RegistrationStatus.Sync)("item", item_r3);
} }
function OverviewPage_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, OverviewPage_ng_container_7_app_failed_registration_2_Template, 1, 1, "app-failed-registration", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, OverviewPage_ng_container_7_app_summary_item_8_Template, 1, 2, "app-summary-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "app-send-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.registration.syncError && ctx_r0.registration.syncStatus === ctx_r0.RegistrationStatus.Sync);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](7, 5, "REGISTRATION.OVERVIEW.MY_OBSERVATION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.summaryItems)("ngForTrackBy", ctx_r0.trackByFunction);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("registration", ctx_r0.registration);
} }
class OverviewPage extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_4__.NgDestoryBase {
    constructor(commonRegistrationService, cdr, activatedRoute, summaryItemService, userGroupService, newAttachmentService) {
        super();
        this.commonRegistrationService = commonRegistrationService;
        this.cdr = cdr;
        this.activatedRoute = activatedRoute;
        this.summaryItemService = summaryItemService;
        this.userGroupService = userGroupService;
        this.newAttachmentService = newAttachmentService;
        this.RegistationTid = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid;
        this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_11__.GeoHazard;
        this.RegistrationStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.SyncStatus;
        this.summaryItems = [];
    }
    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];
        this.registration$ = this.commonRegistrationService.getRegistrationByIdShared$(id);
        this.registration$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$)).subscribe((registration) => {
            this.registration = registration;
            this.cdr.detectChanges();
        });
        this.initSummaryItemSubscription();
        this.userGroupService.updateUserGroups();
    }
    initSummaryItemSubscription() {
        this.registration$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)((reg) => (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.combineLatest)([this.userGroupService.getUserGroupsAsObservable(), this.newAttachmentService.getAttachments(reg.id)]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)(([userGroups]) => (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.from)(this.summaryItemService.getSummaryItems(reg, userGroups))))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.distinctUntilChanged)((a, b) => fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(a, b)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$))
            .subscribe((summaryItems) => {
            this.summaryItems = summaryItems;
            this.cdr.detectChanges();
        });
    }
    trackByFunction(index, item) {
        if (!item) {
            return null;
        }
        return item.href;
    }
}
OverviewPage.ɵfac = function OverviewPage_Factory(t) { return new (t || OverviewPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_summary_item_service__WEBPACK_IMPORTED_MODULE_3__.SummaryItemService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_2__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__.NewAttachmentService)); };
OverviewPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: OverviewPage, selectors: [["app-overview"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]], decls: 8, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [4, "ngIf"], [3, "registration", 4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "readonly", "item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "registration"], [3, "readonly", "item"]], template: function OverviewPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, OverviewPage_ng_container_7_Template, 10, 7, "ng-container", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](6, 2, "REGISTRATION.OVERVIEW.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_7__.SendButtonComponent, _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_8__.FailedRegistrationComponent, _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_9__.SummaryItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe], styles: ["ion-list[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm92ZXJ2aWV3LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0FBQ0YiLCJmaWxlIjoib3ZlcnZpZXcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWxpc3Qge1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcbiJdfQ== */"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19vdmVydmlld19vdmVydmlld19tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT3VCO0FBQzZFO0FBQzFCO0FBSWhDO0FBQ2E7QUFDSjs7Ozs7Ozs7SUNSL0MsK0VBQTJFO0lBQ3pFLHVEQUNGOztJQUFBLDREQUFZOztJQURWLDBEQUNGO0lBREUsMktBQ0Y7OztJQUNBLCtFQUE2RTtJQUMzRSx1REFDRjs7SUFBQSw0REFBWTs7O0lBRFYsMERBQ0Y7SUFERSwrTUFDRjs7O0lBQ0EsK0VBQTJFO0lBQ3pFLHVEQUNBOzs7SUFHQSx1REFDRjs7SUFBQSw0REFBWTs7SUFMViwwREFDQTtJQURBLCtRQUNBO0lBR0EsMERBQ0Y7SUFERSxvTEFDRjs7O0lBRUYsMkVBQXFEO0lBQ25ELCtFQUFpQztJQUMvQix1REFDRjs7SUFBQSw0REFBWTtJQUNkLDREQUFXOzs7SUFGUCwwREFDRjtJQURFLDZNQUNGOztBRFJKLE1BQU0sU0FBUyxHQUFHLG1CQUFPLENBQUMsZ0NBQXFCLENBQUMsQ0FBQztBQU8xQyxNQUFNLDJCQUEyQjtJQUl0QyxZQUNVLG1CQUF3QyxFQUN4QyxhQUE0QixFQUM1QixnQkFBa0MsRUFDbEMsTUFBYztRQUhkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBTmQsdUJBQWtCLEdBQUcsSUFBSSx1REFBWSxFQUFFLENBQUM7SUFPL0MsQ0FBQztJQUVKLFFBQVEsS0FBSSxDQUFDO0lBRVAsV0FBVzs7WUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxxR0FBZ0IsQ0FBQztZQUNoRCxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxD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QztJQUVELGVBQWUsQ0FBQyxLQUFhLEVBQUUsSUFBa0I7UUFDL0MsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7d0VBbkRVLFlBQVk7MkdBQVosWUFBWTtRQ3RCekIsOEVBQVk7UUFDVixrRkFBdUM7UUFDckMsa0ZBQTBCO1FBQ3hCLGlGQUEyRDtRQUM3RCw2REFBYztRQUNkLDZFQUFXO1FBQ1Qsd0RBQ0Y7O1FBQUEsNkRBQVk7UUFDZCw2REFBYztRQUNoQiw2REFBYTtRQUNiLDRIQWVlOztRQW5CVCwyREFDRjtRQURFLDRLQUNGO1FBR1csMkRBQWtCO1FBQWxCLG1GQUFrQiIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvZmFpbGVkLXJlZ2lzdHJhdGlvbi9mYWlsZWQtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2ZhaWxlZC1yZWdpc3RyYXRpb24vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NlbmQtYnV0dG9uL3NlbmQtYnV0dG9uLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NlbmQtYnV0dG9uL3NlbmQtYnV0dG9uLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zdW1tYXJ5LWl0ZW0vc3VtbWFyeS1pdGVtLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL292ZXJ2aWV3L292ZXJ2aWV3Lm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9vdmVydmlldy9vdmVydmlldy5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL292ZXJ2aWV3L292ZXJ2aWV3LnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBOZ1pvbmVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQge1xyXG4gIEVtYWlsQ29tcG9zZXIsXHJcbiAgRW1haWxDb21wb3Nlck9wdGlvbnNcclxufSBmcm9tICdAaW9uaWMtbmF0aXZlL2VtYWlsLWNvbXBvc2VyL25neCc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXR0aW5ncyc7XHJcbmNvbnN0IHN0cmluZ2lmeSA9IHJlcXVpcmUoJ2pzb24tc3RyaW5naWZ5LXNhZmUnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWZhaWxlZC1yZWdpc3RyYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mYWlsZWQtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mYWlsZWQtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZhaWxlZFJlZ2lzdHJhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIEBPdXRwdXQoKSByZWdpc3RyYXRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbWFpbENvbXBvc2VyOiBFbWFpbENvbXBvc2VyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgYXN5bmMgb3BlbkZvckVkaXQoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24pO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25DaGFuZ2UuZW1pdCh0aGlzLnJlZ2lzdHJhdGlvbik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNlbmRFbWFpbCgpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFsnUkVHSVNUUkFUSU9OLkVNQUlMLlNVQkpFQ1QnLCAnUkVHSVNUUkFUSU9OLkVNQUlMLkJPRFknXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgLy8gY29uc3QgcGljdHVyZXMgPSB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICAgIC8vICAgLmdldEFsbFBpY3R1cmVzKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QpXHJcbiAgICAvLyAgIC5maWx0ZXIoXHJcbiAgICAvLyAgICAgKHApID0+IHAuUGljdHVyZUltYWdlQmFzZTY0ICYmICFwLlBpY3R1cmVJbWFnZUJhc2U2NC5zdGFydHNXaXRoKCdkYXRhJylcclxuICAgIC8vICAgKVxyXG4gICAgLy8gICAubWFwKChwKSA9PiBwLlBpY3R1cmVJbWFnZUJhc2U2NCk7XHJcbiAgICBjb25zdCBiYXNlNjRzdHJpbmcgPSBidG9hKHN0cmluZ2lmeSh0aGlzLnJlZ2lzdHJhdGlvbikpO1xyXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBbJ2Jhc2U2NDpyZWdpc3RyYXRpb24uanNvbi8vJyArIGJhc2U2NHN0cmluZ107XHJcbiAgICAvLyBjb25zdCBhdHRhY2htZW50cyA9IFsnYmFzZTY0OnJlZ2lzdHJhdGlvbi5qc29uLy8nICsgYmFzZTY0c3RyaW5nXS5jb25jYXQoXHJcbiAgICAvLyAgIHBpY3R1cmVzXHJcbiAgICAvLyApO1xyXG4gICAgY29uc3QgZW1haWw6IEVtYWlsQ29tcG9zZXJPcHRpb25zID0ge1xyXG4gICAgICB0bzogc2V0dGluZ3MuZXJyb3JFbWFpbEFkZHJlc3MsXHJcbiAgICAgIGF0dGFjaG1lbnRzLFxyXG4gICAgICBzdWJqZWN0OiB0cmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5FTUFJTC5TVUJKRUNUJ10sXHJcbiAgICAgIGJvZHk6IHRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkVNQUlMLkJPRFknXSxcclxuICAgICAgaXNIdG1sOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5lbWFpbENvbXBvc2VyLm9wZW4oZW1haWwpO1xyXG4gIH1cclxuXHJcbiAgLy8gcHJpdmF0ZSBhc3luYyBnZXRFbWFpbEFkZHJlc3MoKSB7XHJcbiAgLy8gICBjb25zdCB1c2VyU2V0dGluZyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmdldFVzZXJTZXR0aW5ncygpO1xyXG4gIC8vICAgc3dpdGNoICh1c2VyU2V0dGluZy5jdXJyZW50R2VvSGF6YXJkKSB7XHJcbiAgLy8gICAgIGNhc2UgR2VvSGF6YXJkLlNub3c6XHJcbiAgLy8gICAgICAgcmV0dXJuICdzbm9za3JlZHZhcnNsaW5nQG52ZS5ubyc7XHJcbiAgLy8gICAgIGNhc2UgR2VvSGF6YXJkLkljZTpcclxuICAvLyAgICAgICByZXR1cm4gJ2lzdmFyc2xpbmdAbnZlLm5vJztcclxuICAvLyAgICAgY2FzZSBHZW9IYXphcmQuV2F0ZXI6XHJcbiAgLy8gICAgICAgcmV0dXJuICdmbG9tdmFyc2xpbmdAbnZlLm5vJztcclxuICAvLyAgICAgY2FzZSBHZW9IYXphcmQuRGlydDpcclxuICAvLyAgICAgICByZXR1cm4gJ2pvcmRza3JlZHZhcnNsaW5nQG52ZS5ubyc7XHJcbiAgLy8gICB9XHJcbiAgLy8gfVxyXG59XHJcbiIsIjxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uRkFJTEVELlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICA8aW9uLWl0ZW0+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiICpuZ0lmPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXNDb2RlID09PSAwXCI+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5GQUlMRUQuU1VCVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIiAqbmdJZj1cInJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzQ29kZSA9PT0gNDAwXCI+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5GQUlMRUQuUFJPQkxFTScgfCB0cmFuc2xhdGV9fToge3sgcmVnaXN0cmF0aW9uLnN5bmNFcnJvciB9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiICpuZ0lmPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXNDb2RlID4gNDAwXCI+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5GQUlMRUQuUFJPQkxFTScgfCB0cmFuc2xhdGV9fS4ge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5MT0dHRUQnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPCEtLSBUYSBza2plcm1iaWxkZSBvZ1xyXG4gICAgICA8YXBwLWV4dGVybmFsLWxpbmsgc3JjPVwiaHR0cDovL3d3dy5yZWdvYnMubm8vSG9tZS9BYm91dFwiPmtvbnRha3Qgb3NzPC9hcHAtZXh0ZXJuYWwtbGluaz5cclxuICAgICAgLCBzw6UgaGplbHBlciBkdSBvc3MgbWVkIMOlIGZpbm5lIGVuIGzDuHNuaW5nLiAgLS0+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5GQUlMRUQuUFJPQkxFTV9IRUxQX1RFWFQnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbiAgPGlvbi1pdGVtICpuZ0lmPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXNDb2RlID49IDQwMFwiPlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5SRUZFUkVOQ0UnIHwgdHJhbnNsYXRlfX0gSUQ6IHt7IHJlZ2lzdHJhdGlvbi5pZCB9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gKGNsaWNrKT1cInNlbmRFbWFpbCgpXCI+XHJcbiAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cIm1haWxcIj48L2lvbi1pY29uPlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5TRU5EX0VNQUlMJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1pdGVtPlxyXG4gIDxpb24taXRlbSAoY2xpY2spPVwib3BlbkZvckVkaXQoKVwiPlxyXG4gICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJjcmVhdGVcIj48L2lvbi1pY29uPlxyXG4gICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5FRElUX09CU0VSVkFUSU9OJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1pdGVtPlxyXG48L2lvbi1saXN0PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciwgTmF2Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZWdvYnNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2F1dGgvc2VydmljZXMvcmVnb2JzLWF1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgU21hcnRDaGFuZ2VzIH0gZnJvbSAnc3JjL2FwcC9jb3JlL2hlbHBlcnMvc2ltcGxlLWNoYW5nZXMuaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNlbmQtYnV0dG9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2VuZC1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NlbmQtYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbmRCdXR0b25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcblxyXG4gIC8vIGdldCBpc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gIC8vICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5pc1JlZ2lzdHJhdGlvbkVtcHR5KHRoaXMucmVnaXN0cmF0aW9uKTtcclxuICAvLyB9XHJcbiAgaXNFbXB0eTogYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAvLyBUT0RPOiBIdm9yZm9yIGRpc2FibGVkIGh2aXMgbWFuIGhvbGRlciBww6Ugw6UgbG9nZ2UgaW5uP1xyXG4gICAgcmV0dXJuIHRoaXMuaXNFbXB0eSB8fCB0aGlzLmlzU2VuZGluZyB8fCB0aGlzLmlzTG9nZ2luZ0luO1xyXG4gIH1cclxuXHJcbiAgaXNTZW5kaW5nID0gZmFsc2U7XHJcbiAgaXNMb2dnaW5nSW4gPSBmYWxzZTtcclxuXHJcbiAgcHJpdmF0ZSBuZ0Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2Q29udHJvbGxlcjogTmF2Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc1NlbmRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNMb2dnaW5nSW4gPSBmYWxzZTtcclxuICAgIHRoaXMucmVnb2JzQXV0aFNlcnZpY2UuaXNMb2dnaW5nSW4kXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5pc0xvZ2dpbmdJbiA9IHZhbDtcclxuICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMgJiBTbWFydENoYW5nZXM8dGhpcz4pOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLnJlZ2lzdHJhdGlvbj8uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5pc0VtcHR5KGNoYW5nZXMucmVnaXN0cmF0aW9uLmN1cnJlbnRWYWx1ZSkudGhlbigoZW1wdHkpID0+IHtcclxuICAgICAgICB0aGlzLmlzRW1wdHkgPSBlbXB0eTtcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZW5kKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLmlzU2VuZGluZykge1xyXG4gICAgICB0aGlzLmlzU2VuZGluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgdXNlclNldHRpbmdzID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zZW5kUmVnaXN0cmF0aW9uKFxyXG4gICAgICAgICAgICB1c2VyU2V0dGluZ3MuYXBwTW9kZSxcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbmRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuXHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldChbXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5ERUxFVEUnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREVMRVRFX0NPTkZJUk0nLFxyXG4gICAgICAgICdBTEVSVC5PSycsXHJcbiAgICAgICAgJ0FMRVJULkNBTkNFTCdcclxuICAgICAgXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBoZWFkZXI6IHRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkRFTEVURSddLFxyXG4gICAgICBtZXNzYWdlOiB0cmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5ERUxFVEVfQ09ORklSTSddLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydBTEVSVC5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnLFxyXG4gICAgICAgICAgY3NzQ2xhc3M6ICdzZWNvbmRhcnknXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0FMRVJULk9LJ10sXHJcbiAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5kZWxldGVSZWdpc3RyYXRpb25Gcm9tT2ZmbGluZVN0b3JhZ2UoXHJcbiAgICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24uaWRcclxuICAgICAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZVJvb3QoJycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWZvb3RlciAqbmdJZj1cInJlZ2lzdHJhdGlvblwiPlxyXG4gIDxpb24tdG9vbGJhcj5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIGNsYXNzPVwic2VuZC1idXR0b24tY29sXCIgc2l6ZT1cIjEyXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cInNlbmQoKVwiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInNlbmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJlZ2lzdHJhdGlvbi5zeW5jRXJyb3JcIj57e1wiUkVHSVNUUkFUSU9OLlJFU0VORFwiIHwgdHJhbnNsYXRlfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXJlZ2lzdHJhdGlvbi5zeW5jRXJyb3JcIj57e1wiUkVHSVNUUkFUSU9OLlNFTkRcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJkZWxldGUtYnV0dG9uLWNvbCBpb24tbm8tcGFkZGluZyBpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkZWxldGUoKVwiIGNvbG9yPVwiZGFya1wiIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiPlxyXG4gICAgICAgICAgICA8IS0tIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPiAtLT5cclxuICAgICAgICAgICAgPHN2Zy1pY29uIHNsb3Q9XCJzdGFydFwiIHNyYz1cIi9hc3NldHMvaWNvbi9kZWxldGUuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAge3tcIlJFR0lTVFJBVElPTi5ERUxFVEVcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWZvb3Rlcj4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIENoYW5nZURldGVjdG9yUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJU3VtbWFyeUl0ZW0gfSBmcm9tICcuL3N1bW1hcnktaXRlbS5tb2RlbCc7XHJcbmltcG9ydCB7IE5hdkNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcbmltcG9ydCB7IGZvcmtKb2luLCBtYXAsIG9mLCBzd2l0Y2hNYXAsIHRha2UsIHRha2VVbnRpbCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBdHRhY2htZW50VXBsb2FkRWRpdE1vZGVsIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbFdpdGhCbG9iIH0gZnJvbSAnLi4vYWRkLXBpY3R1cmUtaXRlbS9hZGQtcGljdHVyZS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnU3VtbWFyeUl0ZW1Db21wb25lbnQnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zdW1tYXJ5LWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdW1tYXJ5LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N1bW1hcnktaXRlbS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdW1tYXJ5SXRlbUNvbXBvbmVudCBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW06IElTdW1tYXJ5SXRlbTtcclxuICBASW5wdXQoKSByZWFkb25seSA9IGZhbHNlO1xyXG5cclxuICBhdHRhY2htZW50czogQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbFdpdGhCbG9iW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmF2Q29udHJvbGxlcjogTmF2Q29udHJvbGxlciwgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBsb2dnZXI6IExvZ2dpbmdTZXJ2aWNlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICBpZiAodGhpcy5pdGVtPy5hdHRhY2htZW50cyAhPSBudWxsKSB7XHJcbiAgICAgIG9mKHRoaXMuaXRlbS5hdHRhY2htZW50cylcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcCgoYXR0YWNobWVudHMpID0+IGF0dGFjaG1lbnRzLmZpbHRlcigoYSkgPT4gYS50eXBlID09PSAnbmV3JykubWFwKChhKSA9PiBhLmF0dGFjaG1lbnQgYXMgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbCkpLFxyXG4gICAgICAgICAgc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT5cclxuICAgICAgICAgICAgYXR0YWNobWVudHMubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgPyBvZihbXSlcclxuICAgICAgICAgICAgICA6IGZvcmtKb2luKFtcclxuICAgICAgICAgICAgICAgICAgLi4uYXR0YWNobWVudHMubWFwKChhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UuZ2V0QmxvYih0aGlzLml0ZW0uaWQsIGEuaWQpLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKChibG9iKSA9PiAoeyAuLi5hLCBibG9iIH0pKSxcclxuICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnIsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCBnZXQgYmxvYiBmcm9tIGF0dGFjaG1lbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHsgLi4uYSwgYmxvYjogdW5kZWZpbmVkIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmF0dGFjaG1lbnRzID0gcmVzdWx0O1xyXG4gICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGUoKSB7XHJcbiAgICBpZiAoIXRoaXMucmVhZG9ubHkpIHtcclxuICAgICAgdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlRm9yd2FyZChbdGhpcy5pdGVtLmhyZWYsIHRoaXMuaXRlbS5pZF0sIHtcclxuICAgICAgICBxdWVyeVBhcmFtczogdGhpcy5pdGVtLnF1ZXJ5UGFyYW1zXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0gY2xhc3M9XCJzdW1tYXJ5LWl0ZW1cIiAoY2xpY2spPVwibmF2aWdhdGUoKVwiIFtkZXRhaWxdPVwiIXJlYWRvbmx5XCIgKm5nSWY9XCIhKHJlYWRvbmx5ICYmICFpdGVtLmhhc0RhdGEpXCI+XHJcbiAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi1wYWRkaW5nLXZlcnRpY2FsIGlvbi1wYWRkaW5nLWVuZFwiPlxyXG4gICAgPGgyPnt7IGl0ZW0udGl0bGUgfCB0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICA8cCAqbmdJZj1cIml0ZW0uc3ViVGl0bGVcIj5cclxuICAgICAge3sgaXRlbS5zdWJUaXRsZSB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9wPlxyXG4gICAgPHAgY2xhc3M9XCJpbWFnZXNcIiAqbmdJZj1cImF0dGFjaG1lbnRzXCI+XHJcbiAgICAgIDxyby1ibG9iLWltYWdlICAqbmdGb3I9XCJsZXQgYXR0YWNobWVudCBvZiBhdHRhY2htZW50c1wiIFtpbWdCbG9iXT1cImF0dGFjaG1lbnQuYmxvYlwiPjwvcm8tYmxvYi1pbWFnZT5cclxuICAgIDwvcD5cclxuICA8L2lvbi1sYWJlbD5cclxuICA8aW9uLWljb24gKm5nSWY9XCJpdGVtLmhhc0RhdGEgJiYgIXJlYWRvbmx5XCIgc2xvdD1cImVuZFwiIGNvbG9yPVwic3VjY2Vzc1wiIG5hbWU9XCJjaGVja21hcmstY2lyY2xlXCI+PC9pb24taWNvbj5cclxuPC9pb24taXRlbT4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE92ZXJ2aWV3UGFnZSB9IGZyb20gJy4vb3ZlcnZpZXcucGFnZSc7XHJcbmltcG9ydCB7IFNlbmRCdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbmQtYnV0dG9uL3NlbmQtYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN1bW1hcnlJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zdW1tYXJ5LWl0ZW0vc3VtbWFyeS1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGYWlsZWRSZWdpc3RyYXRpb25Db21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ZhaWxlZC1yZWdpc3RyYXRpb24vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTYXZlQXNEcmFmdFJvdXRlR3VhcmQgfSBmcm9tICcuLi9zYXZlLWFzLWRyYWZ0Lmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBPdmVydmlld1BhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbU2F2ZUFzRHJhZnRSb3V0ZUd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE92ZXJ2aWV3UGFnZSxcclxuICAgIFNlbmRCdXR0b25Db21wb25lbnQsXHJcbiAgICBTdW1tYXJ5SXRlbUNvbXBvbmVudCxcclxuICAgIEZhaWxlZFJlZ2lzdHJhdGlvbkNvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE92ZXJ2aWV3UGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlXHJcbn0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgVXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IElTdW1tYXJ5SXRlbSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3VtbWFyeUl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3VtbWFyeS1pdGVtLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcbmltcG9ydCBkZWVwRXF1YWwgZnJvbSAnZmFzdC1kZWVwLWVxdWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW92ZXJ2aWV3JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb3ZlcnZpZXcucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vdmVydmlldy5wYWdlLnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3ZlcnZpZXdQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIFJlZ2lzdGF0aW9uVGlkID0gUmVnaXN0cmF0aW9uVGlkO1xyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuICBSZWdpc3RyYXRpb25TdGF0dXMgPSBTeW5jU3RhdHVzO1xyXG4gIHN1bW1hcnlJdGVtczogQXJyYXk8SVN1bW1hcnlJdGVtPiA9IFtdO1xyXG4gIHByaXZhdGUgcmVnaXN0cmF0aW9uJDogT2JzZXJ2YWJsZTxJUmVnaXN0cmF0aW9uPjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBzdW1tYXJ5SXRlbVNlcnZpY2U6IFN1bW1hcnlJdGVtU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlckdyb3VwU2VydmljZTogVXNlckdyb3VwU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24kID0gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uJC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKS5zdWJzY3JpYmUoKHJlZ2lzdHJhdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZ2lzdHJhdGlvbjtcclxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluaXRTdW1tYXJ5SXRlbVN1YnNjcmlwdGlvbigpO1xyXG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLnVwZGF0ZVVzZXJHcm91cHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFN1bW1hcnlJdGVtU3Vic2NyaXB0aW9uKCkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgocmVnKSA9PlxyXG4gICAgICAgICAgY29tYmluZUxhdGVzdChbdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldFVzZXJHcm91cHNBc09ic2VydmFibGUoKSwgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5nZXRBdHRhY2htZW50cyhyZWcuaWQpXSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChbdXNlckdyb3Vwc10pID0+IGZyb20odGhpcy5zdW1tYXJ5SXRlbVNlcnZpY2UuZ2V0U3VtbWFyeUl0ZW1zKHJlZywgdXNlckdyb3VwcykpKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IGRlZXBFcXVhbChhLCBiKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChzdW1tYXJ5SXRlbXMpID0+IHtcclxuICAgICAgICB0aGlzLnN1bW1hcnlJdGVtcyA9IHN1bW1hcnlJdGVtcztcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUZ1bmN0aW9uKGluZGV4OiBudW1iZXIsIGl0ZW06IElTdW1tYXJ5SXRlbSkge1xyXG4gICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW0uaHJlZjtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3tcIlJFR0lTVFJBVElPTi5PVkVSVklFVy5USVRMRVwiIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlZ2lzdHJhdGlvblwiPlxyXG4gIDxpb24tY29udGVudD5cclxuICAgIDxhcHAtZmFpbGVkLXJlZ2lzdHJhdGlvbiAqbmdJZj1cInJlZ2lzdHJhdGlvbi5zeW5jRXJyb3IgJiYgcmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFJlZ2lzdHJhdGlvblN0YXR1cy5TeW5jXCJcclxuICAgICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIj48L2FwcC1mYWlsZWQtcmVnaXN0cmF0aW9uPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7XCJSRUdJU1RSQVRJT04uT1ZFUlZJRVcuTVlfT0JTRVJWQVRJT05cIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXN1bW1hcnktaXRlbSBbcmVhZG9ubHldPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFJlZ2lzdHJhdGlvblN0YXR1cy5TeW5jXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdW1tYXJ5SXRlbXM7IHRyYWNrQnk6IHRyYWNrQnlGdW5jdGlvblwiIFtpdGVtXT1cIml0ZW1cIj48L2FwcC1zdW1tYXJ5LWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvaW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1zZW5kLWJ1dHRvbiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLXNlbmQtYnV0dG9uPlxyXG48L25nLWNvbnRhaW5lcj4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==