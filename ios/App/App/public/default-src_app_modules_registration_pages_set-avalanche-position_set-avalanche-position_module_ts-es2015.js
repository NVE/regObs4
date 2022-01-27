"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_pages_set-avalanche-position_set-avalanche-position_module_ts"],{

/***/ 41889:
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-avalanche-position/set-avalanche-position.module.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetAvalanchePositionPageModule": function() { return /* binding */ SetAvalanchePositionPageModule; }
/* harmony export */ });
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set-avalanche-position.page */ 71022);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class SetAvalanchePositionPageModule {
}
SetAvalanchePositionPageModule.ɵfac = function SetAvalanchePositionPageModule_Factory(t) { return new (t || SetAvalanchePositionPageModule)(); };
SetAvalanchePositionPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SetAvalanchePositionPageModule });
SetAvalanchePositionPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SetAvalanchePositionPageModule, { declarations: [_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_1__.SetAvalanchePositionPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule] }); })();


/***/ }),

/***/ 71022:
/*!**************************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/set-avalanche-position/set-avalanche-position.page.ts ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetAvalanchePositionPage": function() { return /* binding */ SetAvalanchePositionPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/set-location-in-map/set-location-in-map.component */ 5717);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/fullscreen/fullscreen.service */ 13653);
/* harmony import */ var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/swipe-back/swipe-back.service */ 84716);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);

















function SetAvalanchePositionPage_ion_header_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SetAvalanchePositionPage_ion_header_0_Template_ion_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r2.cancel(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 2, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 4, ctx_r0.geoHazard === ctx_r0.GeoHazard.Snow ? "REGISTRATION.SNOW.AVALANCHE_OBS.SET_AVALANCHE_POSITION" : "REGISTRATION.DIRT.LAND_SLIDE_OBS.SET_LANDSLIDE_POSITION"), " ");
} }
function SetAvalanchePositionPage_app_set_location_in_map_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-set-location-in-map", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mapReady", function SetAvalanchePositionPage_app_set_location_in_map_3_Template_app_set_location_in_map_mapReady_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r4.onMapReady($event); })("locationSet", function SetAvalanchePositionPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.onLocationSet($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("fromMarker", ctx_r1.fromMarker)("locationMarker", ctx_r1.locationMarker)("confirmLocationText", ctx_r1.confirmLocationText)("showPreviousUsedLocations", false)("locationTitle", ctx_r1.locationText)("showPolyline", false)("showFromMarkerInDetails", false)("locationMarkerIconUrl", ctx_r1.locationMarkerIconUrl);
} }
class SetAvalanchePositionPage {
    constructor(cdr, translateService, ngZone, fullscreenService, swipeBackService, modalController) {
        this.cdr = cdr;
        this.translateService = translateService;
        this.ngZone = ngZone;
        this.fullscreenService = fullscreenService;
        this.swipeBackService = swipeBackService;
        this.modalController = modalController;
        this.showPolyline = true;
        this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard;
        this.confirmLocationText = '';
        this.locationText = '';
        this.startImageUrl = '/assets/icon/map/GPS_start.svg';
        this.startIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: this.startImageUrl,
            iconSize: [27, 42],
            iconAnchor: [13.5, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
        });
        this.endImageUrl = '/assets/icon/map/GPS_stop.svg';
        this.endIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: this.endImageUrl,
            iconSize: [27, 42],
            iconAnchor: [13.5, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
        });
        this.locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: '/assets/icon/map/obs-location.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
        });
        this.startIsActive = true;
        this.locationMarkerIconUrl = this.startImageUrl;
        this.fullscreen$ = this.fullscreenService.isFullscreen$;
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            this.translations = yield this.translateService
                .get([
                'REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION',
                'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION',
                'DIALOGS.CONFIRM'
            ])
                .toPromise();
            const fallbackLatlng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(59.1, 10.3);
            if (this.startLatLng) {
                this.start = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.startLatLng.lat, this.startLatLng.lng);
            }
            if (this.endLatLng) {
                this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.endLatLng.lat, this.endLatLng.lng);
            }
            this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.relativeToLatLng || fallbackLatlng, {
                icon: this.startIcon
            });
            this.startMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.locationMarker.getLatLng(), {
                icon: this.startIcon
            }).on('click', () => {
                if (!this.startIsActive) {
                    this.end = this.locationMarker.getLatLng();
                }
                this.startIsActive = true;
                this.updateMarkers();
            });
            this.endMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.locationMarker.getLatLng(), {
                icon: this.endIcon
            }).on('click', () => {
                if (this.startIsActive) {
                    this.start = this.locationMarker.getLatLng();
                }
                this.startIsActive = false;
                this.updateMarkers();
            });
            if (this.relativeToLatLng) {
                this.fromMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.relativeToLatLng, {
                    icon: this.locationMarkerIcon
                });
            }
        });
    }
    onMapReady(map) {
        this.map = map;
        setTimeout(() => {
            this.updateMarkers();
        });
        this.ngZone.runOutsideAngular(() => {
            this.map.on('drag', () => this.updatePolyline());
            this.updatePolyline();
        });
    }
    ionViewDidEnter() {
        this.swipeBackService.disableSwipeBack();
    }
    ionViewWillLeave() {
        this.swipeBackService.enableSwipeBack();
    }
    setStartLocationText() {
        this.confirmLocationText = `${this.translations['DIALOGS.CONFIRM']} ${this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'].toLowerCase()}`;
        this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'];
        this.locationMarkerIconUrl = this.startImageUrl;
    }
    setEndLocationText() {
        this.confirmLocationText = `${this.translations['DIALOGS.CONFIRM']} ${this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'].toLowerCase()}`;
        this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'];
        this.locationMarkerIconUrl = this.endImageUrl;
    }
    updateMarkers() {
        this.startMarker.remove();
        this.endMarker.remove();
        if (!this.start) {
            this.locationMarker.setIcon(this.startIcon);
            this.setStartLocationText();
        }
        else {
            if (this.startIsActive) {
                this.locationMarker.setIcon(this.startIcon);
                this.locationMarker.setLatLng(this.start);
                this.setStartLocationText();
                if (this.end) {
                    this.endMarker.setLatLng(this.end);
                    this.endMarker.addTo(this.map);
                }
            }
            else {
                this.locationMarker.setIcon(this.endIcon);
                this.locationMarker.setLatLng(this.end || this.start);
                this.setEndLocationText();
                this.startMarker.setLatLng(this.start);
                this.startMarker.addTo(this.map);
            }
        }
        this.map.panTo(this.locationMarker.getLatLng());
        this.cdr.detectChanges();
    }
    updatePolyline() {
        if (this.end || this.start) {
            const path = [
                this.locationMarker.getLatLng(),
                this.startIsActive ? this.end : this.start
            ];
            if (!this.pathLine) {
                this.pathLine = leaflet__WEBPACK_IMPORTED_MODULE_0__.polyline(path, {
                    color: 'red',
                    weight: 6,
                    opacity: 0.9
                }).addTo(this.map);
            }
            else {
                this.pathLine.setLatLngs(path);
            }
        }
    }
    onLocationSet(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            if (this.startIsActive) {
                this.start = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);
                if (this.end) {
                    this.map.panTo(this.end);
                }
                else {
                    this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);
                }
                this.startIsActive = false;
                this.updateMarkers();
            }
            else {
                this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);
                this.modalController.dismiss({ start: this.start, end: this.end });
            }
        });
    }
    cancel() {
        this.modalController.dismiss();
    }
    ok() {
        this.setLocationInMapComponent.confirmLocation();
    }
}
SetAvalanchePositionPage.ɵfac = function SetAvalanchePositionPage_Factory(t) { return new (t || SetAvalanchePositionPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController)); };
SetAvalanchePositionPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SetAvalanchePositionPage, selectors: [["app-set-avalanche-position"]], viewQuery: function SetAvalanchePositionPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__.SetLocationInMapComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
    } }, inputs: { startLatLng: "startLatLng", endLatLng: "endLatLng", relativeToLatLng: "relativeToLatLng", geoHazard: "geoHazard", showPolyline: "showPolyline" }, decls: 4, vars: 4, consts: [[4, "ngIf"], ["fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "confirmLocationText", "showPreviousUsedLocations", "locationTitle", "showPolyline", "showFromMarkerInDetails", "locationMarkerIconUrl", "mapReady", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "confirmLocationText", "showPreviousUsedLocations", "locationTitle", "showPolyline", "showFromMarkerInDetails", "locationMarkerIconUrl", "mapReady", "locationSet"]], template: function SetAvalanchePositionPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, SetAvalanchePositionPage_ion_header_0_Template, 9, 6, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, SetAvalanchePositionPage_app_set_location_in_map_3_Template, 1, 9, "app-set-location-in-map", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.fromMarker);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__.SetLocationInMapComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXQtYXZhbGFuY2hlLXBvc2l0aW9uLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zcmNfYXBwX21vZHVsZXNfcmVnaXN0cmF0aW9uX3BhZ2VzX3NldC1hdmFsYW5jaGUtcG9zaXRpb25fc2V0LWF2YWxhbmNoZS1wb3NpdGlvbl9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDd0U7QUFDQzs7QUFPbEUsTUFBTSw4QkFBOEI7OzRHQUE5Qiw4QkFBOEI7MkhBQTlCLDhCQUE4QjsrSEFKaEMsQ0FBQyw2RUFBc0IsQ0FBQzttSUFJdEIsOEJBQThCLG1CQUgxQixrRkFBd0IsYUFEN0IsNkVBQXNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRVg7QUFDMEI7QUFFcEI7QUFDMEI7QUFDd0Q7QUFDeEQ7QUFFcUM7QUFDRDs7Ozs7Ozs7Ozs7SUNoQjNGLDZFQUEyQztJQUN6QyxpRkFBdUM7SUFDckMsaUZBQTBCO0lBQ3hCLGdGQUErQjtJQUFuQixvVUFBa0I7SUFBQyx1REFBa0M7O0lBQUEsNERBQWE7SUFDaEYsNERBQWM7SUFDZCw0RUFBVztJQUNULHVEQUVGOztJQUFBLDREQUFZO0lBQ2QsNERBQWM7SUFDaEIsNERBQWE7OztJQVB3QiwwREFBa0M7SUFBbEMsa0pBQWtDO0lBR2pFLDBEQUVGO0lBRkUsOFNBRUY7Ozs7SUFJRiw2RkFHMkc7SUFIdkMsb1hBQStCO0lBSW5HLDREQUEwQjs7O0lBSmtCLHVGQUF1Qjs7QURXOUQsTUFBTSx3QkFBd0I7SUFvRG5DLFlBQ1UsR0FBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLE1BQWMsRUFDZCxpQkFBb0MsRUFDcEMsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBTGhDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUs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U0FBUyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3BFO1FBQ0gsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELEVBQUU7UUFDQSxJQUFJLENBQUMseUJBQXlCLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Z0dBeE5VLHdCQUF3QjtzSEFBeEIsd0JBQXdCO2tFQWlEeEIsb0hBQXlCOzs7OztRQ3hFdEMsa0lBVWE7O1FBQ2IsOEVBQWE7UUFDWCw0SkFJMEI7UUFDNUIsNERBQWM7O1FBakJELG1KQUE0QjtRQVliLDBEQUFnQjtRQUFoQixnRkFBZ0IiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24ubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZSB9IGZyb20gJy4vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1NldEF2YWxhbmNoZVBvc2l0aW9uUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgT2JzTG9jYXRpb25FZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2V0LWxvY2F0aW9uLWluLW1hcC9zZXQtbG9jYXRpb24taW4tbWFwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvZnVsbHNjcmVlbi9mdWxsc2NyZWVuLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTd2lwZUJhY2tTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9zd2lwZS1iYWNrL3N3aXBlLWJhY2suc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zZXQtYXZhbGFuY2hlLXBvc2l0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NldC1hdmFsYW5jaGUtcG9zaXRpb24ucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgc3RhcnRMYXRMbmc/OiBMLkxhdExuZztcclxuICBASW5wdXQoKSBlbmRMYXRMbmc/OiBMLkxhdExuZztcclxuICBASW5wdXQoKSByZWxhdGl2ZVRvTGF0TG5nPzogTC5MYXRMbmc7XHJcbiAgQElucHV0KCkgZ2VvSGF6YXJkOiBHZW9IYXphcmQ7XHJcbiAgQElucHV0KCkgc2hvd1BvbHlsaW5lID0gdHJ1ZTtcclxuXHJcbiAgR2VvSGF6YXJkID0gR2VvSGF6YXJkO1xyXG5cclxuICBzdGFydDogTC5MYXRMbmc7XHJcbiAgZW5kOiBMLkxhdExuZztcclxuICBwcml2YXRlIG1hcDogTC5NYXA7XHJcbiAgcHJpdmF0ZSBwYXRoTGluZTogTC5Qb2x5bGluZTtcclxuXHJcbiAgZnJvbU1hcmtlcjogTC5NYXJrZXI7XHJcbiAgbG9jYXRpb25NYXJrZXI6IEwuTWFya2VyO1xyXG4gIGNvbmZpcm1Mb2NhdGlvblRleHQgPSAnJztcclxuICBsb2NhdGlvblRleHQgPSAnJztcclxuICBzdGFydEltYWdlVXJsID0gJy9hc3NldHMvaWNvbi9tYXAvR1BTX3N0YXJ0LnN2Zyc7XHJcbiAgcHJpdmF0ZSBzdGFydEljb24gPSBMLmljb24oe1xyXG4gICAgaWNvblVybDogdGhpcy5zdGFydEltYWdlVXJsLFxyXG4gICAgaWNvblNpemU6IFsyNywgNDJdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLjUsIDQxXSxcclxuICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQxLCA0MV1cclxuICB9KTtcclxuICBlbmRJbWFnZVVybCA9ICcvYXNzZXRzL2ljb24vbWFwL0dQU19zdG9wLnN2Zyc7XHJcbiAgcHJpdmF0ZSBlbmRJY29uID0gTC5pY29uKHtcclxuICAgIGljb25Vcmw6IHRoaXMuZW5kSW1hZ2VVcmwsXHJcbiAgICBpY29uU2l6ZTogWzI3LCA0Ml0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTMuNSwgNDFdLFxyXG4gICAgc2hhZG93VXJsOiAnbGVhZmxldC9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gIH0pO1xyXG4gIGxvY2F0aW9uTWFya2VySWNvbiA9IEwuaWNvbih7XHJcbiAgICBpY29uVXJsOiAnL2Fzc2V0cy9pY29uL21hcC9vYnMtbG9jYXRpb24uc3ZnJyxcclxuICAgIGljb25TaXplOiBbMjUsIDQxXSxcclxuICAgIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gICAgc2hhZG93VXJsOiAnbGVhZmxldC9tYXJrZXItc2hhZG93LnBuZycsXHJcbiAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gIH0pO1xyXG4gIHByaXZhdGUgc3RhcnRNYXJrZXI6IEwuTWFya2VyO1xyXG4gIHByaXZhdGUgZW5kTWFya2VyOiBMLk1hcmtlcjtcclxuICBwcml2YXRlIHRyYW5zbGF0aW9ucztcclxuICBwcml2YXRlIHN0YXJ0SXNBY3RpdmUgPSB0cnVlO1xyXG4gIGxvY2F0aW9uTWFya2VySWNvblVybCA9IHRoaXMuc3RhcnRJbWFnZVVybDtcclxuXHJcbiAgZnVsbHNjcmVlbiQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XHJcblxyXG4gIEBWaWV3Q2hpbGQoU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudClcclxuICBzZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50OiBTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW5TZXJ2aWNlOiBGdWxsc2NyZWVuU2VydmljZSxcclxuICAgIHByaXZhdGUgc3dpcGVCYWNrU2VydmljZTogU3dpcGVCYWNrU2VydmljZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXJcclxuICApIHtcclxuICAgIHRoaXMuZnVsbHNjcmVlbiQgPSB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRnVsbHNjcmVlbiQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMudHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5TVEFSVF9QT1NJVElPTicsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkVORF9QT1NJVElPTicsXHJcbiAgICAgICAgJ0RJQUxPR1MuQ09ORklSTSdcclxuICAgICAgXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgZmFsbGJhY2tMYXRsbmcgPSBMLmxhdExuZyg1OS4xLCAxMC4zKTtcclxuICAgIGlmICh0aGlzLnN0YXJ0TGF0TG5nKSB7XHJcbiAgICAgIHRoaXMuc3RhcnQgPSBMLmxhdExuZyh0aGlzLnN0YXJ0TGF0TG5nLmxhdCwgdGhpcy5zdGFydExhdExuZy5sbmcpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZW5kTGF0TG5nKSB7XHJcbiAgICAgIHRoaXMuZW5kID0gTC5sYXRMbmcodGhpcy5lbmRMYXRMbmcubGF0LCB0aGlzLmVuZExhdExuZy5sbmcpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKHRoaXMucmVsYXRpdmVUb0xhdExuZyB8fCBmYWxsYmFja0xhdGxuZywge1xyXG4gICAgICBpY29uOiB0aGlzLnN0YXJ0SWNvblxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0YXJ0TWFya2VyID0gTC5tYXJrZXIodGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKSwge1xyXG4gICAgICBpY29uOiB0aGlzLnN0YXJ0SWNvblxyXG4gICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMuc3RhcnRJc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuZW5kID0gdGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXJ0SXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5lbmRNYXJrZXIgPSBMLm1hcmtlcih0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpLCB7XHJcbiAgICAgIGljb246IHRoaXMuZW5kSWNvblxyXG4gICAgfSkub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5zdGFydElzQWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydElzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXBkYXRlTWFya2VycygpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5yZWxhdGl2ZVRvTGF0TG5nKSB7XHJcbiAgICAgIHRoaXMuZnJvbU1hcmtlciA9IEwubWFya2VyKHRoaXMucmVsYXRpdmVUb0xhdExuZywge1xyXG4gICAgICAgIGljb246IHRoaXMubG9jYXRpb25NYXJrZXJJY29uXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25NYXBSZWFkeShtYXA6IEwuTWFwKSB7XHJcbiAgICB0aGlzLm1hcCA9IG1hcDtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICB0aGlzLm1hcC5vbignZHJhZycsICgpID0+IHRoaXMudXBkYXRlUG9seWxpbmUoKSk7XHJcbiAgICAgIHRoaXMudXBkYXRlUG9seWxpbmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgdGhpcy5zd2lwZUJhY2tTZXJ2aWNlLmRpc2FibGVTd2lwZUJhY2soKTtcclxuICB9XHJcblxyXG4gIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICB0aGlzLnN3aXBlQmFja1NlcnZpY2UuZW5hYmxlU3dpcGVCYWNrKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0YXJ0TG9jYXRpb25UZXh0KCkge1xyXG4gICAgdGhpcy5jb25maXJtTG9jYXRpb25UZXh0ID0gYCR7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRpb25zWydESUFMT0dTLkNPTkZJUk0nXVxyXG4gICAgfSAke3RoaXMudHJhbnNsYXRpb25zW1xyXG4gICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU1RBUlRfUE9TSVRJT04nXHJcbiAgICBdLnRvTG93ZXJDYXNlKCl9YDtcclxuICAgIHRoaXMubG9jYXRpb25UZXh0ID0gdGhpcy50cmFuc2xhdGlvbnNbXHJcbiAgICAgICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5TVEFSVF9QT1NJVElPTidcclxuICAgIF07XHJcbiAgICB0aGlzLmxvY2F0aW9uTWFya2VySWNvblVybCA9IHRoaXMuc3RhcnRJbWFnZVVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RW5kTG9jYXRpb25UZXh0KCkge1xyXG4gICAgdGhpcy5jb25maXJtTG9jYXRpb25UZXh0ID0gYCR7XHJcbiAgICAgIHRoaXMudHJhbnNsYXRpb25zWydESUFMT0dTLkNPTkZJUk0nXVxyXG4gICAgfSAke3RoaXMudHJhbnNsYXRpb25zW1xyXG4gICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRU5EX1BPU0lUSU9OJ1xyXG4gICAgXS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICB0aGlzLmxvY2F0aW9uVGV4dCA9IHRoaXMudHJhbnNsYXRpb25zW1xyXG4gICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRU5EX1BPU0lUSU9OJ1xyXG4gICAgXTtcclxuICAgIHRoaXMubG9jYXRpb25NYXJrZXJJY29uVXJsID0gdGhpcy5lbmRJbWFnZVVybDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlTWFya2VycygpIHtcclxuICAgIHRoaXMuc3RhcnRNYXJrZXIucmVtb3ZlKCk7XHJcbiAgICB0aGlzLmVuZE1hcmtlci5yZW1vdmUoKTtcclxuICAgIGlmICghdGhpcy5zdGFydCkge1xyXG4gICAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldEljb24odGhpcy5zdGFydEljb24pO1xyXG4gICAgICB0aGlzLnNldFN0YXJ0TG9jYXRpb25UZXh0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5zdGFydElzQWN0aXZlKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRJY29uKHRoaXMuc3RhcnRJY29uKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldExhdExuZyh0aGlzLnN0YXJ0KTtcclxuICAgICAgICB0aGlzLnNldFN0YXJ0TG9jYXRpb25UZXh0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZW5kKSB7XHJcbiAgICAgICAgICB0aGlzLmVuZE1hcmtlci5zZXRMYXRMbmcodGhpcy5lbmQpO1xyXG4gICAgICAgICAgdGhpcy5lbmRNYXJrZXIuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldEljb24odGhpcy5lbmRJY29uKTtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyLnNldExhdExuZyh0aGlzLmVuZCB8fCB0aGlzLnN0YXJ0KTtcclxuICAgICAgICB0aGlzLnNldEVuZExvY2F0aW9uVGV4dCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuc2V0TGF0TG5nKHRoaXMuc3RhcnQpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRNYXJrZXIuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLm1hcC5wYW5Ubyh0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpKTtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBvbHlsaW5lKCkge1xyXG4gICAgaWYgKHRoaXMuZW5kIHx8IHRoaXMuc3RhcnQpIHtcclxuICAgICAgY29uc3QgcGF0aCA9IFtcclxuICAgICAgICB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpLFxyXG4gICAgICAgIHRoaXMuc3RhcnRJc0FjdGl2ZSA/IHRoaXMuZW5kIDogdGhpcy5zdGFydFxyXG4gICAgICBdO1xyXG4gICAgICBpZiAoIXRoaXMucGF0aExpbmUpIHtcclxuICAgICAgICB0aGlzLnBhdGhMaW5lID0gTC5wb2x5bGluZShwYXRoLCB7XHJcbiAgICAgICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgICAgICB3ZWlnaHQ6IDYsXHJcbiAgICAgICAgICBvcGFjaXR5OiAwLjlcclxuICAgICAgICB9KS5hZGRUbyh0aGlzLm1hcCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5wYXRoTGluZS5zZXRMYXRMbmdzKHBhdGgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkxvY2F0aW9uU2V0KGV2ZW50OiBPYnNMb2NhdGlvbkVkaXRNb2RlbCkge1xyXG4gICAgaWYgKHRoaXMuc3RhcnRJc0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gTC5sYXRMbmcoZXZlbnQuTGF0aXR1ZGUsIGV2ZW50LkxvbmdpdHVkZSk7XHJcbiAgICAgIGlmICh0aGlzLmVuZCkge1xyXG4gICAgICAgIHRoaXMubWFwLnBhblRvKHRoaXMuZW5kKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVuZCA9IEwubGF0TG5nKGV2ZW50LkxhdGl0dWRlLCBldmVudC5Mb25naXR1ZGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhcnRJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZW5kID0gTC5sYXRMbmcoZXZlbnQuTGF0aXR1ZGUsIGV2ZW50LkxvbmdpdHVkZSk7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoeyBzdGFydDogdGhpcy5zdGFydCwgZW5kOiB0aGlzLmVuZCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5zZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50LmNvbmZpcm1Mb2NhdGlvbigpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlciAqbmdJZj1cIiEoZnVsbHNjcmVlbiQgfCBhc3luYylcIj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7IChnZW9IYXphcmQgPT09IEdlb0hhemFyZC5Tbm93ID8gJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuU0VUX0FWQUxBTkNIRV9QT1NJVElPTicgOlxyXG4gICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU0VUX0xBTkRTTElERV9QT1NJVElPTicpIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXNldC1sb2NhdGlvbi1pbi1tYXAgKm5nSWY9XCJmcm9tTWFya2VyXCIgW2dlb0hhemFyZF09XCJnZW9IYXphcmRcIiAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCIgW2Zyb21NYXJrZXJdPVwiZnJvbU1hcmtlclwiXHJcbiAgICBbbG9jYXRpb25NYXJrZXJdPVwibG9jYXRpb25NYXJrZXJcIiAobG9jYXRpb25TZXQpPVwib25Mb2NhdGlvblNldCgkZXZlbnQpXCIgW2NvbmZpcm1Mb2NhdGlvblRleHRdPVwiY29uZmlybUxvY2F0aW9uVGV4dFwiXHJcbiAgICBmcm9tTG9jYXRpb25UZXh0PVwiUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5USVRMRVwiIFtzaG93UHJldmlvdXNVc2VkTG9jYXRpb25zXT1cImZhbHNlXCIgW2xvY2F0aW9uVGl0bGVdPVwibG9jYXRpb25UZXh0XCJcclxuICAgIFtzaG93UG9seWxpbmVdPVwiZmFsc2VcIiBbc2hvd0Zyb21NYXJrZXJJbkRldGFpbHNdPVwiZmFsc2VcIiBbbG9jYXRpb25NYXJrZXJJY29uVXJsXT1cImxvY2F0aW9uTWFya2VySWNvblVybFwiPlxyXG4gIDwvYXBwLXNldC1sb2NhdGlvbi1pbi1tYXA+XHJcbjwvaW9uLWNvbnRlbnQ+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=