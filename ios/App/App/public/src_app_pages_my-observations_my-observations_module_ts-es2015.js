"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_my-observations_my-observations_module_ts"],{

/***/ 85815:
/*!*******************************************************************************************!*\
  !*** ./src/app/pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.module.ts ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullscreenImageModalPageModule": function() { return /* binding */ FullscreenImageModalPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fullscreen-image-modal.page */ 93675);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);





class FullscreenImageModalPageModule {
}
FullscreenImageModalPageModule.ɵfac = function FullscreenImageModalPageModule_Factory(t) { return new (t || FullscreenImageModalPageModule)(); };
FullscreenImageModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: FullscreenImageModalPageModule });
FullscreenImageModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](FullscreenImageModalPageModule, { declarations: [_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_0__.FullscreenImageModalPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule] }); })();


/***/ }),

/***/ 12803:
/*!*************************************************************************************!*\
  !*** ./src/app/pages/my-observations/components/draft-list/draft-list.component.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DraftListComponent": function() { return /* binding */ DraftListComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/registration/services/registration.service */ 33181);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sync-item/sync-item.component */ 59791);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);











function DraftListComponent_div_0_ion_item_divider_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item-divider", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-grid", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "h3", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-label", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 2, "REGISTRATION.DRAFTS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 4, "REGISTRATION.DRAFTS_DESCRIPTION"), " ");
} }
function DraftListComponent_div_0_app_sync_item_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-sync-item", 7);
} if (rf & 2) {
    const reg_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("registration", reg_r4);
} }
function DraftListComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, DraftListComponent_div_0_ion_item_divider_1_Template, 10, 6, "ion-item-divider", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, DraftListComponent_div_0_app_sync_item_3_Template, 1, 1, "app-sync-item", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registrations_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (registrations_r1 == null ? null : registrations_r1.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", registrations_r1)("ngForTrackBy", ctx_r0.trackByIdFunc);
} }
class DraftListComponent {
    constructor(registrationService) {
        this.registrationService = registrationService;
        this.isEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    }
    ngOnInit() {
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
        this.registrations$ = this.createRegistration$();
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    createRegistration$() {
        return this.registrationService.registrations$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)((regs) => regs.filter((reg) => reg.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft || reg.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Sync)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)((regs) => this.isEmpty.emit(regs.length === 0)));
    }
    trackByIdFunc(_, obs) {
        return obs ? obs.id : undefined;
    }
}
DraftListComponent.ɵfac = function DraftListComponent_Factory(t) { return new (t || DraftListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService)); };
DraftListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: DraftListComponent, selectors: [["app-draft-list"]], outputs: { isEmpty: "isEmpty" }, decls: 2, vars: 3, consts: [[4, "ngIf"], ["no-border", "", 4, "ngIf"], [3, "registration", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["no-border", ""], [1, "ion-no-padding", "ion-no-margin"], [1, "ion-text-uppercase"], ["color", "medium", 1, "ion-text-wrap"], [3, "registration"]], template: function DraftListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, DraftListComponent_div_0_Template, 4, 3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, ctx.registrations$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_2__.SyncItemComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe], styles: ["ion-item-divider[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWZ0LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtBQUNGIiwiZmlsZSI6ImRyYWZ0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbS1kaXZpZGVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59Il19 */"], changeDetection: 0 });


/***/ }),

/***/ 35014:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/my-observations/components/sent-list/sent-list.component.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SentListComponent": function() { return /* binding */ SentListComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 72184);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 52249);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 71775);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 67465);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var src_app_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/observation/observation.service */ 83497);
/* harmony import */ var src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/auth/services/regobs-auth.service */ 18955);
/* harmony import */ var src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/registration/services/registration.service */ 33181);
/* harmony import */ var src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/shared/services/logging/logging.service */ 93042);
/* harmony import */ var src_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/settings */ 30015);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/observation/observation-skeleton/observation-skeleton.component */ 47583);
/* harmony import */ var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/observation/observation-list-card/observation-list-card.component */ 50388);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






















function SentListComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} }
function SentListComponent_ng_container_11_ion_list_1_app_observation_list_card_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-observation-list-card", 12);
} if (rf & 2) {
    const reg_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("obs", reg_r5);
} }
const _c0 = function (a0) { return { loaded: a0 }; };
function SentListComponent_ng_container_11_ion_list_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-list", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SentListComponent_ng_container_11_ion_list_1_app_observation_list_card_1_Template, 1, 1, "app-observation-list-card", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](3, _c0, ctx_r2.loaded));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r2.loadedRegistrations)("ngForTrackBy", ctx_r2.trackByIdFunc);
} }
const _c1 = function (a0, a1) { return { maxCount: a0, myObservationsUrl: a1 }; };
function SentListComponent_ng_container_11_ion_row_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "h3", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 2, "MY_OBSERVATIONS.MAX_COUNT_REACHED_HEADER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](6, 4, "MY_OBSERVATIONS.MAX_COUNT_REACHED_TEXT", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](9, _c1, ctx_r3.maxCount, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 7, ctx_r3.myObservationsUrl$))), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
} }
function SentListComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SentListComponent_ng_container_11_ion_list_1_Template, 2, 5, "ion-list", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-infinite-scroll", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionInfinite", function SentListComponent_ng_container_11_Template_ion_infinite_scroll_ionInfinite_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.loadNextPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "ion-infinite-scroll-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, SentListComponent_ng_container_11_ion_row_4_Template, 8, 12, "ion-row", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.loadedRegistrations.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.maxCountReached);
} }
const PAGE_SIZE = 10;
const MAX_REGISTRATIONS_COUNT = 100;
class SentListComponent {
    constructor(observationService, userSettingService, registrationService, regobsAuthService, changeDetectorRef, loggingService, ngZone) {
        this.observationService = observationService;
        this.userSettingService = userSettingService;
        this.registrationService = registrationService;
        this.regobsAuthService = regobsAuthService;
        this.changeDetectorRef = changeDetectorRef;
        this.loggingService = loggingService;
        this.ngZone = ngZone;
        this.loadedRegistrations = [];
        this.loaded = false;
        this.refreshFunc = this.refresh.bind(this);
        this.isEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter();
        this.loadingMore = false;
        this.myObservationsUrl$ = this.createMyObservationsUrl$();
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.initRegistrationSubscription();
            this.registrationService.registrations$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((regs) => regs.length), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.pairwise)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(([lastCount, newCount]) => newCount - lastCount), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.filter)((diff) => diff < 0), //only fetch observations when num drafts decrease
            (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.debounceTime)(500) //wait a bit in case multiple observations were shipped
            )
                .subscribe(() => this.initRegistrationSubscription());
        });
    }
    refresh(cancelPromise) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.syncRegistrations(cancelPromise);
            yield this.initRegistrationSubscription(cancelPromise);
        });
    }
    initRegistrationSubscription(cancel) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.loaded = false;
            this.changeDetectorRef.detectChanges();
            this.pageIndex = 0;
            try {
                const result = yield (0,src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.toPromiseWithCancel)(this.getMyRegistrations$(0), cancel, 20000);
                this.loadedRegistrations = result;
                this.isEmpty.emit(result.length === 0);
            }
            catch (error) {
                this.loggingService.debug('Could not load my registrations', 'SentListComponent.initRegistrationSubscription()', error);
            }
            finally {
                this.loaded = true;
                this.changeDetectorRef.detectChanges();
            }
        });
    }
    getMyRegistrations$(pageNumber) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([
            this.userSettingService.appModeAndLanguage$,
            this.regobsAuthService.loggedInUser$
        ]).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.switchMap)(([[appMode, langKey], loggedInUser]) => {
            if (loggedInUser.isLoggedIn) {
                return this.observationService.getObservationsForCurrentUser(appMode, langKey, pageNumber, PAGE_SIZE);
            }
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.of)([]);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.take)(1));
    }
    loadNextPage(event) {
        const currentLength = this.loadedRegistrations.length;
        const currentPageIndex = Math.floor(currentLength / PAGE_SIZE);
        this.loadingMore = true;
        this.getMyRegistrations$(currentPageIndex)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.finalize)(() => {
            this.loadingMore = false;
        }))
            .subscribe((nextPage) => {
            this.loadedRegistrations = this.loadedRegistrations.concat(nextPage);
            this.pageIndex += 1;
            const target = event.target;
            target.complete();
            if (nextPage.length < PAGE_SIZE || this.maxCountReached) {
                target.disabled = true; //we have reached the end, so no need to load more pages from now
            }
            this.changeDetectorRef.detectChanges();
        });
    }
    trackByIdFunc(_, obs) {
        return obs ? obs.RegId.toString() : undefined;
    }
    get maxCountReached() {
        return this.loadedRegistrations.length >= MAX_REGISTRATIONS_COUNT;
    }
    get maxCount() {
        return MAX_REGISTRATIONS_COUNT;
    }
    createMyObservationsUrl$() {
        return this.userSettingService.userSetting$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((userSettings) => src_settings__WEBPACK_IMPORTED_MODULE_6__.settings.services.regObs.webUrl[userSettings.appMode]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.distinctUntilChanged)(), (0,src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.enterZone)(this.ngZone));
    }
}
SentListComponent.ɵfac = function SentListComponent_Factory(t) { return new (t || SentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_1__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_3__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_5__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone)); };
SentListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: SentListComponent, selectors: [["app-sent-list"]], outputs: { isEmpty: "isEmpty" }, decls: 12, vars: 8, consts: [["no-border", ""], [1, "ion-no-padding", "ion-no-margin"], [1, "ion-text-uppercase"], ["color", "medium", 1, "ion-text-wrap"], ["class", "loading-sceleton", 4, "ngIf"], [4, "ngIf"], [1, "loading-sceleton"], [3, "ngClass", 4, "ngIf"], [3, "ionInfinite"], ["class", "full-grid-row max-count-reached", 4, "ngIf"], [3, "ngClass"], [3, "obs", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "obs"], [1, "full-grid-row", "max-count-reached"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap", 3, "innerHTML"]], template: function SentListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item-divider", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-grid", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h3", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, SentListComponent_div_10_Template, 4, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, SentListComponent_ng_container_11_Template, 5, 2, "ng-container", 5);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 4, "MY_OBSERVATIONS.MY_SENT_OBSERVATIONS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 6, "MY_OBSERVATIONS.SENT_SUBTITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.loaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.loadedRegistrations !== undefined);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_7__.ObservationSkeletonComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonInfiniteScroll, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonInfiniteScrollContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgForOf, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonCol], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_22__.AsyncPipe], styles: [".max-count-reached[_ngcontent-%COMP%] {\n  padding-bottom: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0FBQ0YiLCJmaWxlIjoic2VudC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1heC1jb3VudC1yZWFjaGVkIHtcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufSJdfQ== */"], changeDetection: 0 });


/***/ }),

/***/ 59791:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/my-observations/components/sync-item/sync-item.component.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyncItemComponent": function() { return /* binding */ SyncItemComponent; }
/* harmony export */ });
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../modules/registration/services/registration.service */ 33181);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../modules/shared/components/geo-icon/geo-icon.component */ 12010);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../modules/shared/pipes/format-date/format-date.pipe */ 16531);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);














function SyncItemComponent_span_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "DRAFT"), "");
} }
function SyncItemComponent_ion_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 8);
} }
function SyncItemComponent_ion_spinner_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-spinner", 9);
} }
const _c0 = function (a0) { return [a0]; };
class SyncItemComponent {
    constructor(registrationService, progressService, cdr) {
        this.registrationService = registrationService;
        this.progressService = progressService;
        this.cdr = cdr;
        this.subscriptions = [];
        this.isDraft = false;
    }
    ngOnInit() {
        this.isDraft = this.registration.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;
        this.loading = !this.isDraft;
        this.subscriptions.push(this.registrationService
            .getRegistrationsToSync()
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((val) => val.find((item) => item.id === this.registration.id)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)((x) => !!x))
            .subscribe((val) => {
            this.registration = val;
            this.isDraft = this.registration.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;
            this.cdr.detectChanges();
        }));
        this.subscriptions.push(this.progressService.registrationSyncProgress$.subscribe((val) => {
            this.loading = val.inProgress;
            this.cdr.detectChanges();
        }));
    }
    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
    getLocationName(reg) {
        return reg.request.ObsLocation
            ? reg.request.ObsLocation.LocationName ||
                reg.request.ObsLocation.LocationDescription
            : '';
    }
}
SyncItemComponent.ɵfac = function SyncItemComponent_Factory(t) { return new (t || SyncItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.ProgressService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef)); };
SyncItemComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SyncItemComponent, selectors: [["app-sync-item"]], inputs: { registration: "registration" }, decls: 14, vars: 14, consts: [["lines", "full", 3, "detail", "routerLink"], ["slot", "start", 1, "geo-icon-circle"], [3, "geoHazards"], [1, "ion-text-wrap"], ["name", "calendar"], [4, "ngIf"], ["slot", "end", "name", "warning", 4, "ngIf"], ["slot", "end", 4, "ngIf"], ["slot", "end", "name", "warning"], ["slot", "end"]], template: function SyncItemComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-geo-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "formatDate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, SyncItemComponent_span_11_Template, 3, 3, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, SyncItemComponent_ion_icon_12_Template, 1, 0, "ion-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, SyncItemComponent_ion_spinner_13_Template, 1, 0, "ion-spinner", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", !ctx.loading)("routerLink", "/registration/edit/" + ctx.registration.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](12, _c0, ctx.registration.geoHazard));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.getLocationName(ctx.registration), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](9, 8, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](10, 10, ctx.registration.request.DtObsTime)), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isDraft);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.registration.syncError);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_3__.GeoIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeW5jLWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */"], changeDetection: 0 });


/***/ }),

/***/ 49579:
/*!*****************************************************************!*\
  !*** ./src/app/pages/my-observations/my-observations.module.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyObservationsPageModule": function() { return /* binding */ MyObservationsPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _my_observations_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./my-observations.page */ 84665);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/registration/shared-components.module */ 22623);
/* harmony import */ var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */ 85815);
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/guards/auth.guard */ 27574);
/* harmony import */ var _components_sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/sync-item/sync-item.component */ 59791);
/* harmony import */ var _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/draft-list/draft-list.component */ 12803);
/* harmony import */ var _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/sent-list/sent-list.component */ 35014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);











const routes = [
    {
        path: '',
        component: _my_observations_page__WEBPACK_IMPORTED_MODULE_0__.MyObservationsPage,
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__.AuthGuard]
    }
];
class MyObservationsPageModule {
}
MyObservationsPageModule.ɵfac = function MyObservationsPageModule_Factory(t) { return new (t || MyObservationsPageModule)(); };
MyObservationsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: MyObservationsPageModule });
MyObservationsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule,
            _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](MyObservationsPageModule, { declarations: [_my_observations_page__WEBPACK_IMPORTED_MODULE_0__.MyObservationsPage,
        _components_sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_5__.SyncItemComponent,
        _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_6__.DraftListComponent,
        _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_7__.SentListComponent], imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule,
        _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule] }); })();


/***/ }),

/***/ 84665:
/*!***************************************************************!*\
  !*** ./src/app/pages/my-observations/my-observations.page.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MyObservationsPage": function() { return /* binding */ MyObservationsPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules/registration/services/registration.service */ 33181);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sent-list/sent-list.component */ 35014);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */ 30164);
/* harmony import */ var _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/draft-list/draft-list.component */ 12803);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/shared/components/add-menu/add-menu.component */ 26331);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function MyObservationsPage_ion_grid_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-grid", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-row", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-col", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "svg-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-row", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ion-col", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "h3", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 2, "MY_OBSERVATIONS.NO_OBSERVATIONS"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](11, 4, "MY_OBSERVATIONS.NO_OBSERVATIONS_TEXT"));
} }
class MyObservationsPage {
    constructor(registrationService) {
        this.registrationService = registrationService;
        this.refreshFunc = this.refresh.bind(this);
        this.draftIsEmpty = false;
        this.sentRegistrationsIsEmpty = false;
    }
    refresh(cancelPromise) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.syncRegistrations(cancelPromise);
            yield this.sentListComponent.refresh(cancelPromise);
        });
    }
    refreshDraftEmptyState(isEmpty) {
        this.draftIsEmpty = isEmpty;
    }
    refreshSentEmptyState(isEmpty) {
        this.sentRegistrationsIsEmpty = isEmpty;
    }
}
MyObservationsPage.ɵfac = function MyObservationsPage_Factory(t) { return new (t || MyObservationsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService)); };
MyObservationsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: MyObservationsPage, selectors: [["app-my-observations"]], viewQuery: function MyObservationsPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonInfiniteScroll, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__.SentListComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.scroll = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.sentListComponent = _t.first);
    } }, decls: 13, vars: 5, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "refreshFunc"], [3, "isEmpty"], ["class", "full-grid", 4, "ngIf"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-text-center", "ion-align-self-center"], ["src", "/assets/images/empty-states/no-my-observations.svg"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"]], template: function MyObservationsPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "app-refresh-with-cancel", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "app-draft-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("isEmpty", function MyObservationsPage_Template_app_draft_list_isEmpty_9_listener($event) { return ctx.refreshDraftEmptyState($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "app-sent-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("isEmpty", function MyObservationsPage_Template_app_sent_list_isEmpty_10_listener($event) { return ctx.refreshSentEmptyState($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, MyObservationsPage_ion_grid_11_Template, 12, 6, "ion-grid", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "app-add-menu");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 3, "MY_OBSERVATIONS.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("refreshFunc", ctx.refreshFunc);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.draftIsEmpty && ctx.sentRegistrationsIsEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_3__.RefreshWithCancelComponent, _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_4__.DraftListComponent, _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__.SentListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__.AddMenuComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_10__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe], styles: ["virtual-scroller[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 1s linear;\n}\nvirtual-scroller.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\nion-item-divider[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\nion-spinner[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LW9ic2VydmF0aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtBQUNGO0FBQ0U7RUFDRSxVQUFBO0FBQ0o7QUFHQTtFQUNFLGdCQUFBO0FBQUY7QUFHQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQUYiLCJmaWxlIjoibXktb2JzZXJ2YXRpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInZpcnR1YWwtc2Nyb2xsZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMXMgbGluZWFyO1xyXG5cclxuICAmLmxvYWRlZCB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxufVxyXG5cclxuaW9uLWl0ZW0tZGl2aWRlciB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMDtcclxufVxyXG5cclxuaW9uLXNwaW5uZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG4iXX0= */"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc19teS1vYnNlcnZhdGlvbnNfbXktb2JzZXJ2YXRpb25zX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQytDO0FBQ0Y7QUFDQTtBQUM0Qjs7QUFPbEUsTUFBTSw4QkFBOEI7OzRHQUE5Qiw4QkFBOEI7MkhBQTlCLDhCQUE4QjsrSEFKaEMsQ0FBQyx5REFBWSxFQUFFLHVEQUFXLEVBQUUsdURBQVcsQ0FBQzttSUFJdEMsOEJBQThCLG1CQUgxQixrRkFBd0IsYUFEN0IseURBQVksRUFBRSx1REFBVyxFQUFFLHVEQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRDNCO0FBQ29CO0FBQ0Q7QUFDMEQ7QUFDSDs7Ozs7Ozs7SUNSL0Ysc0ZBQThEO0lBQzVELDhFQUErQztJQUM3QywwRUFBUztJQUNQLHdFQUErQjtJQUFBLHVEQUF1Qzs7SUFBQSw0REFBSztJQUM3RSw0REFBVTtJQUNWLDBFQUFTO0lBQ1AsK0VBQWdEO0lBQzlDLHVEQUNGOztJQUFBLDREQUFZO0lBQ2QsNERBQVU7SUFDWiw0REFBVztJQUNiLDREQUFtQjs7SUFSa0IsMERBQXVDO0lBQXZDLHVKQUF1QztJQUlwRSwwREFDRjtJQURFLDhLQUNGOzs7SUFLSiw4RUFBOEc7OztJQUFyQyxnRkFBb0I7OztJQWRqRyxzRUFBcUQ7SUFDbkQsK0lBV21CO0lBQ25CLDJFQUFVO0lBQ1Isd0lBQThHO0lBQ2hILDREQUFXO0lBQ2IsNERBQU07Ozs7SUFmZSwwREFBK0I7SUFBL0IsaUlBQStCO0lBYWpCLDBEQUFrQjtJQUFsQixxRkFBa0I7O0FERzlDLE1BQU0sa0JBQWtCO0lBSzdCLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSmxELFlBQU8sR0FBRyxJQUFJLHVEQUFZLEVBQVcsQ0FBQztJQUllLENBQUM7SUFFaEUsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSx5Q0FBTyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ2pELG1EQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUsscUdBQWdCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxvR0FBZSxDQUFDLENBQUMsRUFDOUcsbURBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNwRCxDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWEsQ0FBQyxDQUFVLEVBQUUsR0FBa0I7UUFDMUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxDQUFDOztvRkExQlUsa0JBQWtCO2dIQUFsQixrQkFBa0I7UUNqQi9CLDhHQWdCTTs7O1FBaEJBLHFKQUE2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNPWjtBQUU4QjtBQVU3QjtBQUl3QjtBQUMyQztBQUNFO0FBQ1A7QUFDVztBQUVSO0FBQ2pEOzs7Ozs7Ozs7Ozs7O0lDbEJ4Qyx5RUFBOEM7SUFDNUMsc0ZBQXFEO0lBQ3JELHNGQUFxRDtJQUNyRCxzRkFBcUQ7SUFDdkQsNERBQU07OztJQUdGLDJGQUFtSTs7O0lBQXhDLHVFQUFXOzs7O0lBRHhHLCtFQUFrRjtJQUNoRixxTEFBbUk7SUFDckksNERBQVc7OztJQUZELHlKQUE4QjtJQUNLLDBEQUF3QjtJQUF4QiwrRkFBd0I7Ozs7SUFNckUsOEVBQXlFO0lBQ3ZFLDhFQUF1RDtJQUNyRCxxRUFBSTtJQUFBLHVEQUE0RDs7SUFBQSw0REFBSztJQUNyRSxvRUFBdUs7OztJQUN6Syw0REFBVTtJQUNaLDREQUFVOzs7SUFIRiwwREFBNEQ7SUFBNUQsNEtBQTREO0lBQ3RDLDBEQUF1STtJQUF2SSxrYUFBdUk7Ozs7SUFYdkssd0VBQXdEO0lBQ3RELHVJQUVXO0lBQ1gseUZBQTJEO0lBQXRDLHVXQUFvQztJQUN2RCx5RkFDOEI7SUFDaEMsNERBQXNCO0lBQ3RCLHNJQUtVO0lBQ1oscUVBQWU7OztJQWI2QiwwREFBc0M7SUFBdEMsdUdBQXNDO0lBT3RFLDBEQUFxQjtJQUFyQix3RkFBcUI7O0FET2pDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLHVCQUF1QixHQUFHLEdBQUcsQ0FBQztBQVE3QixNQUFNLGlCQUFpQjtJQVM1QixZQUNVLGtCQUFzQyxFQUN0QyxrQkFBc0MsRUFDdEMsbUJBQXdDLEVBQ3hDLGlCQUFvQyxFQUNwQyxpQkFBb0MsRUFDcEMsY0FBOEIsRUFDOUIsTUFBYztRQU5kLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWZ4Qix3QkFBbUIsR0FBNEIsRUFBRSxDQUFDO1FBQ2xELFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLFlBQU8sR0FBRyxJQUFJLHVEQUFZLEVBQVcsQ0FBQztRQUNoRCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQWFsQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVLLFFBQVE7O1lBQ1osSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWM7aUJBQ3BDLElBQUksQ0FDSCxvREFBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQzFCLHlEQUFRLEVBQUUsRUFDVixvREFBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsRUFDcEQscUVBQW9CLEVBQUUsRUFDdEIsdURBQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLGtEQUFrRDtZQUM5RSw2REFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVEQUF1RDthQUMxRTtpQkFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsYUFBNEI7O1lBQ3hDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sSUFBSSxDQUFDLDRCQUE0QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTtJQUVhLDRCQUE0QixDQUN4QyxNQUFzQjs7WUFFdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSwyRkFBbUIsQ0FDdEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUMzQixNQUFNLEVBQ04sS0FBSyxDQUNOLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN4QztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUN2QixpQ0FBaUMsRUFDakMsa0RBQWtELEVBQ2xELEtBQUssQ0FDTixDQUFDO2FBQ0g7b0JBQVM7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QztRQUNILENBQUM7S0FBQTtJQUVPLG1CQUFtQixDQUN6QixVQUFrQjtRQUVsQixPQUFPLG9EQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQjtZQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYTtTQUNyQyxDQUFDLENBQUMsSUFBSSxDQUNMLDBEQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxZQUFZLENBQUMsVUFBVSxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyw2QkFBNkIsQ0FDMUQsT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsU0FBUyxDQUNWLENBQUM7YUFDSDtZQUNELE9BQU8seUNBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsRUFDRixxREFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7SUFDSixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQXlDO1FBQ3BELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7UUFDdEQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7YUFDdkMsSUFBSSxDQUNILHFEQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AseURBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSDthQUNBLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sTUFBTSxHQUF1QixLQUFLLENBQUMsTUFBdUMsQ0FBQztZQUNqRixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN2RCxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLGlFQUFpRTthQUMxRjtZQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxhQUFhLENBQUMsQ0FBVSxFQUFFLEdBQTBCO1FBQ2xELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksdUJBQXVCLENBQUM7SUFDcEUsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sdUJBQXVCLENBQUM7SUFDakMsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUM5QyxvREFBRyxDQUNELENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyx5RUFBK0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQ3hFLEVBQ0QscUVBQW9CLEVBQUUsRUFDdEIsaUZBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ3ZCLENBQUM7SUFDSixDQUFDOztrRkFuSVUsaUJBQWlCOytHQUFqQixpQkFBaUI7UUN6QzlCLHNGQUE0QjtRQUMxQiw4RUFBK0M7UUFDN0MsMEVBQVM7UUFDUCx3RUFBK0I7UUFBQSx1REFBd0Q7O1FBQUEsNERBQUs7UUFDOUYsNERBQVU7UUFDViwwRUFBUztRQUNQLCtFQUFnRDtRQUM5Qyx1REFDRjs7UUFBQSw0REFBWTtRQUNkLDREQUFVO1FBQ1osNERBQVc7UUFDYiw0REFBbUI7UUFDbkIsK0dBSU07UUFDTixpSUFjZTs7UUE1QnNCLDBEQUF3RDtRQUF4RCx3S0FBd0Q7UUFJckYsMERBQ0Y7UUFERSw0S0FDRjtRQUl5QiwwREFBYTtRQUFiLDZFQUFhO1FBSzdCLDBEQUF1QztRQUF2Qyx1R0FBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQmtFO0FBQ3BCO0FBQ1I7QUFFUztBQUN4RDs7Ozs7Ozs7Ozs7SUNNdkMsdUVBQXNCO0lBQUMsdURBQTJCOztJQUFBLDREQUFPOztJQUFsQywwREFBMkI7SUFBM0IscUpBQTJCOzs7SUFHdEQseUVBQ1c7OztJQUNYLDRFQUFzRDs7O0FESmpELE1BQU0saUJBQWlCO0lBTTVCLFlBQ1UsbUJBQXdDLEVBQ3hDLGVBQWdDLEVBQ2hDLEdBQXNCO1FBRnRCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUHhCLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUUzQyxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBTWIsQ0FBQztJQUVKLFFBQVE7UUFFTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxLQUFLLHFHQUFnQixDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQixJQUFJLENBQUMsbUJBQW1CO2FBQ3JCLHNCQUFzQixFQUFFO2FBQ3hCLElBQUksQ0FDSCxtREFBRyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFLENBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FDckQsRUFDRCxzREFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25CO2FBQ0EsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxxR0FBZ0IsQ0FBQztZQUNqRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxLQUFLLE1BQU0sWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDN0MsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFrQjtRQUNoQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUM1QixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsWUFBWTtnQkFDbEMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsbUJBQW1CO1lBQy9DLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDOztrRkFsRFUsaUJBQWlCOytHQUFqQixpQkFBaUI7UUNYOUIsOEVBQWtHO1FBQ2hHLHlFQUEwQztRQUN4Qyw2RUFBcUU7UUFDdkUsNERBQU07UUFDTiw0RUFBVztRQUNULHFFQUFJO1FBQ0YsdURBQ0Y7UUFBQSw0REFBSztRQUNMLHVFQUF5QjtRQUN2Qix5RUFBcUM7UUFBQyx1REFDdEM7OztRQUFBLGlIQUF5RDtRQUMzRCw0REFBSTtRQUNOLDREQUFZO1FBQ1oseUhBQ1c7UUFDWCwrSEFBc0Q7UUFDeEQsNERBQVc7O1FBaEJZLGdGQUFtQjtRQUV4QiwwREFBdUM7UUFBdkMsMEtBQXVDO1FBSW5ELDBEQUNGO1FBREUsaUhBQ0Y7UUFFd0MsMERBQ3RDO1FBRHNDLGtQQUN0QztRQUFPLDBEQUFhO1FBQWIsNkVBQWE7UUFHYiwwREFBd0M7UUFBeEMsNEdBQXdDO1FBRXJDLDBEQUFhO1FBQWIsNkVBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZjBCO0FBQ0s7QUFDTTtBQUMyQjtBQUN3QjtBQUM1RDtBQUNzQjtBQUNHO0FBQ0g7OztBQUUvRSxNQUFNLE1BQU0sR0FBVztJQUNyQjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLHFFQUFrQjtRQUM3QixXQUFXLEVBQUUsQ0FBQyw4REFBUyxDQUFDO0tBQ3pCO0NBQ0YsQ0FBQztBQWdCSyxNQUFNLHdCQUF3Qjs7Z0dBQXhCLHdCQUF3QjtxSEFBeEIsd0JBQXdCO3lIQWIxQjtZQUNQLHVFQUFZO1lBQ1osa0dBQXNCO1lBQ3RCLDZIQUE4QjtZQUM5QixrRUFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDOUI7bUlBUVUsd0JBQXdCLG1CQU5qQyxxRUFBa0I7UUFDbEIsd0ZBQWlCO1FBQ2pCLDJGQUFrQjtRQUNsQix3RkFBaUIsYUFUakIsdUVBQVk7UUFDWixrR0FBc0I7UUFDdEIsNkhBQThCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEI2RDtBQUNoQztBQUNnQjs7Ozs7Ozs7Ozs7OztJQ1U3RSw4RUFBNkU7SUFDM0UsNkVBQStCO0lBQzdCLDZFQUF1RDtJQUNyRCx5RUFBOEU7SUFDaEYsNERBQVU7SUFDWiw0REFBVTtJQUNWLDZFQUErQjtJQUM3Qiw4RUFBdUQ7SUFDckQscUVBQUk7SUFBQyx1REFBbUQ7O0lBQUEsNERBQUs7SUFDN0QseUVBQTBCO0lBQUEsd0RBQW9EOztJQUFBLDREQUFLO0lBQ3JGLDREQUFVO0lBQ1osNERBQVU7SUFDWiw0REFBVzs7SUFKQSwwREFBbUQ7SUFBbkQsNktBQW1EO0lBQzlCLDBEQUFvRDtJQUFwRCx5S0FBb0Q7O0FEWC9FLE1BQU0sa0JBQWtCO0lBVTdCLFlBQW9CLG1CQUF3QztRQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBSjVELGdCQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7SUFFMUQsT0FBTyxDQUFDLGFBQTRCOztZQUN4QyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVoRSxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRUQsc0JBQXNCLENBQUMsT0FBZ0I7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7SUFDOUIsQ0FBQztJQUVELHFCQUFxQixDQUFDLE9BQWdCO1FBQ3BDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7SUFDMUMsQ0FBQzs7b0ZBeEJVLGtCQUFrQjtnSEFBbEIsa0JBQWtCO2tFQUNsQixzREFBVTtrRUFDViw2REFBaUI7a0VBQ2pCLHdGQUFpQjs7Ozs7OztRQ2I5Qiw2RUFBWTtRQUNWLGlGQUF1QztRQUNyQyxpRkFBMEI7UUFDeEIsZ0ZBQTJEO1FBQzdELDREQUFjO1FBQ2QsNEVBQVc7UUFBQSx1REFBeUM7O1FBQUEsNERBQVk7UUFDbEUsNERBQWM7UUFDaEIsNERBQWE7UUFDYiw4RUFBYTtRQUNYLHdGQUErRTtRQUMvRSxvRkFBMkQ7UUFBM0MsNEpBQVcsa0NBQThCLElBQUM7UUFBQyw0REFBaUI7UUFDNUUsb0ZBQXlEO1FBQTFDLDRKQUFXLGlDQUE2QixJQUFDO1FBQUMsNERBQWdCO1FBQ3pFLDJIQVlXO1FBQ2IsNERBQWM7UUFDZCwyRUFBNkI7O1FBckJkLDBEQUF5QztRQUF6Qyx5SkFBeUM7UUFJN0IsMERBQTJCO1FBQTNCLHdGQUEyQjtRQUd6QywwREFBOEM7UUFBOUMsa0hBQThDIiwic291cmNlcyI6WyIuL3NyYy9hcHAvcGFnZXMvbW9kYWwtcGFnZXMvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy9teS1vYnNlcnZhdGlvbnMvY29tcG9uZW50cy9kcmFmdC1saXN0L2RyYWZ0LWxpc3QuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9jb21wb25lbnRzL2RyYWZ0LWxpc3QvZHJhZnQtbGlzdC5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9wYWdlcy9teS1vYnNlcnZhdGlvbnMvY29tcG9uZW50cy9zZW50LWxpc3Qvc2VudC1saXN0LmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9wYWdlcy9teS1vYnNlcnZhdGlvbnMvY29tcG9uZW50cy9zZW50LWxpc3Qvc2VudC1saXN0LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9jb21wb25lbnRzL3N5bmMtaXRlbS9zeW5jLWl0ZW0uY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9jb21wb25lbnRzL3N5bmMtaXRlbS9zeW5jLWl0ZW0uY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvcGFnZXMvbXktb2JzZXJ2YXRpb25zL215LW9ic2VydmF0aW9ucy5tb2R1bGUudHMiLCIuL3NyYy9hcHAvcGFnZXMvbXktb2JzZXJ2YXRpb25zL215LW9ic2VydmF0aW9ucy5wYWdlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9teS1vYnNlcnZhdGlvbnMucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLnBhZ2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZHJhZnQtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RyYWZ0LWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RyYWZ0LWxpc3QuY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAT3V0cHV0KCkgaXNFbXB0eSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICByZWdpc3RyYXRpb25zJDogT2JzZXJ2YWJsZTxJUmVnaXN0cmF0aW9uW10+O1xyXG4gIHByaXZhdGUgbmdEZXN0cm95JDogU3ViamVjdDx2b2lkPjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbnMkID0gdGhpcy5jcmVhdGVSZWdpc3RyYXRpb24kKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUmVnaXN0cmF0aW9uJCgpOiBPYnNlcnZhYmxlPElSZWdpc3RyYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5yZWdpc3RyYXRpb25zJC5waXBlKFxyXG4gICAgICBtYXAoKHJlZ3MpID0+IHJlZ3MuZmlsdGVyKChyZWcpID0+IHJlZy5zeW5jU3RhdHVzID09PSBTeW5jU3RhdHVzLkRyYWZ0IHx8IHJlZy5zeW5jU3RhdHVzID09PSBTeW5jU3RhdHVzLlN5bmMpKSxcclxuICAgICAgdGFwKChyZWdzKSA9PiB0aGlzLmlzRW1wdHkuZW1pdChyZWdzLmxlbmd0aCA9PT0gMCkpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUlkRnVuYyhfOiB1bmtub3duLCBvYnM6IElSZWdpc3RyYXRpb24pOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG9icyA/IG9icy5pZCA6IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuIiwiPCEtLSBzaG93cyBsaXN0IG9mIHJlZ2lzdHJhdGlvbnMgbm90IHNhdmVkIG9uIHNlcnZlciAoYm90aCBkcmFmdHMgYW5kIHJlZ2lzdHJhdGlvbnMgaW4gc3luYyktLT5cclxuPGRpdiAqbmdJZj1cInJlZ2lzdHJhdGlvbnMkIHwgYXN5bmMgYXMgcmVnaXN0cmF0aW9uc1wiPlxyXG4gIDxpb24taXRlbS1kaXZpZGVyICpuZ0lmPVwicmVnaXN0cmF0aW9ucz8ubGVuZ3RoID4gMFwiIG5vLWJvcmRlcj5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nIGlvbi1uby1tYXJnaW5cIj5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ1JFR0lTVFJBVElPTi5EUkFGVFMnIHwgdHJhbnNsYXRlIH19PC9oMz5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiIGNvbG9yPVwibWVkaXVtXCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkRSQUZUU19ERVNDUklQVElPTicgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgPGlvbi1saXN0PlxyXG4gICAgPGFwcC1zeW5jLWl0ZW0gKm5nRm9yPVwibGV0IHJlZyBvZiByZWdpc3RyYXRpb25zOyB0cmFja0J5OiB0cmFja0J5SWRGdW5jXCIgW3JlZ2lzdHJhdGlvbl09XCJyZWdcIj48L2FwcC1zeW5jLWl0ZW0+XHJcbiAgPC9pb24tbGlzdD5cclxuPC9kaXY+IiwiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE5nWm9uZSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElvbkluZmluaXRlU2Nyb2xsIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIGRlYm91bmNlVGltZSxcclxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcclxuICBmaWx0ZXIsXHJcbiAgZmluYWxpemUsXHJcbiAgbWFwLFxyXG4gIHBhaXJ3aXNlLFxyXG4gIHN3aXRjaE1hcCxcclxuICB0YWtlLFxyXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICBlbnRlclpvbmUsXHJcbiAgdG9Qcm9taXNlV2l0aENhbmNlbFxyXG59IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL3NlcnZpY2VzL29ic2VydmF0aW9uL29ic2VydmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvYXV0aC9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25WaWV3TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnc3JjL3NldHRpbmdzJztcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5jb25zdCBNQVhfUkVHSVNUUkFUSU9OU19DT1VOVCA9IDEwMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNlbnQtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VudC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBsb2FkZWRSZWdpc3RyYXRpb25zOiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXSA9IFtdO1xyXG4gIGxvYWRlZCA9IGZhbHNlO1xyXG4gIHJlZnJlc2hGdW5jID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XHJcbiAgQE91dHB1dCgpIGlzRW1wdHkgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgbG9hZGluZ01vcmUgPSBmYWxzZTtcclxuICBwYWdlSW5kZXg6IG51bWJlcjtcclxuICBteU9ic2VydmF0aW9uc1VybCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG9ic2VydmF0aW9uU2VydmljZTogT2JzZXJ2YXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHRoaXMubXlPYnNlcnZhdGlvbnNVcmwkID0gdGhpcy5jcmVhdGVNeU9ic2VydmF0aW9uc1VybCQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCk7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UucmVnaXN0cmF0aW9ucyRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZWdzKSA9PiByZWdzLmxlbmd0aCksXHJcbiAgICAgICAgcGFpcndpc2UoKSxcclxuICAgICAgICBtYXAoKFtsYXN0Q291bnQsIG5ld0NvdW50XSkgPT4gbmV3Q291bnQgLSBsYXN0Q291bnQpLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgZmlsdGVyKChkaWZmKSA9PiBkaWZmIDwgMCksIC8vb25seSBmZXRjaCBvYnNlcnZhdGlvbnMgd2hlbiBudW0gZHJhZnRzIGRlY3JlYXNlXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDUwMCkgLy93YWl0IGEgYml0IGluIGNhc2UgbXVsdGlwbGUgb2JzZXJ2YXRpb25zIHdlcmUgc2hpcHBlZFxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVmcmVzaChjYW5jZWxQcm9taXNlOiBQcm9taXNlPHZvaWQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc3luY1JlZ2lzdHJhdGlvbnMoY2FuY2VsUHJvbWlzZSk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRSZWdpc3RyYXRpb25TdWJzY3JpcHRpb24oY2FuY2VsUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGluaXRSZWdpc3RyYXRpb25TdWJzY3JpcHRpb24oXHJcbiAgICBjYW5jZWw/OiBQcm9taXNlPHZvaWQ+XHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IDA7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0b1Byb21pc2VXaXRoQ2FuY2VsKFxyXG4gICAgICAgIHRoaXMuZ2V0TXlSZWdpc3RyYXRpb25zJCgwKSxcclxuICAgICAgICBjYW5jZWwsXHJcbiAgICAgICAgMjAwMDBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5sb2FkZWRSZWdpc3RyYXRpb25zID0gcmVzdWx0O1xyXG4gICAgICB0aGlzLmlzRW1wdHkuZW1pdChyZXN1bHQubGVuZ3RoID09PSAwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoXHJcbiAgICAgICAgJ0NvdWxkIG5vdCBsb2FkIG15IHJlZ2lzdHJhdGlvbnMnLFxyXG4gICAgICAgICdTZW50TGlzdENvbXBvbmVudC5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCknLFxyXG4gICAgICAgIGVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNeVJlZ2lzdHJhdGlvbnMkKFxyXG4gICAgcGFnZU51bWJlcjogbnVtYmVyXHJcbiAgKTogT2JzZXJ2YWJsZTxSZWdpc3RyYXRpb25WaWV3TW9kZWxbXT4ge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5hcHBNb2RlQW5kTGFuZ3VhZ2UkLFxyXG4gICAgICB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciRcclxuICAgIF0pLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoW1thcHBNb2RlLCBsYW5nS2V5XSwgbG9nZ2VkSW5Vc2VyXSkgPT4ge1xyXG4gICAgICAgIGlmIChsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmdldE9ic2VydmF0aW9uc0ZvckN1cnJlbnRVc2VyKFxyXG4gICAgICAgICAgICBhcHBNb2RlLFxyXG4gICAgICAgICAgICBsYW5nS2V5LFxyXG4gICAgICAgICAgICBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICBQQUdFX1NJWkVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0YWtlKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbG9hZE5leHRQYWdlKGV2ZW50OiBDdXN0b21FdmVudDxSZWdpc3RyYXRpb25WaWV3TW9kZWw+KTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gdGhpcy5sb2FkZWRSZWdpc3RyYXRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IGN1cnJlbnRQYWdlSW5kZXggPSBNYXRoLmZsb29yKGN1cnJlbnRMZW5ndGggLyBQQUdFX1NJWkUpO1xyXG4gICAgdGhpcy5sb2FkaW5nTW9yZSA9IHRydWU7XHJcbiAgICB0aGlzLmdldE15UmVnaXN0cmF0aW9ucyQoY3VycmVudFBhZ2VJbmRleClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChuZXh0UGFnZSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucyA9IHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucy5jb25jYXQobmV4dFBhZ2UpO1xyXG4gICAgICAgIHRoaXMucGFnZUluZGV4ICs9IDE7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBJb25JbmZpbml0ZVNjcm9sbCA9IChldmVudC50YXJnZXQgYXMgdW5rbm93bikgYXMgSW9uSW5maW5pdGVTY3JvbGw7XHJcbiAgICAgICAgdGFyZ2V0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgaWYgKG5leHRQYWdlLmxlbmd0aCA8IFBBR0VfU0laRSB8fCB0aGlzLm1heENvdW50UmVhY2hlZCkge1xyXG4gICAgICAgICAgdGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTsgLy93ZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCwgc28gbm8gbmVlZCB0byBsb2FkIG1vcmUgcGFnZXMgZnJvbSBub3dcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUlkRnVuYyhfOiB1bmtub3duLCBvYnM6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gb2JzID8gb2JzLlJlZ0lkLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4Q291bnRSZWFjaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucy5sZW5ndGggPj0gTUFYX1JFR0lTVFJBVElPTlNfQ09VTlQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4Q291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNQVhfUkVHSVNUUkFUSU9OU19DT1VOVDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTXlPYnNlcnZhdGlvbnNVcmwkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckLnBpcGUoXHJcbiAgICAgIG1hcChcclxuICAgICAgICAodXNlclNldHRpbmdzKSA9PiBzZXR0aW5ncy5zZXJ2aWNlcy5yZWdPYnMud2ViVXJsW3VzZXJTZXR0aW5ncy5hcHBNb2RlXVxyXG4gICAgICApLFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICBlbnRlclpvbmUodGhpcy5uZ1pvbmUpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCI8IS0tIEEgbGlzdCBvZiBvYnNlcnZhdGlvbnMgc2VudCB0byBzZXJ2ZXIgLS0+XHJcbjxpb24taXRlbS1kaXZpZGVyIG5vLWJvcmRlcj5cclxuICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tbm8tbWFyZ2luXCI+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3sgJ01ZX09CU0VSVkFUSU9OUy5NWV9TRU5UX09CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGUgfX08L2gzPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCIgY29sb3I9XCJtZWRpdW1cIj5cclxuICAgICAgICB7eyAnTVlfT0JTRVJWQVRJT05TLlNFTlRfU1VCVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuPGRpdiBjbGFzcz1cImxvYWRpbmctc2NlbGV0b25cIiAqbmdJZj1cIiFsb2FkZWRcIj5cclxuICA8YXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPjwvYXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPlxyXG4gIDxhcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+PC9hcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+XHJcbiAgPGFwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj48L2FwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj5cclxuPC9kaXY+XHJcbjxuZy1jb250YWluZXIgKm5nSWY9XCJsb2FkZWRSZWdpc3RyYXRpb25zICE9PSB1bmRlZmluZWRcIj5cclxuICA8aW9uLWxpc3QgW25nQ2xhc3NdPVwieyBsb2FkZWQ6IGxvYWRlZCB9XCIgKm5nSWY9XCIobG9hZGVkUmVnaXN0cmF0aW9ucy5sZW5ndGggPiAwKVwiPlxyXG4gICAgPGFwcC1vYnNlcnZhdGlvbi1saXN0LWNhcmQgKm5nRm9yPVwibGV0IHJlZyBvZiBsb2FkZWRSZWdpc3RyYXRpb25zOyB0cmFja0J5OiB0cmFja0J5SWRGdW5jXCIgW29ic109XCJyZWdcIj48L2FwcC1vYnNlcnZhdGlvbi1saXN0LWNhcmQ+XHJcbiAgPC9pb24tbGlzdD5cclxuICA8aW9uLWluZmluaXRlLXNjcm9sbCAoaW9uSW5maW5pdGUpPVwibG9hZE5leHRQYWdlKCRldmVudClcIiA+XHJcbiAgICA8aW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PlxyXG4gICAgPC9pb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQ+XHJcbiAgPC9pb24taW5maW5pdGUtc2Nyb2xsPlxyXG4gIDxpb24tcm93ICpuZ0lmPVwibWF4Q291bnRSZWFjaGVkXCIgY2xhc3M9XCJmdWxsLWdyaWQtcm93IG1heC1jb3VudC1yZWFjaGVkXCI+XHJcbiAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tbWFyZ2luLWhvcml6b250YWxcIj5cclxuICAgICAgPGgyPnt7ICdNWV9PQlNFUlZBVElPTlMuTUFYX0NPVU5UX1JFQUNIRURfSEVBREVSJyB8IHRyYW5zbGF0ZSB9fTwvaDI+XHJcbiAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIiBbaW5uZXJIVE1MXT1cIidNWV9PQlNFUlZBVElPTlMuTUFYX0NPVU5UX1JFQUNIRURfVEVYVCcgfCB0cmFuc2xhdGU6IHttYXhDb3VudDogbWF4Q291bnQsIG15T2JzZXJ2YXRpb25zVXJsOiBteU9ic2VydmF0aW9uc1VybCQgfCBhc3luY31cIj48L2gzPlxyXG4gICAgPC9pb24tY29sPlxyXG4gIDwvaW9uLXJvdz5cclxuPC9uZy1jb250YWluZXI+XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95LCBOZ1pvbmUsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFByb2dyZXNzU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vbW9kdWxlcy9yZWdpc3RyYXRpb24vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXN5bmMtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N5bmMtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3luYy1pdGVtLmNvbXBvbmVudC5zY3NzJ10sY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTeW5jSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIGxvYWRpbmc6IGJvb2xlYW47XHJcbiAgaXNEcmFmdCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NTZXJ2aWNlOiBQcm9ncmVzc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgICB0aGlzLmlzRHJhZnQgPSB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID09PSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgdGhpcy5sb2FkaW5nID0gIXRoaXMuaXNEcmFmdDtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICAgICAgICAuZ2V0UmVnaXN0cmF0aW9uc1RvU3luYygpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKHZhbDogSVJlZ2lzdHJhdGlvbltdKSA9PlxyXG4gICAgICAgICAgICB2YWwuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gdGhpcy5yZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgICAgZmlsdGVyKCh4KSA9PiAhIXgpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSB2YWw7XHJcbiAgICAgICAgICB0aGlzLmlzRHJhZnQgPSB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID09PSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NTZXJ2aWNlLnJlZ2lzdHJhdGlvblN5bmNQcm9ncmVzcyQuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB2YWwuaW5Qcm9ncmVzcztcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IHN1YnNjcmlwdGlvbiBvZiB0aGlzLnN1YnNjcmlwdGlvbnMpIHtcclxuICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRMb2NhdGlvbk5hbWUocmVnOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gcmVnLnJlcXVlc3QuT2JzTG9jYXRpb25cclxuICAgICAgPyByZWcucmVxdWVzdC5PYnNMb2NhdGlvbi5Mb2NhdGlvbk5hbWUgfHxcclxuICAgICAgICAgIHJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uRGVzY3JpcHRpb25cclxuICAgICAgOiAnJztcclxuICB9XHJcbn0iLCI8IS0tIFNob3dzIGJyaWVmIGluZm8gZnJvbSBvbmUgb2JzZXJ2YXRpb24gbm90IHNhdmVkIG9uIHNlcnZlciAtLT5cclxuPGlvbi1pdGVtIGxpbmVzPVwiZnVsbFwiIFtkZXRhaWxdPVwiIWxvYWRpbmdcIiBbcm91dGVyTGlua109XCInL3JlZ2lzdHJhdGlvbi9lZGl0LycgKyByZWdpc3RyYXRpb24uaWRcIj5cclxuICA8ZGl2IHNsb3Q9XCJzdGFydFwiIGNsYXNzPVwiZ2VvLWljb24tY2lyY2xlXCI+XHJcbiAgICA8YXBwLWdlby1pY29uIFtnZW9IYXphcmRzXT1cIltyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXVwiPjwvYXBwLWdlby1pY29uPlxyXG4gIDwvZGl2PlxyXG4gIDxpb24tbGFiZWw+XHJcbiAgICA8aDI+XHJcbiAgICAgIHt7IGdldExvY2F0aW9uTmFtZShyZWdpc3RyYXRpb24pIH19XHJcbiAgICA8L2gyPlxyXG4gICAgPHAgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgIDxpb24taWNvbiBuYW1lPVwiY2FsZW5kYXJcIj48L2lvbi1pY29uPiB7eyByZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUgfCBmb3JtYXREYXRlIHwgYXN5bmMgfX1cclxuICAgICAgPHNwYW4gKm5nSWY9XCJpc0RyYWZ0XCI+IC0ge3sgJ0RSQUZUJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cclxuICAgIDwvcD5cclxuICA8L2lvbi1sYWJlbD5cclxuICA8aW9uLWljb24gKm5nSWY9XCIhbG9hZGluZyAmJiByZWdpc3RyYXRpb24uc3luY0Vycm9yXCIgc2xvdD1cImVuZFwiIG5hbWU9XCJ3YXJuaW5nXCI+XHJcbiAgPC9pb24taWNvbj5cclxuICA8aW9uLXNwaW5uZXIgKm5nSWY9XCJsb2FkaW5nXCIgc2xvdD1cImVuZFwiPjwvaW9uLXNwaW5uZXI+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNeU9ic2VydmF0aW9uc1BhZ2UgfSBmcm9tICcuL215LW9ic2VydmF0aW9ucy5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlJztcclxuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnLi4vLi4vY29yZS9ndWFyZHMvYXV0aC5ndWFyZCc7XHJcbmltcG9ydCB7IFN5bmNJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N5bmMtaXRlbS9zeW5jLWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRHJhZnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RyYWZ0LWxpc3QvZHJhZnQtbGlzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTZW50TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zZW50LWxpc3Qvc2VudC1saXN0LmNvbXBvbmVudCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogTXlPYnNlcnZhdGlvbnNQYWdlLFxyXG4gICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTXlPYnNlcnZhdGlvbnNQYWdlLFxyXG4gICAgU3luY0l0ZW1Db21wb25lbnQsXHJcbiAgICBEcmFmdExpc3RDb21wb25lbnQsXHJcbiAgICBTZW50TGlzdENvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE15T2JzZXJ2YXRpb25zUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvcmVnaXN0cmF0aW9uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSW9uQ29udGVudCwgSW9uSW5maW5pdGVTY3JvbGwgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNlbnRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3NlbnQtbGlzdC9zZW50LWxpc3QuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW15LW9ic2VydmF0aW9ucycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL215LW9ic2VydmF0aW9ucy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL215LW9ic2VydmF0aW9ucy5wYWdlLnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXlPYnNlcnZhdGlvbnNQYWdlIHtcclxuICBAVmlld0NoaWxkKElvbkNvbnRlbnQsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ6IElvbkNvbnRlbnQ7XHJcbiAgQFZpZXdDaGlsZChJb25JbmZpbml0ZVNjcm9sbCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNjcm9sbDogSW9uSW5maW5pdGVTY3JvbGw7XHJcbiAgQFZpZXdDaGlsZChTZW50TGlzdENvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgc2VudExpc3RDb21wb25lbnQ6IFNlbnRMaXN0Q29tcG9uZW50O1xyXG5cclxuICByZWZyZXNoRnVuYyA9IHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpO1xyXG4gIGRyYWZ0SXNFbXB0eSA9IGZhbHNlO1xyXG4gIHNlbnRSZWdpc3RyYXRpb25zSXNFbXB0eSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UpIHt9XHJcblxyXG4gIGFzeW5jIHJlZnJlc2goY2FuY2VsUHJvbWlzZTogUHJvbWlzZTx2b2lkPik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnN5bmNSZWdpc3RyYXRpb25zKGNhbmNlbFByb21pc2UpO1xyXG5cclxuICAgIGF3YWl0IHRoaXMuc2VudExpc3RDb21wb25lbnQucmVmcmVzaChjYW5jZWxQcm9taXNlKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hEcmFmdEVtcHR5U3RhdGUoaXNFbXB0eTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5kcmFmdElzRW1wdHkgPSBpc0VtcHR5O1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFNlbnRFbXB0eVN0YXRlKGlzRW1wdHk6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuc2VudFJlZ2lzdHJhdGlvbnNJc0VtcHR5ID0gaXNFbXB0eTtcclxuICB9XHJcbn1cclxuIiwiPCEtLSBzaG93cyBsaXN0cyBvZiBhbGwgcmVnaXN0cmF0aW9ucyBjcmVhdGVkOiBEcmFmdHMsIHJlZ2lzdHJhdGlvbnMgaW4gc3luYyBhbmQgcHVibGlzaGVkIHJlZ2lzdHJhdGlvbnMgLS0+XHJcbjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+e3sgJ01ZX09CU0VSVkFUSU9OUy5USVRMRScgfCB0cmFuc2xhdGUgfX08L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZnJlc2gtd2l0aC1jYW5jZWwgW3JlZnJlc2hGdW5jXT1cInJlZnJlc2hGdW5jXCI+PC9hcHAtcmVmcmVzaC13aXRoLWNhbmNlbD5cclxuICA8YXBwLWRyYWZ0LWxpc3QgKGlzRW1wdHkpPVwicmVmcmVzaERyYWZ0RW1wdHlTdGF0ZSgkZXZlbnQpXCI+PC9hcHAtZHJhZnQtbGlzdD5cclxuICA8YXBwLXNlbnQtbGlzdCAoaXNFbXB0eSk9XCJyZWZyZXNoU2VudEVtcHR5U3RhdGUoJGV2ZW50KVwiPjwvYXBwLXNlbnQtbGlzdD5cclxuICA8aW9uLWdyaWQgKm5nSWY9XCJkcmFmdElzRW1wdHkgJiYgc2VudFJlZ2lzdHJhdGlvbnNJc0VtcHR5XCIgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICA8c3ZnLWljb24gc3JjPVwiL2Fzc2V0cy9pbWFnZXMvZW1wdHktc3RhdGVzL25vLW15LW9ic2VydmF0aW9ucy5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLW1hcmdpbi1ob3Jpem9udGFsXCI+XHJcbiAgICAgICAgPGgyPiB7eyAnTVlfT0JTRVJWQVRJT05TLk5PX09CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj57eydNWV9PQlNFUlZBVElPTlMuTk9fT0JTRVJWQVRJT05TX1RFWFQnfHRyYW5zbGF0ZX19PC9oMz5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxhcHAtYWRkLW1lbnU+PC9hcHAtYWRkLW1lbnU+XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9