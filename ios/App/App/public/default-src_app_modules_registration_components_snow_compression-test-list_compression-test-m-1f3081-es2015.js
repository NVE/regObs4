"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_components_snow_compression-test-list_compression-test-m-1f3081"],{

/***/ 93864:
/*!************************************************************************************************************************************!*\
  !*** ./src/app/modules/registration/components/snow/compression-test-list/compression-test-modal/compression-test-modal.module.ts ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompressionTestModalPageModule": function() { return /* binding */ CompressionTestModalPageModule; }
/* harmony export */ });
/* harmony import */ var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared-components.module */ 22623);
/* harmony import */ var _compression_test_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compression-test-modal.page */ 32677);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);



class CompressionTestModalPageModule {
}
CompressionTestModalPageModule.ɵfac = function CompressionTestModalPageModule_Factory(t) { return new (t || CompressionTestModalPageModule)(); };
CompressionTestModalPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: CompressionTestModalPageModule });
CompressionTestModalPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CompressionTestModalPageModule, { declarations: [_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_1__.CompressionTestModalPage], imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule] }); })();


/***/ }),

/***/ 35140:
/*!*****************************************************************!*\
  !*** ./src/app/modules/registration/pages/base-page-service.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasePageService": function() { return /* binding */ BasePageService; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/common-registration/registration.helpers */ 6174);
/* harmony import */ var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.services */ 93714);
/* harmony import */ var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/registration.service */ 33181);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 32185);
/* harmony import */ var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/logging/logging.service */ 93042);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
















const DEBUG_TAG = 'BasePageService';
class BasePageService {
    constructor(registrationService, newAttachmentService, commonRegistrationService, ngZone, alertController, translateService, loggingService) {
        this.registrationService = registrationService;
        this.newAttachmentService = newAttachmentService;
        this.commonRegistrationService = commonRegistrationService;
        this.ngZone = ngZone;
        this.alertController = alertController;
        this.translateService = translateService;
        this.loggingService = loggingService;
    }
    get Zone() {
        return this.ngZone;
    }
    get RegistrationService() {
        return this.registrationService;
    }
    get AlertController() {
        return this.alertController;
    }
    get TranslateService() {
        return this.translateService;
    }
    get CommonRegistrationService() {
        return this.commonRegistrationService;
    }
    confirmLeave(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const leaveText = yield this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();
            return this.createResetDialog(leaveText, registration, registrationTid, onReset);
        });
    }
    confirmReset(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const leaveText = yield this.translateService.get('REGISTRATION.CONFIRM_RESET').toPromise();
            return this.createResetDialog(leaveText, registration, registrationTid, onReset);
        });
    }
    createResetDialog(message, registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const translations = yield this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();
            const alert = yield this.alertController.create({
                message,
                buttons: [
                    {
                        text: translations['DIALOGS.CANCEL'],
                        role: 'cancel'
                    },
                    {
                        text: translations['DIALOGS.YES']
                    }
                ]
            });
            yield alert.present();
            const result = yield alert.onDidDismiss();
            const reset = result.role !== 'cancel';
            if (reset) {
                yield this.reset(registration, registrationTid, onReset);
            }
            return reset;
        });
    }
    reset(registration, registrationTid, onReset) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            this.Zone.run(() => {
                if (registrationTid) {
                    registration.request[(0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid)] = this.getDefaultValue(registrationTid);
                    this.resetImages(registration);
                }
                if (onReset) {
                    onReset();
                }
            });
            yield this.registrationService.saveRegistrationAsync(registration);
        });
    }
    createDefaultProps(registration, registrationTid) {
        const propName = (0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid);
        if (!registration.request[propName]) {
            // Init to new object if null
            registration.request[propName] = this.getDefaultValue(registrationTid);
        }
    }
    getDefaultValue(registrationTid) {
        if ((0,src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.isArrayType)(registrationTid)) {
            return [];
        }
        else {
            return {};
        }
    }
    resetImages(registration) {
        this.newAttachmentService
            .getAttachments(registration.id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)((attachments) => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)(attachments.map((a) => this.newAttachmentService.removeAttachment(registration.id, a.id)))))
            .subscribe(() => {
            this.loggingService.debug('Reset images complete', DEBUG_TAG);
        }, (error) => {
            this.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
        });
    }
}
BasePageService.ɵfac = function BasePageService_Factory(t) { return new (t || BasePageService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService)); };
BasePageService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: BasePageService, factory: BasePageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 81877:
/*!*********************************************************!*\
  !*** ./src/app/modules/registration/pages/base.page.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasePage": function() { return /* binding */ BasePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 14500);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 47599);
/* harmony import */ var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page-service */ 35140);
/* harmony import */ var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/common-registration/registration.models */ 42852);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 35116);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 49005);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 39349);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 98578);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 44094);
/* harmony import */ var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/helpers/observable-helper */ 59364);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 71258);











class BasePage extends _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.NgDestoryBase {
    constructor(registrationTid, basePageService, activatedRoute) {
        super();
        this.basePageService = basePageService;
        this.activatedRoute = activatedRoute;
        this.registrationTid = registrationTid;
    }
    ngOnInit() { }
    ionViewDidEnter() {
        const id = this.activatedRoute.snapshot.params['id'];
        this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((reg) => {
            this.basePageService.createDefaultProps(reg, this.registrationTid);
            return reg;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)((reg) => {
            this.registration = reg;
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(() => this.createInitObservable()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$))
            .subscribe();
    }
    // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module
    canLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            // Check if implementation page has implemented custom isValid logic
            const valid = yield Promise.resolve(this.isValid ? this.isValid() : true);
            // Only return alert if page is not empty and invalid
            const isEmpty = yield Promise.resolve(this.isEmpty());
            if (!isEmpty && !valid) {
                return this.basePageService.confirmLeave(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
            }
            return true;
        });
    }
    createInitObservable() {
        if (this.onInit) {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.from)(Promise.resolve(this.onInit()));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.of)({});
    }
    ionViewWillLeave() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            if (this.onBeforeLeave) {
                yield Promise.resolve(this.onBeforeLeave());
            }
            yield this.save(true);
        });
    }
    save(clean = false) {
        this.registration.syncStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.SyncStatus.Draft;
        return this.basePageService.RegistrationService.saveRegistrationAsync(this.registration, clean);
    }
    getSaveFunc() {
        return () => this.save();
    }
    isEmpty() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            return !(yield this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid)
                .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1))
                .toPromise());
        });
    }
    reset() {
        return this.basePageService.confirmReset(this.registration, this.registrationTid, () => (this.onReset ? this.onReset() : null));
    }
    getResolvedUrl() {
        return ('/' +
            this.activatedRoute.snapshot.pathFromRoot
                .map((v) => v.url.map((segment) => segment.toString()).join('/'))
                .filter((path) => !!path)
                .join('/'));
    }
}
BasePage.ɵfac = function BasePage_Factory(t) { return new (t || BasePage)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute)); };
BasePage.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineDirective"]({ type: BasePage, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1zcmNfYXBwX21vZHVsZXNfcmVnaXN0cmF0aW9uX2NvbXBvbmVudHNfc25vd19jb21wcmVzc2lvbi10ZXN0LWxpc3RfY29tcHJlc3Npb24tdGVzdC1tLTFmMzA4MS1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUM4RTtBQUNMOztBQU9sRSxNQUFNLDhCQUE4Qjs7NEdBQTlCLDhCQUE4QjsySEFBOUIsOEJBQThCOytIQUpoQyxDQUFDLDZFQUFzQixDQUFDO21JQUl0Qiw4QkFBOEIsbUJBSDFCLGtGQUF3QixhQUQ3Qiw2RUFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGlCO0FBRXFEO0FBQzJDO0FBQzVFO0FBQ3RCO0FBQ007QUFDWjtBQUNYO0FBQytDOzs7Ozs7O0FBRS9FLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDO0FBSTdCLE1BQU0sZUFBZTtJQXFCMUIsWUFDVSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLHlCQUFvRCxFQUNwRCxNQUFjLEVBQ2QsZUFBZ0MsRUFDaEMsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBTjlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFDckMsQ0FBQztJQTVCSixJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENB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O0lBRUssT0FBTzs7WUFDWCxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMseUJBQXlCLENBQUMsbUNBQW1DLENBQy9GLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxlQUFlLENBQ3JCO2lCQUNFLElBQUksQ0FBQyxvREFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xJLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxDQUNMLEdBQUc7WUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxZQUFZO2lCQUN0QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2hFLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztpQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDOztnRUFqR21CLFFBQVE7dUdBQVIsUUFBUSIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9jb21wcmVzc2lvbi10ZXN0LWxpc3QvY29tcHJlc3Npb24tdGVzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsLm1vZHVsZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIi4vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdE1vZGFsUGFnZSB9IGZyb20gJy4vY29tcHJlc3Npb24tdGVzdC1tb2RhbC5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0NvbXByZXNzaW9uVGVzdE1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ29tcHJlc3Npb25UZXN0TW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29tcHJlc3Npb25UZXN0TW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0UHJvcGVydHlOYW1lLCBpc0FycmF5VHlwZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5oZWxwZXJzJztcclxuaW1wb3J0IHsgTmV3QXR0YWNobWVudFNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdCYXNlUGFnZVNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZVNlcnZpY2Uge1xyXG4gIGdldCBab25lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmdab25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IEFsZXJ0Q29udHJvbGxlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFsZXJ0Q29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBUcmFuc2xhdGVTZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBjb25maXJtTGVhdmUocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5SRVFVSVJFRF9GSUVMRFNfTUlTU0lORycpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtUmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5DT05GSVJNX1JFU0VUJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUmVzZXREaWFsb2cobWVzc2FnZTogc3RyaW5nLCByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuWUVTJ10pLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ZRVMnXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICAgIGNvbnN0IHJlc2V0OiBib29sZWFuID0gcmVzdWx0LnJvbGUgIT09ICdjYW5jZWwnO1xyXG4gICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc2V0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCldID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICB0aGlzLnJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9uUmVzZXQpIHtcclxuICAgICAgICBvblJlc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhyZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGVmYXVsdFByb3BzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGNvbnN0IHByb3BOYW1lID0gZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICBpZiAoIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSkge1xyXG4gICAgICAvLyBJbml0IHRvIG5ldyBvYmplY3QgaWYgbnVsbFxyXG4gICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBpZiAoaXNBcnJheVR5cGUocmVnaXN0cmF0aW9uVGlkKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEltYWdlcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2VcclxuICAgICAgLmdldEF0dGFjaG1lbnRzKHJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgLnBpcGUoc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT4gZm9ya0pvaW4oYXR0YWNobWVudHMubWFwKChhKSA9PiB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQocmVnaXN0cmF0aW9uLmlkLCBhLmlkKSkpKSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdSZXNldCBpbWFnZXMgY29tcGxldGUnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKGVycm9yLCBERUJVR19UQUcsICdDb3VsZCBub3QgcmVzZXQgaW1hZ2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2U7XHJcbiAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlID0gYmFzZVBhZ2VTZXJ2aWNlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25UaWQgPSByZWdpc3RyYXRpb25UaWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIG1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5jcmVhdGVEZWZhdWx0UHJvcHMocmVnLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcmVhdGVJbml0T2JzZXJ2YWJsZSgpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdD8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25CZWZvcmVMZWF2ZT8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25SZXNldD8oKTogdm9pZDtcclxuXHJcbiAgaXNWYWxpZD8oKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8vIE5PVEU6IFJlbWVtYmVyIHRvIGFkZCBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdIGluIHBhZ2UgbW9kdWxlXHJcbiAgYXN5bmMgY2FuTGVhdmUoKSB7XHJcbiAgICAvLyBDaGVjayBpZiBpbXBsZW1lbnRhdGlvbiBwYWdlIGhhcyBpbXBsZW1lbnRlZCBjdXN0b20gaXNWYWxpZCBsb2dpY1xyXG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc1ZhbGlkID8gdGhpcy5pc1ZhbGlkKCkgOiB0cnVlKTtcclxuICAgIC8vIE9ubHkgcmV0dXJuIGFsZXJ0IGlmIHBhZ2UgaXMgbm90IGVtcHR5IGFuZCBpbnZhbGlkXHJcbiAgICBjb25zdCBpc0VtcHR5ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNFbXB0eSgpKTtcclxuICAgIGlmICghaXNFbXB0eSAmJiAhdmFsaWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1MZWF2ZSh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbml0T2JzZXJ2YWJsZSgpIHtcclxuICAgIGlmICh0aGlzLm9uSW5pdCkge1xyXG4gICAgICByZXR1cm4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5vbkluaXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHt9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkJlZm9yZUxlYXZlKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLm9uQmVmb3JlTGVhdmUoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGNsZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLlJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uLCBjbGVhbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gIShhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25UaWRcclxuICAgIClcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1SZXNldCh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldFJlc29sdmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnLycgK1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gICAgICAgIC5tYXAoKHYpID0+IHYudXJsLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC50b1N0cmluZygpKS5qb2luKCcvJykpXHJcbiAgICAgICAgLmZpbHRlcigocGF0aCkgPT4gISFwYXRoKVxyXG4gICAgICAgIC5qb2luKCcvJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRDb25maWd1cmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgLy8gICAgIHJldHVybiAnLycgKyB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gIC8vICAgICAgICAgLmZpbHRlcih2ID0+IHYucm91dGVDb25maWcpXHJcbiAgLy8gICAgICAgICAubWFwKHYgPT4gdi5yb3V0ZUNvbmZpZy5wYXRoKVxyXG4gIC8vICAgICAgICAgLmpvaW4oJy8nKTtcclxuICAvLyB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IndlYnBhY2s6Ly8vIn0=