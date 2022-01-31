"use strict";
(self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_auth_pages_auth-callback_auth-callback_module_ts"],{

/***/ 16831:
/*!**********************************************************************************!*\
  !*** ./src/app/modules/auth/pages/auth-callback/auth-callback-routing.module.ts ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthCallbackPageRoutingModule": function() { return /* binding */ AuthCallbackPageRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _auth_callback_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-callback.page */ 46872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);




const routes = [
    {
        path: '',
        component: _auth_callback_page__WEBPACK_IMPORTED_MODULE_0__.AuthCallbackPage
    }
];
class AuthCallbackPageRoutingModule {
}
AuthCallbackPageRoutingModule.ɵfac = function AuthCallbackPageRoutingModule_Factory(t) { return new (t || AuthCallbackPageRoutingModule)(); };
AuthCallbackPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AuthCallbackPageRoutingModule });
AuthCallbackPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AuthCallbackPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 62185:
/*!**************************************************************************!*\
  !*** ./src/app/modules/auth/pages/auth-callback/auth-callback.module.ts ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthCallbackPageModule": function() { return /* binding */ AuthCallbackPageModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 7602);
/* harmony import */ var _auth_callback_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-callback-routing.module */ 16831);
/* harmony import */ var _auth_callback_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-callback.page */ 46872);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);






class AuthCallbackPageModule {
}
AuthCallbackPageModule.ɵfac = function AuthCallbackPageModule_Factory(t) { return new (t || AuthCallbackPageModule)(); };
AuthCallbackPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AuthCallbackPageModule });
AuthCallbackPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _auth_callback_routing_module__WEBPACK_IMPORTED_MODULE_0__.AuthCallbackPageRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AuthCallbackPageModule, { declarations: [_auth_callback_page__WEBPACK_IMPORTED_MODULE_1__.AuthCallbackPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        _auth_callback_routing_module__WEBPACK_IMPORTED_MODULE_0__.AuthCallbackPageRoutingModule] }); })();


/***/ }),

/***/ 46872:
/*!************************************************************************!*\
  !*** ./src/app/modules/auth/pages/auth-callback/auth-callback.page.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthCallbackPage": function() { return /* binding */ AuthCallbackPage; }
/* harmony export */ });
/* harmony import */ var _services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/regobs-auth.service */ 18955);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 7602);






class AuthCallbackPage {
    constructor(regobsAuthService, router) {
        this.regobsAuthService = regobsAuthService;
        this.router = router;
    }
    ngOnInit() {
        this.regobsAuthService.authorizationCallback(window.location.origin + this.router.url);
    }
}
AuthCallbackPage.ɵfac = function AuthCallbackPage_Factory(t) { return new (t || AuthCallbackPage)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
AuthCallbackPage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AuthCallbackPage, selectors: [["app-auth-callback"]], decls: 2, vars: 0, template: function AuthCallbackPage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "ion-spinner");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonSpinner], styles: ["ion-content[_ngcontent-%COMP%] {\n  --ion-background-color: var(--ion-color-varsom-blue);\n}\nion-content[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  color: #fff;\n  width: 70px;\n  height: 70px;\n  position: absolute;\n  top: calc(50% - 35px);\n  left: calc(50% - 35px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgtY2FsbGJhY2sucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0RBQUE7QUFDRjtBQUFFO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLHNCQUFBO0FBRUoiLCJmaWxlIjoiYXV0aC1jYWxsYmFjay5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudCB7XHJcbiAgLS1pb24tYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1ibHVlKTtcclxuICBpb24tc3Bpbm5lciB7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHdpZHRoOiA3MHB4O1xyXG4gICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiBjYWxjKDUwJSAtIDM1cHgpO1xyXG4gICAgbGVmdDogY2FsYyg1MCUgLSAzNXB4KTtcclxuICB9XHJcbn1cclxuIl19 */"] });


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwcF9tb2R1bGVzX2F1dGhfcGFnZXNfYXV0aC1jYWxsYmFja19hdXRoLWNhbGxiYWNrX21vZHVsZV90cy1lczIwMTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUN1RDtBQUVDOzs7QUFFeEQsTUFBTSxNQUFNLEdBQVc7SUFDckI7UUFDRSxJQUFJLEVBQUUsRUFBRTtRQUNSLFNBQVMsRUFBRSxpRUFBZ0I7S0FDNUI7Q0FDRixDQUFDO0FBTUssTUFBTSw2QkFBNkI7OzBHQUE3Qiw2QkFBNkI7MEhBQTdCLDZCQUE2Qjs4SEFIL0IsQ0FBQyxrRUFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM5Qix5REFBWTttSUFFWCw2QkFBNkIsb0ZBRjlCLHlEQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNidUI7QUFDRjtBQUVBO0FBRWtDO0FBRXZCOztBQVdqRCxNQUFNLHNCQUFzQjs7NEZBQXRCLHNCQUFzQjttSEFBdEIsc0JBQXNCO3VIQVJ4QjtZQUNQLHlEQUFZO1lBQ1osdURBQVc7WUFDWCx1REFBVztZQUNYLHdGQUE2QjtTQUM5QjttSUFHVSxzQkFBc0IsbUJBRmxCLGlFQUFnQixhQUw3Qix5REFBWTtRQUNaLHVEQUFXO1FBQ1gsdURBQVc7UUFDWCx3RkFBNkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkUTtBQUM4Qjs7Ozs7QUFPaEUsTUFBTSxnQkFBZ0I7SUFDM0IsWUFDVSxpQkFBb0MsRUFDcEMsTUFBYztRQURkLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUNyQixDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ3pDLENBQUM7SUFDSixDQUFDOztnRkFWVSxnQkFBZ0I7OEdBQWhCLGdCQUFnQjtRQ1Q3Qiw4RUFBYTtRQUNYLHlFQUEyQjtRQUM3Qiw0REFBYyIsInNvdXJjZXMiOlsiLi9zcmMvYXBwL21vZHVsZXMvYXV0aC9wYWdlcy9hdXRoLWNhbGxiYWNrL2F1dGgtY2FsbGJhY2stcm91dGluZy5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9hdXRoL3BhZ2VzL2F1dGgtY2FsbGJhY2svYXV0aC1jYWxsYmFjay5tb2R1bGUudHMiLCIuL3NyYy9hcHAvbW9kdWxlcy9hdXRoL3BhZ2VzL2F1dGgtY2FsbGJhY2svYXV0aC1jYWxsYmFjay5wYWdlLnRzIiwiLi9zcmMvYXBwL21vZHVsZXMvYXV0aC9wYWdlcy9hdXRoLWNhbGxiYWNrL2F1dGgtY2FsbGJhY2sucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IEF1dGhDYWxsYmFja1BhZ2UgfSBmcm9tICcuL2F1dGgtY2FsbGJhY2sucGFnZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogQXV0aENhbGxiYWNrUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBleHBvcnRzOiBbUm91dGVyTW9kdWxlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aENhbGxiYWNrUGFnZVJvdXRpbmdNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IEF1dGhDYWxsYmFja1BhZ2VSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9hdXRoLWNhbGxiYWNrLXJvdXRpbmcubW9kdWxlJztcclxuXHJcbmltcG9ydCB7IEF1dGhDYWxsYmFja1BhZ2UgfSBmcm9tICcuL2F1dGgtY2FsbGJhY2sucGFnZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgSW9uaWNNb2R1bGUsXHJcbiAgICBBdXRoQ2FsbGJhY2tQYWdlUm91dGluZ01vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQXV0aENhbGxiYWNrUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF1dGhDYWxsYmFja1BhZ2VNb2R1bGUge31cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWF1dGgtY2FsbGJhY2snLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdXRoLWNhbGxiYWNrLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXV0aC1jYWxsYmFjay5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aENhbGxiYWNrUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZWdvYnNBdXRoU2VydmljZS5hdXRob3JpemF0aW9uQ2FsbGJhY2soXHJcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyB0aGlzLnJvdXRlci51cmxcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tY29udGVudD5cclxuICA8aW9uLXNwaW5uZXI+PC9pb24tc3Bpbm5lcj5cclxuPC9pb24tY29udGVudD4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290Ijoid2VicGFjazovLy8ifQ==