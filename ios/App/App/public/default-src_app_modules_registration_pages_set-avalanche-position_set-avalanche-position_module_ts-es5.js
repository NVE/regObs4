(function () {
  "use strict";

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkregobs4"] = self["webpackChunkregobs4"] || []).push([["default-src_app_modules_registration_pages_set-avalanche-position_set-avalanche-position_module_ts"], {
    /***/
    41889: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetAvalanchePositionPageModule": function SetAvalanchePositionPageModule() {
          return (
            /* binding */
            _SetAvalanchePositionPageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../shared-components.module */
      22623);
      /* harmony import */


      var _set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./set-avalanche-position.page */
      71022);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _SetAvalanchePositionPageModule = function _SetAvalanchePositionPageModule() {
        _classCallCheck(this, _SetAvalanchePositionPageModule);
      };

      _SetAvalanchePositionPageModule.ɵfac = function SetAvalanchePositionPageModule_Factory(t) {
        return new (t || _SetAvalanchePositionPageModule)();
      };

      _SetAvalanchePositionPageModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _SetAvalanchePositionPageModule
      });
      _SetAvalanchePositionPageModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_SetAvalanchePositionPageModule, {
          declarations: [_set_avalanche_position_page__WEBPACK_IMPORTED_MODULE_1__.SetAvalanchePositionPage],
          imports: [_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule]
        });
      })();
      /***/

    },

    /***/
    71022: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SetAvalanchePositionPage": function SetAvalanchePositionPage() {
          return (
            /* binding */
            _SetAvalanchePositionPage
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


      var _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../components/set-location-in-map/set-location-in-map.component */
      5717);
      /* harmony import */


      var _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @varsom-regobs-common/core */
      36714);
      /* harmony import */


      var _core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../../core/services/fullscreen/fullscreen.service */
      13653);
      /* harmony import */


      var _core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../../core/services/swipe-back/swipe-back.service */
      84716);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ngx-translate/core */
      70325);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/angular */
      7602);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../../shared/directives/header-color/header-color.directive */
      17486);

      function SetAvalanchePositionPage_ion_header_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header");

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "ion-toolbar", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-buttons", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "ion-button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function SetAvalanchePositionPage_ion_header_0_Template_ion_button_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r2.cancel();
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
        }

        if (rf & 2) {
          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 2, "DIALOGS.CANCEL"));

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 4, ctx_r0.geoHazard === ctx_r0.GeoHazard.Snow ? "REGISTRATION.SNOW.AVALANCHE_OBS.SET_AVALANCHE_POSITION" : "REGISTRATION.DIRT.LAND_SLIDE_OBS.SET_LANDSLIDE_POSITION"), " ");
        }
      }

      function SetAvalanchePositionPage_app_set_location_in_map_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-set-location-in-map", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("mapReady", function SetAvalanchePositionPage_app_set_location_in_map_3_Template_app_set_location_in_map_mapReady_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r4.onMapReady($event);
          })("locationSet", function SetAvalanchePositionPage_app_set_location_in_map_3_Template_app_set_location_in_map_locationSet_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

            return ctx_r6.onLocationSet($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("geoHazard", ctx_r1.geoHazard)("fromMarker", ctx_r1.fromMarker)("locationMarker", ctx_r1.locationMarker)("confirmLocationText", ctx_r1.confirmLocationText)("showPreviousUsedLocations", false)("locationTitle", ctx_r1.locationText)("showPolyline", false)("showFromMarkerInDetails", false)("locationMarkerIconUrl", ctx_r1.locationMarkerIconUrl);
        }
      }

      var _SetAvalanchePositionPage = /*#__PURE__*/function () {
        function _SetAvalanchePositionPage(cdr, translateService, ngZone, fullscreenService, swipeBackService, modalController) {
          _classCallCheck(this, _SetAvalanchePositionPage);

          this.cdr = cdr;
          this.translateService = translateService;
          this.ngZone = ngZone;
          this.fullscreenService = fullscreenService;
          this.swipeBackService = swipeBackService;
          this.modalController = modalController;
          this.showPolyline = true;
          this.GeoHazard = _varsom_regobs_common_core__WEBPACK_IMPORTED_MODULE_6__.GeoHazard;
          this.confirmLocationText = '';
          this.locationText = '';
          this.startImageUrl = '/assets/icon/map/GPS_start.svg';
          this.startIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: this.startImageUrl,
            iconSize: [27, 42],
            iconAnchor: [13.5, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
          });
          this.endImageUrl = '/assets/icon/map/GPS_stop.svg';
          this.endIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: this.endImageUrl,
            iconSize: [27, 42],
            iconAnchor: [13.5, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
          });
          this.locationMarkerIcon = leaflet__WEBPACK_IMPORTED_MODULE_0__.icon({
            iconUrl: '/assets/icon/map/obs-location.svg',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: 'leaflet/marker-shadow.png',
            shadowSize: [41, 41]
          });
          this.startIsActive = true;
          this.locationMarkerIconUrl = this.startImageUrl;
          this.fullscreen$ = this.fullscreenService.isFullscreen$;
        }

        _createClass(_SetAvalanchePositionPage, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var _this = this;

              var fallbackLatlng;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.translateService.get(['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION', 'REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION', 'DIALOGS.CONFIRM']).toPromise();

                    case 2:
                      this.translations = _context.sent;
                      fallbackLatlng = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(59.1, 10.3);

                      if (this.startLatLng) {
                        this.start = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.startLatLng.lat, this.startLatLng.lng);
                      }

                      if (this.endLatLng) {
                        this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(this.endLatLng.lat, this.endLatLng.lng);
                      }

                      this.locationMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.relativeToLatLng || fallbackLatlng, {
                        icon: this.startIcon
                      });
                      this.startMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.locationMarker.getLatLng(), {
                        icon: this.startIcon
                      }).on('click', function () {
                        if (!_this.startIsActive) {
                          _this.end = _this.locationMarker.getLatLng();
                        }

                        _this.startIsActive = true;

                        _this.updateMarkers();
                      });
                      this.endMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.locationMarker.getLatLng(), {
                        icon: this.endIcon
                      }).on('click', function () {
                        if (_this.startIsActive) {
                          _this.start = _this.locationMarker.getLatLng();
                        }

                        _this.startIsActive = false;

                        _this.updateMarkers();
                      });

                      if (this.relativeToLatLng) {
                        this.fromMarker = leaflet__WEBPACK_IMPORTED_MODULE_0__.marker(this.relativeToLatLng, {
                          icon: this.locationMarkerIcon
                        });
                      }

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "onMapReady",
          value: function onMapReady(map) {
            var _this2 = this;

            this.map = map;
            setTimeout(function () {
              _this2.updateMarkers();
            });
            this.ngZone.runOutsideAngular(function () {
              _this2.map.on('drag', function () {
                return _this2.updatePolyline();
              });

              _this2.updatePolyline();
            });
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
          key: "setStartLocationText",
          value: function setStartLocationText() {
            this.confirmLocationText = "".concat(this.translations['DIALOGS.CONFIRM'], " ").concat(this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'].toLowerCase());
            this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.START_POSITION'];
            this.locationMarkerIconUrl = this.startImageUrl;
          }
        }, {
          key: "setEndLocationText",
          value: function setEndLocationText() {
            this.confirmLocationText = "".concat(this.translations['DIALOGS.CONFIRM'], " ").concat(this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'].toLowerCase());
            this.locationText = this.translations['REGISTRATION.DIRT.LAND_SLIDE_OBS.END_POSITION'];
            this.locationMarkerIconUrl = this.endImageUrl;
          }
        }, {
          key: "updateMarkers",
          value: function updateMarkers() {
            this.startMarker.remove();
            this.endMarker.remove();

            if (!this.start) {
              this.locationMarker.setIcon(this.startIcon);
              this.setStartLocationText();
            } else {
              if (this.startIsActive) {
                this.locationMarker.setIcon(this.startIcon);
                this.locationMarker.setLatLng(this.start);
                this.setStartLocationText();

                if (this.end) {
                  this.endMarker.setLatLng(this.end);
                  this.endMarker.addTo(this.map);
                }
              } else {
                this.locationMarker.setIcon(this.endIcon);
                this.locationMarker.setLatLng(this.end || this.start);
                this.setEndLocationText();
                this.startMarker.setLatLng(this.start);
                this.startMarker.addTo(this.map);
              }
            }

            this.map.panTo(this.locationMarker.getLatLng());
            this.cdr.detectChanges();
          }
        }, {
          key: "updatePolyline",
          value: function updatePolyline() {
            if (this.end || this.start) {
              var path = [this.locationMarker.getLatLng(), this.startIsActive ? this.end : this.start];

              if (!this.pathLine) {
                this.pathLine = leaflet__WEBPACK_IMPORTED_MODULE_0__.polyline(path, {
                  color: 'red',
                  weight: 6,
                  opacity: 0.9
                }).addTo(this.map);
              } else {
                this.pathLine.setLatLngs(path);
              }
            }
          }
        }, {
          key: "onLocationSet",
          value: function onLocationSet(event) {
            return (0, tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (this.startIsActive) {
                        this.start = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);

                        if (this.end) {
                          this.map.panTo(this.end);
                        } else {
                          this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);
                        }

                        this.startIsActive = false;
                        this.updateMarkers();
                      } else {
                        this.end = leaflet__WEBPACK_IMPORTED_MODULE_0__.latLng(event.Latitude, event.Longitude);
                        this.modalController.dismiss({
                          start: this.start,
                          end: this.end
                        });
                      }

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
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

        return _SetAvalanchePositionPage;
      }();

      _SetAvalanchePositionPage.ɵfac = function SetAvalanchePositionPage_Factory(t) {
        return new (t || _SetAvalanchePositionPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_fullscreen_fullscreen_service__WEBPACK_IMPORTED_MODULE_2__.FullscreenService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_core_services_swipe_back_swipe_back_service__WEBPACK_IMPORTED_MODULE_3__.SwipeBackService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController));
      };

      _SetAvalanchePositionPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _SetAvalanchePositionPage,
        selectors: [["app-set-avalanche-position"]],
        viewQuery: function SetAvalanchePositionPage_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__.SetLocationInMapComponent, 5);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.setLocationInMapComponent = _t.first);
          }
        },
        inputs: {
          startLatLng: "startLatLng",
          endLatLng: "endLatLng",
          relativeToLatLng: "relativeToLatLng",
          geoHazard: "geoHazard",
          showPolyline: "showPolyline"
        },
        decls: 4,
        vars: 4,
        consts: [[4, "ngIf"], ["fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "confirmLocationText", "showPreviousUsedLocations", "locationTitle", "showPolyline", "showFromMarkerInDetails", "locationMarkerIconUrl", "mapReady", "locationSet", 4, "ngIf"], ["appHeaderColor", "", "mode", "ios"], ["slot", "start"], [3, "click"], ["fromLocationText", "REGISTRATION.OBS_LOCATION.TITLE", 3, "geoHazard", "fromMarker", "locationMarker", "confirmLocationText", "showPreviousUsedLocations", "locationTitle", "showPolyline", "showFromMarkerInDetails", "locationMarkerIconUrl", "mapReady", "locationSet"]],
        template: function SetAvalanchePositionPage_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](0, SetAvalanchePositionPage_ion_header_0_Template, 9, 6, "ion-header", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "ion-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, SetAvalanchePositionPage_app_set_location_in_map_3_Template, 1, 9, "app-set-location-in-map", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](1, 2, ctx.fullscreen$));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.fromMarker);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonToolbar, _shared_directives_header_color_header_color_directive__WEBPACK_IMPORTED_MODULE_4__.HeaderColorDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonTitle, _components_set_location_in_map_set_location_in_map_component__WEBPACK_IMPORTED_MODULE_1__.SetLocationInMapComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.AsyncPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslatePipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZXQtYXZhbGFuY2hlLXBvc2l0aW9uLnBhZ2Uuc2NzcyJ9 */"]
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNFLFNBQS9CLENBQVg7QUFDRDs7QUFDRCw2QkFBS2hDLGFBQUwsR0FBcUIsS0FBckI7QUFDQSw2QkFBS0MsYUFBTDtBQUNELHVCQVRELE1BU087QUFDTCw2QkFBS1QsR0FBTCxHQUFXbkIsNENBQVN5RCxLQUFLLENBQUNDLFFBQWYsRUFBeUJELEtBQUssQ0FBQ0UsU0FBL0IsQ0FBWDtBQUNBLDZCQUFLN0QsZUFBTCxDQUFxQjhELE9BQXJCLENBQTZCO0FBQUU3QywrQkFBSyxFQUFFLEtBQUtBLEtBQWQ7QUFBcUJJLDZCQUFHLEVBQUUsS0FBS0E7QUFBL0IseUJBQTdCO0FBQ0Q7Ozs7Ozs7OztBQUNGOzs7aUJBRUQsa0JBQU07QUFDSixpQkFBS3JCLGVBQUwsQ0FBcUI4RCxPQUFyQjtBQUNEOzs7aUJBRUQsY0FBRTtBQUNBLGlCQUFLQyx5QkFBTCxDQUErQkMsZUFBL0I7QUFDRDs7Ozs7Ozt5QkF4TlV0RSwyQkFBd0JGO0FBQUE7OztjQUF4QkU7QUFBd0J1RTtBQUFBQztBQUFBO3NFQWlEeEJDLHNIQUF5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FEeEV0QzNFOzs7O0FBV0FBOztBQUNFQTs7QUFLRkE7Ozs7QUFqQmFBOztBQVllQTs7QUFBQUE7Ozs7Ozs7OzsiLCJuYW1lcyI6WyJTZXRBdmFsYW5jaGVQb3NpdGlvblBhZ2VNb2R1bGUiLCJfc2hhcmVkX2NvbXBvbmVudHNfbW9kdWxlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJkZWNsYXJhdGlvbnMiLCJfc2V0X2F2YWxhbmNoZV9wb3NpdGlvbl9wYWdlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8xX18iLCJpbXBvcnRzIiwiX2FuZ3VsYXJfY29yZV9fV0VCUEFDS19JTVBPUlRFRF9NT0RVTEVfNV9fIiwiY3R4X3IxIiwiU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlIiwiY2RyIiwidHJhbnNsYXRlU2VydmljZSIsIm5nWm9uZSIsImZ1bGxzY3JlZW5TZXJ2aWNlIiwic3dpcGVCYWNrU2VydmljZSIsIm1vZGFsQ29udHJvbGxlciIsIl92YXJzb21fcmVnb2JzX2NvbW1vbl9jb3JlX19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV82X18iLCJsZWFmbGV0X19XRUJQQUNLX0lNUE9SVEVEX01PRFVMRV8wX18iLCJpY29uVXJsIiwic3RhcnRJbWFnZVVybCIsImljb25TaXplIiwiaWNvbkFuY2hvciIsInNoYWRvd1VybCIsInNoYWRvd1NpemUiLCJlbmRJbWFnZVVybCIsImZ1bGxzY3JlZW4kIiwiaXNGdWxsc2NyZWVuJCIsImdldCIsInRvUHJvbWlzZSIsInRyYW5zbGF0aW9ucyIsImZhbGxiYWNrTGF0bG5nIiwic3RhcnRMYXRMbmciLCJzdGFydCIsImxhdCIsImxuZyIsImVuZExhdExuZyIsImVuZCIsImxvY2F0aW9uTWFya2VyIiwicmVsYXRpdmVUb0xhdExuZyIsImljb24iLCJzdGFydEljb24iLCJzdGFydE1hcmtlciIsImdldExhdExuZyIsIm9uIiwic3RhcnRJc0FjdGl2ZSIsInVwZGF0ZU1hcmtlcnMiLCJlbmRNYXJrZXIiLCJlbmRJY29uIiwiZnJvbU1hcmtlciIsImxvY2F0aW9uTWFya2VySWNvbiIsIm1hcCIsInNldFRpbWVvdXQiLCJydW5PdXRzaWRlQW5ndWxhciIsInVwZGF0ZVBvbHlsaW5lIiwiZGlzYWJsZVN3aXBlQmFjayIsImVuYWJsZVN3aXBlQmFjayIsImNvbmZpcm1Mb2NhdGlvblRleHQiLCJ0b0xvd2VyQ2FzZSIsImxvY2F0aW9uVGV4dCIsImxvY2F0aW9uTWFya2VySWNvblVybCIsInJlbW92ZSIsInNldEljb24iLCJzZXRTdGFydExvY2F0aW9uVGV4dCIsInNldExhdExuZyIsImFkZFRvIiwic2V0RW5kTG9jYXRpb25UZXh0IiwicGFuVG8iLCJkZXRlY3RDaGFuZ2VzIiwicGF0aCIsInBhdGhMaW5lIiwiY29sb3IiLCJ3ZWlnaHQiLCJvcGFjaXR5Iiwic2V0TGF0TG5ncyIsImV2ZW50IiwiTGF0aXR1ZGUiLCJMb25naXR1ZGUiLCJkaXNtaXNzIiwic2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudCIsImNvbmZpcm1Mb2NhdGlvbiIsInNlbGVjdG9ycyIsInZpZXdRdWVyeSIsIl9jb21wb25lbnRzX3NldF9sb2NhdGlvbl9pbl9tYXBfc2V0X2xvY2F0aW9uX2luX21hcF9jb21wb25lbnRfX1dFQlBBQ0tfSU1QT1JURURfTU9EVUxFXzFfXyJdLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2FwcC9tb2R1bGVzL3JlZ2lzdHJhdGlvbi9wYWdlcy9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uL3NldC1hdmFsYW5jaGUtcG9zaXRpb24ubW9kdWxlLnRzIiwid2VicGFjazovLy9zcmMvYXBwL21vZHVsZXMvcmVnaXN0cmF0aW9uL3BhZ2VzL3NldC1hdmFsYW5jaGUtcG9zaXRpb24vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlLmh0bWwiLCJ3ZWJwYWNrOi8vL3NyYy9hcHAvbW9kdWxlcy9yZWdpc3RyYXRpb24vcGFnZXMvc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uLnBhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2hhcmVkQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC1jb21wb25lbnRzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNldEF2YWxhbmNoZVBvc2l0aW9uUGFnZSB9IGZyb20gJy4vc2V0LWF2YWxhbmNoZS1wb3NpdGlvbi5wYWdlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1NoYXJlZENvbXBvbmVudHNNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1NldEF2YWxhbmNoZVBvc2l0aW9uUGFnZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0QXZhbGFuY2hlUG9zaXRpb25QYWdlTW9kdWxlIHt9XHJcbiIsIjxpb24taGVhZGVyICpuZ0lmPVwiIShmdWxsc2NyZWVuJCB8IGFzeW5jKVwiPlxyXG4gIDxpb24tdG9vbGJhciBhcHBIZWFkZXJDb2xvciBtb2RlPVwiaW9zXCI+XHJcbiAgICA8aW9uLWJ1dHRvbnMgc2xvdD1cInN0YXJ0XCI+XHJcbiAgICAgIDxpb24tYnV0dG9uIChjbGljayk9XCJjYW5jZWwoKVwiPnt7ICdESUFMT0dTLkNBTkNFTCcgfCB0cmFuc2xhdGUgfX08L2lvbi1idXR0b24+XHJcbiAgICA8L2lvbi1idXR0b25zPlxyXG4gICAgPGlvbi10aXRsZT5cclxuICAgICAge3sgKGdlb0hhemFyZCA9PT0gR2VvSGF6YXJkLlNub3cgPyAnUkVHSVNUUkFUSU9OLlNOT1cuQVZBTEFOQ0hFX09CUy5TRVRfQVZBTEFOQ0hFX1BPU0lUSU9OJyA6XHJcbiAgICAgICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5TRVRfTEFORFNMSURFX1BPU0lUSU9OJykgfCB0cmFuc2xhdGUgfX1cclxuICAgIDwvaW9uLXRpdGxlPlxyXG4gIDwvaW9uLXRvb2xiYXI+XHJcbjwvaW9uLWhlYWRlcj5cclxuPGlvbi1jb250ZW50PlxyXG4gIDxhcHAtc2V0LWxvY2F0aW9uLWluLW1hcCAqbmdJZj1cImZyb21NYXJrZXJcIiBbZ2VvSGF6YXJkXT1cImdlb0hhemFyZFwiIChtYXBSZWFkeSk9XCJvbk1hcFJlYWR5KCRldmVudClcIiBbZnJvbU1hcmtlcl09XCJmcm9tTWFya2VyXCJcclxuICAgIFtsb2NhdGlvbk1hcmtlcl09XCJsb2NhdGlvbk1hcmtlclwiIChsb2NhdGlvblNldCk9XCJvbkxvY2F0aW9uU2V0KCRldmVudClcIiBbY29uZmlybUxvY2F0aW9uVGV4dF09XCJjb25maXJtTG9jYXRpb25UZXh0XCJcclxuICAgIGZyb21Mb2NhdGlvblRleHQ9XCJSRUdJU1RSQVRJT04uT0JTX0xPQ0FUSU9OLlRJVExFXCIgW3Nob3dQcmV2aW91c1VzZWRMb2NhdGlvbnNdPVwiZmFsc2VcIiBbbG9jYXRpb25UaXRsZV09XCJsb2NhdGlvblRleHRcIlxyXG4gICAgW3Nob3dQb2x5bGluZV09XCJmYWxzZVwiIFtzaG93RnJvbU1hcmtlckluRGV0YWlsc109XCJmYWxzZVwiIFtsb2NhdGlvbk1hcmtlckljb25VcmxdPVwibG9jYXRpb25NYXJrZXJJY29uVXJsXCI+XHJcbiAgPC9hcHAtc2V0LWxvY2F0aW9uLWluLW1hcD5cclxuPC9pb24tY29udGVudD4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgSW5wdXQsXHJcbiAgTmdab25lLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XHJcbmltcG9ydCB7IE9ic0xvY2F0aW9uRWRpdE1vZGVsIH0gZnJvbSAnQHZhcnNvbS1yZWdvYnMtY29tbW9uL3JlZ29icy1hcGknO1xyXG5pbXBvcnQgKiBhcyBMIGZyb20gJ2xlYWZsZXQnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NldC1sb2NhdGlvbi1pbi1tYXAvc2V0LWxvY2F0aW9uLWluLW1hcC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBHZW9IYXphcmQgfSBmcm9tICdAdmFyc29tLXJlZ29icy1jb21tb24vY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRnVsbHNjcmVlblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jb3JlL3NlcnZpY2VzL2Z1bGxzY3JlZW4vZnVsbHNjcmVlbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3dpcGVCYWNrU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvc2VydmljZXMvc3dpcGUtYmFjay9zd2lwZS1iYWNrLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtc2V0LWF2YWxhbmNoZS1wb3NpdGlvbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldC1hdmFsYW5jaGUtcG9zaXRpb24ucGFnZS5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zZXQtYXZhbGFuY2hlLXBvc2l0aW9uLnBhZ2Uuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXRBdmFsYW5jaGVQb3NpdGlvblBhZ2UgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIHN0YXJ0TGF0TG5nPzogTC5MYXRMbmc7XHJcbiAgQElucHV0KCkgZW5kTGF0TG5nPzogTC5MYXRMbmc7XHJcbiAgQElucHV0KCkgcmVsYXRpdmVUb0xhdExuZz86IEwuTGF0TG5nO1xyXG4gIEBJbnB1dCgpIGdlb0hhemFyZDogR2VvSGF6YXJkO1xyXG4gIEBJbnB1dCgpIHNob3dQb2x5bGluZSA9IHRydWU7XHJcblxyXG4gIEdlb0hhemFyZCA9IEdlb0hhemFyZDtcclxuXHJcbiAgc3RhcnQ6IEwuTGF0TG5nO1xyXG4gIGVuZDogTC5MYXRMbmc7XHJcbiAgcHJpdmF0ZSBtYXA6IEwuTWFwO1xyXG4gIHByaXZhdGUgcGF0aExpbmU6IEwuUG9seWxpbmU7XHJcblxyXG4gIGZyb21NYXJrZXI6IEwuTWFya2VyO1xyXG4gIGxvY2F0aW9uTWFya2VyOiBMLk1hcmtlcjtcclxuICBjb25maXJtTG9jYXRpb25UZXh0ID0gJyc7XHJcbiAgbG9jYXRpb25UZXh0ID0gJyc7XHJcbiAgc3RhcnRJbWFnZVVybCA9ICcvYXNzZXRzL2ljb24vbWFwL0dQU19zdGFydC5zdmcnO1xyXG4gIHByaXZhdGUgc3RhcnRJY29uID0gTC5pY29uKHtcclxuICAgIGljb25Vcmw6IHRoaXMuc3RhcnRJbWFnZVVybCxcclxuICAgIGljb25TaXplOiBbMjcsIDQyXSxcclxuICAgIGljb25BbmNob3I6IFsxMy41LCA0MV0sXHJcbiAgICBzaGFkb3dVcmw6ICdsZWFmbGV0L21hcmtlci1zaGFkb3cucG5nJyxcclxuICAgIHNoYWRvd1NpemU6IFs0MSwgNDFdXHJcbiAgfSk7XHJcbiAgZW5kSW1hZ2VVcmwgPSAnL2Fzc2V0cy9pY29uL21hcC9HUFNfc3RvcC5zdmcnO1xyXG4gIHByaXZhdGUgZW5kSWNvbiA9IEwuaWNvbih7XHJcbiAgICBpY29uVXJsOiB0aGlzLmVuZEltYWdlVXJsLFxyXG4gICAgaWNvblNpemU6IFsyNywgNDJdLFxyXG4gICAgaWNvbkFuY2hvcjogWzEzLjUsIDQxXSxcclxuICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQxLCA0MV1cclxuICB9KTtcclxuICBsb2NhdGlvbk1hcmtlckljb24gPSBMLmljb24oe1xyXG4gICAgaWNvblVybDogJy9hc3NldHMvaWNvbi9tYXAvb2JzLWxvY2F0aW9uLnN2ZycsXHJcbiAgICBpY29uU2l6ZTogWzI1LCA0MV0sXHJcbiAgICBpY29uQW5jaG9yOiBbMTIsIDQxXSxcclxuICAgIHNoYWRvd1VybDogJ2xlYWZsZXQvbWFya2VyLXNoYWRvdy5wbmcnLFxyXG4gICAgc2hhZG93U2l6ZTogWzQxLCA0MV1cclxuICB9KTtcclxuICBwcml2YXRlIHN0YXJ0TWFya2VyOiBMLk1hcmtlcjtcclxuICBwcml2YXRlIGVuZE1hcmtlcjogTC5NYXJrZXI7XHJcbiAgcHJpdmF0ZSB0cmFuc2xhdGlvbnM7XHJcbiAgcHJpdmF0ZSBzdGFydElzQWN0aXZlID0gdHJ1ZTtcclxuICBsb2NhdGlvbk1hcmtlckljb25VcmwgPSB0aGlzLnN0YXJ0SW1hZ2VVcmw7XHJcblxyXG4gIGZ1bGxzY3JlZW4kOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xyXG5cclxuICBAVmlld0NoaWxkKFNldExvY2F0aW9uSW5NYXBDb21wb25lbnQpXHJcbiAgc2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudDogU2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBmdWxsc2NyZWVuU2VydmljZTogRnVsbHNjcmVlblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHN3aXBlQmFja1NlcnZpY2U6IFN3aXBlQmFja1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIG1vZGFsQ29udHJvbGxlcjogTW9kYWxDb250cm9sbGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmZ1bGxzY3JlZW4kID0gdGhpcy5mdWxsc2NyZWVuU2VydmljZS5pc0Z1bGxzY3JlZW4kO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnRyYW5zbGF0aW9ucyA9IGF3YWl0IHRoaXMudHJhbnNsYXRlU2VydmljZVxyXG4gICAgICAuZ2V0KFtcclxuICAgICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU1RBUlRfUE9TSVRJT04nLFxyXG4gICAgICAgICdSRUdJU1RSQVRJT04uRElSVC5MQU5EX1NMSURFX09CUy5FTkRfUE9TSVRJT04nLFxyXG4gICAgICAgICdESUFMT0dTLkNPTkZJUk0nXHJcbiAgICAgIF0pXHJcbiAgICAgIC50b1Byb21pc2UoKTtcclxuICAgIGNvbnN0IGZhbGxiYWNrTGF0bG5nID0gTC5sYXRMbmcoNTkuMSwgMTAuMyk7XHJcbiAgICBpZiAodGhpcy5zdGFydExhdExuZykge1xyXG4gICAgICB0aGlzLnN0YXJ0ID0gTC5sYXRMbmcodGhpcy5zdGFydExhdExuZy5sYXQsIHRoaXMuc3RhcnRMYXRMbmcubG5nKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmVuZExhdExuZykge1xyXG4gICAgICB0aGlzLmVuZCA9IEwubGF0TG5nKHRoaXMuZW5kTGF0TG5nLmxhdCwgdGhpcy5lbmRMYXRMbmcubG5nKTtcclxuICAgIH1cclxuICAgIHRoaXMubG9jYXRpb25NYXJrZXIgPSBMLm1hcmtlcih0aGlzLnJlbGF0aXZlVG9MYXRMbmcgfHwgZmFsbGJhY2tMYXRsbmcsIHtcclxuICAgICAgaWNvbjogdGhpcy5zdGFydEljb25cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zdGFydE1hcmtlciA9IEwubWFya2VyKHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCksIHtcclxuICAgICAgaWNvbjogdGhpcy5zdGFydEljb25cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLnN0YXJ0SXNBY3RpdmUpIHtcclxuICAgICAgICB0aGlzLmVuZCA9IHRoaXMubG9jYXRpb25NYXJrZXIuZ2V0TGF0TG5nKCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zdGFydElzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy51cGRhdGVNYXJrZXJzKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZW5kTWFya2VyID0gTC5tYXJrZXIodGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKSwge1xyXG4gICAgICBpY29uOiB0aGlzLmVuZEljb25cclxuICAgIH0pLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnRJc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmxvY2F0aW9uTWFya2VyLmdldExhdExuZygpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhcnRJc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1hcmtlcnMoKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMucmVsYXRpdmVUb0xhdExuZykge1xyXG4gICAgICB0aGlzLmZyb21NYXJrZXIgPSBMLm1hcmtlcih0aGlzLnJlbGF0aXZlVG9MYXRMbmcsIHtcclxuICAgICAgICBpY29uOiB0aGlzLmxvY2F0aW9uTWFya2VySWNvblxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uTWFwUmVhZHkobWFwOiBMLk1hcCkge1xyXG4gICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGVNYXJrZXJzKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgdGhpcy5tYXAub24oJ2RyYWcnLCAoKSA9PiB0aGlzLnVwZGF0ZVBvbHlsaW5lKCkpO1xyXG4gICAgICB0aGlzLnVwZGF0ZVBvbHlsaW5lKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlvblZpZXdEaWRFbnRlcigpIHtcclxuICAgIHRoaXMuc3dpcGVCYWNrU2VydmljZS5kaXNhYmxlU3dpcGVCYWNrKCk7XHJcbiAgfVxyXG5cclxuICBpb25WaWV3V2lsbExlYXZlKCkge1xyXG4gICAgdGhpcy5zd2lwZUJhY2tTZXJ2aWNlLmVuYWJsZVN3aXBlQmFjaygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRTdGFydExvY2F0aW9uVGV4dCgpIHtcclxuICAgIHRoaXMuY29uZmlybUxvY2F0aW9uVGV4dCA9IGAke1xyXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1snRElBTE9HUy5DT05GSVJNJ11cclxuICAgIH0gJHt0aGlzLnRyYW5zbGF0aW9uc1tcclxuICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLlNUQVJUX1BPU0lUSU9OJ1xyXG4gICAgXS50b0xvd2VyQ2FzZSgpfWA7XHJcbiAgICB0aGlzLmxvY2F0aW9uVGV4dCA9IHRoaXMudHJhbnNsYXRpb25zW1xyXG4gICAgICAnUkVHSVNUUkFUSU9OLkRJUlQuTEFORF9TTElERV9PQlMuU1RBUlRfUE9TSVRJT04nXHJcbiAgICBdO1xyXG4gICAgdGhpcy5sb2NhdGlvbk1hcmtlckljb25VcmwgPSB0aGlzLnN0YXJ0SW1hZ2VVcmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldEVuZExvY2F0aW9uVGV4dCgpIHtcclxuICAgIHRoaXMuY29uZmlybUxvY2F0aW9uVGV4dCA9IGAke1xyXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uc1snRElBTE9HUy5DT05GSVJNJ11cclxuICAgIH0gJHt0aGlzLnRyYW5zbGF0aW9uc1tcclxuICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkVORF9QT1NJVElPTidcclxuICAgIF0udG9Mb3dlckNhc2UoKX1gO1xyXG4gICAgdGhpcy5sb2NhdGlvblRleHQgPSB0aGlzLnRyYW5zbGF0aW9uc1tcclxuICAgICAgJ1JFR0lTVFJBVElPTi5ESVJULkxBTkRfU0xJREVfT0JTLkVORF9QT1NJVElPTidcclxuICAgIF07XHJcbiAgICB0aGlzLmxvY2F0aW9uTWFya2VySWNvblVybCA9IHRoaXMuZW5kSW1hZ2VVcmw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZU1hcmtlcnMoKSB7XHJcbiAgICB0aGlzLnN0YXJ0TWFya2VyLnJlbW92ZSgpO1xyXG4gICAgdGhpcy5lbmRNYXJrZXIucmVtb3ZlKCk7XHJcbiAgICBpZiAoIXRoaXMuc3RhcnQpIHtcclxuICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRJY29uKHRoaXMuc3RhcnRJY29uKTtcclxuICAgICAgdGhpcy5zZXRTdGFydExvY2F0aW9uVGV4dCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuc3RhcnRJc0FjdGl2ZSkge1xyXG4gICAgICAgIHRoaXMubG9jYXRpb25NYXJrZXIuc2V0SWNvbih0aGlzLnN0YXJ0SWNvbik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRMYXRMbmcodGhpcy5zdGFydCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGFydExvY2F0aW9uVGV4dCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuZCkge1xyXG4gICAgICAgICAgdGhpcy5lbmRNYXJrZXIuc2V0TGF0TG5nKHRoaXMuZW5kKTtcclxuICAgICAgICAgIHRoaXMuZW5kTWFya2VyLmFkZFRvKHRoaXMubWFwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRJY29uKHRoaXMuZW5kSWNvbik7XHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5zZXRMYXRMbmcodGhpcy5lbmQgfHwgdGhpcy5zdGFydCk7XHJcbiAgICAgICAgdGhpcy5zZXRFbmRMb2NhdGlvblRleHQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0TWFya2VyLnNldExhdExuZyh0aGlzLnN0YXJ0KTtcclxuICAgICAgICB0aGlzLnN0YXJ0TWFya2VyLmFkZFRvKHRoaXMubWFwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5tYXAucGFuVG8odGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKSk7XHJcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQb2x5bGluZSgpIHtcclxuICAgIGlmICh0aGlzLmVuZCB8fCB0aGlzLnN0YXJ0KSB7XHJcbiAgICAgIGNvbnN0IHBhdGggPSBbXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbk1hcmtlci5nZXRMYXRMbmcoKSxcclxuICAgICAgICB0aGlzLnN0YXJ0SXNBY3RpdmUgPyB0aGlzLmVuZCA6IHRoaXMuc3RhcnRcclxuICAgICAgXTtcclxuICAgICAgaWYgKCF0aGlzLnBhdGhMaW5lKSB7XHJcbiAgICAgICAgdGhpcy5wYXRoTGluZSA9IEwucG9seWxpbmUocGF0aCwge1xyXG4gICAgICAgICAgY29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgd2VpZ2h0OiA2LFxyXG4gICAgICAgICAgb3BhY2l0eTogMC45XHJcbiAgICAgICAgfSkuYWRkVG8odGhpcy5tYXApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGF0aExpbmUuc2V0TGF0TG5ncyhwYXRoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgb25Mb2NhdGlvblNldChldmVudDogT2JzTG9jYXRpb25FZGl0TW9kZWwpIHtcclxuICAgIGlmICh0aGlzLnN0YXJ0SXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5zdGFydCA9IEwubGF0TG5nKGV2ZW50LkxhdGl0dWRlLCBldmVudC5Mb25naXR1ZGUpO1xyXG4gICAgICBpZiAodGhpcy5lbmQpIHtcclxuICAgICAgICB0aGlzLm1hcC5wYW5Ubyh0aGlzLmVuZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5lbmQgPSBMLmxhdExuZyhldmVudC5MYXRpdHVkZSwgZXZlbnQuTG9uZ2l0dWRlKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnN0YXJ0SXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy51cGRhdGVNYXJrZXJzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVuZCA9IEwubGF0TG5nKGV2ZW50LkxhdGl0dWRlLCBldmVudC5Mb25naXR1ZGUpO1xyXG4gICAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKHsgc3RhcnQ6IHRoaXMuc3RhcnQsIGVuZDogdGhpcy5lbmQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7XHJcbiAgICB0aGlzLm1vZGFsQ29udHJvbGxlci5kaXNtaXNzKCk7XHJcbiAgfVxyXG5cclxuICBvaygpIHtcclxuICAgIHRoaXMuc2V0TG9jYXRpb25Jbk1hcENvbXBvbmVudC5jb25maXJtTG9jYXRpb24oKTtcclxuICB9XHJcbn1cclxuIl19