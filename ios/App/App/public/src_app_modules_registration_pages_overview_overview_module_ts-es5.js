(function () {
  "use strict";

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_overview_overview_module_ts"], {
    /***/
    91068: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FailedRegistrationComponent": function FailedRegistrationComponent() {
          return (
            /* binding */
            _FailedRegistrationComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../services/registration.service */
      33181);
      /* harmony import */


      var _ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic-native/email-composer/ngx */
      36543);
      /* harmony import */


      var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../../settings */
      30015);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common */
      54364);

      function FailedRegistrationComponent_ion_label_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.FAILED.SUBTITLE"), " ");
        }
      }

      function FailedRegistrationComponent_ion_label_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 2, "REGISTRATION.FAILED.PROBLEM"), ": ", ctx_r1.registration.syncError, " ");
        }
      }

      function FailedRegistrationComponent_ion_label_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-label", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 3, "REGISTRATION.FAILED.PROBLEM"), ". ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 5, "REGISTRATION.FAILED.LOGGED"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 7, "REGISTRATION.FAILED.PROBLEM_HELP_TEXT"), " ");
        }
      }

      function FailedRegistrationComponent_ion_item_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-item");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-label", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](3, 2, "REGISTRATION.FAILED.REFERENCE"), " ID: ", ctx_r3.registration.id, " ");
        }
      }

      var stringify = __webpack_require__(
      /*! json-stringify-safe */
      73050);

      var _FailedRegistrationComponent = /*#__PURE__*/function () {
        function _FailedRegistrationComponent(registrationService, emailComposer, translateService, ngZone) {
          _classCallCheck(this, _FailedRegistrationComponent);

          this.registrationService = registrationService;
          this.emailComposer = emailComposer;
          this.translateService = translateService;
          this.ngZone = ngZone;
          this.registrationChange = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
        }

        _createClass(_FailedRegistrationComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "openForEdit",
          value: function openForEdit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      this.registration.syncStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__.SyncStatus.Draft;
                      _context.next = 3;
                      return this.registrationService.saveRegistrationAsync(this.registration);

                    case 3:
                      this.ngZone.run(function () {
                        _this.registrationChange.emit(_this.registration);
                      });

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "sendEmail",
          value: function sendEmail() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_5__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var translations, base64string, attachments, email;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.translateService.get(['REGISTRATION.EMAIL.SUBJECT', 'REGISTRATION.EMAIL.BODY']).toPromise();

                    case 2:
                      translations = _context2.sent;
                      // const pictures = this.registrationService
                      //   .getAllPictures(this.registration.request)
                      //   .filter(
                      //     (p) => p.PictureImageBase64 && !p.PictureImageBase64.startsWith('data')
                      //   )
                      //   .map((p) => p.PictureImageBase64);
                      base64string = btoa(stringify(this.registration));
                      attachments = ['base64:registration.json//' + base64string]; // const attachments = ['base64:registration.json//' + base64string].concat(
                      //   pictures
                      // );

                      email = {
                        to: _settings__WEBPACK_IMPORTED_MODULE_3__.settings.errorEmailAddress,
                        attachments: attachments,
                        subject: translations['REGISTRATION.EMAIL.SUBJECT'],
                        body: translations['REGISTRATION.EMAIL.BODY'],
                        isHtml: true
                      };
                      this.emailComposer.open(email);

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }]);

        return _FailedRegistrationComponent;
      }();

      _FailedRegistrationComponent.ɵfac = function FailedRegistrationComponent_Factory(t) {
        return new (t || _FailedRegistrationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_native_email_composer_ngx__WEBPACK_IMPORTED_MODULE_2__.EmailComposer), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
      };

      _FailedRegistrationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _FailedRegistrationComponent,
        selectors: [["app-failed-registration"]],
        inputs: {
          registration: "registration"
        },
        outputs: {
          registrationChange: "registrationChange"
        },
        decls: 20,
        vars: 13,
        consts: [["lines", "full"], [1, "ion-text-uppercase"], ["class", "ion-text-wrap", 4, "ngIf"], [4, "ngIf"], [3, "click"], ["slot", "start", "name", "mail"], [1, "ion-text-wrap"], ["slot", "start", "name", "create"]],
        template: function FailedRegistrationComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-list-header", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, FailedRegistrationComponent_ion_label_6_Template, 3, 3, "ion-label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, FailedRegistrationComponent_ion_label_7_Template, 3, 4, "ion-label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, FailedRegistrationComponent_ion_label_8_Template, 6, 9, "ion-label", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, FailedRegistrationComponent_ion_item_9_Template, 4, 4, "ion-item", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-item", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FailedRegistrationComponent_Template_ion_item_click_10_listener() {
              return ctx.sendEmail();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "ion-icon", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "ion-label", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-item", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function FailedRegistrationComponent_Template_ion_item_click_15_listener() {
              return ctx.openForEdit();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "ion-icon", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "ion-label", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](19, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 7, "REGISTRATION.FAILED.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode === 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode === 400);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode > 400);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration.syncStatusCode >= 400);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 9, "REGISTRATION.FAILED.SEND_EMAIL"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](19, 11, "REGISTRATION.FAILED.EDIT_OBSERVATION"), " ");
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmYWlsZWQtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    58182: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SendButtonComponent": function SendButtonComponent() {
          return (
            /* binding */
            _SendButtonComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/registration.service */
      33181);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../auth/services/regobs-auth.service */
      18955);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      50931);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var angular_svg_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! angular-svg-icon */
      70459);

      function SendButtonComponent_ion_footer_0_span_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.RESEND"));
        }
      }

      function SendButtonComponent_ion_footer_0_span_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, "REGISTRATION.SEND"));
        }
      }

      function SendButtonComponent_ion_footer_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-footer");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-toolbar");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-grid", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "ion-row");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-col", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "ion-button", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SendButtonComponent_ion_footer_0_Template_ion_button_click_5_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r3.send();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "ion-icon", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SendButtonComponent_ion_footer_0_span_7_Template, 3, 3, "span", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, SendButtonComponent_ion_footer_0_span_8_Template, 3, 3, "span", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-row", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-col", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-button", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SendButtonComponent_ion_footer_0_Template_ion_button_click_11_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r5["delete"]();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "svg-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](14, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r0.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.registration.syncError);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r0.registration.syncError);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](14, 4, "REGISTRATION.DELETE"), " ");
        }
      }

      var _SendButtonComponent = /*#__PURE__*/function () {
        function _SendButtonComponent(registrationService, alertController, userSettingService, translateService, navController, regobsAuthService, commonRegistrationService, cdr, ngZone) {
          _classCallCheck(this, _SendButtonComponent);

          this.registrationService = registrationService;
          this.alertController = alertController;
          this.userSettingService = userSettingService;
          this.translateService = translateService;
          this.navController = navController;
          this.regobsAuthService = regobsAuthService;
          this.commonRegistrationService = commonRegistrationService;
          this.cdr = cdr;
          this.ngZone = ngZone;
          this.isSending = false;
          this.isLoggingIn = false;
          this.ngDestroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        }

        _createClass(_SendButtonComponent, [{
          key: "isDisabled",
          get: function get() {
            // TODO: Hvorfor disabled hvis man holder på å logge inn?
            return this.isEmpty || this.isSending || this.isLoggingIn;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this2 = this;

            this.isSending = false;
            this.isLoggingIn = false;
            this.regobsAuthService.isLoggingIn$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(this.ngDestroy$)).subscribe(function (val) {
              _this2.ngZone.run(function () {
                _this2.isLoggingIn = val;

                _this2.cdr.detectChanges();
              });
            });
          }
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            var _this3 = this;

            var _a;

            if ((_a = changes.registration) === null || _a === void 0 ? void 0 : _a.currentValue) {
              this.commonRegistrationService.isEmpty(changes.registration.currentValue).then(function (empty) {
                _this3.isEmpty = empty;

                _this3.cdr.detectChanges();
              });
            }
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.ngDestroy$.next();
            this.ngDestroy$.complete();
          }
        }, {
          key: "send",
          value: function send() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var userSettings;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (this.isSending) {
                        _context3.next = 13;
                        break;
                      }

                      this.isSending = true;
                      this.cdr.detectChanges();
                      _context3.prev = 3;
                      _context3.next = 6;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.take)(1)).toPromise();

                    case 6:
                      userSettings = _context3.sent;
                      _context3.next = 9;
                      return this.registrationService.sendRegistration(userSettings.appMode, this.registration);

                    case 9:
                      _context3.prev = 9;
                      this.isSending = false;
                      this.cdr.detectChanges();
                      return _context3.finish(9);

                    case 13:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this, [[3,, 9, 13]]);
            }));
          }
        }, {
          key: "delete",
          value: function _delete() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this4 = this;

              var translations, alert;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.translateService.get(['REGISTRATION.DELETE', 'REGISTRATION.DELETE_CONFIRM', 'ALERT.OK', 'ALERT.CANCEL']).toPromise();

                    case 2:
                      translations = _context4.sent;
                      _context4.next = 5;
                      return this.alertController.create({
                        header: translations['REGISTRATION.DELETE'],
                        message: translations['REGISTRATION.DELETE_CONFIRM'],
                        buttons: [{
                          text: translations['ALERT.CANCEL'],
                          role: 'cancel',
                          cssClass: 'secondary'
                        }, {
                          text: translations['ALERT.OK'],
                          handler: function handler() {
                            _this4.commonRegistrationService.deleteRegistrationFromOfflineStorage(_this4.registration.id).subscribe(function () {
                              _this4.navController.navigateRoot('');
                            });
                          }
                        }]
                      });

                    case 5:
                      alert = _context4.sent;
                      _context4.next = 8;
                      return alert.present();

                    case 8:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }]);

        return _SendButtonComponent;
      }();

      _SendButtonComponent.ɵfac = function SendButtonComponent_Factory(t) {
        return new (t || _SendButtonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_1__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_2__.RegobsAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_3__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
      };

      _SendButtonComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _SendButtonComponent,
        selectors: [["app-send-button"]],
        inputs: {
          registration: "registration"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
        decls: 1,
        vars: 1,
        consts: [[4, "ngIf"], [1, "ion-no-padding"], ["size", "12", 1, "send-button-col"], ["expand", "block", "color", "varsom-orange", 3, "disabled", "click"], ["slot", "start", "name", "send"], [1, "delete-button-col", "ion-no-padding", "ion-text-center"], ["color", "dark", "size", "small", "fill", "clear", 3, "click"], ["slot", "start", "src", "/assets/icon/delete.svg"]],
        template: function SendButtonComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SendButtonComponent_ion_footer_0_Template, 15, 6, "ion-footer", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_11__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, angular_svg_icon__WEBPACK_IMPORTED_MODULE_12__.SvgIconComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
        styles: ["ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%] {\n  --background: #fff;\n}\nion-footer[_ngcontent-%COMP%]   .send-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  margin-right: 6px;\n  height: var(--ion-button-height);\n}\nion-footer[_ngcontent-%COMP%]   .delete-button-col[_ngcontent-%COMP%] {\n  --ion-button-font-size: 11px;\n}\nion-footer[_ngcontent-%COMP%]   .delete-button-col[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   svg-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  display: flex;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbmQtYnV0dG9uLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0ksa0JBQUE7QUFBUjtBQUlRO0VBQ0ksZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0FBRlo7QUFNSTtFQUNJLDRCQUFBO0FBSlI7QUFPWTtFQUNJLGlCQUFBO0VBQ0EsYUFBQTtBQUxoQiIsImZpbGUiOiJzZW5kLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1mb290ZXIge1xyXG4gICAgaW9uLXRvb2xiYXIge1xyXG4gICAgICAgIC0tYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIH1cclxuXHJcbiAgICAuc2VuZC1idXR0b24tY29sIHtcclxuICAgICAgICBpb24tYnV0dG9uIHtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDZweDtcclxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogdmFyKC0taW9uLWJ1dHRvbi1oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZGVsZXRlLWJ1dHRvbi1jb2wge1xyXG4gICAgICAgIC0taW9uLWJ1dHRvbi1mb250LXNpemU6IDExcHg7XHJcblxyXG4gICAgICAgIGlvbi1idXR0b24ge1xyXG4gICAgICAgICAgICBzdmctaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDZweDtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0= */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    70023: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SummaryItemComponent": function SummaryItemComponent() {
          return (
            /* binding */
            _SummaryItemComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      47599);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      49005);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      98578);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs */
      32185);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs */
      35116);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs */
      34864);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! rxjs */
      44094);
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/shared/services/logging/logging.service */
      93042);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../blob-image/blob-image.component */
      44037);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SummaryItemComponent_ion_item_0_p_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, ctx_r1.item.subTitle), " ");
        }
      }

      function SummaryItemComponent_ion_item_0_p_6_ro_blob_image_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ro-blob-image", 8);
        }

        if (rf & 2) {
          var attachment_r5 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("imgBlob", attachment_r5.blob);
        }
      }

      function SummaryItemComponent_ion_item_0_p_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, SummaryItemComponent_ion_item_0_p_6_ro_blob_image_1_Template, 1, 1, "ro-blob-image", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.attachments);
        }
      }

      function SummaryItemComponent_ion_item_0_ion_icon_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 9);
        }
      }

      function SummaryItemComponent_ion_item_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-item", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SummaryItemComponent_ion_item_0_Template_ion_item_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

            return ctx_r6.navigate();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-label", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, SummaryItemComponent_ion_item_0_p_5_Template, 3, 3, "p", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, SummaryItemComponent_ion_item_0_p_6_Template, 2, 1, "p", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, SummaryItemComponent_ion_item_0_ion_icon_7_Template, 1, 0, "ion-icon", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("detail", !ctx_r0.readonly);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 5, ctx_r0.item.title));

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.item.subTitle);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.attachments);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.item.hasData && !ctx_r0.readonly);
        }
      }

      var DEBUG_TAG = 'SummaryItemComponent';

      var _SummaryItemComponent = /*#__PURE__*/function (_src_app_core_helpers) {
        _inherits(_SummaryItemComponent, _src_app_core_helpers);

        var _super = _createSuper(_SummaryItemComponent);

        function _SummaryItemComponent(navController, newAttachmentService, cdr, logger) {
          var _this5;

          _classCallCheck(this, _SummaryItemComponent);

          _this5 = _super.call(this);
          _this5.navController = navController;
          _this5.newAttachmentService = newAttachmentService;
          _this5.cdr = cdr;
          _this5.logger = logger;
          _this5.readonly = false;
          return _this5;
        }

        _createClass(_SummaryItemComponent, [{
          key: "ngOnChanges",
          value: function ngOnChanges() {
            var _this6 = this;

            var _a;

            if (((_a = this.item) === null || _a === void 0 ? void 0 : _a.attachments) != null) {
              (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(this.item.attachments).pipe((0, rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(function (attachments) {
                return attachments.filter(function (a) {
                  return a.type === 'new';
                }).map(function (a) {
                  return a.attachment;
                });
              }), (0, rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMap)(function (attachments) {
                return attachments.length === 0 ? (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.of)([]) : (0, rxjs__WEBPACK_IMPORTED_MODULE_8__.forkJoin)(_toConsumableArray(attachments.map(function (a) {
                  return _this6.newAttachmentService.getBlob(_this6.item.id, a.id).pipe((0, rxjs__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(function (blob) {
                    return Object.assign(Object.assign({}, a), {
                      blob: blob
                    });
                  }), (0, rxjs__WEBPACK_IMPORTED_MODULE_10__.catchError)(function (err) {
                    _this6.logger.error(err, DEBUG_TAG, 'Could not get blob from attachment');

                    return (0, rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(Object.assign(Object.assign({}, a), {
                      blob: undefined
                    }));
                  }));
                })));
              }), (0, rxjs__WEBPACK_IMPORTED_MODULE_11__.takeUntil)(this.ngDestroy$)).subscribe(function (result) {
                _this6.attachments = result;

                _this6.cdr.detectChanges();
              });
            }
          }
        }, {
          key: "navigate",
          value: function navigate() {
            if (!this.readonly) {
              this.navController.navigateForward([this.item.href, this.item.id], {
                queryParams: this.item.queryParams
              });
            }
          }
        }]);

        return _SummaryItemComponent;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_0__.NgDestoryBase);

      _SummaryItemComponent.ɵfac = function SummaryItemComponent_Factory(t) {
        return new (t || _SummaryItemComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_1__.NewAttachmentService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_modules_shared_services_logging_logging_service__WEBPACK_IMPORTED_MODULE_2__.LoggingService));
      };

      _SummaryItemComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _SummaryItemComponent,
        selectors: [["app-summary-item"]],
        inputs: {
          item: "item",
          readonly: "readonly"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
        decls: 1,
        vars: 1,
        consts: [["class", "summary-item", 3, "detail", "click", 4, "ngIf"], [1, "summary-item", 3, "detail", "click"], [1, "ion-padding-vertical", "ion-padding-end"], [4, "ngIf"], ["class", "images", 4, "ngIf"], ["slot", "end", "color", "success", "name", "checkmark-circle", 4, "ngIf"], [1, "images"], [3, "imgBlob", 4, "ngFor", "ngForOf"], [3, "imgBlob"], ["slot", "end", "color", "success", "name", "checkmark-circle"]],
        template: function SummaryItemComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, SummaryItemComponent_ion_item_0_Template, 8, 7, "ion-item", 0);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !(ctx.readonly && !ctx.item.hasData));
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _blob_image_blob_image_component__WEBPACK_IMPORTED_MODULE_3__.BlobImageComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["ro-blob-image[_ngcontent-%COMP%], img[_ngcontent-%COMP%] {\n  max-width: 100px;\n  max-height: 100px;\n  padding-right: 5px;\n  display: inline-block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1bW1hcnktaXRlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNJLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0FBQUoiLCJmaWxlIjoic3VtbWFyeS1pdGVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbnJvLWJsb2ItaW1hZ2UsIGltZyB7XHJcbiAgICBtYXgtd2lkdGg6IDEwMHB4O1xyXG4gICAgbWF4LWhlaWdodDogMTAwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn0iXX0= */"],
        changeDetection: 0
      });
      /***/
    },

    /***/
    86166: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OverviewPageModule": function OverviewPageModule() {
          return (
            /* binding */
            _OverviewPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _overview_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./overview.page */
      38101);
      /* harmony import */


      var _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../components/send-button/send-button.component */
      58182);
      /* harmony import */


      var _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/summary-item/summary-item.component */
      70023);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/failed-registration/failed-registration.component */
      91068);
      /* harmony import */


      var _save_as_draft_guard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../save-as-draft.guard */
      52622);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _overview_page__WEBPACK_IMPORTED_MODULE_0__.OverviewPage,
        canDeactivate: [_save_as_draft_guard__WEBPACK_IMPORTED_MODULE_5__.SaveAsDraftRouteGuard]
      }];

      var _OverviewPageModule = function _OverviewPageModule() {
        _classCallCheck(this, _OverviewPageModule);
      };

      _OverviewPageModule.ɵfac = function OverviewPageModule_Factory(t) {
        return new (t || _OverviewPageModule)();
      };

      _OverviewPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: _OverviewPageModule
      });
      _OverviewPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_3__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](_OverviewPageModule, {
          declarations: [_overview_page__WEBPACK_IMPORTED_MODULE_0__.OverviewPage, _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_1__.SendButtonComponent, _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_2__.SummaryItemComponent, _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_4__.FailedRegistrationComponent],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_3__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    38101: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "OverviewPage": function OverviewPage() {
          return (
            /* binding */
            _OverviewPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.services */
      93714);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! rxjs */
      57850);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! rxjs */
      14500);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../core/services/user-group/user-group.service */
      3942);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _services_summary_item_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../services/summary-item.service */
      13741);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! rxjs/operators */
      44094);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! rxjs/operators */
      98578);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! rxjs/operators */
      52249);
      /* harmony import */


      var src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! src/app/core/helpers/observable-helper */
      59364);
      /* harmony import */


      var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! fast-deep-equal */
      90223);
      /* harmony import */


      var fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_5__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/send-button/send-button.component */
      58182);
      /* harmony import */


      var _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../components/failed-registration/failed-registration.component */
      91068);
      /* harmony import */


      var _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ../../components/summary-item/summary-item.component */
      70023);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function OverviewPage_ng_container_7_app_failed_registration_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-failed-registration", 8);
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("registration", ctx_r1.registration);
        }
      }

      function OverviewPage_ng_container_7_app_summary_item_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "app-summary-item", 9);
        }

        if (rf & 2) {
          var item_r3 = ctx.$implicit;

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("readonly", ctx_r2.registration.syncStatus === ctx_r2.RegistrationStatus.Sync)("item", item_r3);
        }
      }

      function OverviewPage_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, OverviewPage_ng_container_7_app_failed_registration_2_Template, 1, 1, "app-failed-registration", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](7, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](8, OverviewPage_ng_container_7_app_summary_item_8_Template, 1, 2, "app-summary-item", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "app-send-button", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r0.registration.syncError && ctx_r0.registration.syncStatus === ctx_r0.RegistrationStatus.Sync);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](7, 5, "REGISTRATION.OVERVIEW.MY_OBSERVATION"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r0.summaryItems)("ngForTrackBy", ctx_r0.trackByFunction);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("registration", ctx_r0.registration);
        }
      }

      var _OverviewPage = /*#__PURE__*/function (_src_app_core_helpers2) {
        _inherits(_OverviewPage, _src_app_core_helpers2);

        var _super2 = _createSuper(_OverviewPage);

        function _OverviewPage(commonRegistrationService, cdr, activatedRoute, summaryItemService, userGroupService, newAttachmentService) {
          var _this7;

          _classCallCheck(this, _OverviewPage);

          _this7 = _super2.call(this);
          _this7.commonRegistrationService = commonRegistrationService;
          _this7.cdr = cdr;
          _this7.activatedRoute = activatedRoute;
          _this7.summaryItemService = summaryItemService;
          _this7.userGroupService = userGroupService;
          _this7.newAttachmentService = newAttachmentService;
          _this7.RegistationTid = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid;
          _this7.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_11__.GeoHazard;
          _this7.RegistrationStatus = src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.SyncStatus;
          _this7.summaryItems = [];
          return _this7;
        }

        _createClass(_OverviewPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this8 = this;

            var id = this.activatedRoute.snapshot.params['id'];
            this.registration$ = this.commonRegistrationService.getRegistrationByIdShared$(id);
            this.registration$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$)).subscribe(function (registration) {
              _this8.registration = registration;

              _this8.cdr.detectChanges();
            });
            this.initSummaryItemSubscription();
            this.userGroupService.updateUserGroups();
          }
        }, {
          key: "initSummaryItemSubscription",
          value: function initSummaryItemSubscription() {
            var _this9 = this;

            this.registration$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)(function (reg) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_14__.combineLatest)([_this9.userGroupService.getUserGroupsAsObservable(), _this9.newAttachmentService.getAttachments(reg.id)]).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 1),
                    userGroups = _ref2[0];

                return (0, rxjs__WEBPACK_IMPORTED_MODULE_15__.from)(_this9.summaryItemService.getSummaryItems(reg, userGroups));
              }));
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.distinctUntilChanged)(function (a, b) {
              return fast_deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(a, b);
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.takeUntil)(this.ngDestroy$)).subscribe(function (summaryItems) {
              _this9.summaryItems = summaryItems;

              _this9.cdr.detectChanges();
            });
          }
        }, {
          key: "trackByFunction",
          value: function trackByFunction(index, item) {
            if (!item) {
              return null;
            }

            return item.href;
          }
        }]);

        return _OverviewPage;
      }(src_app_core_helpers_observable_helper__WEBPACK_IMPORTED_MODULE_4__.NgDestoryBase);

      _OverviewPage.ɵfac = function OverviewPage_Factory(t) {
        return new (t || _OverviewPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_summary_item_service__WEBPACK_IMPORTED_MODULE_3__.SummaryItemService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_core_services_user_group_user_group_service__WEBPACK_IMPORTED_MODULE_2__.UserGroupService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_modules_common_registration_registration_services__WEBPACK_IMPORTED_MODULE_0__.NewAttachmentService));
      };

      _OverviewPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
        type: _OverviewPage,
        selectors: [["app-overview"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵInheritDefinitionFeature"]],
        decls: 8,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [4, "ngIf"], [3, "registration", 4, "ngIf"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "readonly", "item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "registration"], [3, "readonly", "item"]],
        template: function OverviewPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, OverviewPage_ng_container_7_Template, 10, 7, "ng-container", 3);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](6, 2, "REGISTRATION.OVERVIEW.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_6__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonTitle, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_18__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_19__.NgForOf, _components_send_button_send_button_component__WEBPACK_IMPORTED_MODULE_7__.SendButtonComponent, _components_failed_registration_failed_registration_component__WEBPACK_IMPORTED_MODULE_8__.FailedRegistrationComponent, _components_summary_item_summary_item_component__WEBPACK_IMPORTED_MODULE_9__.SummaryItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_20__.TranslatePipe],
        styles: ["ion-list[_ngcontent-%COMP%] {\n  padding-bottom: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm92ZXJ2aWV3LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0FBQ0YiLCJmaWxlIjoib3ZlcnZpZXcucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWxpc3Qge1xyXG4gIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG59XHJcbiJdfQ== */"],
        changeDetection: 0
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJzdHJpbmdpZnkiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiRmFpbGVkUmVnaXN0cmF0aW9uQ29tcG9uZW50IiwicmVnaXN0cmF0aW9uU2VydmljZSIsImVtYWlsQ29tcG9zZXIiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwibmdab25lIiwicmVnaXN0cmF0aW9uIiwic3luY1N0YXR1cyIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsInNhdmVSZWdpc3RyYXRpb25Bc3luYyIsInJ1biIsInJlZ2lzdHJhdGlvbkNoYW5nZSIsImVtaXQiLCJnZXQiLCJ0b1Byb21pc2UiLCJ0cmFuc2xhdGlvbnMiLCJiYXNlNjRzdHJpbmciLCJidG9hIiwiYXR0YWNobWVudHMiLCJlbWFpbCIsInRvIiwiX3NldHRpbmdzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8zX18iLCJzdWJqZWN0IiwiYm9keSIsImlzSHRtbCIsIm9wZW4iLCJzZWxlY3RvcnMiLCJpbnB1dHMiLCJvdXRwdXRzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJjdHgiLCJTZW5kQnV0dG9uQ29tcG9uZW50IiwiYWxlcnRDb250cm9sbGVyIiwidXNlclNldHRpbmdTZXJ2aWNlIiwibmF2Q29udHJvbGxlciIsInJlZ29ic0F1dGhTZXJ2aWNlIiwiY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsImNkciIsInJ4anNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzVfXyIsImlzRW1wdHkiLCJpc1NlbmRpbmciLCJpc0xvZ2dpbmdJbiIsImlzTG9nZ2luZ0luJCIsInBpcGUiLCJuZ0Rlc3Ryb3kkIiwic3Vic2NyaWJlIiwidmFsIiwiZGV0ZWN0Q2hhbmdlcyIsImNoYW5nZXMiLCJfYSIsImN1cnJlbnRWYWx1ZSIsInRoZW4iLCJlbXB0eSIsIm5leHQiLCJjb21wbGV0ZSIsInVzZXJTZXR0aW5nJCIsInVzZXJTZXR0aW5ncyIsInNlbmRSZWdpc3RyYXRpb24iLCJhcHBNb2RlIiwiY3JlYXRlIiwiaGVhZGVyIiwibWVzc2FnZSIsImJ1dHRvbnMiLCJ0ZXh0Iiwicm9sZSIsImNzc0NsYXNzIiwiaGFuZGxlciIsImRlbGV0ZVJlZ2lzdHJhdGlvbkZyb21PZmZsaW5lU3RvcmFnZSIsImlkIiwibmF2aWdhdGVSb290IiwiYWxlcnQiLCJwcmVzZW50IiwiZmVhdHVyZXMiLCJERUJVR19UQUciLCJTdW1tYXJ5SXRlbUNvbXBvbmVudCIsIm5ld0F0dGFjaG1lbnRTZXJ2aWNlIiwibG9nZ2VyIiwiaXRlbSIsImZpbHRlciIsImEiLCJ0eXBlIiwibWFwIiwiYXR0YWNobWVudCIsImxlbmd0aCIsImdldEJsb2IiLCJibG9iIiwiT2JqZWN0IiwiZXJyIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJyZXN1bHQiLCJyZWFkb25seSIsIm5hdmlnYXRlRm9yd2FyZCIsImhyZWYiLCJxdWVyeVBhcmFtcyIsInNyY19hcHBfY29yZV9oZWxwZXJzX29ic2VydmFibGVfaGVscGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJyb3V0ZXMiLCJwYXRoIiwiY29tcG9uZW50IiwiX292ZXJ2aWV3X3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNhbkRlYWN0aXZhdGUiLCJfc2F2ZV9hc19kcmFmdF9ndWFyZF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiT3ZlcnZpZXdQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV83X18iLCJkZWNsYXJhdGlvbnMiLCJfY29tcG9uZW50c19zZW5kX2J1dHRvbl9zZW5kX2J1dHRvbl9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIl9jb21wb25lbnRzX3N1bW1hcnlfaXRlbV9zdW1tYXJ5X2l0ZW1fY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfY29tcG9uZW50c19mYWlsZWRfcmVnaXN0cmF0aW9uX2ZhaWxlZF9yZWdpc3RyYXRpb25fY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTBfXyIsIml0ZW1fcjMiLCJjdHhfcjAiLCJPdmVydmlld1BhZ2UiLCJhY3RpdmF0ZWRSb3V0ZSIsInN1bW1hcnlJdGVtU2VydmljZSIsInVzZXJHcm91cFNlcnZpY2UiLCJzcmNfYXBwX21vZHVsZXNfY29tbW9uX3JlZ2lzdHJhdGlvbl9yZWdpc3RyYXRpb25fbW9kZWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTFfXyIsInNuYXBzaG90IiwicGFyYW1zIiwicmVnaXN0cmF0aW9uJCIsImdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkIiwiaW5pdFN1bW1hcnlJdGVtU3Vic2NyaXB0aW9uIiwidXBkYXRlVXNlckdyb3VwcyIsInJlZyIsImdldFVzZXJHcm91cHNBc09ic2VydmFibGUiLCJnZXRBdHRhY2htZW50cyIsInVzZXJHcm91cHMiLCJnZXRTdW1tYXJ5SXRlbXMiLCJiIiwiZmFzdF9kZWVwX2VxdWFsX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X19fZGVmYXVsdCIsInN1bW1hcnlJdGVtcyIsImluZGV4Iiwic3JjX2FwcF9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzRfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2ZhaWxlZC1yZWdpc3RyYXRpb24vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2ZhaWxlZC1yZWdpc3RyYXRpb24vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zZW5kLWJ1dHRvbi9zZW5kLWJ1dHRvbi5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3NlbmQtYnV0dG9uL3NlbmQtYnV0dG9uLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL3N1bW1hcnktaXRlbS9zdW1tYXJ5LWl0ZW0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vY29tcG9uZW50cy9zdW1tYXJ5LWl0ZW0vc3VtbWFyeS1pdGVtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9vdmVydmlldy9vdmVydmlldy5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb3ZlcnZpZXcvb3ZlcnZpZXcucGFnZS5odG1sIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL292ZXJ2aWV3L292ZXJ2aWV3LnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgIDxpb24tbGFiZWw+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5GQUlMRUQuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gIDxpb24taXRlbT5cclxuICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCIgKm5nSWY9XCJyZWdpc3RyYXRpb24uc3luY1N0YXR1c0NvZGUgPT09IDBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5TVUJUSVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiICpuZ0lmPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXNDb2RlID09PSA0MDBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5QUk9CTEVNJyB8IHRyYW5zbGF0ZX19OiB7eyByZWdpc3RyYXRpb24uc3luY0Vycm9yIH19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCIgKm5nSWY9XCJyZWdpc3RyYXRpb24uc3luY1N0YXR1c0NvZGUgPiA0MDBcIj5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5QUk9CTEVNJyB8IHRyYW5zbGF0ZX19LiB7eydSRUdJU1RSQVRJT04uRkFJTEVELkxPR0dFRCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgICA8IS0tIFRhIHNramVybWJpbGRlIG9nXHJcbiAgICAgIDxhcHAtZXh0ZXJuYWwtbGluayBzcmM9XCJodHRwOi8vd3d3LnJlZ29icy5uby9Ib21lL0Fib3V0XCI+a29udGFrdCBvc3M8L2FwcC1leHRlcm5hbC1saW5rPlxyXG4gICAgICAsIHPDpSBoamVscGVyIGR1IG9zcyBtZWQgw6UgZmlubmUgZW4gbMO4c25pbmcuICAtLT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLkZBSUxFRC5QUk9CTEVNX0hFTFBfVEVYVCcgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8aW9uLWl0ZW0gKm5nSWY9XCJyZWdpc3RyYXRpb24uc3luY1N0YXR1c0NvZGUgPj0gNDAwXCI+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uRkFJTEVELlJFRkVSRU5DRScgfCB0cmFuc2xhdGV9fSBJRDoge3sgcmVnaXN0cmF0aW9uLmlkIH19XHJcbiAgICA8L2lvbi1sYWJlbD5cclxuICA8L2lvbi1pdGVtPlxyXG4gIDxpb24taXRlbSAoY2xpY2spPVwic2VuZEVtYWlsKClcIj5cclxuICAgIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwibWFpbFwiPjwvaW9uLWljb24+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uRkFJTEVELlNFTkRfRU1BSUwnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbiAgPGlvbi1pdGVtIChjbGljayk9XCJvcGVuRm9yRWRpdCgpXCI+XHJcbiAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cImNyZWF0ZVwiPjwvaW9uLWljb24+XHJcbiAgICA8aW9uLWxhYmVsIGNsYXNzPVwiaW9uLXRleHQtd3JhcFwiPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uRkFJTEVELkVESVRfT0JTRVJWQVRJT04nIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLWxhYmVsPlxyXG4gIDwvaW9uLWl0ZW0+XHJcbjwvaW9uLWxpc3Q+IiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgT25Jbml0LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgTmdab25lXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBFbWFpbENvbXBvc2VyLFxyXG4gIEVtYWlsQ29tcG9zZXJPcHRpb25zXHJcbn0gZnJvbSAnQGlvbmljLW5hdGl2ZS9lbWFpbC1jb21wb3Nlci9uZ3gnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IHNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc2V0dGluZ3MnO1xyXG5jb25zdCBzdHJpbmdpZnkgPSByZXF1aXJlKCdqc29uLXN0cmluZ2lmeS1zYWZlJyk7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1mYWlsZWQtcmVnaXN0cmF0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmFpbGVkLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGYWlsZWRSZWdpc3RyYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBAT3V0cHV0KCkgcmVnaXN0cmF0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZW1haWxDb21wb3NlcjogRW1haWxDb21wb3NlcixcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlU2VydmljZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHt9XHJcblxyXG4gIGFzeW5jIG9wZW5Gb3JFZGl0KCkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24uc3luY1N0YXR1cyA9IFN5bmNTdGF0dXMuRHJhZnQ7XHJcbiAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2F2ZVJlZ2lzdHJhdGlvbkFzeW5jKHRoaXMucmVnaXN0cmF0aW9uKTtcclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uQ2hhbmdlLmVtaXQodGhpcy5yZWdpc3RyYXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBzZW5kRW1haWwoKSB7XHJcbiAgICBjb25zdCB0cmFuc2xhdGlvbnMgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2VcclxuICAgICAgLmdldChbJ1JFR0lTVFJBVElPTi5FTUFJTC5TVUJKRUNUJywgJ1JFR0lTVFJBVElPTi5FTUFJTC5CT0RZJ10pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIC8vIGNvbnN0IHBpY3R1cmVzID0gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgICAvLyAgIC5nZXRBbGxQaWN0dXJlcyh0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0KVxyXG4gICAgLy8gICAuZmlsdGVyKFxyXG4gICAgLy8gICAgIChwKSA9PiBwLlBpY3R1cmVJbWFnZUJhc2U2NCAmJiAhcC5QaWN0dXJlSW1hZ2VCYXNlNjQuc3RhcnRzV2l0aCgnZGF0YScpXHJcbiAgICAvLyAgIClcclxuICAgIC8vICAgLm1hcCgocCkgPT4gcC5QaWN0dXJlSW1hZ2VCYXNlNjQpO1xyXG4gICAgY29uc3QgYmFzZTY0c3RyaW5nID0gYnRvYShzdHJpbmdpZnkodGhpcy5yZWdpc3RyYXRpb24pKTtcclxuICAgIGNvbnN0IGF0dGFjaG1lbnRzID0gWydiYXNlNjQ6cmVnaXN0cmF0aW9uLmpzb24vLycgKyBiYXNlNjRzdHJpbmddO1xyXG4gICAgLy8gY29uc3QgYXR0YWNobWVudHMgPSBbJ2Jhc2U2NDpyZWdpc3RyYXRpb24uanNvbi8vJyArIGJhc2U2NHN0cmluZ10uY29uY2F0KFxyXG4gICAgLy8gICBwaWN0dXJlc1xyXG4gICAgLy8gKTtcclxuICAgIGNvbnN0IGVtYWlsOiBFbWFpbENvbXBvc2VyT3B0aW9ucyA9IHtcclxuICAgICAgdG86IHNldHRpbmdzLmVycm9yRW1haWxBZGRyZXNzLFxyXG4gICAgICBhdHRhY2htZW50cyxcclxuICAgICAgc3ViamVjdDogdHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uRU1BSUwuU1VCSkVDVCddLFxyXG4gICAgICBib2R5OiB0cmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5FTUFJTC5CT0RZJ10sXHJcbiAgICAgIGlzSHRtbDogdHJ1ZVxyXG4gICAgfTtcclxuICAgIHRoaXMuZW1haWxDb21wb3Nlci5vcGVuKGVtYWlsKTtcclxuICB9XHJcblxyXG4gIC8vIHByaXZhdGUgYXN5bmMgZ2V0RW1haWxBZGRyZXNzKCkge1xyXG4gIC8vICAgY29uc3QgdXNlclNldHRpbmcgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS5nZXRVc2VyU2V0dGluZ3MoKTtcclxuICAvLyAgIHN3aXRjaCAodXNlclNldHRpbmcuY3VycmVudEdlb0hhemFyZCkge1xyXG4gIC8vICAgICBjYXNlIEdlb0hhemFyZC5Tbm93OlxyXG4gIC8vICAgICAgIHJldHVybiAnc25vc2tyZWR2YXJzbGluZ0BudmUubm8nO1xyXG4gIC8vICAgICBjYXNlIEdlb0hhemFyZC5JY2U6XHJcbiAgLy8gICAgICAgcmV0dXJuICdpc3ZhcnNsaW5nQG52ZS5ubyc7XHJcbiAgLy8gICAgIGNhc2UgR2VvSGF6YXJkLldhdGVyOlxyXG4gIC8vICAgICAgIHJldHVybiAnZmxvbXZhcnNsaW5nQG52ZS5ubyc7XHJcbiAgLy8gICAgIGNhc2UgR2VvSGF6YXJkLkRpcnQ6XHJcbiAgLy8gICAgICAgcmV0dXJuICdqb3Jkc2tyZWR2YXJzbGluZ0BudmUubm8nO1xyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxufVxyXG4iLCI8aW9uLWZvb3RlciAqbmdJZj1cInJlZ2lzdHJhdGlvblwiPlxyXG4gIDxpb24tdG9vbGJhcj5cclxuICAgIDxpb24tZ3JpZCBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgIDxpb24tcm93PlxyXG4gICAgICAgIDxpb24tY29sIGNsYXNzPVwic2VuZC1idXR0b24tY29sXCIgc2l6ZT1cIjEyXCI+XHJcbiAgICAgICAgICA8aW9uLWJ1dHRvbiBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiIGV4cGFuZD1cImJsb2NrXCIgY29sb3I9XCJ2YXJzb20tb3JhbmdlXCIgKGNsaWNrKT1cInNlbmQoKVwiPlxyXG4gICAgICAgICAgICA8aW9uLWljb24gc2xvdD1cInN0YXJ0XCIgbmFtZT1cInNlbmRcIj48L2lvbi1pY29uPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cInJlZ2lzdHJhdGlvbi5zeW5jRXJyb3JcIj57e1wiUkVHSVNUUkFUSU9OLlJFU0VORFwiIHwgdHJhbnNsYXRlfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXJlZ2lzdHJhdGlvbi5zeW5jRXJyb3JcIj57e1wiUkVHSVNUUkFUSU9OLlNFTkRcIiB8IHRyYW5zbGF0ZX19PC9zcGFuPlxyXG4gICAgICAgICAgPC9pb24tYnV0dG9uPlxyXG4gICAgICAgIDwvaW9uLWNvbD5cclxuICAgICAgPC9pb24tcm93PlxyXG4gICAgICA8aW9uLXJvdyBjbGFzcz1cImlvbi1uby1wYWRkaW5nXCI+XHJcbiAgICAgICAgPGlvbi1jb2wgY2xhc3M9XCJkZWxldGUtYnV0dG9uLWNvbCBpb24tbm8tcGFkZGluZyBpb24tdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJkZWxldGUoKVwiIGNvbG9yPVwiZGFya1wiIHNpemU9XCJzbWFsbFwiIGZpbGw9XCJjbGVhclwiPlxyXG4gICAgICAgICAgICA8IS0tIDxpb24taWNvbiBzbG90PVwic3RhcnRcIiBuYW1lPVwidHJhc2hcIj48L2lvbi1pY29uPiAtLT5cclxuICAgICAgICAgICAgPHN2Zy1pY29uIHNsb3Q9XCJzdGFydFwiIHNyYz1cIi9hc3NldHMvaWNvbi9kZWxldGUuc3ZnXCI+PC9zdmctaWNvbj5cclxuICAgICAgICAgICAge3tcIlJFR0lTVFJBVElPTi5ERUxFVEVcIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgICA8L2lvbi1idXR0b24+XHJcbiAgICAgICAgPC9pb24tY29sPlxyXG4gICAgICA8L2lvbi1yb3c+XHJcbiAgICA8L2lvbi1ncmlkPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWZvb3Rlcj4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIsIE5hdkNvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBVc2VyU2V0dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3VzZXItc2V0dGluZy91c2VyLXNldHRpbmcuc2VydmljZSc7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgYXMgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IFNtYXJ0Q2hhbmdlcyB9IGZyb20gJ3NyYy9hcHAvY29yZS9oZWxwZXJzL3NpbXBsZS1jaGFuZ2VzLmhlbHBlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1zZW5kLWJ1dHRvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbmQtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZW5kLWJ1dHRvbi5jb21wb25lbnQuc2NzcyddLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZW5kQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG5cclxuICAvLyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAvLyAgIHJldHVybiB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuaXNSZWdpc3RyYXRpb25FbXB0eSh0aGlzLnJlZ2lzdHJhdGlvbik7XHJcbiAgLy8gfVxyXG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcblxyXG4gIGdldCBpc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVE9ETzogSHZvcmZvciBkaXNhYmxlZCBodmlzIG1hbiBob2xkZXIgcMOlIMOlIGxvZ2dlIGlubj9cclxuICAgIHJldHVybiB0aGlzLmlzRW1wdHkgfHwgdGhpcy5pc1NlbmRpbmcgfHwgdGhpcy5pc0xvZ2dpbmdJbjtcclxuICB9XHJcblxyXG4gIGlzU2VuZGluZyA9IGZhbHNlO1xyXG4gIGlzTG9nZ2luZ0luID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgbmdEZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhbGVydENvbnRyb2xsZXI6IEFsZXJ0Q29udHJvbGxlcixcclxuICAgIHByaXZhdGUgdXNlclNldHRpbmdTZXJ2aWNlOiBVc2VyU2V0dGluZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHJlZ29ic0F1dGhTZXJ2aWNlOiBSZWdvYnNBdXRoU2VydmljZSxcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNTZW5kaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTG9nZ2luZ0luID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlZ29ic0F1dGhTZXJ2aWNlLmlzTG9nZ2luZ0luJFxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5uZ0Rlc3Ryb3kkKSlcclxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaXNMb2dnaW5nSW4gPSB2YWw7XHJcbiAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzICYgU21hcnRDaGFuZ2VzPHRoaXM+KTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5yZWdpc3RyYXRpb24/LmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuaXNFbXB0eShjaGFuZ2VzLnJlZ2lzdHJhdGlvbi5jdXJyZW50VmFsdWUpLnRoZW4oKGVtcHR5KSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gZW1wdHk7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5uZ0Rlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMubmdEZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2VuZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghdGhpcy5pc1NlbmRpbmcpIHtcclxuICAgICAgdGhpcy5pc1NlbmRpbmcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHVzZXJTZXR0aW5ncyA9IGF3YWl0IHRoaXMudXNlclNldHRpbmdTZXJ2aWNlLnVzZXJTZXR0aW5nJFxyXG4gICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKCk7XHJcbiAgICAgICAgICBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2Uuc2VuZFJlZ2lzdHJhdGlvbihcclxuICAgICAgICAgICAgdXNlclNldHRpbmdzLmFwcE1vZGUsXHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZW5kaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcblxyXG4gICAgY29uc3QgdHJhbnNsYXRpb25zID0gYXdhaXQgdGhpcy50cmFuc2xhdGVTZXJ2aWNlXHJcbiAgICAgIC5nZXQoW1xyXG4gICAgICAgICdSRUdJU1RSQVRJT04uREVMRVRFJyxcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRFTEVURV9DT05GSVJNJyxcclxuICAgICAgICAnQUxFUlQuT0snLFxyXG4gICAgICAgICdBTEVSVC5DQU5DRUwnXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgaGVhZGVyOiB0cmFuc2xhdGlvbnNbJ1JFR0lTVFJBVElPTi5ERUxFVEUnXSxcclxuICAgICAgbWVzc2FnZTogdHJhbnNsYXRpb25zWydSRUdJU1RSQVRJT04uREVMRVRFX0NPTkZJUk0nXSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snQUxFUlQuQ0FOQ0VMJ10sXHJcbiAgICAgICAgICByb2xlOiAnY2FuY2VsJyxcclxuICAgICAgICAgIGNzc0NsYXNzOiAnc2Vjb25kYXJ5J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGV4dDogdHJhbnNsYXRpb25zWydBTEVSVC5PSyddLFxyXG4gICAgICAgICAgaGFuZGxlcjogKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UuZGVsZXRlUmVnaXN0cmF0aW9uRnJvbU9mZmxpbmVTdG9yYWdlKFxyXG4gICAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLmlkXHJcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVSb290KCcnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGFsZXJ0LnByZXNlbnQoKTtcclxuICB9XHJcbn1cclxuIiwiPGlvbi1pdGVtIGNsYXNzPVwic3VtbWFyeS1pdGVtXCIgKGNsaWNrKT1cIm5hdmlnYXRlKClcIiBbZGV0YWlsXT1cIiFyZWFkb25seVwiICpuZ0lmPVwiIShyZWFkb25seSAmJiAhaXRlbS5oYXNEYXRhKVwiPlxyXG4gIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tcGFkZGluZy12ZXJ0aWNhbCBpb24tcGFkZGluZy1lbmRcIj5cclxuICAgIDxoMj57eyBpdGVtLnRpdGxlIHwgdHJhbnNsYXRlfX08L2gyPlxyXG4gICAgPHAgKm5nSWY9XCJpdGVtLnN1YlRpdGxlXCI+XHJcbiAgICAgIHt7IGl0ZW0uc3ViVGl0bGUgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvcD5cclxuICAgIDxwIGNsYXNzPVwiaW1hZ2VzXCIgKm5nSWY9XCJhdHRhY2htZW50c1wiPlxyXG4gICAgICA8cm8tYmxvYi1pbWFnZSAgKm5nRm9yPVwibGV0IGF0dGFjaG1lbnQgb2YgYXR0YWNobWVudHNcIiBbaW1nQmxvYl09XCJhdHRhY2htZW50LmJsb2JcIj48L3JvLWJsb2ItaW1hZ2U+XHJcbiAgICA8L3A+XHJcbiAgPC9pb24tbGFiZWw+XHJcbiAgPGlvbi1pY29uICpuZ0lmPVwiaXRlbS5oYXNEYXRhICYmICFyZWFkb25seVwiIHNsb3Q9XCJlbmRcIiBjb2xvcj1cInN1Y2Nlc3NcIiBuYW1lPVwiY2hlY2ttYXJrLWNpcmNsZVwiPjwvaW9uLWljb24+XHJcbjwvaW9uLWl0ZW0+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVN1bW1hcnlJdGVtIH0gZnJvbSAnLi9zdW1tYXJ5LWl0ZW0ubW9kZWwnO1xyXG5pbXBvcnQgeyBOYXZDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOZ0Rlc3RvcnlCYXNlIH0gZnJvbSAnc3JjL2FwcC9jb3JlL2hlbHBlcnMvb2JzZXJ2YWJsZS1oZWxwZXInO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiwgbWFwLCBvZiwgc3dpdGNoTWFwLCB0YWtlLCB0YWtlVW50aWwsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudFVwbG9hZEVkaXRNb2RlbCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBOZXdBdHRhY2htZW50U2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IEF0dGFjaG1lbnRVcGxvYWRFZGl0TW9kZWxXaXRoQmxvYiB9IGZyb20gJy4uL2FkZC1waWN0dXJlLWl0ZW0vYWRkLXBpY3R1cmUtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9zaGFyZWQvc2VydmljZXMvbG9nZ2luZy9sb2dnaW5nLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ1N1bW1hcnlJdGVtQ29tcG9uZW50JztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc3VtbWFyeS1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc3VtbWFyeS1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zdW1tYXJ5LWl0ZW0uY29tcG9uZW50LnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3VtbWFyeUl0ZW1Db21wb25lbnQgZXh0ZW5kcyBOZ0Rlc3RvcnlCYXNlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpdGVtOiBJU3VtbWFyeUl0ZW07XHJcbiAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcclxuXHJcbiAgYXR0YWNobWVudHM6IEF0dGFjaG1lbnRVcGxvYWRFZGl0TW9kZWxXaXRoQmxvYltdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5hdkNvbnRyb2xsZXI6IE5hdkNvbnRyb2xsZXIsIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgbG9nZ2VyOiBMb2dnaW5nU2VydmljZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMuaXRlbT8uYXR0YWNobWVudHMgIT0gbnVsbCkge1xyXG4gICAgICBvZih0aGlzLml0ZW0uYXR0YWNobWVudHMpXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBtYXAoKGF0dGFjaG1lbnRzKSA9PiBhdHRhY2htZW50cy5maWx0ZXIoKGEpID0+IGEudHlwZSA9PT0gJ25ldycpLm1hcCgoYSkgPT4gYS5hdHRhY2htZW50IGFzIEF0dGFjaG1lbnRVcGxvYWRFZGl0TW9kZWwpKSxcclxuICAgICAgICAgIHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+XHJcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgID8gb2YoW10pXHJcbiAgICAgICAgICAgICAgOiBmb3JrSm9pbihbXHJcbiAgICAgICAgICAgICAgICAgIC4uLmF0dGFjaG1lbnRzLm1hcCgoYSkgPT5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlLmdldEJsb2IodGhpcy5pdGVtLmlkLCBhLmlkKS5waXBlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICAgICAgICAgICAgICAgIG1hcCgoYmxvYikgPT4gKHsgLi4uYSwgYmxvYiB9KSksXHJcbiAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyLCBERUJVR19UQUcsICdDb3VsZCBub3QgZ2V0IGJsb2IgZnJvbSBhdHRhY2htZW50Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih7IC4uLmEsIGJsb2I6IHVuZGVmaW5lZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgKSxcclxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpXHJcbiAgICAgICAgKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hdHRhY2htZW50cyA9IHJlc3VsdDtcclxuICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5hdmlnYXRlKCkge1xyXG4gICAgaWYgKCF0aGlzLnJlYWRvbmx5KSB7XHJcbiAgICAgIHRoaXMubmF2Q29udHJvbGxlci5uYXZpZ2F0ZUZvcndhcmQoW3RoaXMuaXRlbS5ocmVmLCB0aGlzLml0ZW0uaWRdLCB7XHJcbiAgICAgICAgcXVlcnlQYXJhbXM6IHRoaXMuaXRlbS5xdWVyeVBhcmFtc1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVzLCBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBPdmVydmlld1BhZ2UgfSBmcm9tICcuL292ZXJ2aWV3LnBhZ2UnO1xyXG5pbXBvcnQgeyBTZW5kQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zZW5kLWJ1dHRvbi9zZW5kLWJ1dHRvbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdW1tYXJ5SXRlbUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaGFyZWRDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkLWNvbXBvbmVudHMubW9kdWxlJztcclxuaW1wb3J0IHsgRmFpbGVkUmVnaXN0cmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9mYWlsZWQtcmVnaXN0cmF0aW9uL2ZhaWxlZC1yZWdpc3RyYXRpb24uY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2F2ZUFzRHJhZnRSb3V0ZUd1YXJkIH0gZnJvbSAnLi4vc2F2ZS1hcy1kcmFmdC5ndWFyZCc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogT3ZlcnZpZXdQYWdlLFxyXG4gICAgY2FuRGVhY3RpdmF0ZTogW1NhdmVBc0RyYWZ0Um91dGVHdWFyZF1cclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBPdmVydmlld1BhZ2UsXHJcbiAgICBTZW5kQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgU3VtbWFyeUl0ZW1Db21wb25lbnQsXHJcbiAgICBGYWlsZWRSZWdpc3RyYXRpb25Db21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPdmVydmlld1BhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3tcIlJFR0lTVFJBVElPTi5PVkVSVklFVy5USVRMRVwiIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPG5nLWNvbnRhaW5lciAqbmdJZj1cInJlZ2lzdHJhdGlvblwiPlxyXG4gIDxpb24tY29udGVudD5cclxuICAgIDxhcHAtZmFpbGVkLXJlZ2lzdHJhdGlvbiAqbmdJZj1cInJlZ2lzdHJhdGlvbi5zeW5jRXJyb3IgJiYgcmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFJlZ2lzdHJhdGlvblN0YXR1cy5TeW5jXCJcclxuICAgICAgW3JlZ2lzdHJhdGlvbl09XCJyZWdpc3RyYXRpb25cIj48L2FwcC1mYWlsZWQtcmVnaXN0cmF0aW9uPlxyXG4gICAgPGlvbi1saXN0IGxpbmVzPVwiZnVsbFwiPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7XCJSRUdJU1RSQVRJT04uT1ZFUlZJRVcuTVlfT0JTRVJWQVRJT05cIiB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLXN1bW1hcnktaXRlbSBbcmVhZG9ubHldPVwicmVnaXN0cmF0aW9uLnN5bmNTdGF0dXMgPT09IFJlZ2lzdHJhdGlvblN0YXR1cy5TeW5jXCJcclxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdW1tYXJ5SXRlbXM7IHRyYWNrQnk6IHRyYWNrQnlGdW5jdGlvblwiIFtpdGVtXT1cIml0ZW1cIj48L2FwcC1zdW1tYXJ5LWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvaW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1zZW5kLWJ1dHRvbiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiPjwvYXBwLXNlbmQtYnV0dG9uPlxyXG48L25nLWNvbnRhaW5lcj4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgTmV3QXR0YWNobWVudFNlcnZpY2UsXHJcbiAgUmVnaXN0cmF0aW9uU2VydmljZSBhcyBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlXHJcbn0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLnNlcnZpY2VzJztcclxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJUmVnaXN0cmF0aW9uLCBSZWdpc3RyYXRpb25UaWQsIFN5bmNTdGF0dXMgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgVXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1ncm91cC91c2VyLWdyb3VwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IElTdW1tYXJ5SXRlbSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3VtbWFyeS1pdGVtL3N1bW1hcnktaXRlbS5tb2RlbCc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3VtbWFyeUl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc3VtbWFyeS1pdGVtLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nRGVzdG9yeUJhc2UgfSBmcm9tICdzcmMvYXBwL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcbmltcG9ydCBkZWVwRXF1YWwgZnJvbSAnZmFzdC1kZWVwLWVxdWFsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW92ZXJ2aWV3JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vb3ZlcnZpZXcucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vdmVydmlldy5wYWdlLnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3ZlcnZpZXdQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIFJlZ2lzdGF0aW9uVGlkID0gUmVnaXN0cmF0aW9uVGlkO1xyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuICBSZWdpc3RyYXRpb25TdGF0dXMgPSBTeW5jU3RhdHVzO1xyXG4gIHN1bW1hcnlJdGVtczogQXJyYXk8SVN1bW1hcnlJdGVtPiA9IFtdO1xyXG4gIHByaXZhdGUgcmVnaXN0cmF0aW9uJDogT2JzZXJ2YWJsZTxJUmVnaXN0cmF0aW9uPjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29tbW9uUmVnaXN0cmF0aW9uU2VydmljZTogQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSBzdW1tYXJ5SXRlbVNlcnZpY2U6IFN1bW1hcnlJdGVtU2VydmljZSxcclxuICAgIHByaXZhdGUgdXNlckdyb3VwU2VydmljZTogVXNlckdyb3VwU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24kID0gdGhpcy5jb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLmdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkKGlkKTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uJC5waXBlKHRha2VVbnRpbCh0aGlzLm5nRGVzdHJveSQpKS5zdWJzY3JpYmUoKHJlZ2lzdHJhdGlvbikgPT4ge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHJlZ2lzdHJhdGlvbjtcclxuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmluaXRTdW1tYXJ5SXRlbVN1YnNjcmlwdGlvbigpO1xyXG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLnVwZGF0ZVVzZXJHcm91cHMoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFN1bW1hcnlJdGVtU3Vic2NyaXB0aW9uKCkge1xyXG4gICAgdGhpcy5yZWdpc3RyYXRpb24kXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIHN3aXRjaE1hcCgocmVnKSA9PlxyXG4gICAgICAgICAgY29tYmluZUxhdGVzdChbdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldFVzZXJHcm91cHNBc09ic2VydmFibGUoKSwgdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5nZXRBdHRhY2htZW50cyhyZWcuaWQpXSkucGlwZShcclxuICAgICAgICAgICAgc3dpdGNoTWFwKChbdXNlckdyb3Vwc10pID0+IGZyb20odGhpcy5zdW1tYXJ5SXRlbVNlcnZpY2UuZ2V0U3VtbWFyeUl0ZW1zKHJlZywgdXNlckdyb3VwcykpKVxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IGRlZXBFcXVhbChhLCBiKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKChzdW1tYXJ5SXRlbXMpID0+IHtcclxuICAgICAgICB0aGlzLnN1bW1hcnlJdGVtcyA9IHN1bW1hcnlJdGVtcztcclxuICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJhY2tCeUZ1bmN0aW9uKGluZGV4OiBudW1iZXIsIGl0ZW06IElTdW1tYXJ5SXRlbSkge1xyXG4gICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW0uaHJlZjtcclxuICB9XHJcbn1cclxuIl19