"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_legacy-trip_legacy-trip_module_ts"],{

/***/ 44093:
/*!*********************************************************!*\
  !*** ./src/app/pages/legacy-trip/legacy-trip.module.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegacyTripPageModule": function() { return /* binding */ LegacyTripPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/registration/shared-components.module */ 22623);
/* harmony import */ var _legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./legacy-trip.page */ 55217);
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/guards/auth.guard */ 27574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);







const routes = [
    {
        path: '',
        component: _legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__.LegacyTripPage,
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
    }
];
class LegacyTripPageModule {
}
LegacyTripPageModule.ɵfac = function LegacyTripPageModule_Factory(t) { return new (t || LegacyTripPageModule)(); };
LegacyTripPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: LegacyTripPageModule });
LegacyTripPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
            _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](LegacyTripPageModule, { declarations: [_legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__.LegacyTripPage], imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 55217:
/*!*******************************************************!*\
  !*** ./src/app/pages/legacy-trip/legacy-trip.page.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LegacyTripPage": function() { return /* binding */ LegacyTripPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/trip-logger/trip-logger.service */ 3699);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _modules_registration_pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/registration/pages/modal-pages/help-modal/help-modal.page */ 94763);
/* harmony import */ var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/services/logging/logging.service */ 93042);
/* harmony import */ var _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/shared/services/logging/log-level.model */ 73465);
/* harmony import */ var _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nano-sql/core/lib/utilities */ 74556);
/* harmony import */ var _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/services/geo-position/geo-position.service */ 27494);
/* harmony import */ var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_registration_components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/registration/components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../modules/shared/components/input/select/select.component */ 94990);
/* harmony import */ var _modules_registration_components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../modules/registration/components/text-comment/text-comment.component */ 32032);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! angular-svg-icon */ 70459);



























function LegacyTripPage_ion_row_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-list", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "app-kdv-select", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function LegacyTripPage_ion_row_9_Template_app_kdv_select_valueChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r6.tripDto.TripTypeID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "ion-label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "app-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("selectedValueChange", function LegacyTripPage_ion_row_9_Template_app_select_selectedValueChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r8.tripDto.ObservationExpectedMinutes = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "app-text-comment", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function LegacyTripPage_ion_row_9_Template_app_text_comment_valueChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r9.tripDto.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "ion-label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("labelColor", ctx_r0.hasClicked && ctx_r0.tripDto.TripTypeID === undefined ? "danger" : "medium")("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("value", ctx_r0.tripDto.TripTypeID);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", ctx_r0.hasClicked && ctx_r0.tripDto.ObservationExpectedMinutes === undefined ? "danger" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 11, "TRIP.TRIP_END_DESCRIPTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("selectedValue", ctx_r0.tripDto.ObservationExpectedMinutes)("options", ctx_r0.minutes);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("value", ctx_r0.tripDto.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](13, 13, "TRIP.COMMENT_DESCRIPTION"), " ");
} }
function LegacyTripPage_ion_row_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "ion-spinner", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} }
function LegacyTripPage_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-col", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "ion-spinner", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "ion-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ng_container_11_Template_ion_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r10.cancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 1, "ALERT.CANCEL"));
} }
function LegacyTripPage_ion_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_button_22_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r12.startTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r3.isLoading || !ctx_r3.isValid);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "TRIP.START_TRIP"), " ");
} }
function LegacyTripPage_ion_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_button_23_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r14.stopTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r4.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "TRIP.STOP_TRIP"), " ");
} }
function LegacyTripPage_ion_row_24_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_row_24_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](); return ctx_r16.clearPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "svg-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r5.isRunning || ctx_r5.isLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 2, "REGISTRATION.RESET"), " ");
} }
const DEBUG_TAG = 'LegacyTripPage';
class LegacyTripPage {
    constructor(tripLoggerService, ngZone, regobsAuthService, translateService, geoPositionService, navController, modalController, loggingService) {
        this.tripLoggerService = tripLoggerService;
        this.ngZone = ngZone;
        this.regobsAuthService = regobsAuthService;
        this.translateService = translateService;
        this.geoPositionService = geoPositionService;
        this.navController = navController;
        this.modalController = modalController;
        this.loggingService = loggingService;
        this.isRunning = false;
        this.isLoading = false;
        this.hasClicked = false;
        this.isLoadingCurrentPosition = false;
        this.tripDto = {};
    }
    get isValid() {
        return (this.tripDto.ObservationExpectedMinutes !== undefined &&
            this.tripDto.TripTypeID !== undefined &&
            this.currentPosition != null);
    }
    get isEmpty() {
        return _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_6__.IsEmptyHelper.isEmpty(this.tripDto);
    }
    ngOnInit() {
        this.isLoading = false;
        this.setHoursToMidnight();
        this.tripLoggerSubscription = this.tripLoggerService
            .getLegacyTripAsObservable()
            .subscribe((val) => {
            this.ngZone.run(() => {
                if (val) {
                    this.tripDto = val.request;
                    this.isRunning = true;
                }
                else {
                    this.isRunning = false;
                }
            });
        });
        this.initCurrentPosition();
    }
    initCurrentPosition() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.isLoadingCurrentPosition = true;
            try {
                this.currentPosition = yield this.geoPositionService.getSingleCurrentPosition();
                if (this.currentPosition == null) {
                    this.tripLoggerService.showTripNoPositionErrorMessage();
                }
            }
            catch (error) {
                this.loggingService.log('Could not get geolocation', error, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);
                this.tripLoggerService.showTripNoPositionErrorMessage();
            }
            finally {
                this.ngZone.run(() => {
                    this.isLoadingCurrentPosition = false;
                });
            }
        });
    }
    setHoursToMidnight() {
        this.minutes = [];
        for (let i = moment__WEBPACK_IMPORTED_MODULE_1___default()().get('hours'); i <= 24; i++) {
            this.minutes.push({ text: `${i}:00`, id: i * 60 });
        }
    }
    ngOnDestroy() {
        if (this.tripLoggerSubscription) {
            this.tripLoggerSubscription.unsubscribe();
        }
    }
    startTrip() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.cancel();
            if (!this.isValid) {
                this.hasClicked = true;
                return;
            }
            else {
                const loggedInUser = yield this.regobsAuthService.getLoggedInUserAsPromise();
                if (loggedInUser && loggedInUser.isLoggedIn) {
                    this.isLoading = true;
                    // this.tripDto.ObserverGuid = loggedInUser.user.Guid; // TODO: Fix api to use access token for this call
                    this.tripDto.GeoHazardID = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Snow;
                    this.tripDto.DeviceGuid = _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__.uuid();
                    try {
                        if (this.currentPosition && this.currentPosition.coords) {
                            this.tripDto.Lat = this.currentPosition.coords.latitude.toString();
                            this.tripDto.Lng = this.currentPosition.coords.longitude.toString();
                            this.startTripSubscription = this.tripLoggerService
                                .startLegacyTrip(this.tripDto)
                                .subscribe(() => this.navController.navigateRoot('/'), (error) => {
                                this.loggingService.error(error, 'Error when starting trip', DEBUG_TAG);
                                this.tripLoggerService.showTripErrorMessage(true);
                            }, () => {
                                this.ngZone.run(() => {
                                    this.isLoading = false;
                                });
                            });
                        }
                        else {
                            this.isLoading = false;
                            this.tripLoggerService.showTripNoPositionErrorMessage();
                        }
                    }
                    catch (error) {
                        this.isLoading = false;
                        this.loggingService.log('Could not get geolocation', error, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);
                        this.tripLoggerService.showTripNoPositionErrorMessage();
                    }
                }
            }
        });
    }
    cancel() {
        if (this.startTripSubscription && !this.startTripSubscription.closed) {
            this.startTripSubscription.unsubscribe();
            this.startTripSubscription = undefined;
        }
        this.isLoading = false;
    }
    stopTrip() {
        this.cancel();
        this.tripLoggerService.stopLegacyTrip();
    }
    showHelp() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            const translation = yield this.translateService
                .get('TRIP.LEGACY_HELP_TEXT')
                .toPromise();
            const modal = yield this.modalController.create({
                component: _modules_registration_pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__.HelpModalPage,
                componentProps: {
                    helpText: translation
                }
            });
            modal.present();
        });
    }
    clearPage() {
        this.tripDto = {};
        this.initCurrentPosition();
    }
}
LegacyTripPage.ɵfac = function LegacyTripPage_Factory(t) { return new (t || LegacyTripPage)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__.TripLoggerService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_8__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService)); };
LegacyTripPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({ type: LegacyTripPage, selectors: [["app-legacy-trip"]], decls: 25, vars: 12, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [1, "pull-last-bottom", "ion-no-paddig", "ion-no-margin"], [4, "ngIf"], [1, "ion-no-padding"], [1, "ion-text-center"], ["fill", "clear", 3, "click"], [1, "white-background"], ["size", "12", 1, "start-buttons"], ["class", "back-button", "expand", "block", "color", "varsom-orange", 3, "disabled", "click", 4, "ngIf"], ["class", "white-background", 4, "ngIf"], ["lines", "full"], ["title", "TRIP.TRIP_TYPE", "kdvKey", "TripTypeKDV", 3, "labelColor", "disabled", "value", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase", 3, "color"], ["title", "TRIP.TRIP_END_DESCRIPTION", 3, "disabled", "selectedValue", "options", "selectedValueChange"], ["title", "DIALOGS.COMMENT", 3, "disabled", "value", "valueChange"], [1, "ion-text-wrap"], ["name", "dots"], [1, "ion-no-padding", "ion-text-center"], ["fill", "clear", "type", "button", 3, "click"], ["expand", "block", "color", "varsom-orange", 1, "back-button", 3, "disabled", "click"], ["color", "dark", "size", "small", "fill", "clear", 1, "reset-button", 3, "disabled", "click"], ["src", "/assets/icon/reset.svg"]], template: function LegacyTripPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "ion-grid", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, LegacyTripPage_ion_row_9_Template, 14, 15, "ion-row", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, LegacyTripPage_ion_row_10_Template, 3, 0, "ion-row", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, LegacyTripPage_ng_container_11_Template, 9, 3, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "ion-col", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "ion-grid", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "ion-col", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "ion-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_Template_ion_button_click_17_listener() { return ctx.showHelp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "ion-row", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "ion-col", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](22, LegacyTripPage_ion_button_22_Template, 3, 4, "ion-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](23, LegacyTripPage_ion_button_23_Template, 3, 4, "ion-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](24, LegacyTripPage_ion_row_24_Template, 6, 4, "ion-row", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](6, 8, "TRIP.TRIP"));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoadingCurrentPosition);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoading);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](19, 10, "HELP.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isRunning);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isRunning);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_9__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonList, _modules_registration_components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_10__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonLabel, _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_11__.SelectComponent, _modules_registration_components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_12__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonSpinner, angular_svg_icon__WEBPACK_IMPORTED_MODULE_19__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe], styles: [".reset-button[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  margin-bottom: var(--ion-safe-area-bottom, 5px);\n}\n.reset-button[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  display: flex;\n}\n.white-background[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n.start-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlZ2FjeS10cmlwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQUEsK0NBQUE7QUFDSjtBQUNJO0VBQ0ksYUFBQTtBQUNSO0FBR0E7RUFDSSxzQkFBQTtBQUFKO0FBSUk7RUFDSSxnQ0FBQTtBQURSIiwiZmlsZSI6ImxlZ2FjeS10cmlwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXNldC1idXR0b24ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogdmFyKC0taW9uLXNhZmUtYXJlYS1ib3R0b20sIDVweCk7XHJcblxyXG4gICAgc3ZnLWljb24ge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi53aGl0ZS1iYWNrZ3JvdW5kIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5zdGFydC1idXR0b25zIHtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc19sZWdhY3ktdHJpcF9sZWdhY3ktdHJpcF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDdUQ7QUFDVztBQUMyQjtBQUN6QztBQUNLOzs7QUFFekQsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSw2REFBYztRQUN6QixXQUFXLEVBQUUsQ0FBQyw4REFBUyxDQUFDO0tBQ3pCO0NBQ0YsQ0FBQztBQVVLLE1BQU0sb0JBQW9COzt3RkFBcEIsb0JBQW9CO2lIQUFwQixvQkFBb0I7cUhBUHRCO1lBQ1AsdUVBQVk7WUFDWixrR0FBc0I7WUFDdEIsa0VBQXFCLENBQUMsTUFBTSxDQUFDO1NBQzlCO21JQUdVLG9CQUFvQixtQkFGaEIsNkRBQWMsYUFKM0IsdUVBQVk7UUFDWixrR0FBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEIyQztBQUNtQjtBQUc1RDtBQUNvQztBQUNUO0FBQ0E7QUFDaUQ7QUFDakI7QUFDTjtBQUMzQjtBQUNhO0FBRXdCO0FBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7SUNMaEYsMkVBQTRCO0lBQzFCLDhFQUFnQztJQUM5QixnRkFBdUI7SUFDckIsc0ZBRWlDO0lBQS9CLG1XQUE4QjtJQUFDLDZEQUFpQjtJQUNsRCw0RUFBVTtJQUNSLGlGQUMrRDtJQUFBLHdEQUNoRDs7SUFBQSw2REFBWTtJQUMzQixrRkFDd0Q7SUFEUiwrWEFBc0Q7SUFDOUMsNkRBQWE7SUFDdkUsNkRBQVc7SUFDWCx3RkFBMEc7SUFBNUIsa1dBQTJCO0lBQ3pHLDZEQUFtQjtJQUNuQixxRkFBa0I7SUFDaEIsa0ZBQWlDO0lBQy9CLHlEQUNGOztJQUFBLDZEQUFZO0lBQ2QsNkRBQW1CO0lBQ3JCLDZEQUFXO0lBQ2IsNkRBQVU7SUFDWiw2REFBVTs7O0lBbkJZLDJEQUFxRjtJQUFyRiwySkFBcUY7SUFJeEYsMkRBQWdHO0lBQWhHLHNL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UUFDWiw2REFBVTtRQUNWLHNIQVFVO1FBQ1osNkRBQVc7UUFDYiw2REFBVTtRQUNaLDZEQUFVO1FBQ1osNkRBQVc7UUFDYiw2REFBYzs7UUE5RUMsMkRBQTJCO1FBQTNCLCtJQUEyQjtRQUs1QiwyREFBZ0I7UUFBaEIsaUZBQWdCO1FBdUJoQiwyREFBOEI7UUFBOUIsK0ZBQThCO1FBS3pCLDJEQUFlO1FBQWYsZ0ZBQWU7UUFpQjBCLDJEQUE0QjtRQUE1QixrSkFBNEI7UUFLSiwyREFBZ0I7UUFBaEIsaUZBQWdCO1FBSXpFLDJEQUFlO1FBQWYsZ0ZBQWU7UUFNRywyREFBYztRQUFkLCtFQUFjIiwic291cmNlcyI6WyIuL3NyYy9hcHAvcGFnZXMvbGVnYWN5LXRyaXAvbGVnYWN5LXRyaXAubW9kdWxlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL2xlZ2FjeS10cmlwL2xlZ2FjeS10cmlwLnBhZ2UudHMiLCIuL3NyYy9hcHAvcGFnZXMvbGVnYWN5LXRyaXAvbGVnYWN5LXRyaXAucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBMZWdhY3lUcmlwUGFnZSB9IGZyb20gJy4vbGVnYWN5LXRyaXAucGFnZSc7XHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4uLy4uL2NvcmUvZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IExlZ2FjeVRyaXBQYWdlLFxyXG4gICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0xlZ2FjeVRyaXBQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGVnYWN5VHJpcFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENyZWF0ZVRyaXBEdG8gfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgTmF2Q29udHJvbGxlciwgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL2hlbHAtbW9kYWwvaGVscC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICdAbmFuby1zcWwvY29yZS9saWIvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgR2VvUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9nZW8tcG9zaXRpb24vZ2VvLXBvc2l0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdvYnNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvYXV0aC9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2VvcG9zaXRpb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2dlb2xvY2F0aW9uL25neCc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnTGVnYWN5VHJpcFBhZ2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbGVnYWN5LXRyaXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sZWdhY3ktdHJpcC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xlZ2FjeS10cmlwLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZWdhY3lUcmlwUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHRyaXBMb2dnZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgdHJpcER0bzogQ3JlYXRlVHJpcER0bztcclxuICBtaW51dGVzOiBTZWxlY3RPcHRpb25bXTtcclxuICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICBoYXNDbGlja2VkID0gZmFsc2U7XHJcbiAgaXNMb2FkaW5nQ3VycmVudFBvc2l0aW9uID0gZmFsc2U7XHJcbiAgY3VycmVudFBvc2l0aW9uOiBHZW9wb3NpdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGFydFRyaXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnRyaXBEdG8uT2JzZXJ2YXRpb25FeHBlY3RlZE1pbnV0ZXMgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0aGlzLnRyaXBEdG8uVHJpcFR5cGVJRCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uICE9IG51bGxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy50cmlwRHRvKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0cmlwTG9nZ2VyU2VydmljZTogVHJpcExvZ2dlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSByZWdvYnNBdXRoU2VydmljZTogUmVnb2JzQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdlb1Bvc2l0aW9uU2VydmljZTogR2VvUG9zaXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRyaXBEdG8gPSB7fTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0SG91cnNUb01pZG5pZ2h0KCk7XHJcbiAgICB0aGlzLnRyaXBMb2dnZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRyaXBMb2dnZXJTZXJ2aWNlXHJcbiAgICAgIC5nZXRMZWdhY3lUcmlwQXNPYnNlcnZhYmxlKClcclxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlwRHRvID0gdmFsLnJlcXVlc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5pbml0Q3VycmVudFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGluaXRDdXJyZW50UG9zaXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmlzTG9hZGluZ0N1cnJlbnRQb3NpdGlvbiA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IGF3YWl0IHRoaXMuZ2VvUG9zaXRpb25TZXJ2aWNlLmdldFNpbmdsZUN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50UG9zaXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc2hvd1RyaXBOb1Bvc2l0aW9uRXJyb3JNZXNzYWdlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICdDb3VsZCBub3QgZ2V0IGdlb2xvY2F0aW9uJyxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBMb2dMZXZlbC5XYXJuaW5nLFxyXG4gICAgICAgIERFQlVHX1RBR1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnRyaXBMb2dnZXJTZXJ2aWNlLnNob3dUcmlwTm9Qb3NpdGlvbkVycm9yTWVzc2FnZSgpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0N1cnJlbnRQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0SG91cnNUb01pZG5pZ2h0KCkge1xyXG4gICAgdGhpcy5taW51dGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gbW9tZW50KCkuZ2V0KCdob3VycycpOyBpIDw9IDI0OyBpKyspIHtcclxuICAgICAgdGhpcy5taW51dGVzLnB1c2goeyB0ZXh0OiBgJHtpfTowMGAsIGlkOiBpICogNjAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRyaXBMb2dnZXJTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy50cmlwTG9nZ2VyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydFRyaXAoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5oYXNDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbG9nZ2VkSW5Vc2VyID0gYXdhaXQgdGhpcy5yZWdvYnNBdXRoU2VydmljZS5nZXRMb2dnZWRJblVzZXJBc1Byb21pc2UoKTtcclxuICAgICAgaWYgKGxvZ2dlZEluVXNlciAmJiBsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnRyaXBEdG8uT2JzZXJ2ZXJHdWlkID0gbG9nZ2VkSW5Vc2VyLnVzZXIuR3VpZDsgLy8gVE9ETzogRml4IGFwaSB0byB1c2UgYWNjZXNzIHRva2VuIGZvciB0aGlzIGNhbGxcclxuICAgICAgICB0aGlzLnRyaXBEdG8uR2VvSGF6YXJkSUQgPSBHZW9IYXphcmQuU25vdztcclxuICAgICAgICB0aGlzLnRyaXBEdG8uRGV2aWNlR3VpZCA9IHV0aWxzLnV1aWQoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBvc2l0aW9uICYmIHRoaXMuY3VycmVudFBvc2l0aW9uLmNvb3Jkcykge1xyXG4gICAgICAgICAgICB0aGlzLnRyaXBEdG8uTGF0ID0gdGhpcy5jdXJyZW50UG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpcER0by5MbmcgPSB0aGlzLmN1cnJlbnRQb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAgICAgICAgIC5zdGFydExlZ2FjeVRyaXAodGhpcy50cmlwRHRvKVxyXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVSb290KCcvJyksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAnRXJyb3Igd2hlbiBzdGFydGluZyB0cmlwJyxcclxuICAgICAgICAgICAgICAgICAgICBERUJVR19UQUdcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50cmlwTG9nZ2VyU2VydmljZS5zaG93VHJpcEVycm9yTWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc2hvd1RyaXBOb1Bvc2l0aW9uRXJyb3JNZXNzYWdlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgJ0NvdWxkIG5vdCBnZXQgZ2VvbG9jYXRpb24nLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgTG9nTGV2ZWwuV2FybmluZyxcclxuICAgICAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy50cmlwTG9nZ2VyU2VydmljZS5zaG93VHJpcE5vUG9zaXRpb25FcnJvck1lc3NhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbmNlbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXJ0VHJpcFN1YnNjcmlwdGlvbiAmJiAhdGhpcy5zdGFydFRyaXBTdWJzY3JpcHRpb24uY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0b3BUcmlwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYW5jZWwoKTtcclxuICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc3RvcExlZ2FjeVRyaXAoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dIZWxwKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldCgnVFJJUC5MRUdBQ1lfSEVMUF9URVhUJylcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEhlbHBNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgaGVscFRleHQ6IHRyYW5zbGF0aW9uXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJQYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50cmlwRHRvID0ge307XHJcbiAgICB0aGlzLmluaXRDdXJyZW50UG9zaXRpb24oKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT57e1wiVFJJUC5UUklQXCIgfCB0cmFuc2xhdGV9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cInB1bGwtbGFzdC1ib3R0b20gaW9uLW5vLXBhZGRpZyBpb24tbm8tbWFyZ2luXCI+XHJcbiAgICA8aW9uLXJvdyAqbmdJZj1cIiFpc0xvYWRpbmdcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgICAgIDxhcHAta2R2LXNlbGVjdCBbbGFiZWxDb2xvcl09XCIoaGFzQ2xpY2tlZCAmJiB0cmlwRHRvLlRyaXBUeXBlSUQgPT09IHVuZGVmaW5lZCkgPyAnZGFuZ2VyJyA6ICdtZWRpdW0nXCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzUnVubmluZyB8fCBpc0xvYWRpbmdcIiB0aXRsZT1cIlRSSVAuVFJJUF9UWVBFXCIga2R2S2V5PVwiVHJpcFR5cGVLRFZcIlxyXG4gICAgICAgICAgICBbKHZhbHVlKV09XCJ0cmlwRHRvLlRyaXBUeXBlSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICAgICAgPGlvbi1pdGVtPlxyXG4gICAgICAgICAgICA8aW9uLWxhYmVsIFtjb2xvcl09XCIoaGFzQ2xpY2tlZCAmJiB0cmlwRHRvLk9ic2VydmF0aW9uRXhwZWN0ZWRNaW51dGVzID09PSB1bmRlZmluZWQpID8gJ2RhbmdlcicgOiAnbWVkaXVtJ1wiXHJcbiAgICAgICAgICAgICAgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1RSSVAuVFJJUF9FTkRfREVTQ1JJUFRJT04nXHJcbiAgICAgICAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICA8YXBwLXNlbGVjdCBbZGlzYWJsZWRdPVwiaXNSdW5uaW5nIHx8IGlzTG9hZGluZ1wiIFsoc2VsZWN0ZWRWYWx1ZSldPVwidHJpcER0by5PYnNlcnZhdGlvbkV4cGVjdGVkTWludXRlc1wiXHJcbiAgICAgICAgICAgICAgW29wdGlvbnNdPVwibWludXRlc1wiIHRpdGxlPVwiVFJJUC5UUklQX0VORF9ERVNDUklQVElPTlwiPjwvYXBwLXNlbGVjdD5cclxuICAgICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIkRJQUxPR1MuQ09NTUVOVFwiIFtkaXNhYmxlZF09XCJpc1J1bm5pbmcgfHwgaXNMb2FkaW5nXCIgWyh2YWx1ZSldPVwidHJpcER0by5Db21tZW50XCI+XHJcbiAgICAgICAgICA8L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgICAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgICAgICB7eydUUklQLkNPTU1FTlRfREVTQ1JJUFRJT04nIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgPC9pb24tbGlzdD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3cgKm5nSWY9XCJpc0xvYWRpbmdDdXJyZW50UG9zaXRpb25cIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICA8aW9uLXNwaW5uZXIgbmFtZT1cImRvdHNcIj48L2lvbi1zcGlubmVyPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNMb2FkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmcgaW9uLXRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aW9uLXNwaW5uZXIgbmFtZT1cImRvdHNcIj48L2lvbi1zcGlubmVyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNhbmNlbCgpXCI+e3snQUxFUlQuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19PC9pb24tYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgIDxpb24tcm93PlxyXG4gICAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJzaG93SGVscCgpXCIgZmlsbD1cImNsZWFyXCI+e3snSEVMUC5USVRMRScgfCB0cmFuc2xhdGV9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJ3aGl0ZS1iYWNrZ3JvdW5kXCI+XHJcbiAgICAgICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiIGNsYXNzPVwic3RhcnQtYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJzdGFydFRyaXAoKVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmcgfHwgIWlzVmFsaWRcIiAqbmdJZj1cIiFpc1J1bm5pbmdcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJiYWNrLWJ1dHRvblwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCI+XHJcbiAgICAgICAgICAgICAgICB7eyAnVFJJUC5TVEFSVF9UUklQJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiAqbmdJZj1cImlzUnVubmluZ1wiIChjbGljayk9XCJzdG9wVHJpcCgpXCIgW2Rpc2FibGVkXT1cImlzTG9hZGluZ1wiIGNsYXNzPVwiYmFjay1idXR0b25cIlxyXG4gICAgICAgICAgICAgICAgZXhwYW5kPVwiYmxvY2tcIiBjb2xvcj1cInZhcnNvbS1vcmFuZ2VcIj5cclxuICAgICAgICAgICAgICAgIHt7ICdUUklQLlNUT1BfVFJJUCcgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgIDxpb24tcm93IGNsYXNzPVwid2hpdGUtYmFja2dyb3VuZFwiICpuZ0lmPVwiIWlzRW1wdHlcIj5cclxuICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2xlYXJQYWdlKClcIiBbZGlzYWJsZWRdPVwiaXNSdW5uaW5nIHx8IGlzTG9hZGluZ1wiIGNsYXNzPVwicmVzZXQtYnV0dG9uXCIgY29sb3I9XCJkYXJrXCJcclxuICAgICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiPlxyXG4gICAgICAgICAgICAgICAgPHN2Zy1pY29uIHNyYz1cIi9hc3NldHMvaWNvbi9yZXNldC5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICAgICAge3tcIlJFR0lTVFJBVElPTi5SRVNFVFwiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8L2lvbi1ncmlkPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==