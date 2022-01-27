"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_login_pages_login_login_module_ts"],{

/***/ 34351:
/*!***********************************************************!*\
  !*** ./src/app/modules/login/pages/login/login.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPageModule": function() { return /* binding */ LoginPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.page */ 17374);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/shared.module */ 72271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);





const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
    }
];
class LoginPageModule {
}
LoginPageModule.ɵfac = function LoginPageModule_Factory(t) { return new (t || LoginPageModule)(); };
LoginPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LoginPageModule });
LoginPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LoginPageModule, { declarations: [_login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 17374:
/*!*********************************************************!*\
  !*** ./src/app/modules/login/pages/login/login.page.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": function() { return /* binding */ LoginPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../settings */ 30015);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/services/external-link/external-link.service */ 11810);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);















function LoginPage_ion_content_7_ion_list_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ion_content_7_ion_list_1_Template_ion_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r5.openMyPage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "ion-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ion_content_7_ion_list_1_Template_ion_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r7.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const loggedInUser_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 4, "LOGIN.LOGGED_IN_AS"), " ", loggedInUser_r3.email, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "LOGIN.MY_PROFILE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 8, "LOGIN.LOGOUT"), "");
} }
function LoginPage_ion_content_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-content", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, LoginPage_ion_content_7_ion_list_1_Template, 12, 10, "ion-list", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const loggedInUser_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", loggedInUser_r3.isLoggedIn)("ngIfElse", _r1);
} }
function LoginPage_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ng_template_9_Template_ion_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.signIn(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "LOGIN.LOGIN"), " ");
} }
class LoginPage {
    constructor(regobsAuthService, userSettingService, externalLinkService) {
        this.regobsAuthService = regobsAuthService;
        this.userSettingService = userSettingService;
        this.externalLinkService = externalLinkService;
    }
    ngOnInit() {
        this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
    }
    signIn() {
        return this.regobsAuthService.signIn();
    }
    logout() {
        return this.regobsAuthService.logout();
    }
    openMyPage() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            const myPageUrl = yield this.userSettingService.appMode$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)((appMode) => _settings__WEBPACK_IMPORTED_MODULE_2__.settings.authConfig[appMode].myPageUrl), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
                .toPromise();
            const currentLangKey = yield this.userSettingService.language$
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1))
                .toPromise();
            this.externalLinkService.openExternalLink(`${myPageUrl}?Culture=${this.getSupportedMyPageLocales(currentLangKey)}`);
        });
    }
    getSupportedMyPageLocales(langKey) {
        if (langKey === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.LangKey.nb || langKey === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.LangKey.nn) {
            return 'nb-NO';
        }
        return 'en';
    }
}
LoginPage.ɵfac = function LoginPage_Factory(t) { return new (t || LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_3__.ExternalLinkService)); };
LoginPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: LoginPage, selectors: [["app-login"]], decls: 11, vars: 6, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], ["class", "ion-padding", 4, "ngIf"], ["login", ""], [1, "ion-padding"], ["lines", "none", 4, "ngIf", "ngIfElse"], ["lines", "none"], [1, "ion-text-wrap"], ["type", "button", "fill", "outline", "expand", "block", 3, "click"], ["slot", "start", "name", "push-outline"], ["expand", "block", "type", "submit", "color", "varsom-orange", 1, "logout-button", 3, "click"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, LoginPage_ion_content_7_Template, 2, 2, "ion-content", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, LoginPage_ng_template_9_Template, 3, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 2, "LOGIN.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 4, ctx.loggedInUser$));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe], styles: [".logout-button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  margin-left: 0px;\n  margin-right: 0px;\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0FBQ0oiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ291dC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcclxuICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG59Il19 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX2xvZ2luX3BhZ2VzX2xvZ2luX2xvZ2luX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDdUQ7QUFDZDtBQUNvQjs7O0FBRTdELE1BQU0sTUFBTSxHQUFXO0lBQ3JCO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsa0RBQVM7S0FDckI7Q0FDRixDQUFDO0FBTUssTUFBTSxlQUFlOzs4RUFBZixlQUFlOzRHQUFmLGVBQWU7Z0hBSGpCLENBQUMsK0RBQVksRUFBRSxrRUFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzttSUFHM0MsZUFBZSxtQkFGWCxrREFBUyxhQURkLCtEQUFZLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnFEO0FBQ2tCO0FBQzlDO0FBQ1I7QUFDeUQ7QUFDL0M7Ozs7Ozs7Ozs7O0lDSW5ELDhFQUFrRTtJQUNoRSwyRUFBVTtJQUNSLCtFQUFpQztJQUFBLHVEQUNqQzs7SUFBQSw0REFBWTtJQUNkLDREQUFXO0lBQ1gsZ0ZBQStFO0lBQXZCLHNVQUFzQjtJQUM1RSwwRUFBc0Q7SUFDdEQsdURBQ0Y7O0lBQUEsNERBQWE7SUFDYixpRkFBd0c7SUFBbkIsa1VBQWtCO0lBQ3JHLHdEQUFnQzs7SUFBQSw0REFBYTtJQUNqRCw0REFBVzs7O0lBVDBCLDBEQUNqQztJQURpQyw0TEFDakM7SUFJQSwwREFDRjtJQURFLCtKQUNGO0lBRUUsMERBQWdDO0lBQWhDLDJKQUFnQzs7O0lBWHRDLGlGQUErRTtJQUM3RSwrSEFXVztJQUNiLDREQUFjOzs7OztJQVpZLDBEQUE4QjtJQUE5Qiw0RkFBOEI7Ozs7SUFjdEQsaUZBQXdHO0lBQW5CLHVUQUFrQjtJQUNyRyx1REFDRjs7SUFBQSw0REFBYTs7SUFEWCwwREFDRjtJQURFLDBKQUNGOztBRGJLLE1BQU0sU0FBUztJQUdwQixZQUNVLGlCQUFvQyxFQUNwQyxrQkFBc0MsRUFDdEMsbUJBQXdDO1FBRnhDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQy9DLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUssVUFBVTs7WUFDZCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRO2lCQUNyRCxJQUFJLENBQ0gsbURBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsMERBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQ3hELG9EQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7aUJBQ0EsU0FBUyxFQUFFLENBQUM7WUFDZixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO2lCQUMzRCxJQUFJLENBQUMsb0RBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYixTQUFTLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FDdkMsR0FBRyxTQUFTLFlBQVksSUFBSSxDQUFDLHlCQUF5QixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQ3pFLENBQUM7UUFDSixDQUFDO0tBQUE7SUFFTyx5QkFBeUIsQ0FBQyxPQUFnQjtRQUNoRCxJQUFJLE9BQU8sS0FBSyxrRUFBVSxJQUFJLE9BQU8sS0FBSyxrRUFBVSxFQUFFO1lBQ3BELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztrRUF6Q1UsU0FBUzt1R0FBVCxTQUFTO1FDZnRCLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFFYixxSEFhYzs7UUFDZCxpTUFJYzs7UUF2QlIsMERBQ0Y7UUFERSwwSkFDRjtRQUk4QiwwREFBNEI7UUFBNUIsb0pBQTRCIiwic291cmNlcyI6WyIuL3NyYy9hcHAvbW9kdWxlcy9sb2dpbi9wYWdlcy9sb2dpbi9sb2dpbi5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9sb2dpbi9wYWdlcy9sb2dpbi9sb2dpbi5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvbG9naW4vcGFnZXMvbG9naW4vbG9naW4ucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTG9naW5QYWdlIH0gZnJvbSAnLi9sb2dpbi5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IExvZ2luUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZSwgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gIGRlY2xhcmF0aW9uczogW0xvZ2luUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dlZEluVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy9sb2dnZWQtaW4tdXNlci5tb2RlbCc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vYXV0aC9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgbWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFeHRlcm5hbExpbmtTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9leHRlcm5hbC1saW5rL2V4dGVybmFsLWxpbmsuc2VydmljZSc7XHJcbmltcG9ydCB7IExhbmdLZXkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4ucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgbG9nZ2VkSW5Vc2VyJDogT2JzZXJ2YWJsZTxMb2dnZWRJblVzZXI+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZXJuYWxMaW5rU2VydmljZTogRXh0ZXJuYWxMaW5rU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ2dlZEluVXNlciQgPSB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciQ7XHJcbiAgfVxyXG5cclxuICBzaWduSW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdvYnNBdXRoU2VydmljZS5zaWduSW4oKTtcclxuICB9XHJcblxyXG4gIGxvZ291dCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ291dCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb3Blbk15UGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IG15UGFnZVVybCA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmFwcE1vZGUkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG1hcCgoYXBwTW9kZSkgPT4gc2V0dGluZ3MuYXV0aENvbmZpZ1thcHBNb2RlXS5teVBhZ2VVcmwpLFxyXG4gICAgICAgIHRha2UoMSlcclxuICAgICAgKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBjdXJyZW50TGFuZ0tleSA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLmxhbmd1YWdlJFxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICB0aGlzLmV4dGVybmFsTGlua1NlcnZpY2Uub3BlbkV4dGVybmFsTGluayhcclxuICAgICAgYCR7bXlQYWdlVXJsfT9DdWx0dXJlPSR7dGhpcy5nZXRTdXBwb3J0ZWRNeVBhZ2VMb2NhbGVzKGN1cnJlbnRMYW5nS2V5KX1gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRTdXBwb3J0ZWRNeVBhZ2VMb2NhbGVzKGxhbmdLZXk6IExhbmdLZXkpIHtcclxuICAgIGlmIChsYW5nS2V5ID09PSBMYW5nS2V5Lm5iIHx8IGxhbmdLZXkgPT09IExhbmdLZXkubm4pIHtcclxuICAgICAgcmV0dXJuICduYi1OTyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ0xPR0lOLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50IGNsYXNzPVwiaW9uLXBhZGRpbmdcIiAqbmdJZj1cImxvZ2dlZEluVXNlciQgfCBhc3luYyBhcyBsb2dnZWRJblVzZXJcIj5cclxuICA8aW9uLWxpc3QgbGluZXM9XCJub25lXCIgKm5nSWY9XCJsb2dnZWRJblVzZXIuaXNMb2dnZWRJbiBlbHNlIGxvZ2luXCI+XHJcbiAgICA8aW9uLWl0ZW0+XHJcbiAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+e3sgJ0xPR0lOLkxPR0dFRF9JTl9BUycgfCB0cmFuc2xhdGUgfX0ge3sgbG9nZ2VkSW5Vc2VyLmVtYWlsIH19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIiBmaWxsPVwib3V0bGluZVwiIGV4cGFuZD1cImJsb2NrXCIgKGNsaWNrKT1cIm9wZW5NeVBhZ2UoKVwiPlxyXG4gICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInB1c2gtb3V0bGluZVwiPjwvaW9uLWljb24+XHJcbiAgICAgIHt7J0xPR0lOLk1ZX1BST0ZJTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi1idXR0b24+XHJcbiAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cImxvZ291dC1idXR0b25cIiBleHBhbmQ9XCJibG9ja1wiIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInZhcnNvbS1vcmFuZ2VcIiAoY2xpY2spPVwibG9nb3V0KClcIj5cclxuICAgICAge3sgJ0xPR0lOLkxPR09VVCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgPC9pb24tbGlzdD5cclxuPC9pb24tY29udGVudD5cclxuPG5nLXRlbXBsYXRlICNsb2dpbj5cclxuICA8aW9uLWJ1dHRvbiBjbGFzcz1cImxvZ291dC1idXR0b25cIiBleHBhbmQ9XCJibG9ja1wiIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInZhcnNvbS1vcmFuZ2VcIiAoY2xpY2spPVwic2lnbkluKClcIj5cclxuICAgIHt7ICdMT0dJTi5MT0dJTicgfCB0cmFuc2xhdGUgfX1cclxuICA8L2lvbi1idXR0b24+XHJcbjwvbmctdGVtcGxhdGU+Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=