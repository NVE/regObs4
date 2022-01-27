(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_start-wizard_start-wizard_module_ts"], {
    /***/
    2762: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "scaleUpCubicBezier": function scaleUpCubicBezier() {
          return (
            /* binding */
            _scaleUpCubicBezier
          );
        },

        /* harmony export */
        "defaultDuration": function defaultDuration() {
          return (
            /* binding */
            _defaultDuration
          );
        },

        /* harmony export */
        "scaleUpHeaderFrom": function scaleUpHeaderFrom() {
          return (
            /* binding */
            _scaleUpHeaderFrom
          );
        },

        /* harmony export */
        "keyFramesScaleUp": function keyFramesScaleUp() {
          return (
            /* binding */
            _keyFramesScaleUp
          );
        },

        /* harmony export */
        "keyFramesPulse": function keyFramesPulse() {
          return (
            /* binding */
            _keyFramesPulse
          );
        },

        /* harmony export */
        "keyFramesScaleUpHeader": function keyFramesScaleUpHeader() {
          return (
            /* binding */
            _keyFramesScaleUpHeader
          );
        },

        /* harmony export */
        "getScaleUpAnimation": function getScaleUpAnimation() {
          return (
            /* binding */
            _getScaleUpAnimation
          );
        },

        /* harmony export */
        "getFadeInAnimation": function getFadeInAnimation() {
          return (
            /* binding */
            _getFadeInAnimation
          );
        },

        /* harmony export */
        "getHeaderAnimation": function getHeaderAnimation() {
          return (
            /* binding */
            _getHeaderAnimation
          );
        },

        /* harmony export */
        "animations": function animations() {
          return (
            /* binding */
            _animations
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/animations */
      97175);

      var _scaleUpCubicBezier = 'cubic-bezier(0.64, 0.1, 0.57, 1.53)';
      var _defaultDuration = '700ms';
      var _scaleUpHeaderFrom = 'scale3d(0.9, 0.9, 1)';

      var _keyFramesScaleUp = (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(0, 0, 1)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1, 1, 1)',
        offset: 1
      })]);

      var _keyFramesPulse = (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1, 1, 1)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1.2, 1.2, 1.2)',
        offset: 0.5
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1, 1, 1)',
        offset: 1.0
      })]);

      var _keyFramesScaleUpHeader = (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: _scaleUpHeaderFrom,
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1, 1, 1)',
        offset: 1
      })]);

      function _getScaleUpAnimation(delay) {
        return [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          transform: 'scale3d(0, 0, 1)'
        })), // http://cubic-bezier.com/#.64,.1,.57,1.53
        (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_1', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("".concat(_defaultDuration, " ").concat(delay, "ms ").concat(_scaleUpCubicBezier), _keyFramesScaleUp)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_1', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          transform: 'scale3d(1, 1, 1)'
        }))];
      }

      function _getFadeInAnimation(page, delay) {
        return [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 0
        })), // http://cubic-bezier.com/#.64,.1,.57,1.53
        (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)("* => page_".concat(page), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("500ms ".concat(delay, "ms ease-out"), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 0,
          offset: 0
        }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 1,
          offset: 1
        })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)("page_".concat(page, " => *"), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 1,
          offset: 0
        }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 0,
          offset: 1
        })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)("page_".concat(page), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          opacity: 1
        }))];
      }

      function _getHeaderAnimation(page) {
        return [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          transform: _scaleUpHeaderFrom
        })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)("* => page_".concat(page), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("500ms 200ms ".concat(_scaleUpCubicBezier), _keyFramesScaleUpHeader)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)("page_".concat(page), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
          transform: 'scale3d(1, 1, 1)'
        }))];
      }

      var _animations = [// Generic animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('pulse', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'scale3d(1, 1, 1)'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => *', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("".concat(_defaultDuration, " 500ms ease-out"), _keyFramesPulse))]), // Page 0 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation', _getHeaderAnimation(0)), // Page 1 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation1', _getHeaderAnimation(1)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpIce', _getScaleUpAnimation(500)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpWater', _getScaleUpAnimation(700)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpWarning', _getScaleUpAnimation(820)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpSnow', _getScaleUpAnimation(1000)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('scaleUpDirt', _getScaleUpAnimation(650)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('bouncePath', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_0 => page_1', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(65px)',
        offset: 0.5
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)',
        offset: 1.0
      })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_2 => page_1', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(-65px)',
        offset: 0.5
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)',
        offset: 1.0
      })])))]), // Page 2 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation2', _getHeaderAnimation(2)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('slideInFromRight', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(200px)'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_2', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('1200ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(200px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)',
        offset: 1.0
      })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_2', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateX(0)'
      }))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('nudgeExclamation', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_2', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('500ms 700ms ease-out', _keyFramesPulse))]), // Page 3 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation3', _getHeaderAnimation(3)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownRight', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(-30px, -20px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(0px, 0px)',
        offset: 1
      })])))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownRightLess', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(-10px, -20px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(0px, 0px)',
        offset: 1
      })])))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveDownLeft', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(10px, -20px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(0px, 0px)',
        offset: 1
      })])))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveLeftAndABitDown', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(20px, -10px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(0px, 0px)',
        offset: 1
      })])))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveUpAndABitLeft', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)('700ms ease-out', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(6px, 25px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translate(0px, 0px)',
        offset: 1
      })])))]), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('moveUp', [(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('*', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(20px)'
      })), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('* => page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("700ms ".concat(_scaleUpCubicBezier), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(20px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(0px)',
        offset: 1
      })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.transition)('page_3 => *', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.animate)("700ms ".concat(_scaleUpCubicBezier), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.keyframes)([(0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(0px)',
        offset: 0
      }), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(20px)',
        offset: 1
      })]))), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.state)('page_3', (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.style)({
        transform: 'translateY(0px)'
      }))]), // Page 4 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation4', _getHeaderAnimation(4)), // Page 5 animations
      (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('headerAnimation5', _getHeaderAnimation(5)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText1', _getFadeInAnimation(5, 1000)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText2', _getFadeInAnimation(5, 2000)), (0, _angular_animations__WEBPACK_IMPORTED_MODULE_0__.trigger)('legalText3', _getFadeInAnimation(5, 3000))];
      /***/
    },

    /***/
    11624: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StartWizardPageModule": function StartWizardPageModule() {
          return (
            /* binding */
            _StartWizardPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _start_wizard_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./start-wizard.page */
      35930);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _start_wizard_page__WEBPACK_IMPORTED_MODULE_0__.StartWizardPage
      }];

      var _StartWizardPageModule = function _StartWizardPageModule() {
        _classCallCheck(this, _StartWizardPageModule);
      };

      _StartWizardPageModule.ɵfac = function StartWizardPageModule_Factory(t) {
        return new (t || _StartWizardPageModule)();
      };

      _StartWizardPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _StartWizardPageModule
      });
      _StartWizardPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_StartWizardPageModule, {
          declarations: [_start_wizard_page__WEBPACK_IMPORTED_MODULE_0__.StartWizardPage],
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
        });
      })();
      /***/

    },

    /***/
    35930: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StartWizardPage": function StartWizardPage() {
          return (
            /* binding */
            _StartWizardPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _start_wizard_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./start-wizard.animations */
      2762);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs */
      24390);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      48657);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      26548);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../settings */
      30015);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function StartWizardPage_span_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " / Language");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function StartWizardPage_span_21_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " / Choose language");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }
      }

      function StartWizardPage_ion_select_option_24_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-select-option", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var lang_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", lang_r3.langKey);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", lang_r3.name, " ");
        }
      }

      var _c0 = function _c0() {
        return {
          autoplay: false
        };
      };

      var _c1 = function _c1(a0) {
        return {
          "dark": a0
        };
      };

      var _c2 = function _c2(a0) {
        return {
          "hide": a0
        };
      };

      var _StartWizardPage = /*#__PURE__*/function () {
        function _StartWizardPage(userSettingService, navController) {
          _classCallCheck(this, _StartWizardPage);

          this.userSettingService = userSettingService;
          this.navController = navController;
          this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.GeoHazard;
          this.LangKey = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.LangKey;
          this.reachedEnd = false;
          this.showLegalIcon = false;
          this.visibleStarNumber = -1;
          this.supportedLanguages = _settings__WEBPACK_IMPORTED_MODULE_2__.settings.language.supportedLanguages.map(function (lang) {
            return Object.assign(Object.assign({}, lang), {
              langKey: _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_4__.LangKey[lang.lang]
            });
          });
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
          this.activeIndex = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
          this.isIncreasing = true;
        }

        _createClass(_StartWizardPage, [{
          key: "ionViewWillEnter",
          value: function ionViewWillEnter() {
            var _this = this;

            this.state = 'x';
            this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).subscribe(function (us) {
              _this.language = us.language;

              _this.initStarIndexCounter();

              _this.setPageIndex(0);
            });
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "saveLanguage",
          value: function saveLanguage() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var userSettings;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 2:
                      userSettings = _context.sent;
                      this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, userSettings), {
                        language: this.language
                      }));

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "setPageIndex",
          value: function setPageIndex(index) {
            var _this2 = this;

            setTimeout(function () {
              _this2.resetVisibleStars();

              _this2.state = "page_".concat(index);

              _this2.activeIndex.next(index);
            }, 0);
          }
        }, {
          key: "resetVisibleStars",
          value: function resetVisibleStars() {
            this.visibleStarNumber = -1;
            this.isIncreasing = true;
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "slideNext",
          value: function slideNext() {
            var _this3 = this;

            (0, rxjs__WEBPACK_IMPORTED_MODULE_8__.timer)(700).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.ngDestroy$)).subscribe(function () {
              if (_this3.slides) {
                _this3.slides.slideNext();
              }
            });
          }
        }, {
          key: "start",
          value: function start() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var userSettings;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!this.reachedEnd) {
                        _context2.next = 8;
                        break;
                      }

                      _context2.next = 3;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.take)(1)).toPromise();

                    case 3:
                      userSettings = _context2.sent;
                      this.userSettingService.saveUserSettings(Object.assign(Object.assign({}, userSettings), {
                        completedStartWizard: true
                      }));
                      this.navController.navigateRoot('/');
                      _context2.next = 9;
                      break;

                    case 8:
                      this.slides.slideTo(5, 200);

                    case 9:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "ionSlideTransitionStart",
          value: function ionSlideTransitionStart() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var index;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.slides.getActiveIndex();

                    case 2:
                      index = _context3.sent;
                      this.setPageIndex(index);

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "ionSlideReachEnd",
          value: function ionSlideReachEnd() {
            var _this4 = this;

            this.reachedEnd = true;
            setTimeout(function () {
              _this4.showLegalIcon = true; // Crazy ios bug to get animation on spinner.. :o
            }, 0);
          }
        }, {
          key: "ionSlidePrevStart",
          value: function ionSlidePrevStart() {
            this.reachedEnd = false;
          }
        }, {
          key: "initStarIndexCounter",
          value: function initStarIndexCounter() {
            var _this5 = this;

            this.activeIndex.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(function (index) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_11__.interval)(700).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.skipWhile)(function () {
                return index !== 4;
              }));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.ngDestroy$)).subscribe(function () {
              if (_this5.isIncreasing && _this5.visibleStarNumber >= 6) {
                // Count to 6 to add an extra pause on the end
                _this5.isIncreasing = false;
              }

              if (!_this5.isIncreasing && _this5.visibleStarNumber < 0) {
                // Count to -1 to add an extra pause on the start
                _this5.isIncreasing = true;
              }

              if (_this5.isIncreasing) {
                _this5.visibleStarNumber++;
              } else {
                _this5.visibleStarNumber--;
              }
            });
          }
        }]);

        return _StartWizardPage;
      }();

      _StartWizardPage.ɵfac = function StartWizardPage_Factory(t) {
        return new (t || _StartWizardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_0__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.NavController));
      };

      _StartWizardPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _StartWizardPage,
        selectors: [["app-start-wizard"]],
        viewQuery: function StartWizardPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlides, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.slides = _t.first);
          }
        },
        decls: 141,
        vars: 96,
        consts: [["pager", "true", 1, "onboarding", 3, "options", "ionSlideReachEnd", "ionSlidePrevStart", "ionSlideTransitionStart"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-align-self-center"], [1, "animated-element-wrapper"], ["src", "/assets/images/onboarding/eclipse.svg", 1, "animated-element", "eclipse"], ["src", "/assets/images/onboarding/bubble.svg", 1, "animated-element", "bubble"], [4, "ngIf"], [1, "language-list"], [1, "ion-no-padding"], ["position", "stacked", "color", "medium"], ["interface", "action-sheet", 3, "cancelText", "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["src", "/assets/images/onboarding/line.svg", 1, "animated-element", "line"], ["src", "/assets/images/onboarding/warning.svg", 1, "animated-element", "warning"], ["src", "/assets/icon/map/pin-ice.svg", 1, "animated-element", "pin-ice"], ["src", "/assets/icon/map/pin-dirt.svg", 1, "animated-element", "pin-dirt"], ["src", "/assets/icon/map/pin-snow.svg", 1, "animated-element", "pin-snow"], ["src", "/assets/icon/map/pin-water.svg", 1, "animated-element", "pin-water"], [1, "ion-text-wrap"], ["src", "/assets/images/onboarding/steepness-background.svg", 1, "animated-element", "steepness-background"], ["src", "/assets/images/onboarding/danger-map.svg", 1, "animated-element", "danger-map"], ["src", "/assets/images/onboarding/user-location.svg", 1, "animated-element", "user-location"], ["src", "/assets/images/onboarding/exclamation-mark.svg", 1, "animated-element", "exclamation-mark"], ["src", "/assets/images/onboarding/add-observation.svg", 1, "animated-element", "add-observation"], ["src", "/assets/images/onboarding/photos.svg", 1, "animated-element", "photos"], ["src", "/assets/images/onboarding/pin.svg", 1, "animated-element", "pin"], ["src", "/assets/images/onboarding/ruler.svg", 1, "animated-element", "ruler"], ["src", "/assets/images/onboarding/document.svg", 1, "animated-element", "document"], ["src", "/assets/images/onboarding/path.svg", 1, "animated-element", "path"], ["src", "/assets/images/onboarding/eye.svg", 1, "animated-element", "eye"], ["name", "star", 1, "animated-element", "star", "star1", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star2", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star3", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star4", 3, "ngClass"], ["name", "star", 1, "animated-element", "star", "star5", 3, "ngClass"], ["src", "/assets/images/onboarding/competence-finger.svg", 1, "animated-element", "competence-finger", "float"], [1, "full-grid", "legal-grid"], [1, "legal-info-row"], [1, "ion-padding", "ion-align-self-bottom"], [1, "legal-icon", 3, "ngClass"], [1, "legal-text-row"], ["align-self-top", ""], [1, "ion-no-padding", "ion-text-wrap"], ["color", "varsom-blue"], ["expand", "full", "fill", "clear", 1, "ion-no-margin", "ion-no-padding", 3, "click"], [3, "value"]],
        template: function StartWizardPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-slides", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ionSlideReachEnd", function StartWizardPage_Template_ion_slides_ionSlideReachEnd_1_listener() {
              return ctx.ionSlideReachEnd();
            })("ionSlidePrevStart", function StartWizardPage_Template_ion_slides_ionSlidePrevStart_1_listener() {
              return ctx.ionSlidePrevStart();
            })("ionSlideTransitionStart", function StartWizardPage_Template_ion_slides_ionSlideTransitionStart_1_listener() {
              return ctx.ionSlideTransitionStart();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "svg-icon", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "svg-icon", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](14, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](15, StartWizardPage_span_15_Template, 2, 0, "span", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "ion-list", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "ion-item", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "ion-label", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](20, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, StartWizardPage_span_21_Template, 2, 0, "span", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "ion-select", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngModelChange", function StartWizardPage_Template_ion_select_ngModelChange_22_listener($event) {
              return ctx.language = $event;
            })("ngModelChange", function StartWizardPage_Template_ion_select_ngModelChange_22_listener() {
              return ctx.saveLanguage();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](23, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, StartWizardPage_ion_select_option_24_Template, 2, 2, "ion-select-option", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](30, "svg-icon", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "svg-icon", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](34, "svg-icon", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](36, "svg-icon", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "svg-icon", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](40, "svg-icon", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](43, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](44);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](45, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "h3", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](48, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](54, "svg-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](56, "svg-icon", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](58, "svg-icon", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](60, "svg-icon", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](65, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "h3", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](67);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](68, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](74, "svg-icon", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](76, "svg-icon", 25);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](78, "svg-icon", 26);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](80, "svg-icon", 27);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](82, "svg-icon", 28);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](84, "svg-icon", 29);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](86, "svg-icon", 30);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](88, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](90);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](91, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](92, "h3", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](93);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](94, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](96, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](98, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](99, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](100, "ion-icon", 31);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](101, "ion-icon", 32);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](102, "ion-icon", 33);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](103, "ion-icon", 34);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](104, "ion-icon", 35);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](105, "svg-icon", 36);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](106, "ion-row", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](107, "ion-col", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](110, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](111, "h3", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](112);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](113, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "ion-slide");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](115, "ion-grid", 37);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "ion-row", 38);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](117, "ion-col", 39);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "div", 40);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](119, "\xA7 ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](120, "ion-row", 41);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](121, "ion-col", 42);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](123);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](124, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "h3", 43);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](126, "ul");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](127, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](128);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](129, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](131);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](132, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](133, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](134);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](135, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "ion-footer");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](137, "ion-toolbar", 44);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](138, "ion-button", 45);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StartWizardPage_Template_ion_button_click_138_listener() {
              return ctx.start();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](140, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("options", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](83, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@pulse", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](14, 51, "SETTINGS.LANGUAGE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.language !== ctx.LangKey.en);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](20, 53, "START_WIZARD.CHOOSE_LANGUAGE.HEADER"), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.language !== ctx.LangKey.en);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](23, 55, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngModel", ctx.language);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.supportedLanguages);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpWarning", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpIce", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpDirt", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpSnow", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@scaleUpWater", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation1", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](45, 57, "START_WIZARD.PAGE_1.HEADER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](48, 59, "START_WIZARD.PAGE_1.LINE_1"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@slideInFromRight", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@nudgeExclamation", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation2", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](65, 61, "START_WIZARD.PAGE_2.HEADER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](68, 63, "START_WIZARD.PAGE_2.LINE_1"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@pulse", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRight", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRightLess", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownRight", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownLeft", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveDownLeft", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@moveLeftAndABitDown", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation3", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](91, 65, "START_WIZARD.PAGE_3.HEADER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](94, 67, "START_WIZARD.PAGE_3.LINE_1"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](84, _c1, ctx.visibleStarNumber >= 1));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](86, _c1, ctx.visibleStarNumber >= 2));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](88, _c1, ctx.visibleStarNumber >= 3));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](90, _c1, ctx.visibleStarNumber >= 4));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](92, _c1, ctx.visibleStarNumber >= 5));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation4", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](110, 69, "START_WIZARD.COMPETENCE_PAGE.HEADER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](113, 71, "START_WIZARD.COMPETENCE_PAGE.LINE_1"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](94, _c2, !ctx.showLegalIcon));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@headerAnimation5", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](124, 73, "LEGAL_TERMS.HEADER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText1", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](129, 75, "LEGAL_TERMS.LINE_1"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText2", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](132, 77, "LEGAL_TERMS.LINE_2"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@legalText3", ctx.state);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](135, 79, "LEGAL_TERMS.LINE_3"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](140, 81, ctx.reachedEnd ? "START_WIZARD.I_UNDERSTAND" : "START_WIZARD.SKIP_START"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlides, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSlide, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_14__.SvgIconComponent, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonSelectOption],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe],
        styles: ["ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  color: #fff;\n  text-transform: none;\n  text-transform: initial;\n  height: 56px;\n}\n\nion-list[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.language-list[_ngcontent-%COMP%] {\n  max-width: 250px;\n}\n\n.language-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --inner-padding-end: 0px;\n}\n\n@-webkit-keyframes usermarker-pulsate {\n  from {\n    width: 40px;\n    height: 40px;\n    opacity: 0.5;\n  }\n  to {\n    width: 80px;\n    height: 80px;\n    transform: translate3d(-19px, -19px, 0px);\n    opacity: 0;\n  }\n}\n\n@keyframes usermarker-pulsate {\n  from {\n    width: 40px;\n    height: 40px;\n    opacity: 0.5;\n  }\n  to {\n    width: 80px;\n    height: 80px;\n    transform: translate3d(-19px, -19px, 0px);\n    opacity: 0;\n  }\n}\n\n@-webkit-keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n\n@keyframes rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(-360deg);\n  }\n}\n\n@-webkit-keyframes float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n@keyframes float {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(-10px);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\n\n.float[_ngcontent-%COMP%] {\n  -webkit-animation: float 2s ease-in-out infinite;\n          animation: float 2s ease-in-out infinite;\n}\n\nion-content[_ngcontent-%COMP%] {\n  --ion-background-color: #fff;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .full-grid[_ngcontent-%COMP%] {\n  padding-left: 6vw;\n  padding-right: 6vw;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-grid[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-bottom: 12vh;\n  height: auto;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-info-row[_ngcontent-%COMP%] {\n  height: 20vh;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  padding-left: 18px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  text-align: left;\n  padding-bottom: 5px;\n  font-size: 4vw;\n}\n\n@media screen and (min-width: 768px) {\n  ion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-text-row[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   ion-slide[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin-top: 0px;\n  font-size: 24px;\n  font-weight: bold;\n  --ion-text-color-heading: var(--ion-text-color-heading-white-pages);\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .dark-color[_ngcontent-%COMP%] {\n  color: var(--ion-text-color);\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  --inner-border-width: 0 0 0 0;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  border-radius: 50%;\n  color: #fff;\n  background-color: var(--ion-color-varsom-blue-tint);\n  width: 70px;\n  height: 70px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon.hide[_ngcontent-%COMP%] {\n  display: none;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .legal-icon[_ngcontent-%COMP%]:before {\n  content: \"\";\n  width: 120px;\n  height: 120px;\n  background-image: url(\"/assets/images/onboarding/legal-spinner.png\");\n  -webkit-animation: rotate 3s linear infinite;\n          animation: rotate 3s linear infinite;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  opacity: 0.5;\n  display: block;\n  position: absolute;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  top: 50%;\n  left: 50%;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.eclipse[_ngcontent-%COMP%] {\n  left: -41px;\n  top: -85px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.bubble[_ngcontent-%COMP%] {\n  left: -100px;\n  top: 30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.line[_ngcontent-%COMP%] {\n  left: -182px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.warning[_ngcontent-%COMP%] {\n  left: 50px;\n  top: 40px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-ice[_ngcontent-%COMP%] {\n  top: 111px;\n  left: -26px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-dirt[_ngcontent-%COMP%] {\n  top: -80px;\n  left: 84px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-snow[_ngcontent-%COMP%] {\n  top: -58px;\n  left: -44px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin-water[_ngcontent-%COMP%] {\n  left: -133px;\n  top: 26px;\n  transform-origin: bottom;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.steepness-background[_ngcontent-%COMP%] {\n  top: -190px;\n  left: -188px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.danger-map[_ngcontent-%COMP%] {\n  left: -190px;\n  top: -136px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.user-location[_ngcontent-%COMP%] {\n  left: 42px;\n  top: 81px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.user-location[_ngcontent-%COMP%]:before {\n  content: \"\";\n  display: block;\n  -webkit-animation: usermarker-pulsate 1.5s ease-in-out infinite;\n          animation: usermarker-pulsate 1.5s ease-in-out infinite;\n  border: 5px solid #6996a3;\n  background-color: #fff;\n  border-radius: 50%;\n  height: 40px;\n  width: 40px;\n  position: absolute;\n  z-index: -1;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.exclamation-mark[_ngcontent-%COMP%] {\n  left: -72px;\n  top: -34px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.add-observation[_ngcontent-%COMP%] {\n  left: -37px;\n  top: 50px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.competence-finger[_ngcontent-%COMP%] {\n  left: -49px;\n  top: 2px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  top: -97px;\n  color: var(--ion-color-varsom-blue-light-3);\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star.dark[_ngcontent-%COMP%] {\n  color: var(--ion-color-varsom-blue-light-1);\n  transition: color 200ms ease-in;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star1[_ngcontent-%COMP%] {\n  left: -115px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star2[_ngcontent-%COMP%] {\n  left: -65px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star2.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-2;\n          animation-name: activate-star-2;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star3[_ngcontent-%COMP%] {\n  left: -15px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star3.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-3;\n          animation-name: activate-star-3;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star4[_ngcontent-%COMP%] {\n  left: 35px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star4.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-4;\n          animation-name: activate-star-4;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star5[_ngcontent-%COMP%] {\n  left: 85px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.star5.animated[_ngcontent-%COMP%] {\n  -webkit-animation-name: activate-star-5;\n          animation-name: activate-star-5;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.photos[_ngcontent-%COMP%] {\n  left: -131px;\n  top: 38px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.pin[_ngcontent-%COMP%] {\n  left: -68px;\n  top: -38px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.ruler[_ngcontent-%COMP%] {\n  left: -119px;\n  top: -72px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.document[_ngcontent-%COMP%] {\n  left: 9px;\n  top: -30px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.path[_ngcontent-%COMP%] {\n  left: 63px;\n  top: -97px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.eye[_ngcontent-%COMP%] {\n  left: 49px;\n  top: 34px;\n}\n\nion-content[_ngcontent-%COMP%]   ion-slides[_ngcontent-%COMP%]   .animated-element-wrapper[_ngcontent-%COMP%]   .animated-element.text[_ngcontent-%COMP%] {\n  left: -78px;\n  top: 207px;\n  color: var(--ion-color-varsom-orange);\n  font-size: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXJ0LXdpemFyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUk7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSx1QkFBQTtFQUNBLFlBQUE7QUFETjs7QUFNQTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUhGOztBQU1BO0VBQ0UsZ0JBQUE7QUFIRjs7QUFJRTtFQUNFLHdCQUFBO0FBRko7O0FBTUE7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQUhGO0VBS0E7SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLHlDQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7O0FBUkE7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsWUFBQTtFQUhGO0VBS0E7SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLHlDQUFBO0lBQ0EsVUFBQTtFQUhGO0FBQ0Y7O0FBTUE7RUFDRTtJQUNFLHVCQUFBO0VBSkY7RUFNQTtJQUNFLDBCQUFBO0VBSkY7QUFDRjs7QUFGQTtFQUNFO0lBQ0UsdUJBQUE7RUFKRjtFQU1BO0lBQ0UsMEJBQUE7RUFKRjtBQUNGOztBQU9BO0VBQ0U7SUFDRSwwQkFBQTtFQUxGO0VBT0E7SUFDRSw0QkFBQTtFQUxGO0VBT0E7SUFDRSwwQkFBQTtFQUxGO0FBQ0Y7O0FBSkE7RUFDRTtJQUNFLDBCQUFBO0VBTEY7RUFPQTtJQUNFLDRCQUFBO0VBTEY7RUFPQTtJQUNFLDBCQUFBO0VBTEY7QUFDRjs7QUFRQTtFQUNFLGdEQUFBO1VBQUEsd0NBQUE7QUFORjs7QUFTQTtFQUNFLDRCQUFBO0FBTkY7O0FBUUU7RUFDRSxZQUFBO0FBTko7O0FBUUk7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FBTk47O0FBU0k7RUFDRSxnQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBQVBOOztBQVVJO0VBQ0UsWUFBQTtBQVJOOztBQVlNO0VBQ0Usa0JBQUE7QUFWUjs7QUFXUTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxj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ZmlsZSI6InN0YXJ0LXdpemFyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tZm9vdGVyIHtcclxuICBpb24tdG9vbGJhciB7XHJcbiAgICBpb24tYnV0dG9uIHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIHRleHQtdHJhbnNmb3JtOiBpbml0aWFsO1xyXG4gICAgICBoZWlnaHQ6IDU2cHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5pb24tbGlzdCB7XHJcbiAgbWFyZ2luLXRvcDogMTZweDtcclxuICBtYXJnaW4tbGVmdDogYXV0bztcclxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5sYW5ndWFnZS1saXN0IHtcclxuICBtYXgtd2lkdGg6IDI1MHB4O1xyXG4gIGlvbi1pdGVtIHtcclxuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDBweDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgdXNlcm1hcmtlci1wdWxzYXRlIHtcclxuICBmcm9tIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB3aWR0aDogODBweDtcclxuICAgIGhlaWdodDogODBweDtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTE5cHgsIC0xOXB4LCAwcHgpO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgcm90YXRlIHtcclxuICBmcm9tIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICB0byB7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMzYwZGVnKTtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgZmxvYXQge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMHB4KTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcclxuICB9XHJcbn1cclxuXHJcbi5mbG9hdCB7XHJcbiAgYW5pbWF0aW9uOiBmbG9hdCAycyBlYXNlLWluLW91dCBpbmZpbml0ZTtcclxufVxyXG5cclxuaW9uLWNvbnRlbnQge1xyXG4gIC0taW9uLWJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcblxyXG4gIGlvbi1zbGlkZXMge1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIC5mdWxsLWdyaWQge1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDZ2dztcclxuICAgICAgcGFkZGluZy1yaWdodDogNnZ3O1xyXG4gICAgfVxyXG5cclxuICAgIC5sZWdhbC1ncmlkIHtcclxuICAgICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgICAgcGFkZGluZy1ib3R0b206IDEydmg7XHJcbiAgICAgIGhlaWdodDogYXV0bztcclxuICAgIH1cclxuXHJcbiAgICAubGVnYWwtaW5mby1yb3cge1xyXG4gICAgICBoZWlnaHQ6IDIwdmg7XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2FsLXRleHQtcm93IHtcclxuICAgICAgdWwge1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMThweDtcclxuICAgICAgICBsaSB7XHJcbiAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDVweDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogNHZ3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gICAgICAgICAgbGkge1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLXNsaWRlIHtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIH1cclxuXHJcbiAgICBoMiB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDBweDtcclxuICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nLXdoaXRlLXBhZ2VzKTtcclxuICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tO1xyXG4gICAgfVxyXG5cclxuICAgIGgzIHtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XHJcbiAgICB9XHJcblxyXG4gICAgLmRhcmstY29sb3Ige1xyXG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGlvbi1jYXJkIHtcclxuICAgICAgLS1pbm5lci1ib3JkZXItd2lkdGg6IDAgMCAwIDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmxlZ2FsLWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDM2cHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS10aW50KTtcclxuICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgIGhlaWdodDogNzBweDtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG5cclxuICAgICAgJi5oaWRlIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgY29udGVudDogXCJcIjtcclxuICAgICAgICB3aWR0aDogMTIwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2xlZ2FsLXNwaW5uZXIucG5nXCIpO1xyXG4gICAgICAgIGFuaW1hdGlvbjogcm90YXRlIDNzIGxpbmVhciBpbmZpbml0ZTtcclxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgICAgIG9wYWNpdHk6IDAuNTtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyIHtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICB0b3A6IDUwJTtcclxuICAgICAgbGVmdDogNTAlO1xyXG5cclxuICAgICAgLmFuaW1hdGVkLWVsZW1lbnQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHJcbiAgICAgICAgJi5lY2xpcHNlIHtcclxuICAgICAgICAgIGxlZnQ6IC00MXB4O1xyXG4gICAgICAgICAgdG9wOiAtODVweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgJi5idWJibGUge1xyXG4gICAgICAgICAgbGVmdDogLTEwMHB4O1xyXG4gICAgICAgICAgdG9wOiAzMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5saW5lIHtcclxuICAgICAgICAgIGxlZnQ6IC0xODJweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYud2FybmluZyB7XHJcbiAgICAgICAgICBsZWZ0OiA1MHB4O1xyXG4gICAgICAgICAgdG9wOiA0MHB4O1xyXG4gICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogYm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waW4taWNlIHtcclxuICAgICAgICAgIHRvcDogMTExcHg7XHJcbiAgICAgICAgICBsZWZ0OiAtMjZweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYucGluLWRpcnQge1xyXG4gICAgICAgICAgdG9wOiAtODBweDtcclxuICAgICAgICAgIGxlZnQ6IDg0cHg7XHJcbiAgICAgICAgICB0cmFuc2Zvcm0tb3JpZ2luOiBib3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnBpbi1zbm93IHtcclxuICAgICAgICAgIHRvcDogLTU4cHg7XHJcbiAgICAgICAgICBsZWZ0OiAtNDRweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYucGluLXdhdGVyIHtcclxuICAgICAgICAgIGxlZnQ6IC0xMzNweDtcclxuICAgICAgICAgIHRvcDogMjZweDtcclxuICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuc3RlZXBuZXNzLWJhY2tncm91bmQge1xyXG4gICAgICAgICAgdG9wOiAtMTkwcHg7XHJcbiAgICAgICAgICBsZWZ0OiAtMTg4cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmRhbmdlci1tYXAge1xyXG4gICAgICAgICAgbGVmdDogLTE5MHB4O1xyXG4gICAgICAgICAgdG9wOiAtMTM2cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnVzZXItbG9jYXRpb24ge1xyXG4gICAgICAgICAgbGVmdDogNDJweDtcclxuICAgICAgICAgIHRvcDogODFweDtcclxuXHJcbiAgICAgICAgICAmOmJlZm9yZSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgICBhbmltYXRpb246IHVzZXJtYXJrZXItcHVsc2F0ZSAxLjVzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xyXG4gICAgICAgICAgICBib3JkZXI6IDVweCBzb2xpZCAjNjk5NmEzO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgICAgICAgei1pbmRleDogLTE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmV4Y2xhbWF0aW9uLW1hcmsge1xyXG4gICAgICAgICAgbGVmdDogLTcycHg7XHJcbiAgICAgICAgICB0b3A6IC0zNHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5hZGQtb2JzZXJ2YXRpb24ge1xyXG4gICAgICAgICAgbGVmdDogLTM3cHg7XHJcbiAgICAgICAgICB0b3A6IDUwcHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLmNvbXBldGVuY2UtZmluZ2VyIHtcclxuICAgICAgICAgIGxlZnQ6IC00OXB4O1xyXG4gICAgICAgICAgdG9wOiAycHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIge1xyXG4gICAgICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICAgICAgICB0b3A6IC05N3B4O1xyXG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci12YXJzb20tYmx1ZS1saWdodC0zKTtcclxuXHJcbiAgICAgICAgICAmLmRhcmsge1xyXG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1ibHVlLWxpZ2h0LTEpO1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAyMDBtcyBlYXNlLWluO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5zdGFyMSB7XHJcbiAgICAgICAgICBsZWZ0OiAtMTE1cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIyIHtcclxuICAgICAgICAgIGxlZnQ6IC02NXB4O1xyXG4gICAgICAgICAgJi5hbmltYXRlZCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBhY3RpdmF0ZS1zdGFyLTI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXIzIHtcclxuICAgICAgICAgIGxlZnQ6IC0xNXB4O1xyXG4gICAgICAgICAgJi5hbmltYXRlZCB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvbi1uYW1lOiBhY3RpdmF0ZS1zdGFyLTM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAmLnN0YXI0IHtcclxuICAgICAgICAgIGxlZnQ6IDM1cHg7XHJcbiAgICAgICAgICAmLmFuaW1hdGVkIHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uLW5hbWU6IGFjdGl2YXRlLXN0YXItNDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuc3RhcjUge1xyXG4gICAgICAgICAgbGVmdDogODVweDtcclxuICAgICAgICAgICYuYW5pbWF0ZWQge1xyXG4gICAgICAgICAgICBhbmltYXRpb24tbmFtZTogYWN0aXZhdGUtc3Rhci01O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waG90b3Mge1xyXG4gICAgICAgICAgbGVmdDogLTEzMXB4O1xyXG4gICAgICAgICAgdG9wOiAzOHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5waW4ge1xyXG4gICAgICAgICAgbGVmdDogLTY4cHg7XHJcbiAgICAgICAgICB0b3A6IC0zOHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5ydWxlciB7XHJcbiAgICAgICAgICBsZWZ0OiAtMTE5cHg7XHJcbiAgICAgICAgICB0b3A6IC03MnB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5kb2N1bWVudCB7XHJcbiAgICAgICAgICBsZWZ0OiA5cHg7XHJcbiAgICAgICAgICB0b3A6IC0zMHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5wYXRoIHtcclxuICAgICAgICAgIGxlZnQ6IDYzcHg7XHJcbiAgICAgICAgICB0b3A6IC05N3B4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJi5leWUge1xyXG4gICAgICAgICAgbGVmdDogNDlweDtcclxuICAgICAgICAgIHRvcDogMzRweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYudGV4dCB7XHJcbiAgICAgICAgICBsZWZ0OiAtNzhweDtcclxuICAgICAgICAgIHRvcDogMjA3cHg7XHJcbiAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXZhcnNvbS1vcmFuZ2UpO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"],
        data: {
          animation: _start_wizard_animations__WEBPACK_IMPORTED_MODULE_1__.animations
        }
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFDQUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUVGQTs7QUFDQUE7O0FBQ0VBOztBQUdGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOztBQUFnQ0E7Ozs7QUFBMENBOztBQUMxRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBQ0FBOztBQUNFQTs7QUFFRkE7O0FBSUZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFBZ0NBOzs7O0FBQTBDQTs7QUFDMUVBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBRUFBOztBQUVBQTs7QUFFQUE7O0FBRUFBOztBQUVBQTs7QUFFRkE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFBZ0NBOzs7O0FBQW1EQTs7QUFDbkZBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFBOERBOztBQUM5REE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTs7QUFBZ0NBOzs7O0FBQW9DQTs7QUFDcEVBOztBQUNFQTs7QUFDRUE7O0FBQTBCQTs7OztBQUFvQ0E7O0FBQzlEQTs7QUFBMEJBOzs7O0FBQW9DQTs7QUFDOURBOztBQUEwQkE7Ozs7QUFBb0NBOztBQUNoRUE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOztBQUErREE7QUFBQSxxQkFBU3lDLFdBQVQ7QUFBZ0IsYUFBaEI7O0FBQzdEekM7Ozs7QUFHRkE7O0FBQ0ZBOztBQUNGQTs7OztBQTNOaUNBOztBQUFBQTs7QUFXdUJBOztBQUFBQTs7QUFPeENBOztBQUFBQTs7QUFBMkJBOztBQUFBQTs7QUFBNENBOztBQUFBQTs7QUFLckVBOztBQUFBQTs7QUFBMkRBOztBQUFBQTs7QUFHakRBOztBQUFBQTs7QUFBOENBOztBQUVHQTs7QUFBQUE7O0FBbUJwQkE7O0FBQUFBOztBQUlBQTs7QUFBQUE7O0FBSUNBOztBQUFBQTs7QUFJQUE7O0FBQUFBOztBQUlDQTs7QUFBQUE7O0FBTzNDQTs7QUFBQUE7O0FBQTRCQTs7QUFBQUE7O0FBRTlCQTs7QUFBQUE7O0FBa0JpREE7O0FBQUFBOztBQUlHQTs7QUFBQUE7O0FBUWxEQTs7QUFBQUE7O0FBQTRCQTs7QUFBQUE7O0FBRTlCQTs7QUFBQUE7O0FBV21EQTs7QUFBQUE7O0FBSVRBOztBQUFBQTs7QUFJSEE7O0FBQUFBOztBQUlFQTs7QUFBQUE7O0FBSUdBOztBQUFBQTs7QUFJSkE7O0FBQUFBOztBQUlEQTs7QUFBQUE7O0FBVXJDQTs7QUFBQUE7O0FBQTRCQTs7QUFBQUE7O0FBRTlCQTs7QUFBQUE7O0FBVzBEQTs7QUFBQUE7O0FBRUFBOztBQUFBQTs7QUFFQUE7O0FBQUFBOztBQUVBQTs7QUFBQUE7O0FBRUFBOztBQUFBQTs7QUFTeERBOztBQUFBQTs7QUFBNEJBOztBQUFBQTs7QUFFOUJBOztBQUFBQTs7QUFVc0JBOztBQUFBQTs7QUFNcEJBOztBQUFBQTs7QUFBNEJBOztBQUFBQTs7QUFHeEJBOztBQUFBQTs7QUFBc0JBOztBQUFBQTs7QUFDdEJBOztBQUFBQTs7QUFBc0JBOztBQUFBQTs7QUFDdEJBOztBQUFBQTs7QUFBc0JBOztBQUFBQTs7QUFZcENBOztBQUFBQTs7Ozs7OztxQkMxTVEwQzs7Ozs7IiwibmFtZXMiOlsic2NhbGVVcEN1YmljQmV6aWVyIiwiZGVmYXVsdER1cmF0aW9uIiwic2NhbGVVcEhlYWRlckZyb20iLCJrZXlGcmFtZXNTY2FsZVVwIiwidHJhbnNmb3JtIiwib2Zmc2V0Iiwia2V5RnJhbWVzUHVsc2UiLCJrZXlGcmFtZXNTY2FsZVVwSGVhZGVyIiwiZ2V0U2NhbGVVcEFuaW1hdGlvbiIsImRlbGF5IiwiZ2V0RmFkZUluQW5pbWF0aW9uIiwicGFnZSIsIm9wYWNpdHkiLCJnZXRIZWFkZXJBbmltYXRpb24iLCJhbmltYXRpb25zIiwicm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsIl9zdGFydF93aXphcmRfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiU3RhcnRXaXphcmRQYWdlTW9kdWxlIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfbW9kdWxlc19zaGFyZWRfc2hhcmVkX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIlN0YXJ0V2l6YXJkUGFnZSIsInVzZXJTZXR0aW5nU2VydmljZSIsIm5hdkNvbnRyb2xsZXIiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiX3NldHRpbmdzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJsYW5nIiwiT2JqZWN0IiwibGFuZ0tleSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsInN0YXRlIiwidXNlclNldHRpbmckIiwicGlwZSIsInN1YnNjcmliZSIsInVzIiwibGFuZ3VhZ2UiLCJpbml0U3RhckluZGV4Q291bnRlciIsInNldFBhZ2VJbmRleCIsInRvUHJvbWlzZSIsInVzZXJTZXR0aW5ncyIsInNhdmVVc2VyU2V0dGluZ3MiLCJpbmRleCIsInNldFRpbWVvdXQiLCJyZXNldFZpc2libGVTdGFycyIsImFjdGl2ZUluZGV4IiwibmV4dCIsInZpc2libGVTdGFyTnVtYmVyIiwiaXNJbmNyZWFzaW5nIiwibmdEZXN0cm95JCIsImNvbXBsZXRlIiwic2xpZGVzIiwic2xpZGVOZXh0IiwicmVhY2hlZEVuZCIsImNvbXBsZXRlZFN0YXJ0V2l6YXJkIiwibmF2aWdhdGVSb290Iiwic2xpZGVUbyIsImdldEFjdGl2ZUluZGV4Iiwic2hvd0xlZ2FsSWNvbiIsInNlbGVjdG9ycyIsInZpZXdRdWVyeSIsIl9pb25pY19hbmd1bGFyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xM19fIiwiY3R4IiwiX3N0YXJ0X3dpemFyZF9hbmltYXRpb25zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvc3RhcnQtd2l6YXJkL3N0YXJ0LXdpemFyZC5hbmltYXRpb25zLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3N0YXJ0LXdpemFyZC9zdGFydC13aXphcmQubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3N0YXJ0LXdpemFyZC9zdGFydC13aXphcmQucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3N0YXJ0LXdpemFyZC9zdGFydC13aXphcmQucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIHRyaWdnZXIsXHJcbiAgc3RhdGUsXHJcbiAgdHJhbnNpdGlvbixcclxuICBzdHlsZSxcclxuICBhbmltYXRlLFxyXG4gIGtleWZyYW1lc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNjYWxlVXBDdWJpY0JlemllciA9ICdjdWJpYy1iZXppZXIoMC42NCwgMC4xLCAwLjU3LCAxLjUzKSc7XHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0RHVyYXRpb24gPSAnNzAwbXMnO1xyXG5leHBvcnQgY29uc3Qgc2NhbGVVcEhlYWRlckZyb20gPSAnc2NhbGUzZCgwLjksIDAuOSwgMSknO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtleUZyYW1lc1NjYWxlVXAgPSBrZXlmcmFtZXMoW1xyXG4gIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUzZCgwLCAwLCAxKScsIG9mZnNldDogMCB9KSxcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknLCBvZmZzZXQ6IDEgfSlcclxuXSk7XHJcblxyXG5leHBvcnQgY29uc3Qga2V5RnJhbWVzUHVsc2UgPSBrZXlmcmFtZXMoW1xyXG4gIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUzZCgxLCAxLCAxKScsIG9mZnNldDogMCB9KSxcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMS4yLCAxLjIsIDEuMiknLCBvZmZzZXQ6IDAuNSB9KSxcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknLCBvZmZzZXQ6IDEuMCB9KVxyXG5dKTtcclxuXHJcbmV4cG9ydCBjb25zdCBrZXlGcmFtZXNTY2FsZVVwSGVhZGVyID0ga2V5ZnJhbWVzKFtcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogc2NhbGVVcEhlYWRlckZyb20sIG9mZnNldDogMCB9KSxcclxuICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknLCBvZmZzZXQ6IDEgfSlcclxuXSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGVVcEFuaW1hdGlvbihkZWxheTogbnVtYmVyKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHN0YXRlKFxyXG4gICAgICAnKicsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICB0cmFuc2Zvcm06ICdzY2FsZTNkKDAsIDAsIDEpJ1xyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIC8vIGh0dHA6Ly9jdWJpYy1iZXppZXIuY29tLyMuNjQsLjEsLjU3LDEuNTNcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMScsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgYCR7ZGVmYXVsdER1cmF0aW9ufSAke2RlbGF5fW1zICR7c2NhbGVVcEN1YmljQmV6aWVyfWAsXHJcbiAgICAgICAga2V5RnJhbWVzU2NhbGVVcFxyXG4gICAgICApXHJcbiAgICApLFxyXG4gICAgc3RhdGUoXHJcbiAgICAgICdwYWdlXzEnLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUzZCgxLCAxLCAxKSdcclxuICAgICAgfSlcclxuICAgIClcclxuICBdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmFkZUluQW5pbWF0aW9uKHBhZ2U6IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xyXG4gIHJldHVybiBbXHJcbiAgICBzdGF0ZShcclxuICAgICAgJyonLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgb3BhY2l0eTogMFxyXG4gICAgICB9KVxyXG4gICAgKSxcclxuICAgIC8vIGh0dHA6Ly9jdWJpYy1iZXppZXIuY29tLyMuNjQsLjEsLjU3LDEuNTNcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgIGAqID0+IHBhZ2VfJHtwYWdlfWAsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgYDUwMG1zICR7ZGVsYXl9bXMgZWFzZS1vdXRgLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgb2Zmc2V0OiAxIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgIGBwYWdlXyR7cGFnZX0gPT4gKmAsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzUwMG1zIGVhc2Utb3V0JyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAsIG9mZnNldDogMSB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgICksXHJcbiAgICBzdGF0ZShcclxuICAgICAgYHBhZ2VfJHtwYWdlfWAsXHJcbiAgICAgIHN0eWxlKHtcclxuICAgICAgICBvcGFjaXR5OiAxXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEhlYWRlckFuaW1hdGlvbihwYWdlOiBudW1iZXIpIHtcclxuICByZXR1cm4gW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGVVcEhlYWRlckZyb21cclxuICAgICAgfSlcclxuICAgICksXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICBgKiA9PiBwYWdlXyR7cGFnZX1gLFxyXG4gICAgICBhbmltYXRlKGA1MDBtcyAyMDBtcyAke3NjYWxlVXBDdWJpY0Jlemllcn1gLCBrZXlGcmFtZXNTY2FsZVVwSGVhZGVyKVxyXG4gICAgKSxcclxuICAgIHN0YXRlKFxyXG4gICAgICBgcGFnZV8ke3BhZ2V9YCxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3NjYWxlM2QoMSwgMSwgMSknXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbnMgPSBbXHJcbiAgLy8gR2VuZXJpYyBhbmltYXRpb25zXHJcbiAgdHJpZ2dlcigncHVsc2UnLCBbXHJcbiAgICBzdGF0ZShcclxuICAgICAgJyonLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAnc2NhbGUzZCgxLCAxLCAxKSdcclxuICAgICAgfSlcclxuICAgICksXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiAqJyxcclxuICAgICAgYW5pbWF0ZShgJHtkZWZhdWx0RHVyYXRpb259IDUwMG1zIGVhc2Utb3V0YCwga2V5RnJhbWVzUHVsc2UpXHJcbiAgICApXHJcbiAgXSksXHJcblxyXG4gIC8vIFBhZ2UgMCBhbmltYXRpb25zXHJcbiAgdHJpZ2dlcignaGVhZGVyQW5pbWF0aW9uJywgZ2V0SGVhZGVyQW5pbWF0aW9uKDApKSxcclxuXHJcbiAgLy8gUGFnZSAxIGFuaW1hdGlvbnNcclxuICB0cmlnZ2VyKCdoZWFkZXJBbmltYXRpb24xJywgZ2V0SGVhZGVyQW5pbWF0aW9uKDEpKSxcclxuICB0cmlnZ2VyKCdzY2FsZVVwSWNlJywgZ2V0U2NhbGVVcEFuaW1hdGlvbig1MDApKSxcclxuICB0cmlnZ2VyKCdzY2FsZVVwV2F0ZXInLCBnZXRTY2FsZVVwQW5pbWF0aW9uKDcwMCkpLFxyXG4gIHRyaWdnZXIoJ3NjYWxlVXBXYXJuaW5nJywgZ2V0U2NhbGVVcEFuaW1hdGlvbig4MjApKSxcclxuICB0cmlnZ2VyKCdzY2FsZVVwU25vdycsIGdldFNjYWxlVXBBbmltYXRpb24oMTAwMCkpLFxyXG4gIHRyaWdnZXIoJ3NjYWxlVXBEaXJ0JywgZ2V0U2NhbGVVcEFuaW1hdGlvbig2NTApKSxcclxuICB0cmlnZ2VyKCdib3VuY2VQYXRoJywgW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJ3BhZ2VfMCA9PiBwYWdlXzEnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg2NXB4KScsIG9mZnNldDogMC41IH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJywgb2Zmc2V0OiAxLjAgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJ3BhZ2VfMiA9PiBwYWdlXzEnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNjVweCknLCBvZmZzZXQ6IDAuNSB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9mZnNldDogMS4wIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKVxyXG4gIF0pLFxyXG5cclxuICAvLyBQYWdlIDIgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ2hlYWRlckFuaW1hdGlvbjInLCBnZXRIZWFkZXJBbmltYXRpb24oMikpLFxyXG4gIHRyaWdnZXIoJ3NsaWRlSW5Gcm9tUmlnaHQnLCBbXHJcbiAgICBzdGF0ZShcclxuICAgICAgJyonLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgyMDBweCknXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gcGFnZV8yJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnMTIwMG1zIGVhc2Utb3V0JyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDIwMHB4KScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsIG9mZnNldDogMS4wIH0pXHJcbiAgICAgICAgXSlcclxuICAgICAgKVxyXG4gICAgKSxcclxuICAgIHN0YXRlKFxyXG4gICAgICAncGFnZV8yJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknXHJcbiAgICAgIH0pXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbnVkZ2VFeGNsYW1hdGlvbicsIFtcclxuICAgIHRyYW5zaXRpb24oJyogPT4gcGFnZV8yJywgYW5pbWF0ZSgnNTAwbXMgNzAwbXMgZWFzZS1vdXQnLCBrZXlGcmFtZXNQdWxzZSkpXHJcbiAgXSksXHJcblxyXG4gIC8vIFBhZ2UgMyBhbmltYXRpb25zXHJcbiAgdHJpZ2dlcignaGVhZGVyQW5pbWF0aW9uMycsIGdldEhlYWRlckFuaW1hdGlvbigzKSksXHJcbiAgdHJpZ2dlcignbW92ZURvd25SaWdodCcsIFtcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMycsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzcwMG1zIGVhc2Utb3V0JyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTMwcHgsIC0yMHB4KScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDBweCwgMHB4KScsIG9mZnNldDogMSB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgIClcclxuICBdKSxcclxuICB0cmlnZ2VyKCdtb3ZlRG93blJpZ2h0TGVzcycsIFtcclxuICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICcqID0+IHBhZ2VfMycsXHJcbiAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgJzcwMG1zIGVhc2Utb3V0JyxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwcHgsIC0yMHB4KScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDBweCwgMHB4KScsIG9mZnNldDogMSB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgIClcclxuICBdKSxcclxuICB0cmlnZ2VyKCdtb3ZlRG93bkxlZnQnLCBbXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiBwYWdlXzMnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDEwcHgsIC0yMHB4KScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDBweCwgMHB4KScsIG9mZnNldDogMSB9KVxyXG4gICAgICAgIF0pXHJcbiAgICAgIClcclxuICAgIClcclxuICBdKSxcclxuICB0cmlnZ2VyKCdtb3ZlTGVmdEFuZEFCaXREb3duJywgW1xyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gcGFnZV8zJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICAnNzAwbXMgZWFzZS1vdXQnLFxyXG4gICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgyMHB4LCAtMTBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbW92ZVVwQW5kQUJpdExlZnQnLCBbXHJcbiAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAnKiA9PiBwYWdlXzMnLFxyXG4gICAgICBhbmltYXRlKFxyXG4gICAgICAgICc3MDBtcyBlYXNlLW91dCcsXHJcbiAgICAgICAga2V5ZnJhbWVzKFtcclxuICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlKDZweCwgMjVweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwcHgsIDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApXHJcbiAgXSksXHJcbiAgdHJpZ2dlcignbW92ZVVwJywgW1xyXG4gICAgc3RhdGUoXHJcbiAgICAgICcqJyxcclxuICAgICAgc3R5bGUoe1xyXG4gICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMjBweCknXHJcbiAgICAgIH0pXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJyogPT4gcGFnZV8zJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICBgNzAwbXMgJHtzY2FsZVVwQ3ViaWNCZXppZXJ9YCxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDIwcHgpJywgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApLFxyXG4gICAgdHJhbnNpdGlvbihcclxuICAgICAgJ3BhZ2VfMyA9PiAqJyxcclxuICAgICAgYW5pbWF0ZShcclxuICAgICAgICBgNzAwbXMgJHtzY2FsZVVwQ3ViaWNCZXppZXJ9YCxcclxuICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMjBweCknLCBvZmZzZXQ6IDEgfSlcclxuICAgICAgICBdKVxyXG4gICAgICApXHJcbiAgICApLFxyXG4gICAgc3RhdGUoXHJcbiAgICAgICdwYWdlXzMnLFxyXG4gICAgICBzdHlsZSh7XHJcbiAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwcHgpJ1xyXG4gICAgICB9KVxyXG4gICAgKVxyXG4gIF0pLFxyXG5cclxuICAvLyBQYWdlIDQgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ2hlYWRlckFuaW1hdGlvbjQnLCBnZXRIZWFkZXJBbmltYXRpb24oNCkpLFxyXG5cclxuICAvLyBQYWdlIDUgYW5pbWF0aW9uc1xyXG4gIHRyaWdnZXIoJ2hlYWRlckFuaW1hdGlvbjUnLCBnZXRIZWFkZXJBbmltYXRpb24oNSkpLFxyXG4gIHRyaWdnZXIoJ2xlZ2FsVGV4dDEnLCBnZXRGYWRlSW5BbmltYXRpb24oNSwgMTAwMCkpLFxyXG4gIHRyaWdnZXIoJ2xlZ2FsVGV4dDInLCBnZXRGYWRlSW5BbmltYXRpb24oNSwgMjAwMCkpLFxyXG4gIHRyaWdnZXIoJ2xlZ2FsVGV4dDMnLCBnZXRGYWRlSW5BbmltYXRpb24oNSwgMzAwMCkpXHJcbl07XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3RhcnRXaXphcmRQYWdlIH0gZnJvbSAnLi9zdGFydC13aXphcmQucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IFN0YXJ0V2l6YXJkUGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpLCBTaGFyZWRNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1N0YXJ0V2l6YXJkUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0YXJ0V2l6YXJkUGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWNvbnRlbnQ+XHJcbiAgPGlvbi1zbGlkZXMgY2xhc3M9XCJvbmJvYXJkaW5nXCIgW29wdGlvbnNdPVwie2F1dG9wbGF5OmZhbHNlfVwiIHBhZ2VyPVwidHJ1ZVwiXHJcbiAgICAoaW9uU2xpZGVSZWFjaEVuZCk9XCJpb25TbGlkZVJlYWNoRW5kKClcIiAoaW9uU2xpZGVQcmV2U3RhcnQpPVwiaW9uU2xpZGVQcmV2U3RhcnQoKVwiXHJcbiAgICAoaW9uU2xpZGVUcmFuc2l0aW9uU3RhcnQpPVwiaW9uU2xpZGVUcmFuc2l0aW9uU3RhcnQoKVwiPlxyXG4gICAgPGlvbi1zbGlkZT5cclxuICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBlY2xpcHNlXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9lY2xpcHNlLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBidWJibGVcIiBbQHB1bHNlXT1cInN0YXRlXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9idWJibGUuc3ZnXCI+XHJcbiAgICAgICAgICAgICAgPC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGgyIFtAaGVhZGVyQW5pbWF0aW9uXT1cInN0YXRlXCI+e3sgXCJTRVRUSU5HUy5MQU5HVUFHRVwiIHwgdHJhbnNsYXRlIH19PHNwYW4gKm5nSWY9XCJsYW5ndWFnZSAhPT0gTGFuZ0tleS5lblwiPiAvXHJcbiAgICAgICAgICAgICAgICBMYW5ndWFnZTwvc3Bhbj48L2gyPlxyXG4gICAgICAgICAgICA8aW9uLWxpc3QgY2xhc3M9XCJsYW5ndWFnZS1saXN0XCI+XHJcbiAgICAgICAgICAgICAgPGlvbi1pdGVtIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgIDxpb24tbGFiZWwgcG9zaXRpb249XCJzdGFja2VkXCIgY29sb3I9XCJtZWRpdW1cIj5cclxuICAgICAgICAgICAgICAgICAge3snU1RBUlRfV0laQVJELkNIT09TRV9MQU5HVUFHRS5IRUFERVInfCB0cmFuc2xhdGV9fTxzcGFuICpuZ0lmPVwibGFuZ3VhZ2UgIT09IExhbmdLZXkuZW5cIj4gLyBDaG9vc2VcclxuICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlvbi1zZWxlY3QgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCIgWyhuZ01vZGVsKV09XCJsYW5ndWFnZVwiXHJcbiAgICAgICAgICAgICAgICAgIGludGVyZmFjZT1cImFjdGlvbi1zaGVldFwiIChuZ01vZGVsQ2hhbmdlKT1cInNhdmVMYW5ndWFnZSgpXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpb24tc2VsZWN0LW9wdGlvbiBbdmFsdWVdPVwibGFuZy5sYW5nS2V5XCIgKm5nRm9yPVwibGV0IGxhbmcgb2Ygc3VwcG9ydGVkTGFuZ3VhZ2VzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFuZy5uYW1lIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvaW9uLXNlbGVjdC1vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8L2lvbi1zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgICAgICAgPC9pb24tbGlzdD5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDwvaW9uLWdyaWQ+XHJcbiAgICA8L2lvbi1zbGlkZT5cclxuICAgIDxpb24tc2xpZGU+XHJcbiAgICAgIDxpb24tZ3JpZCBjbGFzcz1cImZ1bGwtZ3JpZFwiPlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgbGluZVwiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvbGluZS5zdmdcIj5cclxuICAgICAgICAgICAgICA8L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgd2FybmluZ1wiIFtAc2NhbGVVcFdhcm5pbmddPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy93YXJuaW5nLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwaW4taWNlXCIgW0BzY2FsZVVwSWNlXT1cInN0YXRlXCIgc3JjPVwiL2Fzc2V0cy9pY29uL21hcC9waW4taWNlLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwaW4tZGlydFwiIFtAc2NhbGVVcERpcnRdPVwic3RhdGVcIiBzcmM9XCIvYXNzZXRzL2ljb24vbWFwL3Bpbi1kaXJ0LnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwaW4tc25vd1wiIFtAc2NhbGVVcFNub3ddPVwic3RhdGVcIiBzcmM9XCIvYXNzZXRzL2ljb24vbWFwL3Bpbi1zbm93LnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwaW4td2F0ZXJcIiBbQHNjYWxlVXBXYXRlcl09XCJzdGF0ZVwiIHNyYz1cIi9hc3NldHMvaWNvbi9tYXAvcGluLXdhdGVyLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBbQGhlYWRlckFuaW1hdGlvbjFdPVwic3RhdGVcIj57eydTVEFSVF9XSVpBUkQuUEFHRV8xLkhFQURFUid8dHJhbnNsYXRlfX08L2gyPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3snU1RBUlRfV0laQVJELlBBR0VfMS5MSU5FXzEnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8L2lvbi1ncmlkPlxyXG4gICAgPC9pb24tc2xpZGU+XHJcbiAgICA8aW9uLXNsaWRlPlxyXG4gICAgICA8aW9uLWdyaWQgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHN0ZWVwbmVzcy1iYWNrZ3JvdW5kXCJcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvc3RlZXBuZXNzLWJhY2tncm91bmQuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGRhbmdlci1tYXBcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2Rhbmdlci1tYXAuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHVzZXItbG9jYXRpb25cIiBbQHNsaWRlSW5Gcm9tUmlnaHRdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy91c2VyLWxvY2F0aW9uLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBleGNsYW1hdGlvbi1tYXJrXCIgW0BudWRnZUV4Y2xhbWF0aW9uXT1cInN0YXRlXCJcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvZXhjbGFtYXRpb24tbWFyay5zdmdcIj5cclxuICAgICAgICAgICAgICA8L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8aDIgW0BoZWFkZXJBbmltYXRpb24yXT1cInN0YXRlXCI+e3snU1RBUlRfV0laQVJELlBBR0VfMi5IRUFERVInfHRyYW5zbGF0ZX19PC9oMj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAgICAgIHt7J1NUQVJUX1dJWkFSRC5QQUdFXzIuTElORV8xJ3x0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPC9pb24tZ3JpZD5cclxuICAgIDwvaW9uLXNsaWRlPlxyXG4gICAgPGlvbi1zbGlkZT5cclxuICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBhZGQtb2JzZXJ2YXRpb25cIiBbQHB1bHNlXT1cInN0YXRlXCJcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvYWRkLW9ic2VydmF0aW9uLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBwaG90b3NcIiBbQG1vdmVEb3duUmlnaHRdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9waG90b3Muc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHBpblwiIFtAbW92ZURvd25SaWdodExlc3NdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9waW4uc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IHJ1bGVyXCIgW0Btb3ZlRG93blJpZ2h0XT1cInN0YXRlXCJcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9hc3NldHMvaW1hZ2VzL29uYm9hcmRpbmcvcnVsZXIuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50LXdyYXBwZXJcIj5cclxuICAgICAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJhbmltYXRlZC1lbGVtZW50IGRvY3VtZW50XCIgW0Btb3ZlRG93bkxlZnRdPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9kb2N1bWVudC5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgcGF0aFwiIFtAbW92ZURvd25MZWZ0XT1cInN0YXRlXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9wYXRoLnN2Z1wiPlxyXG4gICAgICAgICAgICAgIDwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBleWVcIiBbQG1vdmVMZWZ0QW5kQUJpdERvd25dPVwic3RhdGVcIlxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvb25ib2FyZGluZy9leWUuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgIDxoMyBjbGFzcz1cImFuaW1hdGVkLWVsZW1lbnQgdGV4dFwiIFtAbW92ZVVwXT1cInN0YXRlXCI+e3snU1RBUlRfV0laQVJELlBBR0VfMy5CVVRUT05fVEVYVCcgfCB0cmFuc2xhdGV9fTwvaDM+XHJcbiAgICAgICAgICAgIDwvZGl2PiAtLT5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8aDIgW0BoZWFkZXJBbmltYXRpb24zXT1cInN0YXRlXCI+e3snU1RBUlRfV0laQVJELlBBR0VfMy5IRUFERVInfHRyYW5zbGF0ZX19PC9oMj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAgICAgIHt7J1NUQVJUX1dJWkFSRC5QQUdFXzMuTElORV8xJ3x0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPC9pb24tZ3JpZD5cclxuICAgIDwvaW9uLXNsaWRlPlxyXG4gICAgPGlvbi1zbGlkZT5cclxuICAgICAgPGlvbi1ncmlkIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJmdWxsLWdyaWQtcm93XCI+XHJcbiAgICAgICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudC13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBzdGFyIHN0YXIxXCIgbmFtZT1cInN0YXJcIiBbbmdDbGFzc109XCJ7J2RhcmsnOiB2aXNpYmxlU3Rhck51bWJlciA+PSAxfVwiPlxyXG4gICAgICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBzdGFyIHN0YXIyXCIgbmFtZT1cInN0YXJcIiBbbmdDbGFzc109XCJ7J2RhcmsnOiB2aXNpYmxlU3Rhck51bWJlciA+PSAyfVwiPlxyXG4gICAgICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBzdGFyIHN0YXIzXCIgbmFtZT1cInN0YXJcIiBbbmdDbGFzc109XCJ7J2RhcmsnOiB2aXNpYmxlU3Rhck51bWJlciA+PSAzfVwiPlxyXG4gICAgICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBzdGFyIHN0YXI0XCIgbmFtZT1cInN0YXJcIiBbbmdDbGFzc109XCJ7J2RhcmsnOiB2aXNpYmxlU3Rhck51bWJlciA+PSA0fVwiPlxyXG4gICAgICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgPGlvbi1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBzdGFyIHN0YXI1XCIgbmFtZT1cInN0YXJcIiBbbmdDbGFzc109XCJ7J2RhcmsnOiB2aXNpYmxlU3Rhck51bWJlciA+PSA1fVwiPlxyXG4gICAgICAgICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwiYW5pbWF0ZWQtZWxlbWVudCBjb21wZXRlbmNlLWZpbmdlciBmbG9hdFwiXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2ltYWdlcy9vbmJvYXJkaW5nL2NvbXBldGVuY2UtZmluZ2VyLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxoMiBbQGhlYWRlckFuaW1hdGlvbjRdPVwic3RhdGVcIj57eydTVEFSVF9XSVpBUkQuQ09NUEVURU5DRV9QQUdFLkhFQURFUid8dHJhbnNsYXRlfX08L2gyPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAge3snU1RBUlRfV0laQVJELkNPTVBFVEVOQ0VfUEFHRS5MSU5FXzEnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8L2lvbi1ncmlkPlxyXG4gICAgPC9pb24tc2xpZGU+XHJcbiAgICA8aW9uLXNsaWRlPlxyXG4gICAgICA8aW9uLWdyaWQgY2xhc3M9XCJmdWxsLWdyaWQgbGVnYWwtZ3JpZFwiPlxyXG4gICAgICAgIDxpb24tcm93IGNsYXNzPVwibGVnYWwtaW5mby1yb3dcIj5cclxuICAgICAgICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXBhZGRpbmcgaW9uLWFsaWduLXNlbGYtYm90dG9tXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsZWdhbC1pY29uXCIgW25nQ2xhc3NdPVwieydoaWRlJzogIXNob3dMZWdhbEljb24gfVwiPiZzZWN0O1xyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8L2lvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1yb3cgY2xhc3M9XCJsZWdhbC10ZXh0LXJvd1wiPlxyXG4gICAgICAgICAgPGlvbi1jb2wgYWxpZ24tc2VsZi10b3A+XHJcbiAgICAgICAgICAgIDxoMiBbQGhlYWRlckFuaW1hdGlvbjVdPVwic3RhdGVcIj57eydMRUdBTF9URVJNUy5IRUFERVInIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3M9XCJpb24tbm8tcGFkZGluZyBpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAgICAgPGxpIFtAbGVnYWxUZXh0MV09XCJzdGF0ZVwiPnt7J0xFR0FMX1RFUk1TLkxJTkVfMScgfCB0cmFuc2xhdGV9fTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgW0BsZWdhbFRleHQyXT1cInN0YXRlXCI+e3snTEVHQUxfVEVSTVMuTElORV8yJyB8IHRyYW5zbGF0ZX19PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBbQGxlZ2FsVGV4dDNdPVwic3RhdGVcIj57eydMRUdBTF9URVJNUy5MSU5FXzMnIHwgdHJhbnNsYXRlfX08L2xpPlxyXG4gICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8L2lvbi1ncmlkPlxyXG4gICAgPC9pb24tc2xpZGU+XHJcbiAgPC9pb24tc2xpZGVzPlxyXG48L2lvbi1jb250ZW50PlxyXG48aW9uLWZvb3Rlcj5cclxuICA8aW9uLXRvb2xiYXIgY29sb3I9XCJ2YXJzb20tYmx1ZVwiPlxyXG4gICAgPGlvbi1idXR0b24gY2xhc3M9XCJpb24tbm8tbWFyZ2luIGlvbi1uby1wYWRkaW5nXCIgZXhwYW5kPVwiZnVsbFwiIChjbGljayk9XCJzdGFydCgpXCIgZmlsbD1cImNsZWFyXCI+XHJcbiAgICAgIHt7IChyZWFjaGVkRW5kID9cclxuICAgICAgICAgICAgJ1NUQVJUX1dJWkFSRC5JX1VOREVSU1RBTkQnIDpcclxuICAgICAgICAgICAgJ1NUQVJUX1dJWkFSRC5TS0lQX1NUQVJUJykgfHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi1idXR0b24+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24tZm9vdGVyPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IElvblNsaWRlcywgTmF2Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgTGFuZ0tleSwgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBhbmltYXRpb25zIH0gZnJvbSAnLi9zdGFydC13aXphcmQuYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFN1YmplY3QsIHRpbWVyLCBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIHNraXBXaGlsZSwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBzZXR0aW5ncyB9IGZyb20gJy4uLy4uLy4uL3NldHRpbmdzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXN0YXJ0LXdpemFyZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXJ0LXdpemFyZC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3N0YXJ0LXdpemFyZC5wYWdlLnNjc3MnXSxcclxuICBhbmltYXRpb25zOiBhbmltYXRpb25zXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdGFydFdpemFyZFBhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQFZpZXdDaGlsZChJb25TbGlkZXMpIHNsaWRlczogSW9uU2xpZGVzO1xyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuICBMYW5nS2V5ID0gTGFuZ0tleTtcclxuICBzdGF0ZTogc3RyaW5nO1xyXG4gIHJlYWNoZWRFbmQgPSBmYWxzZTtcclxuICBzaG93TGVnYWxJY29uID0gZmFsc2U7XHJcbiAgdmlzaWJsZVN0YXJOdW1iZXIgPSAtMTtcclxuICBsYW5ndWFnZTogTGFuZ0tleTtcclxuICBzdXBwb3J0ZWRMYW5ndWFnZXM6IHtcclxuICAgIGxhbmc6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxhbmdLZXk6IExhbmdLZXk7XHJcbiAgfVtdID0gc2V0dGluZ3MubGFuZ3VhZ2Uuc3VwcG9ydGVkTGFuZ3VhZ2VzLm1hcCgobGFuZykgPT4gKHtcclxuICAgIC4uLmxhbmcsXHJcbiAgICBsYW5nS2V5OiBMYW5nS2V5W2xhbmcubGFuZ11cclxuICB9KSk7XHJcblxyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBhY3RpdmVJbmRleCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcclxuICBwcml2YXRlIGlzSW5jcmVhc2luZyA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmF2Q29udHJvbGxlcjogTmF2Q29udHJvbGxlclxyXG4gICkge31cclxuXHJcbiAgaW9uVmlld1dpbGxFbnRlcigpIHtcclxuICAgIHRoaXMuc3RhdGUgPSAneCc7XHJcbiAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKHVzKSA9PiB7XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2UgPSB1cy5sYW5ndWFnZTtcclxuICAgICAgdGhpcy5pbml0U3RhckluZGV4Q291bnRlcigpO1xyXG4gICAgICB0aGlzLnNldFBhZ2VJbmRleCgwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBzYXZlTGFuZ3VhZ2UoKSB7XHJcbiAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyRcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2Uuc2F2ZVVzZXJTZXR0aW5ncyh7XHJcbiAgICAgIC4uLnVzZXJTZXR0aW5ncyxcclxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2VcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQYWdlSW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVzZXRWaXNpYmxlU3RhcnMoKTtcclxuICAgICAgdGhpcy5zdGF0ZSA9IGBwYWdlXyR7aW5kZXh9YDtcclxuICAgICAgdGhpcy5hY3RpdmVJbmRleC5uZXh0KGluZGV4KTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZXNldFZpc2libGVTdGFycygpIHtcclxuICAgIHRoaXMudmlzaWJsZVN0YXJOdW1iZXIgPSAtMTtcclxuICAgIHRoaXMuaXNJbmNyZWFzaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgc2xpZGVOZXh0KCkge1xyXG4gICAgdGltZXIoNzAwKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzKSB7XHJcbiAgICAgICAgICB0aGlzLnNsaWRlcy5zbGlkZU5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICBpZiAodGhpcy5yZWFjaGVkRW5kKSB7XHJcbiAgICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5zYXZlVXNlclNldHRpbmdzKHtcclxuICAgICAgICAuLi51c2VyU2V0dGluZ3MsXHJcbiAgICAgICAgY29tcGxldGVkU3RhcnRXaXphcmQ6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZVJvb3QoJy8nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2xpZGVzLnNsaWRlVG8oNSwgMjAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblNsaWRlVHJhbnNpdGlvblN0YXJ0KCkge1xyXG4gICAgY29uc3QgaW5kZXggPSBhd2FpdCB0aGlzLnNsaWRlcy5nZXRBY3RpdmVJbmRleCgpO1xyXG4gICAgdGhpcy5zZXRQYWdlSW5kZXgoaW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgaW9uU2xpZGVSZWFjaEVuZCgpIHtcclxuICAgIHRoaXMucmVhY2hlZEVuZCA9IHRydWU7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93TGVnYWxJY29uID0gdHJ1ZTtcclxuICAgICAgLy8gQ3JhenkgaW9zIGJ1ZyB0byBnZXQgYW5pbWF0aW9uIG9uIHNwaW5uZXIuLiA6b1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICBpb25TbGlkZVByZXZTdGFydCgpIHtcclxuICAgIHRoaXMucmVhY2hlZEVuZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0U3RhckluZGV4Q291bnRlcigpIHtcclxuICAgIHRoaXMuYWN0aXZlSW5kZXhcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgc3dpdGNoTWFwKChpbmRleCkgPT4gaW50ZXJ2YWwoNzAwKS5waXBlKHNraXBXaGlsZSgoKSA9PiBpbmRleCAhPT0gNCkpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5jcmVhc2luZyAmJiB0aGlzLnZpc2libGVTdGFyTnVtYmVyID49IDYpIHtcclxuICAgICAgICAgIC8vIENvdW50IHRvIDYgdG8gYWRkIGFuIGV4dHJhIHBhdXNlIG9uIHRoZSBlbmRcclxuICAgICAgICAgIHRoaXMuaXNJbmNyZWFzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc0luY3JlYXNpbmcgJiYgdGhpcy52aXNpYmxlU3Rhck51bWJlciA8IDApIHtcclxuICAgICAgICAgIC8vIENvdW50IHRvIC0xIHRvIGFkZCBhbiBleHRyYSBwYXVzZSBvbiB0aGUgc3RhcnRcclxuICAgICAgICAgIHRoaXMuaXNJbmNyZWFzaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJbmNyZWFzaW5nKSB7XHJcbiAgICAgICAgICB0aGlzLnZpc2libGVTdGFyTnVtYmVyKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudmlzaWJsZVN0YXJOdW1iZXItLTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=