(function () {
  "use strict";

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_components_snow_compression-test-list_compression-test-m-1f3081"], {
    /***/
    93864: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CompressionTestModalPageModule": function CompressionTestModalPageModule() {
          return (
            /* binding */
            _CompressionTestModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../shared-components.module */
      22623);
      /* harmony import */


      var _compression_test_modal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./compression-test-modal.page */
      32677);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _CompressionTestModalPageModule = function _CompressionTestModalPageModule() {
        _classCallCheck(this, _CompressionTestModalPageModule);
      };

      _CompressionTestModalPageModule.ɵfac = function CompressionTestModalPageModule_Factory(t) {
        return new (t || _CompressionTestModalPageModule)();
      };

      _CompressionTestModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _CompressionTestModalPageModule
      });
      _CompressionTestModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_CompressionTestModalPageModule, {
          declarations: [_compression_test_modal_page__WEBPACK_IMPORTED_MODULE_1__.CompressionTestModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]
        });
      })();
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
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFQO0FBQUEsYUFEUCxFQUVHQyxNQUZILENBRVUsVUFBQ0MsSUFBRDtBQUFBLHFCQUFVLENBQUMsQ0FBQ0EsSUFBWjtBQUFBLGFBRlYsRUFHR0YsSUFISCxDQUdRLEdBSFIsQ0FGRjtBQU9EOzs7O1FBakdvQ0c7Ozt5QkFBakJsQyxXQUFRbUM7QUFBQTs7O2NBQVJuQztBQUFRb0M7Ozs7IiwibmFtZXMiOlsiQ29tcHJlc3Npb25UZXN0TW9kYWxQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiZGVjbGFyYXRpb25zIiwiX2NvbXByZXNzaW9uX3Rlc3RfbW9kYWxfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiaW1wb3J0cyIsIkRFQlVHX1RBRyIsIkJhc2VQYWdlU2VydmljZSIsInJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZXdBdHRhY2htZW50U2VydmljZSIsImNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZ1pvbmUiLCJhbGVydENvbnRyb2xsZXIiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwibG9nZ2luZ1NlcnZpY2UiLCJyZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25UaWQiLCJvblJlc2V0IiwiZ2V0IiwidG9Qcm9taXNlIiwibGVhdmVUZXh0IiwiY3JlYXRlUmVzZXREaWFsb2ciLCJtZXNzYWdlIiwidHJhbnNsYXRpb25zIiwiY3JlYXRlIiwiYnV0dG9ucyIsInRleHQiLCJyb2xlIiwiYWxlcnQiLCJwcmVzZW50Iiwib25EaWREaXNtaXNzIiwicmVzdWx0IiwicmVzZXQiLCJab25lIiwicnVuIiwicmVxdWVzdCIsImdldERlZmF1bHRWYWx1ZSIsInJlc2V0SW1hZ2VzIiwic2F2ZVJlZ2lzdHJhdGlvbkFzeW5jIiwicHJvcE5hbWUiLCJnZXRBdHRhY2htZW50cyIsImlkIiwicGlwZSIsImF0dGFjaG1lbnRzIiwibWFwIiwiYSIsInJlbW92ZUF0dGFjaG1lbnQiLCJzdWJzY3JpYmUiLCJkZWJ1ZyIsImVycm9yIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiZmFjdG9yeSIsInByb3ZpZGVkSW4iLCJCYXNlUGFnZSIsImJhc2VQYWdlU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwic25hcHNob3QiLCJwYXJhbXMiLCJDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIiwiZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQiLCJyZWciLCJjcmVhdGVEZWZhdWx0UHJvcHMiLCJjcmVhdGVJbml0T2JzZXJ2YWJsZSIsIm5nRGVzdHJveSQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImlzVmFsaWQiLCJ2YWxpZCIsImlzRW1wdHkiLCJjb25maXJtTGVhdmUiLCJvbkluaXQiLCJvbkJlZm9yZUxlYXZlIiwic2F2ZSIsImNsZWFuIiwic3luY1N0YXR1cyIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIlJlZ2lzdHJhdGlvblNlcnZpY2UiLCJoYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyIsImNvbmZpcm1SZXNldCIsInBhdGhGcm9tUm9vdCIsInYiLCJ1cmwiLCJzZWdtZW50IiwidG9TdHJpbmciLCJqb2luIiwiZmlsdGVyIiwicGF0aCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzExX18iLCJmZWF0dXJlcyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3Nub3cvY29tcHJlc3Npb24tdGVzdC1saXN0L2NvbXByZXNzaW9uLXRlc3QtbW9kYWwvY29tcHJlc3Npb24tdGVzdC1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2UgfSBmcm9tICcuL2NvbXByZXNzaW9uLXRlc3QtbW9kYWwucGFnZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtDb21wcmVzc2lvblRlc3RNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0NvbXByZXNzaW9uVGVzdE1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXByZXNzaW9uVGVzdE1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiJdfQ==