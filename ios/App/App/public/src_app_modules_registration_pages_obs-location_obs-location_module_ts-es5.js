(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["src_app_modules_registration_pages_obs-location_obs-location_module_ts"], {
    /***/
    73862: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ObsLocationPageModule": function ObsLocationPageModule() {
          return (
            /* binding */
            _ObsLocationPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _obs_location_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./obs-location.page */
      81889);
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _save_as_draft_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../save-as-draft.guard */
      52622);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: '',
        component: _obs_location_page__WEBPACK_IMPORTED_MODULE_0__.ObsLocationPage,
        canDeactivate: [_save_as_draft_guard__WEBPACK_IMPORTED_MODULE_2__.SaveAsDraftRouteGuard]
      }];

      var _ObsLocationPageModule = function _ObsLocationPageModule() {
        _classCallCheck(this, _ObsLocationPageModule);
      };

      _ObsLocationPageModule.ɵfac = function ObsLocationPageModule_Factory(t) {
        return new (t || _ObsLocationPageModule)();
      };

      _ObsLocationPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _ObsLocationPageModule
      });
      _ObsLocationPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_ObsLocationPageModule, {
          declarations: [_obs_location_page__WEBPACK_IMPORTED_MODULE_0__.ObsLocationPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_1__.SharedComponentsModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    81889: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ObsLocationPage": function ObsLocationPage() {
          return (
            /* binding */
            _ObsLocationPage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! leaflet */
      20685);
      /* harmony import */


      var leaflet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _services_registration_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../services/registration.service */
      33181);
      /* harmony import */


      var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../core/services/fullscreen/fullscreen.service */
      13653);
      /* harmony import */


      var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../core/services/swipe-back/swipe-back.service */
      84716);
      /* harmony import */


      var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../components/set-location-in-map/set-location-in-map.component */
      5717);
      /* harmony import */


      var _core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../core/services/user-setting/user-setting.service */
      22276);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! rxjs/operators */
      35116);
      /* harmony import */


      var _auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../../auth/services/regobs-auth.service */
      18955);
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


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);

      function ObsLocationPage_ion_header_0_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "ion-toolbar", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-buttons", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-back-button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "ion-title");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 1, "REGISTRATION.OBS_LOCATION.TITLE"), " ");
        }
      }

      function ObsLocationPage_app_set_location_in_map_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "app-set-location-in-map", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("locationSet", function ObsLocationPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

            return ctx_r2.onLocationSet($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("locationMarker", ctx_r1.locationMarker)("selectedLocation", ctx_r1.selectedLocation)("allowEditLocationName", true)("isSaveDisabled", ctx_r1.isSaveDisabled);
        }
      }

      var DEBUG_TAG = 'ObsLocationPage';

      var _ObsLocationPage = /*#__PURE__*/function () {
        function _ObsLocationPage(registrationService, activatedRoute, ngZone, navController, fullscreenService, swipeBackService, userSettingService, regobsAuthService) {
          _classCallCheck(this, _ObsLocationPage);

          this.registrationService = registrationService;
          this.activatedRoute = activatedRoute;
          this.ngZone = ngZone;
          this.navController = navController;
          this.fullscreenService = fullscreenService;
          this.swipeBackService = swipeBackService;
          this.userSettingService = userSettingService;
          this.regobsAuthService = regobsAuthService;
          this.isLoaded = false;
          this.isSaveDisabled = false;
          this.fullscreen$ = this.fullscreenService.isFullscreen$;
        }

        _createClass(_ObsLocationPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _a;

            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              var id, userSettings, locationMarkerIcon;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      id = this.activatedRoute.snapshot.params['id'];

                      if (!id) {
                        _context.next = 8;
                        break;
                      }

                      _context.next = 4;
                      return this.registrationService.getSavedRegistrationById(id);

                    case 4:
                      this.registration = _context.sent;
                      this.geoHazard = (_a = this.registration) === null || _a === void 0 ? void 0 : _a.geoHazard;
                      _context.next = 9;
                      break;

                    case 8:
                      if (this.activatedRoute.snapshot.params['geoHazard']) {
                        this.geoHazard = parseInt(this.activatedRoute.snapshot.params['geoHazard'], 10);
                      }

                    case 9:
                      if (!(this.geoHazard == null)) {
                        _context.next = 14;
                        break;
                      }

                      _context.next = 12;
                      return this.userSettingService.userSetting$.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.take)(1)).toPromise();

                    case 12:
                      userSettings = _context.sent;
                      this.geoHazard = userSettings.currentGeoHazard[0];

                    case 14:
                      if (this.hasLocation(this.registration)) {
                        locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
                          iconUrl: '/assets/icon/map/obs-location.svg',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          shadowUrl: 'leaflet/marker-shadow.png',
                          shadowSize: [41, 41]
                        });
                        this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker({
                          lat: this.registration.request.ObsLocation.Latitude,
                          lng: this.registration.request.ObsLocation.Longitude
                        }, {
                          icon: locationMarkerIcon
                        });
                        this.selectedLocation = {
                          Name: this.registration.request.ObsLocation.LocationName || this.registration.request.ObsLocation.LocationDescription,
                          Id: this.registration.request.ObsLocation.ObsLocationID
                        };
                      }

                      this.subscription = this.regobsAuthService.loggedInUser$.subscribe(function (val) {
                        _this.loggedInUser = val;
                      });
                      this.ngZone.run(function () {
                        _this.isLoaded = true;
                      });

                    case 17:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            if (this.subscription) {
              this.subscription.unsubscribe();
            }
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
          key: "hasLocation",
          value: function hasLocation(reg) {
            return reg && reg.request.ObsLocation && reg.request.ObsLocation.Latitude && reg.request.ObsLocation.Longitude;
          }
        }, {
          key: "onLocationSet",
          value: function onLocationSet(event) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this2 = this;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      this.ngZone.run(function () {
                        _this2.isSaveDisabled = true;
                      });

                      if (!this.registration) {
                        this.registration = this.registrationService.createNewRegistration(this.geoHazard);
                      }

                      _context2.next = 4;
                      return this.setLocationAndSaveRegistration(event);

                    case 4:
                      if (this.registration.request.DtObsTime) {
                        this.navController.navigateForward('registration/edit/' + this.registration.id);
                      } else {
                        this.navController.navigateForward('registration/set-time/' + this.registration.id);
                      }

                    case 5:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          }
        }, {
          key: "setLocationAndSaveRegistration",
          value: function setLocationAndSaveRegistration(loc) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!(loc === undefined || this.registration === undefined)) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return");

                    case 2:
                      this.registration.request.ObsLocation = loc;
                      _context3.next = 5;
                      return this.registrationService.saveRegistrationAsync(this.registration);

                    case 5:
                      this.isSaveDisabled = false;

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }]);

        return _ObsLocationPage;
      }();

      _ObsLocationPage.ɵfac = function ObsLocationPage_Factory(t) {
        return new (t || _ObsLocationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_registration_service__WEBPACK_IMPORTED_MODULE_1__.RegistrationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_12__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_core_services_user_setting_user_setting_service__WEBPACK_IMPORTED_MODULE_5__.UserSettingService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_auth_services_regobs_auth_service__WEBPACK_IMPORTED_MODULE_6__.RegobsAuthService));
      };

      _ObsLocationPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _ObsLocationPage,
        selectors: [["app-obs-location"]],
        viewQuery: function ObsLocationPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__.SetLocationInMapComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
          }
        },
        decls: 4,
        vars: 4,
        consts: [[4, "ngIf"], [3, "geoHazard", "locationMarker", "selectedLocation", "allowEditLocationName", "isSaveDisabled", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], ["text", "", "defaultHref", "/"], [3, "geoHazard", "locationMarker", "selectedLocation", "allowEditLocationName", "isSaveDisabled", "locationSet"]],
        template: function ObsLocationPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](0, ObsLocationPage_ion_header_0_Template, 7, 3, "ion-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](3, ObsLocationPage_app_set_location_in_map_3_Template, 1, 5, "app-set-location-in-map", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isLoaded);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_7__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonBackButtonDelegate, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_4__.SetLocationInMapComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvYnMtbG9jYXRpb24ucGFnZS5zY3NzIn0= */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFVBQU1BLE1BQU0sR0FBVyxDQUNyQjtBQUNFQyxZQUFJLEVBQUUsRUFEUjtBQUVFQyxpQkFBUyxFQUFFQywrREFGYjtBQUdFQyxxQkFBYSxFQUFFLENBQUNDLHVFQUFEO0FBSGpCLE9BRHFCLENBQXZCOztVQVlhQzs7Ozs7eUJBQUFBO0FBQXFCOzs7Y0FBckJBOzs7a0JBSEYsQ0FBQ0MsNkVBQUQsRUFBeUJDLG1FQUFzQlIsTUFBdEIsQ0FBekI7Ozs7NEhBR0VNLHdCQUFxQjtBQUFBRyx5QkFGakJOLCtEQUVpQjtBQUZGTyxvQkFEcEJILDZFQUNvQixFQURJQyx5REFDSjtBQUVFO0FBSEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZnBDRzs7QUFDRUE7O0FBQ0VBOztBQUNFQTs7QUFDRkE7O0FBQ0FBOztBQUNFQTs7OztBQUNGQTs7QUFDRkE7O0FBQ0ZBOzs7O0FBSE1BOztBQUFBQTs7Ozs7Ozs7QUFLSkE7O0FBQ0VBO0FBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBRUZBOzs7Ozs7QUFIMENBLGtHQUF1QixnQkFBdkIsRUFBdUJDLHFCQUF2QixFQUF1QixrQkFBdkIsRUFBdUJBLHVCQUF2QixFQUF1Qix1QkFBdkIsRUFBdUIsSUFBdkIsRUFBdUIsZ0JBQXZCLEVBQXVCQSxxQkFBdkI7Ozs7QUNTNUMsVUFBTUMsU0FBUyxHQUFHLGlCQUFsQjs7VUFPYUM7QUFjWCxrQ0FDVUMsbUJBRFYsRUFFVUMsY0FGVixFQUdVQyxNQUhWLEVBSVVDLGFBSlYsRUFLVUMsaUJBTFYsRUFNVUMsZ0JBTlYsRUFPVUMsa0JBUFYsRUFRVUMsaUJBUlYsRUFROEM7QUFBQTs7QUFQcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXBCViwwQkFBVyxLQUFYO0FBS0EsZ0NBQWlCLEtBQWpCO0FBaUJFLGVBQUtDLFdBQUwsR0FBbUIsS0FBS0osaUJBQUwsQ0FBdUJLLGFBQTFDO0FBQ0Q7Ozs7aUJBRUssb0JBQVE7Ozs7Ozs7Ozs7O0FBQ05DLDJCQUFLLEtBQUtULGNBQUwsQ0FBb0JVLFFBQXBCLENBQTZCQyxNQUE3QixDQUFvQyxJQUFwQzs7MkJBQ1BGOzs7Ozs7QUFDa0IsNkJBQU0sS0FBS1YsbUJBQUwsQ0FBeUJhLHdCQUF6QixDQUN4QkgsRUFEd0IsQ0FBTjs7O0FBQXBCLDJCQUFLSTtBQUdMLDJCQUFLQyxTQUFMLEdBQWlCLFdBQUtELFlBQUwsTUFBaUIsSUFBakIsSUFBaUJFLGFBQWpCLEdBQWlCLE1BQWpCLEdBQWlCQSxHQUFFRCxTQUFwQzs7Ozs7QUFDSywwQkFBSSxLQUFLZCxjQUFMLENBQW9CVSxRQUFwQixDQUE2QkMsTUFBN0IsQ0FBb0MsV0FBcEMsQ0FBSixFQUFzRDtBQUMzRCw2QkFBS0csU0FBTCxHQUFpQkUsUUFBUSxDQUN2QixLQUFLaEIsY0FBTCxDQUFvQlUsUUFBcEIsQ0FBNkJDLE1BQTdCLENBQW9DLFdBQXBDLENBRHVCLEVBRXZCLEVBRnVCLENBQXpCO0FBSUQ7Ozs0QkFDRyxLQUFLRyxTQUFMLElBQWtCOzs7Ozs7QUFFQyw2QkFBTSxLQUFLVCxrQkFBTCxDQUF3QlksWUFBeEIsQ0FDeEJDLElBRHdCLENBQ25CLHVEQUFLLENBQUwsQ0FEbUIsRUFFeEJDLFNBRndCLEVBQU47OztBQUFmQztBQUdOLDJCQUFLTixTQUFMLEdBQWlCTSxZQUFZLENBQUNDLGdCQUFiLENBQThCLENBQTlCLENBQWpCOzs7QUFFRiwwQkFBSSxLQUFLQyxXQUFMLENBQWlCLEtBQUtULFlBQXRCLENBQUosRUFBeUM7QUFDakNVLDBDQURpQyxHQUNaQywwQ0FBTztBQUNoQ0MsaUNBQU8sRUFBRSxtQ0FEdUI7QUFFaENDLGtDQUFRLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUZzQjtBQUdoQ0Msb0NBQVUsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBSG9CO0FBSWhDQyxtQ0FBUyxFQUFFLDJCQUpxQjtBQUtoQ0Msb0NBQVUsRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMO0FBTG9CLHlCQUFQLENBRFk7QUFRdkMsNkJBQUtDLGNBQUwsR0FBc0JOLDRDQUNwQjtBQUNFTyw2QkFBRyxFQUFFLEtBQUtsQixZQUFMLENBQWtCbUIsT0FBbEIsQ0FBMEJDLFdBQTFCLENBQXNDQyxRQUQ3QztBQUVFQyw2QkFBRyxFQUFFLEtBQUt0QixZQUFMLENBQWtCbUIsT0FBbEIsQ0FBMEJDLFdBQTFCLENBQXNDRztBQUY3Qyx5QkFEb0IsRUFLcEI7QUFBRUMsOEJBQUksRUFBRWQ7QUFBUix5QkFMb0IsQ0FBdEI7QUFPQSw2QkFBS2UsZ0JBQUwsR0FBd0I7QUFDdEJDLDhCQUFJLEVBQ0YsS0FBSzFCLFlBQUwsQ0FBa0JtQixPQUFsQixDQUEwQkMsV0FBMUIsQ0FBc0NPLFlBQXRDLElBQ0EsS0FBSzNCLFlBQUwsQ0FBa0JtQixPQUFsQixDQUEwQkMsV0FBMUIsQ0FBc0NRLG1CQUhsQjtBQUl0QkMsNEJBQUUsRUFBRSxLQUFLN0IsWUFBTCxDQUFrQm1CLE9BQWxCLENBQTBCQyxXQUExQixDQUFzQ1U7QUFKcEIseUJBQXhCO0FBTUQ7O0FBQ0QsMkJBQUtDLFlBQUwsR0FBb0IsS0FBS3RDLGlCQUFMLENBQXVCdUMsYUFBdkIsQ0FBcUNDLFNBQXJDLENBQ2xCLFVBQUNDLEdBQUQsRUFBUTtBQUNOLDZCQUFJLENBQUNDLFlBQUwsR0FBb0JELEdBQXBCO0FBQ0QsdUJBSGlCLENBQXBCO0FBTUEsMkJBQUs5QyxNQUFMLENBQVlnRCxHQUFaLENBQWdCLFlBQUs7QUFDbkIsNkJBQUksQ0FBQ0MsUUFBTCxHQUFnQixJQUFoQjtBQUNELHVCQUZEOzs7Ozs7Ozs7QUFHRDs7O2lCQUVELHVCQUFXO0FBQ1QsZ0JBQUksS0FBS04sWUFBVCxFQUF1QjtBQUNyQixtQkFBS0EsWUFBTCxDQUFrQk8sV0FBbEI7QUFDRDtBQUNGOzs7aUJBRUQsMkJBQWU7QUFDYixpQkFBSy9DLGdCQUFMLENBQXNCZ0QsZ0JBQXRCO0FBQ0Q7OztpQkFFRCw0QkFBZ0I7QUFDZCxpQkFBS2hELGdCQUFMLENBQXNCaUQsZUFBdEI7QUFDRDs7O2lCQUVPLHFCQUFZQyxHQUFaLEVBQThCO0FBQ3BDLG1CQUNFQSxHQUFHLElBQ0hBLEdBQUcsQ0FBQ3RCLE9BQUosQ0FBWUMsV0FEWixJQUVBcUIsR0FBRyxDQUFDdEIsT0FBSixDQUFZQyxXQUFaLENBQXdCQyxRQUZ4QixJQUdBb0IsR0FBRyxDQUFDdEIsT0FBSixDQUFZQyxXQUFaLENBQXdCRyxTQUoxQjtBQU1EOzs7aUJBRUssdUJBQWNtQixLQUFkLEVBQXlDOzs7Ozs7OztBQUM3QywyQkFBS3RELE1BQUwsQ0FBWWdELEdBQVosQ0FBZ0IsWUFBSztBQUNuQiw4QkFBSSxDQUFDTyxjQUFMLEdBQXNCLElBQXRCO0FBQ0QsdUJBRkQ7O0FBR0EsMEJBQUksQ0FBQyxLQUFLM0MsWUFBVixFQUF3QjtBQUN0Qiw2QkFBS0EsWUFBTCxHQUFvQixLQUFLZCxtQkFBTCxDQUF5QjBELHFCQUF6QixDQUNsQixLQUFLM0MsU0FEYSxDQUFwQjtBQUdEOzs7QUFDRCw2QkFBTSxLQUFLNEMsOEJBQUwsQ0FBb0NILEtBQXBDLENBQU47OztBQUNBLDBCQUFJLEtBQUsxQyxZQUFMLENBQWtCbUIsT0FBbEIsQ0FBMEIyQixTQUE5QixFQUF5QztBQUN2Qyw2QkFBS3pELGFBQUwsQ0FBbUIwRCxlQUFuQixDQUNFLHVCQUF1QixLQUFLL0MsWUFBTCxDQUFrQkosRUFEM0M7QUFHRCx1QkFKRCxNQUlPO0FBQ0wsNkJBQUtQLGFBQUwsQ0FBbUIwRCxlQUFuQixDQUNFLDJCQUEyQixLQUFLL0MsWUFBTCxDQUFrQkosRUFEL0M7QUFHRDs7Ozs7Ozs7O0FBQ0Y7OztpQkFFYSx3Q0FBK0JvRCxHQUEvQixFQUF3RDs7Ozs7OzRCQUNoRUEsR0FBRyxLQUFLQyxTQUFSLElBQXFCLEtBQUtqRCxZQUFMLEtBQXNCaUQ7Ozs7Ozs7O0FBRy9DLDJCQUFLakQsWUFBTCxDQUFrQm1CLE9BQWxCLENBQTBCQyxXQUExQixHQUF3QzRCLEdBQXhDOztBQUNBLDZCQUFNLEtBQUs5RCxtQkFBTCxDQUF5QmdFLHFCQUF6QixDQUErQyxLQUFLbEQsWUFBcEQsQ0FBTjs7O0FBQ0EsMkJBQUsyQyxjQUFMLEdBQXNCLEtBQXRCOzs7Ozs7Ozs7QUFDRDs7Ozs7Ozt5QkFuSVUxRCxrQkFBZUg7QUFBQTs7O2NBQWZHO0FBQWVrRTtBQUFBQztBQUFBO3NFQVFmQyxzSEFBeUI7Ozs7Ozs7Ozs7Ozs7O0FEbkN0Q3ZFOzs7O0FBVUFBOztBQUNFQTs7QUFJRkE7Ozs7QUFmYUE7O0FBV2VBOztBQUFBQTs7Ozs7Ozs7OyIsIm5hbWVzIjpbInJvdXRlcyIsInBhdGgiLCJjb21wb25lbnQiLCJfb2JzX2xvY2F0aW9uX3BhZ2VfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzBfXyIsImNhbkRlYWN0aXZhdGUiLCJfc2F2ZV9hc19kcmFmdF9ndWFyZF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMl9fIiwiT2JzTG9jYXRpb25QYWdlTW9kdWxlIiwiX3NoYXJlZF9jb21wb25lbnRzX21vZHVsZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMV9fIiwiX2FuZ3VsYXJfcm91dGVyX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iLCJkZWNsYXJhdGlvbnMiLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfOF9fIiwiY3R4X3IxIiwiREVCVUdfVEFHIiwiT2JzTG9jYXRpb25QYWdlIiwicmVnaXN0cmF0aW9uU2VydmljZSIsImFjdGl2YXRlZFJvdXRlIiwibmdab25lIiwibmF2Q29udHJvbGxlciIsImZ1bGxzY3JlZW5TZXJ2aWNlIiwic3dpcGVCYWNrU2VydmljZSIsInVzZXJTZXR0aW5nU2VydmljZSIsInJlZ29ic0F1dGhTZXJ2aWNlIiwiZnVsbHNjcmVlbiQiLCJpc0Z1bGxzY3JlZW4kIiwiaWQiLCJzbmFwc2hvdCIsInBhcmFtcyIsImdldFNhdmVkUmVnaXN0cmF0aW9uQnlJZCIsInJlZ2lzdHJhdGlvbiIsImdlb0hhemFyZCIsIl9hIiwicGFyc2VJbnQiLCJ1c2VyU2V0dGluZyQiLCJwaXBlIiwidG9Qcm9taXNlIiwidXNlclNldHRpbmdzIiwiY3VycmVudEdlb0hhemFyZCIsImhhc0xvY2F0aW9uIiwibG9jYXRpb25NYXJrZXJJY29uIiwibGVhZmxldF9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfMF9fIiwiaWNvblVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInNoYWRvd1VybCIsInNoYWRvd1NpemUiLCJsb2NhdGlvbk1hcmtlciIsImxhdCIsInJlcXVlc3QiLCJPYnNMb2NhdGlvbiIsIkxhdGl0dWRlIiwibG5nIiwiTG9uZ2l0dWRlIiwiaWNvbiIsInNlbGVjdGVkTG9jYXRpb24iLCJOYW1lIiwiTG9jYXRpb25OYW1lIiwiTG9jYXRpb25EZXNjcmlwdGlvbiIsIklkIiwiT2JzTG9jYXRpb25JRCIsInN1YnNjcmlwdGlvbiIsImxvZ2dlZEluVXNlciQiLCJzdWJzY3JpYmUiLCJ2YWwiLCJsb2dnZWRJblVzZXIiLCJydW4iLCJpc0xvYWRlZCIsInVuc3Vic2NyaWJlIiwiZGlzYWJsZVN3aXBlQmFjayIsImVuYWJsZVN3aXBlQmFjayIsInJlZyIsImV2ZW50IiwiaXNTYXZlRGlzYWJsZWQiLCJjcmVhdGVOZXdSZWdpc3RyYXRpb24iLCJzZXRMb2NhdGlvbkFuZFNhdmVSZWdpc3RyYXRpb24iLCJEdE9ic1RpbWUiLCJuYXZpZ2F0ZUZvcndhcmQiLCJsb2MiLCJ1bmRlZmluZWQiLCJzYXZlUmVnaXN0cmF0aW9uQXN5bmMiLCJzZWxlY3RvcnMiLCJ2aWV3UXVlcnkiLCJfY29tcG9uZW50c19zZXRfbG9jYXRpb25faW5fbWFwX3NldF9sb2NhdGlvbl9pbl9tYXBfY29tcG9uZW50X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV80X18iXSwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL29icy1sb2NhdGlvbi5tb2R1bGUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL29icy1sb2NhdGlvbi5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvb2JzLWxvY2F0aW9uL29icy1sb2NhdGlvbi5wYWdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlcywgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgT2JzTG9jYXRpb25QYWdlIH0gZnJvbSAnLi9vYnMtbG9jYXRpb24ucGFnZSc7XHJcbmltcG9ydCB7IFNoYXJlZENvbXBvbmVudHNNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQtY29tcG9uZW50cy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTYXZlQXNEcmFmdFJvdXRlR3VhcmQgfSBmcm9tICcuLi9zYXZlLWFzLWRyYWZ0Lmd1YXJkJztcclxuXHJcbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xyXG4gIHtcclxuICAgIHBhdGg6ICcnLFxyXG4gICAgY29tcG9uZW50OiBPYnNMb2NhdGlvblBhZ2UsXHJcbiAgICBjYW5EZWFjdGl2YXRlOiBbU2F2ZUFzRHJhZnRSb3V0ZUd1YXJkXVxyXG4gIH1cclxuXTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGUsIFJvdXRlck1vZHVsZS5mb3JDaGlsZChyb3V0ZXMpXSxcclxuICBkZWNsYXJhdGlvbnM6IFtPYnNMb2NhdGlvblBhZ2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPYnNMb2NhdGlvblBhZ2VNb2R1bGUge31cclxuIiwiPGlvbi1oZWFkZXIgKm5nSWY9XCIhKGZ1bGxzY3JlZW4kIHwgYXN5bmMpXCI+XHJcbiAgPGlvbi10b29sYmFyIGFwcEhlYWRlckNvbG9yIG1vZGU9XCJpb3NcIj5cclxuICAgIDxpb24tYnV0dG9ucyBzbG90PVwic3RhcnRcIj5cclxuICAgICAgPGlvbi1iYWNrLWJ1dHRvbiB0ZXh0PVwiXCIgZGVmYXVsdEhyZWY9XCIvXCI+PC9pb24tYmFjay1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3snUkVHSVNUUkFUSU9OLk9CU19MT0NBVElPTi5USVRMRScgfCB0cmFuc2xhdGV9fVxyXG4gICAgPC9pb24tdGl0bGU+XHJcbiAgPC9pb24tdG9vbGJhcj5cclxuPC9pb24taGVhZGVyPlxyXG48aW9uLWNvbnRlbnQ+XHJcbiAgPGFwcC1zZXQtbG9jYXRpb24taW4tbWFwICpuZ0lmPVwiaXNMb2FkZWRcIiBbZ2VvSGF6YXJkXT1cImdlb0hhemFyZFwiIFtsb2NhdGlvbk1hcmtlcl09XCJsb2NhdGlvbk1hcmtlclwiXHJcbiAgICAobG9jYXRpb25TZXQpPVwib25Mb2NhdGlvblNldCgkZXZlbnQpXCIgW3NlbGVjdGVkTG9jYXRpb25dPVwic2VsZWN0ZWRMb2NhdGlvblwiIFthbGxvd0VkaXRMb2NhdGlvbk5hbWVdPVwidHJ1ZVwiXHJcbiAgICBbaXNTYXZlRGlzYWJsZWRdPVwiaXNTYXZlRGlzYWJsZWRcIj5cclxuICA8L2FwcC1zZXQtbG9jYXRpb24taW4tbWFwPlxyXG48L2lvbi1jb250ZW50PiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBOZ1pvbmUsIE9uRGVzdHJveSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIEwgZnJvbSAnbGVhZmxldCc7XHJcbmltcG9ydCB7IElSZWdpc3RyYXRpb24gfSBmcm9tICdzcmMvYXBwL21vZHVsZXMvY29tbW9uLXJlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24ubW9kZWxzJztcclxuaW1wb3J0IHsgUmVnaXN0cmF0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJhdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmF2Q29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHtcclxuICBPYnNMb2NhdGlvbnNSZXNwb25zZUR0b1YyLFxyXG4gIE9ic0xvY2F0aW9uRWRpdE1vZGVsXHJcbn0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEdlb0hhemFyZCB9IGZyb20gJ0B2YXJzb20tcmVnb2JzLWNvbW1vbi9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEZ1bGxzY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9mdWxsc2NyZWVuL2Z1bGxzY3JlZW4uc2VydmljZSc7XHJcbmltcG9ydCB7IFN3aXBlQmFja1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3N3aXBlLWJhY2svc3dpcGUtYmFjay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2VkSW5Vc2VyIH0gZnJvbSAnLi4vLi4vLi4vbG9naW4vbW9kZWxzL2xvZ2dlZC1pbi11c2VyLm1vZGVsJztcclxuaW1wb3J0IHsgU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc2V0LWxvY2F0aW9uLWluLW1hcC9zZXQtbG9jYXRpb24taW4tbWFwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFVzZXJTZXR0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXNlci1zZXR0aW5nL3VzZXItc2V0dGluZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgUmVnb2JzQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9hdXRoL3NlcnZpY2VzL3JlZ29icy1hdXRoLnNlcnZpY2UnO1xyXG5cclxuY29uc3QgREVCVUdfVEFHID0gJ09ic0xvY2F0aW9uUGFnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1vYnMtbG9jYXRpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vYnMtbG9jYXRpb24ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9vYnMtbG9jYXRpb24ucGFnZS5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE9ic0xvY2F0aW9uUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBsb2NhdGlvbk1hcmtlcjogTC5NYXJrZXI7XHJcbiAgaXNMb2FkZWQgPSBmYWxzZTtcclxuICBzZWxlY3RlZExvY2F0aW9uOiBPYnNMb2NhdGlvbnNSZXNwb25zZUR0b1YyO1xyXG4gIHJlZ2lzdHJhdGlvbjogSVJlZ2lzdHJhdGlvbjtcclxuICBmdWxsc2NyZWVuJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcclxuICBnZW9IYXphcmQ6IEdlb0hhemFyZDtcclxuICBpc1NhdmVEaXNhYmxlZCA9IGZhbHNlO1xyXG4gIEBWaWV3Q2hpbGQoU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudClcclxuICBzZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50OiBTZXRMb2NhdGlvbkluTWFwQ29tcG9uZW50O1xyXG5cclxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgbG9nZ2VkSW5Vc2VyOiBMb2dnZWRJblVzZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWdpc3RyYXRpb25TZXJ2aWNlOiBSZWdpc3RyYXRpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBuYXZDb250cm9sbGVyOiBOYXZDb250cm9sbGVyLFxyXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuU2VydmljZTogRnVsbHNjcmVlblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN3aXBlQmFja1NlcnZpY2U6IFN3aXBlQmFja1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHVzZXJTZXR0aW5nU2VydmljZTogVXNlclNldHRpbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZWdvYnNBdXRoU2VydmljZTogUmVnb2JzQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuZnVsbHNjcmVlbiQgPSB0aGlzLmZ1bGxzY3JlZW5TZXJ2aWNlLmlzRnVsbHNjcmVlbiQ7XHJcbiAgfVxyXG5cclxuICBhc3luYyBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGlkID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2lkJ107XHJcbiAgICBpZiAoaWQpIHtcclxuICAgICAgdGhpcy5yZWdpc3RyYXRpb24gPSBhd2FpdCB0aGlzLnJlZ2lzdHJhdGlvblNlcnZpY2UuZ2V0U2F2ZWRSZWdpc3RyYXRpb25CeUlkKFxyXG4gICAgICAgIGlkXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZ2VvSGF6YXJkID0gdGhpcy5yZWdpc3RyYXRpb24/Lmdlb0hhemFyZDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2dlb0hhemFyZCddKSB7XHJcbiAgICAgIHRoaXMuZ2VvSGF6YXJkID0gcGFyc2VJbnQoXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRSb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2dlb0hhemFyZCddLFxyXG4gICAgICAgIDEwXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5nZW9IYXphcmQgPT0gbnVsbCkge1xyXG4gICAgICAvLyBObyBnZW9oYXphcmQgZm91bmQsIHVzZSBhcHAgbW9kZVxyXG4gICAgICBjb25zdCB1c2VyU2V0dGluZ3MgPSBhd2FpdCB0aGlzLnVzZXJTZXR0aW5nU2VydmljZS51c2VyU2V0dGluZyRcclxuICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgIC50b1Byb21pc2UoKTtcclxuICAgICAgdGhpcy5nZW9IYXphcmQgPSB1c2VyU2V0dGluZ3MuY3VycmVudEdlb0hhemFyZFswXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmhhc0xvY2F0aW9uKHRoaXMucmVnaXN0cmF0aW9uKSkge1xyXG4gICAgICBjb25zdCBsb2NhdGlvbk1hcmtlckljb24gPSBMLmljb24oe1xyXG4gICAgICAgIGljb25Vcmw6ICcvYXNzZXRzL2ljb24vbWFwL29icy1sb2NhdGlvbi5zdmcnLFxyXG4gICAgICAgIGljb25TaXplOiBbMjUsIDQxXSxcclxuICAgICAgICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcclxuICAgICAgICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgICAgICBzaGFkb3dTaXplOiBbNDEsIDQxXVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlciA9IEwubWFya2VyKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxhdDogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5MYXRpdHVkZSxcclxuICAgICAgICAgIGxuZzogdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5Mb25naXR1ZGVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgaWNvbjogbG9jYXRpb25NYXJrZXJJY29uIH1cclxuICAgICAgKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExvY2F0aW9uID0ge1xyXG4gICAgICAgIE5hbWU6XHJcbiAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvY2F0aW9uTmFtZSB8fFxyXG4gICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5PYnNMb2NhdGlvbi5Mb2NhdGlvbkRlc2NyaXB0aW9uLFxyXG4gICAgICAgIElkOiB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uLk9ic0xvY2F0aW9uSURcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yZWdvYnNBdXRoU2VydmljZS5sb2dnZWRJblVzZXIkLnN1YnNjcmliZShcclxuICAgICAgKHZhbCkgPT4ge1xyXG4gICAgICAgIHRoaXMubG9nZ2VkSW5Vc2VyID0gdmFsO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaW9uVmlld0RpZEVudGVyKCkge1xyXG4gICAgdGhpcy5zd2lwZUJhY2tTZXJ2aWNlLmRpc2FibGVTd2lwZUJhY2soKTtcclxuICB9XHJcblxyXG4gIGlvblZpZXdXaWxsTGVhdmUoKSB7XHJcbiAgICB0aGlzLnN3aXBlQmFja1NlcnZpY2UuZW5hYmxlU3dpcGVCYWNrKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhc0xvY2F0aW9uKHJlZzogSVJlZ2lzdHJhdGlvbikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgcmVnICYmXHJcbiAgICAgIHJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uICYmXHJcbiAgICAgIHJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxhdGl0dWRlICYmXHJcbiAgICAgIHJlZy5yZXF1ZXN0Lk9ic0xvY2F0aW9uLkxvbmdpdHVkZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uTG9jYXRpb25TZXQoZXZlbnQ6IE9ic0xvY2F0aW9uRWRpdE1vZGVsKSB7XHJcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLmlzU2F2ZURpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgaWYgKCF0aGlzLnJlZ2lzdHJhdGlvbikge1xyXG4gICAgICB0aGlzLnJlZ2lzdHJhdGlvbiA9IHRoaXMucmVnaXN0cmF0aW9uU2VydmljZS5jcmVhdGVOZXdSZWdpc3RyYXRpb24oXHJcbiAgICAgICAgdGhpcy5nZW9IYXphcmQsXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCB0aGlzLnNldExvY2F0aW9uQW5kU2F2ZVJlZ2lzdHJhdGlvbihldmVudCk7XHJcbiAgICBpZiAodGhpcy5yZWdpc3RyYXRpb24ucmVxdWVzdC5EdE9ic1RpbWUpIHtcclxuICAgICAgdGhpcy5uYXZDb250cm9sbGVyLm5hdmlnYXRlRm9yd2FyZChcclxuICAgICAgICAncmVnaXN0cmF0aW9uL2VkaXQvJyArIHRoaXMucmVnaXN0cmF0aW9uLmlkXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5hdkNvbnRyb2xsZXIubmF2aWdhdGVGb3J3YXJkKFxyXG4gICAgICAgICdyZWdpc3RyYXRpb24vc2V0LXRpbWUvJyArIHRoaXMucmVnaXN0cmF0aW9uLmlkXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHNldExvY2F0aW9uQW5kU2F2ZVJlZ2lzdHJhdGlvbihsb2M6IE9ic0xvY2F0aW9uRWRpdE1vZGVsKSB7XHJcbiAgICBpZiAobG9jID09PSB1bmRlZmluZWQgfHwgdGhpcy5yZWdpc3RyYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlZ2lzdHJhdGlvbi5yZXF1ZXN0Lk9ic0xvY2F0aW9uID0gbG9jO1xyXG4gICAgYXdhaXQgdGhpcy5yZWdpc3RyYXRpb25TZXJ2aWNlLnNhdmVSZWdpc3RyYXRpb25Bc3luYyh0aGlzLnJlZ2lzdHJhdGlvbik7XHJcbiAgICB0aGlzLmlzU2F2ZURpc2FibGVkID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==