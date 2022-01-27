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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_danger-obs_danger-obs_module_ts"], {
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
    66348: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AddOrEditDangerObsModalPageModule": function AddOrEditDangerObsModalPageModule() {
          return (
            /* binding */
            _AddOrEditDangerObsModalPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./add-or-edit-danger-obs-modal.page */
      46373);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AddOrEditDangerObsModalPageModule = function _AddOrEditDangerObsModalPageModule() {
        _classCallCheck(this, _AddOrEditDangerObsModalPageModule);
      };

      _AddOrEditDangerObsModalPageModule.ɵfac = function AddOrEditDangerObsModalPageModule_Factory(t) {
        return new (t || _AddOrEditDangerObsModalPageModule)();
      };

      _AddOrEditDangerObsModalPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _AddOrEditDangerObsModalPageModule
      });
      _AddOrEditDangerObsModalPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_AddOrEditDangerObsModalPageModule, {
          declarations: [_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_0__.AddOrEditDangerObsModalPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    46373: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AddOrEditDangerObsModalPage": function AddOrEditDangerObsModalPage() {
          return (
            /* binding */
            _AddOrEditDangerObsModalPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
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
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../shared/components/input/select/select.component */
      94990);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../components/modal-save-or-delete-buttons/modal-save-or-delete-buttons.component */
      14984);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../components/kdv-select/kdv-select.component */
      22241);

      function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-checkbox", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template_ion_checkbox_ionChange_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r3.checkBoxChanged();
          })("ngModelChange", function AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template_ion_checkbox_ngModelChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r5.noDangerObs = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.noDangerObs);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](4, 2, "REGISTRATION.DANGER_OBS.NO_DAMAGE_SIGN"));
        }
      }

      function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-kdv-select", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template_app_kdv_select_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r6.dropdownChanged($event);
          })("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template_app_kdv_select_valueChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r8.dangerSignTid = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate1"]("kdvKey", "", ctx_r2.GeoHazardName, "_DangerSignKDV");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r2.dangerSignTid);
        }
      }

      function AddOrEditDangerObsModalPage_ion_content_9_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-list", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-list-header", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, AddOrEditDangerObsModalPage_ion_content_9_ion_item_6_Template, 5, 4, "ion-item", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AddOrEditDangerObsModalPage_ion_content_9_app_kdv_select_7_Template, 1, 2, "app-kdv-select", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-label", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "app-select", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectedValueChange", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_select_selectedValueChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r9.tmpArea = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "app-text-comment", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("valueChange", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_text_comment_valueChange_13_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r11.comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "app-modal-save-or-delete-buttons", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("saveClicked", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_saveClicked_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r12.ok();
          })("deleteClicked", function AddOrEditDangerObsModalPage_ion_content_9_Template_app_modal_save_or_delete_buttons_deleteClicked_14_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r13["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 8, "REGISTRATION.DANGER_OBS.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.showDangerSignCheckbox);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.showDangerSignSelect);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](11, 10, "REGISTRATION.DANGER_OBS.AREA"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("selectedValue", ctx_r0.tmpArea)("options", ctx_r0.areaArr);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", ctx_r0.comment);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("showDelete", ctx_r0.dangerObs);
        }
      }

      var COMMENT_SEPARATOR = ': ';

      var _AddOrEditDangerObsModalPage = /*#__PURE__*/function () {
        function _AddOrEditDangerObsModalPage(modalController, translateService, ngZone) {
          _classCallCheck(this, _AddOrEditDangerObsModalPage);

          this.modalController = modalController;
          this.translateService = translateService;
          this.ngZone = ngZone;
          this.noDangerObs = false;
          this.tmpArea = '';
          this.loaded = false;
          this.showDangerSignSelect = true;
          this.showDangerSignCheckbox = false;
          this.interfaceOptions = {};
        }

        _createClass(_AddOrEditDangerObsModalPage, [{
          key: "GeoHazardName",
          get: function get() {
            return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard[this.geoHazard];
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this8 = this;

              var tranlations, option, textToFind, additionalCommentIndex;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      this.showDangerSignCheckbox = this.geoHazard != _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice;
                      _context8.next = 3;
                      return this.translateService.get(this.getAreaArray()).toPromise();

                    case 3:
                      tranlations = _context8.sent;
                      _context8.next = 6;
                      return this.translateService.get(['REGISTRATION.DANGER_OBS.AREA', 'REGISTRATION.DANGER_OBS.DESCRIPTION']).toPromise();

                    case 6:
                      this.commentTranslations = _context8.sent;
                      this.areaArr = this.getAreaArray().map(function (item) {
                        return tranlations[item];
                      }).map(function (item) {
                        return {
                          id: item,
                          text: item
                        };
                      });

                      if (this.dangerObs) {
                        if (this.dangerObs.Comment) {
                          option = this.areaArr.find(function (x) {
                            return _this8.dangerObs.Comment.indexOf(x.id) >= 0;
                          });
                          this.tmpArea = option ? option.id : '';

                          if (this.tmpArea) {
                            this.comment = this.dangerObs.Comment.substr(this.dangerObs.Comment.indexOf(this.tmpArea) + this.tmpArea.length);
                            textToFind = "".concat(this.commentTranslations['REGISTRATION.DANGER_OBS.DESCRIPTION']) + "".concat(COMMENT_SEPARATOR);
                            additionalCommentIndex = this.dangerObs.Comment.indexOf(textToFind);

                            if (additionalCommentIndex >= 0) {
                              this.comment = this.dangerObs.Comment.substr(additionalCommentIndex + textToFind.length);
                            }
                          } else {
                            this.comment = this.dangerObs.Comment;
                          }
                        }

                        if (this.dangerObs.DangerSignTID === this.getNoDangerSignTid()) {
                          this.noDangerObs = true;
                        }

                        this.dangerSignTid = this.dangerObs.DangerSignTID;
                        this.updateDangerSignSelectVisibilty();
                      }

                      this.loaded = true;

                    case 10:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "updateDangerSignSelectVisibilty",
          value: function updateDangerSignSelectVisibilty() {
            if (this.geoHazard === _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice) {
              this.showDangerSignSelect = true;
            } else {
              this.showDangerSignSelect = !this.noDangerObs;
            }
          }
        }, {
          key: "toggleDangerObs",
          value: function toggleDangerObs() {
            this.noDangerObs = !this.noDangerObs;

            if (this.noDangerObs) {
              this.dangerSignTid = this.getDangerSignTidOrFallback();
            }

            this.updateDangerSignSelectVisibilty();
          }
        }, {
          key: "checkBoxChanged",
          value: function checkBoxChanged() {
            this.updateDangerSignSelectVisibilty();
          }
        }, {
          key: "dropdownChanged",
          value: function dropdownChanged(val) {
            if (val === this.getNoDangerSignTid()) {
              this.noDangerObs = true;
              this.updateDangerSignSelectVisibilty();
            } else {
              this.noDangerObs = false;
            }
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "getNoDangerSignTid",
          value: function getNoDangerSignTid() {
            return (this.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow ? this.geoHazard * 10 : 0) + 1;
          }
        }, {
          key: "getDangerSignTidOrFallback",
          value: function getDangerSignTidOrFallback() {
            return this.dangerSignTid !== undefined ? this.dangerSignTid : this.geoHazard !== _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Snow ? this.geoHazard * 10 : 0;
          }
        }, {
          key: "ok",
          value: function ok() {
            var dangerObsToSave = {
              GeoHazardTID: this.geoHazard,
              DangerSignTID: this.noDangerObs ? this.getNoDangerSignTid() : this.getDangerSignTidOrFallback(),
              Comment: this.getComment()
            };
            this.modalController.dismiss(dangerObsToSave);
          }
        }, {
          key: "getComment",
          value: function getComment() {
            if (this.tmpArea && this.tmpArea.length > 0 && this.comment && this.comment.length > 0) {
              return "".concat(this.commentTranslations['REGISTRATION.DANGER_OBS.AREA']) + "".concat(COMMENT_SEPARATOR).concat(this.tmpArea, ". ") + "".concat(this.commentTranslations['REGISTRATION.DANGER_OBS.DESCRIPTION']) + "".concat(COMMENT_SEPARATOR).concat(this.comment || '');
            }

            if (this.tmpArea && this.tmpArea.length > 0) {
              return "".concat(this.commentTranslations['REGISTRATION.DANGER_OBS.AREA']) + "".concat(COMMENT_SEPARATOR).concat(this.tmpArea);
            }

            return this.comment;
          }
        }, {
          key: "delete",
          value: function _delete() {
            this.modalController.dismiss({
              "delete": true
            });
          }
        }, {
          key: "getAreaArray",
          value: function getAreaArray() {
            switch (this.geoHazard) {
              case _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard.Ice:
                {
                  return ['REGISTRATION.DANGER_OBS.RIGHT_HERE', 'REGISTRATION.DANGER_OBS.ON_THIS_SIDE_OF_THE_WATER', 'REGISTRATION.DANGER_OBS.ON_THIS_WATER', 'REGISTRATION.DANGER_OBS.MANY_WATER_NEARBY'];
                }

              default:
                return ['REGISTRATION.DANGER_OBS.ON_THIS_PLACE', 'REGISTRATION.DANGER_OBS.ON_THIS_MOUNTAIN_SIDE', 'REGISTRATION.DANGER_OBS.GENERAL_ON_MOUNTAIN', 'REGISTRATION.DANGER_OBS.IN_THE_VALLEY_OR_FJORD', 'REGISTRATION.DANGER_OBS.FOR_MUNICIPAL', 'REGISTRATION.DANGER_OBS.FOR_REGION'];
            }
          }
        }]);

        return _AddOrEditDangerObsModalPage;
      }();

      _AddOrEditDangerObsModalPage.ɵfac = function AddOrEditDangerObsModalPage_Factory(t) {
        return new (t || _AddOrEditDangerObsModalPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
      };

      _AddOrEditDangerObsModalPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _AddOrEditDangerObsModalPage,
        selectors: [["app-add-or-edit-danger-obs-modal"]],
        inputs: {
          dangerObs: "dangerObs",
          geoHazard: "geoHazard"
        },
        decls: 10,
        vars: 7,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], [4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], ["title", "REGISTRATION.DANGER_OBS.TITLE", 3, "kdvKey", "value", "valueChange", 4, "ngIf"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], ["title", "REGISTRATION.DANGER_OBS.AREA", 3, "selectedValue", "options", "selectedValueChange"], ["title", "REGISTRATION.DANGER_OBS.COMMENT", "rows", "2", "placeholder", "REGISTRATION.DANGER_OBS.COMMENT_PLACEHOLDER", 3, "value", "valueChange"], [3, "showDelete", "saveClicked", "deleteClicked"], ["color", "varsom-dark-blue", "mode", "md", "slot", "start", 3, "ngModel", "ionChange", "ngModelChange"], ["title", "REGISTRATION.DANGER_OBS.TITLE", 3, "kdvKey", "value", "valueChange"]],
        template: function AddOrEditDangerObsModalPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddOrEditDangerObsModalPage_Template_ion_button_click_3_listener() {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AddOrEditDangerObsModalPage_ion_content_9_Template, 15, 12, "ion-content", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 3, "DIALOGS.CANCEL"));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 5, "REGISTRATION.DANGER_OBS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.loaded);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_0__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _shared_components_input_select_select_component__WEBPACK_IMPORTED_MODULE_1__.SelectComponent, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_2__.TextCommentComponent, _components_modal_save_or_delete_buttons_modal_save_or_delete_buttons_component__WEBPACK_IMPORTED_MODULE_3__.ModalSaveOrDeleteButtonsComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_4__.KdvSelectComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    58609: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DangerObsPageModule": function DangerObsPageModule() {
          return (
            /* binding */
            _DangerObsPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _danger_obs_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./danger-obs.page */
      2723);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.module */
      66348);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _danger_obs_page__WEBPACK_IMPORTED_MODULE_0__.DangerObsPage
      }];

      var _DangerObsPageModule = function _DangerObsPageModule() {
        _classCallCheck(this, _DangerObsPageModule);
      };

      _DangerObsPageModule.ɵfac = function DangerObsPageModule_Factory(t) {
        return new (t || _DangerObsPageModule)();
      };

      _DangerObsPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _DangerObsPageModule
      });
      _DangerObsPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_DangerObsPageModule, {
          declarations: [_danger_obs_page__WEBPACK_IMPORTED_MODULE_0__.DangerObsPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    2723: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DangerObsPage": function DangerObsPage() {
          return (
            /* binding */
            _DangerObsPage
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
      /*! ../base.page */
      81877);
      /* harmony import */


      var _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./add-or-edit-danger-obs-modal/add-or-edit-danger-obs-modal.page */
      46373);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../base-page-service */
      35140);
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
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template_ion_item_click_0_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r5);

            var i_r3 = restoredCtx.index;

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

            return ctx_r4.addOrEdit(i_r3);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var dangerObs_r2 = ctx.$implicit;

          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r1.getSummaryText(dangerObs_r2));
        }
      }

      function DangerObsPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("reset", function DangerObsPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r6.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, DangerObsPage_app_registration_content_wrapper_8_ion_item_6_Template, 3, 1, "ion-item", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DangerObsPage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r8.addOrEdit();
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

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 9, "REGISTRATION.DANGER_OBS.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r0.registration.request.DangerObs);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](11, 11, "REGISTRATION.DANGER_OBS.NEW_DANGER_OBS"));

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](15, 13, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("registrationTid", ctx_r0.registrationTid)("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id);
        }
      }

      var _DangerObsPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_DangerObsPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_DangerObsPage);

        function _DangerObsPage(basePageService, activatedRoute, modalController, zone, kdvService) {
          var _this9;

          _classCallCheck(this, _DangerObsPage);

          _this9 = _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.RegistrationTid.DangerObs, basePageService, activatedRoute);
          _this9.modalController = modalController;
          _this9.zone = zone;
          _this9.kdvService = kdvService;
          return _this9;
        }

        _createClass(_DangerObsPage, [{
          key: "onBeforeLeave",
          value: function onBeforeLeave() {
            if (this.dangerSignKdvSubscription) {
              this.dangerSignKdvSubscription.unsubscribe();
            }
          }
        }, {
          key: "onInit",
          value: function onInit() {
            var _this10 = this;

            var kdvKey = "".concat(_varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_9__.GeoHazard[this.registration.geoHazard], "_DangerSignKDV");
            this.dangerSignKdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable(kdvKey).subscribe(function (val) {
              _this10.zone.run(function () {
                _this10.dangerSignKdv = val;
              });
            });
          }
        }, {
          key: "addOrEdit",
          value: function addOrEdit(index) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var dangerObs, modal, result;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      dangerObs = index !== undefined ? this.registration.request.DangerObs[index] : undefined;
                      _context9.next = 3;
                      return this.modalController.create({
                        component: _add_or_edit_danger_obs_modal_add_or_edit_danger_obs_modal_page__WEBPACK_IMPORTED_MODULE_2__.AddOrEditDangerObsModalPage,
                        componentProps: {
                          dangerObs: dangerObs,
                          geoHazard: this.registration.geoHazard
                        }
                      });

                    case 3:
                      modal = _context9.sent;
                      modal.present();
                      _context9.next = 7;
                      return modal.onDidDismiss();

                    case 7:
                      result = _context9.sent;

                      if (result.data) {
                        if (result.data["delete"]) {
                          this.removeAtIndex(index);
                        } else {
                          if (index !== undefined) {
                            this.setDangerObs(index, result.data);
                          } else {
                            this.addDangerObs(result.data);
                          }
                        }
                      }

                    case 9:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "setDangerObs",
          value: function setDangerObs(index, dangerObs) {
            var _this11 = this;

            this.zone.run(function () {
              if (!_this11.registration.request.DangerObs) {
                _this11.registration.request.DangerObs = [];
              }

              _this11.registration.request.DangerObs[index] = dangerObs;
            });
          }
        }, {
          key: "addDangerObs",
          value: function addDangerObs(dangerObs) {
            var _this12 = this;

            this.zone.run(function () {
              if (!_this12.registration.request.DangerObs) {
                _this12.registration.request.DangerObs = [];
              }

              _this12.registration.request.DangerObs.push(dangerObs);
            });
          }
        }, {
          key: "removeAtIndex",
          value: function removeAtIndex(index) {
            var _this13 = this;

            this.zone.run(function () {
              if (!_this13.registration.request.DangerObs) {
                _this13.registration.request.DangerObs = [];
              }

              if (_this13.registration.request.DangerObs.length > 0) {
                _this13.registration.request.DangerObs.splice(index, 1);
              }
            });
          }
        }, {
          key: "getSummaryText",
          value: function getSummaryText(dangerObs) {
            var text = [];

            if (dangerObs.DangerSignTID % 100 !== 0 && this.dangerSignKdv) {
              var kdvElement = this.dangerSignKdv.find(function (x) {
                return x.Id === dangerObs.DangerSignTID;
              });

              if (kdvElement) {
                text.push(kdvElement.Name.trim());
              }
            }

            if (dangerObs.Comment) {
              text.push(dangerObs.Comment);
            }

            return text.join(', ');
          }
        }]);

        return _DangerObsPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _DangerObsPage.ɵfac = function DangerObsPage_Factory(t) {
        return new (t || _DangerObsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_4__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_3__.KdvService));
      };

      _DangerObsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _DangerObsPage,
        selectors: [["app-danger-obs"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["defaultHref", "/", "text", ""], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], ["color", "dark", "name", "add-circle-outline", "slot", "start"], [3, "registrationTid", "geoHazard", "registrationId"]],
        template: function DangerObsPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, DangerObsPage_app_registration_content_wrapper_8_Template, 17, 15, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 2, "REGISTRATION.DANGER_OBS.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_6__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkYW5nZXItb2JzLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXBDLENBQTJDVixLQUEzQyxFQUFrRCxDQUFsRDtBQUNEO0FBQ0YsYUFQRDtBQVFEOzs7aUJBRUQsd0JBQWVsRCxTQUFmLEVBQTRDO0FBQzFDLGdCQUFNbEYsSUFBSSxHQUFHLEVBQWI7O0FBQ0EsZ0JBQUlrRixTQUFTLENBQUNZLGFBQVYsR0FBMEIsR0FBMUIsS0FBa0MsQ0FBbEMsSUFBdUMsS0FBS3FDLGFBQWhELEVBQStEO0FBQzdELGtCQUFNWSxVQUFVLEdBQUcsS0FBS1osYUFBTCxDQUFtQjlDLElBQW5CLENBQ2pCLFVBQUNDLENBQUQ7QUFBQSx1QkFBT0EsQ0FBQyxDQUFDMEQsRUFBRixLQUFTOUQsU0FBUyxDQUFDWSxhQUExQjtBQUFBLGVBRGlCLENBQW5COztBQUdBLGtCQUFJaUQsVUFBSixFQUFnQjtBQUNkL0ksb0JBQUksQ0FBQzZJLElBQUwsQ0FBVUUsVUFBVSxDQUFDRSxJQUFYLENBQWdCQyxJQUFoQixFQUFWO0FBQ0Q7QUFDRjs7QUFDRCxnQkFBSWhFLFNBQVMsQ0FBQ0MsT0FBZCxFQUF1QjtBQUNyQm5GLGtCQUFJLENBQUM2SSxJQUFMLENBQVUzRCxTQUFTLENBQUNDLE9BQXBCO0FBQ0Q7O0FBQ0QsbUJBQU9uRixJQUFJLENBQUMwRCxJQUFMLENBQVUsSUFBVixDQUFQO0FBQ0Q7Ozs7UUFsR2dDeUY7Ozt5QkFBdEJ6QixnQkFBYUQ7QUFBQTs7O2NBQWJDO0FBQWFkO0FBQUE3QztBQUFBK0M7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRGpCMUJROztBQUNFQTs7QUFDRUE7O0FBQ0VBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7QUF3QkZBOzs7O0FBN0JNQTs7QUFBQUE7O0FBSytCQTs7QUFBQUE7Ozs7Ozs7OzsiLCJuYW1lcyI6WyJERUJVR19UQUciLCJCYXNlUGFnZVNlcnZpY2UiLCJyZWdpc3RyYXRpb25TZXJ2aWNlIiwibmV3QXR0YWNobWVudFNlcnZpY2UiLCJjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIiwibmdab25lIiwiYWxlcnRDb250cm9sbGVyIiwidHJhbnNsYXRlU2VydmljZSIsImxvZ2dpbmdTZXJ2aWNlIiwicmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uVGlkIiwib25SZXNldCIsImdldCIsInRvUHJvbWlzZSIsImxlYXZlVGV4dCIsImNyZWF0ZVJlc2V0RGlhbG9nIiwibWVzc2FnZSIsInRyYW5zbGF0aW9ucyIsImNyZWF0ZSIsImJ1dHRvbnMiLCJ0ZXh0Iiwicm9sZSIsImFsZXJ0IiwicHJlc2VudCIsIm9uRGlkRGlzbWlzcyIsInJlc3VsdCIsInJlc2V0IiwiWm9uZSIsInJ1biIsInJlcXVlc3QiLCJnZXREZWZhdWx0VmFsdWUiLCJyZXNldEltYWdlcyIsInNhdmVSZWdpc3RyYXRpb25Bc3luYyIsInByb3BOYW1lIiwiZ2V0QXR0YWNobWVudHMiLCJpZCIsInBpcGUiLCJhdHRhY2htZW50cyIsIm1hcCIsImEiLCJyZW1vdmVBdHRhY2htZW50Iiwic3Vic2NyaWJlIiwiZGVidWciLCJlcnJvciIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsImZhY3RvcnkiLCJwcm92aWRlZEluIiwiQmFzZVBhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsInNuYXBzaG90IiwicGFyYW1zIiwiQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsImdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkIiwicmVnIiwiY3JlYXRlRGVmYXVsdFByb3BzIiwiY3JlYXRlSW5pdE9ic2VydmFibGUiLCJuZ0Rlc3Ryb3kkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpc1ZhbGlkIiwidmFsaWQiLCJpc0VtcHR5IiwiY29uZmlybUxlYXZlIiwib25Jbml0Iiwib25CZWZvcmVMZWF2ZSIsInNhdmUiLCJjbGVhbiIsInN5bmNTdGF0dXMiLCJzcmNfYXBwX21vZHVsZXNfY29tbW9uX3JlZ2lzdHJhdGlvbl9yZWdpc3RyYXRpb25fbW9kZWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJSZWdpc3RyYXRpb25TZXJ2aWNlIiwiaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMiLCJjb25maXJtUmVzZXQiLCJwYXRoRnJvbVJvb3QiLCJ2IiwidXJsIiwic2VnbWVudCIsInRvU3RyaW5nIiwiam9pbiIsImZpbHRlciIsInBhdGgiLCJfY29yZV9oZWxwZXJzX29ic2VydmFibGVfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xMV9fIiwiZmVhdHVyZXMiLCJBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJkZWNsYXJhdGlvbnMiLCJfYWRkX29yX2VkaXRfZGFuZ2VyX29ic19tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiY3R4X3IwIiwiQ09NTUVOVF9TRVBBUkFUT1IiLCJBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2UiLCJtb2RhbENvbnRyb2xsZXIiLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwiZ2VvSGF6YXJkIiwic2hvd0RhbmdlclNpZ25DaGVja2JveCIsImdldEFyZWFBcnJheSIsInRyYW5sYXRpb25zIiwiY29tbWVudFRyYW5zbGF0aW9ucyIsImFyZWFBcnIiLCJpdGVtIiwiZGFuZ2VyT2JzIiwiQ29tbWVudCIsIm9wdGlvbiIsImZpbmQiLCJ4IiwiaW5kZXhPZiIsInRtcEFyZWEiLCJjb21tZW50Iiwic3Vic3RyIiwibGVuZ3RoIiwidGV4dFRvRmluZCIsImFkZGl0aW9uYWxDb21tZW50SW5kZXgiLCJEYW5nZXJTaWduVElEIiwiZ2V0Tm9EYW5nZXJTaWduVGlkIiwibm9EYW5nZXJPYnMiLCJkYW5nZXJTaWduVGlkIiwidXBkYXRlRGFuZ2VyU2lnblNlbGVjdFZpc2liaWx0eSIsImxvYWRlZCIsInNob3dEYW5nZXJTaWduU2VsZWN0IiwiZ2V0RGFuZ2VyU2lnblRpZE9yRmFsbGJhY2siLCJ2YWwiLCJkaXNtaXNzIiwidW5kZWZpbmVkIiwiZGFuZ2VyT2JzVG9TYXZlIiwiR2VvSGF6YXJkVElEIiwiZ2V0Q29tbWVudCIsInNlbGVjdG9ycyIsImlucHV0cyIsImRlY2xzIiwidmFycyIsImNvbnN0cyIsInRlbXBsYXRlIiwiY3R4Iiwicm91dGVzIiwiY29tcG9uZW50IiwiX2Rhbmdlcl9vYnNfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiRGFuZ2VyT2JzUGFnZU1vZHVsZSIsIl9hZGRfb3JfZWRpdF9kYW5nZXJfb2JzX21vZGFsX2FkZF9vcl9lZGl0X2Rhbmdlcl9vYnNfbW9kYWxfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfYW5ndWxhcl9yb3V0ZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsIkRhbmdlck9ic1BhZ2UiLCJ6b25lIiwia2R2U2VydmljZSIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImRhbmdlclNpZ25LZHZTdWJzY3JpcHRpb24iLCJ1bnN1YnNjcmliZSIsImtkdktleSIsIl92YXJzb21fcmVnb2JzX2NvbW1vbl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJnZXRLZHZSZXBvc2l0b3J5QnlLZXlPYnNlcnZhYmxlIiwiZGFuZ2VyU2lnbktkdiIsImluZGV4IiwiRGFuZ2VyT2JzIiwiX2FkZF9vcl9lZGl0X2Rhbmdlcl9vYnNfbW9kYWxfYWRkX29yX2VkaXRfZGFuZ2VyX29ic19tb2RhbF9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJjb21wb25lbnRQcm9wcyIsIm1vZGFsIiwiZGF0YSIsInJlbW92ZUF0SW5kZXgiLCJzZXREYW5nZXJPYnMiLCJhZGREYW5nZXJPYnMiLCJwdXNoIiwic3BsaWNlIiwia2R2RWxlbWVudCIsIklkIiwiTmFtZSIsInRyaW0iLCJfYmFzZV9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Rhbmdlci1vYnMvYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9kYW5nZXItb2JzL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwvYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbC5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9kYW5nZXItb2JzL2Rhbmdlci1vYnMubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2Rhbmdlci1vYnMvZGFuZ2VyLW9icy5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZGFuZ2VyLW9icy9kYW5nZXItb2JzLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBnZXRQcm9wZXJ0eU5hbWUsIGlzQXJyYXlUeXBlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLmhlbHBlcnMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSwgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWxlcnRDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTG9nZ2luZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ0Jhc2VQYWdlU2VydmljZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhc2VQYWdlU2VydmljZSB7XHJcbiAgZ2V0IFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uZ1pvbmU7XHJcbiAgfVxyXG5cclxuICBnZXQgUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQWxlcnRDb250cm9sbGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYWxlcnRDb250cm9sbGVyO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFRyYW5zbGF0ZVNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVTZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlZ2lzdHJhdGlvblNlcnZpY2U6IFJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5ld0F0dGFjaG1lbnRTZXJ2aWNlOiBOZXdBdHRhY2htZW50U2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGFsZXJ0Q29udHJvbGxlcjogQWxlcnRDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBsb2dnaW5nU2VydmljZTogTG9nZ2luZ1NlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1MZWF2ZShyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLlJFUVVJUkVEX0ZJRUxEU19NSVNTSU5HJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGNvbmZpcm1SZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgbGVhdmVUZXh0ID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldCgnUkVHSVNUUkFUSU9OLkNPTkZJUk1fUkVTRVQnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVSZXNldERpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KFsnRElBTE9HUy5DQU5DRUwnLCAnRElBTE9HUy5ZRVMnXSkudG9Qcm9taXNlKCk7XHJcbiAgICBjb25zdCBhbGVydCA9IGF3YWl0IHRoaXMuYWxlcnRDb250cm9sbGVyLmNyZWF0ZSh7XHJcbiAgICAgIG1lc3NhZ2UsXHJcbiAgICAgIGJ1dHRvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLllFUyddXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGFsZXJ0Lm9uRGlkRGlzbWlzcygpO1xyXG4gICAgY29uc3QgcmVzZXQ6IGJvb2xlYW4gPSByZXN1bHQucm9sZSAhPT0gJ2NhbmNlbCc7XHJcbiAgICBpZiAocmVzZXQpIHtcclxuICAgICAgYXdhaXQgdGhpcy5yZXNldChyZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzZXQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyByZXNldChyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5ab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmIChyZWdpc3RyYXRpb25UaWQpIHtcclxuICAgICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgIHRoaXMucmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob25SZXNldCkge1xyXG4gICAgICAgIG9uUmVzZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEZWZhdWx0UHJvcHMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgY29uc3QgcHJvcE5hbWUgPSBnZXRQcm9wZXJ0eU5hbWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIGlmICghcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdKSB7XHJcbiAgICAgIC8vIEluaXQgdG8gbmV3IG9iamVjdCBpZiBudWxsXHJcbiAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGlmIChpc0FycmF5VHlwZShyZWdpc3RyYXRpb25UaWQpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7fTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZVxyXG4gICAgICAuZ2V0QXR0YWNobWVudHMocmVnaXN0cmF0aW9uLmlkKVxyXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKGF0dGFjaG1lbnRzKSA9PiBmb3JrSm9pbihhdHRhY2htZW50cy5tYXAoKGEpID0+IHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2UucmVtb3ZlQXR0YWNobWVudChyZWdpc3RyYXRpb24uaWQsIGEuaWQpKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZGVidWcoJ1Jlc2V0IGltYWdlcyBjb21wbGV0ZScsIERFQlVHX1RBRyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nZ2luZ1NlcnZpY2UuZXJyb3IoZXJyb3IsIERFQlVHX1RBRywgJ0NvdWxkIG5vdCByZXNldCBpbWFnZXMnKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEJhc2VQYWdlU2VydmljZSB9IGZyb20gJy4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5cclxuQERpcmVjdGl2ZSgpXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGFnZSBleHRlbmRzIE5nRGVzdG9yeUJhc2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZTtcclxuICByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZDtcclxuICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UgPSBiYXNlUGFnZVNlcnZpY2U7XHJcbiAgICB0aGlzLmFjdGl2YXRlZFJvdXRlID0gYWN0aXZhdGVkUm91dGU7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZCA9IHJlZ2lzdHJhdGlvblRpZDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgY29uc3QgaWQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhcmFtc1snaWQnXTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0UmVnaXN0cmF0aW9uQnlJZFNoYXJlZCQoaWQpXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHRha2UoMSksXHJcbiAgICAgICAgbWFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNyZWF0ZURlZmF1bHRQcm9wcyhyZWcsIHRoaXMucmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICAgIHJldHVybiByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFwKChyZWcpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uID0gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmNyZWF0ZUluaXRPYnNlcnZhYmxlKCkpLFxyXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0PygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvbkJlZm9yZUxlYXZlPygpOiB2b2lkIHwgUHJvbWlzZTxhbnk+O1xyXG5cclxuICBvblJlc2V0PygpOiB2b2lkO1xyXG5cclxuICBpc1ZhbGlkPygpOiBib29sZWFuIHwgUHJvbWlzZTxib29sZWFuPjtcclxuXHJcbiAgLy8gTk9URTogUmVtZW1iZXIgdG8gYWRkIGNhbkRlYWN0aXZhdGU6IFtDYW5EZWFjdGl2YXRlUm91dGVHdWFyZF0gaW4gcGFnZSBtb2R1bGVcclxuICBhc3luYyBjYW5MZWF2ZSgpIHtcclxuICAgIC8vIENoZWNrIGlmIGltcGxlbWVudGF0aW9uIHBhZ2UgaGFzIGltcGxlbWVudGVkIGN1c3RvbSBpc1ZhbGlkIGxvZ2ljXHJcbiAgICBjb25zdCB2YWxpZCA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzVmFsaWQgPyB0aGlzLmlzVmFsaWQoKSA6IHRydWUpO1xyXG4gICAgLy8gT25seSByZXR1cm4gYWxlcnQgaWYgcGFnZSBpcyBub3QgZW1wdHkgYW5kIGludmFsaWRcclxuICAgIGNvbnN0IGlzRW1wdHkgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc0VtcHR5KCkpO1xyXG4gICAgaWYgKCFpc0VtcHR5ICYmICF2YWxpZCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybUxlYXZlKHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUluaXRPYnNlcnZhYmxlKCkge1xyXG4gICAgaWYgKHRoaXMub25Jbml0KSB7XHJcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UucmVzb2x2ZSh0aGlzLm9uSW5pdCgpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2Yoe30pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLm9uQmVmb3JlTGVhdmUpIHtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMub25CZWZvcmVMZWF2ZSgpKTtcclxuICAgIH1cclxuICAgIGF3YWl0IHRoaXMuc2F2ZSh0cnVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoY2xlYW4gPSBmYWxzZSkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuUmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmModGhpcy5yZWdpc3RyYXRpb24sIGNsZWFuKTtcclxuICB9XHJcblxyXG4gIGdldFNhdmVGdW5jKCkge1xyXG4gICAgcmV0dXJuICgpID0+IHRoaXMuc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiAhKGF3YWl0IHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaGFzQW55RGF0YVRvU2hvd0luUmVnaXN0cmF0aW9uVHlwZXMoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvblRpZFxyXG4gICAgKVxyXG4gICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAudG9Qcm9taXNlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iYXNlUGFnZVNlcnZpY2UuY29uZmlybVJlc2V0KHRoaXMucmVnaXN0cmF0aW9uLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCwgKCkgPT4gKHRoaXMub25SZXNldCA/IHRoaXMub25SZXNldCgpIDogbnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzb2x2ZWRVcmwoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICcvJyArXHJcbiAgICAgIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgICAgICAgLm1hcCgodikgPT4gdi51cmwubWFwKChzZWdtZW50KSA9PiBzZWdtZW50LnRvU3RyaW5nKCkpLmpvaW4oJy8nKSlcclxuICAgICAgICAuZmlsdGVyKChwYXRoKSA9PiAhIXBhdGgpXHJcbiAgICAgICAgLmpvaW4oJy8nKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8vIGdldENvbmZpZ3VyZWRVcmwoKTogc3RyaW5nIHtcclxuICAvLyAgICAgcmV0dXJuICcvJyArIHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGF0aEZyb21Sb290XHJcbiAgLy8gICAgICAgICAuZmlsdGVyKHYgPT4gdi5yb3V0ZUNvbmZpZylcclxuICAvLyAgICAgICAgIC5tYXAodiA9PiB2LnJvdXRlQ29uZmlnLnBhdGgpXHJcbiAgLy8gICAgICAgICAuam9pbignLycpO1xyXG4gIC8vIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2UgfSBmcm9tICcuL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbU2hhcmVkQ29tcG9uZW50c01vZHVsZV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbQWRkT3JFZGl0RGFuZ2VyT2JzTW9kYWxQYWdlXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1idXR0b24gKGNsaWNrKT1cImNhbmNlbCgpXCI+e3sgJ0RJQUxPR1MuQ0FOQ0VMJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eyAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuVElUTEUnIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcblxyXG48aW9uLWNvbnRlbnQgKm5nSWY9XCJsb2FkZWRcIj5cclxuICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICA8aW9uLWl0ZW0gKm5nSWY9XCJzaG93RGFuZ2VyU2lnbkNoZWNrYm94XCI+XHJcbiAgICAgIDxpb24tY2hlY2tib3ggKGlvbkNoYW5nZSk9XCJjaGVja0JveENoYW5nZWQoKVwiIGNvbG9yPVwidmFyc29tLWRhcmstYmx1ZVwiIG1vZGU9XCJtZFwiIHNsb3Q9XCJzdGFydFwiIFsobmdNb2RlbCldPVwibm9EYW5nZXJPYnNcIj48L2lvbi1jaGVja2JveD5cclxuICAgICAgPGlvbi1sYWJlbD57eyAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuTk9fREFNQUdFX1NJR04nIHwgdHJhbnNsYXRlfX08L2lvbi1sYWJlbD5cclxuICAgIDwvaW9uLWl0ZW0+XHJcbiAgICA8YXBwLWtkdi1zZWxlY3QgKHZhbHVlQ2hhbmdlKT1cImRyb3Bkb3duQ2hhbmdlZCgkZXZlbnQpXCIgdGl0bGU9XCJSRUdJU1RSQVRJT04uREFOR0VSX09CUy5USVRMRVwiICpuZ0lmPVwic2hvd0RhbmdlclNpZ25TZWxlY3RcIlxyXG4gICAgICBrZHZLZXk9XCJ7eyBHZW9IYXphcmROYW1lIH19X0RhbmdlclNpZ25LRFZcIiBbKHZhbHVlKV09XCJkYW5nZXJTaWduVGlkXCI+XHJcbiAgICA8L2FwcC1rZHYtc2VsZWN0PlxyXG4gICAgPGlvbi1pdGVtPlxyXG4gICAgICA8aW9uLWxhYmVsIGNvbG9yPVwibWVkaXVtXCIgcG9zaXRpb249XCJzdGFja2VkXCIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj57eydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5BUkVBJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8YXBwLXNlbGVjdCB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkFSRUFcIiBbKHNlbGVjdGVkVmFsdWUpXT1cInRtcEFyZWFcIiBbb3B0aW9uc109XCJhcmVhQXJyXCI+PC9hcHAtc2VsZWN0PlxyXG4gICAgPC9pb24taXRlbT5cclxuICAgIDxhcHAtdGV4dC1jb21tZW50IFsodmFsdWUpXT1cImNvbW1lbnRcIiB0aXRsZT1cIlJFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkNPTU1FTlRcIiByb3dzPVwiMlwiXHJcbiAgICAgIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuQ09NTUVOVF9QTEFDRUhPTERFUlwiPjwvYXBwLXRleHQtY29tbWVudD5cclxuICA8L2lvbi1saXN0PlxyXG4gIDxhcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucyAoc2F2ZUNsaWNrZWQpPVwib2soKVwiIChkZWxldGVDbGlja2VkKT1cImRlbGV0ZSgpXCIgW3Nob3dEZWxldGVdPVwiZGFuZ2VyT2JzXCI+XHJcbiAgPC9hcHAtbW9kYWwtc2F2ZS1vci1kZWxldGUtYnV0dG9ucz5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYW5nZXJPYnNFZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2lucHV0L3NlbGVjdC9zZWxlY3Qtb3B0aW9uLm1vZGVsJztcclxuXHJcbmNvbnN0IENPTU1FTlRfU0VQQVJBVE9SID0gJzogJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtYWRkLW9yLWVkaXQtZGFuZ2VyLW9icy1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRPckVkaXREYW5nZXJPYnNNb2RhbFBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbmdlck9iczogRGFuZ2VyT2JzRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIG5vRGFuZ2VyT2JzID0gZmFsc2U7XHJcbiAgYXJlYUFycjogU2VsZWN0T3B0aW9uW107XHJcbiAgdG1wQXJlYSA9ICcnO1xyXG4gIGRhbmdlclNpZ25UaWQ6IG51bWJlcjtcclxuICBjb21tZW50OiBzdHJpbmc7XHJcbiAgbG9hZGVkID0gZmFsc2U7XHJcbiAgY29tbWVudFRyYW5zbGF0aW9uczogc3RyaW5nW107XHJcbiAgc2hvd0RhbmdlclNpZ25TZWxlY3QgPSB0cnVlO1xyXG4gIHNob3dEYW5nZXJTaWduQ2hlY2tib3ggPSBmYWxzZTtcclxuXHJcbiAgaW50ZXJmYWNlT3B0aW9ucyA9IHt9O1xyXG5cclxuICBnZXQgR2VvSGF6YXJkTmFtZSgpIHtcclxuICAgIHJldHVybiBHZW9IYXphcmRbdGhpcy5nZW9IYXphcmRdO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTZXJ2aWNlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNob3dEYW5nZXJTaWduQ2hlY2tib3ggPSB0aGlzLmdlb0hhemFyZCAhPSBHZW9IYXphcmQuSWNlO1xyXG5cclxuICAgIGNvbnN0IHRyYW5sYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQodGhpcy5nZXRBcmVhQXJyYXkoKSlcclxuICAgICAgLnRvUHJvbWlzZSgpO1xyXG4gICAgdGhpcy5jb21tZW50VHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5BUkVBJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuREVTQ1JJUFRJT04nXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIHRoaXMuYXJlYUFyciA9IHRoaXMuZ2V0QXJlYUFycmF5KClcclxuICAgICAgLm1hcCgoaXRlbSkgPT4gdHJhbmxhdGlvbnNbaXRlbV0gYXMgc3RyaW5nKVxyXG4gICAgICAubWFwKChpdGVtKSA9PiAoeyBpZDogaXRlbSwgdGV4dDogaXRlbSB9KSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZGFuZ2VyT2JzKSB7XHJcbiAgICAgIGlmICh0aGlzLmRhbmdlck9icy5Db21tZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5hcmVhQXJyLmZpbmQoXHJcbiAgICAgICAgICAoeCkgPT4gdGhpcy5kYW5nZXJPYnMuQ29tbWVudC5pbmRleE9mKHguaWQpID49IDBcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMudG1wQXJlYSA9IG9wdGlvbiA/IG9wdGlvbi5pZCA6ICcnO1xyXG4gICAgICAgIGlmICh0aGlzLnRtcEFyZWEpIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQuc3Vic3RyKFxyXG4gICAgICAgICAgICB0aGlzLmRhbmdlck9icy5Db21tZW50LmluZGV4T2YodGhpcy50bXBBcmVhKSArIHRoaXMudG1wQXJlYS5sZW5ndGhcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0VG9GaW5kID1cclxuICAgICAgICAgICAgYCR7dGhpcy5jb21tZW50VHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5ERVNDUklQVElPTiddfWAgK1xyXG4gICAgICAgICAgICBgJHtDT01NRU5UX1NFUEFSQVRPUn1gO1xyXG4gICAgICAgICAgY29uc3QgYWRkaXRpb25hbENvbW1lbnRJbmRleCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQuaW5kZXhPZihcclxuICAgICAgICAgICAgdGV4dFRvRmluZFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChhZGRpdGlvbmFsQ29tbWVudEluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdGhpcy5kYW5nZXJPYnMuQ29tbWVudC5zdWJzdHIoXHJcbiAgICAgICAgICAgICAgYWRkaXRpb25hbENvbW1lbnRJbmRleCArIHRleHRUb0ZpbmQubGVuZ3RoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY29tbWVudCA9IHRoaXMuZGFuZ2VyT2JzLkNvbW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmRhbmdlck9icy5EYW5nZXJTaWduVElEID09PSB0aGlzLmdldE5vRGFuZ2VyU2lnblRpZCgpKSB7XHJcbiAgICAgICAgdGhpcy5ub0Rhbmdlck9icyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kYW5nZXJTaWduVGlkID0gdGhpcy5kYW5nZXJPYnMuRGFuZ2VyU2lnblRJRDtcclxuICAgICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCkge1xyXG4gICAgaWYgKHRoaXMuZ2VvSGF6YXJkID09PSBHZW9IYXphcmQuSWNlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0RhbmdlclNpZ25TZWxlY3QgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RGFuZ2VyU2lnblNlbGVjdCA9ICF0aGlzLm5vRGFuZ2VyT2JzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRGFuZ2VyT2JzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ub0Rhbmdlck9icyA9ICF0aGlzLm5vRGFuZ2VyT2JzO1xyXG4gICAgaWYgKHRoaXMubm9EYW5nZXJPYnMpIHtcclxuICAgICAgdGhpcy5kYW5nZXJTaWduVGlkID0gdGhpcy5nZXREYW5nZXJTaWduVGlkT3JGYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0JveENoYW5nZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVwZGF0ZURhbmdlclNpZ25TZWxlY3RWaXNpYmlsdHkoKTtcclxuICB9XHJcblxyXG4gIGRyb3Bkb3duQ2hhbmdlZCh2YWw6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbCA9PT0gdGhpcy5nZXROb0RhbmdlclNpZ25UaWQoKSkge1xyXG4gICAgICB0aGlzLm5vRGFuZ2VyT2JzID0gdHJ1ZTtcclxuICAgICAgdGhpcy51cGRhdGVEYW5nZXJTaWduU2VsZWN0VmlzaWJpbHR5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vRGFuZ2VyT2JzID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBnZXROb0RhbmdlclNpZ25UaWQoKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuU25vdyA/IHRoaXMuZ2VvSGF6YXJkICogMTAgOiAwKSArIDE7XHJcbiAgfVxyXG5cclxuICBnZXREYW5nZXJTaWduVGlkT3JGYWxsYmFjaygpIHtcclxuICAgIHJldHVybiB0aGlzLmRhbmdlclNpZ25UaWQgIT09IHVuZGVmaW5lZFxyXG4gICAgICA/IHRoaXMuZGFuZ2VyU2lnblRpZFxyXG4gICAgICA6IHRoaXMuZ2VvSGF6YXJkICE9PSBHZW9IYXphcmQuU25vd1xyXG4gICAgICAgID8gdGhpcy5nZW9IYXphcmQgKiAxMFxyXG4gICAgICAgIDogMDtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgY29uc3QgZGFuZ2VyT2JzVG9TYXZlOiBEYW5nZXJPYnNFZGl0TW9kZWwgPSB7XHJcbiAgICAgIEdlb0hhemFyZFRJRDogdGhpcy5nZW9IYXphcmQsXHJcbiAgICAgIERhbmdlclNpZ25USUQ6IHRoaXMubm9EYW5nZXJPYnNcclxuICAgICAgICA/IHRoaXMuZ2V0Tm9EYW5nZXJTaWduVGlkKClcclxuICAgICAgICA6IHRoaXMuZ2V0RGFuZ2VyU2lnblRpZE9yRmFsbGJhY2soKSxcclxuICAgICAgQ29tbWVudDogdGhpcy5nZXRDb21tZW50KClcclxuICAgIH07XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGRhbmdlck9ic1RvU2F2ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldENvbW1lbnQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudG1wQXJlYSAmJlxyXG4gICAgICB0aGlzLnRtcEFyZWEubGVuZ3RoID4gMCAmJlxyXG4gICAgICB0aGlzLmNvbW1lbnQgJiZcclxuICAgICAgdGhpcy5jb21tZW50Lmxlbmd0aCA+IDBcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIGAke3RoaXMuY29tbWVudFRyYW5zbGF0aW9uc1snUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuQVJFQSddfWAgK1xyXG4gICAgICAgIGAke0NPTU1FTlRfU0VQQVJBVE9SfSR7dGhpcy50bXBBcmVhfS4gYCArXHJcbiAgICAgICAgYCR7dGhpcy5jb21tZW50VHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uREFOR0VSX09CUy5ERVNDUklQVElPTiddfWAgK1xyXG4gICAgICAgIGAke0NPTU1FTlRfU0VQQVJBVE9SfSR7dGhpcy5jb21tZW50IHx8ICcnfWBcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnRtcEFyZWEgJiYgdGhpcy50bXBBcmVhLmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICBgJHt0aGlzLmNvbW1lbnRUcmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLkFSRUEnXX1gICtcclxuICAgICAgICBgJHtDT01NRU5UX1NFUEFSQVRPUn0ke3RoaXMudG1wQXJlYX1gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29tbWVudDtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoeyBkZWxldGU6IHRydWUgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRBcmVhQXJyYXkoKSB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuZ2VvSGF6YXJkKSB7XHJcbiAgICBjYXNlIEdlb0hhemFyZC5JY2U6IHtcclxuICAgICAgcmV0dXJuIFtcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuUklHSFRfSEVSRScsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLk9OX1RISVNfU0lERV9PRl9USEVfV0FURVInLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5PTl9USElTX1dBVEVSJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuTUFOWV9XQVRFUl9ORUFSQlknXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5PTl9USElTX1BMQUNFJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuT05fVEhJU19NT1VOVEFJTl9TSURFJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuR0VORVJBTF9PTl9NT1VOVEFJTicsXHJcbiAgICAgICAgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLklOX1RIRV9WQUxMRVlfT1JfRkpPUkQnLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREFOR0VSX09CUy5GT1JfTVVOSUNJUEFMJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuRk9SX1JFR0lPTidcclxuICAgICAgXTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBEYW5nZXJPYnNQYWdlIH0gZnJvbSAnLi9kYW5nZXItb2JzLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgQWRkT3JFZGl0RGFuZ2VyT2JzTW9kYWxQYWdlTW9kdWxlIH0gZnJvbSAnLi9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBEYW5nZXJPYnNQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgQWRkT3JFZGl0RGFuZ2VyT2JzTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0Rhbmdlck9ic1BhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYW5nZXJPYnNQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gZGVmYXVsdEhyZWY9XCIvXCIgdGV4dD1cIlwiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiXHJcbiAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5EQU5HRVJfT0JTLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLWl0ZW0gKGNsaWNrKT1cImFkZE9yRWRpdChpKVwiICpuZ0Zvcj1cImxldCBkYW5nZXJPYnMgb2YgcmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eyBnZXRTdW1tYXJ5VGV4dChkYW5nZXJPYnMpIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24taXRlbSAoY2xpY2spPVwiYWRkT3JFZGl0KClcIj5cclxuICAgICAgICA8aW9uLWljb24gY29sb3I9XCJkYXJrXCIgbmFtZT1cImFkZC1jaXJjbGUtb3V0bGluZVwiIHNsb3Q9XCJzdGFydFwiPjwvaW9uLWljb24+XHJcbiAgICAgICAgPGlvbi1sYWJlbD57eyAnUkVHSVNUUkFUSU9OLkRBTkdFUl9PQlMuTkVXX0RBTkdFUl9PQlMnIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWl0ZW0+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW1cclxuICAgICAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIFtnZW9IYXphcmRdPVwicmVnaXN0cmF0aW9uLmdlb0hhemFyZFwiIFtyZWdpc3RyYXRpb25JZF09XCJyZWdpc3RyYXRpb24uaWRcIj48L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZSB9IGZyb20gJy4uL2Jhc2UucGFnZSc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgQWRkT3JFZGl0RGFuZ2VyT2JzTW9kYWxQYWdlIH0gZnJvbSAnLi9hZGQtb3ItZWRpdC1kYW5nZXItb2JzLW1vZGFsL2FkZC1vci1lZGl0LWRhbmdlci1vYnMtbW9kYWwucGFnZSc7XHJcbmltcG9ydCB7IERhbmdlck9ic0VkaXRNb2RlbCwgS2R2RWxlbWVudCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1kYW5nZXItb2JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGFuZ2VyLW9icy5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Rhbmdlci1vYnMucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERhbmdlck9ic1BhZ2UgZXh0ZW5kcyBCYXNlUGFnZSB7XHJcbiAgcHJpdmF0ZSBkYW5nZXJTaWduS2R2OiBLZHZFbGVtZW50W107XHJcbiAgcHJpdmF0ZSBkYW5nZXJTaWduS2R2U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIGtkdlNlcnZpY2U6IEtkdlNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5EYW5nZXJPYnMsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmRhbmdlclNpZ25LZHZTdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5kYW5nZXJTaWduS2R2U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkluaXQoKSB7XHJcbiAgICBjb25zdCBrZHZLZXkgPSBgJHtHZW9IYXphcmRbdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkXX1fRGFuZ2VyU2lnbktEVmA7XHJcbiAgICB0aGlzLmRhbmdlclNpZ25LZHZTdWJzY3JpcHRpb24gPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoa2R2S2V5KVxyXG4gICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHtcclxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZGFuZ2VyU2lnbktkdiA9IHZhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGRPckVkaXQoaW5kZXg/OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRhbmdlck9icyA9XHJcbiAgICAgIGluZGV4ICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzW2luZGV4XVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IEFkZE9yRWRpdERhbmdlck9ic01vZGFsUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHsgZGFuZ2VyT2JzLCBnZW9IYXphcmQ6IHRoaXMucmVnaXN0cmF0aW9uLmdlb0hhemFyZCB9XHJcbiAgICB9KTtcclxuICAgIG1vZGFsLnByZXNlbnQoKTtcclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IG1vZGFsLm9uRGlkRGlzbWlzcygpO1xyXG4gICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgIGlmIChyZXN1bHQuZGF0YS5kZWxldGUpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUF0SW5kZXgoaW5kZXgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNldERhbmdlck9icyhpbmRleCwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmFkZERhbmdlck9icyhyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXREYW5nZXJPYnMoaW5kZXg6IG51bWJlciwgZGFuZ2VyT2JzOiBEYW5nZXJPYnNFZGl0TW9kZWwpIHtcclxuICAgIHRoaXMuem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMgPSBbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9ic1tpbmRleF0gPSBkYW5nZXJPYnM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFkZERhbmdlck9icyhkYW5nZXJPYnM6IERhbmdlck9ic0VkaXRNb2RlbCkge1xyXG4gICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW5nZXJPYnMpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9icyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzLnB1c2goZGFuZ2VyT2JzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQXRJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9icykge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzID0gW107XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFuZ2VyT2JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbmdlck9icy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFN1bW1hcnlUZXh0KGRhbmdlck9iczogRGFuZ2VyT2JzRWRpdE1vZGVsKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gW107XHJcbiAgICBpZiAoZGFuZ2VyT2JzLkRhbmdlclNpZ25USUQgJSAxMDAgIT09IDAgJiYgdGhpcy5kYW5nZXJTaWduS2R2KSB7XHJcbiAgICAgIGNvbnN0IGtkdkVsZW1lbnQgPSB0aGlzLmRhbmdlclNpZ25LZHYuZmluZChcclxuICAgICAgICAoeCkgPT4geC5JZCA9PT0gZGFuZ2VyT2JzLkRhbmdlclNpZ25USURcclxuICAgICAgKTtcclxuICAgICAgaWYgKGtkdkVsZW1lbnQpIHtcclxuICAgICAgICB0ZXh0LnB1c2goa2R2RWxlbWVudC5OYW1lLnRyaW0oKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChkYW5nZXJPYnMuQ29tbWVudCkge1xyXG4gICAgICB0ZXh0LnB1c2goZGFuZ2VyT2JzLkNvbW1lbnQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQuam9pbignLCAnKTtcclxuICB9XHJcbn1cclxuIl19