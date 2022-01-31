(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_legacy-trip_legacy-trip_module_ts"], {
    /***/
    44093: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LegacyTripPageModule": function LegacyTripPageModule() {
          return (
            /* binding */
            _LegacyTripPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/registration/shared-components.module */
      22623);
      /* harmony import */


      var _legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./legacy-trip.page */
      55217);
      /* harmony import */


      var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../core/guards/auth.guard */
      27574);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__.LegacyTripPage,
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__.AuthGuard]
      }];

      var _LegacyTripPageModule = function _LegacyTripPageModule() {
        _classCallCheck(this, _LegacyTripPageModule);
      };

      _LegacyTripPageModule.ɵfac = function LegacyTripPageModule_Factory(t) {
        return new (t || _LegacyTripPageModule)();
      };

      _LegacyTripPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _LegacyTripPageModule
      });
      _LegacyTripPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_LegacyTripPageModule, {
          declarations: [_legacy_trip_page__WEBPACK_IMPORTED_MODULE_2__.LegacyTripPage],
          imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55217: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LegacyTripPage": function LegacyTripPage() {
          return (
            /* binding */
            _LegacyTripPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/trip-logger/trip-logger.service */
      3699);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _modules_registration_pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/registration/pages/modal-pages/help-modal/help-modal.page */
      94763);
      /* harmony import */


      var _modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../modules/shared/services/logging/log-level.model */
      73465);
      /* harmony import */


      var _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @nano-sql/core/lib/utilities */
      74556);
      /* harmony import */


      var _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../core/services/geo-position/geo-position.service */
      27494);
      /* harmony import */


      var _modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../modules/auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../modules/shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_registration_components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../modules/registration/components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../modules/shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _modules_registration_components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../modules/registration/components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);

      function LegacyTripPage_ion_row_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-list", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "app-kdv-select", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function LegacyTripPage_ion_row_9_Template_app_kdv_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r6.tripDto.TripTypeID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "ion-label", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "app-select", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("selectedValueChange", function LegacyTripPage_ion_row_9_Template_app_select_selectedValueChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r8.tripDto.ObservationExpectedMinutes = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](9, "app-text-comment", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function LegacyTripPage_ion_row_9_Template_app_text_comment_valueChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r9.tripDto.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "ion-label", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](13, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("labelColor", ctx_r0.hasClicked && ctx_r0.tripDto.TripTypeID === undefined ? "danger" : "medium")("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("value", ctx_r0.tripDto.TripTypeID);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("color", ctx_r0.hasClicked && ctx_r0.tripDto.ObservationExpectedMinutes === undefined ? "danger" : "medium");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 11, "TRIP.TRIP_END_DESCRIPTION"));

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("selectedValue", ctx_r0.tripDto.ObservationExpectedMinutes)("options", ctx_r0.minutes);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r0.isRunning || ctx_r0.isLoading)("value", ctx_r0.tripDto.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](13, 13, "TRIP.COMMENT_DESCRIPTION"), " ");
        }
      }

      function LegacyTripPage_ion_row_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "ion-spinner", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }
      }

      function LegacyTripPage_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-col", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](4, "ion-spinner", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "ion-button", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ng_container_11_Template_ion_button_click_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r10.cancel();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](8, 1, "ALERT.CANCEL"));
        }
      }

      function LegacyTripPage_ion_button_22_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_button_22_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r12.startTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r3.isLoading || !ctx_r3.isValid);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "TRIP.START_TRIP"), " ");
        }
      }

      function LegacyTripPage_ion_button_23_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_button_23_Template_ion_button_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r14.stopTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r4.isLoading);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](2, 2, "TRIP.STOP_TRIP"), " ");
        }
      }

      function LegacyTripPage_ion_row_24_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-row", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-col", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-button", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_ion_row_24_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r16.clearPage();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "svg-icon", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r5.isRunning || ctx_r5.isLoading);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 2, "REGISTRATION.RESET"), " ");
        }
      }

      var DEBUG_TAG = 'LegacyTripPage';

      var _LegacyTripPage = /*#__PURE__*/function () {
        function _LegacyTripPage(tripLoggerService, ngZone, regobsAuthService, translateService, geoPositionService, navController, modalController, loggingService) {
          _classCallCheck(this, _LegacyTripPage);

          this.tripLoggerService = tripLoggerService;
          this.ngZone = ngZone;
          this.regobsAuthService = regobsAuthService;
          this.translateService = translateService;
          this.geoPositionService = geoPositionService;
          this.navController = navController;
          this.modalController = modalController;
          this.loggingService = loggingService;
          this.isRunning = false;
          this.isLoading = false;
          this.hasClicked = false;
          this.isLoadingCurrentPosition = false;
          this.tripDto = {};
        }

        _createClass(_LegacyTripPage, [{
          key: "isValid",
          get: function get() {
            return this.tripDto.ObservationExpectedMinutes !== undefined && this.tripDto.TripTypeID !== undefined && this.currentPosition != null;
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_6__.IsEmptyHelper.isEmpty(this.tripDto);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.isLoading = false;
            this.setHoursToMidnight();
            this.tripLoggerSubscription = this.tripLoggerService.getLegacyTripAsObservable().subscribe(function (val) {
              _this.ngZone.run(function () {
                if (val) {
                  _this.tripDto = val.request;
                  _this.isRunning = true;
                } else {
                  _this.isRunning = false;
                }
              });
            });
            this.initCurrentPosition();
          }
        }, {
          key: "initCurrentPosition",
          value: function initCurrentPosition() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.isLoadingCurrentPosition = true;
                      _context.prev = 1;
                      _context.next = 4;
                      return this.geoPositionService.getSingleCurrentPosition();

                    case 4:
                      this.currentPosition = _context.sent;

                      if (this.currentPosition == null) {
                        this.tripLoggerService.showTripNoPositionErrorMessage();
                      }

                      _context.next = 12;
                      break;

                    case 8:
                      _context.prev = 8;
                      _context.t0 = _context["catch"](1);
                      this.loggingService.log('Could not get geolocation', _context.t0, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);
                      this.tripLoggerService.showTripNoPositionErrorMessage();

                    case 12:
                      _context.prev = 12;
                      this.ngZone.run(function () {
                        _this2.isLoadingCurrentPosition = false;
                      });
                      return _context.finish(12);

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this, [[1, 8, 12, 15]]);
            }));
          }
        }, {
          key: "setHoursToMidnight",
          value: function setHoursToMidnight() {
            this.minutes = [];

            for (var i = moment__WEBPACK_IMPORTED_MODULE_1___default()().get('hours'); i <= 24; i++) {
              this.minutes.push({
                text: "".concat(i, ":00"),
                id: i * 60
              });
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.tripLoggerSubscription) {
              this.tripLoggerSubscription.unsubscribe();
            }
          }
        }, {
          key: "startTrip",
          value: function startTrip() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this3 = this;

              var loggedInUser;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      this.cancel();

                      if (this.isValid) {
                        _context2.next = 6;
                        break;
                      }

                      this.hasClicked = true;
                      return _context2.abrupt("return");

                    case 6:
                      _context2.next = 8;
                      return this.regobsAuthService.getLoggedInUserAsPromise();

                    case 8:
                      loggedInUser = _context2.sent;

                      if (loggedInUser && loggedInUser.isLoggedIn) {
                        this.isLoading = true; // this.tripDto.ObserverGuid = loggedInUser.user.Guid; // TODO: Fix api to use access token for this call

                        this.tripDto.GeoHazardID = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_15__.GeoHazard.Snow;
                        this.tripDto.DeviceGuid = _nano_sql_core_lib_utilities__WEBPACK_IMPORTED_MODULE_5__.uuid();

                        try {
                          if (this.currentPosition && this.currentPosition.coords) {
                            this.tripDto.Lat = this.currentPosition.coords.latitude.toString();
                            this.tripDto.Lng = this.currentPosition.coords.longitude.toString();
                            this.startTripSubscription = this.tripLoggerService.startLegacyTrip(this.tripDto).subscribe(function () {
                              return _this3.navController.navigateRoot('/');
                            }, function (error) {
                              _this3.loggingService.error(error, 'Error when starting trip', DEBUG_TAG);

                              _this3.tripLoggerService.showTripErrorMessage(true);
                            }, function () {
                              _this3.ngZone.run(function () {
                                _this3.isLoading = false;
                              });
                            });
                          } else {
                            this.isLoading = false;
                            this.tripLoggerService.showTripNoPositionErrorMessage();
                          }
                        } catch (error) {
                          this.isLoading = false;
                          this.loggingService.log('Could not get geolocation', error, _modules_shared_services_logging_log_level_model__WEBPACK_IMPORTED_MODULE_4__.LogLevel.Warning, DEBUG_TAG);
                          this.tripLoggerService.showTripNoPositionErrorMessage();
                        }
                      }

                    case 10:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            if (this.startTripSubscription && !this.startTripSubscription.closed) {
              this.startTripSubscription.unsubscribe();
              this.startTripSubscription = undefined;
            }

            this.isLoading = false;
          }
        }, {
          key: "stopTrip",
          value: function stopTrip() {
            this.cancel();
            this.tripLoggerService.stopLegacyTrip();
          }
        }, {
          key: "showHelp",
          value: function showHelp() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var translation, modal;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.translateService.get('TRIP.LEGACY_HELP_TEXT').toPromise();

                    case 2:
                      translation = _context3.sent;
                      _context3.next = 5;
                      return this.modalController.create({
                        component: _modules_registration_pages_modal_pages_help_modal_help_modal_page__WEBPACK_IMPORTED_MODULE_2__.HelpModalPage,
                        componentProps: {
                          helpText: translation
                        }
                      });

                    case 5:
                      modal = _context3.sent;
                      modal.present();

                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "clearPage",
          value: function clearPage() {
            this.tripDto = {};
            this.initCurrentPosition();
          }
        }]);

        return _LegacyTripPage;
      }();

      _LegacyTripPage.ɵfac = function LegacyTripPage_Factory(t) {
        return new (t || _LegacyTripPage)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__.TripLoggerService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_8__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_core_services_geo_position_geo_position_service__WEBPACK_IMPORTED_MODULE_7__.GeoPositionService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService));
      };

      _LegacyTripPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
        type: _LegacyTripPage,
        selectors: [["app-legacy-trip"]],
        decls: 25,
        vars: 12,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [1, "pull-last-bottom", "ion-no-paddig", "ion-no-margin"], [4, "ngIf"], [1, "ion-no-padding"], [1, "ion-text-center"], ["fill", "clear", 3, "click"], [1, "white-background"], ["size", "12", 1, "start-buttons"], ["class", "back-button", "expand", "block", "color", "varsom-orange", 3, "disabled", "click", 4, "ngIf"], ["class", "white-background", 4, "ngIf"], ["lines", "full"], ["title", "TRIP.TRIP_TYPE", "kdvKey", "TripTypeKDV", 3, "labelColor", "disabled", "value", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase", 3, "color"], ["title", "TRIP.TRIP_END_DESCRIPTION", 3, "disabled", "selectedValue", "options", "selectedValueChange"], ["title", "DIALOGS.COMMENT", 3, "disabled", "value", "valueChange"], [1, "ion-text-wrap"], ["name", "dots"], [1, "ion-no-padding", "ion-text-center"], ["fill", "clear", "type", "button", 3, "click"], ["expand", "block", "color", "varsom-orange", 1, "back-button", 3, "disabled", "click"], ["color", "dark", "size", "small", "fill", "clear", 1, "reset-button", 3, "disabled", "click"], ["src", "/assets/icon/reset.svg"]],
        template: function LegacyTripPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "ion-grid", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, LegacyTripPage_ion_row_9_Template, 14, 15, "ion-row", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](10, LegacyTripPage_ion_row_10_Template, 3, 0, "ion-row", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, LegacyTripPage_ng_container_11_Template, 9, 3, "ng-container", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "ion-col", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](14, "ion-grid", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "ion-col", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](17, "ion-button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function LegacyTripPage_Template_ion_button_click_17_listener() {
              return ctx.showHelp();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](19, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "ion-row", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "ion-col", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](22, LegacyTripPage_ion_button_22_Template, 3, 4, "ion-button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](23, LegacyTripPage_ion_button_23_Template, 3, 4, "ion-button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](24, LegacyTripPage_ion_row_24_Template, 6, 4, "ion-row", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](6, 8, "TRIP.TRIP"));

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isLoading);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoadingCurrentPosition);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isLoading);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](19, 10, "HELP.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isRunning);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.isRunning);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_9__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_18__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonList, _modules_registration_components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_10__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonLabel, _modules_shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_11__.SelectComponent, _modules_registration_components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_12__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonSpinner, angular_svg_icon__WEBPACK_IMPORTED_MODULE_19__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe],
        styles: [".reset-button[_ngcontent-%COMP%] {\n  margin-bottom: 5px;\n  margin-bottom: var(--ion-safe-area-bottom, 5px);\n}\n.reset-button[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  display: flex;\n}\n.white-background[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n.start-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxlZ2FjeS10cmlwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQUEsK0NBQUE7QUFDSjtBQUNJO0VBQ0ksYUFBQTtBQUNSO0FBR0E7RUFDSSxzQkFBQTtBQUFKO0FBSUk7RUFDSSxnQ0FBQTtBQURSIiwiZmlsZSI6ImxlZ2FjeS10cmlwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXNldC1idXR0b24ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogdmFyKC0taW9uLXNhZmUtYXJlYS1ib3R0b20sIDVweCk7XHJcblxyXG4gICAgc3ZnLWljb24ge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi53aGl0ZS1iYWNrZ3JvdW5kIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5zdGFydC1idXR0b25zIHtcclxuICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gICAgfVxyXG59Il19 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFDQUE7O0FBU0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7OztBQTlFZUE7O0FBQUFBOztBQUtEQTs7QUFBQUE7O0FBdUJBQTs7QUFBQUE7O0FBS0tBOztBQUFBQTs7QUFpQnlDQTs7QUFBQUE7O0FBS3dCQTs7QUFBQUE7O0FBSXpEQTs7QUFBQUE7O0FBTWtCQTs7QUFBQUE7Ozs7Ozs7OzsiLCJuYW1lcyI6WyJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiX2xlZ2FjeV90cmlwX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImNhbkFjdGl2YXRlIiwiX2NvcmVfZ3VhcmRzX2F1dGhfZ3VhcmRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIkxlZ2FjeVRyaXBQYWdlTW9kdWxlIiwiX21vZHVsZXNfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzEzX18iLCJjdHhfcjAiLCJERUJVR19UQUciLCJMZWdhY3lUcmlwUGFnZSIsInRyaXBMb2dnZXJTZXJ2aWNlIiwibmdab25lIiwicmVnb2JzQXV0aFNlcnZpY2UiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwiZ2VvUG9zaXRpb25TZXJ2aWNlIiwibmF2Q29udHJvbGxlciIsIm1vZGFsQ29udHJvbGxlciIsImxvZ2dpbmdTZXJ2aWNlIiwidHJpcER0byIsIk9ic2VydmF0aW9uRXhwZWN0ZWRNaW51dGVzIiwidW5kZWZpbmVkIiwiVHJpcFR5cGVJRCIsImN1cnJlbnRQb3NpdGlvbiIsIl9jb3JlX2hlbHBlcnNfaXNfZW1wdHlfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJpc0xvYWRpbmciLCJzZXRIb3Vyc1RvTWlkbmlnaHQiLCJ0cmlwTG9nZ2VyU3Vic2NyaXB0aW9uIiwiZ2V0TGVnYWN5VHJpcEFzT2JzZXJ2YWJsZSIsInN1YnNjcmliZSIsInZhbCIsInJ1biIsInJlcXVlc3QiLCJpc1J1bm5pbmciLCJpbml0Q3VycmVudFBvc2l0aW9uIiwiaXNMb2FkaW5nQ3VycmVudFBvc2l0aW9uIiwiZ2V0U2luZ2xlQ3VycmVudFBvc2l0aW9uIiwic2hvd1RyaXBOb1Bvc2l0aW9uRXJyb3JNZXNzYWdlIiwibG9nIiwiX21vZHVsZXNfc2hhcmVkX3NlcnZpY2VzX2xvZ2dpbmdfbG9nX2xldmVsX21vZGVsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJtaW51dGVzIiwiaSIsIm1vbWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fX2RlZmF1bHQiLCJnZXQiLCJwdXNoIiwidGV4dCIsImlkIiwidW5zdWJzY3JpYmUiLCJjYW5jZWwiLCJpc1ZhbGlkIiwiaGFzQ2xpY2tlZCIsImdldExvZ2dlZEluVXNlckFzUHJvbWlzZSIsImxvZ2dlZEluVXNlciIsImlzTG9nZ2VkSW4iLCJHZW9IYXphcmRJRCIsIl92YXJzb21fcmVnb2JzX2NvbW1vbl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xNV9fIiwiRGV2aWNlR3VpZCIsIl9uYW5vX3NxbF9jb3JlX2xpYl91dGlsaXRpZXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsImNvb3JkcyIsIkxhdCIsImxhdGl0dWRlIiwidG9TdHJpbmciLCJMbmciLCJsb25naXR1ZGUiLCJzdGFydFRyaXBTdWJzY3JpcHRpb24iLCJzdGFydExlZ2FjeVRyaXAiLCJuYXZpZ2F0ZVJvb3QiLCJlcnJvciIsInNob3dUcmlwRXJyb3JNZXNzYWdlIiwiY2xvc2VkIiwic3RvcExlZ2FjeVRyaXAiLCJ0b1Byb21pc2UiLCJ0cmFuc2xhdGlvbiIsImNyZWF0ZSIsIl9tb2R1bGVzX3JlZ2lzdHJhdGlvbl9wYWdlc19tb2RhbF9wYWdlc19oZWxwX21vZGFsX2hlbHBfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiY29tcG9uZW50UHJvcHMiLCJoZWxwVGV4dCIsIm1vZGFsIiwicHJlc2VudCIsInNlbGVjdG9ycyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiY3R4Il0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL2xlZ2FjeS10cmlwL2xlZ2FjeS10cmlwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9sZWdhY3ktdHJpcC9sZWdhY3ktdHJpcC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvbGVnYWN5LXRyaXAvbGVnYWN5LXRyaXAucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yZWdpc3RyYXRpb24vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgTGVnYWN5VHJpcFBhZ2UgfSBmcm9tICcuL2xlZ2FjeS10cmlwLnBhZ2UnO1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuLi8uLi9jb3JlL2d1YXJkcy9hdXRoLmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBMZWdhY3lUcmlwUGFnZSxcclxuICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtMZWdhY3lUcmlwUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIExlZ2FjeVRyaXBQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+e3tcIlRSSVAuVFJJUFwiIHwgdHJhbnNsYXRlfX08L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8aW9uLWdyaWQgY2xhc3M9XCJwdWxsLWxhc3QtYm90dG9tIGlvbi1uby1wYWRkaWcgaW9uLW5vLW1hcmdpblwiPlxyXG4gICAgPGlvbi1yb3cgKm5nSWY9XCIhaXNMb2FkaW5nXCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgICAgICA8YXBwLWtkdi1zZWxlY3QgW2xhYmVsQ29sb3JdPVwiKGhhc0NsaWNrZWQgJiYgdHJpcER0by5UcmlwVHlwZUlEID09PSB1bmRlZmluZWQpID8gJ2RhbmdlcicgOiAnbWVkaXVtJ1wiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpc1J1bm5pbmcgfHwgaXNMb2FkaW5nXCIgdGl0bGU9XCJUUklQLlRSSVBfVFlQRVwiIGtkdktleT1cIlRyaXBUeXBlS0RWXCJcclxuICAgICAgICAgICAgWyh2YWx1ZSldPVwidHJpcER0by5UcmlwVHlwZUlEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgICAgIDxpb24taXRlbT5cclxuICAgICAgICAgICAgPGlvbi1sYWJlbCBbY29sb3JdPVwiKGhhc0NsaWNrZWQgJiYgdHJpcER0by5PYnNlcnZhdGlvbkV4cGVjdGVkTWludXRlcyA9PT0gdW5kZWZpbmVkKSA/ICdkYW5nZXInIDogJ21lZGl1bSdcIlxyXG4gICAgICAgICAgICAgIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydUUklQLlRSSVBfRU5EX0RFU0NSSVBUSU9OJ1xyXG4gICAgICAgICAgICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgPGFwcC1zZWxlY3QgW2Rpc2FibGVkXT1cImlzUnVubmluZyB8fCBpc0xvYWRpbmdcIiBbKHNlbGVjdGVkVmFsdWUpXT1cInRyaXBEdG8uT2JzZXJ2YXRpb25FeHBlY3RlZE1pbnV0ZXNcIlxyXG4gICAgICAgICAgICAgIFtvcHRpb25zXT1cIm1pbnV0ZXNcIiB0aXRsZT1cIlRSSVAuVFJJUF9FTkRfREVTQ1JJUFRJT05cIj48L2FwcC1zZWxlY3Q+XHJcbiAgICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJESUFMT0dTLkNPTU1FTlRcIiBbZGlzYWJsZWRdPVwiaXNSdW5uaW5nIHx8IGlzTG9hZGluZ1wiIFsodmFsdWUpXT1cInRyaXBEdG8uQ29tbWVudFwiPlxyXG4gICAgICAgICAgPC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3snVFJJUC5DT01NRU5UX0RFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICAgIDwvaW9uLWxpc3Q+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93ICpuZ0lmPVwiaXNMb2FkaW5nQ3VycmVudFBvc2l0aW9uXCI+XHJcbiAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgPGlvbi1zcGlubmVyIG5hbWU9XCJkb3RzXCI+PC9pb24tc3Bpbm5lcj5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTG9hZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1uby1wYWRkaW5nIGlvbi10ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGlvbi1zcGlubmVyIG5hbWU9XCJkb3RzXCI+PC9pb24tc3Bpbm5lcj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJjYW5jZWwoKVwiPnt7J0FMRVJULkNBTkNFTCcgfCB0cmFuc2xhdGV9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgICA8aW9uLXJvdz5cclxuICAgICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwic2hvd0hlbHAoKVwiIGZpbGw9XCJjbGVhclwiPnt7J0hFTFAuVElUTEUnIHwgdHJhbnNsYXRlfX08L2lvbi1idXR0b24+XHJcbiAgICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICAgIDxpb24tcm93IGNsYXNzPVwid2hpdGUtYmFja2dyb3VuZFwiPlxyXG4gICAgICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIiBjbGFzcz1cInN0YXJ0LWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwic3RhcnRUcmlwKClcIiBbZGlzYWJsZWRdPVwiaXNMb2FkaW5nIHx8ICFpc1ZhbGlkXCIgKm5nSWY9XCIhaXNSdW5uaW5nXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiYmFjay1idXR0b25cIiBleHBhbmQ9XCJibG9ja1wiIGNvbG9yPVwidmFyc29tLW9yYW5nZVwiPlxyXG4gICAgICAgICAgICAgICAge3sgJ1RSSVAuU1RBUlRfVFJJUCcgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgICAgICAgPGlvbi1idXR0b24gKm5nSWY9XCJpc1J1bm5pbmdcIiAoY2xpY2spPVwic3RvcFRyaXAoKVwiIFtkaXNhYmxlZF09XCJpc0xvYWRpbmdcIiBjbGFzcz1cImJhY2stYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCI+XHJcbiAgICAgICAgICAgICAgICB7eyAnVFJJUC5TVE9QX1RSSVAnIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgICA8aW9uLXJvdyBjbGFzcz1cIndoaXRlLWJhY2tncm91bmRcIiAqbmdJZj1cIiFpc0VtcHR5XCI+XHJcbiAgICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNsZWFyUGFnZSgpXCIgW2Rpc2FibGVkXT1cImlzUnVubmluZyB8fCBpc0xvYWRpbmdcIiBjbGFzcz1cInJlc2V0LWJ1dHRvblwiIGNvbG9yPVwiZGFya1wiXHJcbiAgICAgICAgICAgICAgICBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIj5cclxuICAgICAgICAgICAgICAgIDxzdmctaWNvbiBzcmM9XCIvYXNzZXRzL2ljb24vcmVzZXQuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgICAgIHt7XCJSRUdJU1RSQVRJT04uUkVTRVRcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPC9pb24tZ3JpZD5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IENyZWF0ZVRyaXBEdG8gfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgTmF2Q29udHJvbGxlciwgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgSGVscE1vZGFsUGFnZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL21vZGFsLXBhZ2VzL2hlbHAtbW9kYWwvaGVscC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ0xldmVsIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2ctbGV2ZWwubW9kZWwnO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICdAbmFuby1zcWwvY29yZS9saWIvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgR2VvUG9zaXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9nZW8tcG9zaXRpb24vZ2VvLXBvc2l0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdvYnNBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvYXV0aC9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2VvcG9zaXRpb24gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2dlb2xvY2F0aW9uL25neCc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnTGVnYWN5VHJpcFBhZ2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbGVnYWN5LXRyaXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sZWdhY3ktdHJpcC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xlZ2FjeS10cmlwLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMZWdhY3lUcmlwUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlIHRyaXBMb2dnZXJTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgdHJpcER0bzogQ3JlYXRlVHJpcER0bztcclxuICBtaW51dGVzOiBTZWxlY3RPcHRpb25bXTtcclxuICBpc0xvYWRpbmcgPSBmYWxzZTtcclxuICBoYXNDbGlja2VkID0gZmFsc2U7XHJcbiAgaXNMb2FkaW5nQ3VycmVudFBvc2l0aW9uID0gZmFsc2U7XHJcbiAgY3VycmVudFBvc2l0aW9uOiBHZW9wb3NpdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBzdGFydFRyaXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnRyaXBEdG8uT2JzZXJ2YXRpb25FeHBlY3RlZE1pbnV0ZXMgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0aGlzLnRyaXBEdG8uVHJpcFR5cGVJRCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uICE9IG51bGxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiBJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy50cmlwRHRvKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0cmlwTG9nZ2VyU2VydmljZTogVHJpcExvZ2dlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSByZWdvYnNBdXRoU2VydmljZTogUmVnb2JzQXV0aFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdlb1Bvc2l0aW9uU2VydmljZTogR2VvUG9zaXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRyaXBEdG8gPSB7fTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0SG91cnNUb01pZG5pZ2h0KCk7XHJcbiAgICB0aGlzLnRyaXBMb2dnZXJTdWJzY3JpcHRpb24gPSB0aGlzLnRyaXBMb2dnZXJTZXJ2aWNlXHJcbiAgICAgIC5nZXRMZWdhY3lUcmlwQXNPYnNlcnZhYmxlKClcclxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIGlmICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlwRHRvID0gdmFsLnJlcXVlc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5pbml0Q3VycmVudFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGluaXRDdXJyZW50UG9zaXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmlzTG9hZGluZ0N1cnJlbnRQb3NpdGlvbiA9IHRydWU7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmN1cnJlbnRQb3NpdGlvbiA9IGF3YWl0IHRoaXMuZ2VvUG9zaXRpb25TZXJ2aWNlLmdldFNpbmdsZUN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICBpZiAodGhpcy5jdXJyZW50UG9zaXRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc2hvd1RyaXBOb1Bvc2l0aW9uRXJyb3JNZXNzYWdlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UubG9nKFxyXG4gICAgICAgICdDb3VsZCBub3QgZ2V0IGdlb2xvY2F0aW9uJyxcclxuICAgICAgICBlcnJvcixcclxuICAgICAgICBMb2dMZXZlbC5XYXJuaW5nLFxyXG4gICAgICAgIERFQlVHX1RBR1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnRyaXBMb2dnZXJTZXJ2aWNlLnNob3dUcmlwTm9Qb3NpdGlvbkVycm9yTWVzc2FnZSgpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLmlzTG9hZGluZ0N1cnJlbnRQb3NpdGlvbiA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0SG91cnNUb01pZG5pZ2h0KCkge1xyXG4gICAgdGhpcy5taW51dGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gbW9tZW50KCkuZ2V0KCdob3VycycpOyBpIDw9IDI0OyBpKyspIHtcclxuICAgICAgdGhpcy5taW51dGVzLnB1c2goeyB0ZXh0OiBgJHtpfTowMGAsIGlkOiBpICogNjAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnRyaXBMb2dnZXJTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy50cmlwTG9nZ2VyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzdGFydFRyaXAoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5oYXNDbGlja2VkID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbG9nZ2VkSW5Vc2VyID0gYXdhaXQgdGhpcy5yZWdvYnNBdXRoU2VydmljZS5nZXRMb2dnZWRJblVzZXJBc1Byb21pc2UoKTtcclxuICAgICAgaWYgKGxvZ2dlZEluVXNlciAmJiBsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnRyaXBEdG8uT2JzZXJ2ZXJHdWlkID0gbG9nZ2VkSW5Vc2VyLnVzZXIuR3VpZDsgLy8gVE9ETzogRml4IGFwaSB0byB1c2UgYWNjZXNzIHRva2VuIGZvciB0aGlzIGNhbGxcclxuICAgICAgICB0aGlzLnRyaXBEdG8uR2VvSGF6YXJkSUQgPSBHZW9IYXphcmQuU25vdztcclxuICAgICAgICB0aGlzLnRyaXBEdG8uRGV2aWNlR3VpZCA9IHV0aWxzLnV1aWQoKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudFBvc2l0aW9uICYmIHRoaXMuY3VycmVudFBvc2l0aW9uLmNvb3Jkcykge1xyXG4gICAgICAgICAgICB0aGlzLnRyaXBEdG8uTGF0ID0gdGhpcy5jdXJyZW50UG9zaXRpb24uY29vcmRzLmxhdGl0dWRlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJpcER0by5MbmcgPSB0aGlzLmN1cnJlbnRQb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAgICAgICAgIC5zdGFydExlZ2FjeVRyaXAodGhpcy50cmlwRHRvKVxyXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVSb290KCcvJyksXHJcbiAgICAgICAgICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgICAgICAgICAnRXJyb3Igd2hlbiBzdGFydGluZyB0cmlwJyxcclxuICAgICAgICAgICAgICAgICAgICBERUJVR19UQUdcclxuICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy50cmlwTG9nZ2VyU2VydmljZS5zaG93VHJpcEVycm9yTWVzc2FnZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc2hvd1RyaXBOb1Bvc2l0aW9uRXJyb3JNZXNzYWdlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmxvZyhcclxuICAgICAgICAgICAgJ0NvdWxkIG5vdCBnZXQgZ2VvbG9jYXRpb24nLFxyXG4gICAgICAgICAgICBlcnJvcixcclxuICAgICAgICAgICAgTG9nTGV2ZWwuV2FybmluZyxcclxuICAgICAgICAgICAgREVCVUdfVEFHXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgdGhpcy50cmlwTG9nZ2VyU2VydmljZS5zaG93VHJpcE5vUG9zaXRpb25FcnJvck1lc3NhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbmNlbCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN0YXJ0VHJpcFN1YnNjcmlwdGlvbiAmJiAhdGhpcy5zdGFydFRyaXBTdWJzY3JpcHRpb24uY2xvc2VkKSB7XHJcbiAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMuc3RhcnRUcmlwU3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHN0b3BUcmlwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYW5jZWwoKTtcclxuICAgIHRoaXMudHJpcExvZ2dlclNlcnZpY2Uuc3RvcExlZ2FjeVRyaXAoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNob3dIZWxwKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldCgnVFJJUC5MRUdBQ1lfSEVMUF9URVhUJylcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEhlbHBNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgaGVscFRleHQ6IHRyYW5zbGF0aW9uXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJQYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy50cmlwRHRvID0ge307XHJcbiAgICB0aGlzLmluaXRDdXJyZW50UG9zaXRpb24oKTtcclxuICB9XHJcbn1cclxuIl19