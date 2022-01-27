"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_view-observation_view-observation_module_ts"],{

/***/ 69599:
/*!****************************************************************************!*\
  !*** ./src/app/modules/registration/edit-registration-helper-functions.ts ***!
  \****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isSameObserver": function() { return /* binding */ isSameObserver; },
/* harmony export */   "isInGroup": function() { return /* binding */ isInGroup; },
/* harmony export */   "getObserverEditCheckObservable": function() { return /* binding */ getObserverEditCheckObservable; },
/* harmony export */   "getWithin48HoursCheckUntilFalseObservable": function() { return /* binding */ getWithin48HoursCheckUntilFalseObservable; },
/* harmony export */   "isWithinMilliseconds": function() { return /* binding */ isWithinMilliseconds; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 54926);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 24390);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);



function isSameObserver(reg, observer) {
    if (!observer) {
        return false;
    }
    return observer.NickName === reg.Observer.NickName; // TODO: Change to ObserverID, when implemented in API model (MyPageData)
}
function isInGroup(reg, observer) {
    if (observer &&
        reg.ObserverGroupID > 0 &&
        observer.MemberOfGroups &&
        observer.MemberOfGroups.length > 0 &&
        observer.MemberOfGroups.map((g) => g.Id).indexOf(reg.ObserverGroupID) >= 0) {
        return true;
    }
    return false;
}
function isModerator(reg, observer) {
    var _a;
    if (observer && reg.GeoHazardTID) {
        return (_a = observer.Roles) === null || _a === void 0 ? void 0 : _a.includes(`ModeratorForGeoHazard${reg.GeoHazardTID}`);
    }
    return false;
}
function getObserverEditCheckObservable(reg, observer) {
    if (isModerator(reg, observer)) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)('EDIT_AS_MODERATOR');
    }
    if (isSameObserver(reg, observer) || isInGroup(reg, observer)) {
        return getWithin48HoursCheckUntilFalseObservable(reg).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)((within48hours) => (within48hours ? 'EDIT_OWN_REGISTRATION' : undefined)));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(undefined);
}
function getWithin48HoursCheckUntilFalseObservable(reg) {
    const completeWith = (predicate) => (source) => new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable((observer) => source.subscribe((value) => {
        observer.next(value);
        if (predicate(value)) {
            observer.complete();
        }
    }, (error) => observer.error(error), () => observer.complete()));
    const forthyEightHoursInMS = 48 * 60 * 60 * 1000;
    const timerCheckEveryMinuteMS = 60 * 1000;
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(0, timerCheckEveryMinuteMS).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(() => isWithinMilliseconds(moment__WEBPACK_IMPORTED_MODULE_0___default()(reg.DtRegTime), forthyEightHoursInMS)), completeWith((val) => !val));
}
function isWithinMilliseconds(m, msLimit, now = moment__WEBPACK_IMPORTED_MODULE_0___default()()) {
    if (!m) {
        return false;
    }
    return m.isSameOrAfter(now.subtract(msLimit, 'milliseconds'));
}


/***/ }),

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

/***/ 84016:
/*!*******************************************************************!*\
  !*** ./src/app/pages/view-observation/view-observation.module.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewObservationPageModule": function() { return /* binding */ ViewObservationPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _view_observation_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-observation.page */ 67181);
/* harmony import */ var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/shared/shared.module */ 72271);
/* harmony import */ var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */ 85815);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);






const routes = [
    {
        path: '',
        component: _view_observation_page__WEBPACK_IMPORTED_MODULE_0__.ViewObservationPage
    }
];
class ViewObservationPageModule {
}
ViewObservationPageModule.ɵfac = function ViewObservationPageModule_Factory(t) { return new (t || ViewObservationPageModule)(); };
ViewObservationPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ViewObservationPageModule });
ViewObservationPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ViewObservationPageModule, { declarations: [_view_observation_page__WEBPACK_IMPORTED_MODULE_0__.ViewObservationPage], imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 67181:
/*!*****************************************************************!*\
  !*** ./src/app/pages/view-observation/view-observation.page.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewObservationPage": function() { return /* binding */ ViewObservationPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/observation/observation.service */ 83497);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _core_services_popup_info_popup_info_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/popup-info/popup-info.service */ 13359);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/helpers/observable-helper */ 59364);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 46367);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var src_app_modules_registration_edit_registration_helper_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/registration/edit-registration-helper-functions */ 69599);
/* harmony import */ var src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/modules/auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../modules/shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/observation/observation-list-card/observation-list-card.component */ 50388);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);























function ViewObservationPage_ion_content_7_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "RegistrationDetail.EditInfoAsModerator"), " ");
} }
function ViewObservationPage_ion_content_7_ng_container_1_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "RegistrationDetail.EditInfo"), " ");
} }
function ViewObservationPage_ion_content_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, ViewObservationPage_ion_content_7_ng_container_1_span_1_Template, 3, 3, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, ViewObservationPage_ion_content_7_ng_container_1_span_2_Template, 3, 3, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewObservationPage_ion_content_7_ng_container_1_Template_ion_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8); const registration_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().ngIf; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.editRegistration(registration_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Edit registration");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const editMode_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", editMode_r3 === "EDIT_AS_MODERATOR");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", editMode_r3 === "EDIT_OWN_REGISTRATION");
} }
function ViewObservationPage_ion_content_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, ViewObservationPage_ion_content_7_ng_container_1_Template, 5, 2, "ng-container", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "app-observation-list-card", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const registration_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, ctx_r0.editMode$));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("obs", registration_r1);
} }
class ViewObservationPage extends _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__.NgDestoryBase {
    constructor(activatedRoute, observationService, userSettingService, popupInfoService, registrationService, router, regobsAuthService) {
        super();
        this.activatedRoute = activatedRoute;
        this.observationService = observationService;
        this.userSettingService = userSettingService;
        this.popupInfoService = popupInfoService;
        this.registrationService = registrationService;
        this.router = router;
        this.regobsAuthService = regobsAuthService;
    }
    editRegistration(registration) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const reg = yield this.registrationService.editExistingRegistrationAndSave(registration);
            this.router.navigate(['registration', 'edit', reg.id]);
        });
    }
    ngOnInit() {
        this.popupInfoService.checkObservationInfoPopup().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this.ngDestroy$)).subscribe();
        const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
        this.registrationViewModel$ = this.userSettingService.userSetting$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)((userSetting) => (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.from)(this.observationService.getObservationById(id, userSetting.appMode, userSetting.language))));
        this.editMode$ = this.createEditMode$();
    }
    createEditMode$() {
        return this.registrationViewModel$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.withLatestFrom)(this.regobsAuthService.myPageData$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(([reg, observer]) => (0,src_app_modules_registration_edit_registration_helper_functions__WEBPACK_IMPORTED_MODULE_5__.getObserverEditCheckObservable)(reg, observer)));
    }
}
ViewObservationPage.ɵfac = function ViewObservationPage_Factory(t) { return new (t || ViewObservationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_popup_info_popup_info_service__WEBPACK_IMPORTED_MODULE_2__.PopupInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService)); };
ViewObservationPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: ViewObservationPage, selectors: [["app-view-observation"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 6, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [4, "ngIf"], [3, "obs"], [3, "click"]], template: function ViewObservationPage_Template(rf, ctx) { if (rf & 1) {
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
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, ViewObservationPage_ion_content_7_Template, 4, 4, "ion-content", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.OVERVIEW.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 4, ctx.registrationViewModel$));
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonContent, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButton], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2aWV3LW9ic2VydmF0aW9uLnBhZ2Uuc2NzcyJ9 */"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9wYWdlc192aWV3LW9ic2VydmF0aW9uX3ZpZXctb2JzZXJ2YXRpb25fbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUM2QztBQUNSO0FBQ1Q7QUFJckIsU0FBUyxjQUFjLENBQUMsR0FBMEIsRUFBRSxRQUFvQjtJQUM3RSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ2IsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE9BQU8sUUFBUSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHlFQUF5RTtBQUMvSCxDQUFDO0FBRU0sU0FBUyxTQUFTLENBQUMsR0FBMEIsRUFBRSxRQUFvQjtJQUN4RSxJQUNFLFFBQVE7UUFDUixHQUFHLENBQUMsZUFBZSxHQUFHLENBQUM7UUFDdkIsUUFBUSxDQUFDLGNBQWM7UUFDdkIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNsQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUMxRTtRQUNBLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUEwQixFQUFFLFFBQW9COztJQUNuRSxJQUFJLFFBQVEsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFO1FBQ2hDLE9BQU8sY0FBUSxDQUFDLEtBQUssMENBQUUsUUFBUSxDQUFDLHdCQUF3QixHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztLQUM3RTtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVNLFNBQVMsOEJBQThCLENBQUMsR0FBMEIsRUFBRSxRQUFvQjtJQUM3RixJQUFJLFdBQVcsQ0FBQyxH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QixtQkFBbUI7UUNuQmhDLDZFQUFZO1FBQ1YsaUZBQXVDO1FBQ3JDLGlGQUEwQjtRQUN4QixnRkFBMkQ7UUFDN0QsNERBQWM7UUFDZCw0RUFBVztRQUNULHVEQUNGOztRQUFBLDREQUFZO1FBQ2QsNERBQWM7UUFDaEIsNERBQWE7UUFDYiwrSEFXYzs7O1FBZlIsMERBQ0Y7UUFERSwwS0FDRjtRQUdVLDBEQUFxQztRQUFyQyw2SkFBcUMiLCJzb3VyY2VzIjpbIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9lZGl0LXJlZ2lzdHJhdGlvbi1oZWxwZXItZnVuY3Rpb25zLnRzIiwiLi9zcmMvYXBwL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvcGFnZXMvdmlldy1vYnNlcnZhdGlvbi92aWV3LW9ic2VydmF0aW9uLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9wYWdlcy92aWV3LW9ic2VydmF0aW9uL3ZpZXctb2JzZXJ2YXRpb24ucGFnZS50cyIsIi4vc3JjL2FwcC9wYWdlcy92aWV3LW9ic2VydmF0aW9uL3ZpZXctb2JzZXJ2YXRpb24ucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCwgTXlQYWdlRGF0YSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRpbWVyIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuZXhwb3J0IHR5cGUgRWRpdE1vZGUgPSAnRURJVF9BU19NT0RFUkFUT1InIHwgJ0VESVRfT1dOX1JFR0lTVFJBVElPTic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1lT2JzZXJ2ZXIocmVnOiBSZWdpc3RyYXRpb25WaWV3TW9kZWwsIG9ic2VydmVyOiBNeVBhZ2VEYXRhKTogYm9vbGVhbiB7XHJcbiAgaWYgKCFvYnNlcnZlcikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gb2JzZXJ2ZXIuTmlja05hbWUgPT09IHJlZy5PYnNlcnZlci5OaWNrTmFtZTsgLy8gVE9ETzogQ2hhbmdlIHRvIE9ic2VydmVySUQsIHdoZW4gaW1wbGVtZW50ZWQgaW4gQVBJIG1vZGVsIChNeVBhZ2VEYXRhKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNJbkdyb3VwKHJlZzogUmVnaXN0cmF0aW9uVmlld01vZGVsLCBvYnNlcnZlcjogTXlQYWdlRGF0YSk6IGJvb2xlYW4ge1xyXG4gIGlmIChcclxuICAgIG9ic2VydmVyICYmXHJcbiAgICByZWcuT2JzZXJ2ZXJHcm91cElEID4gMCAmJlxyXG4gICAgb2JzZXJ2ZXIuTWVtYmVyT2ZHcm91cHMgJiZcclxuICAgIG9ic2VydmVyLk1lbWJlck9mR3JvdXBzLmxlbmd0aCA+IDAgJiZcclxuICAgIG9ic2VydmVyLk1lbWJlck9mR3JvdXBzLm1hcCgoZykgPT4gZy5JZCkuaW5kZXhPZihyZWcuT2JzZXJ2ZXJHcm91cElEKSA+PSAwXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc01vZGVyYXRvcihyZWc6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCwgb2JzZXJ2ZXI6IE15UGFnZURhdGEpOiBib29sZWFuIHtcclxuICBpZiAob2JzZXJ2ZXIgJiYgcmVnLkdlb0hhemFyZFRJRCkge1xyXG4gICAgcmV0dXJuIG9ic2VydmVyLlJvbGVzPy5pbmNsdWRlcyhgTW9kZXJhdG9yRm9yR2VvSGF6YXJkJHtyZWcuR2VvSGF6YXJkVElEfWApO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPYnNlcnZlckVkaXRDaGVja09ic2VydmFibGUocmVnOiBSZWdpc3RyYXRpb25WaWV3TW9kZWwsIG9ic2VydmVyOiBNeVBhZ2VEYXRhKTogT2JzZXJ2YWJsZTxFZGl0TW9kZT4ge1xyXG4gIGlmIChpc01vZGVyYXRvcihyZWcsIG9ic2VydmVyKSkge1xyXG4gICAgcmV0dXJuIG9mKCdFRElUX0FTX01PREVSQVRPUicpO1xyXG4gIH1cclxuICBpZiAoaXNTYW1lT2JzZXJ2ZXIocmVnLCBvYnNlcnZlcikgfHwgaXNJbkdyb3VwKHJlZywgb2JzZXJ2ZXIpKSB7XHJcbiAgICByZXR1cm4gZ2V0V2l0aGluNDhIb3Vyc0NoZWNrVW50aWxGYWxzZU9ic2VydmFibGUocmVnKS5waXBlKFxyXG4gICAgICBtYXAoKHdpdGhpbjQ4aG91cnMpID0+ICh3aXRoaW40OGhvdXJzID8gJ0VESVRfT1dOX1JFR0lTVFJBVElPTicgOiB1bmRlZmluZWQpKVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIG9mKHVuZGVmaW5lZCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRXaXRoaW40OEhvdXJzQ2hlY2tVbnRpbEZhbHNlT2JzZXJ2YWJsZShyZWc6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gIGNvbnN0IGNvbXBsZXRlV2l0aCA9XHJcbiAgICA8VD4ocHJlZGljYXRlOiAoYXJnOiBUKSA9PiBib29sZWFuKSA9PlxyXG4gICAgKHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT5cclxuICAgICAgbmV3IE9ic2VydmFibGU8VD4oKG9ic2VydmVyKSA9PlxyXG4gICAgICAgIHNvdXJjZS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpLFxyXG4gICAgICAgICAgKCkgPT4gb2JzZXJ2ZXIuY29tcGxldGUoKVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuXHJcbiAgY29uc3QgZm9ydGh5RWlnaHRIb3Vyc0luTVMgPSA0OCAqIDYwICogNjAgKiAxMDAwO1xyXG4gIGNvbnN0IHRpbWVyQ2hlY2tFdmVyeU1pbnV0ZU1TID0gNjAgKiAxMDAwO1xyXG4gIHJldHVybiB0aW1lcigwLCB0aW1lckNoZWNrRXZlcnlNaW51dGVNUykucGlwZShcclxuICAgIG1hcCgoKSA9PiBpc1dpdGhpbk1pbGxpc2Vjb25kcyhtb21lbnQocmVnLkR0UmVnVGltZSksIGZvcnRoeUVpZ2h0SG91cnNJbk1TKSksXHJcbiAgICBjb21wbGV0ZVdpdGgoKHZhbCkgPT4gIXZhbClcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNXaXRoaW5NaWxsaXNlY29uZHMobTogbW9tZW50Lk1vbWVudCwgbXNMaW1pdDogbnVtYmVyLCBub3c6IG1vbWVudC5Nb21lbnQgPSBtb21lbnQoKSk6IGJvb2xlYW4ge1xyXG4gIGlmICghbSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbS5pc1NhbWVPckFmdGVyKG5vdy5zdWJ0cmFjdChtc0xpbWl0LCAnbWlsbGlzZWNvbmRzJykpO1xyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLnBhZ2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVmlld09ic2VydmF0aW9uUGFnZSB9IGZyb20gJy4vdmlldy1vYnNlcnZhdGlvbi5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IFZpZXdPYnNlcnZhdGlvblBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZE1vZHVsZSxcclxuICAgIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtWaWV3T2JzZXJ2YXRpb25QYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVmlld09ic2VydmF0aW9uUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb2JzZXJ2YXRpb24vb2JzZXJ2YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVmlld01vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBQb3B1cEluZm9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9wb3B1cC1pbmZvL3BvcHVwLWluZm8uc2VydmljZSc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIHN3aXRjaE1hcCwgd2l0aExhdGVzdEZyb20sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRWRpdE1vZGUsIGdldE9ic2VydmVyRWRpdENoZWNrT2JzZXJ2YWJsZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vZWRpdC1yZWdpc3RyYXRpb24taGVscGVyLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2F1dGgvc2VydmljZXMvcmVnb2JzLWF1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC12aWV3LW9ic2VydmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlldy1vYnNlcnZhdGlvbi5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZpZXctb2JzZXJ2YXRpb24ucGFnZS5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZXdPYnNlcnZhdGlvblBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBlZGl0TW9kZSQ6IE9ic2VydmFibGU8RWRpdE1vZGU+O1xyXG4gIHJlZ2lzdHJhdGlvblZpZXdNb2RlbCQ6IE9ic2VydmFibGU8UmVnaXN0cmF0aW9uVmlld01vZGVsPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgb2JzZXJ2YXRpb25TZXJ2aWNlOiBPYnNlcnZhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwb3B1cEluZm9TZXJ2aWNlOiBQb3B1cEluZm9TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZWRpdFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb246IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCkge1xyXG4gICAgY29uc3QgcmVnID0gYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmVkaXRFeGlzdGluZ1JlZ2lzdHJhdGlvbkFuZFNhdmUocmVnaXN0cmF0aW9uKTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncmVnaXN0cmF0aW9uJywgJ2VkaXQnLCByZWcuaWRdKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5wb3B1cEluZm9TZXJ2aWNlLmNoZWNrT2JzZXJ2YXRpb25JbmZvUG9wdXAoKS5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKS5zdWJzY3JpYmUoKTtcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQodGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ10sIDEwKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVmlld01vZGVsJCA9IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJC5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKHVzZXJTZXR0aW5nKSA9PiBmcm9tKHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmdldE9ic2VydmF0aW9uQnlJZChpZCwgdXNlclNldHRpbmcuYXBwTW9kZSwgdXNlclNldHRpbmcubGFuZ3VhZ2UpKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmVkaXRNb2RlJCA9IHRoaXMuY3JlYXRlRWRpdE1vZGUkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUVkaXRNb2RlJCgpOiBPYnNlcnZhYmxlPEVkaXRNb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25WaWV3TW9kZWwkLnBpcGUoXHJcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMucmVnb2JzQXV0aFNlcnZpY2UubXlQYWdlRGF0YSQpLFxyXG4gICAgICBzd2l0Y2hNYXAoKFtyZWcsIG9ic2VydmVyXSkgPT4gZ2V0T2JzZXJ2ZXJFZGl0Q2hlY2tPYnNlcnZhYmxlKHJlZywgb2JzZXJ2ZXIpKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLk9WRVJWSUVXLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudCAqbmdJZj1cInJlZ2lzdHJhdGlvblZpZXdNb2RlbCQgfCBhc3luYyBhcyByZWdpc3RyYXRpb25cIj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdE1vZGUkIHwgYXN5bmMgYXMgZWRpdE1vZGVcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwiZWRpdE1vZGUgPT09ICdFRElUX0FTX01PREVSQVRPUidcIj5cclxuICAgICAge3sgXCJSZWdpc3RyYXRpb25EZXRhaWwuRWRpdEluZm9Bc01vZGVyYXRvclwiIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhbiAqbmdJZj1cImVkaXRNb2RlID09PSAnRURJVF9PV05fUkVHSVNUUkFUSU9OJ1wiPlxyXG4gICAgICB7eyBcIlJlZ2lzdHJhdGlvbkRldGFpbC5FZGl0SW5mb1wiIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPWVkaXRSZWdpc3RyYXRpb24ocmVnaXN0cmF0aW9uKT5FZGl0IHJlZ2lzdHJhdGlvbjwvaW9uLWJ1dHRvbj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuICA8YXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZCBbb2JzXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZD5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==