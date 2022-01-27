"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_trip-log_trip-log_module_ts"],{

/***/ 6580:
/*!***************************************************************************!*\
  !*** ./src/app/components/trip-log-summary/trip-log-summary.component.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripLogSummaryComponent": function() { return /* binding */ TripLogSummaryComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/trip-logger/trip-logger.service */ 3699);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/helpers/helper.service */ 22791);
/* harmony import */ var _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/trip-logger/trip-log-state.enum */ 66640);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);









class TripLogSummaryComponent {
    constructor(tripLoggerService, helperService) {
        this.tripLoggerService = tripLoggerService;
        this.helperService = helperService;
    }
    ngOnInit() {
        this.tripLogSubscription = this.tripLoggerService
            .getTripLogAsObservable()
            .subscribe((tripLog) => {
            this.tripLog = tripLog;
        });
        this.tripLogActivitySubscription = this.tripLoggerService
            .getTripLogActivityAsObservable()
            .subscribe((tripLogActivity) => {
            this.tripLogActivity = tripLogActivity;
        });
        this.interval = setInterval(() => (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const lengthMs = this.calculateTimeFromTripLogActivity(this.tripLogActivity);
            this.lengthString = this.helperService.formatMsToTime(lengthMs);
        }), 1000);
    }
    calculateTimeFromTripLogActivity(tripLogActivity) {
        let lengthMs = 0;
        if (tripLogActivity.length > 0) {
            let lastItem = null;
            for (const item of tripLogActivity) {
                if (item.state === _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__.TripLogState.Paused) {
                    lengthMs += moment__WEBPACK_IMPORTED_MODULE_1___default().unix(item.timestamp)
                        .diff(moment__WEBPACK_IMPORTED_MODULE_1___default().unix(lastItem.timestamp));
                }
                lastItem = item;
            }
            if (lastItem.state === _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__.TripLogState.Running) {
                lengthMs += moment__WEBPACK_IMPORTED_MODULE_1___default()().diff(moment__WEBPACK_IMPORTED_MODULE_1___default().unix(lastItem.timestamp));
            }
        }
        return lengthMs;
    }
    ngOnDestroy() {
        this.tripLogSubscription.unsubscribe();
        this.tripLogActivitySubscription.unsubscribe();
        clearInterval(this.interval);
    }
}
TripLogSummaryComponent.ɵfac = function TripLogSummaryComponent_Factory(t) { return new (t || TripLogSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__.TripLoggerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__.HelperService)); };
TripLogSummaryComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: TripLogSummaryComponent, selectors: [["app-trip-log-summary"]], decls: 8, vars: 1, consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"]], template: function TripLogSummaryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-col");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Varighet");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-col");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.lengthString);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonText], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmlwLWxvZy1zdW1tYXJ5LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 66640:
/*!******************************************************************!*\
  !*** ./src/app/core/services/trip-logger/trip-log-state.enum.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripLogState": function() { return /* binding */ TripLogState; }
/* harmony export */ });
var TripLogState;
(function (TripLogState) {
    TripLogState["NotStarted"] = "NOT_STARTED";
    TripLogState["Paused"] = "PAUSED";
    TripLogState["Running"] = "RUNNING";
    TripLogState["Stopped"] = "STOPPED";
})(TripLogState || (TripLogState = {}));


/***/ }),

/***/ 63979:
/*!***************************************************!*\
  !*** ./src/app/pages/trip-log/trip-log.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripLogPageModule": function() { return /* binding */ TripLogPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _trip_log_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trip-log.page */ 5119);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/trip-log-summary/trip-log-summary.component */ 6580);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);









const routes = [
    {
        path: '',
        component: _trip_log_page__WEBPACK_IMPORTED_MODULE_0__.TripLogPage
    }
];
class TripLogPageModule {
}
TripLogPageModule.ɵfac = function TripLogPageModule_Factory(t) { return new (t || TripLogPageModule)(); };
TripLogPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TripLogPageModule });
TripLogPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes),
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TripLogPageModule, { declarations: [_trip_log_page__WEBPACK_IMPORTED_MODULE_0__.TripLogPage, _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_1__.TripLogSummaryComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule] }); })();


/***/ }),

/***/ 5119:
/*!*************************************************!*\
  !*** ./src/app/pages/trip-log/trip-log.page.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripLogPage": function() { return /* binding */ TripLogPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_background_geolocation_background_geolocation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/background-geolocation/background-geolocation.service */ 12452);
/* harmony import */ var _core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/trip-logger/trip-logger.service */ 3699);
/* harmony import */ var _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/trip-logger/trip-log-state.enum */ 66640);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/trip-log-summary/trip-log-summary.component */ 6580);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 70325);











function TripLogPage_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-fab", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-fab-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_8_Template_ion_fab_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.startTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 1, "TRIP_LOG.START"), " ");
} }
function TripLogPage_ng_container_9_ion_fab_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-fab", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-fab-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_2_Template_ion_fab_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r7.pauseTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, "TRIP_LOG.STOP"), " ");
} }
function TripLogPage_ng_container_9_ion_fab_3_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-fab", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-grid");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-fab-button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_3_Template_ion_fab_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r9.completeTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-fab-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_3_Template_ion_fab_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r11.startTrip(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 2, "TRIP_LOG.COMPLETE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 4, "TRIP_LOG.CONTINUE"), " ");
} }
function TripLogPage_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-trip-log-summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TripLogPage_ng_container_9_ion_fab_2_Template, 4, 3, "ion-fab", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TripLogPage_ng_container_9_ion_fab_3_Template, 11, 6, "ion-fab", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.state === "RUNNING");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.state === "PAUSED");
} }
function TripLogPage_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-trip-log-summary");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
class TripLogPage {
    constructor(backgroundGeolocationService, tripLoggerService) {
        this.backgroundGeolocationService = backgroundGeolocationService;
        this.tripLoggerService = tripLoggerService;
        this.state = _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_2__.TripLogState.NotStarted;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            this.subscription = this.tripLoggerService
                .getTripLogStateAsObservable()
                .subscribe((activity) => {
                this.state = activity.state;
            });
        });
    }
    startTrip() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            return this.backgroundGeolocationService.start();
        });
    }
    pauseTrip() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            return this.backgroundGeolocationService.stop();
        });
    }
    completeTrip() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, function* () {
            // await this.tripLoggerService.updateState(TripLogState.Stopped);
            // this.state = TripLogState.Stopped;
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TripLogPage.ɵfac = function TripLogPage_Factory(t) { return new (t || TripLogPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_background_geolocation_background_geolocation_service__WEBPACK_IMPORTED_MODULE_0__.BackgroundGeolocationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_1__.TripLoggerService)); };
TripLogPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TripLogPage, selectors: [["app-trip-log"]], decls: 11, vars: 7, consts: [[3, "color"], ["slot", "start"], ["text", ""], [4, "ngIf"], ["vertical", "bottom", "horizontal", "center", "slot", "fixed", 1, "x-large"], ["color", "success", 1, "x-large", 3, "click"], ["vertical", "bottom", "class", "x-large", "horizontal", "center", "slot", "fixed", 4, "ngIf"], ["vertical", "bottom", "class", "x-large two-buttons", "horizontal", "start", "slot", "fixed", 4, "ngIf"], ["color", "danger", 1, "x-large", 3, "click"], ["vertical", "bottom", "horizontal", "start", "slot", "fixed", 1, "x-large", "two-buttons"], ["color", "danger", 1, "x-large", "small-text", 3, "click"], ["color", "success", 1, "x-large", "small-text", 3, "click"]], template: function TripLogPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, TripLogPage_ng_container_8_Template, 5, 3, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, TripLogPage_ng_container_9_Template, 4, 2, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, TripLogPage_ng_container_10_Template, 2, 0, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("color", ctx.state === "RUNNING" ? "success" : "dark");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 5, "TRIP_LOG." + ctx.state), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "NOT_STARTED");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "PAUSED" || ctx.state === "RUNNING");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "STOPPED");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonFabButton, _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_3__.TripLogSummaryComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe], styles: ["ion-fab.two-buttons[_ngcontent-%COMP%] {\n  left: 40px;\n}\nion-fab.two-buttons[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  padding-left: 20px;\n  padding-right: 20px;\n}\nion-fab.x-large[_ngcontent-%COMP%] {\n  bottom: 20px;\n}\nion-fab[_ngcontent-%COMP%]   ion-fab-button.x-large[_ngcontent-%COMP%] {\n  --size: 80px;\n  --height: 80px;\n  --width: 80px;\n  font-size: 17px;\n  font-weight: bold;\n  text-transform: uppercase;\n}\nion-fab[_ngcontent-%COMP%]   ion-fab-button.x-large.small-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyaXAtbG9nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNJLFVBQUE7QUFEUjtBQUVRO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtBQUFaO0FBSUk7RUFDSSxZQUFBO0FBRlI7QUFLSTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0FBSFI7QUFLUTtFQUNJLGVBQUE7QUFIWiIsImZpbGUiOiJ0cmlwLWxvZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW9uLWZhYiB7XHJcbiAgICAmLnR3by1idXR0b25zIHtcclxuICAgICAgICBsZWZ0OiA0MHB4O1xyXG4gICAgICAgIGlvbi1jb2wge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYueC1sYXJnZSB7XHJcbiAgICAgICAgYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1mYWItYnV0dG9uLngtbGFyZ2Uge1xyXG4gICAgICAgIC0tc2l6ZTogODBweDtcclxuICAgICAgICAtLWhlaWdodDogODBweDtcclxuICAgICAgICAtLXdpZHRoOiA4MHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTdweDtcdFxyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcblxyXG4gICAgICAgICYuc21hbGwtdGV4dCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc190cmlwLWxvZ190cmlwLWxvZ19tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDd0Y7QUFDNUQ7QUFDK0M7QUFHUTs7Ozs7QUFRNUUsTUFBTSx1QkFBdUI7SUFTbEMsWUFDVSxpQkFBb0MsRUFDcEMsYUFBNEI7UUFENUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCO2FBQzlDLHNCQUFzQixFQUFFO2FBQ3hCLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQyxpQkFBaUI7YUFDdEQsOEJBQThCLEVBQUU7YUFDaEMsU0FBUyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFTLEVBQUUsQ0FBQztZQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0NBQWdDLENBQ3BELElBQUksQ0FBQyxlQUFlLENBQ3JCLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsR0FBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxnQ0FBZ0MsQ0FBQyxlQUFrQztRQUNqRSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZ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QUNoQiw0REFBYTtRQUNiLDhFQUFhO1FBQ1gseUhBTWU7UUFDZix5SEF1QmU7UUFDZiwySEFFZTtRQUNqQiw0REFBYzs7UUE1Q0MsMERBQXVEO1FBQXZELDBIQUF1RDtRQUtoRSwwREFDRjtRQURFLG9LQUNGO1FBSWEsMERBQTZCO1FBQTdCLDZGQUE2QjtRQU83QiwwREFBK0M7UUFBL0MsbUhBQStDO1FBd0IvQywwREFBeUI7UUFBekIseUZBQXlCIiwic291cmNlcyI6WyIuL3NyYy9hcHAvY29tcG9uZW50cy90cmlwLWxvZy1zdW1tYXJ5L3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL2NvbXBvbmVudHMvdHJpcC1sb2ctc3VtbWFyeS90cmlwLWxvZy1zdW1tYXJ5LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bS50cyIsIi4vc3JjL2FwcC9wYWdlcy90cmlwLWxvZy90cmlwLWxvZy5tb2R1bGUudHMiLCIuL3NyYy9hcHAvcGFnZXMvdHJpcC1sb2cvdHJpcC1sb2cucGFnZS50cyIsIi4vc3JjL2FwcC9wYWdlcy90cmlwLWxvZy90cmlwLWxvZy5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmlwTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvaGVscGVycy9oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dJdGVtIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZy1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgVHJpcExvZ0FjdGl2aXR5IH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZy1hY3Rpdml0eS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyaXBMb2dTdGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdHJpcC1sb2ctc3VtbWFyeScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpcExvZ1N1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSB0cmlwTG9nU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSB0cmlwTG9nQWN0aXZpdHlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgbGVuZ3RoU3RyaW5nOiBzdHJpbmc7XHJcbiAgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lcjtcclxuICB0cmlwTG9nOiBUcmlwTG9nSXRlbVtdO1xyXG4gIHRyaXBMb2dBY3Rpdml0eTogVHJpcExvZ0FjdGl2aXR5W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0cmlwTG9nZ2VyU2VydmljZTogVHJpcExvZ2dlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IEhlbHBlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50cmlwTG9nU3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAuZ2V0VHJpcExvZ0FzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRyaXBMb2cpID0+IHtcclxuICAgICAgICB0aGlzLnRyaXBMb2cgPSB0cmlwTG9nO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMudHJpcExvZ0FjdGl2aXR5U3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAuZ2V0VHJpcExvZ0FjdGl2aXR5QXNPYnNlcnZhYmxlKClcclxuICAgICAgLnN1YnNjcmliZSgodHJpcExvZ0FjdGl2aXR5KSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmlwTG9nQWN0aXZpdHkgPSB0cmlwTG9nQWN0aXZpdHk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxlbmd0aE1zID0gdGhpcy5jYWxjdWxhdGVUaW1lRnJvbVRyaXBMb2dBY3Rpdml0eShcclxuICAgICAgICB0aGlzLnRyaXBMb2dBY3Rpdml0eVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmxlbmd0aFN0cmluZyA9IHRoaXMuaGVscGVyU2VydmljZS5mb3JtYXRNc1RvVGltZShsZW5ndGhNcyk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVRpbWVGcm9tVHJpcExvZ0FjdGl2aXR5KHRyaXBMb2dBY3Rpdml0eTogVHJpcExvZ0FjdGl2aXR5W10pOiBudW1iZXIge1xyXG4gICAgbGV0IGxlbmd0aE1zID0gMDtcclxuICAgIGlmICh0cmlwTG9nQWN0aXZpdHkubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgbGFzdEl0ZW06IFRyaXBMb2dBY3Rpdml0eSA9IG51bGw7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmlwTG9nQWN0aXZpdHkpIHtcclxuICAgICAgICBpZiAoaXRlbS5zdGF0ZSA9PT0gVHJpcExvZ1N0YXRlLlBhdXNlZCkge1xyXG4gICAgICAgICAgbGVuZ3RoTXMgKz0gbW9tZW50XHJcbiAgICAgICAgICAgIC51bml4KGl0ZW0udGltZXN0YW1wKVxyXG4gICAgICAgICAgICAuZGlmZihtb21lbnQudW5peChsYXN0SXRlbS50aW1lc3RhbXApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdEl0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChsYXN0SXRlbS5zdGF0ZSA9PT0gVHJpcExvZ1N0YXRlLlJ1bm5pbmcpIHtcclxuICAgICAgICBsZW5ndGhNcyArPSBtb21lbnQoKS5kaWZmKG1vbWVudC51bml4KGxhc3RJdGVtLnRpbWVzdGFtcCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuZ3RoTXM7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudHJpcExvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy50cmlwTG9nQWN0aXZpdHlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZD5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5WYXJpZ2hldDwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXRleHQ+e3tsZW5ndGhTdHJpbmd9fTwvaW9uLXRleHQ+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgICA8aW9uLWNvbD5cclxuXHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L2lvbi1ncmlkPiIsImV4cG9ydCBlbnVtIFRyaXBMb2dTdGF0ZSB7XHJcbiAgTm90U3RhcnRlZCA9ICdOT1RfU1RBUlRFRCcsXHJcbiAgUGF1c2VkID0gJ1BBVVNFRCcsXHJcbiAgUnVubmluZyA9ICdSVU5OSU5HJyxcclxuICBTdG9wcGVkID0gJ1NUT1BQRUQnXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgVHJpcExvZ1BhZ2UgfSBmcm9tICcuL3RyaXAtbG9nLnBhZ2UnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgVHJpcExvZ1N1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RyaXAtbG9nLXN1bW1hcnkvdHJpcC1sb2ctc3VtbWFyeS5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IFRyaXBMb2dQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIElvbmljTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1RyaXBMb2dQYWdlLCBUcmlwTG9nU3VtbWFyeUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRyaXBMb2dQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFja2dyb3VuZEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYmFja2dyb3VuZC1nZW9sb2NhdGlvbi9iYWNrZ3JvdW5kLWdlb2xvY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUcmlwTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dTdGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdHJpcC1sb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmlwLWxvZy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RyaXAtbG9nLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmlwTG9nUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBzdGF0ZTogVHJpcExvZ1N0YXRlID0gVHJpcExvZ1N0YXRlLk5vdFN0YXJ0ZWQ7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2U6IEJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyaXBMb2dnZXJTZXJ2aWNlOiBUcmlwTG9nZ2VyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHJpcExvZ2dlclNlcnZpY2VcclxuICAgICAgLmdldFRyaXBMb2dTdGF0ZUFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGFjdGl2aXR5KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGFjdGl2aXR5LnN0YXRlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHN0YXJ0VHJpcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2Uuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHBhdXNlVHJpcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2Uuc3RvcCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29tcGxldGVUcmlwKCkge1xyXG4gICAgLy8gYXdhaXQgdGhpcy50cmlwTG9nZ2VyU2VydmljZS51cGRhdGVTdGF0ZShUcmlwTG9nU3RhdGUuU3RvcHBlZCk7XHJcbiAgICAvLyB0aGlzLnN0YXRlID0gVHJpcExvZ1N0YXRlLlN0b3BwZWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBjb2xvcj1cInt7IHN0YXRlID09PSAnUlVOTklORycgPyAnc3VjY2VzcycgOiAnZGFyaycgIH19XCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdUUklQX0xPRy4nK3N0YXRlIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdGUgPT09ICdOT1RfU1RBUlRFRCdcIj5cclxuICAgIDxpb24tZmFiIHZlcnRpY2FsPVwiYm90dG9tXCIgY2xhc3M9XCJ4LWxhcmdlXCIgaG9yaXpvbnRhbD1cImNlbnRlclwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlXCIgY29sb3I9XCJzdWNjZXNzXCIgKGNsaWNrKT1cInN0YXJ0VHJpcCgpXCI+XHJcbiAgICAgICAge3sgJ1RSSVBfTE9HLlNUQVJUJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWZhYi1idXR0b24+XHJcbiAgICA8L2lvbi1mYWI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXRlID09PSAnUEFVU0VEJyB8fCBzdGF0ZSA9PT0gJ1JVTk5JTkcnXCI+XHJcbiAgICA8YXBwLXRyaXAtbG9nLXN1bW1hcnk+PC9hcHAtdHJpcC1sb2ctc3VtbWFyeT5cclxuICAgIDxpb24tZmFiICpuZ0lmPVwic3RhdGUgPT09ICdSVU5OSU5HJ1wiIHZlcnRpY2FsPVwiYm90dG9tXCIgY2xhc3M9XCJ4LWxhcmdlXCIgaG9yaXpvbnRhbD1cImNlbnRlclwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlXCIgY29sb3I9XCJkYW5nZXJcIiAoY2xpY2spPVwicGF1c2VUcmlwKClcIj5cclxuICAgICAgICB7eyAnVFJJUF9MT0cuU1RPUCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1mYWItYnV0dG9uPlxyXG4gICAgPC9pb24tZmFiPlxyXG4gICAgPGlvbi1mYWIgKm5nSWY9XCJzdGF0ZSA9PT0gJ1BBVVNFRCdcIiB2ZXJ0aWNhbD1cImJvdHRvbVwiIGNsYXNzPVwieC1sYXJnZSB0d28tYnV0dG9uc1wiIGhvcml6b250YWw9XCJzdGFydFwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWdyaWQ+XHJcbiAgICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgICA8aW9uLWNvbD5cclxuICAgICAgICAgICAgPGlvbi1mYWItYnV0dG9uIGNsYXNzPVwieC1sYXJnZSBzbWFsbC10ZXh0XCIgY29sb3I9XCJkYW5nZXJcIiAoY2xpY2spPVwiY29tcGxldGVUcmlwKClcIj5cclxuICAgICAgICAgICAgICB7eyAnVFJJUF9MT0cuQ09NUExFVEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9pb24tZmFiLWJ1dHRvbj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgIDxpb24tY29sPlxyXG4gICAgICAgICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlIHNtYWxsLXRleHRcIiBjb2xvcj1cInN1Y2Nlc3NcIiAoY2xpY2spPVwic3RhcnRUcmlwKClcIj5cclxuICAgICAgICAgICAgICB7eyAnVFJJUF9MT0cuQ09OVElOVUUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9pb24tZmFiLWJ1dHRvbj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1mYWI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXRlID09PSAnU1RPUFBFRCdcIj5cclxuICAgIDxhcHAtdHJpcC1sb2ctc3VtbWFyeT48L2FwcC10cmlwLWxvZy1zdW1tYXJ5PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9