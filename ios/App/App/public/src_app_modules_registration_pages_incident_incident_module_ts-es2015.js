"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_incident_incident_module_ts"],{

/***/ 97184:
/*!************************************************************************!*\
  !*** ./src/app/modules/registration/pages/incident/incident.module.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncidentPageModule": function() { return /* binding */ IncidentPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _incident_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incident.page */ 53520);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../add-web-url-modal/add-web-url-modal.module */ 22838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _incident_page__WEBPACK_IMPORTED_MODULE_0__.IncidentPage
    }
];
class IncidentPageModule {
}
IncidentPageModule.ɵfac = function IncidentPageModule_Factory(t) { return new (t || IncidentPageModule)(); };
IncidentPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: IncidentPageModule });
IncidentPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](IncidentPageModule, { declarations: [_incident_page__WEBPACK_IMPORTED_MODULE_0__.IncidentPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 53520:
/*!**********************************************************************!*\
  !*** ./src/app/modules/registration/pages/incident/incident.page.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncidentPage": function() { return /* binding */ IncidentPage; }
/* harmony export */ });
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/add-web-url-item/add-web-url-item.component */ 15248);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);

















function IncidentPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function IncidentPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "app-text-comment", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r3.registration.request.Incident.IncidentText = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-label", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "app-kdv-select", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r4.registration.request.Incident.ActivityInfluencedTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "app-kdv-select", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r5.registration.request.Incident.DamageExtentTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-list-header", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "app-add-picture-item", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-list-header", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "app-add-web-url-item", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("weburlsChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.registration.request.Incident.IncidentURLs = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.IncidentText);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 14, "REGISTRATION.INCIDENT.COMMENT_PLACEHOLDER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate1"]("kdvKey", "", ctx_r0.geoHazardName, "_ActivityInfluencedKDV");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.ActivityInfluencedTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.DamageExtentTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 16, "REGISTRATION.ADD_IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](17, 18, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("weburls", ctx_r0.registration.request.Incident.IncidentURLs);
} }
class IncidentPage extends _base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.Incident, basePageService, activatedRoute);
    }
    get geoHazardName() {
        return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_10__.GeoHazard[this.registration.geoHazard];
    }
}
IncidentPage.ɵfac = function IncidentPage_Factory(t) { return new (t || IncidentPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute)); };
IncidentPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: IncidentPage, selectors: [["app-incident"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], ["title", "REGISTRATION.INCIDENT.COMMENT", 3, "value", "valueChange"], [1, "ion-text-wrap"], ["title", "REGISTRATION.INCIDENT.ACTIVITY", 3, "kdvKey", "value", "valueChange"], ["title", "REGISTRATION.INCIDENT.DAMAGE_EXTENT", "kdvKey", "DamageExtentKDV", 3, "value", "valueChange"], [1, "ion-text-uppercase"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [3, "weburls", "weburlsChange"]], template: function IncidentPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, IncidentPage_app_registration_content_wrapper_8_Template, 19, 20, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.INCIDENT.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.Incident);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_6__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_8__.AddWebUrlItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNpZGVudC5wYWdlLnNjc3MifQ== */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19pbmNpZGVudF9pbmNpZGVudF9tb2R1bGVfdHMtZXMyMDE1LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUN1RDtBQUNSO0FBQ3lCO0FBQ2lCOzs7QUFFekYsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSx3REFBWTtLQUN4QjtDQUNGLENBQUM7QUFVSyxNQUFNLGtCQUFrQjs7b0ZBQWxCLGtCQUFrQjsrR0FBbEIsa0JBQWtCO21IQVBwQjtZQUNQLDZFQUFzQjtZQUN0QixpR0FBd0I7WUFDeEIsa0VBQXFCLENBQUMsTUFBTSxDQUFDO1NBQzlCO21JQUdVLGtCQUFrQixtQkFGZCx3REFBWSxhQUp6Qiw2RUFBc0I7UUFDdEIsaUdBQXdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmWTtBQUNlO0FBQ047QUFDeUM7QUFDbkM7Ozs7Ozs7Ozs7Ozs7OztJQ01yRCxzR0FDd0Q7SUFBbEIsbVdBQWlCO0lBQ3JELDhFQUF1QjtJQUNyQixzRkFBK0c7SUFBdkQsaVpBQXNEO0lBQzlHLDREQUFtQjtJQUNuQixtRkFBa0I7SUFDaEIsK0VBQWlDO0lBQy9CLHVEQUNGOztJQUFBLDREQUFZO0lBQ2QsNERBQW1CO0lBQ25CLG9GQUNrRTtJQUFoRSx3WkFBK0Q7SUFBQyw0REFBaUI7SUFDbkYsb0ZBQzREO0lBQTFELGtaQUF5RDtJQUFDLDREQUFpQjtJQUM3RSxzRkFBNEM7SUFDMUMsNkVBQVc7SUFDVCx3REFDRjs7SUFBQSw0REFBWTtJQUNkLDREQUFrQjtJQUNsQix1RkFFdUI7SUFDdkIsdUZBQTRDO0lBQzFDLDZFQUFXO0lBQ1Qsd0RBQ0Y7O0lBQUEsNERBQVk7SUFDZCw0REFBa0I7SUFDbEIsNEZBQStFO0lBQXpELDBaQUF3RDtJQUFDLDREQUF1QjtJQUN4Ryw0REFBVztJQUNiLDREQUFtQzs7O0lBN0JxRCw2RkFBNkI7SUFHekQsMERBQXNEO0lBQXRELG9IQUFzRDtJQUkxRywwREFDRjtJQURFLHlMQUNGO0lBRXFELDBEQUFrRDtJQUFsRCxrSUFBa0Q7SUFDdkcsNkhBQStEO0lBRS9ELDBEQUF5RDtJQUF6RCx1SEFBeUQ7SUFHdkQsMERBQ0Y7SUFERSx3S0FDRjtJQUVvQiwwREFBb0M7SUFBcEMsb0dBQW9DO0lBS3RELDBEQUNGO0lBREUsK0tBQ0Y7SUFFb0IsMERBQXdEO0lBQXhELHNIQUF3RDs7QUQxQjdFLE1BQU0sWUFBYSxTQUFRLGdEQUFRO0lBS3hDLFlBQ0UsZUFBZ0MsRUFDaEMsY0FBOEI7UUFFOUIsS0FBSyxDQUFDLDZHQUF3QixFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBVEQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxrRUFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7d0VBSFUsWUFBWTswR0FBWixZQUFZO1FDWnpCLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFDYiw4RUFBYTtRQUNYLG9LQTZCbUM7UUFDckMsNERBQWM7O1FBbkNSLDBEQUNGO1FBREUsMEtBQ0Y7UUFJaUMsMERBQW1EO1FBQW5ELHVIQUFtRCIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2luY2lkZW50L2luY2lkZW50Lm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9pbmNpZGVudC9pbmNpZGVudC5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2luY2lkZW50L2luY2lkZW50LnBhZ2UuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEluY2lkZW50UGFnZSB9IGZyb20gJy4vaW5jaWRlbnQucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBZGRXZWJVcmxNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9hZGQtd2ViLXVybC1tb2RhbC9hZGQtd2ViLXVybC1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEluY2lkZW50UGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtJbmNpZGVudFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbmNpZGVudFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1pbmNpZGVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2luY2lkZW50LnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaW5jaWRlbnQucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEluY2lkZW50UGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBnZXQgZ2VvSGF6YXJkTmFtZSgpIHtcclxuICAgIHJldHVybiBHZW9IYXphcmRbdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5JbmNpZGVudCwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5JTkNJREVOVC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50XCIgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIlxyXG4gICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JTkNJREVOVC5DT01NRU5UXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSW5jaWRlbnQuSW5jaWRlbnRUZXh0XCI+XHJcbiAgICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5JTkNJREVOVC5DT01NRU5UX1BMQUNFSE9MREVSJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JTkNJREVOVC5BQ1RJVklUWVwiIGtkdktleT1cInt7IGdlb0hhemFyZE5hbWUgfX1fQWN0aXZpdHlJbmZsdWVuY2VkS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JbmNpZGVudC5BY3Rpdml0eUluZmx1ZW5jZWRUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uSU5DSURFTlQuREFNQUdFX0VYVEVOVFwiIGtkdktleT1cIkRhbWFnZUV4dGVudEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSW5jaWRlbnQuRGFtYWdlRXh0ZW50VElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+XHJcbiAgICAgIDwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfV0VCX1VSTC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtd2ViLXVybC1pdGVtIFsod2VidXJscyldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSW5jaWRlbnQuSW5jaWRlbnRVUkxzXCI+PC9hcHAtYWRkLXdlYi11cmwtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==