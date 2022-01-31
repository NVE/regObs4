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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_water_damage_damage_module_ts"], {
    /***/
    59325: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DamageObsComponent": function DamageObsComponent() {
          return (
            /* binding */
            _DamageObsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _pages_set_damage_location_set_damage_location_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../pages/set-damage-location/set-damage-location.page */
      10587);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../services/registration.service */
      33181);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function DamageObsComponent_ion_list_4_ng_container_7_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](2, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](3, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "number");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate4"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](2, 4, ctx_r3.damageObs.DamagePosition.Latitude, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](3, 7, "MAP_CENTER_INFO.NORTH_SHORT"), ", ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](4, 9, ctx_r3.damageObs.DamagePosition.Longitude, "0.3"), "\xB0", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 12, "MAP_CENTER_INFO.EAST_SHORT"), " ");
        }
      }

      function DamageObsComponent_ion_list_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-list", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-item", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function DamageObsComponent_ion_list_4_Template_ion_item_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r4.setDamagePosition();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-label", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "ion-text", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "ion-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, DamageObsComponent_ion_list_4_ng_container_7_Template, 6, 14, "ng-container", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "ion-item", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ion-label", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "app-add-picture-item", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "app-text-comment", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("valueChange", function DamageObsComponent_ion_list_4_Template_app_text_comment_valueChange_13_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r6.damageObs.Comment = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](4, 9, "REGISTRATION.WATER.DAMAGE.WHERE_IS_DAMAGE_LOCATION"));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.damageObs.DamagePosition)("ngIfElse", _r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](11, 11, "REGISTRATION.WATER.DAMAGE.IMAGE_OF_DAMAGES"));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.damageObs.Comment);
        }
      }

      function DamageObsComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "translate");
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 1, "REGISTRATION.WATER.DAMAGE.ADD_DAMAGE_LOCATION"), "\n");
        }
      }

      var _DamageObsComponent = /*#__PURE__*/function () {
        function _DamageObsComponent(ngZone, modalController, registrationService) {
          _classCallCheck(this, _DamageObsComponent);

          this.ngZone = ngZone;
          this.modalController = modalController;
          this.registrationService = registrationService;
        }

        _createClass(_DamageObsComponent, [{
          key: "damageObs",
          get: function get() {
            var _this = this;

            if (this.registration && this.registration.request && this.registration.request.DamageObs) {
              return this.registration.request.DamageObs.find(function (x) {
                return x.DamageTypeTID === _this.damageTypeId;
              });
            }

            return undefined;
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            if (this.damageObs) {
              this.isSelected = true;
            } else {
              this.isSelected = false;
            }

            if (this.damageObs && this.damageObs.Attachments === undefined) {
              this.damageObs.Attachments = [];
            }
          }
        }, {
          key: "toggleDamageType",
          value: function toggleDamageType() {
            this.isSelected = !this.isSelected;
          }
        }, {
          key: "onCheckedChange",
          value: function onCheckedChange() {
            var _this2 = this;

            if (this.isSelected) {
              if (!this.damageObs) {
                this.registration.request.DamageObs.push({
                  DamageTypeTID: this.damageTypeId,
                  Attachments: []
                });
              }
            } else {
              this.registration.request.DamageObs = this.registration.request.DamageObs.filter(function (x) {
                return x.DamageTypeTID !== _this2.damageTypeId;
              });
            }

            this.save();
          }
        }, {
          key: "save",
          value: function save() {
            return this.registrationService.saveRegistrationAsync(this.registration);
          }
        }, {
          key: "getSaveFunc",
          value: function getSaveFunc() {
            var _this3 = this;

            return function () {
              return _this3.save();
            };
          }
        }, {
          key: "setDamagePosition",
          value: function setDamagePosition() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var fromLatLng, modal, result, obs;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      fromLatLng = this.registration.request.ObsLocation ? leaflet__WEBPACK_IMPORTED_MODULE_1__.latLng(this.registration.request.ObsLocation.Latitude, this.registration.request.ObsLocation.Longitude) : null;
                      _context.next = 3;
                      return this.modalController.create({
                        component: _pages_set_damage_location_set_damage_location_page__WEBPACK_IMPORTED_MODULE_2__.SetDamageLocationPage,
                        componentProps: {
                          fromLatLng: fromLatLng,
                          damageObs: this.damageObs,
                          geoHazard: this.registration.geoHazard
                        }
                      });

                    case 3:
                      modal = _context.sent;
                      modal.present();
                      _context.next = 7;
                      return modal.onDidDismiss();

                    case 7:
                      result = _context.sent;

                      if (!result.data) {
                        _context.next = 13;
                        break;
                      }

                      obs = result.data;
                      this.damageObs.DamagePosition = {
                        Latitude: obs.Latitude,
                        Longitude: obs.Longitude
                      };
                      _context.next = 13;
                      return this.save();

                    case 13:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }]);

        return _DamageObsComponent;
      }();

      _DamageObsComponent.ɵfac = function DamageObsComponent_Factory(t) {
        return new (t || _DamageObsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_3__.RegistrationService));
      };

      _DamageObsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _DamageObsComponent,
        selectors: [["app-damage-obs"]],
        inputs: {
          damageTypeId: "damageTypeId",
          damageTypeName: "damageTypeName",
          registration: "registration",
          registrationTid: "registrationTid"
        },
        decls: 7,
        vars: 3,
        consts: [["mode", "md", "slot", "start", 3, "ngModel", "ngModelChange", "ionChange"], ["lines", "none", "class", "no-border ion-no-margin", 4, "ngIf"], ["noDamagePosition", ""], ["lines", "none", 1, "no-border", "ion-no-margin"], ["detail", "false", 3, "click"], ["color", "medium", "position", "stacked", 1, "ion-text-uppercase"], [1, "ion-align-self-start", "ion-text-wrap"], ["color", "primary", "name", "location", 1, "add-icon"], [4, "ngIf", "ngIfElse"], [1, "label-only"], ["iconColor", "primary", "pictureCommentText", "", "pictureCommentPlaceholder", "REGISTRATION.INCIDENT.IMAGE_PLACEHOLDER", 3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], ["title", "REGISTRATION.WATER.DAMAGE.COMMENT", "placeholder", "REGISTRATION.WATER.DAMAGE.COMMENT_PLACEHOLDER", 3, "value", "valueChange"]],
        template: function DamageObsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-item");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-checkbox", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function DamageObsComponent_Template_ion_checkbox_ngModelChange_1_listener($event) {
              return ctx.isSelected = $event;
            })("ionChange", function DamageObsComponent_Template_ion_checkbox_ionChange_1_listener() {
              return ctx.onCheckedChange();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-label");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, DamageObsComponent_ion_list_4_Template, 14, 13, "ion-list", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, DamageObsComponent_ng_template_5_Template, 2, 3, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.isSelected);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.damageTypeName);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.isSelected && ctx.damageObs);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_4__.AddPictureItemComponent, _text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DecimalPipe],
        styles: [".label-only[_ngcontent-%COMP%] {\n  --min-height: 31px;\n}\n\nion-list[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  --image-wrapper-padding-bottom: 0px;\n  --images-background: #fff;\n  --image-wrapper-margin-left: 16px;\n  --image-wrapper-margin-right: 16px;\n  --image-wrapper-background: var(--ion-background-color);\n  --image-comment-background: rgba(0,0,0,0);\n}\n\nion-list[_ngcontent-%COMP%]   app-picture-item[_ngcontent-%COMP%] {\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhbWFnZS1vYnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxrQkFBQTtBQUFKOztBQUdBO0VBQ0ksbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQ0FBQTtFQUNBLHVEQUFBO0VBQ0EseUNBQUE7QUFBSjs7QUFFSTtFQUNJLGtCQUFBO0VBQ0EscUJBQUE7QUFBUiIsImZpbGUiOiJkYW1hZ2Utb2JzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sYWJlbC1vbmx5IHtcclxuICAgIC0tbWluLWhlaWdodDogMzFweDtcclxufVxyXG5cclxuaW9uLWxpc3Qge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1wYWRkaW5nLWJvdHRvbTogMHB4O1xyXG4gICAgLS1pbWFnZXMtYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tbGVmdDogMTZweDtcclxuICAgIC0taW1hZ2Utd3JhcHBlci1tYXJnaW4tcmlnaHQ6IDE2cHg7XHJcbiAgICAtLWltYWdlLXdyYXBwZXItYmFja2dyb3VuZDogdmFyKC0taW9uLWJhY2tncm91bmQtY29sb3IpO1xyXG4gICAgLS1pbWFnZS1jb21tZW50LWJhY2tncm91bmQ6IHJnYmEoMCwwLDAsMCk7XHJcblxyXG4gICAgYXBwLXBpY3R1cmUtaXRlbSB7XHJcbiAgICAgICAgLS1wYWRkaW5nLXRvcDogMHB4O1xyXG4gICAgICAgIC0tcGFkZGluZy1ib3R0b206IDBweDtcclxuICAgIH1cclxufSJdfQ== */"]
      });
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
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var leaveText;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.translateService.get('REGISTRATION.REQUIRED_FIELDS_MISSING').toPromise();

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
          key: "confirmReset",
          value: function confirmReset(registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var leaveText;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.translateService.get('REGISTRATION.CONFIRM_RESET').toPromise();

                    case 2:
                      leaveText = _context3.sent;
                      return _context3.abrupt("return", this.createResetDialog(leaveText, registration, registrationTid, onReset));

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "createResetDialog",
          value: function createResetDialog(message, registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var translations, alert, result, reset;
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.translateService.get(['DIALOGS.CANCEL', 'DIALOGS.YES']).toPromise();

                    case 2:
                      translations = _context4.sent;
                      _context4.next = 5;
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
                      alert = _context4.sent;
                      _context4.next = 8;
                      return alert.present();

                    case 8:
                      _context4.next = 10;
                      return alert.onDidDismiss();

                    case 10:
                      result = _context4.sent;
                      reset = result.role !== 'cancel';

                      if (!reset) {
                        _context4.next = 15;
                        break;
                      }

                      _context4.next = 15;
                      return this.reset(registration, registrationTid, onReset);

                    case 15:
                      return _context4.abrupt("return", reset);

                    case 16:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "reset",
          value: function reset(registration, registrationTid, onReset) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var _this4 = this;

              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      this.Zone.run(function () {
                        if (registrationTid) {
                          registration.request[(0, src_app_modules_common_registration_registration_helpers__WEBPACK_IMPORTED_MODULE_0__.getPropertyName)(registrationTid)] = _this4.getDefaultValue(registrationTid);

                          _this4.resetImages(registration);
                        }

                        if (onReset) {
                          onReset();
                        }
                      });
                      _context5.next = 3;
                      return this.registrationService.saveRegistrationAsync(registration);

                    case 3:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
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
            var _this5 = this;

            this.newAttachmentService.getAttachments(registration.id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.switchMap)(function (attachments) {
              return (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.forkJoin)(attachments.map(function (a) {
                return _this5.newAttachmentService.removeAttachment(registration.id, a.id);
              }));
            })).subscribe(function () {
              _this5.loggingService.debug('Reset images complete', DEBUG_TAG);
            }, function (error) {
              _this5.loggingService.error(error, DEBUG_TAG, 'Could not reset images');
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
          var _this6;

          _classCallCheck(this, _BasePage);

          _this6 = _super.call(this);
          _this6.basePageService = basePageService;
          _this6.activatedRoute = activatedRoute;
          _this6.registrationTid = registrationTid;
          return _this6;
        }

        _createClass(_BasePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            var _this7 = this;

            var id = this.activatedRoute.snapshot.params['id'];
            this.basePageService.CommonRegistrationService.getRegistrationByIdShared$(id).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(function (reg) {
              _this7.basePageService.createDefaultProps(reg, _this7.registrationTid);

              return reg;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(function (reg) {
              _this7.registration = reg;
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.switchMap)(function () {
              return _this7.createInitObservable();
            }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.takeUntil)(this.ngDestroy$)).subscribe();
          } // NOTE: Remember to add canDeactivate: [CanDeactivateRouteGuard] in page module

        }, {
          key: "canLeave",
          value: function canLeave() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var _this8 = this;

              var valid, isEmpty;
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return Promise.resolve(this.isValid ? this.isValid() : true);

                    case 2:
                      valid = _context6.sent;
                      _context6.next = 5;
                      return Promise.resolve(this.isEmpty());

                    case 5:
                      isEmpty = _context6.sent;

                      if (!(!isEmpty && !valid)) {
                        _context6.next = 8;
                        break;
                      }

                      return _context6.abrupt("return", this.basePageService.confirmLeave(this.registration, this.registrationTid, function () {
                        return _this8.onReset ? _this8.onReset() : null;
                      }));

                    case 8:
                      return _context6.abrupt("return", true);

                    case 9:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
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
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!this.onBeforeLeave) {
                        _context7.next = 3;
                        break;
                      }

                      _context7.next = 3;
                      return Promise.resolve(this.onBeforeLeave());

                    case 3:
                      _context7.next = 5;
                      return this.save(true);

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
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
            var _this9 = this;

            return function () {
              return _this9.save();
            };
          }
        }, {
          key: "isEmpty",
          value: function isEmpty() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.basePageService.CommonRegistrationService.hasAnyDataToShowInRegistrationTypes(this.registration, this.registrationTid).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.take)(1)).toPromise();

                    case 2:
                      return _context8.abrupt("return", !_context8.sent);

                    case 3:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "reset",
          value: function reset() {
            var _this10 = this;

            return this.basePageService.confirmReset(this.registration, this.registrationTid, function () {
              return _this10.onReset ? _this10.onReset() : null;
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
    64670: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetDamageLocationPageModule": function SetDamageLocationPageModule() {
          return (
            /* binding */
            _SetDamageLocationPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _set_damage_location_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./set-damage-location.page */
      10587);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SetDamageLocationPageModule = function _SetDamageLocationPageModule() {
        _classCallCheck(this, _SetDamageLocationPageModule);
      };

      _SetDamageLocationPageModule.ɵfac = function SetDamageLocationPageModule_Factory(t) {
        return new (t || _SetDamageLocationPageModule)();
      };

      _SetDamageLocationPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _SetDamageLocationPageModule
      });
      _SetDamageLocationPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_SetDamageLocationPageModule, {
          declarations: [_set_damage_location_page__WEBPACK_IMPORTED_MODULE_0__.SetDamageLocationPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    10587: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetDamageLocationPage": function SetDamageLocationPage() {
          return (
            /* binding */
            _SetDamageLocationPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../../core/helpers/is-empty.helper */
      69579);
      /* harmony import */


      var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../components/set-location-in-map/set-location-in-map.component */
      5717);
      /* harmony import */


      var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../core/services/fullscreen/fullscreen.service */
      13653);
      /* harmony import */


      var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../core/services/swipe-back/swipe-back.service */
      84716);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function SetDamageLocationPage_ion_header_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header");

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "ion-toolbar", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-buttons", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ion-button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SetDamageLocationPage_ion_header_0_Template_ion_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r2.cancel();
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
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](5, 2, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](8, 4, "REGISTRATION.SET_DAMAGE_LOCATION.TITLE"), " ");
        }
      }

      function SetDamageLocationPage_app_set_location_in_map_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "app-set-location-in-map", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("locationSet", function SetDamageLocationPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

            return ctx_r4.onLocationSet($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("fromMarker", ctx_r1.fromMarker)("locationMarker", ctx_r1.locationMarker)("locationMarkerIconUrl", ctx_r1.locationMarkerIconUrl)("showPreviousUsedLocations", false);
        }
      }

      var _SetDamageLocationPage = /*#__PURE__*/function () {
        function _SetDamageLocationPage(modalController, swipeBackService, fullscreenService) {
          _classCallCheck(this, _SetDamageLocationPage);

          this.modalController = modalController;
          this.swipeBackService = swipeBackService;
          this.fullscreenService = fullscreenService;
          this.locationMarkerIconUrl = '/assets/icon/map/damage-location.svg';
          this.fullscreen$ = this.fullscreenService.isFullscreen$;
        }

        _createClass(_SetDamageLocationPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              var obsLocationIcon, latLng, damageLocationIcon;
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      if (this.fromLatLng) {
                        obsLocationIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                          iconUrl: '/assets/icon/map/obs-location.svg',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          shadowUrl: 'leaflet/marker-shadow.png',
                          shadowSize: [41, 41]
                        });
                        this.fromMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.fromLatLng, {
                          icon: obsLocationIcon
                        });
                      }

                      if (this.damageObs && !_core_helpers_is_empty_helper__WEBPACK_IMPORTED_MODULE_1__.IsEmptyHelper.isEmpty(this.damageObs.DamagePosition)) {
                        latLng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.damageObs.DamagePosition.Latitude, this.damageObs.DamagePosition.Longitude);
                        damageLocationIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                          iconUrl: this.locationMarkerIconUrl,
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          shadowUrl: 'leaflet/marker-shadow.png',
                          shadowSize: [41, 41]
                        });
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(latLng, {
                          icon: damageLocationIcon
                        });
                      }

                    case 2:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "ionViewDidEnter",
          value: function ionViewDidEnter() {
            this.swipeBackService.disableSwipeBack();
          }
        }, {
          key: "ionViewWillLeave",
          value: function ionViewWillLeave() {
            this.swipeBackService.enableSwipeBack();
          }
        }, {
          key: "onLocationSet",
          value: function onLocationSet(event) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      this.modalController.dismiss(event);

                    case 1:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }, {
          key: "cancel",
          value: function cancel() {
            this.modalController.dismiss();
          }
        }, {
          key: "ok",
          value: function ok() {
            this.setLocationInMapComponent.confirmLocation();
          }
        }]);

        return _SetDamageLocationPage;
      }();

      _SetDamageLocationPage.ɵfac = function SetDamageLocationPage_Factory(t) {
        return new (t || _SetDamageLocationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_4__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_3__.FullscreenService));
      };

      _SetDamageLocationPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
        type: _SetDamageLocationPage,
        selectors: [["app-set-damage-location"]],
        viewQuery: function SetDamageLocationPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__.SetLocationInMapComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
          }
        },
        inputs: {
          damageObs: "damageObs",
          geoHazard: "geoHazard",
          fromLatLng: "fromLatLng"
        },
        decls: 4,
        vars: 4,
        consts: [[4, "ngIf"], ["confirmLocationText", "REGISTRATION.SET_DAMAGE_LOCATION.CONFIRM_TEXT", "fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", "locationTitle", "REGISTRATION.SET_DAMAGE_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "locationMarkerIconUrl", "showPreviousUsedLocations", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["confirmLocationText", "REGISTRATION.SET_DAMAGE_LOCATION.CONFIRM_TEXT", "fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", "locationTitle", "REGISTRATION.SET_DAMAGE_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "locationMarkerIconUrl", "showPreviousUsedLocations", "locationSet"]],
        template: function SetDamageLocationPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](0, SetDamageLocationPage_ion_header_0_Template, 9, 6, "ion-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, SetDamageLocationPage_app_set_location_in_map_3_Template, 1, 5, "app-set-location-in-map", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.fromMarker);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_5__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_2__.SetLocationInMapComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXQtZGFtYWdlLWxvY2F0aW9uLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    63895: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DamagePageModule": function DamagePageModule() {
          return (
            /* binding */
            _DamagePageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _damage_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./damage.page */
      22991);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../shared-components.module */
      22623);
      /* harmony import */


      var _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../components/damage-obs/damage-obs.component */
      59325);
      /* harmony import */


      var _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../set-damage-location/set-damage-location.module */
      64670);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _damage_page__WEBPACK_IMPORTED_MODULE_0__.DamagePage
      }];

      var _DamagePageModule = function _DamagePageModule() {
        _classCallCheck(this, _DamagePageModule);
      };

      _DamagePageModule.ɵfac = function DamagePageModule_Factory(t) {
        return new (t || _DamagePageModule)();
      };

      _DamagePageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
        type: _DamagePageModule
      });
      _DamagePageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__.SetDamageLocationPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](_DamagePageModule, {
          declarations: [_damage_page__WEBPACK_IMPORTED_MODULE_0__.DamagePage, _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_2__.DamageObsComponent],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _set_damage_location_set_damage_location_module__WEBPACK_IMPORTED_MODULE_3__.SetDamageLocationPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    22991: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DamagePage": function DamagePage() {
          return (
            /* binding */
            _DamagePage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../base.page */
      81877);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../../core/services/kdv/kdv.service */
      88430);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../base-page-service */
      35140);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! rxjs/operators */
      49005);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../components/damage-obs/damage-obs.component */
      59325);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-damage-obs", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("registrationChange", function DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template_app_damage_obs_registrationChange_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);

            return ctx_r4.registration = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var damageType_r3 = ctx.$implicit;

          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("registration", ctx_r2.registration)("damageTypeId", damageType_r3.Id)("damageTypeName", damageType_r3.Name)("registrationTid", ctx_r2.registrationTid);
        }
      }

      function DamagePage_app_registration_content_wrapper_8_ng_container_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, DamagePage_app_registration_content_wrapper_8_ng_container_17_app_damage_obs_5_Template, 1, 4, "app-damage-obs", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 2, "REGISTRATION.WATER.DAMAGE.WHAT_IS_DAMAGED"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r1.damageTypes);
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "selected": a0
        };
      };

      function DamagePage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("reset", function DamagePage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r6.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-list-header", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](5, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "ion-radio-group", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function DamagePage_app_registration_content_wrapper_8_Template_ion_radio_group_ngModelChange_6_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r8.isChecked = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function DamagePage_app_registration_content_wrapper_8_Template_ion_item_click_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r9.isChecked = true;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](10, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "ion-radio", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-item", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function DamagePage_app_registration_content_wrapper_8_Template_ion_item_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r7);

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

            return ctx_r10.isChecked = false;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](15, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "ion-radio", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, DamagePage_app_registration_content_wrapper_8_ng_container_17_Template, 6, 4, "ng-container", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](5, 11, "REGISTRATION.WATER.DAMAGE.CAN_YOU_SEE_DAMAGE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.isChecked);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](17, _c0, ctx_r0.checked === true));

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](10, 13, "DIALOGS.YES"));

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", true);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction1"](19, _c0, ctx_r0.checked === false));

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](15, 15, "DIALOGS.NO"));

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", false);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.isChecked && ctx_r0.damageTypes);
        }
      }

      var NO_DAMAGE_VISIBLE = 7;

      var _DamagePage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_DamagePage, _base_page__WEBPACK_I);

        var _super2 = _createSuper(_DamagePage);

        function _DamagePage(basePageService, activatedRoute, kdvService, ngZone) {
          var _this11;

          _classCallCheck(this, _DamagePage);

          _this11 = _super2.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_1__.RegistrationTid.DamageObs, basePageService, activatedRoute);
          _this11.kdvService = kdvService;
          _this11.ngZone = ngZone;
          return _this11;
        }

        _createClass(_DamagePage, [{
          key: "isChecked",
          get: function get() {
            if (!this.registration || !this.registration.request || !this.registration.request.DamageObs || this.registration.request.DamageObs.length === 0) {
              return this.checked;
            }

            return this.registration && this.registration.request.DamageObs.filter(function (x) {
              return x.DamageTypeTID !== NO_DAMAGE_VISIBLE;
            }).length > 0;
          },
          set: function set(val) {
            this.checked = val;

            if (val === false) {
              this.registration.request.DamageObs = [{
                DamageTypeTID: NO_DAMAGE_VISIBLE
              }];
            } else {
              this.registration.request.DamageObs = this.registration.request.DamageObs.filter(function (x) {
                return x.DamageTypeTID !== NO_DAMAGE_VISIBLE;
              });
            }
          }
        }, {
          key: "onInit",
          value: function onInit() {
            var _this12 = this;

            var geoHazardName = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_8__.GeoHazard[this.registration.geoHazard];
            this.kdvSubscription = this.kdvService.getKdvRepositoryByKeyObservable("".concat(geoHazardName, "_DamageTypeKDV")).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(function (val) {
              return val.filter(function (x) {
                return x.Id !== NO_DAMAGE_VISIBLE;
              });
            })).subscribe(function (kdvElements) {
              _this12.ngZone.run(function () {
                _this12.damageTypes = kdvElements;
              });
            });
          }
        }, {
          key: "onBeforeLeave",
          value: function onBeforeLeave() {
            if (this.kdvSubscription) {
              this.kdvSubscription.unsubscribe();
            }
          }
        }]);

        return _DamagePage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _DamagePage.ɵfac = function DamagePage_Factory(t) {
        return new (t || _DamagePage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_3__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_core_services_kdv_kdv_service__WEBPACK_IMPORTED_MODULE_2__.KdvService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgZone));
      };

      _DamagePage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
        type: _DamagePage,
        selectors: [["app-damage"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], [1, "ion-text-uppercase"], [3, "ngModel", "ngModelChange"], [3, "ngClass", "click"], ["mode", "md", "slot", "start", 3, "value"], [4, "ngIf"], [3, "registration", "damageTypeId", "damageTypeName", "registrationTid", "registrationChange", 4, "ngFor", "ngForOf"], [3, "registration", "damageTypeId", "damageTypeName", "registrationTid", "registrationChange"]],
        template: function DamagePage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "ion-buttons", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "ion-back-button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "ion-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](6, "translate");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, DamagePage_app_registration_content_wrapper_8_Template, 18, 21, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](6, 2, "REGISTRATION.WATER.DAMAGE.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.registration);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_5__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.SelectValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonItem, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgClass, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.RadioValueAccessor, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _components_damage_obs_damage_obs_component__WEBPACK_IMPORTED_MODULE_6__.DamageObsComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkYW1hZ2UucGFnZS5zY3NzIn0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MEksZUFBTCxHQUF1QixLQUFLTixVQUFMLENBQ3BCTywrQkFEb0IsV0FDZUgsYUFEZixxQkFFcEI3RixJQUZvQixDQUVmLHFEQUFJLFVBQUM0RixHQUFEO0FBQUEscUJBQVNBLEdBQUcsQ0FBQ25KLE1BQUosQ0FBVyxVQUFDUixDQUFEO0FBQUEsdUJBQU9BLENBQUMsQ0FBQ2dLLEVBQUYsS0FBU1YsaUJBQWhCO0FBQUEsZUFBWCxDQUFUO0FBQUEsYUFBSixDQUZlLEVBR3BCbEYsU0FIb0IsQ0FHVixVQUFDNkYsV0FBRCxFQUFnQjtBQUN6QixxQkFBSSxDQUFDeEssTUFBTCxDQUFZZ0UsR0FBWixDQUFnQixZQUFLO0FBQ25CLHVCQUFJLENBQUN5RyxXQUFMLEdBQW1CRCxXQUFuQjtBQUNELGVBRkQ7QUFHRCxhQVBvQixDQUF2QjtBQVFEOzs7aUJBRUQseUJBQWE7QUFDWCxnQkFBSSxLQUFLSCxlQUFULEVBQTBCO0FBQ3hCLG1CQUFLQSxlQUFMLENBQXFCSyxXQUFyQjtBQUNEO0FBQ0Y7Ozs7UUEvRDZCQzs7O3lCQUFuQmIsYUFBVWhGO0FBQUE7OztjQUFWZ0Y7QUFBVTNIO0FBQUFnRjtBQUFBNUU7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRGxCdkJvQzs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7O0FBOEJGQTs7OztBQW5DTUE7O0FBQUFBOztBQUsrQkE7O0FBQUFBOzs7Ozs7Ozs7IiwibmFtZXMiOlsiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNl9fIiwiX3IxIiwiY3R4X3IwIiwiRGFtYWdlT2JzQ29tcG9uZW50Iiwibmdab25lIiwibW9kYWxDb250cm9sbGVyIiwicmVnaXN0cmF0aW9uU2VydmljZSIsInJlZ2lzdHJhdGlvbiIsInJlcXVlc3QiLCJEYW1hZ2VPYnMiLCJmaW5kIiwieCIsIkRhbWFnZVR5cGVUSUQiLCJkYW1hZ2VUeXBlSWQiLCJ1bmRlZmluZWQiLCJkYW1hZ2VPYnMiLCJpc1NlbGVjdGVkIiwiQXR0YWNobWVudHMiLCJwdXNoIiwiZmlsdGVyIiwic2F2ZSIsInNhdmVSZWdpc3RyYXRpb25Bc3luYyIsImZyb21MYXRMbmciLCJPYnNMb2NhdGlvbiIsImxlYWZsZXRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIkxhdGl0dWRlIiwiTG9uZ2l0dWRlIiwiY3JlYXRlIiwiY29tcG9uZW50IiwiX3BhZ2VzX3NldF9kYW1hZ2VfbG9jYXRpb25fc2V0X2RhbWFnZV9sb2NhdGlvbl9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJjb21wb25lbnRQcm9wcyIsImdlb0hhemFyZCIsIm1vZGFsIiwicHJlc2VudCIsIm9uRGlkRGlzbWlzcyIsInJlc3VsdCIsImRhdGEiLCJvYnMiLCJEYW1hZ2VQb3NpdGlvbiIsInNlbGVjdG9ycyIsImlucHV0cyIsImRhbWFnZVR5cGVOYW1lIiwicmVnaXN0cmF0aW9uVGlkIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiLCJjdHgiLCJERUJVR19UQUciLCJCYXNlUGFnZVNlcnZpY2UiLCJuZXdBdHRhY2htZW50U2VydmljZSIsImNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UiLCJhbGVydENvbnRyb2xsZXIiLCJ0cmFuc2xhdGVTZXJ2aWNlIiwibG9nZ2luZ1NlcnZpY2UiLCJvblJlc2V0IiwiZ2V0IiwidG9Qcm9taXNlIiwibGVhdmVUZXh0IiwiY3JlYXRlUmVzZXREaWFsb2ciLCJtZXNzYWdlIiwidHJhbnNsYXRpb25zIiwiYnV0dG9ucyIsInRleHQiLCJyb2xlIiwiYWxlcnQiLCJyZXNldCIsIlpvbmUiLCJydW4iLCJnZXREZWZhdWx0VmFsdWUiLCJyZXNldEltYWdlcyIsInByb3BOYW1lIiwiZ2V0QXR0YWNobWVudHMiLCJpZCIsInBpcGUiLCJhdHRhY2htZW50cyIsIm1hcCIsImEiLCJyZW1vdmVBdHRhY2htZW50Iiwic3Vic2NyaWJlIiwiZGVidWciLCJlcnJvciIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzdfXyIsImZhY3RvcnkiLCJwcm92aWRlZEluIiwiQmFzZVBhZ2UiLCJiYXNlUGFnZVNlcnZpY2UiLCJhY3RpdmF0ZWRSb3V0ZSIsInNuYXBzaG90IiwicGFyYW1zIiwiQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSIsImdldFJlZ2lzdHJhdGlvbkJ5SWRTaGFyZWQkIiwicmVnIiwiY3JlYXRlRGVmYXVsdFByb3BzIiwiY3JlYXRlSW5pdE9ic2VydmFibGUiLCJuZ0Rlc3Ryb3kkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJpc1ZhbGlkIiwidmFsaWQiLCJpc0VtcHR5IiwiY29uZmlybUxlYXZlIiwib25Jbml0Iiwib25CZWZvcmVMZWF2ZSIsImNsZWFuIiwic3luY1N0YXR1cyIsInNyY19hcHBfbW9kdWxlc19jb21tb25fcmVnaXN0cmF0aW9uX3JlZ2lzdHJhdGlvbl9tb2RlbHNfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsIlJlZ2lzdHJhdGlvblNlcnZpY2UiLCJoYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyIsImNvbmZpcm1SZXNldCIsInBhdGhGcm9tUm9vdCIsInYiLCJ1cmwiLCJzZWdtZW50IiwidG9TdHJpbmciLCJqb2luIiwicGF0aCIsIl9jb3JlX2hlbHBlcnNfb2JzZXJ2YWJsZV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzJfXyIsIl9hbmd1bGFyX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzExX18iLCJmZWF0dXJlcyIsIlNldERhbWFnZUxvY2F0aW9uUGFnZU1vZHVsZSIsIl9zaGFyZWRfY29tcG9uZW50c19tb2R1bGVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImRlY2xhcmF0aW9ucyIsIl9zZXRfZGFtYWdlX2xvY2F0aW9uX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImltcG9ydHMiLCJjdHhfcjEiLCJTZXREYW1hZ2VMb2NhdGlvblBhZ2UiLCJzd2lwZUJhY2tTZXJ2aWNlIiwiZnVsbHNjcmVlblNlcnZpY2UiLCJmdWxsc2NyZWVuJCIsImlzRnVsbHNjcmVlbiQiLCJvYnNMb2NhdGlvbkljb24iLCJsZWFmbGV0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpY29uVXJsIiwiaWNvblNpemUiLCJpY29uQW5jaG9yIiwic2hhZG93VXJsIiwic2hhZG93U2l6ZSIsImZyb21NYXJrZXIiLCJpY29uIiwiX2NvcmVfaGVscGVyc19pc19lbXB0eV9oZWxwZXJfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyIsImxhdExuZyIsImRhbWFnZUxvY2F0aW9uSWNvbiIsImxvY2F0aW9uTWFya2VySWNvblVybCIsImxvY2F0aW9uTWFya2VyIiwiZGlzYWJsZVN3aXBlQmFjayIsImVuYWJsZVN3aXBlQmFjayIsImV2ZW50IiwiZGlzbWlzcyIsInNldExvY2F0aW9uSW5NYXBDb21wb25lbnQiLCJjb25maXJtTG9jYXRpb24iLCJ2aWV3UXVlcnkiLCJfY29tcG9uZW50c19zZXRfbG9jYXRpb25faW5fbWFwX3NldF9sb2NhdGlvbl9pbl9tYXBfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJyb3V0ZXMiLCJfZGFtYWdlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsIkRhbWFnZVBhZ2VNb2R1bGUiLCJfc2V0X2RhbWFnZV9sb2NhdGlvbl9zZXRfZGFtYWdlX2xvY2F0aW9uX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfM19fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV81X18iLCJfY29tcG9uZW50c19kYW1hZ2Vfb2JzX2RhbWFnZV9vYnNfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJkYW1hZ2VUeXBlX3IzIiwiY3R4X3IyIiwiTk9fREFNQUdFX1ZJU0lCTEUiLCJEYW1hZ2VQYWdlIiwia2R2U2VydmljZSIsImxlbmd0aCIsImNoZWNrZWQiLCJ2YWwiLCJnZW9IYXphcmROYW1lIiwiX3ZhcnNvbV9yZWdvYnNfY29tbW9uX2NvcmVfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzhfXyIsImtkdlN1YnNjcmlwdGlvbiIsImdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUiLCJJZCIsImtkdkVsZW1lbnRzIiwiZGFtYWdlVHlwZXMiLCJ1bnN1YnNjcmliZSIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2RhbWFnZS1vYnMvZGFtYWdlLW9icy5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9jb21wb25lbnRzL2RhbWFnZS1vYnMvZGFtYWdlLW9icy5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS1wYWdlLXNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvYmFzZS5wYWdlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc2V0LWRhbWFnZS1sb2NhdGlvbi9zZXQtZGFtYWdlLWxvY2F0aW9uLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtZGFtYWdlLWxvY2F0aW9uL3NldC1kYW1hZ2UtbG9jYXRpb24ucGFnZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy93YXRlci9kYW1hZ2UvZGFtYWdlLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy93YXRlci9kYW1hZ2UvZGFtYWdlLnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy93YXRlci9kYW1hZ2UvZGFtYWdlLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiPGlvbi1pdGVtPlxyXG4gIDxpb24tY2hlY2tib3ggbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgWyhuZ01vZGVsKV09XCJpc1NlbGVjdGVkXCIgKGlvbkNoYW5nZSk9XCJvbkNoZWNrZWRDaGFuZ2UoKVwiPjwvaW9uLWNoZWNrYm94PlxyXG4gIDxpb24tbGFiZWw+e3sgZGFtYWdlVHlwZU5hbWUgfX08L2lvbi1sYWJlbD5cclxuPC9pb24taXRlbT5cclxuPGlvbi1saXN0IGxpbmVzPVwibm9uZVwiIGNsYXNzPVwibm8tYm9yZGVyIGlvbi1uby1tYXJnaW5cIiAqbmdJZj1cImlzU2VsZWN0ZWQgJiYgZGFtYWdlT2JzXCI+XHJcbiAgPGlvbi1pdGVtIGRldGFpbD1cImZhbHNlXCIgKGNsaWNrKT1cInNldERhbWFnZVBvc2l0aW9uKClcIj5cclxuICAgIDxpb24tbGFiZWwgY29sb3I9XCJtZWRpdW1cIiBwb3NpdGlvbj1cInN0YWNrZWRcIiBjbGFzcz1cImlvbi10ZXh0LXVwcGVyY2FzZVwiPnt7ICdSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLldIRVJFX0lTX0RBTUFHRV9MT0NBVElPTidcclxuICAgICAgICAgIHwgdHJhbnNsYXRlIH19PC9pb24tbGFiZWw+XHJcbiAgICA8aW9uLXRleHQgY2xhc3M9XCJpb24tYWxpZ24tc2VsZi1zdGFydCBpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgIDxpb24taWNvbiBjbGFzcz1cImFkZC1pY29uXCIgY29sb3I9XCJwcmltYXJ5XCIgbmFtZT1cImxvY2F0aW9uXCI+XHJcbiAgICAgIDwvaW9uLWljb24+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkYW1hZ2VPYnMuRGFtYWdlUG9zaXRpb24gZWxzZSBub0RhbWFnZVBvc2l0aW9uXCI+XHJcbiAgICAgICAge3sgZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxhdGl0dWRlIHwgbnVtYmVyOicwLjMnXHJcbiAgICAgICAgfX0mZGVnO3t7J01BUF9DRU5URVJfSU5GTy5OT1JUSF9TSE9SVCd8dHJhbnNsYXRlfX0sXHJcbiAgICAgICAge3sgZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxvbmdpdHVkZSB8IG51bWJlcjonMC4zJ1xyXG4gICAgICAgIH19JmRlZzt7eydNQVBfQ0VOVEVSX0lORk8uRUFTVF9TSE9SVCd8dHJhbnNsYXRlfX1cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi10ZXh0PlxyXG4gIDwvaW9uLWl0ZW0+XHJcbiAgPGlvbi1pdGVtIGNsYXNzPVwibGFiZWwtb25seVwiPlxyXG4gICAgPGlvbi1sYWJlbCBjb2xvcj1cIm1lZGl1bVwiIHBvc2l0aW9uPVwic3RhY2tlZFwiIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+e3snUkVHSVNUUkFUSU9OLldBVEVSLkRBTUFHRS5JTUFHRV9PRl9EQU1BR0VTJyB8XHJcbiAgICAgIHRyYW5zbGF0ZX19PC9pb24tbGFiZWw+XHJcbiAgPC9pb24taXRlbT5cclxuICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gaWNvbkNvbG9yPVwicHJpbWFyeVwiIFxyXG4gICAgW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgXHJcbiAgICBbcmVnaXN0cmF0aW9uSWRdPVwicmVnaXN0cmF0aW9uLmlkXCIgXHJcbiAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiXHJcbiAgICBwaWN0dXJlQ29tbWVudFRleHQ9XCJcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiXHJcbiAgICBwaWN0dXJlQ29tbWVudFBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLklOQ0lERU5ULklNQUdFX1BMQUNFSE9MREVSXCI+XHJcbiAgPC9hcHAtYWRkLXBpY3R1cmUtaXRlbT5cclxuICA8YXBwLXRleHQtY29tbWVudCB0aXRsZT1cIlJFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuQ09NTUVOVFwiIFsodmFsdWUpXT1cImRhbWFnZU9icy5Db21tZW50XCJcclxuICAgIHBsYWNlaG9sZGVyPVwiUkVHSVNUUkFUSU9OLldBVEVSLkRBTUFHRS5DT01NRU5UX1BMQUNFSE9MREVSXCI+PC9hcHAtdGV4dC1jb21tZW50PlxyXG48L2lvbi1saXN0PlxyXG48bmctdGVtcGxhdGUgI25vRGFtYWdlUG9zaXRpb24+XHJcbiAge3snUkVHSVNUUkFUSU9OLldBVEVSLkRBTUFHRS5BRERfREFNQUdFX0xPQ0FUSU9OJyB8IHRyYW5zbGF0ZSB9fVxyXG48L25nLXRlbXBsYXRlPiIsImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IFNldERhbWFnZUxvY2F0aW9uUGFnZSB9IGZyb20gJy4uLy4uL3BhZ2VzL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5wYWdlJztcclxuaW1wb3J0IHsgT2JzTG9jYXRpb25FZGl0TW9kZWwgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vcmVnb2JzLWFwaSc7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1kYW1hZ2Utb2JzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGFtYWdlLW9icy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZGFtYWdlLW9icy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEYW1hZ2VPYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbWFnZVR5cGVJZDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGRhbWFnZVR5cGVOYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIEBJbnB1dCgpIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG5cclxuICBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG5cclxuICBnZXQgZGFtYWdlT2JzKCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiAmJlxyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0ICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbmQoXHJcbiAgICAgICAgKHgpID0+IHguRGFtYWdlVHlwZVRJRCA9PT0gdGhpcy5kYW1hZ2VUeXBlSWRcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmRhbWFnZU9icykge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5kYW1hZ2VPYnMgJiYgdGhpcy5kYW1hZ2VPYnMuQXR0YWNobWVudHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLmRhbWFnZU9icy5BdHRhY2htZW50cyA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRGFtYWdlVHlwZSgpIHtcclxuICAgIHRoaXMuaXNTZWxlY3RlZCA9ICF0aGlzLmlzU2VsZWN0ZWQ7XHJcbiAgfVxyXG5cclxuICBvbkNoZWNrZWRDaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIGlmICghdGhpcy5kYW1hZ2VPYnMpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbWFnZU9icy5wdXNoKHtcclxuICAgICAgICAgIERhbWFnZVR5cGVUSUQ6IHRoaXMuZGFtYWdlVHlwZUlkLFxyXG4gICAgICAgICAgQXR0YWNobWVudHM6IFtdXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzID0gdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMuZmlsdGVyKFxyXG4gICAgICAgICh4KSA9PiB4LkRhbWFnZVR5cGVUSUQgIT09IHRoaXMuZGFtYWdlVHlwZUlkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbik7XHJcbiAgfVxyXG5cclxuICBnZXRTYXZlRnVuYygpIHtcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnNhdmUoKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNldERhbWFnZVBvc2l0aW9uKCkge1xyXG4gICAgY29uc3QgZnJvbUxhdExuZyA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb25cclxuICAgICAgPyBMLmxhdExuZyhcclxuICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuT2JzTG9jYXRpb24uTGF0aXR1ZGUsXHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgICAgIClcclxuICAgICAgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ29udHJvbGxlci5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IFNldERhbWFnZUxvY2F0aW9uUGFnZSxcclxuICAgICAgY29tcG9uZW50UHJvcHM6IHtcclxuICAgICAgICBmcm9tTGF0TG5nLFxyXG4gICAgICAgIGRhbWFnZU9iczogdGhpcy5kYW1hZ2VPYnMsXHJcbiAgICAgICAgZ2VvSGF6YXJkOiB0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBtb2RhbC5wcmVzZW50KCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBtb2RhbC5vbkRpZERpc21pc3MoKTtcclxuICAgIGlmIChyZXN1bHQuZGF0YSkge1xyXG4gICAgICBjb25zdCBvYnM6IE9ic0xvY2F0aW9uRWRpdE1vZGVsID0gcmVzdWx0LmRhdGE7XHJcbiAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uID0ge1xyXG4gICAgICAgIExhdGl0dWRlOiBvYnMuTGF0aXR1ZGUsXHJcbiAgICAgICAgTG9uZ2l0dWRlOiBvYnMuTG9uZ2l0dWRlXHJcbiAgICAgIH07XHJcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSVJlZ2lzdHJhdGlvbiwgUmVnaXN0cmF0aW9uVGlkIH0gZnJvbSAnc3JjL2FwcC9tb2R1bGVzL2NvbW1vbi1yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLm1vZGVscyc7XHJcbmltcG9ydCB7IGdldFByb3BlcnR5TmFtZSwgaXNBcnJheVR5cGUgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uaGVscGVycyc7XHJcbmltcG9ydCB7IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLCBSZWdpc3RyYXRpb25TZXJ2aWNlIGFzIENvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2UgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24uc2VydmljZXMnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcmVnaXN0cmF0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGVydENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBMb2dnaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9sb2dnaW5nL2xvZ2dpbmcuc2VydmljZSc7XHJcblxyXG5jb25zdCBERUJVR19UQUcgPSAnQmFzZVBhZ2VTZXJ2aWNlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQmFzZVBhZ2VTZXJ2aWNlIHtcclxuICBnZXQgWm9uZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5nWm9uZTtcclxuICB9XHJcblxyXG4gIGdldCBSZWdpc3RyYXRpb25TZXJ2aWNlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cmF0aW9uU2VydmljZTtcclxuICB9XHJcblxyXG4gIGdldCBBbGVydENvbnRyb2xsZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hbGVydENvbnRyb2xsZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgVHJhbnNsYXRlU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBnZXQgQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbW1vblJlZ2lzdHJhdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVnaXN0cmF0aW9uU2VydmljZTogUmVnaXN0cmF0aW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgbmV3QXR0YWNobWVudFNlcnZpY2U6IE5ld0F0dGFjaG1lbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlOiBDb21tb25SZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgYWxlcnRDb250cm9sbGVyOiBBbGVydENvbnRyb2xsZXIsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxvZ2dpbmdTZXJ2aWNlOiBMb2dnaW5nU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgYXN5bmMgY29uZmlybUxlYXZlKHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uUkVRVUlSRURfRklFTERTX01JU1NJTkcnKS50b1Byb21pc2UoKTtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVJlc2V0RGlhbG9nKGxlYXZlVGV4dCwgcmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgY29uZmlybVJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICBjb25zdCBsZWF2ZVRleHQgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZVNlcnZpY2UuZ2V0KCdSRUdJU1RSQVRJT04uQ09ORklSTV9SRVNFVCcpLnRvUHJvbWlzZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUmVzZXREaWFsb2cobGVhdmVUZXh0LCByZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZCwgb25SZXNldCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVJlc2V0RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uLCByZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCwgb25SZXNldD86ICgpID0+IHZvaWQpIHtcclxuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydESUFMT0dTLkNBTkNFTCcsICdESUFMT0dTLllFUyddKS50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGFsZXJ0ID0gYXdhaXQgdGhpcy5hbGVydENvbnRyb2xsZXIuY3JlYXRlKHtcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRleHQ6IHRyYW5zbGF0aW9uc1snRElBTE9HUy5DQU5DRUwnXSxcclxuICAgICAgICAgIHJvbGU6ICdjYW5jZWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0ZXh0OiB0cmFuc2xhdGlvbnNbJ0RJQUxPR1MuWUVTJ11cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgYWxlcnQucHJlc2VudCgpO1xyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgYWxlcnQub25EaWREaXNtaXNzKCk7XHJcbiAgICBjb25zdCByZXNldDogYm9vbGVhbiA9IHJlc3VsdC5yb2xlICE9PSAnY2FuY2VsJztcclxuICAgIGlmIChyZXNldCkge1xyXG4gICAgICBhd2FpdCB0aGlzLnJlc2V0KHJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkLCBvblJlc2V0KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXNldDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHJlc2V0KHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbiwgcmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIG9uUmVzZXQ/OiAoKSA9PiB2b2lkKSB7XHJcbiAgICB0aGlzLlpvbmUucnVuKCgpID0+IHtcclxuICAgICAgaWYgKHJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbi5yZXF1ZXN0W2dldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpXSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKHJlZ2lzdHJhdGlvblRpZCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEltYWdlcyhyZWdpc3RyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvblJlc2V0KSB7XHJcbiAgICAgICAgb25SZXNldCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5zYXZlUmVnaXN0cmF0aW9uQXN5bmMocmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZURlZmF1bHRQcm9wcyhyZWdpc3RyYXRpb246IElSZWdpc3RyYXRpb24sIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkKSB7XHJcbiAgICBjb25zdCBwcm9wTmFtZSA9IGdldFByb3BlcnR5TmFtZShyZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgaWYgKCFyZWdpc3RyYXRpb24ucmVxdWVzdFtwcm9wTmFtZV0pIHtcclxuICAgICAgLy8gSW5pdCB0byBuZXcgb2JqZWN0IGlmIG51bGxcclxuICAgICAgcmVnaXN0cmF0aW9uLnJlcXVlc3RbcHJvcE5hbWVdID0gdGhpcy5nZXREZWZhdWx0VmFsdWUocmVnaXN0cmF0aW9uVGlkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERlZmF1bHRWYWx1ZShyZWdpc3RyYXRpb25UaWQ6IFJlZ2lzdHJhdGlvblRpZCkge1xyXG4gICAgaWYgKGlzQXJyYXlUeXBlKHJlZ2lzdHJhdGlvblRpZCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRJbWFnZXMocmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uKSB7XHJcbiAgICB0aGlzLm5ld0F0dGFjaG1lbnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRBdHRhY2htZW50cyhyZWdpc3RyYXRpb24uaWQpXHJcbiAgICAgIC5waXBlKHN3aXRjaE1hcCgoYXR0YWNobWVudHMpID0+IGZvcmtKb2luKGF0dGFjaG1lbnRzLm1hcCgoYSkgPT4gdGhpcy5uZXdBdHRhY2htZW50U2VydmljZS5yZW1vdmVBdHRhY2htZW50KHJlZ2lzdHJhdGlvbi5pZCwgYS5pZCkpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5kZWJ1ZygnUmVzZXQgaW1hZ2VzIGNvbXBsZXRlJywgREVCVUdfVEFHKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2dnaW5nU2VydmljZS5lcnJvcihlcnJvciwgREVCVUdfVEFHLCAnQ291bGQgbm90IHJlc2V0IGltYWdlcycpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZnJvbSwgb2YgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24sIFJlZ2lzdHJhdGlvblRpZCwgU3luY1N0YXR1cyB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRha2UsIHRha2VVbnRpbCwgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdEZXN0b3J5QmFzZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaGVscGVycy9vYnNlcnZhYmxlLWhlbHBlcic7XHJcblxyXG5ARGlyZWN0aXZlKClcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQYWdlIGV4dGVuZHMgTmdEZXN0b3J5QmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcmVnaXN0cmF0aW9uOiBJUmVnaXN0cmF0aW9uO1xyXG4gIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlO1xyXG4gIHJlZ2lzdHJhdGlvblRpZDogUmVnaXN0cmF0aW9uVGlkO1xyXG4gIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZTtcclxuXHJcbiAgY29uc3RydWN0b3IocmVnaXN0cmF0aW9uVGlkOiBSZWdpc3RyYXRpb25UaWQsIGJhc2VQYWdlU2VydmljZTogQmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmJhc2VQYWdlU2VydmljZSA9IGJhc2VQYWdlU2VydmljZTtcclxuICAgIHRoaXMuYWN0aXZhdGVkUm91dGUgPSBhY3RpdmF0ZWRSb3V0ZTtcclxuICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkID0gcmVnaXN0cmF0aW9uVGlkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7fVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICBjb25zdCBpZCA9IHRoaXMuYWN0aXZhdGVkUm91dGUuc25hcHNob3QucGFyYW1zWydpZCddO1xyXG4gICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5nZXRSZWdpc3RyYXRpb25CeUlkU2hhcmVkJChpZClcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFrZSgxKSxcclxuICAgICAgICBtYXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5iYXNlUGFnZVNlcnZpY2UuY3JlYXRlRGVmYXVsdFByb3BzKHJlZywgdGhpcy5yZWdpc3RyYXRpb25UaWQpO1xyXG4gICAgICAgICAgcmV0dXJuIHJlZztcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXAoKHJlZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSByZWc7XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRoaXMuY3JlYXRlSW5pdE9ic2VydmFibGUoKSksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMubmdEZXN0cm95JClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBvbkluaXQ/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uQmVmb3JlTGVhdmU/KCk6IHZvaWQgfCBQcm9taXNlPGFueT47XHJcblxyXG4gIG9uUmVzZXQ/KCk6IHZvaWQ7XHJcblxyXG4gIGlzVmFsaWQ/KCk6IGJvb2xlYW4gfCBQcm9taXNlPGJvb2xlYW4+O1xyXG5cclxuICAvLyBOT1RFOiBSZW1lbWJlciB0byBhZGQgY2FuRGVhY3RpdmF0ZTogW0NhbkRlYWN0aXZhdGVSb3V0ZUd1YXJkXSBpbiBwYWdlIG1vZHVsZVxyXG4gIGFzeW5jIGNhbkxlYXZlKCkge1xyXG4gICAgLy8gQ2hlY2sgaWYgaW1wbGVtZW50YXRpb24gcGFnZSBoYXMgaW1wbGVtZW50ZWQgY3VzdG9tIGlzVmFsaWQgbG9naWNcclxuICAgIGNvbnN0IHZhbGlkID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRoaXMuaXNWYWxpZCA/IHRoaXMuaXNWYWxpZCgpIDogdHJ1ZSk7XHJcbiAgICAvLyBPbmx5IHJldHVybiBhbGVydCBpZiBwYWdlIGlzIG5vdCBlbXB0eSBhbmQgaW52YWxpZFxyXG4gICAgY29uc3QgaXNFbXB0eSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZSh0aGlzLmlzRW1wdHkoKSk7XHJcbiAgICBpZiAoIWlzRW1wdHkgJiYgIXZhbGlkKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtTGVhdmUodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlSW5pdE9ic2VydmFibGUoKSB7XHJcbiAgICBpZiAodGhpcy5vbkluaXQpIHtcclxuICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5yZXNvbHZlKHRoaXMub25Jbml0KCkpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvZih7fSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgaWYgKHRoaXMub25CZWZvcmVMZWF2ZSkge1xyXG4gICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUodGhpcy5vbkJlZm9yZUxlYXZlKCkpO1xyXG4gICAgfVxyXG4gICAgYXdhaXQgdGhpcy5zYXZlKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2F2ZShjbGVhbiA9IGZhbHNlKSB7XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5zeW5jU3RhdHVzID0gU3luY1N0YXR1cy5EcmFmdDtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5SZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbiwgY2xlYW4pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2F2ZUZ1bmMoKSB7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5zYXZlKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBpc0VtcHR5KCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuICEoYXdhaXQgdGhpcy5iYXNlUGFnZVNlcnZpY2UuQ29tbW9uUmVnaXN0cmF0aW9uU2VydmljZS5oYXNBbnlEYXRhVG9TaG93SW5SZWdpc3RyYXRpb25UeXBlcyhcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24sXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uVGlkXHJcbiAgICApXHJcbiAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgIC50b1Byb21pc2UoKSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHJldHVybiB0aGlzLmJhc2VQYWdlU2VydmljZS5jb25maXJtUmVzZXQodGhpcy5yZWdpc3RyYXRpb24sIHRoaXMucmVnaXN0cmF0aW9uVGlkLCAoKSA9PiAodGhpcy5vblJlc2V0ID8gdGhpcy5vblJlc2V0KCkgOiBudWxsKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvbHZlZFVybCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgJy8nICtcclxuICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAgICAgICAubWFwKCh2KSA9PiB2LnVybC5tYXAoKHNlZ21lbnQpID0+IHNlZ21lbnQudG9TdHJpbmcoKSkuam9pbignLycpKVxyXG4gICAgICAgIC5maWx0ZXIoKHBhdGgpID0+ICEhcGF0aClcclxuICAgICAgICAuam9pbignLycpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0Q29uZmlndXJlZFVybCgpOiBzdHJpbmcge1xyXG4gIC8vICAgICByZXR1cm4gJy8nICsgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXRoRnJvbVJvb3RcclxuICAvLyAgICAgICAgIC5maWx0ZXIodiA9PiB2LnJvdXRlQ29uZmlnKVxyXG4gIC8vICAgICAgICAgLm1hcCh2ID0+IHYucm91dGVDb25maWcucGF0aClcclxuICAvLyAgICAgICAgIC5qb2luKCcvJyk7XHJcbiAgLy8gfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNldERhbWFnZUxvY2F0aW9uUGFnZSB9IGZyb20gJy4vc2V0LWRhbWFnZS1sb2NhdGlvbi5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTaGFyZWRDb21wb25lbnRzTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtTZXREYW1hZ2VMb2NhdGlvblBhZ2VdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1NldERhbWFnZUxvY2F0aW9uUGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldERhbWFnZUxvY2F0aW9uUGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlciAqbmdJZj1cIiEoZnVsbHNjcmVlbiQgfCBhc3luYylcIj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJ1dHRvbiAoY2xpY2spPVwiY2FuY2VsKClcIj57eyAnRElBTE9HUy5DQU5DRUwnIHwgdHJhbnNsYXRlIH19PC9pb24tYnV0dG9uPlxyXG4gICAgPC9pb24tYnV0dG9ucz5cclxuICAgIDxpb24tdGl0bGU+XHJcbiAgICAgIHt7J1JFR0lTVFJBVElPTi5TRVRfREFNQUdFX0xPQ0FUSU9OLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXNldC1sb2NhdGlvbi1pbi1tYXAgKm5nSWY9XCJmcm9tTWFya2VyXCIgW2dlb0hhemFyZF09XCJnZW9IYXphcmRcIiBbZnJvbU1hcmtlcl09XCJmcm9tTWFya2VyXCIgW2xvY2F0aW9uTWFya2VyXT1cImxvY2F0aW9uTWFya2VyXCJcclxuICAgIFtsb2NhdGlvbk1hcmtlckljb25VcmxdPVwibG9jYXRpb25NYXJrZXJJY29uVXJsXCIgKGxvY2F0aW9uU2V0KT1cIm9uTG9jYXRpb25TZXQoJGV2ZW50KVwiIGNvbmZpcm1Mb2NhdGlvblRleHQ9XCJSRUdJU1RSQVRJT04uU0VUX0RBTUFHRV9MT0NBVElPTi5DT05GSVJNX1RFWFRcIlxyXG4gICAgZnJvbUxvY2F0aW9uVGV4dD1cIlJFR0lTVFJBVElPTi5PQlNfTE9DQVRJT04uVElUTEVcIiBbc2hvd1ByZXZpb3VzVXNlZExvY2F0aW9uc109XCJmYWxzZVwiIGxvY2F0aW9uVGl0bGU9XCJSRUdJU1RSQVRJT04uU0VUX0RBTUFHRV9MT0NBVElPTi5USVRMRVwiPlxyXG4gIDwvYXBwLXNldC1sb2NhdGlvbi1pbi1tYXA+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBEYW1hZ2VPYnNFZGl0TW9kZWwsIE9ic0xvY2F0aW9uRWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBJc0VtcHR5SGVscGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9oZWxwZXJzL2lzLWVtcHR5LmhlbHBlcic7XHJcbmltcG9ydCB7IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9mdWxsc2NyZWVuL2Z1bGxzY3JlZW4uc2VydmljZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3dpcGVCYWNrU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3dpcGUtYmFjay9zd2lwZS1iYWNrLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2V0LWRhbWFnZS1sb2NhdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldC1kYW1hZ2UtbG9jYXRpb24ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZXQtZGFtYWdlLWxvY2F0aW9uLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXREYW1hZ2VMb2NhdGlvblBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRhbWFnZU9iczogRGFtYWdlT2JzRWRpdE1vZGVsO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIEBJbnB1dCgpIGZyb21MYXRMbmc6IEwuTGF0TG5nO1xyXG4gIGZyb21NYXJrZXI6IEwuTWFya2VyO1xyXG4gIGxvY2F0aW9uTWFya2VyOiBMLk1hcmtlcjtcclxuICBsb2NhdGlvbk1hcmtlckljb25VcmwgPSAnL2Fzc2V0cy9pY29uL21hcC9kYW1hZ2UtbG9jYXRpb24uc3ZnJztcclxuICBmdWxsc2NyZWVuJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuXHJcbiAgQFZpZXdDaGlsZChTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50KVxyXG4gIHNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ6IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbENvbnRyb2xsZXI6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHByaXZhdGUgc3dpcGVCYWNrU2VydmljZTogU3dpcGVCYWNrU2VydmljZSxcclxuICAgIHByaXZhdGUgZnVsbHNjcmVlblNlcnZpY2U6IEZ1bGxzY3JlZW5TZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmZ1bGxzY3JlZW4kID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0Z1bGxzY3JlZW4kO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5mcm9tTGF0TG5nKSB7XHJcbiAgICAgIGNvbnN0IG9ic0xvY2F0aW9uSWNvbiA9IEwuaWNvbih7XHJcbiAgICAgICAgaWNvblVybDogJy9hc3NldHMvaWNvbi9tYXAvb2JzLWxvY2F0aW9uLnN2ZycsXHJcbiAgICAgICAgaWNvblNpemU6IFsyNSwgNDFdLFxyXG4gICAgICAgIGljb25BbmNob3I6IFsxMiwgNDFdLFxyXG4gICAgICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgICAgIHNoYWRvd1NpemU6IFs0MSwgNDFdXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmZyb21NYXJrZXIgPSBMLm1hcmtlcih0aGlzLmZyb21MYXRMbmcsIHsgaWNvbjogb2JzTG9jYXRpb25JY29uIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmRhbWFnZU9icyAmJlxyXG4gICAgICAhSXNFbXB0eUhlbHBlci5pc0VtcHR5KHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnN0IGxhdExuZyA9IEwubGF0TG5nKFxyXG4gICAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxhdGl0dWRlLFxyXG4gICAgICAgIHRoaXMuZGFtYWdlT2JzLkRhbWFnZVBvc2l0aW9uLkxvbmdpdHVkZVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBkYW1hZ2VMb2NhdGlvbkljb24gPSBMLmljb24oe1xyXG4gICAgICAgIGljb25Vcmw6IHRoaXMubG9jYXRpb25NYXJrZXJJY29uVXJsLFxyXG4gICAgICAgIGljb25TaXplOiBbMjUsIDQxXSxcclxuICAgICAgICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcclxuICAgICAgICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgICAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKGxhdExuZywgeyBpY29uOiBkYW1hZ2VMb2NhdGlvbkljb24gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpb25WaWV3RGlkRW50ZXIoKSB7XHJcbiAgICB0aGlzLnN3aXBlQmFja1NlcnZpY2UuZGlzYWJsZVN3aXBlQmFjaygpO1xyXG4gIH1cclxuXHJcbiAgaW9uVmlld1dpbGxMZWF2ZSgpIHtcclxuICAgIHRoaXMuc3dpcGVCYWNrU2VydmljZS5lbmFibGVTd2lwZUJhY2soKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uTG9jYXRpb25TZXQoZXZlbnQ6IE9ic0xvY2F0aW9uRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKGV2ZW50KTtcclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMubW9kYWxDb250cm9sbGVyLmRpc21pc3MoKTtcclxuICB9XHJcblxyXG4gIG9rKCkge1xyXG4gICAgdGhpcy5zZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50LmNvbmZpcm1Mb2NhdGlvbigpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXMsIFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IERhbWFnZVBhZ2UgfSBmcm9tICcuL2RhbWFnZS5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IERhbWFnZU9ic0NvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvZGFtYWdlLW9icy9kYW1hZ2Utb2JzLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNldERhbWFnZUxvY2F0aW9uUGFnZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NldC1kYW1hZ2UtbG9jYXRpb24vc2V0LWRhbWFnZS1sb2NhdGlvbi5tb2R1bGUnO1xyXG5cclxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXHJcbiAge1xyXG4gICAgcGF0aDogJycsXHJcbiAgICBjb21wb25lbnQ6IERhbWFnZVBhZ2VcclxuICB9XHJcbl07XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIFNoYXJlZENvbXBvbmVudHNNb2R1bGUsXHJcbiAgICBTZXREYW1hZ2VMb2NhdGlvblBhZ2VNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbRGFtYWdlUGFnZSwgRGFtYWdlT2JzQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFtYWdlUGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLlRJVExFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICA8L2lvbi10aXRsZT5cclxuICA8L2lvbi10b29sYmFyPlxyXG48L2lvbi1oZWFkZXI+XHJcbjxpb24tY29udGVudD5cclxuICA8YXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXIgKm5nSWY9XCJyZWdpc3RyYXRpb25cIiBbcmVnaXN0cmF0aW9uXT1cInJlZ2lzdHJhdGlvblwiXHJcbiAgICBbcmVnaXN0cmF0aW9uVGlkXT1cInJlZ2lzdHJhdGlvblRpZFwiIChyZXNldCk9XCJyZXNldCgpXCI+XHJcbiAgICA8aW9uLWxpc3QgbGluZXM9XCJmdWxsXCI+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5XQVRFUi5EQU1BR0UuQ0FOX1lPVV9TRUVfREFNQUdFJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8aW9uLXJhZGlvLWdyb3VwIFsobmdNb2RlbCldPVwiaXNDaGVja2VkXCI+XHJcbiAgICAgICAgPGlvbi1pdGVtIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiBjaGVja2VkID09PSB0cnVlfVwiIChjbGljayk9XCJpc0NoZWNrZWQgPSB0cnVlXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7ICdESUFMT0dTLllFUycgfCB0cmFuc2xhdGUgfX08L2lvbi1sYWJlbD5cclxuICAgICAgICAgIDxpb24tcmFkaW8gbW9kZT1cIm1kXCIgc2xvdD1cInN0YXJ0XCIgW3ZhbHVlXT1cInRydWVcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICAgIDxpb24taXRlbSBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogY2hlY2tlZCA9PT0gZmFsc2V9XCIgKGNsaWNrKT1cImlzQ2hlY2tlZCA9IGZhbHNlXCI+XHJcbiAgICAgICAgICA8aW9uLWxhYmVsPnt7ICdESUFMT0dTLk5PJyB8IHRyYW5zbGF0ZSB9fTwvaW9uLWxhYmVsPlxyXG4gICAgICAgICAgPGlvbi1yYWRpbyBtb2RlPVwibWRcIiBzbG90PVwic3RhcnRcIiBbdmFsdWVdPVwiZmFsc2VcIj48L2lvbi1yYWRpbz5cclxuICAgICAgICA8L2lvbi1pdGVtPlxyXG4gICAgICA8L2lvbi1yYWRpby1ncm91cD5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQ2hlY2tlZCAmJiBkYW1hZ2VUeXBlc1wiPlxyXG4gICAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgIDxpb24tbGFiZWw+XHJcbiAgICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uV0FURVIuREFNQUdFLldIQVRfSVNfREFNQUdFRCcgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICAgIDwvaW9uLWxhYmVsPlxyXG4gICAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICAgIDxhcHAtZGFtYWdlLW9icyAqbmdGb3I9XCJsZXQgZGFtYWdlVHlwZSBvZiBkYW1hZ2VUeXBlc1wiIFsocmVnaXN0cmF0aW9uKV09XCJyZWdpc3RyYXRpb25cIlxyXG4gICAgICAgICAgW2RhbWFnZVR5cGVJZF09XCJkYW1hZ2VUeXBlLklkXCIgW2RhbWFnZVR5cGVOYW1lXT1cImRhbWFnZVR5cGUuTmFtZVwiIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCI+XHJcbiAgICAgICAgPC9hcHAtZGFtYWdlLW9icz5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2UgfSBmcm9tICcuLi8uLi9iYXNlLnBhZ2UnO1xyXG5pbXBvcnQgeyBSZWdpc3RyYXRpb25UaWQgfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgS2R2U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMva2R2L2tkdi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR2VvSGF6YXJkIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL2NvcmUnO1xyXG5pbXBvcnQgeyBLZHZFbGVtZW50IH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBCYXNlUGFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9iYXNlLXBhZ2Utc2VydmljZSc7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmNvbnN0IE5PX0RBTUFHRV9WSVNJQkxFID0gNztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLWRhbWFnZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RhbWFnZS5wYWdlLmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2RhbWFnZS5wYWdlLnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGFtYWdlUGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBkYW1hZ2VUeXBlczogS2R2RWxlbWVudFtdO1xyXG4gIGNoZWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gIGdldCBpc0NoZWNrZWQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0aGlzLnJlZ2lzdHJhdGlvbiB8fFxyXG4gICAgICAhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdCB8fFxyXG4gICAgICAhdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMgfHxcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMubGVuZ3RoID09PSAwXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uICYmXHJcbiAgICAgIHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbHRlcihcclxuICAgICAgICAoeCkgPT4geC5EYW1hZ2VUeXBlVElEICE9PSBOT19EQU1BR0VfVklTSUJMRVxyXG4gICAgICApLmxlbmd0aCA+IDBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBzZXQgaXNDaGVja2VkKHZhbDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5jaGVja2VkID0gdmFsO1xyXG4gICAgaWYgKHZhbCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EYW1hZ2VPYnMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgRGFtYWdlVHlwZVRJRDogTk9fREFNQUdFX1ZJU0lCTEVcclxuICAgICAgICB9XHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkRhbWFnZU9icyA9IHRoaXMucmVnaXN0cmF0aW9uLnJlcXVlc3QuRGFtYWdlT2JzLmZpbHRlcihcclxuICAgICAgICAoeCkgPT4geC5EYW1hZ2VUeXBlVElEICE9PSBOT19EQU1BR0VfVklTSUJMRVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBrZHZTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBiYXNlUGFnZVNlcnZpY2U6IEJhc2VQYWdlU2VydmljZSxcclxuICAgIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUga2R2U2VydmljZTogS2R2U2VydmljZSxcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5EYW1hZ2VPYnMsIGJhc2VQYWdlU2VydmljZSwgYWN0aXZhdGVkUm91dGUpO1xyXG4gIH1cclxuXHJcbiAgb25Jbml0KCkge1xyXG4gICAgY29uc3QgZ2VvSGF6YXJkTmFtZSA9IEdlb0hhemFyZFt0aGlzLnJlZ2lzdHJhdGlvbi5nZW9IYXphcmRdO1xyXG4gICAgdGhpcy5rZHZTdWJzY3JpcHRpb24gPSB0aGlzLmtkdlNlcnZpY2VcclxuICAgICAgLmdldEtkdlJlcG9zaXRvcnlCeUtleU9ic2VydmFibGUoYCR7Z2VvSGF6YXJkTmFtZX1fRGFtYWdlVHlwZUtEVmApXHJcbiAgICAgIC5waXBlKG1hcCgodmFsKSA9PiB2YWwuZmlsdGVyKCh4KSA9PiB4LklkICE9PSBOT19EQU1BR0VfVklTSUJMRSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKChrZHZFbGVtZW50cykgPT4ge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmRhbWFnZVR5cGVzID0ga2R2RWxlbWVudHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CZWZvcmVMZWF2ZSgpIHtcclxuICAgIGlmICh0aGlzLmtkdlN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLmtkdlN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=