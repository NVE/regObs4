"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_user-settings_user-settings_module_ts"],{

/***/ 2464:
/*!************************************************************************!*\
  !*** ./src/app/modules/shared/services/app-reset/app-reset.service.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppResetService": function() { return /* binding */ AppResetService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_db_helper_db_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../core/services/db-helper/db-helper.service */ 39905);
/* harmony import */ var _logging_logging_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logging/logging.service */ 93042);
/* harmony import */ var _logging_log_level_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logging/log-level.model */ 73465);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);







const DEBUG_TAG = 'AppResetService';
class AppResetService {
    constructor(services, dbHelperService, loggingService) {
        this.services = services;
        this.dbHelperService = dbHelperService;
        this.loggingService = loggingService;
    }
    resetApp() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            yield Promise.all(this.services.map((s) => Promise.resolve(s.appOnReset())));
            yield this.dbHelperService.resetDb((table) => {
                this.loggingService.log(`Error reset table ${table}`, null, _logging_log_level_model__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, DEBUG_TAG);
            });
            yield Promise.all(this.services.map((s) => Promise.resolve(s.appOnResetComplete ? s.appOnResetComplete() : true)));
        });
    }
}
AppResetService.ɵfac = function AppResetService_Factory(t) { return new (t || AppResetService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"]('OnReset'), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_core_services_db_helper_db_helper_service__WEBPACK_IMPORTED_MODULE_0__.DbHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_logging_logging_service__WEBPACK_IMPORTED_MODULE_1__.LoggingService)); };
AppResetService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: AppResetService, factory: AppResetService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 82574:
/*!*************************************************************!*\
  !*** ./src/app/pages/user-settings/user-settings.module.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSettingsPageModule": function() { return /* binding */ UserSettingsPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _user_settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-settings.page */ 42839);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/components/input/select/select.component */ 94990);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/shared/pipes/format-date/format-date.pipe */ 16531);












const routes = [
    {
        path: '',
        component: _user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage
    }
];
class UserSettingsPageModule {
}
UserSettingsPageModule.ɵfac = function UserSettingsPageModule_Factory(t) { return new (t || UserSettingsPageModule)(); };
UserSettingsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: UserSettingsPageModule });
UserSettingsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](UserSettingsPageModule, { declarations: [_user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage], imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule] }); })();
_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetComponentScope"](_user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage, [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_3__.SelectComponent], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe]);


/***/ }),

/***/ 42839:
/*!***********************************************************!*\
  !*** ./src/app/pages/user-settings/user-settings.page.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserSettingsPage": function() { return /* binding */ UserSettingsPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _core_services_app_version_app_version_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/app-version/app-version.service */ 58647);
/* harmony import */ var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/services/logging/logging.service */ 93042);
/* harmony import */ var _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/shared/services/logging/log-level.model */ 73465);
/* harmony import */ var _modules_shared_services_app_reset_app_reset_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/shared/services/app-reset/app-reset.service */ 2464);
/* harmony import */ var src_app_modules_shared_services_logging_file_logging_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/shared/services/logging/file-logging.service */ 90654);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);




















function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " GPS debug ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-toggle", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template_ion_toggle_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3); return ctx_r3.userSettings.featureToggeGpsDebug = $event; })("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template_ion_toggle_ngModelChange_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3); return ctx_r5.updateSettings(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r2.userSettings.featureToggeGpsDebug);
} }
function UserSettingsPage_ion_content_7_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_item_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r6.versionClick(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-text", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-text", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "app-select", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectedValueChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_app_select_selectedValueChange_16_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r8.userSettings.appMode = $event; })("selectedValueChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_app_select_selectedValueChange_16_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r9.updateSettings(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "ion-toggle", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_toggle_ngModelChange_21_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r10.userSettings.useRetinaMap = $event; })("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_toggle_ngModelChange_21_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r11.updateSettings(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](22, UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template, 4, 1, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "ion-list", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r12.updateDropdowns(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "ion-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_28_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r13.sendLogs(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30, " Send logger til Regobs Team ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "ion-button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2); return ctx_r14.confirmReset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](32, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 17, "SETTINGS.APP_VERSION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r1.version.version, " (", ctx_r1.version.buildNumber, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r1.version.revision, " - ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 21, ctx_r1.version.date)), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 23, "SETTINGS.APPMODE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("selectedValue", ctx_r1.userSettings.appMode)("options", ctx_r1.appModeOptions)("showReset", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](20, 25, "SETTINGS.USE_RETINA_MAP"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r1.userSettings.useRetinaMap);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.userSettings.featureToggleDeveloperMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](27, 27, "SETTINGS.UPDATE_DROPDOWNS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](34, 29, "SETTINGS.RESET"), " ");
} }
function UserSettingsPage_ion_content_7_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-content", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-toggle", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r15.userSettings.emailReceipt = $event; })("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r17.updateSettings(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "ion-toggle", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r18.userSettings.consentForSendingAnalytics = $event; })("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r19.updateSettings(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_Template_ion_button_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r20.toggleAdvanced(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, UserSettingsPage_ion_content_7_ng_container_16_Template, 35, 31, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 7, "SETTINGS.EMAIL_RECEIPT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.userSettings.emailReceipt);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 9, "SETTINGS.ALLOW_ANALYTICS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.userSettings.consentForSendingAnalytics);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("name", ctx_r0.showAdvanced ? "chevron-up" : "chevron-down");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 11, ctx_r0.showAdvanced ? "SETTINGS.HIDE_ADVANCED" : "SETTINGS.SHOW_ADVANCED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.showAdvanced);
} }
const DEBUG_TAG = 'UserSettingsPage';
const TAPS_TO_ENABLE_TEST_MODE = 7;
class UserSettingsPage {
    constructor(userSettingService, kdvService, ngZone, loggingService, translateService, alertController, appVersionService, loadingController, appResetService, navController, fileLoggingService) {
        this.userSettingService = userSettingService;
        this.kdvService = kdvService;
        this.ngZone = ngZone;
        this.loggingService = loggingService;
        this.translateService = translateService;
        this.alertController = alertController;
        this.appVersionService = appVersionService;
        this.loadingController = loadingController;
        this.appResetService = appResetService;
        this.navController = navController;
        this.fileLoggingService = fileLoggingService;
        this.showAdvanced = false;
        this.isUpdating = false;
        this.subscriptions = [];
        this.versionClicks = 0;
    }
    get appModeOptions() {
        const options = [
            { id: 'PROD', text: 'Regobs' },
            { id: 'DEMO', text: 'Demo Regobs' },
            {
                id: 'TEST',
                text: 'Test Regobs',
                disabled: !this.userSettings.featureToggleDeveloperMode
            }
        ];
        return options;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.versionClicks = 0;
            this.subscriptions.push(this.userSettingService.userSetting$.subscribe((val) => {
                this.ngZone.run(() => {
                    this.userSettings = val;
                });
            }));
            const appver = yield this.appVersionService.getAppVersion();
            this.ngZone.run(() => {
                this.version = appver;
            });
        });
    }
    ngOnDestroy() {
        this.stopSubscriptions();
    }
    stopSubscriptions() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }
    versionClick() {
        this.versionClicks++;
        if (this.versionClicks >= TAPS_TO_ENABLE_TEST_MODE &&
            !this.userSettings.featureToggleDeveloperMode) {
            this.userSettings.featureToggleDeveloperMode = true;
            this.updateSettings();
        }
    }
    updateSettings() {
        this.userSettingService.saveUserSettings(this.userSettings);
    }
    toggleAdvanced() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.showAdvanced = !this.showAdvanced;
        });
    }
    updateDropdowns() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.isUpdating = true;
            this.kdvService.update();
            yield this.showKdvElementsUpdated(true);
            this.ngZone.run(() => {
                this.isUpdating = false;
            });
        });
    }
    sendLogs() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.fileLoggingService.sendLogsByEmail();
        });
    }
    showKdvElementsUpdated(ok) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService
                .get([
                'SETTINGS.DROPDOWNS_UPDATED',
                'SETTINGS.DROPDOWNS_FAILED',
                'ALERT.OK'
            ])
                .toPromise();
            const alert = yield this.alertController.create({
                message: ok
                    ? translations['SETTINGS.DROPDOWNS_UPDATED']
                    : translations['SETTINGS.DROPDOWNS_FAILED'],
                buttons: [translations['ALERT.OK']]
            });
            alert.present();
            return alert.onDidDismiss();
        });
    }
    confirmReset() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService
                .get(['SETTINGS.CONFIRM_RESET', 'ALERT.OK', 'ALERT.CANCEL'])
                .toPromise();
            const alert = yield this.alertController.create({
                message: translations['SETTINGS.CONFIRM_RESET'],
                buttons: [
                    {
                        text: translations['ALERT.OK'],
                        handler: () => this.reset()
                    },
                    {
                        text: translations['ALERT.CANCEL'],
                        role: 'cancel'
                    }
                ]
            });
            alert.present();
        });
    }
    reset() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            const message = yield this.translateService
                .get('SETTINGS.RESETTING')
                .toPromise();
            const loading = yield this.loadingController.create({
                message
            });
            loading.present();
            this.isUpdating = true;
            // TODO: Implement some kind of subscription manager to stop all subscriptions and resubscribe when complete
            try {
                yield this.doReset();
            }
            catch (err) {
                this.loggingService.log('Could not reset db', err, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);
            }
            this.ngZone.run(() => {
                this.isUpdating = false;
                loading.dismiss();
                this.navController.navigateRoot('start-wizard');
            });
        });
    }
    doReset() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.stopSubscriptions();
            return this.appResetService.resetApp();
        });
    }
}
UserSettingsPage.ɵfac = function UserSettingsPage_Factory(t) { return new (t || UserSettingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_app_version_app_version_service__WEBPACK_IMPORTED_MODULE_2__.AppVersionService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_modules_shared_services_app_reset_app_reset_service__WEBPACK_IMPORTED_MODULE_5__.AppResetService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_file_logging_service__WEBPACK_IMPORTED_MODULE_6__.FileLoggingService)); };
UserSettingsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: UserSettingsPage, selectors: [["app-user-settings"]], decls: 8, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["defaultHref", "/", "text", ""], ["class", "ion-padding", 4, "ngIf"], [1, "ion-padding"], ["lines", "full"], ["slot", "end", 3, "ngModel", "ngModelChange"], ["fill", "clear", "expand", "full", 3, "click"], ["slot", "start", 3, "name"], [4, "ngIf"], [3, "click"], ["position", "stacked", "color", "medium", 1, "ion-text-uppercase"], [1, "build-version"], ["color", "medium", 1, "build-rev", "ion-align-self-start"], [3, "selectedValue", "options", "showReset", "selectedValueChange"], ["lines", "none"], ["expand", "block", 3, "disabled", "click"], ["slot", "start", "name", "refresh"], ["slot", "start", "name", "mail-outline"], ["color", "danger", "expand", "block", 1, "reset-button", 3, "disabled", "click"], ["slot", "start", "name", "medkit"]], template: function UserSettingsPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, UserSettingsPage_ion_content_7_Template, 17, 13, "ion-content", 3);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 2, "SETTINGS.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.userSettings);
    } }, styles: [".reset-button[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\nion-button.button-block[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\nion-item.item-label[_ngcontent-%COMP%]   ion-text.ion-align-self-start.build-version[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\nion-item.item-label[_ngcontent-%COMP%]   ion-text.ion-align-self-start.build-rev[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-top: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0NBQUE7QUFDSjs7QUFPZTtFQUNLLGVBQUE7RUFDQSxrQkFBQTtBQUpwQjs7QUFNZ0I7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQUpwQiIsImZpbGUiOiJ1c2VyLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXNldC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbmlvbi1idXR0b24uYnV0dG9uLWJsb2NrIHtcclxuICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcblxyXG4gICAgJi5pdGVtLWxhYmVsIHtcclxuICAgICAgICBpb24tdGV4dCB7XHJcbiAgICAgICAgICAgICYuaW9uLWFsaWduLXNlbGYtc3RhcnQge1xyXG4gICAgICAgICAgICAgICAmLmJ1aWxkLXZlcnNpb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAmLmJ1aWxkLXJldiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc191c2VyLXNldHRpbmdzX3VzZXItc2V0dGluZ3NfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRXdGO0FBQzVCO0FBQ047Ozs7QUFFdEQsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7QUFLN0IsTUFBTSxlQUFlO0lBQzFCLFlBQzZCLFFBQW1CLEVBQ3RDLGVBQWdDLEVBQ2hDLGNBQThCO1FBRlgsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUN0QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQ3JDLENBQUM7SUFFRSxRQUFROztZQUNaLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUMxRCxDQUFDO1lBQ0YsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIscUJBQXFCLEtBQUssRUFBRSxFQUM1QixJQUFJLEVBQ0osc0VBQWdCLEVBQ2hCLFNBQVMsQ0FDVixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUN0QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUN0RSxDQUNGLENBQUM7UUFDSixDQUFDO0tBQUE7OzhFQXhCVSxlQUFlLHlEQUVoQixTQUFTO2dIQUZS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QUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsNEdBQTRHO1lBQzVHLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDckIsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCw4RkFBZ0IsRUFDaEIsU0FBUyxDQUNWLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFYSxPQUFPOztZQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDekMsQ0FBQztLQUFBOztnRkFqS1UsZ0JBQWdCOzhHQUFoQixnQkFBZ0I7UUMzQjdCLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFDYiw4SEFvRWM7O1FBeEVSLDBEQUNGO1FBREUsNkpBQ0Y7UUFHOEIsMERBQWtCO1FBQWxCLGtGQUFrQiIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2FwcC1yZXNldC9hcHAtcmVzZXQuc2VydmljZS50cyIsIi4vc3JjL2FwcC9wYWdlcy91c2VyLXNldHRpbmdzL3VzZXItc2V0dGluZ3MubW9kdWxlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL3VzZXItc2V0dGluZ3MvdXNlci1zZXR0aW5ncy5wYWdlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL3VzZXItc2V0dGluZ3MvdXNlci1zZXR0aW5ncy5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uUmVzZXQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL29uLXJlc2V0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERiSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvZGItaGVscGVyL2RiLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0FwcFJlc2V0U2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSZXNldFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdCgnT25SZXNldCcpIHByaXZhdGUgc2VydmljZXM6IE9uUmVzZXRbXSxcclxuICAgIHByaXZhdGUgZGJIZWxwZXJTZXJ2aWNlOiBEYkhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgcmVzZXRBcHAoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgdGhpcy5zZXJ2aWNlcy5tYXAoKHMpID0+IFByb21pc2UucmVzb2x2ZShzLmFwcE9uUmVzZXQoKSkpXHJcbiAgICApO1xyXG4gICAgYXdhaXQgdGhpcy5kYkhlbHBlclNlcnZpY2UucmVzZXREYigodGFibGUpID0+IHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgYEVycm9yIHJlc2V0IHRhYmxlICR7dGFibGV9YCxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIExvZ0xldmVsLldhcm5pbmcsXHJcbiAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICB0aGlzLnNlcnZpY2VzLm1hcCgocykgPT5cclxuICAgICAgICBQcm9taXNlLnJlc29sdmUocy5hcHBPblJlc2V0Q29tcGxldGUgPyBzLmFwcE9uUmVzZXRDb21wbGV0ZSgpIDogdHJ1ZSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ3NQYWdlIH0gZnJvbSAnLi91c2VyLXNldHRpbmdzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBVc2VyU2V0dGluZ3NQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVXNlclNldHRpbmdzUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFVzZXJTZXR0aW5nc1BhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmcgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy91c2VyLXNldHRpbmdzLm1vZGVsJztcclxuaW1wb3J0IHtcclxuICBOYXZDb250cm9sbGVyLFxyXG4gIEFsZXJ0Q29udHJvbGxlcixcclxuICBMb2FkaW5nQ29udHJvbGxlclxyXG59IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQXBwVmVyc2lvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2FwcC12ZXJzaW9uL2FwcC12ZXJzaW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBcHBWZXJzaW9uIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbHMvYXBwLXZlcnNpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5pbXBvcnQgeyBBcHBSZXNldFNlcnZpY2UgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9hcHAtcmVzZXQvYXBwLXJlc2V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgRmlsZUxvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2ZpbGUtbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdVc2VyU2V0dGluZ3NQYWdlJztcclxuY29uc3QgVEFQU19UT19FTkFCTEVfVEVTVF9NT0RFID0gNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXVzZXItc2V0dGluZ3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91c2VyLXNldHRpbmdzLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1zZXR0aW5ncy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlclNldHRpbmdzUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICB1c2VyU2V0dGluZ3M6IFVzZXJTZXR0aW5nO1xyXG4gIHNob3dBZHZhbmNlZCA9IGZhbHNlO1xyXG4gIGlzVXBkYXRpbmcgPSBmYWxzZTtcclxuICB2ZXJzaW9uOiBBcHBWZXJzaW9uO1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBwcml2YXRlIHZlcnNpb25DbGlja3MgPSAwO1xyXG5cclxuICBnZXQgYXBwTW9kZU9wdGlvbnMoKSB7XHJcbiAgICBjb25zdCBvcHRpb25zOiBTZWxlY3RPcHRpb25bXSA9IFtcclxuICAgICAgeyBpZDogJ1BST0QnLCB0ZXh0OiAnUmVnb2JzJyB9LFxyXG4gICAgICB7IGlkOiAnREVNTycsIHRleHQ6ICdEZW1vIFJlZ29icycgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiAnVEVTVCcsXHJcbiAgICAgICAgdGV4dDogJ1Rlc3QgUmVnb2JzJyxcclxuICAgICAgICBkaXNhYmxlZDogIXRoaXMudXNlclNldHRpbmdzLmZlYXR1cmVUb2dnbGVEZXZlbG9wZXJNb2RlXHJcbiAgICAgIH1cclxuICAgIF07XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGFwcFZlcnNpb25TZXJ2aWNlOiBBcHBWZXJzaW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9hZGluZ0NvbnRyb2xsZXI6IExvYWRpbmdDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBhcHBSZXNldFNlcnZpY2U6IEFwcFJlc2V0U2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2Q29udHJvbGxlcjogTmF2Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgZmlsZUxvZ2dpbmdTZXJ2aWNlOiBGaWxlTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy52ZXJzaW9uQ2xpY2tzID0gMDtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyQuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy51c2VyU2V0dGluZ3MgPSB2YWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgY29uc3QgYXBwdmVyID0gYXdhaXQgdGhpcy5hcHBWZXJzaW9uU2VydmljZS5nZXRBcHBWZXJzaW9uKCk7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnZlcnNpb24gPSBhcHB2ZXI7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zdG9wU3Vic2NyaXB0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdG9wU3Vic2NyaXB0aW9ucygpIHtcclxuICAgIGZvciAoY29uc3Qgc3Vic2NyaXB0aW9uIG9mIHRoaXMuc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdmVyc2lvbkNsaWNrKCkge1xyXG4gICAgdGhpcy52ZXJzaW9uQ2xpY2tzKys7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudmVyc2lvbkNsaWNrcyA+PSBUQVBTX1RPX0VOQUJMRV9URVNUX01PREUgJiZcclxuICAgICAgIXRoaXMudXNlclNldHRpbmdzLmZlYXR1cmVUb2dnbGVEZXZlbG9wZXJNb2RlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy51c2VyU2V0dGluZ3MuZmVhdHVyZVRvZ2dsZURldmVsb3Blck1vZGUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVwZGF0ZVNldHRpbmdzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTZXR0aW5ncygpIHtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnNhdmVVc2VyU2V0dGluZ3ModGhpcy51c2VyU2V0dGluZ3MpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdG9nZ2xlQWR2YW5jZWQoKSB7XHJcbiAgICB0aGlzLnNob3dBZHZhbmNlZCA9ICF0aGlzLnNob3dBZHZhbmNlZDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZURyb3Bkb3ducygpIHtcclxuICAgIHRoaXMuaXNVcGRhdGluZyA9IHRydWU7XHJcbiAgICB0aGlzLmtkdlNlcnZpY2UudXBkYXRlKCk7XHJcbiAgICBhd2FpdCB0aGlzLnNob3dLZHZFbGVtZW50c1VwZGF0ZWQodHJ1ZSk7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2VuZExvZ3MoKSB7XHJcbiAgICB0aGlzLmZpbGVMb2dnaW5nU2VydmljZS5zZW5kTG9nc0J5RW1haWwoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dLZHZFbGVtZW50c1VwZGF0ZWQob2s6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFtcclxuICAgICAgICAnU0VUVElOR1MuRFJPUERPV05TX1VQREFURUQnLFxyXG4gICAgICAgICdTRVRUSU5HUy5EUk9QRE9XTlNfRkFJTEVEJyxcclxuICAgICAgICAnQUxFUlQuT0snXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZTogb2tcclxuICAgICAgICA/IHRyYW5zbGF0aW9uc1snU0VUVElOR1MuRFJPUERPV05TX1VQREFURUQnXVxyXG4gICAgICAgIDogdHJhbnNsYXRpb25zWydTRVRUSU5HUy5EUk9QRE9XTlNfRkFJTEVEJ10sXHJcbiAgICAgIGJ1dHRvbnM6IFt0cmFuc2xhdGlvbnNbJ0FMRVJULk9LJ11dXHJcbiAgICB9KTtcclxuICAgIGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIHJldHVybiBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldCgpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFsnU0VUVElOR1MuQ09ORklSTV9SRVNFVCcsICdBTEVSVC5PSycsICdBTEVSVC5DQU5DRUwnXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlOiB0cmFuc2xhdGlvbnNbJ1NFVFRJTkdTLkNPTkZJUk1fUkVTRVQnXSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snQUxFUlQuT0snXSxcclxuICAgICAgICAgIGhhbmRsZXI6ICgpID0+IHRoaXMucmVzZXQoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydBTEVSVC5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGFsZXJ0LnByZXNlbnQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KCkge1xyXG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KCdTRVRUSU5HUy5SRVNFVFRJTkcnKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBsb2FkaW5nID0gYXdhaXQgdGhpcy5sb2FkaW5nQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlXHJcbiAgICB9KTtcclxuICAgIGxvYWRpbmcucHJlc2VudCgpO1xyXG4gICAgdGhpcy5pc1VwZGF0aW5nID0gdHJ1ZTtcclxuICAgIC8vIFRPRE86IEltcGxlbWVudCBzb21lIGtpbmQgb2Ygc3Vic2NyaXB0aW9uIG1hbmFnZXIgdG8gc3RvcCBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgcmVzdWJzY3JpYmUgd2hlbiBjb21wbGV0ZVxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgdGhpcy5kb1Jlc2V0KCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgJ0NvdWxkIG5vdCByZXNldCBkYicsXHJcbiAgICAgICAgZXJyLFxyXG4gICAgICAgIExvZ0xldmVsLldhcm5pbmcsXHJcbiAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgbG9hZGluZy5kaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZVJvb3QoJ3N0YXJ0LXdpemFyZCcpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGRvUmVzZXQoKSB7XHJcbiAgICB0aGlzLnN0b3BTdWJzY3JpcHRpb25zKCk7XHJcbiAgICByZXR1cm4gdGhpcy5hcHBSZXNldFNlcnZpY2UucmVzZXRBcHAoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiBkZWZhdWx0SHJlZj1cIi9cIiB0ZXh0PVwiXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3tcIlNFVFRJTkdTLlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQgY2xhc3M9XCJpb24tcGFkZGluZ1wiICpuZ0lmPVwidXNlclNldHRpbmdzXCI+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7J1NFVFRJTkdTLkVNQUlMX1JFQ0VJUFQnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5lbWFpbFJlY2VpcHRcIiAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVTZXR0aW5ncygpXCI+PC9pb24tdG9nZ2xlPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7eydTRVRUSU5HUy5BTExPV19BTkFMWVRJQ1MnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5jb25zZW50Rm9yU2VuZGluZ0FuYWx5dGljc1wiIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNldHRpbmdzKClcIj5cclxuICAgICAgPC9pb24tdG9nZ2xlPlxyXG4gICAgPC9pb24taXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxpb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZCgpXCIgZmlsbD1cImNsZWFyXCIgZXhwYW5kPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIFtuYW1lXT1cIihzaG93QWR2YW5jZWQgPyAnY2hldnJvbi11cCcgOiAnY2hldnJvbi1kb3duJylcIj48L2lvbi1pY29uPlxyXG4gICAge3soIHNob3dBZHZhbmNlZCA/ICdTRVRUSU5HUy5ISURFX0FEVkFOQ0VEJyA6ICdTRVRUSU5HUy5TSE9XX0FEVkFOQ0VEJykgfCB0cmFuc2xhdGUgfX1cclxuICA8L2lvbi1idXR0b24+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dBZHZhbmNlZFwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cInZlcnNpb25DbGljaygpXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIiBjb2xvcj1cIm1lZGl1bVwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snU0VUVElOR1MuQVBQX1ZFUlNJT04nIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydFwiIGNsYXNzPVwiYnVpbGQtdmVyc2lvblwiPlxyXG4gICAgICAgICAge3t2ZXJzaW9uLnZlcnNpb24gfX0gKHt7IHZlcnNpb24uYnVpbGROdW1iZXIgfX0pXHJcbiAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8aW9uLXRleHQgY2xhc3M9XCJidWlsZC1yZXYgaW9uLWFsaWduLXNlbGYtc3RhcnRcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICAgICAge3sgdmVyc2lvbi5yZXZpc2lvbiB9fSAtIHt7IHZlcnNpb24uZGF0ZSB8IGZvcm1hdERhdGUgfCBhc3luYyB9fVxyXG4gICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNvbG9yPVwibWVkaXVtXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyBcIlNFVFRJTkdTLkFQUE1PREVcIiB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxhcHAtc2VsZWN0IFsoc2VsZWN0ZWRWYWx1ZSldPVwidXNlclNldHRpbmdzLmFwcE1vZGVcIiBbb3B0aW9uc109XCJhcHBNb2RlT3B0aW9uc1wiXHJcbiAgICAgICAgICAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJ1cGRhdGVTZXR0aW5ncygpXCIgW3Nob3dSZXNldF09XCJmYWxzZVwiPiA8L2FwcC1zZWxlY3Q+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3snU0VUVElOR1MuVVNFX1JFVElOQV9NQVAnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRvZ2dsZSBzbG90PVwiZW5kXCIgWyhuZ01vZGVsKV09XCJ1c2VyU2V0dGluZ3MudXNlUmV0aW5hTWFwXCIgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlU2V0dGluZ3MoKVwiPlxyXG4gICAgICAgIDwvaW9uLXRvZ2dsZT5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwidXNlclNldHRpbmdzLmZlYXR1cmVUb2dnbGVEZXZlbG9wZXJNb2RlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIEdQUyBkZWJ1Z1xyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5mZWF0dXJlVG9nZ2VHcHNEZWJ1Z1wiIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNldHRpbmdzKClcIj5cclxuICAgICAgICA8L2lvbi10b2dnbGU+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwibm9uZVwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBleHBhbmQ9XCJibG9ja1wiIFtkaXNhYmxlZF09XCJpc1VwZGF0aW5nXCIgKGNsaWNrKT1cInVwZGF0ZURyb3Bkb3ducygpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJyZWZyZXNoXCI+PC9pb24taWNvbj5cclxuICAgICAgICB7eyBcIlNFVFRJTkdTLlVQREFURV9EUk9QRE9XTlNcIiB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImJsb2NrXCIgW2Rpc2FibGVkXT1cImlzVXBkYXRpbmdcIiAoY2xpY2spPVwic2VuZExvZ3MoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWFpbC1vdXRsaW5lXCI+PC9pb24taWNvbj5cclxuICAgICAgICBTZW5kIGxvZ2dlciB0aWwgUmVnb2JzIFRlYW1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cInJlc2V0LWJ1dHRvblwiIGNvbG9yPVwiZGFuZ2VyXCIgZXhwYW5kPVwiYmxvY2tcIiBbZGlzYWJsZWRdPVwiaXNVcGRhdGluZ1wiIChjbGljayk9XCJjb25maXJtUmVzZXQoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWVka2l0XCI+PC9pb24taWNvbj5cclxuICAgICAgICB7eyBcIlNFVFRJTkdTLlJFU0VUXCIgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==