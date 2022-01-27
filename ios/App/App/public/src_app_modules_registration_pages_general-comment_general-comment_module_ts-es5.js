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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_general-comment_general-comment_module_ts"], {
    /***/
    40002: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GeneralCommentPageModule": function GeneralCommentPageModule() {
          return (
            /* binding */
            _GeneralCommentPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _general_comment_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./general-comment.page */
      85451);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../add-web-url-modal/add-web-url-modal.module */
      22838);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _general_comment_page__WEBPACK_IMPORTED_MODULE_0__.GeneralCommentPage
      }];

      var _GeneralCommentPageModule = function _GeneralCommentPageModule() {
        _classCallCheck(this, _GeneralCommentPageModule);
      };

      _GeneralCommentPageModule.ɵfac = function GeneralCommentPageModule_Factory(t) {
        return new (t || _GeneralCommentPageModule)();
      };

      _GeneralCommentPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _GeneralCommentPageModule
      });
      _GeneralCommentPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_GeneralCommentPageModule, {
          declarations: [_general_comment_page__WEBPACK_IMPORTED_MODULE_0__.GeneralCommentPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    85451: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GeneralCommentPage": function GeneralCommentPage() {
          return (
            /* binding */
            _GeneralCommentPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../base.page */
      81877);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../base-page-service */
      35140);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/add-web-url-item/add-web-url-item.component */
      15248);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function GeneralCommentPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r1.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "app-text-comment", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r3.registration.request.GeneralObservation.ObsComment = $event;
          });

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

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("weburlsChange", function GeneralCommentPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_22_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r2);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r4.registration.request.GeneralObservation.Urls = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

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
        }
      }

      var _GeneralCommentPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_GeneralCommentPage, _base_page__WEBPACK_I);

        var _super = _createSuper(_GeneralCommentPage);

        function _GeneralCommentPage(basePageService, activatedRoute) {
          _classCallCheck(this, _GeneralCommentPage);

          return _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.GeneralObservation, basePageService, activatedRoute);
        }

        return _GeneralCommentPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _GeneralCommentPage.ɵfac = function GeneralCommentPage_Factory(t) {
        return new (t || _GeneralCommentPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute));
      };

      _GeneralCommentPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _GeneralCommentPage,
        selectors: [["app-general-comment"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "value", "title", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [1, "ion-text-wrap"], [3, "weburls", "weburlsChange"]],
        template: function GeneralCommentPage_Template(rf, ctx) {
          if (rf & 1) {
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
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.GENERAL_COMMENT.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.GeneralObservation);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_6__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItemDivider, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_7__.AddWebUrlItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnZW5lcmFsLWNvbW1lbnQucGFnZS5zY3NzIn0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxVQUFNQSxNQUFNLEdBQVcsQ0FDckI7QUFDRUMsWUFBSSxFQUFFLEVBRFI7QUFFRUMsaUJBQVMsRUFBRUM7QUFGYixPQURxQixDQUF2Qjs7VUFlYUM7Ozs7O3lCQUFBQTtBQUF3Qjs7O2NBQXhCQTs7O2tCQVBGLENBQ1BDLDZFQURPLEVBRVBDLGlHQUZPLEVBR1BDLG1FQUFzQlAsTUFBdEIsQ0FITzs7Ozs0SEFPRUksMkJBQXdCO0FBQUFJLHlCQUZwQkwscUVBRW9CO0FBRkZNLG9CQUovQkosNkVBSStCLEVBSC9CQyxpR0FHK0IsRUFIUEMseURBR087QUFFRTtBQUxUOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMMUJHOztBQUNvRUE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDbEVBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQWtCQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOzs7Ozs7QUFFa0VBOztBQUNwRkE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUdBQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUFzQkE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBMkRBOztBQUNuRkE7O0FBQ0ZBOzs7Ozs7QUE5QkVBLHdHQUE2QixpQkFBN0IsRUFBNkJDLHNCQUE3Qjs7QUFJTUQ7O0FBQUFBOztBQUlGQTs7QUFBQUE7O0FBQ0FBOztBQUZnQkE7O0FBS2RBOztBQUFBQTs7QUFHa0JBOztBQUFBQSwrR0FBb0MsZ0JBQXBDLEVBQW9DQyxzQkFBcEMsRUFBb0MsaUJBQXBDLEVBQW9DQSxzQkFBcEMsRUFBb0MsYUFBcEMsRUFBb0NBLG9CQUFwQzs7QUFLbEJEOztBQUFBQTs7QUFLQUE7O0FBQUFBOztBQUdrQkE7O0FBQUFBOzs7O1VDN0JmRTs7Ozs7QUFDWCxxQ0FDRUMsZUFERixFQUVFQyxjQUZGLEVBRWdDO0FBQUE7O0FBQUEsbUNBRXhCQyx1SEFGd0IsRUFFWUYsZUFGWixFQUU2QkMsY0FGN0I7QUFHL0I7OztRQU5xQ0U7Ozt5QkFBM0JKLHFCQUFrQkY7QUFBQTs7O2NBQWxCRTtBQUFrQks7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRFgvQlo7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQWdDRkE7Ozs7QUFyQ01BOztBQUFBQTs7QUFLK0JBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfZ2VuZXJhbF9jb21tZW50X3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIkdlbmVyYWxDb21tZW50UGFnZU1vZHVsZSIsIl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hZGRfd2ViX3VybF9tb2RhbF9hZGRfd2ViX3VybF9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsImN0eF9yMCIsIkdlbmVyYWxDb21tZW50UGFnZSIsImJhc2VQYWdlU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiX2Jhc2VfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwic2VsZWN0b3JzIiwiZmVhdHVyZXMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9nZW5lcmFsLWNvbW1lbnQvZ2VuZXJhbC1jb21tZW50Lm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9nZW5lcmFsLWNvbW1lbnQvZ2VuZXJhbC1jb21tZW50LnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9nZW5lcmFsLWNvbW1lbnQvZ2VuZXJhbC1jb21tZW50LnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBHZW5lcmFsQ29tbWVudFBhZ2UgfSBmcm9tICcuL2dlbmVyYWwtY29tbWVudC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogR2VuZXJhbENvbW1lbnRQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgQWRkV2ViVXJsTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0dlbmVyYWxDb21tZW50UGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdlbmVyYWxDb21tZW50UGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuR2VuZXJhbE9ic2VydmF0aW9uXCJcclxuICAgIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7XCJSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkFERF9OT1RFU19IRUFERVJcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5HZW5lcmFsT2JzZXJ2YXRpb24uT2JzQ29tbWVudFwiXHJcbiAgICAgICAgdGl0bGU9XCJ7eydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEUnIHwgdHJhbnNsYXRlIH19XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cInt7J1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQ09NTUVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3tcIlJFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuU1VCVElUTEVcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5ERVNDUklQVElPTicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfV0VCX1VSTC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtd2ViLXVybC1pdGVtIFsod2VidXJscyldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuR2VuZXJhbE9ic2VydmF0aW9uLlVybHNcIj48L2FwcC1hZGQtd2ViLXVybC1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWdlbmVyYWwtY29tbWVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dlbmVyYWwtY29tbWVudC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dlbmVyYWwtY29tbWVudC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2VuZXJhbENvbW1lbnRQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5HZW5lcmFsT2JzZXJ2YXRpb24sIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxufVxyXG4iXX0=