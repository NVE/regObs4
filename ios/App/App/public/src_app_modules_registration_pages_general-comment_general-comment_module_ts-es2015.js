"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_general-comment_general-comment_module_ts"],{

/***/ 40002:
/*!**************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/general-comment/general-comment.module.ts ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralCommentPageModule": function() { return /* binding */ GeneralCommentPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _general_comment_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general-comment.page */ 85451);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components.module */ 22623);
/* harmony import */ var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../add-web-url-modal/add-web-url-modal.module */ 22838);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _general_comment_page__WEBPACK_IMPORTED_MODULE_0__.GeneralCommentPage
    }
];
class GeneralCommentPageModule {
}
GeneralCommentPageModule.ɵfac = function GeneralCommentPageModule_Factory(t) { return new (t || GeneralCommentPageModule)(); };
GeneralCommentPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: GeneralCommentPageModule });
GeneralCommentPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](GeneralCommentPageModule, { declarations: [_general_comment_page__WEBPACK_IMPORTED_MODULE_0__.GeneralCommentPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 85451:
/*!************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/general-comment/general-comment.page.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralCommentPage": function() { return /* binding */ GeneralCommentPage; }
/* harmony export */ });
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base.page */ 81877);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base-page-service */ 35140);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/add-picture-item/add-picture-item.component */ 26869);
/* harmony import */ var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/add-web-url-item/add-web-url-item.component */ 15248);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function GeneralCommentPage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "app-text-comment", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r3.registration.request.GeneralObservation.ObsComment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](13, "app-add-picture-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "ion-item-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "app-add-web-url-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("weburlsChange", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_22_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r4.registration.request.GeneralObservation.Urls = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 14, "REGISTRATION.GENERAL_COMMENT.ADD_NOTES_HEADER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](7, 16, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 18, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.registration.request.GeneralObservation.ObsComment);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 20, "REGISTRATION.GENERAL_COMMENT.SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](17, 22, "REGISTRATION.GENERAL_COMMENT.DESCRIPTION"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](21, 24, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("weburls", ctx_r0.registration.request.GeneralObservation.Urls);
} }
class GeneralCommentPage extends _base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage {
    constructor(basePageService, activatedRoute) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.GeneralObservation, basePageService, activatedRoute);
    }
}
GeneralCommentPage.ɵfac = function GeneralCommentPage_Factory(t) { return new (t || GeneralCommentPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute)); };
GeneralCommentPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: GeneralCommentPage, selectors: [["app-general-comment"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "value", "title", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [1, "ion-text-wrap"], [3, "weburls", "weburlsChange"]], template: function GeneralCommentPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, GeneralCommentPage_app_registration_content_wrapper_8_Template, 23, 26, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.GENERAL_COMMENT.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.GeneralObservation);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItemDivider, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_7__.AddWebUrlItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnZW5lcmFsLWNvbW1lbnQucGFnZS5zY3NzIn0= */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19nZW5lcmFsLWNvbW1lbnRfZ2VuZXJhbC1jb21tZW50X21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ3VEO0FBQ0s7QUFDWTtBQUNpQjs7O0FBRXpGLE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUscUVBQWtCO0tBQzlCO0NBQ0YsQ0FBQztBQVVLLE1BQU0sd0JBQXdCOztnR0FBeEIsd0JBQXdCO3FIQUF4Qix3QkFBd0I7eUhBUDFCO1lBQ1AsNkVBQXNCO1lBQ3RCLGlHQUF3QjtZQUN4QixrRUFBcUIsQ0FBQyxNQUFNLENBQUM7U0FDOUI7bUlBR1Usd0JBQXdCLG1CQUZwQixxRUFBa0IsYUFKL0IsNkVBQXNCO1FBQ3RCLGlHQUF3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2Y4RDtBQUNsRDtBQUNlO0FBQ047Ozs7Ozs7Ozs7Ozs7O0lDTy9DLHNHQUNzRjtJQUFsQix5V0FBaUI7SUFDbkYsOEVBQXVCO0lBQ3JCLHFGQUE0QztJQUMxQyw0RUFBVztJQUNULHVEQUNGOztJQUFBLDREQUFZO0lBQ2QsNERBQWtCO0lBQ2xCLHNGQUVvRjtJQUZsRSwrWkFBOEQ7OztJQUVJLDREQUFtQjtJQUN2RyxxRkFBNEM7SUFDMUMsNkVBQVc7SUFDVCx3REFDRjs7SUFBQSw0REFBWTtJQUNkLDREQUFrQjtJQUNsQixzRkFFdUI7SUFDdkIsb0ZBQWtCO0lBQ2hCLGdGQUFpQztJQUMvQix3REFDRjs7SUFBQSw0REFBWTtJQUNkLDREQUFtQjtJQUNuQixzRkFBNEM7SUFDMUMsNkVBQVc7SUFDVCx3REFDRjs7SUFBQSw0REFBWTtJQUNkLDREQUFrQjtJQUNsQiw0RkFBaUY7SUFBM0Qsa2FBQTBEO0lBQUMsNERBQXVCO0lBQzFHLDREQUFXO0lBQ2IsNERBQW1DOzs7SUE5QmpDLDZGQUE2QjtJQUl2QiwwREFDRjtJQURFLDZMQUNGO0lBR0EsMERBQXFFO0lBQXJFLDRMQUFxRTtJQUNyRSx3TUFBaUY7SUFGakUsNEhBQThEO0lBSzVFLDBEQUNGO0lBREUsc0xBQ0Y7SUFFb0IsMERBQW9DO0lBQXBDLG9HQUFvQztJQUt0RCwwREFDRjtJQURFLHlMQUNGO0lBSUUsMERBQ0Y7SUFERSwrS0FDRjtJQUVvQiwwREFBMEQ7SUFBMUQsd0hBQTBEOztBRDdCL0UsTUFBTSxrQkFBbUIsU0FBUSxnREFBUTtJQUM5QyxZQUNFLGVBQWdDLEVBQ2hDLGNBQThCO1FBRTlCLEtBQUssQ0FBQyx1SEFBa0MsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7b0ZBTlUsa0JBQWtCO2dIQUFsQixrQkFBa0I7UUNYL0IsNkVBQVk7UUFDVixpRkFBdUM7UUFDckMsaUZBQTBCO1FBQ3hCLGdGQUEyRDtRQUM3RCw0REFBYztRQUNkLDRFQUFXO1FBQ1QsdURBQ0Y7O1FBQUEsNERBQVk7UUFDZCw0REFBYztRQUNoQiw0REFBYTtRQUNiLDhFQUFhO1FBQ1gsMEtBK0JtQztRQUNyQyw0REFBYzs7UUFyQ1IsMERBQ0Y7UUFERSxpTEFDRjtRQUlpQywwREFBNkQ7UUFBN0QsaUlBQTZEIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZ2VuZXJhbC1jb21tZW50L2dlbmVyYWwtY29tbWVudC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZ2VuZXJhbC1jb21tZW50L2dlbmVyYWwtY29tbWVudC5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2dlbmVyYWwtY29tbWVudC9nZW5lcmFsLWNvbW1lbnQucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgR2VuZXJhbENvbW1lbnRQYWdlIH0gZnJvbSAnLi9nZW5lcmFsLWNvbW1lbnQucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBZGRXZWJVcmxNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9hZGQtd2ViLXVybC1tb2RhbC9hZGQtd2ViLXVybC1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEdlbmVyYWxDb21tZW50UGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtHZW5lcmFsQ29tbWVudFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmFsQ29tbWVudFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtZ2VuZXJhbC1jb21tZW50JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ2VuZXJhbC1jb21tZW50LnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ2VuZXJhbC1jb21tZW50LnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmFsQ29tbWVudFBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkdlbmVyYWxPYnNlcnZhdGlvbiwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5HZW5lcmFsT2JzZXJ2YXRpb25cIlxyXG4gICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3tcIlJFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQUREX05PVEVTX0hFQURFUlwiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkdlbmVyYWxPYnNlcnZhdGlvbi5PYnNDb21tZW50XCJcclxuICAgICAgICB0aXRsZT1cInt7J1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQ09NTUVOVF9USVRMRScgfCB0cmFuc2xhdGUgfX1cIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwie3snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DT01NRU5UX1BMQUNFSE9MREVSJyB8IHRyYW5zbGF0ZSB9fVwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5TVUJUSVRMRVwiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+XHJcbiAgICAgIDwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkRFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC13ZWItdXJsLWl0ZW0gWyh3ZWJ1cmxzKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5HZW5lcmFsT2JzZXJ2YXRpb24uVXJsc1wiPjwvYXBwLWFkZC13ZWItdXJsLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=