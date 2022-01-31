(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_offline-map_offline-map_module_ts"], {
    /***/
    93919: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompoundPackage": function CompoundPackage() {
          return (
            /* binding */
            _CompoundPackage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

      var _CompoundPackage = /*#__PURE__*/function () {
        function _CompoundPackage(metadata) {
          _classCallCheck(this, _CompoundPackage);

          this.metadata = metadata;
        }

        _createClass(_CompoundPackage, [{
          key: "getFeature",
          value: function getFeature() {
            var _this$metadata$bbox = _slicedToArray(this.metadata.bbox, 4),
                xMin = _this$metadata$bbox[0],
                yMin = _this$metadata$bbox[1],
                xMax = _this$metadata$bbox[2],
                yMax = _this$metadata$bbox[3];

            return {
              type: 'Feature',
              geometry: {
                bbox: this.metadata.bbox,
                type: 'Polygon',
                coordinates: [[[xMin, yMin], [xMin, yMax], [xMax, yMax], [xMax, yMin], [xMin, yMin]]]
              },
              properties: null,
              id: _CompoundPackage.GetFeatureId.apply(_CompoundPackage, _toConsumableArray(this.metadata.xyz))
            };
          }
        }, {
          key: "getSizeInMiB",
          value: function getSizeInMiB() {
            return this.metadata.sizeInMib;
          }
        }, {
          key: "getName",
          value: function getName() {
            var _this$metadata$xyz = _slicedToArray(this.metadata.xyz, 3),
                x = _this$metadata$xyz[0],
                y = _this$metadata$xyz[1],
                z = _this$metadata$xyz[2];

            return _CompoundPackage.GetNameFromXYZ(x, y, z);
          }
        }, {
          key: "getLastModified",
          value: function getLastModified() {
            if (this.metadata.maps.length === 0) {
              return null;
            }

            return moment__WEBPACK_IMPORTED_MODULE_0___default().max(this.metadata.maps.map(function (p) {
              return moment__WEBPACK_IMPORTED_MODULE_0___default()(p.lastModified);
            })).toDate();
          }
        }, {
          key: "getParts",
          value: function getParts() {
            return this.metadata.maps // Hent name / url for alle pakker
            .map(function (p) {
              return p.urls.map(function (url) {
                return {
                  name: p.name,
                  url: url
                };
              });
            }) // Flatten array
            .reduce(function (a, b) {
              return a.concat(b);
            }, []);
          }
        }, {
          key: "getXYZ",
          value: function getXYZ() {
            return this.metadata.xyz;
          }
        }], [{
          key: "GetNameFromXYZ",
          value: function GetNameFromXYZ(x, y, z) {
            return "".concat(x, "-").concat(y, "-").concat(z);
          }
        }, {
          key: "GetFeatureId",
          value: function GetFeatureId(x, y, z) {
            return _CompoundPackage.GetNameFromXYZ(x, y, z);
          }
        }]);

        return _CompoundPackage;
      }();
      /***/

    },

    /***/
    54298: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OfflineMapPageModule": function OfflineMapPageModule() {
          return (
            /* binding */
            _OfflineMapPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _offline_map_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./offline-map.page */
      80697);
      /* harmony import */


      var src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/map/map.module */
      14522);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/shared/shared.module */
      72271);
      /* harmony import */


      var _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./offline-package-modal/offline-package-modal.component */
      6639);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _offline_map_page__WEBPACK_IMPORTED_MODULE_0__.OfflineMapPage
      }];

      var _OfflineMapPageModule = function _OfflineMapPageModule() {
        _classCallCheck(this, _OfflineMapPageModule);
      };

      _OfflineMapPageModule.ɵfac = function OfflineMapPageModule_Factory(t) {
        return new (t || _OfflineMapPageModule)();
      };

      _OfflineMapPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _OfflineMapPageModule
      });
      _OfflineMapPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes), src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__.MapModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_OfflineMapPageModule, {
          declarations: [_offline_map_page__WEBPACK_IMPORTED_MODULE_0__.OfflineMapPage, _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__.OfflinePackageModalComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule, src_app_modules_map_map_module__WEBPACK_IMPORTED_MODULE_1__.MapModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule, src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule]
        });
      })();
      /***/

    },

    /***/
    80697: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OfflineMapPage": function OfflineMapPage() {
          return (
            /* binding */
            _OfflineMapPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/offline-map/offline-map.service */
      12645);
      /* harmony import */


      var _core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/helpers/helper.service */
      22791);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      69606);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! rxjs */
      73794);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      41757);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      71775);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs/operators */
      46367);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./offline-package-modal/offline-package-modal.component */
      6639);
      /* harmony import */


      var _metadata_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./metadata.model */
      93919);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../modules/shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modules/map/components/map/map.component */
      6781);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/common */
      54364);

      var _c0 = function _c0(a0) {
        return {
          packageCount: a0
        };
      };

      function OfflineMapPage_ion_item_12_ion_label_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-label", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageTotals_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.PACKAGE_COUNT_SINGLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c0, packageTotals_r2.numPackages)));
        }
      }

      function OfflineMapPage_ion_item_12_ion_label_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-label", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageTotals_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.PACKAGE_COUNT_MULTIPLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c0, packageTotals_r2.numPackages)));
        }
      }

      function OfflineMapPage_ion_item_12_ion_icon_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-icon", 14);
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r5.expanded ? "chevron-down-circle" : "chevron-up-circle");
        }
      }

      var _c1 = function _c1(a0) {
        return {
          spaceAvailable: a0
        };
      };

      function OfflineMapPage_ion_item_12_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ion_item_12_Template_ion_item_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r8.expanded = !ctx_r8.expanded;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, OfflineMapPage_ion_item_12_ion_label_1_Template, 3, 6, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, OfflineMapPage_ion_item_12_ion_label_2_Template, 3, 6, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "ion-label", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, OfflineMapPage_ion_item_12_ion_icon_8_Template, 1, 1, "ion-icon", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageTotals_r2 = ctx.ngIf;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages === 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages !== 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](packageTotals_r2.spaceUsed);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("(", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](7, 5, "OFFLINE_MAP.SPACE_AVAILABLE", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](8, _c1, ctx_r0.getSpaceAvailable())), ")");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", packageTotals_r2.numPackages > 0);
        }
      }

      function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-icon", 18);
        }
      }

      function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-icon", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template_ion_icon_click_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17);

            var item_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r15.cancelOrDelete(item_r12, $event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }
      }

      function OfflineMapPage_ng_container_15_ion_item_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function OfflineMapPage_ng_container_15_ion_item_1_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r19);

            var item_r12 = restoredCtx.$implicit;

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r18.showPackageModalForPackage(item_r12);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, OfflineMapPage_ng_container_15_ion_item_1_ion_icon_7_Template, 1, 0, "ion-icon", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, OfflineMapPage_ng_container_15_ion_item_1_ion_icon_8_Template, 1, 0, "ion-icon", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r12 = ctx.$implicit;

          var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](item_r12.name);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r11.humanReadableByteSize(item_r12.size));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r11.formatProgressIfDownloading(item_r12));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", item_r12.error);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !item_r12.error);
        }
      }

      function OfflineMapPage_ng_container_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, OfflineMapPage_ng_container_15_ion_item_1_Template, 9, 5, "ion-item", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var items_r10 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", items_r10);
        }
      }

      var PACKAGE_INDEX_URL = 'https://offlinemap.blob.core.windows.net/packages/packageIndex_v2.json';
      var filledTileOpacity = 0.8;
      var notFilledTileOpacity = 0.1;
      var documentStyle = getComputedStyle(document.body);
      var defaultTileStyle = {
        color: documentStyle.getPropertyValue('--ion-color-primary'),
        opacity: 1,
        fillOpacity: notFilledTileOpacity
      };
      var downloadedTileStyle = Object.assign(Object.assign({}, defaultTileStyle), {
        fillOpacity: filledTileOpacity
      });
      var errorTileStyle = Object.assign(Object.assign({}, downloadedTileStyle), {
        color: documentStyle.getPropertyValue('--ion-color-danger')
      });

      var _OfflineMapPage = /*#__PURE__*/function (_src_app_core_helpers) {
        _inherits(_OfflineMapPage, _src_app_core_helpers);

        var _super = _createSuper(_OfflineMapPage);

        function _OfflineMapPage(helperService, modalController, offlineMapService, alertController, translateService, zone, http) {
          var _this;

          _classCallCheck(this, _OfflineMapPage);

          _this = _super.call(this);
          _this.helperService = helperService;
          _this.modalController = modalController;
          _this.offlineMapService = offlineMapService;
          _this.alertController = alertController;
          _this.translateService = translateService;
          _this.zone = zone;
          _this.installedPackages = new Map();
          _this.failedPackageIds = []; //remember failed packages until features are ready for styling

          _this.packagesOnServer = new Map();
          _this.showTileCard = true; // Could not get the click handler to only emit once per click, so wrapped this in a subject

          _this.showModal = new rxjs__WEBPACK_IMPORTED_MODULE_9__.Subject();
          _this.isZooming = new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false);
          _this.featureMap = new Map();
          _this.expanded = false; //show list of downloads if this is true
          // Download package index from azure

          _this.packagesOnServer$ = http.get(PACKAGE_INDEX_URL).pipe( // Map downloaded package index to a packageName => package map
          (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (packageIndex) {
            var nameAndPkg = packageIndex.map(function (p) {
              var _metadata_model__WEBP;

              return [(_metadata_model__WEBP = _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage).GetNameFromXYZ.apply(_metadata_model__WEBP, _toConsumableArray(p.xyz)), new _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage(p)];
            });
            return new Map(nameAndPkg);
          }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.shareReplay)());
          _this.downloadAndUnzipProgress$ = _this.offlineMapService.downloadAndUnzipProgress$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (items) {
            return items.sort(function (a, b) {
              return b.downloadStart - a.downloadStart;
            });
          }));
          _this.installedPackages$ = _this.offlineMapService.packages$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (downloaded) {
            return new Map(downloaded.map(function (item) {
              return [_this.getFeatureIdForPackage(item), item];
            }));
          }));
          _this.allPackages$ = (0, rxjs__WEBPACK_IMPORTED_MODULE_13__.combineLatest)([_this.offlineMapService.downloadAndUnzipProgress$, _this.offlineMapService.packages$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                inProgress = _ref2[0],
                downloaded = _ref2[1];

            return [].concat(_toConsumableArray(inProgress), _toConsumableArray(downloaded));
          }));
          _this.packageTotals$ = _this.allPackages$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (packages) {
            var count = 0;
            var space = 0;

            var _iterator = _createForOfIteratorHelper(packages),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var mapPackage = _step.value;
                count += 1;
                space += mapPackage.size;
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            var spaceWithUnit = '0 MB';

            if (space > 0) {
              spaceWithUnit = _this.humanReadableByteSize(space);
            }

            return {
              numPackages: count,
              spaceUsed: spaceWithUnit
            };
          }));
          return _this;
        }

        _createClass(_OfflineMapPage, [{
          key: "onMapReady",
          value: function onMapReady(map) {
            var _this2 = this;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.LEAFLET_MAP = map;
            map.setZoom(7);
            this.tilesLayer = new leaflet__WEBPACK_IMPORTED_MODULE_2__.GeoJSON(null, {
              onEachFeature: function onEachFeature(feature, layer) {
                _this2.featureMap.set(feature.id, {
                  feature: feature,
                  layer: layer
                });

                layer.on('click', function () {
                  if (_this2.packagesOnServer.has(feature.id) || _this2.installedPackages.has(feature.id)) {
                    _this2.showModal.next(feature);
                  }
                });
              }
            });
            map.addLayer(this.tilesLayer);
            this.packagesOnServer$.subscribe(function (packageMap) {
              packageMap.forEach(function (mapPackage) {
                _this2.tilesLayer.addData(mapPackage.getFeature());
              });
            });
            (0, rxjs__WEBPACK_IMPORTED_MODULE_13__.combineLatest)([this.installedPackages$, this.packagesOnServer$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$)).subscribe(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  installedPackages = _ref4[0],
                  packagesOnServer = _ref4[1];

              _this2.installedPackages = installedPackages;
              _this2.packagesOnServer = packagesOnServer;

              _this2.setStyleForPackages();
            });
            this.downloadAndUnzipProgress$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$)).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.tap)(function (itemsWithProgress) {
              _this2.failedPackageIds = itemsWithProgress.filter(function (item) {
                return item.error;
              }).map(function (item) {
                return item.name;
              });
            })).subscribe(function (itemsWithProgress) {
              _this2.zone.runOutsideAngular(function () {
                var _iterator2 = _createForOfIteratorHelper(itemsWithProgress),
                    _step2;

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var item = _step2.value;

                    _this2.setStyleForProgressOrDownloadedPackage(item);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              });
            });
            this.showModal.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.debounceTime)(200), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.withLatestFrom)(this.isZooming), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_18__.filter)(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                  isZooming = _ref6[1];

              return !isZooming;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.switchMap)(function (_ref7) {
              var _ref8 = _slicedToArray(_ref7, 1),
                  feature = _ref8[0];

              return (0, rxjs__WEBPACK_IMPORTED_MODULE_20__.from)(_this2.showPackageModal(feature));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this.ngDestroy$)).subscribe(); // This is to avoid pinch-zooming on map triggers click event

            map.on('dragend zoomend', function () {
              _this2.isZooming.next(false);
            });
            map.on('dragstart zoomstart', function () {
              _this2.isZooming.next(true);
            });
          }
        }, {
          key: "setStyleForPackages",
          value: function setStyleForPackages() {
            var _iterator3 = _createForOfIteratorHelper(this.installedPackages),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _step3$value = _slicedToArray(_step3.value, 2),
                    item = _step3$value[1];

                this.setStyleForProgressOrDownloadedPackage(item);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            var _iterator4 = _createForOfIteratorHelper(this.packagesOnServer),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _slicedToArray(_step4.value, 1),
                    key = _step4$value[0];

                var style = defaultTileStyle;

                if (!this.installedPackages.has(key)) {
                  if (this.failedPackageIds.includes(key)) {
                    style = errorTileStyle;
                  }

                  this.setStyleForFeature(key, style);
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        }, {
          key: "setStyleForFeature",
          value: function setStyleForFeature(id, style) {
            var feature = this.featureMap.get(id);

            if (feature) {
              var polyline = feature.layer;
              polyline.setStyle(style);
            }
          }
        }, {
          key: "setStyleForProgressOrDownloadedPackage",
          value: function setStyleForProgressOrDownloadedPackage(item) {
            var id = this.getFeatureIdForPackage(item);

            if (item.error) {
              this.setStyleForFeature(id, errorTileStyle);
            } else {
              var fillOpacity = item.downloadComplete ? 0 : this.getProgressOpacity(item);
              this.setStyleForFeature(id, Object.assign(Object.assign({}, defaultTileStyle), {
                fillOpacity: fillOpacity
              }));
            }
          }
        }, {
          key: "getProgressOpacity",
          value: function getProgressOpacity(item) {
            var progressValue = (item.progress ? item.progress.percentage / 2.0 : 0) + 0.4;
            return Math.min(progressValue, filledTileOpacity);
          }
        }, {
          key: "getFeaturePropertyId",
          value: function getFeaturePropertyId(x, y, z) {
            return _metadata_model__WEBPACK_IMPORTED_MODULE_4__.CompoundPackage.GetNameFromXYZ(x, y, z);
          }
        }, {
          key: "getFeatureIdForPackage",
          value: function getFeatureIdForPackage(map) {
            if (map.compoundPackageMetadata) {
              return this.getFeaturePropertyId.apply(this, _toConsumableArray(map.compoundPackageMetadata.getXYZ()));
            }

            var firstMap = Object.keys(map.maps)[0];

            if (map.maps[firstMap]) {
              var rootTile = map.maps[firstMap].rootTile;
              return this.getFeaturePropertyId(rootTile.x, rootTile.y, rootTile.z);
            }

            return '';
          }
        }, {
          key: "showPackageModal",
          value: function showPackageModal(feature) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var compoundPackage, name, modal;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      compoundPackage = this.packagesOnServer.get(feature.id);
                      name = compoundPackage.getName();
                      _context.next = 4;
                      return this.modalController.create({
                        component: _offline_package_modal_offline_package_modal_component__WEBPACK_IMPORTED_MODULE_3__.OfflinePackageModalComponent,
                        componentProps: {
                          feature: feature,
                          packageOnServer: compoundPackage,
                          offlinePackageStatus$: this.allPackages$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (packages) {
                            return packages.find(function (p) {
                              return p.name === name;
                            });
                          }))
                        },
                        swipeToClose: true,
                        mode: 'ios'
                      });

                    case 4:
                      modal = _context.sent;
                      _context.next = 7;
                      return modal.present();

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "showPackageModalForPackage",
          value: function showPackageModalForPackage(map) {
            var feature = this.featureMap.get(map.name);

            if (feature) {
              this.showPackageModal(feature.feature);
            }
          }
        }, {
          key: "humanReadableByteSize",
          value: function humanReadableByteSize(bytes) {
            var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (isNaN(bytes)) {
              return '';
            }

            return this.helperService.humanReadableByteSize(bytes, fractionDigits, true);
          }
        }, {
          key: "formatProgressIfDownloading",
          value: function formatProgressIfDownloading(map) {
            if (map.downloadStart && !map.downloadComplete) {
              var value = Math.round((map.progress ? map.progress.percentage : 0) * 100);
              return "(".concat(value, "%)");
            }

            return '';
          }
        }, {
          key: "cancelOrDelete",
          value: function cancelOrDelete(map, event) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this3 = this;

              var toTranslate, translations, alert;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      event.stopPropagation();

                      if (!this.isDownloaded(map)) {
                        _context2.next = 12;
                        break;
                      }

                      toTranslate = ['OFFLINE_MAP.DELETE_PACKAGE_CONFIRM', 'DIALOGS.CANCEL', 'DIALOGS.DELETE'];
                      _context2.next = 5;
                      return (0, rxjs__WEBPACK_IMPORTED_MODULE_22__.firstValueFrom)(this.translateService.get(toTranslate));

                    case 5:
                      translations = _context2.sent;
                      _context2.next = 8;
                      return this.alertController.create({
                        message: translations['OFFLINE_MAP.DELETE_PACKAGE_CONFIRM'],
                        buttons: [{
                          text: translations['DIALOGS.CANCEL'],
                          role: 'cancel'
                        }, {
                          text: translations['DIALOGS.DELETE'],
                          handler: function handler() {
                            _this3.offlineMapService.removeMapPackageByName(map.name);
                          }
                        }]
                      });

                    case 8:
                      alert = _context2.sent;
                      alert.present();
                      _context2.next = 13;
                      break;

                    case 12:
                      this.offlineMapService.cancelDownloadPackage(map);

                    case 13:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "isDownloaded",
          value: function isDownloaded(map) {
            return !!map.downloadComplete;
          }
        }, {
          key: "getSpaceAvailable",
          value: function getSpaceAvailable() {
            var _a;

            return this.humanReadableByteSize((_a = this.offlineMapService.availableDiskspace) === null || _a === void 0 ? void 0 : _a.available, 0);
          }
        }]);

        return _OfflineMapPage;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_5__.NgDestoryBase);

      _OfflineMapPage.ɵfac = function OfflineMapPage_Factory(t) {
        return new (t || _OfflineMapPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_helpers_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_0__.OfflineMapService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_25__.HttpClient));
      };

      _OfflineMapPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _OfflineMapPage,
        selectors: [["app-offline-map"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
        decls: 17,
        vars: 18,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [1, "map-container"], [3, "offlinePackageMode", "showScale", "showMapSearch", "showFullscreenToggle", "showGpsCenter", "showUserLocation", "showSupportMaps", "autoActivate", "geoTag", "mapReady"], ["lines", "full", 3, "click", 4, "ngIf"], [1, "footer"], [4, "ngIf"], ["lines", "full", 3, "click"], ["class", "package-count", 4, "ngIf"], [1, "packages-size"], [1, "space-available"], ["slot", "end", "class", "expand-icon", 3, "name", 4, "ngIf"], [1, "package-count"], ["slot", "end", 1, "expand-icon", 3, "name"], ["lines", "full", 3, "click", 4, "ngFor", "ngForOf"], ["slot", "end", "name", "warning-outline", 4, "ngIf"], ["slot", "end", "name", "trash-outline", 3, "click", 4, "ngIf"], ["slot", "end", "name", "warning-outline"], ["slot", "end", "name", "trash-outline", 3, "click"]],
        template: function OfflineMapPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "app-map", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("mapReady", function OfflineMapPage_Template_app_map_mapReady_9_listener($event) {
              return ctx.onMapReady($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-footer");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-list");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, OfflineMapPage_ion_item_12_Template, 9, 10, "ion-item", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](13, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, OfflineMapPage_ng_container_15_Template, 2, 1, "ng-container", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](16, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 12, "OFFLINE_MAP.OFFLINE_MAP_PAGE_TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("offlinePackageMode", true)("showScale", false)("showMapSearch", false)("showFullscreenToggle", false)("showGpsCenter", true)("showUserLocation", true)("showSupportMaps", false)("autoActivate", true)("geoTag", "package-map");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](13, 14, ctx.packageTotals$));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](16, 16, ctx.expanded && ctx.allPackages$));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonContent, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_7__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_23__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_26__.NgForOf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_26__.AsyncPipe],
        styles: [".footer[_ngcontent-%COMP%] {\n  max-height: 45vh;\n  overflow-y: auto;\n}\n\n.desc[_ngcontent-%COMP%] {\n  font-size: smaller;\n  margin: 16px;\n}\n\n.desc[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n\n.map-container[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\nion-backdrop[_ngcontent-%COMP%] {\n  opacity: 0.3;\n  z-index: 20;\n}\n\n#tileCard[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 16px;\n  z-index: 21;\n  width: calc(100% - 48px);\n  margin: 0 24px;\n}\n\n.package-count[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-weight: var(--list-header-font-weight);\n  font-size: var(--h3-font-size);\n  text-transform: uppercase;\n}\n\n.packages-size[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n  font-size: var(--list-header-font-size);\n  text-transform: uppercase;\n}\n\n.space-available[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: var(--list-header-font-size);\n}\n\n.expand-icon[_ngcontent-%COMP%] {\n  color: var(--ion-text-color-heading);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmUtbWFwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtBQUNGOztBQUNFO0VBQ0ksZ0JBQUE7QUFDTjs7QUFHQTtFQUNFLFlBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0Esd0JBQUE7RUFDQSxjQUFBO0FBQUY7O0FBR0E7RUFDRSxvQ0FBQTtFQUNBLDJDQUFBO0VBQ0EsOEJBQUE7RUFDQSx5QkFBQTtBQUFGOztBQUdBO0VBQ0Usb0NBQUE7RUFDQSx1Q0FBQTtFQUNBLHlCQUFBO0FBQUY7O0FBR0E7RUFDRSw4QkFBQTtFQUNBLHVDQUFBO0FBQUY7O0FBR0E7RUFDRSxvQ0FBQTtBQUFGIiwiZmlsZSI6Im9mZmxpbmUtbWFwLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb290ZXIge1xyXG4gIG1heC1oZWlnaHQ6IDQ1dmg7XHJcbiAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLmRlc2Mge1xyXG4gIGZvbnQtc2l6ZTogc21hbGxlcjtcclxuICBtYXJnaW46IDE2cHg7XHJcblxyXG4gIGRpdiArIGRpdiB7XHJcbiAgICAgIG1hcmdpbi10b3A6IDMycHg7XHJcbiAgfVxyXG59XHJcblxyXG4ubWFwLWNvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG5pb24tYmFja2Ryb3Age1xyXG4gIG9wYWNpdHk6IDAuMztcclxuICB6LWluZGV4OiAyMDtcclxufVxyXG5cclxuI3RpbGVDYXJkIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgYm90dG9tOiAxNnB4O1xyXG4gIHotaW5kZXg6IDIxO1xyXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSA0OHB4KTtcclxuICBtYXJnaW46IDAgMjRweDtcclxufVxyXG5cclxuLnBhY2thZ2UtY291bnQge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nKTtcclxuICBmb250LXdlaWdodDogdmFyKC0tbGlzdC1oZWFkZXItZm9udC13ZWlnaHQpO1xyXG4gIGZvbnQtc2l6ZTogdmFyKC0taDMtZm9udC1zaXplKTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4ucGFja2FnZXMtc2l6ZSB7XHJcbiAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yLWhlYWRpbmcpO1xyXG4gIGZvbnQtc2l6ZTogdmFyKC0tbGlzdC1oZWFkZXItZm9udC1zaXplKTtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG59XHJcblxyXG4uc3BhY2UtYXZhaWxhYmxlIHtcclxuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XHJcbiAgZm9udC1zaXplOiB2YXIoLS1saXN0LWhlYWRlci1mb250LXNpemUpO1xyXG59XHJcblxyXG4uZXhwYW5kLWljb24ge1xyXG4gIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvci1oZWFkaW5nKTtcclxufSJdfQ== */"]
      });
      /***/
    },

    /***/
    6639: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OfflinePackageModalComponent": function OfflinePackageModalComponent() {
          return (
            /* binding */
            _OfflinePackageModalComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _metadata_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../metadata.model */
      93919);
      /* harmony import */


      var src_app_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/core/services/offline-map/offline-map.service */
      12645);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../modules/map/components/map/map.component */
      6781);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function OfflinePackageModalComponent_div_10_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-map", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mapReady", function OfflinePackageModalComponent_div_10_Template_app_map_mapReady_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r4.showTileOnMap($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("offlinePackageMode", true)("showMapSearch", false)("showFullscreenToggle", false)("showGpsCenter", false)("showUserLocation", false)("showSupportMaps", false)("center", ctx_r0.center)("zoom", ctx_r0.zoom);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          date: a0
        };
      };

      function OfflinePackageModalComponent_div_27_span_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_DOWNLOADED_DATE", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](7, _c0, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](3, 4, packageStatus_r6.downloadComplete * 1000, "short"))), " ");
        }
      }

      function OfflinePackageModalComponent_div_27_span_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;

          var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("(", ctx_r8.getPercentage(packageStatus_r6) + "%", ")");
        }
      }

      function OfflinePackageModalComponent_div_27_ion_icon_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 16);
        }
      }

      function OfflinePackageModalComponent_div_27_ion_icon_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 17);
        }
      }

      function OfflinePackageModalComponent_div_27_ion_icon_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 18);
        }
      }

      function OfflinePackageModalComponent_div_27_ion_icon_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 19);
        }
      }

      function OfflinePackageModalComponent_div_27_ion_icon_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 20);
        }
      }

      function OfflinePackageModalComponent_div_27_ion_row_15_Template(rf, ctx) {
        if (rf & 1) {
          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_15_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r21);

            var packageStatus_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r19.cancel(packageStatus_r6);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.CANCEL_DOWNLOAD_BUTTON"));
        }
      }

      function OfflinePackageModalComponent_div_27_ion_row_16_Template(rf, ctx) {
        if (rf & 1) {
          var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_16_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r23);

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r22.startDownload();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.TRY_AGAIN_BUTTON"));
        }
      }

      function OfflinePackageModalComponent_div_27_ion_row_17_Template(rf, ctx) {
        if (rf & 1) {
          var _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_div_27_ion_row_17_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);

            var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r24["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 1, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.DELETE_BUTTON"));
        }
      }

      function OfflinePackageModalComponent_div_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-col", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, OfflinePackageModalComponent_div_27_span_7_Template, 4, 9, "span", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, OfflinePackageModalComponent_div_27_span_8_Template, 2, 1, "span", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-col", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, OfflinePackageModalComponent_div_27_ion_icon_10_Template, 1, 0, "ion-icon", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, OfflinePackageModalComponent_div_27_ion_icon_11_Template, 1, 0, "ion-icon", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, OfflinePackageModalComponent_div_27_ion_icon_12_Template, 1, 0, "ion-icon", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, OfflinePackageModalComponent_div_27_ion_icon_13_Template, 1, 0, "ion-icon", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, OfflinePackageModalComponent_div_27_ion_icon_14_Template, 1, 0, "ion-icon", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, OfflinePackageModalComponent_div_27_ion_row_15_Template, 5, 3, "ion-row", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, OfflinePackageModalComponent_div_27_ion_row_16_Template, 5, 3, "ion-row", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, OfflinePackageModalComponent_div_27_ion_row_17_Template, 5, 3, "ion-row", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var packageStatus_r6 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 12, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_DOWNLOAD_STATUS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", packageStatus_r6.progress == null ? null : packageStatus_r6.progress.description, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.downloadComplete);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.error && (packageStatus_r6.progress == null ? null : packageStatus_r6.progress.step) === 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", packageStatus_r6.error);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !packageStatus_r6.downloadComplete && !packageStatus_r6.error);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", packageStatus_r6.error);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !!packageStatus_r6.downloadComplete || packageStatus_r6.error);
        }
      }

      function OfflinePackageModalComponent_ng_template_29_Template(rf, ctx) {
        if (rf & 1) {
          var _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_ng_template_29_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r27);

            var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r26.startDownload();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r3.isCheckingAvailableDiskspace);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 2, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.DOWNLOAD_BUTTON"));
        }
      }

      var _c1 = function _c1(a0) {
        return {
          name: a0
        };
      };

      var _c2 = function _c2(a0) {
        return {
          size: a0
        };
      };
      /**
       * Shows detail info about a specific offline map package. From here you may download or delete the package.
       */


      var _OfflinePackageModalComponent = /*#__PURE__*/function (_src_app_core_helpers2) {
        _inherits(_OfflinePackageModalComponent, _src_app_core_helpers2);

        var _super2 = _createSuper(_OfflinePackageModalComponent);

        function _OfflinePackageModalComponent(modalController, offlineMapService, cdr) {
          var _this4;

          _classCallCheck(this, _OfflinePackageModalComponent);

          _this4 = _super2.call(this);
          _this4.modalController = modalController;
          _this4.offlineMapService = offlineMapService;
          _this4.cdr = cdr;
          return _this4;
        }

        _createClass(_OfflinePackageModalComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this5 = this;

            this.isCheckingAvailableDiskspace = false;
            this.offlinePackageStatusThatTriggersChangeDetection$ = this.offlinePackageStatus$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(function () {
              return _this5.cdr.detectChanges();
            }));
            this.tileLayer = new leaflet__WEBPACK_IMPORTED_MODULE_0__.GeoJSON(this.feature); // Set center from package bounds

            var _this$tileLayer$getBo = this.tileLayer.getBounds().getCenter(),
                lat = _this$tileLayer$getBo.lat,
                lng = _this$tileLayer$getBo.lng;

            this.center = [lat, lng]; // Use offline map package root tile as zoom level

            var _this$packageOnServer = this.packageOnServer.getXYZ(),
                _this$packageOnServer2 = _slicedToArray(_this$packageOnServer, 3),
                z = _this$packageOnServer2[2];

            this.zoom = z;
            this.offlineMapService.finishedPackageIds$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$)).subscribe(function (packageName) {
              if (_this5.packageOnServer.getName() === packageName) {
                _this5.dismiss(); //close when package is unzipped and ready to use

              }
            });
          }
        }, {
          key: "showTileOnMap",
          value: function showTileOnMap(map) {
            this.tileLayer.addTo(map);
          }
        }, {
          key: "startDownload",
          value: function startDownload() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      this.isCheckingAvailableDiskspace = true;
                      this.cdr.detectChanges();
                      _context3.next = 4;
                      return this.offlineMapService.checkAvailableDiskSpace(this.packageOnServer);

                    case 4:
                      if (!_context3.sent) {
                        _context3.next = 6;
                        break;
                      }

                      this.offlineMapService.downloadPackage(this.packageOnServer);

                    case 6:
                      this.isCheckingAvailableDiskspace = false;
                      this.cdr.detectChanges();

                    case 8:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "getPercentage",
          value: function getPercentage(map) {
            return Math.round((map.progress ? map.progress.percentage : 0) * 100);
          }
        }, {
          key: "cancel",
          value: function cancel(map) {
            this.offlineMapService.cancelDownloadPackage(map);
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.offlineMapService.removeMapPackageByName(this.packageOnServer.getName());
          }
        }, {
          key: "dismiss",
          value: function dismiss() {
            this.modalController.dismiss({
              'dismissed': true
            });
          }
        }]);

        return _OfflinePackageModalComponent;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__.NgDestoryBase);

      _OfflinePackageModalComponent.ɵfac = function OfflinePackageModalComponent_Factory(t) {
        return new (t || _OfflinePackageModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_offline_map_offline_map_service__WEBPACK_IMPORTED_MODULE_2__.OfflineMapService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef));
      };

      _OfflinePackageModalComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _OfflinePackageModalComponent,
        selectors: [["ng-component"]],
        inputs: {
          feature: "feature",
          packageOnServer: "packageOnServer",
          offlinePackageStatus$: "offlinePackageStatus$"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
        decls: 31,
        vars: 33,
        consts: [["translucent", ""], ["slot", "end"], [3, "click"], ["class", "map-container", 4, "ngIf"], ["size", "4"], [4, "ngIf", "ngIfElse"], ["downloadPackage", ""], [1, "map-container"], [3, "offlinePackageMode", "showMapSearch", "showFullscreenToggle", "showGpsCenter", "showUserLocation", "showSupportMaps", "center", "zoom", "mapReady"], [4, "ngIf"], ["size", "1"], ["name", "checkmark", 4, "ngIf"], ["name", "stopwatch-outline", 4, "ngIf"], ["name", "cloud-download-outline", 4, "ngIf"], ["name", "folder-open-outline", 4, "ngIf"], ["name", "warning-outline", 4, "ngIf"], ["name", "checkmark"], ["name", "stopwatch-outline"], ["name", "cloud-download-outline"], ["name", "folder-open-outline"], ["name", "warning-outline"], ["expand", "block", "color", "danger", 3, "click"], ["expand", "block", "color", "varsom-orange", 3, "click"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"]],
        template: function OfflinePackageModalComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function OfflinePackageModalComponent_Template_ion_button_click_6_listener() {
              return ctx.dismiss();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, OfflinePackageModalComponent_div_10_Template, 2, 8, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-grid");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-col", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "ion-col");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](18, "date");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-col", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "ion-col");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](26, "number");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](27, OfflinePackageModalComponent_div_27_Template, 18, 14, "div", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](28, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, OfflinePackageModalComponent_ng_template_29_Template, 5, 4, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](30);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](4, 9, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.HEADER", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](29, _c1, ctx.packageOnServer.getName())));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 12, "CLOSE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.center);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 14, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_PRODUCED_DATE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](18, 16, ctx.packageOnServer.getLastModified(), "short"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](22, 19, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_SIZE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](25, 21, "OFFLINE_MAP.MAP_PACKAGE_DETAILS_PAGE.PACKAGE_SIZE_VALUE_WITH_UNIT", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](31, _c2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](26, 24, ctx.packageOnServer.getSizeInMiB(), "1.0-1"))));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](28, 27, ctx.offlinePackageStatusThatTriggersChangeDetection$))("ngIfElse", _r2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _modules_map_components_map_map_component__WEBPACK_IMPORTED_MODULE_4__.MapComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe],
        styles: [".map-container[_ngcontent-%COMP%] {\r\n  padding: 16px;\r\n  height: calc(100vw - 32px);\r\n}\r\n\r\n.right[_ngcontent-%COMP%] {\r\n  text-align: right;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBYTtFQUNiLDBCQUEwQjtBQUM1Qjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJvZmZsaW5lLXBhY2thZ2UtbW9kYWwuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXAtY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAxNnB4O1xyXG4gIGhlaWdodDogY2FsYygxMDB2dyAtIDMycHgpO1xyXG59XHJcblxyXG4ucmlnaHQge1xyXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xyXG59Il19 */"],
        changeDetection: 0
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YyxhQUE3QjtBQUdEOzs7O1FBekUrQ0k7Ozt5QkFBckNuQiwrQkFBNEJGO0FBQUE7OztjQUE1QkU7QUFBNEJUO0FBQUE2QjtBQUFBNUc7QUFBQWtEO0FBQUFDO0FBQUE7QUFBQTZCO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURsQnpDRTs7QUFDRUE7O0FBQ0VBOztBQUFXQTs7OztBQUFpR0E7O0FBQzVHQTs7QUFDRUE7O0FBQVlBO0FBQUEscUJBQVNELGFBQVQ7QUFBa0IsYUFBbEI7O0FBQW9CQzs7OztBQUF5QkE7O0FBQzNEQTs7QUFDRkE7O0FBQ0ZBOztBQUVBQTs7QUFDRUE7O0FBYUFBOztBQUVFQTs7QUFDRUE7O0FBQWtCQTs7OztBQUE4RUE7O0FBQ2hHQTs7QUFBU0E7Ozs7QUFBc0RBOztBQUNqRUE7O0FBRUFBOztBQUNFQTs7QUFBa0JBOzs7O0FBQXFFQTs7QUFDdkZBOztBQUFTQTs7Ozs7O0FBQThJQTs7QUFDekpBOztBQUVBQTs7OztBQW1DRkE7O0FBQ0ZBOztBQUVBQTs7Ozs7O0FBdkVlQTs7QUFBQUE7O0FBRXVCQTs7QUFBQUE7O0FBTVJBOztBQUFBQTs7QUFnQk5BOztBQUFBQTs7QUFDVEE7O0FBQUFBOztBQUlTQTs7QUFBQUE7O0FBQ1RBOztBQUFBQTs7QUFHTEE7O0FBQUFBLHNNQUErRCxVQUEvRCxFQUErRHVCLEdBQS9EOzs7Ozs7Ozs7OyIsIm5hbWVzIjpbIkNvbXBvdW5kUGFja2FnZSIsIm1ldGFkYXRhIiwiYmJveCIsInhNaW4iLCJ5TWluIiwieE1heCIsInlNYXgiLCJ0eXBlIiwiZ2VvbWV0cnkiLCJjb29yZGluYXRlcyIsInByb3BlcnRpZXMiLCJpZCIsIkdldEZlYXR1cmVJZCIsInh5eiIsInNpemVJbk1pYiIsIngiLCJ5IiwieiIsIkdldE5hbWVGcm9tWFlaIiwibWFwcyIsImxlbmd0aCIsIm1vbWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJtYXAiLCJwIiwibGFzdE1vZGlmaWVkIiwidG9EYXRlIiwidXJscyIsIm5hbWUiLCJ1cmwiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfb2ZmbGluZV9tYXBfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiT2ZmbGluZU1hcFBhZ2VNb2R1bGUiLCJfYW5ndWxhcl9jb21tb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIl9hbmd1bGFyX2Zvcm1zX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV84X18iLCJzcmNfYXBwX21vZHVsZXNfbWFwX21hcF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX2NvbW1vbl9odHRwX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJzcmNfYXBwX21vZHVsZXNfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImRlY2xhcmF0aW9ucyIsIl9vZmZsaW5lX3BhY2thZ2VfbW9kYWxfb2ZmbGluZV9wYWNrYWdlX21vZGFsX2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsIlBBQ0tBR0VfSU5ERVhfVVJMIiwiZmlsbGVkVGlsZU9wYWNpdHkiLCJub3RGaWxsZWRUaWxlT3BhY2l0eSIsImRvY3VtZW50U3R5bGUiLCJnZXRDb21wdXRlZFN0eWxlIiwiZG9jdW1lbnQiLCJib2R5IiwiZGVmYXVsdFRpbGVTdHlsZSIsImNvbG9yIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm9wYWNpdHkiLCJmaWxsT3BhY2l0eSIsImRvd25sb2FkZWRUaWxlU3R5bGUiLCJlcnJvclRpbGVTdHlsZSIsIk9mZmxpbmVNYXBQYWdlIiwiaGVscGVyU2VydmljZSIsIm1vZGFsQ29udHJvbGxlciIsIm9mZmxpbmVNYXBTZXJ2aWNlIiwiYWxlcnRDb250cm9sbGVyIiwidHJhbnNsYXRlU2VydmljZSIsInpvbmUiLCJodHRwIiwiTWFwIiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTBfXyIsInBhY2thZ2VzT25TZXJ2ZXIkIiwiZ2V0IiwicGlwZSIsInBhY2thZ2VJbmRleCIsIm5hbWVBbmRQa2ciLCJfbWV0YWRhdGFfbW9kZWxfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImRvd25sb2FkQW5kVW56aXBQcm9ncmVzcyQiLCJpdGVtcyIsInNvcnQiLCJkb3dubG9hZFN0YXJ0IiwiaW5zdGFsbGVkUGFja2FnZXMkIiwicGFja2FnZXMkIiwiZG93bmxvYWRlZCIsIml0ZW0iLCJnZXRGZWF0dXJlSWRGb3JQYWNrYWdlIiwiYWxsUGFja2FnZXMkIiwiaW5Qcm9ncmVzcyIsInBhY2thZ2VUb3RhbHMkIiwicGFja2FnZXMiLCJjb3VudCIsInNwYWNlIiwibWFwUGFja2FnZSIsInNpemUiLCJzcGFjZVdpdGhVbml0IiwiaHVtYW5SZWFkYWJsZUJ5dGVTaXplIiwibnVtUGFja2FnZXMiLCJzcGFjZVVzZWQiLCJ3aW5kb3ciLCJMRUFGTEVUX01BUCIsInNldFpvb20iLCJ0aWxlc0xheWVyIiwibGVhZmxldF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwib25FYWNoRmVhdHVyZSIsImZlYXR1cmUiLCJsYXllciIsImZlYXR1cmVNYXAiLCJzZXQiLCJvbiIsInBhY2thZ2VzT25TZXJ2ZXIiLCJoYXMiLCJpbnN0YWxsZWRQYWNrYWdlcyIsInNob3dNb2RhbCIsIm5leHQiLCJhZGRMYXllciIsInN1YnNjcmliZSIsInBhY2thZ2VNYXAiLCJmb3JFYWNoIiwiYWRkRGF0YSIsImdldEZlYXR1cmUiLCJuZ0Rlc3Ryb3kkIiwic2V0U3R5bGVGb3JQYWNrYWdlcyIsIml0ZW1zV2l0aFByb2dyZXNzIiwiZmFpbGVkUGFja2FnZUlkcyIsImZpbHRlciIsImVycm9yIiwicnVuT3V0c2lkZUFuZ3VsYXIiLCJzZXRTdHlsZUZvclByb2dyZXNzT3JEb3dubG9hZGVkUGFja2FnZSIsImlzWm9vbWluZyIsInNob3dQYWNrYWdlTW9kYWwiLCJrZXkiLCJzdHlsZSIsImluY2x1ZGVzIiwic2V0U3R5bGVGb3JGZWF0dXJlIiwicG9seWxpbmUiLCJzZXRTdHlsZSIsImRvd25sb2FkQ29tcGxldGUiLCJnZXRQcm9ncmVzc09wYWNpdHkiLCJPYmplY3QiLCJwcm9ncmVzc1ZhbHVlIiwicHJvZ3Jlc3MiLCJwZXJjZW50YWdlIiwiTWF0aCIsIm1pbiIsImNvbXBvdW5kUGFja2FnZU1ldGFkYXRhIiwiZ2V0RmVhdHVyZVByb3BlcnR5SWQiLCJnZXRYWVoiLCJmaXJzdE1hcCIsImtleXMiLCJyb290VGlsZSIsImNvbXBvdW5kUGFja2FnZSIsImdldE5hbWUiLCJjcmVhdGUiLCJjb21wb25lbnRQcm9wcyIsInBhY2thZ2VPblNlcnZlciIsIm9mZmxpbmVQYWNrYWdlU3RhdHVzJCIsImZpbmQiLCJzd2lwZVRvQ2xvc2UiLCJtb2RlIiwibW9kYWwiLCJwcmVzZW50IiwiYnl0ZXMiLCJmcmFjdGlvbkRpZ2l0cyIsImlzTmFOIiwidmFsdWUiLCJyb3VuZCIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiaXNEb3dubG9hZGVkIiwidG9UcmFuc2xhdGUiLCJ0cmFuc2xhdGlvbnMiLCJtZXNzYWdlIiwiYnV0dG9ucyIsInRleHQiLCJyb2xlIiwiaGFuZGxlciIsInJlbW92ZU1hcFBhY2thZ2VCeU5hbWUiLCJhbGVydCIsImNhbmNlbERvd25sb2FkUGFja2FnZSIsImF2YWlsYWJsZURpc2tzcGFjZSIsIl9hIiwiYXZhaWxhYmxlIiwic3JjX2FwcF9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsInNlbGVjdG9ycyIsImZlYXR1cmVzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJjdHgiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJjdHhfcjAiLCJPZmZsaW5lUGFja2FnZU1vZGFsQ29tcG9uZW50IiwiY2RyIiwiaXNDaGVja2luZ0F2YWlsYWJsZURpc2tzcGFjZSIsIm9mZmxpbmVQYWNrYWdlU3RhdHVzVGhhdFRyaWdnZXJzQ2hhbmdlRGV0ZWN0aW9uJCIsImRldGVjdENoYW5nZXMiLCJ0aWxlTGF5ZXIiLCJsZWFmbGV0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJnZXRCb3VuZHMiLCJnZXRDZW50ZXIiLCJsYXQiLCJsbmciLCJjZW50ZXIiLCJ6b29tIiwiZmluaXNoZWRQYWNrYWdlSWRzJCIsInBhY2thZ2VOYW1lIiwiZGlzbWlzcyIsImFkZFRvIiwiY2hlY2tBdmFpbGFibGVEaXNrU3BhY2UiLCJkb3dubG9hZFBhY2thZ2UiLCJzcmNfYXBwX2NvcmVfaGVscGVyc19vYnNlcnZhYmxlX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiaW5wdXRzIiwiX3IyIl0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL21ldGFkYXRhLm1vZGVsLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL29mZmxpbmUtbWFwLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvb2ZmbGluZS1tYXAvb2ZmbGluZS1tYXAucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLXBhY2thZ2UtbW9kYWwvb2ZmbGluZS1wYWNrYWdlLW1vZGFsLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL29mZmxpbmUtbWFwL29mZmxpbmUtcGFja2FnZS1tb2RhbC9vZmZsaW5lLXBhY2thZ2UtbW9kYWwuY29tcG9uZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQkJveCwgRmVhdHVyZSwgUG9seWdvbiB9IGZyb20gJ2dlb2pzb24nO1xyXG5pbXBvcnQgbW9tZW50LCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XHJcblxyXG50eXBlIFhZWiA9IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFja2FnZU1ldGFkYXRhIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgbGFzdE1vZGlmaWVkOiBzdHJpbmc7ICAvLyBpbiBVVENcclxuICB1cmxzOiBzdHJpbmdbXTtcclxuICBzaXplSW5NaWI6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICB4eXo6IFhZWjtcclxuICBiYm94OiBCQm94O1xyXG4gIHNpemVJbk1pYjogbnVtYmVyO1xyXG4gIG1hcHM6IFBhY2thZ2VNZXRhZGF0YVtdXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFydCB7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIHVybDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBDb21wb3VuZFBhY2thZ2VGZWF0dXJlID0gRmVhdHVyZTxQb2x5Z29uLCBudWxsPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb21wb3VuZFBhY2thZ2Uge1xyXG5cclxuICBzdGF0aWMgR2V0TmFtZUZyb21YWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGAke3h9LSR7eX0tJHt6fWA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgR2V0RmVhdHVyZUlkKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBDb21wb3VuZFBhY2thZ2UuR2V0TmFtZUZyb21YWVooeCwgeSwgeik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ldGFkYXRhOiBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YTtcclxuXHJcbiAgY29uc3RydWN0b3IobWV0YWRhdGE6IENvbXBvdW5kUGFja2FnZU1ldGFkYXRhKSB7XHJcbiAgICB0aGlzLm1ldGFkYXRhID0gbWV0YWRhdGE7XHJcbiAgfVxyXG5cclxuICBnZXRGZWF0dXJlKCk6IENvbXBvdW5kUGFja2FnZUZlYXR1cmUge1xyXG4gICAgY29uc3QgW3hNaW4sIHlNaW4sIHhNYXgsIHlNYXhdID0gdGhpcy5tZXRhZGF0YS5iYm94O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogJ0ZlYXR1cmUnLFxyXG4gICAgICBnZW9tZXRyeToge1xyXG4gICAgICAgIGJib3g6IHRoaXMubWV0YWRhdGEuYmJveCxcclxuICAgICAgICB0eXBlOiAnUG9seWdvbicsXHJcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtbXHJcbiAgICAgICAgICBbeE1pbiwgeU1pbl0sXHJcbiAgICAgICAgICBbeE1pbiwgeU1heF0sXHJcbiAgICAgICAgICBbeE1heCwgeU1heF0sXHJcbiAgICAgICAgICBbeE1heCwgeU1pbl0sXHJcbiAgICAgICAgICBbeE1pbiwgeU1pbl1cclxuICAgICAgICBdXVxyXG4gICAgICB9LFxyXG4gICAgICBwcm9wZXJ0aWVzOiBudWxsLFxyXG4gICAgICBpZDogQ29tcG91bmRQYWNrYWdlLkdldEZlYXR1cmVJZCguLi50aGlzLm1ldGFkYXRhLnh5eilcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBnZXRTaXplSW5NaUIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLnNpemVJbk1pYjtcclxuICB9XHJcblxyXG4gIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IFt4LCB5LCB6XSA9IHRoaXMubWV0YWRhdGEueHl6O1xyXG4gICAgcmV0dXJuIENvbXBvdW5kUGFja2FnZS5HZXROYW1lRnJvbVhZWih4LCB5LCB6KTtcclxuICB9XHJcblxyXG4gIGdldExhc3RNb2RpZmllZCgpOiBEYXRlIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhLm1hcHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1vbWVudC5tYXgodGhpcy5tZXRhZGF0YS5tYXBzLm1hcChwID0+IG1vbWVudChwLmxhc3RNb2RpZmllZCkpKS50b0RhdGUoKTtcclxuICB9XHJcblxyXG4gIGdldFBhcnRzKCk6IFBhcnRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5tYXBzXHJcbiAgICAgIC8vIEhlbnQgbmFtZSAvIHVybCBmb3IgYWxsZSBwYWtrZXJcclxuICAgICAgLm1hcCgocCkgPT4gcC51cmxzLm1hcCh1cmwgPT4gKHtuYW1lOiBwLm5hbWUsIHVybH0pKSlcclxuICAgICAgLy8gRmxhdHRlbiBhcnJheVxyXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSwgW10pO1xyXG4gIH1cclxuXHJcbiAgZ2V0WFlaKCk6IFhZWiB7XHJcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS54eXo7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IE9mZmxpbmVNYXBQYWdlIH0gZnJvbSAnLi9vZmZsaW5lLW1hcC5wYWdlJztcclxuaW1wb3J0IHsgTWFwTW9kdWxlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL21hcC9tYXAubW9kdWxlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcclxuaW1wb3J0IHsgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vb2ZmbGluZS1wYWNrYWdlLW1vZGFsL29mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IE9mZmxpbmVNYXBQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIElvbmljTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyksXHJcbiAgICBNYXBNb2R1bGUsXHJcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgU2hhcmVkTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPZmZsaW5lTWFwUGFnZSwgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE9mZmxpbmVNYXBQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+e3sgJ09GRkxJTkVfTUFQLk9GRkxJTkVfTUFQX1BBR0VfVElUTEUnIHwgdHJhbnNsYXRlIH19PC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxkaXYgY2xhc3M9XCJtYXAtY29udGFpbmVyXCI+XHJcbiAgICA8YXBwLW1hcFxyXG4gICAgICAobWFwUmVhZHkpPVwib25NYXBSZWFkeSgkZXZlbnQpXCJcclxuICAgICAgW29mZmxpbmVQYWNrYWdlTW9kZV09XCJ0cnVlXCJcclxuICAgICAgW3Nob3dTY2FsZV09XCJmYWxzZVwiXHJcbiAgICAgIFtzaG93TWFwU2VhcmNoXT1mYWxzZVxyXG4gICAgICBbc2hvd0Z1bGxzY3JlZW5Ub2dnbGVdPWZhbHNlXHJcbiAgICAgIFtzaG93R3BzQ2VudGVyXT10cnVlXHJcbiAgICAgIFtzaG93VXNlckxvY2F0aW9uXT1cInRydWVcIlxyXG4gICAgICBbc2hvd1N1cHBvcnRNYXBzXT1cImZhbHNlXCJcclxuICAgICAgW2F1dG9BY3RpdmF0ZV09XCJ0cnVlXCJcclxuICAgICAgW2dlb1RhZ109XCIncGFja2FnZS1tYXAnXCJcclxuICAgID48L2FwcC1tYXA+XHJcbiAgPC9kaXY+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxpb24tZm9vdGVyPlxyXG4gIDxpb24tbGlzdD5cclxuICAgIDxpb24taXRlbSAqbmdJZj1cInBhY2thZ2VUb3RhbHMkIHwgYXN5bmMgYXMgcGFja2FnZVRvdGFsc1wiIChjbGljayk9XCJleHBhbmRlZCA9ICFleHBhbmRlZFwiIGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxhYmVsICpuZ0lmPVwicGFja2FnZVRvdGFscy5udW1QYWNrYWdlcyA9PT0gMVwiIGNsYXNzPVwicGFja2FnZS1jb3VudFwiPnt7ICdPRkZMSU5FX01BUC5QQUNLQUdFX0NPVU5UX1NJTkdMRScgfCB0cmFuc2xhdGU6e3BhY2thZ2VDb3VudDogcGFja2FnZVRvdGFscy5udW1QYWNrYWdlc30gfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1sYWJlbCAqbmdJZj1cInBhY2thZ2VUb3RhbHMubnVtUGFja2FnZXMgIT09IDFcIiBjbGFzcz1cInBhY2thZ2UtY291bnRcIj57eyAnT0ZGTElORV9NQVAuUEFDS0FHRV9DT1VOVF9NVUxUSVBMRScgfCB0cmFuc2xhdGU6e3BhY2thZ2VDb3VudDogcGFja2FnZVRvdGFscy5udW1QYWNrYWdlc30gfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cInBhY2thZ2VzLXNpemVcIj57eyBwYWNrYWdlVG90YWxzLnNwYWNlVXNlZCB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWxhYmVsIGNsYXNzPVwic3BhY2UtYXZhaWxhYmxlXCI+KHt7ICdPRkZMSU5FX01BUC5TUEFDRV9BVkFJTEFCTEUnIHwgdHJhbnNsYXRlOntzcGFjZUF2YWlsYWJsZTogZ2V0U3BhY2VBdmFpbGFibGUoKX0gfX0pPC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24taWNvbiAqbmdJZj1cInBhY2thZ2VUb3RhbHMubnVtUGFja2FnZXMgPiAwXCIgc2xvdD1cImVuZFwiIFtuYW1lXT1cImV4cGFuZGVkID8gJ2NoZXZyb24tZG93bi1jaXJjbGUnIDogJ2NoZXZyb24tdXAtY2lyY2xlJ1wiIGNsYXNzPVwiZXhwYW5kLWljb25cIj48L2lvbi1pY29uPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImV4cGFuZGVkICYmIGFsbFBhY2thZ2VzJCB8IGFzeW5jIGFzIGl0ZW1zXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJzaG93UGFja2FnZU1vZGFsRm9yUGFja2FnZShpdGVtKVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zXCIgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7IGl0ZW0ubmFtZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eyBodW1hblJlYWRhYmxlQnl0ZVNpemUoaXRlbS5zaXplKSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eyBmb3JtYXRQcm9ncmVzc0lmRG93bmxvYWRpbmcoaXRlbSkgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgKm5nSWY9XCJpdGVtLmVycm9yXCIgbmFtZT1cIndhcm5pbmctb3V0bGluZVwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWljb24gc2xvdD1cImVuZFwiICpuZ0lmPVwiIShpdGVtLmVycm9yKVwiIChjbGljayk9XCJjYW5jZWxPckRlbGV0ZShpdGVtLCAkZXZlbnQpXCIgbmFtZT1cInRyYXNoLW91dGxpbmVcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9pb24tbGlzdD5cclxuPC9pb24tZm9vdGVyPlxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPZmZsaW5lTWFwU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb2ZmbGluZS1tYXAvb2ZmbGluZS1tYXAuc2VydmljZSc7XHJcbmltcG9ydCB7IE9mZmxpbmVNYXBQYWNrYWdlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5tb2RlbCc7XHJcbmltcG9ydCB7IEhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2hlbHBlcnMvaGVscGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIsIE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBmaXJzdFZhbHVlRnJvbSwgZnJvbSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwLCB0YWtlVW50aWwsIHRhcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9mZmxpbmVQYWNrYWdlTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL29mZmxpbmUtcGFja2FnZS1tb2RhbC9vZmZsaW5lLXBhY2thZ2UtbW9kYWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tcG91bmRQYWNrYWdlLCBDb21wb3VuZFBhY2thZ2VNZXRhZGF0YSwgQ29tcG91bmRQYWNrYWdlRmVhdHVyZSB9IGZyb20gJy4vbWV0YWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5jb25zdCBQQUNLQUdFX0lOREVYX1VSTCA9ICdodHRwczovL29mZmxpbmVtYXAuYmxvYi5jb3JlLndpbmRvd3MubmV0L3BhY2thZ2VzL3BhY2thZ2VJbmRleF92Mi5qc29uJztcclxuY29uc3QgZmlsbGVkVGlsZU9wYWNpdHkgPSAwLjg7XHJcbmNvbnN0IG5vdEZpbGxlZFRpbGVPcGFjaXR5ID0gMC4xO1xyXG5jb25zdCBkb2N1bWVudFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KTtcclxuY29uc3QgZGVmYXVsdFRpbGVTdHlsZSA9IHtcclxuICBjb2xvcjogZG9jdW1lbnRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLWlvbi1jb2xvci1wcmltYXJ5JyksXHJcbiAgb3BhY2l0eTogMSxcclxuICBmaWxsT3BhY2l0eTogbm90RmlsbGVkVGlsZU9wYWNpdHlcclxufTtcclxuY29uc3QgZG93bmxvYWRlZFRpbGVTdHlsZSA9IHtcclxuICAuLi5kZWZhdWx0VGlsZVN0eWxlLFxyXG4gIGZpbGxPcGFjaXR5OiBmaWxsZWRUaWxlT3BhY2l0eSxcclxufTtcclxuY29uc3QgZXJyb3JUaWxlU3R5bGUgPSB7XHJcbiAgLi4uZG93bmxvYWRlZFRpbGVTdHlsZSxcclxuICBjb2xvcjogZG9jdW1lbnRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCctLWlvbi1jb2xvci1kYW5nZXInKSxcclxufTtcclxuXHJcbnR5cGUgUGFja2FnZUluZGV4ID0gQ29tcG91bmRQYWNrYWdlTWV0YWRhdGFbXTtcclxuXHJcbmludGVyZmFjZSBQYWNrYWdlVG90YWxzIHtcclxuICBudW1QYWNrYWdlczogbnVtYmVyLFxyXG4gIHNwYWNlVXNlZDogc3RyaW5nXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW9mZmxpbmUtbWFwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb2ZmbGluZS1tYXAucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vZmZsaW5lLW1hcC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2ZmbGluZU1hcFBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IGluc3RhbGxlZFBhY2thZ2VzJDogT2JzZXJ2YWJsZTxNYXA8c3RyaW5nLCBPZmZsaW5lTWFwUGFja2FnZT4+O1xyXG4gIHByaXZhdGUgaW5zdGFsbGVkUGFja2FnZXM6IE1hcDxzdHJpbmcsIE9mZmxpbmVNYXBQYWNrYWdlPiA9IG5ldyBNYXAoKTtcclxuICBwcml2YXRlIGZhaWxlZFBhY2thZ2VJZHM6IHN0cmluZ1tdID0gW107IC8vcmVtZW1iZXIgZmFpbGVkIHBhY2thZ2VzIHVudGlsIGZlYXR1cmVzIGFyZSByZWFkeSBmb3Igc3R5bGluZ1xyXG4gIHByaXZhdGUgZG93bmxvYWRBbmRVbnppcFByb2dyZXNzJDogT2JzZXJ2YWJsZTxPZmZsaW5lTWFwUGFja2FnZVtdPjtcclxuICBwYWNrYWdlVG90YWxzJDogT2JzZXJ2YWJsZTxQYWNrYWdlVG90YWxzPjtcclxuICByZWFkb25seSBhbGxQYWNrYWdlcyQ6IE9ic2VydmFibGU8T2ZmbGluZU1hcFBhY2thZ2VbXT47XHJcbiAgcHJpdmF0ZSBwYWNrYWdlc09uU2VydmVyJDogT2JzZXJ2YWJsZTxNYXA8c3RyaW5nLCBDb21wb3VuZFBhY2thZ2U+PjtcclxuICBwcml2YXRlIHBhY2thZ2VzT25TZXJ2ZXI6IE1hcDxzdHJpbmcsIENvbXBvdW5kUGFja2FnZT4gPSBuZXcgTWFwKCk7XHJcbiAgc2hvd1RpbGVDYXJkID0gdHJ1ZTtcclxuICB0aWxlc0xheWVyOiBMLkdlb0pTT047XHJcbiAgLy8gQ291bGQgbm90IGdldCB0aGUgY2xpY2sgaGFuZGxlciB0byBvbmx5IGVtaXQgb25jZSBwZXIgY2xpY2ssIHNvIHdyYXBwZWQgdGhpcyBpbiBhIHN1YmplY3RcclxuICBzaG93TW9kYWwgPSBuZXcgU3ViamVjdDxDb21wb3VuZFBhY2thZ2VGZWF0dXJlPigpO1xyXG4gIGlzWm9vbWluZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gIGZlYXR1cmVNYXAgPSBuZXcgTWFwPHN0cmluZywgeyBmZWF0dXJlOiBDb21wb3VuZFBhY2thZ2VGZWF0dXJlLCBsYXllcjogTC5MYXllciB9PigpO1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7IC8vc2hvdyBsaXN0IG9mIGRvd25sb2FkcyBpZiB0aGlzIGlzIHRydWVcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGhlbHBlclNlcnZpY2U6IEhlbHBlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBvZmZsaW5lTWFwU2VydmljZTogT2ZmbGluZU1hcFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIC8vIERvd25sb2FkIHBhY2thZ2UgaW5kZXggZnJvbSBhenVyZVxyXG4gICAgdGhpcy5wYWNrYWdlc09uU2VydmVyJCA9IGh0dHAuZ2V0PFBhY2thZ2VJbmRleD4oUEFDS0FHRV9JTkRFWF9VUkwpLnBpcGUoXHJcbiAgICAgIC8vIE1hcCBkb3dubG9hZGVkIHBhY2thZ2UgaW5kZXggdG8gYSBwYWNrYWdlTmFtZSA9PiBwYWNrYWdlIG1hcFxyXG4gICAgICBtYXAoKHBhY2thZ2VJbmRleCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5hbWVBbmRQa2c6IFtzdHJpbmcsIENvbXBvdW5kUGFja2FnZV1bXSA9IHBhY2thZ2VJbmRleC5tYXAocCA9PiBbXHJcbiAgICAgICAgICBDb21wb3VuZFBhY2thZ2UuR2V0TmFtZUZyb21YWVooLi4ucC54eXopLFxyXG4gICAgICAgICAgbmV3IENvbXBvdW5kUGFja2FnZShwKVxyXG4gICAgICAgIF0pO1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwKG5hbWVBbmRQa2cpO1xyXG4gICAgICB9KSxcclxuICAgICAgc2hhcmVSZXBsYXkoKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmRvd25sb2FkQW5kVW56aXBQcm9ncmVzcyQgPSB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmRvd25sb2FkQW5kVW56aXBQcm9ncmVzcyRcclxuICAgICAgLnBpcGUobWFwKChpdGVtcykgPT4gaXRlbXMuc29ydCgoKGEsIGIpID0+IGIuZG93bmxvYWRTdGFydCAtIGEuZG93bmxvYWRTdGFydCkpKSk7XHJcbiAgICB0aGlzLmluc3RhbGxlZFBhY2thZ2VzJCA9IHRoaXMub2ZmbGluZU1hcFNlcnZpY2UucGFja2FnZXMkXHJcbiAgICAgIC5waXBlKG1hcCgoZG93bmxvYWRlZCkgPT4gbmV3IE1hcChkb3dubG9hZGVkLm1hcCgoaXRlbSkgPT4gW3RoaXMuZ2V0RmVhdHVyZUlkRm9yUGFja2FnZShpdGVtKSwgaXRlbV0pKSkpO1xyXG4gICAgdGhpcy5hbGxQYWNrYWdlcyQgPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy5vZmZsaW5lTWFwU2VydmljZS5kb3dubG9hZEFuZFVuemlwUHJvZ3Jlc3MkLFxyXG4gICAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLnBhY2thZ2VzJFxyXG4gICAgXSkucGlwZSgobWFwKChbaW5Qcm9ncmVzcywgZG93bmxvYWRlZF0pID0+IFsuLi5pblByb2dyZXNzLCAuLi5kb3dubG9hZGVkXSkpKTtcclxuXHJcbiAgICB0aGlzLnBhY2thZ2VUb3RhbHMkID0gdGhpcy5hbGxQYWNrYWdlcyQucGlwZShcclxuICAgICAgbWFwKChwYWNrYWdlcykgPT4ge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IHNwYWNlID0gMDtcclxuICAgICAgICBmb3IgKGNvbnN0IG1hcFBhY2thZ2Ugb2YgcGFja2FnZXMpIHtcclxuICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICBzcGFjZSArPSBtYXBQYWNrYWdlLnNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzcGFjZVdpdGhVbml0ID0gJzAgTUInO1xyXG4gICAgICAgIGlmIChzcGFjZSA+IDApIHtcclxuICAgICAgICAgIHNwYWNlV2l0aFVuaXQgPSB0aGlzLmh1bWFuUmVhZGFibGVCeXRlU2l6ZShzcGFjZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IG51bVBhY2thZ2VzOiBjb3VudCwgc3BhY2VVc2VkOiBzcGFjZVdpdGhVbml0IH07XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25NYXBSZWFkeShtYXA6IEwuTWFwKSB7XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgKHdpbmRvdyBhcyBhbnkpLkxFQUZMRVRfTUFQID0gbWFwO1xyXG5cclxuICAgIG1hcC5zZXRab29tKDcpO1xyXG5cclxuICAgIHRoaXMudGlsZXNMYXllciA9IG5ldyBMLkdlb0pTT04obnVsbCwge1xyXG4gICAgICBvbkVhY2hGZWF0dXJlOiAoZmVhdHVyZTogQ29tcG91bmRQYWNrYWdlRmVhdHVyZSwgbGF5ZXIpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVNYXAuc2V0KGZlYXR1cmUuaWQgYXMgc3RyaW5nLCB7IGZlYXR1cmUsIGxheWVyIH0pO1xyXG4gICAgICAgIGxheWVyLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgIGlmKHRoaXMucGFja2FnZXNPblNlcnZlci5oYXMoZmVhdHVyZS5pZCBhcyBzdHJpbmcpIHx8IHRoaXMuaW5zdGFsbGVkUGFja2FnZXMuaGFzKGZlYXR1cmUuaWQgYXMgc3RyaW5nKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbC5uZXh0KGZlYXR1cmUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBtYXAuYWRkTGF5ZXIodGhpcy50aWxlc0xheWVyKTtcclxuXHJcbiAgICB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIkLnN1YnNjcmliZShwYWNrYWdlTWFwID0+IHtcclxuICAgICAgcGFja2FnZU1hcC5mb3JFYWNoKChtYXBQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgdGhpcy50aWxlc0xheWVyLmFkZERhdGEobWFwUGFja2FnZS5nZXRGZWF0dXJlKCkpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLmluc3RhbGxlZFBhY2thZ2VzJCxcclxuICAgICAgdGhpcy5wYWNrYWdlc09uU2VydmVyJFxyXG4gICAgXSlcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKFtpbnN0YWxsZWRQYWNrYWdlcywgcGFja2FnZXNPblNlcnZlcl0pID0+IHtcclxuICAgICAgICB0aGlzLmluc3RhbGxlZFBhY2thZ2VzID0gaW5zdGFsbGVkUGFja2FnZXM7XHJcbiAgICAgICAgdGhpcy5wYWNrYWdlc09uU2VydmVyID0gcGFja2FnZXNPblNlcnZlcjtcclxuICAgICAgICB0aGlzLnNldFN0eWxlRm9yUGFja2FnZXMoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5kb3dubG9hZEFuZFVuemlwUHJvZ3Jlc3MkLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpLnBpcGUoXHJcbiAgICAgIHRhcCgoaXRlbXNXaXRoUHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICB0aGlzLmZhaWxlZFBhY2thZ2VJZHMgPSBpdGVtc1dpdGhQcm9ncmVzcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmVycm9yKS5tYXAoaXRlbSA9PiBpdGVtLm5hbWUpO1xyXG4gICAgICB9KVxyXG4gICAgKS5zdWJzY3JpYmUoKGl0ZW1zV2l0aFByb2dyZXNzKSA9PiB7XHJcbiAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgZm9yKGNvbnN0IGl0ZW0gb2YgaXRlbXNXaXRoUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgIHRoaXMuc2V0U3R5bGVGb3JQcm9ncmVzc09yRG93bmxvYWRlZFBhY2thZ2UoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2hvd01vZGFsLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlVGltZSgyMDApLFxyXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmlzWm9vbWluZyksXHJcbiAgICAgIGZpbHRlcigoWywgaXNab29taW5nXSkgPT4gIWlzWm9vbWluZyksXHJcbiAgICAgIHN3aXRjaE1hcCgoW2ZlYXR1cmUsIF0pID0+IGZyb20odGhpcy5zaG93UGFja2FnZU1vZGFsKGZlYXR1cmUpKSksXHJcbiAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICApLnN1YnNjcmliZSgpO1xyXG5cclxuICAgIC8vIFRoaXMgaXMgdG8gYXZvaWQgcGluY2gtem9vbWluZyBvbiBtYXAgdHJpZ2dlcnMgY2xpY2sgZXZlbnRcclxuICAgIG1hcC5vbignZHJhZ2VuZCB6b29tZW5kJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzWm9vbWluZy5uZXh0KGZhbHNlKTtcclxuICAgIH0pO1xyXG4gICAgbWFwLm9uKCdkcmFnc3RhcnQgem9vbXN0YXJ0JywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzWm9vbWluZy5uZXh0KHRydWUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFN0eWxlRm9yUGFja2FnZXMoKSB7XHJcbiAgICBmb3IoY29uc3QgWywgaXRlbV0gb2YgdGhpcy5pbnN0YWxsZWRQYWNrYWdlcykge1xyXG4gICAgICB0aGlzLnNldFN0eWxlRm9yUHJvZ3Jlc3NPckRvd25sb2FkZWRQYWNrYWdlKGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgZm9yKGNvbnN0IFtrZXksIF0gb2YgdGhpcy5wYWNrYWdlc09uU2VydmVyKSB7XHJcbiAgICAgIGxldCBzdHlsZSA9IGRlZmF1bHRUaWxlU3R5bGU7XHJcbiAgICAgIGlmKCF0aGlzLmluc3RhbGxlZFBhY2thZ2VzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZmFpbGVkUGFja2FnZUlkcy5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICBzdHlsZSA9IGVycm9yVGlsZVN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0eWxlRm9yRmVhdHVyZShrZXksIHN0eWxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdHlsZUZvckZlYXR1cmUoaWQ6IHN0cmluZywgc3R5bGU6IEwuUGF0aE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGZlYXR1cmUgPSB0aGlzLmZlYXR1cmVNYXAuZ2V0KGlkKTtcclxuICAgIGlmKGZlYXR1cmUpIHtcclxuICAgICAgY29uc3QgcG9seWxpbmUgPSAoZmVhdHVyZS5sYXllciBhcyBMLlBvbHlsaW5lKTtcclxuICAgICAgcG9seWxpbmUuc2V0U3R5bGUoc3R5bGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdHlsZUZvclByb2dyZXNzT3JEb3dubG9hZGVkUGFja2FnZShpdGVtOiBPZmZsaW5lTWFwUGFja2FnZSkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmdldEZlYXR1cmVJZEZvclBhY2thZ2UoaXRlbSk7XHJcbiAgICBpZiAoaXRlbS5lcnJvcikge1xyXG4gICAgICB0aGlzLnNldFN0eWxlRm9yRmVhdHVyZShpZCwgZXJyb3JUaWxlU3R5bGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgZmlsbE9wYWNpdHkgPSBpdGVtLmRvd25sb2FkQ29tcGxldGUgPyAwIDogdGhpcy5nZXRQcm9ncmVzc09wYWNpdHkoaXRlbSk7XHJcbiAgICAgIHRoaXMuc2V0U3R5bGVGb3JGZWF0dXJlKGlkLCB7IC4uLmRlZmF1bHRUaWxlU3R5bGUsIGZpbGxPcGFjaXR5IH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRQcm9ncmVzc09wYWNpdHkoaXRlbTogT2ZmbGluZU1hcFBhY2thZ2UpIHtcclxuICAgIGNvbnN0IHByb2dyZXNzVmFsdWUgPSAoaXRlbS5wcm9ncmVzcyA/IChpdGVtLnByb2dyZXNzLnBlcmNlbnRhZ2UgLyAyLjApIDogMCkgKyAwLjQ7XHJcbiAgICByZXR1cm4gTWF0aC5taW4ocHJvZ3Jlc3NWYWx1ZSwgZmlsbGVkVGlsZU9wYWNpdHkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGZWF0dXJlUHJvcGVydHlJZCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gQ29tcG91bmRQYWNrYWdlLkdldE5hbWVGcm9tWFlaKHgsIHksIHopO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRGZWF0dXJlSWRGb3JQYWNrYWdlKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpOiBzdHJpbmcge1xyXG4gICAgaWYobWFwLmNvbXBvdW5kUGFja2FnZU1ldGFkYXRhKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdldEZlYXR1cmVQcm9wZXJ0eUlkKC4uLm1hcC5jb21wb3VuZFBhY2thZ2VNZXRhZGF0YS5nZXRYWVooKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBmaXJzdE1hcCA9IE9iamVjdC5rZXlzKG1hcC5tYXBzKVswXTtcclxuICAgIGlmKG1hcC5tYXBzW2ZpcnN0TWFwXSkge1xyXG4gICAgICBjb25zdCByb290VGlsZSA9IG1hcC5tYXBzW2ZpcnN0TWFwXS5yb290VGlsZTtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0RmVhdHVyZVByb3BlcnR5SWQocm9vdFRpbGUueCwgcm9vdFRpbGUueSwgcm9vdFRpbGUueik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuXHJcbiAgYXN5bmMgc2hvd1BhY2thZ2VNb2RhbChmZWF0dXJlOiBDb21wb3VuZFBhY2thZ2VGZWF0dXJlKSB7XHJcbiAgICBjb25zdCBjb21wb3VuZFBhY2thZ2UgPSB0aGlzLnBhY2thZ2VzT25TZXJ2ZXIuZ2V0KGZlYXR1cmUuaWQgYXMgc3RyaW5nKTtcclxuICAgIGNvbnN0IG5hbWUgPSBjb21wb3VuZFBhY2thZ2UuZ2V0TmFtZSgpO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IE9mZmxpbmVQYWNrYWdlTW9kYWxDb21wb25lbnQsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgZmVhdHVyZTogZmVhdHVyZSxcclxuICAgICAgICBwYWNrYWdlT25TZXJ2ZXI6IGNvbXBvdW5kUGFja2FnZSxcclxuICAgICAgICBvZmZsaW5lUGFja2FnZVN0YXR1cyQ6IHRoaXMuYWxsUGFja2FnZXMkLnBpcGUoXHJcbiAgICAgICAgICBtYXAocGFja2FnZXMgPT4gcGFja2FnZXMuZmluZChwID0+IHAubmFtZSA9PT0gbmFtZSkpKSxcclxuICAgICAgfSxcclxuICAgICAgc3dpcGVUb0Nsb3NlOiB0cnVlLFxyXG4gICAgICBtb2RlOiAnaW9zJ1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBtb2RhbC5wcmVzZW50KCk7XHJcbiAgfVxyXG5cclxuICBzaG93UGFja2FnZU1vZGFsRm9yUGFja2FnZShtYXA6IE9mZmxpbmVNYXBQYWNrYWdlKSB7XHJcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5mZWF0dXJlTWFwLmdldChtYXAubmFtZSk7XHJcbiAgICBpZiAoZmVhdHVyZSkge1xyXG4gICAgICB0aGlzLnNob3dQYWNrYWdlTW9kYWwoZmVhdHVyZS5mZWF0dXJlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGh1bWFuUmVhZGFibGVCeXRlU2l6ZShieXRlczogbnVtYmVyLCBmcmFjdGlvbkRpZ2l0cyA9IDApOiBzdHJpbmcge1xyXG4gICAgaWYgKGlzTmFOKGJ5dGVzKSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5oZWxwZXJTZXJ2aWNlLmh1bWFuUmVhZGFibGVCeXRlU2l6ZShieXRlcywgZnJhY3Rpb25EaWdpdHMsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0UHJvZ3Jlc3NJZkRvd25sb2FkaW5nKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpOiBzdHJpbmcge1xyXG4gICAgaWYgKG1hcC5kb3dubG9hZFN0YXJ0ICYmICFtYXAuZG93bmxvYWRDb21wbGV0ZSkge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IE1hdGgucm91bmQoKG1hcC5wcm9ncmVzcyA/IG1hcC5wcm9ncmVzcy5wZXJjZW50YWdlIDogMCkgKiAxMDApO1xyXG4gICAgICByZXR1cm4gYCgke3ZhbHVlfSUpYDtcclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbE9yRGVsZXRlKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UsIGV2ZW50OiBFdmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBpZiAodGhpcy5pc0Rvd25sb2FkZWQobWFwKSkge1xyXG4gICAgICBjb25zdCB0b1RyYW5zbGF0ZSA9IFsnT0ZGTElORV9NQVAuREVMRVRFX1BBQ0tBR0VfQ09ORklSTScsICdESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLkRFTEVURSddO1xyXG4gICAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCBmaXJzdFZhbHVlRnJvbSh0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KHRvVHJhbnNsYXRlKSk7XHJcbiAgICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2xhdGlvbnNbJ09GRkxJTkVfTUFQLkRFTEVURV9QQUNLQUdFX0NPTkZJUk0nXSxcclxuICAgICAgICBidXR0b25zOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ERUxFVEUnXSxcclxuICAgICAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UucmVtb3ZlTWFwUGFja2FnZUJ5TmFtZShtYXAubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0pO1xyXG4gICAgICBhbGVydC5wcmVzZW50KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmNhbmNlbERvd25sb2FkUGFja2FnZShtYXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNEb3dubG9hZGVkKG1hcDogT2ZmbGluZU1hcFBhY2thZ2UpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIW1hcC5kb3dubG9hZENvbXBsZXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3BhY2VBdmFpbGFibGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmh1bWFuUmVhZGFibGVCeXRlU2l6ZSh0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmF2YWlsYWJsZURpc2tzcGFjZT8uYXZhaWxhYmxlLCAwKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXIgdHJhbnNsdWNlbnQ+XHJcbiAgPGlvbi10b29sYmFyPlxyXG4gICAgPGlvbi10aXRsZT57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLkhFQURFUicgfCB0cmFuc2xhdGU6e25hbWU6IHBhY2thZ2VPblNlcnZlci5nZXROYW1lKCl9IH19PC9pb24tdGl0bGU+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cImVuZFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZGlzbWlzcygpXCI+e3sgJ0NMT1NFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxkaXYgY2xhc3M9XCJtYXAtY29udGFpbmVyXCIgKm5nSWY9XCJjZW50ZXJcIj5cclxuICAgIDxhcHAtbWFwXHJcbiAgICAgIFtvZmZsaW5lUGFja2FnZU1vZGVdPVwidHJ1ZVwiXHJcbiAgICAgIFtzaG93TWFwU2VhcmNoXT1mYWxzZVxyXG4gICAgICBbc2hvd0Z1bGxzY3JlZW5Ub2dnbGVdPWZhbHNlXHJcbiAgICAgIFtzaG93R3BzQ2VudGVyXT1mYWxzZVxyXG4gICAgICBbc2hvd1VzZXJMb2NhdGlvbl09XCJmYWxzZVwiXHJcbiAgICAgIFtzaG93U3VwcG9ydE1hcHNdPVwiZmFsc2VcIlxyXG4gICAgICBbY2VudGVyXT1cImNlbnRlclwiXHJcbiAgICAgIFt6b29tXT1cInpvb21cIlxyXG4gICAgICAobWFwUmVhZHkpPVwic2hvd1RpbGVPbk1hcCgkZXZlbnQpXCJcclxuICAgID48L2FwcC1tYXA+XHJcbiAgPC9kaXY+XHJcbiAgPGlvbi1ncmlkPlxyXG5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBzaXplPVwiNFwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuUEFDS0FHRV9QUk9EVUNFRF9EQVRFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWNvbD5cclxuICAgICAgPGlvbi1jb2w+e3sgcGFja2FnZU9uU2VydmVyLmdldExhc3RNb2RpZmllZCgpIHwgZGF0ZTonc2hvcnQnIH19PC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aW9uLWNvbCBzaXplPVwiNFwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuUEFDS0FHRV9TSVpFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWNvbD5cclxuICAgICAgPGlvbi1jb2w+e3sgJ09GRkxJTkVfTUFQLk1BUF9QQUNLQUdFX0RFVEFJTFNfUEFHRS5QQUNLQUdFX1NJWkVfVkFMVUVfV0lUSF9VTklUJyB8IHRyYW5zbGF0ZTp7c2l6ZTogcGFja2FnZU9uU2VydmVyLmdldFNpemVJbk1pQigpIHwgbnVtYmVyOiAnMS4wLTEnfSB9fTwvaW9uLWNvbD5cclxuICAgIDwvaW9uLXJvdz5cclxuXHJcbiAgICA8ZGl2ICpuZ0lmPVwib2ZmbGluZVBhY2thZ2VTdGF0dXNUaGF0VHJpZ2dlcnNDaGFuZ2VEZXRlY3Rpb24kIHwgYXN5bmMgYXMgcGFja2FnZVN0YXR1cyBlbHNlIGRvd25sb2FkUGFja2FnZVwiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNFwiPnt7ICdPRkZMSU5FX01BUC5NQVBfUEFDS0FHRV9ERVRBSUxTX1BBR0UuUEFDS0FHRV9ET1dOTE9BRF9TVEFUVVMnIHwgdHJhbnNsYXRlIH19PC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sPlxyXG4gICAgICAgICAge3sgcGFja2FnZVN0YXR1cy5wcm9ncmVzcz8uZGVzY3JpcHRpb24gfX1cclxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiISFwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGVcIj57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLlBBQ0tBR0VfRE9XTkxPQURFRF9EQVRFJyB8IHRyYW5zbGF0ZTp7ZGF0ZTogcGFja2FnZVN0YXR1cy5kb3dubG9hZENvbXBsZXRlICogMTAwMCB8IGRhdGU6J3Nob3J0J30gfX0gPC9zcGFuPlxyXG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhcGFja2FnZVN0YXR1cy5kb3dubG9hZENvbXBsZXRlXCI+KHt7Z2V0UGVyY2VudGFnZShwYWNrYWdlU3RhdHVzKSArJyUnIH19KTwvc3Bhbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjFcIj5cclxuICAgICAgICAgIDxpb24taWNvbiAqbmdJZj1cIiEhcGFja2FnZVN0YXR1cy5kb3dubG9hZENvbXBsZXRlXCIgbmFtZT1cImNoZWNrbWFya1wiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWljb24gKm5nSWY9XCIhcGFja2FnZVN0YXR1cy5lcnJvciAmJiBwYWNrYWdlU3RhdHVzLnByb2dyZXNzPy5zdGVwID09PSAwXCIgbmFtZT1cInN0b3B3YXRjaC1vdXRsaW5lXCI+XHJcbiAgICAgICAgICA8L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiIXBhY2thZ2VTdGF0dXMuZXJyb3IgJiYgcGFja2FnZVN0YXR1cy5wcm9ncmVzcz8uc3RlcCA9PT0gMVwiIG5hbWU9XCJjbG91ZC1kb3dubG9hZC1vdXRsaW5lXCI+XHJcbiAgICAgICAgICA8L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwiIXBhY2thZ2VTdGF0dXMuZXJyb3IgJiYgcGFja2FnZVN0YXR1cy5wcm9ncmVzcz8uc3RlcCA9PT0gMlwiIG5hbWU9XCJmb2xkZXItb3Blbi1vdXRsaW5lXCI+XHJcbiAgICAgICAgICA8L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1pY29uICpuZ0lmPVwicGFja2FnZVN0YXR1cy5lcnJvclwiIG5hbWU9XCJ3YXJuaW5nLW91dGxpbmVcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cIiFwYWNrYWdlU3RhdHVzLmRvd25sb2FkQ29tcGxldGUgJiYgIXBhY2thZ2VTdGF0dXMuZXJyb3JcIj5cclxuICAgICAgICA8aW9uLWNvbD5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJkYW5nZXJcIiAoY2xpY2spPVwiY2FuY2VsKHBhY2thZ2VTdGF0dXMpXCI+e3sgJ09GRkxJTkVfTUFQLk1BUF9QQUNLQUdFX0RFVEFJTFNfUEFHRS5DQU5DRUxfRE9XTkxPQURfQlVUVE9OJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3cgKm5nSWY9XCJwYWNrYWdlU3RhdHVzLmVycm9yXCI+XHJcbiAgICAgICAgPGlvbi1jb2w+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBleHBhbmQ9XCJibG9ja1wiIGNvbG9yPVwidmFyc29tLW9yYW5nZVwiIChjbGljayk9XCJzdGFydERvd25sb2FkKClcIj57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLlRSWV9BR0FJTl9CVVRUT04nIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cIiEhcGFja2FnZVN0YXR1cy5kb3dubG9hZENvbXBsZXRlIHx8IHBhY2thZ2VTdGF0dXMuZXJyb3JcIj5cclxuICAgICAgICA8aW9uLWNvbD5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkZWxldGUoKVwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJkYW5nZXJcIj57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLkRFTEVURV9CVVRUT04nIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9pb24tY29udGVudD5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZG93bmxvYWRQYWNrYWdlPlxyXG4gIDxpb24tcm93PlxyXG4gICAgPGlvbi1jb2w+XHJcbiAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJpc0NoZWNraW5nQXZhaWxhYmxlRGlza3NwYWNlXCIgKGNsaWNrKT1cInN0YXJ0RG93bmxvYWQoKVwiIGV4cGFuZD1cImJsb2NrXCJcclxuICAgICAgICBjb2xvcj1cInZhcnNvbS1vcmFuZ2VcIj57eyAnT0ZGTElORV9NQVAuTUFQX1BBQ0tBR0VfREVUQUlMU19QQUdFLkRPV05MT0FEX0JVVFRPTicgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0ICogYXMgTCBmcm9tICdsZWFmbGV0JztcclxuaW1wb3J0IHsgQ29tcG91bmRQYWNrYWdlRmVhdHVyZSwgQ29tcG91bmRQYWNrYWdlIH0gZnJvbSAnLi4vbWV0YWRhdGEubW9kZWwnO1xyXG5pbXBvcnQgeyBPZmZsaW5lTWFwU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvY29yZS9zZXJ2aWNlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBPZmZsaW5lTWFwUGFja2FnZSB9IGZyb20gJ3NyYy9hcHAvY29yZS9zZXJ2aWNlcy9vZmZsaW5lLW1hcC9vZmZsaW5lLW1hcC5tb2RlbCc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuLyoqXHJcbiAqIFNob3dzIGRldGFpbCBpbmZvIGFib3V0IGEgc3BlY2lmaWMgb2ZmbGluZSBtYXAgcGFja2FnZS4gRnJvbSBoZXJlIHlvdSBtYXkgZG93bmxvYWQgb3IgZGVsZXRlIHRoZSBwYWNrYWdlLlxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgdGVtcGxhdGVVcmw6ICcuL29mZmxpbmUtcGFja2FnZS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vb2ZmbGluZS1wYWNrYWdlLW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT2ZmbGluZVBhY2thZ2VNb2RhbENvbXBvbmVudCBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGZlYXR1cmU6IENvbXBvdW5kUGFja2FnZUZlYXR1cmU7XHJcbiAgQElucHV0KCkgcGFja2FnZU9uU2VydmVyOiBDb21wb3VuZFBhY2thZ2U7XHJcbiAgQElucHV0KCkgb2ZmbGluZVBhY2thZ2VTdGF0dXMkOiBPYnNlcnZhYmxlPE9mZmxpbmVNYXBQYWNrYWdlPjtcclxuXHJcbiAgem9vbTogbnVtYmVyO1xyXG4gIGNlbnRlcjogbnVtYmVyW107XHJcbiAgdGlsZUxheWVyOiBMLkdlb0pTT047XHJcbiAgaXNDaGVja2luZ0F2YWlsYWJsZURpc2tzcGFjZTpib29sZWFuO1xyXG5cclxuICBvZmZsaW5lUGFja2FnZVN0YXR1c1RoYXRUcmlnZ2Vyc0NoYW5nZURldGVjdGlvbiQ6IE9ic2VydmFibGU8T2ZmbGluZU1hcFBhY2thZ2U+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG9mZmxpbmVNYXBTZXJ2aWNlOiBPZmZsaW5lTWFwU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNDaGVja2luZ0F2YWlsYWJsZURpc2tzcGFjZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5vZmZsaW5lUGFja2FnZVN0YXR1c1RoYXRUcmlnZ2Vyc0NoYW5nZURldGVjdGlvbiQgPSB0aGlzLm9mZmxpbmVQYWNrYWdlU3RhdHVzJC5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpICkpO1xyXG4gICAgdGhpcy50aWxlTGF5ZXIgPSBuZXcgTC5HZW9KU09OKHRoaXMuZmVhdHVyZSk7XHJcblxyXG4gICAgLy8gU2V0IGNlbnRlciBmcm9tIHBhY2thZ2UgYm91bmRzXHJcbiAgICBjb25zdCB7IGxhdCwgbG5nIH0gPSB0aGlzLnRpbGVMYXllci5nZXRCb3VuZHMoKS5nZXRDZW50ZXIoKTtcclxuICAgIHRoaXMuY2VudGVyID0gW2xhdCwgbG5nXTtcclxuXHJcbiAgICAvLyBVc2Ugb2ZmbGluZSBtYXAgcGFja2FnZSByb290IHRpbGUgYXMgem9vbSBsZXZlbFxyXG4gICAgY29uc3QgWywgLCB6XSA9IHRoaXMucGFja2FnZU9uU2VydmVyLmdldFhZWigpO1xyXG4gICAgdGhpcy56b29tID0gejtcclxuXHJcbiAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmZpbmlzaGVkUGFja2FnZUlkcyQucGlwZShcclxuICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpLnN1YnNjcmliZSgocGFja2FnZU5hbWUpID0+IHtcclxuICAgICAgaWYgKHRoaXMucGFja2FnZU9uU2VydmVyLmdldE5hbWUoKSA9PT0gcGFja2FnZU5hbWUpIHtcclxuICAgICAgICB0aGlzLmRpc21pc3MoKTsgLy9jbG9zZSB3aGVuIHBhY2thZ2UgaXMgdW56aXBwZWQgYW5kIHJlYWR5IHRvIHVzZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNob3dUaWxlT25NYXAobWFwOiBMLk1hcCkge1xyXG4gICAgdGhpcy50aWxlTGF5ZXIuYWRkVG8obWFwKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHN0YXJ0RG93bmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmlzQ2hlY2tpbmdBdmFpbGFibGVEaXNrc3BhY2UgPSB0cnVlO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cclxuICAgIGlmKGF3YWl0IHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuY2hlY2tBdmFpbGFibGVEaXNrU3BhY2UodGhpcy5wYWNrYWdlT25TZXJ2ZXIpKSB7XHJcbiAgICAgIHRoaXMub2ZmbGluZU1hcFNlcnZpY2UuZG93bmxvYWRQYWNrYWdlKHRoaXMucGFja2FnZU9uU2VydmVyKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNDaGVja2luZ0F2YWlsYWJsZURpc2tzcGFjZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVyY2VudGFnZShtYXA6IE9mZmxpbmVNYXBQYWNrYWdlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKChtYXAucHJvZ3Jlc3MgPyBtYXAucHJvZ3Jlc3MucGVyY2VudGFnZSA6IDApICogMTAwKTtcclxuICB9XHJcblxyXG4gIGNhbmNlbChtYXA6IE9mZmxpbmVNYXBQYWNrYWdlKSB7XHJcbiAgICB0aGlzLm9mZmxpbmVNYXBTZXJ2aWNlLmNhbmNlbERvd25sb2FkUGFja2FnZShtYXApO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5vZmZsaW5lTWFwU2VydmljZS5yZW1vdmVNYXBQYWNrYWdlQnlOYW1lKHRoaXMucGFja2FnZU9uU2VydmVyLmdldE5hbWUoKSk7XHJcbiAgfVxyXG5cclxuICBkaXNtaXNzKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7XHJcbiAgICAgICdkaXNtaXNzZWQnOiB0cnVlXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19