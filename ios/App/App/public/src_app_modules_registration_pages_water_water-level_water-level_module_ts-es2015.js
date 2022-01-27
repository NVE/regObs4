"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_water_water-level_water-level_module_ts"],{

/***/ 66562:
/*!********************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/water/water-level-measurement/water-level-measurement.component.ts ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WaterLevelMeasurementComponent": function() { return /* binding */ WaterLevelMeasurementComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../text-comment/text-comment.component */ 32032);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);












function WaterLevelMeasurementComponent_app_numeric_input_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-numeric-input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function WaterLevelMeasurementComponent_app_numeric_input_4_Template_app_numeric_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r3.waterLevelMeasurement.WaterLevelValue = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.waterLevelMeasurement.WaterLevelValue)("min", 0)("max", 8848)("decimalPlaces", 3);
} }
function WaterLevelMeasurementComponent_ion_item_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
} }
function WaterLevelMeasurementComponent_ion_item_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, "REGISTRATION.WATER.WATER_LEVEL.DT_REQUIRED_TEXT"), " ");
} }
const _c0 = function (a0) { return { "hasWarning": a0 }; };
class WaterLevelMeasurementComponent {
    constructor() {
        this.waterLevelMeasurementChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        this.showDtMeasurementTimeError = false;
    }
    get dateIsDifferentThanObsTime() {
        return (this.waterLevelMeasurement.DtMeasurementTime &&
            !moment__WEBPACK_IMPORTED_MODULE_0___default()(this.waterLevelMeasurement.DtMeasurementTime)
                .startOf('day')
                .isSame(moment__WEBPACK_IMPORTED_MODULE_0___default()(this.dtObsTime).startOf('day')));
    }
    get isValid() {
        if ((0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(this.waterLevelMeasurement)) {
            return true;
        }
        return this.waterLevelMeasurement.DtMeasurementTime;
    }
    ngOnInit() {
        this.maxDate = this.getMaxDateForNow();
        if (!this.waterLevelMeasurement.Attachments) {
            this.waterLevelMeasurement.Attachments = [];
        }
    }
    getMaxDateForNow() {
        // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
        // Workaround is to set minutes to 59.
        return moment__WEBPACK_IMPORTED_MODULE_0___default()().minutes(59).toISOString(true);
    }
    setToNow() {
        const now = moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
        this.maxDate = this.getMaxDateForNow();
        this.waterLevelMeasurement.DtMeasurementTime = now;
    }
    showError() {
        if (!(0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(this.waterLevelMeasurement) &&
            !this.waterLevelMeasurement.DtMeasurementTime) {
            this.showDtMeasurementTimeError = true;
        }
        else {
            this.showDtMeasurementTimeError = false;
        }
    }
    dtChanged() {
        this.showError();
    }
}
WaterLevelMeasurementComponent.ɵfac = function WaterLevelMeasurementComponent_Factory(t) { return new (t || WaterLevelMeasurementComponent)(); };
WaterLevelMeasurementComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: WaterLevelMeasurementComponent, selectors: [["app-water-level-measurement"]], inputs: { measurementNumber: "measurementNumber", waterLevelMethod: "waterLevelMethod", registrationTid: "registrationTid", registrationId: "registrationId", geoHazard: "geoHazard", dtObsTime: "dtObsTime", waterLevelMeasurement: "waterLevelMeasurement" }, outputs: { waterLevelMeasurementChange: "waterLevelMeasurementChange" }, decls: 27, vars: 49, consts: [["title", "REGISTRATION.WATER.WATER_LEVEL.WATER_LEVEL_METERS", "suffix", "m", 3, "value", "min", "max", "decimalPlaces", "valueChange", 4, "ngIf"], [3, "ngClass"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "monthShortNames", "doneText", "cancelText", "ngModel", "max", "ionChange", "ngModelChange"], ["slot", "end", "fill", "outline", "color", "medium", 1, "set-to-now-button", 3, "click"], ["slot", "start", "name", "time"], [4, "ngIf"], ["iconColor", "primary", "icon", "add-circle-outline", 3, "title", "registrationTid", "geoHazard", "registrationId", "ref", "attachmentType"], [3, "value", "placeholder", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.WATER_LEVEL_METERS", "suffix", "m", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["color", "danger", 1, "ion-text-wrap"]], template: function WaterLevelMeasurementComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, WaterLevelMeasurementComponent_app_numeric_input_4_Template, 1, 4, "app-numeric-input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-label", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-datetime", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function WaterLevelMeasurementComponent_Template_ion_datetime_ionChange_9_listener() { return ctx.dtChanged(); })("ngModelChange", function WaterLevelMeasurementComponent_Template_ion_datetime_ngModelChange_9_listener($event) { return ctx.waterLevelMeasurement.DtMeasurementTime = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WaterLevelMeasurementComponent_Template_ion_button_click_13_listener() { return ctx.setToNow(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "ion-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, WaterLevelMeasurementComponent_ion_item_17_Template, 5, 6, "ion-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, WaterLevelMeasurementComponent_ion_item_18_Template, 4, 3, "ion-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "app-add-picture-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](21, "lowercase");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "app-text-comment", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function WaterLevelMeasurementComponent_Template_app_text_comment_valueChange_23_listener($event) { return ctx.waterLevelMeasurement.Comment = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "lowercase");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 23, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING" : "REGISTRATION.WATER.WATER_LEVEL.MEASURING"), " ", ctx.measurementNumber, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.waterLevelMethod === 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](47, _c0, ctx.dateIsDifferentThanObsTime));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 25, "REGISTRATION.SET_TIME.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](10, 27, "MONTHS.SHORT_LIST"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 29, "DIALOGS.OK"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 31, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.waterLevelMeasurement.DtMeasurementTime)("max", ctx.maxDate);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 33, "REGISTRATION.SET_TIME.NOW"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.dateIsDifferentThanObsTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showDtMeasurementTimeError);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate2"]("title", "", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](20, 35, "REGISTRATION.WATER.WATER_LEVEL.ADD_PICTURE"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](21, 37, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](22, 39, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL" : "REGISTRATION.WATER.WATER_LEVEL.MEASURE_PLURAL")), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("registrationTid", ctx.registrationTid)("geoHazard", ctx.geoHazard)("registrationId", ctx.registrationId)("ref", ctx.waterLevelMeasurement.WaterLevelMeasurementId)("attachmentType", "WaterLevelMeasurementAttachment");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate2"]("placeholder", "", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](24, 41, "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](25, 43, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](26, 45, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL" : "REGISTRATION.WATER.WATER_LEVEL.MEASURE_PLURAL")), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.waterLevelMeasurement.Comment);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_2__.AddPictureItemComponent, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.LowerCasePipe], styles: [".set-to-now-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKIiwiZmlsZSI6IndhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNldC10by1ub3ctYnV0dG9uIHtcclxuICAgIHotaW5kZXg6IDIwMDtcclxufSJdfQ== */"] });


/***/ }),

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

/***/ 75505:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/water/water-level/water-level.module.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WaterLevelPageModule": function() { return /* binding */ WaterLevelPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _water_level_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./water-level.page */ 22285);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/water/water-level-measurement/water-level-measurement.component */ 66562);
/* harmony import */ var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../can-deactivate-route.guard */ 7990);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);







const routes = [
    {
        path: '',
        component: _water_level_page__WEBPACK_IMPORTED_MODULE_0__.WaterLevelPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__.CanDeactivateRouteGuard]
    }
];
class WaterLevelPageModule {
}
WaterLevelPageModule.ɵfac = function WaterLevelPageModule_Factory(t) { return new (t || WaterLevelPageModule)(); };
WaterLevelPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: WaterLevelPageModule });
WaterLevelPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](WaterLevelPageModule, { declarations: [_water_level_page__WEBPACK_IMPORTED_MODULE_0__.WaterLevelPage, _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_2__.WaterLevelMeasurementComponent], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 22285:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/registration/pages/water/water-level/water-level.page.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WaterLevelPage": function() { return /* binding */ WaterLevelPage; }
/* harmony export */ });
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/water/water-level-measurement/water-level-measurement.component */ 66562);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/kdv-radiobutton-list/kdv-radiobutton-list.component */ 31610);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);


















function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r6.registration.request.WaterLevel2.MarkingReferenceTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "app-text-comment", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template_app_text_comment_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r8.registration.request.WaterLevel2.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "uppercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r1.registration.request.WaterLevel2.MarkingReferenceTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate2"]("title", "", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 6, "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE")), " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 8, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL")), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r1.registration.request.WaterLevel2.Comment);
} }
function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r9.registration.request.WaterLevel2.MarkingTypeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r2.registration.request.WaterLevel2.MarkingTypeTID);
} }
function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-text-comment", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template_app_text_comment_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3); return ctx_r12.registration.request.WaterLevel2.MeasuringToolDescription = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r11.registration.request.WaterLevel2.MeasuringToolDescription);
} }
function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r14.registration.request.WaterLevel2.MeasurementTypeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template, 1, 1, "app-text-comment", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r3.registration.request.WaterLevel2.MeasurementTypeTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.registration.request.WaterLevel2.MeasurementTypeTID === 3);
} }
function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r16.registration.request.WaterLevel2.MeasurementReferenceTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "app-text-comment", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template_app_text_comment_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r17); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r18.registration.request.WaterLevel2.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r4.registration.request.WaterLevel2.MeasurementReferenceTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r4.registration.request.WaterLevel2.Comment);
} }
function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-water-level-measurement", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("waterLevelMeasurementChange", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template_app_water_level_measurement_waterLevelMeasurementChange_0_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r23); const i_r21 = restoredCtx.index; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3); return (ctx_r22.registration.request.WaterLevel2.WaterLevelMeasurement[i_r21] = $event); })("waterLevelMeasurementChange", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template_app_water_level_measurement_waterLevelMeasurementChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r23); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3); return ctx_r24.save(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r21 = ctx.index;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("measurementNumber", i_r21 + 1)("waterLevelMethod", ctx_r19.registration.request.WaterLevel2.WaterLevelMethodTID)("waterLevelMeasurement", ctx_r19.registration.request.WaterLevel2.WaterLevelMeasurement[i_r21])("registrationTid", ctx_r19.registrationTid)("dtObsTime", ctx_r19.registration.request.DtObsTime)("registrationId", ctx_r19.registration.id)("geoHazard", ctx_r19.registration.geoHazard);
} }
function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template, 1, 7, "app-water-level-measurement", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-list", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-item", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template_ion_item_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r26); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r25.addWaterLevelMeasurement(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "ion-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r5.registration.request.WaterLevel2.WaterLevelMeasurement);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 3, "REGISTRATION.WATER.WATER_LEVEL.ADD_NEW"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 5, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](10, 7, ctx_r5.registration.request.WaterLevel2.WaterLevelMethodTID === 1 ? "REGISTRATION.WATER.WATER_LEVEL.WATER_MARKING" : "REGISTRATION.WATER.WATER_LEVEL.WATER_MEASUREMENT")), "");
} }
function WaterLevelPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r27.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "app-kdv-radiobutton-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r29.registration.request.WaterLevel2.WaterLevelStateTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "app-kdv-radiobutton-list", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r30.registration.request.WaterLevel2.WaterAstrayTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "app-kdv-radiobutton-list", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_4_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r31.registration.request.WaterLevel2.ObservationTimingTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "app-kdv-radiobutton-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28); const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r32.registration.request.WaterLevel2.WaterLevelMethodTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template, 6, 12, "app-kdv-radiobutton-list", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template, 1, 1, "app-kdv-radiobutton-list", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template, 2, 2, "app-kdv-radiobutton-list", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template, 2, 2, "app-kdv-radiobutton-list", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template, 11, 9, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterLevelStateTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterAstrayTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.ObservationTimingTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.MeasurementTypeTID === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID);
} }
class WaterLevelPage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WaterLevel2, basePageService, activatedRoute);
    }
    onInit() {
        if (!this.registration.request.WaterLevel2.WaterLevelMeasurement ||
            this.registration.request.WaterLevel2.WaterLevelMeasurement.length === 0) {
            this.registration.request.WaterLevel2.WaterLevelMeasurement = [
                { DtMeasurementTime: undefined }
            ];
        }
    }
    onReset() {
        this.registration.request.WaterLevel2.WaterLevelMeasurement = [
            { DtMeasurementTime: undefined }
        ];
    }
    addWaterLevelMeasurement() {
        this.registration.request.WaterLevel2.WaterLevelMeasurement.push({
            DtMeasurementTime: undefined
        });
        this.save();
    }
    onBeforeLeave() {
        // Cleanup
        if (this.registration.request.WaterLevel2.WaterLevelMethodTID === 2) {
            this.registration.request.WaterLevel2.MarkingReferenceTID = null;
        }
        if (this.registration.request.WaterLevel2.MeasurementTypeTID !== 3) {
            this.registration.request.WaterLevel2.MeasuringToolDescription = undefined;
        }
        if (!(this.registration.request.WaterLevel2.WaterLevelMethodTID === 1 ||
            this.registration.request.WaterLevel2.MeasurementTypeTID === 1)) {
            this.registration.request.WaterLevel2.Comment = undefined;
        }
        this.registration.request.WaterLevel2.WaterLevelMeasurement = (this.registration.request.WaterLevel2.WaterLevelMeasurement || []).filter((item) => !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_2__.IsEmptyHelper.isEmpty(item));
    }
    isValid() {
        for (const wl of this.waterLevelMeasurements.toArray()) {
            wl.showError();
        }
        return (this.waterLevelMeasurements &&
            !this.waterLevelMeasurements.some((x) => !x.isValid));
    }
}
WaterLevelPage.ɵfac = function WaterLevelPage_Factory(t) { return new (t || WaterLevelPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute)); };
WaterLevelPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: WaterLevelPage, selectors: [["app-water-level"]], viewQuery: function WaterLevelPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__.WaterLevelMeasurementComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.waterLevelMeasurements = _t);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], ["title", "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE_SITUATION", "kdvKey", "Water_WaterLevelStateKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.CAN_YOU_SEE_WATER", "kdvKey", "Water_WaterAstrayKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.OBSERVATION_TIMING", "kdvKey", "Water_ObservationTimingKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.REGISTRATION_METHOD", "kdvKey", "Water_WaterLevelMethodKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKING_REFERENCE", "kdvKey", "Water_MarkingReferenceKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKED_WITH", "kdvKey", "Water_MarkingTypeKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.HOW_DO_YOU_READ", "kdvKey", "Water_MeasurementTypeKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.RELATIVE", "kdvKey", "Water_MeasurementReferenceKDV", 3, "value", "valueChange", 4, "ngIf"], [4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKING_REFERENCE", "kdvKey", "Water_MarkingReferenceKDV", 3, "value", "valueChange"], [3, "value", "title", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKED_WITH", "kdvKey", "Water_MarkingTypeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.HOW_DO_YOU_READ", "kdvKey", "Water_MeasurementTypeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MEASURING_TOOL", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MEASURING_TOOL", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.RELATIVE", "kdvKey", "Water_MeasurementReferenceKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE_HEIGHT", 3, "value", "valueChange"], [3, "measurementNumber", "waterLevelMethod", "waterLevelMeasurement", "registrationTid", "dtObsTime", "registrationId", "geoHazard", "waterLevelMeasurementChange", 4, "ngFor", "ngForOf"], ["lines", "full", 1, "ion-margin-top"], [3, "click"], ["slot", "start", "color", "primary", "name", "add-circle"], [3, "measurementNumber", "waterLevelMethod", "waterLevelMeasurement", "registrationTid", "dtObsTime", "registrationId", "geoHazard", "waterLevelMeasurementChange"]], template: function WaterLevelPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, WaterLevelPage_app_registration_content_wrapper_8_Template, 11, 11, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.WATER.WATER_LEVEL.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.WaterLevel2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonList, _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_7__.KdvRadiobuttonListComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__.TextCommentComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonLabel, _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__.WaterLevelMeasurementComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.UpperCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.LowerCasePipe], styles: [".white-button[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-bottom: 0.55px solid #c8c7cc;\n  border-bottom: 0.55px solid var(--ion-item-border-color, #c8c7cc);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLWxldmVsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFBO0VBQ0EsbUNBQUE7RUFBQSxpRUFBQTtBQUNKIiwiZmlsZSI6IndhdGVyLWxldmVsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53aGl0ZS1idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1ib3R0b206IDAuNTVweCBzb2xpZCB2YXIoLS1pb24taXRlbS1ib3JkZXItY29sb3IsICNjOGM3Y2MpO1xyXG59Il19 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc193YXRlcl93YXRlci1sZXZlbF93YXRlci1sZXZlbF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0U7QUFFbkQ7QUFDOEQ7QUFDMUI7Ozs7Ozs7Ozs7O0lDR2hFLHVGQUNrSDtJQURoRSxnWkFBaUQ7SUFFbkcsNERBQW9COzs7SUFGOEIsK0dBQWlEOzs7SUFlbkcsMkVBQTZDO0lBQzNDLGdGQUFnRDtJQUM5Qyx1REFDRjs7O0lBQUEsNERBQVk7SUFDZCw0REFBVzs7SUFGUCwwREFDRjtJQURFLHdSQUNGOzs7SUFFRiwyRUFBNkM7SUFDM0MsZ0ZBQWdEO0lBQzlDLHVEQUNGOztJQUFBLDREQUFZO0lBQ2QsNERBQVc7O0lBRlAsMERBQ0Y7SUFERSw4TEFDRjs7O0FEbkJLLE1BQU0sOEJBQThCO0lBNEJ6QztRQXBCVSxnQ0FBMkIsR0FBRyxJQUFJLHVEQUFZLEVBQUUsQ0FBQztRQUUzRCwrQkFBMEIsR0FBRyxLQUFLLENBQUM7SUFrQnBCLENBQUM7SUFoQmhCLElBQUksMEJBQTBCO1FBQzVCLE9BQU8sQ0FDTCxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCO1lBQzVDLENBQUMsNkNBQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUM7aUJBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ2QsTUFBTSxDQUFDLDZDQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNqRCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksT0FBTztRQUNULElBQUksbUVBQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLENBQUM7SUFDdEQsQ0FBQztJ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NERBQVk7UUFDZCw0REFBYztRQUNoQiw0REFBYTtRQUNiLDhFQUFhO1FBQ1gsc0tBMkRtQztRQUNyQyw0REFBYzs7UUFqRVIsMERBQ0Y7UUFERSxtTEFDRjtRQUlpQywwREFBc0Q7UUFBdEQsMEhBQXNEIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvd2F0ZXIvd2F0ZXItbGV2ZWwvd2F0ZXItbGV2ZWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3dhdGVyL3dhdGVyLWxldmVsL3dhdGVyLWxldmVsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvd2F0ZXIvd2F0ZXItbGV2ZWwvd2F0ZXItbGV2ZWwucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbE1lYXN1cmVtZW50RWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQsIGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC13YXRlci1sZXZlbC1tZWFzdXJlbWVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXRlckxldmVsTWVhc3VyZW1lbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIG1lYXN1cmVtZW50TnVtYmVyOiBudW1iZXI7XHJcbiAgQElucHV0KCkgd2F0ZXJMZXZlbE1ldGhvZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvbklkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZ2VvSGF6YXJkOiBHZW9IYXphcmQ7XHJcbiAgQElucHV0KCkgZHRPYnNUaW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgd2F0ZXJMZXZlbE1lYXN1cmVtZW50OiBXYXRlckxldmVsTWVhc3VyZW1lbnRFZGl0TW9kZWw7XHJcbiAgQE91dHB1dCgpIHdhdGVyTGV2ZWxNZWFzdXJlbWVudENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBtYXhEYXRlOiBzdHJpbmc7XHJcbiAgc2hvd0R0TWVhc3VyZW1lbnRUaW1lRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgZ2V0IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQuRHRNZWFzdXJlbWVudFRpbWUgJiZcclxuICAgICAgIW1vbWVudCh0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudC5EdE1lYXN1cmVtZW50VGltZSlcclxuICAgICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgICAuaXNTYW1lKG1vbWVudCh0aGlzLmR0T2JzVGltZSkuc3RhcnRPZignZGF5JykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzVmFsaWQoKSB7XHJcbiAgICBpZiAoaXNFbXB0eSh0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQuRHRNZWFzdXJlbWVudFRpbWU7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5tYXhEYXRlID0gdGhpcy5nZXRNYXhEYXRlRm9yTm93KCk7XHJcbiAgICBpZiAoIXRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50LkF0dGFjaG1lbnRzKSB7XHJcbiAgICAgIHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50LkF0dGFjaG1lbnRzID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNYXhEYXRlRm9yTm93KCkge1xyXG4gICAgLy8gVGhlcmUgaXMgYW4gaXNzdWUgd2hlbiBzZXR0aW5nIG1heCBkYXRlIHRoYXQgd2hlbiBjaGFuZ2luZyBob3VyLCB0aGUgbWludXRlcyBpcyBzdGlsbCBtYXggbWludXRlcy5cclxuICAgIC8vIFdvcmthcm91bmQgaXMgdG8gc2V0IG1pbnV0ZXMgdG8gNTkuXHJcbiAgICByZXR1cm4gbW9tZW50KCkubWludXRlcyg1OSkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzZXRUb05vdygpIHtcclxuICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgdGhpcy5tYXhEYXRlID0gdGhpcy5nZXRNYXhEYXRlRm9yTm93KCk7XHJcbiAgICB0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudC5EdE1lYXN1cmVtZW50VGltZSA9IG5vdztcclxuICB9XHJcblxyXG4gIHNob3dFcnJvcigpIHtcclxuICAgIGlmIChcclxuICAgICAgIWlzRW1wdHkodGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQpICYmXHJcbiAgICAgICF0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudC5EdE1lYXN1cmVtZW50VGltZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc2hvd0R0TWVhc3VyZW1lbnRUaW1lRXJyb3IgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RHRNZWFzdXJlbWVudFRpbWVFcnJvciA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHRDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy5zaG93RXJyb3IoKTtcclxuICB9XHJcblxyXG4gIC8vIHRyaWdnZXJDaGFuZ2UoKSB7XHJcbiAgLy8gICB0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudENoYW5nZS5lbWl0KHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50KTtcclxuICAvLyB9XHJcbn1cclxuIiwiPGlvbi1saXN0LWhlYWRlcj5cclxuICA8aW9uLWxhYmVsPlxyXG4gICAge3sgKHdhdGVyTGV2ZWxNZXRob2QgPT09IDEgPyAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1BUktJTkcnIDpcclxuICAgICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuTUVBU1VSSU5HJykgfFxyXG4gICAgdHJhbnNsYXRlIH19IHt7IG1lYXN1cmVtZW50TnVtYmVyIH19XHJcbiAgPC9pb24tbGFiZWw+XHJcbjwvaW9uLWxpc3QtaGVhZGVyPlxyXG48YXBwLW51bWVyaWMtaW5wdXQgKm5nSWY9XCJ3YXRlckxldmVsTWV0aG9kID09PSAyXCIgWyh2YWx1ZSldPVwid2F0ZXJMZXZlbE1lYXN1cmVtZW50LldhdGVyTGV2ZWxWYWx1ZVwiXHJcbiAgdGl0bGU9XCJSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuV0FURVJfTEVWRUxfTUVURVJTXCIgW21pbl09XCIwXCIgW21heF09XCI4ODQ4XCIgW2RlY2ltYWxQbGFjZXNdPVwiM1wiIHN1ZmZpeD1cIm1cIj5cclxuPC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAge3sgJ1JFR0lTVFJBVElPTi5TRVRfVElNRS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICA8L2lvbi1sYWJlbD5cclxuICA8aW9uLWRhdGV0aW1lIChpb25DaGFuZ2UpPVwiZHRDaGFuZ2VkKClcIiBjb2xvcj1cIm1lZGl1bVwiIG1vbnRoU2hvcnROYW1lcz1cInt7ICdNT05USFMuU0hPUlRfTElTVCcgfCB0cmFuc2xhdGUgfX1cIlxyXG4gICAgZG9uZVRleHQ9XCJ7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XCIgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCJcclxuICAgIGRpc3BsYXktZm9ybWF0PVwiRC4gTU1NLCBZWVlZIEhIOm1tXCIgWyhuZ01vZGVsKV09XCJ3YXRlckxldmVsTWVhc3VyZW1lbnQuRHRNZWFzdXJlbWVudFRpbWVcIiBbbWF4XT1cIm1heERhdGVcIj5cclxuICA8L2lvbi1kYXRldGltZT5cclxuICA8aW9uLWJ1dHRvbiBjbGFzcz1cInNldC10by1ub3ctYnV0dG9uXCIgc2xvdD1cImVuZFwiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJtZWRpdW1cIiAoY2xpY2spPVwic2V0VG9Ob3coKVwiPlxyXG4gICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0aW1lXCI+PC9pb24taWNvbj4ge3tcIlJFR0lTVFJBVElPTi5TRVRfVElNRS5OT1dcIiB8IHRyYW5zbGF0ZX19XHJcbiAgPC9pb24tYnV0dG9uPlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWl0ZW0gKm5nSWY9XCJkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZVwiPlxyXG4gIDxpb24tbGFiZWwgY29sb3I9XCJkYW5nZXJcIiBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgIHt7J0FMRVJULldBUk5JTkcnIHwgdHJhbnNsYXRlfX0hIHt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5EQVRFX1dBUk5JTkcnIHwgdHJhbnNsYXRlfX1cclxuICA8L2lvbi1sYWJlbD5cclxuPC9pb24taXRlbT5cclxuPGlvbi1pdGVtICpuZ0lmPVwic2hvd0R0TWVhc3VyZW1lbnRUaW1lRXJyb3JcIj5cclxuICA8aW9uLWxhYmVsIGNvbG9yPVwiZGFuZ2VyXCIgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICB7eydSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuRFRfUkVRVUlSRURfVEVYVCcgfCB0cmFuc2xhdGV9fVxyXG4gIDwvaW9uLWxhYmVsPlxyXG48L2lvbi1pdGVtPlxyXG48YXBwLWFkZC1waWN0dXJlLWl0ZW0gaWNvbkNvbG9yPVwicHJpbWFyeVwiIGljb249XCJhZGQtY2lyY2xlLW91dGxpbmVcIiB0aXRsZT1cInt7ICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuQUREX1BJQ1RVUkUnIHwgdHJhbnNsYXRlIH19IHt7ICh3YXRlckxldmVsTWV0aG9kID09PSAxID8gJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NQVJLSU5HX1BMVVJBTCcgOlxyXG4nUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1FQVNVUkVfUExVUkFMJykgfCB0cmFuc2xhdGUgfCBsb3dlcmNhc2UgfX1cIlxyXG4gICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIlxyXG4gICAgW2dlb0hhemFyZF09XCJnZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uSWRcIiBcclxuICAgIFtyZWZdPVwid2F0ZXJMZXZlbE1lYXN1cmVtZW50LldhdGVyTGV2ZWxNZWFzdXJlbWVudElkXCJcclxuICAgIFthdHRhY2htZW50VHlwZV09XCInV2F0ZXJMZXZlbE1lYXN1cmVtZW50QXR0YWNobWVudCdcIj5cclxuPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwid2F0ZXJMZXZlbE1lYXN1cmVtZW50LkNvbW1lbnRcIiBwbGFjZWhvbGRlcj1cInt7J1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5ERVNDUklCRScgfCB0cmFuc2xhdGUgfX0ge3sgKHdhdGVyTGV2ZWxNZXRob2QgPT09IDEgPyAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1BUktJTkdfUExVUkFMJyA6XHJcbidSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuTUVBU1VSRV9QTFVSQUwnKSB8IHRyYW5zbGF0ZSB8IGxvd2VyY2FzZSB9fVwiPjwvYXBwLXRleHQtY29tbWVudD4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbFBhZ2UgfSBmcm9tICcuL3dhdGVyLWxldmVsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbE1lYXN1cmVtZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYW5EZWFjdGl2YXRlUm91dGVHdWFyZCB9IGZyb20gJy4uLy4uL2Nhbi1kZWFjdGl2YXRlLXJvdXRlLmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBXYXRlckxldmVsUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbV2F0ZXJMZXZlbFBhZ2UsIFdhdGVyTGV2ZWxNZWFzdXJlbWVudENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhdGVyTGV2ZWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbE1lYXN1cmVtZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtd2F0ZXItbGV2ZWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi93YXRlci1sZXZlbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhdGVyLWxldmVsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBXYXRlckxldmVsUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBAVmlld0NoaWxkcmVuKFdhdGVyTGV2ZWxNZWFzdXJlbWVudENvbXBvbmVudClcclxuICBwcml2YXRlIHdhdGVyTGV2ZWxNZWFzdXJlbWVudHM6IFF1ZXJ5TGlzdDxXYXRlckxldmVsTWVhc3VyZW1lbnRDb21wb25lbnQ+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihSZWdpc3RyYXRpb25UaWQuV2F0ZXJMZXZlbDIsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnQgfHxcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnQubGVuZ3RoID09PSAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnQgPSBbXHJcbiAgICAgICAgeyBEdE1lYXN1cmVtZW50VGltZTogdW5kZWZpbmVkIH1cclxuICAgICAgXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzZXQoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudCA9IFtcclxuICAgICAgeyBEdE1lYXN1cmVtZW50VGltZTogdW5kZWZpbmVkIH1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBhZGRXYXRlckxldmVsTWVhc3VyZW1lbnQoKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudC5wdXNoKHtcclxuICAgICAgRHRNZWFzdXJlbWVudFRpbWU6IHVuZGVmaW5lZFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIG9uQmVmb3JlTGVhdmUoKSB7XHJcbiAgICAvLyBDbGVhbnVwXHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEID09PSAyKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWFya2luZ1JlZmVyZW5jZVRJRCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NZWFzdXJlbWVudFR5cGVUSUQgIT09IDMpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NZWFzdXJpbmdUb29sRGVzY3JpcHRpb24gPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgICEoXHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEID09PSAxIHx8XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NZWFzdXJlbWVudFR5cGVUSUQgPT09IDFcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuQ29tbWVudCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50ID0gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudCB8fCBbXVxyXG4gICAgKS5maWx0ZXIoKGl0ZW0pID0+ICFJc0VtcHR5SGVscGVyLmlzRW1wdHkoaXRlbSkpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZCgpIHtcclxuICAgIGZvciAoY29uc3Qgd2wgb2YgdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnRzLnRvQXJyYXkoKSkge1xyXG4gICAgICB3bC5zaG93RXJyb3IoKTtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50cyAmJlxyXG4gICAgICAhdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnRzLnNvbWUoKHgpID0+ICF4LmlzVmFsaWQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMlwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5ERVNDUklCRV9TSVRVQVRJT05cIlxyXG4gICAgICAgIGtkdktleT1cIldhdGVyX1dhdGVyTGV2ZWxTdGF0ZUtEVlwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxTdGF0ZVRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5DQU5fWU9VX1NFRV9XQVRFUlwiIGtkdktleT1cIldhdGVyX1dhdGVyQXN0cmF5S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckFzdHJheVRJRFwiPjwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk9CU0VSVkFUSU9OX1RJTUlOR1wiXHJcbiAgICAgICAga2R2S2V5PVwiV2F0ZXJfT2JzZXJ2YXRpb25UaW1pbmdLRFZcIiBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5PYnNlcnZhdGlvblRpbWluZ1RJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5SRUdJU1RSQVRJT05fTUVUSE9EXCJcclxuICAgICAgICBrZHZLZXk9XCJXYXRlcl9XYXRlckxldmVsTWV0aG9kS0RWXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1ldGhvZFRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCAqbmdJZj1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSUQgPT09IDFcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1BUktJTkdfUkVGRVJFTkNFXCIga2R2S2V5PVwiV2F0ZXJfTWFya2luZ1JlZmVyZW5jZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWFya2luZ1JlZmVyZW5jZVRJRFwiPlxyXG4gICAgICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLkNvbW1lbnRcIlxyXG4gICAgICAgICAgdGl0bGU9XCJ7eyAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkRFU0NSSUJFJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSAgfX0ge3sgJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NQVJLSU5HX1BMVVJBTCcgfCB0cmFuc2xhdGUgfCB1cHBlcmNhc2UgIH19XCI+XHJcbiAgICAgICAgPC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCAqbmdJZj1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSUQgPT09IDFcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1BUktFRF9XSVRIXCIga2R2S2V5PVwiV2F0ZXJfTWFya2luZ1R5cGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1hcmtpbmdUeXBlVElEXCI+PC9hcHAta2R2LXJhZGlvYnV0dG9uLWxpc3Q+XHJcbiAgICAgIDxhcHAta2R2LXJhZGlvYnV0dG9uLWxpc3QgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEID09PSAyXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5IT1dfRE9fWU9VX1JFQURcIiBrZHZLZXk9XCJXYXRlcl9NZWFzdXJlbWVudFR5cGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmVtZW50VHlwZVRJRFwiPlxyXG4gICAgICAgIDxhcHAtdGV4dC1jb21tZW50ICpuZ0lmPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWVhc3VyZW1lbnRUeXBlVElEID09PSAzXCJcclxuICAgICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmluZ1Rvb2xEZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NRUFTVVJJTkdfVE9PTFwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPC9hcHAta2R2LXJhZGlvYnV0dG9uLWxpc3Q+XHJcbiAgICAgIDxhcHAta2R2LXJhZGlvYnV0dG9uLWxpc3QgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NZWFzdXJlbWVudFR5cGVUSUQgPT09IDFcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLlJFTEFUSVZFXCIga2R2S2V5PVwiV2F0ZXJfTWVhc3VyZW1lbnRSZWZlcmVuY2VLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmVtZW50UmVmZXJlbmNlVElEXCI+XHJcbiAgICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuQ29tbWVudFwiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5ERVNDUklCRV9IRUlHSFRcIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEXCI+XHJcbiAgICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgICA8YXBwLXdhdGVyLWxldmVsLW1lYXN1cmVtZW50IFttZWFzdXJlbWVudE51bWJlcl09XCJpKzFcIlxyXG4gICAgICAgICAgW3dhdGVyTGV2ZWxNZXRob2RdPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1ldGhvZFRJRFwiXHJcbiAgICAgICAgICBbKHdhdGVyTGV2ZWxNZWFzdXJlbWVudCldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50W2ldXCJcclxuICAgICAgICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW2R0T2JzVGltZV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWVcIlxyXG4gICAgICAgICAgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiXHJcbiAgICAgICAgICAod2F0ZXJMZXZlbE1lYXN1cmVtZW50Q2hhbmdlKT1cInNhdmUoKVwiXHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgbWVhc3VyZW1lbnQgb2YgcmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50OyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPC9hcHAtd2F0ZXItbGV2ZWwtbWVhc3VyZW1lbnQ+XHJcbiAgICAgIDwvaW9uLWxpc3Q+XHJcbiAgICAgIDxpb24tbGlzdCBjbGFzcz1cImlvbi1tYXJnaW4tdG9wXCIgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJhZGRXYXRlckxldmVsTWVhc3VyZW1lbnQoKVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkFERF9ORVcnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAge3socmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1ldGhvZFRJRCA9PT0gMSA/XHJcbiAgICAgICAgICAgICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuV0FURVJfTUFSS0lORyc6XHJcbiAgICAgICAgICAgICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuV0FURVJfTUVBU1VSRU1FTlQnKSB8IHRyYW5zbGF0ZSB8IGxvd2VyY2FzZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9