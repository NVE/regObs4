(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_login_pages_login_login_module_ts"], {
    /***/
    34351: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LoginPageModule": function LoginPageModule() {
          return (
            /* binding */
            _LoginPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _login_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./login.page */
      17374);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared/shared.module */
      72271);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage
      }];

      var _LoginPageModule = function _LoginPageModule() {
        _classCallCheck(this, _LoginPageModule);
      };

      _LoginPageModule.ɵfac = function LoginPageModule_Factory(t) {
        return new (t || _LoginPageModule)();
      };

      _LoginPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _LoginPageModule
      });
      _LoginPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_LoginPageModule, {
          declarations: [_login_page__WEBPACK_IMPORTED_MODULE_0__.LoginPage],
          imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    17374: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LoginPage": function LoginPage() {
          return (
            /* binding */
            _LoginPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../settings */
      30015);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../core/services/external-link/external-link.service */
      11810);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function LoginPage_ion_content_7_ion_list_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-button", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ion_content_7_ion_list_1_Template_ion_button_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r5.openMyPage();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](6, "ion-icon", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ion_content_7_ion_list_1_Template_ion_button_click_9_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r7.logout();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var loggedInUser_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 4, "LOGIN.LOGGED_IN_AS"), " ", loggedInUser_r3.email, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "LOGIN.MY_PROFILE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 8, "LOGIN.LOGOUT"), "");
        }
      }

      function LoginPage_ion_content_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-content", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, LoginPage_ion_content_7_ion_list_1_Template, 12, 10, "ion-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var loggedInUser_r3 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", loggedInUser_r3.isLoggedIn)("ngIfElse", _r1);
        }
      }

      function LoginPage_ng_template_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function LoginPage_ng_template_9_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r9.signIn();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "LOGIN.LOGIN"), " ");
        }
      }

      var _LoginPage = /*#__PURE__*/function () {
        function _LoginPage(regobsAuthService, userSettingService, externalLinkService) {
          _classCallCheck(this, _LoginPage);

          this.regobsAuthService = regobsAuthService;
          this.userSettingService = userSettingService;
          this.externalLinkService = externalLinkService;
        }

        _createClass(_LoginPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.loggedInUser$ = this.regobsAuthService.loggedInUser$;
          }
        }, {
          key: "signIn",
          value: function signIn() {
            return this.regobsAuthService.signIn();
          }
        }, {
          key: "logout",
          value: function logout() {
            return this.regobsAuthService.logout();
          }
        }, {
          key: "openMyPage",
          value: function openMyPage() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var myPageUrl, currentLangKey;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.userSettingService.appMode$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(function (appMode) {
                        return _settings__WEBPACK_IMPORTED_MODULE_2__.settings.authConfig[appMode].myPageUrl;
                      }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).toPromise();

                    case 2:
                      myPageUrl = _context.sent;
                      _context.next = 5;
                      return this.userSettingService.language$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).toPromise();

                    case 5:
                      currentLangKey = _context.sent;
                      this.externalLinkService.openExternalLink("".concat(myPageUrl, "?Culture=").concat(this.getSupportedMyPageLocales(currentLangKey)));

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "getSupportedMyPageLocales",
          value: function getSupportedMyPageLocales(langKey) {
            if (langKey === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.LangKey.nb || langKey === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.LangKey.nn) {
              return 'nb-NO';
            }

            return 'en';
          }
        }]);

        return _LoginPage;
      }();

      _LoginPage.ɵfac = function LoginPage_Factory(t) {
        return new (t || _LoginPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_0__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_external_link_external_link_service__WEBPACK_IMPORTED_MODULE_3__.ExternalLinkService));
      };

      _LoginPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _LoginPage,
        selectors: [["app-login"]],
        decls: 11,
        vars: 6,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], ["class", "ion-padding", 4, "ngIf"], ["login", ""], [1, "ion-padding"], ["lines", "none", 4, "ngIf", "ngIfElse"], ["lines", "none"], [1, "ion-text-wrap"], ["type", "button", "fill", "outline", "expand", "block", 3, "click"], ["slot", "start", "name", "push-outline"], ["expand", "block", "type", "submit", "color", "varsom-orange", 1, "logout-button", 3, "click"]],
        template: function LoginPage_Template(rf, ctx) {
          if (rf & 1) {
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
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 2, "LOGIN.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 4, ctx.loggedInUser$));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_11__.AsyncPipe],
        styles: [".logout-button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  margin-left: 0px;\n  margin-right: 0px;\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0FBQ0oiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ291dC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcclxuICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG59Il19 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dGVzIiwicGF0aCIsImNvbXBvbmVudCIsIl9sb2dpbl9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJMb2dpblBhZ2VNb2R1bGUiLCJfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIl9yMSIsIkxvZ2luUGFnZSIsInJlZ29ic0F1dGhTZXJ2aWNlIiwidXNlclNldHRpbmdTZXJ2aWNlIiwiZXh0ZXJuYWxMaW5rU2VydmljZSIsImxvZ2dlZEluVXNlciQiLCJzaWduSW4iLCJsb2dvdXQiLCJhcHBNb2RlJCIsInBpcGUiLCJhcHBNb2RlIiwiX3NldHRpbmdzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJteVBhZ2VVcmwiLCJ0b1Byb21pc2UiLCJsYW5ndWFnZSQiLCJjdXJyZW50TGFuZ0tleSIsIm9wZW5FeHRlcm5hbExpbmsiLCJnZXRTdXBwb3J0ZWRNeVBhZ2VMb2NhbGVzIiwibGFuZ0tleSIsIl92YXJzb21fcmVnb2JzX2NvbW1vbl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJzZWxlY3RvcnMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL2xvZ2luL3BhZ2VzL2xvZ2luL2xvZ2luLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL2xvZ2luL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL2xvZ2luL3BhZ2VzL2xvZ2luL2xvZ2luLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBMb2dpblBhZ2UgfSBmcm9tICcuL2xvZ2luLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogTG9naW5QYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTG9naW5QYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5QYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdMT0dJTi5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudCBjbGFzcz1cImlvbi1wYWRkaW5nXCIgKm5nSWY9XCJsb2dnZWRJblVzZXIkIHwgYXN5bmMgYXMgbG9nZ2VkSW5Vc2VyXCI+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwibm9uZVwiICpuZ0lmPVwibG9nZ2VkSW5Vc2VyLmlzTG9nZ2VkSW4gZWxzZSBsb2dpblwiPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPnt7ICdMT0dJTi5MT0dHRURfSU5fQVMnIHwgdHJhbnNsYXRlIH19IHt7IGxvZ2dlZEluVXNlci5lbWFpbCB9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8aW9uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZmlsbD1cIm91dGxpbmVcIiBleHBhbmQ9XCJibG9ja1wiIChjbGljayk9XCJvcGVuTXlQYWdlKClcIj5cclxuICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJwdXNoLW91dGxpbmVcIj48L2lvbi1pY29uPlxyXG4gICAgICB7eydMT0dJTi5NWV9QUk9GSUxFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPGlvbi1idXR0b24gY2xhc3M9XCJsb2dvdXQtYnV0dG9uXCIgZXhwYW5kPVwiYmxvY2tcIiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cImxvZ291dCgpXCI+XHJcbiAgICAgIHt7ICdMT0dJTi5MT0dPVVQnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gIDwvaW9uLWxpc3Q+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbG9naW4+XHJcbiAgPGlvbi1idXR0b24gY2xhc3M9XCJsb2dvdXQtYnV0dG9uXCIgZXhwYW5kPVwiYmxvY2tcIiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cInNpZ25JbigpXCI+XHJcbiAgICB7eyAnTE9HSU4uTE9HSU4nIHwgdHJhbnNsYXRlIH19XHJcbiAgPC9pb24tYnV0dG9uPlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2VkSW5Vc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2xvZ2dlZC1pbi11c2VyLm1vZGVsJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBtYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEV4dGVybmFsTGlua1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2V4dGVybmFsLWxpbmsvZXh0ZXJuYWwtbGluay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGFuZ0tleSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWxvZ2luJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5QYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBsb2dnZWRJblVzZXIkOiBPYnNlcnZhYmxlPExvZ2dlZEluVXNlcj47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdvYnNBdXRoU2VydmljZTogUmVnb2JzQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHRlcm5hbExpbmtTZXJ2aWNlOiBFeHRlcm5hbExpbmtTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nZ2VkSW5Vc2VyJCA9IHRoaXMucmVnb2JzQXV0aFNlcnZpY2UubG9nZ2VkSW5Vc2VyJDtcclxuICB9XHJcblxyXG4gIHNpZ25JbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLnNpZ25JbigpO1xyXG4gIH1cclxuXHJcbiAgbG9nb3V0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnb2JzQXV0aFNlcnZpY2UubG9nb3V0KCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvcGVuTXlQYWdlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgbXlQYWdlVXJsID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UuYXBwTW9kZSRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChhcHBNb2RlKSA9PiBzZXR0aW5ncy5hdXRoQ29uZmlnW2FwcE1vZGVdLm15UGFnZVVybCksXHJcbiAgICAgICAgdGFrZSgxKVxyXG4gICAgICApXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGN1cnJlbnRMYW5nS2V5ID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UubGFuZ3VhZ2UkXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMuZXh0ZXJuYWxMaW5rU2VydmljZS5vcGVuRXh0ZXJuYWxMaW5rKFxyXG4gICAgICBgJHtteVBhZ2VVcmx9P0N1bHR1cmU9JHt0aGlzLmdldFN1cHBvcnRlZE15UGFnZUxvY2FsZXMoY3VycmVudExhbmdLZXkpfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFN1cHBvcnRlZE15UGFnZUxvY2FsZXMobGFuZ0tleTogTGFuZ0tleSkge1xyXG4gICAgaWYgKGxhbmdLZXkgPT09IExhbmdLZXkubmIgfHwgbGFuZ0tleSA9PT0gTGFuZ0tleS5ubikge1xyXG4gICAgICByZXR1cm4gJ25iLU5PJztcclxuICAgIH1cclxuICAgIHJldHVybiAnZW4nO1xyXG4gIH1cclxufVxyXG4iXX0=