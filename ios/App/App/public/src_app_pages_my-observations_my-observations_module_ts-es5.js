(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_my-observations_my-observations_module_ts"], {
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
    12803: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DraftListComponent": function DraftListComponent() {
          return (
            /* binding */
            _DraftListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/registration/services/registration.service */
      33181);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../sync-item/sync-item.component */
      59791);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function DraftListComponent_div_0_ion_item_divider_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item-divider", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-grid", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "h3", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-label", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](5, 2, "REGISTRATION.DRAFTS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](9, 4, "REGISTRATION.DRAFTS_DESCRIPTION"), " ");
        }
      }

      function DraftListComponent_div_0_app_sync_item_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-sync-item", 7);
        }

        if (rf & 2) {
          var reg_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("registration", reg_r4);
        }
      }

      function DraftListComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, DraftListComponent_div_0_ion_item_divider_1_Template, 10, 6, "ion-item-divider", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-list");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, DraftListComponent_div_0_app_sync_item_3_Template, 1, 1, "app-sync-item", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var registrations_r1 = ctx.ngIf;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", (registrations_r1 == null ? null : registrations_r1.length) > 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", registrations_r1)("ngForTrackBy", ctx_r0.trackByIdFunc);
        }
      }

      var _DraftListComponent = /*#__PURE__*/function () {
        function _DraftListComponent(registrationService) {
          _classCallCheck(this, _DraftListComponent);

          this.registrationService = registrationService;
          this.isEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        }

        _createClass(_DraftListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
            this.registrations$ = this.createRegistration$();
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "createRegistration$",
          value: function createRegistration$() {
            var _this = this;

            return this.registrationService.registrations$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(function (regs) {
              return regs.filter(function (reg) {
                return reg.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft || reg.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Sync;
              });
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.tap)(function (regs) {
              return _this.isEmpty.emit(regs.length === 0);
            }));
          }
        }, {
          key: "trackByIdFunc",
          value: function trackByIdFunc(_, obs) {
            return obs ? obs.id : undefined;
          }
        }]);

        return _DraftListComponent;
      }();

      _DraftListComponent.ɵfac = function DraftListComponent_Factory(t) {
        return new (t || _DraftListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService));
      };

      _DraftListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _DraftListComponent,
        selectors: [["app-draft-list"]],
        outputs: {
          isEmpty: "isEmpty"
        },
        decls: 2,
        vars: 3,
        consts: [[4, "ngIf"], ["no-border", "", 4, "ngIf"], [3, "registration", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["no-border", ""], [1, "ion-no-padding", "ion-no-margin"], [1, "ion-text-uppercase"], ["color", "medium", 1, "ion-text-wrap"], [3, "registration"]],
        template: function DraftListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, DraftListComponent_div_0_Template, 4, 3, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, ctx.registrations$));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_2__.SyncItemComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
        styles: ["ion-item-divider[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWZ0LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtBQUNGIiwiZmlsZSI6ImRyYWZ0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbS1kaXZpZGVyIHtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59Il19 */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    35014: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SentListComponent": function SentListComponent() {
          return (
            /* binding */
            _SentListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      72184);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      52249);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs/operators */
      71775);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! rxjs/operators */
      67465);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var src_app_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/core/services/observation/observation.service */
      83497);
      /* harmony import */


      var src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/modules/auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/modules/registration/services/registration.service */
      33181);
      /* harmony import */


      var src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/modules/shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var src_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/settings */
      30015);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../components/observation/observation-skeleton/observation-skeleton.component */
      47583);
      /* harmony import */


      var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../../components/observation/observation-list-card/observation-list-card.component */
      50388);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SentListComponent_div_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "app-observation-skeleton");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }
      }

      function SentListComponent_ng_container_11_ion_list_1_app_observation_list_card_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "app-observation-list-card", 12);
        }

        if (rf & 2) {
          var reg_r5 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("obs", reg_r5);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          loaded: a0
        };
      };

      function SentListComponent_ng_container_11_ion_list_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-list", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SentListComponent_ng_container_11_ion_list_1_app_observation_list_card_1_Template, 1, 1, "app-observation-list-card", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction1"](3, _c0, ctx_r2.loaded));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r2.loadedRegistrations)("ngForTrackBy", ctx_r2.trackByIdFunc);
        }
      }

      var _c1 = function _c1(a0, a1) {
        return {
          maxCount: a0,
          myObservationsUrl: a1
        };
      };

      function SentListComponent_ng_container_11_ion_row_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-row", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-col", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "h3", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 2, "MY_OBSERVATIONS.MAX_COUNT_REACHED_HEADER"));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](6, 4, "MY_OBSERVATIONS.MAX_COUNT_REACHED_TEXT", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpureFunction2"](9, _c1, ctx_r3.maxCount, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 7, ctx_r3.myObservationsUrl$))), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
        }
      }

      function SentListComponent_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, SentListComponent_ng_container_11_ion_list_1_Template, 2, 5, "ion-list", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-infinite-scroll", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionInfinite", function SentListComponent_ng_container_11_Template_ion_infinite_scroll_ionInfinite_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.loadNextPage($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "ion-infinite-scroll-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, SentListComponent_ng_container_11_ion_row_4_Template, 8, 12, "ion-row", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.loadedRegistrations.length > 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r1.maxCountReached);
        }
      }

      var PAGE_SIZE = 10;
      var MAX_REGISTRATIONS_COUNT = 100;

      var _SentListComponent = /*#__PURE__*/function () {
        function _SentListComponent(observationService, userSettingService, registrationService, regobsAuthService, changeDetectorRef, loggingService, ngZone) {
          _classCallCheck(this, _SentListComponent);

          this.observationService = observationService;
          this.userSettingService = userSettingService;
          this.registrationService = registrationService;
          this.regobsAuthService = regobsAuthService;
          this.changeDetectorRef = changeDetectorRef;
          this.loggingService = loggingService;
          this.ngZone = ngZone;
          this.loadedRegistrations = [];
          this.loaded = false;
          this.refreshFunc = this.refresh.bind(this);
          this.isEmpty = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter();
          this.loadingMore = false;
          this.myObservationsUrl$ = this.createMyObservationsUrl$();
        }

        _createClass(_SentListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.initRegistrationSubscription();
                      this.registrationService.registrations$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (regs) {
                        return regs.length;
                      }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.pairwise)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 2),
                            lastCount = _ref2[0],
                            newCount = _ref2[1];

                        return newCount - lastCount;
                      }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.distinctUntilChanged)(), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.filter)(function (diff) {
                        return diff < 0;
                      }), //only fetch observations when num drafts decrease
                      (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.debounceTime)(500) //wait a bit in case multiple observations were shipped
                      ).subscribe(function () {
                        return _this2.initRegistrationSubscription();
                      });

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "refresh",
          value: function refresh(cancelPromise) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.registrationService.syncRegistrations(cancelPromise);

                    case 2:
                      _context2.next = 4;
                      return this.initRegistrationSubscription(cancelPromise);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "initRegistrationSubscription",
          value: function initRegistrationSubscription(cancel) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var result;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      this.loaded = false;
                      this.changeDetectorRef.detectChanges();
                      this.pageIndex = 0;
                      _context3.prev = 3;
                      _context3.next = 6;
                      return (0, src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.toPromiseWithCancel)(this.getMyRegistrations$(0), cancel, 20000);

                    case 6:
                      result = _context3.sent;
                      this.loadedRegistrations = result;
                      this.isEmpty.emit(result.length === 0);
                      _context3.next = 14;
                      break;

                    case 11:
                      _context3.prev = 11;
                      _context3.t0 = _context3["catch"](3);
                      this.loggingService.debug('Could not load my registrations', 'SentListComponent.initRegistrationSubscription()', _context3.t0);

                    case 14:
                      _context3.prev = 14;
                      this.loaded = true;
                      this.changeDetectorRef.detectChanges();
                      return _context3.finish(14);

                    case 18:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[3, 11, 14, 18]]);
            }));
          }
        }, {
          key: "getMyRegistrations$",
          value: function getMyRegistrations$(pageNumber) {
            var _this3 = this;

            return (0, rxjs__WEBPACK_IMPORTED_MODULE_16__.combineLatest)([this.userSettingService.appModeAndLanguage$, this.regobsAuthService.loggedInUser$]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.switchMap)(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  _ref4$ = _slicedToArray(_ref4[0], 2),
                  appMode = _ref4$[0],
                  langKey = _ref4$[1],
                  loggedInUser = _ref4[1];

              if (loggedInUser.isLoggedIn) {
                return _this3.observationService.getObservationsForCurrentUser(appMode, langKey, pageNumber, PAGE_SIZE);
              }

              return (0, rxjs__WEBPACK_IMPORTED_MODULE_18__.of)([]);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.take)(1));
          }
        }, {
          key: "loadNextPage",
          value: function loadNextPage(event) {
            var _this4 = this;

            var currentLength = this.loadedRegistrations.length;
            var currentPageIndex = Math.floor(currentLength / PAGE_SIZE);
            this.loadingMore = true;
            this.getMyRegistrations$(currentPageIndex).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_19__.take)(1), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.finalize)(function () {
              _this4.loadingMore = false;
            })).subscribe(function (nextPage) {
              _this4.loadedRegistrations = _this4.loadedRegistrations.concat(nextPage);
              _this4.pageIndex += 1;
              var target = event.target;
              target.complete();

              if (nextPage.length < PAGE_SIZE || _this4.maxCountReached) {
                target.disabled = true; //we have reached the end, so no need to load more pages from now
              }

              _this4.changeDetectorRef.detectChanges();
            });
          }
        }, {
          key: "trackByIdFunc",
          value: function trackByIdFunc(_, obs) {
            return obs ? obs.RegId.toString() : undefined;
          }
        }, {
          key: "maxCountReached",
          get: function get() {
            return this.loadedRegistrations.length >= MAX_REGISTRATIONS_COUNT;
          }
        }, {
          key: "maxCount",
          get: function get() {
            return MAX_REGISTRATIONS_COUNT;
          }
        }, {
          key: "createMyObservationsUrl$",
          value: function createMyObservationsUrl$() {
            return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(function (userSettings) {
              return src_settings__WEBPACK_IMPORTED_MODULE_6__.settings.services.regObs.webUrl[userSettings.appMode];
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.distinctUntilChanged)(), (0, src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.enterZone)(this.ngZone));
          }
        }]);

        return _SentListComponent;
      }();

      _SentListComponent.ɵfac = function SentListComponent_Factory(t) {
        return new (t || _SentListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_1__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_2__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_3__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_5__.LoggingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone));
      };

      _SentListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _SentListComponent,
        selectors: [["app-sent-list"]],
        outputs: {
          isEmpty: "isEmpty"
        },
        decls: 12,
        vars: 8,
        consts: [["no-border", ""], [1, "ion-no-padding", "ion-no-margin"], [1, "ion-text-uppercase"], ["color", "medium", 1, "ion-text-wrap"], ["class", "loading-sceleton", 4, "ngIf"], [4, "ngIf"], [1, "loading-sceleton"], [3, "ngClass", 4, "ngIf"], [3, "ionInfinite"], ["class", "full-grid-row max-count-reached", 4, "ngIf"], [3, "ngClass"], [3, "obs", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "obs"], [1, "full-grid-row", "max-count-reached"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap", 3, "innerHTML"]],
        template: function SentListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item-divider", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-grid", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "h3", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-label", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](9, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](10, SentListComponent_div_10_Template, 4, 0, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, SentListComponent_ng_container_11_Template, 5, 2, "ng-container", 5);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 4, "MY_OBSERVATIONS.MY_SENT_OBSERVATIONS"));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](9, 6, "MY_OBSERVATIONS.SENT_SUBTITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.loaded);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.loadedRegistrations !== undefined);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgIf, _components_observation_observation_skeleton_observation_skeleton_component__WEBPACK_IMPORTED_MODULE_7__.ObservationSkeletonComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonInfiniteScroll, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonInfiniteScrollContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_22__.NgForOf, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonCol],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_23__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_22__.AsyncPipe],
        styles: [".max-count-reached[_ngcontent-%COMP%] {\n  padding-bottom: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbnQtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0FBQ0YiLCJmaWxlIjoic2VudC1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1heC1jb3VudC1yZWFjaGVkIHtcclxuICBwYWRkaW5nLWJvdHRvbTogNTBweDtcclxufSJdfQ== */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    59791: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SyncItemComponent": function SyncItemComponent() {
          return (
            /* binding */
            _SyncItemComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../modules/registration/services/registration.service */
      33181);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      76477);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../modules/shared/components/geo-icon/geo-icon.component */
      12010);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../modules/shared/pipes/format-date/format-date.pipe */
      16531);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SyncItemComponent_span_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" - ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](2, 1, "DRAFT"), "");
        }
      }

      function SyncItemComponent_ion_icon_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 8);
        }
      }

      function SyncItemComponent_ion_spinner_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-spinner", 9);
        }
      }

      var _c0 = function _c0(a0) {
        return [a0];
      };

      var _SyncItemComponent = /*#__PURE__*/function () {
        function _SyncItemComponent(registrationService, progressService, cdr) {
          _classCallCheck(this, _SyncItemComponent);

          this.registrationService = registrationService;
          this.progressService = progressService;
          this.cdr = cdr;
          this.subscriptions = [];
          this.isDraft = false;
        }

        _createClass(_SyncItemComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this5 = this;

            this.isDraft = this.registration.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;
            this.loading = !this.isDraft;
            this.subscriptions.push(this.registrationService.getRegistrationsToSync().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(function (val) {
              return val.find(function (item) {
                return item.id === _this5.registration.id;
              });
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(function (x) {
              return !!x;
            })).subscribe(function (val) {
              _this5.registration = val;
              _this5.isDraft = _this5.registration.syncStatus === src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;

              _this5.cdr.detectChanges();
            }));
            this.subscriptions.push(this.progressService.registrationSyncProgress$.subscribe(function (val) {
              _this5.loading = val.inProgress;

              _this5.cdr.detectChanges();
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
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
          }
        }, {
          key: "getLocationName",
          value: function getLocationName(reg) {
            return reg.request.ObsLocation ? reg.request.ObsLocation.LocationName || reg.request.ObsLocation.LocationDescription : '';
          }
        }]);

        return _SyncItemComponent;
      }();

      _SyncItemComponent.ɵfac = function SyncItemComponent_Factory(t) {
        return new (t || _SyncItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.ProgressService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef));
      };

      _SyncItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _SyncItemComponent,
        selectors: [["app-sync-item"]],
        inputs: {
          registration: "registration"
        },
        decls: 14,
        vars: 14,
        consts: [["lines", "full", 3, "detail", "routerLink"], ["slot", "start", 1, "geo-icon-circle"], [3, "geoHazards"], [1, "ion-text-wrap"], ["name", "calendar"], [4, "ngIf"], ["slot", "end", "name", "warning", 4, "ngIf"], ["slot", "end", 4, "ngIf"], ["slot", "end", "name", "warning"], ["slot", "end"]],
        template: function SyncItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "app-geo-icon", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-icon", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](10, "formatDate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, SyncItemComponent_span_11_Template, 3, 3, "span", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, SyncItemComponent_ion_icon_12_Template, 1, 0, "ion-icon", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, SyncItemComponent_ion_spinner_13_Template, 1, 0, "ion-spinner", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", !ctx.loading)("routerLink", "/registration/edit/" + ctx.registration.id);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("geoHazards", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](12, _c0, ctx.registration.geoHazard));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.getLocationName(ctx.registration), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](9, 8, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](10, 10, ctx.registration.request.DtObsTime)), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isDraft);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.registration.syncError);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loading);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _modules_shared_components_geo_icon_geo_icon_component__WEBPACK_IMPORTED_MODULE_3__.GeoIconComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe, _modules_shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzeW5jLWl0ZW0uY29tcG9uZW50LnNjc3MifQ== */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    49579: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MyObservationsPageModule": function MyObservationsPageModule() {
          return (
            /* binding */
            _MyObservationsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _my_observations_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./my-observations.page */
      84665);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/registration/shared-components.module */
      22623);
      /* harmony import */


      var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */
      85815);
      /* harmony import */


      var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../core/guards/auth.guard */
      27574);
      /* harmony import */


      var _components_sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./components/sync-item/sync-item.component */
      59791);
      /* harmony import */


      var _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./components/draft-list/draft-list.component */
      12803);
      /* harmony import */


      var _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./components/sent-list/sent-list.component */
      35014);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _my_observations_page__WEBPACK_IMPORTED_MODULE_0__.MyObservationsPage,
        canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_4__.AuthGuard]
      }];

      var _MyObservationsPageModule = function _MyObservationsPageModule() {
        _classCallCheck(this, _MyObservationsPageModule);
      };

      _MyObservationsPageModule.ɵfac = function MyObservationsPageModule_Factory(t) {
        return new (t || _MyObservationsPageModule)();
      };

      _MyObservationsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
        type: _MyObservationsPageModule
      });
      _MyObservationsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
        imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule, _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](_MyObservationsPageModule, {
          declarations: [_my_observations_page__WEBPACK_IMPORTED_MODULE_0__.MyObservationsPage, _components_sync_item_sync_item_component__WEBPACK_IMPORTED_MODULE_5__.SyncItemComponent, _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_6__.DraftListComponent, _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_7__.SentListComponent],
          imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _modules_registration_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule, _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    84665: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MyObservationsPage": function MyObservationsPage() {
          return (
            /* binding */
            _MyObservationsPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../modules/registration/services/registration.service */
      33181);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/sent-list/sent-list.component */
      35014);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../modules/shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../modules/shared/components/refresh-with-cancel/refresh-with-cancel.component */
      30164);
      /* harmony import */


      var _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/draft-list/draft-list.component */
      12803);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../modules/shared/components/add-menu/add-menu.component */
      26331);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function MyObservationsPage_ion_grid_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-grid", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-row", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-col", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "svg-icon", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-row", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ion-col", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "h3", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 2, "MY_OBSERVATIONS.NO_OBSERVATIONS"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](11, 4, "MY_OBSERVATIONS.NO_OBSERVATIONS_TEXT"));
        }
      }

      var _MyObservationsPage = /*#__PURE__*/function () {
        function _MyObservationsPage(registrationService) {
          _classCallCheck(this, _MyObservationsPage);

          this.registrationService = registrationService;
          this.refreshFunc = this.refresh.bind(this);
          this.draftIsEmpty = false;
          this.sentRegistrationsIsEmpty = false;
        }

        _createClass(_MyObservationsPage, [{
          key: "refresh",
          value: function refresh(cancelPromise) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.registrationService.syncRegistrations(cancelPromise);

                    case 2:
                      _context4.next = 4;
                      return this.sentListComponent.refresh(cancelPromise);

                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "refreshDraftEmptyState",
          value: function refreshDraftEmptyState(isEmpty) {
            this.draftIsEmpty = isEmpty;
          }
        }, {
          key: "refreshSentEmptyState",
          value: function refreshSentEmptyState(isEmpty) {
            this.sentRegistrationsIsEmpty = isEmpty;
          }
        }]);

        return _MyObservationsPage;
      }();

      _MyObservationsPage.ɵfac = function MyObservationsPage_Factory(t) {
        return new (t || _MyObservationsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_modules_registration_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService));
      };

      _MyObservationsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _MyObservationsPage,
        selectors: [["app-my-observations"]],
        viewQuery: function MyObservationsPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonInfiniteScroll, 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__.SentListComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.scroll = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.sentListComponent = _t.first);
          }
        },
        decls: 13,
        vars: 5,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "refreshFunc"], [3, "isEmpty"], ["class", "full-grid", 4, "ngIf"], [1, "full-grid"], [1, "full-grid-row"], [1, "ion-text-center", "ion-align-self-center"], ["src", "/assets/images/empty-states/no-my-observations.svg"], [1, "ion-text-center", "ion-margin-horizontal"], [1, "ion-text-wrap"]],
        template: function MyObservationsPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "app-refresh-with-cancel", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "app-draft-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("isEmpty", function MyObservationsPage_Template_app_draft_list_isEmpty_9_listener($event) {
              return ctx.refreshDraftEmptyState($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "app-sent-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("isEmpty", function MyObservationsPage_Template_app_sent_list_isEmpty_10_listener($event) {
              return ctx.refreshSentEmptyState($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, MyObservationsPage_ion_grid_11_Template, 12, 6, "ion-grid", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "app-add-menu");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](6, 3, "MY_OBSERVATIONS.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("refreshFunc", ctx.refreshFunc);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.draftIsEmpty && ctx.sentRegistrationsIsEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _modules_shared_components_refresh_with_cancel_refresh_with_cancel_component__WEBPACK_IMPORTED_MODULE_3__.RefreshWithCancelComponent, _components_draft_list_draft_list_component__WEBPACK_IMPORTED_MODULE_4__.DraftListComponent, _components_sent_list_sent_list_component__WEBPACK_IMPORTED_MODULE_1__.SentListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _modules_shared_components_add_menu_add_menu_component__WEBPACK_IMPORTED_MODULE_5__.AddMenuComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCol, angular_svg_icon__WEBPACK_IMPORTED_MODULE_10__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
        styles: ["virtual-scroller[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: opacity 1s linear;\n}\nvirtual-scroller.loaded[_ngcontent-%COMP%] {\n  opacity: 1;\n}\nion-item-divider[_ngcontent-%COMP%] {\n  border-bottom: 0;\n}\nion-spinner[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LW9ic2VydmF0aW9ucy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtBQUNGO0FBQ0U7RUFDRSxVQUFBO0FBQ0o7QUFHQTtFQUNFLGdCQUFBO0FBQUY7QUFHQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBQUYiLCJmaWxlIjoibXktb2JzZXJ2YXRpb25zLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInZpcnR1YWwtc2Nyb2xsZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBvcGFjaXR5OiAwO1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMXMgbGluZWFyO1xyXG5cclxuICAmLmxvYWRlZCB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxufVxyXG5cclxuaW9uLWl0ZW0tZGl2aWRlciB7XHJcbiAgYm9yZGVyLWJvdHRvbTogMDtcclxufVxyXG5cclxuaW9uLXNwaW5uZXIge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufVxyXG4iXX0= */"],
        changeDetection: 0
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBV2FBOzs7Ozt5QkFBQUE7QUFBOEI7OztjQUE5QkE7OztrQkFKRixDQUFDQyx5REFBRCxFQUFlQyx1REFBZixFQUE0QkMsdURBQTVCOzs7OzRIQUlFSCxpQ0FBOEI7QUFBQUkseUJBSDFCQyxrRkFHMEI7QUFIRkMsb0JBRDdCTCx5REFDNkIsRUFEZkMsdURBQ2UsRUFERkMsdURBQ0U7QUFHRTtBQUpPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGhESTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFBK0JBOzs7O0FBQXVDQTs7QUFDeEVBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0ZBOzs7O0FBUnFDQTs7QUFBQUE7O0FBSTdCQTs7QUFBQUE7Ozs7OztBQU1OQTs7Ozs7O0FBQXlFQTs7Ozs7O0FBZDdFQTs7QUFDRUE7O0FBWUFBOztBQUNFQTs7QUFDRkE7O0FBQ0ZBOzs7Ozs7OztBQWZxQkE7O0FBQUFBOztBQWFjQTs7QUFBQUEsZ0dBQWtCLGNBQWxCLEVBQWtCQyxvQkFBbEI7Ozs7VUNHdEJDO0FBS1gscUNBQW9CQyxtQkFBcEIsRUFBNEQ7QUFBQTs7QUFBeEM7QUFKVix5QkFBVSxJQUFJSCx1REFBSixFQUFWO0FBSXNEOzs7O2lCQUVoRSxvQkFBUTtBQUNOLGlCQUFLSSxVQUFMLEdBQWtCLElBQUlDLHlDQUFKLEVBQWxCO0FBQ0EsaUJBQUtDLGNBQUwsR0FBc0IsS0FBS0MsbUJBQUwsRUFBdEI7QUFDRDs7O2lCQUVELHVCQUFXO0FBQ1QsaUJBQUtILFVBQUwsQ0FBZ0JJLElBQWhCO0FBQ0EsaUJBQUtKLFVBQUwsQ0FBZ0JLLFFBQWhCO0FBQ0Q7OztpQkFFTywrQkFBbUI7QUFBQTs7QUFDekIsbUJBQU8sS0FBS04sbUJBQUwsQ0FBeUJHLGNBQXpCLENBQXdDSSxJQUF4QyxDQUNMLHFEQUFJLFVBQUNDLElBQUQ7QUFBQSxxQkFBVUEsSUFBSSxDQUFDQyxNQUFMLENBQVksVUFBQ0MsR0FBRDtBQUFBLHVCQUFTQSxHQUFHLENBQUNDLFVBQUosS0FBbUJDLHFHQUFuQixJQUF1Q0YsR0FBRyxDQUFDQyxVQUFKLEtBQW1CQyxvR0FBbkU7QUFBQSxlQUFaLENBQVY7QUFBQSxhQUFKLENBREssRUFFTCxxREFBSSxVQUFDSixJQUFEO0FBQUEscUJBQVUsS0FBSSxDQUFDSyxPQUFMLENBQWFDLElBQWIsQ0FBa0JOLElBQUksQ0FBQ08sTUFBTCxLQUFnQixDQUFsQyxDQUFWO0FBQUEsYUFBSixDQUZLLENBQVA7QUFJRDs7O2lCQUVELHVCQUFjQyxDQUFkLEVBQTBCQyxHQUExQixFQUE0QztBQUMxQyxtQkFBT0EsR0FBRyxHQUFHQSxHQUFHLENBQUNDLEVBQVAsR0FBWUMsU0FBdEI7QUFDRDs7Ozs7Ozt5QkExQlVwQixxQkFBa0JGO0FBQUE7OztjQUFsQkU7QUFBa0JxQjtBQUFBQztBQUFBUjtBQUFBO0FBQUFTO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURqQi9CNUI7Ozs7OztBQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRVlONkI7O0FBQ0VBOztBQUNBQTs7QUFDQUE7O0FBQ0ZBOzs7Ozs7QUFHSUE7Ozs7OztBQUEyRkE7Ozs7Ozs7Ozs7OztBQUQ3RkE7O0FBQ0VBOztBQUNGQTs7Ozs7O0FBRlVBOztBQUNtQ0E7O0FBQUFBLDBHQUF3QixjQUF4QixFQUF3QkMsb0JBQXhCOzs7Ozs7Ozs7Ozs7O0FBTTdDRDs7QUFDRUE7O0FBQ0VBOztBQUFJQTs7OztBQUE0REE7O0FBQ2hFQTs7Ozs7O0FBQ0ZBOztBQUNGQTs7Ozs7O0FBSFFBOztBQUFBQTs7QUFDc0JBOztBQUFBQTs7Ozs7Ozs7QUFYaENBOztBQUNFQTs7QUFHQUE7O0FBQXFCQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUNuQkE7O0FBRUZBOztBQUNBQTs7QUFNRkE7Ozs7OztBQWI0Q0E7O0FBQUFBOztBQU9oQ0E7O0FBQUFBOzs7O0FDT1osVUFBTUUsU0FBUyxHQUFHLEVBQWxCO0FBQ0EsVUFBTUMsdUJBQXVCLEdBQUcsR0FBaEM7O1VBUWFDO0FBU1gsb0NBQ1VDLGtCQURWLEVBRVVDLGtCQUZWLEVBR1VoQyxtQkFIVixFQUlVaUMsaUJBSlYsRUFLVUMsaUJBTFYsRUFNVUMsY0FOVixFQU9VQyxNQVBWLEVBT3dCO0FBQUE7O0FBTmQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFmVixxQ0FBK0MsRUFBL0M7QUFDQSx3QkFBUyxLQUFUO0FBQ0EsNkJBQWMsS0FBS0MsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWQ7QUFDVSx5QkFBVSxJQUFJWix1REFBSixFQUFWO0FBQ1YsNkJBQWMsS0FBZDtBQWFFLGVBQUthLGtCQUFMLEdBQTBCLEtBQUtDLHdCQUFMLEVBQTFCO0FBQ0Q7Ozs7aUJBRUssb0JBQVE7Ozs7Ozs7O0FBQ1osMkJBQUtDLDRCQUFMO0FBQ0EsMkJBQUt6QyxtQkFBTCxDQUF5QkcsY0FBekIsQ0FDR0ksSUFESCxDQUVJLHNEQUFJLFVBQUNDLElBQUQ7QUFBQSwrQkFBVUEsSUFBSSxDQUFDTyxNQUFmO0FBQUEsdUJBQUosQ0FGSixFQUdJLDREQUhKLEVBSUksc0RBQUk7QUFBQTtBQUFBLDRCQUFFMkIsU0FBRjtBQUFBLDRCQUFhQyxRQUFiOztBQUFBLCtCQUEyQkEsUUFBUSxHQUFHRCxTQUF0QztBQUFBLHVCQUFKLENBSkosRUFLSSx3RUFMSixFQU1JLHlEQUFPLFVBQUNFLElBQUQ7QUFBQSwrQkFBVUEsSUFBSSxHQUFHLENBQWpCO0FBQUEsdUJBQVAsQ0FOSixFQU1nQztBQUM1QixxRkFBYSxHQUFiLENBUEosQ0FPc0I7QUFQdEIsd0JBU0dDLFNBVEgsQ0FTYTtBQUFBLCtCQUFNLE1BQUksQ0FBQ0osNEJBQUwsRUFBTjtBQUFBLHVCQVRiOzs7Ozs7Ozs7QUFVRDs7O2lCQUVLLGlCQUFRSyxhQUFSLEVBQW9DOzs7Ozs7O0FBQ3hDLDZCQUFNLEtBQUs5QyxtQkFBTCxDQUF5QitDLGlCQUF6QixDQUEyQ0QsYUFBM0MsQ0FBTjs7OztBQUNBLDZCQUFNLEtBQUtMLDRCQUFMLENBQWtDSyxhQUFsQyxDQUFOOzs7Ozs7Ozs7QUFDRDs7O2lCQUVhLHNDQUNaRSxNQURZLEVBQ1U7Ozs7Ozs7QUFFdEIsMkJBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0EsMkJBQUtmLGlCQUFMLENBQXVCZ0IsYUFBdkI7QUFDQSwyQkFBS0MsU0FBTCxHQUFpQixDQUFqQjs7O0FBRWlCLDZCQUFNLDZGQUNuQixLQUFLQyxtQkFBTCxDQUF5QixDQUF6QixDQURtQixFQUVuQkosTUFGbUIsRUFHbkIsS0FIbUIsQ0FBTjs7O0FBQVRLO0FBS04sMkJBQUtDLG1CQUFMLEdBQTJCRCxNQUEzQjtBQUNBLDJCQUFLeEMsT0FBTCxDQUFhQyxJQUFiLENBQWtCdUMsTUFBTSxDQUFDdEMsTUFBUCxLQUFrQixDQUFwQzs7Ozs7OztBQUVBLDJCQUFLb0IsY0FBTCxDQUFvQm9CLEtBQXBCLENBQ0UsaUNBREYsRUFFRSxrREFGRjs7OztBQU1BLDJCQUFLTixNQUFMLEdBQWMsSUFBZDtBQUNBLDJCQUFLZixpQkFBTCxDQUF1QmdCLGFBQXZCOzs7Ozs7Ozs7O0FBRUg7OztpQkFFTyw2QkFDTk0sVUFETSxFQUNZO0FBQUE7O0FBRWxCLG1CQUFPLHNEQUFjLENBQ25CLEtBQUt4QixrQkFBTCxDQUF3QnlCLG1CQURMLEVBRW5CLEtBQUt4QixpQkFBTCxDQUF1QnlCLGFBRkosQ0FBZCxFQUdKbkQsSUFISSxDQUlMLDREQUFVLGlCQUF1QztBQUFBO0FBQUE7QUFBQSxrQkFBcENvRCxPQUFvQztBQUFBLGtCQUEzQkMsT0FBMkI7QUFBQSxrQkFBakJDLFlBQWlCOztBQUMvQyxrQkFBSUEsWUFBWSxDQUFDQyxVQUFqQixFQUE2QjtBQUMzQix1QkFBTyxNQUFJLENBQUMvQixrQkFBTCxDQUF3QmdDLDZCQUF4QixDQUNMSixPQURLLEVBRUxDLE9BRkssRUFHTEosVUFISyxFQUlMNUIsU0FKSyxDQUFQO0FBTUQ7O0FBQ0QscUJBQU8sMkNBQUcsRUFBSCxDQUFQO0FBQ0QsYUFWRCxDQUpLLEVBZUwsdURBQUssQ0FBTCxDQWZLLENBQVA7QUFpQkQ7OztpQkFFRCxzQkFBYW9DLEtBQWIsRUFBc0Q7QUFBQTs7QUFDcEQsZ0JBQU1DLGFBQWEsR0FBRyxLQUFLWCxtQkFBTCxDQUF5QnZDLE1BQS9DO0FBQ0EsZ0JBQU1tRCxnQkFBZ0IsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdILGFBQWEsR0FBR3JDLFNBQTNCLENBQXpCO0FBQ0EsaUJBQUt5QyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsaUJBQUtqQixtQkFBTCxDQUF5QmMsZ0JBQXpCLEVBQ0czRCxJQURILENBRUksdURBQUssQ0FBTCxDQUZKLEVBR0ksMkRBQVMsWUFBSztBQUNaLG9CQUFJLENBQUM4RCxXQUFMLEdBQW1CLEtBQW5CO0FBQ0QsYUFGRCxDQUhKLEVBT0d4QixTQVBILENBT2EsVUFBQ3lCLFFBQUQsRUFBYTtBQUN0QixvQkFBSSxDQUFDaEIsbUJBQUwsR0FBMkIsTUFBSSxDQUFDQSxtQkFBTCxDQUF5QmlCLE1BQXpCLENBQWdDRCxRQUFoQyxDQUEzQjtBQUNBLG9CQUFJLENBQUNuQixTQUFMLElBQWtCLENBQWxCO0FBQ0Esa0JBQU1xQixNQUFNLEdBQXVCUixLQUFLLENBQUNRLE1BQXpDO0FBQ0FBLG9CQUFNLENBQUNsRSxRQUFQOztBQUNBLGtCQUFJZ0UsUUFBUSxDQUFDdkQsTUFBVCxHQUFrQmEsU0FBbEIsSUFBK0IsTUFBSSxDQUFDNkMsZUFBeEMsRUFBeUQ7QUFDdkRELHNCQUFNLENBQUNFLFFBQVAsR0FBa0IsSUFBbEIsQ0FEdUQsQ0FDL0I7QUFDekI7O0FBQ0Qsb0JBQUksQ0FBQ3hDLGlCQUFMLENBQXVCZ0IsYUFBdkI7QUFDRCxhQWhCSDtBQWlCRDs7O2lCQUVELHVCQUFjbEMsQ0FBZCxFQUEwQkMsR0FBMUIsRUFBb0Q7QUFDbEQsbUJBQU9BLEdBQUcsR0FBR0EsR0FBRyxDQUFDMEQsS0FBSixDQUFVQyxRQUFWLEVBQUgsR0FBMEJ6RCxTQUFwQztBQUNEOzs7ZUFFRCxlQUFtQjtBQUNqQixtQkFBTyxLQUFLbUMsbUJBQUwsQ0FBeUJ2QyxNQUF6QixJQUFtQ2MsdUJBQTFDO0FBQ0Q7OztlQUVELGVBQVk7QUFDVixtQkFBT0EsdUJBQVA7QUFDRDs7O2lCQUVPLG9DQUF3QjtBQUM5QixtQkFBTyxLQUFLRyxrQkFBTCxDQUF3QjZDLFlBQXhCLENBQXFDdEUsSUFBckMsQ0FDTCxzREFDRSxVQUFDdUUsWUFBRDtBQUFBLHFCQUFrQkMsMEVBQWdDRCxZQUFZLENBQUNuQixPQUE3QyxDQUFsQjtBQUFBLGFBREYsQ0FESyxFQUlMLHdFQUpLLEVBS0wsbUZBQVUsS0FBS3ZCLE1BQWYsQ0FMSyxDQUFQO0FBT0Q7Ozs7Ozs7eUJBbklVTixvQkFBaUJKO0FBQUE7OztjQUFqQkk7QUFBaUJWO0FBQUFDO0FBQUFSO0FBQUE7QUFBQVM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRHpDOUJDOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUErQkE7Ozs7QUFBd0RBOztBQUN6RkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUtBQTs7OztBQWRxQ0E7O0FBQUFBOztBQUk3QkE7O0FBQUFBOztBQUt1QkE7O0FBQUFBOztBQUtoQkE7O0FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFUFRzRDs7QUFBdUJBOzs7O0FBQTJCQTs7OztBQUEzQkE7O0FBQUFBOzs7Ozs7QUFHM0JBOzs7Ozs7QUFFQUE7Ozs7Ozs7O1VDSldDO0FBTVgsb0NBQ1VqRixtQkFEVixFQUVVa0YsZUFGVixFQUdVQyxHQUhWLEVBR2dDO0FBQUE7O0FBRnRCO0FBQ0E7QUFDQTtBQVBGLCtCQUFnQyxFQUFoQztBQUVSLHlCQUFVLEtBQVY7QUFNSTs7OztpQkFFSixvQkFBUTtBQUFBOztBQUVOLGlCQUFLQyxPQUFMLEdBQWUsS0FBS0MsWUFBTCxDQUFrQjFFLFVBQWxCLEtBQWlDQyxxR0FBaEQ7QUFDQSxpQkFBSzBFLE9BQUwsR0FBZSxDQUFDLEtBQUtGLE9BQXJCO0FBQ0EsaUJBQUtHLGFBQUwsQ0FBbUJDLElBQW5CLENBQ0UsS0FBS3hGLG1CQUFMLENBQ0d5RixzQkFESCxHQUVHbEYsSUFGSCxDQUdJLHFEQUFJLFVBQUNtRixHQUFEO0FBQUEscUJBQ0ZBLEdBQUcsQ0FBQ0MsSUFBSixDQUFTLFVBQUNDLElBQUQ7QUFBQSx1QkFBVUEsSUFBSSxDQUFDMUUsRUFBTCxLQUFZLE1BQUksQ0FBQ21FLFlBQUwsQ0FBa0JuRSxFQUF4QztBQUFBLGVBQVQsQ0FERTtBQUFBLGFBQUosQ0FISixFQU1JLHdEQUFPLFVBQUMyRSxDQUFEO0FBQUEscUJBQU8sQ0FBQyxDQUFDQSxDQUFUO0FBQUEsYUFBUCxDQU5KLEVBUUdoRCxTQVJILENBUWEsVUFBQzZDLEdBQUQsRUFBUTtBQUNqQixvQkFBSSxDQUFDTCxZQUFMLEdBQW9CSyxHQUFwQjtBQUNBLG9CQUFJLENBQUNOLE9BQUwsR0FBZSxNQUFJLENBQUNDLFlBQUwsQ0FBa0IxRSxVQUFsQixLQUFpQ0MscUdBQWhEOztBQUNBLG9CQUFJLENBQUN1RSxHQUFMLENBQVNqQyxhQUFUO0FBQ0QsYUFaSCxDQURGO0FBZUEsaUJBQUtxQyxhQUFMLENBQW1CQyxJQUFuQixDQUNFLEtBQUtOLGVBQUwsQ0FBcUJZLHlCQUFyQixDQUErQ2pELFNBQS9DLENBQXlELFVBQUM2QyxHQUFELEVBQVE7QUFDL0Qsb0JBQUksQ0FBQ0osT0FBTCxHQUFlSSxHQUFHLENBQUNLLFVBQW5COztBQUNBLG9CQUFJLENBQUNaLEdBQUwsQ0FBU2pDLGFBQVQ7QUFDRCxhQUhELENBREY7QUFNRDs7O2lCQUVELHVCQUFXO0FBQUEsdURBQ2tCLEtBQUtxQyxhQUR2QjtBQUFBOztBQUFBO0FBQ1Qsa0VBQStDO0FBQUEsb0JBQXBDUyxZQUFvQztBQUM3Q0EsNEJBQVksQ0FBQ0MsV0FBYjtBQUNEO0FBSFE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlWOzs7aUJBRUQseUJBQWdCdkYsR0FBaEIsRUFBa0M7QUFDaEMsbUJBQU9BLEdBQUcsQ0FBQ3dGLE9BQUosQ0FBWUMsV0FBWixHQUNIekYsR0FBRyxDQUFDd0YsT0FBSixDQUFZQyxXQUFaLENBQXdCQyxZQUF4QixJQUNFMUYsR0FBRyxDQUFDd0YsT0FBSixDQUFZQyxXQUFaLENBQXdCRSxtQkFGdkIsR0FHSCxFQUhKO0FBSUQ7Ozs7Ozs7eUJBbERVcEIsb0JBQWlCRDtBQUFBOzs7Y0FBakJDO0FBQWlCN0Q7QUFBQWtGO0FBQUFqQjtBQUFBO0FBQUEvRDtBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEWDlCdUQ7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQXNDQTs7Ozs7O0FBQ3RDQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFFQUE7O0FBQ0ZBOzs7O0FBaEJ1QkEsNkZBQW1CLFlBQW5CLEVBQW1CLDJDQUFuQjs7QUFFTEE7O0FBQUFBOztBQUlaQTs7QUFBQUE7O0FBR3NDQTs7QUFBQUE7O0FBQy9CQTs7QUFBQUE7O0FBR0FBOztBQUFBQTs7QUFFR0E7O0FBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRUxoQixVQUFNdUIsTUFBTSxHQUFXLENBQ3JCO0FBQ0VDLFlBQUksRUFBRSxFQURSO0FBRUVDLGlCQUFTLEVBQUVDLHFFQUZiO0FBR0VDLG1CQUFXLEVBQUUsQ0FBQ0MsOERBQUQ7QUFIZixPQURxQixDQUF2Qjs7VUFzQmFDOzs7Ozt5QkFBQUE7QUFBd0I7OztjQUF4QkE7OztrQkFiRixDQUNQQyx1RUFETyxFQUVQQyxrR0FGTyxFQUdQQyw2SEFITyxFQUlQQyxtRUFBc0JWLE1BQXRCLENBSk87Ozs7NEhBYUVNLDJCQUF3QjtBQUFBbkgseUJBTmpDZ0gscUVBTWlDLEVBTGpDUSx3RkFLaUMsRUFKakNDLDJGQUlpQyxFQUhqQ0Msd0ZBR2lDO0FBSGhCeEgsb0JBVGpCa0gsdUVBU2lCLEVBUmpCQyxrR0FRaUIsRUFQakJDLDZIQU9pQixFQVBhQyx5REFPYjtBQUdnQjtBQVZIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmhDSTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOztBQUFLQTs7OztBQUFtREE7O0FBQ3hEQTs7QUFBMEJBOzs7O0FBQW9EQTs7QUFDaEZBOztBQUNGQTs7QUFDRkE7Ozs7QUFKV0E7O0FBQUFBOztBQUNxQkE7O0FBQUFBOzs7O1VDWHJCQztBQVVYLHFDQUFvQnRILG1CQUFwQixFQUE0RDtBQUFBOztBQUF4QztBQUpwQiw2QkFBYyxLQUFLcUMsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWQ7QUFDQSw4QkFBZSxLQUFmO0FBQ0EsMENBQTJCLEtBQTNCO0FBRWdFOzs7O2lCQUUxRCxpQkFBUVEsYUFBUixFQUFvQzs7Ozs7OztBQUN4Qyw2QkFBTSxLQUFLOUMsbUJBQUwsQ0FBeUIrQyxpQkFBekIsQ0FBMkNELGFBQTNDLENBQU47Ozs7QUFFQSw2QkFBTSxLQUFLeUUsaUJBQUwsQ0FBdUJsRixPQUF2QixDQUErQlMsYUFBL0IsQ0FBTjs7Ozs7Ozs7O0FBQ0Q7OztpQkFFRCxnQ0FBdUJqQyxPQUF2QixFQUF1QztBQUNyQyxpQkFBSzJHLFlBQUwsR0FBb0IzRyxPQUFwQjtBQUNEOzs7aUJBRUQsK0JBQXNCQSxPQUF0QixFQUFzQztBQUNwQyxpQkFBSzRHLHdCQUFMLEdBQWdDNUcsT0FBaEM7QUFDRDs7Ozs7Ozt5QkF4QlV5RyxxQkFBa0JEO0FBQUE7OztjQUFsQkM7QUFBa0JsRztBQUFBc0c7QUFBQTtzRUFDbEJDLHdEQUFVOztzRUFDVkEsK0RBQWlCOztzRUFDakJDLDBGQUFpQjs7Ozs7Ozs7Ozs7Ozs7OztBRGI5QlA7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFBV0E7Ozs7QUFBeUNBOztBQUN0REE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBQ0FBOztBQUFnQkE7QUFBQSxxQkFBV1Esa0NBQVg7QUFBeUMsYUFBekM7O0FBQTJDUjs7QUFDM0RBOztBQUFlQTtBQUFBLHFCQUFXUSxpQ0FBWDtBQUF3QyxhQUF4Qzs7QUFBMENSOztBQUN6REE7O0FBYUZBOztBQUNBQTs7OztBQXJCZUE7O0FBQUFBOztBQUlZQTs7QUFBQUE7O0FBR2RBOztBQUFBQTs7Ozs7Ozs7OzsiLCJuYW1lcyI6WyJGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUiLCJfYW5ndWxhcl9jb21tb25fX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9pb25pY19hbmd1bGFyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfYW5ndWxhcl9mb3Jtc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiZGVjbGFyYXRpb25zIiwiX2Z1bGxzY3JlZW5faW1hZ2VfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsImN0eF9yMCIsIkRyYWZ0TGlzdENvbXBvbmVudCIsInJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZ0Rlc3Ryb3kkIiwicnhqc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwicmVnaXN0cmF0aW9ucyQiLCJjcmVhdGVSZWdpc3RyYXRpb24kIiwibmV4dCIsImNvbXBsZXRlIiwicGlwZSIsInJlZ3MiLCJmaWx0ZXIiLCJyZWciLCJzeW5jU3RhdHVzIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiaXNFbXB0eSIsImVtaXQiLCJsZW5ndGgiLCJfIiwib2JzIiwiaWQiLCJ1bmRlZmluZWQiLCJzZWxlY3RvcnMiLCJvdXRwdXRzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJjdHhfcjIiLCJQQUdFX1NJWkUiLCJNQVhfUkVHSVNUUkFUSU9OU19DT1VOVCIsIlNlbnRMaXN0Q29tcG9uZW50Iiwib2JzZXJ2YXRpb25TZXJ2aWNlIiwidXNlclNldHRpbmdTZXJ2aWNlIiwicmVnb2JzQXV0aFNlcnZpY2UiLCJjaGFuZ2VEZXRlY3RvclJlZiIsImxvZ2dpbmdTZXJ2aWNlIiwibmdab25lIiwicmVmcmVzaCIsImJpbmQiLCJteU9ic2VydmF0aW9uc1VybCQiLCJjcmVhdGVNeU9ic2VydmF0aW9uc1VybCQiLCJpbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uIiwibGFzdENvdW50IiwibmV3Q291bnQiLCJkaWZmIiwic3Vic2NyaWJlIiwiY2FuY2VsUHJvbWlzZSIsInN5bmNSZWdpc3RyYXRpb25zIiwiY2FuY2VsIiwibG9hZGVkIiwiZGV0ZWN0Q2hhbmdlcyIsInBhZ2VJbmRleCIsImdldE15UmVnaXN0cmF0aW9ucyQiLCJyZXN1bHQiLCJsb2FkZWRSZWdpc3RyYXRpb25zIiwiZGVidWciLCJwYWdlTnVtYmVyIiwiYXBwTW9kZUFuZExhbmd1YWdlJCIsImxvZ2dlZEluVXNlciQiLCJhcHBNb2RlIiwibGFuZ0tleSIsImxvZ2dlZEluVXNlciIsImlzTG9nZ2VkSW4iLCJnZXRPYnNlcnZhdGlvbnNGb3JDdXJyZW50VXNlciIsImV2ZW50IiwiY3VycmVudExlbmd0aCIsImN1cnJlbnRQYWdlSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJsb2FkaW5nTW9yZSIsIm5leHRQYWdlIiwiY29uY2F0IiwidGFyZ2V0IiwibWF4Q291bnRSZWFjaGVkIiwiZGlzYWJsZWQiLCJSZWdJZCIsInRvU3RyaW5nIiwidXNlclNldHRpbmckIiwidXNlclNldHRpbmdzIiwic3JjX3NldHRpbmdzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJTeW5jSXRlbUNvbXBvbmVudCIsInByb2dyZXNzU2VydmljZSIsImNkciIsImlzRHJhZnQiLCJyZWdpc3RyYXRpb24iLCJsb2FkaW5nIiwic3Vic2NyaXB0aW9ucyIsInB1c2giLCJnZXRSZWdpc3RyYXRpb25zVG9TeW5jIiwidmFsIiwiZmluZCIsIml0ZW0iLCJ4IiwicmVnaXN0cmF0aW9uU3luY1Byb2dyZXNzJCIsImluUHJvZ3Jlc3MiLCJzdWJzY3JpcHRpb24iLCJ1bnN1YnNjcmliZSIsInJlcXVlc3QiLCJPYnNMb2NhdGlvbiIsIkxvY2F0aW9uTmFtZSIsIkxvY2F0aW9uRGVzY3JpcHRpb24iLCJpbnB1dHMiLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiX215X29ic2VydmF0aW9uc19wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJjYW5BY3RpdmF0ZSIsIl9jb3JlX2d1YXJkc19hdXRoX2d1YXJkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJNeU9ic2VydmF0aW9uc1BhZ2VNb2R1bGUiLCJfbW9kdWxlc19zaGFyZWRfc2hhcmVkX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX21vZHVsZXNfcmVnaXN0cmF0aW9uX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX21vZGFsX3BhZ2VzX2Z1bGxzY3JlZW5faW1hZ2VfbW9kYWxfZnVsbHNjcmVlbl9pbWFnZV9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwiX2NvbXBvbmVudHNfc3luY19pdGVtX3N5bmNfaXRlbV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIl9jb21wb25lbnRzX2RyYWZ0X2xpc3RfZHJhZnRfbGlzdF9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzZfXyIsIl9jb21wb25lbnRzX3NlbnRfbGlzdF9zZW50X2xpc3RfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJNeU9ic2VydmF0aW9uc1BhZ2UiLCJzZW50TGlzdENvbXBvbmVudCIsImRyYWZ0SXNFbXB0eSIsInNlbnRSZWdpc3RyYXRpb25zSXNFbXB0eSIsInZpZXdRdWVyeSIsIl9pb25pY19hbmd1bGFyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV84X18iLCJfY29tcG9uZW50c19zZW50X2xpc3Rfc2VudF9saXN0X2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiY3R4Il0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvbXktb2JzZXJ2YXRpb25zL2NvbXBvbmVudHMvZHJhZnQtbGlzdC9kcmFmdC1saXN0LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9jb21wb25lbnRzL2RyYWZ0LWxpc3QvZHJhZnQtbGlzdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvbXktb2JzZXJ2YXRpb25zL2NvbXBvbmVudHMvc2VudC1saXN0L3NlbnQtbGlzdC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9teS1vYnNlcnZhdGlvbnMvY29tcG9uZW50cy9zZW50LWxpc3Qvc2VudC1saXN0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9teS1vYnNlcnZhdGlvbnMvY29tcG9uZW50cy9zeW5jLWl0ZW0vc3luYy1pdGVtLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9jb21wb25lbnRzL3N5bmMtaXRlbS9zeW5jLWl0ZW0uY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9teS1vYnNlcnZhdGlvbnMubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9teS1vYnNlcnZhdGlvbnMucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL215LW9ic2VydmF0aW9ucy9teS1vYnNlcnZhdGlvbnMucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCI8IS0tIHNob3dzIGxpc3Qgb2YgcmVnaXN0cmF0aW9ucyBub3Qgc2F2ZWQgb24gc2VydmVyIChib3RoIGRyYWZ0cyBhbmQgcmVnaXN0cmF0aW9ucyBpbiBzeW5jKS0tPlxyXG48ZGl2ICpuZ0lmPVwicmVnaXN0cmF0aW9ucyQgfCBhc3luYyBhcyByZWdpc3RyYXRpb25zXCI+XHJcbiAgPGlvbi1pdGVtLWRpdmlkZXIgKm5nSWY9XCJyZWdpc3RyYXRpb25zPy5sZW5ndGggPiAwXCIgbm8tYm9yZGVyPlxyXG4gICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmcgaW9uLW5vLW1hcmdpblwiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyAnUkVHSVNUUkFUSU9OLkRSQUZUUycgfCB0cmFuc2xhdGUgfX08L2gzPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCIgY29sb3I9XCJtZWRpdW1cIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uRFJBRlRTX0RFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICA8aW9uLWxpc3Q+XHJcbiAgICA8YXBwLXN5bmMtaXRlbSAqbmdGb3I9XCJsZXQgcmVnIG9mIHJlZ2lzdHJhdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlJZEZ1bmNcIiBbcmVnaXN0cmF0aW9uXT1cInJlZ1wiPjwvYXBwLXN5bmMtaXRlbT5cclxuICA8L2lvbi1saXN0PlxyXG48L2Rpdj4iLCJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRyYWZ0LWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kcmFmdC1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kcmFmdC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWZ0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQE91dHB1dCgpIGlzRW1wdHkgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgcmVnaXN0cmF0aW9ucyQ6IE9ic2VydmFibGU8SVJlZ2lzdHJhdGlvbltdPjtcclxuICBwcml2YXRlIG5nRGVzdHJveSQ6IFN1YmplY3Q8dm9pZD47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSkge31cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQgPSBuZXcgU3ViamVjdCgpO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25zJCA9IHRoaXMuY3JlYXRlUmVnaXN0cmF0aW9uJCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVJlZ2lzdHJhdGlvbiQoKTogT2JzZXJ2YWJsZTxJUmVnaXN0cmF0aW9uW10+IHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UucmVnaXN0cmF0aW9ucyQucGlwZShcclxuICAgICAgbWFwKChyZWdzKSA9PiByZWdzLmZpbHRlcigocmVnKSA9PiByZWcuc3luY1N0YXR1cyA9PT0gU3luY1N0YXR1cy5EcmFmdCB8fCByZWcuc3luY1N0YXR1cyA9PT0gU3luY1N0YXR1cy5TeW5jKSksXHJcbiAgICAgIHRhcCgocmVncykgPT4gdGhpcy5pc0VtcHR5LmVtaXQocmVncy5sZW5ndGggPT09IDApKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHRyYWNrQnlJZEZ1bmMoXzogdW5rbm93biwgb2JzOiBJUmVnaXN0cmF0aW9uKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBvYnMgPyBvYnMuaWQgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcbiIsIjwhLS0gQSBsaXN0IG9mIG9ic2VydmF0aW9ucyBzZW50IHRvIHNlcnZlciAtLT5cclxuPGlvbi1pdGVtLWRpdmlkZXIgbm8tYm9yZGVyPlxyXG4gIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nIGlvbi1uby1tYXJnaW5cIj5cclxuICAgIDxpb24tcm93PlxyXG4gICAgICA8aDMgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eyAnTVlfT0JTRVJWQVRJT05TLk1ZX1NFTlRfT0JTRVJWQVRJT05TJyB8IHRyYW5zbGF0ZSB9fTwvaDM+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdz5cclxuICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIiBjb2xvcj1cIm1lZGl1bVwiPlxyXG4gICAgICAgIHt7ICdNWV9PQlNFUlZBVElPTlMuU0VOVF9TVUJUSVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgPC9pb24tZ3JpZD5cclxuPC9pb24taXRlbS1kaXZpZGVyPlxyXG48ZGl2IGNsYXNzPVwibG9hZGluZy1zY2VsZXRvblwiICpuZ0lmPVwiIWxvYWRlZFwiPlxyXG4gIDxhcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+PC9hcHAtb2JzZXJ2YXRpb24tc2tlbGV0b24+XHJcbiAgPGFwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj48L2FwcC1vYnNlcnZhdGlvbi1za2VsZXRvbj5cclxuICA8YXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPjwvYXBwLW9ic2VydmF0aW9uLXNrZWxldG9uPlxyXG48L2Rpdj5cclxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvYWRlZFJlZ2lzdHJhdGlvbnMgIT09IHVuZGVmaW5lZFwiPlxyXG4gIDxpb24tbGlzdCBbbmdDbGFzc109XCJ7IGxvYWRlZDogbG9hZGVkIH1cIiAqbmdJZj1cIihsb2FkZWRSZWdpc3RyYXRpb25zLmxlbmd0aCA+IDApXCI+XHJcbiAgICA8YXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZCAqbmdGb3I9XCJsZXQgcmVnIG9mIGxvYWRlZFJlZ2lzdHJhdGlvbnM7IHRyYWNrQnk6IHRyYWNrQnlJZEZ1bmNcIiBbb2JzXT1cInJlZ1wiPjwvYXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxpb24taW5maW5pdGUtc2Nyb2xsIChpb25JbmZpbml0ZSk9XCJsb2FkTmV4dFBhZ2UoJGV2ZW50KVwiID5cclxuICAgIDxpb24taW5maW5pdGUtc2Nyb2xsLWNvbnRlbnQ+XHJcbiAgICA8L2lvbi1pbmZpbml0ZS1zY3JvbGwtY29udGVudD5cclxuICA8L2lvbi1pbmZpbml0ZS1zY3JvbGw+XHJcbiAgPGlvbi1yb3cgKm5nSWY9XCJtYXhDb3VudFJlYWNoZWRcIiBjbGFzcz1cImZ1bGwtZ3JpZC1yb3cgbWF4LWNvdW50LXJlYWNoZWRcIj5cclxuICAgIDxpb24tY29sIGNsYXNzPVwiaW9uLXRleHQtY2VudGVyIGlvbi1tYXJnaW4taG9yaXpvbnRhbFwiPlxyXG4gICAgICA8aDI+e3sgJ01ZX09CU0VSVkFUSU9OUy5NQVhfQ09VTlRfUkVBQ0hFRF9IRUFERVInIHwgdHJhbnNsYXRlIH19PC9oMj5cclxuICAgICAgPGgzIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiIFtpbm5lckhUTUxdPVwiJ01ZX09CU0VSVkFUSU9OUy5NQVhfQ09VTlRfUkVBQ0hFRF9URVhUJyB8IHRyYW5zbGF0ZToge21heENvdW50OiBtYXhDb3VudCwgbXlPYnNlcnZhdGlvbnNVcmw6IG15T2JzZXJ2YXRpb25zVXJsJCB8IGFzeW5jfVwiPjwvaDM+XHJcbiAgICA8L2lvbi1jb2w+XHJcbiAgPC9pb24tcm93PlxyXG48L25nLWNvbnRhaW5lcj5cclxuIiwiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE5nWm9uZSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElvbkluZmluaXRlU2Nyb2xsIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQge1xyXG4gIGRlYm91bmNlVGltZSxcclxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcclxuICBmaWx0ZXIsXHJcbiAgZmluYWxpemUsXHJcbiAgbWFwLFxyXG4gIHBhaXJ3aXNlLFxyXG4gIHN3aXRjaE1hcCxcclxuICB0YWtlLFxyXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICBlbnRlclpvbmUsXHJcbiAgdG9Qcm9taXNlV2l0aENhbmNlbFxyXG59IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL3NlcnZpY2VzL29ic2VydmF0aW9uL29ic2VydmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvYXV0aC9zZXJ2aWNlcy9yZWdvYnMtYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25WaWV3TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnc3JjL3NldHRpbmdzJztcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5jb25zdCBNQVhfUkVHSVNUUkFUSU9OU19DT1VOVCA9IDEwMDtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNlbnQtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc2VudC1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFNlbnRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBsb2FkZWRSZWdpc3RyYXRpb25zOiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXSA9IFtdO1xyXG4gIGxvYWRlZCA9IGZhbHNlO1xyXG4gIHJlZnJlc2hGdW5jID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XHJcbiAgQE91dHB1dCgpIGlzRW1wdHkgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgbG9hZGluZ01vcmUgPSBmYWxzZTtcclxuICBwYWdlSW5kZXg6IG51bWJlcjtcclxuICBteU9ic2VydmF0aW9uc1VybCQ6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG9ic2VydmF0aW9uU2VydmljZTogT2JzZXJ2YXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB1c2VyU2V0dGluZ1NlcnZpY2U6IFVzZXJTZXR0aW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHRoaXMubXlPYnNlcnZhdGlvbnNVcmwkID0gdGhpcy5jcmVhdGVNeU9ic2VydmF0aW9uc1VybCQoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG5nT25Jbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCk7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UucmVnaXN0cmF0aW9ucyRcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKChyZWdzKSA9PiByZWdzLmxlbmd0aCksXHJcbiAgICAgICAgcGFpcndpc2UoKSxcclxuICAgICAgICBtYXAoKFtsYXN0Q291bnQsIG5ld0NvdW50XSkgPT4gbmV3Q291bnQgLSBsYXN0Q291bnQpLFxyXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgZmlsdGVyKChkaWZmKSA9PiBkaWZmIDwgMCksIC8vb25seSBmZXRjaCBvYnNlcnZhdGlvbnMgd2hlbiBudW0gZHJhZnRzIGRlY3JlYXNlXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDUwMCkgLy93YWl0IGEgYml0IGluIGNhc2UgbXVsdGlwbGUgb2JzZXJ2YXRpb25zIHdlcmUgc2hpcHBlZFxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVmcmVzaChjYW5jZWxQcm9taXNlOiBQcm9taXNlPHZvaWQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc3luY1JlZ2lzdHJhdGlvbnMoY2FuY2VsUHJvbWlzZSk7XHJcbiAgICBhd2FpdCB0aGlzLmluaXRSZWdpc3RyYXRpb25TdWJzY3JpcHRpb24oY2FuY2VsUHJvbWlzZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGluaXRSZWdpc3RyYXRpb25TdWJzY3JpcHRpb24oXHJcbiAgICBjYW5jZWw/OiBQcm9taXNlPHZvaWQ+XHJcbiAgKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICB0aGlzLnBhZ2VJbmRleCA9IDA7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0b1Byb21pc2VXaXRoQ2FuY2VsKFxyXG4gICAgICAgIHRoaXMuZ2V0TXlSZWdpc3RyYXRpb25zJCgwKSxcclxuICAgICAgICBjYW5jZWwsXHJcbiAgICAgICAgMjAwMDBcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5sb2FkZWRSZWdpc3RyYXRpb25zID0gcmVzdWx0O1xyXG4gICAgICB0aGlzLmlzRW1wdHkuZW1pdChyZXN1bHQubGVuZ3RoID09PSAwKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoXHJcbiAgICAgICAgJ0NvdWxkIG5vdCBsb2FkIG15IHJlZ2lzdHJhdGlvbnMnLFxyXG4gICAgICAgICdTZW50TGlzdENvbXBvbmVudC5pbml0UmVnaXN0cmF0aW9uU3Vic2NyaXB0aW9uKCknLFxyXG4gICAgICAgIGVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNeVJlZ2lzdHJhdGlvbnMkKFxyXG4gICAgcGFnZU51bWJlcjogbnVtYmVyXHJcbiAgKTogT2JzZXJ2YWJsZTxSZWdpc3RyYXRpb25WaWV3TW9kZWxbXT4ge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xyXG4gICAgICB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5hcHBNb2RlQW5kTGFuZ3VhZ2UkLFxyXG4gICAgICB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmxvZ2dlZEluVXNlciRcclxuICAgIF0pLnBpcGUoXHJcbiAgICAgIHN3aXRjaE1hcCgoW1thcHBNb2RlLCBsYW5nS2V5XSwgbG9nZ2VkSW5Vc2VyXSkgPT4ge1xyXG4gICAgICAgIGlmIChsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmdldE9ic2VydmF0aW9uc0ZvckN1cnJlbnRVc2VyKFxyXG4gICAgICAgICAgICBhcHBNb2RlLFxyXG4gICAgICAgICAgICBsYW5nS2V5LFxyXG4gICAgICAgICAgICBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICBQQUdFX1NJWkVcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvZihbXSk7XHJcbiAgICAgIH0pLFxyXG4gICAgICB0YWtlKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgbG9hZE5leHRQYWdlKGV2ZW50OiBDdXN0b21FdmVudDxSZWdpc3RyYXRpb25WaWV3TW9kZWw+KTogdm9pZCB7XHJcbiAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gdGhpcy5sb2FkZWRSZWdpc3RyYXRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IGN1cnJlbnRQYWdlSW5kZXggPSBNYXRoLmZsb29yKGN1cnJlbnRMZW5ndGggLyBQQUdFX1NJWkUpO1xyXG4gICAgdGhpcy5sb2FkaW5nTW9yZSA9IHRydWU7XHJcbiAgICB0aGlzLmdldE15UmVnaXN0cmF0aW9ucyQoY3VycmVudFBhZ2VJbmRleClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmdNb3JlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChuZXh0UGFnZSkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucyA9IHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucy5jb25jYXQobmV4dFBhZ2UpO1xyXG4gICAgICAgIHRoaXMucGFnZUluZGV4ICs9IDE7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBJb25JbmZpbml0ZVNjcm9sbCA9IChldmVudC50YXJnZXQgYXMgdW5rbm93bikgYXMgSW9uSW5maW5pdGVTY3JvbGw7XHJcbiAgICAgICAgdGFyZ2V0LmNvbXBsZXRlKCk7XHJcbiAgICAgICAgaWYgKG5leHRQYWdlLmxlbmd0aCA8IFBBR0VfU0laRSB8fCB0aGlzLm1heENvdW50UmVhY2hlZCkge1xyXG4gICAgICAgICAgdGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTsgLy93ZSBoYXZlIHJlYWNoZWQgdGhlIGVuZCwgc28gbm8gbmVlZCB0byBsb2FkIG1vcmUgcGFnZXMgZnJvbSBub3dcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUlkRnVuYyhfOiB1bmtub3duLCBvYnM6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gb2JzID8gb2JzLlJlZ0lkLnRvU3RyaW5nKCkgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4Q291bnRSZWFjaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubG9hZGVkUmVnaXN0cmF0aW9ucy5sZW5ndGggPj0gTUFYX1JFR0lTVFJBVElPTlNfQ09VTlQ7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4Q291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNQVhfUkVHSVNUUkFUSU9OU19DT1VOVDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTXlPYnNlcnZhdGlvbnNVcmwkKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XHJcbiAgICByZXR1cm4gdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckLnBpcGUoXHJcbiAgICAgIG1hcChcclxuICAgICAgICAodXNlclNldHRpbmdzKSA9PiBzZXR0aW5ncy5zZXJ2aWNlcy5yZWdPYnMud2ViVXJsW3VzZXJTZXR0aW5ncy5hcHBNb2RlXVxyXG4gICAgICApLFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICBlbnRlclpvbmUodGhpcy5uZ1pvbmUpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCI8IS0tIFNob3dzIGJyaWVmIGluZm8gZnJvbSBvbmUgb2JzZXJ2YXRpb24gbm90IHNhdmVkIG9uIHNlcnZlciAtLT5cclxuPGlvbi1pdGVtIGxpbmVzPVwiZnVsbFwiIFtkZXRhaWxdPVwiIWxvYWRpbmdcIiBbcm91dGVyTGlua109XCInL3JlZ2lzdHJhdGlvbi9lZGl0LycgKyByZWdpc3RyYXRpb24uaWRcIj5cclxuICA8ZGl2IHNsb3Q9XCJzdGFydFwiIGNsYXNzPVwiZ2VvLWljb24tY2lyY2xlXCI+XHJcbiAgICA8YXBwLWdlby1pY29uIFtnZW9IYXphcmRzXT1cIltyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXVwiPjwvYXBwLWdlby1pY29uPlxyXG4gIDwvZGl2PlxyXG4gIDxpb24tbGFiZWw+XHJcbiAgICA8aDI+XHJcbiAgICAgIHt7IGdldExvY2F0aW9uTmFtZShyZWdpc3RyYXRpb24pIH19XHJcbiAgICA8L2gyPlxyXG4gICAgPHAgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgIDxpb24taWNvbiBuYW1lPVwiY2FsZW5kYXJcIj48L2lvbi1pY29uPiB7eyByZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUgfCBmb3JtYXREYXRlIHwgYXN5bmMgfX1cclxuICAgICAgPHNwYW4gKm5nSWY9XCJpc0RyYWZ0XCI+IC0ge3sgJ0RSQUZUJyB8IHRyYW5zbGF0ZSB9fTwvc3Bhbj5cclxuICAgIDwvcD5cclxuICA8L2lvbi1sYWJlbD5cclxuICA8aW9uLWljb24gKm5nSWY9XCIhbG9hZGluZyAmJiByZWdpc3RyYXRpb24uc3luY0Vycm9yXCIgc2xvdD1cImVuZFwiIG5hbWU9XCJ3YXJuaW5nXCI+XHJcbiAgPC9pb24taWNvbj5cclxuICA8aW9uLXNwaW5uZXIgKm5nSWY9XCJsb2FkaW5nXCIgc2xvdD1cImVuZFwiPjwvaW9uLXNwaW5uZXI+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3ksIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUHJvZ3Jlc3NTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IG1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3luYy1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3luYy1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zeW5jLWl0ZW0uY29tcG9uZW50LnNjc3MnXSxjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxufSlcclxuZXhwb3J0IGNsYXNzIFN5bmNJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgbG9hZGluZzogYm9vbGVhbjtcclxuICBpc0RyYWZ0ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9ncmVzc1NlcnZpY2U6IFByb2dyZXNzU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIHRoaXMuaXNEcmFmdCA9IHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSAhdGhpcy5pc0RyYWZ0O1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICAgICAgIC5nZXRSZWdpc3RyYXRpb25zVG9TeW5jKClcclxuICAgICAgICAucGlwZShcclxuICAgICAgICAgIG1hcCgodmFsOiBJUmVnaXN0cmF0aW9uW10pID0+XHJcbiAgICAgICAgICAgIHZhbC5maW5kKChpdGVtKSA9PiBpdGVtLmlkID09PSB0aGlzLnJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgICAgICksXHJcbiAgICAgICAgICBmaWx0ZXIoKHgpID0+ICEheClcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHZhbDtcclxuICAgICAgICAgIHRoaXMuaXNEcmFmdCA9IHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5wcm9ncmVzc1NlcnZpY2UucmVnaXN0cmF0aW9uU3luY1Byb2dyZXNzJC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHZhbC5pblByb2dyZXNzO1xyXG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGZvciAoY29uc3Qgc3Vic2NyaXB0aW9uIG9mIHRoaXMuc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldExvY2F0aW9uTmFtZShyZWc6IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHJldHVybiByZWcucmVxdWVzdC5PYnNMb2NhdGlvblxyXG4gICAgICA/IHJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uTmFtZSB8fFxyXG4gICAgICAgICAgcmVnLnJlcXVlc3QuT2JzTG9jYXRpb24uTG9jYXRpb25EZXNjcmlwdGlvblxyXG4gICAgICA6ICcnO1xyXG4gIH1cclxufSIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTXlPYnNlcnZhdGlvbnNQYWdlIH0gZnJvbSAnLi9teS1vYnNlcnZhdGlvbnMucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yZWdpc3RyYXRpb24vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vbW9kYWwtcGFnZXMvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4uLy4uL2NvcmUvZ3VhcmRzL2F1dGguZ3VhcmQnO1xyXG5pbXBvcnQgeyBTeW5jSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zeW5jLWl0ZW0vc3luYy1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERyYWZ0TGlzdENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kcmFmdC1saXN0L2RyYWZ0LWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VudExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VudC1saXN0L3NlbnQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IE15T2JzZXJ2YXRpb25zUGFnZSxcclxuICAgIGNhbkFjdGl2YXRlOiBbQXV0aEd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE15T2JzZXJ2YXRpb25zUGFnZSxcclxuICAgIFN5bmNJdGVtQ29tcG9uZW50LFxyXG4gICAgRHJhZnRMaXN0Q29tcG9uZW50LFxyXG4gICAgU2VudExpc3RDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNeU9ic2VydmF0aW9uc1BhZ2VNb2R1bGUge31cclxuIiwiPCEtLSBzaG93cyBsaXN0cyBvZiBhbGwgcmVnaXN0cmF0aW9ucyBjcmVhdGVkOiBEcmFmdHMsIHJlZ2lzdHJhdGlvbnMgaW4gc3luYyBhbmQgcHVibGlzaGVkIHJlZ2lzdHJhdGlvbnMgLS0+XHJcbjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+e3sgJ01ZX09CU0VSVkFUSU9OUy5USVRMRScgfCB0cmFuc2xhdGUgfX08L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZnJlc2gtd2l0aC1jYW5jZWwgW3JlZnJlc2hGdW5jXT1cInJlZnJlc2hGdW5jXCI+PC9hcHAtcmVmcmVzaC13aXRoLWNhbmNlbD5cclxuICA8YXBwLWRyYWZ0LWxpc3QgKGlzRW1wdHkpPVwicmVmcmVzaERyYWZ0RW1wdHlTdGF0ZSgkZXZlbnQpXCI+PC9hcHAtZHJhZnQtbGlzdD5cclxuICA8YXBwLXNlbnQtbGlzdCAoaXNFbXB0eSk9XCJyZWZyZXNoU2VudEVtcHR5U3RhdGUoJGV2ZW50KVwiPjwvYXBwLXNlbnQtbGlzdD5cclxuICA8aW9uLWdyaWQgKm5nSWY9XCJkcmFmdElzRW1wdHkgJiYgc2VudFJlZ2lzdHJhdGlvbnNJc0VtcHR5XCIgY2xhc3M9XCJmdWxsLWdyaWRcIj5cclxuICAgIDxpb24tcm93IGNsYXNzPVwiZnVsbC1ncmlkLXJvd1wiPlxyXG4gICAgICA8aW9uLWNvbCBjbGFzcz1cImlvbi10ZXh0LWNlbnRlciBpb24tYWxpZ24tc2VsZi1jZW50ZXJcIj5cclxuICAgICAgICA8c3ZnLWljb24gc3JjPVwiL2Fzc2V0cy9pbWFnZXMvZW1wdHktc3RhdGVzL25vLW15LW9ic2VydmF0aW9ucy5zdmdcIj48L3N2Zy1pY29uPlxyXG4gICAgICA8L2lvbi1jb2w+XHJcbiAgICA8L2lvbi1yb3c+XHJcbiAgICA8aW9uLXJvdyBjbGFzcz1cImZ1bGwtZ3JpZC1yb3dcIj5cclxuICAgICAgPGlvbi1jb2wgY2xhc3M9XCJpb24tdGV4dC1jZW50ZXIgaW9uLW1hcmdpbi1ob3Jpem9udGFsXCI+XHJcbiAgICAgICAgPGgyPiB7eyAnTVlfT0JTRVJWQVRJT05TLk5PX09CU0VSVkFUSU9OUycgfCB0cmFuc2xhdGUgfX08L2gyPlxyXG4gICAgICAgIDxoMyBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj57eydNWV9PQlNFUlZBVElPTlMuTk9fT0JTRVJWQVRJT05TX1RFWFQnfHRyYW5zbGF0ZX19PC9oMz5cclxuICAgICAgPC9pb24tY29sPlxyXG4gICAgPC9pb24tcm93PlxyXG4gIDwvaW9uLWdyaWQ+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxhcHAtYWRkLW1lbnU+PC9hcHAtYWRkLW1lbnU+XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9yZWdpc3RyYXRpb24vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJb25Db250ZW50LCBJb25JbmZpbml0ZVNjcm9sbCB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgU2VudExpc3RDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VudC1saXN0L3NlbnQtbGlzdC5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbXktb2JzZXJ2YXRpb25zJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbXktb2JzZXJ2YXRpb25zLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbXktb2JzZXJ2YXRpb25zLnBhZ2Uuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNeU9ic2VydmF0aW9uc1BhZ2Uge1xyXG4gIEBWaWV3Q2hpbGQoSW9uQ29udGVudCwgeyBzdGF0aWM6IHRydWUgfSkgY29udGVudDogSW9uQ29udGVudDtcclxuICBAVmlld0NoaWxkKElvbkluZmluaXRlU2Nyb2xsLCB7IHN0YXRpYzogZmFsc2UgfSkgc2Nyb2xsOiBJb25JbmZpbml0ZVNjcm9sbDtcclxuICBAVmlld0NoaWxkKFNlbnRMaXN0Q29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICBzZW50TGlzdENvbXBvbmVudDogU2VudExpc3RDb21wb25lbnQ7XHJcblxyXG4gIHJlZnJlc2hGdW5jID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcyk7XHJcbiAgZHJhZnRJc0VtcHR5ID0gZmFsc2U7XHJcbiAgc2VudFJlZ2lzdHJhdGlvbnNJc0VtcHR5ID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSkge31cclxuXHJcbiAgYXN5bmMgcmVmcmVzaChjYW5jZWxQcm9taXNlOiBQcm9taXNlPHZvaWQ+KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc3luY1JlZ2lzdHJhdGlvbnMoY2FuY2VsUHJvbWlzZSk7XHJcblxyXG4gICAgYXdhaXQgdGhpcy5zZW50TGlzdENvbXBvbmVudC5yZWZyZXNoKGNhbmNlbFByb21pc2UpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaERyYWZ0RW1wdHlTdGF0ZShpc0VtcHR5OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYWZ0SXNFbXB0eSA9IGlzRW1wdHk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoU2VudEVtcHR5U3RhdGUoaXNFbXB0eTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5zZW50UmVnaXN0cmF0aW9uc0lzRW1wdHkgPSBpc0VtcHR5O1xyXG4gIH1cclxufVxyXG4iXX0=