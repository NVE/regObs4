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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_avalanche-obs_avalanche-obs_module_ts"], {
    /***/
    16823: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheObsPageModule": function AvalancheObsPageModule() {
          return (
            /* binding */
            _AvalancheObsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _avalanche_obs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./avalanche-obs.page */
      67055);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
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
        component: _avalanche_obs_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheObsPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateRouteGuard]
      }];

      var _AvalancheObsPageModule = function _AvalancheObsPageModule() {
        _classCallCheck(this, _AvalancheObsPageModule);
      };

      _AvalancheObsPageModule.ɵfac = function AvalancheObsPageModule_Factory(t) {
        return new (t || _AvalancheObsPageModule)();
      };

      _AvalancheObsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _AvalancheObsPageModule
      });
      _AvalancheObsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule, _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_AvalancheObsPageModule, {
          declarations: [_avalanche_obs_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheObsPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_3__.AddWebUrlModalPageModule, _set_avalanche_position_set_avalanche_position_module__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    67055: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheObsPage": function AvalancheObsPage() {
          return (
            /* binding */
            _AvalancheObsPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! tslib */
      3786);
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


      var leaflet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../set-avalanche-position/set-avalanche-position.page */
      71022);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../components/numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../../../components/add-web-url-item/add-web-url-item.component */
      15248);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AvalancheObsPage_app_registration_content_wrapper_8_ion_item_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "ion-label", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
        }
      }

      function AvalancheObsPage_app_registration_content_wrapper_8_ng_container_25_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](4, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](6, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](8, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate8"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](2, 8, ctx_r4.registration.request.AvalancheObs.StartLat, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](3, 11, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](4, 13, ctx_r4.registration.request.AvalancheObs.StartLong, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](5, 16, "MAP_CENTER_INFO.EAST_SHORT"), " - ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](6, 18, ctx_r4.registration.request.AvalancheObs.StopLat, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](7, 21, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](8, 23, ctx_r4.registration.request.AvalancheObs.StopLong, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](9, 26, "MAP_CENTER_INFO.EAST_SHORT"), " ");
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "hasWarning": a0
        };
      };

      function AvalancheObsPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "app-registration-content-wrapper", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("reset", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r5.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "ion-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](10, "ion-datetime", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("ngModelChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_ion_datetime_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r7.registration.request.AvalancheObs.DtAvalancheTime = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](13, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](14, "ion-button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function AvalancheObsPage_app_registration_content_wrapper_8_Template_ion_button_click_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r8.setAvalancheTimeTimeToNow();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](15, "ion-icon", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](17, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](18, AvalancheObsPage_app_registration_content_wrapper_8_ion_item_18_Template, 5, 6, "ion-item", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](19, "ion-item", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function AvalancheObsPage_app_registration_content_wrapper_8_Template_ion_item_click_19_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r9.setAvalanchePosition();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](20, "ion-label", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](21);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](22, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](23, "ion-text", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](24, "ion-icon", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](25, AvalancheObsPage_app_registration_content_wrapper_8_ng_container_25_Template, 10, 28, "ng-container", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](26, "ion-icon", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](27, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](28, "ion-label", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](30, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](31, "app-select", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("selectedValueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_select_selectedValueChange_31_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r10.registration.request.AvalancheObs.ValidExposition = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](32, "app-kdv-select", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_32_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r11.registration.request.AvalancheObs.DestructiveSizeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](33, "app-kdv-select", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_33_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r12.registration.request.AvalancheObs.AvalancheTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](34, "app-kdv-select", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_34_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r13.registration.request.AvalancheObs.AvalancheTriggerTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](35, "app-kdv-select", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_35_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r14.registration.request.AvalancheObs.TerrainStartZoneTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](36, "app-kdv-select", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_36_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r15.registration.request.AvalancheObs.AvalCauseTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](37, "app-numeric-input", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_37_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r16.registration.request.AvalancheObs.FractureHeight = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](38, "app-numeric-input", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_38_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r17.registration.request.AvalancheObs.FractureWidth = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](39, "app-text-comment", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_39_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r18.registration.request.AvalancheObs.Trajectory = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](40, "app-text-comment", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_40_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r19.registration.request.AvalancheObs.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](41, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](42, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](43);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](44, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](45, "app-add-picture-item", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](46, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](47, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](48);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](49, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](50, "app-text-comment", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_50_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r20.registration.request.Incident.IncidentText = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](51, "app-kdv-select", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_51_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r21.registration.request.Incident.ActivityInfluencedTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](52, "app-kdv-select", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("valueChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_52_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r22.registration.request.Incident.DamageExtentTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](53, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](54, "ion-label", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](55);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](56, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](57, "ion-list-header", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](58, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](59);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](60, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](61, "app-add-web-url-item", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("weburlsChange", function AvalancheObsPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_61_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r6);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

            return ctx_r23.registration.request.Incident.IncidentURLs = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵreference"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](5, 48, "REGISTRATION.SNOW.AVALANCHE_OBS.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](72, _c0, ctx_r0.dateIsDifferentThanObsTime));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("color", !ctx_r0.registration.request.AvalancheObs.DtAvalancheTime && ctx_r0.showWarning ? "danger" : "medium");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](9, 50, "REGISTRATION.SNOW.AVALANCHE_OBS.TIME"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](11, 52, "MONTHS.SHORT_LIST"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](12, 54, "DIALOGS.OK"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](13, 56, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngModel", ctx_r0.registration.request.AvalancheObs.DtAvalancheTime)("max", ctx_r0.maxDate);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](17, 58, "REGISTRATION.SET_TIME.NOW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r0.dateIsDifferentThanObsTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](22, 60, "REGISTRATION.SNOW.AVALANCHE_OBS.POSITION"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r0.registration.request.AvalancheObs.StartLat)("ngIfElse", _r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](30, 62, "REGISTRATION.SNOW.AVALANCHE_OBS.VALID_EXPOSITION"));

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("selectedValue", ctx_r0.registration.request.AvalancheObs.ValidExposition)("options", ctx_r0.expoArray);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.DestructiveSizeTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.AvalancheTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.AvalancheTriggerTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.TerrainStartZoneTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.AvalCauseTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.FractureHeight)("min", 0)("max", 9999)("decimalPlaces", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.FractureWidth)("min", 0)("max", 99999)("decimalPlaces", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("max", 100)("rows", 2)("value", ctx_r0.registration.request.AvalancheObs.Trajectory);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.AvalancheObs.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](44, 64, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](49, 66, "REGISTRATION.SNOW.AVALANCHE_OBS.INCIDENT_DESCRIPTION"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.IncidentText);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.ActivityInfluencedTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.DamageExtentTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](56, 68, "REGISTRATION.SNOW.AVALANCHE_OBS.INCIDENT_PLACEHOLDER"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](60, 70, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("weburls", ctx_r0.registration.request.Incident.IncidentURLs);
        }
      }

      function AvalancheObsPage_ng_template_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](1, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](1, 2, "REGISTRATION.SNOW.AVALANCHE_OBS.SET_AVALANCHE_POSITION"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 4, "REGISTRATION.DIRT.LAND_SLIDE_OBS.IN_MAP"), "\n");
        }
      }

      var _AvalancheObsPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_AvalancheObsPage, _base_page__WEBPACK_I);

        var _super = _createSuper(_AvalancheObsPage);

        function _AvalancheObsPage(basePageService, activatedRoute, modalController) {
          var _this;

          _classCallCheck(this, _AvalancheObsPage);

          _this = _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.AvalancheObs, basePageService, activatedRoute);
          _this.modalController = modalController;
          _this.expoArray = [{
            text: 'DIRECTION.N',
            id: '10000000'
          }, {
            text: 'DIRECTION.NE',
            id: '01000000'
          }, {
            text: 'DIRECTION.E',
            id: '00100000'
          }, {
            text: 'DIRECTION.SE',
            id: '00010000'
          }, {
            text: 'DIRECTION.S',
            id: '00001000'
          }, {
            text: 'DIRECTION.SW',
            id: '00000100'
          }, {
            text: 'DIRECTION.W',
            id: '00000010'
          }, {
            text: 'DIRECTION.NW',
            id: '00000001'
          }];
          _this.showWarning = false;
          return _this;
        }

        _createClass(_AvalancheObsPage, [{
          key: "dateIsDifferentThanObsTime",
          get: function get() {
            return this.registration.request.AvalancheObs.DtAvalancheTime && !moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.AvalancheObs.DtAvalancheTime).startOf('day').isSame(moment__WEBPACK_IMPORTED_MODULE_5___default()(this.registration.request.DtObsTime).startOf('day'));
          }
        }, {
          key: "onInit",
          value: function onInit() {
            if (!this.registration.request.Incident) {
              this.registration.request.Incident = {};
            }

            this.maxDate = this.getMaxDateForNow();
          }
        }, {
          key: "getMaxDateForNow",
          value: function getMaxDateForNow() {
            // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
            // Workaround is to set minutes to 59.
            return moment__WEBPACK_IMPORTED_MODULE_5___default()().minutes(59).toISOString(true);
          }
        }, {
          key: "onReset",
          value: function onReset() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.showWarning = false; // Also reset Incident when Avalanche obs is reset.

                      _context.next = 3;
                      return this.basePageService.reset(this.registration, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.Incident);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "isValid",
          value: function isValid() {
            this.showWarning = true;
            return !!this.registration.request.AvalancheObs.DtAvalancheTime;
          }
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var isEmpty, isIncidentEmpty;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.take)(1)).toPromise();

                    case 2:
                      isEmpty = !_context2.sent;
                      _context2.next = 5;
                      return this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.Incident).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.take)(1)).toPromise();

                    case 5:
                      isIncidentEmpty = !_context2.sent;
                      return _context2.abrupt("return", isEmpty && isIncidentEmpty);

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "setAvalancheTimeTimeToNow",
          value: function setAvalancheTimeTimeToNow() {
            this.registration.request.AvalancheObs.DtAvalancheTime = moment__WEBPACK_IMPORTED_MODULE_5___default()().toISOString(true);
          }
        }, {
          key: "setAvalanchePosition",
          value: function setAvalanchePosition() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var relativeToLatLng, startLatLng, endLatLng, modal, result, start, end;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      relativeToLatLng = this.registration.request.ObsLocation ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
                      startLatLng = this.registration.request.AvalancheObs.StartLat && this.registration.request.AvalancheObs.StartLong ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.AvalancheObs.StartLat, this.registration.request.AvalancheObs.StartLong) : null;
                      endLatLng = this.registration.request.AvalancheObs.StopLat && this.registration.request.AvalancheObs.StopLong ? leaflet__WEBPACK_IMPORTED_MODULE_3__.latLng(this.registration.request.AvalancheObs.StopLat, this.registration.request.AvalancheObs.StopLong) : null;
                      _context3.next = 5;
                      return this.modalController.create({
                        component: _set_avalanche_position_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_4__.SetAvalanchePositionPage,
                        componentProps: {
                          relativeToLatLng: relativeToLatLng,
                          startLatLng: startLatLng,
                          endLatLng: endLatLng,
                          geoHazard: this.registration.geoHazard
                        }
                      });

                    case 5:
                      modal = _context3.sent;
                      modal.present();
                      _context3.next = 9;
                      return modal.onDidDismiss();

                    case 9:
                      result = _context3.sent;

                      if (result.data) {
                        start = result.data.start;
                        end = result.data.end;
                        this.registration.request.AvalancheObs.StartLat = start.lat;
                        this.registration.request.AvalancheObs.StartLong = start.lng;
                        this.registration.request.AvalancheObs.StopLat = end.lat;
                        this.registration.request.AvalancheObs.StopLong = end.lng;
                      }

                    case 11:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return _AvalancheObsPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _AvalancheObsPage.ɵfac = function AvalancheObsPage_Factory(t) {
        return new (t || _AvalancheObsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.ModalController));
      };

      _AvalancheObsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
        type: _AvalancheObsPage,
        selectors: [["app-avalanche-obs"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵInheritDefinitionFeature"]],
        decls: 11,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], ["noPosition", ""], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "ngClass"], ["position", "stacked", 1, "ion-text-uppercase", 3, "color"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "monthShortNames", "doneText", "cancelText", "ngModel", "max", "ngModelChange"], ["slot", "end", "fill", "outline", "color", "medium", 1, "set-to-now-button", 3, "click"], ["slot", "start", "name", "time"], [4, "ngIf"], [3, "click"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["color", "medium", 1, "ion-align-self-start", "ion-text-wrap"], ["color", "medium", "name", "location", 1, "position-pin"], [4, "ngIf", "ngIfElse"], ["slot", "end", "name", "chevron-forward", 1, "item-detail-icon"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.VALID_EXPOSITION", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.DESTRUCTIVE_SIZE", "kdvKey", "Snow_DestructiveSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_TYPE", "kdvKey", "Snow_AvalancheKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_TRIGGER", "kdvKey", "Snow_AvalancheTriggerKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.TERRAIN_START_ZONE", "kdvKey", "Snow_TerrainStartZoneKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.AVAL_CAUSE", "kdvKey", "Snow_AvalCauseKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.FRACTURE_HEIGTH", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.FRACTURE_WIDTH", "suffix", "m", 3, "value", "min", "max", "decimalPlaces", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.TRAJECTORY_NAME", 3, "max", "rows", "value", "valueChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["title", "REGISTRATION.INCIDENT.COMMENT", 3, "value", "valueChange"], ["title", "REGISTRATION.INCIDENT.ACTIVITY", "kdvKey", "Snow_ActivityInfluencedKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.INCIDENT.DAMAGE_EXTENT", "kdvKey", "DamageExtentKDV", 3, "value", "valueChange"], [1, "ion-text-wrap"], [3, "weburls", "weburlsChange"], ["color", "danger", 1, "ion-text-wrap"]],
        template: function AvalancheObsPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](8, AvalancheObsPage_app_registration_content_wrapper_8_Template, 62, 74, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](9, AvalancheObsPage_ng_template_9_Template, 3, 6, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.AVALANCHE_OBS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.AvalancheObs && ctx.registration.request.Incident);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonText, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_8__.SelectComponent, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_9__.KdvSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_10__.NumericInputComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_12__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItemDivider, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_13__.AddWebUrlItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_19__.DecimalPipe],
        styles: [".set-to-now-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n\n.position-pin[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  position: relative;\n  top: 3px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF2YWxhbmNoZS1vYnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtBQUNKOztBQUVBO0VBQ0ksV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7QUFDSiIsImZpbGUiOiJhdmFsYW5jaGUtb2JzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZXQtdG8tbm93LWJ1dHRvbiB7XHJcbiAgICB6LWluZGV4OiAyMDA7XHJcbn1cclxuXHJcbi5wb3NpdGlvbi1waW4ge1xyXG4gICAgd2lkdGg6IDIycHg7XHJcbiAgICBoZWlnaHQ6IDIycHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IDNweDtcclxufVxyXG4iXX0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFDRkE7O0FBQ0ZBOztBQUVBQTs7QUFDRUE7O0FBNEdGQTs7QUFDQUE7Ozs7QUFuSE1BOztBQUFBQTs7QUFPREE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsicm91dGVzIiwicGF0aCIsImNvbXBvbmVudCIsIl9hdmFsYW5jaGVfb2JzX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNhbkRlYWN0aXZhdGUiLCJfY2FuX2RlYWN0aXZhdGVfcm91dGVfZ3VhcmRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIkF2YWxhbmNoZU9ic1BhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfYWRkX3dlYl91cmxfbW9kYWxfYWRkX3dlYl91cmxfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfc2V0X2F2YWxhbmNoZV9wb3NpdGlvbl9zZXRfYXZhbGFuY2hlX3Bvc2l0aW9uX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJkZWNsYXJhdGlvbnMiLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTRfXyIsImN0eF9yMCIsIl9yMSIsIkF2YWxhbmNoZU9ic1BhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsIm1vZGFsQ29udHJvbGxlciIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsInRleHQiLCJpZCIsInJlZ2lzdHJhdGlvbiIsInJlcXVlc3QiLCJBdmFsYW5jaGVPYnMiLCJEdEF2YWxhbmNoZVRpbWUiLCJtb21lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfX19kZWZhdWx0Iiwic3RhcnRPZiIsImlzU2FtZSIsIkR0T2JzVGltZSIsIkluY2lkZW50IiwibWF4RGF0ZSIsImdldE1heERhdGVGb3JOb3ciLCJtaW51dGVzIiwidG9JU09TdHJpbmciLCJzaG93V2FybmluZyIsInJlc2V0IiwiQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsImhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzIiwicmVnaXN0cmF0aW9uVGlkIiwicGlwZSIsInRvUHJvbWlzZSIsImlzRW1wdHkiLCJpc0luY2lkZW50RW1wdHkiLCJyZWxhdGl2ZVRvTGF0TG5nIiwiT2JzTG9jYXRpb24iLCJsZWFmbGV0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJMYXRpdHVkZSIsIkxvbmdpdHVkZSIsInN0YXJ0TGF0TG5nIiwiU3RhcnRMYXQiLCJTdGFydExvbmciLCJlbmRMYXRMbmciLCJTdG9wTGF0IiwiU3RvcExvbmciLCJjcmVhdGUiLCJfc2V0X2F2YWxhbmNoZV9wb3NpdGlvbl9zZXRfYXZhbGFuY2hlX3Bvc2l0aW9uX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImNvbXBvbmVudFByb3BzIiwiZ2VvSGF6YXJkIiwibW9kYWwiLCJwcmVzZW50Iiwib25EaWREaXNtaXNzIiwicmVzdWx0IiwiZGF0YSIsInN0YXJ0IiwiZW5kIiwibGF0IiwibG5nIiwiX2Jhc2VfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwic2VsZWN0b3JzIiwiZmVhdHVyZXMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1vYnMvYXZhbGFuY2hlLW9icy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtb2JzL2F2YWxhbmNoZS1vYnMucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLW9icy9hdmFsYW5jaGUtb2JzLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVPYnNQYWdlIH0gZnJvbSAnLi9hdmFsYW5jaGUtb2JzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmQgfSBmcm9tICcuLi8uLi9jYW4tZGVhY3RpdmF0ZS1yb3V0ZS5ndWFyZCc7XHJcbmltcG9ydCB7IEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEF2YWxhbmNoZU9ic1BhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgQWRkV2ViVXJsTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F2YWxhbmNoZU9ic1BhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVPYnNQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXJcclxuICAgICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icyAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5JbmNpZGVudFwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWwgW2NvbG9yXT1cIighcmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLkR0QXZhbGFuY2hlVGltZSAmJiBzaG93V2FybmluZykgPyAnZGFuZ2VyJyA6ICdtZWRpdW0nXCJcclxuICAgICAgICAgIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3tcclxuICAgICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlRJTUUnIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPGlvbi1kYXRldGltZSBjb2xvcj1cIm1lZGl1bVwiIG1vbnRoU2hvcnROYW1lcz1cInt7ICdNT05USFMuU0hPUlRfTElTVCcgfCB0cmFuc2xhdGUgfX1cIlxyXG4gICAgICAgICAgZG9uZVRleHQ9XCJ7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XCIgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCJcclxuICAgICAgICAgIGRpc3BsYXktZm9ybWF0PVwiRC4gTU1NLCBZWVlZIEhIOm1tXCIgWyhuZ01vZGVsKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuRHRBdmFsYW5jaGVUaW1lXCJcclxuICAgICAgICAgIFttYXhdPVwibWF4RGF0ZVwiPlxyXG4gICAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgICAgIDxpb24tYnV0dG9uIGNsYXNzPVwic2V0LXRvLW5vdy1idXR0b25cIiBzbG90PVwiZW5kXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cIm1lZGl1bVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic2V0QXZhbGFuY2hlVGltZVRpbWVUb05vdygpXCI+XHJcbiAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInRpbWVcIj48L2lvbi1pY29uPiB7e1wiUkVHSVNUUkFUSU9OLlNFVF9USU1FLk5PV1wiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbSAqbmdJZj1cImRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cImRhbmdlclwiIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAge3snQUxFUlQuV0FSTklORycgfCB0cmFuc2xhdGV9fSEge3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkRBVEVfV0FSTklORycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cInNldEF2YWxhbmNoZVBvc2l0aW9uKClcIj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlBPU0lUSU9OJyB8XHJcbiAgICAgICAgICAgICAgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLXRleHQgY29sb3I9XCJtZWRpdW1cIiBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0IGlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjbGFzcz1cInBvc2l0aW9uLXBpblwiIGNvbG9yPVwibWVkaXVtXCIgbmFtZT1cImxvY2F0aW9uXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuU3RhcnRMYXQgZWxzZSBub1Bvc2l0aW9uXCI+XHJcbiAgICAgICAgICAgIHt7XHJcbiAgICAgICAgICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuU3RhcnRMYXQgfFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgICAgICAgICB9fSZkZWc7e3snTUFQX0NFTlRFUl9JTkZPLk5PUlRIX1NIT1JUJ3x0cmFuc2xhdGV9fSxcclxuICAgICAgICAgICAge3sgcmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0YXJ0TG9uZyB8IG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5FQVNUX1NIT1JUJ3x0cmFuc2xhdGV9fSAtIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdG9wTGF0IHxcclxuICAgICAgICAgICAgICAgIG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5OT1JUSF9TSE9SVCd8dHJhbnNsYXRlfX0sXHJcbiAgICAgICAgICAgIHt7IHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdG9wTG9uZyB8IG51bWJlcjonMC4zJ1xyXG4gICAgICAgICAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5FQVNUX1NIT1JUJ3x0cmFuc2xhdGV9fVxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiIGNsYXNzPVwiaXRlbS1kZXRhaWwtaWNvblwiIG5hbWU9XCJjaGV2cm9uLWZvcndhcmRcIj5cclxuICAgICAgICA8L2lvbi1pY29uPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3tcclxuICAgICAgICAgICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlZBTElEX0VYUE9TSVRJT04nXHJcbiAgICAgICAgICB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPGFwcC1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLlZBTElEX0VYUE9TSVRJT05cIlxyXG4gICAgICAgICAgWyhzZWxlY3RlZFZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuVmFsaWRFeHBvc2l0aW9uXCIgW29wdGlvbnNdPVwiZXhwb0FycmF5XCI+PC9hcHAtc2VsZWN0PlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLkRFU1RSVUNUSVZFX1NJWkVcIiBrZHZLZXk9XCJTbm93X0Rlc3RydWN0aXZlU2l6ZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLkRlc3RydWN0aXZlU2l6ZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuQVZBTEFOQ0hFX1RZUEVcIiBrZHZLZXk9XCJTbm93X0F2YWxhbmNoZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLkF2YWxhbmNoZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuQVZBTEFOQ0hFX1RSSUdHRVJcIiBrZHZLZXk9XCJTbm93X0F2YWxhbmNoZVRyaWdnZXJLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5BdmFsYW5jaGVUcmlnZ2VyVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5URVJSQUlOX1NUQVJUX1pPTkVcIiBrZHZLZXk9XCJTbm93X1RlcnJhaW5TdGFydFpvbmVLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5UZXJyYWluU3RhcnRab25lVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5BVkFMX0NBVVNFXCIga2R2S2V5PVwiU25vd19BdmFsQ2F1c2VLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5BdmFsQ2F1c2VUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLkZyYWN0dXJlSGVpZ2h0XCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuRlJBQ1RVUkVfSEVJR1RIXCIgW21pbl09XCIwXCIgW21heF09XCI5OTk5XCIgc3VmZml4PVwiY21cIiBbZGVjaW1hbFBsYWNlc109XCIwXCI+XHJcbiAgICAgIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuRnJhY3R1cmVXaWR0aFwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLkZSQUNUVVJFX1dJRFRIXCIgW21pbl09XCIwXCIgW21heF09XCI5OTk5OVwiIHN1ZmZpeD1cIm1cIiBbZGVjaW1hbFBsYWNlc109XCIwXCI+XHJcbiAgICAgIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5UUkFKRUNUT1JZX05BTUVcIiBbbWF4XT1cIjEwMFwiIFtyb3dzXT1cIjJcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5UcmFqZWN0b3J5XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIiBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuQ29tbWVudFwiPlxyXG4gICAgICA8L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLklOQ0lERU5UX0RFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JTkNJREVOVC5DT01NRU5UXCIgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSW5jaWRlbnQuSW5jaWRlbnRUZXh0XCI+XHJcbiAgICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLklOQ0lERU5ULkFDVElWSVRZXCIga2R2S2V5PVwiU25vd19BY3Rpdml0eUluZmx1ZW5jZWRLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50LkFjdGl2aXR5SW5mbHVlbmNlZFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5JTkNJREVOVC5EQU1BR0VfRVhURU5UXCIga2R2S2V5PVwiRGFtYWdlRXh0ZW50S0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JbmNpZGVudC5EYW1hZ2VFeHRlbnRUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5JTkNJREVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX1dFQl9VUkwuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXdlYi11cmwtaXRlbSBbKHdlYnVybHMpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50LkluY2lkZW50VVJMc1wiPjwvYXBwLWFkZC13ZWItdXJsLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbm9Qb3NpdGlvbj5cclxuICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5TRVRfQVZBTEFOQ0hFX1BPU0lUSU9OJyB8IHRyYW5zbGF0ZSB9fSB7e1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5JTl9NQVAnIHwgdHJhbnNsYXRlIH19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZSB9IGZyb20gJy4uLy4uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvY29tcG9uZW50cy9pbnB1dC9zZWxlY3Qvc2VsZWN0LW9wdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmFsYW5jaGUtb2JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXZhbGFuY2hlLW9icy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F2YWxhbmNoZS1vYnMucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZU9ic1BhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgZXhwb0FycmF5OiBTZWxlY3RPcHRpb25bXSA9IFtcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RJUkVDVElPTi5OJyxcclxuICAgICAgaWQ6ICcxMDAwMDAwMCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdESVJFQ1RJT04uTkUnLFxyXG4gICAgICBpZDogJzAxMDAwMDAwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RJUkVDVElPTi5FJyxcclxuICAgICAgaWQ6ICcwMDEwMDAwMCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdESVJFQ1RJT04uU0UnLFxyXG4gICAgICBpZDogJzAwMDEwMDAwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RJUkVDVElPTi5TJyxcclxuICAgICAgaWQ6ICcwMDAwMTAwMCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdESVJFQ1RJT04uU1cnLFxyXG4gICAgICBpZDogJzAwMDAwMTAwJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogJ0RJUkVDVElPTi5XJyxcclxuICAgICAgaWQ6ICcwMDAwMDAxMCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6ICdESVJFQ1RJT04uTlcnLFxyXG4gICAgICBpZDogJzAwMDAwMDAxJ1xyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIHNob3dXYXJuaW5nID0gZmFsc2U7XHJcbiAgbWF4RGF0ZTogc3RyaW5nO1xyXG5cclxuICBnZXQgZGF0ZUlzRGlmZmVyZW50VGhhbk9ic1RpbWUoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5EdEF2YWxhbmNoZVRpbWUgJiZcclxuICAgICAgIW1vbWVudCh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5EdEF2YWxhbmNoZVRpbWUpXHJcbiAgICAgICAgLnN0YXJ0T2YoJ2RheScpXHJcbiAgICAgICAgLmlzU2FtZShtb21lbnQodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUpLnN0YXJ0T2YoJ2RheScpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihSZWdpc3RyYXRpb25UaWQuQXZhbGFuY2hlT2JzLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JbmNpZGVudCkge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50ID0ge307XHJcbiAgICB9XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICB9XHJcblxyXG4gIGdldE1heERhdGVGb3JOb3coKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHNldHRpbmcgbWF4IGRhdGUgdGhhdCB3aGVuIGNoYW5naW5nIGhvdXIsIHRoZSBtaW51dGVzIGlzIHN0aWxsIG1heCBtaW51dGVzLlxyXG4gICAgLy8gV29ya2Fyb3VuZCBpcyB0byBzZXQgbWludXRlcyB0byA1OS5cclxuICAgIHJldHVybiBtb21lbnQoKS5taW51dGVzKDU5KS50b0lTT1N0cmluZyh0cnVlKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uUmVzZXQoKSB7XHJcbiAgICB0aGlzLnNob3dXYXJuaW5nID0gZmFsc2U7XHJcbiAgICAvLyBBbHNvIHJlc2V0IEluY2lkZW50IHdoZW4gQXZhbGFuY2hlIG9icyBpcyByZXNldC5cclxuICAgIGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLnJlc2V0KFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgUmVnaXN0cmF0aW9uVGlkLkluY2lkZW50XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZCgpIHtcclxuICAgIHRoaXMuc2hvd1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgcmV0dXJuICEhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuRHRBdmFsYW5jaGVUaW1lO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGNvbnN0IGlzRW1wdHkgPSAhYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApLnBpcGUodGFrZSgxKSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBpc0luY2lkZW50RW1wdHkgPSAhYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgICBSZWdpc3RyYXRpb25UaWQuSW5jaWRlbnRcclxuICAgICAgKS5waXBlKHRha2UoMSkpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIGlzRW1wdHkgJiYgaXNJbmNpZGVudEVtcHR5O1xyXG4gIH1cclxuXHJcbiAgc2V0QXZhbGFuY2hlVGltZVRpbWVUb05vdygpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLkR0QXZhbGFuY2hlVGltZSA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKFxyXG4gICAgICB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2V0QXZhbGFuY2hlUG9zaXRpb24oKSB7XHJcbiAgICBjb25zdCByZWxhdGl2ZVRvTGF0TG5nID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvblxyXG4gICAgICA/IEwubGF0TG5nKFxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5MYXRpdHVkZSxcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9uZ2l0dWRlXHJcbiAgICAgICAgKVxyXG4gICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBzdGFydExhdExuZyA9XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0YXJ0TGF0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0YXJ0TG9uZ1xyXG4gICAgICAgID8gTC5sYXRMbmcoXHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0YXJ0TGF0LFxyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdGFydExvbmdcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBlbmRMYXRMbmcgPVxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdG9wTGF0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0b3BMb25nXHJcbiAgICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuU3RvcExhdCxcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVPYnMuU3RvcExvbmdcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIGNvbXBvbmVudDogU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlLFxyXG4gICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgIHJlbGF0aXZlVG9MYXRMbmcsXHJcbiAgICAgICAgc3RhcnRMYXRMbmcsXHJcbiAgICAgICAgZW5kTGF0TG5nLFxyXG4gICAgICAgIGdlb0hhemFyZDogdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgY29uc3Qgc3RhcnQ6IEwuTGF0TG5nID0gcmVzdWx0LmRhdGEuc3RhcnQ7XHJcbiAgICAgIGNvbnN0IGVuZDogTC5MYXRMbmcgPSByZXN1bHQuZGF0YS5lbmQ7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0YXJ0TGF0ID0gc3RhcnQubGF0O1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdGFydExvbmcgPSBzdGFydC5sbmc7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlT2JzLlN0b3BMYXQgPSBlbmQubGF0O1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkF2YWxhbmNoZU9icy5TdG9wTG9uZyA9IGVuZC5sbmc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==