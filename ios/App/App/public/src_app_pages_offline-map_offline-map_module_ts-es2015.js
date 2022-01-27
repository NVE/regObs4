"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_offline-map_offline-map_module_ts"],{

/***/ 93919:
/*!*****************************************************!*\
  !*** ./src/app/pages/offline-map/metadata.model.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompoundPackage": function() { return /* binding */ CompoundPackage; }
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class CompoundPackage {
    constructor(metadata) {
        this.metadata = metadata;
    }
    static GetNameFromXYZ(x, y, z) {
        return `${x}-${y}-${z}`;
    }
    static GetFeatureId(x, y, z) {
        return CompoundPackage.GetNameFromXYZ(x, y, z);
    }
    getFeature() {
        const [xMin, yMin, xMax, yMax] = this.metadata.bbox;
        return {
            type: 'Feature',
            geometry: {
                bbox: this.metadata.bbox,
                type: 'Polygon',
                coordinates: [[
                        [xMin, yMin],
                        [xMin, yMax],
                        [xMax, yMax],
                        [xMax, yMin],
                        [xMin, yMin]
                    ]]
            },
            properties: null,
            id: CompoundPackage.GetFeatureId(...this.metadata.xyz)
        };
    }
    getSizeInMiB() {
        return this.metadata.sizeInMib;
    }
    getName() {
        const [x, y, z] = this.metadata.xyz;
        return CompoundPackage.GetNameFromXYZ(x, y, z);
    }
    getLastModified() {
        if (this.metadata.maps.length === 0) {
            return null;
        }
        return moment__WEBPACK_IMPORTED_MODULE_0___default().max(this.metadata.maps.map(p => moment__WEBPACK_IMPORTED_MODULE_0___default()(p.lastModified))).toDate();
    }
    getParts() {
        return this.metadata.maps
            // Hent name / url for alle pakker
            .map((p) => p.urls.map(url => ({ name: p.name, url })))
            // Flatten array
            .reduce((a, b) => a.concat(b), []);
    }
    getXYZ() {
        return this.metadata.xyz;
    }
}


/***/ }),

/***/ 54298:
/*!*********************************************************!*\
  !*** ./src/app/pages/offline-map/offline-map.module.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflineMapPageModule": function() { return /* binding */ OfflineMapPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _offline_map_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./offline-map.page */ 80697);
/* harmony import */ var src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/map/map.module */ 14522);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./offline-package-modal/offline-package-modal.component */ 6639);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);











const routes = [
    {
        path: '',
        component: _offline_map_page__WEBPACK_IMPORTED_MODULE_0__.OfflineMapPage
    }
];
class OfflineMapPageModule {
}
OfflineMapPageModule.ɵfac = function OfflineMapPageModule_Factory(t) { return new (t || OfflineMapPageModule)(); };
OfflineMapPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: OfflineMapPageModule });
OfflineMapPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes),
            src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__.MapModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](OfflineMapPageModule, { declarations: [_offline_map_page__WEBPACK_IMPORTED_MODULE_0__.OfflineMapPage, _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__.OfflinePackageModalComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__.MapModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule] }); })();


/***/ }),

/***/ 80697:
/*!*******************************************************!*\
  !*** ./src/app/pages/offline-map/offline-map.page.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflineMapPage": function() { return /* binding */ OfflineMapPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/offline-map/offline-map.service */ 12645);
/* harmony import */ var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/helpers/helper.service */ 22791);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 69606);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 57850);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 73794);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 41757);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 71775);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 46367);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs/operators */ 76477);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./offline-package-modal/offline-package-modal.component */ 6639);
/* harmony import */ var _metadata_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metadata.model */ 93919);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/map/components/map/map.component */ 6781);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/common */ 54364);






















const _c0 = function (a0) { return { packageCount: a0 }; };
function OfflineMapPage_ion_item_12_ion_label_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageTotals_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.PACKAGE_COUNT_SINGLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c0, packageTotals_r2.numPackages)));
} }
function OfflineMapPage_ion_item_12_ion_label_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-label", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageTotals_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.PACKAGE_COUNT_MULTIPLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c0, packageTotals_r2.numPackages)));
} }
function OfflineMapPage_ion_item_12_ion_icon_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-icon", 14);
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r5.expanded ? "chevron-down-circle" : "chevron-up-circle");
} }
const _c1 = function (a0) { return { spaceAvailable: a0 }; };
function OfflineMapPage_ion_item_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ion_item_12_Template_ion_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r8.expanded = !ctx_r8.expanded; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, OfflineMapPage_ion_item_12_ion_label_1_Template, 3, 6, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, OfflineMapPage_ion_item_12_ion_label_2_Template, 3, 6, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "ion-label", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, OfflineMapPage_ion_item_12_ion_icon_8_Template, 1, 1, "ion-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageTotals_r2 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages !== 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](packageTotals_r2.spaceUsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("(", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](7, 5, "OFFLINE_MAP.SPACE_AVAILABLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c1, ctx_r0.getSpaceAvailable())), ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages > 0);
} }
function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-icon", 18);
} }
function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template_ion_icon_click_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17); const item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit; const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r15.cancelOrDelete(item_r12, $event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} }
function OfflineMapPage_ng_container_15_ion_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ng_container_15_ion_item_1_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r19); const item_r12 = restoredCtx.$implicit; const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2); return ctx_r18.showPackageModalForPackage(item_r12); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, OfflineMapPage_ng_container_15_ion_item_1_ion_icon_7_Template, 1, 0, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template, 1, 0, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r11.humanReadableByteSize(item_r12.size));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r11.formatProgressIfDownloading(item_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r12.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !item_r12.error);
} }
function OfflineMapPage_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, OfflineMapPage_ng_container_15_ion_item_1_Template, 9, 5, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const items_r10 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", items_r10);
} }
const PACKAGE_INDEX_URL = 'https://offlinemap.blob.core.windows.net/packages/packageIndex_v2.json';
const filledTileOpacity = 0.8;
const notFilledTileOpacity = 0.1;
const documentStyle = getComputedStyle(document.body);
const defaultTileStyle = {
    color: documentStyle.getPropertyValue('--ion-color-primary'),
    opacity: 1,
    fillOpacity: notFilledTileOpacity
};
const downloadedTileStyle = Object.assign(Object.assign({}, defaultTileStyle), { fillOpacity: filledTileOpacity });
const errorTileStyle = Object.assign(Object.assign({}, downloadedTileStyle), { color: documentStyle.getPropertyValue('--ion-color-danger') });
class OfflineMapPage extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__.NgDestoryBase {
    constructor(helperService, modalController, offlineMapService, alertController, translateService, zone, http) {
        super();
        this.helperService = helperService;
        this.modalController = modalController;
        this.offlineMapService = offlineMapService;
        this.alertController = alertController;
        this.translateService = translateService;
        this.zone = zone;
        this.installedPackages = new Map();
        this.failedPackageIds = []; //remember failed packages until features are ready for styling
        this.packagesOnServer = new Map();
        this.showTileCard = true;
        // Could not get the click handler to only emit once per click, so wrapped this in a subject
        this.showModal = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
        this.isZooming = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false);
        this.featureMap = new Map();
        this.expanded = false; //show list of downloads if this is true
        // Download package index from azure
        this.packagesOnServer$ = http.get(PACKAGE_INDEX_URL).pipe(
        // Map downloaded package index to a packageName => package map
        (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((packageIndex) => {
            const nameAndPkg = packageIndex.map(p => [
                _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage.GetNameFromXYZ(...p.xyz),
                new _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage(p)
            ]);
            return new Map(nameAndPkg);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.shareReplay)());
        this.downloadAndUnzipProgress$ = this.offlineMapService.downloadAndUnzipProgress$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((items) => items.sort(((a, b) => b.downloadStart - a.downloadStart))));
        this.installedPackages$ = this.offlineMapService.packages$
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((downloaded) => new Map(downloaded.map((item) => [this.getFeatureIdForPackage(item), item]))));
        this.allPackages$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.combineLatest)([
            this.offlineMapService.downloadAndUnzipProgress$,
            this.offlineMapService.packages$
        ]).pipe(((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(([inProgress, downloaded]) => [...inProgress, ...downloaded])));
        this.packageTotals$ = this.allPackages$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)((packages) => {
            let count = 0;
            let space = 0;
            for (const mapPackage of packages) {
                count += 1;
                space += mapPackage.size;
            }
            let spaceWithUnit = '0 MB';
            if (space > 0) {
                spaceWithUnit = this.humanReadableByteSize(space);
            }
            return { numPackages: count, spaceUsed: spaceWithUnit };
        }));
    }
    onMapReady(map) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.LEAFLET_MAP = map;
        map.setZoom(7);
        this.tilesLayer = new leaflet__WEBPACK_IMPORTED_MODULE_2__.GeoJSON(null, {
            onEachFeature: (feature, layer) => {
                this.featureMap.set(feature.id, { feature, layer });
                layer.on('click', () => {
                    if (this.packagesOnServer.has(feature.id) || this.installedPackages.has(feature.id)) {
                        this.showModal.next(feature);
                    }
                });
            }
        });
        map.addLayer(this.tilesLayer);
        this.packagesOnServer$.subscribe(packageMap => {
            packageMap.forEach((mapPackage) => {
                this.tilesLayer.addData(mapPackage.getFeature());
            });
        });
        (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.combineLatest)([
            this.installedPackages$,
            this.packagesOnServer$
        ])
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$))
            .subscribe(([installedPackages, packagesOnServer]) => {
            this.installedPackages = installedPackages;
            this.packagesOnServer = packagesOnServer;
            this.setStyleForPackages();
        });
        this.downloadAndUnzipProgress$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.tap)((itemsWithProgress) => {
            this.failedPackageIds = itemsWithProgress.filter(item => item.error).map(item => item.name);
        })).subscribe((itemsWithProgress) => {
            this.zone.runOutsideAngular(() => {
                for (const item of itemsWithProgress) {
                    this.setStyleForProgressOrDownloadedPackage(item);
                }
            });
        });
        this.showModal.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.withLatestFrom)(this.isZooming), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.filter)(([, isZooming]) => !isZooming), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.switchMap)(([feature,]) => (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.from)(this.showPackageModal(feature))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$)).subscribe();
        // This is to avoid pinch-zooming on map triggers click event
        map.on('dragend zoomend', () => {
            this.isZooming.next(false);
        });
        map.on('dragstart zoomstart', () => {
            this.isZooming.next(true);
        });
    }
    setStyleForPackages() {
        for (const [, item] of this.installedPackages) {
            this.setStyleForProgressOrDownloadedPackage(item);
        }
        for (const [key,] of this.packagesOnServer) {
            let style = defaultTileStyle;
            if (!this.installedPackages.has(key)) {
                if (this.failedPackageIds.includes(key)) {
                    style = errorTileStyle;
                }
                this.setStyleForFeature(key, style);
            }
        }
    }
    setStyleForFeature(id, style) {
        const feature = this.featureMap.get(id);
        if (feature) {
            const polyline = feature.layer;
            polyline.setStyle(style);
        }
    }
    setStyleForProgressOrDownloadedPackage(item) {
        const id = this.getFeatureIdForPackage(item);
        if (item.error) {
            this.setStyleForFeature(id, errorTileStyle);
        }
        else {
            const fillOpacity = item.downloadComplete ? 0 : this.getProgressOpacity(item);
            this.setStyleForFeature(id, Object.assign(Object.assign({}, defaultTileStyle), { fillOpacity }));
        }
    }
    getProgressOpacity(item) {
        const progressValue = (item.progress ? (item.progress.percentage / 2.0) : 0) + 0.4;
        return Math.min(progressValue, filledTileOpacity);
    }
    getFeaturePropertyId(x, y, z) {
        return _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage.GetNameFromXYZ(x, y, z);
    }
    getFeatureIdForPackage(map) {
        if (map.compoundPackageMetadata) {
            return this.getFeaturePropertyId(...map.compoundPackageMetadata.getXYZ());
        }
        const firstMap = Object.keys(map.maps)[0];
        if (map.maps[firstMap]) {
            const rootTile = map.maps[firstMap].rootTile;
            return this.getFeaturePropertyId(rootTile.x, rootTile.y, rootTile.z);
        }
        return '';
    }
    showPackageModal(feature) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            const compoundPackage = this.packagesOnServer.get(feature.id);
            const name = compoundPackage.getName();
            const modal = yield this.modalController.create({
                component: _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__.OfflinePackageModalComponent,
                componentProps: {
                    feature: feature,
                    packageOnServer: compoundPackage,
                    offlinePackageStatus$: this.allPackages$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(packages => packages.find(p => p.name === name))),
                },
                swipeToClose: true,
                mode: 'ios'
            });
            yield modal.present();
        });
    }
    showPackageModalForPackage(map) {
        const feature = this.featureMap.get(map.name);
        if (feature) {
            this.showPackageModal(feature.feature);
        }
    }
    humanReadableByteSize(bytes, fractionDigits = 0) {
        if (isNaN(bytes)) {
            return '';
        }
        return this.helperService.humanReadableByteSize(bytes, fractionDigits, true);
    }
    formatProgressIfDownloading(map) {
        if (map.downloadStart && !map.downloadComplete) {
            const value = Math.round((map.progress ? map.progress.percentage : 0) * 100);
            return `(${value}%)`;
        }
        return '';
    }
    cancelOrDelete(map, event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            event.stopPropagation();
            if (this.isDownloaded(map)) {
                const toTranslate = ['OFFLINE_MAP.DELETE_PACKAGE_CONFIRM', 'DIALOGS.CANCEL', 'DIALOGS.DELETE'];
                const translations = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_22__.firstValueFrom)(this.translateService.get(toTranslate));
                const alert = yield this.alertController.create({
                    message: translations['OFFLINE_MAP.DELETE_PACKAGE_CONFIRM'],
                    buttons: [
                        {
                            text: translations['DIALOGS.CANCEL'],
                            role: 'cancel'
                        },
                        {
                            text: translations['DIALOGS.DELETE'],
                            handler: () => {
                                this.offlineMapService.removeMapPackageByName(map.name);
                            }
                        }
                    ]
                });
                alert.present();
            }
            else {
                this.offlineMapService.cancelDownloadPackage(map);
            }
        });
    }
    isDownloaded(map) {
        return !!map.downloadComplete;
    }
    getSpaceAvailable() {
        var _a;
        return this.humanReadableByteSize((_a = this.offlineMapService.availableDiskspace) === null || _a === void 0 ? void 0 : _a.available, 0);
    }
}
OfflineMapPage.ɵfac = function OfflineMapPage_Factory(t) { return new (t || OfflineMapPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_0__.OfflineMapService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_25__.HttpClient)); };
OfflineMapPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: OfflineMapPage, selectors: [["app-offline-map"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 17, vars: 18, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [1, "map-container"], [3, "offlinePackageMode", "showScale", "showMapSearch", "showFullscreenToggle", "showGpsCenter", "showUserLocation", "showSupportMaps", "autoActivate", "geoTag", "mapReady"], ["lines", "full", 3, "click", 4, "ngIf"], [1, "footer"], [4, "ngIf"], ["lines", "full", 3, "click"], ["class", "package-count", 4, "ngIf"], [1, "packages-size"], [1, "space-available"], ["slot", "end", "class", "expand-icon", 3, "name", 4, "ngIf"], [1, "package-count"], ["slot", "end", 1, "expand-icon", 3, "name"], ["lines", "full", 3, "click", 4, "ngFor", "ngForOf"], ["slot", "end", "name", "warning-outline", 4, "ngIf"], ["slot", "end", "name", "trash-outline", 3, "click", 4, "ngIf"], ["slot", "end", "name", "warning-outline"], ["slot", "end", "name", "trash-outline", 3, "click"]], template: function OfflineMapPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "app-map", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("mapReady", function OfflineMapPage_Template_app_map_mapReady_9_listener($event) { return ctx.onMapReady($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, OfflineMapPage_ion_item_12_Template, 9, 10, "ion-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](13, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, OfflineMapPage_ng_container_15_Template, 2, 1, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](16, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 12, "OFFLINE_MAP.OFFLINE_MAP_PAGE_TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("offlinePackageMode", true)("showScale", false)("showMapSearch", false)("showFullscreenToggle", false)("showGpsCenter", true)("showUserLocation", true)("showSupportMaps", false)("autoActivate", true)("geoTag", "package-map");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](13, 14, ctx.packageTotals$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](16, 16, ctx.expanded && ctx.allPackages$));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonContent, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_7__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgForOf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_26__.AsyncPipe], styles: [".footer[_ngcontent-%COMP%] {\n  max-height: 45vh;\n  overflow-y: auto;\n}\n\n.desc[_ngcontent-%COMP%] {\n  font-size: smaller;\n  margin: 16px;\n}\n\n.desc[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n\n.map-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nion-backdrop[_ngcontent-%COMP%] {\n  opacity: 0.3;\n  z-index: 20;\n}\n\n#tileCard[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 16px;\n  z-index: 21;\n  width: calc(100% - 48px);\n  margin: 0 24px;\n}\n\n.package-count[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-weight: var(--list-header-font-weight);\n  font-size: var(--h3-font-size);\n  text-transform: uppercase;\n}\n\n.packages-size[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-size: var(--list-header-font-size);\n  text-transform: uppercase;\n}\n\n.space-available[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: var(--list-header-font-size);\n}\n\n.expand-icon[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmUtbWFwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUNFO0VBQ0ksZ0JBQUE7QUFDTjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0FBQUY7O0FBR0E7RUFDRSxvQ0FBQTtFQUNBLDJDQUFBO0VBQ0EsOEJBQUE7RUFDQSx5QkFBQTtBQUFGOztBQUdBO0VBQ0Usb0NBQUE7RUFDQSx1Q0FBQTtFQUNBLHlCQUFBO0FBQUY7O0FBR0E7RUFDRSw4QkFBQTtFQUNBLHVDQUFBO0FBQUY7O0FBR0E7RUFDRSxvQ0FBQTtBQUFGIiwiZmlsZSI6Im9mZmxpbmUtbWFwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb290ZXIge1xyXG4gIG1heC1oZWlnaHQ6IDQ1dmg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmRlc2Mge1xyXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcclxuICBtYXJnaW46IDE2cHg7XHJcblxyXG4gIGRpdiArIGRpdiB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDMycHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubWFwLWNvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG5pb24tYmFja2Ryb3Age1xyXG4gIG9wYWNpdHk6IDAuMztcclxuICB6LWluZGV4OiAyMDtcclxufVxyXG5cclxuI3RpbGVDYXJkIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAxNnB4O1xyXG4gIHotaW5kZXg6IDIxO1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0OHB4KTtcclxuICBtYXJnaW46IDAgMjRweDtcclxufVxyXG5cclxuLnBhY2thZ2UtY291bnQge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nKTtcclxuICBmb250LXdlaWdodDogdmFyKC0tbGlzdC1oZWFkZXItZm9udC13ZWlnaHQpO1xyXG4gIGZvbnQtc2l6ZTogdmFyKC0taDMtZm9udC1zaXplKTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4ucGFja2FnZXMtc2l6ZSB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLWhlYWRpbmcpO1xyXG4gIGZvbnQtc2l6ZTogdmFyKC0tbGlzdC1oZWFkZXItZm9udC1zaXplKTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4uc3BhY2UtYXZhaWxhYmxlIHtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgZm9udC1zaXplOiB2YXIoLS1saXN0LWhlYWRlci1mb250LXNpemUpO1xyXG59XHJcblxyXG4uZXhwYW5kLWljb24ge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nKTtcclxufSJdfQ== */"] });


/***/ }),

/***/ 6639:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/offline-map/offline-package-modal/offline-package-modal.component.ts ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OfflinePackageModalComponent": function() { return /* binding */ OfflinePackageModalComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _metadata_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../metadata.model */ 93919);
/* harmony import */ var src_app_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/offline-map/offline-map.service */ 12645);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../modules/map/components/map/map.component */ 6781);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function OfflinePackageModalComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-map", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mapReady", function OfflinePackageModalComponent_div_10_Template_app_map_mapReady_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r4.showTileOnMap($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("offlinePackageMode", true)("showMapSearch", false)("showFullscreenToggle", false)("showGpsCenter", false)("showUserLocation", false)("showSupportMaps", false)("center", ctx_r0.center)("zoom", ctx_r0.zoom);
} }
const _c0 = function (a0) { return { date: a0 }; };
function OfflinePackageModalComponent_div_27_span_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_DOWNLOADED_DATE", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](7, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](3, 4, packageStatus_r6.downloadComplete * 1000, "short"))), " ");
} }
function OfflinePackageModalComponent_div_27_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("(", ctx_r8.getPercentage(packageStatus_r6) + "%", ")");
} }
function OfflinePackageModalComponent_div_27_ion_icon_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 16);
} }
function OfflinePackageModalComponent_div_27_ion_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 17);
} }
function OfflinePackageModalComponent_div_27_ion_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 18);
} }
function OfflinePackageModalComponent_div_27_ion_icon_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 19);
} }
function OfflinePackageModalComponent_div_27_ion_icon_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 20);
} }
function OfflinePackageModalComponent_div_27_ion_row_15_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_15_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r21); const packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r19.cancel(packageStatus_r6); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.CANCEL_DOWNLOAD_BUTTON"));
} }
function OfflinePackageModalComponent_div_27_ion_row_16_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_16_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r22.startDownload(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.TRY_AGAIN_BUTTON"));
} }
function OfflinePackageModalComponent_div_27_ion_row_17_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_17_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r24.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.DELETE_BUTTON"));
} }
function OfflinePackageModalComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-col", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, OfflinePackageModalComponent_div_27_span_7_Template, 4, 9, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, OfflinePackageModalComponent_div_27_span_8_Template, 2, 1, "span", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-col", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, OfflinePackageModalComponent_div_27_ion_icon_10_Template, 1, 0, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, OfflinePackageModalComponent_div_27_ion_icon_11_Template, 1, 0, "ion-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, OfflinePackageModalComponent_div_27_ion_icon_12_Template, 1, 0, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, OfflinePackageModalComponent_div_27_ion_icon_13_Template, 1, 0, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, OfflinePackageModalComponent_div_27_ion_icon_14_Template, 1, 0, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, OfflinePackageModalComponent_div_27_ion_row_15_Template, 5, 3, "ion-row", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, OfflinePackageModalComponent_div_27_ion_row_16_Template, 5, 3, "ion-row", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, OfflinePackageModalComponent_div_27_ion_row_17_Template, 5, 3, "ion-row", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const packageStatus_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 12, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_DOWNLOAD_STATUS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", packageStatus_r6.progress == null ? null : packageStatus_r6.progress.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.downloadComplete);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", packageStatus_r6.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.downloadComplete && !packageStatus_r6.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", packageStatus_r6.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete || packageStatus_r6.error);
} }
function OfflinePackageModalComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_ng_template_29_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r26.startDownload(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r3.isCheckingAvailableDiskspace);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 2, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.DOWNLOAD_BUTTON"));
} }
const _c1 = function (a0) { return { name: a0 }; };
const _c2 = function (a0) { return { size: a0 }; };
/**
 * Shows detail info about a specific offline map package. From here you may download or delete the package.
 */
class OfflinePackageModalComponent extends src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__.NgDestoryBase {
    constructor(modalController, offlineMapService, cdr) {
        super();
        this.modalController = modalController;
        this.offlineMapService = offlineMapService;
        this.cdr = cdr;
    }
    ngOnInit() {
        this.isCheckingAvailableDiskspace = false;
        this.offlinePackageStatusThatTriggersChangeDetection$ = this.offlinePackageStatus$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(() => this.cdr.detectChanges()));
        this.tileLayer = new leaflet__WEBPACK_IMPORTED_MODULE_0__.GeoJSON(this.feature);
        // Set center from package bounds
        const { lat, lng } = this.tileLayer.getBounds().getCenter();
        this.center = [lat, lng];
        // Use offline map package root tile as zoom level
        const [, , z] = this.packageOnServer.getXYZ();
        this.zoom = z;
        this.offlineMapService.finishedPackageIds$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$)).subscribe((packageName) => {
            if (this.packageOnServer.getName() === packageName) {
                this.dismiss(); //close when package is unzipped and ready to use
            }
        });
    }
    showTileOnMap(map) {
        this.tileLayer.addTo(map);
    }
    startDownload() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            this.isCheckingAvailableDiskspace = true;
            this.cdr.detectChanges();
            if (yield this.offlineMapService.checkAvailableDiskSpace(this.packageOnServer)) {
                this.offlineMapService.downloadPackage(this.packageOnServer);
            }
            this.isCheckingAvailableDiskspace = false;
            this.cdr.detectChanges();
        });
    }
    getPercentage(map) {
        return Math.round((map.progress ? map.progress.percentage : 0) * 100);
    }
    cancel(map) {
        this.offlineMapService.cancelDownloadPackage(map);
    }
    delete() {
        this.offlineMapService.removeMapPackageByName(this.packageOnServer.getName());
    }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
OfflinePackageModalComponent.ɵfac = function OfflinePackageModalComponent_Factory(t) { return new (t || OfflinePackageModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_2__.OfflineMapService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef)); };
OfflinePackageModalComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: OfflinePackageModalComponent, selectors: [["ng-component"]], inputs: { feature: "feature", packageOnServer: "packageOnServer", offlinePackageStatus$: "offlinePackageStatus$" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]], decls: 31, vars: 33, consts: [["translucent", ""], ["slot", "end"], [3, "click"], ["class", "map-container", 4, "ngIf"], ["size", "4"], [4, "ngIf", "ngIfElse"], ["downloadPackage", ""], [1, "map-container"], [3, "offlinePackageMode", "showMapSearch", "showFullscreenToggle", "showGpsCenter", "showUserLocation", "showSupportMaps", "center", "zoom", "mapReady"], [4, "ngIf"], ["size", "1"], ["name", "checkmark", 4, "ngIf"], ["name", "stopwatch-outline", 4, "ngIf"], ["name", "cloud-download-outline", 4, "ngIf"], ["name", "folder-open-outline", 4, "ngIf"], ["name", "warning-outline", 4, "ngIf"], ["name", "checkmark"], ["name", "stopwatch-outline"], ["name", "cloud-download-outline"], ["name", "folder-open-outline"], ["name", "warning-outline"], ["expand", "block", "color", "danger", 3, "click"], ["expand", "block", "color", "varsom-orange", 3, "click"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"]], template: function OfflinePackageModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_Template_ion_button_click_6_listener() { return ctx.dismiss(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, OfflinePackageModalComponent_div_10_Template, 2, 8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-col", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-col");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](18, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-col", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "ion-col");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "number");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](27, OfflinePackageModalComponent_div_27_Template, 18, 14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](28, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, OfflinePackageModalComponent_ng_template_29_Template, 5, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](4, 9, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.HEADER", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](29, _c1, ctx.packageOnServer.getName())));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 12, "CLOSE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.center);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 14, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_PRODUCED_DATE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](18, 16, ctx.packageOnServer.getLastModified(), "short"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](22, 19, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_SIZE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](25, 21, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_SIZE_VALUE_WITH_UNIT", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](31, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](26, 24, ctx.packageOnServer.getSizeInMiB(), "1.0-1"))));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](28, 27, ctx.offlinePackageStatusThatTriggersChangeDetection$))("ngIfElse", _r2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_4__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe], styles: [".map-container[_ngcontent-%COMP%] {\r\n  padding: 16px;\r\n  height: calc(100vw - 32px);\r\n}\r\n\r\n.right[_ngcontent-%COMP%] {\r\n  text-align: right;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJvZmZsaW5lLXBhY2thZ2UtbW9kYWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXAtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGhlaWdodDogY2FsYygxMDB2dyAtIDMycHgpO1xyXG59XHJcblxyXG4ucmlnaHQge1xyXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xyXG59Il19 */"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc19vZmZsaW5lLW1hcF9vZmZsaW5lLW1hcF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUN3QztBQTBCakMsTUFBTSxlQUFlO0lBWTFCLFlBQVksUUFBaUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQVpELE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ25ELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNqRCxPQUFPLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBUUQsVUFBVTtRQUNSLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNwRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtnQkFDeEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLENBQUM7d0JBQ1osQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3dCQUNaLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDWixDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7d0JBQ1osQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3dCQUNaLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztxQkFDYixDQUFDO2FBQ0g7WUFDRCxVQUFVLEVBQUUsSUFBSTtZQUNoQixFQUFFLEVBQUUsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUks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QSx3REFBc0Q7O1FBQUEsNERBQVU7UUFDM0UsNERBQVU7UUFFViwyRUFBUztRQUNQLDhFQUFrQjtRQUFBLHdEQUFxRTs7UUFBQSw0REFBVTtRQUNqRywyRUFBUztRQUFBLHdEQUE4STs7O1FBQUEsNERBQVU7UUFDbkssNERBQVU7UUFFViw0SEFrQ007O1FBQ1IsNERBQVc7UUFDYiw0REFBYztRQUVkLHNOQU9jOzs7UUE5RUMsMERBQWlHO1FBQWpHLHNSQUFpRztRQUUxRSwwREFBeUI7UUFBekIsMElBQXlCO1FBTWpDLDBEQUFZO1FBQVosNEVBQVk7UUFnQmxCLDBEQUE4RTtRQUE5RSxnTUFBOEU7UUFDdkYsMERBQXNEO1FBQXRELGtMQUFzRDtRQUk3QywwREFBcUU7UUFBckUsdUxBQXFFO1FBQzlFLDBEQUE4STtRQUE5SSwrWEFBOEk7UUFHbkosMERBQStEO1FBQS9ELHlMQUErRCIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL21ldGFkYXRhLm1vZGVsLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5wYWdlLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9wYWdlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLXBhY2thZ2UtbW9kYWwvb2ZmbGluZS1wYWNrYWdlLW1vZGFsLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9wYWdlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLXBhY2thZ2UtbW9kYWwvb2ZmbGluZS1wYWNrYWdlLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQkJveCwgRmVhdHVyZSwgUG9seWdvbiB9IGZyb20gJ2dlb2pzb24nO1xyXG5pbXBvcnQgbW9tZW50LCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XHJcblxyXG50eXBlIFhZWiA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFja2FnZU1ldGFkYXRhIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgbGFzdE1vZGlmaWVkOiBzdHJpbmc7ICAvLyBpbiBVVENcclxuICB1cmxzOiBzdHJpbmdbXTtcclxuICBzaXplSW5NaWI6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB4eXo6IFhZWjtcclxuICBiYm94OiBCQm94O1xyXG4gIHNpemVJbk1pYjogbnVtYmVyO1xyXG4gIG1hcHM6IFBhY2thZ2VNZXRhZGF0YVtdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDb21wb3VuZFBhY2thZ2VGZWF0dXJlID0gRmVhdHVyZTxQb2x5Z29uLCBudWxsPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZFBhY2thZ2Uge1xyXG5cclxuICBzdGF0aWMgR2V0TmFtZUZyb21YWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGAke3h9LSR7eX0tJHt6fWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgR2V0RmVhdHVyZUlkKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBDb21wb3VuZFBhY2thZ2UuR2V0TmFtZUZyb21YWVooeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ldGFkYXRhOiBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YTtcclxuXHJcbiAgY29uc3RydWN0b3IobWV0YWRhdGE6IENvbXBvdW5kUGFja2FnZU1ldGFkYXRhKSB7XHJcbiAgICB0aGlzLm1ldGFkYXRhID0gbWV0YWRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXRGZWF0dXJlKCk6IENvbXBvdW5kUGFja2FnZUZlYXR1cmUge1xyXG4gICAgY29uc3QgW3hNaW4sIHlNaW4sIHhNYXgsIHlNYXhdID0gdGhpcy5tZXRhZGF0YS5iYm94O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxyXG4gICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgIGJib3g6IHRoaXMubWV0YWRhdGEuYmJveCxcclxuICAgICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtbXHJcbiAgICAgICAgICBbeE1pbiwgeU1pbl0sXHJcbiAgICAgICAgICBbeE1pbiwgeU1heF0sXHJcbiAgICAgICAgICBbeE1heCwgeU1heF0sXHJcbiAgICAgICAgICBbeE1heCwgeU1pbl0sXHJcbiAgICAgICAgICBbeE1pbiwgeU1pbl1cclxuICAgICAgICBdXVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wZXJ0aWVzOiBudWxsLFxyXG4gICAgICBpZDogQ29tcG91bmRQYWNrYWdlLkdldEZlYXR1cmVJZCguLi50aGlzLm1ldGFkYXRhLnh5eilcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRTaXplSW5NaUIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLnNpemVJbk1pYjtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IFt4LCB5LCB6XSA9IHRoaXMubWV0YWRhdGEueHl6O1xyXG4gICAgcmV0dXJuIENvbXBvdW5kUGFja2FnZS5HZXROYW1lRnJvbVhZWih4LCB5LCB6KTtcclxuICB9XHJcblxyXG4gIGdldExhc3RNb2RpZmllZCgpOiBEYXRlIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhLm1hcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vbWVudC5tYXgodGhpcy5tZXRhZGF0YS5tYXBzLm1hcChwID0+IG1vbWVudChwLmxhc3RNb2RpZmllZCkpKS50b0RhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldFBhcnRzKCk6IFBhcnRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5tYXBzXHJcbiAgICAgIC8vIEhlbnQgbmFtZSAvIHVybCBmb3IgYWxsZSBwYWtrZXJcclxuICAgICAgLm1hcCgocCkgPT4gcC51cmxzLm1hcCh1cmwgPT4gKHtuYW1lOiBwLm5hbWUsIHVybH0pKSlcclxuICAgICAgLy8gRmxhdHRlbiBhcnJheVxyXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSwgW10pO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFlaKCk6IFhZWiB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS54eXo7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IE9mZmxpbmVNYXBQYWdlIH0gZnJvbSAnLi9vZmZsaW5lLW1hcC5wYWdlJztcclxuaW1wb3J0IHsgTWFwTW9kdWxlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL21hcC9tYXAubW9kdWxlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuaW1wb3J0IHsgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vb2ZmbGluZS1wYWNrYWdlLW1vZGFsL29mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IE9mZmxpbmVNYXBQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIElvbmljTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgU2hhcmVkTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPZmZsaW5lTWFwUGFnZSwgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE9mZmxpbmVNYXBQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9mZmxpbmVNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2ZmbGluZU1hcFBhY2thZ2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvaGVscGVycy9oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciwgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIGZpcnN0VmFsdWVGcm9tLCBmcm9tLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzd2l0Y2hNYXAsIHRha2VVbnRpbCwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vb2ZmbGluZS1wYWNrYWdlLW1vZGFsL29mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb21wb3VuZFBhY2thZ2UsIENvbXBvdW5kUGFja2FnZU1ldGFkYXRhLCBDb21wb3VuZFBhY2thZ2VGZWF0dXJlIH0gZnJvbSAnLi9tZXRhZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbmNvbnN0IFBBQ0tBR0VfSU5ERVhfVVJMID0gJ2h0dHBzOi8vb2ZmbGluZW1hcC5ibG9iLmNvcmUud2luZG93cy5uZXQvcGFja2FnZXMvcGFja2FnZUluZGV4X3YyLmpzb24nO1xyXG5jb25zdCBmaWxsZWRUaWxlT3BhY2l0eSA9IDAuODtcclxuY29uc3Qgbm90RmlsbGVkVGlsZU9wYWNpdHkgPSAwLjE7XHJcbmNvbnN0IGRvY3VtZW50U3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xyXG5jb25zdCBkZWZhdWx0VGlsZVN0eWxlID0ge1xyXG4gIGNvbG9yOiBkb2N1bWVudFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJy0taW9uLWNvbG9yLXByaW1hcnknKSxcclxuICBvcGFjaXR5OiAxLFxyXG4gIGZpbGxPcGFjaXR5OiBub3RGaWxsZWRUaWxlT3BhY2l0eVxyXG59O1xyXG5jb25zdCBkb3dubG9hZGVkVGlsZVN0eWxlID0ge1xyXG4gIC4uLmRlZmF1bHRUaWxlU3R5bGUsXHJcbiAgZmlsbE9wYWNpdHk6IGZpbGxlZFRpbGVPcGFjaXR5LFxyXG59O1xyXG5jb25zdCBlcnJvclRpbGVTdHlsZSA9IHtcclxuICAuLi5kb3dubG9hZGVkVGlsZVN0eWxlLFxyXG4gIGNvbG9yOiBkb2N1bWVudFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJy0taW9uLWNvbG9yLWRhbmdlcicpLFxyXG59O1xyXG5cclxudHlwZSBQYWNrYWdlSW5kZXggPSBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YVtdO1xyXG5cclxuaW50ZXJmYWNlIFBhY2thZ2VUb3RhbHMge1xyXG4gIG51bVBhY2thZ2VzOiBudW1iZXIsXHJcbiAgc3BhY2VVc2VkOiBzdHJpbmdcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtb2ZmbGluZS1tYXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vZmZsaW5lLW1hcC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29mZmxpbmUtbWFwLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZmZsaW5lTWFwUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2Uge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgaW5zdGFsbGVkUGFja2FnZXMkOiBPYnNlcnZhYmxlPE1hcDxzdHJpbmcsIE9mZmxpbmVNYXBQYWNrYWdlPj47XHJcbiAgcHJpdmF0ZSBpbnN0YWxsZWRQYWNrYWdlczogTWFwPHN0cmluZywgT2ZmbGluZU1hcFBhY2thZ2U+ID0gbmV3IE1hcCgpO1xyXG4gIHByaXZhdGUgZmFpbGVkUGFja2FnZUlkczogc3RyaW5nW10gPSBbXTsgLy9yZW1lbWJlciBmYWlsZWQgcGFja2FnZXMgdW50aWwgZmVhdHVyZXMgYXJlIHJlYWR5IGZvciBzdHlsaW5nXHJcbiAgcHJpdmF0ZSBkb3dubG9hZEFuZFVuemlwUHJvZ3Jlc3MkOiBPYnNlcnZhYmxlPE9mZmxpbmVNYXBQYWNrYWdlW10+O1xyXG4gIHBhY2thZ2VUb3RhbHMkOiBPYnNlcnZhYmxlPFBhY2thZ2VUb3RhbHM+O1xyXG4gIHJlYWRvbmx5IGFsbFBhY2thZ2VzJDogT2JzZXJ2YWJsZTxPZmZsaW5lTWFwUGFja2FnZVtdPjtcclxuICBwcml2YXRlIHBhY2thZ2VzT25TZXJ2ZXIkOiBPYnNlcnZhYmxlPE1hcDxzdHJpbmcsIENvbXBvdW5kUGFja2FnZT4+O1xyXG4gIHByaXZhdGUgcGFja2FnZXNPblNlcnZlcjogTWFwPHN0cmluZywgQ29tcG91bmRQYWNrYWdlPiA9IG5ldyBNYXAoKTtcclxuICBzaG93VGlsZUNhcmQgPSB0cnVlO1xyXG4gIHRpbGVzTGF5ZXI6IEwuR2VvSlNPTjtcclxuICAvLyBDb3VsZCBub3QgZ2V0IHRoZSBjbGljayBoYW5kbGVyIHRvIG9ubHkgZW1pdCBvbmNlIHBlciBjbGljaywgc28gd3JhcHBlZCB0aGlzIGluIGEgc3ViamVjdFxyXG4gIHNob3dNb2RhbCA9IG5ldyBTdWJqZWN0PENvbXBvdW5kUGFja2FnZUZlYXR1cmU+KCk7XHJcbiAgaXNab29taW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcbiAgZmVhdHVyZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCB7IGZlYXR1cmU6IENvbXBvdW5kUGFja2FnZUZlYXR1cmUsIGxheWVyOiBMLkxheWVyIH0+KCk7XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTsgLy9zaG93IGxpc3Qgb2YgZG93bmxvYWRzIGlmIHRoaXMgaXMgdHJ1ZVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaGVscGVyU2VydmljZTogSGVscGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG9mZmxpbmVNYXBTZXJ2aWNlOiBPZmZsaW5lTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgLy8gRG93bmxvYWQgcGFja2FnZSBpbmRleCBmcm9tIGF6dXJlXHJcbiAgICB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIkID0gaHR0cC5nZXQ8UGFja2FnZUluZGV4PihQQUNLQUdFX0lOREVYX1VSTCkucGlwZShcclxuICAgICAgLy8gTWFwIGRvd25sb2FkZWQgcGFja2FnZSBpbmRleCB0byBhIHBhY2thZ2VOYW1lID0+IHBhY2thZ2UgbWFwXHJcbiAgICAgIG1hcCgocGFja2FnZUluZGV4KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmFtZUFuZFBrZzogW3N0cmluZywgQ29tcG91bmRQYWNrYWdlXVtdID0gcGFja2FnZUluZGV4Lm1hcChwID0+IFtcclxuICAgICAgICAgIENvbXBvdW5kUGFja2FnZS5HZXROYW1lRnJvbVhZWiguLi5wLnh5eiksXHJcbiAgICAgICAgICBuZXcgQ29tcG91bmRQYWNrYWdlKHApXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAobmFtZUFuZFBrZyk7XHJcbiAgICAgIH0pLFxyXG4gICAgICBzaGFyZVJlcGxheSgpXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuZG93bmxvYWRBbmRVbnppcFByb2dyZXNzJCA9IHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuZG93bmxvYWRBbmRVbnppcFByb2dyZXNzJFxyXG4gICAgICAucGlwZShtYXAoKGl0ZW1zKSA9PiBpdGVtcy5zb3J0KCgoYSwgYikgPT4gYi5kb3dubG9hZFN0YXJ0IC0gYS5kb3dubG9hZFN0YXJ0KSkpKTtcclxuICAgIHRoaXMuaW5zdGFsbGVkUGFja2FnZXMkID0gdGhpcy5vZmZsaW5lTWFwU2VydmljZS5wYWNrYWdlcyRcclxuICAgICAgLnBpcGUobWFwKChkb3dubG9hZGVkKSA9PiBuZXcgTWFwKGRvd25sb2FkZWQubWFwKChpdGVtKSA9PiBbdGhpcy5nZXRGZWF0dXJlSWRGb3JQYWNrYWdlKGl0ZW0pLCBpdGVtXSkpKSk7XHJcbiAgICB0aGlzLmFsbFBhY2thZ2VzJCA9IGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmRvd25sb2FkQW5kVW56aXBQcm9ncmVzcyQsXHJcbiAgICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UucGFja2FnZXMkXHJcbiAgICBdKS5waXBlKChtYXAoKFtpblByb2dyZXNzLCBkb3dubG9hZGVkXSkgPT4gWy4uLmluUHJvZ3Jlc3MsIC4uLmRvd25sb2FkZWRdKSkpO1xyXG5cclxuICAgIHRoaXMucGFja2FnZVRvdGFscyQgPSB0aGlzLmFsbFBhY2thZ2VzJC5waXBlKFxyXG4gICAgICBtYXAoKHBhY2thZ2VzKSA9PiB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBsZXQgc3BhY2UgPSAwO1xyXG4gICAgICAgIGZvciAoY29uc3QgbWFwUGFja2FnZSBvZiBwYWNrYWdlcykge1xyXG4gICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgIHNwYWNlICs9IG1hcFBhY2thZ2Uuc2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNwYWNlV2l0aFVuaXQgPSAnMCBNQic7XHJcbiAgICAgICAgaWYgKHNwYWNlID4gMCkge1xyXG4gICAgICAgICAgc3BhY2VXaXRoVW5pdCA9IHRoaXMuaHVtYW5SZWFkYWJsZUJ5dGVTaXplKHNwYWNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgbnVtUGFja2FnZXM6IGNvdW50LCBzcGFjZVVzZWQ6IHNwYWNlV2l0aFVuaXQgfTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvbk1hcFJlYWR5KG1hcDogTC5NYXApIHtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAod2luZG93IGFzIGFueSkuTEVBRkxFVF9NQVAgPSBtYXA7XHJcblxyXG4gICAgbWFwLnNldFpvb20oNyk7XHJcblxyXG4gICAgdGhpcy50aWxlc0xheWVyID0gbmV3IEwuR2VvSlNPTihudWxsLCB7XHJcbiAgICAgIG9uRWFjaEZlYXR1cmU6IChmZWF0dXJlOiBDb21wb3VuZFBhY2thZ2VGZWF0dXJlLCBsYXllcikgPT4ge1xyXG4gICAgICAgIHRoaXMuZmVhdHVyZU1hcC5zZXQoZmVhdHVyZS5pZCBhcyBzdHJpbmcsIHsgZmVhdHVyZSwgbGF5ZXIgfSk7XHJcbiAgICAgICAgbGF5ZXIub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgaWYodGhpcy5wYWNrYWdlc09uU2VydmVyLmhhcyhmZWF0dXJlLmlkIGFzIHN0cmluZykgfHwgdGhpcy5pbnN0YWxsZWRQYWNrYWdlcy5oYXMoZmVhdHVyZS5pZCBhcyBzdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsLm5leHQoZmVhdHVyZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIG1hcC5hZGRMYXllcih0aGlzLnRpbGVzTGF5ZXIpO1xyXG5cclxuICAgIHRoaXMucGFja2FnZXNPblNlcnZlciQuc3Vic2NyaWJlKHBhY2thZ2VNYXAgPT4ge1xyXG4gICAgICBwYWNrYWdlTWFwLmZvckVhY2goKG1hcFBhY2thZ2UpID0+IHtcclxuICAgICAgICB0aGlzLnRpbGVzTGF5ZXIuYWRkRGF0YShtYXBQYWNrYWdlLmdldEZlYXR1cmUoKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMuaW5zdGFsbGVkUGFja2FnZXMkLFxyXG4gICAgICB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIkXHJcbiAgICBdKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgoW2luc3RhbGxlZFBhY2thZ2VzLCBwYWNrYWdlc09uU2VydmVyXSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaW5zdGFsbGVkUGFja2FnZXMgPSBpbnN0YWxsZWRQYWNrYWdlcztcclxuICAgICAgICB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIgPSBwYWNrYWdlc09uU2VydmVyO1xyXG4gICAgICAgIHRoaXMuc2V0U3R5bGVGb3JQYWNrYWdlcygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRvd25sb2FkQW5kVW56aXBQcm9ncmVzcyQucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSkucGlwZShcclxuICAgICAgdGFwKChpdGVtc1dpdGhQcm9ncmVzcykgPT4ge1xyXG4gICAgICAgIHRoaXMuZmFpbGVkUGFja2FnZUlkcyA9IGl0ZW1zV2l0aFByb2dyZXNzLmZpbHRlcihpdGVtID0+IGl0ZW0uZXJyb3IpLm1hcChpdGVtID0+IGl0ZW0ubmFtZSk7XHJcbiAgICAgIH0pXHJcbiAgICApLnN1YnNjcmliZSgoaXRlbXNXaXRoUHJvZ3Jlc3MpID0+IHtcclxuICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICBmb3IoY29uc3QgaXRlbSBvZiBpdGVtc1dpdGhQcm9ncmVzcykge1xyXG4gICAgICAgICAgdGhpcy5zZXRTdHlsZUZvclByb2dyZXNzT3JEb3dubG9hZGVkUGFja2FnZShpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zaG93TW9kYWwucGlwZShcclxuICAgICAgZGVib3VuY2VUaW1lKDIwMCksXHJcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuaXNab29taW5nKSxcclxuICAgICAgZmlsdGVyKChbLCBpc1pvb21pbmddKSA9PiAhaXNab29taW5nKSxcclxuICAgICAgc3dpdGNoTWFwKChbZmVhdHVyZSwgXSkgPT4gZnJvbSh0aGlzLnNob3dQYWNrYWdlTW9kYWwoZmVhdHVyZSkpKSxcclxuICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICkuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgLy8gVGhpcyBpcyB0byBhdm9pZCBwaW5jaC16b29taW5nIG9uIG1hcCB0cmlnZ2VycyBjbGljayBldmVudFxyXG4gICAgbWFwLm9uKCdkcmFnZW5kIHpvb21lbmQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNab29taW5nLm5leHQoZmFsc2UpO1xyXG4gICAgfSk7XHJcbiAgICBtYXAub24oJ2RyYWdzdGFydCB6b29tc3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNab29taW5nLm5leHQodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0U3R5bGVGb3JQYWNrYWdlcygpIHtcclxuICAgIGZvcihjb25zdCBbLCBpdGVtXSBvZiB0aGlzLmluc3RhbGxlZFBhY2thZ2VzKSB7XHJcbiAgICAgIHRoaXMuc2V0U3R5bGVGb3JQcm9ncmVzc09yRG93bmxvYWRlZFBhY2thZ2UoaXRlbSk7XHJcbiAgICB9XHJcbiAgICBmb3IoY29uc3QgW2tleSwgXSBvZiB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIpIHtcclxuICAgICAgbGV0IHN0eWxlID0gZGVmYXVsdFRpbGVTdHlsZTtcclxuICAgICAgaWYoIXRoaXMuaW5zdGFsbGVkUGFja2FnZXMuaGFzKGtleSkpIHtcclxuICAgICAgICBpZiAodGhpcy5mYWlsZWRQYWNrYWdlSWRzLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgIHN0eWxlID0gZXJyb3JUaWxlU3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3R5bGVGb3JGZWF0dXJlKGtleSwgc3R5bGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0eWxlRm9yRmVhdHVyZShpZDogc3RyaW5nLCBzdHlsZTogTC5QYXRoT3B0aW9ucykge1xyXG4gICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuZmVhdHVyZU1hcC5nZXQoaWQpO1xyXG4gICAgaWYoZmVhdHVyZSkge1xyXG4gICAgICBjb25zdCBwb2x5bGluZSA9IChmZWF0dXJlLmxheWVyIGFzIEwuUG9seWxpbmUpO1xyXG4gICAgICBwb2x5bGluZS5zZXRTdHlsZShzdHlsZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0eWxlRm9yUHJvZ3Jlc3NPckRvd25sb2FkZWRQYWNrYWdlKGl0ZW06IE9mZmxpbmVNYXBQYWNrYWdlKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RmVhdHVyZUlkRm9yUGFja2FnZShpdGVtKTtcclxuICAgIGlmIChpdGVtLmVycm9yKSB7XHJcbiAgICAgIHRoaXMuc2V0U3R5bGVGb3JGZWF0dXJlKGlkLCBlcnJvclRpbGVTdHlsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBmaWxsT3BhY2l0eSA9IGl0ZW0uZG93bmxvYWRDb21wbGV0ZSA/IDAgOiB0aGlzLmdldFByb2dyZXNzT3BhY2l0eShpdGVtKTtcclxuICAgICAgdGhpcy5zZXRTdHlsZUZvckZlYXR1cmUoaWQsIHsgLi4uZGVmYXVsdFRpbGVTdHlsZSwgZmlsbE9wYWNpdHkgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFByb2dyZXNzT3BhY2l0eShpdGVtOiBPZmZsaW5lTWFwUGFja2FnZSkge1xyXG4gICAgY29uc3QgcHJvZ3Jlc3NWYWx1ZSA9IChpdGVtLnByb2dyZXNzID8gKGl0ZW0ucHJvZ3Jlc3MucGVyY2VudGFnZSAvIDIuMCkgOiAwKSArIDAuNDtcclxuICAgIHJldHVybiBNYXRoLm1pbihwcm9ncmVzc1ZhbHVlLCBmaWxsZWRUaWxlT3BhY2l0eSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZlYXR1cmVQcm9wZXJ0eUlkKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBDb21wb3VuZFBhY2thZ2UuR2V0TmFtZUZyb21YWVooeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldEZlYXR1cmVJZEZvclBhY2thZ2UobWFwOiBPZmZsaW5lTWFwUGFja2FnZSk6IHN0cmluZyB7XHJcbiAgICBpZihtYXAuY29tcG91bmRQYWNrYWdlTWV0YWRhdGEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RmVhdHVyZVByb3BlcnR5SWQoLi4ubWFwLmNvbXBvdW5kUGFja2FnZU1ldGFkYXRhLmdldFhZWigpKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGZpcnN0TWFwID0gT2JqZWN0LmtleXMobWFwLm1hcHMpWzBdO1xyXG4gICAgaWYobWFwLm1hcHNbZmlyc3RNYXBdKSB7XHJcbiAgICAgIGNvbnN0IHJvb3RUaWxlID0gbWFwLm1hcHNbZmlyc3RNYXBdLnJvb3RUaWxlO1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRGZWF0dXJlUHJvcGVydHlJZChyb290VGlsZS54LCByb290VGlsZS55LCByb290VGlsZS56KTtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG5cclxuICBhc3luYyBzaG93UGFja2FnZU1vZGFsKGZlYXR1cmU6IENvbXBvdW5kUGFja2FnZUZlYXR1cmUpIHtcclxuICAgIGNvbnN0IGNvbXBvdW5kUGFja2FnZSA9IHRoaXMucGFja2FnZXNPblNlcnZlci5nZXQoZmVhdHVyZS5pZCBhcyBzdHJpbmcpO1xyXG4gICAgY29uc3QgbmFtZSA9IGNvbXBvdW5kUGFja2FnZS5nZXROYW1lKCk7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudCxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBmZWF0dXJlOiBmZWF0dXJlLFxyXG4gICAgICAgIHBhY2thZ2VPblNlcnZlcjogY29tcG91bmRQYWNrYWdlLFxyXG4gICAgICAgIG9mZmxpbmVQYWNrYWdlU3RhdHVzJDogdGhpcy5hbGxQYWNrYWdlcyQucGlwZShcclxuICAgICAgICAgIG1hcChwYWNrYWdlcyA9PiBwYWNrYWdlcy5maW5kKHAgPT4gcC5uYW1lID09PSBuYW1lKSkpLFxyXG4gICAgICB9LFxyXG4gICAgICBzd2lwZVRvQ2xvc2U6IHRydWUsXHJcbiAgICAgIG1vZGU6ICdpb3MnXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IG1vZGFsLnByZXNlbnQoKTtcclxuICB9XHJcblxyXG4gIHNob3dQYWNrYWdlTW9kYWxGb3JQYWNrYWdlKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpIHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmZlYXR1cmVNYXAuZ2V0KG1hcC5uYW1lKTtcclxuICAgIGlmIChmZWF0dXJlKSB7XHJcbiAgICAgIHRoaXMuc2hvd1BhY2thZ2VNb2RhbChmZWF0dXJlLmZlYXR1cmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaHVtYW5SZWFkYWJsZUJ5dGVTaXplKGJ5dGVzOiBudW1iZXIsIGZyYWN0aW9uRGlnaXRzID0gMCk6IHN0cmluZyB7XHJcbiAgICBpZiAoaXNOYU4oYnl0ZXMpKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmhlbHBlclNlcnZpY2UuaHVtYW5SZWFkYWJsZUJ5dGVTaXplKGJ5dGVzLCBmcmFjdGlvbkRpZ2l0cywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBmb3JtYXRQcm9ncmVzc0lmRG93bmxvYWRpbmcobWFwOiBPZmZsaW5lTWFwUGFja2FnZSk6IHN0cmluZyB7XHJcbiAgICBpZiAobWFwLmRvd25sb2FkU3RhcnQgJiYgIW1hcC5kb3dubG9hZENvbXBsZXRlKSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gTWF0aC5yb3VuZCgobWFwLnByb2dyZXNzID8gbWFwLnByb2dyZXNzLnBlcmNlbnRhZ2UgOiAwKSAqIDEwMCk7XHJcbiAgICAgIHJldHVybiBgKCR7dmFsdWV9JSlgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsT3JEZWxldGUobWFwOiBPZmZsaW5lTWFwUGFja2FnZSwgZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICh0aGlzLmlzRG93bmxvYWRlZChtYXApKSB7XHJcbiAgICAgIGNvbnN0IHRvVHJhbnNsYXRlID0gWydPRkZMSU5FX01BUC5ERUxFVEVfUEFDS0FHRV9DT05GSVJNJywgJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuREVMRVRFJ107XHJcbiAgICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQodG9UcmFuc2xhdGUpKTtcclxuICAgICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIG1lc3NhZ2U6IHRyYW5zbGF0aW9uc1snT0ZGTElORV9NQVAuREVMRVRFX1BBQ0tBR0VfQ09ORklSTSddLFxyXG4gICAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkRFTEVURSddLFxyXG4gICAgICAgICAgICBoYW5kbGVyOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5vZmZsaW5lTWFwU2VydmljZS5yZW1vdmVNYXBQYWNrYWdlQnlOYW1lKG1hcC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSk7XHJcbiAgICAgIGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuY2FuY2VsRG93bmxvYWRQYWNrYWdlKG1hcCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc0Rvd25sb2FkZWQobWFwOiBPZmZsaW5lTWFwUGFja2FnZSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhbWFwLmRvd25sb2FkQ29tcGxldGU7XHJcbiAgfVxyXG5cclxuICBnZXRTcGFjZUF2YWlsYWJsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuaHVtYW5SZWFkYWJsZUJ5dGVTaXplKHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuYXZhaWxhYmxlRGlza3NwYWNlPy5hdmFpbGFibGUsIDApO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7ICdPRkZMSU5FX01BUC5PRkZMSU5FX01BUF9QQUdFX1RJVExFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8ZGl2IGNsYXNzPVwibWFwLWNvbnRhaW5lclwiPlxyXG4gICAgPGFwcC1tYXBcclxuICAgICAgKG1hcFJlYWR5KT1cIm9uTWFwUmVhZHkoJGV2ZW50KVwiXHJcbiAgICAgIFtvZmZsaW5lUGFja2FnZU1vZGVdPVwidHJ1ZVwiXHJcbiAgICAgIFtzaG93U2NhbGVdPVwiZmFsc2VcIlxyXG4gICAgICBbc2hvd01hcFNlYXJjaF09ZmFsc2VcclxuICAgICAgW3Nob3dGdWxsc2NyZWVuVG9nZ2xlXT1mYWxzZVxyXG4gICAgICBbc2hvd0dwc0NlbnRlcl09dHJ1ZVxyXG4gICAgICBbc2hvd1VzZXJMb2NhdGlvbl09XCJ0cnVlXCJcclxuICAgICAgW3Nob3dTdXBwb3J0TWFwc109XCJmYWxzZVwiXHJcbiAgICAgIFthdXRvQWN0aXZhdGVdPVwidHJ1ZVwiXHJcbiAgICAgIFtnZW9UYWddPVwiJ3BhY2thZ2UtbWFwJ1wiXHJcbiAgICA+PC9hcHAtbWFwPlxyXG4gIDwvZGl2PlxyXG48L2lvbi1jb250ZW50PlxyXG48aW9uLWZvb3Rlcj5cclxuICA8aW9uLWxpc3Q+XHJcbiAgICA8aW9uLWl0ZW0gKm5nSWY9XCJwYWNrYWdlVG90YWxzJCB8IGFzeW5jIGFzIHBhY2thZ2VUb3RhbHNcIiAoY2xpY2spPVwiZXhwYW5kZWQgPSAhZXhwYW5kZWRcIiBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1sYWJlbCAqbmdJZj1cInBhY2thZ2VUb3RhbHMubnVtUGFja2FnZXMgPT09IDFcIiBjbGFzcz1cInBhY2thZ2UtY291bnRcIj57eyAnT0ZGTElORV9NQVAuUEFDS0FHRV9DT1VOVF9TSU5HTEUnIHwgdHJhbnNsYXRlOntwYWNrYWdlQ291bnQ6IHBhY2thZ2VUb3RhbHMubnVtUGFja2FnZXN9IH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tbGFiZWwgKm5nSWY9XCJwYWNrYWdlVG90YWxzLm51bVBhY2thZ2VzICE9PSAxXCIgY2xhc3M9XCJwYWNrYWdlLWNvdW50XCI+e3sgJ09GRkxJTkVfTUFQLlBBQ0tBR0VfQ09VTlRfTVVMVElQTEUnIHwgdHJhbnNsYXRlOntwYWNrYWdlQ291bnQ6IHBhY2thZ2VUb3RhbHMubnVtUGFja2FnZXN9IH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJwYWNrYWdlcy1zaXplXCI+e3sgcGFja2FnZVRvdGFscy5zcGFjZVVzZWQgfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cInNwYWNlLWF2YWlsYWJsZVwiPih7eyAnT0ZGTElORV9NQVAuU1BBQ0VfQVZBSUxBQkxFJyB8IHRyYW5zbGF0ZTp7c3BhY2VBdmFpbGFibGU6IGdldFNwYWNlQXZhaWxhYmxlKCl9IH19KTwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWljb24gKm5nSWY9XCJwYWNrYWdlVG90YWxzLm51bVBhY2thZ2VzID4gMFwiIHNsb3Q9XCJlbmRcIiBbbmFtZV09XCJleHBhbmRlZCA/ICdjaGV2cm9uLWRvd24tY2lyY2xlJyA6ICdjaGV2cm9uLXVwLWNpcmNsZSdcIiBjbGFzcz1cImV4cGFuZC1pY29uXCI+PC9pb24taWNvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJleHBhbmRlZCAmJiBhbGxQYWNrYWdlcyQgfCBhc3luYyBhcyBpdGVtc1wiPlxyXG4gICAgICAgIDxpb24taXRlbSAoY2xpY2spPVwic2hvd1BhY2thZ2VNb2RhbEZvclBhY2thZ2UoaXRlbSlcIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtc1wiIGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eyBpdGVtLm5hbWUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3sgaHVtYW5SZWFkYWJsZUJ5dGVTaXplKGl0ZW0uc2l6ZSkgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3sgZm9ybWF0UHJvZ3Jlc3NJZkRvd25sb2FkaW5nKGl0ZW0pIH19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiICpuZ0lmPVwiaXRlbS5lcnJvclwiIG5hbWU9XCJ3YXJuaW5nLW91dGxpbmVcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiAqbmdJZj1cIiEoaXRlbS5lcnJvcilcIiAoY2xpY2spPVwiY2FuY2VsT3JEZWxldGUoaXRlbSwgJGV2ZW50KVwiIG5hbWU9XCJ0cmFzaC1vdXRsaW5lXCI+PC9pb24taWNvbj5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvaW9uLWxpc3Q+XHJcbjwvaW9uLWZvb3Rlcj5cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBDb21wb3VuZFBhY2thZ2VGZWF0dXJlLCBDb21wb3VuZFBhY2thZ2UgfSBmcm9tICcuLi9tZXRhZGF0YS5tb2RlbCc7XHJcbmltcG9ydCB7IE9mZmxpbmVNYXBTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL3NlcnZpY2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9mZmxpbmVNYXBQYWNrYWdlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL3NlcnZpY2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLm1vZGVsJztcclxuaW1wb3J0IHsgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG4vKipcclxuICogU2hvd3MgZGV0YWlsIGluZm8gYWJvdXQgYSBzcGVjaWZpYyBvZmZsaW5lIG1hcCBwYWNrYWdlLiBGcm9tIGhlcmUgeW91IG1heSBkb3dubG9hZCBvciBkZWxldGUgdGhlIHBhY2thZ2UuXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICB0ZW1wbGF0ZVVybDogJy4vb2ZmbGluZS1wYWNrYWdlLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZmZsaW5lLXBhY2thZ2UtbW9kYWwuY29tcG9uZW50LmNzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPZmZsaW5lUGFja2FnZU1vZGFsQ29tcG9uZW50IGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgZmVhdHVyZTogQ29tcG91bmRQYWNrYWdlRmVhdHVyZTtcclxuICBASW5wdXQoKSBwYWNrYWdlT25TZXJ2ZXI6IENvbXBvdW5kUGFja2FnZTtcclxuICBASW5wdXQoKSBvZmZsaW5lUGFja2FnZVN0YXR1cyQ6IE9ic2VydmFibGU8T2ZmbGluZU1hcFBhY2thZ2U+O1xyXG5cclxuICB6b29tOiBudW1iZXI7XHJcbiAgY2VudGVyOiBudW1iZXJbXTtcclxuICB0aWxlTGF5ZXI6IEwuR2VvSlNPTjtcclxuICBpc0NoZWNraW5nQXZhaWxhYmxlRGlza3NwYWNlOmJvb2xlYW47XHJcblxyXG4gIG9mZmxpbmVQYWNrYWdlU3RhdHVzVGhhdFRyaWdnZXJzQ2hhbmdlRGV0ZWN0aW9uJDogT2JzZXJ2YWJsZTxPZmZsaW5lTWFwUGFja2FnZT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgb2ZmbGluZU1hcFNlcnZpY2U6IE9mZmxpbmVNYXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0NoZWNraW5nQXZhaWxhYmxlRGlza3NwYWNlID0gZmFsc2U7XHJcbiAgICB0aGlzLm9mZmxpbmVQYWNrYWdlU3RhdHVzVGhhdFRyaWdnZXJzQ2hhbmdlRGV0ZWN0aW9uJCA9IHRoaXMub2ZmbGluZVBhY2thZ2VTdGF0dXMkLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCkgKSk7XHJcbiAgICB0aGlzLnRpbGVMYXllciA9IG5ldyBMLkdlb0pTT04odGhpcy5mZWF0dXJlKTtcclxuXHJcbiAgICAvLyBTZXQgY2VudGVyIGZyb20gcGFja2FnZSBib3VuZHNcclxuICAgIGNvbnN0IHsgbGF0LCBsbmcgfSA9IHRoaXMudGlsZUxheWVyLmdldEJvdW5kcygpLmdldENlbnRlcigpO1xyXG4gICAgdGhpcy5jZW50ZXIgPSBbbGF0LCBsbmddO1xyXG5cclxuICAgIC8vIFVzZSBvZmZsaW5lIG1hcCBwYWNrYWdlIHJvb3QgdGlsZSBhcyB6b29tIGxldmVsXHJcbiAgICBjb25zdCBbLCAsIHpdID0gdGhpcy5wYWNrYWdlT25TZXJ2ZXIuZ2V0WFlaKCk7XHJcbiAgICB0aGlzLnpvb20gPSB6O1xyXG5cclxuICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuZmluaXNoZWRQYWNrYWdlSWRzJC5waXBlKFxyXG4gICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSkuc3Vic2NyaWJlKChwYWNrYWdlTmFtZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5wYWNrYWdlT25TZXJ2ZXIuZ2V0TmFtZSgpID09PSBwYWNrYWdlTmFtZSkge1xyXG4gICAgICAgIHRoaXMuZGlzbWlzcygpOyAvL2Nsb3NlIHdoZW4gcGFja2FnZSBpcyB1bnppcHBlZCBhbmQgcmVhZHkgdG8gdXNlXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd1RpbGVPbk1hcChtYXA6IEwuTWFwKSB7XHJcbiAgICB0aGlzLnRpbGVMYXllci5hZGRUbyhtYXApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnREb3dubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuaXNDaGVja2luZ0F2YWlsYWJsZURpc2tzcGFjZSA9IHRydWU7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG4gICAgaWYoYXdhaXQgdGhpcy5vZmZsaW5lTWFwU2VydmljZS5jaGVja0F2YWlsYWJsZURpc2tTcGFjZSh0aGlzLnBhY2thZ2VPblNlcnZlcikpIHtcclxuICAgICAgdGhpcy5vZmZsaW5lTWFwU2VydmljZS5kb3dubG9hZFBhY2thZ2UodGhpcy5wYWNrYWdlT25TZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0NoZWNraW5nQXZhaWxhYmxlRGlza3NwYWNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJjZW50YWdlKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKG1hcC5wcm9ncmVzcyA/IG1hcC5wcm9ncmVzcy5wZXJjZW50YWdlIDogMCkgKiAxMDApO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpIHtcclxuICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuY2FuY2VsRG93bmxvYWRQYWNrYWdlKG1hcCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLnJlbW92ZU1hcFBhY2thZ2VCeU5hbWUodGhpcy5wYWNrYWdlT25TZXJ2ZXIuZ2V0TmFtZSgpKTtcclxuICB9XHJcblxyXG4gIGRpc21pc3MoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHtcclxuICAgICAgJ2Rpc21pc3NlZCc6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlciB0cmFuc2x1Y2VudD5cclxuICA8aW9uLXRvb2xiYXI+XHJcbiAgICA8aW9uLXRpdGxlPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuSEVBREVSJyB8IHRyYW5zbGF0ZTp7bmFtZTogcGFja2FnZU9uU2VydmVyLmdldE5hbWUoKX0gfX08L2lvbi10aXRsZT5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwiZW5kXCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkaXNtaXNzKClcIj57eyAnQ0xPU0UnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGRpdiBjbGFzcz1cIm1hcC1jb250YWluZXJcIiAqbmdJZj1cImNlbnRlclwiPlxyXG4gICAgPGFwcC1tYXBcclxuICAgICAgW29mZmxpbmVQYWNrYWdlTW9kZV09XCJ0cnVlXCJcclxuICAgICAgW3Nob3dNYXBTZWFyY2hdPWZhbHNlXHJcbiAgICAgIFtzaG93RnVsbHNjcmVlblRvZ2dsZV09ZmFsc2VcclxuICAgICAgW3Nob3dHcHNDZW50ZXJdPWZhbHNlXHJcbiAgICAgIFtzaG93VXNlckxvY2F0aW9uXT1cImZhbHNlXCJcclxuICAgICAgW3Nob3dTdXBwb3J0TWFwc109XCJmYWxzZVwiXHJcbiAgICAgIFtjZW50ZXJdPVwiY2VudGVyXCJcclxuICAgICAgW3pvb21dPVwiem9vbVwiXHJcbiAgICAgIChtYXBSZWFkeSk9XCJzaG93VGlsZU9uTWFwKCRldmVudClcIlxyXG4gICAgPjwvYXBwLW1hcD5cclxuICA8L2Rpdj5cclxuICA8aW9uLWdyaWQ+XHJcblxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sIHNpemU9XCI0XCI+e3sgJ09GRkxJTkVfTUFQLk1BUF9QQUNLQUdFX0RFVEFJTFNfUEFHRS5QQUNLQUdFX1BST0RVQ0VEX0RBVEUnIHwgdHJhbnNsYXRlIH19PC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbD57eyBwYWNrYWdlT25TZXJ2ZXIuZ2V0TGFzdE1vZGlmaWVkKCkgfCBkYXRlOidzaG9ydCcgfX08L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcblxyXG4gICAgPGlvbi1yb3c+XHJcbiAgICAgIDxpb24tY29sIHNpemU9XCI0XCI+e3sgJ09GRkxJTkVfTUFQLk1BUF9QQUNLQUdFX0RFVEFJTFNfUEFHRS5QQUNLQUdFX1NJWkUnIHwgdHJhbnNsYXRlIH19PC9pb24tY29sPlxyXG4gICAgICA8aW9uLWNvbD57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLlBBQ0tBR0VfU0laRV9WQUxVRV9XSVRIX1VOSVQnIHwgdHJhbnNsYXRlOntzaXplOiBwYWNrYWdlT25TZXJ2ZXIuZ2V0U2l6ZUluTWlCKCkgfCBudW1iZXI6ICcxLjAtMSd9IH19PC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG5cclxuICAgIDxkaXYgKm5nSWY9XCJvZmZsaW5lUGFja2FnZVN0YXR1c1RoYXRUcmlnZ2Vyc0NoYW5nZURldGVjdGlvbiQgfCBhc3luYyBhcyBwYWNrYWdlU3RhdHVzIGVsc2UgZG93bmxvYWRQYWNrYWdlXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI0XCI+e3sgJ09GRkxJTkVfTUFQLk1BUF9QQUNLQUdFX0RFVEFJTFNfUEFHRS5QQUNLQUdFX0RPV05MT0FEX1NUQVRVUycgfCB0cmFuc2xhdGUgfX08L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2w+XHJcbiAgICAgICAgICB7eyBwYWNrYWdlU3RhdHVzLnByb2dyZXNzPy5kZXNjcmlwdGlvbiB9fVxyXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhIXBhY2thZ2VTdGF0dXMuZG93bmxvYWRDb21wbGV0ZVwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuUEFDS0FHRV9ET1dOTE9BREVEX0RBVEUnIHwgdHJhbnNsYXRlOntkYXRlOiBwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGUgKiAxMDAwIHwgZGF0ZTonc2hvcnQnfSB9fSA8L3NwYW4+XHJcbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGVcIj4oe3tnZXRQZXJjZW50YWdlKHBhY2thZ2VTdGF0dXMpICsnJScgfX0pPC9zcGFuPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiMVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiISFwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGVcIiBuYW1lPVwiY2hlY2ttYXJrXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxpb24taWNvbiAqbmdJZj1cIiFwYWNrYWdlU3RhdHVzLmVycm9yICYmIHBhY2thZ2VTdGF0dXMucHJvZ3Jlc3M/LnN0ZXAgPT09IDBcIiBuYW1lPVwic3RvcHdhdGNoLW91dGxpbmVcIj5cclxuICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWljb24gKm5nSWY9XCIhcGFja2FnZVN0YXR1cy5lcnJvciAmJiBwYWNrYWdlU3RhdHVzLnByb2dyZXNzPy5zdGVwID09PSAxXCIgbmFtZT1cImNsb3VkLWRvd25sb2FkLW91dGxpbmVcIj5cclxuICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWljb24gKm5nSWY9XCIhcGFja2FnZVN0YXR1cy5lcnJvciAmJiBwYWNrYWdlU3RhdHVzLnByb2dyZXNzPy5zdGVwID09PSAyXCIgbmFtZT1cImZvbGRlci1vcGVuLW91dGxpbmVcIj5cclxuICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWljb24gKm5nSWY9XCJwYWNrYWdlU3RhdHVzLmVycm9yXCIgbmFtZT1cIndhcm5pbmctb3V0bGluZVwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93ICpuZ0lmPVwiIXBhY2thZ2VTdGF0dXMuZG93bmxvYWRDb21wbGV0ZSAmJiAhcGFja2FnZVN0YXR1cy5lcnJvclwiPlxyXG4gICAgICAgIDxpb24tY29sPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gZXhwYW5kPVwiYmxvY2tcIiBjb2xvcj1cImRhbmdlclwiIChjbGljayk9XCJjYW5jZWwocGFja2FnZVN0YXR1cylcIj57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLkNBTkNFTF9ET1dOTE9BRF9CVVRUT04nIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cInBhY2thZ2VTdGF0dXMuZXJyb3JcIj5cclxuICAgICAgICA8aW9uLWNvbD5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cInN0YXJ0RG93bmxvYWQoKVwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuVFJZX0FHQUlOX0JVVFRPTicgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93ICpuZ0lmPVwiISFwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGUgfHwgcGFja2FnZVN0YXR1cy5lcnJvclwiPlxyXG4gICAgICAgIDxpb24tY29sPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImRlbGV0ZSgpXCIgZXhwYW5kPVwiYmxvY2tcIiBjb2xvcj1cImRhbmdlclwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuREVMRVRFX0JVVFRPTicgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2Rpdj5cclxuICA8L2lvbi1ncmlkPlxyXG48L2lvbi1jb250ZW50PlxyXG5cclxuPG5nLXRlbXBsYXRlICNkb3dubG9hZFBhY2thZ2U+XHJcbiAgPGlvbi1yb3c+XHJcbiAgICA8aW9uLWNvbD5cclxuICAgICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cImlzQ2hlY2tpbmdBdmFpbGFibGVEaXNrc3BhY2VcIiAoY2xpY2spPVwic3RhcnREb3dubG9hZCgpXCIgZXhwYW5kPVwiYmxvY2tcIlxyXG4gICAgICAgIGNvbG9yPVwidmFyc29tLW9yYW5nZVwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuRE9XTkxPQURfQlVUVE9OJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWNvbD5cclxuICA8L2lvbi1yb3c+XHJcbjwvbmctdGVtcGxhdGU+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=