(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_water_water-level_water-level_module_ts"], {
    /***/
    66562: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WaterLevelMeasurementComponent": function WaterLevelMeasurementComponent() {
          return (
            /* binding */
            _WaterLevelMeasurementComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function WaterLevelMeasurementComponent_app_numeric_input_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-numeric-input", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function WaterLevelMeasurementComponent_app_numeric_input_4_Template_app_numeric_input_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r3.waterLevelMeasurement.WaterLevelValue = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.waterLevelMeasurement.WaterLevelValue)("min", 0)("max", 8848)("decimalPlaces", 3);
        }
      }

      function WaterLevelMeasurementComponent_ion_item_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
        }
      }

      function WaterLevelMeasurementComponent_ion_item_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, "REGISTRATION.WATER.WATER_LEVEL.DT_REQUIRED_TEXT"), " ");
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "hasWarning": a0
        };
      };

      var _WaterLevelMeasurementComponent = /*#__PURE__*/function () {
        function _WaterLevelMeasurementComponent() {
          _classCallCheck(this, _WaterLevelMeasurementComponent);

          this.waterLevelMeasurementChange = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
          this.showDtMeasurementTimeError = false;
        }

        _createClass(_WaterLevelMeasurementComponent, [{
          key: "dateIsDifferentThanObsTime",
          get: function get() {
            return this.waterLevelMeasurement.DtMeasurementTime && !moment__WEBPACK_IMPORTED_MODULE_0___default()(this.waterLevelMeasurement.DtMeasurementTime).startOf('day').isSame(moment__WEBPACK_IMPORTED_MODULE_0___default()(this.dtObsTime).startOf('day'));
          }
        }, {
          key: "isValid",
          get: function get() {
            if ((0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(this.waterLevelMeasurement)) {
              return true;
            }

            return this.waterLevelMeasurement.DtMeasurementTime;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            this.maxDate = this.getMaxDateForNow();

            if (!this.waterLevelMeasurement.Attachments) {
              this.waterLevelMeasurement.Attachments = [];
            }
          }
        }, {
          key: "getMaxDateForNow",
          value: function getMaxDateForNow() {
            // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
            // Workaround is to set minutes to 59.
            return moment__WEBPACK_IMPORTED_MODULE_0___default()().minutes(59).toISOString(true);
          }
        }, {
          key: "setToNow",
          value: function setToNow() {
            var now = moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
            this.maxDate = this.getMaxDateForNow();
            this.waterLevelMeasurement.DtMeasurementTime = now;
          }
        }, {
          key: "showError",
          value: function showError() {
            if (!(0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(this.waterLevelMeasurement) && !this.waterLevelMeasurement.DtMeasurementTime) {
              this.showDtMeasurementTimeError = true;
            } else {
              this.showDtMeasurementTimeError = false;
            }
          }
        }, {
          key: "dtChanged",
          value: function dtChanged() {
            this.showError();
          }
        }]);

        return _WaterLevelMeasurementComponent;
      }();

      _WaterLevelMeasurementComponent.ɵfac = function WaterLevelMeasurementComponent_Factory(t) {
        return new (t || _WaterLevelMeasurementComponent)();
      };

      _WaterLevelMeasurementComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _WaterLevelMeasurementComponent,
        selectors: [["app-water-level-measurement"]],
        inputs: {
          measurementNumber: "measurementNumber",
          waterLevelMethod: "waterLevelMethod",
          registrationTid: "registrationTid",
          registrationId: "registrationId",
          geoHazard: "geoHazard",
          dtObsTime: "dtObsTime",
          waterLevelMeasurement: "waterLevelMeasurement"
        },
        outputs: {
          waterLevelMeasurementChange: "waterLevelMeasurementChange"
        },
        decls: 27,
        vars: 49,
        consts: [["title", "REGISTRATION.WATER.WATER_LEVEL.WATER_LEVEL_METERS", "suffix", "m", 3, "value", "min", "max", "decimalPlaces", "valueChange", 4, "ngIf"], [3, "ngClass"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "monthShortNames", "doneText", "cancelText", "ngModel", "max", "ionChange", "ngModelChange"], ["slot", "end", "fill", "outline", "color", "medium", 1, "set-to-now-button", 3, "click"], ["slot", "start", "name", "time"], [4, "ngIf"], ["iconColor", "primary", "icon", "add-circle-outline", 3, "title", "registrationTid", "geoHazard", "registrationId", "ref", "attachmentType"], [3, "value", "placeholder", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.WATER_LEVEL_METERS", "suffix", "m", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["color", "danger", 1, "ion-text-wrap"]],
        template: function WaterLevelMeasurementComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, WaterLevelMeasurementComponent_app_numeric_input_4_Template, 1, 4, "app-numeric-input", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-datetime", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function WaterLevelMeasurementComponent_Template_ion_datetime_ionChange_9_listener() {
              return ctx.dtChanged();
            })("ngModelChange", function WaterLevelMeasurementComponent_Template_ion_datetime_ngModelChange_9_listener($event) {
              return ctx.waterLevelMeasurement.DtMeasurementTime = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function WaterLevelMeasurementComponent_Template_ion_button_click_13_listener() {
              return ctx.setToNow();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "ion-icon", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](16, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, WaterLevelMeasurementComponent_ion_item_17_Template, 5, 6, "ion-item", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, WaterLevelMeasurementComponent_ion_item_18_Template, 4, 3, "ion-item", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "app-add-picture-item", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](21, "lowercase");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "app-text-comment", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function WaterLevelMeasurementComponent_Template_app_text_comment_valueChange_23_listener($event) {
              return ctx.waterLevelMeasurement.Comment = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](24, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "lowercase");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 23, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING" : "REGISTRATION.WATER.WATER_LEVEL.MEASURING"), " ", ctx.measurementNumber, " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.waterLevelMethod === 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](47, _c0, ctx.dateIsDifferentThanObsTime));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 25, "REGISTRATION.SET_TIME.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](10, 27, "MONTHS.SHORT_LIST"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 29, "DIALOGS.OK"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 31, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.waterLevelMeasurement.DtMeasurementTime)("max", ctx.maxDate);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](16, 33, "REGISTRATION.SET_TIME.NOW"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.dateIsDifferentThanObsTime);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showDtMeasurementTimeError);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate2"]("title", "", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](20, 35, "REGISTRATION.WATER.WATER_LEVEL.ADD_PICTURE"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](21, 37, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](22, 39, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL" : "REGISTRATION.WATER.WATER_LEVEL.MEASURE_PLURAL")), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("registrationTid", ctx.registrationTid)("geoHazard", ctx.geoHazard)("registrationId", ctx.registrationId)("ref", ctx.waterLevelMeasurement.WaterLevelMeasurementId)("attachmentType", "WaterLevelMeasurementAttachment");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate2"]("placeholder", "", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](24, 41, "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](25, 43, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](26, 45, ctx.waterLevelMethod === 1 ? "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL" : "REGISTRATION.WATER.WATER_LEVEL.MEASURE_PLURAL")), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.waterLevelMeasurement.Comment);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_2__.AddPictureItemComponent, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_8__.LowerCasePipe],
        styles: [".set-to-now-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKIiwiZmlsZSI6IndhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNldC10by1ub3ctYnV0dG9uIHtcclxuICAgIHotaW5kZXg6IDIwMDtcclxufSJdfQ== */"]
      });
      /***/
    },

    /***/
    35140: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BasePageService": function BasePageService() {
          return (
            /* binding */
            _BasePageService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.helpers */
      6174);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/registration.service */
      33181);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      32185);
      /* harmony import */


      var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var DEBUG_TAG = 'BasePageService';

      var _BasePageService = /*#__PURE__*/function () {
        function _BasePageService(registrationService, newAttachmentService, commonRegistrationService, ngZone, alertController, translateService, loggingService) {
          _classCallCheck(this, _BasePageService);

          this.registrationService = registrationService;
          this.newAttachmentService = newAttachmentService;
          this.commonRegistrationService = commonRegistrationService;
          this.ngZone = ngZone;
          this.alertController = alertController;
          this.translateService = translateService;
          this.loggingService = loggingService;
        }

        _createClass(_BasePageService, [{
          key: "Zone",
          get: function get() {
            return this.ngZone;
          }
        }, {
          key: "RegistrationService",
          get: function get() {
            return this.registrationService;
          }
        }, {
          key: "AlertController",
          get: function get() {
            return this.alertController;
          }
        }, {
          key: "TranslateService",
          get: function get() {
            return this.translateService;
          }
        }, {
          key: "CommonRegistrationService",
          get: function get() {
            return this.commonRegistrationService;
          }
        }, {
          key: "confirmLeave",
          value: function confirmLeave(registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var leaveText;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();

                    case 2:
                      leaveText = _context.sent;
                      return _context.abrupt("return", this.createResetDialog(leaveText, registration, registrationTid, onReset));

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "confirmReset",
          value: function confirmReset(registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var leaveText;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.translateService.get('REGISTRATION.CONFIRM_RESET').toPromise();

                    case 2:
                      leaveText = _context2.sent;
                      return _context2.abrupt("return", this.createResetDialog(leaveText, registration, registrationTid, onReset));

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "createResetDialog",
          value: function createResetDialog(message, registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var translations, alert, result, reset;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();

                    case 2:
                      translations = _context3.sent;
                      _context3.next = 5;
                      return this.alertController.create({
                        message: message,
                        buttons: [{
                          text: translations['DIALOGS.CANCEL'],
                          role: 'cancel'
                        }, {
                          text: translations['DIALOGS.YES']
                        }]
                      });

                    case 5:
                      alert = _context3.sent;
                      _context3.next = 8;
                      return alert.present();

                    case 8:
                      _context3.next = 10;
                      return alert.onDidDismiss();

                    case 10:
                      result = _context3.sent;
                      reset = result.role !== 'cancel';

                      if (!reset) {
                        _context3.next = 15;
                        break;
                      }

                      _context3.next = 15;
                      return this.reset(registration, registrationTid, onReset);

                    case 15:
                      return _context3.abrupt("return", reset);

                    case 16:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "reset",
          value: function reset(registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this = this;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      this.Zone.run(function () {
                        if (registrationTid) {
                          registration.request[(0, src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid)] = _this.getDefaultValue(registrationTid);

                          _this.resetImages(registration);
                        }

                        if (onReset) {
                          onReset();
                        }
                      });
                      _context4.next = 3;
                      return this.registrationService.saveRegistrationAsync(registration);

                    case 3:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "createDefaultProps",
          value: function createDefaultProps(registration, registrationTid) {
            var propName = (0, src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid);

            if (!registration.request[propName]) {
              // Init to new object if null
              registration.request[propName] = this.getDefaultValue(registrationTid);
            }
          }
        }, {
          key: "getDefaultValue",
          value: function getDefaultValue(registrationTid) {
            if ((0, src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.isArrayType)(registrationTid)) {
              return [];
            } else {
              return {};
            }
          }
        }, {
          key: "resetImages",
          value: function resetImages(registration) {
            var _this2 = this;

            this.newAttachmentService.getAttachments(registration.id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(function (attachments) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)(attachments.map(function (a) {
                return _this2.newAttachmentService.removeAttachment(registration.id, a.id);
              }));
            })).subscribe(function () {
              _this2.loggingService.debug('Reset images complete', DEBUG_TAG);
            }, function (error) {
              _this2.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
            });
          }
        }]);

        return _BasePageService;
      }();

      _BasePageService.ɵfac = function BasePageService_Factory(t) {
        return new (t || _BasePageService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_3__.LoggingService));
      };

      _BasePageService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _BasePageService,
        factory: _BasePageService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    81877: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BasePage": function BasePage() {
          return (
            /* binding */
            _BasePage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./base-page-service */
      35140);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _BasePage = /*#__PURE__*/function (_core_helpers_observa) {
        _inherits(_BasePage, _core_helpers_observa);

        var _super = _createSuper(_BasePage);

        function _BasePage(registrationTid, basePageService, activatedRoute) {
          var _this3;

          _classCallCheck(this, _BasePage);

          _this3 = _super.call(this);
          _this3.basePageService = basePageService;
          _this3.activatedRoute = activatedRoute;
          _this3.registrationTid = registrationTid;
          return _this3;
        }

        _createClass(_BasePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            var _this4 = this;

            var id = this.activatedRoute.snapshot.params['id'];
            this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(function (reg) {
              _this4.basePageService.createDefaultProps(reg, _this4.registrationTid);

              return reg;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(function (reg) {
              _this4.registration = reg;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(function () {
              return _this4.createInitObservable();
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$)).subscribe();
          } // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module

        }, {
          key: "canLeave",
          value: function canLeave() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var _this5 = this;

              var valid, isEmpty;
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return Promise.resolve(this.isValid ? this.isValid() : true);

                    case 2:
                      valid = _context5.sent;
                      _context5.next = 5;
                      return Promise.resolve(this.isEmpty());

                    case 5:
                      isEmpty = _context5.sent;

                      if (!(!isEmpty && !valid)) {
                        _context5.next = 8;
                        break;
                      }

                      return _context5.abrupt("return", this.basePageService.confirmLeave(this.registration, this.registrationTid, function () {
                        return _this5.onReset ? _this5.onReset() : null;
                      }));

                    case 8:
                      return _context5.abrupt("return", true);

                    case 9:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "createInitObservable",
          value: function createInitObservable() {
            if (this.onInit) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_9__.from)(Promise.resolve(this.onInit()));
            }

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_10__.of)({});
          }
        }, {
          key: "ionViewWillLeave",
          value: function ionViewWillLeave() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      if (!this.onBeforeLeave) {
                        _context6.next = 3;
                        break;
                      }

                      _context6.next = 3;
                      return Promise.resolve(this.onBeforeLeave());

                    case 3:
                      _context6.next = 5;
                      return this.save(true);

                    case 5:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "save",
          value: function save() {
            var clean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            this.registration.syncStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.SyncStatus.Draft;
            return this.basePageService.RegistrationService.saveRegistrationAsync(this.registration, clean);
          }
        }, {
          key: "getSaveFunc",
          value: function getSaveFunc() {
            var _this6 = this;

            return function () {
              return _this6.save();
            };
          }
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1)).toPromise();

                    case 2:
                      return _context7.abrupt("return", !_context7.sent);

                    case 3:
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
            var _this7 = this;

            return this.basePageService.confirmReset(this.registration, this.registrationTid, function () {
              return _this7.onReset ? _this7.onReset() : null;
            });
          }
        }, {
          key: "getResolvedUrl",
          value: function getResolvedUrl() {
            return '/' + this.activatedRoute.snapshot.pathFromRoot.map(function (v) {
              return v.url.map(function (segment) {
                return segment.toString();
              }).join('/');
            }).filter(function (path) {
              return !!path;
            }).join('/');
          }
        }]);

        return _BasePage;
      }(_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_2__.NgDestoryBase);

      _BasePage.ɵfac = function BasePage_Factory(t) {
        return new (t || _BasePage)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute));
      };

      _BasePage.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineDirective"]({
        type: _BasePage,
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵInheritDefinitionFeature"]]
      });
      /***/
    },

    /***/
    75505: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WaterLevelPageModule": function WaterLevelPageModule() {
          return (
            /* binding */
            _WaterLevelPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _water_level_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./water-level.page */
      22285);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../components/water/water-level-measurement/water-level-measurement.component */
      66562);
      /* harmony import */


      var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../can-deactivate-route.guard */
      7990);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _water_level_page__WEBPACK_IMPORTED_MODULE_0__.WaterLevelPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__.CanDeactivateRouteGuard]
      }];

      var _WaterLevelPageModule = function _WaterLevelPageModule() {
        _classCallCheck(this, _WaterLevelPageModule);
      };

      _WaterLevelPageModule.ɵfac = function WaterLevelPageModule_Factory(t) {
        return new (t || _WaterLevelPageModule)();
      };

      _WaterLevelPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _WaterLevelPageModule
      });
      _WaterLevelPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_WaterLevelPageModule, {
          declarations: [_water_level_page__WEBPACK_IMPORTED_MODULE_0__.WaterLevelPage, _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_2__.WaterLevelMeasurementComponent],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    22285: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WaterLevelPage": function WaterLevelPage() {
          return (
            /* binding */
            _WaterLevelPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../components/water/water-level-measurement/water-level-measurement.component */
      66562);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/kdv-radiobutton-list/kdv-radiobutton-list.component */
      31610);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r6.registration.request.WaterLevel2.MarkingReferenceTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "app-text-comment", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template_app_text_comment_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r8.registration.request.WaterLevel2.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "uppercase");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "uppercase");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r1.registration.request.WaterLevel2.MarkingReferenceTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate2"]("title", "", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 4, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 6, "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE")), " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 8, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "REGISTRATION.WATER.WATER_LEVEL.MARKING_PLURAL")), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r1.registration.request.WaterLevel2.Comment);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r9.registration.request.WaterLevel2.MarkingTypeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r2.registration.request.WaterLevel2.MarkingTypeTID);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-text-comment", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template_app_text_comment_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

            return ctx_r12.registration.request.WaterLevel2.MeasuringToolDescription = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r11.registration.request.WaterLevel2.MeasuringToolDescription);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r15);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r14.registration.request.WaterLevel2.MeasurementTypeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_app_text_comment_1_Template, 1, 1, "app-text-comment", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r3.registration.request.WaterLevel2.MeasurementTypeTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.registration.request.WaterLevel2.MeasurementTypeTID === 3);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-kdv-radiobutton-list", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template_app_kdv_radiobutton_list_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r17);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r16.registration.request.WaterLevel2.MeasurementReferenceTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "app-text-comment", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template_app_text_comment_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r17);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r18.registration.request.WaterLevel2.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r4.registration.request.WaterLevel2.MeasurementReferenceTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r4.registration.request.WaterLevel2.Comment);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-water-level-measurement", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("waterLevelMeasurementChange", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template_app_water_level_measurement_waterLevelMeasurementChange_0_listener($event) {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r23);

            var i_r21 = restoredCtx.index;

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

            return ctx_r22.registration.request.WaterLevel2.WaterLevelMeasurement[i_r21] = $event;
          })("waterLevelMeasurementChange", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template_app_water_level_measurement_waterLevelMeasurementChange_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r23);

            var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

            return ctx_r24.save();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var i_r21 = ctx.index;

          var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("measurementNumber", i_r21 + 1)("waterLevelMethod", ctx_r19.registration.request.WaterLevel2.WaterLevelMethodTID)("waterLevelMeasurement", ctx_r19.registration.request.WaterLevel2.WaterLevelMeasurement[i_r21])("registrationTid", ctx_r19.registrationTid)("dtObsTime", ctx_r19.registration.request.DtObsTime)("registrationId", ctx_r19.registration.id)("geoHazard", ctx_r19.registration.geoHazard);
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template(rf, ctx) {
        if (rf & 1) {
          var _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_app_water_level_measurement_2_Template, 1, 7, "app-water-level-measurement", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-list", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-item", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template_ion_item_click_4_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r26);

            var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r25.addWaterLevelMeasurement();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "ion-icon", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "lowercase");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r5.registration.request.WaterLevel2.WaterLevelMeasurement);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 3, "REGISTRATION.WATER.WATER_LEVEL.ADD_NEW"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 5, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](10, 7, ctx_r5.registration.request.WaterLevel2.WaterLevelMethodTID === 1 ? "REGISTRATION.WATER.WATER_LEVEL.WATER_MARKING" : "REGISTRATION.WATER.WATER_LEVEL.WATER_MEASUREMENT")), "");
        }
      }

      function WaterLevelPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);

            var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r27.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "app-kdv-radiobutton-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);

            var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r29.registration.request.WaterLevel2.WaterLevelStateTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "app-kdv-radiobutton-list", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);

            var ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r30.registration.request.WaterLevel2.WaterAstrayTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "app-kdv-radiobutton-list", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);

            var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r31.registration.request.WaterLevel2.ObservationTimingTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "app-kdv-radiobutton-list", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function WaterLevelPage_app_registration_content_wrapper_8_Template_app_kdv_radiobutton_list_valueChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);

            var ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r32.registration.request.WaterLevel2.WaterLevelMethodTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_6_Template, 6, 12, "app-kdv-radiobutton-list", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_7_Template, 1, 1, "app-kdv-radiobutton-list", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_8_Template, 2, 2, "app-kdv-radiobutton-list", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](9, WaterLevelPage_app_registration_content_wrapper_8_app_kdv_radiobutton_list_9_Template, 2, 2, "app-kdv-radiobutton-list", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, WaterLevelPage_app_registration_content_wrapper_8_ng_container_10_Template, 11, 9, "ng-container", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterLevelStateTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterAstrayTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.ObservationTimingTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID === 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.MeasurementTypeTID === 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.WaterLevel2.WaterLevelMethodTID);
        }
      }

      var _WaterLevelPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_WaterLevelPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_WaterLevelPage);

        function _WaterLevelPage(basePageService, activatedRoute) {
          _classCallCheck(this, _WaterLevelPage);

          return _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.WaterLevel2, basePageService, activatedRoute);
        }

        _createClass(_WaterLevelPage, [{
          key: "onInit",
          value: function onInit() {
            if (!this.registration.request.WaterLevel2.WaterLevelMeasurement || this.registration.request.WaterLevel2.WaterLevelMeasurement.length === 0) {
              this.registration.request.WaterLevel2.WaterLevelMeasurement = [{
                DtMeasurementTime: undefined
              }];
            }
          }
        }, {
          key: "onReset",
          value: function onReset() {
            this.registration.request.WaterLevel2.WaterLevelMeasurement = [{
              DtMeasurementTime: undefined
            }];
          }
        }, {
          key: "addWaterLevelMeasurement",
          value: function addWaterLevelMeasurement() {
            this.registration.request.WaterLevel2.WaterLevelMeasurement.push({
              DtMeasurementTime: undefined
            });
            this.save();
          }
        }, {
          key: "onBeforeLeave",
          value: function onBeforeLeave() {
            // Cleanup
            if (this.registration.request.WaterLevel2.WaterLevelMethodTID === 2) {
              this.registration.request.WaterLevel2.MarkingReferenceTID = null;
            }

            if (this.registration.request.WaterLevel2.MeasurementTypeTID !== 3) {
              this.registration.request.WaterLevel2.MeasuringToolDescription = undefined;
            }

            if (!(this.registration.request.WaterLevel2.WaterLevelMethodTID === 1 || this.registration.request.WaterLevel2.MeasurementTypeTID === 1)) {
              this.registration.request.WaterLevel2.Comment = undefined;
            }

            this.registration.request.WaterLevel2.WaterLevelMeasurement = (this.registration.request.WaterLevel2.WaterLevelMeasurement || []).filter(function (item) {
              return !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_2__.IsEmptyHelper.isEmpty(item);
            });
          }
        }, {
          key: "isValid",
          value: function isValid() {
            var _iterator = _createForOfIteratorHelper(this.waterLevelMeasurements.toArray()),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var wl = _step.value;
                wl.showError();
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return this.waterLevelMeasurements && !this.waterLevelMeasurements.some(function (x) {
              return !x.isValid;
            });
          }
        }]);

        return _WaterLevelPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _WaterLevelPage.ɵfac = function WaterLevelPage_Factory(t) {
        return new (t || _WaterLevelPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute));
      };

      _WaterLevelPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _WaterLevelPage,
        selectors: [["app-water-level"]],
        viewQuery: function WaterLevelPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵviewQuery"](_components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__.WaterLevelMeasurementComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵloadQuery"]()) && (ctx.waterLevelMeasurements = _t);
          }
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], ["title", "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE_SITUATION", "kdvKey", "Water_WaterLevelStateKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.CAN_YOU_SEE_WATER", "kdvKey", "Water_WaterAstrayKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.OBSERVATION_TIMING", "kdvKey", "Water_ObservationTimingKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.REGISTRATION_METHOD", "kdvKey", "Water_WaterLevelMethodKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKING_REFERENCE", "kdvKey", "Water_MarkingReferenceKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKED_WITH", "kdvKey", "Water_MarkingTypeKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.HOW_DO_YOU_READ", "kdvKey", "Water_MeasurementTypeKDV", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.RELATIVE", "kdvKey", "Water_MeasurementReferenceKDV", 3, "value", "valueChange", 4, "ngIf"], [4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKING_REFERENCE", "kdvKey", "Water_MarkingReferenceKDV", 3, "value", "valueChange"], [3, "value", "title", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MARKED_WITH", "kdvKey", "Water_MarkingTypeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.HOW_DO_YOU_READ", "kdvKey", "Water_MeasurementTypeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MEASURING_TOOL", 3, "value", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.WATER.WATER_LEVEL.MEASURING_TOOL", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.RELATIVE", "kdvKey", "Water_MeasurementReferenceKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.WATER.WATER_LEVEL.DESCRIBE_HEIGHT", 3, "value", "valueChange"], [3, "measurementNumber", "waterLevelMethod", "waterLevelMeasurement", "registrationTid", "dtObsTime", "registrationId", "geoHazard", "waterLevelMeasurementChange", 4, "ngFor", "ngForOf"], ["lines", "full", 1, "ion-margin-top"], [3, "click"], ["slot", "start", "color", "primary", "name", "add-circle"], [3, "measurementNumber", "waterLevelMethod", "waterLevelMeasurement", "registrationTid", "dtObsTime", "registrationId", "geoHazard", "waterLevelMeasurementChange"]],
        template: function WaterLevelPage_Template(rf, ctx) {
          if (rf & 1) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, WaterLevelPage_app_registration_content_wrapper_8_Template, 11, 11, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.WATER.WATER_LEVEL.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.WaterLevel2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonList, _components_kdv_radiobutton_list_kdv_radiobutton_list_component__WEBPACK_IMPORTED_MODULE_7__.KdvRadiobuttonListComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_8__.TextCommentComponent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonLabel, _components_water_water_level_measurement_water_level_measurement_component__WEBPACK_IMPORTED_MODULE_4__.WaterLevelMeasurementComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.UpperCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.LowerCasePipe],
        styles: [".white-button[_ngcontent-%COMP%] {\n  background-color: #fff;\n  border-bottom: 0.55px solid #c8c7cc;\n  border-bottom: 0.55px solid var(--ion-item-border-color, #c8c7cc);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhdGVyLWxldmVsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFBO0VBQ0EsbUNBQUE7RUFBQSxpRUFBQTtBQUNKIiwiZmlsZSI6IndhdGVyLWxldmVsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi53aGl0ZS1idXR0b24ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJvcmRlci1ib3R0b206IDAuNTVweCBzb2xpZCB2YXIoLS1pb24taXRlbS1ib3JkZXItY29sb3IsICNjOGM3Y2MpO1xyXG59Il19 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REgsRUFFNURyQixNQUY0RCxDQUVyRCxVQUFDOEIsSUFBRDtBQUFBLHFCQUFVLENBQUNDLGlGQUFzQkQsSUFBdEIsQ0FBWDtBQUFBLGFBRnFELENBQTlEO0FBR0Q7OztpQkFFRCxtQkFBTztBQUFBLHVEQUNZLEtBQUtFLHNCQUFMLENBQTRCQyxPQUE1QixFQURaO0FBQUE7O0FBQUE7QUFDTCxrRUFBd0Q7QUFBQSxvQkFBN0NDLEVBQTZDO0FBQ3REQSxrQkFBRSxDQUFDL0gsU0FBSDtBQUNEO0FBSEk7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFJTCxtQkFDRSxLQUFLNkgsc0JBQUwsSUFDQSxDQUFDLEtBQUtBLHNCQUFMLENBQTRCRyxJQUE1QixDQUFpQyxVQUFDQyxDQUFEO0FBQUEscUJBQU8sQ0FBQ0EsQ0FBQyxDQUFDdkQsT0FBVjtBQUFBLGFBQWpDLENBRkg7QUFJRDs7OztRQWhFaUN3RDs7O3lCQUF2QmxCLGlCQUFjSDtBQUFBOzs7Y0FBZEc7QUFBYy9HO0FBQUFrSTtBQUFBO3NFQUNYQyx5SUFBOEI7Ozs7Ozs7Ozs7Ozs7OztBRGQ5Q3ZCOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUE0REZBOzs7O0FBakVNQTs7QUFBQUE7O0FBSytCQTs7QUFBQUE7Ozs7Ozs7OzsiLCJuYW1lcyI6WyJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJXYXRlckxldmVsTWVhc3VyZW1lbnRDb21wb25lbnQiLCJ3YXRlckxldmVsTWVhc3VyZW1lbnQiLCJEdE1lYXN1cmVtZW50VGltZSIsIm1vbWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJzdGFydE9mIiwiaXNTYW1lIiwiZHRPYnNUaW1lIiwibWF4RGF0ZSIsImdldE1heERhdGVGb3JOb3ciLCJBdHRhY2htZW50cyIsIm1pbnV0ZXMiLCJ0b0lTT1N0cmluZyIsIm5vdyIsInNob3dEdE1lYXN1cmVtZW50VGltZUVycm9yIiwic2hvd0Vycm9yIiwic2VsZWN0b3JzIiwiaW5wdXRzIiwibWVhc3VyZW1lbnROdW1iZXIiLCJ3YXRlckxldmVsTWV0aG9kIiwicmVnaXN0cmF0aW9uVGlkIiwicmVnaXN0cmF0aW9uSWQiLCJnZW9IYXphcmQiLCJvdXRwdXRzIiwid2F0ZXJMZXZlbE1lYXN1cmVtZW50Q2hhbmdlIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJjdHgiLCJERUJVR19UQUciLCJCYXNlUGFnZVNlcnZpY2UiLCJyZWdpc3RyYXRpb25TZXJ2aWNlIiwibmV3QXR0YWNobWVudFNlcnZpY2UiLCJjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIiwibmdab25lIiwiYWxlcnRDb250cm9sbGVyIiwidHJhbnNsYXRlU2VydmljZSIsImxvZ2dpbmdTZXJ2aWNlIiwicmVnaXN0cmF0aW9uIiwib25SZXNldCIsImdldCIsInRvUHJvbWlzZSIsImxlYXZlVGV4dCIsImNyZWF0ZVJlc2V0RGlhbG9nIiwibWVzc2FnZSIsInRyYW5zbGF0aW9ucyIsImNyZWF0ZSIsImJ1dHRvbnMiLCJ0ZXh0Iiwicm9sZSIsImFsZXJ0IiwicHJlc2VudCIsIm9uRGlkRGlzbWlzcyIsInJlc3VsdCIsInJlc2V0IiwiWm9uZSIsInJ1biIsInJlcXVlc3QiLCJnZXREZWZhdWx0VmFsdWUiLCJyZXNldEltYWdlcyIsInNhdmVSZWdpc3RyYXRpb25Bc3luYyIsInByb3BOYW1lIiwiZ2V0QXR0YWNobWVudHMiLCJpZCIsInBpcGUiLCJhdHRhY2htZW50cyIsIm1hcCIsImEiLCJyZW1vdmVBdHRhY2htZW50Iiwic3Vic2NyaWJlIiwiZGVidWciLCJlcnJvciIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsImZhY3RvcnkiLCJwcm92aWRlZEluIiwiQmFzZVBhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsInNuYXBzaG90IiwicGFyYW1zIiwiQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsImdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkIiwicmVnIiwiY3JlYXRlRGVmYXVsdFByb3BzIiwiY3JlYXRlSW5pdE9ic2VydmFibGUiLCJuZ0Rlc3Ryb3kkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpc1ZhbGlkIiwidmFsaWQiLCJpc0VtcHR5IiwiY29uZmlybUxlYXZlIiwib25Jbml0Iiwib25CZWZvcmVMZWF2ZSIsInNhdmUiLCJjbGVhbiIsInN5bmNTdGF0dXMiLCJzcmNfYXBwX21vZHVsZXNfY29tbW9uX3JlZ2lzdHJhdGlvbl9yZWdpc3RyYXRpb25fbW9kZWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJSZWdpc3RyYXRpb25TZXJ2aWNlIiwiaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMiLCJjb25maXJtUmVzZXQiLCJwYXRoRnJvbVJvb3QiLCJ2IiwidXJsIiwic2VnbWVudCIsInRvU3RyaW5nIiwiam9pbiIsImZpbHRlciIsInBhdGgiLCJfY29yZV9oZWxwZXJzX29ic2VydmFibGVfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMV9fIiwiZmVhdHVyZXMiLCJyb3V0ZXMiLCJjb21wb25lbnQiLCJfd2F0ZXJfbGV2ZWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiY2FuRGVhY3RpdmF0ZSIsIl9jYW5fZGVhY3RpdmF0ZV9yb3V0ZV9ndWFyZF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiV2F0ZXJMZXZlbFBhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfYW5ndWxhcl9yb3V0ZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsImRlY2xhcmF0aW9ucyIsIl9jb21wb25lbnRzX3dhdGVyX3dhdGVyX2xldmVsX21lYXN1cmVtZW50X3dhdGVyX2xldmVsX21lYXN1cmVtZW50X2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzlfXyIsImN0eF9yMTkiLCJjdHhfcjAiLCJXYXRlckxldmVsUGFnZSIsIldhdGVyTGV2ZWwyIiwiV2F0ZXJMZXZlbE1lYXN1cmVtZW50IiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicHVzaCIsIldhdGVyTGV2ZWxNZXRob2RUSUQiLCJNYXJraW5nUmVmZXJlbmNlVElEIiwiTWVhc3VyZW1lbnRUeXBlVElEIiwiTWVhc3VyaW5nVG9vbERlc2NyaXB0aW9uIiwiQ29tbWVudCIsIml0ZW0iLCJfY29yZV9oZWxwZXJzX2lzX2VtcHR5X2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwid2F0ZXJMZXZlbE1lYXN1cmVtZW50cyIsInRvQXJyYXkiLCJ3bCIsInNvbWUiLCJ4IiwiX2Jhc2VfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwidmlld1F1ZXJ5IiwiX2NvbXBvbmVudHNfd2F0ZXJfd2F0ZXJfbGV2ZWxfbWVhc3VyZW1lbnRfd2F0ZXJfbGV2ZWxfbWVhc3VyZW1lbnRfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3dhdGVyL3dhdGVyLWxldmVsLW1lYXN1cmVtZW50L3dhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvd2F0ZXIvd2F0ZXItbGV2ZWwvd2F0ZXItbGV2ZWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3dhdGVyL3dhdGVyLWxldmVsL3dhdGVyLWxldmVsLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy93YXRlci93YXRlci1sZXZlbC93YXRlci1sZXZlbC5wYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIjxpb24tbGlzdC1oZWFkZXI+XHJcbiAgPGlvbi1sYWJlbD5cclxuICAgIHt7ICh3YXRlckxldmVsTWV0aG9kID09PSAxID8gJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NQVJLSU5HJyA6XHJcbiAgICAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1FQVNVUklORycpIHxcclxuICAgIHRyYW5zbGF0ZSB9fSB7eyBtZWFzdXJlbWVudE51bWJlciB9fVxyXG4gIDwvaW9uLWxhYmVsPlxyXG48L2lvbi1saXN0LWhlYWRlcj5cclxuPGFwcC1udW1lcmljLWlucHV0ICpuZ0lmPVwid2F0ZXJMZXZlbE1ldGhvZCA9PT0gMlwiIFsodmFsdWUpXT1cIndhdGVyTGV2ZWxNZWFzdXJlbWVudC5XYXRlckxldmVsVmFsdWVcIlxyXG4gIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLldBVEVSX0xFVkVMX01FVEVSU1wiIFttaW5dPVwiMFwiIFttYXhdPVwiODg0OFwiIFtkZWNpbWFsUGxhY2VzXT1cIjNcIiBzdWZmaXg9XCJtXCI+XHJcbjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbjxpb24taXRlbSBbbmdDbGFzc109XCJ7J2hhc1dhcm5pbmcnOiBkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZX1cIj5cclxuICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgIHt7ICdSRUdJU1RSQVRJT04uU0VUX1RJTUUuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1kYXRldGltZSAoaW9uQ2hhbmdlKT1cImR0Q2hhbmdlZCgpXCIgY29sb3I9XCJtZWRpdW1cIiBtb250aFNob3J0TmFtZXM9XCJ7eyAnTU9OVEhTLlNIT1JUX0xJU1QnIHwgdHJhbnNsYXRlIH19XCJcclxuICAgIGRvbmVUZXh0PVwie3snRElBTE9HUy5PSycgfCB0cmFuc2xhdGV9fVwiIGNhbmNlbFRleHQ9XCJ7eydESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGV9fVwiXHJcbiAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWSBISDptbVwiIFsobmdNb2RlbCldPVwid2F0ZXJMZXZlbE1lYXN1cmVtZW50LkR0TWVhc3VyZW1lbnRUaW1lXCIgW21heF09XCJtYXhEYXRlXCI+XHJcbiAgPC9pb24tZGF0ZXRpbWU+XHJcbiAgPGlvbi1idXR0b24gY2xhc3M9XCJzZXQtdG8tbm93LWJ1dHRvblwiIHNsb3Q9XCJlbmRcIiBmaWxsPVwib3V0bGluZVwiIGNvbG9yPVwibWVkaXVtXCIgKGNsaWNrKT1cInNldFRvTm93KClcIj5cclxuICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidGltZVwiPjwvaW9uLWljb24+IHt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuTk9XXCIgfCB0cmFuc2xhdGV9fVxyXG4gIDwvaW9uLWJ1dHRvbj5cclxuPC9pb24taXRlbT5cclxuPGlvbi1pdGVtICpuZ0lmPVwiZGF0ZUlzRGlmZmVyZW50VGhhbk9ic1RpbWVcIj5cclxuICA8aW9uLWxhYmVsIGNvbG9yPVwiZGFuZ2VyXCIgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICB7eydBTEVSVC5XQVJOSU5HJyB8IHRyYW5zbGF0ZX19ISB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuREFURV9XQVJOSU5HJyB8IHRyYW5zbGF0ZX19XHJcbiAgPC9pb24tbGFiZWw+XHJcbjwvaW9uLWl0ZW0+XHJcbjxpb24taXRlbSAqbmdJZj1cInNob3dEdE1lYXN1cmVtZW50VGltZUVycm9yXCI+XHJcbiAgPGlvbi1sYWJlbCBjb2xvcj1cImRhbmdlclwiIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAge3snUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkRUX1JFUVVJUkVEX1RFWFQnIHwgdHJhbnNsYXRlfX1cclxuICA8L2lvbi1sYWJlbD5cclxuPC9pb24taXRlbT5cclxuPGFwcC1hZGQtcGljdHVyZS1pdGVtIGljb25Db2xvcj1cInByaW1hcnlcIiBpY29uPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgdGl0bGU9XCJ7eyAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkFERF9QSUNUVVJFJyB8IHRyYW5zbGF0ZSB9fSB7eyAod2F0ZXJMZXZlbE1ldGhvZCA9PT0gMSA/ICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuTUFSS0lOR19QTFVSQUwnIDpcclxuJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NRUFTVVJFX1BMVVJBTCcpIHwgdHJhbnNsYXRlIHwgbG93ZXJjYXNlIH19XCJcclxuICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCJcclxuICAgIFtnZW9IYXphcmRdPVwiZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbklkXCIgXHJcbiAgICBbcmVmXT1cIndhdGVyTGV2ZWxNZWFzdXJlbWVudC5XYXRlckxldmVsTWVhc3VyZW1lbnRJZFwiXHJcbiAgICBbYXR0YWNobWVudFR5cGVdPVwiJ1dhdGVyTGV2ZWxNZWFzdXJlbWVudEF0dGFjaG1lbnQnXCI+XHJcbjwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbjxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cIndhdGVyTGV2ZWxNZWFzdXJlbWVudC5Db21tZW50XCIgcGxhY2Vob2xkZXI9XCJ7eydSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuREVTQ1JJQkUnIHwgdHJhbnNsYXRlIH19IHt7ICh3YXRlckxldmVsTWV0aG9kID09PSAxID8gJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5NQVJLSU5HX1BMVVJBTCcgOlxyXG4nUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1FQVNVUkVfUExVUkFMJykgfCB0cmFuc2xhdGUgfCBsb3dlcmNhc2UgfX1cIj48L2FwcC10ZXh0LWNvbW1lbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBXYXRlckxldmVsTWVhc3VyZW1lbnRFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCwgaXNFbXB0eSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXdhdGVyLWxldmVsLW1lYXN1cmVtZW50JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vd2F0ZXItbGV2ZWwtbWVhc3VyZW1lbnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3dhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhdGVyTGV2ZWxNZWFzdXJlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbWVhc3VyZW1lbnROdW1iZXI6IG51bWJlcjtcclxuICBASW5wdXQoKSB3YXRlckxldmVsTWV0aG9kOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uSWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBnZW9IYXphcmQ6IEdlb0hhemFyZDtcclxuICBASW5wdXQoKSBkdE9ic1RpbWU6IHN0cmluZztcclxuICBASW5wdXQoKSB3YXRlckxldmVsTWVhc3VyZW1lbnQ6IFdhdGVyTGV2ZWxNZWFzdXJlbWVudEVkaXRNb2RlbDtcclxuICBAT3V0cHV0KCkgd2F0ZXJMZXZlbE1lYXN1cmVtZW50Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIG1heERhdGU6IHN0cmluZztcclxuICBzaG93RHRNZWFzdXJlbWVudFRpbWVFcnJvciA9IGZhbHNlO1xyXG5cclxuICBnZXQgZGF0ZUlzRGlmZmVyZW50VGhhbk9ic1RpbWUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudC5EdE1lYXN1cmVtZW50VGltZSAmJlxyXG4gICAgICAhbW9tZW50KHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50LkR0TWVhc3VyZW1lbnRUaW1lKVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKVxyXG4gICAgICAgIC5pc1NhbWUobW9tZW50KHRoaXMuZHRPYnNUaW1lKS5zdGFydE9mKCdkYXknKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNWYWxpZCgpIHtcclxuICAgIGlmIChpc0VtcHR5KHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50KSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudC5EdE1lYXN1cmVtZW50VGltZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICAgIGlmICghdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQuQXR0YWNobWVudHMpIHtcclxuICAgICAgdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQuQXR0YWNobWVudHMgPSBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldE1heERhdGVGb3JOb3coKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHNldHRpbmcgbWF4IGRhdGUgdGhhdCB3aGVuIGNoYW5naW5nIGhvdXIsIHRoZSBtaW51dGVzIGlzIHN0aWxsIG1heCBtaW51dGVzLlxyXG4gICAgLy8gV29ya2Fyb3VuZCBpcyB0byBzZXQgbWludXRlcyB0byA1OS5cclxuICAgIHJldHVybiBtb21lbnQoKS5taW51dGVzKDU5KS50b0lTT1N0cmluZyh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNldFRvTm93KCkge1xyXG4gICAgY29uc3Qgbm93ID0gbW9tZW50KCkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICAgIHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50LkR0TWVhc3VyZW1lbnRUaW1lID0gbm93O1xyXG4gIH1cclxuXHJcbiAgc2hvd0Vycm9yKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhaXNFbXB0eSh0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudCkgJiZcclxuICAgICAgIXRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50LkR0TWVhc3VyZW1lbnRUaW1lXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zaG93RHRNZWFzdXJlbWVudFRpbWVFcnJvciA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dEdE1lYXN1cmVtZW50VGltZUVycm9yID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkdENoYW5nZWQoKSB7XHJcbiAgICB0aGlzLnNob3dFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gdHJpZ2dlckNoYW5nZSgpIHtcclxuICAvLyAgIHRoaXMud2F0ZXJMZXZlbE1lYXN1cmVtZW50Q2hhbmdlLmVtaXQodGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnQpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbFBhZ2UgfSBmcm9tICcuL3dhdGVyLWxldmVsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgV2F0ZXJMZXZlbE1lYXN1cmVtZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy93YXRlci93YXRlci1sZXZlbC1tZWFzdXJlbWVudC93YXRlci1sZXZlbC1tZWFzdXJlbWVudC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDYW5EZWFjdGl2YXRlUm91dGVHdWFyZCB9IGZyb20gJy4uLy4uL2Nhbi1kZWFjdGl2YXRlLXJvdXRlLmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBXYXRlckxldmVsUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbV2F0ZXJMZXZlbFBhZ2UsIFdhdGVyTGV2ZWxNZWFzdXJlbWVudENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhdGVyTGV2ZWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyXCJcclxuICAgIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkRFU0NSSUJFX1NJVFVBVElPTlwiXHJcbiAgICAgICAga2R2S2V5PVwiV2F0ZXJfV2F0ZXJMZXZlbFN0YXRlS0RWXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbFN0YXRlVElEXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkNBTl9ZT1VfU0VFX1dBVEVSXCIga2R2S2V5PVwiV2F0ZXJfV2F0ZXJBc3RyYXlLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyQXN0cmF5VElEXCI+PC9hcHAta2R2LXJhZGlvYnV0dG9uLWxpc3Q+XHJcbiAgICAgIDxhcHAta2R2LXJhZGlvYnV0dG9uLWxpc3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuT0JTRVJWQVRJT05fVElNSU5HXCJcclxuICAgICAgICBrZHZLZXk9XCJXYXRlcl9PYnNlcnZhdGlvblRpbWluZ0tEVlwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk9ic2VydmF0aW9uVGltaW5nVElEXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLlJFR0lTVFJBVElPTl9NRVRIT0RcIlxyXG4gICAgICAgIGtkdktleT1cIldhdGVyX1dhdGVyTGV2ZWxNZXRob2RLRFZcIiBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0ICpuZ0lmPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1ldGhvZFRJRCA9PT0gMVwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuTUFSS0lOR19SRUZFUkVOQ0VcIiBrZHZLZXk9XCJXYXRlcl9NYXJraW5nUmVmZXJlbmNlS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NYXJraW5nUmVmZXJlbmNlVElEXCI+XHJcbiAgICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuQ29tbWVudFwiXHJcbiAgICAgICAgICB0aXRsZT1cInt7ICdSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuREVTQ1JJQkUnIHwgdHJhbnNsYXRlIHwgdXBwZXJjYXNlICB9fSB7eyAnUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1BUktJTkdfUExVUkFMJyB8IHRyYW5zbGF0ZSB8IHVwcGVyY2FzZSAgfX1cIj5cclxuICAgICAgICA8L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDwvYXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0PlxyXG4gICAgICA8YXBwLWtkdi1yYWRpb2J1dHRvbi1saXN0ICpuZ0lmPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1ldGhvZFRJRCA9PT0gMVwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuTUFSS0VEX1dJVEhcIiBrZHZLZXk9XCJXYXRlcl9NYXJraW5nVHlwZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWFya2luZ1R5cGVUSURcIj48L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCAqbmdJZj1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSUQgPT09IDJcIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkhPV19ET19ZT1VfUkVBRFwiIGtkdktleT1cIldhdGVyX01lYXN1cmVtZW50VHlwZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWVhc3VyZW1lbnRUeXBlVElEXCI+XHJcbiAgICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NZWFzdXJlbWVudFR5cGVUSUQgPT09IDNcIlxyXG4gICAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWVhc3VyaW5nVG9vbERlc2NyaXB0aW9uXCJcclxuICAgICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLk1FQVNVUklOR19UT09MXCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8L2FwcC1rZHYtcmFkaW9idXR0b24tbGlzdD5cclxuICAgICAgPGFwcC1rZHYtcmFkaW9idXR0b24tbGlzdCAqbmdJZj1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmVtZW50VHlwZVRJRCA9PT0gMVwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuUkVMQVRJVkVcIiBrZHZLZXk9XCJXYXRlcl9NZWFzdXJlbWVudFJlZmVyZW5jZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuTWVhc3VyZW1lbnRSZWZlcmVuY2VUSURcIj5cclxuICAgICAgICA8YXBwLXRleHQtY29tbWVudCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5Db21tZW50XCJcclxuICAgICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLldBVEVSLldBVEVSX0xFVkVMLkRFU0NSSUJFX0hFSUdIVFwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPC9hcHAta2R2LXJhZGlvYnV0dG9uLWxpc3Q+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSURcIj5cclxuICAgICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICAgIDxhcHAtd2F0ZXItbGV2ZWwtbWVhc3VyZW1lbnQgW21lYXN1cmVtZW50TnVtYmVyXT1cImkrMVwiXHJcbiAgICAgICAgICBbd2F0ZXJMZXZlbE1ldGhvZF09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEXCJcclxuICAgICAgICAgIFsod2F0ZXJMZXZlbE1lYXN1cmVtZW50KV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnRbaV1cIlxyXG4gICAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbZHRPYnNUaW1lXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZVwiXHJcbiAgICAgICAgICBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCIgW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCJcclxuICAgICAgICAgICh3YXRlckxldmVsTWVhc3VyZW1lbnRDaGFuZ2UpPVwic2F2ZSgpXCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBtZWFzdXJlbWVudCBvZiByZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnQ7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICA8L2FwcC13YXRlci1sZXZlbC1tZWFzdXJlbWVudD5cclxuICAgICAgPC9pb24tbGlzdD5cclxuICAgICAgPGlvbi1saXN0IGNsYXNzPVwiaW9uLW1hcmdpbi10b3BcIiBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cImFkZFdhdGVyTGV2ZWxNZWFzdXJlbWVudCgpXCI+XHJcbiAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGVcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uV0FURVIuV0FURVJfTEVWRUwuQUREX05FVycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgICB7eyhyZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWV0aG9kVElEID09PSAxID9cclxuICAgICAgICAgICAgJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5XQVRFUl9NQVJLSU5HJzpcclxuICAgICAgICAgICAgJ1JFR0lTVFJBVElPTi5XQVRFUi5XQVRFUl9MRVZFTC5XQVRFUl9NRUFTVVJFTUVOVCcpIHwgdHJhbnNsYXRlIHwgbG93ZXJjYXNlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPC9pb24tbGlzdD5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBRdWVyeUxpc3QsIFZpZXdDaGlsZHJlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBXYXRlckxldmVsTWVhc3VyZW1lbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3dhdGVyL3dhdGVyLWxldmVsLW1lYXN1cmVtZW50L3dhdGVyLWxldmVsLW1lYXN1cmVtZW50LmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC13YXRlci1sZXZlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3dhdGVyLWxldmVsLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vd2F0ZXItbGV2ZWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFdhdGVyTGV2ZWxQYWdlIGV4dGVuZHMgQmFzZVBhZ2Uge1xyXG4gIEBWaWV3Q2hpbGRyZW4oV2F0ZXJMZXZlbE1lYXN1cmVtZW50Q29tcG9uZW50KVxyXG4gIHByaXZhdGUgd2F0ZXJMZXZlbE1lYXN1cmVtZW50czogUXVlcnlMaXN0PFdhdGVyTGV2ZWxNZWFzdXJlbWVudENvbXBvbmVudD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5XYXRlckxldmVsMiwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudCB8fFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudC5sZW5ndGggPT09IDBcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZWFzdXJlbWVudCA9IFtcclxuICAgICAgICB7IER0TWVhc3VyZW1lbnRUaW1lOiB1bmRlZmluZWQgfVxyXG4gICAgICBdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25SZXNldCgpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50ID0gW1xyXG4gICAgICB7IER0TWVhc3VyZW1lbnRUaW1lOiB1bmRlZmluZWQgfVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGFkZFdhdGVyTGV2ZWxNZWFzdXJlbWVudCgpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50LnB1c2goe1xyXG4gICAgICBEdE1lYXN1cmVtZW50VGltZTogdW5kZWZpbmVkXHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIC8vIENsZWFudXBcclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSUQgPT09IDIpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5NYXJraW5nUmVmZXJlbmNlVElEID0gbnVsbDtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmVtZW50VHlwZVRJRCAhPT0gMykge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmluZ1Rvb2xEZXNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgIShcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLldhdGVyTGV2ZWxNZXRob2RUSUQgPT09IDEgfHxcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LldhdGVyTGV2ZWwyLk1lYXN1cmVtZW50VHlwZVRJRCA9PT0gMVxyXG4gICAgICApXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5Db21tZW50ID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5XYXRlckxldmVsMi5XYXRlckxldmVsTWVhc3VyZW1lbnQgPSAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuV2F0ZXJMZXZlbDIuV2F0ZXJMZXZlbE1lYXN1cmVtZW50IHx8IFtdXHJcbiAgICApLmZpbHRlcigoaXRlbSkgPT4gIUlzRW1wdHlIZWxwZXIuaXNFbXB0eShpdGVtKSk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkKCkge1xyXG4gICAgZm9yIChjb25zdCB3bCBvZiB0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudHMudG9BcnJheSgpKSB7XHJcbiAgICAgIHdsLnNob3dFcnJvcigpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy53YXRlckxldmVsTWVhc3VyZW1lbnRzICYmXHJcbiAgICAgICF0aGlzLndhdGVyTGV2ZWxNZWFzdXJlbWVudHMuc29tZSgoeCkgPT4gIXguaXNWYWxpZClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==