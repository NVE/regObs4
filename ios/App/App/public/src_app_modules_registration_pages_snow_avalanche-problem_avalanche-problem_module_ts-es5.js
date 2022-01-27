(function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_snow_avalanche-problem_avalanche-problem_module_ts"], {
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
    79017: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheProblemModalPageModule": function AvalancheProblemModalPageModule() {
          return (
            /* binding */
            _AvalancheProblemModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./avalanche-problem-modal.page */
      95218);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AvalancheProblemModalPageModule = function _AvalancheProblemModalPageModule() {
        _classCallCheck(this, _AvalancheProblemModalPageModule);
      };

      _AvalancheProblemModalPageModule.ɵfac = function AvalancheProblemModalPageModule_Factory(t) {
        return new (t || _AvalancheProblemModalPageModule)();
      };

      _AvalancheProblemModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _AvalancheProblemModalPageModule
      });
      _AvalancheProblemModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_AvalancheProblemModalPageModule, {
          declarations: [_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    95218: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheProblemModalPage": function AvalancheProblemModalPage() {
          return (
            /* binding */
            _AvalancheProblemModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../../../core/services/kdv/kdv.service */
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


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../components/snow/exposed-height/exposed-height.component */
      55935);
      /* harmony import */


      var _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../components/snow/valid-exposition/valid-exposition.component */
      70133);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-checkbox", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template_ion_checkbox_ngModelChange_3_listener($event) {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var avalancheCauseAttribute_r3 = restoredCtx.$implicit;
            return avalancheCauseAttribute_r3.selected = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var avalancheCauseAttribute_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", avalancheCauseAttribute_r3.kdvElement.Name, "");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", avalancheCauseAttribute_r3.selected);
        }
      }

      function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "app-kdv-select", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template_app_kdv_select_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r6.avalancheEvalProblemCopy.AvalCauseTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "app-kdv-select", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_ng_container_11_Template_app_kdv_select_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r8.avalancheEvalProblemCopy.AvalCauseDepthTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, AvalancheProblemModalPage_ion_content_9_ng_container_11_ion_item_3_Template, 4, 2, "ion-item", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r1.avalancheEvalProblemCopy.AvalCauseTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r1.avalancheEvalProblemCopy.AvalCauseDepthTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.avalancheCauseAttributes);
        }
      }

      function AvalancheProblemModalPage_ion_content_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](9, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-checkbox", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function AvalancheProblemModalPage_ion_content_9_Template_ion_checkbox_ngModelChange_10_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r9.noWeakLayers = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, AvalancheProblemModalPage_ion_content_9_ng_container_11_Template, 4, 3, "ng-container", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "app-kdv-select", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r11.avalancheEvalProblemCopy.AvalancheExtTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](17, "app-kdv-select", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_17_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r12.avalancheEvalProblemCopy.AvalTriggerSimpleTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "app-kdv-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_18_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r13.avalancheEvalProblemCopy.DestructiveSizeTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](19, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](22, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "app-kdv-select", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_kdv_select_valueChange_23_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r14.avalancheEvalProblemCopy.AvalPropagationTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "app-exposed-height", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("exposedHeightComboTIDChange", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHeightComboTIDChange_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r15.avalancheEvalProblemCopy.ExposedHeightComboTID = $event;
          })("exposedHight1Change", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHight1Change_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r16.avalancheEvalProblemCopy.ExposedHeight1 = $event;
          })("exposedHight2Change", function AvalancheProblemModalPage_ion_content_9_Template_app_exposed_height_exposedHight2Change_24_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r17.avalancheEvalProblemCopy.ExposedHeight2 = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "app-valid-exposition", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("validExpositionChange", function AvalancheProblemModalPage_ion_content_9_Template_app_valid_exposition_validExpositionChange_25_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r18.avalancheEvalProblemCopy.ValidExposition = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "app-text-comment", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("valueChange", function AvalancheProblemModalPage_ion_content_9_Template_app_text_comment_valueChange_26_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r19.avalancheEvalProblemCopy.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "app-modal-save-or-delete-buttons", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("saveClicked", function AvalancheProblemModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_27_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r20.ok();
          })("deleteClicked", function AvalancheProblemModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_27_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r21["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 17, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](9, 19, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.NO_WEAK_LAYERS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r0.noWeakLayers);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.noWeakLayers);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 21, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_PROBABILITY"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalancheExtTID)("filter", ctx_r0.avalancheExtKdvFilter);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalTriggerSimpleTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.DestructiveSizeTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](22, 23, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.AvalPropagationTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("exposedHeightComboTID", ctx_r0.avalancheEvalProblemCopy.ExposedHeightComboTID)("exposedHight1", ctx_r0.avalancheEvalProblemCopy.ExposedHeight1)("exposedHight2", ctx_r0.avalancheEvalProblemCopy.ExposedHeight2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("validExposition", ctx_r0.avalancheEvalProblemCopy.ValidExposition);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", ctx_r0.avalancheEvalProblemCopy.Comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("showDelete", !ctx_r0.isNew);
        }
      }

      var NO_WEAK_LAYER_KDV_VALUE = 24;

      var _AvalancheProblemModalPage = /*#__PURE__*/function () {
        function _AvalancheProblemModalPage(modalController, kdvService) {
          _classCallCheck(this, _AvalancheProblemModalPage);

          this.modalController = modalController;
          this.kdvService = kdvService;
          this.isNew = false;
        }

        _createClass(_AvalancheProblemModalPage, [{
          key: "noWeakLayers",
          get: function get() {
            return this.avalancheEvalProblemCopy.AvalCauseTID === NO_WEAK_LAYER_KDV_VALUE;
          },
          set: function set(val) {
            this.avalancheEvalProblemCopy.AvalCauseTID = val ? NO_WEAK_LAYER_KDV_VALUE : undefined;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this8 = this;

            this.avalancheExtKdvFilter = this.internalAvalancheExtKdvFilter.bind(this);

            if (this.avalancheEvalProblem) {
              this.avalancheEvalProblemCopy = Object.assign({}, this.avalancheEvalProblem);
            } else {
              this.avalancheEvalProblemCopy = {};
              this.isNew = true;
            }

            this.viewSubscription = (0, rxjs__WEBPACK_IMPORTED_MODULE_9__.combineLatest)(this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseAttributeFlags'), this.kdvService.getViewRepositoryByKeyObservable('AvalancheProblemMenu3V')).subscribe(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  snowCauseAttributesKdvElements = _ref2[0],
                  avalancheProblemView = _ref2[1];

              _this8.avalancheProblemView = avalancheProblemView;
              _this8.avalancheCauseAttributes = _this8.getAvalancheCauseAttributes(snowCauseAttributesKdvElements);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.viewSubscription) {
              this.viewSubscription.unsubscribe();
            }
          }
        }, {
          key: "internalAvalancheExtKdvFilter",
          value: function internalAvalancheExtKdvFilter(id) {
            var avalCauseTid = this.avalancheEvalProblemCopy.AvalCauseTID || 0;
            var views = this.avalancheProblemView.filter(function (v) {
              return v.AvalCauseTID === avalCauseTid;
            }).map(function (v) {
              return v.AvalancheExtTID;
            });
            return views.indexOf(id) >= 0;
          }
        }, {
          key: "getAvalancheCauseAttributes",
          value: function getAvalancheCauseAttributes(kdvElements) {
            var _this9 = this;

            return kdvElements.map(function (val) {
              return {
                kdvElement: val,
                selected: _this9.isAvalancheCauseSelected(val)
              };
            });
          }
        }, {
          key: "isAvalancheCauseSelected",
          value: function isAvalancheCauseSelected(kdvElement) {
            switch (kdvElement.Id) {
              case 1:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID === kdvElement.Id;

              case 2:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID === kdvElement.Id;

              case 4:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID === kdvElement.Id;

              case 8:
                return this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID === kdvElement.Id;
            }

            return false;
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          } // getAvalacheCauseAttributeValue(
          //   avalancheCauseAttributes: { kdvElement: KdvElement; selected: boolean }[]
          // ) {
          //   return avalancheCauseAttributes.reduce(function (prevVal, curVal) {
          //     return prevVal + (curVal.selected ? curVal.kdvElement.Id : 0);
          //   }, 0);
          // }

        }, {
          key: "resetAvalancheCauseFields",
          value: function resetAvalancheCauseFields() {
            this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = undefined;
            this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = undefined;
            this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = undefined;
            this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = undefined;
            this.avalancheEvalProblemCopy.AvalCauseDepthTID = undefined;
          }
        }, {
          key: "ok",
          value: function ok() {
            if (this.noWeakLayers) {
              this.resetAvalancheCauseFields();
            } else {
              // const causeAttribute = this.getAvalacheCauseAttributeValue(
              //   this.avalancheCauseAttributes
              // );
              // this.avalancheEvalProblemCopy.AvalCauseAttributes =
              //   causeAttribute > 0 ? causeAttribute : undefined;
              var _iterator = _createForOfIteratorHelper(this.avalancheCauseAttributes),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var val = _step.value;

                  switch (val.kdvElement.Id) {
                    case 1:
                      this.avalancheEvalProblemCopy.AvalCauseAttributeLightTID = val.selected ? val.kdvElement.Id : undefined;
                      break;

                    case 2:
                      this.avalancheEvalProblemCopy.AvalCauseAttributeThinTID = val.selected ? val.kdvElement.Id : undefined;
                      break;

                    case 4:
                      this.avalancheEvalProblemCopy.AvalCauseAttributeSoftTID = val.selected ? val.kdvElement.Id : undefined;
                      break;

                    case 8:
                      this.avalancheEvalProblemCopy.AvalCauseAttributeCrystalTID = val.selected ? val.kdvElement.Id : undefined;
                      break;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            if (_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_0__.IsEmptyHelper.isEmpty(this.avalancheEvalProblemCopy)) {
              this.modalController.dismiss({
                "delete": true
              });
            } else {
              this.modalController.dismiss(this.avalancheEvalProblemCopy);
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

        return _AvalancheProblemModalPage;
      }();

      _AvalancheProblemModalPage.ɵfac = function AvalancheProblemModalPage_Factory(t) {
        return new (t || _AvalancheProblemModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_1__.KdvService));
      };

      _AvalancheProblemModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _AvalancheProblemModalPage,
        selectors: [["app-avalanche-problem-modal"]],
        inputs: {
          avalancheEvalProblem: "avalancheEvalProblem"
        },
        decls: 10,
        vars: 7,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], ["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TYPE", "kdvKey", "Snow_AvalancheExtKDV", 3, "value", "filter", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_TRIGGER_PROBABILITY", "kdvKey", "Snow_AvalTriggerSimpleKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.AVALANCHE_DESTRUCTIVE_SIZE", "kdvKey", "Snow_DestructiveSizeKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.PROPAGATION", "kdvKey", "Snow_AvalPropagationKDV", 3, "value", "valueChange"], [3, "exposedHeightComboTID", "exposedHight1", "exposedHight2", "exposedHeightComboTIDChange", "exposedHight1Change", "exposedHight2Change"], [3, "validExposition", "validExpositionChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER", "kdvKey", "Snow_AvalCauseKDV", 3, "value", "valueChange"], ["title", "REGISTRATION.SNOW.AVALANCHE_PROBLEM.WEAK_LAYER_DEPTH", "kdvKey", "Snow_AvalCauseDepthKDV", 3, "value", "valueChange"], [4, "ngFor", "ngForOf"], [1, "ion-text-wrap"]],
        template: function AvalancheProblemModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function AvalancheProblemModalPage_Template_ion_button_click_3_listener() {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, AvalancheProblemModalPage_ion_content_9_Template, 28, 25, "ion-content", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](8, 5, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.avalancheEvalProblemCopy);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_2__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgModel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_3__.KdvSelectComponent, _components_snow_exposed_height_exposed_height_component__WEBPACK_IMPORTED_MODULE_4__.ExposedHeightComponent, _components_snow_valid_exposition_valid_exposition_component__WEBPACK_IMPORTED_MODULE_5__.ValidExpositionComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_6__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_7__.ModalSaveOrDeleteButtonsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_11__.NgForOf],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    99968: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheProblemPageModule": function AvalancheProblemPageModule() {
          return (
            /* binding */
            _AvalancheProblemPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./avalanche-problem.page */
      76185);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./avalanche-problem-modal/avalanche-problem-modal.module */
      79017);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemPage
      }];

      var _AvalancheProblemPageModule = function _AvalancheProblemPageModule() {
        _classCallCheck(this, _AvalancheProblemPageModule);
      };

      _AvalancheProblemPageModule.ɵfac = function AvalancheProblemPageModule_Factory(t) {
        return new (t || _AvalancheProblemPageModule)();
      };

      _AvalancheProblemPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _AvalancheProblemPageModule
      });
      _AvalancheProblemPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheProblemModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_AvalancheProblemPageModule, {
          declarations: [_avalanche_problem_page__WEBPACK_IMPORTED_MODULE_0__.AvalancheProblemPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _avalanche_problem_modal_avalanche_problem_modal_module__WEBPACK_IMPORTED_MODULE_2__.AvalancheProblemModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    76185: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AvalancheProblemPage": function AvalancheProblemPage() {
          return (
            /* binding */
            _AvalancheProblemPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
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


      var _avalanche_problem_modal_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./avalanche-problem-modal/avalanche-problem-modal.page */
      95218);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var src_app_core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/core/helpers/array-helper */
      99020);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
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


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-item", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);

            var i_r3 = restoredCtx.index;

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

            return ctx_r4.addOrEditAvalancheProblem(i_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "ion-reorder", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var avalancheEvalProblem_r2 = ctx.$implicit;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](3, 1, ctx_r1.getDescription(avalancheEvalProblem_r2)));
        }
      }

      function AvalancheProblemPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "ion-reorder-group", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ionItemReorder", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_ion_reorder_group_ionItemReorder_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r8.onProblemReorder($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, AvalancheProblemPage_app_registration_content_wrapper_8_ion_item_7_Template, 5, 3, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function AvalancheProblemPage_app_registration_content_wrapper_8_Template_ion_item_click_8_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r9.addOrEditAvalancheProblem();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "ion-icon", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](17, "app-add-picture-item", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](5, 10, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.AvalancheEvalProblem2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 12, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.ADD_NEW"));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](16, 14, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());
        }
      }

      var _AvalancheProblemPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_AvalancheProblemPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_AvalancheProblemPage);

        function _AvalancheProblemPage(basePageService, activatedRoute, modalController, ngZone, kdvService) {
          var _this10;

          _classCallCheck(this, _AvalancheProblemPage);

          _this10 = _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.AvalancheEvalProblem2, basePageService, activatedRoute);
          _this10.modalController = modalController;
          _this10.ngZone = ngZone;
          _this10.kdvService = kdvService;
          _this10.avalancheCause = [];
          return _this10;
        }

        _createClass(_AvalancheProblemPage, [{
          key: "onInit",
          value: function onInit() {
            var _this11 = this;

            this.kdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable('Snow_AvalCauseKDV').subscribe(function (val) {
              _this11.avalancheCause = val;
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
          key: "addOrEditAvalancheProblem",
          value: function addOrEditAvalancheProblem(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this12 = this;

              var modal, result;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!(this.registration && this.registration.request && this.registration.request.AvalancheEvalProblem2)) {
                        _context8.next = 9;
                        break;
                      }

                      _context8.next = 3;
                      return this.modalController.create({
                        component: _avalanche_problem_modal_avalanche_problem_modal_page__WEBPACK_IMPORTED_MODULE_3__.AvalancheProblemModalPage,
                        componentProps: {
                          avalancheEvalProblem: this.registration.request.AvalancheEvalProblem2[index]
                        }
                      });

                    case 3:
                      modal = _context8.sent;
                      modal.present();
                      _context8.next = 7;
                      return modal.onDidDismiss();

                    case 7:
                      result = _context8.sent;
                      this.ngZone.run(function () {
                        if (_this12.registration && _this12.registration.request && _this12.registration.request.AvalancheEvalProblem2) {
                          if (result.data) {
                            if (result.data["delete"]) {
                              _this12.registration.request.AvalancheEvalProblem2.splice(index, 1);
                            } else {
                              var avalancheEvalProblem = result.data;

                              if (index !== undefined) {
                                _this12.registration.request.AvalancheEvalProblem2[index] = avalancheEvalProblem;
                              } else {
                                _this12.registration.request.AvalancheEvalProblem2.push(avalancheEvalProblem);
                              }
                            }
                          }
                        }
                      });

                    case 9:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "getDescription",
          value: function getDescription(avalancheEvalProblem) {
            var cause = this.avalancheCause.find(function (c) {
              return c.Id === avalancheEvalProblem.AvalCauseTID;
            });

            if (cause) {
              return cause.Name;
            } else {
              return 'REGISTRATION.SNOW.AVALANCHE_PROBLEM.UNKNOWN_TYPE';
            }
          }
        }, {
          key: "onProblemReorder",
          value: function onProblemReorder(event) {
            this.registration.request.AvalancheEvalProblem2 = src_app_core_helpers_array_helper__WEBPACK_IMPORTED_MODULE_5__.ArrayHelper.reorderList(this.registration.request.AvalancheEvalProblem2, event.detail.from, event.detail.to);
            event.detail.complete();
          }
        }]);

        return _AvalancheProblemPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _AvalancheProblemPage.ɵfac = function AvalancheProblemPage_Factory(t) {
        return new (t || _AvalancheProblemPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_4__.KdvService));
      };

      _AvalancheProblemPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _AvalancheProblemPage,
        selectors: [["app-avalanche-problem"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], ["disabled", "false", 3, "ionItemReorder"], ["detail", "true", 3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "primary", "name", "add-circle-outline", "slot", "start"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["detail", "true", 3, "click"], ["slot", "end"]],
        template: function AvalancheProblemPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, AvalancheProblemPage_app_registration_content_wrapper_8_Template, 18, 16, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.SNOW.AVALANCHE_PROBLEM.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.AvalancheEvalProblem2);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_7__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonReorderGroup, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_8__.AddPictureItemComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonReorder],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdmFsYW5jaGUtcHJvYmxlbS5wYWdlLnNjc3MifQ== */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ0UsTUFBTixDQUFhRSxFQUhtQyxDQUFsRDtBQUtBSixpQkFBSyxDQUFDRSxNQUFOLENBQWFHLFFBQWI7QUFDRDs7OztRQS9GdUNDOzs7eUJBQTdCdEIsdUJBQW9CRDtBQUFBOzs7Y0FBcEJDO0FBQW9CZDtBQUFBaEQ7QUFBQWtEO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURyQmpDUTs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBNEJGQTs7OztBQWpDTUE7O0FBQUFBOztBQUsrQkE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsiREVCVUdfVEFHIiwiQmFzZVBhZ2VTZXJ2aWNlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsIm5ld0F0dGFjaG1lbnRTZXJ2aWNlIiwiY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsIm5nWm9uZSIsImFsZXJ0Q29udHJvbGxlciIsInRyYW5zbGF0ZVNlcnZpY2UiLCJsb2dnaW5nU2VydmljZSIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvblRpZCIsIm9uUmVzZXQiLCJnZXQiLCJ0b1Byb21pc2UiLCJsZWF2ZVRleHQiLCJjcmVhdGVSZXNldERpYWxvZyIsIm1lc3NhZ2UiLCJ0cmFuc2xhdGlvbnMiLCJjcmVhdGUiLCJidXR0b25zIiwidGV4dCIsInJvbGUiLCJhbGVydCIsInByZXNlbnQiLCJvbkRpZERpc21pc3MiLCJyZXN1bHQiLCJyZXNldCIsIlpvbmUiLCJydW4iLCJyZXF1ZXN0IiwiZ2V0RGVmYXVsdFZhbHVlIiwicmVzZXRJbWFnZXMiLCJzYXZlUmVnaXN0cmF0aW9uQXN5bmMiLCJwcm9wTmFtZSIsImdldEF0dGFjaG1lbnRzIiwiaWQiLCJwaXBlIiwiYXR0YWNobWVudHMiLCJtYXAiLCJhIiwicmVtb3ZlQXR0YWNobWVudCIsInN1YnNjcmliZSIsImRlYnVnIiwiZXJyb3IiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJmYWN0b3J5IiwicHJvdmlkZWRJbiIsIkJhc2VQYWdlIiwiYmFzZVBhZ2VTZXJ2aWNlIiwiYWN0aXZhdGVkUm91dGUiLCJzbmFwc2hvdCIsInBhcmFtcyIsIkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJnZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCIsInJlZyIsImNyZWF0ZURlZmF1bHRQcm9wcyIsImNyZWF0ZUluaXRPYnNlcnZhYmxlIiwibmdEZXN0cm95JCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaXNWYWxpZCIsInZhbGlkIiwiaXNFbXB0eSIsImNvbmZpcm1MZWF2ZSIsIm9uSW5pdCIsIm9uQmVmb3JlTGVhdmUiLCJzYXZlIiwiY2xlYW4iLCJzeW5jU3RhdHVzIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiUmVnaXN0cmF0aW9uU2VydmljZSIsImhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzIiwiY29uZmlybVJlc2V0IiwicGF0aEZyb21Sb290IiwidiIsInVybCIsInNlZ21lbnQiLCJ0b1N0cmluZyIsImpvaW4iLCJmaWx0ZXIiLCJwYXRoIiwiX2NvcmVfaGVscGVyc19vYnNlcnZhYmxlX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsImZlYXR1cmVzIiwiQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZU1vZHVsZSIsIl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImRlY2xhcmF0aW9ucyIsIl9hdmFsYW5jaGVfcHJvYmxlbV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fIiwiY3R4X3IwIiwiTk9fV0VBS19MQVlFUl9LRFZfVkFMVUUiLCJBdmFsYW5jaGVQcm9ibGVtTW9kYWxQYWdlIiwibW9kYWxDb250cm9sbGVyIiwia2R2U2VydmljZSIsImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weSIsIkF2YWxDYXVzZVRJRCIsInZhbCIsInVuZGVmaW5lZCIsImF2YWxhbmNoZUV4dEtkdkZpbHRlciIsImludGVybmFsQXZhbGFuY2hlRXh0S2R2RmlsdGVyIiwiYmluZCIsImF2YWxhbmNoZUV2YWxQcm9ibGVtIiwiT2JqZWN0IiwiaXNOZXciLCJ2aWV3U3Vic2NyaXB0aW9uIiwiZ2V0S2R2UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSIsImdldFZpZXdSZXBvc2l0b3J5QnlLZXlPYnNlcnZhYmxlIiwic25vd0NhdXNlQXR0cmlidXRlc0tkdkVsZW1lbnRzIiwiYXZhbGFuY2hlUHJvYmxlbVZpZXciLCJhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMiLCJnZXRBdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMiLCJ1bnN1YnNjcmliZSIsImF2YWxDYXVzZVRpZCIsInZpZXdzIiwiQXZhbGFuY2hlRXh0VElEIiwiaW5kZXhPZiIsImtkdkVsZW1lbnRzIiwia2R2RWxlbWVudCIsInNlbGVjdGVkIiwiaXNBdmFsYW5jaGVDYXVzZVNlbGVjdGVkIiwiSWQiLCJBdmFsQ2F1c2VBdHRyaWJ1dGVMaWdodFRJRCIsIkF2YWxDYXVzZUF0dHJpYnV0ZVRoaW5USUQiLCJBdmFsQ2F1c2VBdHRyaWJ1dGVTb2Z0VElEIiwiQXZhbENhdXNlQXR0cmlidXRlQ3J5c3RhbFRJRCIsImRpc21pc3MiLCJBdmFsQ2F1c2VEZXB0aFRJRCIsIm5vV2Vha0xheWVycyIsInJlc2V0QXZhbGFuY2hlQ2F1c2VGaWVsZHMiLCJfY29yZV9oZWxwZXJzX2lzX2VtcHR5X2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwic2VsZWN0b3JzIiwiaW5wdXRzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJjdHgiLCJyb3V0ZXMiLCJjb21wb25lbnQiLCJfYXZhbGFuY2hlX3Byb2JsZW1fcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiQXZhbGFuY2hlUHJvYmxlbVBhZ2VNb2R1bGUiLCJfYXZhbGFuY2hlX3Byb2JsZW1fbW9kYWxfYXZhbGFuY2hlX3Byb2JsZW1fbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfYW5ndWxhcl9yb3V0ZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzlfXyIsIkF2YWxhbmNoZVByb2JsZW1QYWdlIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiYXZhbGFuY2hlQ2F1c2UiLCJrZHZTdWJzY3JpcHRpb24iLCJpbmRleCIsIkF2YWxhbmNoZUV2YWxQcm9ibGVtMiIsIl9hdmFsYW5jaGVfcHJvYmxlbV9tb2RhbF9hdmFsYW5jaGVfcHJvYmxlbV9tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJjb21wb25lbnRQcm9wcyIsIm1vZGFsIiwiZGF0YSIsInNwbGljZSIsInB1c2giLCJjYXVzZSIsImZpbmQiLCJjIiwiTmFtZSIsImV2ZW50Iiwic3JjX2FwcF9jb3JlX2hlbHBlcnNfYXJyYXlfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJkZXRhaWwiLCJmcm9tIiwidG8iLCJjb21wbGV0ZSIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc25vdy9hdmFsYW5jaGUtcHJvYmxlbS9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLXByb2JsZW0vYXZhbGFuY2hlLXByb2JsZW0ubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLXByb2JsZW0vYXZhbGFuY2hlLXByb2JsZW0ucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3Nub3cvYXZhbGFuY2hlLXByb2JsZW0vYXZhbGFuY2hlLXByb2JsZW0ucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2UgfSBmcm9tICcuL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0F2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVQcm9ibGVtTW9kYWxQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT57eydSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5USVRMRScgfCB0cmFuc2xhdGV9fTwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuXHJcbjxpb24tY29udGVudCAqbmdJZj1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weVwiPlxyXG4gIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uV0VBS19MQVlFUicgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsPnt7J1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLk5PX1dFQUtfTEFZRVJTJyB8IHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgWyhuZ01vZGVsKV09XCJub1dlYWtMYXllcnNcIj48L2lvbi1jaGVja2JveD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW5vV2Vha0xheWVyc1wiPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5XRUFLX0xBWUVSXCIga2R2S2V5PVwiU25vd19BdmFsQ2F1c2VLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VUSURcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5XRUFLX0xBWUVSX0RFUFRIXCIga2R2S2V5PVwiU25vd19BdmFsQ2F1c2VEZXB0aEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZURlcHRoVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGlvbi1pdGVtICpuZ0Zvcj1cImxldCBhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZSBvZiBhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXNcIj5cclxuICAgICAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPiB7eyBhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZS5rZHZFbGVtZW50Lk5hbWUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8aW9uLWNoZWNrYm94IG1vZGU9XCJtZFwiIHNsb3Q9XCJzdGFydFwiIFsobmdNb2RlbCldPVwiYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGUuc2VsZWN0ZWRcIj48L2lvbi1jaGVja2JveD5cclxuICAgICAgPC9pb24taXRlbT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgIHt7ICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5BVkFMQU5DSEVfUFJPQkFCSUxJVFknIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkFWQUxBTkNIRV9UWVBFXCIga2R2S2V5PVwiU25vd19BdmFsYW5jaGVFeHRLRFZcIlxyXG4gICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbGFuY2hlRXh0VElEXCIgW2ZpbHRlcl09XCJhdmFsYW5jaGVFeHRLZHZGaWx0ZXJcIj48L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQVZBTEFOQ0hFX1RSSUdHRVJfUFJPQkFCSUxJVFlcIlxyXG4gICAgICBrZHZLZXk9XCJTbm93X0F2YWxUcmlnZ2VyU2ltcGxlS0RWXCIgWyh2YWx1ZSldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxUcmlnZ2VyU2ltcGxlVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLkFWQUxBTkNIRV9ERVNUUlVDVElWRV9TSVpFXCJcclxuICAgICAga2R2S2V5PVwiU25vd19EZXN0cnVjdGl2ZVNpemVLRFZcIiBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuRGVzdHJ1Y3RpdmVTaXplVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICB7eyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uUFJPUEFHQVRJT04nIHwgdHJhbnNsYXRlfX1cclxuICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgIDxhcHAta2R2LXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlBST1BBR0FUSU9OXCIga2R2S2V5PVwiU25vd19BdmFsUHJvcGFnYXRpb25LRFZcIlxyXG4gICAgICBbKHZhbHVlKV09XCJhdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbFByb3BhZ2F0aW9uVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgIDxhcHAtZXhwb3NlZC1oZWlnaHQgWyhleHBvc2VkSGVpZ2h0Q29tYm9USUQpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5FeHBvc2VkSGVpZ2h0Q29tYm9USURcIlxyXG4gICAgICBbKGV4cG9zZWRIaWdodDEpXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5FeHBvc2VkSGVpZ2h0MVwiXHJcbiAgICAgIFsoZXhwb3NlZEhpZ2h0MildPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkV4cG9zZWRIZWlnaHQyXCI+PC9hcHAtZXhwb3NlZC1oZWlnaHQ+XHJcbiAgICA8YXBwLXZhbGlkLWV4cG9zaXRpb24gWyh2YWxpZEV4cG9zaXRpb24pXT1cImF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5WYWxpZEV4cG9zaXRpb25cIj48L2FwcC12YWxpZC1leHBvc2l0aW9uPlxyXG4gICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5DT01NRU5UXCIgWyh2YWx1ZSldPVwiYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkNvbW1lbnRcIj5cclxuICAgIDwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCIgW3Nob3dEZWxldGVdPVwiIWlzTmV3XCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEF2YWxhbmNoZUV2YWxQcm9ibGVtMkVkaXRNb2RlbCxcclxuICBLZHZFbGVtZW50XHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IElzRW1wdHlIZWxwZXIgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9jb3JlL2hlbHBlcnMvaXMtZW1wdHkuaGVscGVyJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBjb21iaW5lTGF0ZXN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5jb25zdCBOT19XRUFLX0xBWUVSX0tEVl9WQUxVRSA9IDI0O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXZhbGFuY2hlLXByb2JsZW0tbW9kYWwnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmFsYW5jaGUtcHJvYmxlbS1tb2RhbC5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVQcm9ibGVtTW9kYWxQYWdlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIGF2YWxhbmNoZUV2YWxQcm9ibGVtOiBBdmFsYW5jaGVFdmFsUHJvYmxlbTJFZGl0TW9kZWw7XHJcbiAgYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5OiBBdmFsYW5jaGVFdmFsUHJvYmxlbTJFZGl0TW9kZWw7XHJcbiAgaXNOZXcgPSBmYWxzZTtcclxuICBhdmFsYW5jaGVFeHRLZHZGaWx0ZXI6IEZ1bmN0aW9uO1xyXG5cclxuICBnZXQgbm9XZWFrTGF5ZXJzKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlVElEID09PSBOT19XRUFLX0xBWUVSX0tEVl9WQUxVRVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHNldCBub1dlYWtMYXllcnModmFsOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VUSUQgPSB2YWxcclxuICAgICAgPyBOT19XRUFLX0xBWUVSX0tEVl9WQUxVRVxyXG4gICAgICA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGF2YWxhbmNoZVByb2JsZW1WaWV3OiB7IEF2YWxhbmNoZUV4dFRJRDogbnVtYmVyOyBBdmFsQ2F1c2VUSUQ6IG51bWJlciB9W107XHJcbiAgYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzOiB7IGtkdkVsZW1lbnQ6IEtkdkVsZW1lbnQ7IHNlbGVjdGVkOiBib29sZWFuIH1bXTtcclxuICBleHBvc2l0aW9uOiBudW1iZXJbXTtcclxuXHJcbiAgcHJpdmF0ZSB2aWV3U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZVxyXG4gICkge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUV4dEtkdkZpbHRlciA9IHRoaXMuaW50ZXJuYWxBdmFsYW5jaGVFeHRLZHZGaWx0ZXIuYmluZCh0aGlzKTtcclxuXHJcbiAgICBpZiAodGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbSkge1xyXG4gICAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weSA9IHsgLi4udGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkgPSB7fTtcclxuICAgICAgdGhpcy5pc05ldyA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3U3Vic2NyaXB0aW9uID0gY29tYmluZUxhdGVzdChcclxuICAgICAgdGhpcy5rZHZTZXJ2aWNlLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoXHJcbiAgICAgICAgJ1Nub3dfQXZhbENhdXNlQXR0cmlidXRlRmxhZ3MnXHJcbiAgICAgICksXHJcbiAgICAgIHRoaXMua2R2U2VydmljZS5nZXRWaWV3UmVwb3NpdG9yeUJ5S2V5T2JzZXJ2YWJsZSgnQXZhbGFuY2hlUHJvYmxlbU1lbnUzVicpXHJcbiAgICApLnN1YnNjcmliZSgoW3Nub3dDYXVzZUF0dHJpYnV0ZXNLZHZFbGVtZW50cywgYXZhbGFuY2hlUHJvYmxlbVZpZXddKSA9PiB7XHJcbiAgICAgIHRoaXMuYXZhbGFuY2hlUHJvYmxlbVZpZXcgPSBhdmFsYW5jaGVQcm9ibGVtVmlldztcclxuICAgICAgdGhpcy5hdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMgPSB0aGlzLmdldEF2YWxhbmNoZUNhdXNlQXR0cmlidXRlcyhcclxuICAgICAgICBzbm93Q2F1c2VBdHRyaWJ1dGVzS2R2RWxlbWVudHNcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy52aWV3U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMudmlld1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW50ZXJuYWxBdmFsYW5jaGVFeHRLZHZGaWx0ZXIoaWQ6IG51bWJlcikge1xyXG4gICAgY29uc3QgYXZhbENhdXNlVGlkID0gdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlVElEIHx8IDA7XHJcbiAgICBjb25zdCB2aWV3cyA9IHRoaXMuYXZhbGFuY2hlUHJvYmxlbVZpZXdcclxuICAgICAgLmZpbHRlcigodikgPT4gdi5BdmFsQ2F1c2VUSUQgPT09IGF2YWxDYXVzZVRpZClcclxuICAgICAgLm1hcCgodikgPT4gdi5BdmFsYW5jaGVFeHRUSUQpO1xyXG4gICAgcmV0dXJuIHZpZXdzLmluZGV4T2YoaWQpID49IDA7XHJcbiAgfVxyXG5cclxuICBnZXRBdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMoXHJcbiAgICBrZHZFbGVtZW50czogS2R2RWxlbWVudFtdXHJcbiAgKToge1xyXG4gICAgICBrZHZFbGVtZW50OiBLZHZFbGVtZW50O1xyXG4gICAgICBzZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIH1bXSB7XHJcbiAgICByZXR1cm4ga2R2RWxlbWVudHMubWFwKCh2YWwpID0+ICh7XHJcbiAgICAgICAgICBrZHZFbGVtZW50OiB2YWwsXHJcbiAgICAgICAgICBzZWxlY3RlZDogdGhpcy5pc0F2YWxhbmNoZUNhdXNlU2VsZWN0ZWQodmFsKVxyXG4gICAgICAgIH0pKTtcclxuICB9XHJcblxyXG4gIGlzQXZhbGFuY2hlQ2F1c2VTZWxlY3RlZChrZHZFbGVtZW50OiBLZHZFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICBzd2l0Y2ggKGtkdkVsZW1lbnQuSWQpIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVMaWdodFRJRCA9PT0ga2R2RWxlbWVudC5JZDtcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVUaGluVElEID09PSBrZHZFbGVtZW50LklkO1xyXG4gICAgICBjYXNlIDQ6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZVNvZnRUSUQgPT09IGtkdkVsZW1lbnQuSWQ7XHJcbiAgICAgIGNhc2UgODpcclxuICAgICAgICByZXR1cm4gdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlQ3J5c3RhbFRJRCA9PT0ga2R2RWxlbWVudC5JZDtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIC8vIGdldEF2YWxhY2hlQ2F1c2VBdHRyaWJ1dGVWYWx1ZShcclxuICAvLyAgIGF2YWxhbmNoZUNhdXNlQXR0cmlidXRlczogeyBrZHZFbGVtZW50OiBLZHZFbGVtZW50OyBzZWxlY3RlZDogYm9vbGVhbiB9W11cclxuICAvLyApIHtcclxuICAvLyAgIHJldHVybiBhdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXMucmVkdWNlKGZ1bmN0aW9uIChwcmV2VmFsLCBjdXJWYWwpIHtcclxuICAvLyAgICAgcmV0dXJuIHByZXZWYWwgKyAoY3VyVmFsLnNlbGVjdGVkID8gY3VyVmFsLmtkdkVsZW1lbnQuSWQgOiAwKTtcclxuICAvLyAgIH0sIDApO1xyXG4gIC8vIH1cclxuXHJcbiAgcmVzZXRBdmFsYW5jaGVDYXVzZUZpZWxkcygpIHtcclxuICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZUxpZ2h0VElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlVGhpblRJRCA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZVNvZnRUSUQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVDcnlzdGFsVElEID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlRGVwdGhUSUQgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIGlmICh0aGlzLm5vV2Vha0xheWVycykge1xyXG4gICAgICB0aGlzLnJlc2V0QXZhbGFuY2hlQ2F1c2VGaWVsZHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGNvbnN0IGNhdXNlQXR0cmlidXRlID0gdGhpcy5nZXRBdmFsYWNoZUNhdXNlQXR0cmlidXRlVmFsdWUoXHJcbiAgICAgIC8vICAgdGhpcy5hdmFsYW5jaGVDYXVzZUF0dHJpYnV0ZXNcclxuICAgICAgLy8gKTtcclxuICAgICAgLy8gdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlcyA9XHJcbiAgICAgIC8vICAgY2F1c2VBdHRyaWJ1dGUgPiAwID8gY2F1c2VBdHRyaWJ1dGUgOiB1bmRlZmluZWQ7XHJcbiAgICAgIGZvciAoY29uc3QgdmFsIG9mIHRoaXMuYXZhbGFuY2hlQ2F1c2VBdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgc3dpdGNoICh2YWwua2R2RWxlbWVudC5JZCkge1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVMaWdodFRJRCA9IHZhbC5zZWxlY3RlZFxyXG4gICAgICAgICAgICAgID8gdmFsLmtkdkVsZW1lbnQuSWRcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5LkF2YWxDYXVzZUF0dHJpYnV0ZVRoaW5USUQgPSB2YWwuc2VsZWN0ZWRcclxuICAgICAgICAgICAgICA/IHZhbC5rZHZFbGVtZW50LklkXHJcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICB0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weS5BdmFsQ2F1c2VBdHRyaWJ1dGVTb2Z0VElEID0gdmFsLnNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgPyB2YWwua2R2RWxlbWVudC5JZFxyXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgdGhpcy5hdmFsYW5jaGVFdmFsUHJvYmxlbUNvcHkuQXZhbENhdXNlQXR0cmlidXRlQ3J5c3RhbFRJRCA9IHZhbC5zZWxlY3RlZFxyXG4gICAgICAgICAgICAgID8gdmFsLmtkdkVsZW1lbnQuSWRcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMuYXZhbGFuY2hlRXZhbFByb2JsZW1Db3B5KSkge1xyXG4gICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgZGVsZXRlOiB0cnVlIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb2RhbENvbnRyb2xsZXIuZGlzbWlzcyh0aGlzLmF2YWxhbmNoZUV2YWxQcm9ibGVtQ29weSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgZGVsZXRlOiB0cnVlIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEF2YWxhbmNoZVByb2JsZW1QYWdlIH0gZnJvbSAnLi9hdmFsYW5jaGUtcHJvYmxlbS5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogQXZhbGFuY2hlUHJvYmxlbVBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBBdmFsYW5jaGVQcm9ibGVtTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0F2YWxhbmNoZVByb2JsZW1QYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXZhbGFuY2hlUHJvYmxlbVBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVFdmFsUHJvYmxlbTJcIlxyXG4gICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5TTk9XLkFWQUxBTkNIRV9QUk9CTEVNLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLXJlb3JkZXItZ3JvdXAgZGlzYWJsZWQ9XCJmYWxzZVwiIChpb25JdGVtUmVvcmRlcik9XCJvblByb2JsZW1SZW9yZGVyKCRldmVudClcIj5cclxuICAgICAgICA8aW9uLWl0ZW0gZGV0YWlsPVwidHJ1ZVwiIChjbGljayk9XCJhZGRPckVkaXRBdmFsYW5jaGVQcm9ibGVtKGkpXCJcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBhdmFsYW5jaGVFdmFsUHJvYmxlbSBvZiByZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVFdmFsUHJvYmxlbTI7IGxldCBpID0gaW5kZXhcIj5cclxuICAgICAgICAgICAgPGlvbi1sYWJlbD57eyBnZXREZXNjcmlwdGlvbihhdmFsYW5jaGVFdmFsUHJvYmxlbSkgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgICAgPGlvbi1yZW9yZGVyIHNsb3Q9XCJlbmRcIj48L2lvbi1yZW9yZGVyPlxyXG4gICAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDwvaW9uLXJlb3JkZXItZ3JvdXA+XHJcbiAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0QXZhbGFuY2hlUHJvYmxlbSgpXCI+XHJcbiAgICAgICAgPGlvbi1pY29uIGNvbG9yPVwicHJpbWFyeVwiIG5hbWU9XCJhZGQtY2lyY2xlLW91dGxpbmVcIiBzbG90PVwic3RhcnRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3snUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX1BST0JMRU0uQUREX05FVycgfCB0cmFuc2xhdGV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX0lNQUdFUycgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGFwcC1hZGQtcGljdHVyZS1pdGVtIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIlxyXG4gICAgICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgW29uQmVmb3JlQWRkXT1cImdldFNhdmVGdW5jKClcIj48L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEl0ZW1SZW9yZGVyRXZlbnREZXRhaWwgfSBmcm9tICdAaW9uaWMvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQXZhbGFuY2hlRXZhbFByb2JsZW0yRWRpdE1vZGVsLFxyXG4gIEtkdkVsZW1lbnRcclxufSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IEF2YWxhbmNoZVByb2JsZW1Nb2RhbFBhZ2UgfSBmcm9tICcuL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsL2F2YWxhbmNoZS1wcm9ibGVtLW1vZGFsLnBhZ2UnO1xyXG5pbXBvcnQgeyBLZHZTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9rZHYva2R2LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9hcnJheS1oZWxwZXInO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYXZhbGFuY2hlLXByb2JsZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hdmFsYW5jaGUtcHJvYmxlbS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2F2YWxhbmNoZS1wcm9ibGVtLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdmFsYW5jaGVQcm9ibGVtUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBwcml2YXRlIGF2YWxhbmNoZUNhdXNlOiBLZHZFbGVtZW50W107XHJcbiAgcHJpdmF0ZSBrZHZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbW9kYWxDb250cm9sbGVyOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBrZHZTZXJ2aWNlOiBLZHZTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcclxuICAgICAgUmVnaXN0cmF0aW9uVGlkLkF2YWxhbmNoZUV2YWxQcm9ibGVtMixcclxuICAgICAgYmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgICBhY3RpdmF0ZWRSb3V0ZVxyXG4gICAgKTtcclxuICAgIHRoaXMuYXZhbGFuY2hlQ2F1c2UgPSBbXTtcclxuICB9XHJcblxyXG4gIG9uSW5pdCgpIHtcclxuICAgIHRoaXMua2R2U3Vic2NyaXB0aW9uID0gdGhpcy5rZHZTZXJ2aWNlXHJcbiAgICAgIC5nZXRLZHZSZXBvc2l0b3J5QnlLZXlPYnNlcnZhYmxlKCdTbm93X0F2YWxDYXVzZUtEVicpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMuYXZhbGFuY2hlQ2F1c2UgPSB2YWw7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmtkdlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkT3JFZGl0QXZhbGFuY2hlUHJvYmxlbShpbmRleD86IG51bWJlcikge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yXHJcbiAgICApIHtcclxuICAgICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICAgIGNvbXBvbmVudDogQXZhbGFuY2hlUHJvYmxlbU1vZGFsUGFnZSxcclxuICAgICAgICBjb21wb25lbnRQcm9wczoge1xyXG4gICAgICAgICAgYXZhbGFuY2hlRXZhbFByb2JsZW06IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yW1xyXG4gICAgICAgICAgICBpbmRleFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbW9kYWwub25EaWREaXNtaXNzKCk7XHJcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gJiZcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QgJiZcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LmRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLmRlbGV0ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgYXZhbGFuY2hlRXZhbFByb2JsZW06IEF2YWxhbmNoZUV2YWxQcm9ibGVtMkVkaXRNb2RlbCA9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5BdmFsYW5jaGVFdmFsUHJvYmxlbTJbXHJcbiAgICAgICAgICAgICAgICAgIGluZGV4XHJcbiAgICAgICAgICAgICAgICBdID0gYXZhbGFuY2hlRXZhbFByb2JsZW07XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgIGF2YWxhbmNoZUV2YWxQcm9ibGVtXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZXNjcmlwdGlvbihhdmFsYW5jaGVFdmFsUHJvYmxlbTogQXZhbGFuY2hlRXZhbFByb2JsZW0yRWRpdE1vZGVsKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGNhdXNlID0gdGhpcy5hdmFsYW5jaGVDYXVzZS5maW5kKFxyXG4gICAgICAoYykgPT4gYy5JZCA9PT0gYXZhbGFuY2hlRXZhbFByb2JsZW0uQXZhbENhdXNlVElEXHJcbiAgICApO1xyXG4gICAgaWYgKGNhdXNlKSB7XHJcbiAgICAgIHJldHVybiBjYXVzZS5OYW1lO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICdSRUdJU1RSQVRJT04uU05PVy5BVkFMQU5DSEVfUFJPQkxFTS5VTktOT1dOX1RZUEUnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Qcm9ibGVtUmVvcmRlcihldmVudDogQ3VzdG9tRXZlbnQ8SXRlbVJlb3JkZXJFdmVudERldGFpbD4pOiB2b2lkIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yID0gQXJyYXlIZWxwZXIucmVvcmRlckxpc3QoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuQXZhbGFuY2hlRXZhbFByb2JsZW0yLFxyXG4gICAgICBldmVudC5kZXRhaWwuZnJvbSxcclxuICAgICAgZXZlbnQuZGV0YWlsLnRvXHJcbiAgICApO1xyXG4gICAgZXZlbnQuZGV0YWlsLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==