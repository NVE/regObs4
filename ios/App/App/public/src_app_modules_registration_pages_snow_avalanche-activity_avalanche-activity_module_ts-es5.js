(function () {
  "use strict";

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_avalanche-activity_avalanche-activity_module_ts"], {
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
    12285: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheActivityModalPageModule": function AvalancheActivityModalPageModule() {
          return (
            /* binding */
            _AvalancheActivityModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./avalanche-activity-modal.page */
      73314);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AvalancheActivityModalPageModule = function _AvalancheActivityModalPageModule() {
        _classCallCheck(this, _AvalancheActivityModalPageModule);
      };

      _AvalancheActivityModalPageModule.ɵfac = function AvalancheActivityModalPageModule_Factory(t) {
        return new (t || _AvalancheActivityModalPageModule)();
      };

      _AvalancheActivityModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _AvalancheActivityModalPageModule
      });
      _AvalancheActivityModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_AvalancheActivityModalPageModule, {
          declarations: [_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    73314: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheActivityModalPage": function AvalancheActivityModalPage() {
          return (
            /* binding */
            _AvalancheActivityModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../components/snow/exposed-height/exposed-height.component */
      55935);
      /* harmony import */


      var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../components/snow/valid-exposition/valid-exposition.component */
      70133);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AvalancheActivityModalPage_ion_content_9_ion_item_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, "ALERT.WARNING"), "! ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DATE_WARNING"), " ");
        }
      }

      function AvalancheActivityModalPage_ion_content_9_ion_select_option_22_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-select-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var timeFrame_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", timeFrame_r4.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 2, timeFrame_r4.text), "");
        }
      }

      function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r5.avalancheActivityCopy.EstimatedNumTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r7.avalancheActivityCopy.AvalancheExtTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "app-kdv-select", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r8.avalancheActivityCopy.AvalTriggerSimpleTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "app-kdv-select", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r9.avalancheActivityCopy.DestructiveSizeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "app-kdv-select", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_kdv_select_valueChange_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r10.avalancheActivityCopy.AvalPropagationTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "app-exposed-height", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("exposedHeightComboTIDChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHeightComboTIDChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r11.avalancheActivityCopy.ExposedHeightComboTID = $event;
          })("exposedHight1Change", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHight1Change_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r12.avalancheActivityCopy.ExposedHeight1 = $event;
          })("exposedHight2Change", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_exposed_height_exposedHight2Change_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r13.avalancheActivityCopy.ExposedHeight2 = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "app-valid-exposition", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("validExpositionChange", function AvalancheActivityModalPage_ion_content_9_ng_container_23_Template_app_valid_exposition_validExpositionChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r6);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r14.avalancheActivityCopy.ValidExposition = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.EstimatedNumTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalancheExtTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalTriggerSimpleTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.DestructiveSizeTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r3.avalancheActivityCopy.AvalPropagationTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("exposedHeightComboTID", ctx_r3.avalancheActivityCopy.ExposedHeightComboTID)("exposedHight1", ctx_r3.avalancheActivityCopy.ExposedHeight1)("exposedHight2", ctx_r3.avalancheActivityCopy.ExposedHeight2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("validExposition", ctx_r3.avalancheActivityCopy.ValidExposition);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "hasWarning": a0
        };
      };

      function AvalancheActivityModalPage_ion_content_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-checkbox", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_checkbox_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r15.noAvalancheActivity = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "ion-label", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "ion-datetime", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_datetime_ngModelChange_11_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r17.startDate = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](13, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](14, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, AvalancheActivityModalPage_ion_content_9_ion_item_15_Template, 5, 6, "ion-item", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "ion-label", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](18);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](19, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheActivityModalPage_ion_content_9_Template_ion_select_ngModelChange_20_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r18.selectedTimeFrame = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](21, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](22, AvalancheActivityModalPage_ion_content_9_ion_select_option_22_Template, 3, 4, "ion-select-option", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](23, AvalancheActivityModalPage_ion_content_9_ng_container_23_Template, 8, 9, "ng-container", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-text-comment", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheActivityModalPage_ion_content_9_Template_app_text_comment_valueChange_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r19.avalancheActivityCopy.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "app-modal-save-or-delete-buttons", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("saveClicked", function AvalancheActivityModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_25_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r20.ok();
          })("deleteClicked", function AvalancheActivityModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_25_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r16);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r21["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 17, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.NO_AVALANCHE_ACTIVITY"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.noAvalancheActivity);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](31, _c0, ctx_r0.dateIsDifferentThanObsTime));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](10, 19, "DATE"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 21, "MONTHS.SHORT_LIST"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](13, 23, "DIALOGS.OK"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](14, 25, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("max", ctx_r0.maxDate)("ngModel", ctx_r0.startDate);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.dateIsDifferentThanObsTime);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](19, 27, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.ESTIMATED_TIME"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](21, 29, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.selectedTimeFrame);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.timeFrames);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.noAvalancheActivity);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheActivityCopy.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showDelete", !ctx_r0.isNew);
        }
      }

      var _AvalancheActivityModalPage = /*#__PURE__*/function () {
        function _AvalancheActivityModalPage(modalController) {
          _classCallCheck(this, _AvalancheActivityModalPage);

          this.modalController = modalController;
          this.isNew = false;
          this.timeFrames = [{
            id: 1,
            start: {
              h: 0,
              m: 0
            },
            end: {
              h: 23,
              m: 59
            },
            text: 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.DURING_THE_DAY'
          }, {
            id: 2,
            start: {
              h: 0,
              m: 0
            },
            end: {
              h: 6,
              m: 0
            },
            text: '0-6'
          }, {
            id: 3,
            start: {
              h: 6,
              m: 0
            },
            end: {
              h: 12,
              m: 0
            },
            text: '6-12'
          }, {
            id: 4,
            start: {
              h: 12,
              m: 0
            },
            end: {
              h: 18,
              m: 0
            },
            text: '12-18'
          }, {
            id: 5,
            start: {
              h: 18,
              m: 0
            },
            end: {
              h: 23,
              m: 59
            },
            text: '18-24'
          }];
          this.selectedTimeFrame = 1;
        }

        _createClass(_AvalancheActivityModalPage, [{
          key: "noAvalancheActivity",
          get: function get() {
            return this.avalancheActivityCopy.EstimatedNumTID === 1;
          },
          set: function set(val) {
            if (val) {
              this.avalancheActivityCopy.EstimatedNumTID = 1;
            } else {
              this.avalancheActivityCopy.EstimatedNumTID = undefined;
            }
          }
        }, {
          key: "dateIsDifferentThanObsTime",
          get: function get() {
            return this.startDate && !moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate).startOf('day').isSame(moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dtObsTime).startOf('day'));
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var start, end, timeFrame;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      this.maxDate = this.getMaxDateForNow();

                      if (this.avalancheActivity) {
                        this.avalancheActivityCopy = Object.assign({}, this.avalancheActivity);
                      } else {
                        this.avalancheActivityCopy = {};
                        this.isNew = true;
                      }

                      if (this.avalancheActivityCopy.DtStart && this.avalancheActivityCopy.DtEnd) {
                        start = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtStart);
                        end = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtEnd);
                        this.startDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.avalancheActivityCopy.DtStart).startOf('day').toISOString(true);
                        timeFrame = this.timeFrames.find(function (tf) {
                          return tf.start.h === start.hours() && tf.end.h === end.hours() && tf.start.m === start.minutes() && tf.end.m === end.minutes();
                        });

                        if (timeFrame) {
                          this.selectedTimeFrame = timeFrame.id;
                        }
                      } else {
                        this.startDate = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.dtObsTime).startOf('day').toISOString(true);
                      }

                    case 3:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "getMaxDateForNow",
          value: function getMaxDateForNow() {
            // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
            // Workaround is to set minutes to 59.
            return moment__WEBPACK_IMPORTED_MODULE_1___default()().minutes(59).toISOString(true);
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "resetWhenNoActivityFields",
          value: function resetWhenNoActivityFields() {
            this.avalancheActivityCopy.AvalancheExtTID = undefined;
            this.avalancheActivityCopy.AvalTriggerSimpleTID = undefined;
            this.avalancheActivityCopy.DestructiveSizeTID = undefined;
            this.avalancheActivityCopy.AvalPropagationTID = undefined;
            this.avalancheActivityCopy.ExposedHeightComboTID = undefined;
            this.avalancheActivityCopy.ExposedHeight1 = undefined;
            this.avalancheActivityCopy.ExposedHeight2 = undefined;
            this.avalancheActivityCopy.ValidExposition = undefined;
          }
        }, {
          key: "ok",
          value: function ok() {
            var _this8 = this;

            if (this.avalancheActivityCopy.EstimatedNumTID === 1) {
              this.resetWhenNoActivityFields();
            }

            var timeFrame = this.timeFrames.find(function (tf) {
              return tf.id === _this8.selectedTimeFrame;
            });

            if (this.startDate && timeFrame) {
              this.avalancheActivityCopy.DtStart = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate).hours(timeFrame.start.h).minutes(timeFrame.start.m).toISOString(true);
              this.avalancheActivityCopy.DtEnd = moment__WEBPACK_IMPORTED_MODULE_1___default()(this.startDate).hours(timeFrame.end.h).minutes(timeFrame.end.m).toISOString(true);
            }

            if (this.isNew && _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.avalancheActivityCopy)) {
              this.modalController.dismiss(null);
            } else {
              this.modalController.dismiss(this.avalancheActivityCopy);
            }
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.modalController.dismiss({
              "delete": true
            });
          }
        }]);

        return _AvalancheActivityModalPage;
      }();

      _AvalancheActivityModalPage.ɵfac = function AvalancheActivityModalPage_Factory(t) {
        return new (t || _AvalancheActivityModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController));
      };

      _AvalancheActivityModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _AvalancheActivityModalPage,
        selectors: [["app-avalanche-activity-modal"]],
        inputs: {
          avalancheActivity: "avalancheActivity",
          dtObsTime: "dtObsTime"
        },
        decls: 10,
        vars: 7,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], ["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange"], [3, "ngClass"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY", 3, "monthShortNames", "doneText", "cancelText", "max", "ngModel", "ngModelChange"], ["interface", "action-sheet", 3, "cancelText", "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["color", "danger", 1, "ion-text-wrap"], [3, "value"], ["title", "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.HOW_MANY_AVALANCHES", "kdvKey", "Snow_EstimatedNumKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TYPE", "kdvKey", "Snow_AvalancheExtKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.AVALANCHE_TRIGGER", "kdvKey", "Snow_AvalTriggerSimpleKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_OBS.DESTRUCTIVE_SIZE", "kdvKey", "Snow_DestructiveSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION", "kdvKey", "Snow_AvalPropagationKDV", 3, "value", "valueChange"], [3, "exposedHeightComboTID", "exposedHight1", "exposedHight2", "exposedHeightComboTIDChange", "exposedHight1Change", "exposedHight2Change"], [3, "validExposition", "validExpositionChange"]],
        template: function AvalancheActivityModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityModalPage_Template_ion_button_click_3_listener() {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AvalancheActivityModalPage_ion_content_9_Template, 26, 33, "ion-content", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.avalancheActivityCopy);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.SelectValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelect, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_3__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_4__.ModalSaveOrDeleteButtonsComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSelectOption, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_5__.KdvSelectComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_6__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_7__.ValidExpositionComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZS5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    91560: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheActivityPageModule": function AvalancheActivityPageModule() {
          return (
            /* binding */
            _AvalancheActivityPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./avalanche-activity.page */
      1767);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./avalanche-activity-modal/avalanche-activity-modal.module */
      12285);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityPage
      }];

      var _AvalancheActivityPageModule = function _AvalancheActivityPageModule() {
        _classCallCheck(this, _AvalancheActivityPageModule);
      };

      _AvalancheActivityPageModule.ɵfac = function AvalancheActivityPageModule_Factory(t) {
        return new (t || _AvalancheActivityPageModule)();
      };

      _AvalancheActivityPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _AvalancheActivityPageModule
      });
      _AvalancheActivityPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheActivityModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_AvalancheActivityPageModule, {
          declarations: [_avalanche_activity_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheActivityPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _avalanche_activity_modal_avalanche_activity_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheActivityModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    1767: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheActivityPage": function AvalancheActivityPage() {
          return (
            /* binding */
            _AvalancheActivityPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
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


      var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var _avalanche_activity_modal_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./avalanche-activity-modal/avalanche-activity-modal.page */
      73314);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_span_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "lowercase");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var avalancheActivity_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 3, ctx_r4.getCause(avalancheActivity_r2))), "");
        }
      }

      function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);

            var i_r3 = restoredCtx.index;

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r6.addOrEditAvalancheActivity(i_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_span_4_Template, 4, 5, "span", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var avalancheActivity_r2 = ctx.$implicit;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 2, ctx_r1.getEstimatedNumber(avalancheActivity_r2)));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", avalancheActivity_r2.EstimatedNumTID !== 1);
        }
      }

      function AvalancheActivityPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function AvalancheActivityPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r8.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, AvalancheActivityPage_app_registration_content_wrapper_8_ion_item_6_Template, 5, 4, "ion-item", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheActivityPage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r9);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r10.addOrEditAvalancheActivity();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "ion-icon", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "app-add-picture-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 10, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.AvalancheActivityObs2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](11, 12, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.ADD_NEW"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 14, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
        }
      }

      var _AvalancheActivityPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_AvalancheActivityPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_AvalancheActivityPage);

        function _AvalancheActivityPage(basePageService, activatedRoute, modalController, ngZone, kdvService) {
          var _this9;

          _classCallCheck(this, _AvalancheActivityPage);

          _this9 = _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.AvalancheActivityObs2, basePageService, activatedRoute);
          _this9.modalController = modalController;
          _this9.ngZone = ngZone;
          _this9.kdvService = kdvService;
          _this9.avalancheCause = [];
          _this9.estimatedNumber = [];
          return _this9;
        }

        _createClass(_AvalancheActivityPage, [{
          key: "onInit",
          value: function onInit() {
            var _this10 = this;

            this.kdvSubscription = (0, rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)([this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalancheExtKDV'), this.kdvService.getKdvRepositoryByKeyObservable('Snow_EstimatedNumKDV')]).subscribe(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  causeKdv = _ref2[0],
                  estimatedNumberKdv = _ref2[1];

              _this10.avalancheCause = causeKdv;
              _this10.estimatedNumber = estimatedNumberKdv;
            });
          }
        }, {
          key: "onBeforeLeave",
          value: function onBeforeLeave() {
            if (this.kdvSubscription) {
              this.kdvSubscription.unsubscribe();
            }
          }
        }, {
          key: "addOrEditAvalancheActivity",
          value: function addOrEditAvalancheActivity(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var _this11 = this;

              var modal, result;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.modalController.create({
                        component: _avalanche_activity_modal_avalanche_activity_modal_page__WEBPACK_IMPORTED_MODULE_3__.AvalancheActivityModalPage,
                        componentProps: {
                          avalancheActivity: this.registration.request.AvalancheActivityObs2[index],
                          dtObsTime: this.registration.request.DtObsTime
                        }
                      });

                    case 2:
                      modal = _context9.sent;
                      modal.present();
                      _context9.next = 6;
                      return modal.onDidDismiss();

                    case 6:
                      result = _context9.sent;
                      this.ngZone.run(function () {
                        if (result.data) {
                          if (result.data["delete"]) {
                            _this11.registration.request.AvalancheActivityObs2.splice(index, 1);
                          } else {
                            var avalancheActivityObs = result.data;

                            if (index !== undefined) {
                              _this11.registration.request.AvalancheActivityObs2[index] = avalancheActivityObs;
                            } else {
                              _this11.registration.request.AvalancheActivityObs2.push(avalancheActivityObs);
                            }
                          }
                        }
                      });

                    case 8:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "getCause",
          value: function getCause(avalancheActivityObs) {
            var cause = this.avalancheCause.find(function (c) {
              return c.Id === avalancheActivityObs.AvalancheExtTID;
            });

            if (cause) {
              return cause.Name;
            } else {
              return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
            }
          }
        }, {
          key: "getEstimatedNumber",
          value: function getEstimatedNumber(avalancheActivityObs) {
            var kdvalue = this.estimatedNumber.find(function (c) {
              return c.Id === avalancheActivityObs.EstimatedNumTID;
            });

            if (kdvalue) {
              return kdvalue.Name;
            } else {
              return 'REGISTRATION.SNOW.AVALANCHE_ACTIVITY.UNKNOWN_NUMBER';
            }
          }
        }]);

        return _AvalancheActivityPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _AvalancheActivityPage.ɵfac = function AvalancheActivityPage_Factory(t) {
        return new (t || _AvalancheActivityPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__.KdvService));
      };

      _AvalancheActivityPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _AvalancheActivityPage,
        selectors: [["app-avalanche-activity"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["detail", "true", 3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["detail", "true", 3, "click"], [4, "ngIf"]],
        template: function AvalancheActivityPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, AvalancheActivityPage_app_registration_content_wrapper_8_Template, 17, 16, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.AVALANCHE_ACTIVITY.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.AvalancheActivityObs2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.LowerCasePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtYWN0aXZpdHkucGFnZS5zY3NzIn0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCYjtBQUFBbEQ7QUFBQW9EO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURuQmxDakQ7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQTZCRkE7Ozs7QUFsQ01BOztBQUFBQTs7QUFLK0JBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbIkRFQlVHX1RBRyIsIkJhc2VQYWdlU2VydmljZSIsInJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZXdBdHRhY2htZW50U2VydmljZSIsImNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZ1pvbmUiLCJhbGVydENvbnRyb2xsZXIiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwibG9nZ2luZ1NlcnZpY2UiLCJyZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25UaWQiLCJvblJlc2V0IiwiZ2V0IiwidG9Qcm9taXNlIiwibGVhdmVUZXh0IiwiY3JlYXRlUmVzZXREaWFsb2ciLCJtZXNzYWdlIiwidHJhbnNsYXRpb25zIiwiY3JlYXRlIiwiYnV0dG9ucyIsInRleHQiLCJyb2xlIiwiYWxlcnQiLCJwcmVzZW50Iiwib25EaWREaXNtaXNzIiwicmVzdWx0IiwicmVzZXQiLCJab25lIiwicnVuIiwicmVxdWVzdCIsImdldERlZmF1bHRWYWx1ZSIsInJlc2V0SW1hZ2VzIiwic2F2ZVJlZ2lzdHJhdGlvbkFzeW5jIiwicHJvcE5hbWUiLCJnZXRBdHRhY2htZW50cyIsImlkIiwicGlwZSIsImF0dGFjaG1lbnRzIiwibWFwIiwiYSIsInJlbW92ZUF0dGFjaG1lbnQiLCJzdWJzY3JpYmUiLCJkZWJ1ZyIsImVycm9yIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiZmFjdG9yeSIsInByb3ZpZGVkSW4iLCJCYXNlUGFnZSIsImJhc2VQYWdlU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwic25hcHNob3QiLCJwYXJhbXMiLCJDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIiwiZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQiLCJyZWciLCJjcmVhdGVEZWZhdWx0UHJvcHMiLCJjcmVhdGVJbml0T2JzZXJ2YWJsZSIsIm5nRGVzdHJveSQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImlzVmFsaWQiLCJ2YWxpZCIsImlzRW1wdHkiLCJjb25maXJtTGVhdmUiLCJvbkluaXQiLCJvbkJlZm9yZUxlYXZlIiwic2F2ZSIsImNsZWFuIiwic3luY1N0YXR1cyIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIlJlZ2lzdHJhdGlvblNlcnZpY2UiLCJoYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyIsImNvbmZpcm1SZXNldCIsInBhdGhGcm9tUm9vdCIsInYiLCJ1cmwiLCJzZWdtZW50IiwidG9TdHJpbmciLCJqb2luIiwiZmlsdGVyIiwicGF0aCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzExX18iLCJmZWF0dXJlcyIsIkF2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiZGVjbGFyYXRpb25zIiwiX2F2YWxhbmNoZV9hY3Rpdml0eV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fIiwiY3R4X3IzIiwiY3R4X3IwIiwiQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2UiLCJtb2RhbENvbnRyb2xsZXIiLCJzdGFydCIsImgiLCJtIiwiZW5kIiwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5IiwiRXN0aW1hdGVkTnVtVElEIiwidmFsIiwidW5kZWZpbmVkIiwic3RhcnREYXRlIiwibW9tZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX19fZGVmYXVsdCIsInN0YXJ0T2YiLCJpc1NhbWUiLCJkdE9ic1RpbWUiLCJtYXhEYXRlIiwiZ2V0TWF4RGF0ZUZvck5vdyIsImF2YWxhbmNoZUFjdGl2aXR5IiwiT2JqZWN0IiwiaXNOZXciLCJEdFN0YXJ0IiwiRHRFbmQiLCJ0b0lTT1N0cmluZyIsInRpbWVGcmFtZSIsInRpbWVGcmFtZXMiLCJmaW5kIiwidGYiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWxlY3RlZFRpbWVGcmFtZSIsImRpc21pc3MiLCJBdmFsYW5jaGVFeHRUSUQiLCJBdmFsVHJpZ2dlclNpbXBsZVRJRCIsIkRlc3RydWN0aXZlU2l6ZVRJRCIsIkF2YWxQcm9wYWdhdGlvblRJRCIsIkV4cG9zZWRIZWlnaHRDb21ib1RJRCIsIkV4cG9zZWRIZWlnaHQxIiwiRXhwb3NlZEhlaWdodDIiLCJWYWxpZEV4cG9zaXRpb24iLCJyZXNldFdoZW5Ob0FjdGl2aXR5RmllbGRzIiwiX2NvcmVfaGVscGVyc19pc19lbXB0eV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsInNlbGVjdG9ycyIsImlucHV0cyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiY3R4Iiwicm91dGVzIiwiY29tcG9uZW50IiwiX2F2YWxhbmNoZV9hY3Rpdml0eV9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJBdmFsYW5jaGVBY3Rpdml0eVBhZ2VNb2R1bGUiLCJfYXZhbGFuY2hlX2FjdGl2aXR5X21vZGFsX2F2YWxhbmNoZV9hY3Rpdml0eV9tb2RhbF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiQXZhbGFuY2hlQWN0aXZpdHlQYWdlIiwia2R2U2VydmljZSIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImF2YWxhbmNoZUNhdXNlIiwiZXN0aW1hdGVkTnVtYmVyIiwia2R2U3Vic2NyaXB0aW9uIiwiZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSIsImNhdXNlS2R2IiwiZXN0aW1hdGVkTnVtYmVyS2R2IiwidW5zdWJzY3JpYmUiLCJpbmRleCIsIl9hdmFsYW5jaGVfYWN0aXZpdHlfbW9kYWxfYXZhbGFuY2hlX2FjdGl2aXR5X21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsImNvbXBvbmVudFByb3BzIiwiQXZhbGFuY2hlQWN0aXZpdHlPYnMyIiwiRHRPYnNUaW1lIiwibW9kYWwiLCJkYXRhIiwic3BsaWNlIiwiYXZhbGFuY2hlQWN0aXZpdHlPYnMiLCJwdXNoIiwiY2F1c2UiLCJjIiwiSWQiLCJOYW1lIiwia2R2YWx1ZSIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtYWN0aXZpdHkvYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtYWN0aXZpdHkvYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtYWN0aXZpdHkvYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLWFjdGl2aXR5L2F2YWxhbmNoZS1hY3Rpdml0eS5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtYWN0aXZpdHkvYXZhbGFuY2hlLWFjdGl2aXR5LnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zbm93L2F2YWxhbmNoZS1hY3Rpdml0eS9hdmFsYW5jaGUtYWN0aXZpdHkucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlIH0gZnJvbSAnLi9hdmFsYW5jaGUtYWN0aXZpdHktbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0F2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXZhbGFuY2hlQWN0aXZpdHlNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5USVRMRScgfCB0cmFuc2xhdGV9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudCAqbmdJZj1cImF2YWxhbmNoZUFjdGl2aXR5Q29weVwiPlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbD57eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuTk9fQVZBTEFOQ0hFX0FDVElWSVRZJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgWyhuZ01vZGVsKV09XCJub0F2YWxhbmNoZUFjdGl2aXR5XCI+PC9pb24tY2hlY2tib3g+XHJcbiAgICA8L2lvbi1pdGVtPlxyXG4gICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnaGFzV2FybmluZyc6IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lfVwiPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57e1xyXG4gICAgICAgICdEQVRFJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8aW9uLWRhdGV0aW1lIGNvbG9yPVwibWVkaXVtXCIgbW9udGhTaG9ydE5hbWVzPVwie3sgJ01PTlRIUy5TSE9SVF9MSVNUJyB8IHRyYW5zbGF0ZSB9fVwiXHJcbiAgICAgICAgZG9uZVRleHQ9XCJ7eydESUFMT0dTLk9LJyB8IHRyYW5zbGF0ZX19XCIgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCJcclxuICAgICAgICBkaXNwbGF5LWZvcm1hdD1cIkQuIE1NTSwgWVlZWVwiIFttYXhdPVwibWF4RGF0ZVwiIFsobmdNb2RlbCldPVwic3RhcnREYXRlXCI+XHJcbiAgICAgIDwvaW9uLWRhdGV0aW1lPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbSAqbmdJZj1cImRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lXCI+XHJcbiAgICAgIDxpb24tbGFiZWwgY29sb3I9XCJkYW5nZXJcIiBjbGFzcz1cImlvbi10ZXh0LXdyYXBcIj5cclxuICAgICAgICB7eydBTEVSVC5XQVJOSU5HJyB8IHRyYW5zbGF0ZX19ISB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuREFURV9XQVJOSU5HJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkVTVElNQVRFRF9USU1FJ1xyXG4gICAgICAgIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPGlvbi1zZWxlY3QgY2FuY2VsVGV4dD1cInt7J0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19XCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFRpbWVGcmFtZVwiXHJcbiAgICAgICAgaW50ZXJmYWNlPVwiYWN0aW9uLXNoZWV0XCI+XHJcbiAgICAgICAgPGlvbi1zZWxlY3Qtb3B0aW9uIFt2YWx1ZV09XCJ0aW1lRnJhbWUuaWRcIiAqbmdGb3I9XCJsZXQgdGltZUZyYW1lIG9mIHRpbWVGcmFtZXNcIj5cclxuICAgICAgICAgIHt7IHRpbWVGcmFtZS50ZXh0IHwgdHJhbnNsYXRlIH19PC9pb24tc2VsZWN0LW9wdGlvbj5cclxuICAgICAgPC9pb24tc2VsZWN0PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbm9BdmFsYW5jaGVBY3Rpdml0eVwiPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuSE9XX01BTllfQVZBTEFOQ0hFU1wiIGtkdktleT1cIlNub3dfRXN0aW1hdGVkTnVtS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXN0aW1hdGVkTnVtVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQVZBTEFOQ0hFX1RZUEVcIiBrZHZLZXk9XCJTbm93X0F2YWxhbmNoZUV4dEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkF2YWxhbmNoZUV4dFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9PQlMuQVZBTEFOQ0hFX1RSSUdHRVJcIiBrZHZLZXk9XCJTbm93X0F2YWxUcmlnZ2VyU2ltcGxlS0RWXCJcclxuICAgICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuQXZhbFRyaWdnZXJTaW1wbGVUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfT0JTLkRFU1RSVUNUSVZFX1NJWkVcIiBrZHZLZXk9XCJTbm93X0Rlc3RydWN0aXZlU2l6ZUtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkRlc3RydWN0aXZlU2l6ZVRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlBST1BBR0FUSU9OXCIga2R2S2V5PVwiU25vd19BdmFsUHJvcGFnYXRpb25LRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImF2YWxhbmNoZUFjdGl2aXR5Q29weS5BdmFsUHJvcGFnYXRpb25USURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWV4cG9zZWQtaGVpZ2h0IFsoZXhwb3NlZEhlaWdodENvbWJvVElEKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodENvbWJvVElEXCJcclxuICAgICAgICBbKGV4cG9zZWRIaWdodDEpXT1cImF2YWxhbmNoZUFjdGl2aXR5Q29weS5FeHBvc2VkSGVpZ2h0MVwiXHJcbiAgICAgICAgWyhleHBvc2VkSGlnaHQyKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodDJcIj48L2FwcC1leHBvc2VkLWhlaWdodD5cclxuICAgICAgPGFwcC12YWxpZC1leHBvc2l0aW9uIFsodmFsaWRFeHBvc2l0aW9uKV09XCJhdmFsYW5jaGVBY3Rpdml0eUNvcHkuVmFsaWRFeHBvc2l0aW9uXCI+PC9hcHAtdmFsaWQtZXhwb3NpdGlvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5DT01NRU5UXCIgWyh2YWx1ZSldPVwiYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkNvbW1lbnRcIj5cclxuICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCIgW3Nob3dEZWxldGVdPVwiIWlzTmV3XCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlQWN0aXZpdHlPYnMyRWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYXZhbGFuY2hlQWN0aXZpdHk6IEF2YWxhbmNoZUFjdGl2aXR5T2JzMkVkaXRNb2RlbDtcclxuICBASW5wdXQoKSBkdE9ic1RpbWU6IHN0cmluZztcclxuXHJcbiAgYXZhbGFuY2hlQWN0aXZpdHlDb3B5OiBBdmFsYW5jaGVBY3Rpdml0eU9iczJFZGl0TW9kZWw7XHJcbiAgaXNOZXcgPSBmYWxzZTtcclxuICBtYXhEYXRlOiBzdHJpbmc7XHJcblxyXG4gIGdldCBub0F2YWxhbmNoZUFjdGl2aXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkVzdGltYXRlZE51bVRJRCA9PT0gMTtcclxuICB9XHJcblxyXG4gIHNldCBub0F2YWxhbmNoZUFjdGl2aXR5KHZhbDogYm9vbGVhbikge1xyXG4gICAgaWYgKHZhbCkge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5Fc3RpbWF0ZWROdW1USUQgPSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXN0aW1hdGVkTnVtVElEID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGRhdGVJc0RpZmZlcmVudFRoYW5PYnNUaW1lKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5zdGFydERhdGUgJiZcclxuICAgICAgIW1vbWVudCh0aGlzLnN0YXJ0RGF0ZSlcclxuICAgICAgICAuc3RhcnRPZignZGF5JylcclxuICAgICAgICAuaXNTYW1lKG1vbWVudCh0aGlzLmR0T2JzVGltZSkuc3RhcnRPZignZGF5JykpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdGltZUZyYW1lcyA9IFtcclxuICAgIHtcclxuICAgICAgaWQ6IDEsXHJcbiAgICAgIHN0YXJ0OiB7IGg6IDAsIG06IDAgfSxcclxuICAgICAgZW5kOiB7IGg6IDIzLCBtOiA1OSB9LFxyXG4gICAgICB0ZXh0OiAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkRVUklOR19USEVfREFZJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDIsXHJcbiAgICAgIHN0YXJ0OiB7IGg6IDAsIG06IDAgfSxcclxuICAgICAgZW5kOiB7IGg6IDYsIG06IDAgfSxcclxuICAgICAgdGV4dDogJzAtNidcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAzLFxyXG4gICAgICBzdGFydDogeyBoOiA2LCBtOiAwIH0sXHJcbiAgICAgIGVuZDogeyBoOiAxMiwgbTogMCB9LFxyXG4gICAgICB0ZXh0OiAnNi0xMidcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiA0LFxyXG4gICAgICBzdGFydDogeyBoOiAxMiwgbTogMCB9LFxyXG4gICAgICBlbmQ6IHsgaDogMTgsIG06IDAgfSxcclxuICAgICAgdGV4dDogJzEyLTE4J1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6IDUsXHJcbiAgICAgIHN0YXJ0OiB7IGg6IDE4LCBtOiAwIH0sXHJcbiAgICAgIGVuZDogeyBoOiAyMywgbTogNTkgfSxcclxuICAgICAgdGV4dDogJzE4LTI0J1xyXG4gICAgfVxyXG4gIF07XHJcblxyXG4gIHNlbGVjdGVkVGltZUZyYW1lID0gMTtcclxuICBzdGFydERhdGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcikge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JOb3coKTtcclxuICAgIGlmICh0aGlzLmF2YWxhbmNoZUFjdGl2aXR5KSB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5ID0geyAuLi50aGlzLmF2YWxhbmNoZUFjdGl2aXR5IH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weSA9IHt9O1xyXG4gICAgICB0aGlzLmlzTmV3ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRHRTdGFydCAmJlxyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdEVuZFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkR0U3RhcnQpO1xyXG4gICAgICBjb25zdCBlbmQgPSBtb21lbnQodGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRHRFbmQpO1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdFN0YXJ0KVxyXG4gICAgICAgIC5zdGFydE9mKCdkYXknKVxyXG4gICAgICAgIC50b0lTT1N0cmluZyh0cnVlKTtcclxuICAgICAgY29uc3QgdGltZUZyYW1lID0gdGhpcy50aW1lRnJhbWVzLmZpbmQoXHJcbiAgICAgICAgKHRmKSA9PlxyXG4gICAgICAgICAgdGYuc3RhcnQuaCA9PT0gc3RhcnQuaG91cnMoKSAmJlxyXG4gICAgICAgICAgdGYuZW5kLmggPT09IGVuZC5ob3VycygpICYmXHJcbiAgICAgICAgICB0Zi5zdGFydC5tID09PSBzdGFydC5taW51dGVzKCkgJiZcclxuICAgICAgICAgIHRmLmVuZC5tID09PSBlbmQubWludXRlcygpXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aW1lRnJhbWUpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZUZyYW1lID0gdGltZUZyYW1lLmlkO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnN0YXJ0RGF0ZSA9IG1vbWVudCh0aGlzLmR0T2JzVGltZSkuc3RhcnRPZignZGF5JykudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNYXhEYXRlRm9yTm93KCkge1xyXG4gICAgLy8gVGhlcmUgaXMgYW4gaXNzdWUgd2hlbiBzZXR0aW5nIG1heCBkYXRlIHRoYXQgd2hlbiBjaGFuZ2luZyBob3VyLCB0aGUgbWludXRlcyBpcyBzdGlsbCBtYXggbWludXRlcy5cclxuICAgIC8vIFdvcmthcm91bmQgaXMgdG8gc2V0IG1pbnV0ZXMgdG8gNTkuXHJcbiAgICByZXR1cm4gbW9tZW50KCkubWludXRlcyg1OSkudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0V2hlbk5vQWN0aXZpdHlGaWVsZHMoKSB7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5BdmFsYW5jaGVFeHRUSUQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5BdmFsVHJpZ2dlclNpbXBsZVRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkRlc3RydWN0aXZlU2l6ZVRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkF2YWxQcm9wYWdhdGlvblRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkV4cG9zZWRIZWlnaHRDb21ib1RJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5LkV4cG9zZWRIZWlnaHQxID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRXhwb3NlZEhlaWdodDIgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5WYWxpZEV4cG9zaXRpb24gPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIGlmICh0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5Fc3RpbWF0ZWROdW1USUQgPT09IDEpIHtcclxuICAgICAgdGhpcy5yZXNldFdoZW5Ob0FjdGl2aXR5RmllbGRzKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aW1lRnJhbWUgPSB0aGlzLnRpbWVGcmFtZXMuZmluZChcclxuICAgICAgKHRmKSA9PiB0Zi5pZCA9PT0gdGhpcy5zZWxlY3RlZFRpbWVGcmFtZVxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLnN0YXJ0RGF0ZSAmJiB0aW1lRnJhbWUpIHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkuRHRTdGFydCA9IG1vbWVudCh0aGlzLnN0YXJ0RGF0ZSlcclxuICAgICAgICAuaG91cnModGltZUZyYW1lLnN0YXJ0LmgpXHJcbiAgICAgICAgLm1pbnV0ZXModGltZUZyYW1lLnN0YXJ0Lm0pXHJcbiAgICAgICAgLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUFjdGl2aXR5Q29weS5EdEVuZCA9IG1vbWVudCh0aGlzLnN0YXJ0RGF0ZSlcclxuICAgICAgICAuaG91cnModGltZUZyYW1lLmVuZC5oKVxyXG4gICAgICAgIC5taW51dGVzKHRpbWVGcmFtZS5lbmQubSlcclxuICAgICAgICAudG9JU09TdHJpbmcodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc05ldyAmJiBJc0VtcHR5SGVscGVyLmlzRW1wdHkodGhpcy5hdmFsYW5jaGVBY3Rpdml0eUNvcHkpKSB7XHJcbiAgICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MobnVsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHRoaXMuYXZhbGFuY2hlQWN0aXZpdHlDb3B5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoeyBkZWxldGU6IHRydWUgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQXZhbGFuY2hlQWN0aXZpdHlQYWdlIH0gZnJvbSAnLi9hdmFsYW5jaGUtYWN0aXZpdHkucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4vYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IEF2YWxhbmNoZUFjdGl2aXR5UGFnZVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgU2hhcmVkQ29tcG9uZW50c01vZHVsZSxcclxuICAgIEF2YWxhbmNoZUFjdGl2aXR5TW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F2YWxhbmNoZUFjdGl2aXR5UGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZUFjdGl2aXR5UGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfQUNUSVZJVFkuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczJcIlxyXG4gICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5USVRMRScgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxpb24taXRlbSBkZXRhaWw9XCJ0cnVlXCIgKGNsaWNrKT1cImFkZE9yRWRpdEF2YWxhbmNoZUFjdGl2aXR5KGkpXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgYXZhbGFuY2hlQWN0aXZpdHkgb2YgcmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlQWN0aXZpdHlPYnMyOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eyBnZXRFc3RpbWF0ZWROdW1iZXIoYXZhbGFuY2hlQWN0aXZpdHkpIHxcclxuICAgICAgICAgIHRyYW5zbGF0ZSB9fTxzcGFuICpuZ0lmPVwiYXZhbGFuY2hlQWN0aXZpdHkuRXN0aW1hdGVkTnVtVElEICE9PSAxXCI+IHt7IGdldENhdXNlKGF2YWxhbmNoZUFjdGl2aXR5KSB8IHRyYW5zbGF0ZVxyXG4gICAgICAgICAgICB8XHJcbiAgICAgICAgICAgIGxvd2VyY2FzZVxyXG4gICAgICAgICAgICB9fTwvc3Bhbj48L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1pdGVtIChjbGljayk9XCJhZGRPckVkaXRBdmFsYW5jaGVBY3Rpdml0eSgpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX0FDVElWSVRZLkFERF9ORVcnIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLkFERF9JTUFHRVMnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXBpY3R1cmUtaXRlbSBbZ2VvSGF6YXJkXT1cInJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcIiBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCJcclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtvbkJlZm9yZUFkZF09XCJnZXRTYXZlRnVuYygpXCI+PC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICAgIDwvaW9uLWxpc3Q+XHJcbiAgPC9hcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlcj5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uLy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZSB9IGZyb20gJy4vYXZhbGFuY2hlLWFjdGl2aXR5LW1vZGFsL2F2YWxhbmNoZS1hY3Rpdml0eS1tb2RhbC5wYWdlJztcclxuaW1wb3J0IHtcclxuICBBdmFsYW5jaGVBY3Rpdml0eU9iczJFZGl0TW9kZWwsXHJcbiAgS2R2RWxlbWVudFxyXG59IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1hdmFsYW5jaGUtYWN0aXZpdHknLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmFsYW5jaGUtYWN0aXZpdHkucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hdmFsYW5jaGUtYWN0aXZpdHkucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEF2YWxhbmNoZUFjdGl2aXR5UGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBwcml2YXRlIGF2YWxhbmNoZUNhdXNlOiBLZHZFbGVtZW50W107XHJcbiAgcHJpdmF0ZSBlc3RpbWF0ZWROdW1iZXI6IEtkdkVsZW1lbnRbXTtcclxuICBwcml2YXRlIGtkdlN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKFxyXG4gICAgICBSZWdpc3RyYXRpb25UaWQuQXZhbGFuY2hlQWN0aXZpdHlPYnMyLFxyXG4gICAgICBiYXNlUGFnZVNlcnZpY2UsXHJcbiAgICAgIGFjdGl2YXRlZFJvdXRlXHJcbiAgICApO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVDYXVzZSA9IFtdO1xyXG4gICAgdGhpcy5lc3RpbWF0ZWROdW1iZXIgPSBbXTtcclxuICB9XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIHRoaXMua2R2U3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChbXHJcbiAgICAgIHRoaXMua2R2U2VydmljZS5nZXRLZHZSZXBvc2l0b3J5QnlLZXlPYnNlcnZhYmxlKCdTbm93X0F2YWxhbmNoZUV4dEtEVicpLFxyXG4gICAgICB0aGlzLmtkdlNlcnZpY2UuZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSgnU25vd19Fc3RpbWF0ZWROdW1LRFYnKVxyXG4gICAgXSkuc3Vic2NyaWJlKChbY2F1c2VLZHYsIGVzdGltYXRlZE51bWJlcktkdl0pID0+IHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVDYXVzZSA9IGNhdXNlS2R2O1xyXG4gICAgICB0aGlzLmVzdGltYXRlZE51bWJlciA9IGVzdGltYXRlZE51bWJlcktkdjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmtkdlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkT3JFZGl0QXZhbGFuY2hlQWN0aXZpdHkoaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgY29tcG9uZW50OiBBdmFsYW5jaGVBY3Rpdml0eU1vZGFsUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBhdmFsYW5jaGVBY3Rpdml0eTogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczJbXHJcbiAgICAgICAgICBpbmRleFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZHRPYnNUaW1lOiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1vZGFsLm9uRGlkRGlzbWlzcygpO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3QgYXZhbGFuY2hlQWN0aXZpdHlPYnM6IEF2YWxhbmNoZUFjdGl2aXR5T2JzMkVkaXRNb2RlbCA9IHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgaWYgKGluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczJbXHJcbiAgICAgICAgICAgICAgaW5kZXhcclxuICAgICAgICAgICAgXSA9IGF2YWxhbmNoZUFjdGl2aXR5T2JzO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVBY3Rpdml0eU9iczIucHVzaChcclxuICAgICAgICAgICAgICBhdmFsYW5jaGVBY3Rpdml0eU9ic1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXVzZShhdmFsYW5jaGVBY3Rpdml0eU9iczogQXZhbGFuY2hlQWN0aXZpdHlPYnMyRWRpdE1vZGVsKSB7XHJcbiAgICBjb25zdCBjYXVzZSA9IHRoaXMuYXZhbGFuY2hlQ2F1c2UuZmluZChcclxuICAgICAgKGMpID0+IGMuSWQgPT09IGF2YWxhbmNoZUFjdGl2aXR5T2JzLkF2YWxhbmNoZUV4dFRJRFxyXG4gICAgKTtcclxuICAgIGlmIChjYXVzZSkge1xyXG4gICAgICByZXR1cm4gY2F1c2UuTmFtZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVU5LTk9XTl9UWVBFJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEVzdGltYXRlZE51bWJlcihhdmFsYW5jaGVBY3Rpdml0eU9iczogQXZhbGFuY2hlQWN0aXZpdHlPYnMyRWRpdE1vZGVsKSB7XHJcbiAgICBjb25zdCBrZHZhbHVlID0gdGhpcy5lc3RpbWF0ZWROdW1iZXIuZmluZChcclxuICAgICAgKGMpID0+IGMuSWQgPT09IGF2YWxhbmNoZUFjdGl2aXR5T2JzLkVzdGltYXRlZE51bVRJRFxyXG4gICAgKTtcclxuICAgIGlmIChrZHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBrZHZhbHVlLk5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9BQ1RJVklUWS5VTktOT1dOX05VTUJFUic7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==