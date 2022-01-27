"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_dirt_landslide-obs_landslide-obs_module_ts"],{

/***/ 64679:
/*!***************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/dirt/landslide-obs/landslide-obs.module.ts ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandslideObsPageModule": function() { return /* binding */ LandslideObsPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landslide-obs.page */ 17331);
/* harmony import */ var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../can-deactivate-route.guard */ 7990);
/* harmony import */ var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-web-url-modal/add-web-url-modal.module */ 22838);
/* harmony import */ var _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../set-avalanche-position/set-avalanche-position.module */ 41889);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);








const routes = [
    {
        path: '',
        component: _landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__.LandslideObsPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateRouteGuard]
    }
];
class LandslideObsPageModule {
}
LandslideObsPageModule.ɵfac = function LandslideObsPageModule_Factory(t) { return new (t || LandslideObsPageModule)(); };
LandslideObsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: LandslideObsPageModule });
LandslideObsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
            _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule,
            _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](LandslideObsPageModule, { declarations: [_landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__.LandslideObsPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule,
        _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule] }); })();


/***/ }),

/***/ 17331:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/dirt/landslide-obs/landslide-obs.page.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandslideObsPage": function() { return /* binding */ LandslideObsPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../set-avalanche-position/set-avalanche-position.page */ 71022);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! leaflet */ 20685);
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/add-web-url-item/add-web-url-item.component */ 15248);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);






















function LandslideObsPage_app_registration_content_wrapper_8_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](8, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate8"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](2, 8, ctx_r3.registration.request.LandSlideObs.StartLat, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 11, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](4, 13, ctx_r3.registration.request.LandSlideObs.StartLong, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 16, "MAP_CENTER_INFO.EAST_SHORT"), " - ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](6, 18, ctx_r3.registration.request.LandSlideObs.StopLat, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 21, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](8, 23, ctx_r3.registration.request.LandSlideObs.StopLong, "0.3"), "\u00B0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 26, "MAP_CENTER_INFO.EAST_SHORT"), " ");
} }
function LandslideObsPage_app_registration_content_wrapper_8_ion_item_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
} }
function LandslideObsPage_app_registration_content_wrapper_8_ion_item_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
} }
const _c0 = function (a0) { return { "hasWarning": a0 }; };
function LandslideObsPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "app-registration-content-wrapper", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("reset", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r6.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-list-header", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_item_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r8.setLandslidePosition(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "ion-text", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](11, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, LandslideObsPage_app_registration_content_wrapper_8_ng_container_12_Template, 10, 28, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "ion-item", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](15, "ion-label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](18, "ion-datetime", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ngModelChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r9.registration.request.LandSlideObs.DtLandSlideTime = $event; })("ionChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ionChange_18_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r10.dtTimeChanged(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](22, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_button_click_22_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r11.setDtLandSlideTimeToNow(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](26, LandslideObsPage_app_registration_content_wrapper_8_ion_item_26_Template, 5, 6, "ion-item", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "ion-item", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "ion-label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](30, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](31, "ion-datetime", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ionChange_31_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r12.dtEndTimeChanged(); })("ngModelChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ngModelChange_31_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r13.registration.request.LandSlideObs.DtLandSlideTimeEnd = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_button_click_35_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r14.setDtLandSlideTimeEndToNow(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](36, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](38, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](39, LandslideObsPage_app_registration_content_wrapper_8_ion_item_39_Template, 5, 6, "ion-item", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](40, "app-kdv-select", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_40_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r15.registration.request.LandSlideObs.LandSlideTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "app-kdv-select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_41_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r16.registration.request.LandSlideObs.LandSlideSizeTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "app-kdv-select", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_42_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r17.registration.request.LandSlideObs.LandSlideTriggerTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](43, "app-kdv-select", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_43_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r18.registration.request.LandSlideObs.ActivityInfluencedTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](44, "app-kdv-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_44_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r19.registration.request.LandSlideObs.DamageExtentTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](45, "app-kdv-select", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_45_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r20.registration.request.LandSlideObs.ForecastAccurateTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "ion-list-header", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](47, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](49, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](50, "app-text-comment", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_50_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r21.registration.request.LandSlideObs.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](51, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](52, "ion-list-header", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](53, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](54);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](55, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](56, "app-add-picture-item", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "ion-list-header", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](58, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](59);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](60, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](61, "app-add-web-url-item", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("weburlsChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_61_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](); return ctx_r22.registration.request.LandSlideObs.Urls = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 43, "REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 45, "REGISTRATION.DIRT.LAND_SLIDE_OBS.POSITION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.LandSlideObs.StartLat)("ngIfElse", _r1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](75, _c0, ctx_r0.dateIsDifferentThanObsTime));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", !ctx_r0.registration.request.LandSlideObs.DtLandSlideTime ? "danger" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](17, 47, "REGISTRATION.DIRT.LAND_SLIDE_OBS.DT_LAND_SLIDE_TIME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](19, 49, "MONTHS.SHORT_LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](20, 51, "DIALOGS.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](21, 53, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("max", ctx_r0.maxDateStart)("ngModel", ctx_r0.registration.request.LandSlideObs.DtLandSlideTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](25, 55, "REGISTRATION.SET_TIME.NOW"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.dateIsDifferentThanObsTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](77, _c0, ctx_r0.dateEndIsDifferentThanObsTime));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", !ctx_r0.registration.request.LandSlideObs.DtLandSlideTimeEnd ? "danger" : "medium");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](30, 57, "REGISTRATION.DIRT.LAND_SLIDE_OBS.DT_LAND_SLIDE_TIME_END"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](32, 59, "MONTHS.SHORT_LIST"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](33, 61, "DIALOGS.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](34, 63, "DIALOGS.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("min", ctx_r0.minDateEnd)("max", ctx_r0.maxDateEnd)("ngModel", ctx_r0.registration.request.LandSlideObs.DtLandSlideTimeEnd);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](38, 65, "REGISTRATION.SET_TIME.NOW"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.dateEndIsDifferentThanObsTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideSizeTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideTriggerTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.ActivityInfluencedTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.DamageExtentTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.ForecastAccurateTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](49, 67, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](51, 69, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](55, 71, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](60, 73, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("weburls", ctx_r0.registration.request.LandSlideObs.Urls);
} }
function LandslideObsPage_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](1, 2, "REGISTRATION.DIRT.LAND_SLIDE_OBS.SET_LANDSLIDE_POSITION"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 4, "REGISTRATION.DIRT.LAND_SLIDE_OBS.IN_MAP"), "\n");
} }
class LandslideObsPage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute, modalController) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.LandSlideObs, basePageService, activatedRoute);
        this.modalController = modalController;
    }
    get dateIsDifferentThanObsTime() {
        return (this.registration.request.LandSlideObs.DtLandSlideTime &&
            !moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime)
                .startOf('day')
                .isSame(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.DtObsTime).startOf('day')));
    }
    get dateEndIsDifferentThanObsTime() {
        return (this.registration.request.LandSlideObs.DtLandSlideTimeEnd &&
            !moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd)
                .startOf('day')
                .isSame(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.DtObsTime).startOf('day')));
    }
    onInit() {
        if (!this.registration.request.LandSlideObs.Urls) {
            this.registration.request.LandSlideObs.Urls = [];
        }
        if (this.registration.request.LandSlideObs.DtLandSlideTimeEnd) {
            this.maxDateStart = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);
        }
        else {
            this.maxDateStart = this.getMaxDateForNow();
        }
        if (this.registration.request.LandSlideObs.DtLandSlideTime) {
            this.minDateEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).toISOString(true);
        }
        this.maxDateEnd = this.getMaxDateForNow();
    }
    getMaxDateForNow() {
        // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
        // Workaround is to set minutes to 59.
        return moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
    }
    dtTimeChanged() {
        this.minDateEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).toISOString(true);
        if (this.registration.request.LandSlideObs.DtLandSlideTimeEnd &&
            moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).isBefore(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime))) {
            this.registration.request.LandSlideObs.DtLandSlideTimeEnd = this.registration.request.LandSlideObs.DtLandSlideTime;
        }
    }
    dtEndTimeChanged() {
        this.maxDateStart = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);
        if (this.registration.request.LandSlideObs.DtLandSlideTime &&
            moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd))) {
            this.registration.request.LandSlideObs.DtLandSlideTime = this.registration.request.LandSlideObs.DtLandSlideTimeEnd;
        }
    }
    isValid() {
        return (this.registration &&
            this.registration.request.LandSlideObs &&
            !!this.registration.request.LandSlideObs.DtLandSlideTime &&
            !!this.registration.request.LandSlideObs.DtLandSlideTimeEnd);
    }
    setDtLandSlideTimeToNow() {
        this.registration.request.LandSlideObs.DtLandSlideTime = moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
    }
    setDtLandSlideTimeEndToNow() {
        this.registration.request.LandSlideObs.DtLandSlideTimeEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
    }
    setLandslidePosition() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            const relativeToLatLng = this.registration.request.ObsLocation
                ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude)
                : null;
            const startLatLng = this.registration.request.LandSlideObs.StartLat &&
                this.registration.request.LandSlideObs.StartLong
                ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.LandSlideObs.StartLat, this.registration.request.LandSlideObs.StartLong)
                : null;
            const endLatLng = this.registration.request.LandSlideObs.StopLat &&
                this.registration.request.LandSlideObs.StopLong
                ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.LandSlideObs.StopLat, this.registration.request.LandSlideObs.StopLong)
                : null;
            const modal = yield this.modalController.create({
                component: _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_2__.SetAvalanchePositionPage,
                componentProps: {
                    relativeToLatLng,
                    startLatLng,
                    endLatLng,
                    geoHazard: this.registration.geoHazard
                }
            });
            modal.present();
            const result = yield modal.onDidDismiss();
            if (result.data) {
                const start = result.data.start;
                const end = result.data.end;
                this.registration.request.LandSlideObs.StartLat = start.lat;
                this.registration.request.LandSlideObs.StartLong = start.lng;
                this.registration.request.LandSlideObs.StopLat = end.lat;
                this.registration.request.LandSlideObs.StopLong = end.lng;
            }
        });
    }
}
LandslideObsPage.ɵfac = function LandslideObsPage_Factory(t) { return new (t || LandslideObsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_4__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.ModalController)); };
LandslideObsPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({ type: LandslideObsPage, selectors: [["app-landslide-obs"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]], decls: 11, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], ["noPosition", ""], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "click"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap"], ["color", "medium", "name", "location", 1, "position-pin"], [4, "ngIf", "ngIfElse"], ["slot", "end", "name", "chevron-forward", 1, "item-detail-icon"], [3, "ngClass"], ["position", "stacked", 1, "ion-text-uppercase", 3, "color"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "max", "monthShortNames", "doneText", "cancelText", "ngModel", "ngModelChange", "ionChange"], ["slot", "end", "fill", "outline", "color", "medium", 1, "set-to-now-button", 3, "click"], ["slot", "start", "name", "time"], [4, "ngIf"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "min", "max", "monthShortNames", "doneText", "cancelText", "ngModel", "ionChange", "ngModelChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.LANDSLIDE_TYPE", "kdvKey", "Dirt_LandSlideKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DESTRUCTIVE_SIZE", "kdvKey", "Dirt_LandSlideSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.AVAL_TRIGGER", "kdvKey", "Dirt_LandSlideTriggerKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DIRT_ACTIVITY_INFLUENCED", "kdvKey", "Dirt_ActivityInfluencedKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DAMAGE_EXTENT", "kdvKey", "DamageExtentKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DIRT_FORECAST_ACCURATE", "kdvKey", "ForecastAccurateKDV", 3, "value", "valueChange"], [3, "value", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [3, "weburls", "weburlsChange"], ["color", "danger", 1, "ion-text-wrap"]], template: function LandslideObsPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, LandslideObsPage_app_registration_content_wrapper_8_Template, 62, 79, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, LandslideObsPage_ng_template_9_Template, 3, 6, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 2, "REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.LandSlideObs);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonButton, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_8__.KdvSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__.AddPictureItemComponent, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_11__.AddWebUrlItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe], styles: [".set-to-now-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n\n.position-pin[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  position: relative;\n  top: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhbmRzbGlkZS1vYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUFDSiIsImZpbGUiOiJsYW5kc2xpZGUtb2JzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZXQtdG8tbm93LWJ1dHRvbiB7XHJcbiAgICB6LWluZGV4OiAyMDA7XHJcbn1cclxuXHJcbi5wb3NpdGlvbi1waW4ge1xyXG4gICAgd2lkdGg6IDIycHg7XHJcbiAgICBoZWlnaHQ6IDIycHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDNweDtcclxufSJdfQ== */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19kaXJ0X2xhbmRzbGlkZS1vYnNfbGFuZHNsaWRlLW9ic19tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3VEO0FBQ29CO0FBQ25CO0FBQ21CO0FBQ2lCO0FBQ2dCOzs7QUFFNUcsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxpRUFBZ0I7UUFDM0IsYUFBYSxFQUFFLENBQUMsZ0ZBQXVCLENBQUM7S0FDekM7Q0FDRixDQUFDO0FBV0ssTUFBTSxzQkFBc0I7OzRGQUF0QixzQkFBc0I7bUhBQXRCLHNCQUFzQjt1SEFSeEI7WUFDUCw2RUFBc0I7WUFDdEIsaUdBQXdCO1lBQ3hCLGlIQUE4QjtZQUM5QixrRUFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDOUI7bUlBR1Usc0JBQXNCLG1CQUZsQixpRUFBZ0IsYUFMN0IsNkVBQXNCO1FBQ3RCLGlHQUF3QjtRQUN4QixpSEFBOEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlM7QUFDK0M7QUFDekM7QUFDbUQ7QUFDdkU7QUFDNkI7QUFDVDtBQUNyQjs7Ozs7Ozs7Ozs7Ozs7O0lDaUJsQix5RUFBaUY7SUFDL0Usd0RBU0Y7Ozs7Ozs7OztJQUFBLHNFQUFlOzs7SUFUYiwyREFTRjtJQVRFLCsvQkFTRjs7O0lBbUJKLDRFQUE2QztJQUMzQyxpRkFBZ0Q7SUFDOUMsd0RBQ0Y7OztJQUFBLDZEQUFZO0lBQ2QsNkRBQVc7O0lBRlAsMkRBQ0Y7SUFERSwyUkFDRjs7O0lBZ0JGLDRFQUFnRDtJQUM5QyxpRkFBZ0Q7SUFDOUMsd0RBQ0Y7OztJQUFBLDZEQUFZO0lBQ2QsNkRBQVc7O0lBRlAsMkRBQ0Y7SUFERSwyUkFDRjs7Ozs7SUFoRU4sdUdBQ3NGO0lBQWxCLDBXQUFpQjtJQUNuRiwrRUFBdUI7SUFDckIsc0ZBQTRDO0lBQzFDLDZFQUFXO0lB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Z0I7UUNmN0IsOEVBQVk7UUFDVixrRkFBdUM7UUFDckMsa0ZBQTBCO1FBQ3hCLGlGQUEyRDtRQUM3RCw2REFBYztRQUNkLDZFQUFXO1FBQ1Qsd0RBQ0Y7O1FBQUEsNkRBQVk7UUFDZCw2REFBYztRQUNoQiw2REFBYTtRQUViLCtFQUFhO1FBQ1gseUtBcUdtQztRQUNyQyw2REFBYztRQUNkLDBNQUdjOztRQWhIUiwyREFDRjtRQURFLHVMQUNGO1FBS2lDLDJEQUF1RDtRQUF2RCw0SEFBdUQiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9kaXJ0L2xhbmRzbGlkZS1vYnMvbGFuZHNsaWRlLW9icy5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGlydC9sYW5kc2xpZGUtb2JzL2xhbmRzbGlkZS1vYnMucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9kaXJ0L2xhbmRzbGlkZS1vYnMvbGFuZHNsaWRlLW9icy5wYWdlLmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgTGFuZHNsaWRlT2JzUGFnZSB9IGZyb20gJy4vbGFuZHNsaWRlLW9icy5wYWdlJztcclxuaW1wb3J0IHsgQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmQgfSBmcm9tICcuLi8uLi9jYW4tZGVhY3RpdmF0ZS1yb3V0ZS5ndWFyZCc7XHJcbmltcG9ydCB7IEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IExhbmRzbGlkZU9ic1BhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgQWRkV2ViVXJsTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0xhbmRzbGlkZU9ic1BhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5kc2xpZGVPYnNQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlIH0gZnJvbSAnLi4vLi4vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uLnBhZ2UnO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbGFuZHNsaWRlLW9icycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xhbmRzbGlkZS1vYnMucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYW5kc2xpZGUtb2JzLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5kc2xpZGVPYnNQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIG1heERhdGVTdGFydDogc3RyaW5nO1xyXG4gIG1heERhdGVFbmQ6IHN0cmluZztcclxuICBtaW5EYXRlRW5kOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihSZWdpc3RyYXRpb25UaWQuTGFuZFNsaWRlT2JzLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZSgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSAmJlxyXG4gICAgICAhbW9tZW50KHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSlcclxuICAgICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgICAuaXNTYW1lKG1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZSkuc3RhcnRPZignZGF5JykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGVFbmRJc0RpZmZlcmVudFRoYW5PYnNUaW1lKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kICYmXHJcbiAgICAgICFtb21lbnQodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKVxyXG4gICAgICAgIC5pc1NhbWUobW9tZW50KHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lKS5zdGFydE9mKCdkYXknKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlVybHMpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuVXJscyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZCkge1xyXG4gICAgICB0aGlzLm1heERhdGVTdGFydCA9IG1vbWVudChcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmRcclxuICAgICAgKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWF4RGF0ZVN0YXJ0ID0gdGhpcy5nZXRNYXhEYXRlRm9yTm93KCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lKSB7XHJcbiAgICAgIHRoaXMubWluRGF0ZUVuZCA9IG1vbWVudChcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVcclxuICAgICAgKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIH1cclxuICAgIHRoaXMubWF4RGF0ZUVuZCA9IHRoaXMuZ2V0TWF4RGF0ZUZvck5vdygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWF4RGF0ZUZvck5vdygpIHtcclxuICAgIC8vIFRoZXJlIGlzIGFuIGlzc3VlIHdoZW4gc2V0dGluZyBtYXggZGF0ZSB0aGF0IHdoZW4gY2hhbmdpbmcgaG91ciwgdGhlIG1pbnV0ZXMgaXMgc3RpbGwgbWF4IG1pbnV0ZXMuXHJcbiAgICAvLyBXb3JrYXJvdW5kIGlzIHRvIHNldCBtaW51dGVzIHRvIDU5LlxyXG4gICAgcmV0dXJuIG1vbWVudCgpLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZHRUaW1lQ2hhbmdlZCgpIHtcclxuICAgIHRoaXMubWluRGF0ZUVuZCA9IG1vbWVudChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lXHJcbiAgICApLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmQgJiZcclxuICAgICAgbW9tZW50KFxyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZFxyXG4gICAgICApLmlzQmVmb3JlKG1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUpKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZCA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGR0RW5kVGltZUNoYW5nZWQoKSB7XHJcbiAgICB0aGlzLm1heERhdGVTdGFydCA9IG1vbWVudChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kXHJcbiAgICApLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUgJiZcclxuICAgICAgbW9tZW50KHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSkuaXNBZnRlcihcclxuICAgICAgICBtb21lbnQodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kKVxyXG4gICAgICApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNWYWxpZCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzICYmXHJcbiAgICAgICEhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lICYmXHJcbiAgICAgICEhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgc2V0RHRMYW5kU2xpZGVUaW1lVG9Ob3coKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUgPSBtb21lbnQoKS50b0lTT1N0cmluZyhcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldER0TGFuZFNsaWRlVGltZUVuZFRvTm93KCkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kID0gbW9tZW50KCkudG9JU09TdHJpbmcoXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZXRMYW5kc2xpZGVQb3NpdGlvbigpIHtcclxuICAgIGNvbnN0IHJlbGF0aXZlVG9MYXRMbmcgPSB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uXHJcbiAgICAgID8gTC5sYXRMbmcoXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5Mb25naXR1ZGVcclxuICAgICAgICApXHJcbiAgICAgIDogbnVsbDtcclxuICAgIGNvbnN0IHN0YXJ0TGF0TG5nID1cclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMYXQgJiZcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMb25nXHJcbiAgICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMYXQsXHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TG9uZ1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIGNvbnN0IGVuZExhdExuZyA9XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMYXQgJiZcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExvbmdcclxuICAgICAgICA/IEwubGF0TG5nKFxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdG9wTGF0LFxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdG9wTG9uZ1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgY29tcG9uZW50OiBTZXRBdmFsYW5jaGVQb3NpdGlvblBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgcmVsYXRpdmVUb0xhdExuZyxcclxuICAgICAgICBzdGFydExhdExuZyxcclxuICAgICAgICBlbmRMYXRMbmcsXHJcbiAgICAgICAgZ2VvSGF6YXJkOiB0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgIGlmIChyZXN1bHQuZGF0YSkge1xyXG4gICAgICBjb25zdCBzdGFydDogTC5MYXRMbmcgPSByZXN1bHQuZGF0YS5zdGFydDtcclxuICAgICAgY29uc3QgZW5kOiBMLkxhdExuZyA9IHJlc3VsdC5kYXRhLmVuZDtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMYXQgPSBzdGFydC5sYXQ7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TG9uZyA9IHN0YXJ0LmxuZztcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExhdCA9IGVuZC5sYXQ7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMb25nID0gZW5kLmxuZztcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzXCJcclxuICAgIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJzZXRMYW5kc2xpZGVQb3NpdGlvbigpXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuUE9TSVRJT04nIHxcclxuICAgICAgICAgICAgICB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cInBvc2l0aW9uLXBpblwiIGNvbG9yPVwibWVkaXVtXCIgbmFtZT1cImxvY2F0aW9uXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMYXQgZWxzZSBub1Bvc2l0aW9uXCI+XHJcbiAgICAgICAgICAgIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExhdCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5OT1JUSF9TSE9SVCd8dHJhbnNsYXRlfX0sXHJcbiAgICAgICAgICAgIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExvbmcgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLkVBU1RfU0hPUlQnfHRyYW5zbGF0ZX19IC0ge3sgcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMYXQgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19JmRlZzt7eydNQVBfQ0VOVEVSX0lORk8uTk9SVEhfU0hPUlQnfHRyYW5zbGF0ZX19LFxyXG4gICAgICAgICAgICB7eyByZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExvbmcgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLkVBU1RfU0hPUlQnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgY2xhc3M9XCJpdGVtLWRldGFpbC1pY29uXCIgbmFtZT1cImNoZXZyb24tZm9yd2FyZFwiPlxyXG4gICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbSBbbmdDbGFzc109XCJ7J2hhc1dhcm5pbmcnOiBkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZX1cIj5cclxuICAgICAgICA8aW9uLWxhYmVsIFtjb2xvcl09XCIhcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSA/ICdkYW5nZXInIDogJ21lZGl1bSdcIiBwb3NpdGlvbj1cInN0YWNrZWRcIlxyXG4gICAgICAgICAgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57e1xyXG4gICAgICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkRUX0xBTkRfU0xJREVfVElNRScgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLWRhdGV0aW1lIGNvbG9yPVwibWVkaXVtXCIgW21heF09XCJtYXhEYXRlU3RhcnRcIiBtb250aFNob3J0TmFtZXM9XCJ7eyAnTU9OVEhTLlNIT1JUX0xJU1QnIHwgdHJhbnNsYXRlIH19XCJcclxuICAgICAgICAgIGRvbmVUZXh0PVwie3snRElBTE9HUy5PSycgfCB0cmFuc2xhdGV9fVwiIGNhbmNlbFRleHQ9XCJ7eydESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGV9fVwiXHJcbiAgICAgICAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWSBISDptbVwiIFsobmdNb2RlbCldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZVwiXHJcbiAgICAgICAgICAoaW9uQ2hhbmdlKT1cImR0VGltZUNoYW5nZWQoKVwiPlxyXG4gICAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwic2V0LXRvLW5vdy1idXR0b25cIiBzbG90PVwiZW5kXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cIm1lZGl1bVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic2V0RHRMYW5kU2xpZGVUaW1lVG9Ob3coKVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0aW1lXCI+PC9pb24taWNvbj4ge3tcIlJFR0lTVFJBVElPTi5TRVRfVElNRS5OT1dcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0gKm5nSWY9XCJkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJkYW5nZXJcIiBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7J0FMRVJULldBUk5JTkcnIHwgdHJhbnNsYXRlfX0hIHt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5EQVRFX1dBUk5JTkcnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVFbmRJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgW2NvbG9yXT1cIiFyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kID8gJ2RhbmdlcicgOiAnbWVkaXVtJ1wiXHJcbiAgICAgICAgICBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7XHJcbiAgICAgICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRFRfTEFORF9TTElERV9USU1FX0VORCcgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLWRhdGV0aW1lIFttaW5dPVwibWluRGF0ZUVuZFwiIFttYXhdPVwibWF4RGF0ZUVuZFwiIGNvbG9yPVwibWVkaXVtXCJcclxuICAgICAgICAgIG1vbnRoU2hvcnROYW1lcz1cInt7ICdNT05USFMuU0hPUlRfTElTVCcgfCB0cmFuc2xhdGUgfX1cIiBkb25lVGV4dD1cInt7J0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlfX1cIlxyXG4gICAgICAgICAgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCIgKGlvbkNoYW5nZSk9XCJkdEVuZFRpbWVDaGFuZ2VkKClcIlxyXG4gICAgICAgICAgZGlzcGxheS1mb3JtYXQ9XCJELiBNTU0sIFlZWVkgSEg6bW1cIiBbKG5nTW9kZWwpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmRcIj5cclxuICAgICAgICA8L2lvbi1kYXRldGltZT5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cInNldC10by1ub3ctYnV0dG9uXCIgc2xvdD1cImVuZFwiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJtZWRpdW1cIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNldER0TGFuZFNsaWRlVGltZUVuZFRvTm93KClcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidGltZVwiPjwvaW9uLWljb24+IHt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuTk9XXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwiZGF0ZUVuZElzRGlmZmVyZW50VGhhbk9ic1RpbWVcIj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNvbG9yPVwiZGFuZ2VyXCIgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICB7eydBTEVSVC5XQVJOSU5HJyB8IHRyYW5zbGF0ZX19ISB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuREFURV9XQVJOSU5HJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkxBTkRTTElERV9UWVBFXCIga2R2S2V5PVwiRGlydF9MYW5kU2xpZGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5MYW5kU2xpZGVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5ERVNUUlVDVElWRV9TSVpFXCIga2R2S2V5PVwiRGlydF9MYW5kU2xpZGVTaXplS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuTGFuZFNsaWRlU2l6ZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkFWQUxfVFJJR0dFUlwiIGtkdktleT1cIkRpcnRfTGFuZFNsaWRlVHJpZ2dlcktEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkxhbmRTbGlkZVRyaWdnZXJUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5ESVJUX0FDVElWSVRZX0lORkxVRU5DRURcIlxyXG4gICAgICAgIGtkdktleT1cIkRpcnRfQWN0aXZpdHlJbmZsdWVuY2VkS0RWXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkFjdGl2aXR5SW5mbHVlbmNlZFRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5EQU1BR0VfRVhURU5UXCIga2R2S2V5PVwiRGFtYWdlRXh0ZW50S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRGFtYWdlRXh0ZW50VElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRElSVF9GT1JFQ0FTVF9BQ0NVUkFURVwiIGtkdktleT1cIkZvcmVjYXN0QWNjdXJhdGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5Gb3JlY2FzdEFjY3VyYXRlVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DT01NRU5UX1RJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuQ29tbWVudFwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfUExBQ0VIT0xERVInIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX0lNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiXHJcbiAgICAgICAgW29uQmVmb3JlQWRkXT1cImdldFNhdmVGdW5jKClcIj5cclxuICAgICAgPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC13ZWItdXJsLWl0ZW0gWyh3ZWJ1cmxzKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuVXJsc1wiPjwvYXBwLWFkZC13ZWItdXJsLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbm9Qb3NpdGlvbj5cclxuICB7eyAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU0VUX0xBTkRTTElERV9QT1NJVElPTicgfCB0cmFuc2xhdGUgfX0ge3tcclxuICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLklOX01BUCcgfCB0cmFuc2xhdGUgfX1cclxuPC9uZy10ZW1wbGF0ZT4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==