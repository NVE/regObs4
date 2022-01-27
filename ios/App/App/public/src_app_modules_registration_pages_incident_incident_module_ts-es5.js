(function () {
  "use strict";

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

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_incident_incident_module_ts"], {
    /***/
    97184: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IncidentPageModule": function IncidentPageModule() {
          return (
            /* binding */
            _IncidentPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _incident_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./incident.page */
      53520);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../add-web-url-modal/add-web-url-modal.module */
      22838);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _incident_page__WEBPACK_IMPORTED_MODULE_0__.IncidentPage
      }];

      var _IncidentPageModule = function _IncidentPageModule() {
        _classCallCheck(this, _IncidentPageModule);
      };

      _IncidentPageModule.ɵfac = function IncidentPageModule_Factory(t) {
        return new (t || _IncidentPageModule)();
      };

      _IncidentPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _IncidentPageModule
      });
      _IncidentPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_IncidentPageModule, {
          declarations: [_incident_page__WEBPACK_IMPORTED_MODULE_0__.IncidentPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _add_web_url_modal_add_web_url_modal_module__WEBPACK_IMPORTED_MODULE_2__.AddWebUrlModalPageModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    53520: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "IncidentPage": function IncidentPage() {
          return (
            /* binding */
            _IncidentPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../base.page */
      81877);
      /* harmony import */


      var _base_page_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../base-page-service */
      35140);
      /* harmony import */


      var src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/modules/common-registration/registration.models */
      42852);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
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


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/registration-content-wrapper/registration-content-wrapper.component */
      51535);
      /* harmony import */


      var _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../components/text-comment/text-comment.component */
      32032);
      /* harmony import */


      var _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../components/kdv-select/kdv-select.component */
      22241);
      /* harmony import */


      var _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../components/add-picture-item/add-picture-item.component */
      26869);
      /* harmony import */


      var _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ../../components/add-web-url-item/add-web-url-item.component */
      15248);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function IncidentPage_app_registration_content_wrapper_8_Template(rf, ctx) {
        if (rf & 1) {
          var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "app-registration-content-wrapper", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("reset", function IncidentPage_app_registration_content_wrapper_8_Template_app_registration_content_wrapper_reset_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2);

            var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r1.reset();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-list", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "app-text-comment", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_text_comment_valueChange_2_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2);

            var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r3.registration.request.Incident.IncidentText = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "ion-item-divider");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "ion-label", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "app-kdv-select", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_7_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r4.registration.request.Incident.ActivityInfluencedTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "app-kdv-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("valueChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_kdv_select_valueChange_8_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2);

            var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r5.registration.request.Incident.DamageExtentTID = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "ion-list-header", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](12, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](13, "app-add-picture-item", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "ion-list-header", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](15, "ion-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](16);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](17, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "app-add-web-url-item", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("weburlsChange", function IncidentPage_app_registration_content_wrapper_8_Template_app_add_web_url_item_weburlsChange_18_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r2);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

            return ctx_r6.registration.request.Incident.IncidentURLs = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("registration", ctx_r0.registration)("registrationTid", ctx_r0.registrationTid);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.IncidentText);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 14, "REGISTRATION.INCIDENT.COMMENT_PLACEHOLDER"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpropertyInterpolate1"]("kdvKey", "", ctx_r0.geoHazardName, "_ActivityInfluencedKDV");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.ActivityInfluencedTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("value", ctx_r0.registration.request.Incident.DamageExtentTID);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](12, 16, "REGISTRATION.ADD_IMAGES"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("geoHazard", ctx_r0.registration.geoHazard)("registrationId", ctx_r0.registration.id)("registrationTid", ctx_r0.registrationTid)("onBeforeAdd", ctx_r0.getSaveFunc());

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](17, 18, "REGISTRATION.ADD_WEB_URL.TITLE"), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("weburls", ctx_r0.registration.request.Incident.IncidentURLs);
        }
      }

      var _IncidentPage = /*#__PURE__*/function (_base_page__WEBPACK_I) {
        _inherits(_IncidentPage, _base_page__WEBPACK_I);

        var _super = _createSuper(_IncidentPage);

        function _IncidentPage(basePageService, activatedRoute) {
          _classCallCheck(this, _IncidentPage);

          return _super.call(this, src_app_modules_common_registration_registration_models__WEBPACK_IMPORTED_MODULE_2__.RegistrationTid.Incident, basePageService, activatedRoute);
        }

        _createClass(_IncidentPage, [{
          key: "geoHazardName",
          get: function get() {
            return _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_10__.GeoHazard[this.registration.geoHazard];
          }
        }]);

        return _IncidentPage;
      }(_base_page__WEBPACK_IMPORTED_MODULE_0__.BasePage);

      _IncidentPage.ɵfac = function IncidentPage_Factory(t) {
        return new (t || _IncidentPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_base_page_service__WEBPACK_IMPORTED_MODULE_1__.BasePageService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute));
      };

      _IncidentPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
        type: _IncidentPage,
        selectors: [["app-incident"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵInheritDefinitionFeature"]],
        decls: 9,
        vars: 4,
        consts: [["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "registration", "registrationTid", "reset", 4, "ngIf"], [3, "registration", "registrationTid", "reset"], ["lines", "full"], ["title", "REGISTRATION.INCIDENT.COMMENT", 3, "value", "valueChange"], [1, "ion-text-wrap"], ["title", "REGISTRATION.INCIDENT.ACTIVITY", 3, "kdvKey", "value", "valueChange"], ["title", "REGISTRATION.INCIDENT.DAMAGE_EXTENT", "kdvKey", "DamageExtentKDV", 3, "value", "valueChange"], [1, "ion-text-uppercase"], [3, "geoHazard", "registrationId", "registrationTid", "onBeforeAdd"], [3, "weburls", "weburlsChange"]],
        template: function IncidentPage_Template(rf, ctx) {
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

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, IncidentPage_app_registration_content_wrapper_8_Template, 19, 20, "app-registration-content-wrapper", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](6, 2, "REGISTRATION.INCIDENT.TITLE"), " ");

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.registration && ctx.registration.request.Incident);
          }
        },
        directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_3__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _components_registration_content_wrapper_registration_content_wrapper_component__WEBPACK_IMPORTED_MODULE_4__.RegistrationContentWrapperComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonList, _components_text_comment_text_comment_component__WEBPACK_IMPORTED_MODULE_5__.TextCommentComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonItemDivider, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonLabel, _components_kdv_select_kdv_select_component__WEBPACK_IMPORTED_MODULE_6__.KdvSelectComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonListHeader, _components_add_picture_item_add_picture_item_component__WEBPACK_IMPORTED_MODULE_7__.AddPictureItemComponent, _components_add_web_url_item_add_web_url_item_component__WEBPACK_IMPORTED_MODULE_8__.AddWebUrlItemComponent],
        pipes: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNpZGVudC5wYWdlLnNjc3MifQ== */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsVUFBTUEsTUFBTSxHQUFXLENBQ3JCO0FBQ0VDLFlBQUksRUFBRSxFQURSO0FBRUVDLGlCQUFTLEVBQUVDO0FBRmIsT0FEcUIsQ0FBdkI7O1VBZWFDOzs7Ozt5QkFBQUE7QUFBa0I7OztjQUFsQkE7OztrQkFQRixDQUNQQyw2RUFETyxFQUVQQyxpR0FGTyxFQUdQQyxtRUFBc0JQLE1BQXRCLENBSE87Ozs7NEhBT0VJLHFCQUFrQjtBQUFBSSx5QkFGZEwsd0RBRWM7QUFGRk0sb0JBSnpCSiw2RUFJeUIsRUFIekJDLGlHQUd5QixFQUhEQyx5REFHQztBQUVFO0FBTEg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0wxQkc7O0FBQ3NDQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUNwQ0E7O0FBQ0VBOztBQUF3REE7QUFBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFDeERBOztBQUNBQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQWdFQTs7QUFDbEVBOztBQUNFQTtBQUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUEwREE7O0FBQzVEQTs7QUFDRUE7O0FBQ0VBOzs7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBR0FBOztBQUNFQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNBQTs7QUFBc0JBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQXlEQTs7QUFDakZBOztBQUNGQTs7Ozs7O0FBN0J3RkEsd0dBQTZCLGlCQUE3QixFQUE2QkMsc0JBQTdCOztBQUc1QkQ7O0FBQUFBOztBQUlwREE7O0FBQUFBOztBQUdtREE7O0FBQUFBOztBQUNyREE7O0FBRUFBOztBQUFBQTs7QUFHRUE7O0FBQUFBOztBQUdrQkE7O0FBQUFBLCtHQUFvQyxnQkFBcEMsRUFBb0NDLHNCQUFwQyxFQUFvQyxpQkFBcEMsRUFBb0NBLHNCQUFwQyxFQUFvQyxhQUFwQyxFQUFvQ0Esb0JBQXBDOztBQUtsQkQ7O0FBQUFBOztBQUdrQkE7O0FBQUFBOzs7O1VDMUJmRTs7Ozs7QUFLWCwrQkFDRUMsZUFERixFQUVFQyxjQUZGLEVBRWdDO0FBQUE7O0FBQUEsbUNBRXhCQyw2R0FGd0IsRUFFRUYsZUFGRixFQUVtQkMsY0FGbkI7QUFHL0I7Ozs7ZUFURCxlQUFpQjtBQUNmLG1CQUFPRSxtRUFBVSxLQUFLQyxZQUFMLENBQWtCQyxTQUE1QixDQUFQO0FBQ0Q7Ozs7UUFIK0JDOzs7eUJBQXJCUCxlQUFZRjtBQUFBOzs7Y0FBWkU7QUFBWVE7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQUM7QUFBQTtBRFp6QmY7O0FBQ0VBOztBQUNFQTs7QUFDRUE7O0FBQ0ZBOztBQUNBQTs7QUFDRUE7Ozs7QUFDRkE7O0FBQ0ZBOztBQUNGQTs7QUFDQUE7O0FBQ0VBOztBQThCRkE7Ozs7QUFuQ01BOztBQUFBQTs7QUFLK0JBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfaW5jaWRlbnRfcGFnZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiSW5jaWRlbnRQYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2FkZF93ZWJfdXJsX21vZGFsX2FkZF93ZWJfdXJsX21vZGFsX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJkZWNsYXJhdGlvbnMiLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOV9fIiwiY3R4X3IwIiwiSW5jaWRlbnRQYWdlIiwiYmFzZVBhZ2VTZXJ2aWNlIiwiYWN0aXZhdGVkUm91dGUiLCJzcmNfYXBwX21vZHVsZXNfY29tbW9uX3JlZ2lzdHJhdGlvbl9yZWdpc3RyYXRpb25fbW9kZWxzX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8yX18iLCJfdmFyc29tX3JlZ29ic19jb21tb25fY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMTBfXyIsInJlZ2lzdHJhdGlvbiIsImdlb0hhemFyZCIsIl9iYXNlX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsInNlbGVjdG9ycyIsImZlYXR1cmVzIiwiZGVjbHMiLCJ2YXJzIiwiY29uc3RzIiwidGVtcGxhdGUiXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvaW5jaWRlbnQvaW5jaWRlbnQubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL2luY2lkZW50L2luY2lkZW50LnBhZ2UuaHRtbCIsIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9pbmNpZGVudC9pbmNpZGVudC5wYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgSW5jaWRlbnRQYWdlIH0gZnJvbSAnLi9pbmNpZGVudC5wYWdlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFkZFdlYlVybE1vZGFsUGFnZU1vZHVsZSB9IGZyb20gJy4uL2FkZC13ZWItdXJsLW1vZGFsL2FkZC13ZWItdXJsLW1vZGFsLm1vZHVsZSc7XHJcblxyXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcclxuICB7XHJcbiAgICBwYXRoOiAnJyxcclxuICAgIGNvbXBvbmVudDogSW5jaWRlbnRQYWdlXHJcbiAgfVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBTaGFyZWRDb21wb25lbnRzTW9kdWxlLFxyXG4gICAgQWRkV2ViVXJsTW9kYWxQYWdlTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcylcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0luY2lkZW50UGFnZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEluY2lkZW50UGFnZU1vZHVsZSB7fVxyXG4iLCI8aW9uLWhlYWRlcj5cclxuICA8aW9uLXRvb2xiYXIgYXBwSGVhZGVyQ29sb3IgbW9kZT1cImlvc1wiPlxyXG4gICAgPGlvbi1idXR0b25zIHNsb3Q9XCJzdGFydFwiPlxyXG4gICAgICA8aW9uLWJhY2stYnV0dG9uIHRleHQ9XCJcIiBkZWZhdWx0SHJlZj1cIi9cIj48L2lvbi1iYWNrLWJ1dHRvbj5cclxuICAgIDwvaW9uLWJ1dHRvbnM+XHJcbiAgICA8aW9uLXRpdGxlPlxyXG4gICAgICB7eydSRUdJU1RSQVRJT04uSU5DSURFTlQuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtcmVnaXN0cmF0aW9uLWNvbnRlbnQtd3JhcHBlciAqbmdJZj1cInJlZ2lzdHJhdGlvbiAmJiByZWdpc3RyYXRpb24ucmVxdWVzdC5JbmNpZGVudFwiIFtyZWdpc3RyYXRpb25dPVwicmVnaXN0cmF0aW9uXCJcclxuICAgIFtyZWdpc3RyYXRpb25UaWRdPVwicmVnaXN0cmF0aW9uVGlkXCIgKHJlc2V0KT1cInJlc2V0KClcIj5cclxuICAgIDxpb24tbGlzdCBsaW5lcz1cImZ1bGxcIj5cclxuICAgICAgPGFwcC10ZXh0LWNvbW1lbnQgdGl0bGU9XCJSRUdJU1RSQVRJT04uSU5DSURFTlQuQ09NTUVOVFwiIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50LkluY2lkZW50VGV4dFwiPlxyXG4gICAgICA8L2FwcC10ZXh0LWNvbW1lbnQ+XHJcbiAgICAgIDxpb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICAgIDxpb24tbGFiZWwgY2xhc3M9XCJpb24tdGV4dC13cmFwXCI+XHJcbiAgICAgICAgICB7eydSRUdJU1RSQVRJT04uSU5DSURFTlQuQ09NTUVOVF9QTEFDRUhPTERFUicgfCB0cmFuc2xhdGUgfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24taXRlbS1kaXZpZGVyPlxyXG4gICAgICA8YXBwLWtkdi1zZWxlY3QgdGl0bGU9XCJSRUdJU1RSQVRJT04uSU5DSURFTlQuQUNUSVZJVFlcIiBrZHZLZXk9XCJ7eyBnZW9IYXphcmROYW1lIH19X0FjdGl2aXR5SW5mbHVlbmNlZEtEVlwiXHJcbiAgICAgICAgWyh2YWx1ZSldPVwicmVnaXN0cmF0aW9uLnJlcXVlc3QuSW5jaWRlbnQuQWN0aXZpdHlJbmZsdWVuY2VkVElEXCI+PC9hcHAta2R2LXNlbGVjdD5cclxuICAgICAgPGFwcC1rZHYtc2VsZWN0IHRpdGxlPVwiUkVHSVNUUkFUSU9OLklOQ0lERU5ULkRBTUFHRV9FWFRFTlRcIiBrZHZLZXk9XCJEYW1hZ2VFeHRlbnRLRFZcIlxyXG4gICAgICAgIFsodmFsdWUpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50LkRhbWFnZUV4dGVudFRJRFwiPjwvYXBwLWtkdi1zZWxlY3Q+XHJcbiAgICAgIDxpb24tbGlzdC1oZWFkZXIgY2xhc3M9XCJpb24tdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICA8aW9uLWxhYmVsPlxyXG4gICAgICAgICAge3sgJ1JFR0lTVFJBVElPTi5BRERfSU1BR0VTJyB8IHRyYW5zbGF0ZX19XHJcbiAgICAgICAgPC9pb24tbGFiZWw+XHJcbiAgICAgIDwvaW9uLWxpc3QtaGVhZGVyPlxyXG4gICAgICA8YXBwLWFkZC1waWN0dXJlLWl0ZW0gW2dlb0hhemFyZF09XCJyZWdpc3RyYXRpb24uZ2VvSGF6YXJkXCIgW3JlZ2lzdHJhdGlvbklkXT1cInJlZ2lzdHJhdGlvbi5pZFwiXHJcbiAgICAgICAgW3JlZ2lzdHJhdGlvblRpZF09XCJyZWdpc3RyYXRpb25UaWRcIiBbb25CZWZvcmVBZGRdPVwiZ2V0U2F2ZUZ1bmMoKVwiPlxyXG4gICAgICA8L2FwcC1hZGQtcGljdHVyZS1pdGVtPlxyXG4gICAgICA8aW9uLWxpc3QtaGVhZGVyIGNsYXNzPVwiaW9uLXRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgPGlvbi1sYWJlbD5cclxuICAgICAgICAgIHt7ICdSRUdJU1RSQVRJT04uQUREX1dFQl9VUkwuVElUTEUnIHwgdHJhbnNsYXRlfX1cclxuICAgICAgICA8L2lvbi1sYWJlbD5cclxuICAgICAgPC9pb24tbGlzdC1oZWFkZXI+XHJcbiAgICAgIDxhcHAtYWRkLXdlYi11cmwtaXRlbSBbKHdlYnVybHMpXT1cInJlZ2lzdHJhdGlvbi5yZXF1ZXN0LkluY2lkZW50LkluY2lkZW50VVJMc1wiPjwvYXBwLWFkZC13ZWItdXJsLWl0ZW0+XHJcbiAgICA8L2lvbi1saXN0PlxyXG4gIDwvYXBwLXJlZ2lzdHJhdGlvbi1jb250ZW50LXdyYXBwZXI+XHJcbjwvaW9uLWNvbnRlbnQ+IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhc2VQYWdlIH0gZnJvbSAnLi4vYmFzZS5wYWdlJztcclxuaW1wb3J0IHsgQmFzZVBhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZS1wYWdlLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFJlZ2lzdHJhdGlvblRpZCB9IGZyb20gJ3NyYy9hcHAvbW9kdWxlcy9jb21tb24tcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi5tb2RlbHMnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1pbmNpZGVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2luY2lkZW50LnBhZ2UuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaW5jaWRlbnQucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEluY2lkZW50UGFnZSBleHRlbmRzIEJhc2VQYWdlIHtcclxuICBnZXQgZ2VvSGF6YXJkTmFtZSgpIHtcclxuICAgIHJldHVybiBHZW9IYXphcmRbdGhpcy5yZWdpc3RyYXRpb24uZ2VvSGF6YXJkXTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgYmFzZVBhZ2VTZXJ2aWNlOiBCYXNlUGFnZVNlcnZpY2UsXHJcbiAgICBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHtcclxuICAgIHN1cGVyKFJlZ2lzdHJhdGlvblRpZC5JbmNpZGVudCwgYmFzZVBhZ2VTZXJ2aWNlLCBhY3RpdmF0ZWRSb3V0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==