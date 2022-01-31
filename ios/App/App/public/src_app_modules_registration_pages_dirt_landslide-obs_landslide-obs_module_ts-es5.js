(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_dirt_landslide-obs_landslide-obs_module_ts"], {
    /***/
    64679: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LandslideObsPageModule": function LandslideObsPageModule() {
          return (
            /* binding */
            _LandslideObsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./landslide-obs.page */
      17331);
      /* harmony import */


      var _can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../can-deactivate-route.guard */
      7990);
      /* harmony import */


      var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../add-web-url-modal/add-web-url-modal.module */
      22838);
      /* harmony import */


      var _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../set-avalanche-position/set-avalanche-position.module */
      41889);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__.LandslideObsPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateRouteGuard]
      }];

      var _LandslideObsPageModule = function _LandslideObsPageModule() {
        _classCallCheck(this, _LandslideObsPageModule);
      };

      _LandslideObsPageModule.ɵfac = function LandslideObsPageModule_Factory(t) {
        return new (t || _LandslideObsPageModule)();
      };

      _LandslideObsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _LandslideObsPageModule
      });
      _LandslideObsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule, _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_LandslideObsPageModule, {
          declarations: [_landslide_obs_page__WEBPACK_IMPORTED_MODULE_1__.LandslideObsPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule, _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    17331: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "LandslideObsPage": function LandslideObsPage() {
          return (
            /* binding */
            _LandslideObsPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../set-avalanche-position/set-avalanche-position.page */
      71022);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../../components/add-web-url-item/add-web-url-item.component */
      15248);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function LandslideObsPage_app_registration_content_wrapper_8_ng_container_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](8, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate8"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](2, 8, ctx_r3.registration.request.LandSlideObs.StartLat, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 11, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](4, 13, ctx_r3.registration.request.LandSlideObs.StartLong, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 16, "MAP_CENTER_INFO.EAST_SHORT"), " - ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](6, 18, ctx_r3.registration.request.LandSlideObs.StopLat, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](7, 21, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](8, 23, ctx_r3.registration.request.LandSlideObs.StopLong, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 26, "MAP_CENTER_INFO.EAST_SHORT"), " ");
        }
      }

      function LandslideObsPage_app_registration_content_wrapper_8_ion_item_26_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-label", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
        }
      }

      function LandslideObsPage_app_registration_content_wrapper_8_ion_item_39_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-label", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "hasWarning": a0
        };
      };

      function LandslideObsPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "app-registration-content-wrapper", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("reset", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r6.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](6, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_item_click_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r8.setLandslidePosition();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "ion-text", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](11, "ion-icon", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](12, LandslideObsPage_app_registration_content_wrapper_8_ng_container_12_Template, 10, 28, "ng-container", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](13, "ion-icon", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "ion-item", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](15, "ion-label", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](17, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](18, "ion-datetime", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ngModelChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ngModelChange_18_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r9.registration.request.LandSlideObs.DtLandSlideTime = $event;
          })("ionChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ionChange_18_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r10.dtTimeChanged();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](19, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](20, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](21, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](22, "ion-button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_button_click_22_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r11.setDtLandSlideTimeToNow();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "ion-icon", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](24);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](25, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](26, LandslideObsPage_app_registration_content_wrapper_8_ion_item_26_Template, 5, 6, "ion-item", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "ion-item", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](28, "ion-label", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](30, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](31, "ion-datetime", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ionChange_31_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r12.dtEndTimeChanged();
          })("ngModelChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ngModelChange_31_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r13.registration.request.LandSlideObs.DtLandSlideTimeEnd = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](32, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](33, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](34, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "ion-button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function LandslideObsPage_app_registration_content_wrapper_8_Template_ion_button_click_35_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r14.setDtLandSlideTimeEndToNow();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](36, "ion-icon", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](38, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](39, LandslideObsPage_app_registration_content_wrapper_8_ion_item_39_Template, 5, 6, "ion-item", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](40, "app-kdv-select", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_40_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r15.registration.request.LandSlideObs.LandSlideTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](41, "app-kdv-select", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_41_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r16.registration.request.LandSlideObs.LandSlideSizeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "app-kdv-select", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_42_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r17.registration.request.LandSlideObs.LandSlideTriggerTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](43, "app-kdv-select", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_43_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r18.registration.request.LandSlideObs.ActivityInfluencedTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](44, "app-kdv-select", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_44_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r19.registration.request.LandSlideObs.DamageExtentTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](45, "app-kdv-select", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_45_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r20.registration.request.LandSlideObs.ForecastAccurateTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](47, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](48);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](49, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](50, "app-text-comment", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("valueChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_50_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r21.registration.request.LandSlideObs.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](51, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](52, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](53, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](54);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](55, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](56, "app-add-picture-item", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](58, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](59);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](60, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](61, "app-add-web-url-item", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("weburlsChange", function LandslideObsPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_61_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r22.registration.request.LandSlideObs.Urls = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 43, "REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](9, 45, "REGISTRATION.DIRT.LAND_SLIDE_OBS.POSITION"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.LandSlideObs.StartLat)("ngIfElse", _r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](75, _c0, ctx_r0.dateIsDifferentThanObsTime));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", !ctx_r0.registration.request.LandSlideObs.DtLandSlideTime ? "danger" : "medium");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](17, 47, "REGISTRATION.DIRT.LAND_SLIDE_OBS.DT_LAND_SLIDE_TIME"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](19, 49, "MONTHS.SHORT_LIST"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](20, 51, "DIALOGS.OK"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](21, 53, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("max", ctx_r0.maxDateStart)("ngModel", ctx_r0.registration.request.LandSlideObs.DtLandSlideTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](25, 55, "REGISTRATION.SET_TIME.NOW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.dateIsDifferentThanObsTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](77, _c0, ctx_r0.dateEndIsDifferentThanObsTime));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("color", !ctx_r0.registration.request.LandSlideObs.DtLandSlideTimeEnd ? "danger" : "medium");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](30, 57, "REGISTRATION.DIRT.LAND_SLIDE_OBS.DT_LAND_SLIDE_TIME_END"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](32, 59, "MONTHS.SHORT_LIST"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](33, 61, "DIALOGS.OK"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](34, 63, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("min", ctx_r0.minDateEnd)("max", ctx_r0.maxDateEnd)("ngModel", ctx_r0.registration.request.LandSlideObs.DtLandSlideTimeEnd);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](38, 65, "REGISTRATION.SET_TIME.NOW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.dateEndIsDifferentThanObsTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideSizeTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.LandSlideTriggerTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.ActivityInfluencedTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.DamageExtentTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.ForecastAccurateTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](49, 67, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](51, 69, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("value", ctx_r0.registration.request.LandSlideObs.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](55, 71, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](60, 73, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("weburls", ctx_r0.registration.request.LandSlideObs.Urls);
        }
      }

      function LandslideObsPage_ng_template_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](1, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](1, 2, "REGISTRATION.DIRT.LAND_SLIDE_OBS.SET_LANDSLIDE_POSITION"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 4, "REGISTRATION.DIRT.LAND_SLIDE_OBS.IN_MAP"), "\n");
        }
      }

      var _LandslideObsPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_LandslideObsPage, _base_page__WEBPACK_I);

        var _super = _createSuper(_LandslideObsPage);

        function _LandslideObsPage(basePageService, activatedRoute, modalController) {
          var _this;

          _classCallCheck(this, _LandslideObsPage);

          _this = _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.LandSlideObs, basePageService, activatedRoute);
          _this.modalController = modalController;
          return _this;
        }

        _createClass(_LandslideObsPage, [{
          key: "dateIsDifferentThanObsTime",
          get: function get() {
            return this.registration.request.LandSlideObs.DtLandSlideTime && !moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).startOf('day').isSame(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.DtObsTime).startOf('day'));
          }
        }, {
          key: "dateEndIsDifferentThanObsTime",
          get: function get() {
            return this.registration.request.LandSlideObs.DtLandSlideTimeEnd && !moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).startOf('day').isSame(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.DtObsTime).startOf('day'));
          }
        }, {
          key: "onInit",
          value: function onInit() {
            if (!this.registration.request.LandSlideObs.Urls) {
              this.registration.request.LandSlideObs.Urls = [];
            }

            if (this.registration.request.LandSlideObs.DtLandSlideTimeEnd) {
              this.maxDateStart = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);
            } else {
              this.maxDateStart = this.getMaxDateForNow();
            }

            if (this.registration.request.LandSlideObs.DtLandSlideTime) {
              this.minDateEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).toISOString(true);
            }

            this.maxDateEnd = this.getMaxDateForNow();
          }
        }, {
          key: "getMaxDateForNow",
          value: function getMaxDateForNow() {
            // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
            // Workaround is to set minutes to 59.
            return moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
          }
        }, {
          key: "dtTimeChanged",
          value: function dtTimeChanged() {
            this.minDateEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).toISOString(true);

            if (this.registration.request.LandSlideObs.DtLandSlideTimeEnd && moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).isBefore(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime))) {
              this.registration.request.LandSlideObs.DtLandSlideTimeEnd = this.registration.request.LandSlideObs.DtLandSlideTime;
            }
          }
        }, {
          key: "dtEndTimeChanged",
          value: function dtEndTimeChanged() {
            this.maxDateStart = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd).toISOString(true);

            if (this.registration.request.LandSlideObs.DtLandSlideTime && moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.LandSlideObs.DtLandSlideTimeEnd))) {
              this.registration.request.LandSlideObs.DtLandSlideTime = this.registration.request.LandSlideObs.DtLandSlideTimeEnd;
            }
          }
        }, {
          key: "isValid",
          value: function isValid() {
            return this.registration && this.registration.request.LandSlideObs && !!this.registration.request.LandSlideObs.DtLandSlideTime && !!this.registration.request.LandSlideObs.DtLandSlideTimeEnd;
          }
        }, {
          key: "setDtLandSlideTimeToNow",
          value: function setDtLandSlideTimeToNow() {
            this.registration.request.LandSlideObs.DtLandSlideTime = moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
          }
        }, {
          key: "setDtLandSlideTimeEndToNow",
          value: function setDtLandSlideTimeEndToNow() {
            this.registration.request.LandSlideObs.DtLandSlideTimeEnd = moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
          }
        }, {
          key: "setLandslidePosition",
          value: function setLandslidePosition() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var relativeToLatLng, startLatLng, endLatLng, modal, result, start, end;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      relativeToLatLng = this.registration.request.ObsLocation ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
                      startLatLng = this.registration.request.LandSlideObs.StartLat && this.registration.request.LandSlideObs.StartLong ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.LandSlideObs.StartLat, this.registration.request.LandSlideObs.StartLong) : null;
                      endLatLng = this.registration.request.LandSlideObs.StopLat && this.registration.request.LandSlideObs.StopLong ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.LandSlideObs.StopLat, this.registration.request.LandSlideObs.StopLong) : null;
                      _context.next = 5;
                      return this.modalController.create({
                        component: _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_2__.SetAvalanchePositionPage,
                        componentProps: {
                          relativeToLatLng: relativeToLatLng,
                          startLatLng: startLatLng,
                          endLatLng: endLatLng,
                          geoHazard: this.registration.geoHazard
                        }
                      });

                    case 5:
                      modal = _context.sent;
                      modal.present();
                      _context.next = 9;
                      return modal.onDidDismiss();

                    case 9:
                      result = _context.sent;

                      if (result.data) {
                        start = result.data.start;
                        end = result.data.end;
                        this.registration.request.LandSlideObs.StartLat = start.lat;
                        this.registration.request.LandSlideObs.StartLong = start.lng;
                        this.registration.request.LandSlideObs.StopLat = end.lat;
                        this.registration.request.LandSlideObs.StopLong = end.lng;
                      }

                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }]);

        return _LandslideObsPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _LandslideObsPage.ɵfac = function LandslideObsPage_Factory(t) {
        return new (t || _LandslideObsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_4__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.ModalController));
      };

      _LandslideObsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
        type: _LandslideObsPage,
        selectors: [["app-landslide-obs"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
        decls: 11,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], ["noPosition", ""], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "click"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap"], ["color", "medium", "name", "location", 1, "position-pin"], [4, "ngIf", "ngIfElse"], ["slot", "end", "name", "chevron-forward", 1, "item-detail-icon"], [3, "ngClass"], ["position", "stacked", 1, "ion-text-uppercase", 3, "color"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "max", "monthShortNames", "doneText", "cancelText", "ngModel", "ngModelChange", "ionChange"], ["slot", "end", "fill", "outline", "color", "medium", 1, "set-to-now-button", 3, "click"], ["slot", "start", "name", "time"], [4, "ngIf"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "min", "max", "monthShortNames", "doneText", "cancelText", "ngModel", "ionChange", "ngModelChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.LANDSLIDE_TYPE", "kdvKey", "Dirt_LandSlideKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DESTRUCTIVE_SIZE", "kdvKey", "Dirt_LandSlideSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.AVAL_TRIGGER", "kdvKey", "Dirt_LandSlideTriggerKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DIRT_ACTIVITY_INFLUENCED", "kdvKey", "Dirt_ActivityInfluencedKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DAMAGE_EXTENT", "kdvKey", "DamageExtentKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.DIRT.LAND_SLIDE_OBS.DIRT_FORECAST_ACCURATE", "kdvKey", "ForecastAccurateKDV", 3, "value", "valueChange"], [3, "value", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [3, "weburls", "weburlsChange"], ["color", "danger", 1, "ion-text-wrap"]],
        template: function LandslideObsPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, LandslideObsPage_app_registration_content_wrapper_8_Template, 62, 79, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](9, LandslideObsPage_ng_template_9_Template, 3, 6, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](6, 2, "REGISTRATION.DIRT.LAND_SLIDE_OBS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.LandSlideObs);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.IonButton, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_8__.KdvSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__.AddPictureItemComponent, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_11__.AddWebUrlItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe],
        styles: [".set-to-now-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n\n.position-pin[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  position: relative;\n  top: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhbmRzbGlkZS1vYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUFDSiIsImZpbGUiOiJsYW5kc2xpZGUtb2JzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZXQtdG8tbm93LWJ1dHRvbiB7XHJcbiAgICB6LWluZGV4OiAyMDA7XHJcbn1cclxuXHJcbi5wb3NpdGlvbi1waW4ge1xyXG4gICAgd2lkdGg6IDIycHg7XHJcbiAgICBoZWlnaHQ6IDIycHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDNweDtcclxufSJdfQ== */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUEsVUFBTUEsTUFBTSxHQUFXLENBQ3JCO0FBQ0VDLFlBQUksRUFBRSxFQURSO0FBRUVDLGlCQUFTLEVBQUVDLGlFQUZiO0FBR0VDLHFCQUFhLEVBQUUsQ0FBQ0MsZ0ZBQUQ7QUFIakIsT0FEcUIsQ0FBdkI7O1VBaUJhQzs7Ozs7eUJBQUFBO0FBQXNCOzs7Y0FBdEJBOzs7a0JBUkYsQ0FDUEMsNkVBRE8sRUFFUEMsaUdBRk8sRUFHUEMsaUhBSE8sRUFJUEMsbUVBQXNCVixNQUF0QixDQUpPOzs7OzRIQVFFTSx5QkFBc0I7QUFBQUsseUJBRmxCUixpRUFFa0I7QUFGRlMsb0JBTDdCTCw2RUFLNkIsRUFKN0JDLGlHQUk2QixFQUg3QkMsaUhBRzZCLEVBSENDLHlEQUdEO0FBRUU7QUFMRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDS3hCRzs7QUFDRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVNGQTs7Ozs7O0FBVEVBOztBQUFBQTs7Ozs7O0FBNEJOQTs7QUFDRUE7O0FBQ0VBOzs7Ozs7QUFDRkE7O0FBQ0ZBOzs7O0FBRklBOztBQUFBQTs7Ozs7O0FBaUJKQTs7QUFDRUE7O0FBQ0VBOzs7Ozs7QUFDRkE7O0FBQ0ZBOzs7O0FBRklBOztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7QUEvRFJBOztBQUNvRUE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDbEVBOztBQUNFQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQVVBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQ1JBOztBQUF3RUE7Ozs7QUFDdkRBOztBQUNqQkE7O0FBQ0VBOztBQUNBQTs7QUFXRkE7O0FBQ0FBOztBQUVGQTs7QUFDQUE7O0FBQ0VBOztBQUM2QkE7Ozs7QUFDeUNBOztBQUN0RUE7O0FBRXNDQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBLGFBQStELFdBQS9ELEVBQStEO0FBQUFBOztBQUFBOztBQUFBO0FBQUEsV0FBL0Q7Ozs7Ozs7O0FBRXRDQTs7QUFDQUE7O0FBQ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQ0FBOztBQUErQ0E7Ozs7QUFDakRBOztBQUNGQTs7QUFDQUE7O0FBS0FBOztBQUNFQTs7QUFDZ0RBOzs7O0FBQzBCQTs7QUFDMUVBOztBQUVnREE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQSxhQUFnQyxlQUFoQyxFQUFnQztBQUFBQTs7QUFBQTs7QUFBQTtBQUFBLFdBQWhDOzs7Ozs7OztBQUVoREE7O0FBQ0FBOztBQUNFQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUNBQTs7QUFBK0NBOzs7O0FBQ2pEQTs7QUFDRkE7O0FBQ0FBOztBQUtBQTs7QUFDRUE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBMkRBOztBQUM3REE7O0FBQ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQStEQTs7QUFDakVBOztBQUNFQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFrRUE7O0FBQ3BFQTs7QUFDc0NBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQ3RDQTs7QUFDQUE7O0FBQ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQThEQTs7QUFDaEVBOztBQUNFQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFrRUE7O0FBQ3BFQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQWtCQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOzs7O0FBQ2tFQTs7QUFDcEZBOztBQUNFQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFHQUE7O0FBQ0VBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUFzQkE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBcURBOztBQUM3RUE7O0FBQ0ZBOzs7Ozs7OztBQXBHRUEseUdBQTZCLGlCQUE3QixFQUE2QkMsc0JBQTdCOztBQUlNRDs7QUFBQUE7O0FBSXNFQTs7QUFBQUE7O0FBSXZEQTs7QUFBQUEsK0hBQWlELFVBQWpELEVBQWlERSxHQUFqRDs7QUFlVEY7O0FBQUFBOztBQUNHQTs7QUFBQUE7O0FBQ2tCQTs7QUFBQUE7O0FBRXFCQTs7QUFBQUE7O0FBQ2hEQTs7QUFBd0NBOztBQURiQSxnR0FBb0IsU0FBcEIsRUFBb0JDLHdEQUFwQjs7QUFPb0JEOztBQUFBQTs7QUFHeENBOztBQUFBQTs7QUFLREE7O0FBQUFBOztBQUNHQTs7QUFBQUE7O0FBQ3FDQTs7QUFBQUE7O0FBRzlDQTs7QUFBQUE7O0FBQXdEQTs7QUFDeERBOztBQUZZQSw4RkFBa0IsS0FBbEIsRUFBa0JDLGlCQUFsQixFQUFrQixTQUFsQixFQUFrQkEsMkRBQWxCOztBQU9tQ0Q7O0FBQUFBOztBQUd4Q0E7O0FBQUFBOztBQU1UQTs7QUFBQUE7O0FBRUFBOztBQUFBQTs7QUFFQUE7O0FBQUFBOztBQUVvQ0E7O0FBQUFBOztBQUdwQ0E7O0FBQUFBOztBQUVBQTs7QUFBQUE7O0FBR0VBOztBQUFBQTs7QUFJRkE7O0FBQUFBOztBQURnQkE7O0FBSWRBOztBQUFBQTs7QUFHa0JBOztBQUFBQSxnSEFBb0MsZ0JBQXBDLEVBQW9DQyxzQkFBcEMsRUFBb0MsaUJBQXBDLEVBQW9DQSxzQkFBcEMsRUFBb0MsYUFBcEMsRUFBb0NBLG9CQUFwQzs7QUFLbEJEOztBQUFBQTs7QUFHa0JBOztBQUFBQTs7Ozs7O0FBSzFCQTs7Ozs7Ozs7QUFBQUE7Ozs7VUNyR1dHOzs7OztBQUtYLG1DQUNFQyxlQURGLEVBRUVDLGNBRkYsRUFHVUMsZUFIVixFQUcwQztBQUFBOztBQUFBOztBQUV4QyxvQ0FBTUMsaUhBQU4sRUFBb0NILGVBQXBDLEVBQXFEQyxjQUFyRDtBQUZRO0FBQWdDO0FBR3pDOzs7O2VBRUQsZUFBOEI7QUFDNUIsbUJBQ0UsS0FBS0csWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDQyxlQUF2QyxJQUNBLENBQUNDLDhDQUFPLEtBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q0MsZUFBOUMsRUFDRUUsT0FERixDQUNVLEtBRFYsRUFFRUMsTUFGRixDQUVTRiw4Q0FBTyxLQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQk0sU0FBakMsRUFBNENGLE9BQTVDLENBQW9ELEtBQXBELENBRlQsQ0FGSDtBQU1EOzs7ZUFFRCxlQUFpQztBQUMvQixtQkFDRSxLQUFLTCxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNNLGtCQUF2QyxJQUNBLENBQUNKLDhDQUFPLEtBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q00sa0JBQTlDLEVBQ0VILE9BREYsQ0FDVSxLQURWLEVBRUVDLE1BRkYsQ0FFU0YsOENBQU8sS0FBS0osWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJNLFNBQWpDLEVBQTRDRixPQUE1QyxDQUFvRCxLQUFwRCxDQUZULENBRkg7QUFNRDs7O2lCQUVELGtCQUFNO0FBQ0osZ0JBQUksQ0FBQyxLQUFLTCxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNPLElBQTVDLEVBQWtEO0FBQ2hELG1CQUFLVCxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNPLElBQXZDLEdBQThDLEVBQTlDO0FBQ0Q7O0FBQ0QsZ0JBQUksS0FBS1QsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDTSxrQkFBM0MsRUFBK0Q7QUFDN0QsbUJBQUtFLFlBQUwsR0FBb0JOLDhDQUNsQixLQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNNLGtCQURyQixFQUVsQkcsV0FGa0IsQ0FFTixJQUZNLENBQXBCO0FBR0QsYUFKRCxNQUlPO0FBQ0wsbUJBQUtELFlBQUwsR0FBb0IsS0FBS0UsZ0JBQUwsRUFBcEI7QUFDRDs7QUFDRCxnQkFBSSxLQUFLWixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNDLGVBQTNDLEVBQTREO0FBQzFELG1CQUFLVSxVQUFMLEdBQWtCVCw4Q0FDaEIsS0FBS0osWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDQyxlQUR2QixFQUVoQlEsV0FGZ0IsQ0FFSixJQUZJLENBQWxCO0FBR0Q7O0FBQ0QsaUJBQUtHLFVBQUwsR0FBa0IsS0FBS0YsZ0JBQUwsRUFBbEI7QUFDRDs7O2lCQUVELDRCQUFnQjtBQUNkO0FBQ0E7QUFDQSxtQkFBT1IsZ0RBQVNPLFdBQVQsQ0FBcUIsSUFBckIsQ0FBUDtBQUNEOzs7aUJBRUQseUJBQWE7QUFDWCxpQkFBS0UsVUFBTCxHQUFrQlQsOENBQ2hCLEtBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q0MsZUFEdkIsRUFFaEJRLFdBRmdCLENBRUosSUFGSSxDQUFsQjs7QUFHQSxnQkFDRSxLQUFLWCxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNNLGtCQUF2QyxJQUNBSiw4Q0FDRSxLQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNNLGtCQUR6QyxFQUVFTyxRQUZGLENBRVdYLDhDQUFPLEtBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q0MsZUFBOUMsQ0FGWCxDQUZGLEVBS0U7QUFDQSxtQkFBS0gsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDTSxrQkFBdkMsR0FBNEQsS0FBS1IsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDQyxlQUFuRztBQUNEO0FBQ0Y7OztpQkFFRCw0QkFBZ0I7QUFDZCxpQkFBS08sWUFBTCxHQUFvQk4sOENBQ2xCLEtBQUtKLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q00sa0JBRHJCLEVBRWxCRyxXQUZrQixDQUVOLElBRk0sQ0FBcEI7O0FBR0EsZ0JBQ0UsS0FBS1gsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDQyxlQUF2QyxJQUNBQyw4Q0FBTyxLQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNDLGVBQTlDLEVBQStEYSxPQUEvRCxDQUNFWiw4Q0FBTyxLQUFLSixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNNLGtCQUE5QyxDQURGLENBRkYsRUFLRTtBQUNBLG1CQUFLUixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNDLGVBQXZDLEdBQXlELEtBQUtILFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q00sa0JBQWhHO0FBQ0Q7QUFDRjs7O2lCQUVELG1CQUFPO0FBQ0wsbUJBQ0UsS0FBS1IsWUFBTCxJQUNBLEtBQUtBLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUQxQixJQUVBLENBQUMsQ0FBQyxLQUFLRixZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNDLGVBRnpDLElBR0EsQ0FBQyxDQUFDLEtBQUtILFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q00sa0JBSjNDO0FBTUQ7OztpQkFFRCxtQ0FBdUI7QUFDckIsaUJBQUtSLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q0MsZUFBdkMsR0FBeURDLGdEQUFTTyxXQUFULENBQ3ZELElBRHVELENBQXpEO0FBR0Q7OztpQkFFRCxzQ0FBMEI7QUFDeEIsaUJBQUtYLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q00sa0JBQXZDLEdBQTRESixnREFBU08sV0FBVCxDQUMxRCxJQUQwRCxDQUE1RDtBQUdEOzs7aUJBRUssZ0NBQW9COzs7Ozs7O0FBQ2xCTSx5Q0FBbUIsS0FBS2pCLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCaUIsV0FBMUIsR0FDckJDLDRDQUNFLEtBQUtuQixZQUFMLENBQWtCQyxPQUFsQixDQUEwQmlCLFdBQTFCLENBQXNDRSxRQUR4QyxFQUVFLEtBQUtwQixZQUFMLENBQWtCQyxPQUFsQixDQUEwQmlCLFdBQTFCLENBQXNDRyxTQUZ4QyxDQURxQixHQUtyQjtBQUNFQyxvQ0FDSixLQUFLdEIsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDcUIsUUFBdkMsSUFDQSxLQUFLdkIsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDc0IsU0FEdkMsR0FFSUwsNENBQ0UsS0FBS25CLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q3FCLFFBRHpDLEVBRUUsS0FBS3ZCLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q3NCLFNBRnpDLENBRkosR0FNSTtBQUNBQyxrQ0FDSixLQUFLekIsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDd0IsT0FBdkMsSUFDQSxLQUFLMUIsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDeUIsUUFEdkMsR0FFSVIsNENBQ0UsS0FBS25CLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q3dCLE9BRHpDLEVBRUUsS0FBSzFCLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q3lCLFFBRnpDLENBRkosR0FNSTs7QUFDUSw2QkFBTSxLQUFLN0IsZUFBTCxDQUFxQjhCLE1BQXJCLENBQTRCO0FBQzlDL0MsaUNBQVMsRUFBRWdELHlHQURtQztBQUU5Q0Msc0NBQWMsRUFBRTtBQUNkYiwwQ0FBZ0IsRUFBaEJBLGdCQURjO0FBRWRLLHFDQUFXLEVBQVhBLFdBRmM7QUFHZEcsbUNBQVMsRUFBVEEsU0FIYztBQUlkTSxtQ0FBUyxFQUFFLEtBQUsvQixZQUFMLENBQWtCK0I7QUFKZjtBQUY4Qix1QkFBNUIsQ0FBTjs7O0FBQVJDO0FBU05BLDJCQUFLLENBQUNDLE9BQU47O0FBQ2UsNkJBQU1ELEtBQUssQ0FBQ0UsWUFBTixFQUFOOzs7QUFBVEM7O0FBQ04sMEJBQUlBLE1BQU0sQ0FBQ0MsSUFBWCxFQUFpQjtBQUNUQyw2QkFEUyxHQUNTRixNQUFNLENBQUNDLElBQVAsQ0FBWUMsS0FEckI7QUFFVEMsMkJBRlMsR0FFT0gsTUFBTSxDQUFDQyxJQUFQLENBQVlFLEdBRm5CO0FBR2YsNkJBQUt0QyxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNxQixRQUF2QyxHQUFrRGMsS0FBSyxDQUFDRSxHQUF4RDtBQUNBLDZCQUFLdkMsWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDc0IsU0FBdkMsR0FBbURhLEtBQUssQ0FBQ0csR0FBekQ7QUFDQSw2QkFBS3hDLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCQyxZQUExQixDQUF1Q3dCLE9BQXZDLEdBQWlEWSxHQUFHLENBQUNDLEdBQXJEO0FBQ0EsNkJBQUt2QyxZQUFMLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUN5QixRQUF2QyxHQUFrRFcsR0FBRyxDQUFDRSxHQUF0RDtBQUNEOzs7Ozs7Ozs7QUFDRjs7OztRQW5KbUNDOzs7eUJBQXpCOUMsbUJBQWdCSDtBQUFBOzs7Y0FBaEJHO0FBQWdCK0M7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRGY3QnZEOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBRUFBOztBQUNFQTs7QUFzR0ZBOztBQUNBQTs7OztBQTdHTUE7O0FBQUFBOztBQU0rQkE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsicm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsIl9sYW5kc2xpZGVfb2JzX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImNhbkRlYWN0aXZhdGUiLCJfY2FuX2RlYWN0aXZhdGVfcm91dGVfZ3VhcmRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIkxhbmRzbGlkZU9ic1BhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfYWRkX3dlYl91cmxfbW9kYWxfYWRkX3dlYl91cmxfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfc2V0X2F2YWxhbmNoZV9wb3NpdGlvbl9zZXRfYXZhbGFuY2hlX3Bvc2l0aW9uX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJkZWNsYXJhdGlvbnMiLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTJfXyIsImN0eF9yMCIsIl9yMSIsIkxhbmRzbGlkZU9ic1BhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsIm1vZGFsQ29udHJvbGxlciIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsInJlZ2lzdHJhdGlvbiIsInJlcXVlc3QiLCJMYW5kU2xpZGVPYnMiLCJEdExhbmRTbGlkZVRpbWUiLCJtb21lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfX19kZWZhdWx0Iiwic3RhcnRPZiIsImlzU2FtZSIsIkR0T2JzVGltZSIsIkR0TGFuZFNsaWRlVGltZUVuZCIsIlVybHMiLCJtYXhEYXRlU3RhcnQiLCJ0b0lTT1N0cmluZyIsImdldE1heERhdGVGb3JOb3ciLCJtaW5EYXRlRW5kIiwibWF4RGF0ZUVuZCIsImlzQmVmb3JlIiwiaXNBZnRlciIsInJlbGF0aXZlVG9MYXRMbmciLCJPYnNMb2NhdGlvbiIsImxlYWZsZXRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIkxhdGl0dWRlIiwiTG9uZ2l0dWRlIiwic3RhcnRMYXRMbmciLCJTdGFydExhdCIsIlN0YXJ0TG9uZyIsImVuZExhdExuZyIsIlN0b3BMYXQiLCJTdG9wTG9uZyIsImNyZWF0ZSIsIl9zZXRfYXZhbGFuY2hlX3Bvc2l0aW9uX3NldF9hdmFsYW5jaGVfcG9zaXRpb25fcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiY29tcG9uZW50UHJvcHMiLCJnZW9IYXphcmQiLCJtb2RhbCIsInByZXNlbnQiLCJvbkRpZERpc21pc3MiLCJyZXN1bHQiLCJkYXRhIiwic3RhcnQiLCJlbmQiLCJsYXQiLCJsbmciLCJfYmFzZV9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJzZWxlY3RvcnMiLCJmZWF0dXJlcyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIl0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2RpcnQvbGFuZHNsaWRlLW9icy9sYW5kc2xpZGUtb2JzLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9kaXJ0L2xhbmRzbGlkZS1vYnMvbGFuZHNsaWRlLW9icy5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGlydC9sYW5kc2xpZGUtb2JzL2xhbmRzbGlkZS1vYnMucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBMYW5kc2xpZGVPYnNQYWdlIH0gZnJvbSAnLi9sYW5kc2xpZGUtb2JzLnBhZ2UnO1xyXG5pbXBvcnQgeyBDYW5EZWFjdGl2YXRlUm91dGVHdWFyZCB9IGZyb20gJy4uLy4uL2Nhbi1kZWFjdGl2YXRlLXJvdXRlLmd1YXJkJztcclxuaW1wb3J0IHsgQWRkV2ViVXJsTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vYWRkLXdlYi11cmwtbW9kYWwvYWRkLXdlYi11cmwtbW9kYWwubW9kdWxlJztcclxuaW1wb3J0IHsgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogTGFuZHNsaWRlT2JzUGFnZSxcclxuICAgIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBBZGRXZWJVcmxNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBTZXRBdmFsYW5jaGVQb3NpdGlvblBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbTGFuZHNsaWRlT2JzUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIExhbmRzbGlkZU9ic1BhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24gJiYgcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzXCJcclxuICAgIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCIgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiAocmVzZXQpPVwicmVzZXQoKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJzZXRMYW5kc2xpZGVQb3NpdGlvbigpXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuUE9TSVRJT04nIHxcclxuICAgICAgICAgICAgICB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cInBvc2l0aW9uLXBpblwiIGNvbG9yPVwibWVkaXVtXCIgbmFtZT1cImxvY2F0aW9uXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RhcnRMYXQgZWxzZSBub1Bvc2l0aW9uXCI+XHJcbiAgICAgICAgICAgIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExhdCB8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5OT1JUSF9TSE9SVCd8dHJhbnNsYXRlfX0sXHJcbiAgICAgICAgICAgIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExvbmcgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLkVBU1RfU0hPUlQnfHRyYW5zbGF0ZX19IC0ge3sgcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMYXQgfFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19JmRlZzt7eydNQVBfQ0VOVEVSX0lORk8uTk9SVEhfU0hPUlQnfHRyYW5zbGF0ZX19LFxyXG4gICAgICAgICAgICB7eyByZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExvbmcgfCBudW1iZXI6JzAuMydcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLkVBU1RfU0hPUlQnfHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgY2xhc3M9XCJpdGVtLWRldGFpbC1pY29uXCIgbmFtZT1cImNoZXZyb24tZm9yd2FyZFwiPlxyXG4gICAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbSBbbmdDbGFzc109XCJ7J2hhc1dhcm5pbmcnOiBkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZX1cIj5cclxuICAgICAgICA8aW9uLWxhYmVsIFtjb2xvcl09XCIhcmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSA/ICdkYW5nZXInIDogJ21lZGl1bSdcIiBwb3NpdGlvbj1cInN0YWNrZWRcIlxyXG4gICAgICAgICAgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57e1xyXG4gICAgICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkRUX0xBTkRfU0xJREVfVElNRScgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLWRhdGV0aW1lIGNvbG9yPVwibWVkaXVtXCIgW21heF09XCJtYXhEYXRlU3RhcnRcIiBtb250aFNob3J0TmFtZXM9XCJ7eyAnTU9OVEhTLlNIT1JUX0xJU1QnIHwgdHJhbnNsYXRlIH19XCJcclxuICAgICAgICAgIGRvbmVUZXh0PVwie3snRElBTE9HUy5PSycgfCB0cmFuc2xhdGV9fVwiIGNhbmNlbFRleHQ9XCJ7eydESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGV9fVwiXHJcbiAgICAgICAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWSBISDptbVwiIFsobmdNb2RlbCldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZVwiXHJcbiAgICAgICAgICAoaW9uQ2hhbmdlKT1cImR0VGltZUNoYW5nZWQoKVwiPlxyXG4gICAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwic2V0LXRvLW5vdy1idXR0b25cIiBzbG90PVwiZW5kXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cIm1lZGl1bVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic2V0RHRMYW5kU2xpZGVUaW1lVG9Ob3coKVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0aW1lXCI+PC9pb24taWNvbj4ge3tcIlJFR0lTVFJBVElPTi5TRVRfVElNRS5OT1dcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0gKm5nSWY9XCJkYXRlSXNEaWZmZXJlbnRUaGFuT2JzVGltZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJkYW5nZXJcIiBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7J0FMRVJULldBUk5JTkcnIHwgdHJhbnNsYXRlfX0hIHt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5EQVRFX1dBUk5JTkcnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVFbmRJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgW2NvbG9yXT1cIiFyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kID8gJ2RhbmdlcicgOiAnbWVkaXVtJ1wiXHJcbiAgICAgICAgICBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7XHJcbiAgICAgICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRFRfTEFORF9TTElERV9USU1FX0VORCcgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLWRhdGV0aW1lIFttaW5dPVwibWluRGF0ZUVuZFwiIFttYXhdPVwibWF4RGF0ZUVuZFwiIGNvbG9yPVwibWVkaXVtXCJcclxuICAgICAgICAgIG1vbnRoU2hvcnROYW1lcz1cInt7ICdNT05USFMuU0hPUlRfTElTVCcgfCB0cmFuc2xhdGUgfX1cIiBkb25lVGV4dD1cInt7J0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlfX1cIlxyXG4gICAgICAgICAgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCIgKGlvbkNoYW5nZSk9XCJkdEVuZFRpbWVDaGFuZ2VkKClcIlxyXG4gICAgICAgICAgZGlzcGxheS1mb3JtYXQ9XCJELiBNTU0sIFlZWVkgSEg6bW1cIiBbKG5nTW9kZWwpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmRcIj5cclxuICAgICAgICA8L2lvbi1kYXRldGltZT5cclxuICAgICAgICA8aW9uLWJ1dHRvbiBjbGFzcz1cInNldC10by1ub3ctYnV0dG9uXCIgc2xvdD1cImVuZFwiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJtZWRpdW1cIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNldER0TGFuZFNsaWRlVGltZUVuZFRvTm93KClcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidGltZVwiPjwvaW9uLWljb24+IHt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuTk9XXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwiZGF0ZUVuZElzRGlmZmVyZW50VGhhbk9ic1RpbWVcIj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNvbG9yPVwiZGFuZ2VyXCIgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICB7eydBTEVSVC5XQVJOSU5HJyB8IHRyYW5zbGF0ZX19ISB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuREFURV9XQVJOSU5HJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkxBTkRTTElERV9UWVBFXCIga2R2S2V5PVwiRGlydF9MYW5kU2xpZGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5MYW5kU2xpZGVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5ERVNUUlVDVElWRV9TSVpFXCIga2R2S2V5PVwiRGlydF9MYW5kU2xpZGVTaXplS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuTGFuZFNsaWRlU2l6ZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkFWQUxfVFJJR0dFUlwiIGtkdktleT1cIkRpcnRfTGFuZFNsaWRlVHJpZ2dlcktEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkxhbmRTbGlkZVRyaWdnZXJUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5ESVJUX0FDVElWSVRZX0lORkxVRU5DRURcIlxyXG4gICAgICAgIGtkdktleT1cIkRpcnRfQWN0aXZpdHlJbmZsdWVuY2VkS0RWXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkFjdGl2aXR5SW5mbHVlbmNlZFRJRFwiPlxyXG4gICAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5EQU1BR0VfRVhURU5UXCIga2R2S2V5PVwiRGFtYWdlRXh0ZW50S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRGFtYWdlRXh0ZW50VElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuRElSVF9GT1JFQ0FTVF9BQ0NVUkFURVwiIGtkdktleT1cIkZvcmVjYXN0QWNjdXJhdGVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5Gb3JlY2FzdEFjY3VyYXRlVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkdFTkVSQUxfQ09NTUVOVC5DT01NRU5UX1RJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuQ29tbWVudFwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eydSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfUExBQ0VIT0xERVInIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX0lNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiXHJcbiAgICAgICAgW29uQmVmb3JlQWRkXT1cImdldFNhdmVGdW5jKClcIj5cclxuICAgICAgPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9XRUJfVVJMLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC13ZWItdXJsLWl0ZW0gWyh3ZWJ1cmxzKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuVXJsc1wiPjwvYXBwLWFkZC13ZWItdXJsLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbm9Qb3NpdGlvbj5cclxuICB7eyAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU0VUX0xBTkRTTElERV9QT1NJVElPTicgfCB0cmFuc2xhdGUgfX0ge3tcclxuICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLklOX01BUCcgfCB0cmFuc2xhdGUgfX1cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZSB9IGZyb20gJy4uLy4uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWxhbmRzbGlkZS1vYnMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYW5kc2xpZGUtb2JzLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGFuZHNsaWRlLW9icy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGFuZHNsaWRlT2JzUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBtYXhEYXRlU3RhcnQ6IHN0cmluZztcclxuICBtYXhEYXRlRW5kOiBzdHJpbmc7XHJcbiAgbWluRGF0ZUVuZDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlclxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkxhbmRTbGlkZU9icywgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0ZUlzRGlmZmVyZW50VGhhbk9ic1RpbWUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUgJiZcclxuICAgICAgIW1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ2RheScpXHJcbiAgICAgICAgLmlzU2FtZShtb21lbnQodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUpLnN0YXJ0T2YoJ2RheScpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRlRW5kSXNEaWZmZXJlbnRUaGFuT2JzVGltZSgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZCAmJlxyXG4gICAgICAhbW9tZW50KHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZClcclxuICAgICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgICAuaXNTYW1lKG1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZSkuc3RhcnRPZignZGF5JykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5VcmxzKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlVybHMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmQpIHtcclxuICAgICAgdGhpcy5tYXhEYXRlU3RhcnQgPSBtb21lbnQoXHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kXHJcbiAgICAgICkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1heERhdGVTdGFydCA9IHRoaXMuZ2V0TWF4RGF0ZUZvck5vdygpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSkge1xyXG4gICAgICB0aGlzLm1pbkRhdGVFbmQgPSBtb21lbnQoXHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lXHJcbiAgICAgICkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1heERhdGVFbmQgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICB9XHJcblxyXG4gIGdldE1heERhdGVGb3JOb3coKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHNldHRpbmcgbWF4IGRhdGUgdGhhdCB3aGVuIGNoYW5naW5nIGhvdXIsIHRoZSBtaW51dGVzIGlzIHN0aWxsIG1heCBtaW51dGVzLlxyXG4gICAgLy8gV29ya2Fyb3VuZCBpcyB0byBzZXQgbWludXRlcyB0byA1OS5cclxuICAgIHJldHVybiBtb21lbnQoKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICB9XHJcblxyXG4gIGR0VGltZUNoYW5nZWQoKSB7XHJcbiAgICB0aGlzLm1pbkRhdGVFbmQgPSBtb21lbnQoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZVxyXG4gICAgKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lRW5kICYmXHJcbiAgICAgIG1vbWVudChcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmRcclxuICAgICAgKS5pc0JlZm9yZShtb21lbnQodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lKSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWVFbmQgPSB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkdEVuZFRpbWVDaGFuZ2VkKCkge1xyXG4gICAgdGhpcy5tYXhEYXRlU3RhcnQgPSBtb21lbnQoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZFxyXG4gICAgKS50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lICYmXHJcbiAgICAgIG1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5EdExhbmRTbGlkZVRpbWUpLmlzQWZ0ZXIoXHJcbiAgICAgICAgbW9tZW50KHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZClcclxuICAgICAgKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzVmFsaWQoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icyAmJlxyXG4gICAgICAhIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZSAmJlxyXG4gICAgICAhIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldER0TGFuZFNsaWRlVGltZVRvTm93KCkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuRHRMYW5kU2xpZGVUaW1lID0gbW9tZW50KCkudG9JU09TdHJpbmcoXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXREdExhbmRTbGlkZVRpbWVFbmRUb05vdygpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLkR0TGFuZFNsaWRlVGltZUVuZCA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKFxyXG4gICAgICB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2V0TGFuZHNsaWRlUG9zaXRpb24oKSB7XHJcbiAgICBjb25zdCByZWxhdGl2ZVRvTGF0TG5nID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvblxyXG4gICAgICA/IEwubGF0TG5nKFxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5MYXRpdHVkZSxcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9uZ2l0dWRlXHJcbiAgICAgICAgKVxyXG4gICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBzdGFydExhdExuZyA9XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TGF0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TG9uZ1xyXG4gICAgICAgID8gTC5sYXRMbmcoXHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TGF0LFxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExvbmdcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBlbmRMYXRMbmcgPVxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdG9wTGF0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMb25nXHJcbiAgICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExhdCxcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5MYW5kU2xpZGVPYnMuU3RvcExvbmdcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlLFxyXG4gICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgIHJlbGF0aXZlVG9MYXRMbmcsXHJcbiAgICAgICAgc3RhcnRMYXRMbmcsXHJcbiAgICAgICAgZW5kTGF0TG5nLFxyXG4gICAgICAgIGdlb0hhemFyZDogdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgY29uc3Qgc3RhcnQ6IEwuTGF0TG5nID0gcmVzdWx0LmRhdGEuc3RhcnQ7XHJcbiAgICAgIGNvbnN0IGVuZDogTC5MYXRMbmcgPSByZXN1bHQuZGF0YS5lbmQ7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0YXJ0TGF0ID0gc3RhcnQubGF0O1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdGFydExvbmcgPSBzdGFydC5sbmc7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuTGFuZFNsaWRlT2JzLlN0b3BMYXQgPSBlbmQubGF0O1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkxhbmRTbGlkZU9icy5TdG9wTG9uZyA9IGVuZC5sbmc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==