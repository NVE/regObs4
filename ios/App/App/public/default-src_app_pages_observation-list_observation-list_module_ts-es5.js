(function () {
  "use strict";

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_pages_observation-list_observation-list_module_ts"], {
    /***/
    85815: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FullscreenImageModalPageModule": function FullscreenImageModalPageModule() {
          return (
            /* binding */
            _FullscreenImageModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./fullscreen-image-modal.page */
      93675);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _FullscreenImageModalPageModule = function _FullscreenImageModalPageModule() {
        _classCallCheck(this, _FullscreenImageModalPageModule);
      };

      _FullscreenImageModalPageModule.ɵfac = function FullscreenImageModalPageModule_Factory(t) {
        return new (t || _FullscreenImageModalPageModule)();
      };

      _FullscreenImageModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: _FullscreenImageModalPageModule
      });
      _FullscreenImageModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](_FullscreenImageModalPageModule, {
          declarations: [_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_0__.FullscreenImageModalPage],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonicModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule]
        });
      })();
      /***/

    },

    /***/
    73442: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ObservationListPageModule": function ObservationListPageModule() {
          return (
            /* binding */
            _ObservationListPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _observation_list_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./observation-list.page */
      10543);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */
      85815);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _observation_list_page__WEBPACK_IMPORTED_MODULE_0__.ObservationListPage
      }];

      var _ObservationListPageModule = function _ObservationListPageModule() {
        _classCallCheck(this, _ObservationListPageModule);
      };

      _ObservationListPageModule.ɵfac = function ObservationListPageModule_Factory(t) {
        return new (t || _ObservationListPageModule)();
      };

      _ObservationListPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _ObservationListPageModule
      });
      _ObservationListPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_ObservationListPageModule, {
          declarations: [_observation_list_page__WEBPACK_IMPORTED_MODULE_0__.ObservationListPage],
          imports: [_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule, _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    10543: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ObservationListPage": function ObservationListPage() {
          return (
            /* binding */
            _ObservationListPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/observation/observation.service */
      83497);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _modules_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/map/services/map/map.service */
      29789);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _core_services_data_marshall_data_marshall_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../core/services/data-marshall/data-marshall.service */
      68727);
      /* harmony import */


      var src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/shared/components/header/header.component */
      24201);
      /* harmony import */


      var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */
      30164);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../modules/shared/components/geo-fab/geo-fab.component */
      49744);
      /* harmony import */


      var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../modules/shared/components/add-menu/add-menu.component */
      26331);
      /* harmony import */


      var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../components/observation/observation-list-card/observation-list-card.component */
      50388);
      /* harmony import */


      var _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../components/observation/observation-skeleton/observation-skeleton.component */
      47583);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function ObservationListPage_ng_container_4_ion_list_1_app_observation_list_card_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-observation-list-card", 12);
        }

        if (rf & 2) {
          var obs_r7 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("obs", obs_r7);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          loaded: a0
        };
      };

      function ObservationListPage_ng_container_4_ion_list_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-list", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h3", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, ObservationListPage_ng_container_4_ion_list_1_app_observation_list_card_5_Template, 1, 1, "app-observation-list-card", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](6, _c0, ctx_r4.loaded));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 4, "OBSERVATION_LIST.IN_MAP_VIEW"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngForOf", ctx_r4.visibleObservations)("ngForTrackBy", ctx_r4.trackByIdFunc);
        }
      }

      var _c1 = function _c1(a0) {
        return {
          maxCount: a0
        };
      };

      function ObservationListPage_ng_container_4_ion_row_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-row", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](5, "h3", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 2, "OBSERVATION_LIST.MAX_COUNT_REACHED_HEADER"));

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](7, 4, "OBSERVATION_LIST.MAX_COUNT_REACHED_TEXT", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](7, _c1, ctx_r5.maxCount)), "");
        }
      }

      function ObservationListPage_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ObservationListPage_ng_container_4_ion_list_1_Template, 6, 8, "ion-list", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-infinite-scroll", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionInfinite", function ObservationListPage_ng_container_4_Template_ion_infinite_scroll_ionInfinite_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

            return ctx_r8.loadNextPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "ion-infinite-scroll-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ObservationListPage_ng_container_4_ion_row_4_Template, 8, 9, "ion-row", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.visibleObservations.length > 0)("ngIfElse", _r2);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r0.maxCountReached);
        }
      }

      function ObservationListPage_div_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "h3", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 1, "OBSERVATION_LIST.IN_MAP_VIEW"));
        }
      }

      function ObservationListPage_ng_template_8_ion_grid_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-grid", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "ion-row", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-col", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](3, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](4, "svg-icon", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](5, "svg-icon", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "svg-icon", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "svg-icon", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](8, "ion-row", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](10, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](13, "h3", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](12, 2, "OBSERVATION_LIST.NO_OBSERVATIONS"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](15, 4, "OBSERVATION_LIST.NO_OBSERVATIONS_TEXT"));
        }
      }

      function ObservationListPage_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](0, ObservationListPage_ng_template_8_ion_grid_0_Template, 16, 6, "ion-grid", 17);
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r3.loaded);
        }
      }

      var PAGE_SIZE = 10;
      var MAX_OBSERVATION_COUNT = 100;

      var _ObservationListPage = /*#__PURE__*/function (_src_app_core_helpers) {
        _inherits(_ObservationListPage, _src_app_core_helpers);

        var _super = _createSuper(_ObservationListPage);

        function _ObservationListPage(observationService, dataMarshallService, cdr, mapService, userSettingService) {
          var _this;

          _classCallCheck(this, _ObservationListPage);

          _this = _super.call(this);
          _this.observationService = observationService;
          _this.dataMarshallService = dataMarshallService;
          _this.cdr = cdr;
          _this.mapService = mapService;
          _this.userSettingService = userSettingService;
          _this.loaded = false;
          _this.pageIndex = 0;
          _this.trackByIdFunc = _this.trackByIdFuncInternal.bind(_assertThisInitialized(_this));
          _this.refreshFunc = _this.refresh.bind(_assertThisInitialized(_this));
          return _this;
        }

        _createClass(_ObservationListPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.cancelSubject = this.dataMarshallService.observableCancelSubject;
            this.userSettingService.language$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(this.ngDestroy$)).subscribe(function (langKey) {
              _this2.langKey = langKey;
            });
          }
        }, {
          key: "refresh",
          value: function refresh(cancelPromise) {
            this.resetAndLoadObservations(true, cancelPromise);
          }
        }, {
          key: "ionViewWillEnter",
          value: function ionViewWillEnter() {
            this.content.scrollToTop();
            this.resetAndLoadObservations();
          }
        }, {
          key: "ionViewWillLeave",
          value: function ionViewWillLeave() {
            this.loaded = false;
            this.visibleObservations = undefined;
          }
        }, {
          key: "resetAndLoadObservations",
          value: function resetAndLoadObservations() {
            var forceUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var cancelPromise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.loaded = false;
                      this.visibleObservations = undefined;
                      this.cdr.detectChanges();

                      if (!forceUpdate) {
                        _context.next = 6;
                        break;
                      }

                      _context.next = 6;
                      return this.observationService.forceUpdateObservationsForCurrentGeoHazard(cancelPromise);

                    case 6:
                      this.loadObservations();

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "loadObservations",
          value: function loadObservations() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.getObservationsInMap();

                    case 2:
                      this.allObservations = _context2.sent;
                      this.total = this.allObservations.length;
                      this.pageIndex = 0;
                      this.visibleObservations = this.allObservations.slice(0, 10);
                      this.cdr.detectChanges();
                      setTimeout(function () {
                        _this3.loaded = true;
                        _this3.scroll.disabled = false;

                        _this3.cdr.detectChanges();
                      }, 500);

                    case 8:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "getObservationsInMap",
          value: function getObservationsInMap() {
            var _this4 = this;

            return this.mapService.mapView$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.switchMap)(function (mapView) {
              return _this4.observationService.observations$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (observations) {
                return _this4.filterObservationsWithinViewBounds(observations, mapView);
              }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.map)(function (observations) {
                return observations.slice(0, MAX_OBSERVATION_COUNT);
              }));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.take)(1)).toPromise();
          }
        }, {
          key: "loadNextPage",
          value: function loadNextPage(event) {
            var _this$visibleObservat;

            this.pageIndex += 1;
            var startIndex = this.pageIndex * PAGE_SIZE;

            (_this$visibleObservat = this.visibleObservations).push.apply(_this$visibleObservat, _toConsumableArray(this.allObservations.slice(startIndex, startIndex + PAGE_SIZE)));

            var target = event.target;
            target.complete();

            if (this.visibleObservations.length >= this.total) {
              target.disabled = true; //we have reached the end, so no need to load more pages from now
            }
          }
        }, {
          key: "maxCountReached",
          get: function get() {
            return this.visibleObservations.length >= MAX_OBSERVATION_COUNT;
          }
        }, {
          key: "maxCount",
          get: function get() {
            return MAX_OBSERVATION_COUNT;
          }
        }, {
          key: "filterObservationsWithinViewBounds",
          value: function filterObservationsWithinViewBounds(observations, view) {
            return observations.filter(function (observation) {
              return !view || view.bounds.contains(leaflet__WEBPACK_IMPORTED_MODULE_1__.latLng(observation.ObsLocation.Latitude, observation.ObsLocation.Longitude));
            });
          }
        }, {
          key: "trackByIdFuncInternal",
          value: function trackByIdFuncInternal(_, obs) {
            return obs ? this.observationService.uniqueObservation(obs, this.langKey) : undefined;
          }
        }]);

        return _ObservationListPage;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__.NgDestoryBase);

      _ObservationListPage.ɵfac = function ObservationListPage_Factory(t) {
        return new (t || _ObservationListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_core_services_data_marshall_data_marshall_service__WEBPACK_IMPORTED_MODULE_3__.DataMarshallService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_12__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_modules_map_services_map_map_service__WEBPACK_IMPORTED_MODULE_2__.MapService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_4__.UserSettingService));
      };

      _ObservationListPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
        type: _ObservationListPage,
        selectors: [["app-observation-list"]],
        viewQuery: function ObservationListPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScroll, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.scroll = _t.first);
          }
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵInheritDefinitionFeature"]],
        decls: 10,
        vars: 6,
        consts: [[3, "title"], [3, "refreshFunc"], [4, "ngIf"], ["class", "loading-sceleton", 4, "ngIf"], ["slot", "fixed"], ["empty", ""], [3, "ngClass", 4, "ngIf", "ngIfElse"], [3, "ionInfinite"], ["class", "full-grid-row max-count-reached", 4, "ngIf"], [3, "ngClass"], [1, "ion-text-uppercase"], [3, "obs", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "obs"], [1, "full-grid-row", "max-count-reached"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"], [1, "loading-sceleton"], ["class", "full-grid", 4, "ngIf"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-align-self-center"], [1, "center"], ["src", "/assets/images/empty-states/rectangle.svg", 1, "rectangle"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin1"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin2"], ["src", "/assets/images/empty-states/pin.svg", 1, "pin3"]],
        template: function ObservationListPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "app-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](1, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](2, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](3, "app-refresh-with-cancel", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](4, ObservationListPage_ng_container_4_Template, 5, 3, "ng-container", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](5, ObservationListPage_div_5_Template, 8, 3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "app-geo-fab", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](7, "app-add-menu");

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, ObservationListPage_ng_template_8_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](1, 4, "OBSERVATION_LIST.OBSERVATIONS"));

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("refreshFunc", ctx.refreshFunc);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.visibleObservations !== undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.loaded);
          }
        },
        directives: [_modules_shared_components_header_header_component__WEBPACK_IMPORTED_MODULE_6__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_7__.RefreshWithCancelComponent, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _modules_shared_components_geo_fab_geo_fab_component__WEBPACK_IMPORTED_MODULE_8__.GeoFabComponent, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_9__.AddMenuComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScroll, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonInfiniteScrollContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonItemDivider, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_10__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonCol, _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_11__.ObservationSkeletonComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonGrid, angular_svg_icon__WEBPACK_IMPORTED_MODULE_20__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslatePipe],
        styles: [".loading-sceleton[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n\nion-item-divider[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-top: 24px;\n  margin-bottom: 0px;\n}\n\nvirtual-scroller[_ngcontent-%COMP%], ion-list[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 1s linear;\n}\n\nvirtual-scroller.loaded[_ngcontent-%COMP%], ion-list.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n\n.last-item[_ngcontent-%COMP%] {\n  height: 50px;\n}\n\n.center[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n}\n\n.center[_ngcontent-%COMP%]   .rectangle[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -36px;\n  top: -30px;\n}\n\n.center[_ngcontent-%COMP%]   .pin1[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -77px;\n}\n\n.center[_ngcontent-%COMP%]   .pin2[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 41px;\n  top: 51px;\n}\n\n.center[_ngcontent-%COMP%]   .pin3[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -41px;\n  top: -72px;\n}\n\n.max-count-reached[_ngcontent-%COMP%] {\n  padding-bottom: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9ic2VydmF0aW9uLWxpc3QucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0FBQ0Y7O0FBR0U7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FBQUo7O0FBSUE7O0VBSUUsVUFBQTtFQUNBLDZCQUFBO0FBSEY7O0FBS0U7O0VBQ0UsVUFBQTtBQUZKOztBQU1BO0VBQ0UsWUFBQTtBQUhGOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsUUFBQTtBQUhGOztBQUtFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtBQUhKOztBQU1FO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0FBSko7O0FBT0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0FBTEo7O0FBUUU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBTko7O0FBVUE7RUFDRSxvQkFBQTtBQVBGIiwiZmlsZSI6Im9ic2VydmF0aW9uLWxpc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRpbmctc2NlbGV0b24ge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDA7XHJcbiAgbGVmdDogMDtcclxuICByaWdodDogMDtcclxuICBib3R0b206IDA7XHJcbn1cclxuXHJcbmlvbi1pdGVtLWRpdmlkZXIge1xyXG4gIGgzIHtcclxuICAgIG1hcmdpbi10b3A6IDI0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XHJcbiAgfVxyXG59XHJcblxyXG52aXJ0dWFsLXNjcm9sbGVyLFxyXG5pb24tbGlzdCB7XHJcbiAgLy8gd2lkdGg6IDEwMCU7XHJcbiAgLy8gaGVpZ2h0OiAxMDAlO1xyXG4gIG9wYWNpdHk6IDA7XHJcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAxcyBsaW5lYXI7XHJcblxyXG4gICYubG9hZGVkIHtcclxuICAgIG9wYWNpdHk6IDE7XHJcbiAgfVxyXG59XHJcblxyXG4ubGFzdC1pdGVtIHtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbi5jZW50ZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiA1MCU7XHJcbiAgdG9wOiA1MCU7XHJcblxyXG4gIC5yZWN0YW5nbGUge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTM2cHg7XHJcbiAgICB0b3A6IC0zMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBpbjEge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTc3cHg7XHJcbiAgfVxyXG5cclxuICAucGluMiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiA0MXB4O1xyXG4gICAgdG9wOiA1MXB4O1xyXG4gIH1cclxuXHJcbiAgLnBpbjMge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdDogLTQxcHg7XHJcbiAgICB0b3A6IC03MnB4O1xyXG4gIH1cclxufVxyXG5cclxuLm1heC1jb3VudC1yZWFjaGVkIHtcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufVxyXG5cclxuIl19 */"],
        changeDetection: 0
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQUE7Ozs7Ozs7Ozs7IiwibmFtZXMiOlsiRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIiwiX2FuZ3VsYXJfY29tbW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2FuZ3VsYXJfZm9ybXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImRlY2xhcmF0aW9ucyIsIl9mdWxsc2NyZWVuX2ltYWdlX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImltcG9ydHMiLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiX29ic2VydmF0aW9uX2xpc3RfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiT2JzZXJ2YXRpb25MaXN0UGFnZU1vZHVsZSIsIl9tb2RhbF9wYWdlc19mdWxsc2NyZWVuX2ltYWdlX21vZGFsX2Z1bGxzY3JlZW5faW1hZ2VfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfbW9kdWxlc19zaGFyZWRfc2hhcmVkX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMl9fIiwiY3R4X3I0IiwiX3IyIiwiUEFHRV9TSVpFIiwiTUFYX09CU0VSVkFUSU9OX0NPVU5UIiwiT2JzZXJ2YXRpb25MaXN0UGFnZSIsIm9ic2VydmF0aW9uU2VydmljZSIsImRhdGFNYXJzaGFsbFNlcnZpY2UiLCJjZHIiLCJtYXBTZXJ2aWNlIiwidXNlclNldHRpbmdTZXJ2aWNlIiwidHJhY2tCeUlkRnVuY0ludGVybmFsIiwiYmluZCIsInJlZnJlc2giLCJjYW5jZWxTdWJqZWN0Iiwib2JzZXJ2YWJsZUNhbmNlbFN1YmplY3QiLCJsYW5ndWFnZSQiLCJwaXBlIiwibmdEZXN0cm95JCIsInN1YnNjcmliZSIsImxhbmdLZXkiLCJjYW5jZWxQcm9taXNlIiwicmVzZXRBbmRMb2FkT2JzZXJ2YXRpb25zIiwiY29udGVudCIsInNjcm9sbFRvVG9wIiwibG9hZGVkIiwidmlzaWJsZU9ic2VydmF0aW9ucyIsInVuZGVmaW5lZCIsImZvcmNlVXBkYXRlIiwiZGV0ZWN0Q2hhbmdlcyIsImZvcmNlVXBkYXRlT2JzZXJ2YXRpb25zRm9yQ3VycmVudEdlb0hhemFyZCIsImxvYWRPYnNlcnZhdGlvbnMiLCJnZXRPYnNlcnZhdGlvbnNJbk1hcCIsImFsbE9ic2VydmF0aW9ucyIsInRvdGFsIiwibGVuZ3RoIiwicGFnZUluZGV4Iiwic2xpY2UiLCJzZXRUaW1lb3V0Iiwic2Nyb2xsIiwiZGlzYWJsZWQiLCJtYXBWaWV3JCIsIm1hcFZpZXciLCJvYnNlcnZhdGlvbnMkIiwib2JzZXJ2YXRpb25zIiwiZmlsdGVyT2JzZXJ2YXRpb25zV2l0aGluVmlld0JvdW5kcyIsInRvUHJvbWlzZSIsImV2ZW50Iiwic3RhcnRJbmRleCIsInB1c2giLCJ0YXJnZXQiLCJjb21wbGV0ZSIsInZpZXciLCJmaWx0ZXIiLCJvYnNlcnZhdGlvbiIsImJvdW5kcyIsImNvbnRhaW5zIiwibGVhZmxldF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiT2JzTG9jYXRpb24iLCJMYXRpdHVkZSIsIkxvbmdpdHVkZSIsIl8iLCJvYnMiLCJ1bmlxdWVPYnNlcnZhdGlvbiIsInNyY19hcHBfY29yZV9oZWxwZXJzX29ic2VydmFibGVfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJzZWxlY3RvcnMiLCJ2aWV3UXVlcnkiLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMThfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL29ic2VydmF0aW9uLWxpc3Qvb2JzZXJ2YXRpb24tbGlzdC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvb2JzZXJ2YXRpb24tbGlzdC9vYnNlcnZhdGlvbi1saXN0LnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9vYnNlcnZhdGlvbi1saXN0L29ic2VydmF0aW9uLWxpc3QucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uTGlzdFBhZ2UgfSBmcm9tICcuL29ic2VydmF0aW9uLWxpc3QucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBPYnNlcnZhdGlvbkxpc3RQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbT2JzZXJ2YXRpb25MaXN0UGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE9ic2VydmF0aW9uTGlzdFBhZ2VNb2R1bGUge31cclxuIiwiPGFwcC1oZWFkZXIgdGl0bGU9XCJ7eyAnT0JTRVJWQVRJT05fTElTVC5PQlNFUlZBVElPTlMnIHwgdHJhbnNsYXRlIH19XCI+PC9hcHAtaGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWZyZXNoLXdpdGgtY2FuY2VsIFtyZWZyZXNoRnVuY109XCJyZWZyZXNoRnVuY1wiPjwvYXBwLXJlZnJlc2gtd2l0aC1jYW5jZWw+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpc2libGVPYnNlcnZhdGlvbnMgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgPGlvbi1saXN0IFtuZ0NsYXNzXT1cInsgbG9hZGVkOiBsb2FkZWQgfVwiICpuZ0lmPVwiKHZpc2libGVPYnNlcnZhdGlvbnMubGVuZ3RoID4gMCkgZWxzZSBlbXB0eVwiPlxyXG4gICAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydPQlNFUlZBVElPTl9MSVNULklOX01BUF9WSUVXJyB8IHRyYW5zbGF0ZSB9fTwvaDM+XHJcbiAgICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgPGFwcC1vYnNlcnZhdGlvbi1saXN0LWNhcmQgKm5nRm9yPVwibGV0IG9icyBvZiB2aXNpYmxlT2JzZXJ2YXRpb25zOyB0cmFja0J5OiB0cmFja0J5SWRGdW5jO1wiIFtvYnNdPVwib2JzXCI+XHJcbiAgICAgIDwvYXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZD5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWluZmluaXRlLXNjcm9sbCAoaW9uSW5maW5pdGUpPVwibG9hZE5leHRQYWdlKCRldmVudClcIiA+XHJcbiAgICAgIDxpb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQ+XHJcbiAgICAgIDwvaW9uLWluZmluaXRlLXNjcm9sbC1jb250ZW50PlxyXG4gICAgPC9pb24taW5maW5pdGUtc2Nyb2xsPlxyXG4gICAgPGlvbi1yb3cgKm5nSWY9XCJtYXhDb3VudFJlYWNoZWRcIiBjbGFzcz1cImZ1bGwtZ3JpZC1yb3cgbWF4LWNvdW50LXJlYWNoZWRcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLW1hcmdpbi1ob3Jpem9udGFsXCI+XHJcbiAgICAgICAgPGgyPnt7ICdPQlNFUlZBVElPTl9MSVNULk1BWF9DT1VOVF9SRUFDSEVEX0hFQURFUicgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj4ge3sgJ09CU0VSVkFUSU9OX0xJU1QuTUFYX0NPVU5UX1JFQUNIRURfVEVYVCcgfCB0cmFuc2xhdGU6IHttYXhDb3VudDogbWF4Q291bnR9IH19PC9oMz5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG4gIDxkaXYgY2xhc3M9XCJsb2FkaW5nLXNjZWxldG9uXCIgKm5nSWY9XCIhbG9hZGVkXCI+XHJcbiAgICA8aW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snT0JTRVJWQVRJT05fTElTVC5JTl9NQVBfVklFVycgfCB0cmFuc2xhdGUgfX08L2gzPlxyXG4gICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgPGFwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj48L2FwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj5cclxuICAgIDxhcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+PC9hcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+XHJcbiAgICA8YXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPjwvYXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxhcHAtZ2VvLWZhYiBzbG90PVwiZml4ZWRcIj48L2FwcC1nZW8tZmFiPlxyXG48L2lvbi1jb250ZW50PlxyXG48YXBwLWFkZC1tZW51PjwvYXBwLWFkZC1tZW51PlxyXG48bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gIDxpb24tZ3JpZCAqbmdJZj1cImxvYWRlZFwiIGNsYXNzPVwiZnVsbC1ncmlkXCI+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2VudGVyXCI+XHJcbiAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJyZWN0YW5nbGVcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9lbXB0eS1zdGF0ZXMvcmVjdGFuZ2xlLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgICA8c3ZnLWljb24gY2xhc3M9XCJwaW4xXCIgc3JjPVwiL2Fzc2V0cy9pbWFnZXMvZW1wdHktc3RhdGVzL3Bpbi5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICAgICAgPHN2Zy1pY29uIGNsYXNzPVwicGluMlwiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2VtcHR5LXN0YXRlcy9waW4uc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgIDxzdmctaWNvbiBjbGFzcz1cInBpbjNcIiBzcmM9XCIvYXNzZXRzL2ltYWdlcy9lbXB0eS1zdGF0ZXMvcGluLnN2Z1wiPjwvc3ZnLWljb24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tbWFyZ2luLWhvcml6b250YWxcIj5cclxuICAgICAgICA8aDI+IHt7ICdPQlNFUlZBVElPTl9MSVNULk5PX09CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj57eydPQlNFUlZBVElPTl9MSVNULk5PX09CU0VSVkFUSU9OU19URVhUJ3x0cmFuc2xhdGV9fTwvaDM+XHJcbiAgICAgIDwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuICA8L2lvbi1ncmlkPlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9vYnNlcnZhdGlvbi9vYnNlcnZhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAsIHRha2UsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNYXBTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9tYXAvc2VydmljZXMvbWFwL21hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSU1hcFZpZXcgfSBmcm9tICcuLi8uLi9tb2R1bGVzL21hcC9zZXJ2aWNlcy9tYXAvbWFwLXZpZXcuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVmlld01vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBJb25Db250ZW50LCBJb25JbmZpbml0ZVNjcm9sbCB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRGF0YU1hcnNoYWxsU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvZGF0YS1tYXJzaGFsbC9kYXRhLW1hcnNoYWxsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuaW1wb3J0IHsgTGFuZ0tleSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5jb25zdCBNQVhfT0JTRVJWQVRJT05fQ09VTlQgPSAxMDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1vYnNlcnZhdGlvbi1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2JzZXJ2YXRpb24tbGlzdC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29ic2VydmF0aW9uLWxpc3QucGFnZS5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE9ic2VydmF0aW9uTGlzdFBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICB2aXNpYmxlT2JzZXJ2YXRpb25zOiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXTtcclxuICBhbGxPYnNlcnZhdGlvbnM6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbFtdO1xyXG4gIGxvYWRlZCA9IGZhbHNlO1xyXG4gIGNhbmNlbFN1YmplY3Q6IFN1YmplY3Q8dW5rbm93bj47XHJcbiAgcHJpdmF0ZSBwYWdlSW5kZXggPSAwO1xyXG4gIHByaXZhdGUgdG90YWw6IG51bWJlcjtcclxuICBwcml2YXRlIGxhbmdLZXk6IExhbmdLZXk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoSW9uQ29udGVudCwgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudDogSW9uQ29udGVudDtcclxuICBAVmlld0NoaWxkKElvbkluZmluaXRlU2Nyb2xsLCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsOiBJb25JbmZpbml0ZVNjcm9sbDtcclxuXHJcbiAgdHJhY2tCeUlkRnVuYyA9IHRoaXMudHJhY2tCeUlkRnVuY0ludGVybmFsLmJpbmQodGhpcyk7XHJcbiAgcmVmcmVzaEZ1bmMgPSB0aGlzLnJlZnJlc2guYmluZCh0aGlzKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG9ic2VydmF0aW9uU2VydmljZTogT2JzZXJ2YXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBkYXRhTWFyc2hhbGxTZXJ2aWNlOiBEYXRhTWFyc2hhbGxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBtYXBTZXJ2aWNlOiBNYXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICApIHtcclxuICAgIHN1cGVyKClcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYW5jZWxTdWJqZWN0ID0gdGhpcy5kYXRhTWFyc2hhbGxTZXJ2aWNlLm9ic2VydmFibGVDYW5jZWxTdWJqZWN0O1xyXG4gICAgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UubGFuZ3VhZ2UkLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpLnN1YnNjcmliZSgobGFuZ0tleSkgPT4ge1xyXG4gICAgICB0aGlzLmxhbmdLZXkgPSBsYW5nS2V5O1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHJlZnJlc2goY2FuY2VsUHJvbWlzZTogUHJvbWlzZTx1bmtub3duPik6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldEFuZExvYWRPYnNlcnZhdGlvbnModHJ1ZSwgY2FuY2VsUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICBpb25WaWV3V2lsbEVudGVyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb250ZW50LnNjcm9sbFRvVG9wKCk7XHJcbiAgICB0aGlzLnJlc2V0QW5kTG9hZE9ic2VydmF0aW9ucygpO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxMZWF2ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnZpc2libGVPYnNlcnZhdGlvbnMgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHJlc2V0QW5kTG9hZE9ic2VydmF0aW9ucyhcclxuICAgIGZvcmNlVXBkYXRlID0gZmFsc2UsXHJcbiAgICBjYW5jZWxQcm9taXNlOiBQcm9taXNlPHVua25vd24+ID0gdW5kZWZpbmVkXHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy52aXNpYmxlT2JzZXJ2YXRpb25zID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgaWYgKGZvcmNlVXBkYXRlKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmZvcmNlVXBkYXRlT2JzZXJ2YXRpb25zRm9yQ3VycmVudEdlb0hhemFyZChcclxuICAgICAgICBjYW5jZWxQcm9taXNlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvYWRPYnNlcnZhdGlvbnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgbG9hZE9ic2VydmF0aW9ucygpIHtcclxuICAgIHRoaXMuYWxsT2JzZXJ2YXRpb25zID0gYXdhaXQgdGhpcy5nZXRPYnNlcnZhdGlvbnNJbk1hcCgpO1xyXG4gICAgdGhpcy50b3RhbCA9IHRoaXMuYWxsT2JzZXJ2YXRpb25zLmxlbmd0aDtcclxuICAgIHRoaXMucGFnZUluZGV4ID0gMDtcclxuICAgIHRoaXMudmlzaWJsZU9ic2VydmF0aW9ucyA9IHRoaXMuYWxsT2JzZXJ2YXRpb25zLnNsaWNlKDAsIDEwKTtcclxuXHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNjcm9sbC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB9LCA1MDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRPYnNlcnZhdGlvbnNJbk1hcCgpOiBQcm9taXNlPFJlZ2lzdHJhdGlvblZpZXdNb2RlbFtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5tYXBTZXJ2aWNlLm1hcFZpZXckXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgobWFwVmlldzogSU1hcFZpZXcpID0+XHJcbiAgICAgICAgICB0aGlzLm9ic2VydmF0aW9uU2VydmljZS5vYnNlcnZhdGlvbnMkLnBpcGUoXHJcbiAgICAgICAgICAgIG1hcCgob2JzZXJ2YXRpb25zKSA9PlxyXG4gICAgICAgICAgICAgIHRoaXMuZmlsdGVyT2JzZXJ2YXRpb25zV2l0aGluVmlld0JvdW5kcyhvYnNlcnZhdGlvbnMsIG1hcFZpZXcpXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIG1hcCgob2JzZXJ2YXRpb25zKSA9PiBvYnNlcnZhdGlvbnMuc2xpY2UoMCwgTUFYX09CU0VSVkFUSU9OX0NPVU5UKSlcclxuICAgICAgICAgIClcclxuICAgICAgICApLFxyXG4gICAgICAgIHRha2UoMSlcclxuICAgICAgKVxyXG4gICAgICAudG9Qcm9taXNlKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkTmV4dFBhZ2UoZXZlbnQ6IEN1c3RvbUV2ZW50PElvbkluZmluaXRlU2Nyb2xsPik6IHZvaWQge1xyXG4gICAgdGhpcy5wYWdlSW5kZXggKz0gMTtcclxuICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLnBhZ2VJbmRleCAqIFBBR0VfU0laRTtcclxuICAgIHRoaXMudmlzaWJsZU9ic2VydmF0aW9ucy5wdXNoKFxyXG4gICAgICAuLi50aGlzLmFsbE9ic2VydmF0aW9ucy5zbGljZShzdGFydEluZGV4LCBzdGFydEluZGV4ICsgUEFHRV9TSVpFKVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCB0YXJnZXQ6IElvbkluZmluaXRlU2Nyb2xsID0gKGV2ZW50LnRhcmdldCBhcyB1bmtub3duKSBhcyBJb25JbmZpbml0ZVNjcm9sbDtcclxuICAgIHRhcmdldC5jb21wbGV0ZSgpO1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZU9ic2VydmF0aW9ucy5sZW5ndGggPj0gdGhpcy50b3RhbCkge1xyXG4gICAgICB0YXJnZXQuZGlzYWJsZWQgPSB0cnVlOyAvL3dlIGhhdmUgcmVhY2hlZCB0aGUgZW5kLCBzbyBubyBuZWVkIHRvIGxvYWQgbW9yZSBwYWdlcyBmcm9tIG5vd1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IG1heENvdW50UmVhY2hlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnZpc2libGVPYnNlcnZhdGlvbnMubGVuZ3RoID49IE1BWF9PQlNFUlZBVElPTl9DT1VOVDtcclxuICB9XHJcblxyXG4gIGdldCBtYXhDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1BWF9PQlNFUlZBVElPTl9DT1VOVDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsdGVyT2JzZXJ2YXRpb25zV2l0aGluVmlld0JvdW5kcyhcclxuICAgIG9ic2VydmF0aW9uczogUmVnaXN0cmF0aW9uVmlld01vZGVsW10sXHJcbiAgICB2aWV3OiBJTWFwVmlld1xyXG4gICkge1xyXG4gICAgcmV0dXJuIG9ic2VydmF0aW9ucy5maWx0ZXIoXHJcbiAgICAgIChvYnNlcnZhdGlvbikgPT5cclxuICAgICAgICAhdmlldyB8fFxyXG4gICAgICAgIHZpZXcuYm91bmRzLmNvbnRhaW5zKFxyXG4gICAgICAgICAgTC5sYXRMbmcoXHJcbiAgICAgICAgICAgIG9ic2VydmF0aW9uLk9ic0xvY2F0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgICAgICBvYnNlcnZhdGlvbi5PYnNMb2NhdGlvbi5Mb25naXR1ZGVcclxuICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB0cmFja0J5SWRGdW5jSW50ZXJuYWwoXywgb2JzOiBSZWdpc3RyYXRpb25WaWV3TW9kZWwpIHtcclxuICAgIHJldHVybiBvYnMgPyB0aGlzLm9ic2VydmF0aW9uU2VydmljZS51bmlxdWVPYnNlcnZhdGlvbihvYnMsIHRoaXMubGFuZ0tleSkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==