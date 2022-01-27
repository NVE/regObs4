"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_water_damage_damage_module_ts"],{

/***/ 59325:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/components/damage-obs/damage-obs.component.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DamageObsComponent": function() { return /* binding */ DamageObsComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_set_damage_location_set_damage_location_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/set-damage-location/set-damage-location.page */ 10587);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/registration.service */ 33181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../text-comment/text-comment.component */ 32032);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function DamageObsComponent_ion_list_4_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate4"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 4, ctx_r3.damageObs.DamagePosition.Latitude, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 7, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](4, 9, ctx_r3.damageObs.DamagePosition.Longitude, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 12, "MAP_CENTER_INFO.EAST_SHORT"), " ");
} }
function DamageObsComponent_ion_list_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-list", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-item", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function DamageObsComponent_ion_list_4_Template_ion_item_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r4.setDamagePosition(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ion-text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "ion-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, DamageObsComponent_ion_list_4_ng_container_7_Template, 6, 14, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ion-label", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "app-add-picture-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "app-text-comment", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueChange", function DamageObsComponent_ion_list_4_Template_app_text_comment_valueChange_13_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r6.damageObs.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 9, "REGISTRATION.WATER.DAMAGE.WHERE_IS_DAMAGE_LOCATION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.damageObs.DamagePosition)("ngIfElse", _r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](11, 11, "REGISTRATION.WATER.DAMAGE.IMAGE_OF_DAMAGES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.damageObs.Comment);
} }
function DamageObsComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 1, "REGISTRATION.WATER.DAMAGE.ADD_DAMAGE_LOCATION"), "\n");
} }
class DamageObsComponent {
    constructor(ngZone, modalController, registrationService) {
        this.ngZone = ngZone;
        this.modalController = modalController;
        this.registrationService = registrationService;
    }
    get damageObs() {
        if (this.registration &&
            this.registration.request &&
            this.registration.request.DamageObs) {
            return this.registration.request.DamageObs.find((x) => x.DamageTypeTID === this.damageTypeId);
        }
        return undefined;
    }
    ngOnInit() {
        if (this.damageObs) {
            this.isSelected = true;
        }
        else {
            this.isSelected = false;
        }
        if (this.damageObs && this.damageObs.Attachments === undefined) {
            this.damageObs.Attachments = [];
        }
    }
    toggleDamageType() {
        this.isSelected = !this.isSelected;
    }
    onCheckedChange() {
        if (this.isSelected) {
            if (!this.damageObs) {
                this.registration.request.DamageObs.push({
                    DamageTypeTID: this.damageTypeId,
                    Attachments: []
                });
            }
        }
        else {
            this.registration.request.DamageObs = this.registration.request.DamageObs.filter((x) => x.DamageTypeTID !== this.damageTypeId);
        }
        this.save();
    }
    save() {
        return this.registrationService.saveRegistrationAsync(this.registration);
    }
    getSaveFunc() {
        return () => this.save();
    }
    setDamagePosition() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            const fromLatLng = this.registration.request.ObsLocation
                ? leaflet__WEBPACK_IMPORTED_MODULE_1__.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude)
                : null;
            const modal = yield this.modalController.create({
                component: _pages_set_damage_location_set_damage_location_page__WEBPACK_IMPORTED_MODULE_2__.SetDamageLocationPage,
                componentProps: {
                    fromLatLng,
                    damageObs: this.damageObs,
                    geoHazard: this.registration.geoHazard
                }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            if (result.data) {
                const obs = result.data;
                this.damageObs.DamagePosition = {
                    Latitude: obs.Latitude,
                    Longitude: obs.Longitude
                };
                yield this.save();
            }
        });
    }
}
DamageObsComponent.ɵfac = function DamageObsComponent_Factory(t) { return new (t || DamageObsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_3__.RegistrationService)); };
DamageObsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: DamageObsComponent, selectors: [["app-damage-obs"]], inputs: { damageTypeId: "damageTypeId", damageTypeName: "damageTypeName", registration: "registration", registrationTid: "registrationTid" }, decls: 7, vars: 3, consts: [["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange", "ionChange"], ["lines", "none", "class", "no-border ion-no-margin", 4, "ngIf"], ["noDamagePosition", ""], ["lines", "none", 1, "no-border", "ion-no-margin"], ["detail", "false", 3, "click"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap"], ["color", "primary", "name", "location", 1, "add-icon"], [4, "ngIf", "ngIfElse"], [1, "label-only"], ["iconColor", "primary", "pictureCommentText", "", "pictureCommentPlaceholder", "REGISTRATION.INCIDENT.IMAGE_PLACEHOLDER", 3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["title", "REGISTRATION.WATER.DAMAGE.COMMENT", "placeholder", "REGISTRATION.WATER.DAMAGE.COMMENT_PLACEHOLDER", 3, "value", "valueChange"]], template: function DamageObsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-checkbox", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function DamageObsComponent_Template_ion_checkbox_ngModelChange_1_listener($event) { return ctx.isSelected = $event; })("ionChange", function DamageObsComponent_Template_ion_checkbox_ionChange_1_listener() { return ctx.onCheckedChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, DamageObsComponent_ion_list_4_Template, 14, 13, "ion-list", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, DamageObsComponent_ng_template_5_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.isSelected);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.damageTypeName);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isSelected && ctx.damageObs);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_4__.AddPictureItemComponent, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DecimalPipe], styles: [".label-only[_ngcontent-%COMP%] {\n  --min-height: 31px;\n}\n\nion-list[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  --image-wrapper-padding-bottom: 0px;\n  --images-background: #fff;\n  --image-wrapper-margin-left: 16px;\n  --image-wrapper-margin-right: 16px;\n  --image-wrapper-background: var(--ion-background-color);\n  --image-comment-background: rgba(0,0,0,0);\n}\n\nion-list[_ngcontent-%COMP%]   app-picture-item[_ngcontent-%COMP%] {\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhbWFnZS1vYnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxrQkFBQTtBQUFKOztBQUdBO0VBQ0ksbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQ0FBQTtFQUNBLHVEQUFBO0VBQ0EseUNBQUE7QUFBSjs7QUFFSTtFQUNJLGtCQUFBO0VBQ0EscUJBQUE7QUFBUiIsImZpbGUiOiJkYW1hZ2Utb2JzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sYWJlbC1vbmx5IHtcclxuICAgIC0tbWluLWhlaWdodDogMzFweDtcclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1wYWRkaW5nLWJvdHRvbTogMHB4O1xyXG4gICAgLS1pbWFnZXMtYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tbGVmdDogMTZweDtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbiAgICAtLWltYWdlLXdyYXBwZXItYmFja2dyb3VuZDogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgLS1pbWFnZS1jb21tZW50LWJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMCk7XHJcblxyXG4gICAgYXBwLXBpY3R1cmUtaXRlbSB7XHJcbiAgICAgICAgLS1wYWRkaW5nLXRvcDogMHB4O1xyXG4gICAgICAgIC0tcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIH1cclxufSJdfQ== */"] });


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

/***/ 64670:
/*!**********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-damage-location/set-damage-location.module.ts ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetDamageLocationPageModule": function() { return /* binding */ SetDamageLocationPageModule; }
/* harmony export */ });
/* harmony import */ var _set_damage_location_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./set-damage-location.page */ 10587);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class SetDamageLocationPageModule {
}
SetDamageLocationPageModule.ɵfac = function SetDamageLocationPageModule_Factory(t) { return new (t || SetDamageLocationPageModule)(); };
SetDamageLocationPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SetDamageLocationPageModule });
SetDamageLocationPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SetDamageLocationPageModule, { declarations: [_set_damage_location_page__WEBPACK_IMPORTED_MODULE_0__.SetDamageLocationPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 10587:
/*!********************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-damage-location/set-damage-location.page.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetDamageLocationPage": function() { return /* binding */ SetDamageLocationPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/set-location-in-map/set-location-in-map.component */ 5717);
/* harmony import */ var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/fullscreen/fullscreen.service */ 13653);
/* harmony import */ var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/services/swipe-back/swipe-back.service */ 84716);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















function SetDamageLocationPage_ion_header_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ion-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SetDamageLocationPage_ion_header_0_Template_ion_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r2.cancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 2, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 4, "REGISTRATION.SET_DAMAGE_LOCATION.TITLE"), " ");
} }
function SetDamageLocationPage_app_set_location_in_map_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-set-location-in-map", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("locationSet", function SetDamageLocationPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r4.onLocationSet($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("fromMarker", ctx_r1.fromMarker)("locationMarker", ctx_r1.locationMarker)("locationMarkerIconUrl", ctx_r1.locationMarkerIconUrl)("showPreviousUsedLocations", false);
} }
class SetDamageLocationPage {
    constructor(modalController, swipeBackService, fullscreenService) {
        this.modalController = modalController;
        this.swipeBackService = swipeBackService;
        this.fullscreenService = fullscreenService;
        this.locationMarkerIconUrl = '/assets/icon/map/damage-location.svg';
        this.fullscreen$ = this.fullscreenService.isFullscreen$;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (this.fromLatLng) {
                const obsLocationIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                    iconUrl: '/assets/icon/map/obs-location.svg',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    shadowUrl: 'leaflet/marker-shadow.png',
                    shadowSize: [41, 41]
                });
                this.fromMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.fromLatLng, { icon: obsLocationIcon });
            }
            if (this.damageObs &&
                !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.damageObs.DamagePosition)) {
                const latLng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.damageObs.DamagePosition.Latitude, this.damageObs.DamagePosition.Longitude);
                const damageLocationIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                    iconUrl: this.locationMarkerIconUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    shadowUrl: 'leaflet/marker-shadow.png',
                    shadowSize: [41, 41]
                });
                this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(latLng, { icon: damageLocationIcon });
            }
        });
    }
    ionViewDidEnter() {
        this.swipeBackService.disableSwipeBack();
    }
    ionViewWillLeave() {
        this.swipeBackService.enableSwipeBack();
    }
    onLocationSet(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.modalController.dismiss(event);
        });
    }
    cancel() {
        this.modalController.dismiss();
    }
    ok() {
        this.setLocationInMapComponent.confirmLocation();
    }
}
SetDamageLocationPage.ɵfac = function SetDamageLocationPage_Factory(t) { return new (t || SetDamageLocationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_4__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_3__.FullscreenService)); };
SetDamageLocationPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: SetDamageLocationPage, selectors: [["app-set-damage-location"]], viewQuery: function SetDamageLocationPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__.SetLocationInMapComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
    } }, inputs: { damageObs: "damageObs", geoHazard: "geoHazard", fromLatLng: "fromLatLng" }, decls: 4, vars: 4, consts: [[4, "ngIf"], ["confirmLocationText", "REGISTRATION.SET_DAMAGE_LOCATION.CONFIRM_TEXT", "fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", "locationTitle", "REGISTRATION.SET_DAMAGE_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "locationMarkerIconUrl", "showPreviousUsedLocations", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["confirmLocationText", "REGISTRATION.SET_DAMAGE_LOCATION.CONFIRM_TEXT", "fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", "locationTitle", "REGISTRATION.SET_DAMAGE_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "locationMarkerIconUrl", "showPreviousUsedLocations", "locationSet"]], template: function SetDamageLocationPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SetDamageLocationPage_ion_header_0_Template, 9, 6, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SetDamageLocationPage_app_set_location_in_map_3_Template, 1, 5, "app-set-location-in-map", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.fromMarker);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__.SetLocationInMapComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXQtZGFtYWdlLWxvY2F0aW9uLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 63895:
/*!**************************************************************************!*\
  !*** ./src/app/modules/registration/pages/water/damage/damage.module.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DamagePageModule": function() { return /* binding */ DamagePageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _damage_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./damage.page */ 22991);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/damage-obs/damage-obs.component */ 59325);
/* harmony import */ var _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../set-damage-location/set-damage-location.module */ 64670);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);







const routes = [
    {
        path: '',
        component: _damage_page__WEBPACK_IMPORTED_MODULE_0__.DamagePage
    }
];
class DamagePageModule {
}
DamagePageModule.ɵfac = function DamagePageModule_Factory(t) { return new (t || DamagePageModule)(); };
DamagePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: DamagePageModule });
DamagePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__.SetDamageLocationPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DamagePageModule, { declarations: [_damage_page__WEBPACK_IMPORTED_MODULE_0__.DamagePage, _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_2__.DamageObsComponent], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__.SetDamageLocationPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule] }); })();


/***/ }),

/***/ 22991:
/*!************************************************************************!*\
  !*** ./src/app/modules/registration/pages/water/damage/damage.page.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DamagePage": function() { return /* binding */ DamagePage; }
/* harmony export */ });
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core/services/kdv/kdv.service */ 88430);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/damage-obs/damage-obs.component */ 59325);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);



















function DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-damage-obs", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("registrationChange", function DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template_app_damage_obs_registrationChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3); return ctx_r4.registration = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const damageType_r3 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("registration", ctx_r2.registration)("damageTypeId", damageType_r3.Id)("damageTypeName", damageType_r3.Name)("registrationTid", ctx_r2.registrationTid);
} }
function DamagePage_app_registration_content_wrapper_8_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template, 1, 4, "app-damage-obs", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 2, "REGISTRATION.WATER.DAMAGE.WHAT_IS_DAMAGED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r1.damageTypes);
} }
const _c0 = function (a0) { return { "selected": a0 }; };
function DamagePage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("reset", function DamagePage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r6.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-radio-group", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function DamagePage_app_registration_content_wrapper_8_Template_ion_radio_group_ngModelChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r8.isChecked = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function DamagePage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r9.isChecked = true; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "ion-radio", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function DamagePage_app_registration_content_wrapper_8_Template_ion_item_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](); return ctx_r10.isChecked = false; });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "ion-radio", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, DamagePage_app_registration_content_wrapper_8_ng_container_17_Template, 6, 4, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 11, "REGISTRATION.WATER.DAMAGE.CAN_YOU_SEE_DAMAGE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.isChecked);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](17, _c0, ctx_r0.checked === true));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 13, "DIALOGS.YES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](19, _c0, ctx_r0.checked === false));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 15, "DIALOGS.NO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.isChecked && ctx_r0.damageTypes);
} }
const NO_DAMAGE_VISIBLE = 7;
class DamagePage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute, kdvService, ngZone) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DamageObs, basePageService, activatedRoute);
        this.kdvService = kdvService;
        this.ngZone = ngZone;
    }
    get isChecked() {
        if (!this.registration ||
            !this.registration.request ||
            !this.registration.request.DamageObs ||
            this.registration.request.DamageObs.length === 0) {
            return this.checked;
        }
        return (this.registration &&
            this.registration.request.DamageObs.filter((x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE).length > 0);
    }
    set isChecked(val) {
        this.checked = val;
        if (val === false) {
            this.registration.request.DamageObs = [
                {
                    DamageTypeTID: NO_DAMAGE_VISIBLE
                }
            ];
        }
        else {
            this.registration.request.DamageObs = this.registration.request.DamageObs.filter((x) => x.DamageTypeTID !== NO_DAMAGE_VISIBLE);
        }
    }
    onInit() {
        const geoHazardName = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_8__.GeoHazard[this.registration.geoHazard];
        this.kdvSubscription = this.kdvService
            .getKdvRepositoryByKeyObservable(`${geoHazardName}_DamageTypeKDV`)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)((val) => val.filter((x) => x.Id !== NO_DAMAGE_VISIBLE)))
            .subscribe((kdvElements) => {
            this.ngZone.run(() => {
                this.damageTypes = kdvElements;
            });
        });
    }
    onBeforeLeave() {
        if (this.kdvSubscription) {
            this.kdvSubscription.unsubscribe();
        }
    }
}
DamagePage.ɵfac = function DamagePage_Factory(t) { return new (t || DamagePage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_2__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone)); };
DamagePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({ type: DamagePage, selectors: [["app-damage"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange"], [3, "ngClass", "click"], ["mode", "md", "slot", "start", 3, "value"], [4, "ngIf"], [3, "registration", "damageTypeId", "damageTypeName", "registrationTid", "registrationChange", 4, "ngFor", "ngForOf"], [3, "registration", "damageTypeId", "damageTypeName", "registrationTid", "registrationChange"]], template: function DamagePage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, DamagePage_app_registration_content_wrapper_8_Template, 18, 21, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 2, "REGISTRATION.WATER.DAMAGE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.registration);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_5__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.RadioValueAccessor, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_6__.DamageObsComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkYW1hZ2UucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc193YXRlcl9kYW1hZ2VfZGFtYWdlX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS3VCO0FBQ2tGO0FBQ3hEO0FBQ3BCO0FBQ29FO0FBRXZCOzs7Ozs7Ozs7O0lDQXBFLHdFQUFxRTtJQUNuRSx1REFJRjs7Ozs7SUFBQSxxRUFBZTs7O0lBSmIsMERBSUY7SUFKRSx5Z0JBSUY7Ozs7SUFaTiw4RUFBdUY7SUFDckYsOEVBQXVEO0lBQTlCLHFVQUE2QjtJQUNwRCwrRUFBd0U7SUFBQSx1REFDcEQ7O0lBQUEsNERBQVk7SUFDaEMsOEVBQXFEO0lBQ25ELHlFQUNXO0lBQ1gsNElBS2U7SUFDakIsNERBQVc7SUFDYiw0REFBVztJQUNYLDhFQUE2QjtJQUMzQiwrRUFBd0U7SUFBQSx3REFDM0Q7O0lBQUEsNERBQVk7SUFDM0IsNERBQVc7SUFDWCx1RkFNdUI7SUFDdkIsd0ZBQzhEO0lBREYsdVdBQTZCO0lBQzNCLDREQUFtQjtJQUNuRiw0REFBVzs7OztJQTFCaUUsMERBQ3BEO0lBRG9ELHNMQUNwRDtJQUlILDBEQUErQjtJQUEvQixpR0FBK0I7SUFTd0IsMERBQzNEO0lBRDJELGdMQUMzRDtJQUdiLDBEQUFvQztJQUFwQyxvR0FBb0M7SUFNc0IsMERBQTZCO0lBQTdCLDJGQUE2Qjs7O0lBSXpGLHVEQUNGOzs7SUFERSw2TEFDRjs7QURqQk8sTUFBTSxrQkFBa0I7SUFxQjdCLFlBQ1UsTUFBYyxFQUNkLGVBQWdDLEVBQ2hDLG1CQUF3QztRQUZ4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFDL0MsQ0FBQztJQWpCSixJQUFJLFNBQVM7UUFDWCxJQUNFLElBQUksQ0FBQyxZQUFZO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTztZQUN6QixJ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QUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUNqRSxTQUFTLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7b0VBL0RVLFVBQVU7d0dBQVYsVUFBVTtRQ2xCdkIsNkVBQVk7UUFDVixpRkFBdUM7UUFDckMsaUZBQTBCO1FBQ3hCLGdGQUEyRDtRQUM3RCw0REFBYztRQUNkLDRFQUFXO1FBQ1QsdURBQ0Y7O1FBQUEsNERBQVk7UUFDZCw0REFBYztRQUNoQiw0REFBYTtRQUNiLDhFQUFhO1FBQ1gsa0tBNkJtQztRQUNyQyw0REFBYzs7UUFuQ1IsMERBQ0Y7UUFERSw4S0FDRjtRQUlpQywwREFBa0I7UUFBbEIsa0ZBQWtCIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9kYW1hZ2Utb2JzL2RhbWFnZS1vYnMuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvZGFtYWdlLW9icy9kYW1hZ2Utb2JzLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UtcGFnZS1zZXJ2aWNlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtZGFtYWdlLWxvY2F0aW9uL3NldC1kYW1hZ2UtbG9jYXRpb24ubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvd2F0ZXIvZGFtYWdlL2RhbWFnZS5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvd2F0ZXIvZGFtYWdlL2RhbWFnZS5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3dhdGVyL2RhbWFnZS9kYW1hZ2UucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFNldERhbWFnZUxvY2F0aW9uUGFnZSB9IGZyb20gJy4uLy4uL3BhZ2VzL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5wYWdlJztcclxuaW1wb3J0IHsgT2JzTG9jYXRpb25FZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1kYW1hZ2Utb2JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGFtYWdlLW9icy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGFtYWdlLW9icy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYW1hZ2VPYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbWFnZVR5cGVJZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRhbWFnZVR5cGVOYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG5cclxuICBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICBnZXQgZGFtYWdlT2JzKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbmQoXHJcbiAgICAgICAgKHgpID0+IHguRGFtYWdlVHlwZVRJRCA9PT0gdGhpcy5kYW1hZ2VUeXBlSWRcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmRhbWFnZU9icykge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYW1hZ2VPYnMgJiYgdGhpcy5kYW1hZ2VPYnMuQXR0YWNobWVudHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRhbWFnZU9icy5BdHRhY2htZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRGFtYWdlVHlwZSgpIHtcclxuICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBvbkNoZWNrZWRDaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIGlmICghdGhpcy5kYW1hZ2VPYnMpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbWFnZU9icy5wdXNoKHtcclxuICAgICAgICAgIERhbWFnZVR5cGVUSUQ6IHRoaXMuZGFtYWdlVHlwZUlkLFxyXG4gICAgICAgICAgQXR0YWNobWVudHM6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMuZmlsdGVyKFxyXG4gICAgICAgICh4KSA9PiB4LkRhbWFnZVR5cGVUSUQgIT09IHRoaXMuZGFtYWdlVHlwZUlkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNldERhbWFnZVBvc2l0aW9uKCkge1xyXG4gICAgY29uc3QgZnJvbUxhdExuZyA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb25cclxuICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgIClcclxuICAgICAgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IFNldERhbWFnZUxvY2F0aW9uUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBmcm9tTGF0TG5nLFxyXG4gICAgICAgIGRhbWFnZU9iczogdGhpcy5kYW1hZ2VPYnMsXHJcbiAgICAgICAgZ2VvSGF6YXJkOiB0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgIGlmIChyZXN1bHQuZGF0YSkge1xyXG4gICAgICBjb25zdCBvYnM6IE9ic0xvY2F0aW9uRWRpdE1vZGVsID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uID0ge1xyXG4gICAgICAgIExhdGl0dWRlOiBvYnMuTGF0aXR1ZGUsXHJcbiAgICAgICAgTG9uZ2l0dWRlOiBvYnMuTG9uZ2l0dWRlXHJcbiAgICAgIH07XHJcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0+XHJcbiAgPGlvbi1jaGVja2JveCBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbKG5nTW9kZWwpXT1cImlzU2VsZWN0ZWRcIiAoaW9uQ2hhbmdlKT1cIm9uQ2hlY2tlZENoYW5nZSgpXCI+PC9pb24tY2hlY2tib3g+XHJcbiAgPGlvbi1sYWJlbD57eyBkYW1hZ2VUeXBlTmFtZSB9fTwvaW9uLWxhYmVsPlxyXG48L2lvbi1pdGVtPlxyXG48aW9uLWxpc3QgbGluZXM9XCJub25lXCIgY2xhc3M9XCJuby1ib3JkZXIgaW9uLW5vLW1hcmdpblwiICpuZ0lmPVwiaXNTZWxlY3RlZCAmJiBkYW1hZ2VPYnNcIj5cclxuICA8aW9uLWl0ZW0gZGV0YWlsPVwiZmFsc2VcIiAoY2xpY2spPVwic2V0RGFtYWdlUG9zaXRpb24oKVwiPlxyXG4gICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ1JFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuV0hFUkVfSVNfREFNQUdFX0xPQ0FUSU9OJ1xyXG4gICAgICAgICAgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYWRkLWljb25cIiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwibG9jYXRpb25cIj5cclxuICAgICAgPC9pb24taWNvbj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRhbWFnZU9icy5EYW1hZ2VQb3NpdGlvbiBlbHNlIG5vRGFtYWdlUG9zaXRpb25cIj5cclxuICAgICAgICB7eyBkYW1hZ2VPYnMuRGFtYWdlUG9zaXRpb24uTGF0aXR1ZGUgfCBudW1iZXI6JzAuMydcclxuICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLk5PUlRIX1NIT1JUJ3x0cmFuc2xhdGV9fSxcclxuICAgICAgICB7eyBkYW1hZ2VPYnMuRGFtYWdlUG9zaXRpb24uTG9uZ2l0dWRlIHwgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5FQVNUX1NIT1JUJ3x0cmFuc2xhdGV9fVxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvaW9uLXRleHQ+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gY2xhc3M9XCJsYWJlbC1vbmx5XCI+XHJcbiAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLklNQUdFX09GX0RBTUFHRVMnIHxcclxuICAgICAgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8L2lvbi1pdGVtPlxyXG4gIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBpY29uQ29sb3I9XCJwcmltYXJ5XCIgXHJcbiAgICBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBcclxuICAgIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIiBcclxuICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCJcclxuICAgIHBpY3R1cmVDb21tZW50VGV4dD1cIlwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCJcclxuICAgIHBpY3R1cmVDb21tZW50UGxhY2Vob2xkZXI9XCJSRUdJU1RSQVRJT04uSU5DSURFTlQuSU1BR0VfUExBQ0VIT0xERVJcIj5cclxuICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gIDxhcHAtdGV4dC1jb21tZW50IHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLkRBTUFHRS5DT01NRU5UXCIgWyh2YWx1ZSldPVwiZGFtYWdlT2JzLkNvbW1lbnRcIlxyXG4gICAgcGxhY2Vob2xkZXI9XCJSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLkNPTU1FTlRfUExBQ0VIT0xERVJcIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbjwvaW9uLWxpc3Q+XHJcbjxuZy10ZW1wbGF0ZSAjbm9EYW1hZ2VQb3NpdGlvbj5cclxuICB7eydSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLkFERF9EQU1BR0VfTE9DQVRJT04nIHwgdHJhbnNsYXRlIH19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eU5hbWUsIGlzQXJyYXlUeXBlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmhlbHBlcnMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0Jhc2VQYWdlU2VydmljZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlU2VydmljZSB7XHJcbiAgZ2V0IFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmU7XHJcbiAgfVxyXG5cclxuICBnZXQgUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQWxlcnRDb250cm9sbGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxlcnRDb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFRyYW5zbGF0ZVNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1MZWF2ZShyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLlJFUVVJUkVEX0ZJRUxEU19NSVNTSU5HJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLkNPTkZJUk1fUkVTRVQnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVSZXNldERpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFsnRElBTE9HUy5DQU5DRUwnLCAnRElBTE9HUy5ZRVMnXSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLllFUyddXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gICAgY29uc3QgcmVzZXQ6IGJvb2xlYW4gPSByZXN1bHQucm9sZSAhPT0gJ2NhbmNlbCc7XHJcbiAgICBpZiAocmVzZXQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZXNldChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzZXQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5ab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZWdpc3RyYXRpb25UaWQpIHtcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob25SZXNldCkge1xyXG4gICAgICAgIG9uUmVzZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEZWZhdWx0UHJvcHMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdKSB7XHJcbiAgICAgIC8vIEluaXQgdG8gbmV3IG9iamVjdCBpZiBudWxsXHJcbiAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGlmIChpc0FycmF5VHlwZShyZWdpc3RyYXRpb25UaWQpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHMocmVnaXN0cmF0aW9uLmlkKVxyXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PiBmb3JrSm9pbihhdHRhY2htZW50cy5tYXAoKGEpID0+IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UucmVtb3ZlQXR0YWNobWVudChyZWdpc3RyYXRpb24uaWQsIGEuaWQpKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ1Jlc2V0IGltYWdlcyBjb21wbGV0ZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoZXJyb3IsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCByZXNldCBpbWFnZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZTtcclxuICByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UgPSBiYXNlUGFnZVNlcnZpY2U7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCA9IHJlZ2lzdHJhdGlvblRpZDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQoaWQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgbWFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNyZWF0ZURlZmF1bHRQcm9wcyhyZWcsIHRoaXMucmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICAgIHJldHVybiByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNyZWF0ZUluaXRPYnNlcnZhYmxlKCkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0PygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvbkJlZm9yZUxlYXZlPygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvblJlc2V0PygpOiB2b2lkO1xyXG5cclxuICBpc1ZhbGlkPygpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgLy8gTk9URTogUmVtZW1iZXIgdG8gYWRkIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF0gaW4gcGFnZSBtb2R1bGVcclxuICBhc3luYyBjYW5MZWF2ZSgpIHtcclxuICAgIC8vIENoZWNrIGlmIGltcGxlbWVudGF0aW9uIHBhZ2UgaGFzIGltcGxlbWVudGVkIGN1c3RvbSBpc1ZhbGlkIGxvZ2ljXHJcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLmlzVmFsaWQoKSA6IHRydWUpO1xyXG4gICAgLy8gT25seSByZXR1cm4gYWxlcnQgaWYgcGFnZSBpcyBub3QgZW1wdHkgYW5kIGludmFsaWRcclxuICAgIGNvbnN0IGlzRW1wdHkgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc0VtcHR5KCkpO1xyXG4gICAgaWYgKCFpc0VtcHR5ICYmICF2YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybUxlYXZlKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUluaXRPYnNlcnZhYmxlKCkge1xyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7XHJcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh0aGlzLm9uSW5pdCgpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlTGVhdmUpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVMZWF2ZSgpKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2F2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoY2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuUmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24sIGNsZWFuKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVGdW5jKCkge1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiAhKGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKVxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybVJlc2V0KHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb2x2ZWRVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICcvJyArXHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgICAgICAgLm1hcCgodikgPT4gdi51cmwubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKSlcclxuICAgICAgICAuZmlsdGVyKChwYXRoKSA9PiAhIXBhdGgpXHJcbiAgICAgICAgLmpvaW4oJy8nKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGdldENvbmZpZ3VyZWRVcmwoKTogc3RyaW5nIHtcclxuICAvLyAgICAgcmV0dXJuICcvJyArIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgLy8gICAgICAgICAuZmlsdGVyKHYgPT4gdi5yb3V0ZUNvbmZpZylcclxuICAvLyAgICAgICAgIC5tYXAodiA9PiB2LnJvdXRlQ29uZmlnLnBhdGgpXHJcbiAgLy8gICAgICAgICAuam9pbignLycpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZXREYW1hZ2VMb2NhdGlvblBhZ2UgfSBmcm9tICcuL3NldC1kYW1hZ2UtbG9jYXRpb24ucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU2V0RGFtYWdlTG9jYXRpb25QYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTZXREYW1hZ2VMb2NhdGlvblBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXREYW1hZ2VMb2NhdGlvblBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBEYW1hZ2VPYnNFZGl0TW9kZWwsIE9ic0xvY2F0aW9uRWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9mdWxsc2NyZWVuL2Z1bGxzY3JlZW4uc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3dpcGVCYWNrU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3dpcGUtYmFjay9zd2lwZS1iYWNrLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2V0LWRhbWFnZS1sb2NhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldC1kYW1hZ2UtbG9jYXRpb24ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZXQtZGFtYWdlLWxvY2F0aW9uLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXREYW1hZ2VMb2NhdGlvblBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbWFnZU9iczogRGFtYWdlT2JzRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIEBJbnB1dCgpIGZyb21MYXRMbmc6IEwuTGF0TG5nO1xyXG4gIGZyb21NYXJrZXI6IEwuTWFya2VyO1xyXG4gIGxvY2F0aW9uTWFya2VyOiBMLk1hcmtlcjtcclxuICBsb2NhdGlvbk1hcmtlckljb25VcmwgPSAnL2Fzc2V0cy9pY29uL21hcC9kYW1hZ2UtbG9jYXRpb24uc3ZnJztcclxuICBmdWxsc2NyZWVuJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuXHJcbiAgQFZpZXdDaGlsZChTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50KVxyXG4gIHNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ6IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgc3dpcGVCYWNrU2VydmljZTogU3dpcGVCYWNrU2VydmljZSxcclxuICAgIHByaXZhdGUgZnVsbHNjcmVlblNlcnZpY2U6IEZ1bGxzY3JlZW5TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmZ1bGxzY3JlZW4kID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0Z1bGxzY3JlZW4kO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mcm9tTGF0TG5nKSB7XHJcbiAgICAgIGNvbnN0IG9ic0xvY2F0aW9uSWNvbiA9IEwuaWNvbih7XHJcbiAgICAgICAgaWNvblVybDogJy9hc3NldHMvaWNvbi9tYXAvb2JzLWxvY2F0aW9uLnN2ZycsXHJcbiAgICAgICAgaWNvblNpemU6IFsyNSwgNDFdLFxyXG4gICAgICAgIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gICAgICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgICAgIHNoYWRvd1NpemU6IFs0MSwgNDFdXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmZyb21NYXJrZXIgPSBMLm1hcmtlcih0aGlzLmZyb21MYXRMbmcsIHsgaWNvbjogb2JzTG9jYXRpb25JY29uIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmRhbWFnZU9icyAmJlxyXG4gICAgICAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGxhdExuZyA9IEwubGF0TG5nKFxyXG4gICAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxvbmdpdHVkZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBkYW1hZ2VMb2NhdGlvbkljb24gPSBMLmljb24oe1xyXG4gICAgICAgIGljb25Vcmw6IHRoaXMubG9jYXRpb25NYXJrZXJJY29uVXJsLFxyXG4gICAgICAgIGljb25TaXplOiBbMjUsIDQxXSxcclxuICAgICAgICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcclxuICAgICAgICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgICAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKGxhdExuZywgeyBpY29uOiBkYW1hZ2VMb2NhdGlvbkljb24gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICB0aGlzLnN3aXBlQmFja1NlcnZpY2UuZGlzYWJsZVN3aXBlQmFjaygpO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIHRoaXMuc3dpcGVCYWNrU2VydmljZS5lbmFibGVTd2lwZUJhY2soKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uTG9jYXRpb25TZXQoZXZlbnQ6IE9ic0xvY2F0aW9uRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5zZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50LmNvbmZpcm1Mb2NhdGlvbigpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlciAqbmdJZj1cIiEoZnVsbHNjcmVlbiQgfCBhc3luYylcIj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5TRVRfREFNQUdFX0xPQ0FUSU9OLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXNldC1sb2NhdGlvbi1pbi1tYXAgKm5nSWY9XCJmcm9tTWFya2VyXCIgW2dlb0hhemFyZF09XCJnZW9IYXphcmRcIiBbZnJvbU1hcmtlcl09XCJmcm9tTWFya2VyXCIgW2xvY2F0aW9uTWFya2VyXT1cImxvY2F0aW9uTWFya2VyXCJcclxuICAgIFtsb2NhdGlvbk1hcmtlckljb25VcmxdPVwibG9jYXRpb25NYXJrZXJJY29uVXJsXCIgKGxvY2F0aW9uU2V0KT1cIm9uTG9jYXRpb25TZXQoJGV2ZW50KVwiIGNvbmZpcm1Mb2NhdGlvblRleHQ9XCJSRUdJU1RSQVRJT04uU0VUX0RBTUFHRV9MT0NBVElPTi5DT05GSVJNX1RFWFRcIlxyXG4gICAgZnJvbUxvY2F0aW9uVGV4dD1cIlJFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uVElUTEVcIiBbc2hvd1ByZXZpb3VzVXNlZExvY2F0aW9uc109XCJmYWxzZVwiIGxvY2F0aW9uVGl0bGU9XCJSRUdJU1RSQVRJT04uU0VUX0RBTUFHRV9MT0NBVElPTi5USVRMRVwiPlxyXG4gIDwvYXBwLXNldC1sb2NhdGlvbi1pbi1tYXA+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEYW1hZ2VQYWdlIH0gZnJvbSAnLi9kYW1hZ2UucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEYW1hZ2VPYnNDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2RhbWFnZS1vYnMvZGFtYWdlLW9icy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZXREYW1hZ2VMb2NhdGlvblBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi9zZXQtZGFtYWdlLWxvY2F0aW9uL3NldC1kYW1hZ2UtbG9jYXRpb24ubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBEYW1hZ2VQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgU2V0RGFtYWdlTG9jYXRpb25QYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0RhbWFnZVBhZ2UsIERhbWFnZU9ic0NvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERhbWFnZVBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBLZHZFbGVtZW50IH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmNvbnN0IE5PX0RBTUFHRV9WSVNJQkxFID0gNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhbWFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhbWFnZS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RhbWFnZS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFtYWdlUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBkYW1hZ2VUeXBlczogS2R2RWxlbWVudFtdO1xyXG4gIGNoZWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gIGdldCBpc0NoZWNrZWQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJlZ2lzdHJhdGlvbiB8fFxyXG4gICAgICAhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdCB8fFxyXG4gICAgICAhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMgfHxcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMubGVuZ3RoID09PSAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbHRlcihcclxuICAgICAgICAoeCkgPT4geC5EYW1hZ2VUeXBlVElEICE9PSBOT19EQU1BR0VfVklTSUJMRVxyXG4gICAgICApLmxlbmd0aCA+IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXQgaXNDaGVja2VkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5jaGVja2VkID0gdmFsO1xyXG4gICAgaWYgKHZhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgRGFtYWdlVHlwZVRJRDogTk9fREFNQUdFX1ZJU0lCTEVcclxuICAgICAgICB9XHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbWFnZU9icyA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbHRlcihcclxuICAgICAgICAoeCkgPT4geC5EYW1hZ2VUeXBlVElEICE9PSBOT19EQU1BR0VfVklTSUJMRVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZHZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5EYW1hZ2VPYnMsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgY29uc3QgZ2VvSGF6YXJkTmFtZSA9IEdlb0hhemFyZFt0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRdO1xyXG4gICAgdGhpcy5rZHZTdWJzY3JpcHRpb24gPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoYCR7Z2VvSGF6YXJkTmFtZX1fRGFtYWdlVHlwZUtEVmApXHJcbiAgICAgIC5waXBlKG1hcCgodmFsKSA9PiB2YWwuZmlsdGVyKCh4KSA9PiB4LklkICE9PSBOT19EQU1BR0VfVklTSUJMRSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKChrZHZFbGVtZW50cykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRhbWFnZVR5cGVzID0ga2R2RWxlbWVudHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmtkdlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiXHJcbiAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuQ0FOX1lPVV9TRUVfREFNQUdFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLXJhZGlvLWdyb3VwIFsobmdNb2RlbCldPVwiaXNDaGVja2VkXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBjaGVja2VkID09PSB0cnVlfVwiIChjbGljayk9XCJpc0NoZWNrZWQgPSB0cnVlXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7ICdESUFMT0dTLllFUycgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tcmFkaW8gbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgW3ZhbHVlXT1cInRydWVcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDxpb24taXRlbSBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogY2hlY2tlZCA9PT0gZmFsc2V9XCIgKGNsaWNrKT1cImlzQ2hlY2tlZCA9IGZhbHNlXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7ICdESUFMT0dTLk5PJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1yYWRpbyBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbdmFsdWVdPVwiZmFsc2VcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L2lvbi1yYWRpby1ncm91cD5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQ2hlY2tlZCAmJiBkYW1hZ2VUeXBlc1wiPlxyXG4gICAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLldIQVRfSVNfREFNQUdFRCcgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICAgIDxhcHAtZGFtYWdlLW9icyAqbmdGb3I9XCJsZXQgZGFtYWdlVHlwZSBvZiBkYW1hZ2VUeXBlc1wiIFsocmVnaXN0cmF0aW9uKV09XCJyZWdpc3RyYXRpb25cIlxyXG4gICAgICAgICAgW2RhbWFnZVR5cGVJZF09XCJkYW1hZ2VUeXBlLklkXCIgW2RhbWFnZVR5cGVOYW1lXT1cImRhbWFnZVR5cGUuTmFtZVwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCI+XHJcbiAgICAgICAgPC9hcHAtZGFtYWdlLW9icz5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=