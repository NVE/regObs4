(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_trip-log_trip-log_module_ts"], {
    /***/
    6580: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripLogSummaryComponent": function TripLogSummaryComponent() {
          return (
            /* binding */
            _TripLogSummaryComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
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


      var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/helpers/helper.service */
      22791);
      /* harmony import */


      var _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../core/services/trip-logger/trip-log-state.enum */
      66640);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      7602);

      var _TripLogSummaryComponent = /*#__PURE__*/function () {
        function _TripLogSummaryComponent(tripLoggerService, helperService) {
          _classCallCheck(this, _TripLogSummaryComponent);

          this.tripLoggerService = tripLoggerService;
          this.helperService = helperService;
        }

        _createClass(_TripLogSummaryComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.tripLogSubscription = this.tripLoggerService.getTripLogAsObservable().subscribe(function (tripLog) {
              _this.tripLog = tripLog;
            });
            this.tripLogActivitySubscription = this.tripLoggerService.getTripLogActivityAsObservable().subscribe(function (tripLogActivity) {
              _this.tripLogActivity = tripLogActivity;
            });
            this.interval = setInterval(function () {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var lengthMs;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        lengthMs = this.calculateTimeFromTripLogActivity(this.tripLogActivity);
                        this.lengthString = this.helperService.formatMsToTime(lengthMs);

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));
            }, 1000);
          }
        }, {
          key: "calculateTimeFromTripLogActivity",
          value: function calculateTimeFromTripLogActivity(tripLogActivity) {
            var lengthMs = 0;

            if (tripLogActivity.length > 0) {
              var lastItem = null;

              var _iterator = _createForOfIteratorHelper(tripLogActivity),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var item = _step.value;

                  if (item.state === _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__.TripLogState.Paused) {
                    lengthMs += moment__WEBPACK_IMPORTED_MODULE_1___default().unix(item.timestamp).diff(moment__WEBPACK_IMPORTED_MODULE_1___default().unix(lastItem.timestamp));
                  }

                  lastItem = item;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              if (lastItem.state === _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_3__.TripLogState.Running) {
                lengthMs += moment__WEBPACK_IMPORTED_MODULE_1___default()().diff(moment__WEBPACK_IMPORTED_MODULE_1___default().unix(lastItem.timestamp));
              }
            }

            return lengthMs;
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.tripLogSubscription.unsubscribe();
            this.tripLogActivitySubscription.unsubscribe();
            clearInterval(this.interval);
          }
        }]);

        return _TripLogSummaryComponent;
      }();

      _TripLogSummaryComponent.ɵfac = function TripLogSummaryComponent_Factory(t) {
        return new (t || _TripLogSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_0__.TripLoggerService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_2__.HelperService));
      };

      _TripLogSummaryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _TripLogSummaryComponent,
        selectors: [["app-trip-log-summary"]],
        decls: 8,
        vars: 1,
        consts: [["color", "medium", "position", "stacked", 1, "ion-text-uppercase"]],
        template: function TripLogSummaryComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-grid");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-col");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, "Varighet");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-col");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.lengthString);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonText],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0cmlwLWxvZy1zdW1tYXJ5LmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    66640: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripLogState": function TripLogState() {
          return (
            /* binding */
            _TripLogState
          );
        }
        /* harmony export */

      });

      var _TripLogState;

      (function (TripLogState) {
        TripLogState["NotStarted"] = "NOT_STARTED";
        TripLogState["Paused"] = "PAUSED";
        TripLogState["Running"] = "RUNNING";
        TripLogState["Stopped"] = "STOPPED";
      })(_TripLogState || (_TripLogState = {}));
      /***/

    },

    /***/
    63979: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripLogPageModule": function TripLogPageModule() {
          return (
            /* binding */
            _TripLogPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _trip_log_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./trip-log.page */
      5119);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../components/trip-log-summary/trip-log-summary.component */
      6580);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _trip_log_page__WEBPACK_IMPORTED_MODULE_0__.TripLogPage
      }];

      var _TripLogPageModule = function _TripLogPageModule() {
        _classCallCheck(this, _TripLogPageModule);
      };

      _TripLogPageModule.ɵfac = function TripLogPageModule_Factory(t) {
        return new (t || _TripLogPageModule)();
      };

      _TripLogPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _TripLogPageModule
      });
      _TripLogPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_TripLogPageModule, {
          declarations: [_trip_log_page__WEBPACK_IMPORTED_MODULE_0__.TripLogPage, _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_1__.TripLogSummaryComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateModule]
        });
      })();
      /***/

    },

    /***/
    5119: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TripLogPage": function TripLogPage() {
          return (
            /* binding */
            _TripLogPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_background_geolocation_background_geolocation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/background-geolocation/background-geolocation.service */
      12452);
      /* harmony import */


      var _core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/trip-logger/trip-logger.service */
      3699);
      /* harmony import */


      var _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/trip-logger/trip-log-state.enum */
      66640);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../components/trip-log-summary/trip-log-summary.component */
      6580);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function TripLogPage_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-fab", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-fab-button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_8_Template_ion_fab_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r3.startTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 1, "TRIP_LOG.START"), " ");
        }
      }

      function TripLogPage_ng_container_9_ion_fab_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-fab", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-fab-button", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_2_Template_ion_fab_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            return ctx_r7.pauseTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 1, "TRIP_LOG.STOP"), " ");
        }
      }

      function TripLogPage_ng_container_9_ion_fab_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-fab", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-grid");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-fab-button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_3_Template_ion_fab_button_click_4_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            return ctx_r9.completeTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-fab-button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TripLogPage_ng_container_9_ion_fab_3_Template_ion_fab_button_click_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

            return ctx_r11.startTrip();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 2, "TRIP_LOG.COMPLETE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](10, 4, "TRIP_LOG.CONTINUE"), " ");
        }
      }

      function TripLogPage_ng_container_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-trip-log-summary");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TripLogPage_ng_container_9_ion_fab_2_Template, 4, 3, "ion-fab", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TripLogPage_ng_container_9_ion_fab_3_Template, 11, 6, "ion-fab", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.state === "RUNNING");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.state === "PAUSED");
        }
      }

      function TripLogPage_ng_container_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-trip-log-summary");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        }
      }

      var _TripLogPage = /*#__PURE__*/function () {
        function _TripLogPage(backgroundGeolocationService, tripLoggerService) {
          _classCallCheck(this, _TripLogPage);

          this.backgroundGeolocationService = backgroundGeolocationService;
          this.tripLoggerService = tripLoggerService;
          this.state = _core_services_trip_logger_trip_log_state_enum__WEBPACK_IMPORTED_MODULE_2__.TripLogState.NotStarted;
        }

        _createClass(_TripLogPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      this.subscription = this.tripLoggerService.getTripLogStateAsObservable().subscribe(function (activity) {
                        _this2.state = activity.state;
                      });

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "startTrip",
          value: function startTrip() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      return _context3.abrupt("return", this.backgroundGeolocationService.start());

                    case 1:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "pauseTrip",
          value: function pauseTrip() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      return _context4.abrupt("return", this.backgroundGeolocationService.stop());

                    case 1:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "completeTrip",
          value: function completeTrip() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.subscription.unsubscribe();
          }
        }]);

        return _TripLogPage;
      }();

      _TripLogPage.ɵfac = function TripLogPage_Factory(t) {
        return new (t || _TripLogPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_background_geolocation_background_geolocation_service__WEBPACK_IMPORTED_MODULE_0__.BackgroundGeolocationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_trip_logger_trip_logger_service__WEBPACK_IMPORTED_MODULE_1__.TripLoggerService));
      };

      _TripLogPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _TripLogPage,
        selectors: [["app-trip-log"]],
        decls: 11,
        vars: 7,
        consts: [[3, "color"], ["slot", "start"], ["text", ""], [4, "ngIf"], ["vertical", "bottom", "horizontal", "center", "slot", "fixed", 1, "x-large"], ["color", "success", 1, "x-large", 3, "click"], ["vertical", "bottom", "class", "x-large", "horizontal", "center", "slot", "fixed", 4, "ngIf"], ["vertical", "bottom", "class", "x-large two-buttons", "horizontal", "start", "slot", "fixed", 4, "ngIf"], ["color", "danger", 1, "x-large", 3, "click"], ["vertical", "bottom", "horizontal", "start", "slot", "fixed", 1, "x-large", "two-buttons"], ["color", "danger", 1, "x-large", "small-text", 3, "click"], ["color", "success", 1, "x-large", "small-text", 3, "click"]],
        template: function TripLogPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, TripLogPage_ng_container_8_Template, 5, 3, "ng-container", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, TripLogPage_ng_container_9_Template, 4, 2, "ng-container", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, TripLogPage_ng_container_10_Template, 2, 0, "ng-container", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("color", ctx.state === "RUNNING" ? "success" : "dark");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 5, "TRIP_LOG." + ctx.state), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "NOT_STARTED");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "PAUSED" || ctx.state === "RUNNING");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "STOPPED");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonFab, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonFabButton, _components_trip_log_summary_trip_log_summary_component__WEBPACK_IMPORTED_MODULE_3__.TripLogSummaryComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
        styles: ["ion-fab.two-buttons[_ngcontent-%COMP%] {\n  left: 40px;\n}\nion-fab.two-buttons[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%] {\n  padding-left: 20px;\n  padding-right: 20px;\n}\nion-fab.x-large[_ngcontent-%COMP%] {\n  bottom: 20px;\n}\nion-fab[_ngcontent-%COMP%]   ion-fab-button.x-large[_ngcontent-%COMP%] {\n  --size: 80px;\n  --height: 80px;\n  --width: 80px;\n  font-size: 17px;\n  font-weight: bold;\n  text-transform: uppercase;\n}\nion-fab[_ngcontent-%COMP%]   ion-fab-button.x-large.small-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyaXAtbG9nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNJLFVBQUE7QUFEUjtBQUVRO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtBQUFaO0FBSUk7RUFDSSxZQUFBO0FBRlI7QUFLSTtFQUNJLFlBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQUFBO0FBSFI7QUFLUTtFQUNJLGVBQUE7QUFIWiIsImZpbGUiOiJ0cmlwLWxvZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW9uLWZhYiB7XHJcbiAgICAmLnR3by1idXR0b25zIHtcclxuICAgICAgICBsZWZ0OiA0MHB4O1xyXG4gICAgICAgIGlvbi1jb2wge1xyXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICYueC1sYXJnZSB7XHJcbiAgICAgICAgYm90dG9tOiAyMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1mYWItYnV0dG9uLngtbGFyZ2Uge1xyXG4gICAgICAgIC0tc2l6ZTogODBweDtcclxuICAgICAgICAtLWhlaWdodDogODBweDtcclxuICAgICAgICAtLXdpZHRoOiA4MHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTdweDtcdFxyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcblxyXG4gICAgICAgICYuc21hbGwtdGV4dCB7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFjYUE7QUFTWCwwQ0FDVUMsaUJBRFYsRUFFVUMsYUFGVixFQUVzQztBQUFBOztBQUQ1QjtBQUNBO0FBQ047Ozs7aUJBRUosb0JBQVE7QUFBQTs7QUFDTixpQkFBS0MsbUJBQUwsR0FBMkIsS0FBS0YsaUJBQUwsQ0FDeEJHLHNCQUR3QixHQUV4QkMsU0FGd0IsQ0FFZCxVQUFDQyxPQUFELEVBQVk7QUFDckIsbUJBQUksQ0FBQ0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0QsYUFKd0IsQ0FBM0I7QUFLQSxpQkFBS0MsMkJBQUwsR0FBbUMsS0FBS04saUJBQUwsQ0FDaENPLDhCQURnQyxHQUVoQ0gsU0FGZ0MsQ0FFdEIsVUFBQ0ksZUFBRCxFQUFvQjtBQUM3QixtQkFBSSxDQUFDQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNELGFBSmdDLENBQW5DO0FBTUEsaUJBQUtDLFFBQUwsR0FBZ0JDLFdBQVcsQ0FBQztBQUFBLHFCQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNoQ0MsZ0NBRGdDLEdBQ3JCLEtBQUtDLGdDQUFMLENBQ2YsS0FBS0osZUFEVSxDQURxQjtBQUl0Qyw2QkFBS0ssWUFBTCxHQUFvQixLQUFLWixhQUFMLENBQW1CYSxjQUFuQixDQUFrQ0gsUUFBbEMsQ0FBcEI7O0FBSnNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFaO0FBQUEsYUFBRCxFQUt4QixJQUx3QixDQUEzQjtBQU1EOzs7aUJBRUQsMENBQWlDSCxlQUFqQyxFQUFtRTtBQUNqRSxnQkFBSUcsUUFBUSxHQUFHLENBQWY7O0FBQ0EsZ0JBQUlILGVBQWUsQ0FBQ08sTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsa0JBQUlDLFFBQVEsR0FBb0IsSUFBaEM7O0FBRDhCLHlEQUVYUixlQUZXO0FBQUE7O0FBQUE7QUFFOUIsb0VBQW9DO0FBQUEsc0JBQXpCUyxJQUF5Qjs7QUFDbEMsc0JBQUlBLElBQUksQ0FBQ0MsS0FBTCxLQUFlQywrRkFBbkIsRUFBd0M7QUFDdENSLDRCQUFRLElBQUlTLG1EQUNKSCxJQUFJLENBQUNJLFNBREQsRUFFVEMsSUFGUyxDQUVKRixtREFBWUosUUFBUSxDQUFDSyxTQUFyQixDQUZJLENBQVo7QUFHRDs7QUFDREwsMEJBQVEsR0FBR0MsSUFBWDtBQUNEO0FBVDZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBVTlCLGtCQUFJRCxRQUFRLENBQUNFLEtBQVQsS0FBbUJDLGdHQUF2QixFQUE2QztBQUMzQ1Isd0JBQVEsSUFBSVMsZ0RBQVNFLElBQVQsQ0FBY0YsbURBQVlKLFFBQVEsQ0FBQ0ssU0FBckIsQ0FBZCxDQUFaO0FBQ0Q7QUFDRjs7QUFDRCxtQkFBT1YsUUFBUDtBQUNEOzs7aUJBRUQsdUJBQVc7QUFDVCxpQkFBS1QsbUJBQUwsQ0FBeUJxQixXQUF6QjtBQUNBLGlCQUFLakIsMkJBQUwsQ0FBaUNpQixXQUFqQztBQUNBQyx5QkFBYSxDQUFDLEtBQUtmLFFBQU4sQ0FBYjtBQUNEOzs7Ozs7O3lCQXpEVVYsMEJBQXVCMEI7QUFBQTs7O2NBQXZCMUI7QUFBdUIyQjtBQUFBQztBQUFBQztBQUFBQztBQUFBQztBQUFBO0FDZHBDTDs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFBd0VBOztBQUFRQTs7QUFDaEZBOztBQUFVQTs7QUFBZ0JBOztBQUM1QkE7O0FBQ0FBOztBQUdGQTs7QUFDRkE7Ozs7QUFOZ0JBOztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSmhCLFVBQVlNLGFBQVo7O0FBQUEsaUJBQVlBLFlBQVosRUFBd0I7QUFDdEJBO0FBQ0FBO0FBQ0FBO0FBQ0FBO0FBQ0QsT0FMRCxFQUFZQSxhQUFZLEtBQVpBLGFBQVksTUFBeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDV0EsVUFBTUMsTUFBTSxHQUFXLENBQ3JCO0FBQ0VDLFlBQUksRUFBRSxFQURSO0FBRUVDLGlCQUFTLEVBQUVDO0FBRmIsT0FEcUIsQ0FBdkI7O1VBaUJhQzs7Ozs7eUJBQUFBO0FBQWlCOzs7Y0FBakJBOzs7a0JBVEYsQ0FDUEMseURBRE8sRUFFUEMsdURBRk8sRUFHUEMsdURBSE8sRUFJUEMsbUVBQXNCUixNQUF0QixDQUpPLEVBS1BTLGdFQUxPOzs7OzRIQVNFTCxvQkFBaUI7QUFBQU0seUJBRmJQLHVEQUVhLEVBRkFRLDRHQUVBO0FBRnVCQyxvQkFOakRQLHlEQU1pRCxFQUxqREMsdURBS2lELEVBSmpEQyx1REFJaUQsRUFKdENDLHlEQUlzQyxFQUZqREMsZ0VBRWlEO0FBRXZCO0FBSlg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2JqQkk7O0FBQ0VBOztBQUNFQTs7QUFBZ0RBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQzlDQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOzs7O0FBSE1BOztBQUFBQTs7Ozs7Ozs7QUFNSkE7O0FBQ0VBOztBQUErQ0E7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDN0NBOzs7O0FBQ0ZBOztBQUNGQTs7OztBQUZJQTs7QUFBQUE7Ozs7Ozs7O0FBR0pBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFBMERBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQ3hEQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFBMkRBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQ3pEQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7Ozs7QUFWVUE7O0FBQUFBOztBQUtBQTs7QUFBQUE7Ozs7OztBQWpCWkE7O0FBQ0VBOztBQUNBQTs7QUFLQUE7O0FBZ0JGQTs7Ozs7O0FBckJZQTs7QUFBQUE7O0FBS0FBOztBQUFBQTs7Ozs7O0FBaUJaQTs7QUFDRUE7O0FBQ0ZBOzs7O1VDakNXQztBQUlYLDhCQUNVQyw0QkFEVixFQUVVL0MsaUJBRlYsRUFFOEM7QUFBQTs7QUFEcEM7QUFDQTtBQUxWLHVCQUFzQmdELG1HQUF0QjtBQU1JOzs7O2lCQUVFLG9CQUFROzs7Ozs7OztBQUNaLDJCQUFLQyxZQUFMLEdBQW9CLEtBQUtqRCxpQkFBTCxDQUNqQmtELDJCQURpQixHQUVqQjlDLFNBRmlCLENBRVAsVUFBQytDLFFBQUQsRUFBYTtBQUN0Qiw4QkFBSSxDQUFDakMsS0FBTCxHQUFhaUMsUUFBUSxDQUFDakMsS0FBdEI7QUFDRCx1QkFKaUIsQ0FBcEI7Ozs7Ozs7OztBQUtEOzs7aUJBRUsscUJBQVM7Ozs7Ozt3REFDTixLQUFLNkIsNEJBQUwsQ0FBa0NLLEtBQWxDOzs7Ozs7Ozs7QUFDUjs7O2lCQUVLLHFCQUFTOzs7Ozs7d0RBQ04sS0FBS0wsNEJBQUwsQ0FBa0NNLElBQWxDOzs7Ozs7Ozs7QUFDUjs7O2lCQUVLLHdCQUFZOzs7Ozs7Ozs7Ozs7QUFHakI7OztpQkFFRCx1QkFBVztBQUNULGlCQUFLSixZQUFMLENBQWtCMUIsV0FBbEI7QUFDRDs7Ozs7Ozt5QkFoQ1V1QixjQUFXRDtBQUFBOzs7Y0FBWEM7QUFBV3BCO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURYeEJlOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFPQUE7O0FBd0JBQTs7QUFHRkE7Ozs7QUE1Q2VBOztBQUFBQTs7QUFLVEE7O0FBQUFBOztBQUtXQTs7QUFBQUE7O0FBT0FBOztBQUFBQTs7QUF3QkFBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbIlRyaXBMb2dTdW1tYXJ5Q29tcG9uZW50IiwidHJpcExvZ2dlclNlcnZpY2UiLCJoZWxwZXJTZXJ2aWNlIiwidHJpcExvZ1N1YnNjcmlwdGlvbiIsImdldFRyaXBMb2dBc09ic2VydmFibGUiLCJzdWJzY3JpYmUiLCJ0cmlwTG9nIiwidHJpcExvZ0FjdGl2aXR5U3Vic2NyaXB0aW9uIiwiZ2V0VHJpcExvZ0FjdGl2aXR5QXNPYnNlcnZhYmxlIiwidHJpcExvZ0FjdGl2aXR5IiwiaW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImxlbmd0aE1zIiwiY2FsY3VsYXRlVGltZUZyb21UcmlwTG9nQWN0aXZpdHkiLCJsZW5ndGhTdHJpbmciLCJmb3JtYXRNc1RvVGltZSIsImxlbmd0aCIsImxhc3RJdGVtIiwiaXRlbSIsInN0YXRlIiwiX2NvcmVfc2VydmljZXNfdHJpcF9sb2dnZXJfdHJpcF9sb2dfc3RhdGVfZW51bV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwibW9tZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsInRpbWVzdGFtcCIsImRpZmYiLCJ1bnN1YnNjcmliZSIsImNsZWFySW50ZXJ2YWwiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJzZWxlY3RvcnMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSIsIlRyaXBMb2dTdGF0ZSIsInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfdHJpcF9sb2dfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiVHJpcExvZ1BhZ2VNb2R1bGUiLCJfYW5ndWxhcl9jb21tb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9hbmd1bGFyX2Zvcm1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfbmd4X3RyYW5zbGF0ZV9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJkZWNsYXJhdGlvbnMiLCJfY29tcG9uZW50c190cmlwX2xvZ19zdW1tYXJ5X3RyaXBfbG9nX3N1bW1hcnlfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiVHJpcExvZ1BhZ2UiLCJiYWNrZ3JvdW5kR2VvbG9jYXRpb25TZXJ2aWNlIiwiX2NvcmVfc2VydmljZXNfdHJpcF9sb2dnZXJfdHJpcF9sb2dfc3RhdGVfZW51bV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwic3Vic2NyaXB0aW9uIiwiZ2V0VHJpcExvZ1N0YXRlQXNPYnNlcnZhYmxlIiwiYWN0aXZpdHkiLCJzdGFydCIsInN0b3AiXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvY29tcG9uZW50cy90cmlwLWxvZy1zdW1tYXJ5L3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL2NvbXBvbmVudHMvdHJpcC1sb2ctc3VtbWFyeS90cmlwLWxvZy1zdW1tYXJ5LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy90cmlwLWxvZy90cmlwLWxvZy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdHJpcC1sb2cvdHJpcC1sb2cucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3RyaXAtbG9nL3RyaXAtbG9nLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmlwTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvaGVscGVycy9oZWxwZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dJdGVtIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZy1pdGVtLm1vZGVsJztcclxuaW1wb3J0IHsgVHJpcExvZ0FjdGl2aXR5IH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy90cmlwLWxvZ2dlci90cmlwLWxvZy1hY3Rpdml0eS5tb2RlbCc7XHJcbmltcG9ydCB7IFRyaXBMb2dTdGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdHJpcC1sb2ctc3VtbWFyeScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RyaXAtbG9nLXN1bW1hcnkuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJpcExvZ1N1bW1hcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSB0cmlwTG9nU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSB0cmlwTG9nQWN0aXZpdHlTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgbGVuZ3RoU3RyaW5nOiBzdHJpbmc7XHJcbiAgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lcjtcclxuICB0cmlwTG9nOiBUcmlwTG9nSXRlbVtdO1xyXG4gIHRyaXBMb2dBY3Rpdml0eTogVHJpcExvZ0FjdGl2aXR5W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0cmlwTG9nZ2VyU2VydmljZTogVHJpcExvZ2dlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IEhlbHBlclNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy50cmlwTG9nU3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAuZ2V0VHJpcExvZ0FzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRyaXBMb2cpID0+IHtcclxuICAgICAgICB0aGlzLnRyaXBMb2cgPSB0cmlwTG9nO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMudHJpcExvZ0FjdGl2aXR5U3Vic2NyaXB0aW9uID0gdGhpcy50cmlwTG9nZ2VyU2VydmljZVxyXG4gICAgICAuZ2V0VHJpcExvZ0FjdGl2aXR5QXNPYnNlcnZhYmxlKClcclxuICAgICAgLnN1YnNjcmliZSgodHJpcExvZ0FjdGl2aXR5KSA9PiB7XHJcbiAgICAgICAgdGhpcy50cmlwTG9nQWN0aXZpdHkgPSB0cmlwTG9nQWN0aXZpdHk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGxlbmd0aE1zID0gdGhpcy5jYWxjdWxhdGVUaW1lRnJvbVRyaXBMb2dBY3Rpdml0eShcclxuICAgICAgICB0aGlzLnRyaXBMb2dBY3Rpdml0eVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmxlbmd0aFN0cmluZyA9IHRoaXMuaGVscGVyU2VydmljZS5mb3JtYXRNc1RvVGltZShsZW5ndGhNcyk7XHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVRpbWVGcm9tVHJpcExvZ0FjdGl2aXR5KHRyaXBMb2dBY3Rpdml0eTogVHJpcExvZ0FjdGl2aXR5W10pOiBudW1iZXIge1xyXG4gICAgbGV0IGxlbmd0aE1zID0gMDtcclxuICAgIGlmICh0cmlwTG9nQWN0aXZpdHkubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgbGFzdEl0ZW06IFRyaXBMb2dBY3Rpdml0eSA9IG51bGw7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0cmlwTG9nQWN0aXZpdHkpIHtcclxuICAgICAgICBpZiAoaXRlbS5zdGF0ZSA9PT0gVHJpcExvZ1N0YXRlLlBhdXNlZCkge1xyXG4gICAgICAgICAgbGVuZ3RoTXMgKz0gbW9tZW50XHJcbiAgICAgICAgICAgIC51bml4KGl0ZW0udGltZXN0YW1wKVxyXG4gICAgICAgICAgICAuZGlmZihtb21lbnQudW5peChsYXN0SXRlbS50aW1lc3RhbXApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdEl0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChsYXN0SXRlbS5zdGF0ZSA9PT0gVHJpcExvZ1N0YXRlLlJ1bm5pbmcpIHtcclxuICAgICAgICBsZW5ndGhNcyArPSBtb21lbnQoKS5kaWZmKG1vbWVudC51bml4KGxhc3RJdGVtLnRpbWVzdGFtcCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVuZ3RoTXM7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudHJpcExvZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy50cmlwTG9nQWN0aXZpdHlTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24tZ3JpZD5cclxuICA8aW9uLXJvdz5cclxuICAgIDxpb24tY29sPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5WYXJpZ2hldDwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXRleHQ+e3tsZW5ndGhTdHJpbmd9fTwvaW9uLXRleHQ+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgICA8aW9uLWNvbD5cclxuXHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L2lvbi1ncmlkPiIsImV4cG9ydCBlbnVtIFRyaXBMb2dTdGF0ZSB7XHJcbiAgTm90U3RhcnRlZCA9ICdOT1RfU1RBUlRFRCcsXHJcbiAgUGF1c2VkID0gJ1BBVVNFRCcsXHJcbiAgUnVubmluZyA9ICdSVU5OSU5HJyxcclxuICBTdG9wcGVkID0gJ1NUT1BQRUQnXHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IElvbmljTW9kdWxlIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0IHsgVHJpcExvZ1BhZ2UgfSBmcm9tICcuL3RyaXAtbG9nLnBhZ2UnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVNb2R1bGUgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgVHJpcExvZ1N1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3RyaXAtbG9nLXN1bW1hcnkvdHJpcC1sb2ctc3VtbWFyeS5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IFRyaXBMb2dQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIElvbmljTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1RyaXBMb2dQYWdlLCBUcmlwTG9nU3VtbWFyeUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRyaXBMb2dQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBjb2xvcj1cInt7IHN0YXRlID09PSAnUlVOTklORycgPyAnc3VjY2VzcycgOiAnZGFyaycgIH19XCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdUUklQX0xPRy4nK3N0YXRlIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwic3RhdGUgPT09ICdOT1RfU1RBUlRFRCdcIj5cclxuICAgIDxpb24tZmFiIHZlcnRpY2FsPVwiYm90dG9tXCIgY2xhc3M9XCJ4LWxhcmdlXCIgaG9yaXpvbnRhbD1cImNlbnRlclwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlXCIgY29sb3I9XCJzdWNjZXNzXCIgKGNsaWNrKT1cInN0YXJ0VHJpcCgpXCI+XHJcbiAgICAgICAge3sgJ1RSSVBfTE9HLlNUQVJUJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWZhYi1idXR0b24+XHJcbiAgICA8L2lvbi1mYWI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXRlID09PSAnUEFVU0VEJyB8fCBzdGF0ZSA9PT0gJ1JVTk5JTkcnXCI+XHJcbiAgICA8YXBwLXRyaXAtbG9nLXN1bW1hcnk+PC9hcHAtdHJpcC1sb2ctc3VtbWFyeT5cclxuICAgIDxpb24tZmFiICpuZ0lmPVwic3RhdGUgPT09ICdSVU5OSU5HJ1wiIHZlcnRpY2FsPVwiYm90dG9tXCIgY2xhc3M9XCJ4LWxhcmdlXCIgaG9yaXpvbnRhbD1cImNlbnRlclwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlXCIgY29sb3I9XCJkYW5nZXJcIiAoY2xpY2spPVwicGF1c2VUcmlwKClcIj5cclxuICAgICAgICB7eyAnVFJJUF9MT0cuU1RPUCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1mYWItYnV0dG9uPlxyXG4gICAgPC9pb24tZmFiPlxyXG4gICAgPGlvbi1mYWIgKm5nSWY9XCJzdGF0ZSA9PT0gJ1BBVVNFRCdcIiB2ZXJ0aWNhbD1cImJvdHRvbVwiIGNsYXNzPVwieC1sYXJnZSB0d28tYnV0dG9uc1wiIGhvcml6b250YWw9XCJzdGFydFwiIHNsb3Q9XCJmaXhlZFwiPlxyXG4gICAgICA8aW9uLWdyaWQ+XHJcbiAgICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgICA8aW9uLWNvbD5cclxuICAgICAgICAgICAgPGlvbi1mYWItYnV0dG9uIGNsYXNzPVwieC1sYXJnZSBzbWFsbC10ZXh0XCIgY29sb3I9XCJkYW5nZXJcIiAoY2xpY2spPVwiY29tcGxldGVUcmlwKClcIj5cclxuICAgICAgICAgICAgICB7eyAnVFJJUF9MT0cuQ09NUExFVEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9pb24tZmFiLWJ1dHRvbj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICAgIDxpb24tY29sPlxyXG4gICAgICAgICAgICA8aW9uLWZhYi1idXR0b24gY2xhc3M9XCJ4LWxhcmdlIHNtYWxsLXRleHRcIiBjb2xvcj1cInN1Y2Nlc3NcIiAoY2xpY2spPVwic3RhcnRUcmlwKClcIj5cclxuICAgICAgICAgICAgICB7eyAnVFJJUF9MT0cuQ09OVElOVUUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgICAgPC9pb24tZmFiLWJ1dHRvbj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1mYWI+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXRlID09PSAnU1RPUFBFRCdcIj5cclxuICAgIDxhcHAtdHJpcC1sb2ctc3VtbWFyeT48L2FwcC10cmlwLWxvZy1zdW1tYXJ5PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFja2dyb3VuZEdlb2xvY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYmFja2dyb3VuZC1nZW9sb2NhdGlvbi9iYWNrZ3JvdW5kLWdlb2xvY2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUcmlwTG9nZ2VyU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRyaXBMb2dTdGF0ZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdHJpcC1sb2dnZXIvdHJpcC1sb2ctc3RhdGUuZW51bSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtdHJpcC1sb2cnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cmlwLWxvZy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3RyaXAtbG9nLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcmlwTG9nUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBzdGF0ZTogVHJpcExvZ1N0YXRlID0gVHJpcExvZ1N0YXRlLk5vdFN0YXJ0ZWQ7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2U6IEJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyaXBMb2dnZXJTZXJ2aWNlOiBUcmlwTG9nZ2VyU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHJpcExvZ2dlclNlcnZpY2VcclxuICAgICAgLmdldFRyaXBMb2dTdGF0ZUFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGFjdGl2aXR5KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGFjdGl2aXR5LnN0YXRlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHN0YXJ0VHJpcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2Uuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHBhdXNlVHJpcCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhY2tncm91bmRHZW9sb2NhdGlvblNlcnZpY2Uuc3RvcCgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29tcGxldGVUcmlwKCkge1xyXG4gICAgLy8gYXdhaXQgdGhpcy50cmlwTG9nZ2VyU2VydmljZS51cGRhdGVTdGF0ZShUcmlwTG9nU3RhdGUuU3RvcHBlZCk7XHJcbiAgICAvLyB0aGlzLnN0YXRlID0gVHJpcExvZ1N0YXRlLlN0b3BwZWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==