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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_set-time_set-time_module_ts"], {
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
    18209: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CanDeactivateToObsLocationRouteGuard": function CanDeactivateToObsLocationRouteGuard() {
          return (
            /* binding */
            _CanDeactivateToObsLocationRouteGuard
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      7602);

      var _CanDeactivateToObsLocationRouteGuard = /*#__PURE__*/function () {
        function _CanDeactivateToObsLocationRouteGuard(navController) {
          _classCallCheck(this, _CanDeactivateToObsLocationRouteGuard);

          this.navController = navController;
        }

        _createClass(_CanDeactivateToObsLocationRouteGuard, [{
          key: "canDeactivate",
          value: function canDeactivate(component, _, __, nextState) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (nextState && nextState.url.indexOf('registration/new') >= 0 && component.registration) {
                        this.navController.navigateBack("registration/obs-location/".concat(component.registration.id));
                      }

                      return _context8.abrupt("return", true);

                    case 2:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }]);

        return _CanDeactivateToObsLocationRouteGuard;
      }();

      _CanDeactivateToObsLocationRouteGuard.ɵfac = function CanDeactivateToObsLocationRouteGuard_Factory(t) {
        return new (t || _CanDeactivateToObsLocationRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.NavController));
      };

      _CanDeactivateToObsLocationRouteGuard.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _CanDeactivateToObsLocationRouteGuard,
        factory: _CanDeactivateToObsLocationRouteGuard.ɵfac
      });
      /***/
    },

    /***/
    10064: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetTimePageModule": function SetTimePageModule() {
          return (
            /* binding */
            _SetTimePageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _set_time_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./set-time.page */
      78912);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared/shared.module */
      72271);
      /* harmony import */


      var _can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./can-deactivate-to-obs-location.guard */
      18209);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _set_time_page__WEBPACK_IMPORTED_MODULE_0__.SetTimePage,
        canDeactivate: [_can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateToObsLocationRouteGuard]
      }];

      var _SetTimePageModule = function _SetTimePageModule() {
        _classCallCheck(this, _SetTimePageModule);
      };

      _SetTimePageModule.ɵfac = function SetTimePageModule_Factory(t) {
        return new (t || _SetTimePageModule)();
      };

      _SetTimePageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _SetTimePageModule
      });
      _SetTimePageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        providers: [_can_deactivate_to_obs_location_guard__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateToObsLocationRouteGuard],
        imports: [[_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_SetTimePageModule, {
          declarations: [_set_time_page__WEBPACK_IMPORTED_MODULE_0__.SetTimePage],
          imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    78912: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetTimePage": function SetTimePage() {
          return (
            /* binding */
            _SetTimePage
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
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../base.page */
      81877);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../base-page-service */
      35140);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      var _SetTimePage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_SetTimePage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_SetTimePage);

        function _SetTimePage(basePageService, activatedRoute, navController) {
          var _this8;

          _classCallCheck(this, _SetTimePage);

          _this8 = _super2.call(this, null, basePageService, activatedRoute);
          _this8.navController = navController;

          _this8.setToNow();

          return _this8;
        }

        _createClass(_SetTimePage, [{
          key: "onInit",
          value: function onInit() {
            if (this.registration && this.registration.request.DtObsTime) {
              this.localDate = this.registration.request.DtObsTime;
            }
          }
        }, {
          key: "setToNow",
          value: function setToNow() {
            var now = moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
            this.maxDate = this.getMaxDateForNow();
            this.localDate = now;
          }
        }, {
          key: "getMaxDateForNow",
          value: function getMaxDateForNow() {
            // There is an issue when setting max date that when changing hour, the minutes is still max minutes.
            // Workaround is to set minutes to 59.
            return moment__WEBPACK_IMPORTED_MODULE_0___default()().minutes(59).toISOString(true);
          }
        }, {
          key: "confirm",
          value: function confirm() {
            if (this.registration) {
              this.registration.request.DtObsTime = this.localDate || moment__WEBPACK_IMPORTED_MODULE_0___default()().toISOString(true);
              this.navController.navigateRoot('registration/edit/' + this.registration.id);
            }
          }
        }]);

        return _SetTimePage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _SetTimePage.ɵfac = function SetTimePage_Factory(t) {
        return new (t || _SetTimePage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController));
      };

      _SetTimePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _SetTimePage,
        selectors: [["app-set-time"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"]],
        decls: 26,
        vars: 24,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], ["lines", "none"], [1, "ion-text-uppercase"], ["color", "medium", "display-format", "D. MMM, YYYY HH:mm", 3, "monthShortNames", "doneText", "cancelText", "ngModel", "max", "ngModelChange"], ["slot", "end", "fill", "outline", "color", "medium", 3, "click"], ["slot", "start", "name", "time"], ["lines", "none", 1, "ion-padding"], ["expand", "block", "color", "varsom-orange", 1, "confirm-time", "ion-no-margin", 3, "disabled", "click"]],
        template: function SetTimePage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "ion-list", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-list-header", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](12, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "ion-datetime", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function SetTimePage_Template_ion_datetime_ngModelChange_14_listener($event) {
              return ctx.localDate = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](15, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](16, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](17, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SetTimePage_Template_ion_button_click_18_listener() {
              return ctx.setToNow();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](19, "ion-icon", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](21, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "ion-list", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "ion-button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SetTimePage_Template_ion_button_click_23_listener() {
              return ctx.confirm();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](25, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](6, 10, "REGISTRATION.SET_TIME.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](12, 12, "REGISTRATION.SET_TIME.HEADER"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("monthShortNames", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](15, 14, "MONTHS.SHORT_LIST"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](16, 16, "DIALOGS.OK"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](17, 18, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.localDate)("max", ctx.maxDate);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](21, 20, "REGISTRATION.SET_TIME.NOW"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.registration);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](25, 22, "REGISTRATION.SET_TIME.CONFIRM"));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
        styles: ["ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-size: 20px;\n  padding-top: 30px;\n  padding-bottom: 30px;\n  padding-right: 0px;\n  padding-left: 40px;\n  width: 100%;\n  text-align: center;\n}\nion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  z-index: 200;\n}\n.confirm-time[_ngcontent-%COMP%] {\n  height: var(--ion-button-height);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldC10aW1lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLDhCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FBRE47QUFJSTtFQUNFLFlBQUE7QUFGTjtBQU1BO0VBQ0UsZ0NBQUE7QUFIRiIsImZpbGUiOiJzZXQtdGltZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tbGlzdCB7XHJcbiAgaW9uLWl0ZW0ge1xyXG4gICAgaW9uLWRhdGV0aW1lIHtcclxuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xyXG4gICAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICAgIHBhZGRpbmctdG9wOiAzMHB4O1xyXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMzBweDtcclxuICAgICAgcGFkZGluZy1yaWdodDogMHB4O1xyXG4gICAgICBwYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgaW9uLWJ1dHRvbiB7XHJcbiAgICAgIHotaW5kZXg6IDIwMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuLmNvbmZpcm0tdGltZSB7XHJcbiAgaGVpZ2h0OiB2YXIoLS1pb24tYnV0dG9uLWhlaWdodCk7XHJcbn1cclxuIl19 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUNFQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBRXNDQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBQ3RDQTs7QUFDQUE7O0FBQXFEQTtBQUFBLHFCQUFTTSxjQUFUO0FBQW1CLGFBQW5COztBQUNuRE47O0FBQStDQTs7OztBQUVqREE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQUNFQTtBQUFBLHFCQUFTTSxhQUFUO0FBQWtCLGFBQWxCOztBQUFvQk47Ozs7QUFDVEE7O0FBQ2ZBOztBQUNGQTs7OztBQTNCTUE7O0FBQUFBOztBQVFFQTs7QUFBQUE7O0FBSTJCQTs7QUFBQUE7O0FBQzNCQTs7QUFBd0NBOztBQUNKQSwrRkFBdUIsS0FBdkIsRUFBdUJNLFdBQXZCOztBQUdXTjs7QUFBQUE7O0FBTXZDQTs7QUFBQUE7O0FBQ1VBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbIkRFQlVHX1RBRyIsIkJhc2VQYWdlU2VydmljZSIsInJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZXdBdHRhY2htZW50U2VydmljZSIsImNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJuZ1pvbmUiLCJhbGVydENvbnRyb2xsZXIiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwibG9nZ2luZ1NlcnZpY2UiLCJyZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb25UaWQiLCJvblJlc2V0IiwiZ2V0IiwidG9Qcm9taXNlIiwibGVhdmVUZXh0IiwiY3JlYXRlUmVzZXREaWFsb2ciLCJtZXNzYWdlIiwidHJhbnNsYXRpb25zIiwiY3JlYXRlIiwiYnV0dG9ucyIsInRleHQiLCJyb2xlIiwiYWxlcnQiLCJwcmVzZW50Iiwib25EaWREaXNtaXNzIiwicmVzdWx0IiwicmVzZXQiLCJab25lIiwicnVuIiwicmVxdWVzdCIsImdldERlZmF1bHRWYWx1ZSIsInJlc2V0SW1hZ2VzIiwic2F2ZVJlZ2lzdHJhdGlvbkFzeW5jIiwicHJvcE5hbWUiLCJnZXRBdHRhY2htZW50cyIsImlkIiwicGlwZSIsImF0dGFjaG1lbnRzIiwibWFwIiwiYSIsInJlbW92ZUF0dGFjaG1lbnQiLCJzdWJzY3JpYmUiLCJkZWJ1ZyIsImVycm9yIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfN19fIiwiZmFjdG9yeSIsInByb3ZpZGVkSW4iLCJCYXNlUGFnZSIsImJhc2VQYWdlU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwic25hcHNob3QiLCJwYXJhbXMiLCJDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIiwiZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQiLCJyZWciLCJjcmVhdGVEZWZhdWx0UHJvcHMiLCJjcmVhdGVJbml0T2JzZXJ2YWJsZSIsIm5nRGVzdHJveSQiLCJQcm9taXNlIiwicmVzb2x2ZSIsImlzVmFsaWQiLCJ2YWxpZCIsImlzRW1wdHkiLCJjb25maXJtTGVhdmUiLCJvbkluaXQiLCJvbkJlZm9yZUxlYXZlIiwic2F2ZSIsImNsZWFuIiwic3luY1N0YXR1cyIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIlJlZ2lzdHJhdGlvblNlcnZpY2UiLCJoYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyIsImNvbmZpcm1SZXNldCIsInBhdGhGcm9tUm9vdCIsInYiLCJ1cmwiLCJzZWdtZW50IiwidG9TdHJpbmciLCJqb2luIiwiZmlsdGVyIiwicGF0aCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzExX18iLCJmZWF0dXJlcyIsIkNhbkRlYWN0aXZhdGVUb09ic0xvY2F0aW9uUm91dGVHdWFyZCIsIm5hdkNvbnRyb2xsZXIiLCJjb21wb25lbnQiLCJfIiwiX18iLCJuZXh0U3RhdGUiLCJpbmRleE9mIiwibmF2aWdhdGVCYWNrIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwicm91dGVzIiwiX3NldF90aW1lX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNhbkRlYWN0aXZhdGUiLCJfY2FuX2RlYWN0aXZhdGVfdG9fb2JzX2xvY2F0aW9uX2d1YXJkX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJTZXRUaW1lUGFnZU1vZHVsZSIsImltcG9ydHMiLCJfc2hhcmVkX3NoYXJlZF9tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNF9fIiwiZGVjbGFyYXRpb25zIiwiU2V0VGltZVBhZ2UiLCJzZXRUb05vdyIsIkR0T2JzVGltZSIsImxvY2FsRGF0ZSIsIm5vdyIsIm1vbWVudF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fX2RlZmF1bHQiLCJ0b0lTT1N0cmluZyIsIm1heERhdGUiLCJnZXRNYXhEYXRlRm9yTm93IiwibWludXRlcyIsIm5hdmlnYXRlUm9vdCIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsInNlbGVjdG9ycyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiY3R4Il0sInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UtcGFnZS1zZXJ2aWNlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Jhc2UucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtdGltZS9jYW4tZGVhY3RpdmF0ZS10by1vYnMtbG9jYXRpb24uZ3VhcmQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc2V0LXRpbWUvc2V0LXRpbWUubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC10aW1lL3NldC10aW1lLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc2V0LXRpbWUvc2V0LXRpbWUucGFnZS5odG1sIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0UHJvcGVydHlOYW1lLCBpc0FycmF5VHlwZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5oZWxwZXJzJztcclxuaW1wb3J0IHsgTmV3QXR0YWNobWVudFNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdCYXNlUGFnZVNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZVNlcnZpY2Uge1xyXG4gIGdldCBab25lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmdab25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IEFsZXJ0Q29udHJvbGxlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFsZXJ0Q29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBUcmFuc2xhdGVTZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBjb25maXJtTGVhdmUocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5SRVFVSVJFRF9GSUVMRFNfTUlTU0lORycpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtUmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5DT05GSVJNX1JFU0VUJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUmVzZXREaWFsb2cobWVzc2FnZTogc3RyaW5nLCByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuWUVTJ10pLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ZRVMnXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICAgIGNvbnN0IHJlc2V0OiBib29sZWFuID0gcmVzdWx0LnJvbGUgIT09ICdjYW5jZWwnO1xyXG4gICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc2V0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCldID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICB0aGlzLnJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9uUmVzZXQpIHtcclxuICAgICAgICBvblJlc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhyZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGVmYXVsdFByb3BzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGNvbnN0IHByb3BOYW1lID0gZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICBpZiAoIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSkge1xyXG4gICAgICAvLyBJbml0IHRvIG5ldyBvYmplY3QgaWYgbnVsbFxyXG4gICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBpZiAoaXNBcnJheVR5cGUocmVnaXN0cmF0aW9uVGlkKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEltYWdlcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2VcclxuICAgICAgLmdldEF0dGFjaG1lbnRzKHJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgLnBpcGUoc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT4gZm9ya0pvaW4oYXR0YWNobWVudHMubWFwKChhKSA9PiB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQocmVnaXN0cmF0aW9uLmlkLCBhLmlkKSkpKSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdSZXNldCBpbWFnZXMgY29tcGxldGUnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKGVycm9yLCBERUJVR19UQUcsICdDb3VsZCBub3QgcmVzZXQgaW1hZ2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2U7XHJcbiAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlID0gYmFzZVBhZ2VTZXJ2aWNlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25UaWQgPSByZWdpc3RyYXRpb25UaWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIG1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5jcmVhdGVEZWZhdWx0UHJvcHMocmVnLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcmVhdGVJbml0T2JzZXJ2YWJsZSgpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdD8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25CZWZvcmVMZWF2ZT8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25SZXNldD8oKTogdm9pZDtcclxuXHJcbiAgaXNWYWxpZD8oKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8vIE5PVEU6IFJlbWVtYmVyIHRvIGFkZCBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdIGluIHBhZ2UgbW9kdWxlXHJcbiAgYXN5bmMgY2FuTGVhdmUoKSB7XHJcbiAgICAvLyBDaGVjayBpZiBpbXBsZW1lbnRhdGlvbiBwYWdlIGhhcyBpbXBsZW1lbnRlZCBjdXN0b20gaXNWYWxpZCBsb2dpY1xyXG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc1ZhbGlkID8gdGhpcy5pc1ZhbGlkKCkgOiB0cnVlKTtcclxuICAgIC8vIE9ubHkgcmV0dXJuIGFsZXJ0IGlmIHBhZ2UgaXMgbm90IGVtcHR5IGFuZCBpbnZhbGlkXHJcbiAgICBjb25zdCBpc0VtcHR5ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNFbXB0eSgpKTtcclxuICAgIGlmICghaXNFbXB0eSAmJiAhdmFsaWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1MZWF2ZSh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbml0T2JzZXJ2YWJsZSgpIHtcclxuICAgIGlmICh0aGlzLm9uSW5pdCkge1xyXG4gICAgICByZXR1cm4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5vbkluaXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHt9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkJlZm9yZUxlYXZlKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLm9uQmVmb3JlTGVhdmUoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGNsZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLlJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uLCBjbGVhbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gIShhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25UaWRcclxuICAgIClcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1SZXNldCh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldFJlc29sdmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnLycgK1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gICAgICAgIC5tYXAoKHYpID0+IHYudXJsLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC50b1N0cmluZygpKS5qb2luKCcvJykpXHJcbiAgICAgICAgLmZpbHRlcigocGF0aCkgPT4gISFwYXRoKVxyXG4gICAgICAgIC5qb2luKCcvJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRDb25maWd1cmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgLy8gICAgIHJldHVybiAnLycgKyB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gIC8vICAgICAgICAgLmZpbHRlcih2ID0+IHYucm91dGVDb25maWcpXHJcbiAgLy8gICAgICAgICAubWFwKHYgPT4gdi5yb3V0ZUNvbmZpZy5wYXRoKVxyXG4gIC8vICAgICAgICAgLmpvaW4oJy8nKTtcclxuICAvLyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENhbkRlYWN0aXZhdGUsXHJcbiAgUm91dGVyU3RhdGVTbmFwc2hvdCxcclxuICBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90XHJcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU2V0VGltZVBhZ2UgfSBmcm9tICcuL3NldC10aW1lLnBhZ2UnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ2FuRGVhY3RpdmF0ZVRvT2JzTG9jYXRpb25Sb3V0ZUd1YXJkXHJcbiAgaW1wbGVtZW50cyBDYW5EZWFjdGl2YXRlPFNldFRpbWVQYWdlPiB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyKSB7fVxyXG5cclxuICBhc3luYyBjYW5EZWFjdGl2YXRlKFxyXG4gICAgY29tcG9uZW50OiBTZXRUaW1lUGFnZSxcclxuICAgIF86IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXHJcbiAgICBfXzogUm91dGVyU3RhdGVTbmFwc2hvdCxcclxuICAgIG5leHRTdGF0ZT86IFJvdXRlclN0YXRlU25hcHNob3RcclxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGlmIChcclxuICAgICAgbmV4dFN0YXRlICYmXHJcbiAgICAgIG5leHRTdGF0ZS51cmwuaW5kZXhPZigncmVnaXN0cmF0aW9uL25ldycpID49IDAgJiZcclxuICAgICAgY29tcG9uZW50LnJlZ2lzdHJhdGlvblxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZUJhY2soXHJcbiAgICAgICAgYHJlZ2lzdHJhdGlvbi9vYnMtbG9jYXRpb24vJHtjb21wb25lbnQucmVnaXN0cmF0aW9uLmlkfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNldFRpbWVQYWdlIH0gZnJvbSAnLi9zZXQtdGltZS5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBDYW5EZWFjdGl2YXRlVG9PYnNMb2NhdGlvblJvdXRlR3VhcmQgfSBmcm9tICcuL2Nhbi1kZWFjdGl2YXRlLXRvLW9icy1sb2NhdGlvbi5ndWFyZCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogU2V0VGltZVBhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVRvT2JzTG9jYXRpb25Sb3V0ZUd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZE1vZHVsZSwgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxyXG4gIGRlY2xhcmF0aW9uczogW1NldFRpbWVQYWdlXSxcclxuICBwcm92aWRlcnM6IFtDYW5EZWFjdGl2YXRlVG9PYnNMb2NhdGlvblJvdXRlR3VhcmRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXRUaW1lUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4uL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2V0LXRpbWUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zZXQtdGltZS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NldC10aW1lLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXRUaW1lUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBtYXhEYXRlOiBzdHJpbmc7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGxvY2FsRGF0ZTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyXHJcbiAgKSB7XHJcbiAgICBzdXBlcihudWxsLCBiYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlKTtcclxuICAgIHRoaXMuc2V0VG9Ob3coKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLnJlZ2lzdHJhdGlvbiAmJiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkR0T2JzVGltZSkge1xyXG4gICAgICB0aGlzLmxvY2FsRGF0ZSA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRHRPYnNUaW1lO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRUb05vdygpIHtcclxuICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgdGhpcy5tYXhEYXRlID0gdGhpcy5nZXRNYXhEYXRlRm9yTm93KCk7XHJcbiAgICB0aGlzLmxvY2FsRGF0ZSA9IG5vdztcclxuICB9XHJcblxyXG4gIGdldE1heERhdGVGb3JOb3coKSB7XHJcbiAgICAvLyBUaGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHNldHRpbmcgbWF4IGRhdGUgdGhhdCB3aGVuIGNoYW5naW5nIGhvdXIsIHRoZSBtaW51dGVzIGlzIHN0aWxsIG1heCBtaW51dGVzLlxyXG4gICAgLy8gV29ya2Fyb3VuZCBpcyB0byBzZXQgbWludXRlcyB0byA1OS5cclxuICAgIHJldHVybiBtb21lbnQoKS5taW51dGVzKDU5KS50b0lTT1N0cmluZyh0cnVlKTtcclxuICB9XHJcblxyXG4gIGNvbmZpcm0oKSB7XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24pIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUgPVxyXG4gICAgICAgIHRoaXMubG9jYWxEYXRlIHx8IG1vbWVudCgpLnRvSVNPU3RyaW5nKHRydWUpO1xyXG4gICAgICB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVSb290KFxyXG4gICAgICAgICdyZWdpc3RyYXRpb24vZWRpdC8nICsgdGhpcy5yZWdpc3RyYXRpb24uaWRcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3tcIlJFR0lTVFJBVElPTi5TRVRfVElNRS5USVRMRVwiIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cIm5vbmVcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLlNFVF9USU1FLkhFQURFUlwiIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgIDxpb24taXRlbT5cclxuICAgICAgPGlvbi1kYXRldGltZSBjb2xvcj1cIm1lZGl1bVwiIG1vbnRoU2hvcnROYW1lcz1cInt7ICdNT05USFMuU0hPUlRfTElTVCcgfCB0cmFuc2xhdGUgfX1cIlxyXG4gICAgICAgIGRvbmVUZXh0PVwie3snRElBTE9HUy5PSycgfCB0cmFuc2xhdGV9fVwiIGNhbmNlbFRleHQ9XCJ7eydESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGV9fVwiXHJcbiAgICAgICAgZGlzcGxheS1mb3JtYXQ9XCJELiBNTU0sIFlZWVkgSEg6bW1cIiBbKG5nTW9kZWwpXT1cImxvY2FsRGF0ZVwiIFttYXhdPVwibWF4RGF0ZVwiPlxyXG4gICAgICA8L2lvbi1kYXRldGltZT5cclxuICAgICAgPGlvbi1idXR0b24gc2xvdD1cImVuZFwiIGZpbGw9XCJvdXRsaW5lXCIgY29sb3I9XCJtZWRpdW1cIiAoY2xpY2spPVwic2V0VG9Ob3coKVwiPlxyXG4gICAgICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidGltZVwiPjwvaW9uLWljb24+IHt7XCJSRUdJU1RSQVRJT04uU0VUX1RJTUUuTk9XXCIgfFxyXG4gICAgICAgIHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgPC9pb24tbGlzdD5cclxuICA8aW9uLWxpc3QgbGluZXM9XCJub25lXCIgY2xhc3M9XCJpb24tcGFkZGluZ1wiPlxyXG4gICAgPGlvbi1idXR0b24gW2Rpc2FibGVkXT1cIiF0aGlzLnJlZ2lzdHJhdGlvblwiIGNsYXNzPVwiY29uZmlybS10aW1lIGlvbi1uby1tYXJnaW5cIiBleHBhbmQ9XCJibG9ja1wiIGNvbG9yPVwidmFyc29tLW9yYW5nZVwiXHJcbiAgICAgIChjbGljayk9XCJjb25maXJtKClcIj57e1wiUkVHSVNUUkFUSU9OLlNFVF9USU1FLkNPTkZJUk1cIiB8XHJcbiAgICAgIHRyYW5zbGF0ZX19PC9pb24tYnV0dG9uPlxyXG4gIDwvaW9uLWxpc3Q+XHJcbjwvaW9uLWNvbnRlbnQ+Il19