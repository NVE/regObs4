(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_user-settings_user-settings_module_ts"], {
    /***/
    2464: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppResetService": function AppResetService() {
          return (
            /* binding */
            _AppResetService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_db_helper_db_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../core/services/db-helper/db-helper.service */
      39905);
      /* harmony import */


      var _logging_logging_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../logging/logging.service */
      93042);
      /* harmony import */


      var _logging_log_level_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../logging/log-level.model */
      73465);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var DEBUG_TAG = 'AppResetService';

      var _AppResetService = /*#__PURE__*/function () {
        function _AppResetService(services, dbHelperService, loggingService) {
          _classCallCheck(this, _AppResetService);

          this.services = services;
          this.dbHelperService = dbHelperService;
          this.loggingService = loggingService;
        }

        _createClass(_AppResetService, [{
          key: "resetApp",
          value: function resetApp() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return Promise.all(this.services.map(function (s) {
                        return Promise.resolve(s.appOnReset());
                      }));

                    case 2:
                      _context.next = 4;
                      return this.dbHelperService.resetDb(function (table) {
                        _this.loggingService.log("Error reset table ".concat(table), null, _logging_log_level_model__WEBPACK_IMPORTED_MODULE_2__.LogLevel.Warning, DEBUG_TAG);
                      });

                    case 4:
                      _context.next = 6;
                      return Promise.all(this.services.map(function (s) {
                        return Promise.resolve(s.appOnResetComplete ? s.appOnResetComplete() : true);
                      }));

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }]);

        return _AppResetService;
      }();

      _AppResetService.ɵfac = function AppResetService_Factory(t) {
        return new (t || _AppResetService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"]('OnReset'), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_core_services_db_helper_db_helper_service__WEBPACK_IMPORTED_MODULE_0__.DbHelperService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_logging_logging_service__WEBPACK_IMPORTED_MODULE_1__.LoggingService));
      };

      _AppResetService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
        token: _AppResetService,
        factory: _AppResetService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    82574: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UserSettingsPageModule": function UserSettingsPageModule() {
          return (
            /* binding */
            _UserSettingsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _user_settings_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./user-settings.page */
      42839);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../modules/shared/pipes/format-date/format-date.pipe */
      16531);

      var routes = [{
        path: '',
        component: _user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage
      }];

      var _UserSettingsPageModule = function _UserSettingsPageModule() {
        _classCallCheck(this, _UserSettingsPageModule);
      };

      _UserSettingsPageModule.ɵfac = function UserSettingsPageModule_Factory(t) {
        return new (t || _UserSettingsPageModule)();
      };

      _UserSettingsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _UserSettingsPageModule
      });
      _UserSettingsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_UserSettingsPageModule, {
          declarations: [_user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage],
          imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
        });
      })();

      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetComponentScope"](_user_settings_page__WEBPACK_IMPORTED_MODULE_0__.UserSettingsPage, [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_3__.SelectComponent], [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe]);
      /***/

    },

    /***/
    42839: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "UserSettingsPage": function UserSettingsPage() {
          return (
            /* binding */
            _UserSettingsPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _core_services_app_version_app_version_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/app-version/app-version.service */
      58647);
      /* harmony import */


      var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../modules/shared/services/logging/log-level.model */
      73465);
      /* harmony import */


      var _modules_shared_services_app_reset_app_reset_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../modules/shared/services/app-reset/app-reset.service */
      2464);
      /* harmony import */


      var src_app_modules_shared_services_logging_file_logging_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/modules/shared/services/logging/file-logging.service */
      90654);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);

      function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, " GPS debug ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-toggle", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template_ion_toggle_ngModelChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);

            return ctx_r3.userSettings.featureToggeGpsDebug = $event;
          })("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template_ion_toggle_ngModelChange_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r4);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);

            return ctx_r5.updateSettings();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r2.userSettings.featureToggeGpsDebug);
        }
      }

      function UserSettingsPage_ion_content_7_ng_container_16_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_item_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r6.versionClick();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-text", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-text", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](11, "formatDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "ion-label", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "app-select", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("selectedValueChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_app_select_selectedValueChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r8.userSettings.appMode = $event;
          })("selectedValueChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_app_select_selectedValueChange_16_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r9.updateSettings();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](20, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](21, "ion-toggle", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_toggle_ngModelChange_21_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r10.userSettings.useRetinaMap = $event;
          })("ngModelChange", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_toggle_ngModelChange_21_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r11.updateSettings();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](22, UserSettingsPage_ion_content_7_ng_container_16_ion_item_22_Template, 4, 1, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](23, "ion-list", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "ion-button", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_24_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r12.updateDropdowns();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](25, "ion-icon", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](26);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](27, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](28, "ion-button", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_28_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r13.sendLogs();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](29, "ion-icon", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30, " Send logger til Regobs Team ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "ion-button", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_ng_container_16_Template_ion_button_click_31_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

            return ctx_r14.confirmReset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](32, "ion-icon", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](33);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](34, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 17, "SETTINGS.APP_VERSION"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r1.version.version, " (", ctx_r1.version.buildNumber, ") ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", ctx_r1.version.revision, " - ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 19, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](11, 21, ctx_r1.version.date)), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 23, "SETTINGS.APPMODE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("selectedValue", ctx_r1.userSettings.appMode)("options", ctx_r1.appModeOptions)("showReset", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](20, 25, "SETTINGS.USE_RETINA_MAP"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r1.userSettings.useRetinaMap);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.userSettings.featureToggleDeveloperMode);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](27, 27, "SETTINGS.UPDATE_DROPDOWNS"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx_r1.isUpdating);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](34, 29, "SETTINGS.RESET"), " ");
        }
      }

      function UserSettingsPage_ion_content_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-content", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-toggle", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r15.userSettings.emailReceipt = $event;
          })("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r17.updateSettings();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "ion-toggle", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r18.userSettings.consentForSendingAnalytics = $event;
          })("ngModelChange", function UserSettingsPage_ion_content_7_Template_ion_toggle_ngModelChange_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r19.updateSettings();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-button", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function UserSettingsPage_ion_content_7_Template_ion_button_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r16);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r20.toggleAdvanced();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](13, "ion-icon", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, UserSettingsPage_ion_content_7_ng_container_16_Template, 35, 31, "ng-container", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 7, "SETTINGS.EMAIL_RECEIPT"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.userSettings.emailReceipt);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 9, "SETTINGS.ALLOW_ANALYTICS"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.userSettings.consentForSendingAnalytics);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("name", ctx_r0.showAdvanced ? "chevron-up" : "chevron-down");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 11, ctx_r0.showAdvanced ? "SETTINGS.HIDE_ADVANCED" : "SETTINGS.SHOW_ADVANCED"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.showAdvanced);
        }
      }

      var DEBUG_TAG = 'UserSettingsPage';
      var TAPS_TO_ENABLE_TEST_MODE = 7;

      var _UserSettingsPage = /*#__PURE__*/function () {
        function _UserSettingsPage(userSettingService, kdvService, ngZone, loggingService, translateService, alertController, appVersionService, loadingController, appResetService, navController, fileLoggingService) {
          _classCallCheck(this, _UserSettingsPage);

          this.userSettingService = userSettingService;
          this.kdvService = kdvService;
          this.ngZone = ngZone;
          this.loggingService = loggingService;
          this.translateService = translateService;
          this.alertController = alertController;
          this.appVersionService = appVersionService;
          this.loadingController = loadingController;
          this.appResetService = appResetService;
          this.navController = navController;
          this.fileLoggingService = fileLoggingService;
          this.showAdvanced = false;
          this.isUpdating = false;
          this.subscriptions = [];
          this.versionClicks = 0;
        }

        _createClass(_UserSettingsPage, [{
          key: "appModeOptions",
          get: function get() {
            var options = [{
              id: 'PROD',
              text: 'Regobs'
            }, {
              id: 'DEMO',
              text: 'Demo Regobs'
            }, {
              id: 'TEST',
              text: 'Test Regobs',
              disabled: !this.userSettings.featureToggleDeveloperMode
            }];
            return options;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this2 = this;

              var appver;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      this.versionClicks = 0;
                      this.subscriptions.push(this.userSettingService.userSetting$.subscribe(function (val) {
                        _this2.ngZone.run(function () {
                          _this2.userSettings = val;
                        });
                      }));
                      _context2.next = 4;
                      return this.appVersionService.getAppVersion();

                    case 4:
                      appver = _context2.sent;
                      this.ngZone.run(function () {
                        _this2.version = appver;
                      });

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.stopSubscriptions();
          }
        }, {
          key: "stopSubscriptions",
          value: function stopSubscriptions() {
            var _iterator = _createForOfIteratorHelper(this.subscriptions),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var subscription = _step.value;
                subscription.unsubscribe();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            this.subscriptions = [];
          }
        }, {
          key: "versionClick",
          value: function versionClick() {
            this.versionClicks++;

            if (this.versionClicks >= TAPS_TO_ENABLE_TEST_MODE && !this.userSettings.featureToggleDeveloperMode) {
              this.userSettings.featureToggleDeveloperMode = true;
              this.updateSettings();
            }
          }
        }, {
          key: "updateSettings",
          value: function updateSettings() {
            this.userSettingService.saveUserSettings(this.userSettings);
          }
        }, {
          key: "toggleAdvanced",
          value: function toggleAdvanced() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      this.showAdvanced = !this.showAdvanced;

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "updateDropdowns",
          value: function updateDropdowns() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      this.isUpdating = true;
                      this.kdvService.update();
                      _context4.next = 4;
                      return this.showKdvElementsUpdated(true);

                    case 4:
                      this.ngZone.run(function () {
                        _this3.isUpdating = false;
                      });

                    case 5:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "sendLogs",
          value: function sendLogs() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      this.fileLoggingService.sendLogsByEmail();

                    case 1:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "showKdvElementsUpdated",
          value: function showKdvElementsUpdated(ok) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var translations, alert;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return this.translateService.get(['SETTINGS.DROPDOWNS_UPDATED', 'SETTINGS.DROPDOWNS_FAILED', 'ALERT.OK']).toPromise();

                    case 2:
                      translations = _context6.sent;
                      _context6.next = 5;
                      return this.alertController.create({
                        message: ok ? translations['SETTINGS.DROPDOWNS_UPDATED'] : translations['SETTINGS.DROPDOWNS_FAILED'],
                        buttons: [translations['ALERT.OK']]
                      });

                    case 5:
                      alert = _context6.sent;
                      alert.present();
                      return _context6.abrupt("return", alert.onDidDismiss());

                    case 8:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "confirmReset",
          value: function confirmReset() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var _this4 = this;

              var translations, alert;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return this.translateService.get(['SETTINGS.CONFIRM_RESET', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();

                    case 2:
                      translations = _context7.sent;
                      _context7.next = 5;
                      return this.alertController.create({
                        message: translations['SETTINGS.CONFIRM_RESET'],
                        buttons: [{
                          text: translations['ALERT.OK'],
                          handler: function handler() {
                            return _this4.reset();
                          }
                        }, {
                          text: translations['ALERT.CANCEL'],
                          role: 'cancel'
                        }]
                      });

                    case 5:
                      alert = _context7.sent;
                      alert.present();

                    case 7:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "reset",
          value: function reset() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this5 = this;

              var message, loading;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.translateService.get('SETTINGS.RESETTING').toPromise();

                    case 2:
                      message = _context8.sent;
                      _context8.next = 5;
                      return this.loadingController.create({
                        message: message
                      });

                    case 5:
                      loading = _context8.sent;
                      loading.present();
                      this.isUpdating = true; // TODO: Implement some kind of subscription manager to stop all subscriptions and resubscribe when complete

                      _context8.prev = 8;
                      _context8.next = 11;
                      return this.doReset();

                    case 11:
                      _context8.next = 16;
                      break;

                    case 13:
                      _context8.prev = 13;
                      _context8.t0 = _context8["catch"](8);
                      this.loggingService.log('Could not reset db', _context8.t0, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);

                    case 16:
                      this.ngZone.run(function () {
                        _this5.isUpdating = false;
                        loading.dismiss();

                        _this5.navController.navigateRoot('start-wizard');
                      });

                    case 17:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this, [[8, 13]]);
            }));
          }
        }, {
          key: "doReset",
          value: function doReset() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      this.stopSubscriptions();
                      return _context9.abrupt("return", this.appResetService.resetApp());

                    case 2:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }]);

        return _UserSettingsPage;
      }();

      _UserSettingsPage.ɵfac = function UserSettingsPage_Factory(t) {
        return new (t || _UserSettingsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_app_version_app_version_service__WEBPACK_IMPORTED_MODULE_2__.AppVersionService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_modules_shared_services_app_reset_app_reset_service__WEBPACK_IMPORTED_MODULE_5__.AppResetService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_file_logging_service__WEBPACK_IMPORTED_MODULE_6__.FileLoggingService));
      };

      _UserSettingsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
        type: _UserSettingsPage,
        selectors: [["app-user-settings"]],
        decls: 8,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["defaultHref", "/", "text", ""], ["class", "ion-padding", 4, "ngIf"], [1, "ion-padding"], ["lines", "full"], ["slot", "end", 3, "ngModel", "ngModelChange"], ["fill", "clear", "expand", "full", 3, "click"], ["slot", "start", 3, "name"], [4, "ngIf"], [3, "click"], ["position", "stacked", "color", "medium", 1, "ion-text-uppercase"], [1, "build-version"], ["color", "medium", 1, "build-rev", "ion-align-self-start"], [3, "selectedValue", "options", "showReset", "selectedValueChange"], ["lines", "none"], ["expand", "block", 3, "disabled", "click"], ["slot", "start", "name", "refresh"], ["slot", "start", "name", "mail-outline"], ["color", "danger", "expand", "block", 1, "reset-button", 3, "disabled", "click"], ["slot", "start", "name", "medkit"]],
        template: function UserSettingsPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, UserSettingsPage_ion_content_7_Template, 17, 13, "ion-content", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 2, "SETTINGS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.userSettings);
          }
        },
        styles: [".reset-button[_ngcontent-%COMP%] {\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\nion-button.button-block[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n\nion-item.item-label[_ngcontent-%COMP%]   ion-text.ion-align-self-start.build-version[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n\nion-item.item-label[_ngcontent-%COMP%]   ion-text.ion-align-self-start.build-rev[_ngcontent-%COMP%] {\n  font-size: 14px;\n  margin-top: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItc2V0dGluZ3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVBO0VBQ0ksZ0NBQUE7QUFDSjs7QUFPZTtFQUNLLGVBQUE7RUFDQSxrQkFBQTtBQUpwQjs7QUFNZ0I7RUFDSSxlQUFBO0VBQ0EsZUFBQTtBQUpwQiIsImZpbGUiOiJ1c2VyLXNldHRpbmdzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXNldC1idXR0b24ge1xyXG4gICAgbWFyZ2luLXRvcDogMzBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbn1cclxuXHJcbmlvbi1idXR0b24uYnV0dG9uLWJsb2NrIHtcclxuICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG59XHJcblxyXG5pb24taXRlbSB7XHJcblxyXG4gICAgJi5pdGVtLWxhYmVsIHtcclxuICAgICAgICBpb24tdGV4dCB7XHJcbiAgICAgICAgICAgICYuaW9uLWFsaWduLXNlbGYtc3RhcnQge1xyXG4gICAgICAgICAgICAgICAmLmJ1aWxkLXZlcnNpb24ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDVweDtcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAmLmJ1aWxkLXJldiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7OyIsIm5hbWVzIjpbIkRFQlVHX1RBRyIsIkFwcFJlc2V0U2VydmljZSIsInNlcnZpY2VzIiwiZGJIZWxwZXJTZXJ2aWNlIiwibG9nZ2luZ1NlcnZpY2UiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicyIsInJlc29sdmUiLCJhcHBPblJlc2V0IiwicmVzZXREYiIsInRhYmxlIiwibG9nIiwiX2xvZ2dpbmdfbG9nX2xldmVsX21vZGVsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJhcHBPblJlc2V0Q29tcGxldGUiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJmYWN0b3J5IiwicHJvdmlkZWRJbiIsInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfdXNlcl9zZXR0aW5nc19wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJVc2VyU2V0dGluZ3NQYWdlTW9kdWxlIiwiX21vZHVsZXNfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsImN0eF9yMSIsIlRBUFNfVE9fRU5BQkxFX1RFU1RfTU9ERSIsIlVzZXJTZXR0aW5nc1BhZ2UiLCJ1c2VyU2V0dGluZ1NlcnZpY2UiLCJrZHZTZXJ2aWNlIiwibmdab25lIiwidHJhbnNsYXRlU2VydmljZSIsImFsZXJ0Q29udHJvbGxlciIsImFwcFZlcnNpb25TZXJ2aWNlIiwibG9hZGluZ0NvbnRyb2xsZXIiLCJhcHBSZXNldFNlcnZpY2UiLCJuYXZDb250cm9sbGVyIiwiZmlsZUxvZ2dpbmdTZXJ2aWNlIiwib3B0aW9ucyIsImlkIiwidGV4dCIsImRpc2FibGVkIiwidXNlclNldHRpbmdzIiwiZmVhdHVyZVRvZ2dsZURldmVsb3Blck1vZGUiLCJ2ZXJzaW9uQ2xpY2tzIiwic3Vic2NyaXB0aW9ucyIsInB1c2giLCJ1c2VyU2V0dGluZyQiLCJzdWJzY3JpYmUiLCJ2YWwiLCJydW4iLCJnZXRBcHBWZXJzaW9uIiwiYXBwdmVyIiwidmVyc2lvbiIsInN0b3BTdWJzY3JpcHRpb25zIiwic3Vic2NyaXB0aW9uIiwidW5zdWJzY3JpYmUiLCJ1cGRhdGVTZXR0aW5ncyIsInNhdmVVc2VyU2V0dGluZ3MiLCJzaG93QWR2YW5jZWQiLCJpc1VwZGF0aW5nIiwidXBkYXRlIiwic2hvd0tkdkVsZW1lbnRzVXBkYXRlZCIsInNlbmRMb2dzQnlFbWFpbCIsIm9rIiwiZ2V0IiwidG9Qcm9taXNlIiwidHJhbnNsYXRpb25zIiwiY3JlYXRlIiwibWVzc2FnZSIsImJ1dHRvbnMiLCJhbGVydCIsInByZXNlbnQiLCJvbkRpZERpc21pc3MiLCJoYW5kbGVyIiwicmVzZXQiLCJyb2xlIiwibG9hZGluZyIsImRvUmVzZXQiLCJfbW9kdWxlc19zaGFyZWRfc2VydmljZXNfbG9nZ2luZ19sb2dfbGV2ZWxfbW9kZWxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImRpc21pc3MiLCJuYXZpZ2F0ZVJvb3QiLCJyZXNldEFwcCIsInNlbGVjdG9ycyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIl0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2FwcC1yZXNldC9hcHAtcmVzZXQuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy91c2VyLXNldHRpbmdzL3VzZXItc2V0dGluZ3MubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3VzZXItc2V0dGluZ3MvdXNlci1zZXR0aW5ncy5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdXNlci1zZXR0aW5ncy91c2VyLXNldHRpbmdzLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uUmVzZXQgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL29uLXJlc2V0LmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERiSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvZGItaGVscGVyL2RiLWhlbHBlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0FwcFJlc2V0U2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBSZXNldFNlcnZpY2Uge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdCgnT25SZXNldCcpIHByaXZhdGUgc2VydmljZXM6IE9uUmVzZXRbXSxcclxuICAgIHByaXZhdGUgZGJIZWxwZXJTZXJ2aWNlOiBEYkhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgcmVzZXRBcHAoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgdGhpcy5zZXJ2aWNlcy5tYXAoKHMpID0+IFByb21pc2UucmVzb2x2ZShzLmFwcE9uUmVzZXQoKSkpXHJcbiAgICApO1xyXG4gICAgYXdhaXQgdGhpcy5kYkhlbHBlclNlcnZpY2UucmVzZXREYigodGFibGUpID0+IHtcclxuICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5sb2coXHJcbiAgICAgICAgYEVycm9yIHJlc2V0IHRhYmxlICR7dGFibGV9YCxcclxuICAgICAgICBudWxsLFxyXG4gICAgICAgIExvZ0xldmVsLldhcm5pbmcsXHJcbiAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxyXG4gICAgICB0aGlzLnNlcnZpY2VzLm1hcCgocykgPT5cclxuICAgICAgICBQcm9taXNlLnJlc29sdmUocy5hcHBPblJlc2V0Q29tcGxldGUgPyBzLmFwcE9uUmVzZXRDb21wbGV0ZSgpIDogdHJ1ZSlcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ3NQYWdlIH0gZnJvbSAnLi91c2VyLXNldHRpbmdzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBVc2VyU2V0dGluZ3NQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVXNlclNldHRpbmdzUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFVzZXJTZXR0aW5nc1BhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiBkZWZhdWx0SHJlZj1cIi9cIiB0ZXh0PVwiXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3tcIlNFVFRJTkdTLlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQgY2xhc3M9XCJpb24tcGFkZGluZ1wiICpuZ0lmPVwidXNlclNldHRpbmdzXCI+XHJcbiAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7J1NFVFRJTkdTLkVNQUlMX1JFQ0VJUFQnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5lbWFpbFJlY2VpcHRcIiAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVTZXR0aW5ncygpXCI+PC9pb24tdG9nZ2xlPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7eydTRVRUSU5HUy5BTExPV19BTkFMWVRJQ1MnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5jb25zZW50Rm9yU2VuZGluZ0FuYWx5dGljc1wiIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNldHRpbmdzKClcIj5cclxuICAgICAgPC9pb24tdG9nZ2xlPlxyXG4gICAgPC9pb24taXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxpb24tYnV0dG9uIChjbGljayk9XCJ0b2dnbGVBZHZhbmNlZCgpXCIgZmlsbD1cImNsZWFyXCIgZXhwYW5kPVwiZnVsbFwiPlxyXG4gICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIFtuYW1lXT1cIihzaG93QWR2YW5jZWQgPyAnY2hldnJvbi11cCcgOiAnY2hldnJvbi1kb3duJylcIj48L2lvbi1pY29uPlxyXG4gICAge3soIHNob3dBZHZhbmNlZCA/ICdTRVRUSU5HUy5ISURFX0FEVkFOQ0VEJyA6ICdTRVRUSU5HUy5TSE9XX0FEVkFOQ0VEJykgfCB0cmFuc2xhdGUgfX1cclxuICA8L2lvbi1idXR0b24+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dBZHZhbmNlZFwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cInZlcnNpb25DbGljaygpXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIiBjb2xvcj1cIm1lZGl1bVwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snU0VUVElOR1MuQVBQX1ZFUlNJT04nIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydFwiIGNsYXNzPVwiYnVpbGQtdmVyc2lvblwiPlxyXG4gICAgICAgICAge3t2ZXJzaW9uLnZlcnNpb24gfX0gKHt7IHZlcnNpb24uYnVpbGROdW1iZXIgfX0pXHJcbiAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8aW9uLXRleHQgY2xhc3M9XCJidWlsZC1yZXYgaW9uLWFsaWduLXNlbGYtc3RhcnRcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICAgICAge3sgdmVyc2lvbi5yZXZpc2lvbiB9fSAtIHt7IHZlcnNpb24uZGF0ZSB8IGZvcm1hdERhdGUgfCBhc3luYyB9fVxyXG4gICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNvbG9yPVwibWVkaXVtXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyBcIlNFVFRJTkdTLkFQUE1PREVcIiB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxhcHAtc2VsZWN0IFsoc2VsZWN0ZWRWYWx1ZSldPVwidXNlclNldHRpbmdzLmFwcE1vZGVcIiBbb3B0aW9uc109XCJhcHBNb2RlT3B0aW9uc1wiXHJcbiAgICAgICAgICAoc2VsZWN0ZWRWYWx1ZUNoYW5nZSk9XCJ1cGRhdGVTZXR0aW5ncygpXCIgW3Nob3dSZXNldF09XCJmYWxzZVwiPiA8L2FwcC1zZWxlY3Q+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3snU0VUVElOR1MuVVNFX1JFVElOQV9NQVAnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRvZ2dsZSBzbG90PVwiZW5kXCIgWyhuZ01vZGVsKV09XCJ1c2VyU2V0dGluZ3MudXNlUmV0aW5hTWFwXCIgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlU2V0dGluZ3MoKVwiPlxyXG4gICAgICAgIDwvaW9uLXRvZ2dsZT5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwidXNlclNldHRpbmdzLmZlYXR1cmVUb2dnbGVEZXZlbG9wZXJNb2RlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIEdQUyBkZWJ1Z1xyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxpb24tdG9nZ2xlIHNsb3Q9XCJlbmRcIiBbKG5nTW9kZWwpXT1cInVzZXJTZXR0aW5ncy5mZWF0dXJlVG9nZ2VHcHNEZWJ1Z1wiIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNldHRpbmdzKClcIj5cclxuICAgICAgICA8L2lvbi10b2dnbGU+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwibm9uZVwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBleHBhbmQ9XCJibG9ja1wiIFtkaXNhYmxlZF09XCJpc1VwZGF0aW5nXCIgKGNsaWNrKT1cInVwZGF0ZURyb3Bkb3ducygpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJyZWZyZXNoXCI+PC9pb24taWNvbj5cclxuICAgICAgICB7eyBcIlNFVFRJTkdTLlVQREFURV9EUk9QRE9XTlNcIiB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImJsb2NrXCIgW2Rpc2FibGVkXT1cImlzVXBkYXRpbmdcIiAoY2xpY2spPVwic2VuZExvZ3MoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWFpbC1vdXRsaW5lXCI+PC9pb24taWNvbj5cclxuICAgICAgICBTZW5kIGxvZ2dlciB0aWwgUmVnb2JzIFRlYW1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cInJlc2V0LWJ1dHRvblwiIGNvbG9yPVwiZGFuZ2VyXCIgZXhwYW5kPVwiYmxvY2tcIiBbZGlzYWJsZWRdPVwiaXNVcGRhdGluZ1wiIChjbGljayk9XCJjb25maXJtUmVzZXQoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWVka2l0XCI+PC9pb24taWNvbj5cclxuICAgICAgICB7eyBcIlNFVFRJTkdTLlJFU0VUXCIgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXNlclNldHRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy91c2VyLXNldHRpbmcvdXNlci1zZXR0aW5nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZyB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3VzZXItc2V0dGluZ3MubW9kZWwnO1xyXG5pbXBvcnQge1xyXG4gIE5hdkNvbnRyb2xsZXIsXHJcbiAgQWxlcnRDb250cm9sbGVyLFxyXG4gIExvYWRpbmdDb250cm9sbGVyXHJcbn0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBcHBWZXJzaW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXBwLXZlcnNpb24vYXBwLXZlcnNpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFwcFZlcnNpb24gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVscy9hcHAtdmVyc2lvbi5tb2RlbCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZy1sZXZlbC5tb2RlbCc7XHJcbmltcG9ydCB7IEFwcFJlc2V0U2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2FwcC1yZXNldC9hcHAtcmVzZXQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL2NvbXBvbmVudHMvaW5wdXQvc2VsZWN0L3NlbGVjdC1vcHRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBGaWxlTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvZmlsZS1sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ1VzZXJTZXR0aW5nc1BhZ2UnO1xyXG5jb25zdCBUQVBTX1RPX0VOQUJMRV9URVNUX01PREUgPSA3O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdXNlci1zZXR0aW5ncycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItc2V0dGluZ3MucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi91c2VyLXNldHRpbmdzLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyU2V0dGluZ3NQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHVzZXJTZXR0aW5nczogVXNlclNldHRpbmc7XHJcbiAgc2hvd0FkdmFuY2VkID0gZmFsc2U7XHJcbiAgaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gIHZlcnNpb246IEFwcFZlcnNpb247XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgdmVyc2lvbkNsaWNrcyA9IDA7XHJcblxyXG4gIGdldCBhcHBNb2RlT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgICB7IGlkOiAnUFJPRCcsIHRleHQ6ICdSZWdvYnMnIH0sXHJcbiAgICAgIHsgaWQ6ICdERU1PJywgdGV4dDogJ0RlbW8gUmVnb2JzJyB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6ICdURVNUJyxcclxuICAgICAgICB0ZXh0OiAnVGVzdCBSZWdvYnMnLFxyXG4gICAgICAgIGRpc2FibGVkOiAhdGhpcy51c2VyU2V0dGluZ3MuZmVhdHVyZVRvZ2dsZURldmVsb3Blck1vZGVcclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIHJldHVybiBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBrZHZTZXJ2aWNlOiBLZHZTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgYXBwVmVyc2lvblNlcnZpY2U6IEFwcFZlcnNpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2FkaW5nQ29udHJvbGxlcjogTG9hZGluZ0NvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIGFwcFJlc2V0U2VydmljZTogQXBwUmVzZXRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBmaWxlTG9nZ2luZ1NlcnZpY2U6IEZpbGVMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnZlcnNpb25DbGlja3MgPSAwO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJTZXR0aW5ncyA9IHZhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBjb25zdCBhcHB2ZXIgPSBhd2FpdCB0aGlzLmFwcFZlcnNpb25TZXJ2aWNlLmdldEFwcFZlcnNpb24oKTtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMudmVyc2lvbiA9IGFwcHZlcjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLnN0b3BTdWJzY3JpcHRpb25zKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0b3BTdWJzY3JpcHRpb25zKCkge1xyXG4gICAgZm9yIChjb25zdCBzdWJzY3JpcHRpb24gb2YgdGhpcy5zdWJzY3JpcHRpb25zKSB7XHJcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICB2ZXJzaW9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLnZlcnNpb25DbGlja3MrKztcclxuICAgIGlmIChcclxuICAgICAgdGhpcy52ZXJzaW9uQ2xpY2tzID49IFRBUFNfVE9fRU5BQkxFX1RFU1RfTU9ERSAmJlxyXG4gICAgICAhdGhpcy51c2VyU2V0dGluZ3MuZmVhdHVyZVRvZ2dsZURldmVsb3Blck1vZGVcclxuICAgICkge1xyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5ncy5mZWF0dXJlVG9nZ2xlRGV2ZWxvcGVyTW9kZSA9IHRydWU7XHJcbiAgICAgIHRoaXMudXBkYXRlU2V0dGluZ3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVNldHRpbmdzKCkge1xyXG4gICAgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2Uuc2F2ZVVzZXJTZXR0aW5ncyh0aGlzLnVzZXJTZXR0aW5ncyk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB0b2dnbGVBZHZhbmNlZCgpIHtcclxuICAgIHRoaXMuc2hvd0FkdmFuY2VkID0gIXRoaXMuc2hvd0FkdmFuY2VkO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlRHJvcGRvd25zKCkge1xyXG4gICAgdGhpcy5pc1VwZGF0aW5nID0gdHJ1ZTtcclxuICAgIHRoaXMua2R2U2VydmljZS51cGRhdGUoKTtcclxuICAgIGF3YWl0IHRoaXMuc2hvd0tkdkVsZW1lbnRzVXBkYXRlZCh0cnVlKTtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZW5kTG9ncygpIHtcclxuICAgIHRoaXMuZmlsZUxvZ2dpbmdTZXJ2aWNlLnNlbmRMb2dzQnlFbWFpbCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2hvd0tkdkVsZW1lbnRzVXBkYXRlZChvazogYm9vbGVhbikge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoW1xyXG4gICAgICAgICdTRVRUSU5HUy5EUk9QRE9XTlNfVVBEQVRFRCcsXHJcbiAgICAgICAgJ1NFVFRJTkdTLkRST1BET1dOU19GQUlMRUQnLFxyXG4gICAgICAgICdBTEVSVC5PSydcclxuICAgICAgXSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlOiBva1xyXG4gICAgICAgID8gdHJhbnNsYXRpb25zWydTRVRUSU5HUy5EUk9QRE9XTlNfVVBEQVRFRCddXHJcbiAgICAgICAgOiB0cmFuc2xhdGlvbnNbJ1NFVFRJTkdTLkRST1BET1dOU19GQUlMRUQnXSxcclxuICAgICAgYnV0dG9uczogW3RyYW5zbGF0aW9uc1snQUxFUlQuT0snXV1cclxuICAgIH0pO1xyXG4gICAgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgcmV0dXJuIGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoWydTRVRUSU5HUy5DT05GSVJNX1JFU0VUJywgJ0FMRVJULk9LJywgJ0FMRVJULkNBTkNFTCddKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2U6IHRyYW5zbGF0aW9uc1snU0VUVElOR1MuQ09ORklSTV9SRVNFVCddLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydBTEVSVC5PSyddLFxyXG4gICAgICAgICAgaGFuZGxlcjogKCkgPT4gdGhpcy5yZXNldCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0FMRVJULkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYWxlcnQucHJlc2VudCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQoKSB7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoJ1NFVFRJTkdTLlJFU0VUVElORycpXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGxvYWRpbmcgPSBhd2FpdCB0aGlzLmxvYWRpbmdDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2VcclxuICAgIH0pO1xyXG4gICAgbG9hZGluZy5wcmVzZW50KCk7XHJcbiAgICB0aGlzLmlzVXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgLy8gVE9ETzogSW1wbGVtZW50IHNvbWUga2luZCBvZiBzdWJzY3JpcHRpb24gbWFuYWdlciB0byBzdG9wIGFsbCBzdWJzY3JpcHRpb25zIGFuZCByZXN1YnNjcmliZSB3aGVuIGNvbXBsZXRlXHJcbiAgICB0cnkge1xyXG4gICAgICBhd2FpdCB0aGlzLmRvUmVzZXQoKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAnQ291bGQgbm90IHJlc2V0IGRiJyxcclxuICAgICAgICBlcnIsXHJcbiAgICAgICAgTG9nTGV2ZWwuV2FybmluZyxcclxuICAgICAgICBERUJVR19UQUdcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICBsb2FkaW5nLmRpc21pc3MoKTtcclxuICAgICAgdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlUm9vdCgnc3RhcnQtd2l6YXJkJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgZG9SZXNldCgpIHtcclxuICAgIHRoaXMuc3RvcFN1YnNjcmlwdGlvbnMoKTtcclxuICAgIHJldHVybiB0aGlzLmFwcFJlc2V0U2VydmljZS5yZXNldEFwcCgpO1xyXG4gIH1cclxufVxyXG4iXX0=