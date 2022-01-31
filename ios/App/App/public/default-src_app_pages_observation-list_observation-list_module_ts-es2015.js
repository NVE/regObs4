"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_pages_observation-list_observation-list_module_ts"],{

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

/***/ 73442:
/*!*******************************************************************!*\
  !*** ./src/app/pages/observation-list/observation-list.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservationListPageModule": function() { return /* binding */ ObservationListPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _observation_list_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observation-list.page */ 10543);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */ 85815);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _observation_list_page__WEBPACK_IMPORTED_MODULE_0__.ObservationListPage
    }
];
class ObservationListPageModule {
}
ObservationListPageModule.ɵfac = function ObservationListPageModule_Factory(t) { return new (t || ObservationListPageModule)(); };
ObservationListPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ObservationListPageModule });
ObservationListPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule,
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ObservationListPageModule, { declarations: [_observation_list_page__WEBPACK_IMPORTED_MODULE_0__.ObservationListPage], imports: [_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule,
        _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 10543:
/*!*****************************************************************!*\
  !*** ./src/app/pages/observation-list/observation-list.page.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObservationListPage": function() { return /* binding */ ObservationListPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/observation/observation.service */ 83497);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _modules_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/map/services/map/map.service */ 29789);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _core_services_data_marshall_data_marshall_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/data-marshall/data-marshall.service */ 68727);
/* harmony import */ var src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/shared/components/header/header.component */ 24201);
/* harmony import */ var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */ 30164);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../modules/shared/components/geo-fab/geo-fab.component */ 49744);
/* harmony import */ var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../modules/shared/components/add-menu/add-menu.component */ 26331);
/* harmony import */ var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/observation/observation-list-card/observation-list-card.component */ 50388);
/* harmony import */ var _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/observation/observation-skeleton/observation-skeleton.component */ 47583);
/* harmony import */ var angular_svg_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! angular-svg-icon */ 70459);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 70325);

























function ObservationListPage_ng_container_4_ion_list_1_app_observation_list_card_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-observation-list-card", 12);
} if (rf & 2) {
    const obs_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("obs", obs_r7);
} }
const _c0 = function (a0) { return { loaded: a0 }; };
function ObservationListPage_ng_container_4_ion_list_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-list", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, ObservationListPage_ng_container_4_ion_list_1_app_observation_list_card_5_Template, 1, 1, "app-observation-list-card", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](6, _c0, ctx_r4.loaded));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "OBSERVATION_LIST.IN_MAP_VIEW"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r4.visibleObservations)("ngForTrackBy", ctx_r4.trackByIdFunc);
} }
const _c1 = function (a0) { return { maxCount: a0 }; };
function ObservationListPage_ng_container_4_ion_row_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-row", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-col", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "h3", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 2, "OBSERVATION_LIST.MAX_COUNT_REACHED_HEADER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](7, 4, "OBSERVATION_LIST.MAX_COUNT_REACHED_TEXT", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](7, _c1, ctx_r5.maxCount)), "");
} }
function ObservationListPage_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ObservationListPage_ng_container_4_ion_list_1_Template, 6, 8, "ion-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-infinite-scroll", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionInfinite", function ObservationListPage_ng_container_4_Template_ion_infinite_scroll_ionInfinite_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r8.loadNextPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-infinite-scroll-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ObservationListPage_ng_container_4_ion_row_4_Template, 8, 9, "ion-row", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.visibleObservations.length > 0)("ngIfElse", _r2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.maxCountReached);
} }
function ObservationListPage_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h3", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "app-observation-skeleton");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 1, "OBSERVATION_LIST.IN_MAP_VIEW"));
} }
function ObservationListPage_ng_template_8_ion_grid_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-grid", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-row", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-col", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "svg-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "svg-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "svg-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "svg-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "ion-row", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "ion-col", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "h3", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](15, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](12, 2, "OBSERVATION_LIST.NO_OBSERVATIONS"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](15, 4, "OBSERVATION_LIST.NO_OBSERVATIONS_TEXT"));
} }
function ObservationListPage_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ObservationListPage_ng_template_8_ion_grid_0_Template, 16, 6, "ion-grid", 17);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r3.loaded);
} }
const PAGE_SIZE = 10;
const MAX_OBSERVATION_COUNT = 100;
class ObservationListPage extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__.NgDestoryBase {
    constructor(observationService, dataMarshallService, cdr, mapService, userSettingService) {
        super();
        this.observationService = observationService;
        this.dataMarshallService = dataMarshallService;
        this.cdr = cdr;
        this.mapService = mapService;
        this.userSettingService = userSettingService;
        this.loaded = false;
        this.pageIndex = 0;
        this.trackByIdFunc = this.trackByIdFuncInternal.bind(this);
        this.refreshFunc = this.refresh.bind(this);
    }
    ngOnInit() {
        this.cancelSubject = this.dataMarshallService.observableCancelSubject;
        this.userSettingService.language$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.ngDestroy$)).subscribe((langKey) => {
            this.langKey = langKey;
        });
    }
    refresh(cancelPromise) {
        this.resetAndLoadObservations(true, cancelPromise);
    }
    ionViewWillEnter() {
        this.content.scrollToTop();
        this.resetAndLoadObservations();
    }
    ionViewWillLeave() {
        this.loaded = false;
        this.visibleObservations = undefined;
    }
    resetAndLoadObservations(forceUpdate = false, cancelPromise = undefined) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.loaded = false;
            this.visibleObservations = undefined;
            this.cdr.detectChanges();
            if (forceUpdate) {
                yield this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);
            }
            this.loadObservations();
        });
    }
    loadObservations() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.allObservations = yield this.getObservationsInMap();
            this.total = this.allObservations.length;
            this.pageIndex = 0;
            this.visibleObservations = this.allObservations.slice(0, 10);
            this.cdr.detectChanges();
            setTimeout(() => {
                this.loaded = true;
                this.scroll.disabled = false;
                this.cdr.detectChanges();
            }, 500);
        });
    }
    getObservationsInMap() {
        return this.mapService.mapView$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)((mapView) => this.observationService.observations$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((observations) => this.filterObservationsWithinViewBounds(observations, mapView)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)((observations) => observations.slice(0, MAX_OBSERVATION_COUNT)))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.take)(1))
            .toPromise();
    }
    loadNextPage(event) {
        this.pageIndex += 1;
        const startIndex = this.pageIndex * PAGE_SIZE;
        this.visibleObservations.push(...this.allObservations.slice(startIndex, startIndex + PAGE_SIZE));
        const target = event.target;
        target.complete();
        if (this.visibleObservations.length >= this.total) {
            target.disabled = true; //we have reached the end, so no need to load more pages from now
        }
    }
    get maxCountReached() {
        return this.visibleObservations.length >= MAX_OBSERVATION_COUNT;
    }
    get maxCount() {
        return MAX_OBSERVATION_COUNT;
    }
    filterObservationsWithinViewBounds(observations, view) {
        return observations.filter((observation) => !view ||
            view.bounds.contains(leaflet__WEBPACK_IMPORTED_MODULE_1__.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude)));
    }
    trackByIdFuncInternal(_, obs) {
        return obs ? this.observationService.uniqueObservation(obs, this.langKey) : undefined;
    }
}
ObservationListPage.ɵfac = function ObservationListPage_Factory(t) { return new (t || ObservationListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_data_marshall_data_marshall_service__WEBPACK_IMPORTED_MODULE_3__.DataMarshallService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_modules_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_2__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__.UserSettingService)); };
ObservationListPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: ObservationListPage, selectors: [["app-observation-list"]], viewQuery: function ObservationListPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScroll, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.scroll = _t.first);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]], decls: 10, vars: 6, consts: [[3, "title"], [3, "refreshFunc"], [4, "ngIf"], ["class", "loading-sceleton", 4, "ngIf"], ["slot", "fixed"], ["empty", ""], [3, "ngClass", 4, "ngIf", "ngIfElse"], [3, "ionInfinite"], ["class", "full-grid-row max-count-reached", 4, "ngIf"], [3, "ngClass"], [1, "ion-text-uppercase"], [3, "obs", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "obs"], [1, "full-grid-row", "max-count-reached"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"], [1, "loading-sceleton"], ["class", "full-grid", 4, "ngIf"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-align-self-center"], [1, "center"], ["src", "/assets/images/empty-states/rectangle.svg", 1, "rectangle"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin1"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin2"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin3"]], template: function ObservationListPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](1, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "app-refresh-with-cancel", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ObservationListPage_ng_container_4_Template, 5, 3, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, ObservationListPage_div_5_Template, 8, 3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "app-geo-fab", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "app-add-menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, ObservationListPage_ng_template_8_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](1, 4, "OBSERVATION_LIST.OBSERVATIONS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("refreshFunc", ctx.refreshFunc);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.visibleObservations !== undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.loaded);
    } }, directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_6__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_7__.RefreshWithCancelComponent, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_8__.GeoFabComponent, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_9__.AddMenuComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScroll, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScrollContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItemDivider, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_10__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonCol, _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_11__.ObservationSkeletonComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonGrid, angular_svg_icon__WEBPACK_IMPORTED_MODULE_20__.SvgIconComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe], styles: [".loading-sceleton[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\nion-item-divider[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  margin-bottom: 0px;\n}\n\nvirtual-scroller[_ngcontent-%COMP%], ion-list[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 1s linear;\n}\n\nvirtual-scroller.loaded[_ngcontent-%COMP%], ion-list.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n.last-item[_ngcontent-%COMP%] {\n  height: 50px;\n}\n\n.center[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n\n.center[_ngcontent-%COMP%]   .rectangle[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -36px;\n  top: -30px;\n}\n\n.center[_ngcontent-%COMP%]   .pin1[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -77px;\n}\n\n.center[_ngcontent-%COMP%]   .pin2[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 41px;\n  top: 51px;\n}\n\n.center[_ngcontent-%COMP%]   .pin3[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -41px;\n  top: -72px;\n}\n\n.max-count-reached[_ngcontent-%COMP%] {\n  padding-bottom: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9ic2VydmF0aW9uLWxpc3QucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0FBQ0Y7O0FBR0U7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBSUE7O0VBSUUsVUFBQTtFQUNBLDZCQUFBO0FBSEY7O0FBS0U7O0VBQ0UsVUFBQTtBQUZKOztBQU1BO0VBQ0UsWUFBQTtBQUhGOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQUhGOztBQUtFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQUhKOztBQU1FO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FBSko7O0FBT0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBTEo7O0FBUUU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBTko7O0FBVUE7RUFDRSxvQkFBQTtBQVBGIiwiZmlsZSI6Im9ic2VydmF0aW9uLWxpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRpbmctc2NlbGV0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbn1cclxuXHJcbmlvbi1pdGVtLWRpdmlkZXIge1xyXG4gIGgzIHtcclxuICAgIG1hcmdpbi10b3A6IDI0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbiAgfVxyXG59XHJcblxyXG52aXJ0dWFsLXNjcm9sbGVyLFxyXG5pb24tbGlzdCB7XHJcbiAgLy8gd2lkdGg6IDEwMCU7XHJcbiAgLy8gaGVpZ2h0OiAxMDAlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBsaW5lYXI7XHJcblxyXG4gICYubG9hZGVkIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG4ubGFzdC1pdGVtIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbi5jZW50ZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdG9wOiA1MCU7XHJcblxyXG4gIC5yZWN0YW5nbGUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTM2cHg7XHJcbiAgICB0b3A6IC0zMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBpbjEge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTc3cHg7XHJcbiAgfVxyXG5cclxuICAucGluMiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiA0MXB4O1xyXG4gICAgdG9wOiA1MXB4O1xyXG4gIH1cclxuXHJcbiAgLnBpbjMge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTQxcHg7XHJcbiAgICB0b3A6IC03MnB4O1xyXG4gIH1cclxufVxyXG5cclxuLm1heC1jb3VudC1yZWFjaGVkIHtcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG5cclxuIl19 */"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zcmNfYXBwX3BhZ2VzX29ic2VydmF0aW9uLWxpc3Rfb2JzZXJ2YXRpb24tbGlzdF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUMrQztBQUNGO0FBQ0E7QUFDNEI7O0FBT2xFLE1BQU0sOEJBQThCOzs0R0FBOUIsOEJBQThCOzJIQUE5Qiw4QkFBOEI7K0hBSmhDLENBQUMseURBQVksRUFBRSx1REFBVyxFQUFFLHVEQUFXLENBQUM7bUlBSXRDLDhCQUE4QixtQkFIMUIsa0ZBQXdCLGFBRDdCLHlEQUFZLEVBQUUsdURBQVcsRUFBRSx1REFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOSztBQUNPO0FBQ0k7QUFDbUQ7OztBQUVySCxNQUFNLE1BQU0sR0FBVztJQUNyQjtRQUNFLElBQUksRUFBRSxFQUFFO1FBQ1IsU0FBUyxFQUFFLHVFQUFtQjtLQUMvQjtDQUNGLENBQUM7QUFVSyxNQUFNLHlCQUF5Qjs7a0dBQXpCLHlCQUF5QjtzSEFBekIseUJBQXlCOzBIQVAzQjtZQUNQLDZIQUE4QjtZQUM5Qix1RUFBWTtZQUNaLGtFQUFxQixDQUFDLE1BQU0sQ0FBQztTQUM5QjttSUFHVSx5QkFBeUIsbUJBRnJCLHVFQUFtQixhQUpoQyw2SEFBOEI7UUFDOUIsdUVBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZPO0FBQ2tFO0FBQzVEO0FBRW9DO0FBQ087QUFHVDtBQUMrQjtBQUNEO0FBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7OztJQ1RqRSw0RkFDNEI7OztJQURnRSx3RUFBVzs7OztJQUp6RywrRUFBNkY7SUFDM0Ysb0ZBQWtCO0lBQ2hCLDBFQUErQjtJQUFBLHdEQUErQzs7SUFBQSw2REFBSztJQUNyRiw2REFBbUI7SUFDbkIsdUxBQzRCO0lBQzlCLDZEQUFXOzs7SUFORCwySkFBOEI7SUFFTCwyREFBK0M7SUFBL0Msa0tBQStDO0lBRXJDLDJEQUF3QjtJQUF4QixnR0FBd0I7Ozs7SUFP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QUMvQixDQUFDO0lBRU8sa0NBQWtDLENBQ3hDLFlBQXFDLEVBQ3JDLElBQWM7UUFFZCxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQ3hCLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDZCxDQUFDLElBQUk7WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDbEIsMkNBQVEsQ0FDTixXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDaEMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQ2xDLENBQ0YsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVPLHFCQUFxQixDQUFDLENBQUMsRUFBRSxHQUEwQjtRQUN6RCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN4RixDQUFDOztzRkFuSVUsbUJBQW1CO2tIQUFuQixtQkFBbUI7bUVBU25CLHVEQUFVO21FQUNWLDhEQUFpQjs7Ozs7O1FDdkM5Qiw0RUFBbUY7O1FBQ25GLCtFQUFhO1FBQ1gseUZBQStFO1FBQy9FLGtJQWtCZTtRQUNmLGdIQU9NO1FBQ04sNkVBQXdDO1FBQzFDLDZEQUFjO1FBQ2QsMkVBQTZCO1FBQzdCLDZNQW1CYzs7UUFwREYsZ0xBQXlEO1FBRTFDLDJEQUEyQjtRQUEzQix5RkFBMkI7UUFDckMsMkRBQXVDO1FBQXZDLHdHQUF1QztRQW1CdkIsMkRBQWE7UUFBYiw4RUFBYSIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvcGFnZXMvb2JzZXJ2YXRpb24tbGlzdC9vYnNlcnZhdGlvbi1saXN0Lm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy9vYnNlcnZhdGlvbi1saXN0L29ic2VydmF0aW9uLWxpc3QucGFnZS50cyIsIi4vc3JjL2FwcC9wYWdlcy9vYnNlcnZhdGlvbi1saXN0L29ic2VydmF0aW9uLWxpc3QucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLnBhZ2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25MaXN0UGFnZSB9IGZyb20gJy4vb2JzZXJ2YXRpb24tbGlzdC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IE9ic2VydmF0aW9uTGlzdFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFNoYXJlZE1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPYnNlcnZhdGlvbkxpc3RQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2JzZXJ2YXRpb25MaXN0UGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb2JzZXJ2YXRpb24vb2JzZXJ2YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCB0YWtlLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvbWFwL3NlcnZpY2VzL21hcC9tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IElNYXBWaWV3IH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9tYXAvc2VydmljZXMvbWFwL21hcC12aWV3LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgSW9uQ29udGVudCwgSW9uSW5maW5pdGVTY3JvbGwgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IERhdGFNYXJzaGFsbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2RhdGEtbWFyc2hhbGwvZGF0YS1tYXJzaGFsbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcbmltcG9ydCB7IExhbmdLZXkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5jb25zdCBQQUdFX1NJWkUgPSAxMDtcclxuY29uc3QgTUFYX09CU0VSVkFUSU9OX0NPVU5UID0gMTAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtb2JzZXJ2YXRpb24tbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29ic2VydmF0aW9uLWxpc3QucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vYnNlcnZhdGlvbi1saXN0LnBhZ2Uuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPYnNlcnZhdGlvbkxpc3RQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgdmlzaWJsZU9ic2VydmF0aW9uczogUmVnaXN0cmF0aW9uVmlld01vZGVsW107XHJcbiAgYWxsT2JzZXJ2YXRpb25zOiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXTtcclxuICBsb2FkZWQgPSBmYWxzZTtcclxuICBjYW5jZWxTdWJqZWN0OiBTdWJqZWN0PHVua25vd24+O1xyXG4gIHByaXZhdGUgcGFnZUluZGV4ID0gMDtcclxuICBwcml2YXRlIHRvdGFsOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBsYW5nS2V5OiBMYW5nS2V5O1xyXG5cclxuICBAVmlld0NoaWxkKElvbkNvbnRlbnQsIHsgc3RhdGljOiB0cnVlIH0pIGNvbnRlbnQ6IElvbkNvbnRlbnQ7XHJcbiAgQFZpZXdDaGlsZChJb25JbmZpbml0ZVNjcm9sbCwgeyBzdGF0aWM6IGZhbHNlIH0pIHNjcm9sbDogSW9uSW5maW5pdGVTY3JvbGw7XHJcblxyXG4gIHRyYWNrQnlJZEZ1bmMgPSB0aGlzLnRyYWNrQnlJZEZ1bmNJbnRlcm5hbC5iaW5kKHRoaXMpO1xyXG4gIHJlZnJlc2hGdW5jID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBvYnNlcnZhdGlvblNlcnZpY2U6IE9ic2VydmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZGF0YU1hcnNoYWxsU2VydmljZTogRGF0YU1hcnNoYWxsU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2FuY2VsU3ViamVjdCA9IHRoaXMuZGF0YU1hcnNoYWxsU2VydmljZS5vYnNlcnZhYmxlQ2FuY2VsU3ViamVjdDtcclxuICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmxhbmd1YWdlJC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKS5zdWJzY3JpYmUoKGxhbmdLZXkpID0+IHtcclxuICAgICAgdGhpcy5sYW5nS2V5ID0gbGFuZ0tleTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZWZyZXNoKGNhbmNlbFByb21pc2U6IFByb21pc2U8dW5rbm93bj4pOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRBbmRMb2FkT2JzZXJ2YXRpb25zKHRydWUsIGNhbmNlbFByb21pc2UpO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxFbnRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuY29udGVudC5zY3JvbGxUb1RvcCgpO1xyXG4gICAgdGhpcy5yZXNldEFuZExvYWRPYnNlcnZhdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIGlvblZpZXdXaWxsTGVhdmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy52aXNpYmxlT2JzZXJ2YXRpb25zID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyByZXNldEFuZExvYWRPYnNlcnZhdGlvbnMoXHJcbiAgICBmb3JjZVVwZGF0ZSA9IGZhbHNlLFxyXG4gICAgY2FuY2VsUHJvbWlzZTogUHJvbWlzZTx1bmtub3duPiA9IHVuZGVmaW5lZFxyXG4gICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMudmlzaWJsZU9ic2VydmF0aW9ucyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgIGlmIChmb3JjZVVwZGF0ZSkge1xyXG4gICAgICBhd2FpdCB0aGlzLm9ic2VydmF0aW9uU2VydmljZS5mb3JjZVVwZGF0ZU9ic2VydmF0aW9uc0ZvckN1cnJlbnRHZW9IYXphcmQoXHJcbiAgICAgICAgY2FuY2VsUHJvbWlzZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkT2JzZXJ2YXRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGxvYWRPYnNlcnZhdGlvbnMoKSB7XHJcbiAgICB0aGlzLmFsbE9ic2VydmF0aW9ucyA9IGF3YWl0IHRoaXMuZ2V0T2JzZXJ2YXRpb25zSW5NYXAoKTtcclxuICAgIHRoaXMudG90YWwgPSB0aGlzLmFsbE9ic2VydmF0aW9ucy5sZW5ndGg7XHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLnZpc2libGVPYnNlcnZhdGlvbnMgPSB0aGlzLmFsbE9ic2VydmF0aW9ucy5zbGljZSgwLCAxMCk7XHJcblxyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zY3JvbGwuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0T2JzZXJ2YXRpb25zSW5NYXAoKTogUHJvbWlzZTxSZWdpc3RyYXRpb25WaWV3TW9kZWxbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubWFwU2VydmljZS5tYXBWaWV3JFxyXG4gICAgICAucGlwZShcclxuICAgICAgICBzd2l0Y2hNYXAoKG1hcFZpZXc6IElNYXBWaWV3KSA9PlxyXG4gICAgICAgICAgdGhpcy5vYnNlcnZhdGlvblNlcnZpY2Uub2JzZXJ2YXRpb25zJC5waXBlKFxyXG4gICAgICAgICAgICBtYXAoKG9ic2VydmF0aW9ucykgPT5cclxuICAgICAgICAgICAgICB0aGlzLmZpbHRlck9ic2VydmF0aW9uc1dpdGhpblZpZXdCb3VuZHMob2JzZXJ2YXRpb25zLCBtYXBWaWV3KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBtYXAoKG9ic2VydmF0aW9ucykgPT4gb2JzZXJ2YXRpb25zLnNsaWNlKDAsIE1BWF9PQlNFUlZBVElPTl9DT1VOVCkpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSxcclxuICAgICAgICB0YWtlKDEpXHJcbiAgICAgIClcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZE5leHRQYWdlKGV2ZW50OiBDdXN0b21FdmVudDxJb25JbmZpbml0ZVNjcm9sbD4pOiB2b2lkIHtcclxuICAgIHRoaXMucGFnZUluZGV4ICs9IDE7XHJcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5wYWdlSW5kZXggKiBQQUdFX1NJWkU7XHJcbiAgICB0aGlzLnZpc2libGVPYnNlcnZhdGlvbnMucHVzaChcclxuICAgICAgLi4udGhpcy5hbGxPYnNlcnZhdGlvbnMuc2xpY2Uoc3RhcnRJbmRleCwgc3RhcnRJbmRleCArIFBBR0VfU0laRSlcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0OiBJb25JbmZpbml0ZVNjcm9sbCA9IChldmVudC50YXJnZXQgYXMgdW5rbm93bikgYXMgSW9uSW5maW5pdGVTY3JvbGw7XHJcbiAgICB0YXJnZXQuY29tcGxldGUoKTtcclxuICAgIGlmICh0aGlzLnZpc2libGVPYnNlcnZhdGlvbnMubGVuZ3RoID49IHRoaXMudG90YWwpIHtcclxuICAgICAgdGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTsgLy93ZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCwgc28gbm8gbmVlZCB0byBsb2FkIG1vcmUgcGFnZXMgZnJvbSBub3dcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtYXhDb3VudFJlYWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy52aXNpYmxlT2JzZXJ2YXRpb25zLmxlbmd0aCA+PSBNQVhfT0JTRVJWQVRJT05fQ09VTlQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4Q291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNQVhfT0JTRVJWQVRJT05fQ09VTlQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbHRlck9ic2VydmF0aW9uc1dpdGhpblZpZXdCb3VuZHMoXHJcbiAgICBvYnNlcnZhdGlvbnM6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbFtdLFxyXG4gICAgdmlldzogSU1hcFZpZXdcclxuICApIHtcclxuICAgIHJldHVybiBvYnNlcnZhdGlvbnMuZmlsdGVyKFxyXG4gICAgICAob2JzZXJ2YXRpb24pID0+XHJcbiAgICAgICAgIXZpZXcgfHxcclxuICAgICAgICB2aWV3LmJvdW5kcy5jb250YWlucyhcclxuICAgICAgICAgIEwubGF0TG5nKFxyXG4gICAgICAgICAgICBvYnNlcnZhdGlvbi5PYnNMb2NhdGlvbi5MYXRpdHVkZSxcclxuICAgICAgICAgICAgb2JzZXJ2YXRpb24uT2JzTG9jYXRpb24uTG9uZ2l0dWRlXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJhY2tCeUlkRnVuY0ludGVybmFsKF8sIG9iczogUmVnaXN0cmF0aW9uVmlld01vZGVsKSB7XHJcbiAgICByZXR1cm4gb2JzID8gdGhpcy5vYnNlcnZhdGlvblNlcnZpY2UudW5pcXVlT2JzZXJ2YXRpb24ob2JzLCB0aGlzLmxhbmdLZXkpIDogdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG4iLCI8YXBwLWhlYWRlciB0aXRsZT1cInt7ICdPQlNFUlZBVElPTl9MSVNULk9CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGUgfX1cIj48L2FwcC1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZnJlc2gtd2l0aC1jYW5jZWwgW3JlZnJlc2hGdW5jXT1cInJlZnJlc2hGdW5jXCI+PC9hcHAtcmVmcmVzaC13aXRoLWNhbmNlbD5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwidmlzaWJsZU9ic2VydmF0aW9ucyAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICA8aW9uLWxpc3QgW25nQ2xhc3NdPVwieyBsb2FkZWQ6IGxvYWRlZCB9XCIgKm5nSWY9XCIodmlzaWJsZU9ic2VydmF0aW9ucy5sZW5ndGggPiAwKSBlbHNlIGVtcHR5XCI+XHJcbiAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J09CU0VSVkFUSU9OX0xJU1QuSU5fTUFQX1ZJRVcnIHwgdHJhbnNsYXRlIH19PC9oMz5cclxuICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8YXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZCAqbmdGb3I9XCJsZXQgb2JzIG9mIHZpc2libGVPYnNlcnZhdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlJZEZ1bmM7XCIgW29ic109XCJvYnNcIj5cclxuICAgICAgPC9hcHAtb2JzZXJ2YXRpb24tbGlzdC1jYXJkPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24taW5maW5pdGUtc2Nyb2xsIChpb25JbmZpbml0ZSk9XCJsb2FkTmV4dFBhZ2UoJGV2ZW50KVwiID5cclxuICAgICAgPGlvbi1pbmZpbml0ZS1zY3JvbGwtY29udGVudD5cclxuICAgICAgPC9pb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQ+XHJcbiAgICA8L2lvbi1pbmZpbml0ZS1zY3JvbGw+XHJcbiAgICA8aW9uLXJvdyAqbmdJZj1cIm1heENvdW50UmVhY2hlZFwiIGNsYXNzPVwiZnVsbC1ncmlkLXJvdyBtYXgtY291bnQtcmVhY2hlZFwiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tbWFyZ2luLWhvcml6b250YWxcIj5cclxuICAgICAgICA8aDI+e3sgJ09CU0VSVkFUSU9OX0xJU1QuTUFYX0NPVU5UX1JFQUNIRURfSEVBREVSJyB8IHRyYW5zbGF0ZSB9fTwvaDI+XHJcbiAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPiB7eyAnT0JTRVJWQVRJT05fTElTVC5NQVhfQ09VTlRfUkVBQ0hFRF9URVhUJyB8IHRyYW5zbGF0ZToge21heENvdW50OiBtYXhDb3VudH0gfX08L2gzPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPGRpdiBjbGFzcz1cImxvYWRpbmctc2NlbGV0b25cIiAqbmdJZj1cIiFsb2FkZWRcIj5cclxuICAgIDxpb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydPQlNFUlZBVElPTl9MSVNULklOX01BUF9WSUVXJyB8IHRyYW5zbGF0ZSB9fTwvaDM+XHJcbiAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICA8YXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPjwvYXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPlxyXG4gICAgPGFwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj48L2FwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj5cclxuICAgIDxhcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+PC9hcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGFwcC1nZW8tZmFiIHNsb3Q9XCJmaXhlZFwiPjwvYXBwLWdlby1mYWI+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxhcHAtYWRkLW1lbnU+PC9hcHAtYWRkLW1lbnU+XHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHk+XHJcbiAgPGlvbi1ncmlkICpuZ0lmPVwibG9hZGVkXCIgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXJcIj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cInJlY3RhbmdsZVwiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2VtcHR5LXN0YXRlcy9yZWN0YW5nbGUuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cInBpbjFcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9lbXB0eS1zdGF0ZXMvcGluLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJwaW4yXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvZW1wdHktc3RhdGVzL3Bpbi5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwicGluM1wiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2VtcHR5LXN0YXRlcy9waW4uc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1tYXJnaW4taG9yaXpvbnRhbFwiPlxyXG4gICAgICAgIDxoMj4ge3sgJ09CU0VSVkFUSU9OX0xJU1QuTk9fT0JTRVJWQVRJT05TJyB8IHRyYW5zbGF0ZSB9fTwvaDI+XHJcbiAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPnt7J09CU0VSVkFUSU9OX0xJU1QuTk9fT0JTRVJWQVRJT05TX1RFWFQnfHRyYW5zbGF0ZX19PC9oMz5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvbmctdGVtcGxhdGU+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=