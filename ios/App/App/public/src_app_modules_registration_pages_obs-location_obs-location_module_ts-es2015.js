"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_obs-location_obs-location_module_ts"],{

/***/ 73862:
/*!********************************************************************************!*\
  !*** ./src/app/modules/registration/pages/obs-location/obs-location.module.ts ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsLocationPageModule": function() { return /* binding */ ObsLocationPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _obs_location_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obs-location.page */ 81889);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _save_as_draft_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../save-as-draft.guard */ 52622);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _obs_location_page__WEBPACK_IMPORTED_MODULE_0__.ObsLocationPage,
        canDeactivate: [_save_as_draft_guard__WEBPACK_IMPORTED_MODULE_2__.SaveAsDraftRouteGuard]
    }
];
class ObsLocationPageModule {
}
ObsLocationPageModule.ɵfac = function ObsLocationPageModule_Factory(t) { return new (t || ObsLocationPageModule)(); };
ObsLocationPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ObsLocationPageModule });
ObsLocationPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ObsLocationPageModule, { declarations: [_obs_location_page__WEBPACK_IMPORTED_MODULE_0__.ObsLocationPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 81889:
/*!******************************************************************************!*\
  !*** ./src/app/modules/registration/pages/obs-location/obs-location.page.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObsLocationPage": function() { return /* binding */ ObsLocationPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/registration.service */ 33181);
/* harmony import */ var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/services/fullscreen/fullscreen.service */ 13653);
/* harmony import */ var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/swipe-back/swipe-back.service */ 84716);
/* harmony import */ var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/set-location-in-map/set-location-in-map.component */ 5717);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
























function ObsLocationPage_ion_header_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-back-button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 1, "REGISTRATION.OBS_LOCATION.TITLE"), " ");
} }
function ObsLocationPage_app_set_location_in_map_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-set-location-in-map", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("locationSet", function ObsLocationPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r2.onLocationSet($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("locationMarker", ctx_r1.locationMarker)("selectedLocation", ctx_r1.selectedLocation)("allowEditLocationName", true)("isSaveDisabled", ctx_r1.isSaveDisabled);
} }
const DEBUG_TAG = 'ObsLocationPage';
class ObsLocationPage {
    constructor(registrationService, activatedRoute, ngZone, navController, fullscreenService, swipeBackService, userSettingService, regobsAuthService) {
        this.registrationService = registrationService;
        this.activatedRoute = activatedRoute;
        this.ngZone = ngZone;
        this.navController = navController;
        this.fullscreenService = fullscreenService;
        this.swipeBackService = swipeBackService;
        this.userSettingService = userSettingService;
        this.regobsAuthService = regobsAuthService;
        this.isLoaded = false;
        this.isSaveDisabled = false;
        this.fullscreen$ = this.fullscreenService.isFullscreen$;
    }
    ngOnInit() {
        var _a;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            const id = this.activatedRoute.snapshot.params['id'];
            if (id) {
                this.registration = yield this.registrationService.getSavedRegistrationById(id);
                this.geoHazard = (_a = this.registration) === null || _a === void 0 ? void 0 : _a.geoHazard;
            }
            else if (this.activatedRoute.snapshot.params['geoHazard']) {
                this.geoHazard = parseInt(this.activatedRoute.snapshot.params['geoHazard'], 10);
            }
            if (this.geoHazard == null) {
                // No geohazard found, use app mode
                const userSettings = yield this.userSettingService.userSetting$
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1))
                    .toPromise();
                this.geoHazard = userSettings.currentGeoHazard[0];
            }
            if (this.hasLocation(this.registration)) {
                const locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                    iconUrl: '/assets/icon/map/obs-location.svg',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    shadowUrl: 'leaflet/marker-shadow.png',
                    shadowSize: [41, 41]
                });
                this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker({
                    lat: this.registration.request.ObsLocation.Latitude,
                    lng: this.registration.request.ObsLocation.Longitude
                }, { icon: locationMarkerIcon });
                this.selectedLocation = {
                    Name: this.registration.request.ObsLocation.LocationName ||
                        this.registration.request.ObsLocation.LocationDescription,
                    Id: this.registration.request.ObsLocation.ObsLocationID
                };
            }
            this.subscription = this.regobsAuthService.loggedInUser$.subscribe((val) => {
                this.loggedInUser = val;
            });
            this.ngZone.run(() => {
                this.isLoaded = true;
            });
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    ionViewDidEnter() {
        this.swipeBackService.disableSwipeBack();
    }
    ionViewWillLeave() {
        this.swipeBackService.enableSwipeBack();
    }
    hasLocation(reg) {
        return (reg &&
            reg.request.ObsLocation &&
            reg.request.ObsLocation.Latitude &&
            reg.request.ObsLocation.Longitude);
    }
    onLocationSet(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.ngZone.run(() => {
                this.isSaveDisabled = true;
            });
            if (!this.registration) {
                this.registration = this.registrationService.createNewRegistration(this.geoHazard);
            }
            yield this.setLocationAndSaveRegistration(event);
            if (this.registration.request.DtObsTime) {
                this.navController.navigateForward('registration/edit/' + this.registration.id);
            }
            else {
                this.navController.navigateForward('registration/set-time/' + this.registration.id);
            }
        });
    }
    setLocationAndSaveRegistration(loc) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (loc === undefined || this.registration === undefined) {
                return;
            }
            this.registration.request.ObsLocation = loc;
            yield this.registrationService.saveRegistrationAsync(this.registration);
            this.isSaveDisabled = false;
        });
    }
}
ObsLocationPage.ɵfac = function ObsLocationPage_Factory(t) { return new (t || ObsLocationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService)); };
ObsLocationPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: ObsLocationPage, selectors: [["app-obs-location"]], viewQuery: function ObsLocationPage_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__.SetLocationInMapComponent, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
    } }, decls: 4, vars: 4, consts: [[4, "ngIf"], [3, "geoHazard", "locationMarker", "selectedLocation", "allowEditLocationName", "isSaveDisabled", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "geoHazard", "locationMarker", "selectedLocation", "allowEditLocationName", "isSaveDisabled", "locationSet"]], template: function ObsLocationPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, ObsLocationPage_ion_header_0_Template, 7, 3, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, ObsLocationPage_app_set_location_in_map_3_Template, 1, 5, "app-set-location-in-map", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isLoaded);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__.SetLocationInMapComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvYnMtbG9jYXRpb24ucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19vYnMtbG9jYXRpb25fb2JzLWxvY2F0aW9uX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3VEO0FBQ0Q7QUFDa0I7QUFDVDs7O0FBRS9ELE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsK0RBQWU7UUFDMUIsYUFBYSxFQUFFLENBQUMsdUVBQXFCLENBQUM7S0FDdkM7Q0FDRixDQUFDO0FBTUssTUFBTSxxQkFBcUI7OzBGQUFyQixxQkFBcUI7a0hBQXJCLHFCQUFxQjtzSEFIdkIsQ0FBQyw2RUFBc0IsRUFBRSxrRUFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzttSUFHckQscUJBQXFCLG1CQUZqQiwrREFBZSxhQURwQiw2RUFBc0IsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmNEM7QUFDbkQ7QUFFNkM7QUFDM0I7QUFLRTtBQUcyQztBQUNEO0FBRW9CO0FBQ2Q7QUFDM0Q7QUFDeUM7Ozs7Ozs7Ozs7Ozs7O0lDbEIvRSw2RUFBMkM7SUFDekMsaUZBQXVDO0lBQ3JDLGlGQUEwQjtJQUN4QixnRkFBMkQ7SUFDN0QsNERBQWM7SUFDZCw0RUFBVztJQUNULHVEQUNGOztJQUFBLDREQUFZO0lBQ2QsNERBQWM7SUFDaEIsNERBQWE7O0lBSFAsMERBQ0Y7SUFERSw4S0FDRjs7OztJQUlGLDZGQUVvQztJQURsQyxvWEFBcUM7SUFFdkMsNERBQTBCOzs7SUFIZ0IsdUZBQXVCOztBRFNuRSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQU83QixNQUFNLGVBQWU7SUFjMUIsWUFDVSxtQkFBd0MsRUFDeEMsY0FBOEIsRUFDOUIsTUFBYyxFQUNkLGFBQTRCLEVBQzVCLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDbEMsa0JBQXNDLEVBQ3RDLGlCQUFvQztRQVBwQyx3QkFBbUIsR0FBbkIsbUJB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SSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FDaEMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQzVDLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FDaEMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQ2hELENBQUM7YUFDSDtRQUNILENBQUM7S0FBQTtJQUVhLDhCQUE4QixDQUFDLEdBQXlCOztZQUNwRSxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQ3hELE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDNUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7S0FBQTs7OEVBbklVLGVBQWU7NkdBQWYsZUFBZTtrRUFRZixvSEFBeUI7Ozs7O1FDbkN0Qyx5SEFTYTs7UUFDYiw4RUFBYTtRQUNYLG1KQUcwQjtRQUM1Qiw0REFBYzs7UUFmRCxtSkFBNEI7UUFXYiwwREFBYztRQUFkLDhFQUFjIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL29icy1sb2NhdGlvbi5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL29icy1sb2NhdGlvbi5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL29icy1sb2NhdGlvbi9vYnMtbG9jYXRpb24ucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzTG9jYXRpb25QYWdlIH0gZnJvbSAnLi9vYnMtbG9jYXRpb24ucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTYXZlQXNEcmFmdFJvdXRlR3VhcmQgfSBmcm9tICcuLi9zYXZlLWFzLWRyYWZ0Lmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBPYnNMb2NhdGlvblBhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbU2F2ZUFzRHJhZnRSb3V0ZUd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPYnNMb2NhdGlvblBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPYnNMb2NhdGlvblBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQge1xyXG4gIE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjIsXHJcbiAgT2JzTG9jYXRpb25FZGl0TW9kZWxcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2Z1bGxzY3JlZW4vZnVsbHNjcmVlbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3dpcGVCYWNrU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3dpcGUtYmFjay9zd2lwZS1iYWNrLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnZWRJblVzZXIgfSBmcm9tICcuLi8uLi8uLi9sb2dpbi9tb2RlbHMvbG9nZ2VkLWluLXVzZXIubW9kZWwnO1xyXG5pbXBvcnQgeyBTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZXQtbG9jYXRpb24taW4tbWFwL3NldC1sb2NhdGlvbi1pbi1tYXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBSZWdvYnNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2F1dGgvc2VydmljZXMvcmVnb2JzLWF1dGguc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnT2JzTG9jYXRpb25QYWdlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW9icy1sb2NhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL29icy1sb2NhdGlvbi5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29icy1sb2NhdGlvbi5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2JzTG9jYXRpb25QYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIGxvY2F0aW9uTWFya2VyOiBMLk1hcmtlcjtcclxuICBpc0xvYWRlZCA9IGZhbHNlO1xyXG4gIHNlbGVjdGVkTG9jYXRpb246IE9ic0xvY2F0aW9uc1Jlc3BvbnNlRHRvVjI7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGZ1bGxzY3JlZW4kOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG4gIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIGlzU2F2ZURpc2FibGVkID0gZmFsc2U7XHJcbiAgQFZpZXdDaGlsZChTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50KVxyXG4gIHNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ6IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ7XHJcblxyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSBsb2dnZWRJblVzZXI6IExvZ2dlZEluVXNlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGZ1bGxzY3JlZW5TZXJ2aWNlOiBGdWxsc2NyZWVuU2VydmljZSxcclxuICAgIHByaXZhdGUgc3dpcGVCYWNrU2VydmljZTogU3dpcGVCYWNrU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5mdWxsc2NyZWVuJCA9IHRoaXMuZnVsbHNjcmVlblNlcnZpY2UuaXNGdWxsc2NyZWVuJDtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIGlmIChpZCkge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5nZXRTYXZlZFJlZ2lzdHJhdGlvbkJ5SWQoXHJcbiAgICAgICAgaWRcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5nZW9IYXphcmQgPSB0aGlzLnJlZ2lzdHJhdGlvbj8uZ2VvSGF6YXJkO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snZ2VvSGF6YXJkJ10pIHtcclxuICAgICAgdGhpcy5nZW9IYXphcmQgPSBwYXJzZUludChcclxuICAgICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snZ2VvSGF6YXJkJ10sXHJcbiAgICAgICAgMTBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdlb0hhemFyZCA9PSBudWxsKSB7XHJcbiAgICAgIC8vIE5vIGdlb2hhemFyZCBmb3VuZCwgdXNlIGFwcCBtb2RlXHJcbiAgICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICB0aGlzLmdlb0hhemFyZCA9IHVzZXJTZXR0aW5ncy5jdXJyZW50R2VvSGF6YXJkWzBdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaGFzTG9jYXRpb24odGhpcy5yZWdpc3RyYXRpb24pKSB7XHJcbiAgICAgIGNvbnN0IGxvY2F0aW9uTWFya2VySWNvbiA9IEwuaWNvbih7XHJcbiAgICAgICAgaWNvblVybDogJy9hc3NldHMvaWNvbi9tYXAvb2JzLWxvY2F0aW9uLnN2ZycsXHJcbiAgICAgICAgaWNvblNpemU6IFsyNSwgNDFdLFxyXG4gICAgICAgIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gICAgICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgICAgIHNoYWRvd1NpemU6IFs0MSwgNDFdXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uTWFya2VyID0gTC5tYXJrZXIoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGF0OiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgICAgbG5nOiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBpY29uOiBsb2NhdGlvbk1hcmtlckljb24gfVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTG9jYXRpb24gPSB7XHJcbiAgICAgICAgTmFtZTpcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9jYXRpb25OYW1lIHx8XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uRGVzY3JpcHRpb24sXHJcbiAgICAgICAgSWQ6IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uT2JzTG9jYXRpb25JRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQuc3Vic2NyaWJlKFxyXG4gICAgICAodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2dnZWRJblVzZXIgPSB2YWw7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5pc0xvYWRlZCA9IHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICB0aGlzLnN3aXBlQmFja1NlcnZpY2UuZGlzYWJsZVN3aXBlQmFjaygpO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIHRoaXMuc3dpcGVCYWNrU2VydmljZS5lbmFibGVTd2lwZUJhY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzTG9jYXRpb24ocmVnOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICByZWcgJiZcclxuICAgICAgcmVnLnJlcXVlc3QuT2JzTG9jYXRpb24gJiZcclxuICAgICAgcmVnLnJlcXVlc3QuT2JzTG9jYXRpb24uTGF0aXR1ZGUgJiZcclxuICAgICAgcmVnLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9uZ2l0dWRlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25Mb2NhdGlvblNldChldmVudDogT2JzTG9jYXRpb25FZGl0TW9kZWwpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmNyZWF0ZU5ld1JlZ2lzdHJhdGlvbihcclxuICAgICAgICB0aGlzLmdlb0hhemFyZCxcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2V0TG9jYXRpb25BbmRTYXZlUmVnaXN0cmF0aW9uKGV2ZW50KTtcclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZSkge1xyXG4gICAgICB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVGb3J3YXJkKFxyXG4gICAgICAgICdyZWdpc3RyYXRpb24vZWRpdC8nICsgdGhpcy5yZWdpc3RyYXRpb24uaWRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZUZvcndhcmQoXHJcbiAgICAgICAgJ3JlZ2lzdHJhdGlvbi9zZXQtdGltZS8nICsgdGhpcy5yZWdpc3RyYXRpb24uaWRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgc2V0TG9jYXRpb25BbmRTYXZlUmVnaXN0cmF0aW9uKGxvYzogT2JzTG9jYXRpb25FZGl0TW9kZWwpIHtcclxuICAgIGlmIChsb2MgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnJlZ2lzdHJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24gPSBsb2M7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uKTtcclxuICAgIHRoaXMuaXNTYXZlRGlzYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXIgKm5nSWY9XCIhKGZ1bGxzY3JlZW4kIHwgYXN5bmMpXCI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1zZXQtbG9jYXRpb24taW4tbWFwICpuZ0lmPVwiaXNMb2FkZWRcIiBbZ2VvSGF6YXJkXT1cImdlb0hhemFyZFwiIFtsb2NhdGlvbk1hcmtlcl09XCJsb2NhdGlvbk1hcmtlclwiXHJcbiAgICAobG9jYXRpb25TZXQpPVwib25Mb2NhdGlvblNldCgkZXZlbnQpXCIgW3NlbGVjdGVkTG9jYXRpb25dPVwic2VsZWN0ZWRMb2NhdGlvblwiIFthbGxvd0VkaXRMb2NhdGlvbk5hbWVdPVwidHJ1ZVwiXHJcbiAgICBbaXNTYXZlRGlzYWJsZWRdPVwiaXNTYXZlRGlzYWJsZWRcIj5cclxuICA8L2FwcC1zZXQtbG9jYXRpb24taW4tbWFwPlxyXG48L2lvbi1jb250ZW50PiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiJ3ZWJwYWNrOi8vLyJ9