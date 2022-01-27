(function () {
  "use strict";

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_snow-profile_snow-profile_module_ts"], {
    /***/
    1513: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HydrologyHelper": function HydrologyHelper() {
          return (
            /* binding */
            _HydrologyHelper
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _number_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./number-helper */
      27714);

      var _HydrologyHelper = /*#__PURE__*/function () {
        function _HydrologyHelper() {
          _classCallCheck(this, _HydrologyHelper);
        }

        _createClass(_HydrologyHelper, null, [{
          key: "isEmpty",
          value: function isEmpty(obj) {}
        }, {
          key: "calculateDensity",
          value: function calculateDensity(weightInKg, heightInM, tareWeightInKg, cylinderDiameterInM) {
            if (!_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(cylinderDiameterInM) || cylinderDiameterInM <= 0) {
              return 0;
            }

            var r = cylinderDiameterInM / 2.0;
            var totalWeight = (weightInKg || 0) - (tareWeightInKg || 0);

            if (totalWeight <= 0) {
              return 0;
            }

            var heightInMeter = heightInM || 0;

            if (heightInMeter <= 0) {
              return 0;
            }

            var volume = Math.PI * r * r * heightInMeter;
            return totalWeight / volume;
          }
        }, {
          key: "calculateWaterEquivalent",
          value: function calculateWaterEquivalent(density, heightInMeter) {
            if (_number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(density) && _number_helper__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.isNumeric(heightInMeter) && density > 0 && heightInMeter > 0) {
              return density / 1000 * (heightInMeter * 1000);
            }

            return 0;
          }
        }]);

        return _HydrologyHelper;
      }();
      /***/

    },

    /***/
    13617: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestListModalPageModule": function CompressionTestListModalPageModule() {
          return (
            /* binding */
            _CompressionTestListModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./compression-test-list-modal.page */
      92475);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../compression-test-list/compression-test-modal/compression-test-modal.module */
      93864);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _CompressionTestListModalPageModule = function _CompressionTestListModalPageModule() {
        _classCallCheck(this, _CompressionTestListModalPageModule);
      };

      _CompressionTestListModalPageModule.ɵfac = function CompressionTestListModalPageModule_Factory(t) {
        return new (t || _CompressionTestListModalPageModule)();
      };

      _CompressionTestListModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _CompressionTestListModalPageModule
      });
      _CompressionTestListModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_CompressionTestListModalPageModule, {
          declarations: [_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestListModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _compression_test_list_compression_test_modal_compression_test_modal_module__WEBPACK_IMPORTED_MODULE_2__.CompressionTestModalPageModule]
        });
      })();
      /***/

    },

    /***/
    92475: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestListModalPage": function CompressionTestListModalPage() {
          return (
            /* binding */
            _CompressionTestListModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../compression-test-list/compression-test-list.component */
      52386);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function CompressionTestListModalPage_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-compression-test-list", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("testsChange", function CompressionTestListModalPage_ng_container_11_Template_app_compression_test_list_testsChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r1.reg.request.CompressionTest = $event;
          })("testsChange", function CompressionTestListModalPage_ng_container_11_Template_app_compression_test_list_testsChange_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r3.save();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("tests", ctx_r0.reg.request.CompressionTest)("includeInSnowProfileAsDefault", true);
        }
      }

      var _CompressionTestListModalPage = /*#__PURE__*/function () {
        function _CompressionTestListModalPage(modalController, registrationService, commonRegistrationService, ngZone) {
          _classCallCheck(this, _CompressionTestListModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
          this.commonRegistrationService = commonRegistrationService;
          this.ngZone = ngZone;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subject();
        }

        _createClass(_CompressionTestListModalPage, [{
          key: "tests",
          set: function set(val) {
            this.reg.request.CompressionTest = val;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.commonRegistrationService.getRegistrationByIdShared$(this.regId).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$)).subscribe(function (reg) {
              _this.ngZone.run(function () {
                return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!this.initialRegistrationClone) {
                            this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_1___default()(reg);
                          }

                          this.reg = reg;

                          if (!this.reg.request.CompressionTest) {
                            this.reg.request.CompressionTest = [];
                          }

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
              });
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "save",
          value: function save() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss();
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return _CompressionTestListModalPage;
      }();

      _CompressionTestListModalPage.ɵfac = function CompressionTestListModalPage_Factory(t) {
        return new (t || _CompressionTestListModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
      };

      _CompressionTestListModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _CompressionTestListModalPage,
        selectors: [["app-compression-test-list-modal"]],
        inputs: {
          regId: "regId"
        },
        decls: 18,
        vars: 10,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], [4, "ngIf"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [3, "tests", "includeInSnowProfileAsDefault", "testsChange"]],
        template: function CompressionTestListModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CompressionTestListModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function CompressionTestListModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, CompressionTestListModalPage_ng_container_11_Template, 2, 2, "ng-container", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-grid", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "ion-col", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "ion-button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](17, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 4, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.reg && ctx.reg.request && ctx.reg.request.CompressionTest);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](17, 8, "DIALOGS.OK"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgForm, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _compression_test_list_compression_test_list_component__WEBPACK_IMPORTED_MODULE_4__.CompressionTestListComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    91974: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestComponent": function CompressionTestComponent() {
          return (
            /* binding */
            _CompressionTestComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _compression_test_list_modal_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./compression-test-list-modal/compression-test-list-modal.page */
      92475);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../services/registration.service */
      33181);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function CompressionTestComponent_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", ctx_r0.connectedTests.length, " / ", ctx_r0.tests.length, " ");
        }
      }

      function CompressionTestComponent_ion_icon_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 5);
        }
      }

      function CompressionTestComponent_ng_template_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.EMPTY"), "\n");
        }
      }

      var _CompressionTestComponent = /*#__PURE__*/function () {
        function _CompressionTestComponent(modalContoller, registrationService) {
          _classCallCheck(this, _CompressionTestComponent);

          this.modalContoller = modalContoller;
          this.registrationService = registrationService;
        }

        _createClass(_CompressionTestComponent, [{
          key: "connectedTests",
          get: function get() {
            return this.tests.filter(function (t) {
              return t.IncludeInSnowProfile === true;
            });
          }
        }, {
          key: "tests",
          get: function get() {
            return this.reg.request.CompressionTest || [];
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return this.connectedTests.length === 0;
          }
        }, {
          key: "openModal",
          value: function openModal() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (this.compressionTestListModal) {
                        _context4.next = 10;
                        break;
                      }

                      _context4.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 3:
                      _context4.next = 5;
                      return this.modalContoller.create({
                        component: _compression_test_list_modal_compression_test_list_modal_page__WEBPACK_IMPORTED_MODULE_0__.CompressionTestListModalPage,
                        componentProps: {
                          regId: this.reg.id
                        }
                      });

                    case 5:
                      this.compressionTestListModal = _context4.sent;
                      this.compressionTestListModal.present();
                      _context4.next = 9;
                      return this.compressionTestListModal.onDidDismiss();

                    case 9:
                      this.compressionTestListModal = null;

                    case 10:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }]);

        return _CompressionTestComponent;
      }();

      _CompressionTestComponent.ɵfac = function CompressionTestComponent_Factory(t) {
        return new (t || _CompressionTestComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService));
      };

      _CompressionTestComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _CompressionTestComponent,
        selectors: [["app-compression-test"]],
        inputs: {
          reg: "reg"
        },
        decls: 14,
        vars: 12,
        consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]],
        template: function CompressionTestComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function CompressionTestComponent_Template_ion_item_click_0_listener() {
              return ctx.openModal();
            })("keyup.enter", function CompressionTestComponent_Template_ion_item_keyup_enter_0_listener() {
              return ctx.openModal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, CompressionTestComponent_ng_container_7_Template, 2, 2, "ng-container", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](10, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, CompressionTestComponent_ion_icon_11_Template, 1, 0, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, CompressionTestComponent_ng_template_12_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 6, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.tests && ctx.tests.length > 0)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 8, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.MULTIPLE_TESTS"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](10, 10, "REGISTRATION.SNOW.SNOW_PROFILE.COMPRESSION_TEST.ATTACHED"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    43647: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowDensityLayerModalPageModule": function SnowDensityLayerModalPageModule() {
          return (
            /* binding */
            _SnowDensityLayerModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-density-layer-modal.page */
      36966);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SnowDensityLayerModalPageModule = function _SnowDensityLayerModalPageModule() {
        _classCallCheck(this, _SnowDensityLayerModalPageModule);
      };

      _SnowDensityLayerModalPageModule.ɵfac = function SnowDensityLayerModalPageModule_Factory(t) {
        return new (t || _SnowDensityLayerModalPageModule)();
      };

      _SnowDensityLayerModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _SnowDensityLayerModalPageModule
      });
      _SnowDensityLayerModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_SnowDensityLayerModalPageModule, {
          declarations: [_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityLayerModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    36966: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowDensityLayerModalPage": function SnowDensityLayerModalPage() {
          return (
            /* binding */
            _SnowDensityLayerModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/hydrology-helper */
      1513);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SnowDensityLayerModalPage_ng_container_16_ng_container_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, ctx_r4.layer.Density, "1.0-2"), " kg/m\xB3");
        }
      }

      function SnowDensityLayerModalPage_ng_container_16_ng_container_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, ctx_r5.getWaterEquivalent(ctx_r5.layer.Density, ctx_r5.layer.Thickness), "1.0-2"), " mm");
        }
      }

      function SnowDensityLayerModalPage_ng_container_16_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-numeric-input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r6.layer.Thickness = $event;
          })("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r8.calculate();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "app-numeric-input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r9.layer.Weight = $event;
          })("valueChange", function SnowDensityLayerModalPage_ng_container_16_Template_app_numeric_input_valueChange_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r10.calculate();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-text", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, SnowDensityLayerModalPage_ng_container_16_ng_container_8_Template, 3, 4, "ng-container", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-text", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, SnowDensityLayerModalPage_ng_container_16_ng_container_14_Template, 3, 4, "ng-container", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.layer.Thickness)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.layer.Weight)("max", 9999)("min", 0)("convertRatio", 1000)("decimalPlaces", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 14, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.layer.Density);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 16, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.WATER_EQUIVALENT"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.layer.Density && ctx_r0.layer.Thickness);
        }
      }

      function SnowDensityLayerModalPage_ion_row_36_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_ion_row_36_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r12);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r11["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
        }
      }

      function SnowDensityLayerModalPage_ng_template_37_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-numeric-input", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r13.layer.Thickness = $event;
          })("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r15.calculate();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "app-numeric-input", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowDensityLayerModalPage_ng_template_37_Template_app_numeric_input_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r16.layer.Density = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r3.layer.Thickness)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r3.layer.Density)("max", 9999)("min", 0)("decimalPlaces", 3);
        }
      }

      var _SnowDensityLayerModalPage = /*#__PURE__*/function () {
        function _SnowDensityLayerModalPage(modalController, registrationService) {
          _classCallCheck(this, _SnowDensityLayerModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
          this.useCylinder = true;
        }

        _createClass(_SnowDensityLayerModalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initialRegistrationState = clone_deep__WEBPACK_IMPORTED_MODULE_1___default()(this.reg);
            this.initLayer();
          }
        }, {
          key: "initLayer",
          value: function initLayer() {
            this.addNew = this.layer === undefined;

            if (this.addNew) {
              this.layer = {};
            }

            this.calculate();
          }
        }, {
          key: "hasLayers",
          get: function get() {
            return this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowDensity && this.reg.request.SnowProfile2.SnowDensity[0] && this.reg.request.SnowProfile2.SnowDensity[0].Layers && this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0;
          }
        }, {
          key: "layerLenght",
          get: function get() {
            return this.hasLayers ? this.reg.request.SnowProfile2.SnowDensity[0].Layers.length : 0;
          }
        }, {
          key: "canGoNext",
          get: function get() {
            return this.hasLayers && this.index < this.layerLenght || this.index === this.layerLenght && this.addNew && !this.isEmpty(this.layer);
          }
        }, {
          key: "isEmpty",
          value: function isEmpty(snowDensityLayer) {
            return this.useCylinder ? snowDensityLayer.Thickness === undefined && snowDensityLayer.Weight === undefined : snowDensityLayer.Density === undefined;
          }
        }, {
          key: "ok",
          value: function ok(gotoIndex) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!this.reg.request.SnowProfile2) {
                        this.reg.request.SnowProfile2 = {};
                      }

                      if (!this.reg.request.SnowProfile2.SnowDensity) {
                        this.reg.request.SnowProfile2.SnowDensity = [];
                      }

                      if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
                        this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
                      }

                      if (this.addNew && !this.isEmpty(this.layer)) {
                        this.reg.request.SnowProfile2.SnowDensity[0].Layers.splice(this.index, 0, this.layer);
                      }

                      _context5.next = 6;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 6:
                      if (gotoIndex !== undefined) {
                        this.index = this.index + gotoIndex;
                        this.layer = this.reg.request.SnowProfile2.SnowDensity[0].Layers[this.index];
                        this.initLayer();
                      } else {
                        this.modalController.dismiss();
                      }

                    case 7:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistrationState);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "delete",
          value: function _delete() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!(this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowDensity && this.reg.request.SnowProfile2.SnowDensity.length > 0 && this.reg.request.SnowProfile2.SnowDensity[0].Layers && this.reg.request.SnowProfile2.SnowDensity[0].Layers.length > 0)) {
                        _context7.next = 4;
                        break;
                      }

                      this.reg.request.SnowProfile2.SnowDensity[0].Layers = this.reg.request.SnowProfile2.SnowDensity[0].Layers.filter(function (l) {
                        return l !== _this2.layer;
                      });
                      _context7.next = 4;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 4:
                      this.modalController.dismiss();

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "calculate",
          value: function calculate() {
            if (this.useCylinder) {
              this.layer.Density = _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__.HydrologyHelper.calculateDensity(this.layer.Weight, this.layer.Thickness, this.tareWeight, this.cylinderDiameterInM);
            }
          }
        }, {
          key: "getWaterEquivalent",
          value: function getWaterEquivalent(density, depth) {
            return _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_0__.HydrologyHelper.calculateWaterEquivalent(density, depth);
          }
        }]);

        return _SnowDensityLayerModalPage;
      }();

      _SnowDensityLayerModalPage.ɵfac = function SnowDensityLayerModalPage_Factory(t) {
        return new (t || _SnowDensityLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService));
      };

      _SnowDensityLayerModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _SnowDensityLayerModalPage,
        selectors: [["app-snow-density-layer-modal"]],
        inputs: {
          reg: "reg",
          layer: "layer",
          useCylinder: "useCylinder",
          cylinderDiameterInM: "cylinderDiameterInM",
          tareWeight: "tareWeight",
          index: "index"
        },
        decls: 39,
        vars: 23,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], [4, "ngIf", "ngIfElse"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [4, "ngIf"], ["noCylinder", ""], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.HEIGHT", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.WEIGHT", "suffix", "g", 3, "value", "max", "min", "convertRatio", "decimalPlaces", "valueChange"], ["position", "stacked", "color", "medium", 1, "ion-text-uppercase"], [1, "ion-align-self-start"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.DENSITY", "suffix", "kg/m\xB3", 3, "value", "max", "min", "decimalPlaces", "valueChange"]],
        template: function SnowDensityLayerModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function SnowDensityLayerModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, SnowDensityLayerModalPage_ng_container_16_Template, 15, 18, "ng-container", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "ion-grid", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-col", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_20_listener() {
              return ctx.ok(-1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "ion-icon", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](24, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "ion-col", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "ion-button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowDensityLayerModalPage_Template_ion_button_click_26_listener() {
              return ctx.ok(1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "ion-icon", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](30, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "ion-col", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "ion-button", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](35, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](36, SnowDensityLayerModalPage_ion_row_36_Template, 6, 3, "ion-row", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, SnowDensityLayerModalPage_ng_template_37_Template, 2, 9, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](38);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 11, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 13, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 15, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.useCylinder)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.index === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](24, 17, "DIALOGS.PREVIOUS"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.canGoNext);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](30, 19, "DIALOGS.NEXT"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](35, 21, "DIALOGS.OK_BACK"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.addNew);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DecimalPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    17952: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowDensityModalPageModule": function SnowDensityModalPageModule() {
          return (
            /* binding */
            _SnowDensityModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-density-modal.page */
      47275);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../snow-density-layer-modal/snow-density-layer-modal.module */
      43647);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SnowDensityModalPageModule = function _SnowDensityModalPageModule() {
        _classCallCheck(this, _SnowDensityModalPageModule);
      };

      _SnowDensityModalPageModule.ɵfac = function SnowDensityModalPageModule_Factory(t) {
        return new (t || _SnowDensityModalPageModule)();
      };

      _SnowDensityModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _SnowDensityModalPageModule
      });
      _SnowDensityModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowDensityLayerModalPageModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_SnowDensityModalPageModule, {
          declarations: [_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_density_layer_modal_snow_density_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowDensityLayerModalPageModule]
        });
      })();
      /***/

    },

    /***/
    47275: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowDensityModalPage": function SnowDensityModalPage() {
          return (
            /* binding */
            _SnowDensityModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _snow_density_layer_modal_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../snow-density-layer-modal/snow-density-layer-modal.page */
      36966);
      /* harmony import */


      var _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/array-helper */
      99020);
      /* harmony import */


      var _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/hydrology-helper */
      1513);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_4__);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../../../pipes/meters-to-cm.pipe */
      50795);

      function SnowDensityModalPage_ng_container_21_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "app-numeric-input", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r4.profile.CylinderDiameter = $event;
          })("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.recalculateLayersAndSave();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "app-numeric-input", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r7.profile.TareWeight = $event;
          })("valueChange", function SnowDensityModalPage_ng_container_21_Template_app_numeric_input_valueChange_6_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r8.recalculateLayersAndSave();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 11, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.profile.CylinderDiameter)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.profile.TareWeight)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 1000);
        }
      }

      function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, layer_r10.Thickness), "cm ");
        }
      }

      function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", layer_r10.Weight * 1000, "g ");
        }
      }

      function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, layer_r10.Density, "1.0-2"), "kg/m\xB3 ");
        }
      }

      function SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;

          var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" (", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](2, 1, ctx_r15.getWaterEquivalent(layer_r10.Density, layer_r10.Thickness), "1.0-2"), "mm) ");
        }
      }

      function SnowDensityModalPage_ng_container_26_ion_item_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_ion_item_7_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r21);

            var i_r11 = restoredCtx.index;
            var layer_r10 = restoredCtx.$implicit;

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r20.addOrEditLayer(i_r11, layer_r10);
          })("keyup.enter", function SnowDensityModalPage_ng_container_26_ion_item_7_Template_ion_item_keyup_enter_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r21);

            var i_r11 = restoredCtx.index;
            var layer_r10 = restoredCtx.$implicit;

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r22.addOrEditLayer(i_r11, layer_r10);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_2_Template, 3, 3, "ion-text", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_3_Template, 2, 1, "ion-text", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_4_Template, 3, 4, "ion-text", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, SnowDensityModalPage_ng_container_26_ion_item_7_ion_text_5_Template, 3, 4, "ion-text", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "ion-reorder", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r10 = ctx.$implicit;

          var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Thickness !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Weight !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", layer_r10.Density !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r9.useCylinder && layer_r10.Density !== undefined && layer_r10.Thickness !== undefined);
        }
      }

      function SnowDensityModalPage_ng_container_26_Template(rf, ctx) {
        if (rf & 1) {
          var _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-item", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_Template_ion_item_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r23.addLayerTop();
          })("keyup.enter", function SnowDensityModalPage_ng_container_26_Template_ion_item_keyup_enter_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);

            var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r25.addLayerTop();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "ion-icon", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-reorder-group", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionItemReorder", function SnowDensityModalPage_ng_container_26_Template_ion_reorder_group_ionItemReorder_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);

            var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r26.onLayerReorder($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, SnowDensityModalPage_ng_container_26_ion_item_7_Template, 7, 4, "ion-item", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-item", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_container_26_Template_ion_item_click_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);

            var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r27.addLayerBottom();
          })("keyup.enter", function SnowDensityModalPage_ng_container_26_Template_ion_item_keyup_enter_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r24);

            var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r28.addLayerBottom();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "ion-icon", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 3, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_TOP"));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r1.profile.Layers);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_BOTTOM"));
        }
      }

      function SnowDensityModalPage_ng_template_33_Template(rf, ctx) {
        if (rf & 1) {
          var _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_ng_template_33_Template_ion_item_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r30);

            var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r29.addLayerBottom();
          })("keyup.enter", function SnowDensityModalPage_ng_template_33_Template_ion_item_keyup_enter_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r30);

            var ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r31.addLayerBottom();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](4, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER"));
        }
      }

      var _SnowDensityModalPage = /*#__PURE__*/function () {
        function _SnowDensityModalPage(modalController, registrationService, commonRegistrationService, ngZone) {
          _classCallCheck(this, _SnowDensityModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
          this.commonRegistrationService = commonRegistrationService;
          this.ngZone = ngZone;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subject();
        }

        _createClass(_SnowDensityModalPage, [{
          key: "profile",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowDensity && this.reg.request.SnowProfile2.SnowDensity.length > 0) {
              return this.reg.request.SnowProfile2.SnowDensity[0];
            }

            return {};
          }
        }, {
          key: "hasLayers",
          get: function get() {
            return this.profile && this.profile.Layers && this.profile.Layers.length > 0;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      this.commonRegistrationService.getRegistrationByIdShared$(this.regId).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$)).subscribe(function (reg) {
                        _this3.ngZone.run(function () {
                          return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(_this3, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                              while (1) {
                                switch (_context8.prev = _context8.next) {
                                  case 0:
                                    if (!this.initialRegistrationClone) {
                                      this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_4___default()(reg);
                                    }

                                    this.reg = reg;

                                    if (!this.reg.request.SnowProfile2) {
                                      this.reg.request.SnowProfile2 = {};
                                    }

                                    if (!this.reg.request.SnowProfile2.SnowDensity) {
                                      this.reg.request.SnowProfile2.SnowDensity = [];
                                    }

                                    if (!this.reg.request.SnowProfile2.SnowDensity[0]) {
                                      this.reg.request.SnowProfile2.SnowDensity[0] = {};
                                    }

                                    if (!this.reg.request.SnowProfile2.SnowDensity[0].Layers) {
                                      this.reg.request.SnowProfile2.SnowDensity[0].Layers = [];
                                    }

                                    if (this.useCylinder === undefined) {
                                      this.useCylinder = !!this.reg.request.SnowProfile2.SnowDensity[0].CylinderDiameter || !!this.reg.request.SnowProfile2.SnowDensity[0].TareWeight || this.reg.request.SnowProfile2.SnowDensity[0].Layers.length === 0 || this.reg.request.SnowProfile2.SnowDensity[0].Layers.some(function (l) {
                                        return !!l.Weight;
                                      });
                                    }

                                    this.recalculateLayers();

                                  case 8:
                                  case "end":
                                    return _context8.stop();
                                }
                              }
                            }, _callee8, this);
                          }));
                        });
                      });

                    case 1:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss(this.profile);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }, {
          key: "addLayerTop",
          value: function addLayerTop() {
            this.addOrEditLayer(0, undefined);
          }
        }, {
          key: "addLayerBottom",
          value: function addLayerBottom() {
            this.addOrEditLayer(this.hasLayers ? this.profile.Layers.length : 0, undefined);
          }
        }, {
          key: "addOrEditLayer",
          value: function addOrEditLayer(index, layer) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      if (this.layerModal) {
                        _context11.next = 9;
                        break;
                      }

                      _context11.next = 3;
                      return this.modalController.create({
                        component: _snow_density_layer_modal_snow_density_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityLayerModalPage,
                        componentProps: {
                          reg: this.reg,
                          layer: layer,
                          useCylinder: this.useCylinder,
                          cylinderDiameterInM: this.profile.CylinderDiameter,
                          tareWeight: this.profile.TareWeight,
                          index: index
                        }
                      });

                    case 3:
                      this.layerModal = _context11.sent;
                      this.layerModal.present();
                      _context11.next = 7;
                      return this.layerModal.onDidDismiss();

                    case 7:
                      this.layerModal = null;
                      this.recalculateLayers();

                    case 9:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, this);
            }));
          }
        }, {
          key: "onLayerReorder",
          value: function onLayerReorder(event) {
            this.profile.Layers = _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__.ArrayHelper.reorderList(this.profile.Layers, event.detail.from, event.detail.to);
            event.detail.complete();
          }
        }, {
          key: "recalculateLayers",
          value: function recalculateLayers() {
            var _this4 = this;

            if (this.useCylinder && this.hasLayers) {
              this.profile.Layers.forEach(function (layer) {
                layer.Density = _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__.HydrologyHelper.calculateDensity(layer.Weight, layer.Thickness, _this4.profile.TareWeight, _this4.profile.CylinderDiameter);
              });
            }
          }
        }, {
          key: "recalculateLayersAndSave",
          value: function recalculateLayersAndSave() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
              return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      this.recalculateLayers();
                      _context12.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 3:
                    case "end":
                      return _context12.stop();
                  }
                }
              }, _callee12, this);
            }));
          }
        }, {
          key: "getWaterEquivalent",
          value: function getWaterEquivalent(density, depth) {
            return _core_helpers_hydrology_helper__WEBPACK_IMPORTED_MODULE_2__.HydrologyHelper.calculateWaterEquivalent(density, depth);
          }
        }]);

        return _SnowDensityModalPage;
      }();

      _SnowDensityModalPage.ɵfac = function SnowDensityModalPage_Factory(t) {
        return new (t || _SnowDensityModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_3__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_5__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone));
      };

      _SnowDensityModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _SnowDensityModalPage,
        selectors: [["app-snow-density-modal"]],
        inputs: {
          regId: "regId"
        },
        decls: 35,
        vars: 22,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["slot", "end", "name", "useCylinder", 3, "ngModel", "ngModelChange"], [4, "ngIf"], [4, "ngIf", "ngIfElse"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["noLayers", ""], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER_DIAMETER", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TARE_WEIGHT", "suffix", "g", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["disabled", "false", 3, "ionItemReorder"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["slot", "end"]],
        template: function SnowDensityModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function SnowDensityModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngSubmit", function SnowDensityModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](19, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](20, "ion-toggle", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function SnowDensityModalPage_Template_ion_toggle_ngModelChange_20_listener($event) {
              return ctx.useCylinder = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](21, SnowDensityModalPage_ng_container_21_Template, 7, 13, "ng-container", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](22, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](23, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](25, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](26, SnowDensityModalPage_ng_container_26_Template, 13, 7, "ng-container", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](27, "ion-grid", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](28, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](29, "ion-col", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](30, "ion-button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](31);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](32, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](33, SnowDensityModalPage_ng_template_33_Template, 5, 3, "ng-template", null, 12, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](34);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 12, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](15, 14, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.METHOD"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](19, 16, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.CYLINDER_METHOD"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx.useCylinder);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.useCylinder);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](25, 18, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.LAYER"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.hasLayers)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](32, 20, "DIALOGS.OK"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonCol, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonReorder, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonText],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__.MetersToCmPipe, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHktbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    9253: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowDensityComponent": function SnowDensityComponent() {
          return (
            /* binding */
            _SnowDensityComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _snow_density_modal_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-density-modal/snow-density-modal.page */
      47275);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../services/registration.service */
      33181);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SnowDensityComponent_ion_text_6_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.ONE_LAYER"), " ");
        }
      }

      function SnowDensityComponent_ion_text_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SnowDensityComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r0.profiles[0].Layers ? ctx_r0.profiles[0].Layers.length : 0, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.profiles[0].Layers.length === 1)("ngIfElse", _r4);
        }
      }

      function SnowDensityComponent_ion_icon_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 6);
        }
      }

      function SnowDensityComponent_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.EMPTY"), "\n");
        }
      }

      function SnowDensityComponent_ng_template_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.MULTIPLE_LAYERS"), "\n");
        }
      }

      var _SnowDensityComponent = /*#__PURE__*/function () {
        function _SnowDensityComponent(modalContoller, registrationService) {
          _classCallCheck(this, _SnowDensityComponent);

          this.modalContoller = modalContoller;
          this.registrationService = registrationService;
        }

        _createClass(_SnowDensityComponent, [{
          key: "profiles",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowDensity && this.reg.request.SnowProfile2.SnowDensity.length > 0) {
              return this.reg.request.SnowProfile2.SnowDensity;
            }

            return [];
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return (0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(this.profiles);
          }
        }, {
          key: "openModal",
          value: function openModal() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
              return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                  switch (_context13.prev = _context13.next) {
                    case 0:
                      if (this.densityModal) {
                        _context13.next = 10;
                        break;
                      }

                      _context13.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 3:
                      _context13.next = 5;
                      return this.modalContoller.create({
                        component: _snow_density_modal_snow_density_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowDensityModalPage,
                        componentProps: {
                          regId: this.reg.id
                        }
                      });

                    case 5:
                      this.densityModal = _context13.sent;
                      this.densityModal.present();
                      _context13.next = 9;
                      return this.densityModal.onDidDismiss();

                    case 9:
                      this.densityModal = null;

                    case 10:
                    case "end":
                      return _context13.stop();
                  }
                }
              }, _callee13, this);
            }));
          }
        }]);

        return _SnowDensityComponent;
      }();

      _SnowDensityComponent.ɵfac = function SnowDensityComponent_Factory(t) {
        return new (t || _SnowDensityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService));
      };

      _SnowDensityComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _SnowDensityComponent,
        selectors: [["app-snow-density"]],
        inputs: {
          reg: "reg"
        },
        decls: 12,
        vars: 6,
        consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]],
        template: function SnowDensityComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SnowDensityComponent_Template_ion_item_click_0_listener() {
              return ctx.openModal();
            })("keyup.enter", function SnowDensityComponent_Template_ion_item_keyup_enter_0_listener() {
              return ctx.openModal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SnowDensityComponent_ion_text_6_Template, 3, 3, "ion-text", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, SnowDensityComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SnowDensityComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SnowDensityComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_DENSITY.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LWRlbnNpdHkuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    16866: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowTempLayerModalPageModule": function SnowTempLayerModalPageModule() {
          return (
            /* binding */
            _SnowTempLayerModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-temp-layer-modal.page */
      5309);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SnowTempLayerModalPageModule = function _SnowTempLayerModalPageModule() {
        _classCallCheck(this, _SnowTempLayerModalPageModule);
      };

      _SnowTempLayerModalPageModule.ɵfac = function SnowTempLayerModalPageModule_Factory(t) {
        return new (t || _SnowTempLayerModalPageModule)();
      };

      _SnowTempLayerModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _SnowTempLayerModalPageModule
      });
      _SnowTempLayerModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_SnowTempLayerModalPageModule, {
          declarations: [_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempLayerModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    5309: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowTempLayerModalPage": function SnowTempLayerModalPage() {
          return (
            /* binding */
            _SnowTempLayerModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SnowTempLayerModalPage_ion_row_37_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-col", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_ion_row_37_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r1["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
        }
      }

      var _SnowTempLayerModalPage = /*#__PURE__*/function () {
        function _SnowTempLayerModalPage(modalController, registrationService) {
          _classCallCheck(this, _SnowTempLayerModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
        }

        _createClass(_SnowTempLayerModalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.initialRegistrationState = clone_deep__WEBPACK_IMPORTED_MODULE_2___default()(this.reg);
            this.initLayer();
          }
        }, {
          key: "initLayer",
          value: function initLayer() {
            this.addNew = this.layer === undefined;

            if (this.addNew) {
              this.layer = {};
            }
          }
        }, {
          key: "hasLayers",
          get: function get() {
            return this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp && this.reg.request.SnowProfile2.SnowTemp.Layers && this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0;
          }
        }, {
          key: "layerLenght",
          get: function get() {
            return this.hasLayers ? this.reg.request.SnowProfile2.SnowTemp.Layers.length : 0;
          }
        }, {
          key: "canGoNext",
          get: function get() {
            return this.hasLayers && this.index < this.layerLenght || this.index === this.layerLenght && this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.layer);
          }
        }, {
          key: "ok",
          value: function ok(gotoIndex) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
              return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                  switch (_context14.prev = _context14.next) {
                    case 0:
                      if (!this.reg.request.SnowProfile2) {
                        this.reg.request.SnowProfile2 = {};
                      }

                      if (!this.reg.request.SnowProfile2.SnowTemp) {
                        this.reg.request.SnowProfile2.SnowTemp = {};
                      }

                      if (!this.reg.request.SnowProfile2.SnowTemp.Layers) {
                        this.reg.request.SnowProfile2.SnowTemp.Layers = [];
                      }

                      if (this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.layer)) {
                        this.reg.request.SnowProfile2.SnowTemp.Layers.splice(this.index, 0, this.layer);
                      }

                      _context14.next = 6;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 6:
                      if (gotoIndex !== undefined) {
                        this.index = this.index + gotoIndex;
                        this.layer = this.reg.request.SnowProfile2.SnowTemp.Layers[this.index];
                        this.initLayer();
                      } else {
                        this.modalController.dismiss();
                      }

                    case 7:
                    case "end":
                      return _context14.stop();
                  }
                }
              }, _callee14, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
              return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                  switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistrationState);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context15.stop();
                  }
                }
              }, _callee15, this);
            }));
          }
        }, {
          key: "delete",
          value: function _delete() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
              var _this5 = this;

              return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                  switch (_context16.prev = _context16.next) {
                    case 0:
                      if (!(this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp && this.reg.request.SnowProfile2.SnowTemp.Layers && this.reg.request.SnowProfile2.SnowTemp.Layers.length > 0)) {
                        _context16.next = 4;
                        break;
                      }

                      this.reg.request.SnowProfile2.SnowTemp.Layers = this.reg.request.SnowProfile2.SnowTemp.Layers.filter(function (l) {
                        return l !== _this5.layer;
                      });
                      _context16.next = 4;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 4:
                      this.modalController.dismiss({
                        "delete": true
                      });

                    case 5:
                    case "end":
                      return _context16.stop();
                  }
                }
              }, _callee16, this);
            }));
          }
        }]);

        return _SnowTempLayerModalPage;
      }();

      _SnowTempLayerModalPage.ɵfac = function SnowTempLayerModalPage_Factory(t) {
        return new (t || _SnowTempLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService));
      };

      _SnowTempLayerModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _SnowTempLayerModalPage,
        selectors: [["app-snow-temp-layer-modal"]],
        inputs: {
          layer: "layer",
          index: "index",
          reg: "reg"
        },
        decls: 38,
        vars: 30,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.DEPTH", "suffix", "cm", 3, "value", "max", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TEMPERATURE", "suffix", "\xB0C", 3, "value", "max", "min", "decimalPlaces", "valueChange"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], [4, "ngIf"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]],
        template: function SnowTempLayerModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngSubmit", function SnowTempLayerModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "app-numeric-input", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowTempLayerModalPage_Template_app_numeric_input_valueChange_16_listener($event) {
              return ctx.layer.Depth = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "app-numeric-input", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function SnowTempLayerModalPage_Template_app_numeric_input_valueChange_17_listener($event) {
              return ctx.layer.SnowTemp = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "ion-grid", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "ion-col", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "ion-button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_21_listener() {
              return ctx.ok(-1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "ion-icon", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](25, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "ion-col", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "ion-button", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SnowTempLayerModalPage_Template_ion_button_click_27_listener() {
              return ctx.ok(1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "ion-icon", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](31, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](32, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "ion-col", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "ion-button", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](36, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, SnowTempLayerModalPage_ion_row_37_Template, 6, 3, "ion-row", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 18, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 20, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.POINT"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](15, 22, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.POINT"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.layer.Depth)("max", 999)("min", 0)("decimalPlaces", 2)("convertRatio", 100);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx.layer.SnowTemp)("max", 0)("min", -70)("decimalPlaces", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.index === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](25, 24, "DIALOGS.PREVIOUS"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx.canGoNext);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](31, 26, "DIALOGS.NEXT"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](36, 28, "DIALOGS.OK_BACK"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.addNew);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAtbGF5ZXItbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    35692: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowTempModalPageModule": function SnowTempModalPageModule() {
          return (
            /* binding */
            _SnowTempModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-temp-modal.page */
      87510);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../snow-temp-layer-modal/snow-temp-layer-modal.module */
      16866);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SnowTempModalPageModule = function _SnowTempModalPageModule() {
        _classCallCheck(this, _SnowTempModalPageModule);
      };

      _SnowTempModalPageModule.ɵfac = function SnowTempModalPageModule_Factory(t) {
        return new (t || _SnowTempModalPageModule)();
      };

      _SnowTempModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _SnowTempModalPageModule
      });
      _SnowTempModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowTempLayerModalPageModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_SnowTempModalPageModule, {
          declarations: [_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _snow_temp_layer_modal_snow_temp_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.SnowTempLayerModalPageModule]
        });
      })();
      /***/

    },

    /***/
    87510: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowTempModalPage": function SnowTempModalPage() {
          return (
            /* binding */
            _SnowTempModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _snow_temp_layer_modal_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../snow-temp-layer-modal/snow-temp-layer-modal.page */
      5309);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../../pipes/meters-to-cm.pipe */
      50795);

      function SnowTempModalPage_ion_item_16_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](2, 1, layer_r1.Depth), "cm ");
        }
      }

      function SnowTempModalPage_ion_item_16_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", layer_r1.SnowTemp, "\xB0C ");
        }
      }

      function SnowTempModalPage_ion_item_16_Template(rf, ctx) {
        if (rf & 1) {
          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-item", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_ion_item_16_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);

            var i_r2 = restoredCtx.index;
            var layer_r1 = restoredCtx.$implicit;

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r7.addOrEditLayer(i_r2, layer_r1);
          })("keyup.enter", function SnowTempModalPage_ion_item_16_Template_ion_item_keyup_enter_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);

            var i_r2 = restoredCtx.index;
            var layer_r1 = restoredCtx.$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r9.addOrEditLayer(i_r2, layer_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, SnowTempModalPage_ion_item_16_ng_container_2_Template, 3, 3, "ng-container", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SnowTempModalPage_ion_item_16_ng_container_3_Template, 2, 1, "ng-container", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", layer_r1.Depth !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", layer_r1.SnowTemp !== undefined);
        }
      }

      var _SnowTempModalPage = /*#__PURE__*/function () {
        function _SnowTempModalPage(modalController, registrationService, commonRegistrationService, ngZone) {
          _classCallCheck(this, _SnowTempModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
          this.commonRegistrationService = commonRegistrationService;
          this.ngZone = ngZone;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        }

        _createClass(_SnowTempModalPage, [{
          key: "tempProfile",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp) {
              return this.reg.request.SnowProfile2.SnowTemp;
            }

            return {};
          }
        }, {
          key: "hasLayers",
          get: function get() {
            return this.tempProfile && this.tempProfile.Layers && this.tempProfile.Layers.length > 0;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this6 = this;

            this.commonRegistrationService.getRegistrationByIdShared$(this.regId).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.takeUntil)(this.ngDestroy$)).subscribe(function (reg) {
              _this6.ngZone.run(function () {
                if (!_this6.initialRegistrationClone) {
                  _this6.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_3___default()(reg);
                }

                _this6.reg = reg;

                if (!_this6.reg.request.SnowProfile2) {
                  _this6.reg.request.SnowProfile2 = {};
                }

                if (!_this6.reg.request.SnowProfile2.SnowTemp) {
                  _this6.reg.request.SnowProfile2.SnowTemp = {};
                }

                if (!_this6.reg.request.SnowProfile2.SnowTemp.Layers) {
                  _this6.reg.request.SnowProfile2.SnowTemp.Layers = [];
                }

                _this6.sortLayers();
              });
            });
            this.initialRegistrationClone = clone_deep__WEBPACK_IMPORTED_MODULE_3___default()(this.reg);
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss(this.tempProfile);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
              return regeneratorRuntime.wrap(function _callee17$(_context17) {
                while (1) {
                  switch (_context17.prev = _context17.next) {
                    case 0:
                      _context17.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistrationClone);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context17.stop();
                  }
                }
              }, _callee17, this);
            }));
          }
        }, {
          key: "addLayerBottom",
          value: function addLayerBottom() {
            this.addOrEditLayer(this.hasLayers ? this.tempProfile.Layers.length : 0, undefined);
          }
        }, {
          key: "addOrEditLayer",
          value: function addOrEditLayer(index, layer) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
              return regeneratorRuntime.wrap(function _callee18$(_context18) {
                while (1) {
                  switch (_context18.prev = _context18.next) {
                    case 0:
                      if (this.layerModal) {
                        _context18.next = 9;
                        break;
                      }

                      _context18.next = 3;
                      return this.modalController.create({
                        component: _snow_temp_layer_modal_snow_temp_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempLayerModalPage,
                        componentProps: {
                          reg: this.reg,
                          layer: layer,
                          index: index
                        }
                      });

                    case 3:
                      this.layerModal = _context18.sent;
                      this.layerModal.present();
                      _context18.next = 7;
                      return this.layerModal.onDidDismiss();

                    case 7:
                      this.layerModal = null;
                      this.sortLayers();

                    case 9:
                    case "end":
                      return _context18.stop();
                  }
                }
              }, _callee18, this);
            }));
          }
        }, {
          key: "sortLayers",
          value: function sortLayers() {
            if (this.tempProfile && this.tempProfile.Layers) {
              this.tempProfile.Layers = this.tempProfile.Layers.sort(function (a, b) {
                return a.Depth - b.Depth;
              });
            }
          }
        }]);

        return _SnowTempModalPage;
      }();

      _SnowTempModalPage.ɵfac = function SnowTempModalPage_Factory(t) {
        return new (t || _SnowTempModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone));
      };

      _SnowTempModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _SnowTempModalPage,
        selectors: [["app-snow-temp-modal"]],
        inputs: {
          regId: "regId"
        },
        decls: 28,
        vars: 16,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["expand", "block", "fill", "solid", "color", "primary", "type", "submit"], [4, "ngIf"]],
        template: function SnowTempModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngSubmit", function SnowTempModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, SnowTempModalPage_ion_item_16_Template, 4, 2, "ion-item", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "ion-item", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SnowTempModalPage_Template_ion_item_click_17_listener() {
              return ctx.addLayerBottom();
            })("keyup.enter", function SnowTempModalPage_Template_ion_item_keyup_enter_17_listener() {
              return ctx.addLayerBottom();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "ion-icon", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](21, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "ion-grid", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](24, "ion-col", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "ion-button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 6, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 8, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](15, 10, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.tempProfile.Layers);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](21, 12, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.ADD_LAYER_BOTTOM"));

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](27, 14, "DIALOGS.OK"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_5__.MetersToCmPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAtbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    55568: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowTempComponent": function SnowTempComponent() {
          return (
            /* binding */
            _SnowTempComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _snow_temp_modal_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-temp-modal/snow-temp-modal.page */
      87510);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../services/registration.service */
      33181);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SnowTempComponent_ion_text_6_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.ONE_LAYER"), " ");
        }
      }

      function SnowTempComponent_ion_text_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SnowTempComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r0.tempProfile.Layers ? ctx_r0.tempProfile.Layers.length : 0, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.tempProfile.Layers.length === 1)("ngIfElse", _r4);
        }
      }

      function SnowTempComponent_ion_icon_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-icon", 6);
        }
      }

      function SnowTempComponent_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.EMPTY"), "\n");
        }
      }

      function SnowTempComponent_ng_template_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.MULTIPLE_LAYERS"), "\n");
        }
      }

      var _SnowTempComponent = /*#__PURE__*/function () {
        function _SnowTempComponent(modalContoller, registrationService) {
          _classCallCheck(this, _SnowTempComponent);

          this.modalContoller = modalContoller;
          this.registrationService = registrationService;
        }

        _createClass(_SnowTempComponent, [{
          key: "tempProfile",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.SnowTemp) {
              return this.reg.request.SnowProfile2.SnowTemp;
            }

            return {};
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return (0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_3__.isEmpty)(this.tempProfile);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "openModal",
          value: function openModal() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee19() {
              return regeneratorRuntime.wrap(function _callee19$(_context19) {
                while (1) {
                  switch (_context19.prev = _context19.next) {
                    case 0:
                      if (this.snowTempModal) {
                        _context19.next = 10;
                        break;
                      }

                      _context19.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 3:
                      _context19.next = 5;
                      return this.modalContoller.create({
                        component: _snow_temp_modal_snow_temp_modal_page__WEBPACK_IMPORTED_MODULE_0__.SnowTempModalPage,
                        componentProps: {
                          regId: this.reg.id
                        }
                      });

                    case 5:
                      this.snowTempModal = _context19.sent;
                      this.snowTempModal.present();
                      _context19.next = 9;
                      return this.snowTempModal.onDidDismiss();

                    case 9:
                      this.snowTempModal = null;

                    case 10:
                    case "end":
                      return _context19.stop();
                  }
                }
              }, _callee19, this);
            }));
          }
        }]);

        return _SnowTempComponent;
      }();

      _SnowTempComponent.ɵfac = function SnowTempComponent_Factory(t) {
        return new (t || _SnowTempComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService));
      };

      _SnowTempComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _SnowTempComponent,
        selectors: [["app-snow-temp"]],
        inputs: {
          reg: "reg"
        },
        decls: 12,
        vars: 6,
        consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]],
        template: function SnowTempComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SnowTempComponent_Template_ion_item_click_0_listener() {
              return ctx.openModal();
            })("keyup.enter", function SnowTempComponent_Template_ion_item_keyup_enter_0_listener() {
              return ctx.openModal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-label", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SnowTempComponent_ion_text_6_Template, 3, 3, "ion-text", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, SnowTempComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, SnowTempComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SnowTempComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.SNOW_TEMP.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXRlbXAuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    87386: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileLayerHistoryModalPageModule": function StratProfileLayerHistoryModalPageModule() {
          return (
            /* binding */
            _StratProfileLayerHistoryModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./strat-profile-layer-history-modal.page */
      58853);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _StratProfileLayerHistoryModalPageModule = function _StratProfileLayerHistoryModalPageModule() {
        _classCallCheck(this, _StratProfileLayerHistoryModalPageModule);
      };

      _StratProfileLayerHistoryModalPageModule.ɵfac = function StratProfileLayerHistoryModalPageModule_Factory(t) {
        return new (t || _StratProfileLayerHistoryModalPageModule)();
      };

      _StratProfileLayerHistoryModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _StratProfileLayerHistoryModalPageModule
      });
      _StratProfileLayerHistoryModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_StratProfileLayerHistoryModalPageModule, {
          declarations: [_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerHistoryModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    58853: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileLayerHistoryModalPage": function StratProfileLayerHistoryModalPage() {
          return (
            /* binding */
            _StratProfileLayerHistoryModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      39349);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @varsom-regobs-common/regobs-api */
      39778);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../../shared/pipes/format-date/format-date.pipe */
      16531);

      function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var item_r8 = restoredCtx.$implicit;

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);

            return ctx_r9.selectLayer(item_r8);
          })("keyup.enter", function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template_ion_item_keyup_enter_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var item_r8 = restoredCtx.$implicit;

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);

            return ctx_r11.selectLayer(item_r8);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "formatDate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r8 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 4, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 6, item_r8.date)), " - (", item_r8.layers.length, " ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 8, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER"), ") ");
        }
      }

      function StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_ion_item_1_Template, 6, 10, "ion-item", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var previousUsedLayers_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", previousUsedLayers_r5);
        }
      }

      function StratProfileLayerHistoryModalPage_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, StratProfileLayerHistoryModalPage_ng_container_11_ng_container_1_Template, 2, 1, "ng-container", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var previousUsedLayers_r5 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", previousUsedLayers_r5.length > 0)("ngIfElse", _r3);
        }
      }

      function StratProfileLayerHistoryModalPage_ng_template_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-skeleton-text", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " - ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-skeleton-text", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](7, "ion-skeleton-text", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, " - ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "ion-skeleton-text", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "ion-skeleton-text", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, " - ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](14, "ion-skeleton-text", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("detail", true);
        }
      }

      function StratProfileLayerHistoryModalPage_ng_template_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-list-header", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.NO_PROFILES_FOUND"), " ");
        }
      }

      var _StratProfileLayerHistoryModalPage = /*#__PURE__*/function () {
        function _StratProfileLayerHistoryModalPage(modalController, registrationService, searchService) {
          _classCallCheck(this, _StratProfileLayerHistoryModalPage);

          this.modalController = modalController;
          this.registrationService = registrationService;
          this.searchService = searchService;
          this.isLoading = true;
        }

        _createClass(_StratProfileLayerHistoryModalPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this7 = this;

            if (this.reg && this.reg.request && this.reg.request.ObsLocation) {
              this.$previousUsedLayers = this.searchService.SearchSearch({
                // ObserverGuid: this.observerGuid, TODO: Call "my obervations" in api instead
                FromDtObsTime: moment__WEBPACK_IMPORTED_MODULE_0___default()().subtract(14, 'days').startOf('day').toISOString(),
                Radius: {
                  Position: {
                    Latitude: this.reg.request.ObsLocation.Latitude,
                    Longitude: this.reg.request.ObsLocation.Longitude
                  },
                  Radius: 100000
                },
                SelectedGeoHazards: [_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow],
                SelectedRegistrationTypes: [{
                  Id: src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2
                }]
              }).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.map)(function (result) {
                return _this7.getLayersFromSearchResult(result);
              }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.tap)(function () {
                _this7.isLoading = false;
              }));
            }
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "selectLayer",
          value: function selectLayer(item) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
              return regeneratorRuntime.wrap(function _callee20$(_context20) {
                while (1) {
                  switch (_context20.prev = _context20.next) {
                    case 0:
                      if (!this.reg.request.SnowProfile2) {
                        this.reg.request.SnowProfile2 = {};
                      }

                      if (!this.reg.request.SnowProfile2.StratProfile) {
                        this.reg.request.SnowProfile2.StratProfile = {};
                      }

                      this.reg.request.SnowProfile2.StratProfile.Layers = item.layers;
                      _context20.next = 5;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 5:
                      this.modalController.dismiss();

                    case 6:
                    case "end":
                      return _context20.stop();
                  }
                }
              }, _callee20, this);
            }));
          }
        }, {
          key: "getLayersFromSearchResult",
          value: function getLayersFromSearchResult(result) {
            return result.map(function (reg) {
              if (reg.SnowProfile2 !== undefined && reg.SnowProfile2.StratProfile !== undefined && reg.SnowProfile2.StratProfile !== null && reg.SnowProfile2.StratProfile.Layers !== undefined && reg.SnowProfile2.StratProfile.Layers !== null && reg.SnowProfile2.StratProfile.Layers.length > 0) {
                return {
                  id: reg.RegId,
                  date: reg.DtObsTime,
                  layers: reg.SnowProfile2.StratProfile.Layers
                };
              }

              return null;
            }).filter(function (x) {
              return x !== null;
            });
          }
        }]);

        return _StratProfileLayerHistoryModalPage;
      }();

      _StratProfileLayerHistoryModalPage.ɵfac = function StratProfileLayerHistoryModalPage_Factory(t) {
        return new (t || _StratProfileLayerHistoryModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_varsom_regobs_common_regobs_api__WEBPACK_IMPORTED_MODULE_11__.SearchService));
      };

      _StratProfileLayerHistoryModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _StratProfileLayerHistoryModalPage,
        selectors: [["app-strat-profile-layer-history-modal"]],
        inputs: {
          reg: "reg"
        },
        decls: 17,
        vars: 10,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full", 1, "ion-no-margin"], [4, "ngIf", "ngIfElse"], ["loading", ""], ["empty", ""], ["tabindex", "0", 3, "detail", "click", "keyup.enter", 4, "ngFor", "ngForOf"], ["tabindex", "0", 3, "detail", "click", "keyup.enter"], [3, "detail"], ["animated", "", 2, "width", "40%"], ["animated", "", 2, "width", "20%"], ["animated", "", 2, "width", "30%"], ["animated", "", 2, "width", "60%"], [1, "ion-text-uppercase"]],
        template: function StratProfileLayerHistoryModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function StratProfileLayerHistoryModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-list", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, StratProfileLayerHistoryModalPage_ng_container_11_Template, 2, 2, "ng-container", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](12, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, StratProfileLayerHistoryModalPage_ng_template_13_Template, 15, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, StratProfileLayerHistoryModalPage_ng_template_15_Template, 4, 3, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 4, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 6, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.FROM_OTHER_PROFILE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](12, 8, ctx.$previousUsedLayers))("ngIfElse", _r1);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSkeletonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_12__.AsyncPipe, _shared_pipes_format_date_format_date_pipe__WEBPACK_IMPORTED_MODULE_4__.FormatDatePipe],
        styles: ["ion-skeleton-text[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxxQkFBQTtBQUNKIiwiZmlsZSI6InN0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tc2tlbGV0b24tdGV4dCB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn0iXX0= */"]
      });
      /***/
    },

    /***/
    59070: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileLayerModalPageModule": function StratProfileLayerModalPageModule() {
          return (
            /* binding */
            _StratProfileLayerModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./strat-profile-layer-modal.page */
      46218);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _StratProfileLayerModalPageModule = function _StratProfileLayerModalPageModule() {
        _classCallCheck(this, _StratProfileLayerModalPageModule);
      };

      _StratProfileLayerModalPageModule.ɵfac = function StratProfileLayerModalPageModule_Factory(t) {
        return new (t || _StratProfileLayerModalPageModule)();
      };

      _StratProfileLayerModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _StratProfileLayerModalPageModule
      });
      _StratProfileLayerModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_StratProfileLayerModalPageModule, {
          declarations: [_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    46218: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileLayerModalPage": function StratProfileLayerModalPage() {
          return (
            /* binding */
            _StratProfileLayerModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../text-comment/text-comment.component */
      32032);

      function StratProfileLayerModalPage_ng_container_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SHOW_LESS"), " ");
        }
      }

      function StratProfileLayerModalPage_ng_container_28_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SHOW_MORE"), " ");
        }
      }

      function StratProfileLayerModalPage_ion_list_29_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-list", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r4.layer.HardnessBottomTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r6.layer.GrainFormSecondaryTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-label", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "app-select", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("selectedValueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_select_selectedValueChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r7.layer.GrainSizeAvgMax = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "app-kdv-select", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_kdv_select_valueChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r8.layer.CriticalLayerTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "app-text-comment", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_ion_list_29_Template_app_text_comment_valueChange_9_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r9.layer.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.HardnessBottomTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.GrainFormSecondaryTID)("getIconFunc", ctx_r2.getIconFunc);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 8, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MAX_GRAIN_SIZE"), "");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("selectedValue", ctx_r2.layer.GrainSizeAvgMax)("options", ctx_r2.grainSizeOptions);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.CriticalLayerTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r2.layer.Comment);
        }
      }

      function StratProfileLayerModalPage_ion_row_53_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-col", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-button", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_ion_row_53_Template_ion_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r10["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-icon", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 1, "DIALOGS.DELETE"), " ");
        }
      }

      var basicHardnessValues = [2, 6, 10, 14, 18, 21];
      var basicGrainFormValues = [1, 14, 17, 22, 26, 32, 36, 40, 41];
      var basicWetnessValues = [1, 3, 5, 7, 9];

      var _StratProfileLayerModalPage = /*#__PURE__*/function () {
        function _StratProfileLayerModalPage(modalController, translateService, registrationService) {
          _classCallCheck(this, _StratProfileLayerModalPage);

          this.modalController = modalController;
          this.translateService = translateService;
          this.registrationService = registrationService;
          this.showMore = false;
          this.grainSizeOptions = [{
            id: 0.001,
            text: '.1'
          }, {
            id: 0.003,
            text: '.3'
          }, {
            id: 0.005,
            text: '.5'
          }, {
            id: 0.007,
            text: '.7'
          }, {
            id: 0.01,
            text: '1'
          }, {
            id: 0.015,
            text: '1.5'
          }, {
            id: 0.02,
            text: '2'
          }, {
            id: 0.025,
            text: '2.5'
          }, {
            id: 0.03,
            text: '3'
          }, {
            id: 0.035,
            text: '3.5'
          }, {
            id: 0.04,
            text: '4'
          }, {
            id: 0.045,
            text: '4.5'
          }, {
            id: 0.05,
            text: '5'
          }, {
            id: 0.055,
            text: '5.5'
          }, {
            id: 0.06,
            text: '6'
          }, {
            id: 0.08,
            text: '8'
          }, {
            id: 0.1,
            text: '10'
          }];

          this.getIconFunc = function (kdvElement) {
            return "md-grainform-".concat(((kdvElement || {}).Name || '').toLowerCase());
          };
        }

        _createClass(_StratProfileLayerModalPage, [{
          key: "hasLayers",
          get: function get() {
            return this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile && this.reg.request.SnowProfile2.StratProfile.Layers && this.reg.request.SnowProfile2.StratProfile.Layers.length > 0;
          }
        }, {
          key: "layerLenght",
          get: function get() {
            return this.hasLayers ? this.reg.request.SnowProfile2.StratProfile.Layers.length : 0;
          }
        }, {
          key: "canGoNext",
          get: function get() {
            return this.hasLayers && this.index < this.layerLenght || this.index === this.layerLenght && this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.layer);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this8 = this;

            this.initialRegistationState = clone_deep__WEBPACK_IMPORTED_MODULE_2___default()(this.reg);
            this.initLayer();
            this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE').subscribe(function (val) {
              _this8.grainSizeInterfaceOptions = {
                header: val
              };
            });
          }
        }, {
          key: "initLayer",
          value: function initLayer() {
            this.addNew = this.layer === undefined;

            if (this.addNew) {
              this.layer = {};
            }

            this.showMore = this.hasAnyAdvancedOptions();
            this.updateFilters();
          }
        }, {
          key: "hasAnyAdvancedOptions",
          value: function hasAnyAdvancedOptions() {
            return this.layer.HardnessBottomTID > 0 || this.layer.GrainSizeAvgMax > 0 || this.layer.GrainFormSecondaryTID > 0 || this.layer.CriticalLayerTID > 0 || !!this.layer.Comment;
          }
        }, {
          key: "save",
          value: function save() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
              return regeneratorRuntime.wrap(function _callee21$(_context21) {
                while (1) {
                  switch (_context21.prev = _context21.next) {
                    case 0:
                      _context21.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 2:
                    case "end":
                      return _context21.stop();
                  }
                }
              }, _callee21, this);
            }));
          }
        }, {
          key: "ok",
          value: function ok(gotoIndex) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
              return regeneratorRuntime.wrap(function _callee22$(_context22) {
                while (1) {
                  switch (_context22.prev = _context22.next) {
                    case 0:
                      if (!this.reg.request.SnowProfile2) {
                        this.reg.request.SnowProfile2 = {};
                      }

                      if (!this.reg.request.SnowProfile2.StratProfile) {
                        this.reg.request.SnowProfile2.StratProfile = {};
                      }

                      if (!this.reg.request.SnowProfile2.StratProfile.Layers) {
                        this.reg.request.SnowProfile2.StratProfile.Layers = [];
                      }

                      if (this.addNew && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.layer)) {
                        this.reg.request.SnowProfile2.StratProfile.Layers.splice(this.index, 0, this.layer);
                      }

                      _context22.next = 6;
                      return this.save();

                    case 6:
                      if (gotoIndex !== undefined) {
                        this.index = this.index + gotoIndex;
                        this.layer = this.reg.request.SnowProfile2.StratProfile.Layers[this.index];
                        this.initLayer();
                      } else {
                        this.modalController.dismiss();
                      }

                    case 7:
                    case "end":
                      return _context22.stop();
                  }
                }
              }, _callee22, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
              return regeneratorRuntime.wrap(function _callee23$(_context23) {
                while (1) {
                  switch (_context23.prev = _context23.next) {
                    case 0:
                      _context23.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.initialRegistationState);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context23.stop();
                  }
                }
              }, _callee23, this);
            }));
          }
        }, {
          key: "delete",
          value: function _delete() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
              var _this9 = this;

              return regeneratorRuntime.wrap(function _callee24$(_context24) {
                while (1) {
                  switch (_context24.prev = _context24.next) {
                    case 0:
                      if (!(this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile && this.reg.request.SnowProfile2.StratProfile.Layers && this.reg.request.SnowProfile2.StratProfile.Layers.length > 0)) {
                        _context24.next = 4;
                        break;
                      }

                      this.reg.request.SnowProfile2.StratProfile.Layers = this.reg.request.SnowProfile2.StratProfile.Layers.filter(function (l) {
                        return l !== _this9.layer;
                      });
                      _context24.next = 4;
                      return this.save();

                    case 4:
                      this.modalController.dismiss();

                    case 5:
                    case "end":
                      return _context24.stop();
                  }
                }
              }, _callee24, this);
            }));
          }
        }, {
          key: "toggleShowMore",
          value: function toggleShowMore() {
            this.showMore = !this.showMore;
            this.updateFilters();
          }
        }, {
          key: "updateFilters",
          value: function updateFilters() {
            this.setHardnessFilter();
            this.setGrainFormFilter();
            this.setWetnessFilter();
          }
        }, {
          key: "setHardnessFilter",
          value: function setHardnessFilter() {
            this.hardnessFilter = this.showMore ? undefined : function (n) {
              return basicHardnessValues.indexOf(n) >= 0;
            };
          }
        }, {
          key: "setGrainFormFilter",
          value: function setGrainFormFilter() {
            this.grainFormFilter = this.showMore ? undefined : function (n) {
              return basicGrainFormValues.indexOf(n) >= 0;
            };
          }
        }, {
          key: "setWetnessFilter",
          value: function setWetnessFilter() {
            this.wetnessFilter = this.showMore ? undefined : function (n) {
              return basicWetnessValues.indexOf(n) >= 0;
            };
          }
        }]);

        return _StratProfileLayerModalPage;
      }();

      _StratProfileLayerModalPage.ɵfac = function StratProfileLayerModalPage_Factory(t) {
        return new (t || _StratProfileLayerModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService));
      };

      _StratProfileLayerModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _StratProfileLayerModalPage,
        selectors: [["app-strat-profile-layer-modal"]],
        inputs: {
          layer: "layer",
          reg: "reg",
          index: "index"
        },
        decls: 54,
        vars: 51,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full", 1, "ion-no-margin"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.THICKNESS", "suffix", "cm", 3, "value", "min", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.HARDNESS", "kdvKey", "Snow_HardnessKDV", 3, "value", "filter", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.GRAIN_FORM", "kdvKey", "Snow_GrainFormKDV", 3, "value", "filter", "getIconFunc", "valueChange"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.WETNESS", "kdvKey", "Snow_WetnessKDV", 3, "value", "filter", "valueChange"], ["fill", "clear", "expand", "full", 3, "click"], ["slot", "start", 3, "name"], [4, "ngIf"], ["lines", "full", 4, "ngIf"], [1, "ion-no-padding"], ["size", "6"], ["expand", "block", "fill", "outline", "color", "primary", 3, "disabled", "click"], ["slot", "start", "name", "arrow-back"], ["slot", "end", "name", "arrow-forward"], ["size", "12"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["lines", "full"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.HARDNESS_BOTTOM", "kdvKey", "Snow_HardnessKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.GRAIN_FROM_SECONDARY", "kdvKey", "Snow_GrainFormKDV", 3, "value", "getIconFunc", "valueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MAX_GRAIN_SIZE", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.CRITICAL_LAYER", "kdvKey", "Snow_CriticalLayerKDV", 3, "value", "valueChange"], ["title", "DIALOGS.COMMENT", 3, "value", "valueChange"], ["size", "6", "offset", "3"], ["size", "small", "fill", "clear", "expand", "block", 3, "click"], ["slot", "start", "name", "trash"]],
        template: function StratProfileLayerModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngSubmit", function StratProfileLayerModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "app-numeric-input", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_numeric_input_valueChange_16_listener($event) {
              return ctx.layer.Thickness = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "app-kdv-select", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_17_listener($event) {
              return ctx.layer.HardnessTID = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "app-kdv-select", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_18_listener($event) {
              return ctx.layer.GrainFormPrimaryTID = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-label", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "app-select", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("selectedValueChange", function StratProfileLayerModalPage_Template_app_select_selectedValueChange_23_listener($event) {
              return ctx.layer.GrainSizeAvg = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-kdv-select", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function StratProfileLayerModalPage_Template_app_kdv_select_valueChange_24_listener($event) {
              return ctx.layer.WetnessTID = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "ion-button", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_25_listener() {
              return ctx.toggleShowMore();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "ion-icon", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](27, StratProfileLayerModalPage_ng_container_27_Template, 3, 3, "ng-container", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, StratProfileLayerModalPage_ng_container_28_Template, 3, 3, "ng-container", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, StratProfileLayerModalPage_ion_list_29_Template, 10, 10, "ion-list", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](30, "ion-grid", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "ion-col", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "ion-button", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_33_listener() {
              return ctx.ok(-1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](34, "ion-icon", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](37, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](38, "lowercase");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](39, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](40, "ion-col", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](41, "ion-button", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function StratProfileLayerModalPage_Template_ion_button_click_41_listener() {
              return ctx.ok(1);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](42, "ion-icon", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](43, "ion-text");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](44);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](45, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](46, "lowercase");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](47, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](48, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](49, "ion-col", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](50, "ion-button", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](51);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](52, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](53, StratProfileLayerModalPage_ion_row_53_Template, 6, 3, "ion-row", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 29, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 31, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 33, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.Thickness)("min", 0)("decimalPlaces", 2)("convertRatio", 100);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.HardnessTID)("filter", ctx.hardnessFilter);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.GrainFormPrimaryTID)("filter", ctx.grainFormFilter)("getIconFunc", ctx.getIconFunc);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 35, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.SIZE"), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("selectedValue", ctx.layer.GrainSizeAvg)("options", ctx.grainSizeOptions);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx.layer.WetnessTID)("filter", ctx.wetnessFilter);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx.showMore ? "chevron-up" : "chevron-down");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showMore);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.showMore);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showMore);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.index === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](37, 37, "DIALOGS.PREVIOUS"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](38, 39, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](39, 41, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER")), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.canGoNext);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](45, 43, "DIALOGS.NEXT"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](46, 45, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](47, 47, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.LAYER")), "");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](52, 49, "DIALOGS.OK_BACK"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.addNew);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_4__.NumericInputComponent, _kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_6__.SelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonText, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_7__.TextCommentComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.LowerCasePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    99704: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileModalPageModule": function StratProfileModalPageModule() {
          return (
            /* binding */
            _StratProfileModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./strat-profile-modal.page */
      44247);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../shared-components.module */
      22623);
      /* harmony import */


      var _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../strat-profile-layer-modal/strat-profile-layer-modal.module */
      59070);
      /* harmony import */


      var _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../strat-profile-layer-history-modal/strat-profile-layer-history-modal.module */
      87386);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _StratProfileModalPageModule = function _StratProfileModalPageModule() {
        _classCallCheck(this, _StratProfileModalPageModule);
      };

      _StratProfileModalPageModule.ɵfac = function StratProfileModalPageModule_Factory(t) {
        return new (t || _StratProfileModalPageModule)();
      };

      _StratProfileModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _StratProfileModalPageModule
      });
      _StratProfileModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerModalPageModule, _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__.StratProfileLayerHistoryModalPageModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_StratProfileModalPageModule, {
          declarations: [_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _strat_profile_layer_modal_strat_profile_layer_modal_module__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerModalPageModule, _strat_profile_layer_history_modal_strat_profile_layer_history_modal_module__WEBPACK_IMPORTED_MODULE_3__.StratProfileLayerHistoryModalPageModule]
        });
      })();
      /***/

    },

    /***/
    44247: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileModalPage": function StratProfileModalPage() {
          return (
            /* binding */
            _StratProfileModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _strat_profile_layer_modal_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../strat-profile-layer-modal/strat-profile-layer-modal.page */
      46218);
      /* harmony import */


      var _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../../../core/helpers/array-helper */
      99020);
      /* harmony import */


      var _strat_profile_layer_history_modal_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../strat-profile-layer-history-modal/strat-profile-layer-history-modal.page */
      58853);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../services/registration.service */
      33181);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! clone-deep */
      24078);
      /* harmony import */


      var clone_deep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(clone_deep__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../../../auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../../../pipes/meters-to-cm.pipe */
      50795);
      /* harmony import */


      var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../../../pipes/kdv-description.pipe */
      46862);

      function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, layer_r5.Thickness), "cm ");
        }
      }

      function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.HardnessTID, "Snow_HardnessKDV")), " ");
        }
      }

      function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.GrainFormPrimaryTID, "Snow_GrainFormKDV")), " ");
        }
      }

      function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](2, 1, layer_r5.GrainSizeAvg * 100, "1.0-2"), "mm ");
        }
      }

      function StratProfileModalPage_ng_container_29_ion_item_7_ng_container_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](3, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](3, 3, layer_r5.WetnessTID, "Snow_WetnessKDV")), " ");
        }
      }

      function StratProfileModalPage_ng_container_29_ion_item_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_ion_item_7_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);

            var i_r6 = restoredCtx.index;
            var layer_r5 = restoredCtx.$implicit;

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);

            return ctx_r17.addOrEditLayer(i_r6, layer_r5);
          })("keyup.enter", function StratProfileModalPage_ng_container_29_ion_item_7_Template_ion_item_keyup_enter_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);

            var i_r6 = restoredCtx.index;
            var layer_r5 = restoredCtx.$implicit;

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);

            return ctx_r19.addOrEditLayer(i_r6, layer_r5);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_2_Template, 3, 3, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](3, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_3_Template, 4, 6, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_4_Template, 4, 6, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_5_Template, 3, 4, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, StratProfileModalPage_ng_container_29_ion_item_7_ng_container_6_Template, 4, 6, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "ion-reorder", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r5 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("color", layer_r5.CriticalLayerTID > 0 ? "danger" : "dark");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.Thickness !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.HardnessTID !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.GrainFormPrimaryTID !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.GrainSizeAvg !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", layer_r5.WetnessTID !== undefined);
        }
      }

      function StratProfileModalPage_ng_container_29_Template(rf, ctx) {
        if (rf & 1) {
          var _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_Template_ion_item_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r20.addLayerTop();
          })("keyup.enter", function StratProfileModalPage_ng_container_29_Template_ion_item_keyup_enter_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);

            var ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r22.addLayerTop();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "ion-icon", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-reorder-group", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ionItemReorder", function StratProfileModalPage_ng_container_29_Template_ion_reorder_group_ionItemReorder_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r23.onLayerReorder($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, StratProfileModalPage_ng_container_29_ion_item_7_Template, 8, 6, "ion-item", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_container_29_Template_ion_item_click_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);

            var ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r24.addLayerBottom();
          })("keyup.enter", function StratProfileModalPage_ng_container_29_Template_ion_item_keyup_enter_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r21);

            var ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r25.addLayerBottom();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "ion-icon", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 3, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_TOP"));

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.profile.Layers);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](12, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER_BOTTOM"));
        }
      }

      function StratProfileModalPage_ng_container_30_p_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](2, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](2, 1, ctx_r26.totalThickness), " cm");
        }
      }

      function StratProfileModalPage_ng_container_30_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-label", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "ion-text", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, StratProfileModalPage_ng_container_30_p_10_Template, 3, 3, "p", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 3, "REGISTRATION.SUMMARY"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TOTAL_THICKNESS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r1.totalThickness !== undefined);
        }
      }

      function StratProfileModalPage_ng_template_37_Template(rf, ctx) {
        if (rf & 1) {
          var _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_ng_template_37_Template_ion_item_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r28);

            var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r27.addLayerBottom();
          })("keyup.enter", function StratProfileModalPage_ng_template_37_Template_ion_item_keyup_enter_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r28);

            var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

            return ctx_r29.addLayerBottom();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ADD_LAYER"));
        }
      }

      var _StratProfileModalPage = /*#__PURE__*/function () {
        function _StratProfileModalPage(modalController, regobsAuthService, ngZone, registrationService, commonRegistrationService) {
          _classCallCheck(this, _StratProfileModalPage);

          this.modalController = modalController;
          this.regobsAuthService = regobsAuthService;
          this.ngZone = ngZone;
          this.registrationService = registrationService;
          this.commonRegistrationService = commonRegistrationService;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject();
        }

        _createClass(_StratProfileModalPage, [{
          key: "hasLayers",
          get: function get() {
            return this.profile.Layers && this.profile.Layers.length > 0;
          }
        }, {
          key: "profile",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile) {
              return this.reg.request.SnowProfile2.StratProfile;
            }

            return {};
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this10 = this;

            this.commonRegistrationService.getRegistrationByIdShared$(this.regId).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$)).subscribe(function (reg) {
              _this10.ngZone.run(function () {
                if (!_this10.regInitClone) {
                  _this10.regInitClone = clone_deep__WEBPACK_IMPORTED_MODULE_5___default()(reg);
                }

                _this10.reg = reg;

                _this10.calculate();
              });
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "ok",
          value: function ok() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee25() {
              return regeneratorRuntime.wrap(function _callee25$(_context25) {
                while (1) {
                  switch (_context25.prev = _context25.next) {
                    case 0:
                      _context25.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 2:
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context25.stop();
                  }
                }
              }, _callee25, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
              return regeneratorRuntime.wrap(function _callee26$(_context26) {
                while (1) {
                  switch (_context26.prev = _context26.next) {
                    case 0:
                      _context26.next = 2;
                      return this.registrationService.saveRegistrationAsync(this.regInitClone);

                    case 2:
                      // Reset to inital state
                      this.modalController.dismiss();

                    case 3:
                    case "end":
                      return _context26.stop();
                  }
                }
              }, _callee26, this);
            }));
          }
        }, {
          key: "addLayerTop",
          value: function addLayerTop() {
            this.addOrEditLayer(0, undefined);
          }
        }, {
          key: "addLayerBottom",
          value: function addLayerBottom() {
            this.addOrEditLayer(this.hasLayers ? this.reg.request.SnowProfile2.StratProfile.Layers.length : 0, undefined);
          }
        }, {
          key: "onLayerReorder",
          value: function onLayerReorder(event) {
            this.reg.request.SnowProfile2.StratProfile.Layers = _core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_1__.ArrayHelper.reorderList(this.reg.request.SnowProfile2.StratProfile.Layers, event.detail.from, event.detail.to);
            event.detail.complete();
            this.registrationService.saveRegistrationAsync(this.reg);
          }
        }, {
          key: "getPrevousUsedLayers",
          value: function getPrevousUsedLayers() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee27() {
              var loggedInUser;
              return regeneratorRuntime.wrap(function _callee27$(_context27) {
                while (1) {
                  switch (_context27.prev = _context27.next) {
                    case 0:
                      _context27.next = 2;
                      return this.regobsAuthService.getLoggedInUserAsPromise();

                    case 2:
                      loggedInUser = _context27.sent;

                      if (!(loggedInUser && loggedInUser.isLoggedIn)) {
                        _context27.next = 15;
                        break;
                      }

                      if (this.layerModal) {
                        _context27.next = 13;
                        break;
                      }

                      _context27.next = 7;
                      return this.modalController.create({
                        component: _strat_profile_layer_history_modal_strat_profile_layer_history_modal_page__WEBPACK_IMPORTED_MODULE_2__.StratProfileLayerHistoryModalPage,
                        componentProps: {
                          reg: this.reg
                        }
                      });

                    case 7:
                      this.layerModal = _context27.sent;
                      this.layerModal.present();
                      _context27.next = 11;
                      return this.layerModal.onDidDismiss();

                    case 11:
                      this.layerModal = null;
                      this.calculate();

                    case 13:
                      _context27.next = 16;
                      break;

                    case 15:
                      this.regobsAuthService.signIn();

                    case 16:
                    case "end":
                      return _context27.stop();
                  }
                }
              }, _callee27, this);
            }));
          }
        }, {
          key: "addOrEditLayer",
          value: function addOrEditLayer(index, layer) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee28() {
              return regeneratorRuntime.wrap(function _callee28$(_context28) {
                while (1) {
                  switch (_context28.prev = _context28.next) {
                    case 0:
                      if (this.layerModal) {
                        _context28.next = 8;
                        break;
                      }

                      _context28.next = 3;
                      return this.modalController.create({
                        component: _strat_profile_layer_modal_strat_profile_layer_modal_page__WEBPACK_IMPORTED_MODULE_0__.StratProfileLayerModalPage,
                        componentProps: {
                          reg: this.reg,
                          layer: layer,
                          index: index
                        }
                      });

                    case 3:
                      this.layerModal = _context28.sent;
                      this.layerModal.present();
                      _context28.next = 7;
                      return this.layerModal.onDidDismiss();

                    case 7:
                      this.layerModal = null;

                    case 8:
                    case "end":
                      return _context28.stop();
                  }
                }
              }, _callee28, this);
            }));
          }
        }, {
          key: "calculate",
          value: function calculate() {
            var layers = this.profile.Layers || [];
            var sum = layers.filter(function (x) {
              return x.Thickness !== undefined;
            }).map(function (layer) {
              return layer.Thickness;
            }).reduce(function (pv, cv) {
              return pv + cv;
            }, 0);
            this.totalThickness = sum;
          }
        }]);

        return _StratProfileModalPage;
      }();

      _StratProfileModalPage.ɵfac = function StratProfileModalPage_Factory(t) {
        return new (t || _StratProfileModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.RegistrationService));
      };

      _StratProfileModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
        type: _StratProfileModalPage,
        selectors: [["app-strat-profile-modal"]],
        inputs: {
          regId: "regId"
        },
        decls: 39,
        vars: 24,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [3, "ngSubmit"], ["lines", "full"], [1, "ion-text-uppercase"], ["tabindex", "0", 3, "click", "keyup.enter"], ["color", "dark", "name", "cloud-download", "slot", "start"], [1, "ion-text-wrap"], [4, "ngIf", "ngIfElse"], [4, "ngIf"], [1, "ion-no-padding"], ["size", "6", "offset", "3"], ["type", "submit", "expand", "block", "fill", "solid", "color", "primary"], ["noLayers", ""], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["disabled", "false", 3, "ionItemReorder"], ["tabindex", "0", 3, "click", "keyup.enter", 4, "ngFor", "ngForOf"], [3, "color"], ["slot", "end"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap", "ion-margin-bottom"], ["class", "ion-no-margin", 4, "ngIf"], [1, "ion-no-margin"]],
        template: function StratProfileModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "form", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngSubmit", function StratProfileModalPage_Template_form_ngSubmit_10_listener() {
              return ctx.ok();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](11, "ion-list", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "ion-item", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function StratProfileModalPage_Template_ion_item_click_16_listener() {
              return ctx.getPrevousUsedLayers();
            })("keyup.enter", function StratProfileModalPage_Template_ion_item_keyup_enter_16_listener() {
              return ctx.getPrevousUsedLayers();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](17, "ion-icon", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](19);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](20, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "ion-item-divider");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "ion-label", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](23);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](24, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](25, "ion-list-header", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](27);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](28, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](29, StratProfileModalPage_ng_container_29_Template, 13, 7, "ng-container", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](30, StratProfileModalPage_ng_container_30_Template, 11, 7, "ng-container", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "ion-grid", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](32, "ion-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "ion-col", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "ion-button", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](35);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](36, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](37, StratProfileModalPage_ng_template_37_Template, 5, 3, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](38);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 10, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](8, 12, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](15, 14, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.FROM_OTHER_PROFILE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](20, 16, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.OTHER_PROFILE_ITEM_TEXT"));

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](24, 18, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.OTHER_PROFILE_DESCRIPTION"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](28, 20, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasLayers)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasLayers);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](36, 22, "DIALOGS.OK"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonContent, _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgForm, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonItemDivider, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_16__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonReorder, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonText],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslatePipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_8__.MetersToCmPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_9__.KdvDescriptionPipe, _angular_common__WEBPACK_IMPORTED_MODULE_16__.DecimalPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    78636: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "StratProfileComponent": function StratProfileComponent() {
          return (
            /* binding */
            _StratProfileComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _strat_profile_modal_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./strat-profile-modal/strat-profile-modal.page */
      44247);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../services/registration.service */
      33181);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function StratProfileComponent_ion_text_6_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.ONE_LAYER"), " ");
        }
      }

      function StratProfileComponent_ion_text_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-text");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, StratProfileComponent_ion_text_6_ng_container_2_Template, 3, 3, "ng-container", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", ctx_r0.profile.Layers ? ctx_r0.profile.Layers.length : 0, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r0.profile.Layers.length === 1)("ngIfElse", _r4);
        }
      }

      function StratProfileComponent_ion_icon_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "ion-icon", 6);
        }
      }

      function StratProfileComponent_ng_template_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.EMPTY"), "\n");
        }
      }

      function StratProfileComponent_ng_template_10_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 1, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.MULTIPLE_LAYERS"), "\n");
        }
      }

      var _StratProfileComponent = /*#__PURE__*/function () {
        function _StratProfileComponent(modalContoller, registrationService) {
          _classCallCheck(this, _StratProfileComponent);

          this.modalContoller = modalContoller;
          this.registrationService = registrationService;
        }

        _createClass(_StratProfileComponent, [{
          key: "profile",
          get: function get() {
            if (this.reg && this.reg.request && this.reg.request.SnowProfile2 && this.reg.request.SnowProfile2.StratProfile) {
              return this.reg.request.SnowProfile2.StratProfile;
            }

            return {};
          }
        }, {
          key: "isEmpty",
          get: function get() {
            return _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.profile);
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "openModal",
          value: function openModal() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee29() {
              return regeneratorRuntime.wrap(function _callee29$(_context29) {
                while (1) {
                  switch (_context29.prev = _context29.next) {
                    case 0:
                      if (this.modal) {
                        _context29.next = 10;
                        break;
                      }

                      _context29.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.reg);

                    case 3:
                      _context29.next = 5;
                      return this.modalContoller.create({
                        component: _strat_profile_modal_strat_profile_modal_page__WEBPACK_IMPORTED_MODULE_1__.StratProfileModalPage,
                        componentProps: {
                          regId: this.reg.id
                        }
                      });

                    case 5:
                      this.modal = _context29.sent;
                      this.modal.present();
                      _context29.next = 9;
                      return this.modal.onDidDismiss();

                    case 9:
                      this.modal = null;

                    case 10:
                    case "end":
                      return _context29.stop();
                  }
                }
              }, _callee29, this);
            }));
          }
        }]);

        return _StratProfileComponent;
      }();

      _StratProfileComponent.ɵfac = function StratProfileComponent_Factory(t) {
        return new (t || _StratProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_2__.RegistrationService));
      };

      _StratProfileComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _StratProfileComponent,
        selectors: [["app-strat-profile"]],
        inputs: {
          reg: "reg"
        },
        decls: 12,
        vars: 6,
        consts: [["tabindex", "0", 1, "summary-item", 3, "click", "keyup.enter"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf", "ngIfElse"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], ["empty", ""], ["multiple", ""], ["slot", "end", "color", "success", "name", "checkmark-circle"]],
        template: function StratProfileComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-item", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function StratProfileComponent_Template_ion_item_click_0_listener() {
              return ctx.openModal();
            })("keyup.enter", function StratProfileComponent_Template_ion_item_keyup_enter_0_listener() {
              return ctx.openModal();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-label", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, StratProfileComponent_ion_text_6_Template, 3, 3, "ion-text", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, StratProfileComponent_ion_icon_7_Template, 1, 0, "ion-icon", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, StratProfileComponent_ng_template_8_Template, 2, 3, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, StratProfileComponent_ng_template_10_Template, 2, 3, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.SNOW_PROFILE.STRAT_PROFILE.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isEmpty)("ngIfElse", _r2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.isEmpty);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdHJhdC1wcm9maWxlLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    16547: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowProfilePageModule": function SnowProfilePageModule() {
          return (
            /* binding */
            _SnowProfilePageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _snow_profile_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./snow-profile.page */
      97445);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/compression-test/compression-test.component */
      91974);
      /* harmony import */


      var _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-density/snow-density.component */
      9253);
      /* harmony import */


      var _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-temp/snow-temp.component */
      55568);
      /* harmony import */


      var _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/strat-profile/strat-profile.component */
      78636);
      /* harmony import */


      var _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/strat-profile/strat-profile-modal/strat-profile-modal.module */
      99704);
      /* harmony import */


      var _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */
      85815);
      /* harmony import */


      var _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-temp/snow-temp-modal/snow-temp-modal.module */
      35692);
      /* harmony import */


      var _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-density/snow-density-modal/snow-density-modal.module */
      17952);
      /* harmony import */


      var _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/compression-test/compression-test-list-modal/compression-test-list-modal.module */
      13617);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/core */
      2316); // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length


      var routes = [{
        path: '',
        component: _snow_profile_page__WEBPACK_IMPORTED_MODULE_0__.SnowProfilePage
      }];

      var _SnowProfilePageModule = function _SnowProfilePageModule() {
        _classCallCheck(this, _SnowProfilePageModule);
      };

      _SnowProfilePageModule.ɵfac = function SnowProfilePageModule_Factory(t) {
        return new (t || _SnowProfilePageModule)();
      };

      _SnowProfilePageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
        type: _SnowProfilePageModule
      });
      _SnowProfilePageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__.StratProfileModalPageModule, _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__.SnowTempModalPageModule, _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__.SnowDensityModalPageModule, _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__.CompressionTestListModalPageModule, _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](_SnowProfilePageModule, {
          declarations: [_snow_profile_page__WEBPACK_IMPORTED_MODULE_0__.SnowProfilePage, _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_2__.CompressionTestComponent, _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_3__.SnowDensityComponent, _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_4__.SnowTempComponent, _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_5__.StratProfileComponent],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _components_snow_snow_profile_strat_profile_strat_profile_modal_strat_profile_modal_module__WEBPACK_IMPORTED_MODULE_6__.StratProfileModalPageModule, _components_snow_snow_profile_snow_temp_snow_temp_modal_snow_temp_modal_module__WEBPACK_IMPORTED_MODULE_8__.SnowTempModalPageModule, _components_snow_snow_profile_snow_density_snow_density_modal_snow_density_modal_module__WEBPACK_IMPORTED_MODULE_9__.SnowDensityModalPageModule, _components_snow_snow_profile_compression_test_compression_test_list_modal_compression_test_list_modal_module__WEBPACK_IMPORTED_MODULE_10__.CompressionTestListModalPageModule, _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_7__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_12__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    97445: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SnowProfilePage": function SnowProfilePage() {
          return (
            /* binding */
            _SnowProfilePage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../pages/modal-pages/fullscreen-image-modal/fullscreen-image-modal.page */
      93675);
      /* harmony import */


      var _core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../core/helpers/data-url.helper */
      78872);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../../../settings */
      30015);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! rxjs/operators */
      34864);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var _shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../components/yes-no-select/yes-no-select.component */
      99736);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/strat-profile/strat-profile.component */
      78636);
      /* harmony import */


      var _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-temp/snow-temp.component */
      55568);
      /* harmony import */


      var _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/snow-density/snow-density.component */
      9253);
      /* harmony import */


      var _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../../../components/snow/snow-profile/compression-test/compression-test.component */
      91974);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);

      function SnowProfilePage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("reset", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();

            return ctx_r1.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "app-yes-no-select", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("valueChange", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();

            return ctx_r3.registration.request.SnowProfile2.IsProfileToGround = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "app-text-comment", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("valueChange", function SnowProfilePage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();

            return ctx_r4.registration.request.SnowProfile2.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](12, "app-strat-profile", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](13, "app-snow-temp", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](14, "app-snow-density", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](15, "app-compression-test", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](16, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](17, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](18);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](19, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](20, "ion-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function SnowProfilePage_app_registration_content_wrapper_8_Template_ion_item_click_20_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r2);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();

            return ctx_r5.openPreview();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](21, "ion-icon", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](22, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](23);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](24, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](25, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](26, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](27);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](28, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](29, "app-add-picture-item", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 18, "REGISTRATION.SNOW.SNOW_PROFILE.SUPERIOR"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowProfile2.IsProfileToGround);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", ctx_r0.registration.request.SnowProfile2.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](11, 20, "REGISTRATION.SNOW.SNOW_PROFILE.SUBFORMS"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("reg", ctx_r0.registration);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](19, 22, "REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx_r0.isEmpty());

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](24, 24, "REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ITEM"));

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](28, 26, "REGISTRATION.IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
        }
      }

      var DEBUG_TAG = 'SnowProfilePage';

      var _SnowProfilePage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_SnowProfilePage, _base_page__WEBPACK_I);

        var _super = _createSuper(_SnowProfilePage);

        function _SnowProfilePage(basePageService, activatedRoute, httpClient, modalController, loadingController, toastController, translateService, userSettingService, loggingService) {
          var _this11;

          _classCallCheck(this, _SnowProfilePage);

          _this11 = _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.SnowProfile2, basePageService, activatedRoute);
          _this11.httpClient = httpClient;
          _this11.modalController = modalController;
          _this11.loadingController = loadingController;
          _this11.toastController = toastController;
          _this11.translateService = translateService;
          _this11.userSettingService = userSettingService;
          _this11.loggingService = loggingService;
          _this11.expositionOptions = [{
            id: 0,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH'
          }, {
            id: 1,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_EAST'
          }, {
            id: 2,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.EAST'
          }, {
            id: 3,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_EAST'
          }, {
            id: 4,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH'
          }, {
            id: 5,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.SOUTH_WEST'
          }, {
            id: 6,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.WEST'
          }, {
            id: 7,
            text: 'REGISTRATION.SNOW.SNOW_PROFILE.NORTH_WEST'
          }];
          return _this11;
        }

        _createClass(_SnowProfilePage, [{
          key: "onInit",
          value: function onInit() {}
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            var isEmptyResult = (0, _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_18__.isEmpty)(this.registration.request.SnowProfile2) && !(this.registration.request.CompressionTest || []).some(function (ct) {
              return ct.IncludeInSnowProfile === true;
            });
            return Promise.resolve(isEmptyResult);
          }
        }, {
          key: "openPreview",
          value: function openPreview() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee31() {
              var _this12 = this;

              return regeneratorRuntime.wrap(function _callee31$(_context31) {
                while (1) {
                  switch (_context31.prev = _context31.next) {
                    case 0:
                      this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.GENERATING_PREVIEW').subscribe(function (message) {
                        return (0, tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(_this12, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee30() {
                          var _this13 = this;

                          var loader, userSetting, format, size, subscription;
                          return regeneratorRuntime.wrap(function _callee30$(_context30) {
                            while (1) {
                              switch (_context30.prev = _context30.next) {
                                case 0:
                                  _context30.next = 2;
                                  return this.loadingController.create({
                                    message: message,
                                    backdropDismiss: true // enable cancel

                                  });

                                case 2:
                                  loader = _context30.sent;
                                  _context30.next = 5;
                                  return loader.present();

                                case 5:
                                  _context30.next = 7;
                                  return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_20__.take)(1)).toPromise();

                                case 7:
                                  userSetting = _context30.sent;
                                  format = 5; // Mobile profile plot

                                  size = 400;
                                  subscription = this.getPlotFromApiWithFallback(userSetting, format, size).subscribe(function (result) {
                                    _this13.openImageModal(result);

                                    _this13.loadingController.dismiss();
                                  }, function (err) {
                                    _this13.loadingController.dismiss();

                                    _this13.showPreviewError();
                                  });
                                  _context30.next = 13;
                                  return loader.onDidDismiss();

                                case 13:
                                  subscription.unsubscribe();

                                case 14:
                                case "end":
                                  return _context30.stop();
                              }
                            }
                          }, _callee30, this);
                        }));
                      });

                    case 1:
                    case "end":
                      return _context31.stop();
                  }
                }
              }, _callee31, this);
            }));
          }
        }, {
          key: "getPlotFromApiWithFallback",
          value: function getPlotFromApiWithFallback(userSetting, format, size) {
            var _this14 = this;

            return this.getPlotFromApi(userSetting, format, size).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_21__.catchError)(function (error) {
              _this14.loggingService.debug('Could not generate plot', DEBUG_TAG);

              if (format === 5) {
                _this14.loggingService.debug('Fallback to BareSimpleProfile', DEBUG_TAG);

                return _this14.getPlotFromApi(userSetting, 4, size); // fallback to BareSimpleProfile when mobile plot failed
              }

              return (0, rxjs__WEBPACK_IMPORTED_MODULE_22__.of)(null);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_23__.switchMap)(function (result) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_24__.from)(_core_helpers_data_url_helper__WEBPACK_IMPORTED_MODULE_4__.DataUrlHelper.toDataUrl(result, 'image/png'));
            }));
          }
        }, {
          key: "getPlotFromApi",
          value: function getPlotFromApi(userSetting, format, size) {
            var rootUrl = _settings__WEBPACK_IMPORTED_MODULE_6__.settings.services.regObs.apiUrl[userSetting.appMode];
            return this.httpClient.post("".concat(rootUrl, "/Registration/PlotPreviewPng?format=").concat(format) + "&height=".concat(size, "&width=").concat(size, "&langKey=").concat(userSetting.language), this.registration.request, {
              responseType: 'blob'
            });
          }
        }, {
          key: "hasAnyTempLayers",
          value: function hasAnyTempLayers() {
            return this.registration.request.SnowProfile2 && this.registration.request.SnowProfile2.SnowTemp && this.registration.request.SnowProfile2.SnowTemp.Layers && this.registration.request.SnowProfile2.SnowTemp.Layers.some(function (x) {
              return x.SnowTemp < 0;
            });
          }
        }, {
          key: "showPreviewError",
          value: function showPreviewError() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee33() {
              var _this15 = this;

              return regeneratorRuntime.wrap(function _callee33$(_context33) {
                while (1) {
                  switch (_context33.prev = _context33.next) {
                    case 0:
                      this.translateService.get('REGISTRATION.SNOW.SNOW_PROFILE.PREVIEW_ERROR').subscribe(function (message) {
                        return (0, tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(_this15, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee32() {
                          var toast;
                          return regeneratorRuntime.wrap(function _callee32$(_context32) {
                            while (1) {
                              switch (_context32.prev = _context32.next) {
                                case 0:
                                  _context32.next = 2;
                                  return this.toastController.create({
                                    message: message,
                                    mode: 'md',
                                    duration: 2000
                                  });

                                case 2:
                                  toast = _context32.sent;
                                  toast.present();

                                case 4:
                                case "end":
                                  return _context32.stop();
                              }
                            }
                          }, _callee32, this);
                        }));
                      });

                    case 1:
                    case "end":
                      return _context33.stop();
                  }
                }
              }, _callee33, this);
            }));
          }
        }, {
          key: "openImageModal",
          value: function openImageModal(src) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee34() {
              var modal;
              return regeneratorRuntime.wrap(function _callee34$(_context34) {
                while (1) {
                  switch (_context34.prev = _context34.next) {
                    case 0:
                      _context34.next = 2;
                      return this.modalController.create({
                        component: _pages_modal_pages_fullscreen_image_modal_fullscreen_image_modal_page__WEBPACK_IMPORTED_MODULE_3__.FullscreenImageModalPage,
                        componentProps: {
                          imgSrc: src
                        }
                      });

                    case 2:
                      modal = _context34.sent;
                      modal.present();

                    case 4:
                    case "end":
                      return _context34.stop();
                  }
                }
              }, _callee34, this);
            }));
          }
        }]);

        return _SnowProfilePage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_2__.BasePage);

      _SnowProfilePage.ɵfac = function SnowProfilePage_Factory(t) {
        return new (t || _SnowProfilePage)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_0__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_25__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_26__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_7__.LoggingService));
      };

      _SnowProfilePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
        type: _SnowProfilePage,
        selectors: [["app-snow-profile"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.SNOW.SNOW_PROFILE.IS_PROFILE_TO_GROUND", 3, "value", "valueChange"], ["title", "DIALOGS.COMMENT", 3, "value", "valueChange"], [3, "reg"], [3, "disabled", "click"], ["name", "eye", "color", "dark", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"]],
        template: function SnowProfilePage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](8, SnowProfilePage_app_registration_content_wrapper_8_Template, 30, 28, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.SNOW_PROFILE.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.SnowProfile2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_8__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_29__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_9__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonLabel, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_10__.YesNoSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_11__.TextCommentComponent, _components_snow_snow_profile_strat_profile_strat_profile_component__WEBPACK_IMPORTED_MODULE_12__.StratProfileComponent, _components_snow_snow_profile_snow_temp_snow_temp_component__WEBPACK_IMPORTED_MODULE_13__.SnowTempComponent, _components_snow_snow_profile_snow_density_snow_density_component__WEBPACK_IMPORTED_MODULE_14__.SnowDensityComponent, _components_snow_snow_profile_compression_test_compression_test_component__WEBPACK_IMPORTED_MODULE_15__.CompressionTestComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_16__.AddPictureItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_28__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzbm93LXByb2ZpbGUucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

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

    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0M7QUFHOUNDLDRDQUFRLEVBQUU7QUFIb0MsbUNBQTVCLENBQU47O0FBRGM7QUFDdEJDLHVDQURzQjtBQU01QkEsdUNBQUssQ0FBQ3RPLE9BQU47O0FBTjRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDJCQUFuQjtBQUFBLHVCQUZiOzs7Ozs7Ozs7QUFVRDs7O2lCQUVhLHdCQUFldU8sR0FBZixFQUEwQjs7Ozs7Ozs7QUFDeEIsNkJBQU0sS0FBS2xSLGVBQUwsQ0FBcUJzQyxNQUFyQixDQUE0QjtBQUM5Q0MsaUNBQVMsRUFBRTRPLDJIQURtQztBQUU5QzFPLHNDQUFjLEVBQUU7QUFDZDJPLGdDQUFNLEVBQUVGO0FBRE07QUFGOEIsdUJBQTVCLENBQU47OztBQUFSM0Q7QUFNTkEsMkJBQUssQ0FBQzVLLE9BQU47Ozs7Ozs7OztBQUNEOzs7O1FBeElrQzBPOzs7eUJBQXhCM0Msa0JBQWVIO0FBQUE7OztjQUFmRztBQUFlck47QUFBQWlRO0FBQUEvUDtBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEL0I1QjZNOztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBRUFBOztBQUNFQTs7QUFvREZBOzs7O0FBMURNQTs7QUFBQUE7O0FBTStCQTs7QUFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUVEeEJnRDs7Ozs7eUJBQUFBO0FBQThCOzs7Y0FBOUJBOzs7a0JBSkYsQ0FBQ0MseURBQUQsRUFBZUMsdURBQWYsRUFBNEJDLHVEQUE1Qjs7Ozs0SEFJRUgsaUNBQThCO0FBQUE1Uix5QkFIMUJnUyxrRkFHMEI7QUFIRjlSLG9CQUQ3QjJSLHlEQUM2QixFQURmQyx1REFDZSxFQURGQyx1REFDRTtBQUdFO0FBSk87Ozs7IiwibmFtZXMiOlsiSHlkcm9sb2d5SGVscGVyIiwib2JqIiwid2VpZ2h0SW5LZyIsImhlaWdodEluTSIsInRhcmVXZWlnaHRJbktnIiwiY3lsaW5kZXJEaWFtZXRlckluTSIsIl9udW1iZXJfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJyIiwidG90YWxXZWlnaHQiLCJoZWlnaHRJbk1ldGVyIiwidm9sdW1lIiwiTWF0aCIsIlBJIiwiZGVuc2l0eSIsIkNvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfY29tcHJlc3Npb25fdGVzdF9saXN0X2NvbXByZXNzaW9uX3Rlc3RfbW9kYWxfY29tcHJlc3Npb25fdGVzdF9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImRlY2xhcmF0aW9ucyIsIl9jb21wcmVzc2lvbl90ZXN0X2xpc3RfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIkNvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2UiLCJtb2RhbENvbnRyb2xsZXIiLCJyZWdpc3RyYXRpb25TZXJ2aWNlIiwiY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsIm5nWm9uZSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzZfXyIsInZhbCIsInJlZyIsInJlcXVlc3QiLCJDb21wcmVzc2lvblRlc3QiLCJnZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCIsInJlZ0lkIiwicGlwZSIsIm5nRGVzdHJveSQiLCJzdWJzY3JpYmUiLCJydW4iLCJpbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmUiLCJjbG9uZV9kZWVwX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsIm5leHQiLCJjb21wbGV0ZSIsInNhdmVSZWdpc3RyYXRpb25Bc3luYyIsImRpc21pc3MiLCJzZWxlY3RvcnMiLCJpbnB1dHMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSIsImN0eCIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIkNvbXByZXNzaW9uVGVzdENvbXBvbmVudCIsIm1vZGFsQ29udG9sbGVyIiwidGVzdHMiLCJmaWx0ZXIiLCJ0IiwiSW5jbHVkZUluU25vd1Byb2ZpbGUiLCJjb25uZWN0ZWRUZXN0cyIsImxlbmd0aCIsImNvbXByZXNzaW9uVGVzdExpc3RNb2RhbCIsImNyZWF0ZSIsImNvbXBvbmVudCIsIl9jb21wcmVzc2lvbl90ZXN0X2xpc3RfbW9kYWxfY29tcHJlc3Npb25fdGVzdF9saXN0X21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNvbXBvbmVudFByb3BzIiwiaWQiLCJwcmVzZW50Iiwib25EaWREaXNtaXNzIiwiX3IyIiwiU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZU1vZHVsZSIsIl9zbm93X2RlbnNpdHlfbGF5ZXJfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZSIsImluaXRpYWxSZWdpc3RyYXRpb25TdGF0ZSIsImluaXRMYXllciIsImFkZE5ldyIsImxheWVyIiwidW5kZWZpbmVkIiwiY2FsY3VsYXRlIiwiU25vd1Byb2ZpbGUyIiwiU25vd0RlbnNpdHkiLCJMYXllcnMiLCJoYXNMYXllcnMiLCJpbmRleCIsImxheWVyTGVuZ2h0IiwiaXNFbXB0eSIsInNub3dEZW5zaXR5TGF5ZXIiLCJ1c2VDeWxpbmRlciIsIlRoaWNrbmVzcyIsIldlaWdodCIsIkRlbnNpdHkiLCJnb3RvSW5kZXgiLCJzcGxpY2UiLCJsIiwiX2NvcmVfaGVscGVyc19oeWRyb2xvZ3lfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJ0YXJlV2VpZ2h0IiwiZGVwdGgiLCJTbm93RGVuc2l0eU1vZGFsUGFnZU1vZHVsZSIsIl9zbm93X2RlbnNpdHlfbGF5ZXJfbW9kYWxfc25vd19kZW5zaXR5X2xheWVyX21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX3Nub3dfZGVuc2l0eV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJTbm93RGVuc2l0eU1vZGFsUGFnZSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzEwX18iLCJwcm9maWxlIiwiY2xvbmVfZGVlcF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fX2RlZmF1bHQiLCJDeWxpbmRlckRpYW1ldGVyIiwiVGFyZVdlaWdodCIsInNvbWUiLCJyZWNhbGN1bGF0ZUxheWVycyIsImFkZE9yRWRpdExheWVyIiwibGF5ZXJNb2RhbCIsIl9zbm93X2RlbnNpdHlfbGF5ZXJfbW9kYWxfc25vd19kZW5zaXR5X2xheWVyX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImV2ZW50IiwiX2NvcmVfaGVscGVyc19hcnJheV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImRldGFpbCIsImZyb20iLCJ0byIsImZvckVhY2giLCJfY29yZV9oZWxwZXJzX2h5ZHJvbG9neV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9yNCIsIlNub3dEZW5zaXR5Q29tcG9uZW50IiwicHJvZmlsZXMiLCJkZW5zaXR5TW9kYWwiLCJfc25vd19kZW5zaXR5X21vZGFsX3Nub3dfZGVuc2l0eV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJTbm93VGVtcExheWVyTW9kYWxQYWdlTW9kdWxlIiwiX3Nub3dfdGVtcF9sYXllcl9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJTbm93VGVtcExheWVyTW9kYWxQYWdlIiwiY2xvbmVfZGVlcF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fX2RlZmF1bHQiLCJTbm93VGVtcCIsIl9jb3JlX2hlbHBlcnNfaXNfZW1wdHlfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJTbm93VGVtcE1vZGFsUGFnZU1vZHVsZSIsIl9zbm93X3RlbXBfbGF5ZXJfbW9kYWxfc25vd190ZW1wX2xheWVyX21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX3Nub3dfdGVtcF9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJTbm93VGVtcE1vZGFsUGFnZSIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsInRlbXBQcm9maWxlIiwiY2xvbmVfZGVlcF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fX2RlZmF1bHQiLCJzb3J0TGF5ZXJzIiwiX3Nub3dfdGVtcF9sYXllcl9tb2RhbF9zbm93X3RlbXBfbGF5ZXJfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwic29ydCIsImEiLCJiIiwiRGVwdGgiLCJTbm93VGVtcENvbXBvbmVudCIsInNub3dUZW1wTW9kYWwiLCJfc25vd190ZW1wX21vZGFsX3Nub3dfdGVtcF9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJTdHJhdFByb2ZpbGVMYXllckhpc3RvcnlNb2RhbFBhZ2VNb2R1bGUiLCJfc3RyYXRfcHJvZmlsZV9sYXllcl9oaXN0b3J5X21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9yMyIsIlN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSIsInNlYXJjaFNlcnZpY2UiLCJPYnNMb2NhdGlvbiIsIiRwcmV2aW91c1VzZWRMYXllcnMiLCJTZWFyY2hTZWFyY2giLCJGcm9tRHRPYnNUaW1lIiwibW9tZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCIsInN1YnRyYWN0Iiwic3RhcnRPZiIsInRvSVNPU3RyaW5nIiwiUmFkaXVzIiwiUG9zaXRpb24iLCJMYXRpdHVkZSIsIkxvbmdpdHVkZSIsIlNlbGVjdGVkR2VvSGF6YXJkcyIsIl92YXJzb21fcmVnb2JzX2NvbW1vbl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJTZWxlY3RlZFJlZ2lzdHJhdGlvblR5cGVzIiwiSWQiLCJzcmNfYXBwX21vZHVsZXNfY29tbW9uX3JlZ2lzdHJhdGlvbl9yZWdpc3RyYXRpb25fbW9kZWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJyZXN1bHQiLCJnZXRMYXllcnNGcm9tU2VhcmNoUmVzdWx0IiwiaXNMb2FkaW5nIiwiaXRlbSIsIlN0cmF0UHJvZmlsZSIsImxheWVycyIsIm1hcCIsIlJlZ0lkIiwiZGF0ZSIsIkR0T2JzVGltZSIsIngiLCJfcjEiLCJTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZU1vZHVsZSIsIl9zdHJhdF9wcm9maWxlX2xheWVyX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsImN0eF9yMiIsImJhc2ljSGFyZG5lc3NWYWx1ZXMiLCJiYXNpY0dyYWluRm9ybVZhbHVlcyIsImJhc2ljV2V0bmVzc1ZhbHVlcyIsIlN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlIiwidHJhbnNsYXRlU2VydmljZSIsInRleHQiLCJrZHZFbGVtZW50IiwiTmFtZSIsInRvTG93ZXJDYXNlIiwiX2NvcmVfaGVscGVyc19pc19lbXB0eV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImluaXRpYWxSZWdpc3RhdGlvblN0YXRlIiwiZ2V0IiwiZ3JhaW5TaXplSW50ZXJmYWNlT3B0aW9ucyIsImhlYWRlciIsInNob3dNb3JlIiwiaGFzQW55QWR2YW5jZWRPcHRpb25zIiwidXBkYXRlRmlsdGVycyIsIkhhcmRuZXNzQm90dG9tVElEIiwiR3JhaW5TaXplQXZnTWF4IiwiR3JhaW5Gb3JtU2Vjb25kYXJ5VElEIiwiQ3JpdGljYWxMYXllclRJRCIsIkNvbW1lbnQiLCJzYXZlIiwic2V0SGFyZG5lc3NGaWx0ZXIiLCJzZXRHcmFpbkZvcm1GaWx0ZXIiLCJzZXRXZXRuZXNzRmlsdGVyIiwiaGFyZG5lc3NGaWx0ZXIiLCJuIiwiaW5kZXhPZiIsImdyYWluRm9ybUZpbHRlciIsIndldG5lc3NGaWx0ZXIiLCJTdHJhdFByb2ZpbGVNb2RhbFBhZ2VNb2R1bGUiLCJfc3RyYXRfcHJvZmlsZV9sYXllcl9tb2RhbF9zdHJhdF9wcm9maWxlX2xheWVyX21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX3N0cmF0X3Byb2ZpbGVfbGF5ZXJfaGlzdG9yeV9tb2RhbF9zdHJhdF9wcm9maWxlX2xheWVyX2hpc3RvcnlfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJfc3RyYXRfcHJvZmlsZV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMF9fIiwiU3RyYXRQcm9maWxlTW9kYWxQYWdlIiwicmVnb2JzQXV0aFNlcnZpY2UiLCJyeGpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMV9fIiwicmVnSW5pdENsb25lIiwiY2xvbmVfZGVlcF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fX2RlZmF1bHQiLCJnZXRMb2dnZWRJblVzZXJBc1Byb21pc2UiLCJsb2dnZWRJblVzZXIiLCJpc0xvZ2dlZEluIiwiX3N0cmF0X3Byb2ZpbGVfbGF5ZXJfaGlzdG9yeV9tb2RhbF9zdHJhdF9wcm9maWxlX2xheWVyX2hpc3RvcnlfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwic2lnbkluIiwiX3N0cmF0X3Byb2ZpbGVfbGF5ZXJfbW9kYWxfc3RyYXRfcHJvZmlsZV9sYXllcl9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJzdW0iLCJyZWR1Y2UiLCJwdiIsImN2IiwidG90YWxUaGlja25lc3MiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJTdHJhdFByb2ZpbGVDb21wb25lbnQiLCJtb2RhbCIsIl9zdHJhdF9wcm9maWxlX21vZGFsX3N0cmF0X3Byb2ZpbGVfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwicm91dGVzIiwicGF0aCIsIl9zbm93X3Byb2ZpbGVfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiU25vd1Byb2ZpbGVQYWdlTW9kdWxlIiwiX2NvbXBvbmVudHNfc25vd19zbm93X3Byb2ZpbGVfc3RyYXRfcHJvZmlsZV9zdHJhdF9wcm9maWxlX21vZGFsX3N0cmF0X3Byb2ZpbGVfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJfY29tcG9uZW50c19zbm93X3Nub3dfcHJvZmlsZV9zbm93X3RlbXBfc25vd190ZW1wX21vZGFsX3Nub3dfdGVtcF9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsIl9jb21wb25lbnRzX3Nub3dfc25vd19wcm9maWxlX3Nub3dfZGVuc2l0eV9zbm93X2RlbnNpdHlfbW9kYWxfc25vd19kZW5zaXR5X21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwiX2NvbXBvbmVudHNfc25vd19zbm93X3Byb2ZpbGVfY29tcHJlc3Npb25fdGVzdF9jb21wcmVzc2lvbl90ZXN0X2xpc3RfbW9kYWxfY29tcHJlc3Npb25fdGVzdF9saXN0X21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTBfXyIsIl9wYWdlc19tb2RhbF9wYWdlc19mdWxsc2NyZWVuX2ltYWdlX21vZGFsX2Z1bGxzY3JlZW5faW1hZ2VfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJfYW5ndWxhcl9yb3V0ZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzEyX18iLCJfY29tcG9uZW50c19zbm93X3Nub3dfcHJvZmlsZV9jb21wcmVzc2lvbl90ZXN0X2NvbXByZXNzaW9uX3Rlc3RfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfY29tcG9uZW50c19zbm93X3Nub3dfcHJvZmlsZV9zbm93X2RlbnNpdHlfc25vd19kZW5zaXR5X2NvbXBvbmVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2NvbXBvbmVudHNfc25vd19zbm93X3Byb2ZpbGVfc25vd190ZW1wX3Nub3dfdGVtcF9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIl9jb21wb25lbnRzX3Nub3dfc25vd19wcm9maWxlX3N0cmF0X3Byb2ZpbGVfc3RyYXRfcHJvZmlsZV9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzE3X18iLCJjdHhfcjAiLCJERUJVR19UQUciLCJTbm93UHJvZmlsZVBhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsImh0dHBDbGllbnQiLCJsb2FkaW5nQ29udHJvbGxlciIsInRvYXN0Q29udHJvbGxlciIsInVzZXJTZXR0aW5nU2VydmljZSIsImxvZ2dpbmdTZXJ2aWNlIiwiaXNFbXB0eVJlc3VsdCIsInJlZ2lzdHJhdGlvbiIsImN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJtZXNzYWdlIiwiYmFja2Ryb3BEaXNtaXNzIiwibG9hZGVyIiwidXNlclNldHRpbmckIiwidG9Qcm9taXNlIiwidXNlclNldHRpbmciLCJmb3JtYXQiLCJzaXplIiwic3Vic2NyaXB0aW9uIiwiZ2V0UGxvdEZyb21BcGlXaXRoRmFsbGJhY2siLCJvcGVuSW1hZ2VNb2RhbCIsImVyciIsInNob3dQcmV2aWV3RXJyb3IiLCJ1bnN1YnNjcmliZSIsImdldFBsb3RGcm9tQXBpIiwiZXJyb3IiLCJkZWJ1ZyIsIl9jb3JlX2hlbHBlcnNfZGF0YV91cmxfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJyb290VXJsIiwiX3NldHRpbmdzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJhcHBNb2RlIiwicG9zdCIsImxhbmd1YWdlIiwicmVzcG9uc2VUeXBlIiwibW9kZSIsImR1cmF0aW9uIiwidG9hc3QiLCJzcmMiLCJfcGFnZXNfbW9kYWxfcGFnZXNfZnVsbHNjcmVlbl9pbWFnZV9tb2RhbF9mdWxsc2NyZWVuX2ltYWdlX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsImltZ1NyYyIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImZlYXR1cmVzIiwiRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIiwiX2FuZ3VsYXJfY29tbW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2FuZ3VsYXJfZm9ybXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIl9mdWxsc2NyZWVuX2ltYWdlX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9jb3JlL2hlbHBlcnMvaHlkcm9sb2d5LWhlbHBlci50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL2NvbXByZXNzaW9uLXRlc3QvY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsL2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvY29tcHJlc3Npb24tdGVzdC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QuY29tcG9uZW50LnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LWRlbnNpdHkvc25vdy1kZW5zaXR5LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLWxheWVyLW1vZGFsL3Nub3ctdGVtcC1sYXllci1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLWxheWVyLW1vZGFsL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLWxheWVyLW1vZGFsL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1tb2RhbC9zbm93LXRlbXAtbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1tb2RhbC9zbm93LXRlbXAtbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1tb2RhbC9zbm93LXRlbXAtbW9kYWwucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXRlbXAvc25vdy10ZW1wLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLW1vZGFsL3N0cmF0LXByb2ZpbGUtbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLW1vZGFsL3N0cmF0LXByb2ZpbGUtbW9kYWwucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS9zdHJhdC1wcm9maWxlLW1vZGFsL3N0cmF0LXByb2ZpbGUtbW9kYWwucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1wcm9maWxlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L3Nub3ctcHJvZmlsZS9zbm93LXByb2ZpbGUucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctcHJvZmlsZS5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTnVtYmVySGVscGVyIH0gZnJvbSAnLi9udW1iZXItaGVscGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBIeWRyb2xvZ3lIZWxwZXIge1xyXG4gIHN0YXRpYyBpc0VtcHR5KG9iajogT2JqZWN0IHwgQXJyYXk8T2JqZWN0IHwgQXJyYXk8T2JqZWN0Pj4pIHt9XHJcblxyXG4gIHN0YXRpYyBjYWxjdWxhdGVEZW5zaXR5KFxyXG4gICAgd2VpZ2h0SW5LZzogbnVtYmVyLFxyXG4gICAgaGVpZ2h0SW5NOiBudW1iZXIsXHJcbiAgICB0YXJlV2VpZ2h0SW5LZzogbnVtYmVyLFxyXG4gICAgY3lsaW5kZXJEaWFtZXRlckluTTogbnVtYmVyXHJcbiAgKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICFOdW1iZXJIZWxwZXIuaXNOdW1lcmljKGN5bGluZGVyRGlhbWV0ZXJJbk0pIHx8XHJcbiAgICAgIGN5bGluZGVyRGlhbWV0ZXJJbk0gPD0gMFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3QgciA9IGN5bGluZGVyRGlhbWV0ZXJJbk0gLyAyLjA7XHJcbiAgICBjb25zdCB0b3RhbFdlaWdodCA9ICh3ZWlnaHRJbktnIHx8IDApIC0gKHRhcmVXZWlnaHRJbktnIHx8IDApO1xyXG4gICAgaWYgKHRvdGFsV2VpZ2h0IDw9IDApIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBjb25zdCBoZWlnaHRJbk1ldGVyID0gaGVpZ2h0SW5NIHx8IDA7XHJcbiAgICBpZiAoaGVpZ2h0SW5NZXRlciA8PSAwKSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgdm9sdW1lID0gTWF0aC5QSSAqIHIgKiByICogaGVpZ2h0SW5NZXRlcjtcclxuICAgIHJldHVybiB0b3RhbFdlaWdodCAvIHZvbHVtZTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjYWxjdWxhdGVXYXRlckVxdWl2YWxlbnQoZGVuc2l0eTogbnVtYmVyLCBoZWlnaHRJbk1ldGVyOiBudW1iZXIpIHtcclxuICAgIGlmIChcclxuICAgICAgTnVtYmVySGVscGVyLmlzTnVtZXJpYyhkZW5zaXR5KSAmJlxyXG4gICAgICBOdW1iZXJIZWxwZXIuaXNOdW1lcmljKGhlaWdodEluTWV0ZXIpICYmXHJcbiAgICAgIGRlbnNpdHkgPiAwICYmXHJcbiAgICAgIGhlaWdodEluTWV0ZXIgPiAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIChkZW5zaXR5IC8gMTAwMCkgKiAoaGVpZ2h0SW5NZXRlciAqIDEwMDApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2UgfSBmcm9tICcuL2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXByZXNzaW9uLXRlc3QtbGlzdC9jb21wcmVzc2lvbi10ZXN0LW1vZGFsL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIENvbXByZXNzaW9uVGVzdE1vZGFsUGFnZU1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdExpc3RNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkNPTVBSRVNTSU9OX1RFU1QuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlZyAmJiByZWcucmVxdWVzdCAmJiByZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3RcIj5cclxuICAgICAgPGFwcC1jb21wcmVzc2lvbi10ZXN0LWxpc3QgWyh0ZXN0cyldPVwicmVnLnJlcXVlc3QuQ29tcHJlc3Npb25UZXN0XCIgKHRlc3RzQ2hhbmdlKT1cInNhdmUoKVwiXHJcbiAgICAgICAgW2luY2x1ZGVJblNub3dQcm9maWxlQXNEZWZhdWx0XT1cInRydWVcIj5cclxuICAgICAgPC9hcHAtY29tcHJlc3Npb24tdGVzdC1saXN0PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICB7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb21wcmVzc2lvblRlc3RMaXN0TW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHJlZ0lkOiBzdHJpbmc7XHJcblxyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSBpbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmU6IElSZWdpc3RyYXRpb247XHJcbiAgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBzZXQgdGVzdHModmFsOiBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWxbXSkge1xyXG4gICAgdGhpcy5yZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3QgPSB2YWw7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICAgICAuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQodGhpcy5yZWdJZClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlZykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bihhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvbkNsb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvbkNsb25lID0gY2xvbmVEZWVwKHJlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJlZyA9IHJlZztcclxuICAgICAgICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3QgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhcclxuICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmVcclxuICAgICk7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInN1bW1hcnktaXRlbVwiIChjbGljayk9XCJvcGVuTW9kYWwoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuTW9kYWwoKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkNPTVBSRVNTSU9OX1RFU1QuVElUTEUnIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgPHA+XHJcbiAgICAgIDxpb24tdGV4dD5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiKHRlc3RzICYmIHRlc3RzLmxlbmd0aCA+IDApIGVsc2UgZW1wdHlcIj5cclxuICAgICAgICAgIHt7IGNvbm5lY3RlZFRlc3RzLmxlbmd0aCAgfX0gLyB7eyB0ZXN0cy5sZW5ndGggIH19XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkNPTVBSRVNTSU9OX1RFU1QuTVVMVElQTEVfVEVTVFMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuQ09NUFJFU1NJT05fVEVTVC5BVFRBQ0hFRCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi10ZXh0PlxyXG4gICAgPC9wPlxyXG4gIDwvaW9uLWxhYmVsPlxyXG4gIDxpb24taWNvbiAqbmdJZj1cIiFpc0VtcHR5XCIgc2xvdD1cImVuZFwiIGNvbG9yPVwic3VjY2Vzc1wiIG5hbWU9XCJjaGVja21hcmstY2lyY2xlXCI+PC9pb24taWNvbj5cclxuPC9pb24taXRlbT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuQ09NUFJFU1NJT05fVEVTVC5FTVBUWScgfCB0cmFuc2xhdGV9fVxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZSB9IGZyb20gJy4vY29tcHJlc3Npb24tdGVzdC1saXN0LW1vZGFsL2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IENvbXByZXNzaW9uVGVzdEVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWNvbXByZXNzaW9uLXRlc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jb21wcmVzc2lvbi10ZXN0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgY29tcHJlc3Npb25UZXN0TGlzdE1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG5cclxuICBnZXQgY29ubmVjdGVkVGVzdHMoKTogQ29tcHJlc3Npb25UZXN0RWRpdE1vZGVsW10ge1xyXG4gICAgcmV0dXJuIHRoaXMudGVzdHMuZmlsdGVyKCh0KSA9PiB0LkluY2x1ZGVJblNub3dQcm9maWxlID09PSB0cnVlKTtcclxuICB9XHJcblxyXG4gIGdldCB0ZXN0cygpOiBDb21wcmVzc2lvblRlc3RFZGl0TW9kZWxbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWcucmVxdWVzdC5Db21wcmVzc2lvblRlc3QgfHwgW107XHJcbiAgfVxyXG5cclxuICBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbm5lY3RlZFRlc3RzLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBvcGVuTW9kYWwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuY29tcHJlc3Npb25UZXN0TGlzdE1vZGFsKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpOyAvLyBTYXZlIHJlZ2lzdHJhdGlvbiBiZWZvcmUgb3BlbiBtb2RhbCBwYWdlXHJcbiAgICAgIHRoaXMuY29tcHJlc3Npb25UZXN0TGlzdE1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgcmVnSWQ6IHRoaXMucmVnLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3RMaXN0TW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmNvbXByZXNzaW9uVGVzdExpc3RNb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgdGhpcy5jb21wcmVzc2lvblRlc3RMaXN0TW9kYWwgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxmb3JtIChuZ1N1Ym1pdCk9XCJvaygpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ1c2VDeWxpbmRlciBlbHNlIG5vQ3lsaW5kZXJcIj5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuVGhpY2tuZXNzXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLkhFSUdIVFwiXHJcbiAgICAgICAgICBbbWF4XT1cIjk5OVwiIFttaW5dPVwiMFwiIHN1ZmZpeD1cImNtXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiICh2YWx1ZUNoYW5nZSk9XCJjYWxjdWxhdGUoKVwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCI+XHJcbiAgICAgICAgPC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuV2VpZ2h0XCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLldFSUdIVFwiXHJcbiAgICAgICAgICBbbWF4XT1cIjk5OTlcIiBbbWluXT1cIjBcIiBbY29udmVydFJhdGlvXT1cIjEwMDBcIiBzdWZmaXg9XCJnXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiICh2YWx1ZUNoYW5nZSk9XCJjYWxjdWxhdGUoKVwiPlxyXG4gICAgICAgIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgICAgPGlvbi1pdGVtPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbCBwb3NpdGlvbj1cInN0YWNrZWRcIiBjb2xvcj1cIm1lZGl1bVwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tdGV4dCBjbGFzcz1cImlvbi1hbGlnbi1zZWxmLXN0YXJ0XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsYXllci5EZW5zaXR5XCI+e3sgbGF5ZXIuRGVuc2l0eSB8IG51bWJlcjonMS4wLTInIH19IGtnL23CszwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDxpb24taXRlbT5cclxuICAgICAgICAgIDxpb24tbGFiZWwgcG9zaXRpb249XCJzdGFja2VkXCIgY29sb3I9XCJtZWRpdW1cIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLldBVEVSX0VRVUlWQUxFTlQnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi10ZXh0IGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtc3RhcnRcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkRlbnNpdHkgJiYgbGF5ZXIuVGhpY2tuZXNzXCI+XHJcbiAgICAgICAgICAgICAge3sgZ2V0V2F0ZXJFcXVpdmFsZW50KGxheWVyLkRlbnNpdHksIGxheWVyLlRoaWNrbmVzcykgfCBudW1iZXI6JzEuMC0yJyB9fSBtbTwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cImluZGV4ID09PSAwXCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwib3V0bGluZVwiIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJvaygtMSlcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJhcnJvdy1iYWNrXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAgPGlvbi10ZXh0Pnt7ICdESUFMT0dTLlBSRVZJT1VTJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiIWNhbkdvTmV4dFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soMSlcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJlbmRcIiBuYW1lPVwiYXJyb3ctZm9yd2FyZFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpb24tdGV4dD57eyAnRElBTE9HUy5ORVhUJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLXRleHQ+XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCIxMlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cInNvbGlkXCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgIHt7ICdESUFMT0dTLk9LX0JBQ0snIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICAgIDxpb24tcm93ICpuZ0lmPVwiIWFkZE5ld1wiPlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImRlbGV0ZSgpXCIgc2l6ZT1cInNtYWxsXCIgZmlsbD1cImNsZWFyXCIgZXhwYW5kPVwiYmxvY2tcIj5cclxuICAgICAgICAgICAgPGlvbi1pY29uIHNsb3Q9XCJzdGFydFwiIG5hbWU9XCJ0cmFzaFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIHt7ICdESUFMT0dTLkRFTEVURScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9mb3JtPlxyXG48L2lvbi1jb250ZW50PlxyXG48bmctdGVtcGxhdGUgI25vQ3lsaW5kZXI+XHJcbiAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLlRoaWNrbmVzc1wiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5IRUlHSFRcIiBbbWF4XT1cIjk5OVwiXHJcbiAgICBbbWluXT1cIjBcIiBzdWZmaXg9XCJjbVwiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIiAodmFsdWVDaGFuZ2UpPVwiY2FsY3VsYXRlKClcIiBbY29udmVydFJhdGlvXT1cIjEwMFwiPlxyXG4gIDwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cImxheWVyLkRlbnNpdHlcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuREVOU0lUWVwiIFttYXhdPVwiOTk5OVwiXHJcbiAgICBbbWluXT1cIjBcIiBzdWZmaXg9XCJrZy9twrNcIiBbZGVjaW1hbFBsYWNlc109XCIzXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eUxheWVyTW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IEh5ZHJvbG9neUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9oeWRyb2xvZ3ktaGVscGVyJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2Nsb25lLWRlZXAnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSByZWc6IElSZWdpc3RyYXRpb247XHJcbiAgQElucHV0KCkgbGF5ZXI6IFNub3dEZW5zaXR5TGF5ZXJNb2RlbDtcclxuICBASW5wdXQoKSB1c2VDeWxpbmRlciA9IHRydWU7XHJcbiAgQElucHV0KCkgY3lsaW5kZXJEaWFtZXRlckluTTogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHRhcmVXZWlnaHQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG4gIGFkZE5ldzogYm9vbGVhbjtcclxuICBwcml2YXRlIGluaXRpYWxSZWdpc3RyYXRpb25TdGF0ZTogSVJlZ2lzdHJhdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlID0gY2xvbmVEZWVwKHRoaXMucmVnKTtcclxuICAgIHRoaXMuaW5pdExheWVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRMYXllcigpIHtcclxuICAgIHRoaXMuYWRkTmV3ID0gdGhpcy5sYXllciA9PT0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHRoaXMuYWRkTmV3KSB7XHJcbiAgICAgIHRoaXMubGF5ZXIgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzTGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzLmxlbmd0aCA+IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXQgbGF5ZXJMZW5naHQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oYXNMYXllcnNcclxuICAgICAgPyB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMubGVuZ3RoXHJcbiAgICAgIDogMDtcclxuICB9XHJcblxyXG4gIGdldCBjYW5Hb05leHQoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAodGhpcy5oYXNMYXllcnMgJiYgdGhpcy5pbmRleCA8IHRoaXMubGF5ZXJMZW5naHQpIHx8XHJcbiAgICAgICh0aGlzLmluZGV4ID09PSB0aGlzLmxheWVyTGVuZ2h0ICYmXHJcbiAgICAgICAgdGhpcy5hZGROZXcgJiZcclxuICAgICAgICAhdGhpcy5pc0VtcHR5KHRoaXMubGF5ZXIpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNFbXB0eShzbm93RGVuc2l0eUxheWVyOiBTbm93RGVuc2l0eUxheWVyTW9kZWwpIHtcclxuICAgIHJldHVybiB0aGlzLnVzZUN5bGluZGVyXHJcbiAgICAgID8gc25vd0RlbnNpdHlMYXllci5UaGlja25lc3MgPT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgc25vd0RlbnNpdHlMYXllci5XZWlnaHQgPT09IHVuZGVmaW5lZFxyXG4gICAgICA6IHNub3dEZW5zaXR5TGF5ZXIuRGVuc2l0eSA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb2soZ290b0luZGV4PzogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5KSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycykge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFkZE5ldyAmJiAhdGhpcy5pc0VtcHR5KHRoaXMubGF5ZXIpKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycy5zcGxpY2UoXHJcbiAgICAgICAgdGhpcy5pbmRleCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG5cclxuICAgIGlmIChnb3RvSW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIGdvdG9JbmRleDtcclxuICAgICAgdGhpcy5sYXllciA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVyc1tcclxuICAgICAgICB0aGlzLmluZGV4XHJcbiAgICAgIF07XHJcbiAgICAgIHRoaXMuaW5pdExheWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBjYW5jZWwoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKFxyXG4gICAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25TdGF0ZVxyXG4gICAgKTtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZSgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eS5sZW5ndGggPiAwICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycyA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycy5maWx0ZXIoXHJcbiAgICAgICAgKGwpID0+IGwgIT09IHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGUoKSB7XHJcbiAgICBpZiAodGhpcy51c2VDeWxpbmRlcikge1xyXG4gICAgICB0aGlzLmxheWVyLkRlbnNpdHkgPSBIeWRyb2xvZ3lIZWxwZXIuY2FsY3VsYXRlRGVuc2l0eShcclxuICAgICAgICB0aGlzLmxheWVyLldlaWdodCxcclxuICAgICAgICB0aGlzLmxheWVyLlRoaWNrbmVzcyxcclxuICAgICAgICB0aGlzLnRhcmVXZWlnaHQsXHJcbiAgICAgICAgdGhpcy5jeWxpbmRlckRpYW1ldGVySW5NXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRXYXRlckVxdWl2YWxlbnQoZGVuc2l0eTogbnVtYmVyLCBkZXB0aDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gSHlkcm9sb2d5SGVscGVyLmNhbGN1bGF0ZVdhdGVyRXF1aXZhbGVudChkZW5zaXR5LCBkZXB0aCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LWRlbnNpdHktbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsL3Nub3ctZGVuc2l0eS1sYXllci1tb2RhbC5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZSwgU25vd0RlbnNpdHlMYXllck1vZGFsUGFnZU1vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbU25vd0RlbnNpdHlNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1Nub3dEZW5zaXR5TW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd0RlbnNpdHlNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxmb3JtIChuZ1N1Ym1pdCk9XCJvaygpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuTUVUSE9EJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuQ1lMSU5ERVJfTUVUSE9EJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgPGlvbi10b2dnbGUgc2xvdD1cImVuZFwiIFsobmdNb2RlbCldPVwidXNlQ3lsaW5kZXJcIiBuYW1lPVwidXNlQ3lsaW5kZXJcIj48L2lvbi10b2dnbGU+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ1c2VDeWxpbmRlclwiPlxyXG4gICAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLkNZTElOREVSJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cInByb2ZpbGUuQ3lsaW5kZXJEaWFtZXRlclwiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuQ1lMSU5ERVJfRElBTUVURVJcIiBbbWF4XT1cIjk5OVwiIFttaW5dPVwiMFwiIHN1ZmZpeD1cImNtXCJcclxuICAgICAgICAgIFtkZWNpbWFsUGxhY2VzXT1cIjJcIiAodmFsdWVDaGFuZ2UpPVwicmVjYWxjdWxhdGVMYXllcnNBbmRTYXZlKClcIiBbY29udmVydFJhdGlvXT1cIjEwMFwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgICAgPGFwcC1udW1lcmljLWlucHV0IFsodmFsdWUpXT1cInByb2ZpbGUuVGFyZVdlaWdodFwiICh2YWx1ZUNoYW5nZSk9XCJyZWNhbGN1bGF0ZUxheWVyc0FuZFNhdmUoKVwiXHJcbiAgICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuVEFSRV9XRUlHSFRcIiBbbWF4XT1cIjk5OVwiIFttaW5dPVwiMFwiIHN1ZmZpeD1cImdcIlxyXG4gICAgICAgICAgW2RlY2ltYWxQbGFjZXNdPVwiMlwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwMFwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19ERU5TSVRZLkxBWUVSJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0xheWVycyBlbHNlIG5vTGF5ZXJzXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRMYXllclRvcCgpXCIgKGtleXVwLmVudGVyKT1cImFkZExheWVyVG9wKClcIj5cclxuICAgICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuQUREX0xBWUVSX1RPUCcgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1yZW9yZGVyLWdyb3VwIGRpc2FibGVkPVwiZmFsc2VcIiAoaW9uSXRlbVJlb3JkZXIpPVwib25MYXllclJlb3JkZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgPGlvbi1pdGVtIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJhZGRPckVkaXRMYXllcihpLCBsYXllcilcIiAoa2V5dXAuZW50ZXIpPVwiYWRkT3JFZGl0TGF5ZXIoaSwgbGF5ZXIpXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGxheWVyIG9mIHByb2ZpbGUuTGF5ZXJzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwibGF5ZXIuVGhpY2tuZXNzICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAgICAgIHt7bGF5ZXIuVGhpY2tuZXNzIHwgbWV0ZXJzVG9DbSB9fWNtXHJcbiAgICAgICAgICAgICAgPC9pb24tdGV4dD5cclxuICAgICAgICAgICAgICA8aW9uLXRleHQgKm5nSWY9XCJsYXllci5XZWlnaHQgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5XZWlnaHQgKiAxMDAwIH19Z1xyXG4gICAgICAgICAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICAgICAgICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwibGF5ZXIuRGVuc2l0eSAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICB7eyBsYXllci5EZW5zaXR5IHwgbnVtYmVyOicxLjAtMicgfX1rZy9twrNcclxuICAgICAgICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgICAgICAgIDxpb24tdGV4dCAqbmdJZj1cInVzZUN5bGluZGVyICYmIGxheWVyLkRlbnNpdHkgIT09IHVuZGVmaW5lZCAmJiBsYXllci5UaGlja25lc3MgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAgKHt7IGdldFdhdGVyRXF1aXZhbGVudChsYXllci5EZW5zaXR5LCBsYXllci5UaGlja25lc3MpIHwgbnVtYmVyOicxLjAtMicgfX1tbSlcclxuICAgICAgICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgPGlvbi1yZW9yZGVyIHNsb3Q9XCJlbmRcIj48L2lvbi1yZW9yZGVyPlxyXG4gICAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgICA8L2lvbi1yZW9yZGVyLWdyb3VwPlxyXG4gICAgICAgIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkTGF5ZXJCb3R0b20oKVwiIChrZXl1cC5lbnRlcik9XCJhZGRMYXllckJvdHRvbSgpXCI+XHJcbiAgICAgICAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkFERF9MQVlFUl9CT1RUT00nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgICA8aW9uLWdyaWQgY2xhc3M9XCJpb24tbm8tcGFkZGluZ1wiPlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICB7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD5cclxuPG5nLXRlbXBsYXRlICNub0xheWVycz5cclxuICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZExheWVyQm90dG9tKClcIiAoa2V5dXAuZW50ZXIpPVwiYWRkTGF5ZXJCb3R0b20oKVwiPlxyXG4gICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5BRERfTEFZRVInIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICA8L2lvbi1pdGVtPlxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eUxheWVyTW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TGF5ZXJNb2RhbFBhZ2UgfSBmcm9tICcuLi9zbm93LWRlbnNpdHktbGF5ZXItbW9kYWwvc25vdy1kZW5zaXR5LWxheWVyLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJdGVtUmVvcmRlckV2ZW50RGV0YWlsIH0gZnJvbSAnQGlvbmljL2NvcmUnO1xyXG5pbXBvcnQgeyBBcnJheUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9hcnJheS1oZWxwZXInO1xyXG5pbXBvcnQgeyBIeWRyb2xvZ3lIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaHlkcm9sb2d5LWhlbHBlcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnY2xvbmUtZGVlcCc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LWRlbnNpdHktbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LWRlbnNpdHktbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zbm93LWRlbnNpdHktbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dEZW5zaXR5TW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIHJlZ0lkOiBzdHJpbmc7XHJcbiAgdXNlQ3lsaW5kZXI6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBsYXllck1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgcHJpdmF0ZSByZWc6IElSZWdpc3RyYXRpb247XHJcbiAgcHJpdmF0ZSBpbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmU6IElSZWdpc3RyYXRpb247XHJcblxyXG4gIGdldCBwcm9maWxlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5Lmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzTGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5wcm9maWxlICYmIHRoaXMucHJvZmlsZS5MYXllcnMgJiYgdGhpcy5wcm9maWxlLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICAgICAgLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKHRoaXMucmVnSWQpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWcpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSA9IGNsb25lRGVlcChyZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yZWcgPSByZWc7XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5ID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5WzBdLkxheWVycykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLnVzZUN5bGluZGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VDeWxpbmRlciA9XHJcbiAgICAgICAgICAgICAgISF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5DeWxpbmRlckRpYW1ldGVyIHx8XHJcbiAgICAgICAgICAgICAgISF0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5UYXJlV2VpZ2h0IHx8XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU25vd0RlbnNpdHlbMF0uTGF5ZXJzLmxlbmd0aCA9PT1cclxuICAgICAgICAgICAgICAgIDAgfHxcclxuICAgICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eVswXS5MYXllcnMuc29tZShcclxuICAgICAgICAgICAgICAgIChsKSA9PiAhIWwuV2VpZ2h0XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMubmdEZXN0cm95JC5uZXh0KCk7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh0aGlzLnByb2ZpbGUpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhcclxuICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmVcclxuICAgICk7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhZGRMYXllclRvcCgpIHtcclxuICAgIHRoaXMuYWRkT3JFZGl0TGF5ZXIoMCwgdW5kZWZpbmVkKTtcclxuICB9XHJcblxyXG4gIGFkZExheWVyQm90dG9tKCkge1xyXG4gICAgdGhpcy5hZGRPckVkaXRMYXllcihcclxuICAgICAgdGhpcy5oYXNMYXllcnMgPyB0aGlzLnByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA6IDAsXHJcbiAgICAgIHVuZGVmaW5lZFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE9yRWRpdExheWVyKGluZGV4OiBudW1iZXIsIGxheWVyOiBTbm93RGVuc2l0eUxheWVyTW9kZWwpIHtcclxuICAgIGlmICghdGhpcy5sYXllck1vZGFsKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBTbm93RGVuc2l0eUxheWVyTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWc6IHRoaXMucmVnLFxyXG4gICAgICAgICAgbGF5ZXI6IGxheWVyLFxyXG4gICAgICAgICAgdXNlQ3lsaW5kZXI6IHRoaXMudXNlQ3lsaW5kZXIsXHJcbiAgICAgICAgICBjeWxpbmRlckRpYW1ldGVySW5NOiB0aGlzLnByb2ZpbGUuQ3lsaW5kZXJEaWFtZXRlcixcclxuICAgICAgICAgIHRhcmVXZWlnaHQ6IHRoaXMucHJvZmlsZS5UYXJlV2VpZ2h0LFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmxheWVyTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IG51bGw7XHJcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTGF5ZXJSZW9yZGVyKGV2ZW50OiBDdXN0b21FdmVudDxJdGVtUmVvcmRlckV2ZW50RGV0YWlsPikge1xyXG4gICAgdGhpcy5wcm9maWxlLkxheWVycyA9IEFycmF5SGVscGVyLnJlb3JkZXJMaXN0KFxyXG4gICAgICB0aGlzLnByb2ZpbGUuTGF5ZXJzLFxyXG4gICAgICBldmVudC5kZXRhaWwuZnJvbSxcclxuICAgICAgZXZlbnQuZGV0YWlsLnRvXHJcbiAgICApO1xyXG4gICAgZXZlbnQuZGV0YWlsLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICByZWNhbGN1bGF0ZUxheWVycygpIHtcclxuICAgIGlmICh0aGlzLnVzZUN5bGluZGVyICYmIHRoaXMuaGFzTGF5ZXJzKSB7XHJcbiAgICAgIHRoaXMucHJvZmlsZS5MYXllcnMuZm9yRWFjaCgobGF5ZXI6IFNub3dEZW5zaXR5TGF5ZXJNb2RlbCkgPT4ge1xyXG4gICAgICAgIGxheWVyLkRlbnNpdHkgPSBIeWRyb2xvZ3lIZWxwZXIuY2FsY3VsYXRlRGVuc2l0eShcclxuICAgICAgICAgIGxheWVyLldlaWdodCxcclxuICAgICAgICAgIGxheWVyLlRoaWNrbmVzcyxcclxuICAgICAgICAgIHRoaXMucHJvZmlsZS5UYXJlV2VpZ2h0LFxyXG4gICAgICAgICAgdGhpcy5wcm9maWxlLkN5bGluZGVyRGlhbWV0ZXJcclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHJlY2FsY3VsYXRlTGF5ZXJzQW5kU2F2ZSgpIHtcclxuICAgIHRoaXMucmVjYWxjdWxhdGVMYXllcnMoKTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0V2F0ZXJFcXVpdmFsZW50KGRlbnNpdHk6IG51bWJlciwgZGVwdGg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIEh5ZHJvbG9neUhlbHBlci5jYWxjdWxhdGVXYXRlckVxdWl2YWxlbnQoZGVuc2l0eSwgZGVwdGgpO1xyXG4gIH1cclxufVxyXG4iLCI8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJzdW1tYXJ5LWl0ZW1cIiAoY2xpY2spPVwib3Blbk1vZGFsKClcIiAoa2V5dXAuZW50ZXIpPVwib3Blbk1vZGFsKClcIj5cclxuICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXBhZGRpbmctdmVydGljYWwgaW9uLXBhZGRpbmctZW5kXCI+XHJcbiAgICA8aDI+e3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuVElUTEUnIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgPHA+XHJcbiAgICAgIDxpb24tdGV4dCAqbmdJZj1cIiFpc0VtcHR5IGVsc2UgZW1wdHlcIj57e3Byb2ZpbGVzWzBdLkxheWVycyA/IHByb2ZpbGVzWzBdLkxheWVycy5sZW5ndGggOiAwIH19XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb2ZpbGVzWzBdLkxheWVycy5sZW5ndGggPT09IDEgZWxzZSBtdWx0aXBsZVwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5PTkVfTEFZRVInIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9pb24tdGV4dD5cclxuICAgIDwvcD5cclxuICA8L2lvbi1sYWJlbD5cclxuICA8aW9uLWljb24gKm5nSWY9XCIhaXNFbXB0eVwiIHNsb3Q9XCJlbmRcIiBjb2xvcj1cInN1Y2Nlc3NcIiBuYW1lPVwiY2hlY2ttYXJrLWNpcmNsZVwiPjwvaW9uLWljb24+XHJcbjwvaW9uLWl0ZW0+XHJcbjxuZy10ZW1wbGF0ZSAjZW1wdHk+XHJcbiAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfREVOU0lUWS5FTVBUWScgfCB0cmFuc2xhdGV9fVxyXG48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI211bHRpcGxlPlxyXG4gIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX0RFTlNJVFkuTVVMVElQTEVfTEFZRVJTJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbm93RGVuc2l0eU1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNub3dEZW5zaXR5TW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LWRlbnNpdHktbW9kYWwvc25vdy1kZW5zaXR5LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LWRlbnNpdHknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LWRlbnNpdHkuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctZGVuc2l0eS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93RGVuc2l0eUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgZGVuc2l0eU1vZGFsOiBIVE1MSW9uTW9kYWxFbGVtZW50O1xyXG5cclxuICBnZXQgcHJvZmlsZXMoKTogU25vd0RlbnNpdHlNb2RlbFtdIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93RGVuc2l0eS5sZW5ndGggPiAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dEZW5zaXR5O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNFbXB0eSh0aGlzLnByb2ZpbGVzKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBvcGVuTW9kYWwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBpZiAoIXRoaXMuZGVuc2l0eU1vZGFsKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpOyAvLyBTYXZlIHJlZ2lzdHJhdGlvbiBiZWZvcmUgb3BlbiBtb2RhbCBwYWdlXHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogU25vd0RlbnNpdHlNb2RhbFBhZ2UsXHJcbiAgICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICAgIHJlZ0lkOiB0aGlzLnJlZy5pZFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgYXdhaXQgdGhpcy5kZW5zaXR5TW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMuZGVuc2l0eU1vZGFsID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU25vd1RlbXBMYXllck1vZGFsUGFnZSB9IGZyb20gJy4vc25vdy10ZW1wLWxheWVyLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Nub3dUZW1wTGF5ZXJNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1Nub3dUZW1wTGF5ZXJNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93VGVtcExheWVyTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX1RFTVAuUE9JTlQnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLlBPSU5UJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuRGVwdGhcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX1RFTVAuREVQVEhcIiBbbWF4XT1cIjk5OVwiXHJcbiAgICAgICAgW21pbl09XCIwXCIgc3VmZml4PVwiY21cIiBbZGVjaW1hbFBsYWNlc109XCIyXCIgW2NvbnZlcnRSYXRpb109XCIxMDBcIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXIuU25vd1RlbXBcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX1RFTVAuVEVNUEVSQVRVUkVcIlxyXG4gICAgICAgIFttYXhdPVwiMFwiIFttaW5dPVwiLTcwXCIgc3VmZml4PVwiwrBDXCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1ncmlkIGNsYXNzPVwiaW9uLW5vLXBhZGRpbmdcIj5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIFtkaXNhYmxlZF09XCJpbmRleCA9PT0gMFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cIm91dGxpbmVcIiBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwib2soLTEpXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwiYXJyb3ctYmFja1wiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICAgIDxpb24tdGV4dD57eyAnRElBTE9HUy5QUkVWSU9VUycgfCB0cmFuc2xhdGUgfX08L2lvbi10ZXh0PlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cIiFjYW5Hb05leHRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9rKDEpXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgbmFtZT1cImFycm93LWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8aW9uLXRleHQ+e3sgJ0RJQUxPR1MuTkVYVCcgfCB0cmFuc2xhdGUgfX08L2lvbi10ZXh0PlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdz5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiMTJcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJzb2xpZFwiIGNvbG9yPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICB7eyAnRElBTE9HUy5PS19CQUNLJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyAqbmdJZj1cIiFhZGROZXdcIj5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiIG9mZnNldD1cIjNcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkZWxldGUoKVwiIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiIGV4cGFuZD1cImJsb2NrXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICB7eyAnRElBTE9HUy5ERUxFVEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvZm9ybT5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU25vd1RlbXBPYnNNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNub3ctdGVtcC1sYXllci1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1RlbXBMYXllck1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbGF5ZXI6IFNub3dUZW1wT2JzTW9kZWw7XHJcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSByZWc6IElSZWdpc3RyYXRpb247XHJcbiAgYWRkTmV3OiBib29sZWFuO1xyXG5cclxuICBwcml2YXRlIGluaXRpYWxSZWdpc3RyYXRpb25TdGF0ZTogSVJlZ2lzdHJhdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlID0gY2xvbmVEZWVwKHRoaXMucmVnKTtcclxuICAgIHRoaXMuaW5pdExheWVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRMYXllcigpIHtcclxuICAgIHRoaXMuYWRkTmV3ID0gdGhpcy5sYXllciA9PT0gdW5kZWZpbmVkO1xyXG4gICAgaWYgKHRoaXMuYWRkTmV3KSB7XHJcbiAgICAgIHRoaXMubGF5ZXIgPSB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldCBsYXllckxlbmdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhhc0xheWVyc1xyXG4gICAgICA/IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5sZW5ndGhcclxuICAgICAgOiAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNhbkdvTmV4dCgpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICh0aGlzLmhhc0xheWVycyAmJiB0aGlzLmluZGV4IDwgdGhpcy5sYXllckxlbmdodCkgfHxcclxuICAgICAgKHRoaXMuaW5kZXggPT09IHRoaXMubGF5ZXJMZW5naHQgJiZcclxuICAgICAgICB0aGlzLmFkZE5ldyAmJlxyXG4gICAgICAgICFJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy5sYXllcikpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb2soZ290b0luZGV4PzogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycykge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmFkZE5ldyAmJiAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMubGF5ZXIpKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5zcGxpY2UoXHJcbiAgICAgICAgdGhpcy5pbmRleCxcclxuICAgICAgICAwLFxyXG4gICAgICAgIHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG5cclxuICAgIGlmIChnb3RvSW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIGdvdG9JbmRleDtcclxuICAgICAgdGhpcy5sYXllciA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVyc1t0aGlzLmluZGV4XTtcclxuICAgICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGNhbmNlbCgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMoXHJcbiAgICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvblN0YXRlXHJcbiAgICApO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyA9IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycy5maWx0ZXIoXHJcbiAgICAgICAgKGwpID0+IGwgIT09IHRoaXMubGF5ZXJcclxuICAgICAgKTtcclxuICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgZGVsZXRlOiB0cnVlIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbm93VGVtcE1vZGFsUGFnZSB9IGZyb20gJy4vc25vdy10ZW1wLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgU25vd1RlbXBMYXllck1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL3Nub3ctdGVtcC1sYXllci1tb2RhbC9zbm93LXRlbXAtbGF5ZXItbW9kYWwubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFNub3dUZW1wTGF5ZXJNb2RhbFBhZ2VNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Nub3dUZW1wTW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTbm93VGVtcE1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNub3dUZW1wTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX1RFTVAuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZE9yRWRpdExheWVyKGksIGxheWVyKVwiIChrZXl1cC5lbnRlcik9XCJhZGRPckVkaXRMYXllcihpLCBsYXllcilcIlxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBsYXllciBvZiB0ZW1wUHJvZmlsZS5MYXllcnM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkRlcHRoICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAge3tsYXllci5EZXB0aCB8IG1ldGVyc1RvQ20gfX1jbVxyXG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibGF5ZXIuU25vd1RlbXAgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICB7e2xheWVyLlNub3dUZW1wfX3CsENcclxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZExheWVyQm90dG9tKClcIiAoa2V5dXAuZW50ZXIpPVwiYWRkTGF5ZXJCb3R0b20oKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TTk9XX1RFTVAuQUREX0xBWUVSX0JPVFRPTScgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwic29saWRcIiBjb2xvcj1cInByaW1hcnlcIiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgIHt7J0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9mb3JtPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBTbm93VGVtcE9ic01vZGVsLFxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTbm93VGVtcExheWVyTW9kYWxQYWdlIH0gZnJvbSAnLi4vc25vdy10ZW1wLWxheWVyLW1vZGFsL3Nub3ctdGVtcC1sYXllci1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2Nsb25lLWRlZXAnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLXNub3ctdGVtcC1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Nub3ctdGVtcC1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctdGVtcC1tb2RhbC5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU25vd1RlbXBNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcmVnSWQ6IHN0cmluZztcclxuICBwcml2YXRlIGxheWVyTW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBpbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmU6IElSZWdpc3RyYXRpb247XHJcbiAgcHJpdmF0ZSByZWc6IElSZWdpc3RyYXRpb247XHJcblxyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGdldCB0ZW1wUHJvZmlsZSgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzTGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy50ZW1wUHJvZmlsZSAmJlxyXG4gICAgICB0aGlzLnRlbXBQcm9maWxlLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnRlbXBQcm9maWxlLkxheWVycy5sZW5ndGggPiAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2VcclxuICAgICAgLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKHRoaXMucmVnSWQpXHJcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChyZWcpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxSZWdpc3RyYXRpb25DbG9uZSA9IGNsb25lRGVlcChyZWcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5yZWcgPSByZWc7XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wID0ge307XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycykge1xyXG4gICAgICAgICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuc29ydExheWVycygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuaW5pdGlhbFJlZ2lzdHJhdGlvbkNsb25lID0gY2xvbmVEZWVwKHRoaXMucmVnKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgb2soKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHRoaXMudGVtcFByb2ZpbGUpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCkge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhcclxuICAgICAgdGhpcy5pbml0aWFsUmVnaXN0cmF0aW9uQ2xvbmVcclxuICAgICk7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhZGRMYXllckJvdHRvbSgpIHtcclxuICAgIHRoaXMuYWRkT3JFZGl0TGF5ZXIoXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJzID8gdGhpcy50ZW1wUHJvZmlsZS5MYXllcnMubGVuZ3RoIDogMCxcclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkT3JFZGl0TGF5ZXIoaW5kZXg6IG51bWJlciwgbGF5ZXI6IFNub3dUZW1wT2JzTW9kZWwpIHtcclxuICAgIGlmICghdGhpcy5sYXllck1vZGFsKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBTbm93VGVtcExheWVyTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWc6IHRoaXMucmVnLFxyXG4gICAgICAgICAgbGF5ZXIsXHJcbiAgICAgICAgICBpbmRleFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbC5wcmVzZW50KCk7XHJcbiAgICAgIGF3YWl0IHRoaXMubGF5ZXJNb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgdGhpcy5sYXllck1vZGFsID0gbnVsbDtcclxuICAgICAgdGhpcy5zb3J0TGF5ZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNvcnRMYXllcnMoKSB7XHJcbiAgICBpZiAodGhpcy50ZW1wUHJvZmlsZSAmJiB0aGlzLnRlbXBQcm9maWxlLkxheWVycykge1xyXG4gICAgICB0aGlzLnRlbXBQcm9maWxlLkxheWVycyA9IHRoaXMudGVtcFByb2ZpbGUuTGF5ZXJzLnNvcnQoXHJcbiAgICAgICAgKGEsIGIpID0+IGEuRGVwdGggLSBiLkRlcHRoXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInN1bW1hcnktaXRlbVwiIChjbGljayk9XCJvcGVuTW9kYWwoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuTW9kYWwoKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5USVRMRScgfCB0cmFuc2xhdGV9fTwvaDI+XHJcbiAgICA8cD5cclxuICAgICAgPGlvbi10ZXh0ICpuZ0lmPVwiIWlzRW1wdHkgZWxzZSBlbXB0eVwiPlxyXG4gICAgICAgIHt7dGVtcFByb2ZpbGUuTGF5ZXJzID8gdGVtcFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA6IDAgfX1cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGVtcFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA9PT0gMSBlbHNlIG11bHRpcGxlXCI+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLk9ORV9MQVlFUicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2lvbi10ZXh0PlxyXG4gICAgPC9wPlxyXG4gIDwvaW9uLWxhYmVsPlxyXG4gIDxpb24taWNvbiAqbmdJZj1cIiFpc0VtcHR5XCIgc2xvdD1cImVuZFwiIGNvbG9yPVwic3VjY2Vzc1wiIG5hbWU9XCJjaGVja21hcmstY2lyY2xlXCI+PC9pb24taWNvbj5cclxuPC9pb24taXRlbT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU05PV19URU1QLkVNUFRZJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjbXVsdGlwbGU+XHJcbiAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNOT1dfVEVNUC5NVUxUSVBMRV9MQVlFUlMnIHwgdHJhbnNsYXRlfX1cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSXNFbXB0eUhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9pcy1lbXB0eS5oZWxwZXInO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFNub3dUZW1wTW9kYWxQYWdlIH0gZnJvbSAnLi9zbm93LXRlbXAtbW9kYWwvc25vdy10ZW1wLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zbm93LXRlbXAnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zbm93LXRlbXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Nub3ctdGVtcC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93VGVtcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG4gIHByaXZhdGUgc25vd1RlbXBNb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcclxuXHJcbiAgZ2V0IHRlbXBQcm9maWxlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gaXNFbXB0eSh0aGlzLnRlbXBQcm9maWxlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGFzeW5jIG9wZW5Nb2RhbCgpIHtcclxuICAgIGlmICghdGhpcy5zbm93VGVtcE1vZGFsKSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpOyAvLyBTYXZlIHJlZ2lzdHJhdGlvbiBiZWZvcmUgb3BlbiBtb2RhbCBwYWdlXHJcbiAgICAgIHRoaXMuc25vd1RlbXBNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250b2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IFNub3dUZW1wTW9kYWxQYWdlLFxyXG4gICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICByZWdJZDogdGhpcy5yZWcuaWRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnNub3dUZW1wTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLnNub3dUZW1wTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMuc25vd1RlbXBNb2RhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSB9IGZyb20gJy4vc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1N0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU3RyYXRQcm9maWxlTGF5ZXJIaXN0b3J5TW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RyYXRQcm9maWxlTGF5ZXJIaXN0b3J5TW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkZST01fT1RIRVJfUFJPRklMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIiBjbGFzcz1cImlvbi1uby1tYXJnaW5cIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIoJHByZXZpb3VzVXNlZExheWVycyB8IGFzeW5jKSBhcyBwcmV2aW91c1VzZWRMYXllcnMgZWxzZSBsb2FkaW5nXCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcmV2aW91c1VzZWRMYXllcnMubGVuZ3RoID4gMCBlbHNlIGVtcHR5XCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIFtkZXRhaWxdPVwidHJ1ZVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIHByZXZpb3VzVXNlZExheWVyc1wiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJzZWxlY3RMYXllcihpdGVtKVwiXHJcbiAgICAgICAgICAoa2V5dXAuZW50ZXIpPVwic2VsZWN0TGF5ZXIoaXRlbSlcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7IGl0ZW0uZGF0ZSB8IGZvcm1hdERhdGUgfCBhc3luYyB9fSAtICh7eyBpdGVtLmxheWVycy5sZW5ndGggfX1cclxuICAgICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTEFZRVInIHwgdHJhbnNsYXRlfX0pXHJcbiAgICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvaW9uLWxpc3Q+XHJcbjwvaW9uLWNvbnRlbnQ+XHJcbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogNDAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogMzAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gW2RldGFpbF09XCJ0cnVlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWQgc3R5bGU9XCJ3aWR0aDogNjAlXCI+PC9pb24tc2tlbGV0b24tdGV4dD4gLSA8aW9uLXNrZWxldG9uLXRleHQgYW5pbWF0ZWRcclxuICAgICAgICBzdHlsZT1cIndpZHRoOiAyMCVcIj48L2lvbi1za2VsZXRvbi10ZXh0PlxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuPG5nLXRlbXBsYXRlICNlbXB0eT5cclxuICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICA8aW9uLWxhYmVsPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTk9fUFJPRklMRVNfRk9VTkQnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1saXN0LWhlYWRlcj5cclxuPC9uZy10ZW1wbGF0ZT4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBtYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICBSZWdpc3RyYXRpb25WaWV3TW9kZWwsXHJcbiAgU3RyYXRQcm9maWxlTGF5ZXJWaWV3TW9kZWwsXHJcbiAgU2VhcmNoU2VydmljZVxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgcGlwZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkLCBJUmVnaXN0cmF0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBpc0xvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAkcHJldmlvdXNVc2VkTGF5ZXJzOiBPYnNlcnZhYmxlPFxyXG4gICAgeyBpZDogbnVtYmVyOyBkYXRlOiBzdHJpbmc7IGxheWVyczogU3RyYXRQcm9maWxlTGF5ZXJWaWV3TW9kZWxbXSB9W11cclxuICA+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMucmVnICYmIHRoaXMucmVnLnJlcXVlc3QgJiYgdGhpcy5yZWcucmVxdWVzdC5PYnNMb2NhdGlvbikge1xyXG4gICAgICB0aGlzLiRwcmV2aW91c1VzZWRMYXllcnMgPSB0aGlzLnNlYXJjaFNlcnZpY2VcclxuICAgICAgICAuU2VhcmNoU2VhcmNoKHtcclxuICAgICAgICAgIC8vIE9ic2VydmVyR3VpZDogdGhpcy5vYnNlcnZlckd1aWQsIFRPRE86IENhbGwgXCJteSBvYmVydmF0aW9uc1wiIGluIGFwaSBpbnN0ZWFkXHJcbiAgICAgICAgICBGcm9tRHRPYnNUaW1lOiBtb21lbnQoKS5zdWJ0cmFjdCgxNCwgJ2RheXMnKS5zdGFydE9mKCdkYXknKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgICAgUmFkaXVzOiB7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgTGF0aXR1ZGU6IHRoaXMucmVnLnJlcXVlc3QuT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICAgICAgTG9uZ2l0dWRlOiB0aGlzLnJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBSYWRpdXM6IDEwMDAwMFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIFNlbGVjdGVkR2VvSGF6YXJkczogW0dlb0hhemFyZC5Tbm93XSxcclxuICAgICAgICAgIFNlbGVjdGVkUmVnaXN0cmF0aW9uVHlwZXM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIElkOiBSZWdpc3RyYXRpb25UaWQuU25vd1Byb2ZpbGUyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgbWFwKChyZXN1bHQpID0+IHRoaXMuZ2V0TGF5ZXJzRnJvbVNlYXJjaFJlc3VsdChyZXN1bHQpKSxcclxuICAgICAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZWxlY3RMYXllcihpdGVtOiB7XHJcbiAgICBpZDogbnVtYmVyO1xyXG4gICAgZGF0ZTogc3RyaW5nO1xyXG4gICAgbGF5ZXJzOiBTdHJhdFByb2ZpbGVMYXllclZpZXdNb2RlbFtdO1xyXG4gIH0pIHtcclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIpIHtcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSkge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUgPSB7fTtcclxuICAgIH1cclxuICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgPSBpdGVtLmxheWVycztcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRMYXllcnNGcm9tU2VhcmNoUmVzdWx0KFxyXG4gICAgcmVzdWx0OiBSZWdpc3RyYXRpb25WaWV3TW9kZWxbXVxyXG4gICk6IHsgaWQ6IG51bWJlcjsgZGF0ZTogc3RyaW5nOyBsYXllcnM6IFN0cmF0UHJvZmlsZUxheWVyVmlld01vZGVsW10gfVtdIHtcclxuICAgIHJldHVybiByZXN1bHRcclxuICAgICAgLm1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMiAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICByZWcuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICByZWcuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgIHJlZy5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycyAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA+IDBcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkOiByZWcuUmVnSWQsXHJcbiAgICAgICAgICAgIGRhdGU6IHJlZy5EdE9ic1RpbWUsXHJcbiAgICAgICAgICAgIGxheWVyczogcmVnLlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcigoeCkgPT4geCAhPT0gbnVsbCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlIH0gZnJvbSAnLi9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1N0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlRJVExFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGZvcm0gKG5nU3VibWl0KT1cIm9rKClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIiBjbGFzcz1cImlvbi1uby1tYXJnaW5cIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTEFZRVInIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJsYXllci5UaGlja25lc3NcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlRISUNLTkVTU1wiXHJcbiAgICAgICAgW21pbl09XCIwXCIgc3VmZml4PVwiY21cIiBbZGVjaW1hbFBsYWNlc109XCIyXCIgW2NvbnZlcnRSYXRpb109XCIxMDBcIj5cclxuICAgICAgPC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuSEFSRE5FU1NcIiBrZHZLZXk9XCJTbm93X0hhcmRuZXNzS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJsYXllci5IYXJkbmVzc1RJRFwiIFtmaWx0ZXJdPVwiaGFyZG5lc3NGaWx0ZXJcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5HUkFJTl9GT1JNXCIga2R2S2V5PVwiU25vd19HcmFpbkZvcm1LRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImxheWVyLkdyYWluRm9ybVByaW1hcnlUSURcIiBbZmlsdGVyXT1cImdyYWluRm9ybUZpbHRlclwiIFtnZXRJY29uRnVuY109XCJnZXRJY29uRnVuY1wiPlxyXG4gICAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8aW9uLWl0ZW0+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuU0laRScgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImxheWVyLkdyYWluU2l6ZUF2Z1wiIFtvcHRpb25zXT1cImdyYWluU2l6ZU9wdGlvbnNcIlxyXG4gICAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5TSVpFXCI+XHJcbiAgICAgICAgPC9hcHAtc2VsZWN0PlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5XRVRORVNTXCIga2R2S2V5PVwiU25vd19XZXRuZXNzS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJsYXllci5XZXRuZXNzVElEXCIgW2ZpbHRlcl09XCJ3ZXRuZXNzRmlsdGVyXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gICAgPGlvbi1idXR0b24gKGNsaWNrKT1cInRvZ2dsZVNob3dNb3JlKClcIiBmaWxsPVwiY2xlYXJcIiBleHBhbmQ9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBbbmFtZV09XCJzaG93TW9yZSA/ICdjaGV2cm9uLXVwJyA6ICdjaGV2cm9uLWRvd24nXCI+PC9pb24taWNvbj5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNob3dNb3JlXCI+e3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlNIT1dfTEVTUycgfCB0cmFuc2xhdGUgIH19XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXNob3dNb3JlXCI+e3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlNIT1dfTU9SRScgfCB0cmFuc2xhdGUgIH19XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9pb24tYnV0dG9uPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiICpuZ0lmPVwic2hvd01vcmVcIj5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuSEFSRE5FU1NfQk9UVE9NXCIga2R2S2V5PVwiU25vd19IYXJkbmVzc0tEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwibGF5ZXIuSGFyZG5lc3NCb3R0b21USURcIj5cclxuICAgICAgPC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuR1JBSU5fRlJPTV9TRUNPTkRBUllcIlxyXG4gICAgICAgIGtkdktleT1cIlNub3dfR3JhaW5Gb3JtS0RWXCIgWyh2YWx1ZSldPVwibGF5ZXIuR3JhaW5Gb3JtU2Vjb25kYXJ5VElEXCIgW2dldEljb25GdW5jXT1cImdldEljb25GdW5jXCI+XHJcbiAgICAgIDwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxpb24taXRlbT5cclxuICAgICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5NQVhfR1JBSU5fU0laRScgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8YXBwLXNlbGVjdCBbKHNlbGVjdGVkVmFsdWUpXT1cImxheWVyLkdyYWluU2l6ZUF2Z01heFwiIFtvcHRpb25zXT1cImdyYWluU2l6ZU9wdGlvbnNcIlxyXG4gICAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5NQVhfR1JBSU5fU0laRVwiPlxyXG4gICAgICAgIDwvYXBwLXNlbGVjdD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuQ1JJVElDQUxfTEFZRVJcIiBrZHZLZXk9XCJTbm93X0NyaXRpY2FsTGF5ZXJLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImxheWVyLkNyaXRpY2FsTGF5ZXJUSURcIj5cclxuICAgICAgPC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJESUFMT0dTLkNPTU1FTlRcIiBbKHZhbHVlKV09XCJsYXllci5Db21tZW50XCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiaW5kZXggPT09IDBcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9rKC0xKVwiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImFycm93LWJhY2tcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8aW9uLXRleHQ+e3sgJ0RJQUxPR1MuUFJFVklPVVMnIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkxBWUVSJyB8IHRyYW5zbGF0ZSB8IGxvd2VyY2FzZSB9fSA8L2lvbi10ZXh0PlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgICA8aW9uLWNvbCBzaXplPVwiNlwiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cIiFjYW5Hb05leHRcIiBleHBhbmQ9XCJibG9ja1wiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cIm9rKDEpXCI+XHJcbiAgICAgICAgICAgIDxpb24taWNvbiBzbG90PVwiZW5kXCIgbmFtZT1cImFycm93LWZvcndhcmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8aW9uLXRleHQ+e3sgJ0RJQUxPR1MuTkVYVCcgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTEFZRVInIHwgdHJhbnNsYXRlIHwgbG93ZXJjYXNlIH19PC9pb24tdGV4dD5cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3c+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjEyXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZXhwYW5kPVwiYmxvY2tcIiBmaWxsPVwic29saWRcIiBjb2xvcj1cInByaW1hcnlcIj5cclxuICAgICAgICAgICAge3sgJ0RJQUxPR1MuT0tfQkFDSycgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgICAgPGlvbi1yb3cgKm5nSWY9XCIhYWRkTmV3XCI+XHJcbiAgICAgICAgPGlvbi1jb2wgc2l6ZT1cIjZcIiBvZmZzZXQ9XCIzXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiZGVsZXRlKClcIiBzaXplPVwic21hbGxcIiBmaWxsPVwiY2xlYXJcIiBleHBhbmQ9XCJibG9ja1wiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInRyYXNoXCI+PC9pb24taWNvbj5cclxuICAgICAgICAgICAge3sgJ0RJQUxPR1MuREVMRVRFJyB8IHRyYW5zbGF0ZSB9fVxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgPC9pb24tZ3JpZD5cclxuICA8L2Zvcm0+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHtcclxuICBTdHJhdFByb2ZpbGVMYXllckVkaXRNb2RlbCxcclxuICBLZHZFbGVtZW50XHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnY2xvbmUtZGVlcCc7XHJcblxyXG5jb25zdCBiYXNpY0hhcmRuZXNzVmFsdWVzID0gWzIsIDYsIDEwLCAxNCwgMTgsIDIxXTtcclxuY29uc3QgYmFzaWNHcmFpbkZvcm1WYWx1ZXMgPSBbMSwgMTQsIDE3LCAyMiwgMjYsIDMyLCAzNiwgNDAsIDQxXTtcclxuY29uc3QgYmFzaWNXZXRuZXNzVmFsdWVzID0gWzEsIDMsIDUsIDcsIDldO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbGF5ZXI6IFN0cmF0UHJvZmlsZUxheWVyRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIHJlZzogSVJlZ2lzdHJhdGlvbjtcclxuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xyXG5cclxuICBhZGROZXc6IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBpbml0aWFsUmVnaXN0YXRpb25TdGF0ZTogSVJlZ2lzdHJhdGlvbjtcclxuXHJcbiAgZ3JhaW5TaXplSW50ZXJmYWNlT3B0aW9uczogYW55O1xyXG4gIHNob3dNb3JlID0gZmFsc2U7XHJcbiAgaGFyZG5lc3NGaWx0ZXI6IChpZDogbnVtYmVyKSA9PiBib29sZWFuO1xyXG4gIGdyYWluRm9ybUZpbHRlcjogKGlkOiBudW1iZXIpID0+IGJvb2xlYW47XHJcbiAgd2V0bmVzc0ZpbHRlcjogKGlkOiBudW1iZXIpID0+IGJvb2xlYW47XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldCBsYXllckxlbmdodCgpIHtcclxuICAgIHJldHVybiB0aGlzLmhhc0xheWVyc1xyXG4gICAgICA/IHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMubGVuZ3RoXHJcbiAgICAgIDogMDtcclxuICB9XHJcblxyXG4gIGdldCBjYW5Hb05leHQoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAodGhpcy5oYXNMYXllcnMgJiYgdGhpcy5pbmRleCA8IHRoaXMubGF5ZXJMZW5naHQpIHx8XHJcbiAgICAgICh0aGlzLmluZGV4ID09PSB0aGlzLmxheWVyTGVuZ2h0ICYmXHJcbiAgICAgICAgdGhpcy5hZGROZXcgJiZcclxuICAgICAgICAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMubGF5ZXIpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdyYWluU2l6ZU9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgeyBpZDogMC4wMDEsIHRleHQ6ICcuMScgfSxcclxuICAgIHsgaWQ6IDAuMDAzLCB0ZXh0OiAnLjMnIH0sXHJcbiAgICB7IGlkOiAwLjAwNSwgdGV4dDogJy41JyB9LFxyXG4gICAgeyBpZDogMC4wMDcsIHRleHQ6ICcuNycgfSxcclxuICAgIHsgaWQ6IDAuMDEsIHRleHQ6ICcxJyB9LFxyXG4gICAgeyBpZDogMC4wMTUsIHRleHQ6ICcxLjUnIH0sXHJcbiAgICB7IGlkOiAwLjAyLCB0ZXh0OiAnMicgfSxcclxuICAgIHsgaWQ6IDAuMDI1LCB0ZXh0OiAnMi41JyB9LFxyXG4gICAgeyBpZDogMC4wMywgdGV4dDogJzMnIH0sXHJcbiAgICB7IGlkOiAwLjAzNSwgdGV4dDogJzMuNScgfSxcclxuICAgIHsgaWQ6IDAuMDQsIHRleHQ6ICc0JyB9LFxyXG4gICAgeyBpZDogMC4wNDUsIHRleHQ6ICc0LjUnIH0sXHJcbiAgICB7IGlkOiAwLjA1LCB0ZXh0OiAnNScgfSxcclxuICAgIHsgaWQ6IDAuMDU1LCB0ZXh0OiAnNS41JyB9LFxyXG4gICAgeyBpZDogMC4wNiwgdGV4dDogJzYnIH0sXHJcbiAgICB7IGlkOiAwLjA4LCB0ZXh0OiAnOCcgfSxcclxuICAgIHsgaWQ6IDAuMSwgdGV4dDogJzEwJyB9XHJcbiAgXTtcclxuXHJcbiAgZ2V0SWNvbkZ1bmMgPSAoa2R2RWxlbWVudDogS2R2RWxlbWVudCkgPT5cclxuICAgIGBtZC1ncmFpbmZvcm0tJHsoKGtkdkVsZW1lbnQgfHwge30pLk5hbWUgfHwgJycpLnRvTG93ZXJDYXNlKCl9YDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbFJlZ2lzdGF0aW9uU3RhdGUgPSBjbG9uZURlZXAodGhpcy5yZWcpO1xyXG4gICAgdGhpcy5pbml0TGF5ZXIoKTtcclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KCdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5TSVpFJylcclxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ncmFpblNpemVJbnRlcmZhY2VPcHRpb25zID0ge1xyXG4gICAgICAgICAgaGVhZGVyOiB2YWxcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExheWVyKCkge1xyXG4gICAgdGhpcy5hZGROZXcgPSB0aGlzLmxheWVyID09PSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodGhpcy5hZGROZXcpIHtcclxuICAgICAgdGhpcy5sYXllciA9IHt9O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaG93TW9yZSA9IHRoaXMuaGFzQW55QWR2YW5jZWRPcHRpb25zKCk7XHJcbiAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzQW55QWR2YW5jZWRPcHRpb25zKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5sYXllci5IYXJkbmVzc0JvdHRvbVRJRCA+IDAgfHxcclxuICAgICAgdGhpcy5sYXllci5HcmFpblNpemVBdmdNYXggPiAwIHx8XHJcbiAgICAgIHRoaXMubGF5ZXIuR3JhaW5Gb3JtU2Vjb25kYXJ5VElEID4gMCB8fFxyXG4gICAgICB0aGlzLmxheWVyLkNyaXRpY2FsTGF5ZXJUSUQgPiAwIHx8XHJcbiAgICAgICEhdGhpcy5sYXllci5Db21tZW50XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZSgpIHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb2soZ290b0luZGV4PzogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSkge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUgPSB7fTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVycykge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5hZGROZXcgJiYgIUlzRW1wdHlIZWxwZXIuaXNFbXB0eSh0aGlzLmxheWVyKSkge1xyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLnNwbGljZShcclxuICAgICAgICB0aGlzLmluZGV4LFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgdGhpcy5sYXllclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKCk7XHJcblxyXG4gICAgaWYgKGdvdG9JbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICsgZ290b0luZGV4O1xyXG4gICAgICB0aGlzLmxheWVyID0gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlLkxheWVyc1tcclxuICAgICAgICB0aGlzLmluZGV4XHJcbiAgICAgIF07XHJcbiAgICAgIHRoaXMuaW5pdExheWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBjYW5jZWwoKSB7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKFxyXG4gICAgICB0aGlzLmluaXRpYWxSZWdpc3RhdGlvblN0YXRlXHJcbiAgICApO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZSAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMgPSB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLmZpbHRlcihcclxuICAgICAgICAobCkgPT4gbCAhPT0gdGhpcy5sYXllclxyXG4gICAgICApO1xyXG4gICAgICBhd2FpdCB0aGlzLnNhdmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZVNob3dNb3JlKCkge1xyXG4gICAgdGhpcy5zaG93TW9yZSA9ICF0aGlzLnNob3dNb3JlO1xyXG4gICAgdGhpcy51cGRhdGVGaWx0ZXJzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUZpbHRlcnMoKSB7XHJcbiAgICB0aGlzLnNldEhhcmRuZXNzRmlsdGVyKCk7XHJcbiAgICB0aGlzLnNldEdyYWluRm9ybUZpbHRlcigpO1xyXG4gICAgdGhpcy5zZXRXZXRuZXNzRmlsdGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEhhcmRuZXNzRmlsdGVyKCkge1xyXG4gICAgdGhpcy5oYXJkbmVzc0ZpbHRlciA9IHRoaXMuc2hvd01vcmVcclxuICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgOiAobikgPT4gYmFzaWNIYXJkbmVzc1ZhbHVlcy5pbmRleE9mKG4pID49IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEdyYWluRm9ybUZpbHRlcigpIHtcclxuICAgIHRoaXMuZ3JhaW5Gb3JtRmlsdGVyID0gdGhpcy5zaG93TW9yZVxyXG4gICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICA6IChuKSA9PiBiYXNpY0dyYWluRm9ybVZhbHVlcy5pbmRleE9mKG4pID49IDA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFdldG5lc3NGaWx0ZXIoKSB7XHJcbiAgICB0aGlzLndldG5lc3NGaWx0ZXIgPSB0aGlzLnNob3dNb3JlXHJcbiAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgIDogKG4pID0+IGJhc2ljV2V0bmVzc1ZhbHVlcy5pbmRleE9mKG4pID49IDA7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZU1vZGFsUGFnZSB9IGZyb20gJy4vc3RyYXQtcHJvZmlsZS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC9zdHJhdC1wcm9maWxlLWxheWVyLWhpc3RvcnktbW9kYWwubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIFN0cmF0UHJvZmlsZUxheWVyTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgU3RyYXRQcm9maWxlTGF5ZXJIaXN0b3J5TW9kYWxQYWdlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTdHJhdFByb2ZpbGVNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1N0cmF0UHJvZmlsZU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFN0cmF0UHJvZmlsZU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudD5cclxuICA8Zm9ybSAobmdTdWJtaXQpPVwib2soKVwiPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5GUk9NX09USEVSX1BST0ZJTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiZ2V0UHJldm91c1VzZWRMYXllcnMoKVwiIChrZXl1cC5lbnRlcik9XCJnZXRQcmV2b3VzVXNlZExheWVycygpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwiZGFya1wiIG5hbWU9XCJjbG91ZC1kb3dubG9hZFwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5PVEhFUl9QUk9GSUxFX0lURU1fVEVYVCcgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtLWRpdmlkZXI+XHJcbiAgICAgICAgPGlvbi1sYWJlbCBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLk9USEVSX1BST0ZJTEVfREVTQ1JJUFRJT04nIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0tZGl2aWRlcj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYXllcnMgZWxzZSBub0xheWVyc1wiPlxyXG4gICAgICAgIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkTGF5ZXJUb3AoKVwiIChrZXl1cC5lbnRlcik9XCJhZGRMYXllclRvcCgpXCI+XHJcbiAgICAgICAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkFERF9MQVlFUl9UT1AnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDxpb24tcmVvcmRlci1ncm91cCBkaXNhYmxlZD1cImZhbHNlXCIgKGlvbkl0ZW1SZW9yZGVyKT1cIm9uTGF5ZXJSZW9yZGVyKCRldmVudClcIj5cclxuICAgICAgICAgIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkT3JFZGl0TGF5ZXIoaSwgbGF5ZXIpXCIgKGtleXVwLmVudGVyKT1cImFkZE9yRWRpdExheWVyKGksIGxheWVyKVwiXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBsYXllciBvZiBwcm9maWxlLkxheWVyczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgICA8aW9uLWxhYmVsIFtjb2xvcl09XCJsYXllci5Dcml0aWNhbExheWVyVElEID4gMCA/ICdkYW5nZXInIDogJ2RhcmsnXCI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLlRoaWNrbmVzcyAhPT0gdW5kZWZpbmVkXCI+XHJcbiAgICAgICAgICAgICAgICB7e2xheWVyLlRoaWNrbmVzcyB8IG1ldGVyc1RvQ219fWNtXHJcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLkhhcmRuZXNzVElEICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAgICAgIHt7bGF5ZXIuSGFyZG5lc3NUSUQgfCBrZHZEZXNjcmlwdGlvbjogJ1Nub3dfSGFyZG5lc3NLRFYnIHwgYXN5bmN9fVxyXG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsYXllci5HcmFpbkZvcm1QcmltYXJ5VElEICE9PSB1bmRlZmluZWRcIj5cclxuICAgICAgICAgICAgICAgIHt7bGF5ZXIuR3JhaW5Gb3JtUHJpbWFyeVRJRCB8IGtkdkRlc2NyaXB0aW9uOiAnU25vd19HcmFpbkZvcm1LRFYnIHwgYXN5bmN9fVxyXG4gICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJsYXllci5HcmFpblNpemVBdmcgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5HcmFpblNpemVBdmcgKiAxMDAgfCBudW1iZXI6JzEuMC0yJyB9fW1tXHJcbiAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxheWVyLldldG5lc3NUSUQgIT09IHVuZGVmaW5lZFwiPlxyXG4gICAgICAgICAgICAgICAge3tsYXllci5XZXRuZXNzVElEIHwga2R2RGVzY3JpcHRpb246ICdTbm93X1dldG5lc3NLRFYnIHwgYXN5bmMgfX1cclxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgICAgICAgIDxpb24tcmVvcmRlciBzbG90PVwiZW5kXCI+PC9pb24tcmVvcmRlcj5cclxuICAgICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgICAgPC9pb24tcmVvcmRlci1ncm91cD5cclxuICAgICAgICA8aW9uLWl0ZW0gdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cImFkZExheWVyQm90dG9tKClcIiAoa2V5dXAuZW50ZXIpPVwiYWRkTGF5ZXJCb3R0b20oKVwiPlxyXG4gICAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1RSQVRfUFJPRklMRS5BRERfTEFZRVJfQk9UVE9NJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNMYXllcnNcIj5cclxuICAgICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNVTU1BUlknIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICAgIDxpb24taXRlbT5cclxuICAgICAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLlRPVEFMX1RISUNLTkVTUydcclxuICAgICAgICAgICAgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi10ZXh0IGNsYXNzPVwiaW9uLWFsaWduLXNlbGYtc3RhcnQgaW9uLXRleHQtd3JhcCBpb24tbWFyZ2luLWJvdHRvbVwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImlvbi1uby1tYXJnaW5cIiAqbmdJZj1cInRvdGFsVGhpY2tuZXNzICE9PSB1bmRlZmluZWRcIj57eyB0b3RhbFRoaWNrbmVzcyB8IG1ldGVyc1RvQ20gfX0gY208L3A+XHJcbiAgICAgICAgICA8L2lvbi10ZXh0PlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIHNpemU9XCI2XCIgb2Zmc2V0PVwiM1wiPlxyXG4gICAgICAgICAgPGlvbi1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGV4cGFuZD1cImJsb2NrXCIgZmlsbD1cInNvbGlkXCIgY29sb3I9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgIHt7J0RJQUxPR1MuT0snIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgICAgICA8L2lvbi1jb2w+XHJcbiAgICAgIDwvaW9uLXJvdz5cclxuICAgIDwvaW9uLWdyaWQ+XHJcbiAgPC9mb3JtPlxyXG48L2lvbi1jb250ZW50PlxyXG48bmctdGVtcGxhdGUgI25vTGF5ZXJzPlxyXG4gIDxpb24taXRlbSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwiYWRkTGF5ZXJCb3R0b20oKVwiIChrZXl1cC5lbnRlcik9XCJhZGRMYXllckJvdHRvbSgpXCI+XHJcbiAgICA8aW9uLWljb24gY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkFERF9MQVlFUicgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3ksIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7XHJcbiAgU3RyYXRQcm9maWxlRWRpdE1vZGVsLFxyXG4gIFN0cmF0UHJvZmlsZUxheWVyRWRpdE1vZGVsXHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSB9IGZyb20gJy4uL3N0cmF0LXByb2ZpbGUtbGF5ZXItbW9kYWwvc3RyYXQtcHJvZmlsZS1sYXllci1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSXRlbVJlb3JkZXJFdmVudERldGFpbCB9IGZyb20gJ0Bpb25pYy9jb3JlJztcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvYXJyYXktaGVscGVyJztcclxuaW1wb3J0IHsgU3RyYXRQcm9maWxlTGF5ZXJIaXN0b3J5TW9kYWxQYWdlIH0gZnJvbSAnLi4vc3RyYXQtcHJvZmlsZS1sYXllci1oaXN0b3J5LW1vZGFsL3N0cmF0LXByb2ZpbGUtbGF5ZXItaGlzdG9yeS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdjbG9uZS1kZWVwJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3RyYXQtcHJvZmlsZS1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3N0cmF0LXByb2ZpbGUtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdHJhdC1wcm9maWxlLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgcmVnSWQ6IHN0cmluZztcclxuXHJcbiAgcmVnOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICBwcml2YXRlIHJlZ0luaXRDbG9uZTogSVJlZ2lzdHJhdGlvbjtcclxuICB0b3RhbFRoaWNrbmVzczogbnVtYmVyO1xyXG5cclxuICBwcml2YXRlIG5nRGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBwcml2YXRlIGxheWVyTW9kYWw6IEhUTUxJb25Nb2RhbEVsZW1lbnQ7XHJcblxyXG4gIGdldCBoYXNMYXllcnMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlLkxheWVycyAmJiB0aGlzLnByb2ZpbGUuTGF5ZXJzLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBnZXQgcHJvZmlsZSgpOiBTdHJhdFByb2ZpbGVFZGl0TW9kZWwge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZyAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge307XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICAgICAuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQodGhpcy5yZWdJZClcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubmdEZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHJlZykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMucmVnSW5pdENsb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnSW5pdENsb25lID0gY2xvbmVEZWVwKHJlZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnJlZyA9IHJlZztcclxuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nRGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvaygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY2FuY2VsKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ0luaXRDbG9uZSk7IC8vIFJlc2V0IHRvIGluaXRhbCBzdGF0ZVxyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gIH1cclxuXHJcbiAgYWRkTGF5ZXJUb3AoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZE9yRWRpdExheWVyKDAsIHVuZGVmaW5lZCk7XHJcbiAgfVxyXG5cclxuICBhZGRMYXllckJvdHRvbSgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkT3JFZGl0TGF5ZXIoXHJcbiAgICAgIHRoaXMuaGFzTGF5ZXJzXHJcbiAgICAgICAgPyB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzLmxlbmd0aFxyXG4gICAgICAgIDogMCxcclxuICAgICAgdW5kZWZpbmVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgb25MYXllclJlb3JkZXIoZXZlbnQ6IEN1c3RvbUV2ZW50PEl0ZW1SZW9yZGVyRXZlbnREZXRhaWw+KTogdm9pZCB7XHJcbiAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGUuTGF5ZXJzID0gQXJyYXlIZWxwZXIucmVvcmRlckxpc3QoXHJcbiAgICAgIHRoaXMucmVnLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlN0cmF0UHJvZmlsZS5MYXllcnMsXHJcbiAgICAgIGV2ZW50LmRldGFpbC5mcm9tLFxyXG4gICAgICBldmVudC5kZXRhaWwudG9cclxuICAgICk7XHJcbiAgICBldmVudC5kZXRhaWwuY29tcGxldGUoKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWcpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UHJldm91c1VzZWRMYXllcnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBsb2dnZWRJblVzZXIgPSBhd2FpdCB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlckFzUHJvbWlzZSgpO1xyXG4gICAgaWYgKGxvZ2dlZEluVXNlciAmJiBsb2dnZWRJblVzZXIuaXNMb2dnZWRJbikge1xyXG4gICAgICBpZiAoIXRoaXMubGF5ZXJNb2RhbCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICBjb21wb25lbnQ6IFN0cmF0UHJvZmlsZUxheWVySGlzdG9yeU1vZGFsUGFnZSxcclxuICAgICAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgICAgIHJlZzogdGhpcy5yZWdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMubGF5ZXJNb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgICAgICB0aGlzLmxheWVyTW9kYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVnb2JzQXV0aFNlcnZpY2Uuc2lnbkluKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRMYXllcihpbmRleDogbnVtYmVyLCBsYXllcjogU3RyYXRQcm9maWxlTGF5ZXJFZGl0TW9kZWwpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghdGhpcy5sYXllck1vZGFsKSB7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgY29tcG9uZW50OiBTdHJhdFByb2ZpbGVMYXllck1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgcmVnOiB0aGlzLnJlZyxcclxuICAgICAgICAgIGxheWVyLFxyXG4gICAgICAgICAgaW5kZXhcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxheWVyTW9kYWwucHJlc2VudCgpO1xyXG4gICAgICBhd2FpdCB0aGlzLmxheWVyTW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubGF5ZXJNb2RhbCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbGN1bGF0ZSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxheWVycyA9IHRoaXMucHJvZmlsZS5MYXllcnMgfHwgW107XHJcbiAgICBjb25zdCBzdW0gPSBsYXllcnNcclxuICAgICAgLmZpbHRlcigoeCkgPT4geC5UaGlja25lc3MgIT09IHVuZGVmaW5lZClcclxuICAgICAgLm1hcCgobGF5ZXIpID0+IGxheWVyLlRoaWNrbmVzcylcclxuICAgICAgLnJlZHVjZSgocHYsIGN2KSA9PiBwdiArIGN2LCAwKTtcclxuICAgIHRoaXMudG90YWxUaGlja25lc3MgPSBzdW07XHJcbiAgfVxyXG59XHJcbiIsIjxpb24taXRlbSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInN1bW1hcnktaXRlbVwiIChjbGljayk9XCJvcGVuTW9kYWwoKVwiIChrZXl1cC5lbnRlcik9XCJvcGVuTW9kYWwoKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuVElUTEUnIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgPHA+XHJcbiAgICAgIDxpb24tdGV4dCAqbmdJZj1cIiFpc0VtcHR5IGVsc2UgZW1wdHlcIj57e3Byb2ZpbGUuTGF5ZXJzID8gcHJvZmlsZS5MYXllcnMubGVuZ3RoIDogMCB9fVxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9maWxlLkxheWVycy5sZW5ndGggPT09IDEgZWxzZSBtdWx0aXBsZVwiPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuT05FX0xBWUVSJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvaW9uLXRleHQ+XHJcbiAgICA8L3A+XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1pY29uICpuZ0lmPVwiIWlzRW1wdHlcIiBzbG90PVwiZW5kXCIgY29sb3I9XCJzdWNjZXNzXCIgbmFtZT1cImNoZWNrbWFyay1jaXJjbGVcIj48L2lvbi1pY29uPlxyXG48L2lvbi1pdGVtPlxyXG48bmctdGVtcGxhdGUgI2VtcHR5PlxyXG4gIHt7J1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5TVFJBVF9QUk9GSUxFLkVNUFRZJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjbXVsdGlwbGU+XHJcbiAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNUUkFUX1BST0ZJTEUuTVVMVElQTEVfTEFZRVJTJyB8IHRyYW5zbGF0ZX19XHJcbjwvbmctdGVtcGxhdGU+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2UgfSBmcm9tICcuL3N0cmF0LXByb2ZpbGUtbW9kYWwvc3RyYXQtcHJvZmlsZS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zdHJhdC1wcm9maWxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3RyYXQtcHJvZmlsZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc3RyYXQtcHJvZmlsZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTdHJhdFByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJlZzogSVJlZ2lzdHJhdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBtb2RhbDogSFRNTElvbk1vZGFsRWxlbWVudDtcclxuXHJcbiAgZ2V0IHByb2ZpbGUoKTogU3RyYXRQcm9maWxlRWRpdE1vZGVsIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5yZWcgJiZcclxuICAgICAgdGhpcy5yZWcucmVxdWVzdCAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMiAmJlxyXG4gICAgICB0aGlzLnJlZy5yZXF1ZXN0LlNub3dQcm9maWxlMi5TdHJhdFByb2ZpbGVcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gdGhpcy5yZWcucmVxdWVzdC5Tbm93UHJvZmlsZTIuU3RyYXRQcm9maWxlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMucHJvZmlsZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250b2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBhc3luYyBvcGVuTW9kYWwoKSB7XHJcbiAgICBpZiAoIXRoaXMubW9kYWwpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZyk7IC8vIFNhdmUgcmVnaXN0cmF0aW9uIGJlZm9yZSBvcGVuIG1vZGFsIHBhZ2VcclxuICAgICAgdGhpcy5tb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDb250b2xsZXIuY3JlYXRlKHtcclxuICAgICAgICBjb21wb25lbnQ6IFN0cmF0UHJvZmlsZU1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgcmVnSWQ6IHRoaXMucmVnLmlkXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5tb2RhbC5wcmVzZW50KCk7XHJcbiAgICAgIGF3YWl0IHRoaXMubW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubW9kYWwgPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNub3dQcm9maWxlUGFnZSB9IGZyb20gJy4vc25vdy1wcm9maWxlLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgQ29tcHJlc3Npb25UZXN0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU25vd0RlbnNpdHlDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctZGVuc2l0eS9zbm93LWRlbnNpdHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU25vd1RlbXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3Nub3ctdGVtcC9zbm93LXRlbXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU3RyYXRQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9zdHJhdC1wcm9maWxlL3N0cmF0LXByb2ZpbGUuY29tcG9uZW50JztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBTdHJhdFByb2ZpbGVNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3Nub3cvc25vdy1wcm9maWxlL3N0cmF0LXByb2ZpbGUvc3RyYXQtcHJvZmlsZS1tb2RhbC9zdHJhdC1wcm9maWxlLW1vZGFsLm1vZHVsZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3BhZ2VzL21vZGFsLXBhZ2VzL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTbm93VGVtcE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy10ZW1wL3Nub3ctdGVtcC1tb2RhbC9zbm93LXRlbXAtbW9kYWwubW9kdWxlJztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBTbm93RGVuc2l0eU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvc25vdy9zbm93LXByb2ZpbGUvc25vdy1kZW5zaXR5L3Nub3ctZGVuc2l0eS1tb2RhbC9zbm93LWRlbnNpdHktbW9kYWwubW9kdWxlJztcclxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RMaXN0TW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9zbm93L3Nub3ctcHJvZmlsZS9jb21wcmVzc2lvbi10ZXN0L2NvbXByZXNzaW9uLXRlc3QtbGlzdC1tb2RhbC9jb21wcmVzc2lvbi10ZXN0LWxpc3QtbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBTbm93UHJvZmlsZVBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBTdHJhdFByb2ZpbGVNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBTbm93VGVtcE1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFNub3dEZW5zaXR5TW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgQ29tcHJlc3Npb25UZXN0TGlzdE1vZGFsUGFnZU1vZHVsZSxcclxuICAgIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFNub3dQcm9maWxlUGFnZSxcclxuICAgIENvbXByZXNzaW9uVGVzdENvbXBvbmVudCxcclxuICAgIFNub3dEZW5zaXR5Q29tcG9uZW50LFxyXG4gICAgU25vd1RlbXBDb21wb25lbnQsXHJcbiAgICBTdHJhdFByb2ZpbGVDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93UHJvZmlsZVBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMlwiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNVUEVSSU9SJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXllcy1uby1zZWxlY3QgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyLklzUHJvZmlsZVRvR3JvdW5kXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5JU19QUk9GSUxFX1RPX0dST1VORFwiPlxyXG4gICAgICA8L2FwcC15ZXMtbm8tc2VsZWN0PlxyXG4gICAgICA8IS0tIFRPRE86IFRhIGlubiBkZXR0ZSBuw6VyIHZpIGVyIHDDpSBzaXN0ZSB2ZXJzam9uIGF2IEFQSSdldFxyXG4gICAgICAgIGlvbi1pdGVtPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5WQUxJRF9FWFBPU0lUSU9OJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgICAgPGFwcC1zZWxlY3QgWyhzZWxlY3RlZFZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93UHJvZmlsZTIuRXhwb3NpdGlvblwiXHJcbiAgICAgICAgICBbb3B0aW9uc109XCJleHBvc2l0aW9uT3B0aW9uc1wiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlZBTElEX0VYUE9TSVRJT05cIj48L2FwcC1zZWxlY3Q+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5Tbm93UHJvZmlsZTIuU2xvcGVBbmdsZVwiXHJcbiAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNMT1BFX0FOR0xFXCIgW21pbl09XCIwXCIgW21heF09XCI1OVwiIHN1ZmZpeD1cIsKwXCJcclxuICAgICAgcGxhY2Vob2xkZXI9XCJSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU0xPUEVfQU5HTEVfUExBQ0VIT0xERVJcIiBbZGVjaW1hbFBsYWNlc109XCIwXCI+PC9hcHAtbnVtZXJpYy1pbnB1dC0tPlxyXG4gICAgICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIkRJQUxPR1MuQ09NTUVOVFwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5Db21tZW50XCI+XHJcbiAgICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU1VCRk9STVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtc3RyYXQtcHJvZmlsZSBbcmVnXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLXN0cmF0LXByb2ZpbGU+XHJcbiAgICAgIDxhcHAtc25vdy10ZW1wIFtyZWddPVwicmVnaXN0cmF0aW9uXCI+PC9hcHAtc25vdy10ZW1wPlxyXG4gICAgICA8YXBwLXNub3ctZGVuc2l0eSBbcmVnXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLXNub3ctZGVuc2l0eT5cclxuICAgICAgPGFwcC1jb21wcmVzc2lvbi10ZXN0IFtyZWddPVwicmVnaXN0cmF0aW9uXCI+XHJcbiAgICAgIDwvYXBwLWNvbXByZXNzaW9uLXRlc3Q+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlBSRVZJRVcnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24taXRlbSBbZGlzYWJsZWRdPVwiaXNFbXB0eSgpXCIgKGNsaWNrKT1cIm9wZW5QcmV2aWV3KClcIj5cclxuICAgICAgICA8aW9uLWljb24gbmFtZT1cImV5ZVwiIGNvbG9yPVwiZGFya1wiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuUFJFVklFV19JVEVNJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7J1JFR0lTVFJBVElPTi5JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+XHJcbiAgICAgIDwvYXBwLWFkZC1waWN0dXJlLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7XHJcbiAgTW9kYWxDb250cm9sbGVyLFxyXG4gIExvYWRpbmdDb250cm9sbGVyLFxyXG4gIFRvYXN0Q29udHJvbGxlclxyXG59IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vcGFnZXMvbW9kYWwtcGFnZXMvZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBEYXRhVXJsSGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2RhdGEtdXJsLmhlbHBlcic7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9tb2RlbHMvdXNlci1zZXR0aW5ncy5tb2RlbCc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdTbm93UHJvZmlsZVBhZ2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc25vdy1wcm9maWxlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc25vdy1wcm9maWxlLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vc25vdy1wcm9maWxlLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbm93UHJvZmlsZVBhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgZXhwb3NpdGlvbk9wdGlvbnM6IFNlbGVjdE9wdGlvbltdID0gW1xyXG4gICAgeyBpZDogMCwgdGV4dDogJ1JFR0lTVFJBVElPTi5TTk9XLlNOT1dfUFJPRklMRS5OT1JUSCcgfSxcclxuICAgIHsgaWQ6IDEsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuTk9SVEhfRUFTVCcgfSxcclxuICAgIHsgaWQ6IDIsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuRUFTVCcgfSxcclxuICAgIHsgaWQ6IDMsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU09VVEhfRUFTVCcgfSxcclxuICAgIHsgaWQ6IDQsIHRleHQ6ICdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuU09VVEgnIH0sXHJcbiAgICB7IGlkOiA1LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLlNPVVRIX1dFU1QnIH0sXHJcbiAgICB7IGlkOiA2LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLldFU1QnIH0sXHJcbiAgICB7IGlkOiA3LCB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLk5PUlRIX1dFU1QnIH1cclxuICBdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50LFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgbG9hZGluZ0NvbnRyb2xsZXI6IExvYWRpbmdDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0b2FzdENvbnRyb2xsZXI6IFRvYXN0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLlNub3dQcm9maWxlMiwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7fVxyXG5cclxuICBpc0VtcHR5KCkge1xyXG4gICAgY29uc3QgaXNFbXB0eVJlc3VsdCA9XHJcbiAgICAgaXNFbXB0eSh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMikgJiZcclxuICAgICAgISh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkNvbXByZXNzaW9uVGVzdCB8fCBbXSkuc29tZShcclxuICAgICAgICAoY3QpID0+IGN0LkluY2x1ZGVJblNub3dQcm9maWxlID09PSB0cnVlXHJcbiAgICAgICk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlzRW1wdHlSZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb3BlblByZXZpZXcoKSB7XHJcbiAgICB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldCgnUkVHSVNUUkFUSU9OLlNOT1cuU05PV19QUk9GSUxFLkdFTkVSQVRJTkdfUFJFVklFVycpXHJcbiAgICAgIC5zdWJzY3JpYmUoYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCBsb2FkZXIgPSBhd2FpdCB0aGlzLmxvYWRpbmdDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgYmFja2Ryb3BEaXNtaXNzOiB0cnVlIC8vIGVuYWJsZSBjYW5jZWxcclxuICAgICAgICB9KTtcclxuICAgICAgICBhd2FpdCBsb2FkZXIucHJlc2VudCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJTZXR0aW5nID0gYXdhaXQgdGhpcy51c2VyU2V0dGluZ1NlcnZpY2UudXNlclNldHRpbmckXHJcbiAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdCA9IDU7IC8vIE1vYmlsZSBwcm9maWxlIHBsb3RcclxuICAgICAgICBjb25zdCBzaXplID0gNDAwO1xyXG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHRoaXMuZ2V0UGxvdEZyb21BcGlXaXRoRmFsbGJhY2soXHJcbiAgICAgICAgICB1c2VyU2V0dGluZyxcclxuICAgICAgICAgIGZvcm1hdCxcclxuICAgICAgICAgIHNpemVcclxuICAgICAgICApLnN1YnNjcmliZShcclxuICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuSW1hZ2VNb2RhbChyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ0NvbnRyb2xsZXIuZGlzbWlzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dQcmV2aWV3RXJyb3IoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGF3YWl0IGxvYWRlci5vbkRpZERpc21pc3MoKTtcclxuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBsb3RGcm9tQXBpV2l0aEZhbGxiYWNrKFxyXG4gICAgdXNlclNldHRpbmc6IFVzZXJTZXR0aW5nLFxyXG4gICAgZm9ybWF0OiBudW1iZXIsXHJcbiAgICBzaXplOiBudW1iZXJcclxuICApIHtcclxuICAgIHJldHVybiB0aGlzLmdldFBsb3RGcm9tQXBpKHVzZXJTZXR0aW5nLCBmb3JtYXQsIHNpemUpLnBpcGUoXHJcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XHJcbiAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnQ291bGQgbm90IGdlbmVyYXRlIHBsb3QnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IDUpIHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ0ZhbGxiYWNrIHRvIEJhcmVTaW1wbGVQcm9maWxlJywgREVCVUdfVEFHKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmdldFBsb3RGcm9tQXBpKHVzZXJTZXR0aW5nLCA0LCBzaXplKTsgLy8gZmFsbGJhY2sgdG8gQmFyZVNpbXBsZVByb2ZpbGUgd2hlbiBtb2JpbGUgcGxvdCBmYWlsZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9mKG51bGwpO1xyXG4gICAgICB9KSxcclxuICAgICAgc3dpdGNoTWFwKChyZXN1bHQpID0+IGZyb20oRGF0YVVybEhlbHBlci50b0RhdGFVcmwocmVzdWx0LCAnaW1hZ2UvcG5nJykpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0UGxvdEZyb21BcGkoXHJcbiAgICB1c2VyU2V0dGluZzogVXNlclNldHRpbmcsXHJcbiAgICBmb3JtYXQ6IG51bWJlcixcclxuICAgIHNpemU6IG51bWJlclxyXG4gICkge1xyXG4gICAgY29uc3Qgcm9vdFVybCA9IHNldHRpbmdzLnNlcnZpY2VzLnJlZ09icy5hcGlVcmxbdXNlclNldHRpbmcuYXBwTW9kZV07XHJcbiAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QoXHJcbiAgICAgIGAke3Jvb3RVcmx9L1JlZ2lzdHJhdGlvbi9QbG90UHJldmlld1BuZz9mb3JtYXQ9JHtmb3JtYXR9YCArXHJcbiAgICAgICAgYCZoZWlnaHQ9JHtzaXplfSZ3aWR0aD0ke3NpemV9JmxhbmdLZXk9JHt1c2VyU2V0dGluZy5sYW5ndWFnZX1gLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LFxyXG4gICAgICB7XHJcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYmxvYidcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzQW55VGVtcExheWVycygpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuU25vd1Byb2ZpbGUyLlNub3dUZW1wLkxheWVycyAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LlNub3dQcm9maWxlMi5Tbm93VGVtcC5MYXllcnMuc29tZShcclxuICAgICAgICAoeCkgPT4geC5Tbm93VGVtcCA8IDBcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgc2hvd1ByZXZpZXdFcnJvcigpIHtcclxuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KCdSRUdJU1RSQVRJT04uU05PVy5TTk9XX1BST0ZJTEUuUFJFVklFV19FUlJPUicpXHJcbiAgICAgIC5zdWJzY3JpYmUoYXN5bmMgKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zdCB0b2FzdCA9IGF3YWl0IHRoaXMudG9hc3RDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgICAgbW9kZTogJ21kJyxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdG9hc3QucHJlc2VudCgpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgb3BlbkltYWdlTW9kYWwoc3JjOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgY29tcG9uZW50OiBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2UsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7XHJcbiAgICAgICAgaW1nU3JjOiBzcmNcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBJb25pY01vZHVsZSB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlIH0gZnJvbSAnLi9mdWxsc2NyZWVuLWltYWdlLW1vZGFsLnBhZ2UnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJb25pY01vZHVsZSwgRm9ybXNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiJdfQ==