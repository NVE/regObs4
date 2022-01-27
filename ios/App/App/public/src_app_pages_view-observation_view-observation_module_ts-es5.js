(function () {
  "use strict";

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_pages_view-observation_view-observation_module_ts"], {
    /***/
    69599: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "isSameObserver": function isSameObserver() {
          return (
            /* binding */
            _isSameObserver
          );
        },

        /* harmony export */
        "isInGroup": function isInGroup() {
          return (
            /* binding */
            _isInGroup
          );
        },

        /* harmony export */
        "getObserverEditCheckObservable": function getObserverEditCheckObservable() {
          return (
            /* binding */
            _getObserverEditCheckObservable
          );
        },

        /* harmony export */
        "getWithin48HoursCheckUntilFalseObservable": function getWithin48HoursCheckUntilFalseObservable() {
          return (
            /* binding */
            _getWithin48HoursCheckUntilFalseObservable
          );
        },

        /* harmony export */
        "isWithinMilliseconds": function isWithinMilliseconds() {
          return (
            /* binding */
            _isWithinMilliseconds
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs */
      54926);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      24390);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

      function _isSameObserver(reg, observer) {
        if (!observer) {
          return false;
        }

        return observer.NickName === reg.Observer.NickName; // TODO: Change to ObserverID, when implemented in API model (MyPageData)
      }

      function _isInGroup(reg, observer) {
        if (observer && reg.ObserverGroupID > 0 && observer.MemberOfGroups && observer.MemberOfGroups.length > 0 && observer.MemberOfGroups.map(function (g) {
          return g.Id;
        }).indexOf(reg.ObserverGroupID) >= 0) {
          return true;
        }

        return false;
      }

      function isModerator(reg, observer) {
        var _a;

        if (observer && reg.GeoHazardTID) {
          return (_a = observer.Roles) === null || _a === void 0 ? void 0 : _a.includes("ModeratorForGeoHazard".concat(reg.GeoHazardTID));
        }

        return false;
      }

      function _getObserverEditCheckObservable(reg, observer) {
        if (isModerator(reg, observer)) {
          return (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.of)('EDIT_AS_MODERATOR');
        }

        if (_isSameObserver(reg, observer) || _isInGroup(reg, observer)) {
          return _getWithin48HoursCheckUntilFalseObservable(reg).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function (within48hours) {
            return within48hours ? 'EDIT_OWN_REGISTRATION' : undefined;
          }));
        }

        return (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(undefined);
      }

      function _getWithin48HoursCheckUntilFalseObservable(reg) {
        var completeWith = function completeWith(predicate) {
          return function (source) {
            return new rxjs__WEBPACK_IMPORTED_MODULE_3__.Observable(function (observer) {
              return source.subscribe(function (value) {
                observer.next(value);

                if (predicate(value)) {
                  observer.complete();
                }
              }, function (error) {
                return observer.error(error);
              }, function () {
                return observer.complete();
              });
            });
          };
        };

        var forthyEightHoursInMS = 48 * 60 * 60 * 1000;
        var timerCheckEveryMinuteMS = 60 * 1000;
        return (0, rxjs__WEBPACK_IMPORTED_MODULE_4__.timer)(0, timerCheckEveryMinuteMS).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.map)(function () {
          return _isWithinMilliseconds(moment__WEBPACK_IMPORTED_MODULE_0___default()(reg.DtRegTime), forthyEightHoursInMS);
        }), completeWith(function (val) {
          return !val;
        }));
      }

      function _isWithinMilliseconds(m, msLimit) {
        var now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : moment__WEBPACK_IMPORTED_MODULE_0___default()();

        if (!m) {
          return false;
        }

        return m.isSameOrAfter(now.subtract(msLimit, 'milliseconds'));
      }
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

    },

    /***/
    84016: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ViewObservationPageModule": function ViewObservationPageModule() {
          return (
            /* binding */
            _ViewObservationPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _view_observation_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./view-observation.page */
      67181);
      /* harmony import */


      var _modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../modules/shared/shared.module */
      72271);
      /* harmony import */


      var _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../modal-pages/fullscreen-image-modal/fullscreen-image-modal.module */
      85815);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _view_observation_page__WEBPACK_IMPORTED_MODULE_0__.ViewObservationPage
      }];

      var _ViewObservationPageModule = function _ViewObservationPageModule() {
        _classCallCheck(this, _ViewObservationPageModule);
      };

      _ViewObservationPageModule.ɵfac = function ViewObservationPageModule_Factory(t) {
        return new (t || _ViewObservationPageModule)();
      };

      _ViewObservationPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _ViewObservationPageModule
      });
      _ViewObservationPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_ViewObservationPageModule, {
          declarations: [_view_observation_page__WEBPACK_IMPORTED_MODULE_0__.ViewObservationPage],
          imports: [_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _modal_pages_fullscreen_image_modal_fullscreen_image_modal_module__WEBPACK_IMPORTED_MODULE_2__.FullscreenImageModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    67181: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ViewObservationPage": function ViewObservationPage() {
          return (
            /* binding */
            _ViewObservationPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../core/services/observation/observation.service */
      83497);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var _core_services_popup_info_popup_info_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../core/services/popup-info/popup-info.service */
      13359);
      /* harmony import */


      var _core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../core/helpers/observable-helper */
      59364);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs/operators */
      46367);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var src_app_modules_registration_edit_registration_helper_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! src/app/modules/registration/edit-registration-helper-functions */
      69599);
      /* harmony import */


      var src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! src/app/modules/auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
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


      var _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../modules/shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../components/observation/observation-list-card/observation-list-card.component */
      50388);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function ViewObservationPage_ion_content_7_ng_container_1_span_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "RegistrationDetail.EditInfoAsModerator"), " ");
        }
      }

      function ViewObservationPage_ion_content_7_ng_container_1_span_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, "RegistrationDetail.EditInfo"), " ");
        }
      }

      function ViewObservationPage_ion_content_7_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, ViewObservationPage_ion_content_7_ng_container_1_span_1_Template, 3, 3, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, ViewObservationPage_ion_content_7_ng_container_1_span_2_Template, 3, 3, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function ViewObservationPage_ion_content_7_ng_container_1_Template_ion_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r8);

            var registration_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().ngIf;

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.editRegistration(registration_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "Edit registration");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var editMode_r3 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", editMode_r3 === "EDIT_AS_MODERATOR");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", editMode_r3 === "EDIT_OWN_REGISTRATION");
        }
      }

      function ViewObservationPage_ion_content_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, ViewObservationPage_ion_content_7_ng_container_1_Template, 5, 2, "ng-container", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "async");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](3, "app-observation-list-card", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var registration_r1 = ctx.ngIf;

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 2, ctx_r0.editMode$));

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("obs", registration_r1);
        }
      }

      var _ViewObservationPage = /*#__PURE__*/function (_core_helpers_observa) {
        _inherits(_ViewObservationPage, _core_helpers_observa);

        var _super = _createSuper(_ViewObservationPage);

        function _ViewObservationPage(activatedRoute, observationService, userSettingService, popupInfoService, registrationService, router, regobsAuthService) {
          var _this;

          _classCallCheck(this, _ViewObservationPage);

          _this = _super.call(this);
          _this.activatedRoute = activatedRoute;
          _this.observationService = observationService;
          _this.userSettingService = userSettingService;
          _this.popupInfoService = popupInfoService;
          _this.registrationService = registrationService;
          _this.router = router;
          _this.regobsAuthService = regobsAuthService;
          return _this;
        }

        _createClass(_ViewObservationPage, [{
          key: "editRegistration",
          value: function editRegistration(registration) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var reg;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.registrationService.editExistingRegistrationAndSave(registration);

                    case 2:
                      reg = _context.sent;
                      this.router.navigate(['registration', 'edit', reg.id]);

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.popupInfoService.checkObservationInfoPopup().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this.ngDestroy$)).subscribe();
            var id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
            this.registrationViewModel$ = this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(function (userSetting) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_13__.from)(_this2.observationService.getObservationById(id, userSetting.appMode, userSetting.language));
            }));
            this.editMode$ = this.createEditMode$();
          }
        }, {
          key: "createEditMode$",
          value: function createEditMode$() {
            return this.registrationViewModel$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.withLatestFrom)(this.regobsAuthService.myPageData$), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  reg = _ref2[0],
                  observer = _ref2[1];

              return (0, src_app_modules_registration_edit_registration_helper_functions__WEBPACK_IMPORTED_MODULE_5__.getObserverEditCheckObservable)(reg, observer);
            }));
          }
        }]);

        return _ViewObservationPage;
      }(_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_3__.NgDestoryBase);

      _ViewObservationPage.ɵfac = function ViewObservationPage_Factory(t) {
        return new (t || _ViewObservationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_observation_observation_service__WEBPACK_IMPORTED_MODULE_0__.ObservationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_core_services_popup_info_popup_info_service__WEBPACK_IMPORTED_MODULE_2__.PopupInfoService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_4__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_modules_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService));
      };

      _ViewObservationPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _ViewObservationPage,
        selectors: [["app-view-observation"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 6,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [4, "ngIf"], [3, "obs"], [3, "click"]],
        template: function ViewObservationPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, ViewObservationPage_ion_content_7_Template, 4, 4, "ion-content", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](8, "async");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.OVERVIEW.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](8, 4, ctx.registrationViewModel$));
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonToolbar, _modules_shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonContent, _components_observation_observation_list_card_observation_list_card_component__WEBPACK_IMPORTED_MODULE_8__.ObservationListCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButton],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.AsyncPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ2aWV3LW9ic2VydmF0aW9uLnBhZ2Uuc2NzcyJ9 */"],
        changeDetection: 0
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDRkE7O0FBQ0FBOzs7Ozs7QUFKTUE7O0FBQUFBOztBQUlRQTs7QUFBQUE7Ozs7Ozs7Ozs7IiwibmFtZXMiOlsiaXNTYW1lT2JzZXJ2ZXIiLCJyZWciLCJvYnNlcnZlciIsIk5pY2tOYW1lIiwiT2JzZXJ2ZXIiLCJpc0luR3JvdXAiLCJPYnNlcnZlckdyb3VwSUQiLCJNZW1iZXJPZkdyb3VwcyIsImxlbmd0aCIsIm1hcCIsImciLCJJZCIsImluZGV4T2YiLCJpc01vZGVyYXRvciIsIkdlb0hhemFyZFRJRCIsIlJvbGVzIiwiX2EiLCJpbmNsdWRlcyIsImdldE9ic2VydmVyRWRpdENoZWNrT2JzZXJ2YWJsZSIsImdldFdpdGhpbjQ4SG91cnNDaGVja1VudGlsRmFsc2VPYnNlcnZhYmxlIiwicGlwZSIsIndpdGhpbjQ4aG91cnMiLCJ1bmRlZmluZWQiLCJjb21wbGV0ZVdpdGgiLCJwcmVkaWNhdGUiLCJzb3VyY2UiLCJyeGpzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJzdWJzY3JpYmUiLCJ2YWx1ZSIsIm5leHQiLCJjb21wbGV0ZSIsImVycm9yIiwiZm9ydGh5RWlnaHRIb3Vyc0luTVMiLCJ0aW1lckNoZWNrRXZlcnlNaW51dGVNUyIsImlzV2l0aGluTWlsbGlzZWNvbmRzIiwibW9tZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX19fZGVmYXVsdCIsIkR0UmVnVGltZSIsInZhbCIsIm0iLCJtc0xpbWl0Iiwibm93IiwiaXNTYW1lT3JBZnRlciIsInN1YnRyYWN0IiwiRnVsbHNjcmVlbkltYWdlTW9kYWxQYWdlTW9kdWxlIiwiX2FuZ3VsYXJfY29tbW9uX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfaW9uaWNfYW5ndWxhcl9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2FuZ3VsYXJfZm9ybXNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyIsImRlY2xhcmF0aW9ucyIsIl9mdWxsc2NyZWVuX2ltYWdlX21vZGFsX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImltcG9ydHMiLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiX3ZpZXdfb2JzZXJ2YXRpb25fcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiVmlld09ic2VydmF0aW9uUGFnZU1vZHVsZSIsIl9tb2R1bGVzX3NoYXJlZF9zaGFyZWRfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfbW9kYWxfcGFnZXNfZnVsbHNjcmVlbl9pbWFnZV9tb2RhbF9mdWxsc2NyZWVuX2ltYWdlX21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJfYW5ndWxhcl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV85X18iLCJWaWV3T2JzZXJ2YXRpb25QYWdlIiwiYWN0aXZhdGVkUm91dGUiLCJvYnNlcnZhdGlvblNlcnZpY2UiLCJ1c2VyU2V0dGluZ1NlcnZpY2UiLCJwb3B1cEluZm9TZXJ2aWNlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsInJvdXRlciIsInJlZ29ic0F1dGhTZXJ2aWNlIiwicmVnaXN0cmF0aW9uIiwiZWRpdEV4aXN0aW5nUmVnaXN0cmF0aW9uQW5kU2F2ZSIsIm5hdmlnYXRlIiwiaWQiLCJjaGVja09ic2VydmF0aW9uSW5mb1BvcHVwIiwibmdEZXN0cm95JCIsInBhcnNlSW50Iiwic25hcHNob3QiLCJwYXJhbXMiLCJyZWdpc3RyYXRpb25WaWV3TW9kZWwkIiwidXNlclNldHRpbmckIiwidXNlclNldHRpbmciLCJnZXRPYnNlcnZhdGlvbkJ5SWQiLCJhcHBNb2RlIiwibGFuZ3VhZ2UiLCJlZGl0TW9kZSQiLCJjcmVhdGVFZGl0TW9kZSQiLCJteVBhZ2VEYXRhJCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzNfXyIsInNlbGVjdG9ycyIsImZlYXR1cmVzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vZWRpdC1yZWdpc3RyYXRpb24taGVscGVyLWZ1bmN0aW9ucy50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL3BhZ2VzL3ZpZXctb2JzZXJ2YXRpb24vdmlldy1vYnNlcnZhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvcGFnZXMvdmlldy1vYnNlcnZhdGlvbi92aWV3LW9ic2VydmF0aW9uLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9wYWdlcy92aWV3LW9ic2VydmF0aW9uL3ZpZXctb2JzZXJ2YXRpb24ucGFnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWdpc3RyYXRpb25WaWV3TW9kZWwsIE15UGFnZURhdGEgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aW1lciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuXHJcbmV4cG9ydCB0eXBlIEVkaXRNb2RlID0gJ0VESVRfQVNfTU9ERVJBVE9SJyB8ICdFRElUX09XTl9SRUdJU1RSQVRJT04nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU9ic2VydmVyKHJlZzogUmVnaXN0cmF0aW9uVmlld01vZGVsLCBvYnNlcnZlcjogTXlQYWdlRGF0YSk6IGJvb2xlYW4ge1xyXG4gIGlmICghb2JzZXJ2ZXIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG9ic2VydmVyLk5pY2tOYW1lID09PSByZWcuT2JzZXJ2ZXIuTmlja05hbWU7IC8vIFRPRE86IENoYW5nZSB0byBPYnNlcnZlcklELCB3aGVuIGltcGxlbWVudGVkIGluIEFQSSBtb2RlbCAoTXlQYWdlRGF0YSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5Hcm91cChyZWc6IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCwgb2JzZXJ2ZXI6IE15UGFnZURhdGEpOiBib29sZWFuIHtcclxuICBpZiAoXHJcbiAgICBvYnNlcnZlciAmJlxyXG4gICAgcmVnLk9ic2VydmVyR3JvdXBJRCA+IDAgJiZcclxuICAgIG9ic2VydmVyLk1lbWJlck9mR3JvdXBzICYmXHJcbiAgICBvYnNlcnZlci5NZW1iZXJPZkdyb3Vwcy5sZW5ndGggPiAwICYmXHJcbiAgICBvYnNlcnZlci5NZW1iZXJPZkdyb3Vwcy5tYXAoKGcpID0+IGcuSWQpLmluZGV4T2YocmVnLk9ic2VydmVyR3JvdXBJRCkgPj0gMFxyXG4gICkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNNb2RlcmF0b3IocmVnOiBSZWdpc3RyYXRpb25WaWV3TW9kZWwsIG9ic2VydmVyOiBNeVBhZ2VEYXRhKTogYm9vbGVhbiB7XHJcbiAgaWYgKG9ic2VydmVyICYmIHJlZy5HZW9IYXphcmRUSUQpIHtcclxuICAgIHJldHVybiBvYnNlcnZlci5Sb2xlcz8uaW5jbHVkZXMoYE1vZGVyYXRvckZvckdlb0hhemFyZCR7cmVnLkdlb0hhemFyZFRJRH1gKTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJFZGl0Q2hlY2tPYnNlcnZhYmxlKHJlZzogUmVnaXN0cmF0aW9uVmlld01vZGVsLCBvYnNlcnZlcjogTXlQYWdlRGF0YSk6IE9ic2VydmFibGU8RWRpdE1vZGU+IHtcclxuICBpZiAoaXNNb2RlcmF0b3IocmVnLCBvYnNlcnZlcikpIHtcclxuICAgIHJldHVybiBvZignRURJVF9BU19NT0RFUkFUT1InKTtcclxuICB9XHJcbiAgaWYgKGlzU2FtZU9ic2VydmVyKHJlZywgb2JzZXJ2ZXIpIHx8IGlzSW5Hcm91cChyZWcsIG9ic2VydmVyKSkge1xyXG4gICAgcmV0dXJuIGdldFdpdGhpbjQ4SG91cnNDaGVja1VudGlsRmFsc2VPYnNlcnZhYmxlKHJlZykucGlwZShcclxuICAgICAgbWFwKCh3aXRoaW40OGhvdXJzKSA9PiAod2l0aGluNDhob3VycyA/ICdFRElUX09XTl9SRUdJU1RSQVRJT04nIDogdW5kZWZpbmVkKSlcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBvZih1bmRlZmluZWQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2l0aGluNDhIb3Vyc0NoZWNrVW50aWxGYWxzZU9ic2VydmFibGUocmVnOiBSZWdpc3RyYXRpb25WaWV3TW9kZWwpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICBjb25zdCBjb21wbGV0ZVdpdGggPVxyXG4gICAgPFQ+KHByZWRpY2F0ZTogKGFyZzogVCkgPT4gYm9vbGVhbikgPT5cclxuICAgIChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+XHJcbiAgICAgIG5ldyBPYnNlcnZhYmxlPFQ+KChvYnNlcnZlcikgPT5cclxuICAgICAgICBzb3VyY2Uuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoZXJyb3IpID0+IG9ic2VydmVyLmVycm9yKGVycm9yKSxcclxuICAgICAgICAgICgpID0+IG9ic2VydmVyLmNvbXBsZXRlKClcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcblxyXG4gIGNvbnN0IGZvcnRoeUVpZ2h0SG91cnNJbk1TID0gNDggKiA2MCAqIDYwICogMTAwMDtcclxuICBjb25zdCB0aW1lckNoZWNrRXZlcnlNaW51dGVNUyA9IDYwICogMTAwMDtcclxuICByZXR1cm4gdGltZXIoMCwgdGltZXJDaGVja0V2ZXJ5TWludXRlTVMpLnBpcGUoXHJcbiAgICBtYXAoKCkgPT4gaXNXaXRoaW5NaWxsaXNlY29uZHMobW9tZW50KHJlZy5EdFJlZ1RpbWUpLCBmb3J0aHlFaWdodEhvdXJzSW5NUykpLFxyXG4gICAgY29tcGxldGVXaXRoKCh2YWwpID0+ICF2YWwpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzV2l0aGluTWlsbGlzZWNvbmRzKG06IG1vbWVudC5Nb21lbnQsIG1zTGltaXQ6IG51bWJlciwgbm93OiBtb21lbnQuTW9tZW50ID0gbW9tZW50KCkpOiBib29sZWFuIHtcclxuICBpZiAoIW0pIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmV0dXJuIG0uaXNTYW1lT3JBZnRlcihub3cuc3VidHJhY3QobXNMaW1pdCwgJ21pbGxpc2Vjb25kcycpKTtcclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSW9uaWNNb2R1bGUgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZSB9IGZyb20gJy4vZnVsbHNjcmVlbi1pbWFnZS1tb2RhbC5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSW9uaWNNb2R1bGUsIEZvcm1zTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0Z1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxzY3JlZW5JbWFnZU1vZGFsUGFnZU1vZHVsZSB7fVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFZpZXdPYnNlcnZhdGlvblBhZ2UgfSBmcm9tICcuL3ZpZXctb2JzZXJ2YXRpb24ucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xyXG5pbXBvcnQgeyBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUgfSBmcm9tICcuLi9tb2RhbC1wYWdlcy9mdWxsc2NyZWVuLWltYWdlLW1vZGFsL2Z1bGxzY3JlZW4taW1hZ2UtbW9kYWwubW9kdWxlJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBWaWV3T2JzZXJ2YXRpb25QYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICBGdWxsc2NyZWVuSW1hZ2VNb2RhbFBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbVmlld09ic2VydmF0aW9uUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZXdPYnNlcnZhdGlvblBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLk9WRVJWSUVXLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudCAqbmdJZj1cInJlZ2lzdHJhdGlvblZpZXdNb2RlbCQgfCBhc3luYyBhcyByZWdpc3RyYXRpb25cIj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdE1vZGUkIHwgYXN5bmMgYXMgZWRpdE1vZGVcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwiZWRpdE1vZGUgPT09ICdFRElUX0FTX01PREVSQVRPUidcIj5cclxuICAgICAge3sgXCJSZWdpc3RyYXRpb25EZXRhaWwuRWRpdEluZm9Bc01vZGVyYXRvclwiIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8c3BhbiAqbmdJZj1cImVkaXRNb2RlID09PSAnRURJVF9PV05fUkVHSVNUUkFUSU9OJ1wiPlxyXG4gICAgICB7eyBcIlJlZ2lzdHJhdGlvbkRldGFpbC5FZGl0SW5mb1wiIHwgdHJhbnNsYXRlIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPWVkaXRSZWdpc3RyYXRpb24ocmVnaXN0cmF0aW9uKT5FZGl0IHJlZ2lzdHJhdGlvbjwvaW9uLWJ1dHRvbj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuICA8YXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZCBbb2JzXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLW9ic2VydmF0aW9uLWxpc3QtY2FyZD5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IE9ic2VydmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvb2JzZXJ2YXRpb24vb2JzZXJ2YXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uVmlld01vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBQb3B1cEluZm9TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9wb3B1cC1pbmZvL3BvcHVwLWluZm8uc2VydmljZSc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICcuLi8uLi9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwsIHN3aXRjaE1hcCwgd2l0aExhdGVzdEZyb20sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRWRpdE1vZGUsIGdldE9ic2VydmVyRWRpdENoZWNrT2JzZXJ2YWJsZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vZWRpdC1yZWdpc3RyYXRpb24taGVscGVyLWZ1bmN0aW9ucyc7XHJcbmltcG9ydCB7IFJlZ29ic0F1dGhTZXJ2aWNlIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2F1dGgvc2VydmljZXMvcmVnb2JzLWF1dGguc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC12aWV3LW9ic2VydmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdmlldy1vYnNlcnZhdGlvbi5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3ZpZXctb2JzZXJ2YXRpb24ucGFnZS5zY3NzJ10sXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIFZpZXdPYnNlcnZhdGlvblBhZ2UgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25Jbml0IHtcclxuICBlZGl0TW9kZSQ6IE9ic2VydmFibGU8RWRpdE1vZGU+O1xyXG4gIHJlZ2lzdHJhdGlvblZpZXdNb2RlbCQ6IE9ic2VydmFibGU8UmVnaXN0cmF0aW9uVmlld01vZGVsPjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgb2JzZXJ2YXRpb25TZXJ2aWNlOiBPYnNlcnZhdGlvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwb3B1cEluZm9TZXJ2aWNlOiBQb3B1cEluZm9TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgcmVnb2JzQXV0aFNlcnZpY2U6IFJlZ29ic0F1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZWRpdFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb246IFJlZ2lzdHJhdGlvblZpZXdNb2RlbCkge1xyXG4gICAgY29uc3QgcmVnID0gYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLmVkaXRFeGlzdGluZ1JlZ2lzdHJhdGlvbkFuZFNhdmUocmVnaXN0cmF0aW9uKTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsncmVnaXN0cmF0aW9uJywgJ2VkaXQnLCByZWcuaWRdKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5wb3B1cEluZm9TZXJ2aWNlLmNoZWNrT2JzZXJ2YXRpb25JbmZvUG9wdXAoKS5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKS5zdWJzY3JpYmUoKTtcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQodGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ10sIDEwKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVmlld01vZGVsJCA9IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJC5waXBlKFxyXG4gICAgICBzd2l0Y2hNYXAoKHVzZXJTZXR0aW5nKSA9PiBmcm9tKHRoaXMub2JzZXJ2YXRpb25TZXJ2aWNlLmdldE9ic2VydmF0aW9uQnlJZChpZCwgdXNlclNldHRpbmcuYXBwTW9kZSwgdXNlclNldHRpbmcubGFuZ3VhZ2UpKSlcclxuICAgICk7XHJcbiAgICB0aGlzLmVkaXRNb2RlJCA9IHRoaXMuY3JlYXRlRWRpdE1vZGUkKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUVkaXRNb2RlJCgpOiBPYnNlcnZhYmxlPEVkaXRNb2RlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25WaWV3TW9kZWwkLnBpcGUoXHJcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMucmVnb2JzQXV0aFNlcnZpY2UubXlQYWdlRGF0YSQpLFxyXG4gICAgICBzd2l0Y2hNYXAoKFtyZWcsIG9ic2VydmVyXSkgPT4gZ2V0T2JzZXJ2ZXJFZGl0Q2hlY2tPYnNlcnZhYmxlKHJlZywgb2JzZXJ2ZXIpKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19