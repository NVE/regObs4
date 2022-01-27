(function () {
  "use strict";

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_compression-test_compression-test_module_ts"], {
    /***/
    23107: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestPageModule": function CompressionTestPageModule() {
          return (
            /* binding */
            _CompressionTestPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _compression_test_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./compression-test.page */
      31401);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _components_snow_compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../components/snow/compression-test-list/compression-test-modal/compression-test-modal.module */
      93864);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316); // tslint:disable-next-line:max-line-length


      var routes = [{
        path: '',
        component: _compression_test_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestPage
      }];

      var _CompressionTestPageModule = function _CompressionTestPageModule() {
        _classCallCheck(this, _CompressionTestPageModule);
      };

      _CompressionTestPageModule.ɵfac = function CompressionTestPageModule_Factory(t) {
        return new (t || _CompressionTestPageModule)();
      };

      _CompressionTestPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _CompressionTestPageModule
      });
      _CompressionTestPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _components_snow_compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_CompressionTestPageModule, {
          declarations: [_compression_test_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _components_snow_compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    31401: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestPage": function CompressionTestPage() {
          return (
            /* binding */
            _CompressionTestPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../components/snow/compression-test-list/compression-test-list.component */
      52386);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function CompressionTestPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("reset", function CompressionTestPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r1.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "app-compression-test-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("testsChange", function CompressionTestPage_app_registration_content_wrapper_8_Template_app_compression_test_list_testsChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r3.registration.request.CompressionTest = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "app-add-picture-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("tests", ctx_r0.registration.request.CompressionTest);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 8, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
        }
      }

      var _CompressionTestPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_CompressionTestPage, _base_page__WEBPACK_I);

        var _super = _createSuper(_CompressionTestPage);

        function _CompressionTestPage(basePageService, activatedRoute) {
          _classCallCheck(this, _CompressionTestPage);

          return _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.CompressionTest, basePageService, activatedRoute);
        }

        return _CompressionTestPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _CompressionTestPage.ɵfac = function CompressionTestPage_Factory(t) {
        return new (t || _CompressionTestPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute));
      };

      _CompressionTestPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
        type: _CompressionTestPage,
        selectors: [["app-compression-test"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], [3, "tests", "testsChange"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]],
        template: function CompressionTestPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, CompressionTestPage_app_registration_content_wrapper_8_Template, 8, 10, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.COMPRESSION_TEST.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.CompressionTest);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _components_snow_compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_5__.CompressionTestListComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonLabel, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__.AddPictureItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBSUE7OztBQUdBLFVBQU1BLE1BQU0sR0FBVyxDQUNyQjtBQUNFQyxZQUFJLEVBQUUsRUFEUjtBQUVFQyxpQkFBUyxFQUFFQztBQUZiLE9BRHFCLENBQXZCOztVQWVhQzs7Ozs7eUJBQUFBO0FBQXlCOzs7Y0FBekJBOzs7a0JBUEYsQ0FDUEMsNkVBRE8sRUFFUEMsdUpBRk8sRUFHUEMsbUVBQXNCUCxNQUF0QixDQUhPOzs7OzRIQU9FSSw0QkFBeUI7QUFBQUkseUJBRnJCTCx1RUFFcUI7QUFGRk0sb0JBSmhDSiw2RUFJZ0MsRUFIaENDLHVKQUdnQyxFQUhGQyx5REFHRTtBQUVFO0FBTEo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05oQ0c7O0FBQ29FQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUNsRUE7O0FBQTJCQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFpREE7O0FBQzVFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUdGQTs7QUFDRkE7Ozs7OztBQVpFQSx3R0FBNkIsaUJBQTdCLEVBQTZCQyxzQkFBN0I7O0FBQzJCRDs7QUFBQUE7O0FBSXJCQTs7QUFBQUE7O0FBR2tCQTs7QUFBQUEsK0dBQW9DLGdCQUFwQyxFQUFvQ0Msc0JBQXBDLEVBQW9DLGlCQUFwQyxFQUFvQ0Esc0JBQXBDLEVBQW9DLGFBQXBDLEVBQW9DQSxvQkFBcEM7Ozs7VUNUZkM7Ozs7O0FBQ1gsc0NBQ0VDLGVBREYsRUFFRUMsY0FGRixFQUVnQztBQUFBOztBQUFBLG1DQUV4QkMsb0hBRndCLEVBRVNGLGVBRlQsRUFFMEJDLGNBRjFCO0FBRy9COzs7UUFOc0NFOzs7eUJBQTVCSixzQkFBbUJGO0FBQUE7OztjQUFuQkU7QUFBbUJLO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURYaENaOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFjRkE7Ozs7QUFuQk1BOztBQUFBQTs7QUFLK0JBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfY29tcHJlc3Npb25fdGVzdF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJDb21wcmVzc2lvblRlc3RQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2NvbXBvbmVudHNfc25vd19jb21wcmVzc2lvbl90ZXN0X2xpc3RfY29tcHJlc3Npb25fdGVzdF9tb2RhbF9jb21wcmVzc2lvbl90ZXN0X21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJkZWNsYXJhdGlvbnMiLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiY3R4X3IwIiwiQ29tcHJlc3Npb25UZXN0UGFnZSIsImJhc2VQYWdlU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2Jhc2VfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwic2VsZWN0b3JzIiwiZmVhdHVyZXMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2NvbXByZXNzaW9uLXRlc3QvY29tcHJlc3Npb24tdGVzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RQYWdlIH0gZnJvbSAnLi9jb21wcmVzc2lvbi10ZXN0LnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvY29tcHJlc3Npb24tdGVzdC1saXN0L2NvbXByZXNzaW9uLXRlc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IENvbXByZXNzaW9uVGVzdFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ29tcHJlc3Npb25UZXN0UGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuQ09NUFJFU1NJT05fVEVTVC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdFwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxhcHAtY29tcHJlc3Npb24tdGVzdC1saXN0IFsodGVzdHMpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdFwiPjwvYXBwLWNvbXByZXNzaW9uLXRlc3QtbGlzdD5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+XHJcbiAgICAgIDwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1jb21wcmVzc2lvbi10ZXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2NvbXByZXNzaW9uLXRlc3QucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdFBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkNvbXByZXNzaW9uVGVzdCwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==