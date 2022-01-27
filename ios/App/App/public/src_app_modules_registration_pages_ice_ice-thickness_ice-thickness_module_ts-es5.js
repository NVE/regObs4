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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_ice_ice-thickness_ice-thickness_module_ts"], {
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
    57748: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IceLayerPageModule": function IceLayerPageModule() {
          return (
            /* binding */
            _IceLayerPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../shared-components.module */
      22623);
      /* harmony import */


      var _ice_layer_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./ice-layer.page */
      75913);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _IceLayerPageModule = function _IceLayerPageModule() {
        _classCallCheck(this, _IceLayerPageModule);
      };

      _IceLayerPageModule.ɵfac = function IceLayerPageModule_Factory(t) {
        return new (t || _IceLayerPageModule)();
      };

      _IceLayerPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _IceLayerPageModule
      });
      _IceLayerPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_IceLayerPageModule, {
          declarations: [_ice_layer_page__WEBPACK_IMPORTED_MODULE_1__.IceLayerPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    75913: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IceLayerPage": function IceLayerPage() {
          return (
            /* binding */
            _IceLayerPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../components/numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _IceLayerPage = /*#__PURE__*/function () {
        function _IceLayerPage(modalController, ngZone) {
          _classCallCheck(this, _IceLayerPage);

          this.modalController = modalController;
          this.ngZone = ngZone;
          this.isNew = false;
        }

        _createClass(_IceLayerPage, [{
          key: "isValid",
          get: function get() {
            return this.layerCopy.IceLayerThickness !== undefined;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            if (!this.iceThicknessLayer) {
              this.layerCopy = {};
              this.isNew = true;
            } else {
              this.layerCopy = Object.assign({}, this.iceThicknessLayer);
            }
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.modalController.dismiss(this.layerCopy);
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.modalController.dismiss({
              "delete": true
            });
          }
        }]);

        return _IceLayerPage;
      }();

      _IceLayerPage.ɵfac = function IceLayerPage_Factory(t) {
        return new (t || _IceLayerPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
      };

      _IceLayerPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _IceLayerPage,
        selectors: [["app-ice-layer"]],
        inputs: {
          iceThicknessLayer: "iceThicknessLayer"
        },
        decls: 19,
        vars: 20,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["lines", "full"], ["kdvKey", "Ice_IceLayerKDV", 3, "title", "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_LAYER_THICKNESS", "suffix", "cm", "placeholder", "REGISTRATION.SNOW.WEATHER.AIR_TEMPERATURE_PLACEHOLDER", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], [3, "saveDisabled", "showDelete", "saveClicked", "deleteClicked"]],
        template: function IceLayerPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function IceLayerPage_Template_ion_button_click_3_listener() {
              return ctx.cancel();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-list", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-list-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "app-kdv-select", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueChange", function IceLayerPage_Template_app_kdv_select_valueChange_15_listener($event) {
              return ctx.layerCopy.IceLayerTID = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "app-numeric-input", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("valueChange", function IceLayerPage_Template_app_numeric_input_valueChange_17_listener($event) {
              return ctx.layerCopy.IceLayerThickness = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "app-modal-save-or-delete-buttons", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("saveClicked", function IceLayerPage_Template_app_modal_save_or_delete_buttons_saveClicked_18_listener() {
              return ctx.ok();
            })("deleteClicked", function IceLayerPage_Template_app_modal_save_or_delete_buttons_deleteClicked_18_listener() {
              return ctx["delete"]();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 12, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 14, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 16, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER_TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("title", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 18, "REGISTRATION.ICE.ICE_THICKNESS.ICE_TYPE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.layerCopy.IceLayerTID);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("value", ctx.layerCopy.IceLayerThickness)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("saveDisabled", !ctx.isValid)("showDelete", !ctx.isNew);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_1__.KdvSelectComponent, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_2__.NumericInputComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__.ModalSaveOrDeleteButtonsComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY2UtbGF5ZXIucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    43747: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IceThicknessPageModule": function IceThicknessPageModule() {
          return (
            /* binding */
            _IceThicknessPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./ice-thickness.page */
      28680);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./ice-layer/ice-layer.module */
      57748);
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
        component: _ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__.IceThicknessPage,
        canDeactivate: [_can_deactivate_route_guard__WEBPACK_IMPORTED_MODULE_3__.CanDeactivateRouteGuard]
      }];

      var _IceThicknessPageModule = function _IceThicknessPageModule() {
        _classCallCheck(this, _IceThicknessPageModule);
      };

      _IceThicknessPageModule.ɵfac = function IceThicknessPageModule_Factory(t) {
        return new (t || _IceThicknessPageModule)();
      };

      _IceThicknessPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _IceThicknessPageModule
      });
      _IceThicknessPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__.IceLayerPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_IceThicknessPageModule, {
          declarations: [_ice_thickness_page__WEBPACK_IMPORTED_MODULE_0__.IceThicknessPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _ice_layer_ice_layer_module__WEBPACK_IMPORTED_MODULE_2__.IceLayerPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    28680: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IceThicknessPage": function IceThicknessPage() {
          return (
            /* binding */
            _IceThicknessPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var _ice_layer_ice_layer_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./ice-layer/ice-layer.page */
      75913);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../core/helpers/number-helper */
      27714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/numeric-input/numeric-input.component */
      24857);
      /* harmony import */


      var _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../components/yes-no-select/yes-no-select.component */
      99736);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../../../pipes/kdv-description.pipe */
      46862);
      /* harmony import */


      var _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../../../pipes/meters-to-cm.pipe */
      50795);

      function IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-item", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r7);

            var i_r5 = restoredCtx.index;

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);

            return ctx_r6.addOrEditThicknessLayer(i_r5);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](3, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](4, "kdvDescription");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "metersToCm");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "ion-reorder", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var layer_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](3, 2, _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](4, 4, layer_r4.IceLayerTID, "Ice_IceLayerKDV")), " - ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](5, 7, layer_r4.IceLayerThickness), " cm");
        }
      }

      function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-numeric-input", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template_app_numeric_input_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);

            return ctx_r8.registration.request.IceThickness.IceHeightBefore = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r2.registration.request.IceThickness.IceHeightBefore)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
        }
      }

      function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-numeric-input", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template_app_numeric_input_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r11);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);

            return ctx_r10.registration.request.IceThickness.IceHeightAfter = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r3.registration.request.IceThickness.IceHeightAfter)("title", ctx_r3.iceHeightAfter === true ? "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT" : "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_AFTER_NO")("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);
        }
      }

      function IceThicknessPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("reset", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r12.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "app-numeric-input", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r14.registration.request.IceThickness.SnowDepth = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "app-numeric-input", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r15.registration.request.IceThickness.SlushSnow = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "ion-list-header", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](5, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "ion-reorder-group", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ionItemReorder", function IceThicknessPage_app_registration_content_wrapper_8_Template_ion_reorder_group_ionItemReorder_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r16.onIceThicknessReorder($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](9, IceThicknessPage_app_registration_content_wrapper_8_ion_item_9_Template, 7, 9, "ion-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "ion-item", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function IceThicknessPage_app_registration_content_wrapper_8_Template_ion_item_click_10_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r17.addOrEditThicknessLayer();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](11, "ion-icon", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](14, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](15, "app-numeric-input", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_numeric_input_valueChange_15_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r18.registration.request.IceThickness.IceThicknessSum = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "app-yes-no-select", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r19.iceHeightBefore = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](17, IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_17_Template, 1, 5, "app-numeric-input", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "app-yes-no-select", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_yes_no_select_valueChange_18_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r20.iceHeightAfter = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](19, IceThicknessPage_app_registration_content_wrapper_8_app_numeric_input_19_Template, 1, 6, "app-numeric-input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](20, "ion-list-header", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](21, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](22);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](23, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](24, "app-text-comment", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("valueChange", function IceThicknessPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r13);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

            return ctx_r21.registration.request.IceThickness.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](25, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](26, "ion-list-header", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](27, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](28);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](29, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](30, "app-add-picture-item", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.SnowDepth)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.SlushSnow)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](7, 33, "REGISTRATION.ICE.ICE_THICKNESS.ICE_LAYER"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.IceThickness.IceThicknessLayers);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](14, 35, "REGISTRATION.ICE.ICE_THICKNESS.ADD_ICE_LAYER"));

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("readonly", true)("value", ctx_r0.registration.request.IceThickness.IceThicknessSum)("min", 0)("max", 999)("decimalPlaces", 2)("convertRatio", 100);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.iceHeightBefore);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.iceHeightBefore);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.iceHeightAfter);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r0.iceHeightAfter !== undefined);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](23, 37, "REGISTRATION.GENERAL_COMMENT.COMMENT_TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](25, 39, "REGISTRATION.GENERAL_COMMENT.COMMENT_PLACEHOLDER"));

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("value", ctx_r0.registration.request.IceThickness.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](29, 41, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
        }
      }

      var _IceThicknessPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_IceThicknessPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_IceThicknessPage);

        function _IceThicknessPage(basePageService, activatedRoute, modalController, ngZone) {
          var _this8;

          _classCallCheck(this, _IceThicknessPage);

          _this8 = _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.IceThickness, basePageService, activatedRoute);
          _this8.modalController = modalController;
          _this8.ngZone = ngZone;
          _this8.iceHeightBefore = undefined;
          _this8.iceHeightAfter = undefined;
          return _this8;
        }

        _createClass(_IceThicknessPage, [{
          key: "onInit",
          value: function onInit() {
            if (!this.registration.request.IceThickness.IceThicknessLayers) {
              this.registration.request.IceThickness.IceThicknessLayers = [];
            }

            if (this.registration.request.IceThickness.IceHeightBefore < 0) {
              this.registration.request.IceThickness.IceHeightBefore = this.registration.request.IceThickness.IceHeightBefore * -1;
              this.iceHeightBefore = true;
            } else if (this.registration.request.IceThickness.IceHeightBefore === 0) {
              this.iceHeightBefore = false;
            }

            if (this.registration.request.IceThickness.IceHeightAfter > 0) {
              this.iceHeightAfter = false;
            } else if (this.registration.request.IceThickness.IceHeightAfter < 0) {
              this.registration.request.IceThickness.IceHeightAfter = this.registration.request.IceThickness.IceHeightAfter * -1;
              this.iceHeightAfter = true;
            }
          }
        }, {
          key: "onBeforeLeave",
          value: function onBeforeLeave() {
            if (this.registration) {
              if (this.iceHeightBefore !== true) {
                this.registration.request.IceThickness.IceHeightBefore = undefined;
              } else if (this.registration.request.IceThickness.IceHeightBefore > 0) {
                this.registration.request.IceThickness.IceHeightBefore = this.registration.request.IceThickness.IceHeightBefore * -1;
              } else {
                this.registration.request.IceThickness.IceHeightBefore = 0;
              }

              if (this.iceHeightAfter === undefined) {
                this.registration.request.IceThickness.IceHeightAfter = undefined;
              } else if (this.iceHeightAfter === true && _core_helpers_number_helper__WEBPACK_IMPORTED_MODULE_4__.NumberHelper.isNumeric(this.registration.request.IceThickness.IceHeightAfter)) {
                this.registration.request.IceThickness.IceHeightAfter = this.registration.request.IceThickness.IceHeightAfter * -1;
              }
            }
          }
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var isEmptyResult;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid);

                    case 2:
                      _context8.t1 = !_context8.sent;

                      if (!_context8.t1) {
                        _context8.next = 5;
                        break;
                      }

                      _context8.t1 = this.iceHeightAfter === undefined;

                    case 5:
                      _context8.t0 = _context8.t1;

                      if (!_context8.t0) {
                        _context8.next = 8;
                        break;
                      }

                      _context8.t0 = this.iceHeightBefore === undefined;

                    case 8:
                      isEmptyResult = _context8.t0;
                      return _context8.abrupt("return", isEmptyResult);

                    case 10:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "onReset",
          value: function onReset() {
            this.iceHeightAfter = undefined;
            this.iceHeightBefore = undefined;
            this.registration.request.IceThickness.IceThicknessLayers = [];
          }
        }, {
          key: "addOrEditThicknessLayer",
          value: function addOrEditThicknessLayer(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var modal, result, iceThicknessLayerCopy;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.modalController.create({
                        component: _ice_layer_ice_layer_page__WEBPACK_IMPORTED_MODULE_2__.IceLayerPage,
                        componentProps: {
                          iceThicknessLayer: this.registration.request.IceThickness.IceThicknessLayers[index]
                        }
                      });

                    case 2:
                      modal = _context9.sent;
                      modal.present();
                      _context9.next = 6;
                      return modal.onDidDismiss();

                    case 6:
                      result = _context9.sent;

                      if (result.data) {
                        if (result.data["delete"]) {
                          this.removeLayerAtIndex(index);
                        } else {
                          iceThicknessLayerCopy = result.data;

                          if (index !== undefined) {
                            this.setIceThicknessLayer(index, iceThicknessLayerCopy);
                          } else {
                            this.addIceThicknessLayer(iceThicknessLayerCopy);
                          }
                        }
                      }

                    case 8:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "onIceThicknessReorder",
          value: function onIceThicknessReorder(event) {
            var _this9 = this;

            this.ngZone.run(function () {
              _this9.reorderList(_this9.registration.request.IceThickness.IceThicknessLayers, event.detail.from, event.detail.to);
            });
            event.detail.complete();
          }
        }, {
          key: "reorderList",
          value: function reorderList(array, fromIndex, toIndex) {
            array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
          }
        }, {
          key: "setIceThicknessLayer",
          value: function setIceThicknessLayer(index, iceThicknessLayer) {
            var _this10 = this;

            this.ngZone.run(function () {
              _this10.registration.request.IceThickness.IceThicknessLayers[index] = iceThicknessLayer;
            });
            this.calculateIceThicknessSum();
          }
        }, {
          key: "addIceThicknessLayer",
          value: function addIceThicknessLayer(iceThicknessLayer) {
            var _this11 = this;

            this.ngZone.run(function () {
              _this11.registration.request.IceThickness.IceThicknessLayers.push(iceThicknessLayer);
            });
            this.calculateIceThicknessSum();
          }
        }, {
          key: "calculateIceThicknessSum",
          value: function calculateIceThicknessSum() {
            var _this12 = this;

            var newSum = (this.registration.request.IceThickness.IceThicknessLayers || []).reduce(function (p, c) {
              return p + (c.IceLayerThickness || 0);
            }, 0);
            this.ngZone.run(function () {
              _this12.registration.request.IceThickness.IceThicknessSum = newSum;
            });
          }
        }, {
          key: "removeLayerAtIndex",
          value: function removeLayerAtIndex(index) {
            var _this13 = this;

            this.ngZone.run(function () {
              _this13.registration.request.IceThickness.IceThicknessLayers.splice(index, 1);
            });
            this.calculateIceThicknessSum();
          }
        }]);

        return _IceThicknessPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _IceThicknessPage.ɵfac = function IceThicknessPage_Factory(t) {
        return new (t || _IceThicknessPage)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.NgZone));
      };

      _IceThicknessPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
        type: _IceThicknessPage,
        selectors: [["app-ice-thickness"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full", "reorder", "true"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.DRY_SNOW_BEFORE_DRILL", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.SLUSH_SNOW_BEFORE_DRILL", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], [1, "ion-text-uppercase"], ["disabled", "false", 3, "ionItemReorder"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_THICKNESS_SUM", "suffix", "cm", 3, "readonly", "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_TOGGLE", 3, "value", "valueChange"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_AFTER_TOGGLE", 3, "value", "valueChange"], ["suffix", "cm", "placeholder", "REGISTRATION.IN_CM", 3, "value", "title", "min", "max", "decimalPlaces", "convertRatio", "valueChange", 4, "ngIf"], [3, "value", "placeholder", "valueChange"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["slot", "end"], ["title", "REGISTRATION.ICE.ICE_THICKNESS.ICE_HEIGHT_BEFORE_INPUT", "placeholder", "REGISTRATION.IN_CM", "suffix", "cm", 3, "value", "min", "max", "decimalPlaces", "convertRatio", "valueChange"], ["suffix", "cm", "placeholder", "REGISTRATION.IN_CM", 3, "value", "title", "min", "max", "decimalPlaces", "convertRatio", "valueChange"]],
        template: function IceThicknessPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](8, IceThicknessPage_app_registration_content_wrapper_8_Template, 31, 43, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind1"](6, 2, "REGISTRATION.ICE.ICE_THICKNESS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.IceThickness);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonList, _components_numeric_input_numeric_input_component__WEBPACK_IMPORTED_MODULE_7__.NumericInputComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonIcon, _components_yes_no_select_yes_no_select_component__WEBPACK_IMPORTED_MODULE_8__.YesNoSelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_9__.TextCommentComponent, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_10__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonReorder],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe, _pipes_kdv_description_pipe__WEBPACK_IMPORTED_MODULE_11__.KdvDescriptionPipe, _pipes_meters_to_cm_pipe__WEBPACK_IMPORTED_MODULE_12__.MetersToCmPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpY2UtdGhpY2tuZXNzLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkI7QUFBQWhCO0FBQUFrQjtBQUFBQztBQUFBQztBQUFBQztBQUFBO0FEZjdCVzs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBMERGQTs7OztBQS9ETUE7O0FBQUFBOztBQUsrQkE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsiREVCVUdfVEFHIiwiQmFzZVBhZ2VTZXJ2aWNlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsIm5ld0F0dGFjaG1lbnRTZXJ2aWNlIiwiY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsIm5nWm9uZSIsImFsZXJ0Q29udHJvbGxlciIsInRyYW5zbGF0ZVNlcnZpY2UiLCJsb2dnaW5nU2VydmljZSIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvblRpZCIsIm9uUmVzZXQiLCJnZXQiLCJ0b1Byb21pc2UiLCJsZWF2ZVRleHQiLCJjcmVhdGVSZXNldERpYWxvZyIsIm1lc3NhZ2UiLCJ0cmFuc2xhdGlvbnMiLCJjcmVhdGUiLCJidXR0b25zIiwidGV4dCIsInJvbGUiLCJhbGVydCIsInByZXNlbnQiLCJvbkRpZERpc21pc3MiLCJyZXN1bHQiLCJyZXNldCIsIlpvbmUiLCJydW4iLCJyZXF1ZXN0IiwiZ2V0RGVmYXVsdFZhbHVlIiwicmVzZXRJbWFnZXMiLCJzYXZlUmVnaXN0cmF0aW9uQXN5bmMiLCJwcm9wTmFtZSIsImdldEF0dGFjaG1lbnRzIiwiaWQiLCJwaXBlIiwiYXR0YWNobWVudHMiLCJtYXAiLCJhIiwicmVtb3ZlQXR0YWNobWVudCIsInN1YnNjcmliZSIsImRlYnVnIiwiZXJyb3IiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJmYWN0b3J5IiwicHJvdmlkZWRJbiIsIkJhc2VQYWdlIiwiYmFzZVBhZ2VTZXJ2aWNlIiwiYWN0aXZhdGVkUm91dGUiLCJzbmFwc2hvdCIsInBhcmFtcyIsIkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJnZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCIsInJlZyIsImNyZWF0ZURlZmF1bHRQcm9wcyIsImNyZWF0ZUluaXRPYnNlcnZhYmxlIiwibmdEZXN0cm95JCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaXNWYWxpZCIsInZhbGlkIiwiaXNFbXB0eSIsImNvbmZpcm1MZWF2ZSIsIm9uSW5pdCIsIm9uQmVmb3JlTGVhdmUiLCJzYXZlIiwiY2xlYW4iLCJzeW5jU3RhdHVzIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiUmVnaXN0cmF0aW9uU2VydmljZSIsImhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzIiwiY29uZmlybVJlc2V0IiwicGF0aEZyb21Sb290IiwidiIsInVybCIsInNlZ21lbnQiLCJ0b1N0cmluZyIsImpvaW4iLCJmaWx0ZXIiLCJwYXRoIiwiX2NvcmVfaGVscGVyc19vYnNlcnZhYmxlX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsImZlYXR1cmVzIiwiSWNlTGF5ZXJQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZGVjbGFyYXRpb25zIiwiX2ljZV9sYXllcl9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJpbXBvcnRzIiwiSWNlTGF5ZXJQYWdlIiwibW9kYWxDb250cm9sbGVyIiwibGF5ZXJDb3B5IiwiSWNlTGF5ZXJUaGlja25lc3MiLCJ1bmRlZmluZWQiLCJpY2VUaGlja25lc3NMYXllciIsImlzTmV3IiwiT2JqZWN0IiwiZGlzbWlzcyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsInNlbGVjdG9ycyIsImlucHV0cyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiY3R4Iiwicm91dGVzIiwiY29tcG9uZW50IiwiX2ljZV90aGlja25lc3NfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiY2FuRGVhY3RpdmF0ZSIsIl9jYW5fZGVhY3RpdmF0ZV9yb3V0ZV9ndWFyZF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiSWNlVGhpY2tuZXNzUGFnZU1vZHVsZSIsIl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9pY2VfbGF5ZXJfaWNlX2xheWVyX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xM19fIiwiY3R4X3IzIiwiY3R4X3IwIiwiSWNlVGhpY2tuZXNzUGFnZSIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIkljZVRoaWNrbmVzcyIsIkljZVRoaWNrbmVzc0xheWVycyIsIkljZUhlaWdodEJlZm9yZSIsImljZUhlaWdodEJlZm9yZSIsIkljZUhlaWdodEFmdGVyIiwiaWNlSGVpZ2h0QWZ0ZXIiLCJfY29yZV9oZWxwZXJzX251bWJlcl9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImlzRW1wdHlSZXN1bHQiLCJpbmRleCIsIl9pY2VfbGF5ZXJfaWNlX2xheWVyX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsImNvbXBvbmVudFByb3BzIiwibW9kYWwiLCJkYXRhIiwicmVtb3ZlTGF5ZXJBdEluZGV4IiwiaWNlVGhpY2tuZXNzTGF5ZXJDb3B5Iiwic2V0SWNlVGhpY2tuZXNzTGF5ZXIiLCJhZGRJY2VUaGlja25lc3NMYXllciIsImV2ZW50IiwicmVvcmRlckxpc3QiLCJkZXRhaWwiLCJmcm9tIiwidG8iLCJjb21wbGV0ZSIsImFycmF5IiwiZnJvbUluZGV4IiwidG9JbmRleCIsInNwbGljZSIsImNhbGN1bGF0ZUljZVRoaWNrbmVzc1N1bSIsInB1c2giLCJuZXdTdW0iLCJyZWR1Y2UiLCJwIiwiYyIsIkljZVRoaWNrbmVzc1N1bSIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvaWNlL2ljZS10aGlja25lc3MvaWNlLWxheWVyL2ljZS1sYXllci5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvaWNlL2ljZS10aGlja25lc3MvaWNlLWxheWVyL2ljZS1sYXllci5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS1sYXllci9pY2UtbGF5ZXIucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS10aGlja25lc3MubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS10aGlja25lc3MucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2ljZS9pY2UtdGhpY2tuZXNzL2ljZS10aGlja25lc3MucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBJY2VMYXllclBhZ2UgfSBmcm9tICcuL2ljZS1sYXllci5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ljZUxheWVyUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbSWNlTGF5ZXJQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWNlTGF5ZXJQYWdlTW9kdWxlIHt9XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSWNlVGhpY2tuZXNzTGF5ZXJFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1pY2UtbGF5ZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtbGF5ZXIucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pY2UtbGF5ZXIucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEljZUxheWVyUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsO1xyXG5cclxuICBpc05ldyA9IGZhbHNlO1xyXG4gIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5ZXJDb3B5LkljZUxheWVyVGhpY2tuZXNzICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBsYXllckNvcHk6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsOyAvLyBVc2luZyBvYmplY3QgY29weSBzbyBjYW5jZWwgZG9lcyBub3QgY2hhbmdlIGlucHV0IG9iamVjdFxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5pY2VUaGlja25lc3NMYXllcikge1xyXG4gICAgICB0aGlzLmxheWVyQ29weSA9IHt9O1xyXG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGF5ZXJDb3B5ID0geyAuLi50aGlzLmljZVRoaWNrbmVzc0xheWVyIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3ModGhpcy5sYXllckNvcHkpO1xyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh7IGRlbGV0ZTogdHJ1ZSB9KTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5BRERfSUNFX0xBWUVSJyB8IHRyYW5zbGF0ZX19PC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAge3snUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLkFERF9JQ0VfTEFZRVJfVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cInt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfVFlQRScgfCB0cmFuc2xhdGV9fVwiIGtkdktleT1cIkljZV9JY2VMYXllcktEVlwiXHJcbiAgICAgIFsodmFsdWUpXT1cImxheWVyQ29weS5JY2VMYXllclRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwibGF5ZXJDb3B5LkljZUxheWVyVGhpY2tuZXNzXCJcclxuICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0xBWUVSX1RISUNLTkVTU1wiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiXHJcbiAgICAgIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgc3VmZml4PVwiY21cIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5TTk9XLldFQVRIRVIuQUlSX1RFTVBFUkFUVVJFX1BMQUNFSE9MREVSXCI+XHJcbiAgICA8L2FwcC1udW1lcmljLWlucHV0PlxyXG4gIDwvaW9uLWxpc3Q+XHJcbiAgPGFwcC1tb2RhbC1zYXZlLW9yLWRlbGV0ZS1idXR0b25zIFtzYXZlRGlzYWJsZWRdPVwiIWlzVmFsaWRcIiAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCJcclxuICAgIFtzaG93RGVsZXRlXT1cIiFpc05ld1wiPlxyXG4gIDwvYXBwLW1vZGFsLXNhdmUtb3ItZGVsZXRlLWJ1dHRvbnM+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBJY2VUaGlja25lc3NQYWdlIH0gZnJvbSAnLi9pY2UtdGhpY2tuZXNzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgSWNlTGF5ZXJQYWdlTW9kdWxlIH0gZnJvbSAnLi9pY2UtbGF5ZXIvaWNlLWxheWVyLm1vZHVsZSc7XHJcbmltcG9ydCB7IENhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkIH0gZnJvbSAnLi4vLi4vY2FuLWRlYWN0aXZhdGUtcm91dGUuZ3VhcmQnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEljZVRoaWNrbmVzc1BhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgSWNlTGF5ZXJQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0ljZVRoaWNrbmVzc1BhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJY2VUaGlja25lc3NQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyICpuZ0lmPVwicmVnaXN0cmF0aW9uICYmIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzc1wiXHJcbiAgICBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIiByZW9yZGVyPVwidHJ1ZVwiPlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLlNub3dEZXB0aFwiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuRFJZX1NOT1dfQkVGT1JFX0RSSUxMXCIgW21pbl09XCIwXCIgW21heF09XCI5OTlcIiBbZGVjaW1hbFBsYWNlc109XCIyXCJcclxuICAgICAgICBbY29udmVydFJhdGlvXT1cIjEwMFwiIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLklOX0NNXCIgc3VmZml4PVwiY21cIj48L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLlNsdXNoU25vd1wiXHJcbiAgICAgICAgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuU0xVU0hfU05PV19CRUZPUkVfRFJJTExcIiBbbWluXT1cIjBcIiBbbWF4XT1cIjk5OVwiIFtkZWNpbWFsUGxhY2VzXT1cIjJcIlxyXG4gICAgICAgIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgcGxhY2Vob2xkZXI9XCJSRUdJU1RSQVRJT04uSU5fQ01cIiBzdWZmaXg9XCJjbVwiPjwvYXBwLW51bWVyaWMtaW5wdXQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfTEFZRVInIHwgdHJhbnNsYXRlIH19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLXJlb3JkZXItZ3JvdXAgZGlzYWJsZWQ9XCJmYWxzZVwiIChpb25JdGVtUmVvcmRlcik9XCJvbkljZVRoaWNrbmVzc1Jlb3JkZXIoJGV2ZW50KVwiPlxyXG4gICAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0VGhpY2tuZXNzTGF5ZXIoaSlcIlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGxheWVyIG9mIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnM7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+IHt7IGxheWVyLkljZUxheWVyVElEIHwga2R2RGVzY3JpcHRpb246J0ljZV9JY2VMYXllcktEVicgfCBhc3luYyB9fSAtXHJcbiAgICAgICAgICAgIHt7IGxheWVyLkljZUxheWVyVGhpY2tuZXNzIHwgbWV0ZXJzVG9DbSB9fSBjbTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1yZW9yZGVyIHNsb3Q9XCJlbmRcIj48L2lvbi1yZW9yZGVyPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvaW9uLXJlb3JkZXItZ3JvdXA+XHJcbiAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0VGhpY2tuZXNzTGF5ZXIoKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBjb2xvcj1cInByaW1hcnlcIiBuYW1lPVwiYWRkLWNpcmNsZS1vdXRsaW5lXCIgc2xvdD1cInN0YXJ0XCI+PC9pb24taWNvbj5cclxuICAgICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5BRERfSUNFX0xBWUVSJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxhcHAtbnVtZXJpYy1pbnB1dCBbcmVhZG9ubHldPVwidHJ1ZVwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NTdW1cIlxyXG4gICAgICAgIHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9USElDS05FU1NfU1VNXCIgW21pbl09XCIwXCIgW21heF09XCI5OTlcIiBbZGVjaW1hbFBsYWNlc109XCIyXCJcclxuICAgICAgICBbY29udmVydFJhdGlvXT1cIjEwMFwiIHN1ZmZpeD1cImNtXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC15ZXMtbm8tc2VsZWN0IFsodmFsdWUpXT1cImljZUhlaWdodEJlZm9yZVwiIHRpdGxlPVwiUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9IRUlHSFRfQkVGT1JFX1RPR0dMRVwiPlxyXG4gICAgICA8L2FwcC15ZXMtbm8tc2VsZWN0PlxyXG4gICAgICA8YXBwLW51bWVyaWMtaW5wdXQgKm5nSWY9XCJpY2VIZWlnaHRCZWZvcmVcIiBbKHZhbHVlKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlXCJcclxuICAgICAgICB0aXRsZT1cIlJFR0lTVFJBVElPTi5JQ0UuSUNFX1RISUNLTkVTUy5JQ0VfSEVJR0hUX0JFRk9SRV9JTlBVVFwiIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiXHJcbiAgICAgICAgW2NvbnZlcnRSYXRpb109XCIxMDBcIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5JTl9DTVwiIHN1ZmZpeD1cImNtXCI+PC9hcHAtbnVtZXJpYy1pbnB1dD5cclxuICAgICAgPGFwcC15ZXMtbm8tc2VsZWN0IFsodmFsdWUpXT1cImljZUhlaWdodEFmdGVyXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0hFSUdIVF9BRlRFUl9UT0dHTEVcIj5cclxuICAgICAgPC9hcHAteWVzLW5vLXNlbGVjdD5cclxuICAgICAgPGFwcC1udW1lcmljLWlucHV0ICpuZ0lmPVwiaWNlSGVpZ2h0QWZ0ZXIgIT09IHVuZGVmaW5lZFwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEFmdGVyXCJcclxuICAgICAgICBbdGl0bGVdPVwiaWNlSGVpZ2h0QWZ0ZXIgPT09IHRydWUgPyAnUkVHSVNUUkFUSU9OLklDRS5JQ0VfVEhJQ0tORVNTLklDRV9IRUlHSFRfQkVGT1JFX0lOUFVUJyA6ICdSRUdJU1RSQVRJT04uSUNFLklDRV9USElDS05FU1MuSUNFX0hFSUdIVF9BRlRFUl9OTydcIlxyXG4gICAgICAgIFttaW5dPVwiMFwiIFttYXhdPVwiOTk5XCIgW2RlY2ltYWxQbGFjZXNdPVwiMlwiIFtjb252ZXJ0UmF0aW9dPVwiMTAwXCIgc3VmZml4PVwiY21cIiBwbGFjZWhvbGRlcj1cIlJFR0lTVFJBVElPTi5JTl9DTVwiPlxyXG4gICAgICA8L2FwcC1udW1lcmljLWlucHV0PlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uR0VORVJBTF9DT01NRU5ULkNPTU1FTlRfVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5Db21tZW50XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cInt7J1JFR0lTVFJBVElPTi5HRU5FUkFMX0NPTU1FTlQuQ09NTUVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cIj48L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSWNlTGF5ZXJQYWdlIH0gZnJvbSAnLi9pY2UtbGF5ZXIvaWNlLWxheWVyLnBhZ2UnO1xyXG5pbXBvcnQgeyBJY2VUaGlja25lc3NMYXllckVkaXRNb2RlbCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE51bWJlckhlbHBlciB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvaGVscGVycy9udW1iZXItaGVscGVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWljZS10aGlja25lc3MnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pY2UtdGhpY2tuZXNzLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWNlLXRoaWNrbmVzcy5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWNlVGhpY2tuZXNzUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBpY2VIZWlnaHRCZWZvcmU6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcbiAgaWNlSGVpZ2h0QWZ0ZXI6IGJvb2xlYW4gPSB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgc3VwZXIoUmVnaXN0cmF0aW9uVGlkLkljZVRoaWNrbmVzcywgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZVRoaWNrbmVzc0xheWVycykge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMgPSBbXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRCZWZvcmUgPCAwKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEJlZm9yZSA9XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlICogLTE7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPiAwKSB7XHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QWZ0ZXIgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPCAwKSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEFmdGVyID1cclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRBZnRlciAqIC0xO1xyXG4gICAgICB0aGlzLmljZUhlaWdodEFmdGVyID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uQmVmb3JlTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24pIHtcclxuICAgICAgaWYgKHRoaXMuaWNlSGVpZ2h0QmVmb3JlICE9PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID0gdW5kZWZpbmVkO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuSWNlVGhpY2tuZXNzLkljZUhlaWdodEJlZm9yZSA+IDApIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRCZWZvcmUgPVxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlICogLTE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QmVmb3JlID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5pY2VIZWlnaHRBZnRlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgdGhpcy5pY2VIZWlnaHRBZnRlciA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgIE51bWJlckhlbHBlci5pc051bWVyaWMoXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VIZWlnaHRBZnRlclxyXG4gICAgICAgIClcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgPVxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlSGVpZ2h0QWZ0ZXIgKiAtMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpIHtcclxuICAgIGNvbnN0IGlzRW1wdHlSZXN1bHQgPSBcclxuICAgICAgKCFhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICAgICkpICYmXHJcbiAgICAgIHRoaXMuaWNlSGVpZ2h0QWZ0ZXIgPT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0aGlzLmljZUhlaWdodEJlZm9yZSA9PT0gdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIGlzRW1wdHlSZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBvblJlc2V0KCkge1xyXG4gICAgdGhpcy5pY2VIZWlnaHRBZnRlciA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuaWNlSGVpZ2h0QmVmb3JlID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzID0gW107XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRPckVkaXRUaGlja25lc3NMYXllcihpbmRleD86IG51bWJlcikge1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEljZUxheWVyUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBpY2VUaGlja25lc3NMYXllcjogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3NcclxuICAgICAgICAgIC5JY2VUaGlja25lc3NMYXllcnNbaW5kZXhdXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgbW9kYWwucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXJBdEluZGV4KGluZGV4KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBpY2VUaGlja25lc3NMYXllckNvcHk6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2V0SWNlVGhpY2tuZXNzTGF5ZXIoaW5kZXgsIGljZVRoaWNrbmVzc0xheWVyQ29weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYWRkSWNlVGhpY2tuZXNzTGF5ZXIoaWNlVGhpY2tuZXNzTGF5ZXJDb3B5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSWNlVGhpY2tuZXNzUmVvcmRlcihldmVudDogQ3VzdG9tRXZlbnQpIHtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVvcmRlckxpc3QoXHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzLFxyXG4gICAgICAgIGV2ZW50LmRldGFpbC5mcm9tLFxyXG4gICAgICAgIGV2ZW50LmRldGFpbC50b1xyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICBldmVudC5kZXRhaWwuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIHJlb3JkZXJMaXN0KGFycmF5OiBBcnJheTxhbnk+LCBmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyKSB7XHJcbiAgICBhcnJheS5zcGxpY2UodG9JbmRleCwgMCwgYXJyYXkuc3BsaWNlKGZyb21JbmRleCwgMSlbMF0pO1xyXG4gIH1cclxuXHJcbiAgc2V0SWNlVGhpY2tuZXNzTGF5ZXIoaW5kZXg6IG51bWJlciwgaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnNbXHJcbiAgICAgICAgaW5kZXhcclxuICAgICAgXSA9IGljZVRoaWNrbmVzc0xheWVyO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUljZVRoaWNrbmVzc1N1bSgpO1xyXG4gIH1cclxuXHJcbiAgYWRkSWNlVGhpY2tuZXNzTGF5ZXIoaWNlVGhpY2tuZXNzTGF5ZXI6IEljZVRoaWNrbmVzc0xheWVyRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMucHVzaChcclxuICAgICAgICBpY2VUaGlja25lc3NMYXllclxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUljZVRoaWNrbmVzc1N1bSgpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlSWNlVGhpY2tuZXNzU3VtKCkge1xyXG4gICAgY29uc3QgbmV3U3VtID0gKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkljZVRoaWNrbmVzcy5JY2VUaGlja25lc3NMYXllcnMgfHwgW11cclxuICAgICkucmVkdWNlKChwLCBjKSA9PiBwICsgKGMuSWNlTGF5ZXJUaGlja25lc3MgfHwgMCksIDApO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzU3VtID0gbmV3U3VtO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVMYXllckF0SW5kZXgoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5JY2VUaGlja25lc3MuSWNlVGhpY2tuZXNzTGF5ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY2FsY3VsYXRlSWNlVGhpY2tuZXNzU3VtKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==