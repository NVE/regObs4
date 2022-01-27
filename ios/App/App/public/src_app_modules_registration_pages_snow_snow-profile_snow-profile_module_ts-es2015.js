"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_snow-profile_snow-profile_module_ts"],{

/***/ 1513:
/*!**************************************************!*\
  !*** ./src/app/core/helpers/hydrology-helper.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HydrologyHelper": function() { return /* binding */ HydrologyHelper; }
/* harmony export */ });
/* harmony import */ var _number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number-helper */ 27714);

class HydrologyHelper {
    static isEmpty(obj) { }
    static calculateDensity(weightInKg, heightInM, tareWeightInKg, cylinderDiameterInM) {
        if (!_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(cylinderDiameterInM) ||
            cylinderDiameterInM <= 0) {
            return 0;
        }
        const r = cylinderDiameterInM / 2.0;
        const totalWeight = (weightInKg || 0) - (tareWeightInKg || 0);
        if (totalWeight <= 0) {
            return 0;
        }
        const heightInMeter = heightInM || 0;
        if (heightInMeter <= 0) {
            return 0;
        }
        const volume = Math.PI * r * r * heightInMeter;
        return totalWeight / volume;
    }
    static calculateWaterEquivalent(density, heightInMeter) {
        if (_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(density) &&
            _number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(heightInMeter) &&
            density > 0 &&
            heightInMeter > 0) {
            return (density / 1000) * (heightInMeter * 1000);
        }
        return 0;
    }
}


/***/ }),

/***/ 13617:
/*!******************************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/compression-test/compression-test-list-modal/compression-test-list-modal.module.ts ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestListModalPageModule": function() { return /* binding */ CompressionTestListModalPageModule; }
/* harmony export */ });
/* harmony import */ var _compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compression-test-list-modal.page */ 92475);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../compression-test-list/compression-test-modal/compression-test-modal.module */ 93864);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);




class CompressionTestListModalPageModule {
}
CompressionTestListModalPageModule.ɵfac = function CompressionTestListModalPageModule_Factory(t) { return new (t || CompressionTestListModalPageModule)(); };
CompressionTestListModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: CompressionTestListModalPageModule });
CompressionTestListModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](CompressionTestListModalPageModule, { declarations: [_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestListModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule] }); })();


/***/ }),

/***/ 92475:
/*!****************************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/compression-test/compression-test-list-modal/compression-test-list-modal.page.ts ***!
  \****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestListModalPage": function() { return /* binding */ CompressionTestListModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../compression-test-list/compression-test-list.component */ 52386);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);

















function CompressionTestListModalPage_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-compression-test-list", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("testsChange", function CompressionTestListModalPage_ng_container_11_Template_app_compression_test_list_testsChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r1.reg.request.CompressionTest = $event; })("testsChange", function CompressionTestListModalPage_ng_container_11_Template_app_compression_test_list_testsChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r3.save(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tests", ctx_r0.reg.request.CompressionTest)("includeInSnowProfileAsDefault", true);
} }
class CompressionTestListModalPage {
    constructor(modalController, registrationService, commonRegistrationService, ngZone) {
        this.modalController = modalController;
        this.registrationService = registrationService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngZone = ngZone;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
    }
    set tests(val) {
        this.reg.request.CompressionTest = val;
    }
    ngOnInit() {
        this.commonRegistrationService
            .getRegistrationByIdShared$(this.regId)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$))
            .subscribe((reg) => {
            this.ngZone.run(() => (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
                if (!this.initialRegistrationClone) {
                    this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_1___default()(reg);
                }
                this.reg = reg;
                if (!this.reg.request.CompressionTest) {
                    this.reg.request.CompressionTest = [];
                }
            }));
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    save() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.reg);
        });
    }
    ok() {
        this.modalController.dismiss();
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);
            this.modalController.dismiss();
        });
    }
}
CompressionTestListModalPage.ɵfac = function CompressionTestListModalPage_Factory(t) { return new (t || CompressionTestListModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone)); };
CompressionTestListModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: CompressionTestListModalPage, selectors: [["app-compression-test-list-modal"]], inputs: { regId: "regId" }, decls: 18, vars: 10, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], [4, "ngIf"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [3, "tests", "includeInSnowProfileAsDefault", "testsChange"]], template: function CompressionTestListModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CompressionTestListModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function CompressionTestListModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, CompressionTestListModalPage_ng_container_11_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-grid", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "ion-col", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "ion-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 4, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.reg && ctx.reg.request && ctx.reg.request.CompressionTest);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](17, 8, "DIALOGS.OK"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgForm, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_4__.CompressionTestListComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 91974:
/*!******************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/compression-test/compression-test.component.ts ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestComponent": function() { return /* binding */ CompressionTestComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _compression_test_list_modal_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compression-test-list-modal/compression-test-list-modal.page */ 92475);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/registration.service */ 33181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 70325);









function CompressionTestComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx_r0.connectedTests.length, " / ", ctx_r0.tests.length, " ");
} }
function CompressionTestComponent_ion_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 5);
} }
function CompressionTestComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.EMPTY"), "\n");
} }
class CompressionTestComponent {
    constructor(modalContoller, registrationService) {
        this.modalContoller = modalContoller;
        this.registrationService = registrationService;
    }
    get connectedTests() {
        return this.tests.filter((t) => t.IncludeInSnowProfile === true);
    }
    get tests() {
        return this.reg.request.CompressionTest || [];
    }
    get isEmpty() {
        return this.connectedTests.length === 0;
    }
    openModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.compressionTestListModal) {
                yield this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
                this.compressionTestListModal = yield this.modalContoller.create({
                    component: _compression_test_list_modal_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestListModalPage,
                    componentProps: {
                        regId: this.reg.id
                    }
                });
                this.compressionTestListModal.present();
                yield this.compressionTestListModal.onDidDismiss();
                this.compressionTestListModal = null;
            }
        });
    }
}
CompressionTestComponent.ɵfac = function CompressionTestComponent_Factory(t) { return new (t || CompressionTestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService)); };
CompressionTestComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: CompressionTestComponent, selectors: [["app-compression-test"]], inputs: { reg: "reg" }, decls: 14, vars: 12, consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]], template: function CompressionTestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CompressionTestComponent_Template_ion_item_click_0_listener() { return ctx.openModal(); })("keyup.enter", function CompressionTestComponent_Template_ion_item_keyup_enter_0_listener() { return ctx.openModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CompressionTestComponent_ng_container_7_Template, 2, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, CompressionTestComponent_ion_icon_11_Template, 1, 0, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, CompressionTestComponent_ng_template_12_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 6, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.tests && ctx.tests.length > 0)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 8, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.MULTIPLE_TESTS"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 10, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.ATTACHED"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 43647:
/*!********************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-density/snow-density-layer-modal/snow-density-layer-modal.module.ts ***!
  \********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowDensityLayerModalPageModule": function() { return /* binding */ SnowDensityLayerModalPageModule; }
/* harmony export */ });
/* harmony import */ var _snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-density-layer-modal.page */ 36966);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class SnowDensityLayerModalPageModule {
}
SnowDensityLayerModalPageModule.ɵfac = function SnowDensityLayerModalPageModule_Factory(t) { return new (t || SnowDensityLayerModalPageModule)(); };
SnowDensityLayerModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SnowDensityLayerModalPageModule });
SnowDensityLayerModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SnowDensityLayerModalPageModule, { declarations: [_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityLayerModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 36966:
/*!******************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-density/snow-density-layer-modal/snow-density-layer-modal.page.ts ***!
  \******************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowDensityLayerModalPage": function() { return /* binding */ SnowDensityLayerModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../core/helpers/hydrology-helper */ 1513);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);













function SnowDensityLayerModalPage_ng_container_16_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, ctx_r4.layer.Density, "1.0-2"), " kg/m\u00B3");
} }
function SnowDensityLayerModalPage_ng_container_16_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, ctx_r5.getWaterEquivalent(ctx_r5.layer.Density, ctx_r5.layer.Thickness), "1.0-2"), " mm");
} }
function SnowDensityLayerModalPage_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-numeric-input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.layer.Thickness = $event; })("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r8.calculate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "app-numeric-input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r9.layer.Weight = $event; })("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r10.calculate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-text", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, SnowDensityLayerModalPage_ng_container_16_ng_container_8_Template, 3, 4, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-text", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, SnowDensityLayerModalPage_ng_container_16_ng_container_14_Template, 3, 4, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.layer.Thickness)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.layer.Weight)("max", 9999)("min", 0)("convertRatio", 1000)("decimalPlaces", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 14, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.layer.Density);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 16, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.WATER_EQUIVALENT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.layer.Density && ctx_r0.layer.Thickness);
} }
function SnowDensityLayerModalPage_ion_row_36_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_ion_row_36_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r11.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
} }
function SnowDensityLayerModalPage_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-numeric-input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r13.layer.Thickness = $event; })("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r15.calculate(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-numeric-input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r16.layer.Density = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r3.layer.Thickness)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r3.layer.Density)("max", 9999)("min", 0)("decimalPlaces", 3);
} }
class SnowDensityLayerModalPage {
    constructor(modalController, registrationService) {
        this.modalController = modalController;
        this.registrationService = registrationService;
        this.useCylinder = true;
    }
    ngOnInit() {
        this.initialRegistrationState = clone_deep__WEBPACK_IMPORTED_MODULE_1___default()(this.reg);
        this.initLayer();
    }
    initLayer() {
        this.addNew = this.layer === undefined;
        if (this.addNew) {
            this.layer = {};
        }
        this.calculate();
    }
    get hasLayers() {
        return (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowDensity &&
            this.reg.request.SnowProfile2.SnowDensity[0] &&
            this.reg.request.SnowProfile2.SnowDensity[0].Layers &&
            this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0);
    }
    get layerLenght() {
        return this.hasLayers
            ? this.reg.request.SnowProfile2.SnowDensity[0].Layers.length
            : 0;
    }
    get canGoNext() {
        return ((this.hasLayers && this.index < this.layerLenght) ||
            (this.index === this.layerLenght &&
                this.addNew &&
                !this.isEmpty(this.layer)));
    }
    isEmpty(snowDensityLayer) {
        return this.useCylinder
            ? snowDensityLayer.Thickness === undefined &&
                snowDensityLayer.Weight === undefined
            : snowDensityLayer.Density === undefined;
    }
    ok(gotoIndex) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.reg.request.SnowProfile2) {
                this.reg.request.SnowProfile2 = {};
            }
            if (!this.reg.request.SnowProfile2.SnowDensity) {
                this.reg.request.SnowProfile2.SnowDensity = [];
            }
            if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
                this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
            }
            if (this.addNew && !this.isEmpty(this.layer)) {
                this.reg.request.SnowProfile2.SnowDensity[0].Layers.splice(this.index, 0, this.layer);
            }
            yield this.registrationService.saveRegistrationAsync(this.reg);
            if (gotoIndex !== undefined) {
                this.index = this.index + gotoIndex;
                this.layer = this.reg.request.SnowProfile2.SnowDensity[0].Layers[this.index];
                this.initLayer();
            }
            else {
                this.modalController.dismiss();
            }
        });
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistrationState);
            this.modalController.dismiss();
        });
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            if (this.reg &&
                this.reg.request &&
                this.reg.request.SnowProfile2 &&
                this.reg.request.SnowProfile2.SnowDensity &&
                this.reg.request.SnowProfile2.SnowDensity.length > 0 &&
                this.reg.request.SnowProfile2.SnowDensity[0].Layers &&
                this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0) {
                this.reg.request.SnowProfile2.SnowDensity[0].Layers = this.reg.request.SnowProfile2.SnowDensity[0].Layers.filter((l) => l !== this.layer);
                yield this.registrationService.saveRegistrationAsync(this.reg);
            }
            this.modalController.dismiss();
        });
    }
    calculate() {
        if (this.useCylinder) {
            this.layer.Density = _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__.HydrologyHelper.calculateDensity(this.layer.Weight, this.layer.Thickness, this.tareWeight, this.cylinderDiameterInM);
        }
    }
    getWaterEquivalent(density, depth) {
        return _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__.HydrologyHelper.calculateWaterEquivalent(density, depth);
    }
}
SnowDensityLayerModalPage.ɵfac = function SnowDensityLayerModalPage_Factory(t) { return new (t || SnowDensityLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService)); };
SnowDensityLayerModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SnowDensityLayerModalPage, selectors: [["app-snow-density-layer-modal"]], inputs: { reg: "reg", layer: "layer", useCylinder: "useCylinder", cylinderDiameterInM: "cylinderDiameterInM", tareWeight: "tareWeight", index: "index" }, decls: 39, vars: 23, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], [4, "ngIf", "ngIfElse"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [4, "ngIf"], ["noCylinder", ""], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.HEIGHT", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.WEIGHT", "suffix", "g", 3, "value", "max", "min", "convertRatio", "decimalPlaces", "valueChange"], ["position", "stacked", "color", "medium", 1, "ion-text-uppercase"], [1, "ion-align-self-start"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.DENSITY", "suffix", "kg/m\u00B3", 3, "value", "max", "min", "decimalPlaces", "valueChange"]], template: function SnowDensityLayerModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function SnowDensityLayerModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, SnowDensityLayerModalPage_ng_container_16_Template, 15, 18, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "ion-grid", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-col", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_20_listener() { return ctx.ok(-1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "ion-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "ion-col", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "ion-button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_26_listener() { return ctx.ok(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "ion-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](30, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "ion-col", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "ion-button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](35, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](36, SnowDensityLayerModalPage_ion_row_36_Template, 6, 3, "ion-row", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, SnowDensityLayerModalPage_ng_template_37_Template, 2, 9, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 11, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 13, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 15, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.useCylinder)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.index === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](24, 17, "DIALOGS.PREVIOUS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.canGoNext);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](30, 19, "DIALOGS.NEXT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](35, 21, "DIALOGS.OK_BACK"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.addNew);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DecimalPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 17952:
/*!********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-density/snow-density-modal/snow-density-modal.module.ts ***!
  \********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowDensityModalPageModule": function() { return /* binding */ SnowDensityModalPageModule; }
/* harmony export */ });
/* harmony import */ var _snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-density-modal.page */ 47275);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../snow-density-layer-modal/snow-density-layer-modal.module */ 43647);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);




class SnowDensityModalPageModule {
}
SnowDensityModalPageModule.ɵfac = function SnowDensityModalPageModule_Factory(t) { return new (t || SnowDensityModalPageModule)(); };
SnowDensityModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SnowDensityModalPageModule });
SnowDensityModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowDensityLayerModalPageModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SnowDensityModalPageModule, { declarations: [_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowDensityLayerModalPageModule] }); })();


/***/ }),

/***/ 47275:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-density/snow-density-modal/snow-density-modal.page.ts ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowDensityModalPage": function() { return /* binding */ SnowDensityModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _snow_density_layer_modal_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../snow-density-layer-modal/snow-density-layer-modal.page */ 36966);
/* harmony import */ var _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../core/helpers/array-helper */ 99020);
/* harmony import */ var _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../core/helpers/hydrology-helper */ 1513);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../pipes/meters-to-cm.pipe */ 50795);





















function SnowDensityModalPage_ng_container_21_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "app-numeric-input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_5_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r4.profile.CylinderDiameter = $event; })("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r6.recalculateLayersAndSave(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "app-numeric-input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r7.profile.TareWeight = $event; })("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r8.recalculateLayersAndSave(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 11, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.profile.CylinderDiameter)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.profile.TareWeight)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 1000);
} }
function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, layer_r10.Thickness), "cm ");
} }
function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", layer_r10.Weight * 1000, "g ");
} }
function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, layer_r10.Density, "1.0-2"), "kg/m\u00B3 ");
} }
function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" (", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, ctx_r15.getWaterEquivalent(layer_r10.Density, layer_r10.Thickness), "1.0-2"), "mm) ");
} }
function SnowDensityModalPage_ng_container_26_ion_item_7_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_ion_item_7_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r21); const i_r11 = restoredCtx.index; const layer_r10 = restoredCtx.$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r20.addOrEditLayer(i_r11, layer_r10); })("keyup.enter", function SnowDensityModalPage_ng_container_26_ion_item_7_Template_ion_item_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r21); const i_r11 = restoredCtx.index; const layer_r10 = restoredCtx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r22.addOrEditLayer(i_r11, layer_r10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_2_Template, 3, 3, "ion-text", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_3_Template, 2, 1, "ion-text", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_4_Template, 3, 4, "ion-text", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_5_Template, 3, 4, "ion-text", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "ion-reorder", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r10 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Thickness !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Weight !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Density !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r9.useCylinder && layer_r10.Density !== undefined && layer_r10.Thickness !== undefined);
} }
function SnowDensityModalPage_ng_container_26_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_Template_ion_item_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r23.addLayerTop(); })("keyup.enter", function SnowDensityModalPage_ng_container_26_Template_ion_item_keyup_enter_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r25.addLayerTop(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-reorder-group", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionItemReorder", function SnowDensityModalPage_ng_container_26_Template_ion_reorder_group_ionItemReorder_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r26.onLayerReorder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, SnowDensityModalPage_ng_container_26_ion_item_7_Template, 7, 4, "ion-item", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_Template_ion_item_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r27.addLayerBottom(); })("keyup.enter", function SnowDensityModalPage_ng_container_26_Template_ion_item_keyup_enter_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24); const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r28.addLayerBottom(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 3, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_TOP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r1.profile.Layers);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_BOTTOM"));
} }
function SnowDensityModalPage_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_template_33_Template_ion_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r29.addLayerBottom(); })("keyup.enter", function SnowDensityModalPage_ng_template_33_Template_ion_item_keyup_enter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r30); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](); return ctx_r31.addLayerBottom(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER"));
} }
class SnowDensityModalPage {
    constructor(modalController, registrationService, commonRegistrationService, ngZone) {
        this.modalController = modalController;
        this.registrationService = registrationService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngZone = ngZone;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
    }
    get profile() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowDensity &&
            this.reg.request.SnowProfile2.SnowDensity.length > 0) {
            return this.reg.request.SnowProfile2.SnowDensity[0];
        }
        return {};
    }
    get hasLayers() {
        return (this.profile && this.profile.Layers && this.profile.Layers.length > 0);
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.commonRegistrationService
                .getRegistrationByIdShared$(this.regId)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$))
                .subscribe((reg) => {
                this.ngZone.run(() => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                    if (!this.initialRegistrationClone) {
                        this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_4___default()(reg);
                    }
                    this.reg = reg;
                    if (!this.reg.request.SnowProfile2) {
                        this.reg.request.SnowProfile2 = {};
                    }
                    if (!this.reg.request.SnowProfile2.SnowDensity) {
                        this.reg.request.SnowProfile2.SnowDensity = [];
                    }
                    if (!this.reg.request.SnowProfile2.SnowDensity[0]) {
                        this.reg.request.SnowProfile2.SnowDensity[0] = {};
                    }
                    if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
                        this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
                    }
                    if (this.useCylinder === undefined) {
                        this.useCylinder =
                            !!this.reg.request.SnowProfile2.SnowDensity[0].CylinderDiameter ||
                                !!this.reg.request.SnowProfile2.SnowDensity[0].TareWeight ||
                                this.reg.request.SnowProfile2.SnowDensity[0].Layers.length ===
                                    0 ||
                                this.reg.request.SnowProfile2.SnowDensity[0].Layers.some((l) => !!l.Weight);
                    }
                    this.recalculateLayers();
                }));
            });
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    ok() {
        this.modalController.dismiss(this.profile);
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);
            this.modalController.dismiss();
        });
    }
    addLayerTop() {
        this.addOrEditLayer(0, undefined);
    }
    addLayerBottom() {
        this.addOrEditLayer(this.hasLayers ? this.profile.Layers.length : 0, undefined);
    }
    addOrEditLayer(index, layer) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.layerModal) {
                this.layerModal = yield this.modalController.create({
                    component: _snow_density_layer_modal_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityLayerModalPage,
                    componentProps: {
                        reg: this.reg,
                        layer: layer,
                        useCylinder: this.useCylinder,
                        cylinderDiameterInM: this.profile.CylinderDiameter,
                        tareWeight: this.profile.TareWeight,
                        index
                    }
                });
                this.layerModal.present();
                yield this.layerModal.onDidDismiss();
                this.layerModal = null;
                this.recalculateLayers();
            }
        });
    }
    onLayerReorder(event) {
        this.profile.Layers = _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__.ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
        event.detail.complete();
    }
    recalculateLayers() {
        if (this.useCylinder && this.hasLayers) {
            this.profile.Layers.forEach((layer) => {
                layer.Density = _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__.HydrologyHelper.calculateDensity(layer.Weight, layer.Thickness, this.profile.TareWeight, this.profile.CylinderDiameter);
            });
        }
    }
    recalculateLayersAndSave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.recalculateLayers();
            yield this.registrationService.saveRegistrationAsync(this.reg);
        });
    }
    getWaterEquivalent(density, depth) {
        return _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__.HydrologyHelper.calculateWaterEquivalent(density, depth);
    }
}
SnowDensityModalPage.ɵfac = function SnowDensityModalPage_Factory(t) { return new (t || SnowDensityModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_3__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_5__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone)); };
SnowDensityModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: SnowDensityModalPage, selectors: [["app-snow-density-modal"]], inputs: { regId: "regId" }, decls: 35, vars: 22, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["slot", "end", "name", "useCylinder", 3, "ngModel", "ngModelChange"], [4, "ngIf"], [4, "ngIf", "ngIfElse"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["noLayers", ""], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER_DIAMETER", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TARE_WEIGHT", "suffix", "g", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["disabled", "false", 3, "ionItemReorder"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["slot", "end"]], template: function SnowDensityModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngSubmit", function SnowDensityModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](19, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "ion-toggle", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function SnowDensityModalPage_Template_ion_toggle_ngModelChange_20_listener($event) { return ctx.useCylinder = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, SnowDensityModalPage_ng_container_21_Template, 7, 13, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](25, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](26, SnowDensityModalPage_ng_container_26_Template, 13, 7, "ng-container", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "ion-grid", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "ion-col", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "ion-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](31);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](32, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](33, SnowDensityModalPage_ng_template_33_Template, 5, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](34);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 12, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](15, 14, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.METHOD"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](19, 16, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER_METHOD"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx.useCylinder);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.useCylinder);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](25, 18, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.LAYER"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.hasLayers)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](32, 20, "DIALOGS.OK"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonCol, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonReorder, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonText], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__.MetersToCmPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHktbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 9253:
/*!**********************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-density/snow-density.component.ts ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowDensityComponent": function() { return /* binding */ SnowDensityComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _snow_density_modal_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-density-modal/snow-density-modal.page */ 47275);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/registration.service */ 33181);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 70325);










function SnowDensityComponent_ion_text_6_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.ONE_LAYER"), " ");
} }
function SnowDensityComponent_ion_text_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SnowDensityComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r0.profiles[0].Layers ? ctx_r0.profiles[0].Layers.length : 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.profiles[0].Layers.length === 1)("ngIfElse", _r4);
} }
function SnowDensityComponent_ion_icon_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 6);
} }
function SnowDensityComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.EMPTY"), "\n");
} }
function SnowDensityComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.MULTIPLE_LAYERS"), "\n");
} }
class SnowDensityComponent {
    constructor(modalContoller, registrationService) {
        this.modalContoller = modalContoller;
        this.registrationService = registrationService;
    }
    get profiles() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowDensity &&
            this.reg.request.SnowProfile2.SnowDensity.length > 0) {
            return this.reg.request.SnowProfile2.SnowDensity;
        }
        return [];
    }
    get isEmpty() {
        return (0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(this.profiles);
    }
    openModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.densityModal) {
                yield this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
                this.densityModal = yield this.modalContoller.create({
                    component: _snow_density_modal_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityModalPage,
                    componentProps: {
                        regId: this.reg.id
                    }
                });
                this.densityModal.present();
                yield this.densityModal.onDidDismiss();
                this.densityModal = null;
            }
        });
    }
}
SnowDensityComponent.ɵfac = function SnowDensityComponent_Factory(t) { return new (t || SnowDensityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService)); };
SnowDensityComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SnowDensityComponent, selectors: [["app-snow-density"]], inputs: { reg: "reg" }, decls: 12, vars: 6, consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]], template: function SnowDensityComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SnowDensityComponent_Template_ion_item_click_0_listener() { return ctx.openModal(); })("keyup.enter", function SnowDensityComponent_Template_ion_item_keyup_enter_0_listener() { return ctx.openModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SnowDensityComponent_ion_text_6_Template, 3, 3, "ion-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, SnowDensityComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SnowDensityComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SnowDensityComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHkuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 16866:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-temp/snow-temp-layer-modal/snow-temp-layer-modal.module.ts ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowTempLayerModalPageModule": function() { return /* binding */ SnowTempLayerModalPageModule; }
/* harmony export */ });
/* harmony import */ var _snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-temp-layer-modal.page */ 5309);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class SnowTempLayerModalPageModule {
}
SnowTempLayerModalPageModule.ɵfac = function SnowTempLayerModalPageModule_Factory(t) { return new (t || SnowTempLayerModalPageModule)(); };
SnowTempLayerModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: SnowTempLayerModalPageModule });
SnowTempLayerModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SnowTempLayerModalPageModule, { declarations: [_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempLayerModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 5309:
/*!*********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-temp/snow-temp-layer-modal/snow-temp-layer-modal.page.ts ***!
  \*********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowTempLayerModalPage": function() { return /* binding */ SnowTempLayerModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);













function SnowTempLayerModalPage_ion_row_37_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_ion_row_37_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r1.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
} }
class SnowTempLayerModalPage {
    constructor(modalController, registrationService) {
        this.modalController = modalController;
        this.registrationService = registrationService;
    }
    ngOnInit() {
        this.initialRegistrationState = clone_deep__WEBPACK_IMPORTED_MODULE_2___default()(this.reg);
        this.initLayer();
    }
    initLayer() {
        this.addNew = this.layer === undefined;
        if (this.addNew) {
            this.layer = {};
        }
    }
    get hasLayers() {
        return (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowTemp &&
            this.reg.request.SnowProfile2.SnowTemp.Layers &&
            this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0);
    }
    get layerLenght() {
        return this.hasLayers
            ? this.reg.request.SnowProfile2.SnowTemp.Layers.length
            : 0;
    }
    get canGoNext() {
        return ((this.hasLayers && this.index < this.layerLenght) ||
            (this.index === this.layerLenght &&
                this.addNew &&
                !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.layer)));
    }
    ok(gotoIndex) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.reg.request.SnowProfile2) {
                this.reg.request.SnowProfile2 = {};
            }
            if (!this.reg.request.SnowProfile2.SnowTemp) {
                this.reg.request.SnowProfile2.SnowTemp = {};
            }
            if (!this.reg.request.SnowProfile2.SnowTemp.Layers) {
                this.reg.request.SnowProfile2.SnowTemp.Layers = [];
            }
            if (this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.layer)) {
                this.reg.request.SnowProfile2.SnowTemp.Layers.splice(this.index, 0, this.layer);
            }
            yield this.registrationService.saveRegistrationAsync(this.reg);
            if (gotoIndex !== undefined) {
                this.index = this.index + gotoIndex;
                this.layer = this.reg.request.SnowProfile2.SnowTemp.Layers[this.index];
                this.initLayer();
            }
            else {
                this.modalController.dismiss();
            }
        });
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistrationState);
            this.modalController.dismiss();
        });
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, function* () {
            if (this.reg &&
                this.reg.request &&
                this.reg.request.SnowProfile2 &&
                this.reg.request.SnowProfile2.SnowTemp &&
                this.reg.request.SnowProfile2.SnowTemp.Layers &&
                this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0) {
                this.reg.request.SnowProfile2.SnowTemp.Layers = this.reg.request.SnowProfile2.SnowTemp.Layers.filter((l) => l !== this.layer);
                yield this.registrationService.saveRegistrationAsync(this.reg);
            }
            this.modalController.dismiss({ delete: true });
        });
    }
}
SnowTempLayerModalPage.ɵfac = function SnowTempLayerModalPage_Factory(t) { return new (t || SnowTempLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService)); };
SnowTempLayerModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: SnowTempLayerModalPage, selectors: [["app-snow-temp-layer-modal"]], inputs: { layer: "layer", index: "index", reg: "reg" }, decls: 38, vars: 30, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.DEPTH", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TEMPERATURE", "suffix", "\u00B0C", 3, "value", "max", "min", "decimalPlaces", "valueChange"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [4, "ngIf"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]], template: function SnowTempLayerModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function SnowTempLayerModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "app-numeric-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowTempLayerModalPage_Template_app_numeric_input_valueChange_16_listener($event) { return ctx.layer.Depth = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "app-numeric-input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowTempLayerModalPage_Template_app_numeric_input_valueChange_17_listener($event) { return ctx.layer.SnowTemp = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-grid", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-col", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "ion-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_21_listener() { return ctx.ok(-1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "ion-icon", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "ion-col", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "ion-button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_27_listener() { return ctx.ok(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "ion-icon", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](31, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "ion-col", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "ion-button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](36, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, SnowTempLayerModalPage_ion_row_37_Template, 6, 3, "ion-row", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 18, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 20, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.POINT"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 22, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.POINT"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.layer.Depth)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.layer.SnowTemp)("max", 0)("min", -70)("decimalPlaces", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.index === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](25, 24, "DIALOGS.PREVIOUS"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.canGoNext);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](31, 26, "DIALOGS.NEXT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](36, 28, "DIALOGS.OK_BACK"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.addNew);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAtbGF5ZXItbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 35692:
/*!***********************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-temp/snow-temp-modal/snow-temp-modal.module.ts ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowTempModalPageModule": function() { return /* binding */ SnowTempModalPageModule; }
/* harmony export */ });
/* harmony import */ var _snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-temp-modal.page */ 87510);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../snow-temp-layer-modal/snow-temp-layer-modal.module */ 16866);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);




class SnowTempModalPageModule {
}
SnowTempModalPageModule.ɵfac = function SnowTempModalPageModule_Factory(t) { return new (t || SnowTempModalPageModule)(); };
SnowTempModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SnowTempModalPageModule });
SnowTempModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowTempLayerModalPageModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SnowTempModalPageModule, { declarations: [_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowTempLayerModalPageModule] }); })();


/***/ }),

/***/ 87510:
/*!*********************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-temp/snow-temp-modal/snow-temp-modal.page.ts ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowTempModalPage": function() { return /* binding */ SnowTempModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _snow_temp_layer_modal_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../snow-temp-layer-modal/snow-temp-layer-modal.page */ 5309);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../pipes/meters-to-cm.pipe */ 50795);


















function SnowTempModalPage_ion_item_16_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, layer_r1.Depth), "cm ");
} }
function SnowTempModalPage_ion_item_16_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", layer_r1.SnowTemp, "\u00B0C ");
} }
function SnowTempModalPage_ion_item_16_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_ion_item_16_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const i_r2 = restoredCtx.index; const layer_r1 = restoredCtx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r7.addOrEditLayer(i_r2, layer_r1); })("keyup.enter", function SnowTempModalPage_ion_item_16_Template_ion_item_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8); const i_r2 = restoredCtx.index; const layer_r1 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r9.addOrEditLayer(i_r2, layer_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, SnowTempModalPage_ion_item_16_ng_container_2_Template, 3, 3, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SnowTempModalPage_ion_item_16_ng_container_3_Template, 2, 1, "ng-container", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", layer_r1.Depth !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", layer_r1.SnowTemp !== undefined);
} }
class SnowTempModalPage {
    constructor(modalController, registrationService, commonRegistrationService, ngZone) {
        this.modalController = modalController;
        this.registrationService = registrationService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngZone = ngZone;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
    }
    get tempProfile() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowTemp) {
            return this.reg.request.SnowProfile2.SnowTemp;
        }
        return {};
    }
    get hasLayers() {
        return (this.tempProfile &&
            this.tempProfile.Layers &&
            this.tempProfile.Layers.length > 0);
    }
    ngOnInit() {
        this.commonRegistrationService
            .getRegistrationByIdShared$(this.regId)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.ngDestroy$))
            .subscribe((reg) => {
            this.ngZone.run(() => {
                if (!this.initialRegistrationClone) {
                    this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_3___default()(reg);
                }
                this.reg = reg;
                if (!this.reg.request.SnowProfile2) {
                    this.reg.request.SnowProfile2 = {};
                }
                if (!this.reg.request.SnowProfile2.SnowTemp) {
                    this.reg.request.SnowProfile2.SnowTemp = {};
                }
                if (!this.reg.request.SnowProfile2.SnowTemp.Layers) {
                    this.reg.request.SnowProfile2.SnowTemp.Layers = [];
                }
                this.sortLayers();
            });
        });
        this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_3___default()(this.reg);
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    ok() {
        this.modalController.dismiss(this.tempProfile);
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);
            this.modalController.dismiss();
        });
    }
    addLayerBottom() {
        this.addOrEditLayer(this.hasLayers ? this.tempProfile.Layers.length : 0, undefined);
    }
    addOrEditLayer(index, layer) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.layerModal) {
                this.layerModal = yield this.modalController.create({
                    component: _snow_temp_layer_modal_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempLayerModalPage,
                    componentProps: {
                        reg: this.reg,
                        layer,
                        index
                    }
                });
                this.layerModal.present();
                yield this.layerModal.onDidDismiss();
                this.layerModal = null;
                this.sortLayers();
            }
        });
    }
    sortLayers() {
        if (this.tempProfile && this.tempProfile.Layers) {
            this.tempProfile.Layers = this.tempProfile.Layers.sort((a, b) => a.Depth - b.Depth);
        }
    }
}
SnowTempModalPage.ɵfac = function SnowTempModalPage_Factory(t) { return new (t || SnowTempModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone)); };
SnowTempModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: SnowTempModalPage, selectors: [["app-snow-temp-modal"]], inputs: { regId: "regId" }, decls: 28, vars: 16, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["expand", "block", "fill", "solid", "color", "primary", "type", "submit"], [4, "ngIf"]], template: function SnowTempModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function SnowTempModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, SnowTempModalPage_ion_item_16_Template, 4, 2, "ion-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "ion-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_Template_ion_item_click_17_listener() { return ctx.addLayerBottom(); })("keyup.enter", function SnowTempModalPage_Template_ion_item_keyup_enter_17_listener() { return ctx.addLayerBottom(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "ion-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](21, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "ion-grid", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "ion-col", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "ion-button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 6, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 8, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](15, 10, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.tempProfile.Layers);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](21, 12, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.ADD_LAYER_BOTTOM"));
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](27, 14, "DIALOGS.OK"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_5__.MetersToCmPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAtbW9kYWwucGFnZS5zY3NzIn0= */"] });


/***/ }),

/***/ 55568:
/*!****************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/snow-temp/snow-temp.component.ts ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowTempComponent": function() { return /* binding */ SnowTempComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _snow_temp_modal_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-temp-modal/snow-temp-modal.page */ 87510);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/registration.service */ 33181);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 70325);










function SnowTempComponent_ion_text_6_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.ONE_LAYER"), " ");
} }
function SnowTempComponent_ion_text_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SnowTempComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.tempProfile.Layers ? ctx_r0.tempProfile.Layers.length : 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.tempProfile.Layers.length === 1)("ngIfElse", _r4);
} }
function SnowTempComponent_ion_icon_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 6);
} }
function SnowTempComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.EMPTY"), "\n");
} }
function SnowTempComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.MULTIPLE_LAYERS"), "\n");
} }
class SnowTempComponent {
    constructor(modalContoller, registrationService) {
        this.modalContoller = modalContoller;
        this.registrationService = registrationService;
    }
    get tempProfile() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.SnowTemp) {
            return this.reg.request.SnowProfile2.SnowTemp;
        }
        return {};
    }
    get isEmpty() {
        return (0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(this.tempProfile);
    }
    ngOnInit() { }
    openModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.snowTempModal) {
                yield this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
                this.snowTempModal = yield this.modalContoller.create({
                    component: _snow_temp_modal_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempModalPage,
                    componentProps: {
                        regId: this.reg.id
                    }
                });
                this.snowTempModal.present();
                yield this.snowTempModal.onDidDismiss();
                this.snowTempModal = null;
            }
        });
    }
}
SnowTempComponent.ɵfac = function SnowTempComponent_Factory(t) { return new (t || SnowTempComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService)); };
SnowTempComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SnowTempComponent, selectors: [["app-snow-temp"]], inputs: { reg: "reg" }, decls: 12, vars: 6, consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]], template: function SnowTempComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SnowTempComponent_Template_ion_item_click_0_listener() { return ctx.openModal(); })("keyup.enter", function SnowTempComponent_Template_ion_item_keyup_enter_0_listener() { return ctx.openModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SnowTempComponent_ion_text_6_Template, 3, 3, "ion-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, SnowTempComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SnowTempComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SnowTempComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 87386:
/*!***************************************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-layer-history-modal/strat-profile-layer-history-modal.module.ts ***!
  \***************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileLayerHistoryModalPageModule": function() { return /* binding */ StratProfileLayerHistoryModalPageModule; }
/* harmony export */ });
/* harmony import */ var _strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strat-profile-layer-history-modal.page */ 58853);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class StratProfileLayerHistoryModalPageModule {
}
StratProfileLayerHistoryModalPageModule.ɵfac = function StratProfileLayerHistoryModalPageModule_Factory(t) { return new (t || StratProfileLayerHistoryModalPageModule)(); };
StratProfileLayerHistoryModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: StratProfileLayerHistoryModalPageModule });
StratProfileLayerHistoryModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](StratProfileLayerHistoryModalPageModule, { declarations: [_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerHistoryModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 58853:
/*!*************************************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-layer-history-modal/strat-profile-layer-history-modal.page.ts ***!
  \*************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileLayerHistoryModalPage": function() { return /* binding */ StratProfileLayerHistoryModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 2281);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @varsom-regobs-common/regobs-api */ 39778);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../shared/pipes/format-date/format-date.pipe */ 16531);

















function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const item_r8 = restoredCtx.$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3); return ctx_r9.selectLayer(item_r8); })("keyup.enter", function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template_ion_item_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10); const item_r8 = restoredCtx.$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3); return ctx_r11.selectLayer(item_r8); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "formatDate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 6, item_r8.date)), " - (", item_r8.layers.length, " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 8, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER"), ") ");
} }
function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template, 6, 10, "ion-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const previousUsedLayers_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", previousUsedLayers_r5);
} }
function StratProfileLayerHistoryModalPage_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_Template, 2, 1, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const previousUsedLayers_r5 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", previousUsedLayers_r5.length > 0)("ngIfElse", _r3);
} }
function StratProfileLayerHistoryModalPage_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-skeleton-text", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-skeleton-text", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-skeleton-text", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ion-skeleton-text", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-item", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "ion-skeleton-text", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, " - ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "ion-skeleton-text", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);
} }
function StratProfileLayerHistoryModalPage_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list-header", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.NO_PROFILES_FOUND"), " ");
} }
class StratProfileLayerHistoryModalPage {
    constructor(modalController, registrationService, searchService) {
        this.modalController = modalController;
        this.registrationService = registrationService;
        this.searchService = searchService;
        this.isLoading = true;
    }
    ngOnInit() {
        if (this.reg && this.reg.request && this.reg.request.ObsLocation) {
            this.$previousUsedLayers = this.searchService
                .SearchSearch({
                // ObserverGuid: this.observerGuid, TODO: Call "my obervations" in api instead
                FromDtObsTime: moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(14, 'days').startOf('day').toISOString(),
                Radius: {
                    Position: {
                        Latitude: this.reg.request.ObsLocation.Latitude,
                        Longitude: this.reg.request.ObsLocation.Longitude
                    },
                    Radius: 100000
                },
                SelectedGeoHazards: [_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow],
                SelectedRegistrationTypes: [
                    {
                        Id: src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2
                    }
                ]
            })
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)((result) => this.getLayersFromSearchResult(result)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.tap)(() => {
                this.isLoading = false;
            }));
        }
    }
    cancel() {
        this.modalController.dismiss();
    }
    selectLayer(item) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.reg.request.SnowProfile2) {
                this.reg.request.SnowProfile2 = {};
            }
            if (!this.reg.request.SnowProfile2.StratProfile) {
                this.reg.request.SnowProfile2.StratProfile = {};
            }
            this.reg.request.SnowProfile2.StratProfile.Layers = item.layers;
            yield this.registrationService.saveRegistrationAsync(this.reg);
            this.modalController.dismiss();
        });
    }
    getLayersFromSearchResult(result) {
        return result
            .map((reg) => {
            if (reg.SnowProfile2 !== undefined &&
                reg.SnowProfile2.StratProfile !== undefined &&
                reg.SnowProfile2.StratProfile !== null &&
                reg.SnowProfile2.StratProfile.Layers !== undefined &&
                reg.SnowProfile2.StratProfile.Layers !== null &&
                reg.SnowProfile2.StratProfile.Layers.length > 0) {
                return {
                    id: reg.RegId,
                    date: reg.DtObsTime,
                    layers: reg.SnowProfile2.StratProfile.Layers
                };
            }
            return null;
        })
            .filter((x) => x !== null);
    }
}
StratProfileLayerHistoryModalPage.ɵfac = function StratProfileLayerHistoryModalPage_Factory(t) { return new (t || StratProfileLayerHistoryModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_11__.SearchService)); };
StratProfileLayerHistoryModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: StratProfileLayerHistoryModalPage, selectors: [["app-strat-profile-layer-history-modal"]], inputs: { reg: "reg" }, decls: 17, vars: 10, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full", 1, "ion-no-margin"], [4, "ngIf", "ngIfElse"], ["loading", ""], ["empty", ""], ["tabindex", "0", 3, "detail", "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "detail", "click", "keyup.enter"], [3, "detail"], ["animated", "", 2, "width", "40%"], ["animated", "", 2, "width", "20%"], ["animated", "", 2, "width", "30%"], ["animated", "", 2, "width", "60%"], [1, "ion-text-uppercase"]], template: function StratProfileLayerHistoryModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function StratProfileLayerHistoryModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
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
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-list", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, StratProfileLayerHistoryModalPage_ng_container_11_Template, 2, 2, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, StratProfileLayerHistoryModalPage_ng_template_13_Template, 15, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, StratProfileLayerHistoryModalPage_ng_template_15_Template, 4, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 4, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.FROM_OTHER_PROFILE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 8, ctx.$previousUsedLayers))("ngIfElse", _r1);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSkeletonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe], styles: ["ion-skeleton-text[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtBQUNKIiwiZmlsZSI6InN0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2tlbGV0b24tdGV4dCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn0iXX0= */"] });


/***/ }),

/***/ 59070:
/*!***********************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-layer-modal/strat-profile-layer-modal.module.ts ***!
  \***********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileLayerModalPageModule": function() { return /* binding */ StratProfileLayerModalPageModule; }
/* harmony export */ });
/* harmony import */ var _strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strat-profile-layer-modal.page */ 46218);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class StratProfileLayerModalPageModule {
}
StratProfileLayerModalPageModule.ɵfac = function StratProfileLayerModalPageModule_Factory(t) { return new (t || StratProfileLayerModalPageModule)(); };
StratProfileLayerModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: StratProfileLayerModalPageModule });
StratProfileLayerModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](StratProfileLayerModalPageModule, { declarations: [_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule] }); })();


/***/ }),

/***/ 46218:
/*!*********************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-layer-modal/strat-profile-layer-modal.page.ts ***!
  \*********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileLayerModalPage": function() { return /* binding */ StratProfileLayerModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../numeric-input/numeric-input.component */ 24857);
/* harmony import */ var _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../kdv-select/kdv-select.component */ 22241);
/* harmony import */ var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../shared/components/input/select/select.component */ 94990);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../text-comment/text-comment.component */ 32032);

















function StratProfileLayerModalPage_ng_container_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SHOW_LESS"), " ");
} }
function StratProfileLayerModalPage_ng_container_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SHOW_MORE"), " ");
} }
function StratProfileLayerModalPage_ion_list_29_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-list", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r4.layer.HardnessBottomTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_2_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r6.layer.GrainFormSecondaryTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "app-select", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("selectedValueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_select_selectedValueChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r7.layer.GrainSizeAvgMax = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "app-kdv-select", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r8.layer.CriticalLayerTID = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "app-text-comment", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_text_comment_valueChange_9_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r9.layer.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.HardnessBottomTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.GrainFormSecondaryTID)("getIconFunc", ctx_r2.getIconFunc);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 8, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MAX_GRAIN_SIZE"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("selectedValue", ctx_r2.layer.GrainSizeAvgMax)("options", ctx_r2.grainSizeOptions);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.CriticalLayerTID);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.Comment);
} }
function StratProfileLayerModalPage_ion_row_53_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-row");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-col", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_ion_row_53_Template_ion_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](); return ctx_r10.delete(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
} }
const basicHardnessValues = [2, 6, 10, 14, 18, 21];
const basicGrainFormValues = [1, 14, 17, 22, 26, 32, 36, 40, 41];
const basicWetnessValues = [1, 3, 5, 7, 9];
class StratProfileLayerModalPage {
    constructor(modalController, translateService, registrationService) {
        this.modalController = modalController;
        this.translateService = translateService;
        this.registrationService = registrationService;
        this.showMore = false;
        this.grainSizeOptions = [
            { id: 0.001, text: '.1' },
            { id: 0.003, text: '.3' },
            { id: 0.005, text: '.5' },
            { id: 0.007, text: '.7' },
            { id: 0.01, text: '1' },
            { id: 0.015, text: '1.5' },
            { id: 0.02, text: '2' },
            { id: 0.025, text: '2.5' },
            { id: 0.03, text: '3' },
            { id: 0.035, text: '3.5' },
            { id: 0.04, text: '4' },
            { id: 0.045, text: '4.5' },
            { id: 0.05, text: '5' },
            { id: 0.055, text: '5.5' },
            { id: 0.06, text: '6' },
            { id: 0.08, text: '8' },
            { id: 0.1, text: '10' }
        ];
        this.getIconFunc = (kdvElement) => `md-grainform-${((kdvElement || {}).Name || '').toLowerCase()}`;
    }
    get hasLayers() {
        return (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.StratProfile &&
            this.reg.request.SnowProfile2.StratProfile.Layers &&
            this.reg.request.SnowProfile2.StratProfile.Layers.length > 0);
    }
    get layerLenght() {
        return this.hasLayers
            ? this.reg.request.SnowProfile2.StratProfile.Layers.length
            : 0;
    }
    get canGoNext() {
        return ((this.hasLayers && this.index < this.layerLenght) ||
            (this.index === this.layerLenght &&
                this.addNew &&
                !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.layer)));
    }
    ngOnInit() {
        this.initialRegistationState = clone_deep__WEBPACK_IMPORTED_MODULE_2___default()(this.reg);
        this.initLayer();
        this.translateService
            .get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE')
            .subscribe((val) => {
            this.grainSizeInterfaceOptions = {
                header: val
            };
        });
    }
    initLayer() {
        this.addNew = this.layer === undefined;
        if (this.addNew) {
            this.layer = {};
        }
        this.showMore = this.hasAnyAdvancedOptions();
        this.updateFilters();
    }
    hasAnyAdvancedOptions() {
        return (this.layer.HardnessBottomTID > 0 ||
            this.layer.GrainSizeAvgMax > 0 ||
            this.layer.GrainFormSecondaryTID > 0 ||
            this.layer.CriticalLayerTID > 0 ||
            !!this.layer.Comment);
    }
    save() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.reg);
        });
    }
    ok(gotoIndex) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.reg.request.SnowProfile2) {
                this.reg.request.SnowProfile2 = {};
            }
            if (!this.reg.request.SnowProfile2.StratProfile) {
                this.reg.request.SnowProfile2.StratProfile = {};
            }
            if (!this.reg.request.SnowProfile2.StratProfile.Layers) {
                this.reg.request.SnowProfile2.StratProfile.Layers = [];
            }
            if (this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.layer)) {
                this.reg.request.SnowProfile2.StratProfile.Layers.splice(this.index, 0, this.layer);
            }
            yield this.save();
            if (gotoIndex !== undefined) {
                this.index = this.index + gotoIndex;
                this.layer = this.reg.request.SnowProfile2.StratProfile.Layers[this.index];
                this.initLayer();
            }
            else {
                this.modalController.dismiss();
            }
        });
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.initialRegistationState);
            this.modalController.dismiss();
        });
    }
    delete() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            if (this.reg &&
                this.reg.request &&
                this.reg.request.SnowProfile2 &&
                this.reg.request.SnowProfile2.StratProfile &&
                this.reg.request.SnowProfile2.StratProfile.Layers &&
                this.reg.request.SnowProfile2.StratProfile.Layers.length > 0) {
                this.reg.request.SnowProfile2.StratProfile.Layers = this.reg.request.SnowProfile2.StratProfile.Layers.filter((l) => l !== this.layer);
                yield this.save();
            }
            this.modalController.dismiss();
        });
    }
    toggleShowMore() {
        this.showMore = !this.showMore;
        this.updateFilters();
    }
    updateFilters() {
        this.setHardnessFilter();
        this.setGrainFormFilter();
        this.setWetnessFilter();
    }
    setHardnessFilter() {
        this.hardnessFilter = this.showMore
            ? undefined
            : (n) => basicHardnessValues.indexOf(n) >= 0;
    }
    setGrainFormFilter() {
        this.grainFormFilter = this.showMore
            ? undefined
            : (n) => basicGrainFormValues.indexOf(n) >= 0;
    }
    setWetnessFilter() {
        this.wetnessFilter = this.showMore
            ? undefined
            : (n) => basicWetnessValues.indexOf(n) >= 0;
    }
}
StratProfileLayerModalPage.ɵfac = function StratProfileLayerModalPage_Factory(t) { return new (t || StratProfileLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService)); };
StratProfileLayerModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: StratProfileLayerModalPage, selectors: [["app-strat-profile-layer-modal"]], inputs: { layer: "layer", reg: "reg", index: "index" }, decls: 54, vars: 51, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full", 1, "ion-no-margin"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.THICKNESS", "suffix", "cm", 3, "value", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.HARDNESS", "kdvKey", "Snow_HardnessKDV", 3, "value", "filter", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.GRAIN_FORM", "kdvKey", "Snow_GrainFormKDV", 3, "value", "filter", "getIconFunc", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.WETNESS", "kdvKey", "Snow_WetnessKDV", 3, "value", "filter", "valueChange"], ["fill", "clear", "expand", "full", 3, "click"], ["slot", "start", 3, "name"], [4, "ngIf"], ["lines", "full", 4, "ngIf"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["lines", "full"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.HARDNESS_BOTTOM", "kdvKey", "Snow_HardnessKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.GRAIN_FROM_SECONDARY", "kdvKey", "Snow_GrainFormKDV", 3, "value", "getIconFunc", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MAX_GRAIN_SIZE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.CRITICAL_LAYER", "kdvKey", "Snow_CriticalLayerKDV", 3, "value", "valueChange"], ["title", "DIALOGS.COMMENT", 3, "value", "valueChange"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]], template: function StratProfileLayerModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function StratProfileLayerModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "app-numeric-input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_numeric_input_valueChange_16_listener($event) { return ctx.layer.Thickness = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "app-kdv-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_17_listener($event) { return ctx.layer.HardnessTID = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "app-kdv-select", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_18_listener($event) { return ctx.layer.GrainFormPrimaryTID = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "app-select", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("selectedValueChange", function StratProfileLayerModalPage_Template_app_select_selectedValueChange_23_listener($event) { return ctx.layer.GrainSizeAvg = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-kdv-select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_24_listener($event) { return ctx.layer.WetnessTID = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "ion-button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_25_listener() { return ctx.toggleShowMore(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "ion-icon", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](27, StratProfileLayerModalPage_ng_container_27_Template, 3, 3, "ng-container", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, StratProfileLayerModalPage_ng_container_28_Template, 3, 3, "ng-container", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, StratProfileLayerModalPage_ion_list_29_Template, 10, 10, "ion-list", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "ion-grid", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "ion-col", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "ion-button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_33_listener() { return ctx.ok(-1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](34, "ion-icon", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](37, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](38, "lowercase");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](39, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "ion-col", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](41, "ion-button", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_41_listener() { return ctx.ok(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](42, "ion-icon", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "ion-text");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](45, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](46, "lowercase");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](47, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](48, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "ion-col", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](50, "ion-button", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](51);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](52, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](53, StratProfileLayerModalPage_ion_row_53_Template, 6, 3, "ion-row", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 29, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 31, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 33, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.Thickness)("min", 0)("decimalPlaces", 2)("convertRatio", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.HardnessTID)("filter", ctx.hardnessFilter);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.GrainFormPrimaryTID)("filter", ctx.grainFormFilter)("getIconFunc", ctx.getIconFunc);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 35, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE"), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("selectedValue", ctx.layer.GrainSizeAvg)("options", ctx.grainSizeOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.WetnessTID)("filter", ctx.wetnessFilter);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx.showMore ? "chevron-up" : "chevron-down");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showMore);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.showMore);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showMore);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.index === 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](37, 37, "DIALOGS.PREVIOUS"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](38, 39, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](39, 41, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER")), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.canGoNext);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](45, 43, "DIALOGS.NEXT"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](46, 45, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](47, 47, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER")), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](52, 49, "DIALOGS.OK_BACK"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.addNew);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_6__.SelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonText, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__.TextCommentComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.LowerCasePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 99704:
/*!***********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-modal/strat-profile-modal.module.ts ***!
  \***********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileModalPageModule": function() { return /* binding */ StratProfileModalPageModule; }
/* harmony export */ });
/* harmony import */ var _strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./strat-profile-modal.page */ 44247);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../shared-components.module */ 22623);
/* harmony import */ var _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strat-profile-layer-modal/strat-profile-layer-modal.module */ 59070);
/* harmony import */ var _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../strat-profile-layer-history-modal/strat-profile-layer-history-modal.module */ 87386);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);





class StratProfileModalPageModule {
}
StratProfileModalPageModule.ɵfac = function StratProfileModalPageModule_Factory(t) { return new (t || StratProfileModalPageModule)(); };
StratProfileModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: StratProfileModalPageModule });
StratProfileModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerModalPageModule,
            _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__.StratProfileLayerHistoryModalPageModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](StratProfileModalPageModule, { declarations: [_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerModalPageModule,
        _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__.StratProfileLayerHistoryModalPageModule] }); })();


/***/ }),

/***/ 44247:
/*!*********************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile-modal/strat-profile-modal.page.ts ***!
  \*********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileModalPage": function() { return /* binding */ StratProfileModalPage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _strat_profile_layer_modal_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../strat-profile-layer-modal/strat-profile-layer-modal.page */ 46218);
/* harmony import */ var _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../../core/helpers/array-helper */ 99020);
/* harmony import */ var _strat_profile_layer_history_modal_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page */ 58853);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../services/registration.service */ 33181);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 50931);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! clone-deep */ 24078);
/* harmony import */ var clone_deep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../auth/services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../pipes/meters-to-cm.pipe */ 50795);
/* harmony import */ var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../pipes/kdv-description.pipe */ 46862);























function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, layer_r5.Thickness), "cm ");
} }
function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.HardnessTID, "Snow_HardnessKDV")), " ");
} }
function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.GrainFormPrimaryTID, "Snow_GrainFormKDV")), " ");
} }
function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](2, 1, layer_r5.GrainSizeAvg * 100, "1.0-2"), "mm ");
} }
function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.WetnessTID, "Snow_WetnessKDV")), " ");
} }
function StratProfileModalPage_ng_container_29_ion_item_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_ion_item_7_Template_ion_item_click_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18); const i_r6 = restoredCtx.index; const layer_r5 = restoredCtx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2); return ctx_r17.addOrEditLayer(i_r6, layer_r5); })("keyup.enter", function StratProfileModalPage_ng_container_29_ion_item_7_Template_ion_item_keyup_enter_0_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18); const i_r6 = restoredCtx.index; const layer_r5 = restoredCtx.$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2); return ctx_r19.addOrEditLayer(i_r6, layer_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_2_Template, 3, 3, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_3_Template, 4, 6, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_4_Template, 4, 6, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_5_Template, 3, 4, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_6_Template, 4, 6, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "ion-reorder", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const layer_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", layer_r5.CriticalLayerTID > 0 ? "danger" : "dark");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.Thickness !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.HardnessTID !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.GrainFormPrimaryTID !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.GrainSizeAvg !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.WetnessTID !== undefined);
} }
function StratProfileModalPage_ng_container_29_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_Template_ion_item_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r20.addLayerTop(); })("keyup.enter", function StratProfileModalPage_ng_container_29_Template_ion_item_keyup_enter_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r22.addLayerTop(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-reorder-group", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ionItemReorder", function StratProfileModalPage_ng_container_29_Template_ion_reorder_group_ionItemReorder_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r23.onLayerReorder($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, StratProfileModalPage_ng_container_29_ion_item_7_Template, 8, 6, "ion-item", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_Template_ion_item_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r24.addLayerBottom(); })("keyup.enter", function StratProfileModalPage_ng_container_29_Template_ion_item_keyup_enter_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r25.addLayerBottom(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 3, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_TOP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.profile.Layers);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](12, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_BOTTOM"));
} }
function StratProfileModalPage_ng_container_30_p_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "metersToCm");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, ctx_r26.totalThickness), " cm");
} }
function StratProfileModalPage_ng_container_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-list-header", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "ion-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "ion-text", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, StratProfileModalPage_ng_container_30_p_10_Template, 3, 3, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 3, "REGISTRATION.SUMMARY"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TOTAL_THICKNESS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.totalThickness !== undefined);
} }
function StratProfileModalPage_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-item", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_template_37_Template_ion_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r28); const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r27.addLayerBottom(); })("keyup.enter", function StratProfileModalPage_ng_template_37_Template_ion_item_keyup_enter_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r28); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](); return ctx_r29.addLayerBottom(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER"));
} }
class StratProfileModalPage {
    constructor(modalController, regobsAuthService, ngZone, registrationService, commonRegistrationService) {
        this.modalController = modalController;
        this.regobsAuthService = regobsAuthService;
        this.ngZone = ngZone;
        this.registrationService = registrationService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
    }
    get hasLayers() {
        return this.profile.Layers && this.profile.Layers.length > 0;
    }
    get profile() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.StratProfile) {
            return this.reg.request.SnowProfile2.StratProfile;
        }
        return {};
    }
    ngOnInit() {
        this.commonRegistrationService
            .getRegistrationByIdShared$(this.regId)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$))
            .subscribe((reg) => {
            this.ngZone.run(() => {
                if (!this.regInitClone) {
                    this.regInitClone = clone_deep__WEBPACK_IMPORTED_MODULE_5___default()(reg);
                }
                this.reg = reg;
                this.calculate();
            });
        });
    }
    ngOnDestroy() {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }
    ok() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.reg);
            this.modalController.dismiss();
        });
    }
    cancel() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            yield this.registrationService.saveRegistrationAsync(this.regInitClone); // Reset to inital state
            this.modalController.dismiss();
        });
    }
    addLayerTop() {
        this.addOrEditLayer(0, undefined);
    }
    addLayerBottom() {
        this.addOrEditLayer(this.hasLayers
            ? this.reg.request.SnowProfile2.StratProfile.Layers.length
            : 0, undefined);
    }
    onLayerReorder(event) {
        this.reg.request.SnowProfile2.StratProfile.Layers = _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__.ArrayHelper.reorderList(this.reg.request.SnowProfile2.StratProfile.Layers, event.detail.from, event.detail.to);
        event.detail.complete();
        this.registrationService.saveRegistrationAsync(this.reg);
    }
    getPrevousUsedLayers() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            const loggedInUser = yield this.regobsAuthService.getLoggedInUserAsPromise();
            if (loggedInUser && loggedInUser.isLoggedIn) {
                if (!this.layerModal) {
                    this.layerModal = yield this.modalController.create({
                        component: _strat_profile_layer_history_modal_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerHistoryModalPage,
                        componentProps: {
                            reg: this.reg
                        }
                    });
                    this.layerModal.present();
                    yield this.layerModal.onDidDismiss();
                    this.layerModal = null;
                    this.calculate();
                }
            }
            else {
                this.regobsAuthService.signIn();
            }
        });
    }
    addOrEditLayer(index, layer) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.layerModal) {
                this.layerModal = yield this.modalController.create({
                    component: _strat_profile_layer_modal_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerModalPage,
                    componentProps: {
                        reg: this.reg,
                        layer,
                        index
                    }
                });
                this.layerModal.present();
                yield this.layerModal.onDidDismiss();
                this.layerModal = null;
            }
        });
    }
    calculate() {
        const layers = this.profile.Layers || [];
        const sum = layers
            .filter((x) => x.Thickness !== undefined)
            .map((layer) => layer.Thickness)
            .reduce((pv, cv) => pv + cv, 0);
        this.totalThickness = sum;
    }
}
StratProfileModalPage.ɵfac = function StratProfileModalPage_Factory(t) { return new (t || StratProfileModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.RegistrationService)); };
StratProfileModalPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({ type: StratProfileModalPage, selectors: [["app-strat-profile-modal"]], inputs: { regId: "regId" }, decls: 39, vars: 24, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "dark", "name", "cloud-download", "slot", "start"], [1, "ion-text-wrap"], [4, "ngIf", "ngIfElse"], [4, "ngIf"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["noLayers", ""], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["disabled", "false", 3, "ionItemReorder"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], [3, "color"], ["slot", "end"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], ["class", "ion-no-margin", 4, "ngIf"], [1, "ion-no-margin"]], template: function StratProfileModalPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_Template_ion_button_click_3_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngSubmit", function StratProfileModalPage_Template_form_ngSubmit_10_listener() { return ctx.ok(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "ion-list", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](15, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "ion-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_Template_ion_item_click_16_listener() { return ctx.getPrevousUsedLayers(); })("keyup.enter", function StratProfileModalPage_Template_ion_item_keyup_enter_16_listener() { return ctx.getPrevousUsedLayers(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](17, "ion-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](20, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "ion-item-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "ion-label", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](24, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "ion-list-header", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "ion-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](27);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](28, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](29, StratProfileModalPage_ng_container_29_Template, 13, 7, "ng-container", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](30, StratProfileModalPage_ng_container_30_Template, 11, 7, "ng-container", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "ion-grid", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "ion-row");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "ion-col", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "ion-button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](36, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](37, StratProfileModalPage_ng_template_37_Template, 5, 3, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 10, "DIALOGS.CANCEL"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 12, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](15, 14, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.FROM_OTHER_PROFILE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](20, 16, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.OTHER_PROFILE_ITEM_TEXT"));
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](24, 18, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.OTHER_PROFILE_DESCRIPTION"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](28, 20, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasLayers)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasLayers);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](36, 22, "DIALOGS.OK"), " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonItemDivider, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonReorder, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonText], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__.MetersToCmPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"] });


/***/ }),

/***/ 78636:
/*!************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/snow-profile/strat-profile/strat-profile.component.ts ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StratProfileComponent": function() { return /* binding */ StratProfileComponent; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../core/helpers/is-empty.helper */ 69579);
/* harmony import */ var _strat_profile_modal_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strat-profile-modal/strat-profile-modal.page */ 44247);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/registration.service */ 33181);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 70325);










function StratProfileComponent_ion_text_6_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ONE_LAYER"), " ");
} }
function StratProfileComponent_ion_text_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-text");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, StratProfileComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.profile.Layers ? ctx_r0.profile.Layers.length : 0, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.profile.Layers.length === 1)("ngIfElse", _r4);
} }
function StratProfileComponent_ion_icon_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ion-icon", 6);
} }
function StratProfileComponent_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.EMPTY"), "\n");
} }
function StratProfileComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "translate");
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MULTIPLE_LAYERS"), "\n");
} }
class StratProfileComponent {
    constructor(modalContoller, registrationService) {
        this.modalContoller = modalContoller;
        this.registrationService = registrationService;
    }
    get profile() {
        if (this.reg &&
            this.reg.request &&
            this.reg.request.SnowProfile2 &&
            this.reg.request.SnowProfile2.StratProfile) {
            return this.reg.request.SnowProfile2.StratProfile;
        }
        return {};
    }
    get isEmpty() {
        return _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.profile);
    }
    ngOnInit() { }
    openModal() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.modal) {
                yield this.registrationService.saveRegistrationAsync(this.reg); // Save registration before open modal page
                this.modal = yield this.modalContoller.create({
                    component: _strat_profile_modal_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__.StratProfileModalPage,
                    componentProps: {
                        regId: this.reg.id
                    }
                });
                this.modal.present();
                yield this.modal.onDidDismiss();
                this.modal = null;
            }
        });
    }
}
StratProfileComponent.ɵfac = function StratProfileComponent_Factory(t) { return new (t || StratProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService)); };
StratProfileComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: StratProfileComponent, selectors: [["app-strat-profile"]], inputs: { reg: "reg" }, decls: 12, vars: 6, consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]], template: function StratProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StratProfileComponent_Template_ion_item_click_0_listener() { return ctx.openModal(); })("keyup.enter", function StratProfileComponent_Template_ion_item_keyup_enter_0_listener() { return ctx.openModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-label", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, StratProfileComponent_ion_text_6_Template, 3, 3, "ion-text", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, StratProfileComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, StratProfileComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, StratProfileComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 16547:
/*!*************************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/snow-profile/snow-profile.module.ts ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowProfilePageModule": function() { return /* binding */ SnowProfilePageModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _snow_profile_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snow-profile.page */ 97445);
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared-components.module */ 22623);
/* harmony import */ var _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/snow/snow-profile/compression-test/compression-test.component */ 91974);
/* harmony import */ var _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-density/snow-density.component */ 9253);
/* harmony import */ var _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-temp/snow-temp.component */ 55568);
/* harmony import */ var _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/snow/snow-profile/strat-profile/strat-profile.component */ 78636);
/* harmony import */ var _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/snow/snow-profile/strat-profile/strat-profile-modal/strat-profile-modal.module */ 99704);
/* harmony import */ var _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */ 85815);
/* harmony import */ var _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-temp/snow-temp-modal/snow-temp-modal.module */ 35692);
/* harmony import */ var _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-density/snow-density-modal/snow-density-modal.module */ 17952);
/* harmony import */ var _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/snow/snow-profile/compression-test/compression-test-list-modal/compression-test-list-modal.module */ 13617);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);







// tslint:disable-next-line:max-line-length



// tslint:disable-next-line:max-line-length

// tslint:disable-next-line:max-line-length



const routes = [
    {
        path: '',
        component: _snow_profile_page__WEBPACK_IMPORTED_MODULE_0__.SnowProfilePage
    }
];
class SnowProfilePageModule {
}
SnowProfilePageModule.ɵfac = function SnowProfilePageModule_Factory(t) { return new (t || SnowProfilePageModule)(); };
SnowProfilePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: SnowProfilePageModule });
SnowProfilePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
            _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__.StratProfileModalPageModule,
            _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__.SnowTempModalPageModule,
            _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__.SnowDensityModalPageModule,
            _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__.CompressionTestListModalPageModule,
            _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__.FullscreenImageModalPageModule,
            _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild(routes)
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](SnowProfilePageModule, { declarations: [_snow_profile_page__WEBPACK_IMPORTED_MODULE_0__.SnowProfilePage,
        _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_2__.CompressionTestComponent,
        _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_3__.SnowDensityComponent,
        _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_4__.SnowTempComponent,
        _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_5__.StratProfileComponent], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule,
        _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__.StratProfileModalPageModule,
        _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__.SnowTempModalPageModule,
        _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__.SnowDensityModalPageModule,
        _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__.CompressionTestListModalPageModule,
        _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule] }); })();


/***/ }),

/***/ 97445:
/*!***********************************************************************************!*\
  !*** ./src/app/modules/registration/pages/snow/snow-profile/snow-profile.page.ts ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SnowProfilePage": function() { return /* binding */ SnowProfilePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../base.page */ 81877);
/* harmony import */ var _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page */ 93675);
/* harmony import */ var _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../core/helpers/data-url.helper */ 78872);
/* harmony import */ var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../core/services/user-setting/user-setting.service */ 22276);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../settings */ 30015);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! rxjs/operators */ 34864);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/logging/logging.service */ 93042);
/* harmony import */ var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @varsom-regobs-common/core */ 36714);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/directives/header-color/header-color.directive */ 17486);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */ 51535);
/* harmony import */ var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../components/yes-no-select/yes-no-select.component */ 99736);
/* harmony import */ var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/text-comment/text-comment.component */ 32032);
/* harmony import */ var _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../components/snow/snow-profile/strat-profile/strat-profile.component */ 78636);
/* harmony import */ var _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-temp/snow-temp.component */ 55568);
/* harmony import */ var _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/snow/snow-profile/snow-density/snow-density.component */ 9253);
/* harmony import */ var _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../components/snow/snow-profile/compression-test/compression-test.component */ 91974);
/* harmony import */ var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../components/add-picture-item/add-picture-item.component */ 26869);


































function SnowProfilePage_app_registration_content_wrapper_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("reset", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](); return ctx_r1.reset(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "app-yes-no-select", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("valueChange", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_6_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](); return ctx_r3.registration.request.SnowProfile2.IsProfileToGround = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "app-text-comment", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("valueChange", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2); const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](); return ctx_r4.registration.request.SnowProfile2.Comment = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](12, "app-strat-profile", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](13, "app-snow-temp", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](14, "app-snow-density", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](15, "app-compression-test", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](16, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](17, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](20, "ion-item", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function SnowProfilePage_app_registration_content_wrapper_8_Template_ion_item_click_20_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](); return ctx_r5.openPreview(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](21, "ion-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](22, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](25, "ion-list-header", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](26, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](28, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](29, "app-add-picture-item", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 18, "REGISTRATION.SNOW.SNOW_PROFILE.SUPERIOR"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowProfile2.IsProfileToGround);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowProfile2.Comment);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](11, 20, "REGISTRATION.SNOW.SNOW_PROFILE.SUBFORMS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](19, 22, "REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.isEmpty());
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](24, 24, "REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ITEM"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](28, 26, "REGISTRATION.IMAGES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
} }
const DEBUG_TAG = 'SnowProfilePage';
class SnowProfilePage extends _base_page__WEBPACK_IMPORTED_MODULE_2__.BasePage {
    constructor(basePageService, activatedRoute, httpClient, modalController, loadingController, toastController, translateService, userSettingService, loggingService) {
        super(src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2, basePageService, activatedRoute);
        this.httpClient = httpClient;
        this.modalController = modalController;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.translateService = translateService;
        this.userSettingService = userSettingService;
        this.loggingService = loggingService;
        this.expositionOptions = [
            { id: 0, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH' },
            { id: 1, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_EAST' },
            { id: 2, text: 'REGISTRATION.SNOW.SNOW_PROFILE.EAST' },
            { id: 3, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_EAST' },
            { id: 4, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH' },
            { id: 5, text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_WEST' },
            { id: 6, text: 'REGISTRATION.SNOW.SNOW_PROFILE.WEST' },
            { id: 7, text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_WEST' }
        ];
    }
    onInit() { }
    isEmpty() {
        const isEmptyResult = (0,_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_18__.isEmpty)(this.registration.request.SnowProfile2) &&
            !(this.registration.request.CompressionTest || []).some((ct) => ct.IncludeInSnowProfile === true);
        return Promise.resolve(isEmptyResult);
    }
    openPreview() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            this.translateService
                .get('REGISTRATION.SNOW.SNOW_PROFILE.GENERATING_PREVIEW')
                .subscribe((message) => (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
                const loader = yield this.loadingController.create({
                    message,
                    backdropDismiss: true // enable cancel
                });
                yield loader.present();
                const userSetting = yield this.userSettingService.userSetting$
                    .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.take)(1))
                    .toPromise();
                const format = 5; // Mobile profile plot
                const size = 400;
                const subscription = this.getPlotFromApiWithFallback(userSetting, format, size).subscribe((result) => {
                    this.openImageModal(result);
                    this.loadingController.dismiss();
                }, (err) => {
                    this.loadingController.dismiss();
                    this.showPreviewError();
                });
                yield loader.onDidDismiss();
                subscription.unsubscribe();
            }));
        });
    }
    getPlotFromApiWithFallback(userSetting, format, size) {
        return this.getPlotFromApi(userSetting, format, size).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.catchError)((error) => {
            this.loggingService.debug('Could not generate plot', DEBUG_TAG);
            if (format === 5) {
                this.loggingService.debug('Fallback to BareSimpleProfile', DEBUG_TAG);
                return this.getPlotFromApi(userSetting, 4, size); // fallback to BareSimpleProfile when mobile plot failed
            }
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_22__.of)(null);
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.switchMap)((result) => (0,rxjs__WEBPACK_IMPORTED_MODULE_24__.from)(_core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.toDataUrl(result, 'image/png'))));
    }
    getPlotFromApi(userSetting, format, size) {
        const rootUrl = _settings__WEBPACK_IMPORTED_MODULE_6__.settings.services.regObs.apiUrl[userSetting.appMode];
        return this.httpClient.post(`${rootUrl}/Registration/PlotPreviewPng?format=${format}` +
            `&height=${size}&width=${size}&langKey=${userSetting.language}`, this.registration.request, {
            responseType: 'blob'
        });
    }
    hasAnyTempLayers() {
        return (this.registration.request.SnowProfile2 &&
            this.registration.request.SnowProfile2.SnowTemp &&
            this.registration.request.SnowProfile2.SnowTemp.Layers &&
            this.registration.request.SnowProfile2.SnowTemp.Layers.some((x) => x.SnowTemp < 0));
    }
    showPreviewError() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            this.translateService
                .get('REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ERROR')
                .subscribe((message) => (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
                const toast = yield this.toastController.create({
                    message: message,
                    mode: 'md',
                    duration: 2000
                });
                toast.present();
            }));
        });
    }
    openImageModal(src) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPage,
                componentProps: {
                    imgSrc: src
                }
            });
            modal.present();
        });
    }
}
SnowProfilePage.ɵfac = function SnowProfilePage_Factory(t) { return new (t || SnowProfilePage)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_25__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_26__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService)); };
SnowProfilePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({ type: SnowProfilePage, selectors: [["app-snow-profile"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]], decls: 9, vars: 4, consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.IS_PROFILE_TO_GROUND", 3, "value", "valueChange"], ["title", "DIALOGS.COMMENT", 3, "value", "valueChange"], [3, "reg"], [3, "disabled", "click"], ["name", "eye", "color", "dark", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]], template: function SnowProfilePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "ion-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "ion-toolbar", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-buttons", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](3, "ion-back-button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "ion-title");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](6, "translate");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, SnowProfilePage_app_registration_content_wrapper_8_Template, 30, 28, "app-registration-content-wrapper", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.SNOW_PROFILE.TITLE"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.SnowProfile2);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_8__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_9__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonLabel, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_10__.YesNoSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__.TextCommentComponent, _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_12__.StratProfileComponent, _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_13__.SnowTempComponent, _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_14__.SnowDensityComponent, _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_15__.CompressionTestComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_16__.AddPictureItemComponent], pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXByb2ZpbGUucGFnZS5zY3NzIn0= */"] });


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19zbm93X3Nub3ctcHJvZmlsZV9zbm93LXByb2ZpbGVfbW9kdWxlX3RzLWVzMjAxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErQztBQUV4QyxNQUFNLGVBQWU7SUFDMUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUEyQyxJQUFHLENBQUM7SUFFOUQsTUFBTSxDQUFDLGdCQUFnQixDQUNyQixVQUFrQixFQUNsQixTQUFpQixFQUNqQixjQUFzQixFQUN0QixtQkFBMkI7UUFFM0IsSUFDRSxDQUFDLGtFQUFzQixDQUFDLG1CQUFtQixDQUFDO1lBQzVDLG1CQUFtQixJQUFJLENBQUMsRUFDeEI7WUFDQSxPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsTUFBTSxDQUFDLEdBQUcsbUJBQW1CLEdBQUcsR0FBRyxDQUFDO1FBQ3BDLE1BQU0sV0FBVyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNwQixPQUFPLENBQUMsQ0FBQztTQUNWO1FBQ0QsTUFBTSxhQUFhLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLGFBQWEsSUFBSSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxDQUFDLENBQUM7U0FDVjtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDL0MsT0FBTyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNLENBQUMsd0JBQXdCLENBQUMsT0FBZSxFQUFFLGFBQXFCO1FBQ3BFLElBQ0Usa0VBQXNCLENBQUMsT0FBTyxDQUFDO1lBQy9CLGtFQUFzQixDQUFDLGFBQWEsQ0FBQztZQUNyQyxPQUFPLEdBQUcsQ0FBQztZQUNYLGFBQWEsR0FBRyxDQUFDLEVB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SyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7Z0JBQzlDLFNBQVMsRUFBRSwySEFBd0I7Z0JBQ25DLGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsR0FBRztpQkFDWjthQUNGLENBQUMsQ0FBQztZQUNILEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQixDQUFDO0tBQUE7OzhFQXhJVSxlQUFlOzhHQUFmLGVBQWU7UUMvQjVCLDhFQUFZO1FBQ1Ysa0ZBQXVDO1FBQ3JDLGtGQUEwQjtRQUN4QixpRkFBMkQ7UUFDN0QsNkRBQWM7UUFDZCw2RUFBVztRQUNULHdEQUNGOztRQUFBLDZEQUFZO1FBQ2QsNkRBQWM7UUFDaEIsNkRBQWE7UUFFYiwrRUFBYTtRQUNYLHdLQW1EbUM7UUFDckMsNkRBQWM7O1FBMURSLDJEQUNGO1FBREUscUxBQ0Y7UUFLaUMsMkRBQXVEO1FBQXZELDRIQUF1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWDdDO0FBQ0Y7QUFDQTtBQUM0Qjs7QUFPbEUsTUFBTSw4QkFBOEI7OzRHQUE5Qiw4QkFBOEI7MkhBQTlCLDhCQUE4QjsrSEFKaEMsQ0FBQyx5REFBWSxFQUFFLHVEQUFXLEVBQUUsdURBQVcsQ0FBQzttSUFJdEMsOEJBQThCLG1CQUgxQixrRkFBd0IsYUFEN0IseURBQVksRUFBRSx1REFBVyxFQUFFLHVEQUFXIiwic291cmNlcyI6WyIuL3NyYy9hcHAvY29yZS9oZWxwZXJzL2h5ZHJvbG9neS1oZWxwZXIudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL2NvbXByZXNzaW9uLXRlc3QvY29tcHJlc3Npb24tdGVzdC5jb21wb25lbnQuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwvc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwvc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsL3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LW1vZGFsL3Nub3ctZGVuc2l0eS1tb2RhbC5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LW1vZGFsL3Nub3ctZGVuc2l0eS1tb2RhbC5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS1tb2RhbC9zbm93LWRlbnNpdHktbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS5jb21wb25lbnQudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1sYXllci1tb2RhbC9zbm93LXRlbXAtbGF5ZXItbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1sYXllci1tb2RhbC9zbm93LXRlbXAtbGF5ZXItbW9kYWwucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAtbGF5ZXItbW9kYWwvc25vdy10ZW1wLWxheWVyLW1vZGFsLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAtbW9kYWwvc25vdy10ZW1wLW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAtbW9kYWwvc25vdy10ZW1wLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLW1vZGFsL3Nub3ctdGVtcC1tb2RhbC5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLmNvbXBvbmVudC50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAuY29tcG9uZW50Lmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwubW9kdWxlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwucGFnZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS1tb2RhbC9zdHJhdC1wcm9maWxlLW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS1tb2RhbC9zdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbW9kYWwvc3RyYXQtcHJvZmlsZS1tb2RhbC5wYWdlLmh0bWwiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUuY29tcG9uZW50LnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLmNvbXBvbmVudC5odG1sIiwiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctcHJvZmlsZS5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1wcm9maWxlLnBhZ2UudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1wcm9maWxlLnBhZ2UuaHRtbCIsIi4vc3JjL2FwcC9wYWdlcy9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE51bWJlckhlbHBlciB9IGZyb20gJy4vbnVtYmVyLWhlbHBlcic7XHJcblxyXG5leHBvcnQgY2xhc3MgSHlkcm9sb2d5SGVscGVyIHtcclxuICBzdGF0aWMgaXNFbXB0eShvYmo6IE9iamVjdCB8IEFycmF5PE9iamVjdCB8IEFycmF5PE9iamVjdD4+KSB7fVxyXG5cclxuICBzdGF0aWMgY2FsY3VsYXRlRGVuc2l0eShcclxuICAgIHdlaWdodEluS2c6IG51bWJlcixcclxuICAgIGhlaWdodEluTTogbnVtYmVyLFxyXG4gICAgdGFyZVdlaWdodEluS2c6IG51bWJlcixcclxuICAgIGN5bGluZGVyRGlhbWV0ZXJJbk06IG51bWJlclxyXG4gICkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhTnVtYmVySGVscGVyLmlzTnVtZXJpYyhjeWxpbmRlckRpYW1ldGVySW5NKSB8fFxyXG4gICAgICBjeWxpbmRlckRpYW1ldGVySW5NIDw9IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHIgPSBjeWxpbmRlckRpYW1ldGVySW5NIC8gMi4wO1xyXG4gICAgY29uc3QgdG90YWxXZWlnaHQgPSAod2VpZ2h0SW5LZyB8fCAwKSAtICh0YXJlV2VpZ2h0SW5LZyB8fCAwKTtcclxuICAgIGlmICh0b3RhbFdlaWdodCA8PSAwKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGVpZ2h0SW5NZXRlciA9IGhlaWdodEluTSB8fCAwO1xyXG4gICAgaWYgKGhlaWdodEluTWV0ZXIgPD0gMCkge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGNvbnN0IHZvbHVtZSA9IE1hdGguUEkgKiByICogciAqIGhlaWdodEluTWV0ZXI7XHJcbiAgICByZXR1cm4gdG90YWxXZWlnaHQgLyB2b2x1bWU7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY2FsY3VsYXRlV2F0ZXJFcXVpdmFsZW50KGRlbnNpdHk6IG51bWJlciwgaGVpZ2h0SW5NZXRlcjogbnVtYmVyKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIE51bWJlckhlbHBlci5pc051bWVyaWMoZGVuc2l0eSkgJiZcclxuICAgICAgTnVtYmVySGVscGVyLmlzTnVtZXJpYyhoZWlnaHRJbk1ldGVyKSAmJlxyXG4gICAgICBkZW5zaXR5ID4gMCAmJlxyXG4gICAgICBoZWlnaHRJbk1ldGVyID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiAoZGVuc2l0eSAvIDEwMDApICogKGhlaWdodEluTWV0ZXIgKiAxMDAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RMaXN0TW9kYWxQYWdlIH0gZnJvbSAnLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2VNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0NvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0NvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wcmVzc2lvblRlc3RMaXN0TW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcHJlc3Npb25UZXN0RWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2Nsb25lLWRlZXAnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcmVnSWQ6IHN0cmluZztcclxuXHJcbiAgcHJpdmF0ZSBuZ0Rlc3Ryb3kkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICBwcml2YXRlIGluaXRpYWxSZWdpc3RyYXRpb25DbG9uZTogSVJlZ2lzdHJhdGlvbjtcclxuICByZWc6IElSZWdpc3RyYXRpb247XHJcblxyXG4gIHNldCB0ZXN0cyh2YWw6IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbFtdKSB7XHJcbiAgICB0aGlzLnJlZy5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCA9IHZhbDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgICAgIC5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCh0aGlzLnJlZ0lkKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgocmVnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmUgPSBjbG9uZURlZXAocmVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucmVnID0gcmVnO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLnJlZy5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZSgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgb2soKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjYW5jZWwoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKFxyXG4gICAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZVxyXG4gICAgKTtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkNPTVBSRVNTSU9OX1RFU1QuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlZyAmJiByZWcucmVxdWVzdCAmJiByZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3RcIj5cclxuICAgICAgPGFwcC1jb21wcmVzc2lvbi10ZXN0LWxpc3QgWyh0ZXN0cyldPVwicmVnLnJlcXVlc3QuQ29tcHJlc3Npb25UZXN0XCIgKHRlc3RzQ2hhbmdlKT1cInNhdmUoKVwiXHJcbiAgICAgICAgW2luY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0XT1cInRydWVcIj5cclxuICAgICAgPC9hcHAtY29tcHJlc3Npb24tdGVzdC1saXN0PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICB7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2UgfSBmcm9tICcuL2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb21wcmVzc2lvbi10ZXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29tcHJlc3Npb24tdGVzdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wcmVzc2lvblRlc3RDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIHJlZzogSVJlZ2lzdHJhdGlvbjtcclxuICBwcml2YXRlIGNvbXByZXNzaW9uVGVzdExpc3RNb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcclxuXHJcbiAgZ2V0IGNvbm5lY3RlZFRlc3RzKCk6IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbFtdIHtcclxuICAgIHJldHVybiB0aGlzLnRlc3RzLmZpbHRlcigodCkgPT4gdC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9PT0gdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgdGVzdHMoKTogQ29tcHJlc3Npb25UZXN0RWRpdE1vZGVsW10ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnLnJlcXVlc3QuQ29tcHJlc3Npb25UZXN0IHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0ZWRUZXN0cy5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250b2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgb3Blbk1vZGFsKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLmNvbXByZXNzaW9uVGVzdExpc3RNb2RhbCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnKTsgLy8gU2F2ZSByZWdpc3RyYXRpb24gYmVmb3JlIG9wZW4gbW9kYWwgcGFnZVxyXG4gICAgICB0aGlzLmNvbXByZXNzaW9uVGVzdExpc3RNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250b2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIHJlZ0lkOiB0aGlzLnJlZy5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0TGlzdE1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgYXdhaXQgdGhpcy5jb21wcmVzc2lvblRlc3RMaXN0TW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0TGlzdE1vZGFsID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwic3VtbWFyeS1pdGVtXCIgKGNsaWNrKT1cIm9wZW5Nb2RhbCgpXCIgKGtleXVwLmVudGVyKT1cIm9wZW5Nb2RhbCgpXCI+XHJcbiAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi1wYWRkaW5nLXZlcnRpY2FsIGlvbi1wYWRkaW5nLWVuZFwiPlxyXG4gICAgPGgyPnt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuQ09NUFJFU1NJT05fVEVTVC5USVRMRScgfCB0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICA8cD5cclxuICAgICAgPGlvbi10ZXh0PlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIodGVzdHMgJiYgdGVzdHMubGVuZ3RoID4gMCkgZWxzZSBlbXB0eVwiPlxyXG4gICAgICAgICAge3sgY29ubmVjdGVkVGVzdHMubGVuZ3RoICB9fSAvIHt7IHRlc3RzLmxlbmd0aCAgfX1cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuQ09NUFJFU1NJT05fVEVTVC5NVUxUSVBMRV9URVNUUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5DT01QUkVTU0lPTl9URVNULkFUVEFDSEVEJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICA8L3A+XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1pY29uICpuZ0lmPVwiIWlzRW1wdHlcIiBzbG90PVwiZW5kXCIgY29sb3I9XCJzdWNjZXNzXCIgbmFtZT1cImNoZWNrbWFyay1jaXJjbGVcIj48L2lvbi1pY29uPlxyXG48L2lvbi1pdGVtPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5DT01QUkVTU0lPTl9URVNULkVNUFRZJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZSB9IGZyb20gJy4vc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Nub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1Nub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TGF5ZXJNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgSHlkcm9sb2d5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2h5ZHJvbG9neS1oZWxwZXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnY2xvbmUtZGVlcCc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJlZzogSVJlZ2lzdHJhdGlvbjtcclxuICBASW5wdXQoKSBsYXllcjogU25vd0RlbnNpdHlMYXllck1vZGVsO1xyXG4gIEBJbnB1dCgpIHVzZUN5bGluZGVyID0gdHJ1ZTtcclxuICBASW5wdXQoKSBjeWxpbmRlckRpYW1ldGVySW5NOiBudW1iZXI7XHJcbiAgQElucHV0KCkgdGFyZVdlaWdodDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XHJcbiAgYWRkTmV3OiBib29sZWFuO1xyXG4gIHByaXZhdGUgaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uU3RhdGUgPSBjbG9uZURlZXAodGhpcy5yZWcpO1xyXG4gICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExheWVyKCkge1xyXG4gICAgdGhpcy5hZGROZXcgPSB0aGlzLmxheWVyID09PSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodGhpcy5hZGROZXcpIHtcclxuICAgICAgdGhpcy5sYXllciA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYWxjdWxhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldCBsYXllckxlbmdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhhc0xheWVyc1xyXG4gICAgICA/IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycy5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbkdvTmV4dCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLmhhc0xheWVycyAmJiB0aGlzLmluZGV4IDwgdGhpcy5sYXllckxlbmdodCkgfHxcclxuICAgICAgKHRoaXMuaW5kZXggPT09IHRoaXMubGF5ZXJMZW5naHQgJiZcclxuICAgICAgICB0aGlzLmFkZE5ldyAmJlxyXG4gICAgICAgICF0aGlzLmlzRW1wdHkodGhpcy5sYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0VtcHR5KHNub3dEZW5zaXR5TGF5ZXI6IFNub3dEZW5zaXR5TGF5ZXJNb2RlbCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlQ3lsaW5kZXJcclxuICAgICAgPyBzbm93RGVuc2l0eUxheWVyLlRoaWNrbmVzcyA9PT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICBzbm93RGVuc2l0eUxheWVyLldlaWdodCA9PT0gdW5kZWZpbmVkXHJcbiAgICAgIDogc25vd0RlbnNpdHlMYXllci5EZW5zaXR5ID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvayhnb3RvSW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHkpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHkgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycyA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYWRkTmV3ICYmICF0aGlzLmlzRW1wdHkodGhpcy5sYXllcikpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzLnNwbGljZShcclxuICAgICAgICB0aGlzLmluZGV4LFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5sYXllclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7XHJcblxyXG4gICAgaWYgKGdvdG9JbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICsgZ290b0luZGV4O1xyXG4gICAgICB0aGlzLmxheWVyID0gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzW1xyXG4gICAgICAgIHRoaXMuaW5kZXhcclxuICAgICAgXTtcclxuICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMoXHJcbiAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlXHJcbiAgICApO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5Lmxlbmd0aCA+IDAgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzID0gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzLmZpbHRlcihcclxuICAgICAgICAobCkgPT4gbCAhPT0gdGhpcy5sYXllclxyXG4gICAgICApO1xyXG4gICAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnKTtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLnVzZUN5bGluZGVyKSB7XHJcbiAgICAgIHRoaXMubGF5ZXIuRGVuc2l0eSA9IEh5ZHJvbG9neUhlbHBlci5jYWxjdWxhdGVEZW5zaXR5KFxyXG4gICAgICAgIHRoaXMubGF5ZXIuV2VpZ2h0LFxyXG4gICAgICAgIHRoaXMubGF5ZXIuVGhpY2tuZXNzLFxyXG4gICAgICAgIHRoaXMudGFyZVdlaWdodCxcclxuICAgICAgICB0aGlzLmN5bGluZGVyRGlhbWV0ZXJJbk1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFdhdGVyRXF1aXZhbGVudChkZW5zaXR5OiBudW1iZXIsIGRlcHRoOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBIeWRyb2xvZ3lIZWxwZXIuY2FsY3VsYXRlV2F0ZXJFcXVpdmFsZW50KGRlbnNpdHksIGRlcHRoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxmb3JtIChuZ1N1Ym1pdCk9XCJvaygpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ1c2VDeWxpbmRlciBlbHNlIG5vQ3lsaW5kZXJcIj5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuVGhpY2tuZXNzXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLkhFSUdIVFwiXHJcbiAgICAgICAgICBbbWF4XT1cIjk5OVwiIFttaW5dPVwiMFwiIHN1ZmZpeD1cImNtXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiICh2YWx1ZUNoYW5nZSk9XCJjYWxjdWxhdGUoKVwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCI+XHJcbiAgICAgICAgPC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuV2VpZ2h0XCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLldFSUdIVFwiXHJcbiAgICAgICAgICBbbWF4XT1cIjk5OTlcIiBbbWluXT1cIjBcIiBbY29udmVydFJhdGlvXT1cIjEwMDBcIiBzdWZmaXg9XCJnXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiICh2YWx1ZUNoYW5nZSk9XCJjYWxjdWxhdGUoKVwiPlxyXG4gICAgICAgIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgICAgPGlvbi1pdGVtPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIiBjb2xvcj1cIm1lZGl1bVwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsYXllci5EZW5zaXR5XCI+e3sgbGF5ZXIuRGVuc2l0eSB8IG51bWJlcjonMS4wLTInIH19IGtnL23CszwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDxpb24taXRlbT5cclxuICAgICAgICAgIDxpb24tbGFiZWwgcG9zaXRpb249XCJzdGFja2VkXCIgY29sb3I9XCJtZWRpdW1cIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLldBVEVSX0VRVUlWQUxFTlQnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi10ZXh0IGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtc3RhcnRcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkRlbnNpdHkgJiYgbGF5ZXIuVGhpY2tuZXNzXCI+XHJcbiAgICAgICAgICAgICAge3sgZ2V0V2F0ZXJFcXVpdmFsZW50KGxheWVyLkRlbnNpdHksIGxheWVyLlRoaWNrbmVzcykgfCBudW1iZXI6JzEuMC0yJyB9fSBtbTwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cImluZGV4ID09PSAwXCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwib3V0bGluZVwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvaygtMSlcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJhcnJvdy1iYWNrXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgPGlvbi10ZXh0Pnt7ICdESUFMT0dTLlBSRVZJT1VTJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiIWNhbkdvTmV4dFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soMSlcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiYXJyb3ctZm9yd2FyZFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpb24tdGV4dD57eyAnRElBTE9HUy5ORVhUJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cInNvbGlkXCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgIHt7ICdESUFMT0dTLk9LX0JBQ0snIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93ICpuZ0lmPVwiIWFkZE5ld1wiPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImRlbGV0ZSgpXCIgc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgZXhwYW5kPVwiYmxvY2tcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0cmFzaFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIHt7ICdESUFMT0dTLkRFTEVURScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9mb3JtPlxyXG48L2lvbi1jb250ZW50PlxyXG48bmctdGVtcGxhdGUgI25vQ3lsaW5kZXI+XHJcbiAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLlRoaWNrbmVzc1wiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5IRUlHSFRcIiBbbWF4XT1cIjk5OVwiXHJcbiAgICBbbWluXT1cIjBcIiBzdWZmaXg9XCJjbVwiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIiAodmFsdWVDaGFuZ2UpPVwiY2FsY3VsYXRlKClcIiBbY29udmVydFJhdGlvXT1cIjEwMFwiPlxyXG4gIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLkRlbnNpdHlcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuREVOU0lUWVwiIFttYXhdPVwiOTk5OVwiXHJcbiAgICBbbWluXT1cIjBcIiBzdWZmaXg9XCJrZy9twrNcIiBbZGVjaW1hbFBsYWNlc109XCIzXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eU1vZGFsUGFnZSB9IGZyb20gJy4vc25vdy1kZW5zaXR5LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFNub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2VNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Nub3dEZW5zaXR5TW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTbm93RGVuc2l0eU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dEZW5zaXR5TW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eUxheWVyTW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2UgfSBmcm9tICcuLi9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwvc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJdGVtUmVvcmRlckV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBBcnJheUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9hcnJheS1oZWxwZXInO1xyXG5pbXBvcnQgeyBIeWRyb2xvZ3lIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaHlkcm9sb2d5LWhlbHBlcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnY2xvbmUtZGVlcCc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LWRlbnNpdHktbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LWRlbnNpdHktbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zbm93LWRlbnNpdHktbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dEZW5zaXR5TW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHJlZ0lkOiBzdHJpbmc7XHJcbiAgdXNlQ3lsaW5kZXI6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBsYXllck1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSByZWc6IElSZWdpc3RyYXRpb247XHJcbiAgcHJpdmF0ZSBpbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmU6IElSZWdpc3RyYXRpb247XHJcblxyXG4gIGdldCBwcm9maWxlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5Lmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzTGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5wcm9maWxlICYmIHRoaXMucHJvZmlsZS5MYXllcnMgJiYgdGhpcy5wcm9maWxlLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICAgICAgLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKHRoaXMucmVnSWQpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWcpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSA9IGNsb25lRGVlcChyZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yZWcgPSByZWc7XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnVzZUN5bGluZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VDeWxpbmRlciA9XHJcbiAgICAgICAgICAgICAgISF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5DeWxpbmRlckRpYW1ldGVyIHx8XHJcbiAgICAgICAgICAgICAgISF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5UYXJlV2VpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzLmxlbmd0aCA9PT1cclxuICAgICAgICAgICAgICAgIDAgfHxcclxuICAgICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMuc29tZShcclxuICAgICAgICAgICAgICAgIChsKSA9PiAhIWwuV2VpZ2h0XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh0aGlzLnByb2ZpbGUpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhcclxuICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmVcclxuICAgICk7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhZGRMYXllclRvcCgpIHtcclxuICAgIHRoaXMuYWRkT3JFZGl0TGF5ZXIoMCwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGFkZExheWVyQm90dG9tKCkge1xyXG4gICAgdGhpcy5hZGRPckVkaXRMYXllcihcclxuICAgICAgdGhpcy5oYXNMYXllcnMgPyB0aGlzLnByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA6IDAsXHJcbiAgICAgIHVuZGVmaW5lZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdExheWVyKGluZGV4OiBudW1iZXIsIGxheWVyOiBTbm93RGVuc2l0eUxheWVyTW9kZWwpIHtcclxuICAgIGlmICghdGhpcy5sYXllck1vZGFsKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWc6IHRoaXMucmVnLFxyXG4gICAgICAgICAgbGF5ZXI6IGxheWVyLFxyXG4gICAgICAgICAgdXNlQ3lsaW5kZXI6IHRoaXMudXNlQ3lsaW5kZXIsXHJcbiAgICAgICAgICBjeWxpbmRlckRpYW1ldGVySW5NOiB0aGlzLnByb2ZpbGUuQ3lsaW5kZXJEaWFtZXRlcixcclxuICAgICAgICAgIHRhcmVXZWlnaHQ6IHRoaXMucHJvZmlsZS5UYXJlV2VpZ2h0LFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmxheWVyTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IG51bGw7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTGF5ZXJSZW9yZGVyKGV2ZW50OiBDdXN0b21FdmVudDxJdGVtUmVvcmRlckV2ZW50RGV0YWlsPikge1xyXG4gICAgdGhpcy5wcm9maWxlLkxheWVycyA9IEFycmF5SGVscGVyLnJlb3JkZXJMaXN0KFxyXG4gICAgICB0aGlzLnByb2ZpbGUuTGF5ZXJzLFxyXG4gICAgICBldmVudC5kZXRhaWwuZnJvbSxcclxuICAgICAgZXZlbnQuZGV0YWlsLnRvXHJcbiAgICApO1xyXG4gICAgZXZlbnQuZGV0YWlsLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICByZWNhbGN1bGF0ZUxheWVycygpIHtcclxuICAgIGlmICh0aGlzLnVzZUN5bGluZGVyICYmIHRoaXMuaGFzTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMucHJvZmlsZS5MYXllcnMuZm9yRWFjaCgobGF5ZXI6IFNub3dEZW5zaXR5TGF5ZXJNb2RlbCkgPT4ge1xyXG4gICAgICAgIGxheWVyLkRlbnNpdHkgPSBIeWRyb2xvZ3lIZWxwZXIuY2FsY3VsYXRlRGVuc2l0eShcclxuICAgICAgICAgIGxheWVyLldlaWdodCxcclxuICAgICAgICAgIGxheWVyLlRoaWNrbmVzcyxcclxuICAgICAgICAgIHRoaXMucHJvZmlsZS5UYXJlV2VpZ2h0LFxyXG4gICAgICAgICAgdGhpcy5wcm9maWxlLkN5bGluZGVyRGlhbWV0ZXJcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHJlY2FsY3VsYXRlTGF5ZXJzQW5kU2F2ZSgpIHtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2F0ZXJFcXVpdmFsZW50KGRlbnNpdHk6IG51bWJlciwgZGVwdGg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIEh5ZHJvbG9neUhlbHBlci5jYWxjdWxhdGVXYXRlckVxdWl2YWxlbnQoZGVuc2l0eSwgZGVwdGgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGZvcm0gKG5nU3VibWl0KT1cIm9rKClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5NRVRIT0QnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5DWUxJTkRFUl9NRVRIT0QnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRvZ2dsZSBzbG90PVwiZW5kXCIgWyhuZ01vZGVsKV09XCJ1c2VDeWxpbmRlclwiIG5hbWU9XCJ1c2VDeWxpbmRlclwiPjwvaW9uLXRvZ2dsZT5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInVzZUN5bGluZGVyXCI+XHJcbiAgICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuQ1lMSU5ERVInIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicHJvZmlsZS5DeWxpbmRlckRpYW1ldGVyXCJcclxuICAgICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5DWUxJTkRFUl9ESUFNRVRFUlwiIFttYXhdPVwiOTk5XCIgW21pbl09XCIwXCIgc3VmZml4PVwiY21cIlxyXG4gICAgICAgICAgW2RlY2ltYWxQbGFjZXNdPVwiMlwiICh2YWx1ZUNoYW5nZSk9XCJyZWNhbGN1bGF0ZUxheWVyc0FuZFNhdmUoKVwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicHJvZmlsZS5UYXJlV2VpZ2h0XCIgKHZhbHVlQ2hhbmdlKT1cInJlY2FsY3VsYXRlTGF5ZXJzQW5kU2F2ZSgpXCJcclxuICAgICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5UQVJFX1dFSUdIVFwiIFttYXhdPVwiOTk5XCIgW21pbl09XCIwXCIgc3VmZml4PVwiZ1wiXHJcbiAgICAgICAgICBbZGVjaW1hbFBsYWNlc109XCIyXCIgW2NvbnZlcnRSYXRpb109XCIxMDAwXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuTEFZRVInIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzTGF5ZXJzIGVsc2Ugbm9MYXllcnNcIj5cclxuICAgICAgICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZExheWVyVG9wKClcIiAoa2V5dXAuZW50ZXIpPVwiYWRkTGF5ZXJUb3AoKVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5BRERfTEFZRVJfVE9QJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgICA8aW9uLXJlb3JkZXItZ3JvdXAgZGlzYWJsZWQ9XCJmYWxzZVwiIChpb25JdGVtUmVvcmRlcik9XCJvbkxheWVyUmVvcmRlcigkZXZlbnQpXCI+XHJcbiAgICAgICAgICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZE9yRWRpdExheWVyKGksIGxheWVyKVwiIChrZXl1cC5lbnRlcik9XCJhZGRPckVkaXRMYXllcihpLCBsYXllcilcIlxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbGF5ZXIgb2YgcHJvZmlsZS5MYXllcnM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgICAgICA8aW9uLXRleHQgKm5nSWY9XCJsYXllci5UaGlja25lc3MgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5UaGlja25lc3MgfCBtZXRlcnNUb0NtIH19Y21cclxuICAgICAgICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgICAgICAgIDxpb24tdGV4dCAqbmdJZj1cImxheWVyLldlaWdodCAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICB7e2xheWVyLldlaWdodCAqIDEwMDAgfX1nXHJcbiAgICAgICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICAgICAgICA8aW9uLXRleHQgKm5nSWY9XCJsYXllci5EZW5zaXR5ICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAgICAgIHt7IGxheWVyLkRlbnNpdHkgfCBudW1iZXI6JzEuMC0yJyB9fWtnL23Cs1xyXG4gICAgICAgICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgICAgICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwidXNlQ3lsaW5kZXIgJiYgbGF5ZXIuRGVuc2l0eSAhPT0gdW5kZWZpbmVkICYmIGxheWVyLlRoaWNrbmVzcyAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICAoe3sgZ2V0V2F0ZXJFcXVpdmFsZW50KGxheWVyLkRlbnNpdHksIGxheWVyLlRoaWNrbmVzcykgfCBudW1iZXI6JzEuMC0yJyB9fW1tKVxyXG4gICAgICAgICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICA8aW9uLXJlb3JkZXIgc2xvdD1cImVuZFwiPjwvaW9uLXJlb3JkZXI+XHJcbiAgICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDwvaW9uLXJlb3JkZXItZ3JvdXA+XHJcbiAgICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRMYXllckJvdHRvbSgpXCIgKGtleXVwLmVudGVyKT1cImFkZExheWVyQm90dG9tKClcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuQUREX0xBWUVSX0JPVFRPTScgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cInNvbGlkXCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgIHt7J0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9mb3JtPlxyXG48L2lvbi1jb250ZW50PlxyXG48bmctdGVtcGxhdGUgI25vTGF5ZXJzPlxyXG4gIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkTGF5ZXJCb3R0b20oKVwiIChrZXl1cC5lbnRlcik9XCJhZGRMYXllckJvdHRvbSgpXCI+XHJcbiAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkFERF9MQVlFUicgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eU1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LWRlbnNpdHknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LWRlbnNpdHkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctZGVuc2l0eS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93RGVuc2l0eUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgZGVuc2l0eU1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG5cclxuICBnZXQgcHJvZmlsZXMoKTogU25vd0RlbnNpdHlNb2RlbFtdIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eS5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNFbXB0eSh0aGlzLnByb2ZpbGVzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBvcGVuTW9kYWwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuZGVuc2l0eU1vZGFsKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpOyAvLyBTYXZlIHJlZ2lzdHJhdGlvbiBiZWZvcmUgb3BlbiBtb2RhbCBwYWdlXHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogU25vd0RlbnNpdHlNb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIHJlZ0lkOiB0aGlzLnJlZy5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgYXdhaXQgdGhpcy5kZW5zaXR5TW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIGNsYXNzPVwic3VtbWFyeS1pdGVtXCIgKGNsaWNrKT1cIm9wZW5Nb2RhbCgpXCIgKGtleXVwLmVudGVyKT1cIm9wZW5Nb2RhbCgpXCI+XHJcbiAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi1wYWRkaW5nLXZlcnRpY2FsIGlvbi1wYWRkaW5nLWVuZFwiPlxyXG4gICAgPGgyPnt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLlRJVExFJyB8IHRyYW5zbGF0ZX19PC9oMj5cclxuICAgIDxwPlxyXG4gICAgICA8aW9uLXRleHQgKm5nSWY9XCIhaXNFbXB0eSBlbHNlIGVtcHR5XCI+e3twcm9maWxlc1swXS5MYXllcnMgPyBwcm9maWxlc1swXS5MYXllcnMubGVuZ3RoIDogMCB9fVxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9maWxlc1swXS5MYXllcnMubGVuZ3RoID09PSAxIGVsc2UgbXVsdGlwbGVcIj5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuT05FX0xBWUVSJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICA8L3A+XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1pY29uICpuZ0lmPVwiIWlzRW1wdHlcIiBzbG90PVwiZW5kXCIgY29sb3I9XCJzdWNjZXNzXCIgbmFtZT1cImNoZWNrbWFyay1jaXJjbGVcIj48L2lvbi1pY29uPlxyXG48L2lvbi1pdGVtPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuRU1QVFknIHwgdHJhbnNsYXRlfX1cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNtdWx0aXBsZT5cclxuICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLk1VTFRJUExFX0xBWUVSUycgfCB0cmFuc2xhdGV9fVxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNub3dUZW1wTGF5ZXJNb2RhbFBhZ2UgfSBmcm9tICcuL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTbm93VGVtcExheWVyTW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTbm93VGVtcExheWVyTW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1RlbXBMYXllck1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU25vd1RlbXBPYnNNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNub3ctdGVtcC1sYXllci1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1RlbXBMYXllck1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbGF5ZXI6IFNub3dUZW1wT2JzTW9kZWw7XHJcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSByZWc6IElSZWdpc3RyYXRpb247XHJcbiAgYWRkTmV3OiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIGluaXRpYWxSZWdpc3RyYXRpb25TdGF0ZTogSVJlZ2lzdHJhdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlID0gY2xvbmVEZWVwKHRoaXMucmVnKTtcclxuICAgIHRoaXMuaW5pdExheWVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRMYXllcigpIHtcclxuICAgIHRoaXMuYWRkTmV3ID0gdGhpcy5sYXllciA9PT0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHRoaXMuYWRkTmV3KSB7XHJcbiAgICAgIHRoaXMubGF5ZXIgPSB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldCBsYXllckxlbmdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhhc0xheWVyc1xyXG4gICAgICA/IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbkdvTmV4dCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLmhhc0xheWVycyAmJiB0aGlzLmluZGV4IDwgdGhpcy5sYXllckxlbmdodCkgfHxcclxuICAgICAgKHRoaXMuaW5kZXggPT09IHRoaXMubGF5ZXJMZW5naHQgJiZcclxuICAgICAgICB0aGlzLmFkZE5ldyAmJlxyXG4gICAgICAgICFJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy5sYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb2soZ290b0luZGV4PzogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycykge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFkZE5ldyAmJiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMubGF5ZXIpKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5zcGxpY2UoXHJcbiAgICAgICAgdGhpcy5pbmRleCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG5cclxuICAgIGlmIChnb3RvSW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIGdvdG9JbmRleDtcclxuICAgICAgdGhpcy5sYXllciA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVyc1t0aGlzLmluZGV4XTtcclxuICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMoXHJcbiAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlXHJcbiAgICApO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5maWx0ZXIoXHJcbiAgICAgICAgKGwpID0+IGwgIT09IHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgZGVsZXRlOiB0cnVlIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLlBPSU5UJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGZvcm0gKG5nU3VibWl0KT1cIm9rKClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5QT0lOVCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLkRlcHRoXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLkRFUFRIXCIgW21heF09XCI5OTlcIlxyXG4gICAgICAgIFttaW5dPVwiMFwiIHN1ZmZpeD1cImNtXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLlNub3dUZW1wXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLlRFTVBFUkFUVVJFXCJcclxuICAgICAgICBbbWF4XT1cIjBcIiBbbWluXT1cIi03MFwiIHN1ZmZpeD1cIsKwQ1wiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiaW5kZXggPT09IDBcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9rKC0xKVwiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImFycm93LWJhY2tcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8aW9uLXRleHQ+e3sgJ0RJQUxPR1MuUFJFVklPVVMnIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCIhY2FuR29OZXh0XCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwib3V0bGluZVwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvaygxKVwiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiIG5hbWU9XCJhcnJvdy1mb3J3YXJkXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgPGlvbi10ZXh0Pnt7ICdESUFMT0dTLk5FWFQnIHwgdHJhbnNsYXRlIH19PC9pb24tdGV4dD5cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwic29saWRcIiBjb2xvcj1cInByaW1hcnlcIj5cclxuICAgICAgICAgICAge3sgJ0RJQUxPR1MuT0tfQkFDSycgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3cgKm5nSWY9XCIhYWRkTmV3XCI+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBvZmZzZXQ9XCIzXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZGVsZXRlKClcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInRyYXNoXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAge3sgJ0RJQUxPR1MuREVMRVRFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2Zvcm0+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU25vd1RlbXBNb2RhbFBhZ2UgfSBmcm9tICcuL3Nub3ctdGVtcC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNub3dUZW1wTGF5ZXJNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9zbm93LXRlbXAtbGF5ZXItbW9kYWwvc25vdy10ZW1wLWxheWVyLW1vZGFsLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBTbm93VGVtcExheWVyTW9kYWxQYWdlTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTbm93VGVtcE1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU25vd1RlbXBNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93VGVtcE1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgU25vd1RlbXBPYnNNb2RlbCxcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgU25vd1RlbXBMYXllck1vZGFsUGFnZSB9IGZyb20gJy4uL3Nub3ctdGVtcC1sYXllci1tb2RhbC9zbm93LXRlbXAtbGF5ZXItbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24gfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LXRlbXAtbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LXRlbXAtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zbm93LXRlbXAtbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dUZW1wTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHJlZ0lkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBsYXllck1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG4gIHByaXZhdGUgaW5pdGlhbFJlZ2lzdHJhdGlvbkNsb25lOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBwcml2YXRlIG5nRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBnZXQgdGVtcFByb2ZpbGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucmVnICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd1RlbXBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd1RlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0xheWVycygpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMudGVtcFByb2ZpbGUgJiZcclxuICAgICAgdGhpcy50ZW1wUHJvZmlsZS5MYXllcnMgJiZcclxuICAgICAgdGhpcy50ZW1wUHJvZmlsZS5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgICAgIC5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCh0aGlzLnJlZ0lkKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgocmVnKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmUgPSBjbG9uZURlZXAocmVnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucmVnID0gcmVnO1xyXG4gICAgICAgICAgaWYgKCF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMikge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiA9IHt9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcCA9IHt9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd1RlbXAuTGF5ZXJzID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnNvcnRMYXllcnMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSA9IGNsb25lRGVlcCh0aGlzLnJlZyk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh0aGlzLnRlbXBQcm9maWxlKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMoXHJcbiAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvbkNsb25lXHJcbiAgICApO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYWRkTGF5ZXJCb3R0b20oKSB7XHJcbiAgICB0aGlzLmFkZE9yRWRpdExheWVyKFxyXG4gICAgICB0aGlzLmhhc0xheWVycyA/IHRoaXMudGVtcFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA6IDAsXHJcbiAgICAgIHVuZGVmaW5lZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdExheWVyKGluZGV4OiBudW1iZXIsIGxheWVyOiBTbm93VGVtcE9ic01vZGVsKSB7XHJcbiAgICBpZiAoIXRoaXMubGF5ZXJNb2RhbCkge1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogU25vd1RlbXBMYXllck1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgcmVnOiB0aGlzLnJlZyxcclxuICAgICAgICAgIGxheWVyLFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmxheWVyTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IG51bGw7XHJcbiAgICAgIHRoaXMuc29ydExheWVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzb3J0TGF5ZXJzKCkge1xyXG4gICAgaWYgKHRoaXMudGVtcFByb2ZpbGUgJiYgdGhpcy50ZW1wUHJvZmlsZS5MYXllcnMpIHtcclxuICAgICAgdGhpcy50ZW1wUHJvZmlsZS5MYXllcnMgPSB0aGlzLnRlbXBQcm9maWxlLkxheWVycy5zb3J0KFxyXG4gICAgICAgIChhLCBiKSA9PiBhLkRlcHRoIC0gYi5EZXB0aFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGZvcm0gKG5nU3VibWl0KT1cIm9rKClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRPckVkaXRMYXllcihpLCBsYXllcilcIiAoa2V5dXAuZW50ZXIpPVwiYWRkT3JFZGl0TGF5ZXIoaSwgbGF5ZXIpXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgbGF5ZXIgb2YgdGVtcFByb2ZpbGUuTGF5ZXJzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsYXllci5EZXB0aCAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgIHt7bGF5ZXIuRGVwdGggfCBtZXRlcnNUb0NtIH19Y21cclxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLlNub3dUZW1wICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAge3tsYXllci5Tbm93VGVtcH19wrBDXHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRMYXllckJvdHRvbSgpXCIgKGtleXVwLmVudGVyKT1cImFkZExheWVyQm90dG9tKClcIj5cclxuICAgICAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLkFERF9MQVlFUl9CT1RUT00nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cInNvbGlkXCIgY29sb3I9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICB7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNub3dUZW1wTW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LXRlbXAtbW9kYWwvc25vdy10ZW1wLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LXRlbXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LXRlbXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctdGVtcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93VGVtcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgc25vd1RlbXBNb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcclxuXHJcbiAgZ2V0IHRlbXBQcm9maWxlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gaXNFbXB0eSh0aGlzLnRlbXBQcm9maWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGFzeW5jIG9wZW5Nb2RhbCgpIHtcclxuICAgIGlmICghdGhpcy5zbm93VGVtcE1vZGFsKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpOyAvLyBTYXZlIHJlZ2lzdHJhdGlvbiBiZWZvcmUgb3BlbiBtb2RhbCBwYWdlXHJcbiAgICAgIHRoaXMuc25vd1RlbXBNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250b2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IFNub3dUZW1wTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWdJZDogdGhpcy5yZWcuaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNub3dUZW1wTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLnNub3dUZW1wTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMuc25vd1RlbXBNb2RhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInN1bW1hcnktaXRlbVwiIChjbGljayk9XCJvcGVuTW9kYWwoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuTW9kYWwoKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5USVRMRScgfCB0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICA8cD5cclxuICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwiIWlzRW1wdHkgZWxzZSBlbXB0eVwiPlxyXG4gICAgICAgIHt7dGVtcFByb2ZpbGUuTGF5ZXJzID8gdGVtcFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA6IDAgfX1cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA9PT0gMSBlbHNlIG11bHRpcGxlXCI+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLk9ORV9MQVlFUicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2lvbi10ZXh0PlxyXG4gICAgPC9wPlxyXG4gIDwvaW9uLWxhYmVsPlxyXG4gIDxpb24taWNvbiAqbmdJZj1cIiFpc0VtcHR5XCIgc2xvdD1cImVuZFwiIGNvbG9yPVwic3VjY2Vzc1wiIG5hbWU9XCJjaGVja21hcmstY2lyY2xlXCI+PC9pb24taWNvbj5cclxuPC9pb24taXRlbT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLkVNUFRZJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjbXVsdGlwbGU+XHJcbiAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5NVUxUSVBMRV9MQVlFUlMnIHwgdHJhbnNsYXRlfX1cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllckhpc3RvcnlNb2RhbFBhZ2UgfSBmcm9tICcuL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTdHJhdFByb2ZpbGVMYXllckhpc3RvcnlNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1N0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICBSZWdpc3RyYXRpb25WaWV3TW9kZWwsXHJcbiAgU3RyYXRQcm9maWxlTGF5ZXJWaWV3TW9kZWwsXHJcbiAgU2VhcmNoU2VydmljZVxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgcGlwZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkLCBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBpc0xvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAkcHJldmlvdXNVc2VkTGF5ZXJzOiBPYnNlcnZhYmxlPFxyXG4gICAgeyBpZDogbnVtYmVyOyBkYXRlOiBzdHJpbmc7IGxheWVyczogU3RyYXRQcm9maWxlTGF5ZXJWaWV3TW9kZWxbXSB9W11cclxuICA+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMucmVnICYmIHRoaXMucmVnLnJlcXVlc3QgJiYgdGhpcy5yZWcucmVxdWVzdC5PYnNMb2NhdGlvbikge1xyXG4gICAgICB0aGlzLiRwcmV2aW91c1VzZWRMYXllcnMgPSB0aGlzLnNlYXJjaFNlcnZpY2VcclxuICAgICAgICAuU2VhcmNoU2VhcmNoKHtcclxuICAgICAgICAgIC8vIE9ic2VydmVyR3VpZDogdGhpcy5vYnNlcnZlckd1aWQsIFRPRE86IENhbGwgXCJteSBvYmVydmF0aW9uc1wiIGluIGFwaSBpbnN0ZWFkXHJcbiAgICAgICAgICBGcm9tRHRPYnNUaW1lOiBtb21lbnQoKS5zdWJ0cmFjdCgxNCwgJ2RheXMnKS5zdGFydE9mKCdkYXknKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgUmFkaXVzOiB7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgTGF0aXR1ZGU6IHRoaXMucmVnLnJlcXVlc3QuT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgTG9uZ2l0dWRlOiB0aGlzLnJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBSYWRpdXM6IDEwMDAwMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFNlbGVjdGVkR2VvSGF6YXJkczogW0dlb0hhemFyZC5Tbm93XSxcclxuICAgICAgICAgIFNlbGVjdGVkUmVnaXN0cmF0aW9uVHlwZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIElkOiBSZWdpc3RyYXRpb25UaWQuU25vd1Byb2ZpbGUyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChyZXN1bHQpID0+IHRoaXMuZ2V0TGF5ZXJzRnJvbVNlYXJjaFJlc3VsdChyZXN1bHQpKSxcclxuICAgICAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZWxlY3RMYXllcihpdGVtOiB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgZGF0ZTogc3RyaW5nO1xyXG4gICAgbGF5ZXJzOiBTdHJhdFByb2ZpbGVMYXllclZpZXdNb2RlbFtdO1xyXG4gIH0pIHtcclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSkge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgPSBpdGVtLmxheWVycztcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRMYXllcnNGcm9tU2VhcmNoUmVzdWx0KFxyXG4gICAgcmVzdWx0OiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXVxyXG4gICk6IHsgaWQ6IG51bWJlcjsgZGF0ZTogc3RyaW5nOyBsYXllcnM6IFN0cmF0UHJvZmlsZUxheWVyVmlld01vZGVsW10gfVtdIHtcclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgLm1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMiAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICByZWcuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICByZWcuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgIHJlZy5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycyAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiByZWcuUmVnSWQsXHJcbiAgICAgICAgICAgIGRhdGU6IHJlZy5EdE9ic1RpbWUsXHJcbiAgICAgICAgICAgIGxheWVyczogcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigoeCkgPT4geCAhPT0gbnVsbCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkZST01fT1RIRVJfUFJPRklMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIiBjbGFzcz1cImlvbi1uby1tYXJnaW5cIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIoJHByZXZpb3VzVXNlZExheWVycyB8IGFzeW5jKSBhcyBwcmV2aW91c1VzZWRMYXllcnMgZWxzZSBsb2FkaW5nXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcmV2aW91c1VzZWRMYXllcnMubGVuZ3RoID4gMCBlbHNlIGVtcHR5XCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIFtkZXRhaWxdPVwidHJ1ZVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIHByZXZpb3VzVXNlZExheWVyc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJzZWxlY3RMYXllcihpdGVtKVwiXHJcbiAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwic2VsZWN0TGF5ZXIoaXRlbSlcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZSB8IGZvcm1hdERhdGUgfCBhc3luYyB9fSAtICh7eyBpdGVtLmxheWVycy5sZW5ndGggfX1cclxuICAgICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTEFZRVInIHwgdHJhbnNsYXRlfX0pXHJcbiAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvaW9uLWxpc3Q+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogNDAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogMzAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogNjAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTk9fUFJPRklMRVNfRk9VTkQnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1saXN0LWhlYWRlcj5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSB9IGZyb20gJy4vc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU3RyYXRQcm9maWxlTGF5ZXJNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQge1xyXG4gIFN0cmF0UHJvZmlsZUxheWVyRWRpdE1vZGVsLFxyXG4gIEtkdkVsZW1lbnRcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0L3NlbGVjdC1vcHRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuXHJcbmNvbnN0IGJhc2ljSGFyZG5lc3NWYWx1ZXMgPSBbMiwgNiwgMTAsIDE0LCAxOCwgMjFdO1xyXG5jb25zdCBiYXNpY0dyYWluRm9ybVZhbHVlcyA9IFsxLCAxNCwgMTcsIDIyLCAyNiwgMzIsIDM2LCA0MCwgNDFdO1xyXG5jb25zdCBiYXNpY1dldG5lc3NWYWx1ZXMgPSBbMSwgMywgNSwgNywgOV07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBsYXllcjogU3RyYXRQcm9maWxlTGF5ZXJFZGl0TW9kZWw7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XHJcblxyXG4gIGFkZE5ldzogYm9vbGVhbjtcclxuICBwcml2YXRlIGluaXRpYWxSZWdpc3RhdGlvblN0YXRlOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBncmFpblNpemVJbnRlcmZhY2VPcHRpb25zOiBhbnk7XHJcbiAgc2hvd01vcmUgPSBmYWxzZTtcclxuICBoYXJkbmVzc0ZpbHRlcjogKGlkOiBudW1iZXIpID0+IGJvb2xlYW47XHJcbiAgZ3JhaW5Gb3JtRmlsdGVyOiAoaWQ6IG51bWJlcikgPT4gYm9vbGVhbjtcclxuICB3ZXRuZXNzRmlsdGVyOiAoaWQ6IG51bWJlcikgPT4gYm9vbGVhbjtcclxuXHJcbiAgZ2V0IGhhc0xheWVycygpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGxheWVyTGVuZ2h0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGFzTGF5ZXJzXHJcbiAgICAgID8gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycy5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbkdvTmV4dCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLmhhc0xheWVycyAmJiB0aGlzLmluZGV4IDwgdGhpcy5sYXllckxlbmdodCkgfHxcclxuICAgICAgKHRoaXMuaW5kZXggPT09IHRoaXMubGF5ZXJMZW5naHQgJiZcclxuICAgICAgICB0aGlzLmFkZE5ldyAmJlxyXG4gICAgICAgICFJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy5sYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZ3JhaW5TaXplT3B0aW9uczogU2VsZWN0T3B0aW9uW10gPSBbXHJcbiAgICB7IGlkOiAwLjAwMSwgdGV4dDogJy4xJyB9LFxyXG4gICAgeyBpZDogMC4wMDMsIHRleHQ6ICcuMycgfSxcclxuICAgIHsgaWQ6IDAuMDA1LCB0ZXh0OiAnLjUnIH0sXHJcbiAgICB7IGlkOiAwLjAwNywgdGV4dDogJy43JyB9LFxyXG4gICAgeyBpZDogMC4wMSwgdGV4dDogJzEnIH0sXHJcbiAgICB7IGlkOiAwLjAxNSwgdGV4dDogJzEuNScgfSxcclxuICAgIHsgaWQ6IDAuMDIsIHRleHQ6ICcyJyB9LFxyXG4gICAgeyBpZDogMC4wMjUsIHRleHQ6ICcyLjUnIH0sXHJcbiAgICB7IGlkOiAwLjAzLCB0ZXh0OiAnMycgfSxcclxuICAgIHsgaWQ6IDAuMDM1LCB0ZXh0OiAnMy41JyB9LFxyXG4gICAgeyBpZDogMC4wNCwgdGV4dDogJzQnIH0sXHJcbiAgICB7IGlkOiAwLjA0NSwgdGV4dDogJzQuNScgfSxcclxuICAgIHsgaWQ6IDAuMDUsIHRleHQ6ICc1JyB9LFxyXG4gICAgeyBpZDogMC4wNTUsIHRleHQ6ICc1LjUnIH0sXHJcbiAgICB7IGlkOiAwLjA2LCB0ZXh0OiAnNicgfSxcclxuICAgIHsgaWQ6IDAuMDgsIHRleHQ6ICc4JyB9LFxyXG4gICAgeyBpZDogMC4xLCB0ZXh0OiAnMTAnIH1cclxuICBdO1xyXG5cclxuICBnZXRJY29uRnVuYyA9IChrZHZFbGVtZW50OiBLZHZFbGVtZW50KSA9PlxyXG4gICAgYG1kLWdyYWluZm9ybS0keygoa2R2RWxlbWVudCB8fCB7fSkuTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKX1gO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pbml0aWFsUmVnaXN0YXRpb25TdGF0ZSA9IGNsb25lRGVlcCh0aGlzLnJlZyk7XHJcbiAgICB0aGlzLmluaXRMYXllcigpO1xyXG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlNJWkUnKVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLmdyYWluU2l6ZUludGVyZmFjZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBoZWFkZXI6IHZhbFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TGF5ZXIoKSB7XHJcbiAgICB0aGlzLmFkZE5ldyA9IHRoaXMubGF5ZXIgPT09IHVuZGVmaW5lZDtcclxuICAgIGlmICh0aGlzLmFkZE5ldykge1xyXG4gICAgICB0aGlzLmxheWVyID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLnNob3dNb3JlID0gdGhpcy5oYXNBbnlBZHZhbmNlZE9wdGlvbnMoKTtcclxuICAgIHRoaXMudXBkYXRlRmlsdGVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBoYXNBbnlBZHZhbmNlZE9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLmxheWVyLkhhcmRuZXNzQm90dG9tVElEID4gMCB8fFxyXG4gICAgICB0aGlzLmxheWVyLkdyYWluU2l6ZUF2Z01heCA+IDAgfHxcclxuICAgICAgdGhpcy5sYXllci5HcmFpbkZvcm1TZWNvbmRhcnlUSUQgPiAwIHx8XHJcbiAgICAgIHRoaXMubGF5ZXIuQ3JpdGljYWxMYXllclRJRCA+IDAgfHxcclxuICAgICAgISF0aGlzLmxheWVyLkNvbW1lbnRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlKCkge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvayhnb3RvSW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSA9IHt9O1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFkZE5ldyAmJiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMubGF5ZXIpKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMuc3BsaWNlKFxyXG4gICAgICAgIHRoaXMuaW5kZXgsXHJcbiAgICAgICAgMCxcclxuICAgICAgICB0aGlzLmxheWVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUoKTtcclxuXHJcbiAgICBpZiAoZ290b0luZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggKyBnb3RvSW5kZXg7XHJcbiAgICAgIHRoaXMubGF5ZXIgPSB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzW1xyXG4gICAgICAgIHRoaXMuaW5kZXhcclxuICAgICAgXTtcclxuICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMoXHJcbiAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdGF0aW9uU3RhdGVcclxuICAgICk7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGUoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMucmVnICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycyA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMuZmlsdGVyKFxyXG4gICAgICAgIChsKSA9PiBsICE9PSB0aGlzLmxheWVyXHJcbiAgICAgICk7XHJcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlU2hvd01vcmUoKSB7XHJcbiAgICB0aGlzLnNob3dNb3JlID0gIXRoaXMuc2hvd01vcmU7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdXBkYXRlRmlsdGVycygpIHtcclxuICAgIHRoaXMuc2V0SGFyZG5lc3NGaWx0ZXIoKTtcclxuICAgIHRoaXMuc2V0R3JhaW5Gb3JtRmlsdGVyKCk7XHJcbiAgICB0aGlzLnNldFdldG5lc3NGaWx0ZXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0SGFyZG5lc3NGaWx0ZXIoKSB7XHJcbiAgICB0aGlzLmhhcmRuZXNzRmlsdGVyID0gdGhpcy5zaG93TW9yZVxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IChuKSA9PiBiYXNpY0hhcmRuZXNzVmFsdWVzLmluZGV4T2YobikgPj0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0R3JhaW5Gb3JtRmlsdGVyKCkge1xyXG4gICAgdGhpcy5ncmFpbkZvcm1GaWx0ZXIgPSB0aGlzLnNob3dNb3JlXHJcbiAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgIDogKG4pID0+IGJhc2ljR3JhaW5Gb3JtVmFsdWVzLmluZGV4T2YobikgPj0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0V2V0bmVzc0ZpbHRlcigpIHtcclxuICAgIHRoaXMud2V0bmVzc0ZpbHRlciA9IHRoaXMuc2hvd01vcmVcclxuICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgOiAobikgPT4gYmFzaWNXZXRuZXNzVmFsdWVzLmluZGV4T2YobikgPj0gMDtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiIGNsYXNzPVwiaW9uLW5vLW1hcmdpblwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5MQVlFUicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLlRoaWNrbmVzc1wiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVEhJQ0tORVNTXCJcclxuICAgICAgICBbbWluXT1cIjBcIiBzdWZmaXg9XCJjbVwiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIiBbY29udmVydFJhdGlvXT1cIjEwMFwiPlxyXG4gICAgICA8L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5IQVJETkVTU1wiIGtkdktleT1cIlNub3dfSGFyZG5lc3NLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImxheWVyLkhhcmRuZXNzVElEXCIgW2ZpbHRlcl09XCJoYXJkbmVzc0ZpbHRlclwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkdSQUlOX0ZPUk1cIiBrZHZLZXk9XCJTbm93X0dyYWluRm9ybUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwibGF5ZXIuR3JhaW5Gb3JtUHJpbWFyeVRJRFwiIFtmaWx0ZXJdPVwiZ3JhaW5Gb3JtRmlsdGVyXCIgW2dldEljb25GdW5jXT1cImdldEljb25GdW5jXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5TSVpFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxhcHAtc2VsZWN0IFsoc2VsZWN0ZWRWYWx1ZSldPVwibGF5ZXIuR3JhaW5TaXplQXZnXCIgW29wdGlvbnNdPVwiZ3JhaW5TaXplT3B0aW9uc1wiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlNJWkVcIj5cclxuICAgICAgICA8L2FwcC1zZWxlY3Q+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLldFVE5FU1NcIiBrZHZLZXk9XCJTbm93X1dldG5lc3NLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImxheWVyLldldG5lc3NUSURcIiBbZmlsdGVyXT1cIndldG5lc3NGaWx0ZXJcIj5cclxuICAgICAgPC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwidG9nZ2xlU2hvd01vcmUoKVwiIGZpbGw9XCJjbGVhclwiIGV4cGFuZD1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIFtuYW1lXT1cInNob3dNb3JlID8gJ2NoZXZyb24tdXAnIDogJ2NoZXZyb24tZG93bidcIj48L2lvbi1pY29uPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd01vcmVcIj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuU0hPV19MRVNTJyB8IHRyYW5zbGF0ZSAgfX1cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhc2hvd01vcmVcIj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuU0hPV19NT1JFJyB8IHRyYW5zbGF0ZSAgfX1cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1idXR0b24+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCIgKm5nSWY9XCJzaG93TW9yZVwiPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5IQVJETkVTU19CT1RUT01cIiBrZHZLZXk9XCJTbm93X0hhcmRuZXNzS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJsYXllci5IYXJkbmVzc0JvdHRvbVRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5HUkFJTl9GUk9NX1NFQ09OREFSWVwiXHJcbiAgICAgICAga2R2S2V5PVwiU25vd19HcmFpbkZvcm1LRFZcIiBbKHZhbHVlKV09XCJsYXllci5HcmFpbkZvcm1TZWNvbmRhcnlUSURcIiBbZ2V0SWNvbkZ1bmNdPVwiZ2V0SWNvbkZ1bmNcIj5cclxuICAgICAgPC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGlvbi1pdGVtPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLk1BWF9HUkFJTl9TSVpFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxhcHAtc2VsZWN0IFsoc2VsZWN0ZWRWYWx1ZSldPVwibGF5ZXIuR3JhaW5TaXplQXZnTWF4XCIgW29wdGlvbnNdPVwiZ3JhaW5TaXplT3B0aW9uc1wiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLk1BWF9HUkFJTl9TSVpFXCI+XHJcbiAgICAgICAgPC9hcHAtc2VsZWN0PlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5DUklUSUNBTF9MQVlFUlwiIGtkdktleT1cIlNub3dfQ3JpdGljYWxMYXllcktEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwibGF5ZXIuQ3JpdGljYWxMYXllclRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIkRJQUxPR1MuQ09NTUVOVFwiIFsodmFsdWUpXT1cImxheWVyLkNvbW1lbnRcIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJpbmRleCA9PT0gMFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soLTEpXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiYXJyb3ctYmFja1wiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpb24tdGV4dD57eyAnRElBTE9HUy5QUkVWSU9VUycgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTEFZRVInIHwgdHJhbnNsYXRlIHwgbG93ZXJjYXNlIH19IDwvaW9uLXRleHQ+XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiIWNhbkdvTmV4dFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soMSlcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiYXJyb3ctZm9yd2FyZFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpb24tdGV4dD57eyAnRElBTE9HUy5ORVhUJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5MQVlFUicgfCB0cmFuc2xhdGUgfCBsb3dlcmNhc2UgfX08L2lvbi10ZXh0PlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICB7eyAnRElBTE9HUy5PS19CQUNLJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cIiFhZGROZXdcIj5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkZWxldGUoKVwiIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIGV4cGFuZD1cImJsb2NrXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICB7eyAnRElBTE9HUy5ERUxFVEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2UgfSBmcm9tICcuL3N0cmF0LXByb2ZpbGUtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllckhpc3RvcnlNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU3RyYXRQcm9maWxlTW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTdHJhdFByb2ZpbGVNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7XHJcbiAgU3RyYXRQcm9maWxlRWRpdE1vZGVsLFxyXG4gIFN0cmF0UHJvZmlsZUxheWVyRWRpdE1vZGVsXHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSB9IGZyb20gJy4uL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSXRlbVJlb3JkZXJFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvYXJyYXktaGVscGVyJztcclxuaW1wb3J0IHsgU3RyYXRQcm9maWxlTGF5ZXJIaXN0b3J5TW9kYWxQYWdlIH0gZnJvbSAnLi4vc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3RyYXQtcHJvZmlsZS1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0cmF0LXByb2ZpbGUtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcmVnSWQ6IHN0cmluZztcclxuXHJcbiAgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlZ0luaXRDbG9uZTogSVJlZ2lzdHJhdGlvbjtcclxuICB0b3RhbFRoaWNrbmVzczogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIG5nRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBwcml2YXRlIGxheWVyTW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQ7XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlLkxheWVycyAmJiB0aGlzLnByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvZmlsZSgpOiBTdHJhdFByb2ZpbGVFZGl0TW9kZWwge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICAgICAuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQodGhpcy5yZWdJZClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlZykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnSW5pdENsb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnSW5pdENsb25lID0gY2xvbmVEZWVwKHJlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJlZyA9IHJlZztcclxuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvaygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ0luaXRDbG9uZSk7IC8vIFJlc2V0IHRvIGluaXRhbCBzdGF0ZVxyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYWRkTGF5ZXJUb3AoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZE9yRWRpdExheWVyKDAsIHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBhZGRMYXllckJvdHRvbSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkT3JFZGl0TGF5ZXIoXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJzXHJcbiAgICAgICAgPyB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLmxlbmd0aFxyXG4gICAgICAgIDogMCxcclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25MYXllclJlb3JkZXIoZXZlbnQ6IEN1c3RvbUV2ZW50PEl0ZW1SZW9yZGVyRXZlbnREZXRhaWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzID0gQXJyYXlIZWxwZXIucmVvcmRlckxpc3QoXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMsXHJcbiAgICAgIGV2ZW50LmRldGFpbC5mcm9tLFxyXG4gICAgICBldmVudC5kZXRhaWwudG9cclxuICAgICk7XHJcbiAgICBldmVudC5kZXRhaWwuY29tcGxldGUoKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJldm91c1VzZWRMYXllcnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBsb2dnZWRJblVzZXIgPSBhd2FpdCB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlckFzUHJvbWlzZSgpO1xyXG4gICAgaWYgKGxvZ2dlZEluVXNlciAmJiBsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICBpZiAoIXRoaXMubGF5ZXJNb2RhbCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICBjb21wb25lbnQ6IFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSxcclxuICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICAgIHJlZzogdGhpcy5yZWdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMubGF5ZXJNb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgICB0aGlzLmxheWVyTW9kYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVnb2JzQXV0aFNlcnZpY2Uuc2lnbkluKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRMYXllcihpbmRleDogbnVtYmVyLCBsYXllcjogU3RyYXRQcm9maWxlTGF5ZXJFZGl0TW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghdGhpcy5sYXllck1vZGFsKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgcmVnOiB0aGlzLnJlZyxcclxuICAgICAgICAgIGxheWVyLFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmxheWVyTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxheWVycyA9IHRoaXMucHJvZmlsZS5MYXllcnMgfHwgW107XHJcbiAgICBjb25zdCBzdW0gPSBsYXllcnNcclxuICAgICAgLmZpbHRlcigoeCkgPT4geC5UaGlja25lc3MgIT09IHVuZGVmaW5lZClcclxuICAgICAgLm1hcCgobGF5ZXIpID0+IGxheWVyLlRoaWNrbmVzcylcclxuICAgICAgLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcclxuICAgIHRoaXMudG90YWxUaGlja25lc3MgPSBzdW07XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxmb3JtIChuZ1N1Ym1pdCk9XCJvaygpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkZST01fT1RIRVJfUFJPRklMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJnZXRQcmV2b3VzVXNlZExheWVycygpXCIgKGtleXVwLmVudGVyKT1cImdldFByZXZvdXNVc2VkTGF5ZXJzKClcIj5cclxuICAgICAgICA8aW9uLWljb24gY29sb3I9XCJkYXJrXCIgbmFtZT1cImNsb3VkLWRvd25sb2FkXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLk9USEVSX1BST0ZJTEVfSVRFTV9URVhUJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuT1RIRVJfUFJPRklMRV9ERVNDUklQVElPTicgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0xheWVycyBlbHNlIG5vTGF5ZXJzXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRMYXllclRvcCgpXCIgKGtleXVwLmVudGVyKT1cImFkZExheWVyVG9wKClcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuQUREX0xBWUVSX1RPUCcgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1yZW9yZGVyLWdyb3VwIGRpc2FibGVkPVwiZmFsc2VcIiAoaW9uSXRlbVJlb3JkZXIpPVwib25MYXllclJlb3JkZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRPckVkaXRMYXllcihpLCBsYXllcilcIiAoa2V5dXAuZW50ZXIpPVwiYWRkT3JFZGl0TGF5ZXIoaSwgbGF5ZXIpXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGxheWVyIG9mIHByb2ZpbGUuTGF5ZXJzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgIDxpb24tbGFiZWwgW2NvbG9yXT1cImxheWVyLkNyaXRpY2FsTGF5ZXJUSUQgPiAwID8gJ2RhbmdlcicgOiAnZGFyaydcIj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGF5ZXIuVGhpY2tuZXNzICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAgICAgIHt7bGF5ZXIuVGhpY2tuZXNzIHwgbWV0ZXJzVG9DbX19Y21cclxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGF5ZXIuSGFyZG5lc3NUSUQgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5IYXJkbmVzc1RJRCB8IGtkdkRlc2NyaXB0aW9uOiAnU25vd19IYXJkbmVzc0tEVicgfCBhc3luY319XHJcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkdyYWluRm9ybVByaW1hcnlUSUQgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5HcmFpbkZvcm1QcmltYXJ5VElEIHwga2R2RGVzY3JpcHRpb246ICdTbm93X0dyYWluRm9ybUtEVicgfCBhc3luY319XHJcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkdyYWluU2l6ZUF2ZyAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICB7e2xheWVyLkdyYWluU2l6ZUF2ZyAqIDEwMCB8IG51bWJlcjonMS4wLTInIH19bW1cclxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGF5ZXIuV2V0bmVzc1RJRCAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICB7e2xheWVyLldldG5lc3NUSUQgfCBrZHZEZXNjcmlwdGlvbjogJ1Nub3dfV2V0bmVzc0tEVicgfCBhc3luYyB9fVxyXG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgPGlvbi1yZW9yZGVyIHNsb3Q9XCJlbmRcIj48L2lvbi1yZW9yZGVyPlxyXG4gICAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgICA8L2lvbi1yZW9yZGVyLWdyb3VwPlxyXG4gICAgICAgIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkTGF5ZXJCb3R0b20oKVwiIChrZXl1cC5lbnRlcik9XCJhZGRMYXllckJvdHRvbSgpXCI+XHJcbiAgICAgICAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkFERF9MQVlFUl9CT1RUT00nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0xheWVyc1wiPlxyXG4gICAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU1VNTUFSWScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgICAgPGlvbi1pdGVtPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVE9UQUxfVEhJQ0tORVNTJ1xyXG4gICAgICAgICAgICB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydCBpb24tdGV4dC13cmFwIGlvbi1tYXJnaW4tYm90dG9tXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaW9uLW5vLW1hcmdpblwiICpuZ0lmPVwidG90YWxUaGlja25lc3MgIT09IHVuZGVmaW5lZFwiPnt7IHRvdGFsVGhpY2tuZXNzIHwgbWV0ZXJzVG9DbSB9fSBjbTwvcD5cclxuICAgICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBvZmZzZXQ9XCIzXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwic29saWRcIiBjb2xvcj1cInByaW1hcnlcIj5cclxuICAgICAgICAgICAge3snRElBTE9HUy5PSycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2Zvcm0+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbm9MYXllcnM+XHJcbiAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRMYXllckJvdHRvbSgpXCIgKGtleXVwLmVudGVyKT1cImFkZExheWVyQm90dG9tKClcIj5cclxuICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuQUREX0xBWUVSJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZU1vZGFsUGFnZSB9IGZyb20gJy4vc3RyYXQtcHJvZmlsZS1tb2RhbC9zdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXN0cmF0LXByb2ZpbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdHJhdC1wcm9maWxlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBwcml2YXRlIG1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG5cclxuICBnZXQgcHJvZmlsZSgpOiBTdHJhdFByb2ZpbGVFZGl0TW9kZWwge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBnZXQgaXNFbXB0eSgpIHtcclxuICAgIHJldHVybiBJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy5wcm9maWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGFzeW5jIG9wZW5Nb2RhbCgpIHtcclxuICAgIGlmICghdGhpcy5tb2RhbCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnKTsgLy8gU2F2ZSByZWdpc3RyYXRpb24gYmVmb3JlIG9wZW4gbW9kYWwgcGFnZVxyXG4gICAgICB0aGlzLm1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogU3RyYXRQcm9maWxlTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWdJZDogdGhpcy5yZWcuaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgYXdhaXQgdGhpcy5tb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgdGhpcy5tb2RhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInN1bW1hcnktaXRlbVwiIChjbGljayk9XCJvcGVuTW9kYWwoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuTW9kYWwoKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVElUTEUnIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgPHA+XHJcbiAgICAgIDxpb24tdGV4dCAqbmdJZj1cIiFpc0VtcHR5IGVsc2UgZW1wdHlcIj57e3Byb2ZpbGUuTGF5ZXJzID8gcHJvZmlsZS5MYXllcnMubGVuZ3RoIDogMCB9fVxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9maWxlLkxheWVycy5sZW5ndGggPT09IDEgZWxzZSBtdWx0aXBsZVwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuT05FX0xBWUVSJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICA8L3A+XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1pY29uICpuZ0lmPVwiIWlzRW1wdHlcIiBzbG90PVwiZW5kXCIgY29sb3I9XCJzdWNjZXNzXCIgbmFtZT1cImNoZWNrbWFyay1jaXJjbGVcIj48L2lvbi1pY29uPlxyXG48L2lvbi1pdGVtPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkVNUFRZJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjbXVsdGlwbGU+XHJcbiAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTVVMVElQTEVfTEFZRVJTJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTbm93UHJvZmlsZVBhZ2UgfSBmcm9tICcuL3Nub3ctcHJvZmlsZS5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNub3dUZW1wQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLmNvbXBvbmVudCc7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuaW1wb3J0IHsgU3RyYXRQcm9maWxlTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbW9kYWwvc3RyYXQtcHJvZmlsZS1tb2RhbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9wYWdlcy9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlJztcclxuaW1wb3J0IHsgU25vd1RlbXBNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAtbW9kYWwvc25vdy10ZW1wLW1vZGFsLm1vZHVsZSc7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuaW1wb3J0IHsgU25vd0RlbnNpdHlNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLm1vZHVsZSc7XHJcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcclxuaW1wb3J0IHsgQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogU25vd1Byb2ZpbGVQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgU3RyYXRQcm9maWxlTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgU25vd1RlbXBNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBTbm93RGVuc2l0eU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBTbm93UHJvZmlsZVBhZ2UsXHJcbiAgICBDb21wcmVzc2lvblRlc3RDb21wb25lbnQsXHJcbiAgICBTbm93RGVuc2l0eUNvbXBvbmVudCxcclxuICAgIFNub3dUZW1wQ29tcG9uZW50LFxyXG4gICAgU3RyYXRQcm9maWxlQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1Byb2ZpbGVQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQge1xyXG4gIE1vZGFsQ29udHJvbGxlcixcclxuICBMb2FkaW5nQ29udHJvbGxlcixcclxuICBUb2FzdENvbnRyb2xsZXJcclxufSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgRGF0YVVybEhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9kYXRhLXVybC5oZWxwZXInO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3NldHRpbmdzJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvbW9kZWxzL3VzZXItc2V0dGluZ3MubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC9zZWxlY3Qvc2VsZWN0LW9wdGlvbi5tb2RlbCc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnU25vd1Byb2ZpbGVQYWdlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNub3ctcHJvZmlsZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Nub3ctcHJvZmlsZS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctcHJvZmlsZS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1Byb2ZpbGVQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIGV4cG9zaXRpb25PcHRpb25zOiBTZWxlY3RPcHRpb25bXSA9IFtcclxuICAgIHsgaWQ6IDAsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuTk9SVEgnIH0sXHJcbiAgICB7IGlkOiAxLCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLk5PUlRIX0VBU1QnIH0sXHJcbiAgICB7IGlkOiAyLCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkVBU1QnIH0sXHJcbiAgICB7IGlkOiAzLCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNPVVRIX0VBU1QnIH0sXHJcbiAgICB7IGlkOiA0LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNPVVRIJyB9LFxyXG4gICAgeyBpZDogNSwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TT1VUSF9XRVNUJyB9LFxyXG4gICAgeyBpZDogNiwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5XRVNUJyB9LFxyXG4gICAgeyBpZDogNywgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5OT1JUSF9XRVNUJyB9XHJcbiAgXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGxvYWRpbmdDb250cm9sbGVyOiBMb2FkaW5nQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdG9hc3RDb250cm9sbGVyOiBUb2FzdENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5Tbm93UHJvZmlsZTIsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge31cclxuXHJcbiAgaXNFbXB0eSgpIHtcclxuICAgIGNvbnN0IGlzRW1wdHlSZXN1bHQgPVxyXG4gICAgIGlzRW1wdHkodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93UHJvZmlsZTIpICYmXHJcbiAgICAgICEodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5Db21wcmVzc2lvblRlc3QgfHwgW10pLnNvbWUoXHJcbiAgICAgICAgKGN0KSA9PiBjdC5JbmNsdWRlSW5Tbm93UHJvZmlsZSA9PT0gdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpc0VtcHR5UmVzdWx0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9wZW5QcmV2aWV3KCkge1xyXG4gICAgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5HRU5FUkFUSU5HX1BSRVZJRVcnKVxyXG4gICAgICAuc3Vic2NyaWJlKGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gYXdhaXQgdGhpcy5sb2FkaW5nQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgIGJhY2tkcm9wRGlzbWlzczogdHJ1ZSAvLyBlbmFibGUgY2FuY2VsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXdhaXQgbG9hZGVyLnByZXNlbnQoKTtcclxuICAgICAgICBjb25zdCB1c2VyU2V0dGluZyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgICBjb25zdCBmb3JtYXQgPSA1OyAvLyBNb2JpbGUgcHJvZmlsZSBwbG90XHJcbiAgICAgICAgY29uc3Qgc2l6ZSA9IDQwMDtcclxuICAgICAgICBjb25zdCBzdWJzY3JpcHRpb24gPSB0aGlzLmdldFBsb3RGcm9tQXBpV2l0aEZhbGxiYWNrKFxyXG4gICAgICAgICAgdXNlclNldHRpbmcsXHJcbiAgICAgICAgICBmb3JtYXQsXHJcbiAgICAgICAgICBzaXplXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkltYWdlTW9kYWwocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKGVycikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93UHJldmlld0Vycm9yKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICBhd2FpdCBsb2FkZXIub25EaWREaXNtaXNzKCk7XHJcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQbG90RnJvbUFwaVdpdGhGYWxsYmFjayhcclxuICAgIHVzZXJTZXR0aW5nOiBVc2VyU2V0dGluZyxcclxuICAgIGZvcm1hdDogbnVtYmVyLFxyXG4gICAgc2l6ZTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRQbG90RnJvbUFwaSh1c2VyU2V0dGluZywgZm9ybWF0LCBzaXplKS5waXBlKFxyXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ0NvdWxkIG5vdCBnZW5lcmF0ZSBwbG90JywgREVCVUdfVEFHKTtcclxuICAgICAgICBpZiAoZm9ybWF0ID09PSA1KSB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdGYWxsYmFjayB0byBCYXJlU2ltcGxlUHJvZmlsZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQbG90RnJvbUFwaSh1c2VyU2V0dGluZywgNCwgc2l6ZSk7IC8vIGZhbGxiYWNrIHRvIEJhcmVTaW1wbGVQcm9maWxlIHdoZW4gbW9iaWxlIHBsb3QgZmFpbGVkXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZihudWxsKTtcclxuICAgICAgfSksXHJcbiAgICAgIHN3aXRjaE1hcCgocmVzdWx0KSA9PiBmcm9tKERhdGFVcmxIZWxwZXIudG9EYXRhVXJsKHJlc3VsdCwgJ2ltYWdlL3BuZycpKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBsb3RGcm9tQXBpKFxyXG4gICAgdXNlclNldHRpbmc6IFVzZXJTZXR0aW5nLFxyXG4gICAgZm9ybWF0OiBudW1iZXIsXHJcbiAgICBzaXplOiBudW1iZXJcclxuICApIHtcclxuICAgIGNvbnN0IHJvb3RVcmwgPSBzZXR0aW5ncy5zZXJ2aWNlcy5yZWdPYnMuYXBpVXJsW3VzZXJTZXR0aW5nLmFwcE1vZGVdO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KFxyXG4gICAgICBgJHtyb290VXJsfS9SZWdpc3RyYXRpb24vUGxvdFByZXZpZXdQbmc/Zm9ybWF0PSR7Zm9ybWF0fWAgK1xyXG4gICAgICAgIGAmaGVpZ2h0PSR7c2l6ZX0md2lkdGg9JHtzaXplfSZsYW5nS2V5PSR7dXNlclNldHRpbmcubGFuZ3VhZ2V9YCxcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdCxcclxuICAgICAge1xyXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2Jsb2InXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc0FueVRlbXBMYXllcnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcCAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMgJiZcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd1RlbXAuTGF5ZXJzLnNvbWUoXHJcbiAgICAgICAgKHgpID0+IHguU25vd1RlbXAgPCAwXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHNob3dQcmV2aWV3RXJyb3IoKSB7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldCgnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlBSRVZJRVdfRVJST1InKVxyXG4gICAgICAuc3Vic2NyaWJlKGFzeW5jIChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9hc3QgPSBhd2FpdCB0aGlzLnRvYXN0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICAgIG1vZGU6ICdtZCcsXHJcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRvYXN0LnByZXNlbnQoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIG9wZW5JbWFnZU1vZGFsKHNyYzogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlLFxyXG4gICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgIGltZ1NyYzogc3JjXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyXCJcclxuICAgIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1VQRVJJT1InIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAteWVzLW5vLXNlbGVjdCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93UHJvZmlsZTIuSXNQcm9maWxlVG9Hcm91bmRcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLklTX1BST0ZJTEVfVE9fR1JPVU5EXCI+XHJcbiAgICAgIDwvYXBwLXllcy1uby1zZWxlY3Q+XHJcbiAgICAgIDwhLS0gVE9ETzogVGEgaW5uIGRldHRlIG7DpXIgdmkgZXIgcMOlIHNpc3RlIHZlcnNqb24gYXYgQVBJJ2V0XHJcbiAgICAgICAgaW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlZBTElEX0VYUE9TSVRJT04nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5FeHBvc2l0aW9uXCJcclxuICAgICAgICAgIFtvcHRpb25zXT1cImV4cG9zaXRpb25PcHRpb25zXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuVkFMSURfRVhQT1NJVElPTlwiPjwvYXBwLXNlbGVjdD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5TbG9wZUFuZ2xlXCJcclxuICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU0xPUEVfQU5HTEVcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjU5XCIgc3VmZml4PVwiwrBcIlxyXG4gICAgICBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTE9QRV9BTkdMRV9QTEFDRUhPTERFUlwiIFtkZWNpbWFsUGxhY2VzXT1cIjBcIj48L2FwcC1udW1lcmljLWlucHV0LS0+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IHRpdGxlPVwiRElBTE9HUy5DT01NRU5UXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyLkNvbW1lbnRcIj5cclxuICAgICAgPC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVUJGT1JNUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1zdHJhdC1wcm9maWxlIFtyZWddPVwicmVnaXN0cmF0aW9uXCI+PC9hcHAtc3RyYXQtcHJvZmlsZT5cclxuICAgICAgPGFwcC1zbm93LXRlbXAgW3JlZ109XCJyZWdpc3RyYXRpb25cIj48L2FwcC1zbm93LXRlbXA+XHJcbiAgICAgIDxhcHAtc25vdy1kZW5zaXR5IFtyZWddPVwicmVnaXN0cmF0aW9uXCI+PC9hcHAtc25vdy1kZW5zaXR5PlxyXG4gICAgICA8YXBwLWNvbXByZXNzaW9uLXRlc3QgW3JlZ109XCJyZWdpc3RyYXRpb25cIj5cclxuICAgICAgPC9hcHAtY29tcHJlc3Npb24tdGVzdD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuUFJFVklFVycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIFtkaXNhYmxlZF09XCJpc0VtcHR5KClcIiAoY2xpY2spPVwib3BlblByZXZpZXcoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBuYW1lPVwiZXllXCIgY29sb3I9XCJkYXJrXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5QUkVWSUVXX0lURU0nIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLklNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIlxyXG4gICAgICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW29uQmVmb3JlQWRkXT1cImdldFNhdmVGdW5jKClcIj5cclxuICAgICAgPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==