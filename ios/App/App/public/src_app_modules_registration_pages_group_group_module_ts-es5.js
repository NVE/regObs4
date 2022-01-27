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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_group_group_module_ts"], {
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
    66283: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GroupPageModule": function GroupPageModule() {
          return (
            /* binding */
            _GroupPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _group_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./group.page */
      34832);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _group_page__WEBPACK_IMPORTED_MODULE_0__.GroupPage
      }];

      var _GroupPageModule = function _GroupPageModule() {
        _classCallCheck(this, _GroupPageModule);
      };

      _GroupPageModule.ɵfac = function GroupPageModule_Factory(t) {
        return new (t || _GroupPageModule)();
      };

      _GroupPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _GroupPageModule
      });
      _GroupPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_GroupPageModule, {
          declarations: [_group_page__WEBPACK_IMPORTED_MODULE_0__.GroupPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    34832: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GroupPage": function GroupPage() {
          return (
            /* binding */
            _GroupPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../../core/services/user-group/user-group.service */
      3942);
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../base.page */
      81877);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../base-page-service */
      35140);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_ion_item_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-radio", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var group_r4 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", group_r4.Id);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r4.Name);
        }
      }

      function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-radio-group", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template_ion_radio_group_ngModelChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r5.registration.request.ObserverGroupID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_ion_item_1_Template, 4, 2, "ion-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r1.registration.request.ObserverGroupID);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r1.groups);
        }
      }

      function GroupPage_app_registration_content_wrapper_8_ion_item_7_Template(rf, ctx) {
        if (rf & 1) {
          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-checkbox", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionChange", function GroupPage_app_registration_content_wrapper_8_ion_item_7_Template_ion_checkbox_ionChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);

            var ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

            return ctx_r7.checkedChanged($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r2.isSelected);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r2.firstGroup.Name);
        }
      }

      function GroupPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("reset", function GroupPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r9.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, GroupPage_app_registration_content_wrapper_8_ion_radio_group_6_Template, 2, 2, "ion-radio-group", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, GroupPage_app_registration_content_wrapper_8_ion_item_7_Template, 4, 2, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("isEmpty", ctx_r0.isEmpty())("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 6, "REGISTRATION.GROUP.SUBTITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.groups.length > 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r0.groups.length === 1);
        }
      }

      var _GroupPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_GroupPage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_GroupPage);

        function _GroupPage(basePageService, activatedRoute, userGroupService, ngZone) {
          var _this8;

          _classCallCheck(this, _GroupPage);

          _this8 = _super2.call(this, null, basePageService, activatedRoute);
          _this8.userGroupService = userGroupService;
          _this8.ngZone = ngZone;
          _this8.groups = [];
          return _this8;
        }

        _createClass(_GroupPage, [{
          key: "firstGroup",
          get: function get() {
            return this.groups[0];
          }
        }, {
          key: "isSelected",
          get: function get() {
            return this.groups.length > 0 && this.groups[0].Id === this.registration.request.ObserverGroupID;
          }
        }, {
          key: "onInit",
          value: function onInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this9 = this;

              var groups;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.userGroupService.getUserGroups();

                    case 2:
                      groups = _context8.sent;
                      this.ngZone.run(function () {
                        _this9.groups = groups;
                      });

                    case 4:
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
            var _this10 = this;

            this.ngZone.run(function () {
              _this10.registration.request.ObserverGroupID = undefined;
            });
          }
        }, {
          key: "checkedChanged",
          value: function checkedChanged(event) {
            var checkBox = event.target;

            if (checkBox.checked) {
              this.registration.request.ObserverGroupID = this.firstGroup.Id;
            } else {
              this.registration.request.ObserverGroupID = undefined;
            }
          }
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            return Promise.resolve(this.registration && (this.registration.request.ObserverGroupID === undefined || this.registration.request.ObserverGroupID === null));
          }
        }]);

        return _GroupPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_1__.BasePage);

      _GroupPage.ɵfac = function GroupPage_Factory(t) {
        return new (t || _GroupPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_2__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_0__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone));
      };

      _GroupPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _GroupPage,
        selectors: [["app-group"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "isEmpty", "registration", "registrationTid", "reset", 4, "ngIf"], [3, "isEmpty", "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange", 4, "ngIf"], [4, "ngIf"], [3, "ngModel", "ngModelChange"], [4, "ngFor", "ngForOf"], ["mode", "md", "slot", "start", 3, "value"], ["mode", "md", "slot", "start", 3, "checked", "ionChange"]],
        template: function GroupPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, GroupPage_app_registration_content_wrapper_8_Template, 8, 8, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 2, "REGISTRATION.GROUP.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.RadioValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJncm91cC5wYWdlLnNjc3MifQ== */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bEIsQ0FBMEJzRSxlQUExQixHQUE0Q0UsU0FBNUM7QUFDRDtBQUNGOzs7aUJBRUQsbUJBQU87QUFDTCxtQkFBTzNDLE9BQU8sQ0FBQ0MsT0FBUixDQUNMLEtBQUtsRCxZQUFMLEtBQ0MsS0FBS0EsWUFBTCxDQUFrQm9CLE9BQWxCLENBQTBCc0UsZUFBMUIsS0FBOENFLFNBQTlDLElBQ0MsS0FBSzVGLFlBQUwsQ0FBa0JvQixPQUFsQixDQUEwQnNFLGVBQTFCLEtBQThDLElBRmhELENBREssQ0FBUDtBQUtEOzs7O1FBbkQ0QlE7Ozt5QkFBbEJiLFlBQVNGO0FBQUE7OztjQUFURTtBQUFTYztBQUFBekI7QUFBQTBCO0FBQUFDO0FBQUFDO0FBQUFDO0FBQUE7QURidEJwQjs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUVBQTs7QUFDRUE7O0FBb0JGQTs7OztBQTFCTUE7O0FBQUFBOztBQU1xREE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsiREVCVUdfVEFHIiwiQmFzZVBhZ2VTZXJ2aWNlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsIm5ld0F0dGFjaG1lbnRTZXJ2aWNlIiwiY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsIm5nWm9uZSIsImFsZXJ0Q29udHJvbGxlciIsInRyYW5zbGF0ZVNlcnZpY2UiLCJsb2dnaW5nU2VydmljZSIsInJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvblRpZCIsIm9uUmVzZXQiLCJnZXQiLCJ0b1Byb21pc2UiLCJsZWF2ZVRleHQiLCJjcmVhdGVSZXNldERpYWxvZyIsIm1lc3NhZ2UiLCJ0cmFuc2xhdGlvbnMiLCJjcmVhdGUiLCJidXR0b25zIiwidGV4dCIsInJvbGUiLCJhbGVydCIsInByZXNlbnQiLCJvbkRpZERpc21pc3MiLCJyZXN1bHQiLCJyZXNldCIsIlpvbmUiLCJydW4iLCJyZXF1ZXN0IiwiZ2V0RGVmYXVsdFZhbHVlIiwicmVzZXRJbWFnZXMiLCJzYXZlUmVnaXN0cmF0aW9uQXN5bmMiLCJwcm9wTmFtZSIsImdldEF0dGFjaG1lbnRzIiwiaWQiLCJwaXBlIiwiYXR0YWNobWVudHMiLCJtYXAiLCJhIiwicmVtb3ZlQXR0YWNobWVudCIsInN1YnNjcmliZSIsImRlYnVnIiwiZXJyb3IiLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJmYWN0b3J5IiwicHJvdmlkZWRJbiIsIkJhc2VQYWdlIiwiYmFzZVBhZ2VTZXJ2aWNlIiwiYWN0aXZhdGVkUm91dGUiLCJzbmFwc2hvdCIsInBhcmFtcyIsIkNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJnZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJCIsInJlZyIsImNyZWF0ZURlZmF1bHRQcm9wcyIsImNyZWF0ZUluaXRPYnNlcnZhYmxlIiwibmdEZXN0cm95JCIsIlByb21pc2UiLCJyZXNvbHZlIiwiaXNWYWxpZCIsInZhbGlkIiwiaXNFbXB0eSIsImNvbmZpcm1MZWF2ZSIsIm9uSW5pdCIsIm9uQmVmb3JlTGVhdmUiLCJzYXZlIiwiY2xlYW4iLCJzeW5jU3RhdHVzIiwic3JjX2FwcF9tb2R1bGVzX2NvbW1vbl9yZWdpc3RyYXRpb25fcmVnaXN0cmF0aW9uX21vZGVsc19fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiUmVnaXN0cmF0aW9uU2VydmljZSIsImhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzIiwiY29uZmlybVJlc2V0IiwicGF0aEZyb21Sb290IiwidiIsInVybCIsInNlZ21lbnQiLCJ0b1N0cmluZyIsImpvaW4iLCJmaWx0ZXIiLCJwYXRoIiwiX2NvcmVfaGVscGVyc19vYnNlcnZhYmxlX2hlbHBlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsImZlYXR1cmVzIiwicm91dGVzIiwiY29tcG9uZW50IiwiX2dyb3VwX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIkdyb3VwUGFnZU1vZHVsZSIsIl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9hbmd1bGFyX3JvdXRlcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiZGVjbGFyYXRpb25zIiwiaW1wb3J0cyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsImN0eF9yMCIsIkdyb3VwUGFnZSIsInVzZXJHcm91cFNlcnZpY2UiLCJncm91cHMiLCJsZW5ndGgiLCJJZCIsIk9ic2VydmVyR3JvdXBJRCIsImdldFVzZXJHcm91cHMiLCJ1bmRlZmluZWQiLCJldmVudCIsImNoZWNrQm94IiwidGFyZ2V0IiwiY2hlY2tlZCIsImZpcnN0R3JvdXAiLCJfYmFzZV9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJzZWxlY3RvcnMiLCJkZWNscyIsInZhcnMiLCJjb25zdHMiLCJ0ZW1wbGF0ZSJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLXBhZ2Utc2VydmljZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9iYXNlLnBhZ2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvZ3JvdXAvZ3JvdXAubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2dyb3VwL2dyb3VwLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9ncm91cC9ncm91cC5wYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgZ2V0UHJvcGVydHlOYW1lLCBpc0FycmF5VHlwZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5oZWxwZXJzJztcclxuaW1wb3J0IHsgTmV3QXR0YWNobWVudFNlcnZpY2UsIFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IGZvcmtKb2luIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IExvZ2dpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2xvZ2dpbmcvbG9nZ2luZy5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFQlVHX1RBRyA9ICdCYXNlUGFnZVNlcnZpY2UnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlUGFnZVNlcnZpY2Uge1xyXG4gIGdldCBab25lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmdab25lO1xyXG4gIH1cclxuXHJcbiAgZ2V0IFJlZ2lzdHJhdGlvblNlcnZpY2UoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IEFsZXJ0Q29udHJvbGxlcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFsZXJ0Q29udHJvbGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBUcmFuc2xhdGVTZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZXdBdHRhY2htZW50U2VydmljZTogTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U6IENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbG9nZ2luZ1NlcnZpY2U6IExvZ2dpbmdTZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBhc3luYyBjb25maXJtTGVhdmUocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5SRVFVSVJFRF9GSUVMRFNfTUlTU0lORycpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBjb25maXJtUmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IGxlYXZlVGV4dCA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoJ1JFR0lTVFJBVElPTi5DT05GSVJNX1JFU0VUJykudG9Qcm9taXNlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVSZXNldERpYWxvZyhsZWF2ZVRleHQsIHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUmVzZXREaWFsb2cobWVzc2FnZTogc3RyaW5nLCByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0PzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlLmdldChbJ0RJQUxPR1MuQ0FOQ0VMJywgJ0RJQUxPR1MuWUVTJ10pLnRvUHJvbWlzZSgpO1xyXG4gICAgY29uc3QgYWxlcnQgPSBhd2FpdCB0aGlzLmFsZXJ0Q29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBidXR0b25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydESUFMT0dTLkNBTkNFTCddLFxyXG4gICAgICAgICAgcm9sZTogJ2NhbmNlbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5ZRVMnXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBhbGVydC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBhbGVydC5vbkRpZERpc21pc3MoKTtcclxuICAgIGNvbnN0IHJlc2V0OiBib29sZWFuID0gcmVzdWx0LnJvbGUgIT09ICdjYW5jZWwnO1xyXG4gICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMucmVzZXQocmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc2V0O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgcmVzZXQocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMuWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBpZiAocmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCldID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgICAgICB0aGlzLnJlc2V0SW1hZ2VzKHJlZ2lzdHJhdGlvbik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9uUmVzZXQpIHtcclxuICAgICAgICBvblJlc2V0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyhyZWdpc3RyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRGVmYXVsdFByb3BzKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQpIHtcclxuICAgIGNvbnN0IHByb3BOYW1lID0gZ2V0UHJvcGVydHlOYW1lKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICBpZiAoIXJlZ2lzdHJhdGlvbi5yZXF1ZXN0W3Byb3BOYW1lXSkge1xyXG4gICAgICAvLyBJbml0IHRvIG5ldyBvYmplY3QgaWYgbnVsbFxyXG4gICAgICByZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0gPSB0aGlzLmdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBpZiAoaXNBcnJheVR5cGUocmVnaXN0cmF0aW9uVGlkKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4ge307XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXNldEltYWdlcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24pIHtcclxuICAgIHRoaXMubmV3QXR0YWNobWVudFNlcnZpY2VcclxuICAgICAgLmdldEF0dGFjaG1lbnRzKHJlZ2lzdHJhdGlvbi5pZClcclxuICAgICAgLnBpcGUoc3dpdGNoTWFwKChhdHRhY2htZW50cykgPT4gZm9ya0pvaW4oYXR0YWNobWVudHMubWFwKChhKSA9PiB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLnJlbW92ZUF0dGFjaG1lbnQocmVnaXN0cmF0aW9uLmlkLCBhLmlkKSkpKSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmRlYnVnKCdSZXNldCBpbWFnZXMgY29tcGxldGUnLCBERUJVR19UQUcpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZ2dpbmdTZXJ2aWNlLmVycm9yKGVycm9yLCBERUJVR19UQUcsICdDb3VsZCBub3QgcmVzZXQgaW1hZ2VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmcm9tLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuL2Jhc2UtcGFnZS1zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkLCBTeW5jU3RhdHVzIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdGFrZSwgdGFrZVVudGlsLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9oZWxwZXJzL29ic2VydmFibGUtaGVscGVyJztcclxuXHJcbkBEaXJlY3RpdmUoKVxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICByZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb247XHJcbiAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2U7XHJcbiAgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQ7XHJcbiAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlID0gYmFzZVBhZ2VTZXJ2aWNlO1xyXG4gICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb25UaWQgPSByZWdpc3RyYXRpb25UaWQ7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YWtlKDEpLFxyXG4gICAgICAgIG1hcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmJhc2VQYWdlU2VydmljZS5jcmVhdGVEZWZhdWx0UHJvcHMocmVnLCB0aGlzLnJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVnO1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgocmVnKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5jcmVhdGVJbml0T2JzZXJ2YWJsZSgpKSxcclxuICAgICAgICB0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIG9uSW5pdD8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25CZWZvcmVMZWF2ZT8oKTogdm9pZCB8IFByb21pc2U8YW55PjtcclxuXHJcbiAgb25SZXNldD8oKTogdm9pZDtcclxuXHJcbiAgaXNWYWxpZD8oKTogYm9vbGVhbiB8IFByb21pc2U8Ym9vbGVhbj47XHJcblxyXG4gIC8vIE5PVEU6IFJlbWVtYmVyIHRvIGFkZCBjYW5EZWFjdGl2YXRlOiBbQ2FuRGVhY3RpdmF0ZVJvdXRlR3VhcmRdIGluIHBhZ2UgbW9kdWxlXHJcbiAgYXN5bmMgY2FuTGVhdmUoKSB7XHJcbiAgICAvLyBDaGVjayBpZiBpbXBsZW1lbnRhdGlvbiBwYWdlIGhhcyBpbXBsZW1lbnRlZCBjdXN0b20gaXNWYWxpZCBsb2dpY1xyXG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5pc1ZhbGlkID8gdGhpcy5pc1ZhbGlkKCkgOiB0cnVlKTtcclxuICAgIC8vIE9ubHkgcmV0dXJuIGFsZXJ0IGlmIHBhZ2UgaXMgbm90IGVtcHR5IGFuZCBpbnZhbGlkXHJcbiAgICBjb25zdCBpc0VtcHR5ID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNFbXB0eSgpKTtcclxuICAgIGlmICghaXNFbXB0eSAmJiAhdmFsaWQpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1MZWF2ZSh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVJbml0T2JzZXJ2YWJsZSgpIHtcclxuICAgIGlmICh0aGlzLm9uSW5pdCkge1xyXG4gICAgICByZXR1cm4gZnJvbShQcm9taXNlLnJlc29sdmUodGhpcy5vbkluaXQoKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mKHt9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkJlZm9yZUxlYXZlKSB7XHJcbiAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLm9uQmVmb3JlTGVhdmUoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNhdmUodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKGNsZWFuID0gZmFsc2UpIHtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPSBTeW5jU3RhdHVzLkRyYWZ0O1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLlJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uLCBjbGVhbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGlzRW1wdHkoKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gIShhd2FpdCB0aGlzLmJhc2VQYWdlU2VydmljZS5Db21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmhhc0FueURhdGFUb1Nob3dJblJlZ2lzdHJhdGlvblR5cGVzKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbixcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb25UaWRcclxuICAgIClcclxuICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgLnRvUHJvbWlzZSgpKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYmFzZVBhZ2VTZXJ2aWNlLmNvbmZpcm1SZXNldCh0aGlzLnJlZ2lzdHJhdGlvbiwgdGhpcy5yZWdpc3RyYXRpb25UaWQsICgpID0+ICh0aGlzLm9uUmVzZXQgPyB0aGlzLm9uUmVzZXQoKSA6IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGdldFJlc29sdmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAnLycgK1xyXG4gICAgICB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gICAgICAgIC5tYXAoKHYpID0+IHYudXJsLm1hcCgoc2VnbWVudCkgPT4gc2VnbWVudC50b1N0cmluZygpKS5qb2luKCcvJykpXHJcbiAgICAgICAgLmZpbHRlcigocGF0aCkgPT4gISFwYXRoKVxyXG4gICAgICAgIC5qb2luKCcvJylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRDb25maWd1cmVkVXJsKCk6IHN0cmluZyB7XHJcbiAgLy8gICAgIHJldHVybiAnLycgKyB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnBhdGhGcm9tUm9vdFxyXG4gIC8vICAgICAgICAgLmZpbHRlcih2ID0+IHYucm91dGVDb25maWcpXHJcbiAgLy8gICAgICAgICAubWFwKHYgPT4gdi5yb3V0ZUNvbmZpZy5wYXRoKVxyXG4gIC8vICAgICAgICAgLmpvaW4oJy8nKTtcclxuICAvLyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBHcm91cFBhZ2UgfSBmcm9tICcuL2dyb3VwLnBhZ2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBHcm91cFBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbR3JvdXBQYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JvdXBQYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYmFjay1idXR0b24gdGV4dD1cIlwiIGRlZmF1bHRIcmVmPVwiL1wiPjwvaW9uLWJhY2stYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5HUk9VUC5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciBbaXNFbXB0eV09XCJpc0VtcHR5KClcIiAqbmdJZj1cInJlZ2lzdHJhdGlvblwiIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCJcclxuICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGlvbi1saXN0LWhlYWRlciBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICB7e1wiUkVHSVNUUkFUSU9OLkdST1VQLlNVQlRJVExFXCIgfCB0cmFuc2xhdGV9fVxyXG4gICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1saXN0LWhlYWRlcj5cclxuICAgICAgPGlvbi1yYWRpby1ncm91cCAqbmdJZj1cImdyb3Vwcy5sZW5ndGggPiAxXCIgWyhuZ01vZGVsKV09XCJyZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNlcnZlckdyb3VwSURcIj5cclxuICAgICAgICA8aW9uLWl0ZW0gKm5nRm9yPVwibGV0IGdyb3VwIG9mIGdyb3Vwc1wiPlxyXG4gICAgICAgICAgPGlvbi1yYWRpbyBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbdmFsdWVdPVwiZ3JvdXAuSWRcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICAgIDxpb24tbGFiZWw+e3tncm91cC5OYW1lfX08L2lvbi1sYWJlbD5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L2lvbi1yYWRpby1ncm91cD5cclxuICAgICAgPGlvbi1pdGVtICpuZ0lmPVwiZ3JvdXBzLmxlbmd0aCA9PT0gMVwiPlxyXG4gICAgICAgIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZFwiIChpb25DaGFuZ2UpPVwiY2hlY2tlZENoYW5nZWQoJGV2ZW50KVwiPjwvaW9uLWNoZWNrYm94PlxyXG4gICAgICAgIDxpb24tbGFiZWw+e3tmaXJzdEdyb3VwLk5hbWV9fTwvaW9uLWxhYmVsPlxyXG4gICAgICA8L2lvbi1pdGVtPlxyXG4gICAgPC9pb24tbGlzdD5cclxuICA8L2FwcC1yZWdpc3RyYXRpb24tY29udGVudC13cmFwcGVyPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVzZXJHcm91cFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItZ3JvdXAvdXNlci1ncm91cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2ZXJHcm91cER0byB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9yZWdvYnMtYXBpJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSW9uQ2hlY2tib3ggfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1ncm91cCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2dyb3VwLnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JvdXAucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyb3VwUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBncm91cHM6IE9ic2VydmVyR3JvdXBEdG9bXSA9IFtdO1xyXG5cclxuICBnZXQgZmlyc3RHcm91cCgpOiBPYnNlcnZlckdyb3VwRHRvIHtcclxuICAgIHJldHVybiB0aGlzLmdyb3Vwc1swXTtcclxuICB9XHJcblxyXG4gIGdldCBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgdGhpcy5ncm91cHMubGVuZ3RoID4gMCAmJlxyXG4gICAgICB0aGlzLmdyb3Vwc1swXS5JZCA9PT0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNlcnZlckdyb3VwSURcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLFxyXG4gICAgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSB1c2VyR3JvdXBTZXJ2aWNlOiBVc2VyR3JvdXBTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxyXG4gICkge1xyXG4gICAgc3VwZXIobnVsbCwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBvbkluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBncm91cHMgPSBhd2FpdCB0aGlzLnVzZXJHcm91cFNlcnZpY2UuZ2V0VXNlckdyb3VwcygpO1xyXG4gICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgdGhpcy5ncm91cHMgPSBncm91cHM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG9uUmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRCA9IHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tlZENoYW5nZWQoZXZlbnQ6IEN1c3RvbUV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGVja0JveCA9ICg8YW55PmV2ZW50LnRhcmdldCkgYXMgSW9uQ2hlY2tib3g7XHJcbiAgICBpZiAoY2hlY2tCb3guY2hlY2tlZCkge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRCA9IHRoaXMuZmlyc3RHcm91cC5JZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzZXJ2ZXJHcm91cElEID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNFbXB0eSgpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uICYmXHJcbiAgICAgICh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic2VydmVyR3JvdXBJRCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNlcnZlckdyb3VwSUQgPT09IG51bGwpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=